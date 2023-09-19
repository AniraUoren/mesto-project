/**
 * Убирает или добавляет лайк карточке.
 */
import {Api} from "../components/Api";
import {apiConf} from "./const";
import {Card} from "../components/Card";
import {data} from "autoprefixer";

const api = new Api(apiConf);

/**
 * Убирает или добавляет лайк карточке.
 */
export function handlerLikeCart () {
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
 *
 * @param name
 * @param about
 */
export function handlerUpdateUserInfo({name, about}) {
  api.updatePersonalInfo(name, about)
    .then(data => {
      this.updateUserInfo({name, about});
    })
    .catch(err => {
      console.error(err);
    });
}

/**
 *
 * @param url
 */
export function handlerUpdateUserAvatar(url) {
  console.log(`avatar update ${url}`);
  api.updateAvatar(url)
    .then(data => {
      this.updateAvatar(data.avatar);
    });
}
