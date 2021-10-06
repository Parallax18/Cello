// SPDX-License-Identifier: MIT  

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Celo {
    
    struct NewsItem {
        address payable authorAddress;
        string title;
        string excerpt;
        string imageUrl;
        string category;
        string author;
        string content;
        uint votes;
        uint256 timestamp;
    }

    uint256 newsLength = 0;
    uint256 postPrice = 3;
    uint256 likePrice = 1;

    uint256 balance = 0;
    
    mapping (uint => NewsItem) internal news;

    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    address internal agencyAddress = 0xb7BF999D966F287Cd6A1541045999aD5f538D3c6;
    
    event Like(
        address Voter,
        uint newID
    );

    event Dislike(
        address Voter,
        uint newID
    );
        
    function addNews(
        string memory _title,
        string memory _excerpt,
        string memory _imageUrl,
        string memory _category,
        string memory _author,
        string memory _content
    )public{
        balance = IERC20Token(cUsdTokenAddress).balanceOf(msg.sender);
        // an author of a news post is required to pay a fee
        require(
          balance >= postPrice,
          "Your balance is not enough to make the transaction"
        );
        
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                agencyAddress,
                postPrice
            )
        );

        news[newsLength] = NewsItem(
            payable(msg.sender),
            _title,
            _excerpt,
            _imageUrl,
            _category,
            _author,
            _content,
            0,
            block.timestamp
        );
        newsLength++;
    }
    
    function getNews(uint _index) public view returns(
        address payable,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        uint,
        uint256
    ){
        NewsItem storage newsItem = news[_index];

        return (
            newsItem.authorAddress,
            newsItem.title,
            newsItem.excerpt,
            newsItem.imageUrl,
            newsItem.category,
            newsItem.author,
            newsItem.content,
            newsItem.votes,
            newsItem.timestamp
        );
    }
    

    function likeNews(uint _index) public payable {
        require(
            msg.sender != news[_index].authorAddress,
            "You can not like your own post"
        );
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                news[_index].authorAddress,
                likePrice
            ),
            "Donate the news failed."
        );
        news[_index].votes++;
        emit Like(msg.sender, _index);
    }

    function dislikeNews(uint _index) public {
        require(
            msg.sender != news[_index].authorAddress,
            "You can not dislike your own post"
        );
        require(news[_index].votes > 0, "Can not dislike the news has 0 vote(s).");
        news[_index].votes--;
        emit Dislike(msg.sender, _index);
    }
    
    function getNewsLength() public view returns (uint) {
        return (newsLength);
    }
    
}