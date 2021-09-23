import Widget from "./Widget";
import {useParams} from 'react-router-dom';
import { useEffect } from "react";

const NewsDetails = props => {
  const {id} = useParams();

  useEffect(() => {
    props.getNews(id)
  }, [])
  console.log(id);
    return (
        <section className="main-content mt-3">
    <div className="container-xl">

    <div className="row gy-4">
      <div className="col-lg-8">
        {/* post single */}
        <div className="post post-single">
          {/* post header */}
          <div className="post-header">
            <h1 className="title mt-0 mb-3">{props.newsItem.title}</h1>
            <ul className="meta list-inline mb-0">
              <li className="list-inline-item"><a href="#">{props.newsItem.category}</a></li>
              <li className="list-inline-item">{props.newsItem.timestamp}</li>
            </ul>
          </div>
          {/* featured image */}
          <div className="featured-image">
            <img src={props.newsItem.imageUrl} alt="post-title" />
          </div>
          {/* post content */}
          <div className="post-content clearfix">
             <p>{props.newsItem.content}</p>
          </div>
          {/* post bottom section */}
          <div className="post-bottom">
            <div className="row d-flex align-items-center">
              <div className="col-md-6 col-12 text-center text-md-start">
                {/* tags */}
                <a href="#" className="tag">#Trending</a>
                <a href="#" className="tag">#Video</a>
                <a href="#" className="tag">#Featured</a>
              </div>
              <div className="col-md-6 col-12">
                {/* social icons */}
                <ul className="social-icons list-unstyled list-inline mb-0 float-md-end">
                  <li className="list-inline-item"><a href="#"><i className="fab fa-facebook-f" /></a></li>
                  <li className="list-inline-item"><a href="#"><i className="fab fa-twitter" /></a></li>
                  <li className="list-inline-item"><a href="#"><i className="fab fa-linkedin-in" /></a></li>
                  <li className="list-inline-item"><a href="#"><i className="fab fa-pinterest" /></a></li>
                  <li className="list-inline-item"><a href="#"><i className="fab fa-telegram-plane" /></a></li>
                  <li className="list-inline-item"><a href="#"><i className="far fa-envelope" /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Widget/>
    </div>
  </div>
</section>

    )
}

export default NewsDetails;