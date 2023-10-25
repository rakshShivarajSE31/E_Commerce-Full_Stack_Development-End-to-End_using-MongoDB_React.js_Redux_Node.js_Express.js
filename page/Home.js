import React, {useEffect, useRef, useState} from 'react'
//import React, { useEffect, useRef, useState } from "react";
import HomeCard from '../component/HomeCard'

import { useSelector } from "react-redux";
import CardFeature from '../component/CardFeature';

import { GrPrevious, GrNext } from "react-icons/gr"; //previous and next icons
import FilterProduct from '../component/FilterProduct';
import AllProduct from '../component/AllProduct';



const Home = () => {

  const productData = useSelector((state) => state.product.productList);
  console.log(productData);
  const homeProductCartList = productData.slice(40,52);

  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable",[])
  console.log(homeProductCartListVegetables)

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);



  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };




  //FILTER DATA DISPLAY



  return (
  <div>
    <body className='bg-gradient-to-t from-gray-400 via-gray-400 to-transparent'>
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-8 py-3'>
        <div className='md:w-1/2 py-4'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm text-navy-400 font-medium inline-block'>Express!!!</p>
            <img src='https://t3.ftcdn.net/jpg/04/73/02/64/360_F_473026422_k3XjtqTh0Br3Iw8IfhlB9c72n9dqi9n5.jpg' className='h-10'/>
          </div>
          <h2 className='text-4xl text-red-600 md:text-4.5xl inline-block font-bold py-3'>Grocery-Express <span className='text-indianred-500 text-2xl' style={{ color: 'lightseagreen' }}>The Fastest Delivery to your Home</span></h2>
          <p className='py-1 text-base font-semibold'style={{ fontFamily: 'Roboto, sans-serif', color: '#333', textAlign: 'justify' }}>At Grocery-Express, we take pride in offering an extensive range of wholesale products across various categories, ensuring that you have access to the best quality ingredients and pantry essentials at competitive prices. Whether you're stocking up for your restaurant, catering business, or simply looking to save on your household grocery bills, we've got you covered. Our fruit and vegetable selection is always fresh and sourced directly from trusted farms, while our dairy products, cereals, and condiments are available in bulk quantities to meet your wholesale needs.</p>
          <p className='py-1 text-base font-bold'style={{ fontFamily: 'Roboto, sans-serif', color: '#333', textAlign: 'justify' }}>As your reliable partner in wholesale grocery shopping, Grocery-Express is committed to providing you with not only a vast assortment of products but also the fastest and most efficient delivery service. We understand the importance of time when it comes to running a kitchen or keeping your home well-stocked, which is why our lightning-fast delivery ensures that your orders arrive promptly, right at your doorstep. Say goodbye to long queues and time-consuming trips to physical stores. Join the countless satisfied customers who have made us their preferred choice for wholesale grocery shopping. At Grocery-Express, your convenience is our priority, and we are dedicated to making your shopping experience as seamless as possible.</p>
          <button className="mt-4 font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">Order Now</button>
        </div>
        


        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center' style={{overflowY: 'auto', maxHeight: '500px'}}>
          {
            homeProductCartList[0] ? homeProductCartList.map((el) => {
              return(
                <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
              );
            })
            :
            loadingArray.map((el,index) => (
              <HomeCard loading="Loading..." key={index+"cartLoading"} />
            ))
          }
        </div>
        

      </div>
      <div style={{ marginTop: "-5px", position: "relative", zIndex: "1" }}>
        <div className='flex w-full items-center'>
          <h2 className='font-bold text-2xl text-slate-800'>Fresh Vegies</h2>
          <div className='ml-auto flex gap-4'>
            <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext/></button>
          </div>
        </div>
        
        <div className='ml-auto flex gap-4 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
          {
            homeProductCartListVegetables[0] ? homeProductCartListVegetables.map(el => {
              return(
                <CardFeature
                  key={el._id + "vegetable"}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                />
              )
            })
            :
            loadingArrayFeature.map((el, index) => ( <CardFeature loading = "Loading..." key={index + "cartLoading"}/>)
          )}
        </div>
      </div>

      {/* display categories */}
      <AllProduct heading={"Your Product "}/>


    </div>

  </body>
    </div>
  )
}

export default Home


