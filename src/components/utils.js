import {removeClassToClosePopup} from "./modal";
import {disableSubmitButton, hideInputError} from "./validate";
import {validationConf} from "./config";
import {deleteCard, updateAvatar, updatePersonalInfo} from "./api";
import {deleteCardPopupElement} from "./card";

let cardId = "";
let cardElement;

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
 * @param editProfileForm
 * @param nameProfileInput
 * @param aboutProfileInput
 * @param profileNameElement
 * @param profileAboutElement
 * @param profileAvatarElement
 * @param editProfilePopupElement
 */
export function submitAddingPersonInfo(editProfileForm, nameProfileInput, aboutProfileInput, profileNameElement, profileAboutElement, profileAvatarElement, editProfilePopupElement) {
  editProfileForm.addEventListener("submit", evt => {
    evt.preventDefault();

    updatePersonalInfo(nameProfileInput.value, aboutProfileInput.value)
        .then(data => {
          associatePersonalInfo(data, profileNameElement, profileAboutElement, profileAvatarElement);
        });

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
 * Позволяет отрисовать персональные данные на странице.
 * @param info {Response} - персональные данные с сервера.
 * @param info.about {Text} - занятие пользователя.
 * @param info.avatar {URL} - url на аватар пользователя.
 * @param info.name {Text} - имя пользователя.
 * @param info.cohort {Text} - номер когорты.
 * @param name {Object} - элемент на странице содержащий имя.
 * @param about {Object} - элемент на странице содержащий род деятельности.
 * @param avatar {Object} - элемент на странице содержащий аватар.
 */
export function associatePersonalInfo(info, name, about, avatar) {
  name.textContent = info.name;
  about.textContent = info.about;
  avatar.src = info.avatar;
  avatar.alt = info.name;
}

/**
 * Выполняет непосредственно запрос на сервер на удаление, удаление карточки и управление слушателем и попапом при удачном ответе.
 * @param evt {Object} - объект эвента.
 */
function handlerDeletingCard(evt){
  evt.preventDefault();

  deleteCard(cardId)
    .then(res => {
      console.log(res);
      cardElement.remove();
      removeClassToClosePopup(deleteCardPopupElement);
    });
  removeEventListener("submit", handlerDeletingCard);
}

/**
 * Функция отвечающая за срабатывание удаления конкретной карточки.
 * @param card {Object} - удаляемая карточка.
 */
export function handlerSubmitDeleteCard(card){
  const deleteCardForm = deleteCardPopupElement.querySelector(".popup__form");
  cardId = card.dataset.id;
  cardElement = card;
  deleteCardForm.addEventListener("submit", handlerDeletingCard);
}

/**
 *
 */
export function handlerEditingAvatar(popup, form, imageElement) {
  const input = form.querySelector(".popup__input");
  form.addEventListener("submit", evt => {
    evt.preventDefault();

    updateAvatar(input.value)
      .then(res => {
        imageElement.src = input.value;
        removeClassToClosePopup(popup);
        console.log(res);
      });
  });
}
