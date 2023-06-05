import { useState } from 'react';
import './App.css';

const createArr = (n) => {
    const iArr = new Array(n);
    for (var i = 0; i < n; i++)  iArr[i] = i + 1;
    return iArr;
}

function Page({ initialData, page, setPage, maxFirstPage }) {
    let len = initialData.length;
    let maxPage = parseInt(Number(len) / maxFirstPage) + 1;
    let pageLimit = Math.min(parseInt(Number(len) / maxFirstPage) + 1, 5);

    const [blockNum, setBlockNum] = useState(0);
    const [currPage, setCurrPage] = useState(1);

    const v = Number(blockNum * pageLimit);
    const iArr = createArr(maxPage);
    let pArr = iArr.slice(v, Number(pageLimit) + v);

    const firstPage = () =>{
        setPage(1)
        setBlockNum(0)
        setCurrPage(1)
    }

    const lastPage = () =>{
        setPage(maxPage)
        setBlockNum(Math.ceil(maxPage/pageLimit)-1)
        setCurrPage(maxPage)
    }

    const prevPage = () => {
        if (currPage <= 1)
            return;
        if ((currPage - 1) <= pageLimit * blockNum) {
            setBlockNum(n => n - 1);
        }
        setCurrPage(n => n - 1);
        setPage(n=>n-1);
    }
    const nextPage = () => {
        if (currPage >= maxPage)
            return;
        if (pageLimit * Number(blockNum + 1) < Number(currPage + 1)) {
            setBlockNum(n => n + 1);
        }
        setCurrPage(n => n + 1);
        setPage(n=>n+1);
    }

    const nowPage = (n)=>{
        setPage(n)
        setCurrPage(n)
    }

    return (
        <div className='paging'>
            <button className='pagebtn' onClick={firstPage}>&lt;&lt;</button>
            <button className='pagebtn' onClick={prevPage}>&lt;</button>
            {pArr.map(num => (
                page == num ?
                    (<button key={num} className='pagebtn yellow'>
                        {num}
                    </button>) :
                    (<button key={num} className='pagebtn' onClick={() => {
                        nowPage(num);
                    }}>
                        {num}
                    </button>)
                    )
                )
            }
            <button className='pagebtn' onClick={nextPage}>&gt;</button>
            <button className='pagebtn' onClick={lastPage}>&gt;&gt;</button>
        </div>
    );
}

export default Page;