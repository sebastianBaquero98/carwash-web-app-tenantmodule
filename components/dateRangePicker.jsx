"use client";
import { DateRangePicker } from "rsuite";
import { Loader } from "rsuite";
import React, { useState, useEffect } from "react";
import Link from "next/link";
const DateRange = ({ info }) => {
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  // const [clicked, setClicked] = useState(false);
  const handleRange = (event) => {
    if (event !== null) {
      // console.log('before iso ',  event[0])
      // console.log('before iso ',  event[1])
      let inicialDate = event[0].toString().split(":");
      inicialDate = inicialDate[0].slice(0, -3);
      inicialDate = new Date(inicialDate);

      let finalDate = event[1].toString().split(":");
      finalDate = finalDate[0].slice(0, -3);
      finalDate = new Date(finalDate);

      let sDate = inicialDate.toISOString().split("T")[0];
      let fDate = finalDate.toISOString().split("T")[0];

      setStartDate(sDate);
      setFinishDate(fDate);
    }
  };

  // useEffect(() => {

  //   setClicked(false);
  // }, [info]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <DateRangePicker
        showOneCalendar
        format="yyyy-MM-dd"
        onChange={handleRange}
        style={{
          borderRadius: "10px",

          width: "270px",
        }}
        placeholder="Rango de Fechas"
      />
      <div
        style={{
          marginRight: "20px",
          height: "38px",
          borderRadius: "10px",
          width: "40px",
          backgroundColor: "#219EBC",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* {clicked ? (
          <Loader />
        ) : ( */}
        <Link
          style={{ color: "white", fontWeight: "bold" }}
          href={`/locations?startDate=${startDate}&endDate=${finishDate}`}
          onClick={() => setClicked(true)}
        >
          Ok
        </Link>
        {/* )} */}
      </div>
    </div>
  );
};

export default DateRange;
