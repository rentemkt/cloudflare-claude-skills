(function(){
  function computePrefix(){
    try{
      var path = window.location.pathname;
      var marker = '/site-profissional/';
      var idx = path.indexOf(marker);
      if (idx === -1) return '';
      var sub = path.substring(idx + marker.length);
      if (sub === '') return '';
      var depth = (sub.match(/\//g) || []).length;
      // If pointing to a file, depth should ignore last segment
      if (!sub.endsWith('/')) depth = Math.max(0, depth - 1);
      return depth ? '../'.repeat(depth) : '';
    }catch(e){ return ''; }
  }
  function rewriteUrls(container, prefix){
    var sel = container.querySelectorAll('[href], [src]');
    sel.forEach(function(el){
      ['href','src'].forEach(function(attr){
        if (!el.hasAttribute(attr)) return;
        var v = el.getAttribute(attr);
        if (!v || v.startsWith('#') || v.startsWith('mailto:') || v.startsWith('tel:') || v.startsWith('http') || v.startsWith('//')) return;
        // already prefixed?
        if (v.startsWith(prefix)) return;
        // keep absolute-like ./ ../ as-is
        if (v.startsWith('./') || v.startsWith('../')) return;
        el.setAttribute(attr, prefix + v);
      });
    });
  }
  function loadInto(selector, url, cb){
    fetch(url).then(function(r){ return r.text(); }).then(function(html){
      var el = document.querySelector(selector);
      if (el){ el.innerHTML = html; cb && cb(el); }
    }).catch(function(){ /* silent */ });
  }
  document.addEventListener('DOMContentLoaded', function(){
    var prefix = computePrefix();
    var incHeader = prefix + 'includes/header.html';
    var incFooter = prefix + 'includes/footer.html';
    loadInto('[data-include="header"]', incHeader, function(el){ rewriteUrls(el, prefix); });
    loadInto('[data-include="footer"]', incFooter, function(el){ rewriteUrls(el, prefix); });
  });
})();