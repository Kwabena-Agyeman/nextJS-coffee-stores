/** @format */

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import styles from "../../styles/coffee-store.module.scss";
import cls from "classnames";
import coffeeStoreDate from "../../data/coffee-stores.json";
import Image from "next/image";
import { fetchCoffeeStores } from "../../lib/coffee-stores";

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.fsq_id.toString() === context.params.id;
      }),
    },
  };
}

const handleUpVoteButton = () => {
  console.log("Upvote");
};
const CoffeStore = ({ coffeeStore }) => {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      <Head>
        <title>{coffeeStore.name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href={"/"}>
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1>{coffeeStore.name}</h1>
          </div>
          <Image
            src={
              coffeeStore.imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            alt=''
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src={"/static/icons/places.svg"}
              width={24}
              height={24}
              alt=''
            />
            <p className={styles.text}>{coffeeStore.location.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src={"/static/icons/nearMe.svg"}
              width={24}
              height={24}
              alt=''
            />
            <p className={styles.text}>
              {coffeeStore.location.neighborhood[0]}
            </p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src={"/static/icons/star.svg"}
              width={24}
              height={24}
              alt=''
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpVoteButton}>
            UpVote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeStore;
