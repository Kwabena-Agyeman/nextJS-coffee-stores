/** @format */

const getURLforCoffeeStores = (latLong, limit, query) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_Key,
    },
  };

  const url = getURLforCoffeeStores(
    "43.65267326999575%2C-79.29545615725015",
    6,
    "coffee shop"
  );

  const response = await fetch(url, options);

  const data = await response.json();

  return data.results;
};

// =43.65267326999575%2C-79.29545615725015,
// 6,
// coffee%20shop
