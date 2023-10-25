
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from '../utility/ImagetoBase64'

const Newproduct = () => {
  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : ""
  })

  const handleOnChange = (e)=>{
    const {name,value} = e.target

    setData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })

  }

  const uploadImage = async(e)=>{
      const data = await ImagetoBase64(e.target.files[0])
      // console.log(data)

      setData((preve)=>{
        return{
          ...preve,
          image : data
        }
      })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(data)

    const {name,image,category,price} = data

    if(name && image && category && price){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const fetchRes =  await fetchData.json()
  
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          description : ""
        }
      })
    }
    else{
      toast("Enter required Fields")
    }
    
   
  }
  return (

  <div>
    <body className="bg-gradient-to-t from-gray-400 via-gray-400 to-transparent">
    <div className="p-4">
       
       <form className='m-auto w-full max-w-md shadow-lg rounded-lg p-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white flex flex-col' onSubmit={handleSubmit}>
        
        
        <label htmlFor='name' className="text-lg font-bold mb-1">Name</label>
        <input type='text' name='name' className='bg-transparent border-b-2 border-white py-2 text-white placeholder-white placeholder-opacity-75 focus:outline-none focus:border-pink-300 mb-4' 
        onChange={handleOnChange} value={data.name} placeholder='Product Name' />

        
        <label htmlFor='category' className="text-lg font-bold mb-1">Category</label>
        <select className='bg-transparent border-b-2 border-white py-2 text-white placeholder-white placeholder-opacity-75 focus:outline-none focus:border-pink-300 mb-4' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"other"}>select category</option>
          <option value={"fruit"}>Fruit</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"dairy"}>Dairy</option>
          <option value={"cereals"}>Cereals</option>
          <option value={"condiments"}>Condiments</option>
          <option value={"baking"}>Baking Supplies</option>
          <option value={"beverages"}>Beverages</option>
          <option value={"frozen"}>Frozen Foods</option>
          <option value={"canned"}>Canned Beverages</option>
          <option value={"meat"}>Meat and Seafood</option>
          <option value={"pasta"}>Pasta and Grains</option>
          <option value={"bakery"}>Bakery</option>
          <option value={"spices"}>Spices and Seasonings</option>
        </select>

        <label htmlFor='image' className='mb-3 text-lg font-bold mb-1"'>Image
        <div  className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
            {
              data.image ? <img src={data.image} className="h-full" /> :<span className='text-5xl'><BsCloudUpload/></span> 
            }
              
            
           <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className="hidden"/>
        </div>
        </label>
        

        <label htmlFor='price' className='text-lg font-bold mb-1'>Price</label>
        <input type={"text"} className='bg-transparent border-b-2 border-white py-2 text-white placeholder-white placeholder-opacity-75 focus:outline-none focus:border-pink-300 mb-4' name='price' onChange={handleOnChange} value={data.price}/>

        <label htmlFor='description' className='text-lg font-bold mb-1'>Description</label>
        <textarea rows={2} value={data.description} className='bg-transparent border-b-2 border-white py-2 text-white placeholder-white placeholder-opacity-75 resize-none focus:outline-none focus:border-pink-300 mb-4' name='description' onChange={handleOnChange}></textarea>

        <button className='bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
       </form>
    </div>
    </body>
    </div>
  )
}

export default Newproduct
