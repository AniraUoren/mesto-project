import {ESC_KEY} from "../utils/const";

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === ESC_KEY) {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
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
