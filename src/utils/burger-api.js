import { BASE_URL } from './appConstVariables';

const checkResponse = res => {
  return res.ok
    ? res.json().then(res => res.data)
    : res.json().then(err => {
        console.error('An error occurred', err);
        Promise.reject(err);
      });
};

export function getIngredients() {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
    .catch(console.error);
}
