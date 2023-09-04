import "../pages/index.css";
import {addNewCard, renderGallery, viewImagePopupElement} from "./card";
import {
  removeClassToClosePopup, addingClassToOpenPopup, handlerClosePopupOnOverlayOrCloseBtn
} from "./modal";
import {associatePersonalInfo, bindProfileFields, clearForm, submitAddingPersonInfo} from "./utils";
import {enableValidations} from "./validate";
import {validationConf} from "./config";
import {getCards, getPersonalInfo} from "./api";

/*Попапы*/
const editProfilePopupElement = document.querySelector("#editProfilePopup");
const addPlacePopupElement = document.querySelector("#addCardPopup");

/*Кнопки для попапов*/
const editProfileBtn = document.querySelector(".profile__edit-btn");
const addPlaceBtn = document.querySelector(".profile__add-btn");

/*Поля профиля пользователя*/
const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");
const profileAvatarElement = document.querySelector(".profile__avatar");

/*Элементы попапов*/
const nameProfileInput = editProfilePopupElement.querySelector("#personName");
const aboutProfileInput = editProfilePopupElement.querySelector("#personAbout");
// const submitEditingProfileBtn = document.querySelector("#personSubmitPopup");
const editProfileForm = editProfilePopupElement.querySelector(".popup__form");
const placeNameInput = addPlacePopupElement.querySelector("#placeName");
const placeURLInput = addPlacePopupElement.querySelector("#placeURL");
const addPlaceForm = addPlacePopupElement.querySelector(".popup__form");

/*Галерея*/
const galleryElement = document.querySelector(".gallery");

/************************************/

/**
 * Вспомогательная управляющая функция, которая помогает управлять попапом добавления новой карточки.
 */
function handlerAddingCardPopup() {
  addPlaceBtn.addEventListener("click", () => {
    clearForm(addPlacePopupElement.querySelector("form"));
    addingClassToOpenPopup(addPlacePopupElement);
  });

  addPlacePopupElement.addEventListener("click", handlerClosePopupOnOverlayOrCloseBtn);

  addPlaceForm.addEventListener("submit", evt => {
    evt.preventDefault();

    addNewCard(placeURLInput, placeNameInput, galleryElement);
    removeClassToClosePopup(addPlacePopupElement);
    clearForm(addPlaceForm);
  });
}

/**
 * Функция для управления поведением попапа редактирования информации пользователя.
 */
function handlerEditingPersonPopup() {
  editProfileBtn.addEventListener("click", () => {
    clearForm(addPlacePopupElement.querySelector("form"));
    bindProfileFields(nameProfileInput, aboutProfileInput, profileNameElement, profileAboutElement);
    addingClassToOpenPopup(editProfilePopupElement);
  });
  submitAddingPersonInfo(editProfileForm, nameProfileInput, aboutProfileInput, profileNameElement, profileAboutElement, editProfilePopupElement);

  editProfilePopupElement.addEventListener("click", handlerClosePopupOnOverlayOrCloseBtn);
}

Promise.all([getPersonalInfo(), getCards()])
  .then(data => {
    const [profileInfo, cards] = data;
    console.log(profileInfo);
    associatePersonalInfo(profileInfo, profileNameElement, profileAboutElement, profileAvatarElement);

    console.log(cards);
    renderGallery(cards, galleryElement);

  })
  .catch(err => {
    console.error(err);
  });

enableValidations(validationConf);
handlerAddingCardPopup();
handlerEditingPersonPopup();
viewImagePopupElement.addEventListener("click", handlerClosePopupOnOverlayOrCloseBtn);





//
// (async () => {
//   try {
//     const data = await getPersonalInfo();
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// })();

