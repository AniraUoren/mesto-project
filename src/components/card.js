import {
  addingClassToOpenPopup
} from "./modal";

/*Попап для просмотра изображения и его элементы*/
export const viewImagePopupElement = document.querySelector("#imageViewerPopup");
const imagePopupElement = viewImagePopupElement.querySelector(".popup__image");
const descriptionPopupElement = viewImagePopupElement.querySelector(".popup__image-description");

/**
 * Функция для возможности ставить лайк карточке.
 * @param card {Element} - элемент карточки, на которую надо добавить событие.
 */
function addEventToLikeCard(card) {
  const likeBtn = card.querySelector(".card__like-btn");

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-btn_active");
  });
}

/**
 * Функция позволяет удалить карточку из галереи
 * @param card {Element} - элемент карточки, на которую надо добавить событие.
 */
function addEventToDeleteCard(card) {
  const deleteBtn = card.querySelector(".card__delete-btn");

  deleteBtn.addEventListener("click", () => {
    card.remove();
  });
}

/**
 * Функция позволяет повесить событие открытия попапа с картинкой на карточку.
 * @param card {Element} - элемент карточки, на которую надо добавить событие.
 */
function addEventToOpenImagePopup(card) {
  const imageCardElement = card.querySelector(".card__image");
  const descriptionCardElement = card.querySelector(".card__description");

  imageCardElement.addEventListener("click", () => {
    imagePopupElement.src = imageCardElement.src;
    imagePopupElement.alt = imageCardElement.alt;
    descriptionPopupElement.textContent = descriptionCardElement.textContent;
  });

  imageCardElement.addEventListener("click", () => {
    addingClassToOpenPopup(viewImagePopupElement);
  });
}

/**
 * Функция для отрисовки карточки в галерее.
 * @param card {Object} - Объект с данными о карточке.
 * @param card.link {String} - Поле со ссылкой на изображение.
 * @param card.name {String} - Поле с описанием места.
 * @param card.likes {Array} - Поле хранит массив лайков с информацией о том, кому понравилось.
 */
function createCardElement(card, id) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const imageCardElement = cardElement.querySelector(".card__image");
  const descriptionCardElement = cardElement.querySelector(".card__description");
  const countOfLikes = cardElement.querySelector(".card__like-counter");
  const deleteBtn = cardElement.querySelector(".card__delete-btn");

  imageCardElement.src = card.link;
  imageCardElement.alt = card.name;
  descriptionCardElement.textContent = card.name;
  countOfLikes.textContent = card.likes.length;

  if (card.owner._id !== id) {
    deleteBtn.remove();
  } else {
    addEventToDeleteCard(cardElement);
  }

  addEventToLikeCard(cardElement);
  addEventToOpenImagePopup(cardElement);

  return cardElement;
}

/**
 * Функция, выполняющая рендер галереи.
 * @param data {Array} - массив с данными для карточек в галерее.
 * @param data.createdAt {Data} - дата создания карточки.
 * @param data.likes {Array} - массив лайков с информацией о том, кому понравилось.
 * @param data.link {URL} - URL картинки места.
 * @param data.name {Text} - название места.
 * @param data.owner {Object} - владелец карточки.
 * @param galleryElement {Object} - элемент галереи, в котором требуется выполнить рендер карточек.
 * */
export function renderGallery(data, galleryElement, id) {
  if (data.length > 0) {
    data.forEach(card => {
      galleryElement.append(createCardElement(card, id));
    });
  }
}

/**
 * Функция для срабатывания создания карточки по нажатию на кнопку добавления новой карточки.
 */
export function addNewCard(placeURLInput, placeNameInput, galleryElement) {
  const newCardElement = createCardElement({link: placeURLInput.value, name: placeNameInput.value});

  galleryElement.prepend(newCardElement);
}
