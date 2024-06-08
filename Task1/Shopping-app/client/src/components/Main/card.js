import React from 'react'

const card = ({idx,image,name,detail,price,handleItems,buyOrNot}) => {
  return (
    <div className='card'>
      <img alt="shoes" src={require(`../../assets/img/${image}`)}   className='imgshoe'></img>
      <h2>{name} </h2>
      <p>{detail}</p>
      <h2>Rs.{price}</h2>
      {
      !buyOrNot[idx]?<button  onClick={()=>handleItems(idx,true)}>Add To Cart</button>:
      <button onClick={()=>handleItems(idx,false)}>Remove Item</button>
      }
    </div>
  )
}

export default card
