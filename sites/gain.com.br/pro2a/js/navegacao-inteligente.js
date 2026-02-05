
// Navegação Mobile + botão rápido
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var toggle = document.querySelector('.mobile-menu-toggle');
    var menu   = document.getElementById('mobileMenu');
    if (toggle && menu){
      toggle.addEventListener('click', function(){
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
      });
    }
  });
})();
