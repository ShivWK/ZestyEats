import { useGetfoodieThoughtsQuery } from '../../../features/home/homeApiSlice';
import { useState } from 'react';
import Cards from './Cards';

export default function FoodieThoughts() {
  const [user , setUser] = useState("Shivendra");
    const { data = [], isLoading } = useGetfoodieThoughtsQuery();
    console.log(isLoading);
    console.log(data);
    
    return <>
      <div className='flex justify-between flex-wrap items-center'>
        <h3 className='text-[21px] font-bold'>{`${user}, what's on your mind?`}</h3>
        <div className='flex justify-between gap-1'>
            <button><i className="ri-arrow-left-circle-fill text-[40px] text-[#ff5200] disabled:text-gray-400"></i></button>
            <button><i className="ri-arrow-right-circle-fill text-[40px] text-[#ff5200]"></i></button>
        </div>
      </div>
      <div className='relative'>
        <div className="flex gap-2 overflow-x-auto">
          { isLoading 
            ? <h2>Loading</h2>
            : data.length 
            ? data.map(item => (
              <Cards key={item.id} data={item} />
            ))
            : <h2>No data found</h2>
          }
        </div>
      </div>
      
    </>
}