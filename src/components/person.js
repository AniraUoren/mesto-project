import {cohort, token} from "./config";

/**
 * Запрашивает информацию о персоне и пробрасывает ее в поля на странице.
 * @param section - секция с персональной информацией.
 */
function associatePersonInformation (section) {

  fetch(`https://nomoreparties.co/v1/${cohort}/users/me`, {
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
      section.setAttribute("id", data._id)
      section.querySelector(".about-person__name").textContent = data.name;
      section.querySelector(".about-person__profession").textContent = data.about;
      section.querySelector(".about-person__image").setAttribute("src", data.avatar)
    })

}

/**
 * Отправляет на сервер данные о персоне.
 * @param data - имя и профессия.
 * @param section - секция с персональной информацией.
 */
function editPersonInfo (data, section) {
  fetch(`https://nomoreparties.co/v1/${cohort}/users/me`, {
    method: 'PATCH',
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
      section.querySelector(".about-person__name").textContent = data.name;
      section.querySelector(".about-person__profession").textContent = data.about;
    })
}

export {associatePersonInformation, editPersonInfo}
