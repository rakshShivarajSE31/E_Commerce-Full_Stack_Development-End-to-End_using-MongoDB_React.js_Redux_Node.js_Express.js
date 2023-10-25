import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../component/cartProduct';
import emptyCartImage from "../pictures/empty.gif"
import { toast } from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
const Cart = () => {
    const productCartItem = useSelector((state) => state.product.cartItem);

    //payment is initiated only if user had login
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

//     const user = useSelector(state => state.user)
//   const navigate = useNavigate()

    const totalQty = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.qty),
        0
    );
    // const totalPrice = productCartItem.reduce(
    //     (acc, curr) => acc + parseInt(curr.total),
    //     0
    // );
    

    const totalPrice = productCartItem.reduce(
        (acc, curr) => {
            console.log('Item Price:', curr.price);
            console.log('Item Quantity:', curr.qty);
            const itemTotal = parseFloat(curr.price) * parseInt(curr.qty);
            return acc + itemTotal;
        },
        0
    );
    
    



const handlePayment = async () => {

    if(user.email) {
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkout-session`,{
          method: 'POST', // Use POST method for sending data
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(productCartItem)
        })
        if(res.statusCode === 500) return;

        const data = await res.json();
        console.log(data);

        toast("Redirecting to Payment Gateway...!")
        stripePromise.redirectToCheckout({sessionId : data})    
    }
    else {
        toast("OOPS!.. Please Login for Payment")
        setTimeout(()=>{
            navigate("/login")
        },1000)
    }



      };
       


    
  return (
    <>
    <div className='p-2 md:p-5'>
        <h2 className="text-lg md:text-2xl font-bold text-slate-700">Your Cart Items </h2>
        {
            productCartItem[0] ?
        <div className='my-4 flex gap-3'>
            {/* Now display the cart items */}
            <div className='w-full max-w-3xl'> 
                {
                    productCartItem.map(el => {
                        return(
                            <CartProduct
                                key={el._id}
                                id={el._id}
                                name={el.name}
                                image={el.image}
                                category={el.category}
                                qty={el.qty}
                                total={el.total}
                                price={el.price}
                            />
                        )
                    })
                }
            </div>
 
            {/* Now display total cart items */}
            <div className='w-full max-w-md  ml-auto'>
                <h2 className="bg-orange-500 text-white p-2 text-lg font-bold w-full flex justify-center items-center">Summary</h2>
                <div className="flex w-full py-2 text-lg border-b">
                    <p className='font-bold'>Total Quantity   :</p>
                    <p className="ml-auto w-32 font-bold">{totalQty}</p>
                </div>
                <div className="flex w-full py-2 text-lg border-b">
                    <p className='font-bold'> Total Price  :</p>
                    <p className="ml-auto w-32 font-bold">
                        <span className="text-red-500">$</span> {totalPrice}
                     </p>
                </div>
                <button className="bg-red-500 w-full text-lg font-bold py-2 text-white" onClick={handlePayment} >
                    Payment
                 </button>
            </div>
        </div>
        :
        <>
        <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCartImage} className="w-full max-w-sm"/>
            <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
        </div>
        </>
        }
        
    </div>
            
    </>
  );
}

export default Cart