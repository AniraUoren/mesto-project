const ESC_CODE = "Escape"; // константа с кодом клавиши Esc

/**
 * Вспомогательная функция для закрытия попапа кнопкой Esc.
 * Сделана для получения возможности убрать слушатель при закрытии окна.
 * @param evt - объект event от срабатывания addEventListener
 */
function closeByEscKey(evt){
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

/**
 * Функция для удаления класса скрытия попап-элемента
 * @param element - DOM-элемент который требуется показать.
 */
function openPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscKey);
}

/**
 * Функция для добавления класса скрытия попап-элемента
 * @param element - DOM-элемент который требуется скрыть.
 */
function closePopup(element) {
  element.classList.remove("popup_opened");

  document.removeEventListener("keydown", closeByEscKey);
}

/**
 * Функция для добавления возможности открыть попап
 * @param openBtn - Кнопка для открытия попапа.
 * @param popupWindow - Модальное окно с которым работаем.
 */

function openPopupWindow(openBtn, popupWindow) {
  openBtn.addEventListener("click", () => {
    openPopup(popupWindow);
  })
}

/**
 * Функция для добавления возможности закрыть попап нажатием на кнопку или нажатием клавиши Esc.
 * @param closeBtn - Кнопка для закрытия попапа.
 * @param popupWindow - Модальное окно с которым работаем.
 */
function closePopupWindow(closeBtn, popupWindow) {
  closeBtn.addEventListener("click", () => {
    closePopup(popupWindow);
  })

  popupWindow.addEventListener("click", evt => {
    if (evt.target.classList.contains("popup")){
      closePopup(popupWindow);
    }
  })
}
export {openPopup, closePopup, openPopupWindow, closePopupWindow}
