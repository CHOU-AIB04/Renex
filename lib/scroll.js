/**
 * Smooth-scroll to an in-page section.
 *
 * Hash links (`href="#contact"`) only scroll when the hash actually *changes*.
 * Once the URL already ends in `#contact`, clicking the same link again does
 * nothing. Scrolling programmatically avoids that entirely.
 *
 * `offset` compensates for the fixed header so the section title isn't hidden
 * underneath it.
 */
export function scrollToId(target, offset = 96) {
  if (typeof window === "undefined") return;

  const id = String(target).replace(/^#/, "");
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: "smooth",
  });
}
