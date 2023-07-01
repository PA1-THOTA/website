import React from "react";
import Header1 from "./header1_imp_router";
import Header2 from "./header2_imp_router";
import { Outlet } from "react-router-dom";
const Headermain = () => {
  return (
    <>
      <Header1 />
      <Header2 />
    </>
  );
};
const header_imp = () => {
  return (
    <>
      <Headermain />
      <Outlet />
    </>
  );
};

export default header_imp;
