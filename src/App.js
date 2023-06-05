import './App.css';
import NewListing from './NewListing';
import Markets from './Markets';
import axios from 'axios';
import { useEffect, useState } from 'react';

const url = '/api/v3/ticker/24hr';

function App() {
  const [data,setData]=useState([]);

  const getData = async () => {
    const result = await axios.get(url);
    setData(result.data);
  }
  useEffect(() => {
    getData()
  }, []);
  return (
    <div className="container">
      <NewListing data={data} />
      <Markets data={data} />
    </div>
  );
}
export default App;
