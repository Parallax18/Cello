const Widget = props => {
    return (
        <div className="col-lg-4">
                            {/* sidebar */}
                            <div className="sidebar">
                                {/* widget about */}
                                <div className="widget rounded">
                                    <div className="widget-about data-bg-image text-center" data-bg-image="./map-bg.png">
                                        <h2 className="mb4">NewsDApp</h2>
                                        <p className="mb-4">We are a decentralized news platform that enables us operate without the boundaries of government regulation. True independent journalism. Get your Celo extension wallet and start posting. Donate a token of 3cUSD before every post to keep this project going</p>
                                    </div>
                                </div>


                                {/* widget advertisement */}
                                <div className="widget no-container rounded text-md-center">
                                    <span className="ads-title">- Sponsored Ad -</span>
                                    <a href="#" className="widget-ads">
                                        <img src="https://c1.wallpaperflare.com/preview/755/870/343/coca-cola-vintage-ad-advertisement-thumbnail.jpg" alt="Advertisement" />
                                    </a>
                                </div>
                                {/* widget tags */}
                                <div className="widget rounded">
                                    <div className="widget-content">
                                        <a href="#" className="tag">#Trending</a>
                                        <a href="#" className="tag">#Video</a>
                                        <a href="#" className="tag">#Featured</a>
                                        <a href="#" className="tag">#Gallery</a>
                                        <a href="#" className="tag">#Celebrities</a>
                                    </div>
                                </div>
                            </div>
                        </div>
    )
}

export default Widget;