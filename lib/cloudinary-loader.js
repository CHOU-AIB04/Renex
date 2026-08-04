/**
 * Custom next/image loader.
 *
 * Every image on this site is hosted on Cloudinary, so we let Cloudinary's CDN
 * do the resizing/format conversion instead of round-tripping through the Next
 * image optimizer. That removes a server hop on first paint and returns
 * AVIF/WebP automatically via f_auto.
 */
export default function cloudinaryLoader({ src, width, quality }) {
  // Non-Cloudinary sources (or unexpected shapes) pass through untouched
  if (!src.includes("/upload/")) return src;

  const [base, rest] = src.split("/upload/");

  const params = [
    "f_auto", // AVIF/WebP when the browser supports it
    "c_limit", // never upscale past the original
    `w_${width}`,
    `q_${quality || "auto"}`,
  ].join(",");

  return `${base}/upload/${params}/${rest}`;
}
