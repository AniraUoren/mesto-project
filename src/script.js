import "./pages/index.css";
import {initialCards} from "./initialData";

/*Попапы*/
const editProfilePopupElement = document.querySelector("#editProfilePopup");
const addPlacePopupElement = document.querySelector("#addCardPopup");
const viewImagePopupElement = document.querySelector("#imageViewerPopup");

/*Кнопки для попапов*/
const editProfileBtn = document.querySelector(".profile__edit-btn");
const addPlaceBtn = document.querySelector(".profile__add-btn");

/*Поля профиля пользователя*/
const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");

/*Элементы попапов*/
const nameProfileInput = editProfilePopupElement.querySelector("#personName");
const aboutProfileInput = editProfilePopupElement.querySelector("#personAbout");
// const submitEditingProfileBtn = document.querySelector("#personSubmitPopup");
const editProfileForm = editProfilePopupElement.querySelector(".popup__form");
const closeProfilePopupBtn = editProfilePopupElement.querySelector(".popup__close-btn");
const imagePopupElement = viewImagePopupElement.querySelector(".popup__image");
const descriptionPopupElement = viewImagePopupElement.querySelector(".popup__image-description");
const placeNameInput = addPlacePopupElement.querySelector("#placeName");
const placeURLInput = addPlacePopupElement.querySelector("#placeURL");
const closeViewImagePopupBtn = viewImagePopupElement.querySelector(".popup__close-btn");
const addPlaceForm = addPlacePopupElement.querySelector(".popup__form");
const closeAddPlacePopupBtn = addPlacePopupElement.querySelector(".popup__close-btn");

  /*Галерея*/
const galleryElement = document.querySelector(".gallery");


/**
 * Открытие нужного попапа через добавление класса.
 * @param popup {Element} - попап который следует открыть.
 */
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

/**
 * Закрытие нужного попапа через удаление класса.
 * @param popup {Element} - попап который следует закрыть.
 */
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

/**
 * Функция связывает поля профиля с полями формы редактирования профиля.
 */
function bindProfileFields() {
  nameProfileInput.value = profileNameElement.textContent;
  aboutProfileInput.value = profileAboutElement.textContent;
}

/**
 * Обрабатывает сабмит формы редактирования перс, данных. Прокидывает значения из полей формы и сбрасывает их значение.
 */
function submitAddingPersonInfo() {
  editProfileForm.addEventListener("submit", evt => {
    evt.preventDefault();

    profileNameElement.textContent = nameProfileInput.value;
    profileAboutElement.textContent = aboutProfileInput.value;

    editProfileForm.reset();

    closePopup(editProfilePopupElement);
  });
}

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
    openPopup(viewImagePopupElement);
  });

  closeViewImagePopupBtn.addEventListener("click", () => {
    closePopup(viewImagePopupElement);
  });
}

/**
 * Функция для отрисовки карточки в галерее.
 * @param card {Object} - Объект с данными о карточке.
 * @param card.link {String} - Поле с ссылкой на изображение.
 * @param card.name {String} - Поле с описание места.
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
 */
function renderGallery() {
  if (initialCards.length > 0) {
    initialCards.forEach(card => {
      galleryElement.append(createCardElement(card));
    });
  }
}

/**
 * Функция для срабатывания создания карточки по нажатию на кнопку добавления новой карточки.
 */
function addNewCard() {
  const newCardElement = createCardElement({link: placeURLInput.value, name: placeNameInput.value});

  galleryElement.prepend(newCardElement);
}

/**
 * Вспомогательная управляющая функция, которая помогает управлять попапом добавления новой карточки.
 */
function handlerAddingCardPopup() {
  addPlaceBtn.addEventListener("click", () => {
    openPopup(addPlacePopupElement);
  });

  closeAddPlacePopupBtn.addEventListener("click", () => {
    closePopup(addPlacePopupElement);
    addPlaceForm.reset();
  });

  addPlaceForm.addEventListener("submit", evt => {
    evt.preventDefault();

    addNewCard();
    closePopup(addPlacePopupElement);
    addPlaceForm.reset();
  });
}

/**
 * Функция для управления поведением попапа редактирования информации пользователя.
 */
function handlerEditingPersonPopup() {
  editProfileBtn.addEventListener("click", () => {
    bindProfileFields();
    openPopup(editProfilePopupElement);
  });

  submitAddingPersonInfo();

  closeProfilePopupBtn.addEventListener("click", () => {
    closePopup(editProfilePopupElement);
  });
}


renderGallery();
handlerAddingCardPopup();
handlerEditingPersonPopup();
