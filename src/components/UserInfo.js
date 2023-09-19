export class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector, handlerUpdateUserAvatar, handlerUpdateUserInfo) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._handlerUpdateUserAvatar = handlerUpdateUserAvatar;
    this._handlerUpdateUserInfo = handlerUpdateUserInfo;
  }

  _setEventListeners() {
    this._editAvatarBtn = document.querySelector(".profile__edit-avatar");
    this._editInfoBtn = document.querySelector(".profile__edit-btn");

    //TODO Сделано для проверки запросы должны срабатывать при сабмите формы, а значит еще хендлер будет
    this._editAvatarBtn.addEventListener("click", () => {
      this._handlerUpdateUserAvatar("https://proprikol.ru/wp-content/uploads/2020/11/kartinki-pumy-34.jpg");
    });

    //TODO Сделано для проверки запросы должны срабатывать при сабмите формы, а значит еще хендлер будет
    this._editInfoBtn.addEventListener("click", () => {
      this._handlerUpdateUserInfo({name: "Огромный Пум", about: "Страшно красив"});
    });

  }

  render(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
    this._avatarElement.src = data.avatar;
    this._avatarElement.alt = data.name;

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
