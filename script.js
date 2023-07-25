/*Попапы*/
const overlayElement = document.querySelector(".overlay");
const editProfilePopupElement = document.querySelector(".popup__edit-profile");
const addPlacePopupElement = document.querySelector(".popup__add-place");
const viewImagePopupElement = document.querySelector(".popup__image-viewer");

/*Кнопки для попапов*/
const editProfileBtn = document.querySelector(".profile__edit-btn");
const addPlaceBtn = document.querySelector(".profile__add-btn");

/*Поля профиля пользователя*/
const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");
const nameAboutValue = profileNameElement.textContent;
const aboutProfileValue = profileAboutElement.textContent;

/*Элементы попапа редактирования профиля*/
const nameProfileInput = editProfilePopupElement.querySelector("#personName");
const aboutProfileInput = editProfilePopupElement.querySelector("#personAbout");
// const submitEditingProfileBtn = document.querySelector("#personSubmitPopup");
const editPersonForm = editProfilePopupElement.querySelector(".popup__form");

/*Данные для инициализации карточек*/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/**
 * Функция для простого навешивания слушателей на попап для его открытия и закрытия.
 * @param button {Element} - кнопка открытия попапа.
 * @param popup {Element} - попап, который следует открыть при нажатии на button.
 */
function addListenerOnBtn(button, popup) {
  const closeBtn = popup.querySelector(".popup__close-btn");

  button.addEventListener("click", () => {
    overlayElement.classList.add("overlay_opened");
    popup.classList.add("popup_opened");
  })

  closeBtn.addEventListener("click", () => {
    overlayElement.classList.remove("overlay_opened");
    popup.classList.remove("popup_opened");
  })
}

/**
 * Функция связывает поля профиля с полями фармф редактирования профиля.
 */
function bindProfileFields() {
  if (nameAboutValue && aboutProfileValue) {
    nameProfileInput.value = nameAboutValue;
    aboutProfileInput.value = aboutProfileValue;
  }
}

/**
 * Обрабатывает сабмит формы редактирования перс, данных. Прокидывает значения из полей формы и сбрасывает их значение.
 */
function addingPersonInfo() {
  editPersonForm.addEventListener("submit", evt => {
    evt.preventDefault();

    profileNameElement.textContent = nameProfileInput.value;
    profileAboutElement.textContent = aboutProfileInput.value;

    nameProfileInput.value = "";
    aboutProfileInput.value = "";

    overlayElement.classList.remove("overlay_opened");
    editProfilePopupElement.classList.remove("popup_opened");
  })
}

/*TODO НАдо собрать по попапам в отдельную функцию навешивание логики, слушателей и т.п.*/
addListenerOnBtn(editProfileBtn, editProfilePopupElement);
addListenerOnBtn(addPlaceBtn, addPlacePopupElement);
bindProfileFields();
addingPersonInfo();

/**
 * Функция для отрисовки карточки в галерее.
 * @param card {Object} - Объект с данными о карточке.
 * @param card.link {String} - Поле с ссылкой на изображение.
 * @param card.name {String} - Поле с описание места.
 */
function renderCard(card) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const imageCardElement = cardElement.querySelector(".card__image");
  const descriptionCardElement = cardElement.querySelector(".card__description");

  imageCardElement.src = card.link;
  imageCardElement.alt = card.name;
  descriptionCardElement.textContent = card.name;

  return cardElement;
}

/**
 * Функция, выполняющая рендер галереи.
 */
function renderGallery() {
  const galleryElement = document.querySelector(".gallery");

  if (initialCards.length > 0) {
    initialCards.forEach(card => {
      galleryElement.append(renderCard(card));
    })
  }
}

renderGallery();
