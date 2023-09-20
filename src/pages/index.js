import "../pages/index.css";

import {apiConf} from "../utils/const";
import {
  handlerLikeCart,
  handlerOpenImageViewer,
  handlerUpdateUserAvatar,
  handlerUpdateUserInfo
} from "../utils/handlers";

import {Api} from "../components/Api";
import {UserInfo} from "../components/UserInfo";
import {Section} from "../components/Section";
import {Card} from "../components/Card";
import {Popup} from "../components/Popup";

const api = new Api(apiConf);
const userInfo = new UserInfo(".profile__name", ".profile__about", ".profile__avatar", handlerUpdateUserAvatar, handlerUpdateUserInfo);

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
