/*
  Dependencies
*/

  const EXPRESS = require('express')

/*
  Config ExpressJS
*/

  const APP = EXPRESS()

/*
  Endpoints
*/

  /* Posts */
  APP.get('/posts', (req, res) => {
    let posts = [
      {
        id: 1,
        location: 'Enna, Enna, Sicily',
        captio: 'Foto di Enna'
      },
      {
        id: 2,
        location: 'Barrafranca, Enna, Sicily',
        captio: 'Foto di Barrafranca'
      }
    ]
    res.send(posts)
  })

/*
  Listen
*/

  const POST = 3000

  APP.listen(POST, () => {
    console.log(`Backend running on: http://localhost:${POST}`)
  })
