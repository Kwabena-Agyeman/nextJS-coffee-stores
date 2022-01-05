/** @format */

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import styles from "../../styles/coffee-store.module.scss";
import cls from "classnames";
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
          <Image src={coffeeStore.imgUrl} width={600} height={360} alt='' />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src={"/static/icons/places.svg"}
              width={24}
              height={24}
              alt=''
            />
            <p className={styles.text}>{coffeeStore.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src={"/static/icons/nearMe.svg"}
              width={24}
              height={24}
              alt=''
            />
            <p className={styles.text}>{coffeeStore.neighbourhood}</p>
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
