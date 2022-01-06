/** @format */

import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

export const fetchCoffeeStores = async (
  latLong = "43.65267326999575%2C-79.29545615725015",
  limit = 6,
  query = "coffee shop"
) => {
  const url = getURLforCoffeeStores(latLong, limit, query);

  console.log({ url });

  const photos = await getListOfCoffeeStorePhotos();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_Key,
    },
  });
  const data = await response.json();

  //   console.log("HERE", data.results);

  return data.results.map((result, index) => {
    return {
      ...result,
      imgUrl: photos[index],
    };
  });
};

const getListOfCoffeeStorePhotos = async () => {
  console.log("getting photos");
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 40,
    // orientation: "squarish",
  });
  const unsplashResults = photos.response.results;
  const PhotosResponse = unsplashResults.map((result) => result.urls["small"]);

  console.log({ unsplashResults });
  return PhotosResponse;
};

const getURLforCoffeeStores = (latLong, limit, query) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

// =43.65267326999575%2C-79.29545615725015,
// 6,
// coffee%20shop
