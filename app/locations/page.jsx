import React from "react";
import Image from "next/image";
import {
  getLocations,
  getLocationsDateRange,
} from "@lib/actions/locations.action";
import DateRange from "@components/dateRangePicker";
import "rsuite/dist/rsuite.min.css";

const Loctions = async ({ searchParams }) => {
  let locations = [];
  if (
    searchParams.startDate === undefined &&
    searchParams.endDate === undefined
  ) {
    locations = await getLocations("2024-05-06");
  } else {
    locations = await getLocationsDateRange(
      searchParams.startDate,
      searchParams.endDate
    );
  }
  // console.log();
  // console.log(searchParams.endDate);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "300vh",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#24242D",
          width: "700px",
          display: "flex",
          flexDirection: "column",
          paddingTop: "25px",
          paddingBottom: "25px",
          borderRadius: "15px",
          gap: "14px",
          marginTop: "20px",
          height: "3000px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ marginLeft: "50px", fontSize: "30px", color: "white" }}>
            Ranking
          </h2>
          <DateRange />
          {/* <DateRangePicker
            appearance="subtle"
            style={{
              borderRadius: "10px",
              marginRight: "50px",
              width: "200px",
            }}
            placeholder="Rango de Fechas"
          /> */}
        </div>
        {locations.map((location, i) => {
          if (i === 0) {
            return (
              <div
                key={location.locationName}
                style={{
                  display: "flex",
                  width: "100%",
                  height: "93px",
                  justifyContent: "space-between",
                  gap: "30px",
                  paddingLeft: "50px",
                  alignItems: "center",
                  background:
                    "linear-gradient(90deg, #383840 0%, #9191a6 100%)",
                }}
              >
                <div
                  style={{ display: "flex", gap: "15px", alignItems: "center" }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    {i + 1}
                  </p>
                  <div
                    style={{
                      width: "3px",
                      height: "50px",
                      display: "inline-block",
                      backgroundColor: "white",
                    }}
                  ></div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h4
                      style={{
                        color: "white",
                        fontSize: "25px",
                        fontWeight: "normal",
                      }}
                    >
                      {location.locationName.split("Mr Splash ")[1]}
                    </h4>
                    <div
                      style={{
                        backgroundColor: "#E81515",
                        width: "62px",
                        height: "19px",
                        borderRadius: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "17px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {`${Math.round(location.latePercentage * 100)}%`}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "120px",
                      height: "30px",
                      backgroundColor: "#F0F0F0",
                      borderRadius: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#383840",
                      fontWeight: "bolder",
                      marginTop: "-20px",
                      fontSize: "20px",
                    }}
                  >
                    {`$${Math.round(location.totalSales).toLocaleString()}`}
                  </div>
                </div>

                <Image
                  src="/assets/images/trophy.svg"
                  width={60}
                  height={60}
                  alt="trophy"
                  style={{
                    marginRight: "50px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />
              </div>
            );
          } else {
            return (
              <div
                key={location.locationName}
                style={{
                  display: "flex",
                  width: "100%",
                  height: "80px",
                  justifyContent: "space-between",
                  gap: "30px",
                  paddingLeft: "50px",
                  alignItems: "center",
                  backgroundColor: "#D9D9D9",
                  paddingBottom: "6px",
                  paddingTop: "6px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "15px", alignItems: "center" }}
                >
                  <p
                    style={{
                      color: "#383840",
                      fontSize: "25px",
                      fontWeight: "bold",
                    }}
                  >
                    {i + 1}
                  </p>
                  <div
                    style={{
                      width: "3px",
                      height: "30px",
                      display: "inline-block",
                      backgroundColor: "#383840",
                    }}
                  ></div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h4
                      style={{
                        color: "#383840",
                        fontSize: "20px",
                        fontWeight: "normal",
                      }}
                    >
                      {location.locationName.includes("Mr Splash") ? (
                        <>
                          {`${
                            location.locationName
                              .split("Mr Splash ")[1]
                              .split(" ")[0]
                          } `}{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {
                              location.locationName
                                .split("Mr Splash ")[1]
                                .split(" ")[1]
                            }
                          </span>
                        </>
                      ) : (
                        <>
                          {location.locationName.split(" ")[0]}
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            {location.locationName.split(" ")[1]}
                          </span>
                        </>
                      )}

                      {/* <span style={{ fontWeight: "bold" }}>
                        {location.locationName
                          .split("Mr Splash ")[1]
                          }
                      </span> */}
                    </h4>
                    <div
                      style={{
                        backgroundColor: "#E81515",
                        width: "50px",
                        height: "16px",
                        borderRadius: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "15px",
                        marginTop: "-1px",
                        marginBottom: "5px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {`${Math.round(location.latePercentage * 100)}%`}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "111px",
                    height: "25px",
                    backgroundColor: "#3A3A42",
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bolder",
                    marginRight: "50px",
                    fontSize: "18px",
                  }}
                >
                  {`$${Math.round(location.totalSales).toLocaleString()}`}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Loctions;
