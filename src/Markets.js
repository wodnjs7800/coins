import Page from './Page';
import './App.css';
import { useEffect, useState } from 'react';

const maxFirstPage = 20;

function Markets({data}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState(true);

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  // 거래량 정렬
  data.sort(function(a,b){
    return b.volume - a.volume
  })

  //검색 정렬
  let filterSymbol = data.filter((p) => {
    return p.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  })

  let filterData = filterSymbol.slice((page - 1) * maxFirstPage, (page) * maxFirstPage)

  return (
    <div className="container">
      <div className="bottom_box">
        <div className="bottom_name">
          <div className="bottom_name_markets">Markets</div>
          <div className="bottom_name_search">
            <div className="serach_box_icon">🔍</div>
            <input className="serach_box" placeholder='Search' type="text" value={search} onChange={onChange}></input>
          </div>
        </div>
        <p className="bottom_name_spot">Spot</p>
        <div className='bootom_name_box'>
          <p className="bottom_name_all">All</p>
        </div>
        <div className="bottom_inner">
          <div className="coin_name0"></div>
          <div className="coin_name1">Trading Paris</div>
          <div className="coin_name2 coin_name">Last Traded Price ↕</div>
          <div className="coin_name3 coin_name">24H Change % ↕</div>
          <div className="coin_name4 coin_name">24H Hight</div>
          <div className="coin_name5 coin_name">24H Low</div>
          <div className="coin_name6 coin_name">24H Trading Volume ↕</div>
          <div className="coin_name7 coin_name">Charts</div>
          <div className="coin_name8 coin_name">Trade</div>
        </div >
        <div>
          {filterData.map(function (a, i) {
            return (
              <BottomItem key={i} Item={a} />
            )
          })
          }
        </div>
        <div>
          <Page initialData={filterSymbol} page={page} setPage={setPage} maxFirstPage={maxFirstPage} />
        </div>
      </div>
    </div>
  );
}

function BottomItem({ Item }) {
  return (
    <div className="bottom_inner bottom_inner_box">
      <div className="coin_name0">
        <img></img>
      </div>
      <div className="coin_name1">{Item.symbol}</div>
      <div className="coin_name2 coin_name">{Number(Item.lastPrice).toLocaleString()}</div>
      {
        Number(Item.priceChangePercent) >= 0 ?
          <div className="coin_name3 coin_name green">
            +{Number(Item.priceChangePercent).toFixed(2)}%
          </div> :
          <div className="coin_name3 coin_name red">
            {Number(Item.priceChangePercent).toFixed(2)}%
          </div>
      }
      <div className="coin_name4 coin_name">{Number(Item.highPrice).toLocaleString()}</div>
      <div className="coin_name5 coin_name">{Number(Item.lowPrice).toLocaleString()}</div>
      <div className="coin_name6 coin_name">{(Number(Item.volume) / 1000000).toFixed(3)}M(USDT)</div>
      <div className="coin_name7 coin_name">
        <img src={`${process.env.PUBLIC_URL}/images/chart_img.JPG`} width="70px" />
      </div>
      <div className="coin_name8 coin_name">
        <div className="coin_name9">Trade</div>
      </div>
    </div >
  )
}

export default Markets;