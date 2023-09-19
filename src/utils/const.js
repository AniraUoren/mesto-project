export const validationConf = {
  formClass: ".popup__form",
  inputClass: ".popup__input",
  visibleErrorClass: "popup__input-error_visible",
  submitBtnClass: ".popup__submit-btn",
  disabledSubmitBtnClass: "popup__submit-btn_disabled"
};

export const apiConf = {
  token: "6e404797-7bd9-4ec5-9f3f-4a0597ffa86e",
  groupId: "plus-cohort-28",
  get url() {
    return `https://nomoreparties.co/v1/${this.groupId}`;
  },
  get headers() {
    return {
      authorization: this.token,
      "Content-Type": "application/json"
    };
  }
};
