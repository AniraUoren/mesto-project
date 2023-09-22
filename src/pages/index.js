import "../pages/index.css";

import {apiConf, validationConf} from "../utils/const";
import {
  handlerLikeCart,
  handlerOpenImageViewer, handlerStartPopups,
  handlerUpdateUserAvatar,
  handlerUpdateUserInfo
} from "../utils/handlers";

import {Api} from "../components/Api";
import {UserInfo} from "../components/UserInfo";
import {Section} from "../components/Section";
import {Card} from "../components/Card";
import {FormValidator} from "../components/FormValidator";

const api = new Api(apiConf);
const userInfo = new UserInfo({
  nameSelector:".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
  nameInputSelector: "#personName",
  aboutInputSelector: "#personAbout",
  handlerUpdateUserAvatar,
  handlerUpdateUserInfo
});
const arrayForms = Array.from(document.querySelectorAll(validationConf.formClass));

Promise.all([api.getPersonalInfo(), api.getCards()])
  .then(data => {
    const [profileInfo, cartData] = data;
    console.log(profileInfo);
    console.log(cartData);

    userInfo.render(profileInfo);

    const cardList = new Section({
      data: cartData,
      renderer: (cardData) => {
        const card = new Card({
          data: cardData,
          handlerLikeCart: handlerLikeCart,
          handlerOpenImageViewer: handlerOpenImageViewer
        }, "#card");
        const cartEl = card.createCard(profileInfo._id);
        cardList.setItem(cartEl);
      }
    }, ".gallery");

    cardList.renderItems();
  });


//запуск валидации
arrayForms.forEach(form => {
  console.log(form);
  const validation = new FormValidator(validationConf, form);
  validation.enableValidation(form, validationConf);
});

//запуск попапов
handlerStartPopups();
