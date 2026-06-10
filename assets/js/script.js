/* Kinetic Minimal — progressive-enhancement motion system.
   Content is fully visible without JS; everything below only ADDS motion. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof window.gsap !== "undefined";
  var hasST = hasGsap && typeof window.ScrollTrigger !== "undefined";
  var hasSplit = hasGsap && typeof window.SplitText !== "undefined";
  var hasLenis = typeof window.Lenis !== "undefined";
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* sessionStorage can throw (blocked cookies/partitioned contexts) — never let it kill the page */
  function getSeen() { try { return sessionStorage.getItem("seenIntro"); } catch (e) { return "1"; } }
  function setSeen() { try { sessionStorage.setItem("seenIntro", "1"); } catch (e) {} }

  /* ---------- Always-on basics (no motion deps) ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var clockEl = document.querySelector("[data-clock]");
  function tickClock() {
    if (!clockEl) return;
    clockEl.textContent = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata"
    }).format(new Date());
  }
  tickClock();
  setInterval(tickClock, 30000);

  /* Nav hide-on-scroll-down / frost-on-scroll-up (cheap, works without gsap) */
  var nav = document.querySelector("[data-nav]");
  var lastY = 0;
  window.addEventListener("scroll", function () {
    if (!nav) return;
    var y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    if (!reduceMotion) nav.classList.toggle("is-hidden", y > 140 && y > lastY);
    lastY = y;
  }, { passive: true });

  /* ---------- Motion gate ---------- */
  if (reduceMotion || !hasGsap || !hasST) return; // static page — done.

  gsap.registerPlugin(ScrollTrigger);
  if (hasSplit) gsap.registerPlugin(SplitText);
  document.documentElement.classList.add("js-motion");
  window.__motionBooted = true; // inline head failsafe checks this

  /* ---------- Lenis smooth scroll ---------- */
  if (hasLenis) {
    document.documentElement.classList.add("smooth-active"); // not "has-lenis": Lenis strips *lenis* classes
    var lenis = new Lenis({ duration: 1.15 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Line masks ----------
     Wrap each [data-line]'s content in an inner span; the [data-line] element
     stays as the overflow-hidden mask and the inner span is what translates. */
  function maskLines(els) {
    return Array.prototype.map.call(els, function (el) {
      var inner = document.createElement("span");
      inner.className = "line-inner";
      while (el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner);
      return inner;
    });
  }

  /* ---------- Preloader + hero intro ---------- */
  var pre = document.querySelector("[data-preloader]");
  var preCount = document.querySelector("[data-preloader-count]");
  var heroLines = maskLines(document.querySelectorAll(".hero [data-line]"));
  var heroReveals = document.querySelectorAll(".hero [data-reveal]");

  gsap.set(heroLines, { yPercent: 110 });
  gsap.set(heroReveals, { autoAlpha: 0, y: 24 });

  function heroIntro() {
    gsap.timeline()
      .to(heroLines, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12 })
      .to(heroReveals, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, "-=0.6");
  }

  if (pre && !getSeen()) {
    setSeen();
    var counter = { v: 0 };
    gsap.timeline()
      .to(counter, {
        v: 100, duration: 1.1, ease: "power2.inOut",
        onUpdate: function () { if (preCount) preCount.textContent = String(Math.round(counter.v)); }
      })
      .to(pre, { yPercent: -100, duration: 0.7, ease: "power4.inOut" })
      .set(pre, { display: "none" })
      .add(heroIntro, "-=0.45");
  } else {
    if (pre) pre.style.display = "none";
    heroIntro();
  }

  /* ---------- Section title + contact line reveals ---------- */
  maskLines(document.querySelectorAll("main [data-line]:not(.hero [data-line])")).forEach(function (inner) {
    gsap.fromTo(inner, { yPercent: 110 }, {
      yPercent: 0, duration: 1, ease: "power4.out",
      scrollTrigger: { trigger: inner.parentElement, start: "top 88%" }
    });
  });

  /* ---------- Generic reveals ---------- */
  gsap.utils.toArray("main [data-reveal]:not(.hero [data-reveal])").forEach(function (el) {
    gsap.fromTo(el, { autoAlpha: 0, y: 36 }, {
      autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" }
    });
  });

  /* ---------- About word-by-word scrub ---------- */
  var aboutLead = document.querySelector("[data-words]");
  if (aboutLead && hasSplit) {
    var split = new SplitText(aboutLead, { type: "words", wordsClass: "w" });
    gsap.fromTo(split.words, { opacity: 0.18 }, {
      opacity: 1, stagger: 0.04, ease: "none",
      scrollTrigger: { trigger: aboutLead, start: "top 80%", end: "bottom 55%", scrub: true }
    });
  }

  /* ---------- Stat counters ---------- */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 1.6, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: function () {
        var n = decimals ? obj.v.toFixed(decimals) : Math.round(obj.v).toLocaleString("en-US");
        el.textContent = n + suffix;
      }
    });
    el.textContent = (decimals ? (0).toFixed(decimals) : "0") + suffix;
  });

  /* ---------- Magnetic buttons (fine pointers only) ---------- */
  if (finePointer) {
    document.querySelectorAll("[data-magnetic]").forEach(function (btn) {
      var strength = 0.35;
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * strength,
          y: (e.clientY - r.top - r.height / 2) * strength,
          duration: 0.4, ease: "power3.out", overwrite: "auto"
        });
      });
      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
      });
    });
  }

  /* ---------- Custom cursor (fine pointers only) ---------- */
  if (finePointer) {
    var cursor = document.querySelector("[data-cursor]");
    if (cursor) {
      document.documentElement.classList.add("js-cursor");
      gsap.set(cursor, { xPercent: -50, yPercent: -50, autoAlpha: 0 }); // JS owns centering; composes with x/y
      var setX = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3.out" });
      var setY = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3.out" });
      window.addEventListener("mousemove", function (e) { setX(e.clientX); setY(e.clientY); });
      window.addEventListener("mousemove", function () {
        gsap.to(cursor, { autoAlpha: 1, duration: 0.2 });
      }, { once: true });
      document.querySelectorAll("a, button").forEach(function (el) {
        el.addEventListener("mouseenter", function () { cursor.classList.add("is-hover"); });
        el.addEventListener("mouseleave", function () { cursor.classList.remove("is-hover"); });
      });
    }
  }

  /* ---------- Anchor links through Lenis ---------- */
  if (hasLenis) {
    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80 });
      });
    });
  }

  /* webfonts (Fontshare/Google) land after init and shift layout — re-measure triggers */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
})();
