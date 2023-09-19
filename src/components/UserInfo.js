export class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarAvatar = document.querySelector(avatarSelector);
  }

  render(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
    this._avatarAvatar.src = data.avatar;
    this._avatarAvatar.alt = data.name;
  }

  getUserInfo(handler) {
    handler();
  }

  setUserInfo({name, about}, handler) {
    handler(name, about);
  }
}
