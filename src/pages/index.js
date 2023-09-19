import "../pages/index.css";

import {apiConf} from "../utils/const";
import {handlerLikeCart} from "../utils/handlers";

import {Api} from "../components/Api";
import {UserInfo} from "../components/UserInfo";
import {Section} from "../components/Section";
import {Card} from "../components/Card";

const api = new Api(apiConf);
const userInfo = new UserInfo(".profile__name", ".profile__about", ".profile__avatar");

Promise.all([api.getPersonalInfo(), api.getCards()])
  .then(data => {
    const [profileInfo, cartData] = data;
    console.log(profileInfo);
    console.log(cartData);

    const cardList = new Section({
      data: cartData,
      renderer: (cardData) => {
        const card = new Card({
          data: cardData,
          handlerLikeCart: handlerLikeCart
        }, "#card");
        const cartEl = card.createCard(profileInfo._id);
        cardList.setItem(cartEl);
      }
    }, ".gallery");

    cardList.renderItems();
  });

