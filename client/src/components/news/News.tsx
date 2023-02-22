import { useEffect, useState } from "react";
import { NEWS_API_KEY } from "../../../config";

import data from "./object.json";

const api_key: string = NEWS_API_KEY;

interface NewsData {
  title: string;
  author: string;
  published_date: string;
  published_date_precision: string;
  link: string;
  clean_url: string;
  excerpt: string | null;
  summary: string;
  rights: string;
  rank: number;
  topic: string;
  country: string;
  language: string | null;
  authors: string;
  media: string;
  is_opinion: boolean;
  twitter_account: string | null;
  _score: number;
  _id: string;
}

export const News = () => {
  const mi = data.articles;

  const [news, setNews] = useState<NewsData[]>(mi);
  const [page, setPage] = useState<number>(1);
  const [slicedNew, setSlicedNew] = useState<NewsData[]>([]);

  const options = {
    method: "GET",
    headers: {
      "x-api-key": api_key,
    },
  };

  const params = new URLSearchParams({
    q: "smart home",
  });

  // const url = `https://api.newscatcherapi.com/v2/search?${params}`;
  useEffect(() => {
    // const fetchNews = async () => {
    // const response = await fetch(url,options);
    // const data = await response.json();

    // setNews(data.articles);
    const arr = data.articles.slice((page - 1) * 4, (page - 1) * 4 + 4);
    setSlicedNew(arr);
    // };
    // fetchNews();
  }, []);

  useEffect(() => {
    const arr = news.slice((page - 1) * 4, (page - 1) * 4 + 4);
    setSlicedNew(arr);
  }, [page]);

  const buttonHandler = () => {
    if (page < 8) {
      setPage(page + 1);
    }
  };

  const buttonHandler2 = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="news_container">
      <h1>Latest news related to smart home</h1>
      {
        //slicedNew.length > 0 ? (
        <div className="news_firstLine">
          {slicedNew?.map((news) => (
            <div className="news_cardRow">
              <a className="news_card" href={news.link} target="_blank">
                <img src={news.media} alt="firstNews" />
                <div className="news_content">
                  <h1>{news.title.substring(0, 27) + "..."}</h1>
                  <p>{news.published_date.substring(0, 10)}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
        //) : (
        // <div className="news_container_firstLine">
        //   <img
        //     className="news_loader"
        //     src="https://feccoo-madrid.org/f4404720ece11355df318a0acf525cb1000063.gif"
        //     alt="loading"
        //   />
        // </div>
        //)
      }
      <div className="news_paginated">
        <button className="news_button_paginated" onClick={buttonHandler2}>
          Prev
        </button>
        <p>{page}</p>
        <button className="news_button_paginated" onClick={buttonHandler}>
          Next
        </button>
      </div>
    </div>
  );
};

export default News;
