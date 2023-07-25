/*Попапы*/
const overlayElement = document.querySelector(".overlay");
const editProfilePopupElement = document.querySelector(".popup__edit-profile");
const addPlacePopupElement = document.querySelector(".popup__add-place");
const viewImagePopupElement = document.querySelector(".popup__image-viewer");

/*Кнопки для попапов*/
const editProfileBtn = document.querySelector(".profile__edit-btn");
const addPlaceBtn = document.querySelector(".profile__add-btn");

/*Поля профиль пользователя*/
const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");

/**
 * Функция для простого навешивания слушателей на попап для его открытия и закрытия.
 * @param button {Element} - кнопка открытия попапа;
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
 * Функция связывает поля профиля с полями фармф редактирования профиля
 */
function bindProfileFields() {
  const nameAboutValue = profileNameElement.textContent;
  const aboutProfileValue = profileAboutElement.textContent;

  console.log(profileNameElement)
  console.log(profileAboutElement)
  console.log(nameAboutValue)
  console.log(aboutProfileValue)

  const nameProfileInput= editProfilePopupElement.querySelector("#personName");
  const aboutProfileInput= editProfilePopupElement.querySelector("#personAbout");

  if (nameAboutValue && aboutProfileValue) {
    nameProfileInput.value = nameAboutValue;
    aboutProfileInput.value = aboutProfileValue;
  }
}

/*TODO НАдо собрать по попапам в отдельную функцию навешивание логики, слушателей и т.п.*/
addListenerOnBtn(editProfileBtn, editProfilePopupElement);
addListenerOnBtn(addPlaceBtn, addPlacePopupElement);
bindProfileFields();
