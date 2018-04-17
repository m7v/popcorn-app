"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/popcorn-app/index.html","78b33059f2b84f8a8de1a24cc14715ac"],["/popcorn-app/static/css/main.b846e1f7.css","2e52541760c3315dab55edcceeb1d95f"],["/popcorn-app/static/js/0.988e739c.chunk.js","970f309d36fe0d2f40207e9008096795"],["/popcorn-app/static/js/1.cc84a86d.chunk.js","b7bc22efda2f3dcd67259fd04f498e65"],["/popcorn-app/static/js/2.ec2454a0.chunk.js","2cfed809b477419884d8f731f06fb369"],["/popcorn-app/static/js/3.142281ae.chunk.js","f3f35e6e3d638f030eca239c1be6f873"],["/popcorn-app/static/js/4.fe67e5c6.chunk.js","2b79e35398ded171e8cff214cdfc90fa"],["/popcorn-app/static/js/5.d61746a9.chunk.js","f72c39995c7bed52e892b996f625b50d"],["/popcorn-app/static/js/6.7f123f0f.chunk.js","a92e83664ef195eb7209376f18a24086"],["/popcorn-app/static/js/7.987879ec.chunk.js","e069d89eca70415dacf13ddc5112f999"],["/popcorn-app/static/js/main.71a89c8d.js","d8ac2d88487e14b432dcd22f31426ac5"],["/popcorn-app/static/media/background.722674ce.jpg","722674ce59ffc9a52b17da5e531ce09d"],["/popcorn-app/static/media/default-card.7c96c896.png","7c96c8965188131419fdf7b36db5eee7"],["/popcorn-app/static/media/keyrune.2867fe04.ttf","2867fe048eed9dc5343ed4d99c2d71b8"],["/popcorn-app/static/media/keyrune.2a434c66.eot","2a434c66ff5e146ed49c6d47ad607757"],["/popcorn-app/static/media/keyrune.359ff459.woff2","359ff4599c953b114ec6c05fb62beb52"],["/popcorn-app/static/media/keyrune.63bd1bbb.svg","63bd1bbbee60705ca5e8706c21611f84"],["/popcorn-app/static/media/keyrune.750e1dc4.woff","750e1dc41d4f0cae890b414ed7f4db00"],["/popcorn-app/static/media/mana.12a08476.woff","12a084765994fad4f1212320727ede65"],["/popcorn-app/static/media/mana.33d1f9b5.svg","33d1f9b5d0a2498500eff3c2c8343d21"],["/popcorn-app/static/media/mana.c110dae7.eot","c110dae71f2c1a70250f9808a4f11fe5"],["/popcorn-app/static/media/mana.c6bc932c.ttf","c6bc932cfe42c37d144bbd6d59ef35fc"],["/popcorn-app/static/media/mplantin.7f51b354.svg","7f51b3545752eb40bb4b63661f584d7d"],["/popcorn-app/static/media/mplantin.b09923e4.woff","b09923e4e9b689572c4d30429491b892"],["/popcorn-app/static/media/mplantin.c64fa9e7.ttf","c64fa9e74b60a46076fce0b1a4b631dc"],["/popcorn-app/static/media/mplantin.daf8b76b.eot","daf8b76ba2ad29eac149b6a26a5747d7"],["/popcorn-app/static/media/oversize-default-card.4b3a1fc4.jpeg","4b3a1fc46c696562726fc4a73cf95474"],["/popcorn-app/static/media/searchIcon.5e934606.png","5e934606555dc20909d27b3929dd341c"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/popcorn-app/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});