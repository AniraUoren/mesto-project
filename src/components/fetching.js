import {cohort, token} from "./config";

/**
 * Запрашивает информацию о персоне и пробрасывает ее в поля на странице.
 * @param namePerson - имя персоны.
 * @param professionPerson - профессия персоны.
 * @param photo - фото персоны.
 */
function associatePersonInformation (namePerson, professionPerson, photo) {

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
      namePerson.textContent = data.name;
      professionPerson.textContent = data.about;
      photo.setAttribute("src", data.avatar)
    })

}

function editPersonInfo (data, namePerson, professionPerson) {
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
      namePerson.textContent = data.name;
      professionPerson.textContent = data.about;
    })
}

export {associatePersonInformation, editPersonInfo}
