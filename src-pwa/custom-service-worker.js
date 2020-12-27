/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

/*
  Dependencies
*/

  // DOC: https://developers.google.com/web/tools/workbox/modules/workbox-strategies
  import { precacheAndRoute } from 'workbox-precaching'
  import { StaleWhileRevalidate } from 'workbox-strategies'
  import { CacheFirst } from 'workbox-strategies'
  import { registerRoute } from 'workbox-routing'

  // Google fonts case
  // import { ExpirationPlugin } from 'workbox-expiration'
  // import { CacheableResponsePlugin } from 'workbox-cacheable-response'

  import { NetworkFirst } from 'workbox-strategies'

  import { Queue } from 'workbox-background-sync'

/*
  Config
*/

  precacheAndRoute(self.__WB_MANIFEST)

  let isBgSyncSupported = 'sync' in self.registration ? true : false
  console.log('Support BG Sync', isBgSyncSupported)


/*
  Queue - Create new post
*/

  let createNewOfflinePostQueue = null
  if (isBgSyncSupported) {
    createNewOfflinePostQueue = new Queue('createNewOfflinePostQueue')
  }

/*
  Caching strategies
*/

  // Cache first example
  registerRoute(
    ({request}) => request.destination === 'style',
    new CacheFirst()

    // Google fonts case
    // new CacheFirst({
    //   cacheName: 'google-fonts',
    //   plugins: [
    //     new ExpirationPlugin({
    //       maxEntries: 30,
    //     }),
    //     new CacheableResponsePlugin({
    //       statuses: [0, 200]
    //     }),
    //   ],
    // })
  )

  // Network first example
  registerRoute(
    ({url}) => url.pathname.startsWith('/posts'),
    new NetworkFirst()
  )

  // Stale-While-Revalidate example
  registerRoute(
    ({url}) => url.href.startsWith('http'),
    new StaleWhileRevalidate()
  )

/*
  Event fetch
*/

  if (isBgSyncSupported) {
    self.addEventListener('fetch', (event) => {
      if (event.request.url.endsWith('/create-post')) {
        // Clone the request to ensure it's safe to read when
        // adding to the Queue.
        const promiseChain = fetch(event.request.clone()).catch((err) => {
          return createNewOfflinePostQueue.pushRequest({request: event.request})
        })

        event.waitUntil(promiseChain)
      }
    })
  }
