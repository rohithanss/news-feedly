import React, { useState, useEffect } from "react";
import "./checkboxes.css";

export default function CheckBoxes(props) {
  const { changeSources } = props;
  const [checkedSources, setCheckedSources] = useState({});

  const handleChange = (event) => {
    setCheckedSources((curr) => {
      return {
        ...curr,
        [event.target.name]: event.target.checked,
      };
    });
  };

  useEffect(() => {
    changeSources(
      Object.keys(checkedSources).filter((key) => checkedSources[key]) // 1
    );
  }, [checkedSources]);

  //  NOTE:  Sources can Dynamic too, using two ways..
  //    1. By storing all the Sources in DB, using api's source end point..
  //    2. By extracting sources from every result

  const sources = [
    "Google News",
    "BBC News",
    "CNN",
    "The Indian Express",
    "Forbes",
    "The Times of India",
    "Moneycontrol",
    "Yahoo Entertainment",
    "ABC News",
    "BBC Sport",
    "Bloomberg",
    "Business Insider",
    "Buzzfeed",
    "CBC News",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        margin: "30px 0",
      }}
    >
      {sources.map((source) => (
        <label key={source} className="checkbox">
          <input
            type="checkbox"
            name={source}
            checked={checkedSources[source]}
            onChange={handleChange}
          />
          {source}
        </label>
      ))}
    </div>
  );
}
