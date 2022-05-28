//Открытие и закрытие модального окна
const popupWindowEditPerson = document.getElementById("editPersonPopup");
const btnOpenEditPerson = document.getElementById("editPersonBtn");
const btnCloseEditPerson = document.getElementById("closeEditPersonPopup");

btnOpenEditPerson.addEventListener("click", () => {
  popupWindowEditPerson.classList.remove("popup_closed");
});

btnCloseEditPerson.addEventListener("click", () => {
  popupWindowEditPerson.classList.add("popup_closed");
});

// Связываем поля формы и элементы на странице
const namePerson = document.querySelector(".about-person__name");
const professionPerson = document.querySelector(".about-person__profession");
const nameInput = document.getElementById("nameInput");
const professionInput = document.getElementById("professionInput");

nameInput.value = namePerson.innerText;
professionInput.value = professionPerson.innerText;

//Редактирование имени и информации о себе
const submitEditPersonPopup = document.getElementById("submitEditPersonPopup");

submitEditPersonPopup.addEventListener("click", evt => {
  evt.preventDefault();

  namePerson.textContent = nameInput.value;
  professionPerson.textContent = professionInput.value;

  popupWindowEditPerson.classList.add("popup_closed");
});

// Функция для создания события клика на кнопку лайк
function initialLikesAction(likeBtns) {

  for (let i = 0; i < likeBtns.length; i++) {
    likeBtns[i].addEventListener("click", () => {
      likeBtns[i].classList.toggle("gallery__like_active")
    })
  }


}

// Функция для создания события клика на кнопку удаления карточки
function initialDeleteAction(deleteBtns) {
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", () => {
      deleteBtns[i].parentNode.remove();


    })
  }
}

// Функция для создания события просмотра изображения карточки
function initialWatcherOfImagesAction(images){
  const watchImagesPopup = document.getElementById("watchImage");
  const closeWatchImagesPopup = document.getElementById("closeWatchImagesPopup");

  for (let i = 0; i < images.length; i++){
    images[i].addEventListener("click", () => {
      console.log(images[i])
      const imgInPopup = watchImagesPopup.querySelector(".popup__image");
      const descInPopup = watchImagesPopup.querySelector(".popup__image-description");

      imgInPopup.setAttribute("src", images[i].getAttribute("src"));
      imgInPopup.setAttribute("alt", images[i].getAttribute("alt"));
      descInPopup.textContent = images[i].getAttribute("alt");

      watchImagesPopup.classList.remove("popup_closed")
    })
  }

  closeWatchImagesPopup.addEventListener("click", () => {
    watchImagesPopup.classList.add("popup_closed");
  })
}

//Функция отрисовывающая карточки в галерее по шаблону
function addGalleryCards(arr) {
  gallery.innerHTML = ""; //очищаем галерею для перерисовки

  for (let i = 0; i < arr.length; i++) {
    gallery.insertAdjacentHTML('beforeend',
      `
            <div class="gallery__el" id="${i}">
              <img src="${arr[i].link}" alt="${arr[i].name}" class="gallery__image">
              <h3 class="gallery__el-header">${arr[i].name}</h3>
              <button class="gallery__like" type="button">Лайк</button>
              <button class="gallery__delete" type="button">Удалить</button>
            </div>
           `)
  }

  const likeButtons = document.querySelectorAll(".gallery__like");
  initialLikesAction(likeButtons);

  const deleteButtons = document.querySelectorAll(".gallery__delete");
  initialDeleteAction(deleteButtons);

  const imagesOfElementInGallery = document.querySelectorAll(".gallery__image");
  initialWatcherOfImagesAction(imagesOfElementInGallery);
}

const gallery = document.querySelector(".gallery");
let initialCards = [
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
]
addGalleryCards(initialCards);


// Открытие и закрытие формы для добавления новой карточки
const popupAddPlace = document.getElementById("addPlace");
const btnAddPlace = document.getElementById("addPlaceBtn");
const btnCloseAddPlace = document.getElementById("closeAddPlacePopup");

btnAddPlace.addEventListener("click", () => {
  popupAddPlace.classList.remove("popup_closed");
});

btnCloseAddPlace.addEventListener("click", () => {
  popupAddPlace.classList.add("popup_closed");
});


// Добавление карточки на страницу
const namePlaceInput = document.getElementById("namePlaceInput");
const linkPlaceInput = document.getElementById("linkPlaceInput");
const submitAddPlacePopup = document.getElementById("submitAddPlacePopup");

submitAddPlacePopup.addEventListener("click", evt => {
  evt.preventDefault();

  let temp = {
    name: "",
    link: ""
  }

  temp.name = namePlaceInput.value;
  temp.link = linkPlaceInput.value;

  initialCards.unshift(temp);

  addGalleryCards(initialCards);

  popupAddPlace.classList.add("popup_closed");
});
