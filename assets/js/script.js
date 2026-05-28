'use strict';

// ---------- footer year ----------
const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- nav: shrink on scroll ----------
const nav = document.querySelector('[data-nav]');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
revealEls.forEach((el) => revealObserver.observe(el));

// ---------- active section highlight ----------
const navTargets = document.querySelectorAll('[data-nav-target]');
const sections = [...navTargets]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setActive = (id) => {
  navTargets.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) setActive(entry.target.id);
  });
}, { threshold: 0.4, rootMargin: '-30% 0px -50% 0px' });
sections.forEach((sec) => sectionObserver.observe(sec));

// ---------- magnetic project cards ----------
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${(-my * 4).toFixed(2)}deg) rotateY(${(mx * 4).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}
