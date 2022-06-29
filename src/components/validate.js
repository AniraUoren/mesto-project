/**
 * Функция, показывающая поле с ошибкой валидации для конкретного поля input в конкретной
 * форме с нужным текстом.
 * @param form - форма, в которой выплолняется валидация.
 * @param input - поле, для которого должна отобразиться ошибка.
 * @param validationText - строка с текстом, который должен отобразиться в поле.
 */
const showErrorOnInput = (form, input, validationText = "Что-то пошло не так") => {
  const errorSpan = form.querySelector(`.${input.id}-error`);
  errorSpan.classList.remove("popup__input-text_disabled");
  errorSpan.textContent = validationText;
}

/**
 * Функция, скрывающая поле с ошибкой валидации для конкретного поля input в конкретной форме
 * @param form - форма, в которой выплолняется валидация.
 * @param input - поле, для которого должна скрыться ошибка.
 */
const hideErrorOnInput = (form, input) => {
  const errorSpan = form.querySelector(`.${input.id}-error`);
  errorSpan.classList.add("popup__input-text_disabled");
  errorSpan.textContent = ""; //Убираем старый текст валидации
}

/**
 * Функция для проверки валидности полей ввода.
 * @param form - форма в которой проверяем валидность полей.
 * @param inputElement - поле ввода на котором проверяем корректность ввода.
 */
const isValid = (form, inputElement) => {

  if (!inputElement.validity.valid){
    showErrorOnInput(form, inputElement, inputElement.validationMessage);
  } else {
    hideErrorOnInput(form, inputElement)
  }

}

/**
 * Функция для установки слушателей на ввод полям из формы
 * @param form - форма на поля которой нужно установить слушатели
 */
const setEvtListenersOnFormElements = (form) => {
  const inputArray = Array.from(form.querySelectorAll(".popup__input-text"));

  inputArray.forEach(inputElem => {
    inputElem.addEventListener("input", () => {
      isValid(form, inputElem)
    })
  })
}

const enableValidation = () => {
  const formsArray = Array.from(document.querySelectorAll(".popup__form"));

  formsArray.forEach(form => {
    form.addEventListener("submit", evt => {
      evt.preventDefault();
    })
    setEvtListenersOnFormElements(form);
  })
}

export {enableValidation}
