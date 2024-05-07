"use server";

export async function getLocations(date: string) {
  const response = await fetch(
    `https://afmlbia6k2.execute-api.us-east-1.amazonaws.com/development/locations?date=${date}`,
    {
      method: "GET",
      redirect: "follow",
    }
  );
  const result = await response.json();
  //   console.log(result);
  return result;
}
export async function getLocationsDateRange(
  startDate: string,
  endDate: string
) {
  //   console.log("entro");
  const response = await fetch(
    `https://afmlbia6k2.execute-api.us-east-1.amazonaws.com/development/locations/daterange?startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
    }
  );
  const result = await response.json();
  console.log(result);
  let ans = [];
  result.map((location) => {
    if (location["totalCars"] !== 0) {
      location["latePercentage"] = location["late"] / location["totalCars"];
    } else {
      location["latePercentage"] = 0;
    }
    ans.push(location);
  });
  //console.log(result);
  return ans;
}
