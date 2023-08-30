import "../pages/index.css";
import {initialCards} from "./initialData";
import {addNewCard, renderGallery} from "./card";
import {
  removeClassToClosePopup,
  addingClassToOpenPopup,
  addEvtListenerOnCloseByOverlay, handlerClosePopupOnEsc
} from "./modal";
import {bindProfileFields, clearAllErrorFields, submitAddingPersonInfo} from "./utils";
import {disableSubmitButton, enableValidations} from "./validate";
import {validationConf} from "./config";

/*Попапы*/
const editProfilePopupElement = document.querySelector("#editProfilePopup");
const addPlacePopupElement = document.querySelector("#addCardPopup");

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
const placeNameInput = addPlacePopupElement.querySelector("#placeName");
const placeURLInput = addPlacePopupElement.querySelector("#placeURL");
const addPlaceForm = addPlacePopupElement.querySelector(".popup__form");
const closeAddPlacePopupBtn = addPlacePopupElement.querySelector(".popup__close-btn");

/*Галерея*/
const galleryElement = document.querySelector(".gallery");

/************************************/

/**
 * Вспомогательная управляющая функция, которая помогает управлять попапом добавления новой карточки.
 */
function handlerAddingCardPopup() {
  addPlaceBtn.addEventListener("click", () => {
    addingClassToOpenPopup(addPlacePopupElement);
    addEvtListenerOnCloseByOverlay(addPlacePopupElement);
  });

  closeAddPlacePopupBtn.addEventListener("click", () => {
    removeClassToClosePopup(addPlacePopupElement);
    addPlaceForm.reset();
    clearAllErrorFields(addPlacePopupElement.querySelector("form"), validationConf);
    disableSubmitButton(addPlacePopupElement, validationConf);
    document.removeEventListener("keydown", handlerClosePopupOnEsc);
  });

  addPlaceForm.addEventListener("submit", evt => {
    evt.preventDefault();

    addNewCard(placeURLInput, placeNameInput, galleryElement);
    removeClassToClosePopup(addPlacePopupElement);
    addPlaceForm.reset();
  });
}

/**
 * Функция для управления поведением попапа редактирования информации пользователя.
 */
function handlerEditingPersonPopup() {
  editProfileBtn.addEventListener("click", () => {
    bindProfileFields(nameProfileInput, aboutProfileInput, profileNameElement, profileAboutElement);
    addingClassToOpenPopup(editProfilePopupElement);
    addEvtListenerOnCloseByOverlay(editProfilePopupElement);
  });
  submitAddingPersonInfo(editProfileForm, nameProfileInput, aboutProfileInput, profileNameElement, profileAboutElement, editProfilePopupElement);

  closeProfilePopupBtn.addEventListener("click", () => {
    removeClassToClosePopup(editProfilePopupElement);
    document.removeEventListener("keydown", handlerClosePopupOnEsc);
  });
}


renderGallery(initialCards, galleryElement);
enableValidations(validationConf);
handlerAddingCardPopup();
handlerEditingPersonPopup();
