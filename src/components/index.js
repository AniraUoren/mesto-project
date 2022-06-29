import "../pages/index.css"
import {closeDOMElement, openPopupWindow, closePopupWindow} from "./modal";
import createPlaceCard from "./card";
import {enableValidation} from "./validate";

/* --------------------------
* Открытие и закрытие модальных окон
* --------------------------*/

const popupWindowEditPerson = document.querySelector("#editPersonPopup"); //модальное окно на редактирование профиля
const btnOpenEditPerson = document.querySelector("#editPersonBtn"); //кнопка редактирования профиля
const btnCloseEditPerson = document.querySelector("#closeEditPersonPopup"); //кнопка закрытия попапа редактирования профиля

const popupAddPlace = document.querySelector("#addPlace"); //модальное окно для добавления места
const btnAddPlace = document.querySelector("#addPlaceBtn"); //кнопка добавления нового места
const btnCloseAddPlace = document.querySelector("#closeAddPlacePopup"); // кнопка закрытия модального окна на добавление места

openPopupWindow(btnOpenEditPerson, popupWindowEditPerson);
closePopupWindow(btnCloseEditPerson, popupWindowEditPerson);

openPopupWindow(btnAddPlace, popupAddPlace);
closePopupWindow(btnCloseAddPlace, popupAddPlace);
/* --------------------------
* Связываем поля формы и элементы на странице
* --------------------------*/

const nameInput = document.querySelector("#nameInput");
const professionInput = document.querySelector("#professionInput");
const namePerson = document.querySelector(".about-person__name");
const professionPerson = document.querySelector(".about-person__profession");
const submitEditPersonPopup = document.querySelector("#submitEditPersonPopup");

submitEditPersonPopup.addEventListener("click", evt => {
  evt.preventDefault();

  namePerson.textContent = nameInput.value;
  professionPerson.textContent = professionInput.value;

  closeDOMElement(popupWindowEditPerson);
});

/* --------------------------
* Работа с карточками галереи
* --------------------------*/
const templateOfGalleryCard = document.querySelector("#galleryElTemplate"); // Получаем шаблон карточки места в галлерее
const gallery = document.querySelector(".gallery"); //Находим элемент галлереи
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
] //Массив для инициализации карточек

//Циклом проходим массив для инициализации карточек и вставляем их в галлерею.
for (let i = 0; i < initialCards.length; i++) {
  const temp = createPlaceCard(templateOfGalleryCard, initialCards[i]);
  gallery.append(temp);
}
/*
* --------------------------
* */

// Добавление карточки на страницу
const namePlaceInput = document.querySelector("#namePlaceInput");
const linkPlaceInput = document.querySelector("#linkPlaceInput");
const submitAddPlacePopup = document.querySelector("#submitAddPlacePopup");

submitAddPlacePopup.addEventListener("click", evt => {
  evt.preventDefault();

  const temp = {
    name: "",
    link: ""
  }

  temp.name = namePlaceInput.value;
  temp.link = linkPlaceInput.value;

  gallery.prepend(createPlaceCard(templateOfGalleryCard, temp))

  closeDOMElement(popupAddPlace);
});

/* --------------------------
* Валидация полей форм
* --------------------------*/

enableValidation();
