import { API_URL } from '../../config';

export const controllerUser = (email: string | undefined) => {
  const response = fetch(`${API_URL}/checkout/${email}`)
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
  return response;
};
