import React, {  useEffect, useState } from "react";
import News from "./News";
import Spinner from "./Spinner";

export default function Home() {

  const [description, setdescription] = useState("Hello");
  const [title, settitle] = useState("hello");
  const [myimg, setmyimg] = useState(
    "https://fakeimg.pl/440x320/282828/eae0d0/?retina=1"
  );
  const [myarrvalues, setmyarrvalues] = useState([]);
  const [page, setpage] = useState(0);
  const [pageSize,setpageSize] = useState(9);
  const [totalPage, settotalPage] = useState(1);
  const [progress, setprogress] = useState(10);
  const [loading, setloading] = useState(false);

  const callNewsApi = async () => {
    setloading(true);
   return await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pagesize=${pageSize}&page=${page}`
    ).then((response) => response.json());
   
   
    
  };

  const fetchData = async () => {
    setloading(true);
    const actualData= await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pagesize=${pageSize}&page=${page}`
    ).then((response) => response.json());
  setprogress(50);
    settitle(actualData.articles[0].title);
    setmyimg(actualData.articles[0].urlToImage);
    setdescription(actualData.articles[0].description);
    setmyarrvalues(actualData.articles);
    settotalPage(Math.ceil(actualData.totalResults / pageSize));
    setloading(false);
    setprogress(90);
};
  useEffect(() => {
    fetchData()
  },[]);
 
  const handlenextpage = async () => {
    setloading(true);
    const actualData = await callNewsApi();
    setprogress(50);
    settitle(actualData.articles[0].title);
    setmyimg(actualData.articles[0].urlToImage);
    setdescription(actualData.articles[0].description);
    setmyarrvalues(actualData.articles);
    settotalPage(Math.ceil(actualData.totalResults / pageSize) + 1);
    setpage(page + 1);
    setloading(false);
    setprogress(90);
  };

  const handlepreviouspage = async () => {
    setloading(true);
    const actualData = await callNewsApi();
    setprogress(50);
    settitle(actualData.articles[0].title);
    setmyimg(actualData.articles[0].urlToImage);
    setdescription(actualData.articles[0].description);
    setmyarrvalues(actualData.articles);
    settotalPage(Math.ceil(actualData.totalResults / pageSize) - 1);
    setpage(page - 1);
    setloading(false);
    setprogress(90);
  };

  return (
    <div className="mt-5 mb-5 row col-md-12">
      <div className="mt-5 mb-5 row float-end">
        <div className="col-md-12">
          <button
            disabled={page === 1 ? true : false}
            id="myprev"
            style={{ width: "200px" }}
            onClick={handlepreviouspage}
            className="btn btn-primary "
          >
            Previous
          </button>
          <button
            disabled={page === totalPage ? true : false}
            style={{ width: "200px" }}
            onClick={handlenextpage}
            className="btn btn-primary float-end"
          >
            Next
          </button>
        </div>
      </div>

      {loading && <Spinner />}
      {myarrvalues.map((item, i) => (
        <News
          key={i}
          title={item.title ? item.title.substring(1, 20) : "Fake Title"}
          pictre={
            item.urlToImage
              ? item.urlToImage
              : "https://fakeimg.pl/440x320/282828/eae0d0/?retina=1"
          }
          desc={
            item.description
              ? item.description.substring(1, 50)
              : "Fake Description"
          }
        />
      ))}
    </div>
  );
}



