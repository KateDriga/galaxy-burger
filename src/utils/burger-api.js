import { BASE_URL } from './appConstVariables';

const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Fetch data from API error: ${res.status}`);
};

export function getIngredients() {
  return fetch(`${BASE_URL}/ingredients`).then(checkResponse);
}

export function createOrder(ingredientIds) {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  }).then(checkResponse);
}
