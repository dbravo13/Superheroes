const API_URL = "https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api";

export async function fetchHeroesService({ size = 20, page = 1 }) {
  const url = `${API_URL}/heroes?size=${size}&page=${page}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error en la respuesta del servidor");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error en fetchHeroesService:", err);
    throw err;
  }
}

export const fetchHeroDetails = async (id) => {
  const response = await fetch(`${API_URL}/hero?id=${id}`);
  if (!response.ok)
    throw new Error("No se pudieron obtener los detalles del héroe");
  return await response.json();
};
