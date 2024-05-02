"use client";
import React from "react";

import ListUsers from "./ListUsers";
import AddUser from "./AddUser";
type Props = {};

const page = (props: Props) => {
  return (
    <>
      <div className="mx-5 my-10">
        <div className="flex justify-between">
          <div className="py-5 font-bold">Danh sách Users</div>
          <div className="py-5 flex justify-end">
            <AddUser />
          </div>
        </div>

        <ListUsers />
      </div>
    </>
  );
};

export default page;
