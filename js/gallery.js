"use strict";

import galleryItems from "./gallery-items.js";

const galleryList = document.querySelector(".js-gallery");

const fullImageLightbox = document.querySelector(".lightbox");
const fullImage = document.querySelector(".lightbox__image");
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const lightboxOverlay = document.querySelector(".lightbox__content");

galleryItems.forEach(galleryItem => {
  galleryList.insertAdjacentHTML(
    "beforeend",
    `<li class="gallery__item">


    <img
      class="gallery__image"
      src="${galleryItem.preview}"
      data-source="${galleryItem.original}"
      alt="${galleryItem.description}"
    />
    <a
      class="gallery__link"
      href="${galleryItem.original}"
    >
    <span class="gallery__icon">
      <i class="material-icons">zoom_out_map</i>
    </span>
  </a>
</li>`
  );
});

function openImage({ target }) {
  if (target.tagName !== "IMG") {
    return;
  }
  fullImageLightbox.classList.add("is-open");
  fullImage.setAttribute("src", `${target.dataset.source}`);
  fullImage.setAttribute("alt", `${target.getAttribute("alt")}`);
  document.addEventListener("keydown", closeImageWithEsc);

  target.classList.add("active");
}

galleryList.addEventListener("click", openImage);

function closeImage() {
  fullImageLightbox.classList.remove("is-open");
  fullImage.setAttribute("src", "");
  document.removeEventListener("keydown", closeImageWithEsc);
}

closeBtn.addEventListener("click", closeImage);

function closeImageWithOverlay(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closeImage();
}
lightboxOverlay.addEventListener("click", closeImageWithOverlay);

function closeImageWithEsc(event) {
  if (event.code !== "Escape") {
    return;
  }
  closeImage();
}

function pressNext(event) {
  if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
    const items = document.querySelectorAll(".gallery__image");
    const itemsArr = Array.from(items);
    let idx = itemsArr.findIndex(elem => elem.classList.contains("active"));
    itemsArr[idx].classList.remove("active");

    if (event.code === "ArrowRight") {
      idx += 1;
    };
    if (event.code === "ArrowLeft") {
      idx -= 1;
    }
    if (idx < 0) {
        idx = itemsArr.length -1;
    }
    if (idx > itemsArr.length -1) {
        idx = 0;
    }
    const newImage = itemsArr[idx];
    newImage.classList.add("active");
    fullImage.setAttribute("src", `${newImage.dataset.source}`);
    fullImage.setAttribute("alt", `${newImage.getAttribute("alt")}`);
  }
}
document.addEventListener("keydown", pressNext);
