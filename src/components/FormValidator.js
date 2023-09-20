import {disableSubmitButton, hideInputError} from "../delete/validate";

export class FormValidator {
  _config; //TODO Не уверена что его надо хранить как параметр, а не как static
  _form;

  constructor(config, formElement) {
    this._config = config;
    this._form = formElement;
  }

  _showError(inputElement, errorText) {
    const _errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    _errorElement.textContent = errorText;
    _errorElement.classList.add(this._config.visibleErrorClass);
  }

  _hideError(inputElement, errorText){
    const _errorElement =  this._form.querySelector(`.${inputElement.id}-error`);

    _errorElement.classList.remove(this._config.visibleErrorClass);
    _errorElement.textContent = "";
  }

  _disableSubmitButton() {
    const button = this._form.querySelector(this._config.submitBtnClass);

    button.classList.add(this._config.disabledSubmitBtnClass);
    button.setAttribute("disabled", "disabled");
  }

  _enableSubmitButton() {
    const button = this._form.querySelector(this._config.submitBtnClass);

    button.classList.remove(this._config.disabledSubmitBtnClass);
    button.removeAttribute("disabled");
  }

  _isValid(input){
    const arrayInputs = Array.from(this._form.querySelectorAll(".popup__input"));
    const hasInvalidField = arrayInputs.some(input => {
      return input.validity.valid === false;
    });

    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }

    if (hasInvalidField) {
      this._showError(input, input.validationMessage);
      this._disableSubmitButton();
    } else {
      this._hideError(input);
      this._enableSubmitButton();
    }
  }

  enableValidation() {
    const arrayInputOfForm = Array.from(this._form.querySelectorAll(this._config.inputClass));

    arrayInputOfForm.forEach(input =>{
      input.addEventListener("input", () => {
        this._isValid(input);
      });
    });
  }
}
