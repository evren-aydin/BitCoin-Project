import axios from "axios";
import { useEffect, useState } from "react";
import Coin from "./Coin";
import "./App.css";
function App() {

  const [coins,setCoins]= useState([]);
  const [search,setSearch]= useState("");
  
useEffect(()=>{
  axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=merket_cap_desc&per_page=100&page=1&sparkline=false")
  .then((res)=>{
    setCoins(res.data);
    console.log(res.data)})
    
    .catch((err)=>{err.data});

},[coins.price])

const handleChange=(e)=>{
setSearch(e.target.value);

}
const filtredCoins = coins.filter(coin=> coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
   <div className="coin-app">
    <div className="coin-search">

      <h1 className="coin-text">Search a currency</h1>
      <form>
        <input type="text" className="coin-input" placeholder="Search" onChange={handleChange}/>
      </form>
    </div>
{filtredCoins.map((coin)=>{
  return <Coin key={coin.id} name ={coin.name} price={coin.current_price} image={coin.image} symbol={coin.symbol} marketcap={coin.market_cap} 
  priceChange={coin.price_change_percentage_24h}
  volume={coin.total_volume}
  />
}) }

   </div>
  )
}

export default App
