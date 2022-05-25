//Открытие и закрытие модального окна
const popupWindow = document.querySelector(".popup");
const btnEditPerson = document.getElementById("editPersonBtn");
const btnClosePopup = document.getElementById("closePopupBtn");

btnEditPerson.addEventListener("click", evt => {
  popupWindow.classList.remove("popup_closed");
});

btnClosePopup.addEventListener("click", evt => {
  popupWindow.classList.add("popup_closed");
});

//TODO Поля формы
//TODO Редактирование имени и информации о себе
//TODO 2. Шесть карточек «из коробки»
//TODO 3. Форма добавления карточки
//TODO 4. Добавление карточки
//TODO 5. Лайк карточки
//TODO 6. Удаление карточки
//TODO 7. Открытие попапа с картинкой
//TODO 8. Плавное открытие и закрытие попапов
