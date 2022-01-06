/** @format */

import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import HeroImage from "../public/static/hero-image.png";
import Banner from "../components/Banner";
import Card from "../components/Card";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";

export const getStaticProps = async () => {
  try {
    const coffeeStores = await fetchCoffeeStores();

    return {
      props: {
        coffeeStores,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    // console.log(error);
  }
};

export default function Home({ coffeeStores: cs }) {
  const [coffeeStoresNearBy, setCoffeeStoresNearBy] = useState([]);
  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
    useTrackLocation();
  console.log({ latLong, locationErrorMsg });

  // const fetchNewCoffeeStoresOnLocation = async (location) => {
  //   const response = await fetchCoffeeStores(location, 6, "coffee shop");

  //   console.log({ response });

  //   return response;
  // };

  useEffect(async () => {
    if (latLong) {
      try {
        console.log("LATLONG CHANGED");
        const fetchedCoffStores = await fetchCoffeeStores(latLong, 30);
        console.log({ fetchedCoffStores });
        setCoffeeStoresNearBy(fetchedCoffStores);
      } catch (error) {
        // console.log(error);
      }
    }
  }, [latLong]);

  const handleOnBannerButtonClick = () => {
    handleTrackLocation();
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerButtonClick}
        />
        {locationErrorMsg && <p>Something went wrong : {locationErrorMsg}</p>}
        <div className={styles.heroImage}>
          <Image src={HeroImage} alt='' width={1200} height={450} />
        </div>

        {coffeeStoresNearBy.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Store near me</h2>
          </div>
        )}
        <div className={styles.cardLayout}>
          {coffeeStoresNearBy.map((coffeeStore) => {
            return (
              <Card
                key={coffeeStore.fsq_id}
                className={styles.card}
                name={coffeeStore.name}
                href={`/coffee-store/${coffeeStore.fsq_id}`}
                imgUrl={
                  coffeeStore.imgUrl ||
                  "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                }
              />
            );
          })}
        </div>

        {cs.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto stores</h2>
          </div>
        )}
        <div className={styles.cardLayout}>
          {cs.map((coffeeStore) => {
            return (
              <Card
                key={coffeeStore.fsq_id}
                className={styles.card}
                name={coffeeStore.name}
                href={`/coffee-store/${coffeeStore.fsq_id}`}
                imgUrl={
                  coffeeStore.imgUrl ||
                  "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                }
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
