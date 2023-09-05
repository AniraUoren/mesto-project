import {apiConf} from "./config";


export const getPersonalInfo = () => {
    return fetch(`${apiConf.url}/${apiConf.groupId}/users/me`, {
        method: "GET",
        headers: {
            authorization: apiConf.token,
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка при получении персональной информации: ${res.status}`);
    });
};

export const getCards = () => {
    return fetch(`${apiConf.url}/${apiConf.groupId}/cards`, {
        method: "GET",
        headers: {
            authorization: apiConf.token,
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка при получении списка карточек: ${res.status}`);
    });
};

export const updatePersonalInfo = (name, about) => {
    return fetch(`${apiConf.url}/${apiConf.groupId}/users/me`, {
        method: "PATCH",
        headers: {
            authorization: apiConf.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка при обновлении персональной информации: ${res.status}`);
    });
};

export const postNewCard = (name, link) => {
    return fetch(`${apiConf.url}/${apiConf.groupId}/cards`, {
        method: "POST",
        headers: {
            authorization: apiConf.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка при добавлении карточки: ${res.status}`);
    });
};

export const deleteCard = (cardId) => {
  return fetch(`${apiConf.url}/${apiConf.groupId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: apiConf.token,
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка при удалении карточки: ${res.status}`);
  });
};

export const putLikeOnCard = (cardId) => {
  return fetch(`${apiConf.url}/${apiConf.groupId}/cards//likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: apiConf.token,
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка при установке лайка для карточки: ${res.status}`);
  });
};

export const deleteLikeOnCard = (cardId) => {
  return fetch(`${apiConf.url}/${apiConf.groupId}/cards//likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: apiConf.token,
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка при удалении лайка с карточки: ${res.status}`);
  });
};

export const updateAvatar = (url) => {
  return fetch(`${apiConf.url}/${apiConf.groupId}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: apiConf.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      avatar: url
    })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка при обновлении ссылки на аватар: ${res.status}`);
  });
};
