import React, { useState } from "react";

function DistanceCalculator() {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [distance, setDistance] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the API URL with the city1 and city2 values
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${city1}&destinations=${city2}&key=AIzaSyDXLk84-D6IGPIeQjTLKEL592aLUwYFsZY`;

    // Fetch the distance data from the API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Extract the distance from the response data
        const distanceText = data.rows[0].elements[0].distance.text;
        setDistance(distanceText);
      })
      .catch((error) => {
        console.log("Error calculating distance", error);
        setDistance("Oops, something went wrong. Please try again later.");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          City1:
          <input
            type="text"
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
          />
        </label>
        <br />
        <label>
          City2:
          <input
            type="text"
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Calculate Distance</button>
      </form>
      {distance && (
        <p>
          The distance between {city1} and {city2} is {distance}.
        </p>
      )}
    </div>
  );
}

export default DistanceCalculator;
