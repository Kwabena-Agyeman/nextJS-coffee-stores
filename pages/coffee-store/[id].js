/** @format */

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const CoffeStore = () => {
  const router = useRouter();
  console.log("router", router);

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
