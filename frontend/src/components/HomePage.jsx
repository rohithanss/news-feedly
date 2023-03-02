import axios from "axios";
import { useEffect, useState } from "react";

import CheckBoxes from "./CheckBoxes";
import NewsCard from "./NewsCard";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sources, setSources] = useState([]);
  const [newsData, setNewsData] = useState({ status: null, news: [] });

  const getNewsData = async () => {
    try {
      let res = await axios.get(
        `https://news-feedly.onrender.com/news?search=${search}&sources=${sources}&limit=10&page=${page}`
      );

      res = await res.data;

      if (res.status === "success") {
        setNewsData((curr) => {
          let newObj = { ...curr };
          newObj.status = true;
          newObj.news = res.news;
          return newObj;
        });
      } else {
        setNewsData((curr) => {
          let newObj = { ...curr };
          newObj.status = false;
          return newObj;
        });
      }
    } catch (err) {
      setNewsData((curr) => {
        let newObj = { ...curr };
        newObj.status = false;
        return newObj;
      });
    }
  };

  useEffect(() => {
    getNewsData();
    return () => {
      setNewsData((curr) => {
        let newObj = { ...curr };
        newObj.status = null;
        newObj.news = [];
        return newObj;
      });
    };
  }, [sources, page]);

  function nextPage() {
    setPage(page + 1);
  }
  function prevPage() {
    setPage(page - 1);
  }

  function changeSources(newSources) {
    setSources(newSources);
  }
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>News Feedly</h1>

      <div
        style={{
          display: "flex",
          width: "90%",
          margin: "20px auto",
        }}
      >
        <div // FILTER BY SOURCES SECTION (CHECKBOXES)
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "30%",
            borderRight: "1px solid gray",
            borderLeft: "1px solid gray",
            padding: "20px 0",
          }}
        >
          <h1>Filter By Source</h1>
          <CheckBoxes changeSources={changeSources} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            alignItems: "center",
            position: "relative",

            padding: "20px 0",
            borderRight: "1px solid gray",
          }}
        >
          <div // SEARCH BOX
            style={{
              display: "flex",
              gap: "10px",
              width: "100%",
              justifyContent: "center",
              padding: "5px 0",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            }}
          >
            <input
              type="text"
              style={{ padding: "8px 15px", fontSize: "16px", width: "80%" }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search News By Title"
            />
            <button
              onClick={() => {
                setNewsData((curr) => {
                  let newObj = { ...curr };
                  newObj.status = null;
                  newObj.news = [];
                  return newObj;
                });
                getNewsData();
              }}
              style={{
                padding: "8px 15px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "80vh",
              overflowY: "scroll",
            }}
          >
            <h1 style={{ margin: "20px 0" }}>Latest News</h1>
            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "30px",
              }}
            >
              {newsData.status === null ? (
                <h1>loading...</h1>
              ) : newsData.status === false ? (
                <h1>Error...</h1>
              ) : newsData.news.length > 0 ? (
                newsData.news.map((el) => <NewsCard news={el} key={el._id} />)
              ) : (
                <h1>No News found</h1>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              padding: "10px 0",
            }}
          >
            <button
              style={{ padding: "5px 10px", fontWeight: "600" }}
              disabled={page === 1}
              onClick={() => {
                prevPage();
              }}
            >
              Prev
            </button>
            <button
              style={{ padding: "5px 10px", fontWeight: "600" }}
              disabled={newsData.news.length < 10}
              onClick={() => {
                nextPage();
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
