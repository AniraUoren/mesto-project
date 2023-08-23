import {removeClassToClosePopup, addingClassToOpenPopup} from "./modal";

/*Попап для просмотра изображения и его элементы*/
const viewImagePopupElement = document.querySelector("#imageViewerPopup");
const imagePopupElement = viewImagePopupElement.querySelector(".popup__image");
const descriptionPopupElement = viewImagePopupElement.querySelector(".popup__image-description");
const closeViewImagePopupBtn = viewImagePopupElement.querySelector(".popup__close-btn");

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

  closeViewImagePopupBtn.addEventListener("click", () => {
    removeClassToClosePopup(viewImagePopupElement);
  });
}

/**
 * Функция для отрисовки карточки в галерее.
 * @param card {Object} - Объект с данными о карточке.
 * @param card.link {String} - Поле со ссылкой на изображение.
 * @param card.name {String} - Поле с описанием места.
 */
function createCardElement(card) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const imageCardElement = cardElement.querySelector(".card__image");
  const descriptionCardElement = cardElement.querySelector(".card__description");

  imageCardElement.src = card.link;
  imageCardElement.alt = card.name;
  descriptionCardElement.textContent = card.name;

  addEventToLikeCard(cardElement);
  addEventToDeleteCard(cardElement);
  addEventToOpenImagePopup(cardElement);

  return cardElement;
}

/**
 * Функция, выполняющая рендер галереи.
 * @param data {Array} - массив с данными для карточек в галерее.
 * @param galleryElement {Object} - элемент галереи, в котором требуется выполнить рендер карточек.
 * */
export function renderGallery(data, galleryElement) {
  if (data.length > 0) {
    data.forEach(card => {
      galleryElement.append(createCardElement(card));
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
