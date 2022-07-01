/**
 * Функция, показывающая поле с ошибкой валидации для конкретного поля input в конкретной
 * форме с нужным текстом.
 * @param form - форма, в которой выплолняется валидация.
 * @param input - поле, для которого должна отобразиться ошибка.
 * @param validationText - строка с текстом, который должен отобразиться в поле.
 * @param config - объект с классами используемых в валидации элементов.
 */
const showErrorOnInput = (form, input, validationText = "Что-то пошло не так", config) => {
  const errorSpan = form.querySelector(`.${input.id}-error`);
  errorSpan.classList.remove(config.errorSpanClass);
  errorSpan.textContent = validationText;
}

/**
 * Функция, скрывающая поле с ошибкой валидации для конкретного поля input в конкретной форме
 * @param form - форма, в которой выплолняется валидация.
 * @param input - поле, для которого должна скрыться ошибка.
 * @param config - объект с классами используемых в валидации элементов.
 */
const hideErrorOnInput = (form, input, config) => {
  const errorSpan = form.querySelector(`.${input.id}-error`);
  errorSpan.classList.add(config.errorSpanClass);
  errorSpan.textContent = ""; //Убираем старый текст валидации
}

/**
 * Функция для проверки валидности полей input в переданном списке.
 * @param inputList - список полей для проверки.
 * @returns true - хотя бы одно поле из списка не валидно.
 * @returns false - все поля проходят проверку валидации.
 */
const hasInvalidInput = (inputList) => {
  return inputList.some(inputEl => {
    return !inputEl.validity.valid;
  })
}

/**
 * Функция для переключения состояния кнопки подтверждения в форме.
 * @param button - кнопка, состояние которой будем менять,
 * @param inputList - список полей формы на состояние которых ориентируемся,
 * @param config - объект с классами используемых в валидации элементов.
 */
const submitButtonAvailability = (button, inputList, config) => {
  if (hasInvalidInput(inputList)){
    button.classList.add(config.submitButtonDisableClass);
    button.setAttribute("disabled", "disabled"); //обязательно отключаем кнопку, т.к. она все еще доступна для нажатия
  } else {
    button.classList.remove(config.submitButtonDisableClass);
    button.removeAttribute("disabled");
  }
}

/**
 * Функция для проверки валидности полей ввода.
 * @param form - форма в которой проверяем валидность полей.
 * @param inputElement - поле ввода на котором проверяем корректность ввода.
 * @param config - объект с классами используемых в валидации элементов.
 */
const isValid = (form, inputElement, config) => {

  if (!inputElement.validity.valid){
    showErrorOnInput(form, inputElement, inputElement.validationMessage, config);
  } else {
    hideErrorOnInput(form, inputElement, config)
  }

}

/**
 * Функция для установки слушателей на ввод полям из формы
 * @param form - форма на поля которой нужно установить слушатели
 * @param config - объект с классами используемых в валидации элементов.
 */
const setEvtListenersOnFormElements = (form, config) => {
  const inputArray = Array.from(form.querySelectorAll(`.${config.inputClass}`));
  const submitButton = form.querySelector(`.${config.submitButtonClass}`)

  submitButtonAvailability (submitButton, inputArray, config);

  inputArray.forEach(inputElem => {
    inputElem.addEventListener("input", () => {
      isValid(form, inputElem, config);
      submitButtonAvailability (submitButton, inputArray, config);
    })
  })
}

/**
 * Функция для включения валидаций на всех формах страницы.
 * @param config - объект с классами используемых в валидации элементов.
 */
const enableValidation = (config) => {
  const formsArray = Array.from(document.querySelectorAll(`.${config.formPopupClass}`));

  formsArray.forEach(form => {
    form.addEventListener("submit", evt => {
      evt.preventDefault();
    })
    setEvtListenersOnFormElements(form, config);
  })
}



export {enableValidation}
