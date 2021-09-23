import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

const NewsItem = props => {
    return (
        <Fragment>
        <div className="col-sm-6">
            {/* post */}
            <div className="post post-grid rounded bordered">
                <div className="thumb top-rounded">
                    <a href="category.html" className="category-badge position-absolute">{props.newsItem.category}</a>
                    <span className="post-format">
                        <i className="icon-earphones" />
                    </span>
                    <a href="blog-single.html">
                        <div className="inner">
                            <img src={props.newsItem.imageUrl} alt="post-title" />
                        </div>
                    </a>
                </div>
                <div className="details">
                    <ul className="meta list-inline mb-0">
                        <li className="list-inline-item"><a href="#"><img src="images/other/author-sm.png" className="author" alt="author" />{props.newsItem.author}</a></li>
                        <li className="list-inline-item">{props.newsItem.timestamp}</li>
                    </ul>
                    <h5 className="post-title mb-3 mt-3"><Link to={`/details/${props.newsItem.index}`}>{props.newsItem.title}</Link></h5>
                    <p className="excerpt mb-0">{props.newsItem.excerpt}</p>
                </div>
                <div className="post-bottom clearfix d-flex align-items-center">
                    <div className="social-share me-auto">
                        <button className="toggle-button icon-share" />
                        <ul className="icons list-unstyled list-inline mb-0">
                            <li className="list-inline-item"><a href="#"><i className="fab fa-facebook-f" /></a></li>
                            <li className="list-inline-item"><a href="#"><i className="fab fa-twitter" /></a></li>
                            <li className="list-inline-item"><a href="#"><i className="fab fa-linkedin-in" /></a></li>
                            <li className="list-inline-item"><a href="#"><i className="fab fa-pinterest" /></a></li>
                            <li className="list-inline-item"><a href="#"><i className="fab fa-telegram-plane" /></a></li>
                            <li className="list-inline-item"><a href="#"><i className="far fa-envelope" /></a></li>
                        </ul>
                    </div>
                    <div className="more-button float-end">
                        <a href="#"><span className="icon-options" /></a>
                    </div>
                </div>
            </div>
        </div>
        
        </Fragment>
    );
}

export default NewsItem