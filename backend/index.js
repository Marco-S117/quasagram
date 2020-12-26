/*
  Dependencies
*/

  const EXPRESS = require('express')
  const ADMIN = require('firebase-admin')

/*
  Config ExpressJS
*/

  const APP = EXPRESS()

/*
  Config Firebase
*/

  const SERVICE_ACCOUNT = require('./serviceAccountKey.json')

  ADMIN.initializeApp({
    credential: ADMIN.credential.cert(SERVICE_ACCOUNT)
  })

  const DB = ADMIN.firestore()

/*
  Endpoints
*/

  /* Posts */
  APP.get('/posts', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    let posts = []
    DB.collection('posts').orderBy('created_at', 'desc').get().then(snapshot => {
      snapshot.forEach(doc => {
        posts.push(doc.data())
      })
      res.send(posts)
    })
  })

/*
  Listen
*/

  const PORT = 3000
  APP.listen(process.env.PORT || PORT)
