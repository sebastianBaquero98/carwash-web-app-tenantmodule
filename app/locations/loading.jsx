import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
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
          height: "1000px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ marginLeft: "50px", fontSize: "30px", color: "white" }}>
            Ranking
          </h2>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((location) => (
          <Skeleton
            baseColor="#383840"
            style={{ width: "100%", height: "93px", paddingLeft: "50px" }}
          />
        ))}
      </div>
    </div>
  );
}
