/** @format */

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import coffeeStoreDate from "../../data/coffee-stores.json";

export function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: false,
  };
}

export function getStaticProps(context) {
  console.log("params", context.params);
  return {
    props: {
      coffeStore: coffeeStoreDate.find((coffeeStore) => {
        return coffeeStore.id === parseInt(context.params.id);
      }),
    },
  };
}

const CoffeStore = () => {
  const router = useRouter();

  return (
    <div>
      Coffee Store - {router.query.id}{" "}
      <Link href={"/"}>
        <a>BacK to home</a>
      </Link>
      <Link href={"/coffee-store/koby"}>
        <a>Go to store</a>
      </Link>
    </div>
  );
};

export default CoffeStore;
