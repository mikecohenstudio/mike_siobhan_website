async function inject(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status + " " + res.statusText);
    el.innerHTML = await res.text();
  } catch (e) {
    console.error("Include failed for", url, e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  inject("#site-header", "./partials/header.html");
  inject("#site-footer", "./partials/footer.html");
});
