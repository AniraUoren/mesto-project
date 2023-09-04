import {apiConf} from "./config";

/**
 *
 * @returns {Promise<Response>}
 */
export const getPersonalInfo = () => {
  return fetch(`${apiConf.url}/${apiConf.groupId}/users/me`, {
    method: "GET", headers: {
      authorization: apiConf.token, "Content-Type": "application/json"
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
    method: "GET", headers: {
      authorization: apiConf.token, "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка при получении персональной информации: ${res.status}`);
  });
};
