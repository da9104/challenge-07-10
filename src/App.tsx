import { useState, useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { getMockData } from './data'; 
import Card from './components/Card.tsx';
import './App.css'

interface MockData {
  productName: string;
  price: number;
}
function App() {
  const [data, setData] = useState<MockData[]>([]); //MockData
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

   // Function to load data
   const loadData = async () => {
    if (isLoading || isEnd) return; // Prevent duplicate loading or loading if end is reached

    setIsLoading(true);
    const { datas, isEnd: reachedEnd } = await getMockData(page);

    setData((prevData) => [...prevData, ...datas]);
    setIsEnd(reachedEnd);
    setIsLoading(false);
    setPage((prevPage) => prevPage + 1);
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight) {
      loadData();
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);


  return (
    <div className='flex flex-col w-full'>
     <h1 className='text-center'>Scroll Example</h1>
      <SkeletonTheme height={30} baseColor="#202020" highlightColor="#444" >
        {data.map((item, index) => (
          <Card key={index} productName={item.productName} productPrice={item.price} boughtDate={item.boughtDate} />
        ))}
       </SkeletonTheme>

      {isLoading &&  <Skeleton count={10} containerClassName="place-self-center flex-1 w-[45%]" /> }
      {isEnd && <p>No more data to load</p>}
    </div>
  )
}

export default App
