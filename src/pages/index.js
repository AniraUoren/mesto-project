import "../pages/index.css";

import {validationConf} from "../utils/const";
import {
  handlerRenderPage, handlerStartPersonPopup
} from "../utils/handlers";

import {FormValidator} from "../components/FormValidator";

const arrayForms = Array.from(document.querySelectorAll(validationConf.formClass));

handlerRenderPage();

//запуск валидации
arrayForms.forEach(form => {
  console.log(form);
  const validation = new FormValidator(validationConf, form);
  validation.enableValidation(form, validationConf);
});

//запуск попапов
handlerStartPersonPopup();
