/**
 * Убирает или добавляет лайк карточке.
 */
import {Api} from "../components/Api";
import {apiConf} from "./const";
import {Card} from "../components/Card";
import {data} from "autoprefixer";
import {PopupWithImage} from "../components/PopupWithImage";

const api = new Api(apiConf);
const popupViewer = new PopupWithImage("#imageViewerPopup");

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
 * Отправляет новые данные пользователя на сервер и обновляет информацию на странице.
 * @param name {String} - новое имя.
 * @param about {String} - новый вид деятельности.
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
 * Отправляет новую ссылку на аватар на сервер и обновляет элемент на странице.
 * @param url {String} - URL аватара.
 */
export function handlerUpdateUserAvatar(url) {
  console.log(`avatar update ${url}`);
  api.updateAvatar(url)
    .then(data => {
      this.updateAvatar(data.avatar);
    });
}

/**
 * Позволяет открывать просмотр картинок.
 */
export function handlerOpenImageViewer(src, description) {
  popupViewer.open(src, description);
}
