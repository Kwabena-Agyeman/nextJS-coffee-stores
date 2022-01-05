/** @format */

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import styles from "../../styles/coffee-store.module.scss";

import coffeeStoreDate from "../../data/coffee-stores.json";
import Image from "next/image";

export function getStaticPaths() {
  const paths = coffeeStoreDate.map((CS) => {
    return {
      params: {
        id: CS.id.toString(),
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}

export function getStaticProps(context) {
  return {
    props: {
      coffeeStore: coffeeStoreDate.find((coffeeStore) => {
        return coffeeStore.id === parseInt(context.params.id);
      }),
    },
  };
}

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
          <Image src={coffeeStore.imgUrl} width={600} height={360} alt='' />
        </div>
        <div className={styles.col2}>
          <p>{coffeeStore.address}</p>
          <p>{coffeeStore.neighbourhood}</p>
        </div>
      </div>
    </div>
  );
};

export default CoffeStore;
