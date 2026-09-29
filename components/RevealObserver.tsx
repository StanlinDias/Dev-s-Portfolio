"use client";

import { useLayoutEffect } from "react";

// Drives every [data-reveal] element on the site with one IntersectionObserver.
// Content is visible in the server HTML; hiding only starts once this has run
// (html.reveal-ready), so nothing is gated on JavaScript. Elements already on
// screen at mount are marked in immediately so they never flash.
export default function RevealObserver() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const reveal = (el: Element) => el.classList.add("is-in");

    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    const track = (el: Element) => {
      if (el.classList.contains("is-in")) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) reveal(el);
      else io.observe(el);
    };

    document.querySelectorAll("[data-reveal]").forEach(track);
    root.classList.add("reveal-ready");

    // Looping diagram particles pause while their diagram is off screen.
    const visibility = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.classList.toggle("is-offscreen", !entry.isIntersecting);
    });
    const watchFlow = (el: Element) => visibility.observe(el);
    document.querySelectorAll("[data-flow]").forEach(watchFlow);

    // Pages rendered by client navigation add new elements; pick them up too.
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal]")) io.observe(node);
          node.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
          if (node.matches("[data-flow]")) watchFlow(node);
          node.querySelectorAll("[data-flow]").forEach(watchFlow);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      visibility.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
