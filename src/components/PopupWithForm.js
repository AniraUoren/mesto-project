import {Popup} from "./Popup";

export class PopupWithForm extends Popup {
  constructor(selectorPopup, handlerSubmitForm) {
    super(selectorPopup);
    this._handlerSubmitForm = handlerSubmitForm;
    this._formElement = this._popupElement.querySelector("form");
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
  }

}
