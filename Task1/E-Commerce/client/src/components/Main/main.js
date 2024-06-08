import Card from './card'
import Data from '../../Data/data.json'
import { useEffect, useState } from 'react';
function Main(){
  const[items,SetItems]=useState(0);
  // const [cartItems,SetCartItems]=useState([]);
  const [buyOrNot,SetBuyOrNot]=useState(Array(Data.length).fill(false))
  
  const handleItems=(id,add)=>{
    if(add && buyOrNot[id]===false){ 
      SetItems(items+1);
      const newArray=buyOrNot.map((ele,idx)=>idx===id?!ele:ele);
      SetBuyOrNot(newArray);
    }
    else if(add===false){      
      SetItems(items-1);
      const newArray=buyOrNot.map((ele,idx)=>idx===id?!ele:ele);
      SetBuyOrNot(newArray);
      
    } 
  
  }
  useEffect(()=>{
   
  },buyOrNot)

return (
    <>
    <h3 className='cart'>Items in Cart: {items}</h3>
    
    <div className='main'>
      
      {Data.map((item,i)=>{
        
          return (
          <Card key={i} idx={i} image={item.image} name={item.name} detail={item.detail} price={item.price} 
          handleItems={handleItems} buyOrNot={buyOrNot}
          />
          );
      })}
      
    </div>
    </>
);
}

export default Main