/* ============================================================
   image-protect.js
   Lightweight deterrents against casual image right-click-save
   and drag-out. This raises friction only — it cannot make an
   image un-downloadable, since the browser must fetch the file
   to display it. Anyone using DevTools > Network/Sources, or
   simply viewing the page source, can still retrieve the file.
   For real protection, use server-side watermarking or low-res
   previews with a paid/signed full-res version.
   ============================================================ */
(function () {
  "use strict";

  // Inject CSS: block drag ghost image + text/image selection
  var style = document.createElement("style");
  style.textContent =
    "img { -webkit-user-select: none; -moz-user-select: none; user-select: none; " +
    "-webkit-user-drag: none; user-drag: none; -khtml-user-drag: none; }";
  document.head.appendChild(style);

  // Block right-click context menu on images
  document.addEventListener("contextmenu", function (e) {
    if (e.target && e.target.tagName === "IMG") {
      e.preventDefault();
    }
  });

  // Block drag-out (the "drag image to desktop" save method)
  document.addEventListener("dragstart", function (e) {
    if (e.target && e.target.tagName === "IMG") {
      e.preventDefault();
    }
  });

  // Force draggable="false" on every image, including ones added later
  function lockImages(root) {
    (root || document).querySelectorAll("img").forEach(function (img) {
      img.setAttribute("draggable", "false");
    });
  }
  lockImages(document);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType === 1) {
          if (node.tagName === "IMG") node.setAttribute("draggable", "false");
          lockImages(node);
        }
      });
    });
  }).observe(document.body, { childList: true, subtree: true });

  // Block common "view/save source" shortcuts and DevTools hotkeys
  document.addEventListener("keydown", function (e) {
    var k = e.key ? e.key.toLowerCase() : "";
    var blockCtrl = (e.ctrlKey || e.metaKey) && (k === "s" || k === "u");
    var blockDevtools =
      k === "f12" ||
      ((e.ctrlKey || e.metaKey) && e.shiftKey && (k === "i" || k === "j" || k === "c"));
    if (blockCtrl || blockDevtools) {
      e.preventDefault();
    }
  });
})();
