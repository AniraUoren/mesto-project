const overlayElement = document.querySelector(".overlay");
const editProfilePopupElement = document.querySelector(".popup__edit-profile");
const addPlacePopupElement = document.querySelector(".popup__add-place");
const viewImagePopupElement = document.querySelector(".popup__image-viewer");

const editProfileBtn = document.querySelector(".profile__edit-btn");
const addPlaceBtn = document.querySelector(".profile__add-btn");
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

addListenerOnBtn(editProfileBtn, editProfilePopupElement);
addListenerOnBtn(addPlaceBtn, addPlacePopupElement);
