import {btnForPopup} from "../utils/const";

export class UserInfo {
  _nameElement;
  _aboutElement;
  _avatarElement;
  _nameInput;
  _aboutInput;
  _handlerUpdateUserAvatar;
  _handlerUpdateUserInfo;
  _editAvatarBtn;
  _editInfoBtn;

  constructor({nameSelector, aboutSelector, avatarSelector, nameInputSelector, aboutInputSelector, handlerUpdateUserAvatar, handlerUpdateUserInfo}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._nameInput = document.querySelector(nameInputSelector);
    this._aboutInput = document.querySelector(aboutInputSelector);
    this._handlerUpdateUserAvatar = handlerUpdateUserAvatar;
    this._handlerUpdateUserInfo = handlerUpdateUserInfo;
  }

  _setEventListeners() {
    this._editAvatarBtn = document.querySelector(btnForPopup.editAvatar);
    this._editInfoBtn = document.querySelector(btnForPopup.editInfo);
  }

  render(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
    this._avatarElement.src = data.avatar;
    this._avatarElement.alt = data.name;
    this._nameInput.value = data.name;
    this._aboutInput.value = data.about;

    this._setEventListeners();
  }

  updateAvatar(url) {
    this._avatarElement.src = url;
  }

  updateUserInfo({name, about}) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.alt = name;
  }
}
