// show input errors
export function textErrors(textElement) {
  textElement.nextElementSibling.classList.remove("hidden");
  textElement.classList.add("error-border");
}

export function selectErrors(selectElement) {
  selectElement.lastElementChild.classList.remove("hidden");
}

// remove input errors
export function removeTextErrors(textElement) {
  textElement.nextElementSibling.classList.add("hidden");
  textElement.classList.remove("error-border");
}

export function removeSelectErrors(selectElement) {
  selectElement.lastElementChild.classList.add("hidden");
}
