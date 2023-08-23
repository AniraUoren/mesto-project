import {removeClassToClosePopup} from "./modal";

/**
 * Функция связывает поля профиля с полями формы редактирования профиля.
 */
export function bindProfileFields(nameProfileInput, aboutProfileInput, profileNameElement, profileAboutElement) {
  nameProfileInput.value = profileNameElement.textContent;
  aboutProfileInput.value = profileAboutElement.textContent;
}

/**
 * Обрабатывает сабмит формы редактирования персональных данных.
 * Прокидывает значения из полей формы и сбрасывает их значение.
 */
export function submitAddingPersonInfo(editProfileForm,nameProfileInput, aboutProfileInput, profileNameElement, profileAboutElement, editProfilePopupElement) {
  editProfileForm.addEventListener("submit", evt => {
    evt.preventDefault();

    profileNameElement.textContent = nameProfileInput.value;
    profileAboutElement.textContent = aboutProfileInput.value;

    editProfileForm.reset();

    removeClassToClosePopup(editProfilePopupElement);
  });
}
