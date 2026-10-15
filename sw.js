const CACHE='roompaint-v4';
const ASSETS=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('roompaint-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 const isPage=event.request.mode==='navigate'||new URL(event.request.url).pathname.endsWith('/index.html')||new URL(event.request.url).pathname.endsWith('/');
 if(isPage){
  event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;}).catch(()=>caches.open(CACHE).then(cache=>cache.match(event.request)).then(cached=>cached||caches.match('./index.html'))));
 }else{
  event.respondWith(caches.open(CACHE).then(cache=>cache.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok)cache.put(event.request,response.clone());return response;}))));
 }
});
