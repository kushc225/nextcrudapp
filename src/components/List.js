"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const List = ({ delHanlder, editHanlder, owner, id, title, description }) => {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({});
  useEffect(() => {
    setPayload({ owner, id, title, description });
  }, []);
  return (
    <>
      <div
        style={{ backgroundColor: "#1D5D9B" }}
        className="outline-none rounded-md px-4 py-2 text-center border-blue-500 mx-2 mt-2 "
      >
        <div className="w-auto">
          <div className="mt-4 text-center">
            <h1>{title}</h1>
          </div>
          <div className="mt-3  text-center">
            <h1>{description}</h1>
          </div>
          <div className="mt-4 mb-4 ">
            <button
              className="mt-2 hover:bg-transparent hover:border-2 outline-none hover:border-blue-500 mr-2 bg-green-500 px-4 py-1 rounded-xl shadow-sm "
              onClick={() => editHanlder(id)}
            >
              Edit
            </button>
            <button
              className="mt-2 hover:bg-transparent hover:border-2 hover:border-red-500 mr-2 outline-none  bg-red-500 px-4 py-1 rounded-xl shadow-sm "
              onClick={() => delHanlder(id)}
            >
              Del
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
