/**
 *
 */
function showInputError(form, element, errorText){
  const errorElement = form.querySelector(`.${element.id}-error`);

  errorElement.textContent = errorText;
  errorElement.classList.add("popup__input-error_visible");
}

/**
 *
 */
function hideInputError(form, element){
  const errorElement = form.querySelector(`.${element.id}-error`);

  errorElement.classList.remove("popup__input-error_visible");
  errorElement.textContent = "";
}

/**
 *
 * @param form
 */
function disableSubmitButton(form) {
  const button = form.querySelector(".popup__submit-btn");

  button.classList.add("popup__submit-btn_disabled");
  button.setAttribute("disabled", "disabled");
}

/**
 *
 * @param form
 */
function enableSubmitButton(form) {
  const button = form.querySelector(".popup__submit-btn");

  button.classList.remove("popup__submit-btn_disabled");
  button.removeAttribute("disabled", "disabled");
}

/**
 *
 */
function isValid(form, input){
  if (!input.validity.patternMismatch) {
    input.setCustomValidity("Разрешены только латинские и кириллические буквы, а так же пробел и тире.");
    console.log("yep");
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
    disableSubmitButton(form);
  } else {
    hideInputError(form, input);
    enableSubmitButton(form);
  }
}

/**
 *
 * @param form
 */
function setListenersOnForm(form) {
  const arrayInputOfForm = Array.from(form.querySelectorAll(".popup__input"));

  arrayInputOfForm.forEach(input =>{
    input.addEventListener("input", () => {
      isValid(form, input);
    });
  });
}

/**
 *
 */
export function enableValidations() {
  const arrayForms = Array.from(document.querySelectorAll(".popup__form"));

  arrayForms.forEach(form => {
    setListenersOnForm(form);
  });
}
