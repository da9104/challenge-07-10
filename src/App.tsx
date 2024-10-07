import { useState, useEffect, useRef } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { getMockData } from './data'; 
import Card from './components/Card.tsx';
import GoTop from './components/GoTop.tsx';
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
  const [scrollPosition, setSrollPosition] = useState(0)
  const [showGoTop, setShowGoTo] = useState("goTopHidden");
  const refScrollUp = useRef();

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
      //SCROLL LISTENER
      useEffect(() => {
        window.addEventListener("scroll", handleVisibleButton);
      });
  
    const handleScrollUp = () => {
      refScrollUp.current.scrollIntoView({ behavior: "smooth" });
    };  

  const handleVisibleButton = () => {
    const position = window.pageYOffset;
    setSrollPosition(position);

    if (scrollPosition > 50) {
      return setShowGoTo("goTop");
    } else if (scrollPosition < 50) {
      return setShowGoTo("goTopHidden");
    }
  };

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
    <div ref={refScrollUp} className='flex flex-col w-full'>
     <h1 className='text-center py-5'>An Infinite Scroll Effect</h1>
      <SkeletonTheme height={30} baseColor="#202020" highlightColor="#444" >
        {data.map((item, index) => (
          <Card key={index} productName={item.productName} productPrice={item.price} boughtDate={item.boughtDate} />
        ))}
       </SkeletonTheme>

      {isLoading &&  <Skeleton count={10} containerClassName="place-self-center flex-1 w-[45%]" /> }
      {isEnd && <p>No more data to load</p>}

      <GoTop showGoTop={showGoTop} scrollUp={handleScrollUp} />
    </div>
  )
}

export default App
