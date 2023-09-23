/**
 * Убирает или добавляет лайк карточке.
 */
import {Api} from "../components/Api";
import {apiConf, btnForPopup, popups, validationConf} from "./const";
import {PopupWithImage} from "../components/PopupWithImage";
import {PopupWithForm} from "../components/PopupWithForm";
import {FormValidator} from "../components/FormValidator";
import {Section} from "../components/Section";
import {Card} from "../components/Card";
import {UserInfo} from "../components/UserInfo";
import {data} from "autoprefixer";

const api = new Api(apiConf);
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
  nameInputSelector: "#personName",
  aboutInputSelector: "#personAbout",
  handlerUpdateUserAvatar,
  handlerUpdateUserInfo
});
const popupViewer = new PopupWithImage("#imageViewerPopup");
let userId = "";

/**
 *
 */
export function handlerRenderPage() {
  Promise.all([api.getPersonalInfo(), api.getCards()])
    .then(data => {
      const [profileInfo, cartData] = data;
      console.log(profileInfo);
      console.log(cartData);

      userInfo.render(profileInfo);
      userId = profileInfo._id;

      const cardList = new Section({
        data: cartData,
        renderer: (cardData) => {
          const card = new Card({
            data: cardData,
            handlerLikeCart: handlerLikeCart,
            handlerOpenImageViewer: handlerOpenImageViewer
          }, "#card");
          const cartEl = card.createCard(userId);
          cardList.setItem(cartEl);
        }
      }, ".gallery");

      cardList.renderItems();
    });
}

/**
 * Убирает или добавляет лайк карточке.
 */
export function handlerLikeCart() {
  if (!this._isLikedByMe) {
    api.putLikeOnCard(this._cardId)
      .then(data => {
        this._toggleLike(data);
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    api.deleteLikeOnCard(this._cardId)
      .then(data => {
        this._toggleLike(data);
      })
      .catch(err => {
        console.error(err);
      });
  }
}

/**
 * Отправляет новые данные пользователя на сервер и обновляет информацию на странице.
 * @param name {String} - новое имя.
 * @param about {String} - новый вид деятельности.
 */
export function handlerUpdateUserInfo({name, about}) {
  api.updatePersonalInfo(name, about)
    .then(data => {
      userInfo.updateUserInfo(data); // тут нужен класс из-под которого работает
    })
    .catch(err => {
      console.error(err);
    });
}

/**
 * Отправляет новую ссылку на аватар на сервер и обновляет элемент на странице.
 * @param url {String} - URL аватара.
 */
export function handlerUpdateUserAvatar(url) {
  api.updateAvatar(url)
    .then(data => {
      userInfo.updateAvatar(data.avatar);
    });
}

/**
 * Позволяет открывать просмотр картинок.
 */
export function handlerOpenImageViewer(src, description) {
  popupViewer.open(src, description);
}

/**
 *
 */
export function handlerDeletingCart() {
  api.deleteCard(this._cardId)
    .then(data => {
      console.log(data);
      this._deleteCard();
    })
    .catch(err => {
      console.error(err);
    });
}

/**
 * Запускает работу попапа обновления персональной информации.
 */
export function handlerStartPersonPopup() {
  const btn = document.querySelector(btnForPopup.editInfo);
  const popup = new PopupWithForm({
    selectorPopup: popups.editInfo,
    handlerSubmitForm: () => {
      const {personName, personAbout} = popup._getInputValues();
      console.log(personName);
      console.log(personAbout);
      handlerUpdateUserInfo({name: personName, about: personAbout});
    }
  });

  btn.addEventListener("click", () => {
    popup.open();
    popup.setEventListeners();
  });
}

/**
 * Запускает работу попапа обновления аватара.
 */
export function handlerStartAvatarPopup() {
  const btn = document.querySelector(btnForPopup.editAvatar);
  const popup = new PopupWithForm({
    selectorPopup: popups.editAvatar,
    handlerSubmitForm: () => {
      const {placeName} = popup._getInputValues();

      handlerUpdateUserAvatar(placeName);
    }
  });

  btn.addEventListener("click", () => {
    popup.open();
    popup.setEventListeners();
  });
}

/**
 *
 */
export function handlerStartDeleteCardPopup() {
  const btn = document.querySelector(btnForPopup.editAvatar);
  const popup = new PopupWithForm({
    selectorPopup: popups.editAvatar,
    handlerSubmitForm: () => {
      const {placeName} = popup._getInputValues();

      handlerUpdateUserAvatar(placeName);
    }
  });

  btn.addEventListener("click", () => {
    popup.open();
    popup.setEventListeners();
  });
}

/**
 * Запускает попап для добавления новой карточки.
 */
export function handlerStartPopupAddCart() {
  const btn = document.querySelector(btnForPopup.addCard);
  const popup = new PopupWithForm({
    selectorPopup: popups.addCard,
    handlerSubmitForm: () => {
      const {placeName, palaceURL} = popup._getInputValues();

      api.postNewCard(placeName, palaceURL)
        .then(data => {
          console.log(`data ${data}`);
          const list = new Section({
            data: [data],
            renderer: (data) => {
              const card = new Card({
                data: data,
                handlerLikeCart: handlerLikeCart,
                handlerOpenImageViewer: handlerOpenImageViewer
              }, "#card");
              const cartEl = card.createCard(userId);
              list.addItem(cartEl);
            }
          }, ".gallery");
          list.renderItems();
        });
    }
  });

  btn.addEventListener("click", () => {
    popup.open();
    popup.setEventListeners();
  });
}
