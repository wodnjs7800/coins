import { useState } from 'react';
import './App.css';

function NewListing({data}) {
  const [num, setNum] = useState(0);
  let data_slice = data.slice(num, num + 4);
  const downNum = () => {
    if (num > 0) setNum((num) => num - 1);
  }
  const upNum = () => {
    if (num < Number(data.length) - 4) setNum((num) => num + 1);
  }
  return (
    <div className="top_box">
      <p className="top_name">New Listing</p>
      <div>
        <button className='top_botton left' type='button' data-role='none'
          onClick={downNum}></button>
        <div>
          {data_slice.map(function (a, i) {
            return (
              <TopItem Item={a} />
            )
          })
          }
        </div>
        <button className='top_botton right' type='button' data-role='none'
          onClick={upNum}></button>
      </div>
    </div>
  );
}

function TopItem({ Item }) {
  return (
    <div className="top_inner_box">
      <div className='top0'></div>
      <p className='top1'>{Item.symbol}</p>
      <p className='top2'>{Number(Item.lastPrice).toLocaleString()}</p>
      {
        Number(Item.priceChangePercent) >= 0 ?
          <p className='top3 green'>+{Number(Item.priceChangePercent).toFixed(2)}%</p> :
          <p className='top3 red'>{Number(Item.priceChangePercent).toFixed(2)}%</p>
      }
      <div className='top4'>Trade Now →</div>
    </div >
  )
}

export default NewListing;
