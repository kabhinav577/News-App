import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async ()=> {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1bb1cdf4a93740b0b87625e008e3017b&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  }

  useEffect(()=> {
    document.title = `${capitalizeFirstLetter(
      props.category
    )} -- NewsTrend`;
  
   updateNews();
   // eslint-disable-next-line
  }, [])


  // for Fetching news from https calls and show data in app.

  const fetchMoreData = async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${ 
      props.category
    }&apiKey=1bb1cdf4a93740b0b87625e008e3017b&page=${
      page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

    return (
      <div>
        <h1 className="text-center" style={{ margin: "35px 0", marginTop: "90px" }}>
          NewsTrend -- Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>

        {/* Use Spinner Components Here and parse through loading: false state*/}

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-3">
              {/* for retrieve data from array*/}

              {articles.map((element) => {
                return (
                  <div className="col-md-4 mb-3" key={element.url}>
                    {/* when the title is null then terinary operator code run*/}

                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
}

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 6,
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
