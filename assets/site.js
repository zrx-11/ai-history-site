/* AI 纪元 · 多页站点共享脚本：导航高亮 / 回顶 / 目录锚点平滑 / 进度条 */
(function () {
  // 当前页高亮
  var cur = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href').split('/').pop();
    if (href === cur) a.classList.add('on');
  });

  // 回顶按钮（顶部导航 + 底部位置条各一个）
  function bindTop(btn) {
    if (!btn) return;
    btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
  bindTop(document.getElementById('topBtn'));
  bindTop(document.getElementById('pbTop'));
  var topBtn = document.getElementById('topBtn');
  if (topBtn) {
    window.addEventListener('scroll', function () {
      topBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
  }

  // 阅读进度条（页面有 #progressBar 才生效）
  var bar = document.getElementById('progressBar');
  if (bar) {
    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var total = h.scrollHeight - h.clientHeight;
      bar.style.width = (total > 0 ? (h.scrollTop / total * 100) : 0) + '%';
    }, { passive: true });
  }

  // 本页目录 / 侧滑目录锚点平滑滚动
  document.querySelectorAll('.page-index a, #tocList .toc-item').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id && id.charAt(0) === '#') {
        var el = document.getElementById(id.slice(1));
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
      }
    });
  });
})();
