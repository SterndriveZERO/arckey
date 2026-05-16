(function () {
  "use strict";

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function staggerDelay(el, index) {
    var mod = index % 4;
    el.classList.remove("idx-delay-1", "idx-delay-2", "idx-delay-3");
    if (mod === 1) el.classList.add("idx-delay-1");
    else if (mod === 2) el.classList.add("idx-delay-2");
    else if (mod === 3) el.classList.add("idx-delay-3");
  }

  function boot() {
    if (prefersReducedMotion()) return;

    var root = document.getElementById("MainContent");
    if (!root) return;

    var nodes = Array.prototype.slice.call(root.querySelectorAll(":scope > .shopify-section"));

    nodes.forEach(function (el, i) {
      el.classList.add("idx-reveal");
      staggerDelay(el, i);
    });

    if (!nodes.length) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("idx-visible");
          io.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
