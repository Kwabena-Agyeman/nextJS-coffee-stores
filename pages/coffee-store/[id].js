/** @format */

import React from "react";
import { useRouter } from "next/router";

const CoffeStore = () => {
  const router = useRouter();

  console.log("router", router);
  return <div>{router.query.id}</div>;
};

export default CoffeStore;
