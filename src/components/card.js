import {openDOMElement, closeDOMElement} from "./modal";

/**
 * Функция для рендера карточки из галереи и создания событий для нее по объекту.
 * @param template - Шаблон для создания карточки.
 * @param initObj - Объект для инициализации карточки.
 */
function createPlaceCard(template, initObj) {
  const elem = template.content.firstElementChild.cloneNode(true); //Получаем элемент из шаблона.
  const watchImagesPopup = document.querySelector("#watchImage"); //Ищем попап для просмотра изображения
  const closeWatchImagesPopup = document.querySelector("#closeWatchImagesPopup"); // Ищем кнопку закрытия попапа для просмотра изображения


  elem.querySelector(".gallery__image").src = initObj.link; // Добавляем карточке ссылку на изображение
  elem.querySelector(".gallery__image").alt = initObj.name; // Добавляем карточке описание изображения
  elem.querySelector(".gallery__el-header").innerText = initObj.name; //Добавляем описание места

  //Вешаем на карточку событие клика на кнопку лайка
  elem.querySelector(".gallery__like").addEventListener("click", () => {
    elem.querySelector(".gallery__like").classList.toggle("gallery__like_active")
  })

  //Вешаем на карточку событие клика на кнопку удаления карточки
  elem.querySelector(".gallery__delete").addEventListener("click", () => {
    elem.remove();
  })

  //Вешаем на карточку событие клика на изображение для просмотра картинки в попапе
  elem.querySelector(".gallery__image").addEventListener("click", () => {
    watchImagesPopup.querySelector(".popup__image").setAttribute("src", elem.querySelector(".gallery__image").src);
    watchImagesPopup.querySelector(".popup__image").setAttribute("alt", elem.querySelector(".gallery__image").alt);
    watchImagesPopup.querySelector(".popup__image-description").innerText = elem.querySelector(".gallery__image").alt;
    openDOMElement(watchImagesPopup);
  })

  //Вешаем на кнопку закрытия попапа событие
  closeWatchImagesPopup.addEventListener("click", () => {
    closeDOMElement(watchImagesPopup);
  });

  //Возвращаем готовую карточку со всеми слушателями
  return elem;
}

export default createPlaceCard;
