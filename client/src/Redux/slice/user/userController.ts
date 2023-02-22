import { API_URL } from '../../../../config';
import { ProductState } from '../product/product.slice';

export async function userFetch(user: any) {
  const email: string = user.email;
  if (user.family_name) {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = await fetch(`${API_URL}/users/email/${email}`);
  const data = await response.json();
  return data;
}

export async function putUserFetch(
  objeto: { username: string; firstName: string; lastName: string },
  _id: string,
) {
  const changes = objeto;
  const response = await fetch(`${API_URL}/users/${_id}`, {
    method: 'PUT',
    body: JSON.stringify(changes),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  return data;
}

export async function addFavoriteFetch(
  _id: string,
  product: ProductState,
  newFavorites: ProductState[],
) {
  const productSend = { product: product };
  const newFavoritesSends = { newFavorites: newFavorites };
  const response = await fetch(`${API_URL}/users/${_id}`, {
    method: 'PUT',
    body: JSON.stringify(newFavoritesSends),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return data;
}

export async function removeFavoriteFetch(_id: string, product: ProductState) {
  const unfavorite = { unfavorite: product };
  const response = await fetch(`${API_URL}/users/${_id}`, {
    method: 'PUT',
    body: JSON.stringify(unfavorite),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return data;
}
