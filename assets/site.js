/* AudioHaus — site interactions: scroll reveal + reduced-motion fallback */
(function(){
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If reduced-motion or no IntersectionObserver, mark everything in immediately.
  if (reduced || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.section, .card').forEach(function(el){ el.classList.add('is-in'); });
    return;
  }

  var sections = document.querySelectorAll('.section');
  var sectionObserver = new IntersectionObserver(function(entries, obs){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        // Stagger cards inside this section by 60ms each.
        var cards = entry.target.querySelectorAll('.card');
        cards.forEach(function(card, i){
          setTimeout(function(){ card.classList.add('is-in'); }, i * 60);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(function(s){ sectionObserver.observe(s); });

  // Cards that live outside a .section (e.g. inside .features-grid wrappers
  // that aren't sectioned) still need their own observer as a safety net.
  var orphanCards = document.querySelectorAll('.card');
  var cardObserver = new IntersectionObserver(function(entries, obs){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  orphanCards.forEach(function(c){ cardObserver.observe(c); });
})();
