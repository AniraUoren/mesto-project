import "../pages/index.css"
import {closePopup, openPopupWindow, closePopupWindow, openPersonPopupHelper} from "./modal";
import createPlaceCard from "./card";
import {enableValidation} from "./validate";
import {initialCards, config} from "./config";

/* --------------------------
* Открытие и закрытие модальных окон
* --------------------------*/

const popupWindowEditPerson = document.querySelector("#editPersonPopup"); //модальное окно на редактирование профиля
const btnOpenEditPerson = document.querySelector("#editPersonBtn"); //кнопка редактирования профиля
const btnCloseEditPerson = document.querySelector("#closeEditPersonPopup"); //кнопка закрытия попапа редактирования профиля

const popupAddPlace = document.querySelector("#addPlace"); //модальное окно для добавления места
const btnAddPlace = document.querySelector("#addPlaceBtn"); //кнопка добавления нового места
const btnCloseAddPlace = document.querySelector("#closeAddPlacePopup"); // кнопка закрытия модального окна на добавление места

// openPopupWindow(btnOpenEditPerson, popupWindowEditPerson);
// closePopupWindow(btnCloseEditPerson, popupWindowEditPerson);

openPopupWindow(btnAddPlace, popupAddPlace);
closePopupWindow(btnCloseAddPlace, popupAddPlace);
/* --------------------------
* Связываем поля формы и элементы на странице
* --------------------------*/
const namePerson = document.querySelector(".about-person__name");
const professionPerson = document.querySelector(".about-person__profession");
const nameInput = document.querySelector("#nameInput");
const professionInput = document.querySelector("#professionInput");

openPersonPopupHelper(btnOpenEditPerson, popupWindowEditPerson, namePerson, professionPerson, nameInput, professionInput);
closePopupWindow(btnCloseEditPerson, popupWindowEditPerson);

popupWindowEditPerson.addEventListener("submit", () => {
  namePerson.textContent = nameInput.value;
  professionPerson.textContent = professionInput.value;

  closePopup(popupWindowEditPerson);
});

/* --------------------------
* Работа с карточками галереи
* --------------------------*/
const templateOfGalleryCard = document.querySelector("#galleryElTemplate"); // Получаем шаблон карточки места в галлерее
const gallery = document.querySelector(".gallery"); //Находим элемент галлереи
// Добавление карточки на страницу
const namePlaceInput = document.querySelector("#namePlaceInput");
const linkPlaceInput = document.querySelector("#linkPlaceInput");
const popupForWatchImages = document.querySelector("#watchImage"); //Ищем попап для просмотра изображения
const buttonToCloseWatchImagesPopup = document.querySelector("#closeWatchImagesPopup"); // Ищем кнопку закрытия попапа для просмотра изображения


//Циклом проходим массив для инициализации карточек и вставляем их в галлерею.
for (let i = 0; i < initialCards.length; i++) {
  const temp = createPlaceCard(templateOfGalleryCard, initialCards[i], popupForWatchImages);
  gallery.append(temp);
}


popupAddPlace.addEventListener("submit", () => {

  const temp = {
    name: "",
    link: ""
  }

  temp.name = namePlaceInput.value;
  temp.link = linkPlaceInput.value;

  gallery.prepend(createPlaceCard(templateOfGalleryCard, temp, popupForWatchImages));

  namePlaceInput.value = "";
  linkPlaceInput.value = "";

  popupAddPlace.querySelector("button[type=submit]").classList.add("popup__submit_disabled");
  popupAddPlace.querySelector("button[type=submit]").setAttribute("disabled", "disabled");

  closePopup(popupAddPlace);
});

console.log(popupAddPlace)

//Вешаем на кнопку закрытия попапа событие
// buttonToCloseWatchImagesPopup.addEventListener("click", () => {
//   closePopup(popupForWatchImages);
// });

closePopupWindow(buttonToCloseWatchImagesPopup, popupForWatchImages);

/* --------------------------
* Валидация полей форм
* --------------------------*/

enableValidation(config);
