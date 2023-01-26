import { API_URL } from '../../config'

export const likeComments = async (body: any) => {
  return await fetch(`${API_URL}/comments/likes`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
}

  /*

    {
        "id": "63c6f11bf46e034dfcbeeae6",
        "post": "63d1f32e866456f173d36227"
    }

  */
