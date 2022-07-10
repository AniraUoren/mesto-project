import {closePopup, closePopupWindow, openPopupWindow} from "./modal";
import {token, cohort} from "./config";

/**
 * Функция, для отрисовки актуального состояния лайков
 * @param count - количество лайков.
 * @param el - карточка, в которой работаем.
 */
function toggleLike(count, el) {
  el.querySelector(".gallery__like").classList.toggle("gallery__like_active");
  el.querySelector(".gallery__like-number").textContent = count;

}

/**
 * Функция, которая добавляет или убирает один лайк с карточки. Ориентируется на состояние кнопки в карточке, но не нашла в апи как
 * запросить информацию по отдельной карте, например, по ID. Выглядит так, потому что я не оч поняла асинхронность, а так работает.
 * @param el - карточка галереи.
 */
function clickOnLike(el) {
  if (!el.querySelector(".gallery__like").classList.contains("gallery__like_active")) {
    fetch(`https://nomoreparties.co/v1/${cohort}/cards/likes/${el.getAttribute("id")}`, {
      method: "PUT",
      headers: {
        authorization: token
      }
    })
      .then(res => {
        return res.json()
      })
      .catch(err => console.error(err))
      .then(data => {
        toggleLike(data.likes.length, el)
      })
  } else {
    fetch(`https://nomoreparties.co/v1/${cohort}/cards/likes/${el.getAttribute("id")}`, {
      method: "DELETE",
      headers: {
        authorization: token
      }
    })
      .then(res => {
        return res.json()
      })
      .catch(err => console.error(err))
      .then(data => {
        toggleLike(data.likes.length, el)
      })
  }

}

/**
 * Функция для рендера карточки из галереи и создания событий для нее по объекту.
 * @param template - Шаблон для создания карточки.
 * @param initObj - Объект для инициализации карточки.
 * @param popup - Элемент страницы, содержащий в себе попап.
 */
function createPlaceCard(template, initObj, popup) {
  const elem = template.content.firstElementChild.cloneNode(true); //Получаем элемент из шаблона.
  const deleteCardBtn = document.createElement(`button`); //Кнопка удаления карточки
  const myId = document.querySelector(".about-person").getAttribute("id");
  const surePopup = document.querySelector("#areUSurePopup");
  const surePopupCloseBtn = document.querySelector("#closeSurePopup");
  const sureForm = document.querySelector("#areUSureForm");

  //дорабатываем кнопку
  deleteCardBtn.classList.add("gallery__delete");
  deleteCardBtn.setAttribute("type", "button");
  deleteCardBtn.textContent = "Удалить";


  elem.querySelector(".gallery__image").src = initObj.link; // Добавляем карточке ссылку на изображение
  elem.querySelector(".gallery__image").alt = initObj.name; // Добавляем карточке описание изображения
  elem.querySelector(".gallery__el-header").textContent = initObj.name; //Добавляем описание места
  elem.querySelector(".gallery__like-number").textContent = initObj.likes.length;
  elem.setAttribute("id", initObj._id);

  //Вешаем на карточку событие клика на кнопку лайка
  elem.addEventListener("click", (evt) => {
    clickOnLike(evt.currentTarget);
  })

  if (initObj.owner._id === myId) {
    elem.append(deleteCardBtn);
  }

  //Вешаем на карточку событие клика на кнопку удаления карточки
  openPopupWindow(deleteCardBtn, surePopup);
  closePopupWindow(deleteCardBtn, surePopup);

  function submitDeleteCard(card) {
    sureForm.addEventListener("submit", evt => {
      evt.preventDefault();
      console.log(card)
      fetch(`https://nomoreparties.co/v1/${cohort}/cards/${card.getAttribute("id")}`, {
        method: "DELETE",
        headers: {
          authorization: token
        }
      })
      elem.remove();
      closePopup(surePopup)
    })
  }

  elem.addEventListener("click", evt => {
    submitDeleteCard (evt.currentTarget);
  })


  //Вешаем на карточку событие клика на изображение для просмотра картинки в попапе
  elem.querySelector(".gallery__image").addEventListener("click", () => {
    popup.querySelector(".popup__image").setAttribute("src", elem.querySelector(".gallery__image").src);
    popup.querySelector(".popup__image").setAttribute("alt", elem.querySelector(".gallery__image").alt);
    popup.querySelector(".popup__image-description").innerText = elem.querySelector(".gallery__image").alt;
    openPopupWindow(elem, popup);
  })

  //Возвращаем готовую карточку со всеми слушателями
  return elem;
}

/**
 * Получение списка карточек с сервера и их рендеринг в галерее.
 * @param template - шаблон для карточки.
 * @param gallery -  элемент страницы, куда вставляем карточки.
 * @param popup - попап просмотра большой картинки.
 */
function createGalleryFromCards(template, gallery, popup) {
  fetch(`https://nomoreparties.co/v1/${cohort}/cards`, {
    method: "GET",
    headers: {
      authorization: token
    }
  })
    .then(res => {
      return res.json()
    })
    .catch(err => console.error(err))
    .then(data => {
      console.log(data)
      data.forEach(el => {
        let temp = createPlaceCard(template, el, popup);
        gallery.append(temp);
      })
    })
}

/**
 * Позволяет добавить новую карточку с местом и передать ее на сервер.
 * @param data - информация о карточке.
 * @param template - шаблон для отрисовки.
 * @param gallery - элемент верстки, куда вставляем карточки.
 * @param popup - попап для просмотрна большого изображения.
 */
function addingNewCard(data, template, gallery, popup) {
  fetch(`https://nomoreparties.co/v1/${cohort}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json()
    })
    .catch(err => console.error(err))
    .then(data => {
      let temp = createPlaceCard(template, data, popup);
      gallery.prepend(temp);
    })
}


export {createGalleryFromCards, addingNewCard};
