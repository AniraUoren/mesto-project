/* --------------------------
* Открытие и закрытие модальных окон
* --------------------------*/

const popupWindowEditPerson = document.querySelector("#editPersonPopup"); //модальное окно на редактирование профиля
const btnOpenEditPerson = document.querySelector("#editPersonBtn"); //кнопка редактирования профиля
const btnCloseEditPerson = document.querySelector("#closeEditPersonPopup"); //кнопка закрытия попапа редактирования профиля

const popupAddPlace = document.querySelector("#addPlace"); //модальное окно для добавления места
const btnAddPlace = document.querySelector("#addPlaceBtn"); //кнопка добавления нового места
const btnCloseAddPlace = document.querySelector("#closeAddPlacePopup"); // кнопка закрытия модального окна на добавление места

/**
 * Функция для добавления возможности открыть попап
 * @param openBtn - Кнопка для открытия попапа.
 * @param popupWindow - Модальное окно с которым работаем.
 */

function openPopupWindow(openBtn, popupWindow) {
  openBtn.addEventListener("click", () => {
    popupWindow.classList.remove("popup_closed");
  })
}

/**
 * Функция для добавления возможности закрыть попап
 * @param closeBtn - Кнопка для закрытия попапа.
 * @param popupWindow - Модальное окно с которым работаем.
 */
function closePopupWindow(closeBtn, popupWindow) {
  closeBtn.addEventListener("click", () => {
    popupWindow.classList.add("popup_closed");
  })
}

openPopupWindow(btnOpenEditPerson, popupWindowEditPerson);
closePopupWindow(btnCloseEditPerson, popupWindowEditPerson);

openPopupWindow(btnAddPlace, popupAddPlace);
closePopupWindow(btnCloseAddPlace, popupAddPlace);

/*
* --------------------------
* */

// Связываем поля формы и элементы на странице
const nameInput = document.querySelector("#nameInput");
const professionInput = document.querySelector("#professionInput");
const namePerson = document.querySelector(".about-person__name");
const professionPerson = document.querySelector(".about-person__profession");
const submitEditPersonPopup = document.querySelector("#submitEditPersonPopup");

submitEditPersonPopup.addEventListener("click", evt => {
  evt.preventDefault();

  namePerson.textContent = nameInput.value;
  professionPerson.textContent = professionInput.value;

  popupWindowEditPerson.classList.add("popup_closed");
});

/**
 * Функция для рендера карточки из галереи и создания событий для нее по объекту.
 * @param template - Шаблон для создания карточки.
 * @param initObj - Объект для инициализации карточки.
 */
function createPlaceCard(template, initObj) {
  const elem = template.content.firstElementChild.cloneNode(true); //Получаем элемент из шаблона.
  const watchImagesPopup = document.querySelector("#watchImage"); //Ищем попап для просмотра изображения
  const closeWatchImagesPopup = document.querySelector("#closeWatchImagesPopup"); // Ищем кнопку закрытия попапа для просмотра изображения


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
    watchImagesPopup.querySelector(".popup__image").setAttribute("src", elem.querySelector(".gallery__image").src);
    watchImagesPopup.querySelector(".popup__image").setAttribute("alt", elem.querySelector(".gallery__image").alt);
    watchImagesPopup.querySelector(".popup__image-description").innerText = elem.querySelector(".gallery__image").alt;
    watchImagesPopup.classList.remove("popup_closed");
  })

  //Вешаем на кнопку закрытия попапа событие
  closeWatchImagesPopup.addEventListener("click", () => {
    watchImagesPopup.classList.add("popup_closed");
  });

  //Возвращаем готовую карточку со всеми слушателями
  return elem;
}

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

  popupAddPlace.classList.add("popup_closed");
});
