"use strict";

const dialog = document.querySelector("#order-dialog");
const dialogForm = document.querySelector("#quick-order-form");
const productField = document.querySelector("#quick-product");

function openOrderDialog(productName) {
  if (!dialog) return;

  if (productField) {
    productField.value = productName || "Консультация по свету";
  }

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
    dialog.querySelector("input:not([type='hidden'])")?.focus();
  }
}

document.querySelectorAll(".js-open-order").forEach((button) => {
  button.addEventListener("click", () => openOrderDialog(button.dataset.product));
});

document.querySelectorAll(".js-close-order").forEach((button) => {
  button.addEventListener("click", () => dialog?.close());
});

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

function showSuccessfulSubmit(form, message) {
  const status = form.querySelector(".order-form__status");
  const submitButton = form.querySelector("button[type='submit']");

  if (status) status.textContent = message;
  if (submitButton) submitButton.disabled = true;

  window.setTimeout(() => {
    form.reset();
    if (submitButton) submitButton.disabled = false;
    if (form === dialogForm) dialog?.close();
  }, 1800);
}

dialogForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!dialogForm.reportValidity()) return;
  showSuccessfulSubmit(dialogForm, "Спасибо! Заявка принята.");
});

document.querySelectorAll(".js-demo-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    showSuccessfulSubmit(form, "Спасибо! Мы получили сообщение и скоро ответим.");
  });

  form.addEventListener("reset", () => {
    const status = form.querySelector(".order-form__status");
    if (status) status.textContent = "";
  });
});

const priceRange = document.querySelector("#price");
const priceOutput = document.querySelector("#price-output");

priceRange?.addEventListener("input", () => {
  if (priceOutput) {
    priceOutput.value = `${Number(priceRange.value).toLocaleString("ru-RU")} ₽`;
  }
});

document.querySelector("#catalog-filter-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
});

document.querySelectorAll(".swatch").forEach((swatch) => {
  swatch.addEventListener("click", () => {
    document.querySelectorAll(".swatch").forEach((item) => {
      item.classList.remove("swatch--active");
      item.setAttribute("aria-pressed", "false");
    });
    swatch.classList.add("swatch--active");
    swatch.setAttribute("aria-pressed", "true");
  });
});

const productSelect = document.querySelector("#product");
const requestedProduct = new URLSearchParams(window.location.search).get("product");

if (productSelect && requestedProduct) {
  const matchingOption = Array.from(productSelect.options).find(
    (option) => option.text === requestedProduct
  );
  if (matchingOption) productSelect.value = matchingOption.value;
}
