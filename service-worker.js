"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/popcorn-app/index.html","1b0d4f71c4b5d240da33ac004dc09e73"],["/popcorn-app/static/css/main.9747bbb9.css","d648777c51aac8825c71ebc9d889bc80"],["/popcorn-app/static/js/0.264927b9.chunk.js","4a33cb7334141e3ac9f30bceca03ad5f"],["/popcorn-app/static/js/1.81a57408.chunk.js","3ebb965a4cc9c37a10f7c712d3205356"],["/popcorn-app/static/js/2.121519d4.chunk.js","ebd7b6460d94d47dea00e404bfb6b194"],["/popcorn-app/static/js/3.dc4c722c.chunk.js","cc65163901971fe5287e4990a7a0677d"],["/popcorn-app/static/js/4.a5d56b54.chunk.js","7041d7b6605496b9e05284a762408c5e"],["/popcorn-app/static/js/5.92015abc.chunk.js","e8d7f4ebf56f7184bc1fdaee772402f0"],["/popcorn-app/static/js/main.3d0b886c.js","b8d36d183388e55043a54cbb58d1449d"],["/popcorn-app/static/media/default.2287694b.jpg","2287694b4e9f291d8cafcf98426fd687"],["/popcorn-app/static/media/keyrune.2867fe04.ttf","2867fe048eed9dc5343ed4d99c2d71b8"],["/popcorn-app/static/media/keyrune.2a434c66.eot","2a434c66ff5e146ed49c6d47ad607757"],["/popcorn-app/static/media/keyrune.359ff459.woff2","359ff4599c953b114ec6c05fb62beb52"],["/popcorn-app/static/media/keyrune.63bd1bbb.svg","63bd1bbbee60705ca5e8706c21611f84"],["/popcorn-app/static/media/keyrune.750e1dc4.woff","750e1dc41d4f0cae890b414ed7f4db00"],["/popcorn-app/static/media/logo_header.69a415ce.png","69a415ceba5ce6c5e77f4af80a6eb0a0"],["/popcorn-app/static/media/mana.12a08476.woff","12a084765994fad4f1212320727ede65"],["/popcorn-app/static/media/mana.33d1f9b5.svg","33d1f9b5d0a2498500eff3c2c8343d21"],["/popcorn-app/static/media/mana.c110dae7.eot","c110dae71f2c1a70250f9808a4f11fe5"],["/popcorn-app/static/media/mana.c6bc932c.ttf","c6bc932cfe42c37d144bbd6d59ef35fc"],["/popcorn-app/static/media/map.82d6641a.jpg","82d6641a3d56b17d0da6e1511325e160"],["/popcorn-app/static/media/mplantin.7f51b354.svg","7f51b3545752eb40bb4b63661f584d7d"],["/popcorn-app/static/media/mplantin.b09923e4.woff","b09923e4e9b689572c4d30429491b892"],["/popcorn-app/static/media/mplantin.c64fa9e7.ttf","c64fa9e74b60a46076fce0b1a4b631dc"],["/popcorn-app/static/media/mplantin.daf8b76b.eot","daf8b76ba2ad29eac149b6a26a5747d7"],["/popcorn-app/static/media/thx.34d79d5c.png","34d79d5cf659509e232bf20344c5db5a"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),c=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),c]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var n=new Request(t,{credentials:"same-origin"});return fetch(n).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/popcorn-app/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});