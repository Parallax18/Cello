import React, { useState, Fragment } from 'react';

import NewsItem from './NewsItem';
import NewsForm from './NewsForm';
import Widget from './Widget';


const News = props => {
    return (
        <Fragment>
            <section className="main-content">
                <div className="container-xl">
                    <div className="row gy-4">
                        <div className="col-lg-8">
                            <div className="row gy-4">
                                {props.news.map(newsItem=>
                                    <NewsItem newsItem= {newsItem} />
                                )}

                            </div>
                        </div>
                        <Widget/>
                        <NewsForm addNews = {props.addNews}/>
                    </div>
                </div>
            </section>
            
        </Fragment>
    );
}

export default News;