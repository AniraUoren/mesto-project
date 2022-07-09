const token = "8291305f-90f5-45e2-8131-f96d2e55a257";
const cohort = "plus-cohort-13";

function associatePersonInformation (namePerson, professionPerson) {

  fetch("https://nomoreparties.co/v1/plus-cohort-13/users/me", {
    method: "GET",
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
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

export {associatePersonInformation}
