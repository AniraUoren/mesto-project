/**
 * Функция для удаления класса скрытия попап-элемента
 * @param element - DOM-элемент который требуется показать.
 */
function openDOMElement(element) {
  element.classList.remove("popup_closed");
}

/**
 * Функция для добавления класса скрытия попап-элемента
 * @param element - DOM-элемент который требуется скрыть.
 */
function closeDOMElement(element) {
  element.classList.add("popup_closed");
}

/**
 * Функция для добавления возможности открыть попап
 * @param openBtn - Кнопка для открытия попапа.
 * @param popupWindow - Модальное окно с которым работаем.
 */

function openPopupWindow(openBtn, popupWindow) {
  openBtn.addEventListener("click", (evt) => {
    openDOMElement(popupWindow);
  })
}

/**
 * Функция для добавления возможности закрыть попап нажатием на кнопку или нажатием клавиши Esc.
 * @param closeBtn - Кнопка для закрытия попапа.
 * @param popupWindow - Модальное окно с которым работаем.
 */
function closePopupWindow(closeBtn, popupWindow) {
  closeBtn.addEventListener("click", evt => {
    closeDOMElement(popupWindow);
  })

  popupWindow.addEventListener("keydown", evt => {
    evt.preventDefault();
    if (evt.key === "Escape"){
      closeDOMElement(popupWindow);
    }
  })

  popupWindow.addEventListener("click", evt => {
    if (evt.target.classList.contains("popup")){
      closeDOMElement(popupWindow);
    }
  })
}
export {openDOMElement, closeDOMElement, openPopupWindow, closePopupWindow}
