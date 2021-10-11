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

contract celonews {
    
    struct NewsItem {
        address payable authorAddress;
        string title;
        string excerpt;
        string imageUrl;
        string category;
        string author;
        string content;
        uint256 timestamp;
        
        uint256 views;
        
    }

    uint256 newsLength = 0;
    
    uint256 postPrice = 3;
    
    mapping (uint => NewsItem) internal news;
    address internal cUsdTokenAddress;
    address internal agencyAddress;
    address public adminAddress;
    
    event News(
        address authorAddress,
        string title,
        string excerpt,
        string imageUrl,
        string category,
        string author,
        string content,
        uint256 timestamp
    );
    
    modifier onlyOwner(){
        require(msg.sender == adminAddress, "Only admins can call this function");
        _;
    }
    
    constructor(){
        agencyAddress = 0xb7BF999D966F287Cd6A1541045999aD5f538D3c6;
        cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
        adminAddress = msg.sender;
    }
    
    
        
    function addNews(
    
        string memory _title,
        string memory _excerpt,
        string memory _imageUrl,
        string memory _category,
        string memory _author,
        string memory _content
    )public{
        // an author of a news post is required to pay a fee
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            agencyAddress,
            postPrice
          ),    
          "This transaction could not be performed"
        );
        news[newsLength] = NewsItem(
            payable(msg.sender),
            _title,
            _excerpt,
            _imageUrl,
            _category,
            _author,
            _content,
            block.timestamp,
            0
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
            newsItem.timestamp
        );
    }
    
    // Dev : Admin can edit the content a news by passing in the id of the news and the content
    function editNewsContent(uint _index, string memory _content) public onlyOwner {
        NewsItem storage newsItem = news[_index];
        newsItem.content = _content;
        
    }
    
 
      function getNewsLength() public view returns (uint) {
        return (newsLength);
    }
    
}