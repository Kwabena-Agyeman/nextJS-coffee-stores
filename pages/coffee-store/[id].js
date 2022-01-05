/** @format */

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import coffeeStoreDate from "../../data/coffee-stores.json";

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
  console.log("params", context.params);
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
    <div>
      <Head>
        <title>{coffeeStore.name}</title>
      </Head>
      Coffee Store - {router.query.id}{" "}
      <Link href={"/"}>
        <a>BacK to home</a>
      </Link>
      <Link href={"/coffee-store/koby"}>
        <a>Go to store</a>
      </Link>
      <p>{coffeeStore.address}</p>
      <p>{coffeeStore.name}</p>
      <p>{coffeeStore.neighbourhood}</p>
    </div>
  );
};

export default CoffeStore;
