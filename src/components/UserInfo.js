class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserInfo(handler) {
    handler()
      .then(data => {
        return data;
        //TODO Кажется, что метод должен еще и подставлять на страницу
      })
      .catch(err => {
        console.error(err);
      })
  }

  setUserInfo({name, about}, handler) {
    handler(name, about)
      .then(data => {
        return data;
        //TODO Кажется, что метод должен еще и подставлять на страницу
      })
  }
}
