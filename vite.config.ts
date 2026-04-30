import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only inline script that runs before any module loads. If a previous
// visit to the dev URL registered the cache-first PWA service worker, the
// SW could intercept requests for /src/main.tsx and serve a stale copy —
// meaning the dev cleanup logic in main.tsx would never execute. This
// inline script in index.html runs first, unregisters every service worker
// for the origin, deletes every cache, and triggers a one-shot reload
// (guarded by sessionStorage) so the page comes back uncontrolled.
function devSwCleanup(): Plugin {
  const script = `
<script>
(function(){
  if(!('serviceWorker' in navigator))return;
  var FLAG='sw-dev-cleanup-reloaded';
  navigator.serviceWorker.getRegistrations().then(function(regs){
    if(regs.length===0)return;
    return Promise.all(regs.map(function(r){return r.unregister();})).then(function(){
      if('caches' in window){
        return caches.keys().then(function(ks){
          return Promise.all(ks.map(function(k){return caches.delete(k);}));
        });
      }
    }).then(function(){
      if(!sessionStorage.getItem(FLAG)){
        sessionStorage.setItem(FLAG,'1');
        console.log('[dev] Cleared stale service worker + caches; reloading.');
        location.reload();
      }
    });
  }).catch(function(){});
})();
</script>`;
  return {
    name: 'dev-sw-cleanup',
    apply: 'serve',
    transformIndexHtml(html) {
      return html.replace('</head>', script + '\n  </head>');
    },
  };
}

export default defineConfig({
  plugins: [react(), devSwCleanup()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true
  }
})
