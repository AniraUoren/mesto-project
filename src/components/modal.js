import {disableSubmitButton} from "./validate";
import {validationConf} from "./config";

const ESC_KEY = "Escape";

/**
 * Открытие нужного попапа через добавление класса.
 * @param popup {Object} - попап который следует открыть.
 */
export function addingClassToOpenPopup(popup) {
  popup.classList.add("popup_opened");
}

/**
 * Закрытие нужного попапа через удаление класса.
 * @param popup {Object} - попап который следует закрыть.
 */
export function removeClassToClosePopup(popup) {
  popup.classList.remove("popup_opened");
}

/**
 * Функция, которая позволяет закрыть попап нажатием на кнопку Esc.
 * @param evt {Object} - объект события.
 */
export function handlerClosePopupOnEsc(evt) {
  if (evt.key === ESC_KEY) {
    const popup = document.querySelector(".popup_opened");
    const form = popup.querySelector("form");

    removeClassToClosePopup(popup);
    document.removeEventListener("keydown", handlerClosePopupOnEsc);
    form.reset();
    disableSubmitButton(form, validationConf);
  }
}

/**
 * Функция, которая проверяет, был ли нажат оверлей и при нажатии закрывающая попап.
 * @param evt {Object} - объект события клика.
 */
function handlerClosePopupOnOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    const popup = document.querySelector(".popup_opened");
    const form = popup.querySelector("form");

    removeClassToClosePopup(popup);
    document.removeEventListener("keydown", handlerClosePopupOnEsc);
    form.reset();
    disableSubmitButton(form, validationConf);
  }
}

/**
 * Функция, которая добавляет слушателя на закрытие попапа по клику на оверлей.
 * @param element {Object} - попап, которому добавляем функционал.
 */
export function addEvtListenerOnCloseByOverlay(element) {
  element.addEventListener("click", handlerClosePopupOnOverlay);
}

/**
 * Функция, которая устанавливает слушателя на закрытие попапа по нажатию Esc.
 */
export function addEvtListenerOnCloseByEsc() {
  document.addEventListener("keydown", handlerClosePopupOnEsc);
}
