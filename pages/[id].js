/** @format */

import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const Test = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{router.query.id}</title>
      </Head>
      <div>Test Dynamic Routes {router.query.id}</div>;
    </>
  );
};

export default Test;
