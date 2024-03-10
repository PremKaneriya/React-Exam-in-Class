// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import Loader from "./Loader";

const Quote = () => {
  // eslint-disable-next-line no-unused-vars
  const [getData, setgetData] = useState([]);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuoteData();
  });

  const getQuoteData = async () => {
    const res = await fetch("https://type.fit/api/quotes");
    const data = await res.json();

    setTimeout(() => {
      setgetData(data);
      setLoading(false);
    });
  };

  const filterAllData = () => {
    let filteredData = getData.filter(
      (data) =>
        data.text.toLowerCase().includes(search.toLowerCase()) ||
        data.author.toLowerCase().includes(search.toLowerCase())
    );

    filteredData = filteredData.sort((a, b) => {
      if (sorting === "atzauthor") {
        return a.author.localeCompare(b.author);
      } else if (sorting === "ztoaauthor") {
        return b.author.localeCompare(a.author);
      } else if (sorting === "atztext") {
        return a.text.localeCompare(b.text);
      } else if (sorting === "ztoatext") {
        return b.text.localeCompare(a.text);
      }
    });

    return filteredData;
  };

  const finalData = filterAllData();

  return (
    <>
      {loading ? <Loader /> : null}
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />

      <select name="" id="" onChange={(e) => setSorting(e.target.value)}>
        <option value="0">-- Sort By --</option>
        <option value="atzauthor">A to Z Author</option>
        <option value="ztoaauthor">Z to A Author</option>
        <option value="atztext">A to Z Text</option>
        <option value="ztoatext">Z to A Text</option>
      </select>
      {finalData.map((data) => (
        // eslint-disable-next-line react/jsx-key
        <div className="card h-fit w-fit border-solid border-2 border-black">
          <h1 className="text-2xl text-orange-900">Quote : {data.text}</h1>
          <h1 className="text-xl text-blue-900">Author : {data.author}</h1>
        </div>
      ))}
    </>
  );
};

export default Quote;
