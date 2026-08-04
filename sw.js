// 학습 플래너 서비스워커
// 전략: 네트워크 우선(Network First) — 항상 최신 파일을 먼저 시도하고,
// 인터넷이 안 될 때만 저장해둔 이전 버전을 보여줍니다.
const CACHE = 'study-planner-v2';
const CORE_ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE_ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // 구글 시트 API 호출은 캐시하지 않고 항상 네트워크로만 보냄
  if (e.request.url.includes('script.google.com')) return;

  e.respondWith(
    fetch(e.request)
      .then((netRes) => {
        const clone = netRes.clone();
        caches.open(CACHE).then((cache) => cache.put(e.request, clone));
        return netRes;
      })
      .catch(() => caches.match(e.request))
  );
});
