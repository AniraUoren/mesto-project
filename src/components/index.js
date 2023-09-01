import "../pages/index.css";
import {initialCards} from "./initialData";
import {addNewCard, handlerToOpenImageViewerPopup, renderGallery} from "./card";
import {
  removeClassToClosePopup, addingClassToOpenPopup, handlerClosePopupOnOverlayOrCloseBtn
} from "./modal";
import {bindProfileFields, clearForm, submitAddingPersonInfo} from "./utils";
import {enableValidations} from "./validate";
import {validationConf} from "./config";
import {getPersonalInfo} from "./api";

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

/**
 * Помогает получить персональную информацию и прокинуть на страницу.
 */
function renderPersonalInfo() {
  getPersonalInfo()
    .then(data => {
      profileNameElement.textContent = data.name;
      profileAboutElement.textContent = data.about;
      profileAvatarElement.url = data.avatar;
      profileAvatarElement.alt = data.name;
    })
    .catch(err => {
      profileNameElement.textContent = "Нет данных";
      profileAboutElement.textContent = "Нет данных";
      profileAvatarElement.url = "";
      profileAvatarElement.alt = "Нет данных";
      console.error(err);
    });

}



renderPersonalInfo();
renderGallery(initialCards, galleryElement);
enableValidations(validationConf);
handlerAddingCardPopup();
handlerEditingPersonPopup();
handlerToOpenImageViewerPopup();

// getPersonalInfo()
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.error(err);
//   });

//
// (async () => {
//   try {
//     const data = await getPersonalInfo();
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// })();

