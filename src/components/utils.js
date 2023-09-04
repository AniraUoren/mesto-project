import {removeClassToClosePopup} from "./modal";
import {disableSubmitButton, hideInputError} from "./validate";
import {validationConf} from "./config";

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
export function submitAddingPersonInfo(editProfileForm, nameProfileInput, aboutProfileInput, profileNameElement, profileAboutElement, editProfilePopupElement) {
  editProfileForm.addEventListener("submit", evt => {
    evt.preventDefault();

    profileNameElement.textContent = nameProfileInput.value;
    profileAboutElement.textContent = aboutProfileInput.value;

    editProfileForm.reset();

    removeClassToClosePopup(editProfilePopupElement);
  });
}

/**
 * Очищение всех полей с ошибкой в форме.
 * @param form {Object} - форма в которой зачищаем поля.
 * @param validationConf {Object} - конфигурация.
 */
export function clearAllErrorFields(form, validationConf) {
  const inputsList = Array.from(form.querySelectorAll(validationConf.inputClass));

  inputsList.forEach(input => {
    hideInputError(form, input, validationConf);
  });
}

/**
 * Позволяет сбросить значения полей формы, очистить поля с
 * ошибками и деактивировать кнопку сабмита.
 * @param form {Object} - форма, которую очищаем.
 */
export function clearForm(form) {
  form.reset();
  clearAllErrorFields(form, validationConf);
  disableSubmitButton(form, validationConf);
}

/**
 *
 * @param info
 * @param name
 * @param about
 * @param avatar
 */
export function associatePersonalInfo(info, name, about, avatar) {
  name.textContent = info.name;
  about.textContent = info.about;
  avatar.url = info.avatar;
  avatar.alt = info.name;
}
