import {Popup} from "./Popup";
import {validationConf} from "../utils/const";

export class PopupWithForm extends Popup {
  _formElement;
  _handlerSubmitForm;
  _formValues;

  constructor({selectorPopup, handlerSubmitForm}) {
    super(selectorPopup);
    this._handlerSubmitForm = handlerSubmitForm;
    this._formElement = this._popupElement.querySelector("form");
  }

  _clearErrorFields() {
    const errorElements = Array.from(this._formElement.querySelectorAll(".popup__input-error"));

    errorElements.forEach(errorField => {
      errorField.classList.remove(validationConf.visibleErrorClass);
      errorField.textContent = "";
    });
  }

  _getInputValues() {
    const inputsArray = Array.from(this._popupElement.querySelectorAll(".popup__input"));
    this._formValues = [];

    inputsArray.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();
    this._formElement.reset();
    this._clearErrorFields();
  }

  setEventListeners() {
    //TODO Подумать как можно будет снимать слушатели
    this._popupElement.addEventListener("click", evt => {
      if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-btn")) {
        this.close();
      }
    });

    window.addEventListener("keydown", evt => {
      this._handleEscClose(evt);
    });

    this._formElement.addEventListener("submit", evt => {
      evt.preventDefault();

      this._handlerSubmitForm();
      this.close();
    });
  }

}
