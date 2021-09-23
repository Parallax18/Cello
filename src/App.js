import React, { useState, useEffect } from 'react';

import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";

import NotificationSystem from 'react-notification-system';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import news from './contracts/abis/news.abi.json';
import erc20 from './contracts/abis/ierc.abi.json';

import Header from './components/Header';
import News from './components/News';
import NewsDetails from './components/NewsDetails';

const ERC20_DECIMALS = 18;

const contractAddress = "0xc758f5786153600777A2101A15dd1abb397064ab";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";


function App() {
  const [celoBalance, setCeloBalance] = useState(0);
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [mainNews, setMainNews] = useState([]);
  const [newsItem, setNewsItem] = useState({})

  const notificationSystem = React.createRef();

  useEffect(() => {
    connectCeloWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      return getBalance();
    } else {
      console.log('no kit')
    }
  }, [kit, address]);

  useEffect(() => {
      if(contract){
        getNews(false);
      }
  }, [ contract])

  const addToNews = async (_title, _image, _category, _summary,_author, _content) => {
    const cUSDContract = new kit.web3.eth.Contract(erc20, cUSDContractAddress);
    try {
      const postPrice = new BigNumber(3).shiftedBy(ERC20_DECIMALS).toString();

      await cUSDContract.methods
        .approve(contractAddress, postPrice)
        .send({ from: address });

      await contract.methods.addNews(_title, _summary, _image, _category, _author, _content).send({ from: address });
      getNews(false);
    } catch (error) {
      console.log(error);
    }

  }

  const getNewsById = id=>{
    mainNews.map(news => {
      if(news.index == id){
        setNewsItem(news)
      }
    });
  }

  const getNews = async (isRead)=>{
    const newsLength = await contract.methods.getNewsLength().call();
    const _news = [];

    for (let index = 0; index < newsLength; index++) {
      let _newsP = new Promise(async (resolve, reject)=>{
        let n = await contract.methods.getNews(index,isRead).call();

        let mainTime =  new Date(n[7] * 1000)
        const mainYear = mainTime.getFullYear();
        const month = mainTime.getMonth()+1;
        const dt = mainTime.getDate();
        resolve({
          index: index,
          authorAddress: n[0],
          title: n[1],
          excerpt: n[2],
          imageUrl: n[3],
          category: n[4],
          author: n[5],
          content: n[6],
          timestamp: `${dt}/${month}/${mainYear}`
        });

      });
      _news.push(_newsP);    
    }

    const news = await Promise.all(_news);
    setMainNews(news);

  }

  const connectCeloWallet = async () => {
    if (window.celo) {
      try {
        const notification = notificationSystem.current;
        notification.addNotification({
          message: 'We are setting up your account',
          level: 'info'
        })
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);

      } catch (error) {
        const notification = notificationSystem.current;
        notification.addNotification({
          message: `${error}`,
          level: 'error'
        });
      }
    } else {
      const notification = notificationSystem.current;
      notification.addNotification({
        message: 'Please Install the CeloExtensionWallet',
        level: 'info'
      })
    }
  };

  const getBalance = async () => {

    const notification = notificationSystem.current;
    notification.addNotification({
      message: 'We are getting your USD balance...',
      level: 'info'
    });
    try {
      const balance = await kit.getTotalBalance(address);
      const celoBalance = balance.CELO.shiftedBy(-ERC20_DECIMALS).toFixed(2);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
  
      const contract = new kit.web3.eth.Contract(news, contractAddress);
      setcontract(contract);
      setCeloBalance(celoBalance);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
      notification.addNotification({
        message: `${error}`,
        level: 'error'
      });
    }


  };

  return (
    <Router>
    <div>
      <Header balance={cUSDBalance} />
      <Switch>
        <Route exact path = "/">
        <News addNews={addToNews} news = {mainNews} />  
        </Route>
        <Route path = "/details/:id">
        <NewsDetails getNews = {getNewsById} newsItem= {newsItem}/>
        </Route>
      </Switch>      
      <NotificationSystem ref={notificationSystem} />
    </div>
    </Router>
  );
}

export default App;
