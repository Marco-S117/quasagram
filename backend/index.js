/*
  Dependencies
*/

  const EXPRESS = require('express')
  const ADMIN = require('firebase-admin')
  const INSPECT = require('util').inspect
  const UUID = require('uuid-v4')

  let Busboy = require('busboy')
  let path = require('path')
  let os = require('os')
  let fs = require('fs')

/*
  Config ExpressJS
*/

  const APP = EXPRESS()

/*
  Config Firebase
*/

  const SERVICE_ACCOUNT = require('./serviceAccountKey.json')

  ADMIN.initializeApp({
    credential: ADMIN.credential.cert(SERVICE_ACCOUNT),
    storageBucket: "quasagram-84709.appspot.com"
  })

  const DB = ADMIN.firestore()
  let bucket = ADMIN.storage().bucket()

/*
  Endpoints
*/

  /* Get Posts */
  APP.get('/posts', (req, res) => {
    let posts = []

    res.set('Access-Control-Allow-Origin', '*')

    DB.collection('posts').orderBy('created_at', 'desc').get().then(snapshot => {
      snapshot.forEach(doc => {
        posts.push(doc.data())
      })
      res.send(posts)
    })
  })

  /* Create Posts */
  APP.post('/create-post', (req, res) => {
    let uuid = UUID()
    let busboy = new Busboy({ headers: req.headers })
    let fields = {}
    let fileData = {}

    res.set('Access-Control-Allow-Origin', '*')

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)

      let filePath = path.join(os.tmpdir(), filename)

      file.pipe(fs.createWriteStream(filePath))
      fileData = { filePath, mimetype }
    })

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + INSPECT(val))

      fields[fieldname] = val
    })

    busboy.on('finish', function() {

      bucket.upload(
        fileData.filePath,
        {
          uploadType: 'media',
          metadata: {
            metadata: {
              contentType: fileData.mimetype,
              firebaseStorageDownloadTokens: uuid
            }
          }
        },
        (err, uploadFile) => {
          if (!err) {
            DB.collection('posts').doc(fields.id).set({
              id: fields.id,
              caption: fields.caption,
              location: fields.location,
              created_at: parseInt(fields.created_at),
              imgUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadFile.name}?alt=media&token=${uuid}`
            })
            .then(() => {
              res.status(200).send(fields)
            })
          }
        }
      )
    })

    req.pipe(busboy)
  })

/*
  Listen
*/

  const PORT = 3000
  APP.listen(process.env.PORT || PORT)
