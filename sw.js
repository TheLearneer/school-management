importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0ac5d9d4436002e9e742.js",
    "revision": "677b5e5e6e439cc1af7b3cbabce2d776"
  },
  {
    "url": "/_nuxt/1946cf645e99ed5b6c37.js",
    "revision": "99faa3b0867de2394283baf315812850"
  },
  {
    "url": "/_nuxt/211223f09a524a996fb7.js",
    "revision": "edc7bb2157891cbd29bed393af1ea773"
  },
  {
    "url": "/_nuxt/23c441a72f6b9fb427da.js",
    "revision": "9ae6a4f1df3f85b568a3c74e98e3cec1"
  },
  {
    "url": "/_nuxt/464e10f7b88b8daa20a7.js",
    "revision": "bbeb2edb284c06ac88313d4128873890"
  },
  {
    "url": "/_nuxt/6b268cd0db89b3777d92.js",
    "revision": "b9073d34e2ea43f4a5fc1c5a76ae5585"
  },
  {
    "url": "/_nuxt/8835e4a921e0a48051d9.js",
    "revision": "b9bfaa213786292b8a4682a8f2e83b99"
  },
  {
    "url": "/_nuxt/91c7f6e96c9956e69fb7.js",
    "revision": "63f330860b4e322d6ead4de4c17348d1"
  },
  {
    "url": "/_nuxt/d271fb6556ca7081bbf9.js",
    "revision": "17eb1803d68818417164cb593752b24a"
  },
  {
    "url": "/_nuxt/d806f293847cef6496ad.js",
    "revision": "4675cd66f34b82f85ebf370ffdfe7c1a"
  }
], {
  "cacheId": "school-management",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
