import {validationConf} from "./config";

/**
 * Отображает поле с текстом ошибки.
 * @param form {Object} - форма в которой проверяем поле.
 * @param element {Object} - проверяемое поле ввода.
 * @param errorText {String} - строка с текстом ошибки, который должен быть отображен в поле.
 */
function showInputError(form, element, errorText){
  const errorElement = form.querySelector(`.${element.id}-error`);

  errorElement.textContent = errorText;
  errorElement.classList.add(validationConf.visibleErrorClass);
}

/**
 * Скрывает поле с тестом ошибки.
 * @param form {Object} - форма в которой проверяем поле.
 * @param element {Object} - проверяемое поле ввода.
 */
function hideInputError(form, element){
  const errorElement = form.querySelector(`.${element.id}-error`);

  errorElement.classList.remove(validationConf.visibleErrorClass);
  errorElement.textContent = "";
}

/**
 * Деактивирует кнопку подтверждения на форме.
 * @param form {Object} - форма в которой отключаем кнопку.
 */
function disableSubmitButton(form) {
  const button = form.querySelector(validationConf.submitBtnClass);

  button.classList.add(validationConf.disabledSubmitBtnClass);
  button.setAttribute("disabled", "disabled");
}

/**
 * Активирует кнопку подтверждения на форме.
 * @param form {Object} - форма в которой отключаем кнопку.
 */
function enableSubmitButton(form) {
  const button = form.querySelector(validationConf.submitBtnClass);

  button.classList.remove(validationConf.disabledSubmitBtnClass);
  button.removeAttribute("disabled");
}

/**
 * Выполняет проверку валидности в поле и управляет отображением или скрытием поля с текстом ошибки.
 * @param form {Object} - форма в которой выполняем проверку.
 * @param input {Object} - проверяемое поле ввода.
 */
function isValid(form, input){
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
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
 * Устанавливает слушатели на все поля в форме.
 * @param form {Object} - форма в которой выполняем проверку.
 */
function setListenersOnForm(form) {
  const arrayInputOfForm = Array.from(form.querySelectorAll(validationConf.inputClass));

  arrayInputOfForm.forEach(input =>{
    input.addEventListener("input", () => {
      isValid(form, input);
    });
  });
}

/**
 * Функция, управляющая валидацией и запускающая ее.
 */
export function enableValidations() {
  const arrayForms = Array.from(document.querySelectorAll(validationConf.formClass));

  arrayForms.forEach(form => {
    setListenersOnForm(form);
  });
}
