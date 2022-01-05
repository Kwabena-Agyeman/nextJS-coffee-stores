/** @format */

import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 10,
    // orientation: "squarish",
  });
  const unsplashResults = photos.response.results;
  const PhotosResponse = unsplashResults.map((result) => result.urls["small"]);

  return PhotosResponse;
};

const getURLforCoffeeStores = (latLong, limit, query) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const url = getURLforCoffeeStores(
    "43.65267326999575%2C-79.29545615725015",
    6,
    "coffee shop"
  );

  const photos = await getListOfCoffeeStorePhotos();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_Key,
    },
  });
  const data = await response.json();

  console.log("HERE", data.results);

  return data.results.map((result, index) => {
    return {
      ...result,
      imgUrl: photos[index],
    };
  });
};

// =43.65267326999575%2C-79.29545615725015,
// 6,
// coffee%20shop
