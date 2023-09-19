/**
 * Убирает или добавляет лайк карточке.
 */
import {Api} from "../components/Api";
import {apiConf} from "./const";

const api = new Api(apiConf);

/**
 * Убирает или добавляет лайк карточке.
 */
export function handlerLikeCart () {
  console.log(`handler ${this._isLikedByMe}`);
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
