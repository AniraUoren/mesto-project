import {openPopup} from "./modal";

/**
 * Функция для рендера карточки из галереи и создания событий для нее по объекту.
 * @param template - Шаблон для создания карточки.
 * @param initObj - Объект для инициализации карточки.
 * @param popup - Элемент страницы, содержащий в себе попап.
 */
function createPlaceCard(template, initObj, popup) {
  const elem = template.content.firstElementChild.cloneNode(true); //Получаем элемент из шаблона.

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
    popup.querySelector(".popup__image").setAttribute("src", elem.querySelector(".gallery__image").src);
    popup.querySelector(".popup__image").setAttribute("alt", elem.querySelector(".gallery__image").alt);
    popup.querySelector(".popup__image-description").innerText = elem.querySelector(".gallery__image").alt;
    openPopup(popup);
  })

  //Возвращаем готовую карточку со всеми слушателями
  return elem;
}

export default createPlaceCard;
