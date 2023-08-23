const ESC_KEY = "Escape";

/**
 * Открытие нужного попапа через добавление класса.
 * @param popup {Element} - попап который следует открыть.
 */
export function addingClassToOpenPopup(popup) {
  popup.classList.add("popup_opened");
}

/**
 * Закрытие нужного попапа через удаление класса.
 * @param popup {Element} - попап который следует закрыть.
 */
export function removeClassToClosePopup(popup) {
  popup.classList.remove("popup_opened");
}

/**
 * Функция, которая позволяет закрыть попап нажатием на кнопку Esc.
 * @param evt {Object} - объект события.
 */
function handlerClosePopupOnEsc(evt){
  if (evt.key === ESC_KEY) {
    removeClassToClosePopup(document.querySelector(".popup_opened"));
    document.removeEventListener("keydown", handlerClosePopupOnEsc);
  }
}

/**
 * Функция, которая проверяет, был ли нажат оверлей и при нажатии закрывающая попап.
 * @param evt {Object} - объект события клика.
 */
function handlerClosePopupOnOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    removeClassToClosePopup(document.querySelector(".popup_opened"));
  }
}

/**
 * Функция, которая добавляет слушателя на закрытие попапа по клику на оверлей.
 * @param element {Element} - попап, которому добавляем функционал.
 */
export function addEvtListenerOnCloseByOverlay(element){
  element.addEventListener("click", handlerClosePopupOnOverlay);
}

/**
 * Функция, которая устанавливает слушателя на закрытие попапа по нажатию Esc.
 */
export function addEvtListenerOnCloseByEsc() {
  document.addEventListener("keydown", handlerClosePopupOnEsc);
}
