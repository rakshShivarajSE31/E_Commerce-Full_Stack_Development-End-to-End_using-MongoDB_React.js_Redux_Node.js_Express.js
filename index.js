const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//payment
const Stripe = require('stripe')

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// MongoDB connection
console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connect to Database"))
.catch((err)=>console.log(err))


//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type : String,
        unique : true,
    },
    password: String,
    confirmPassword: String,
    image: String,
})

//model
const userModel = mongoose.model("user", userSchema)


// API
app.get("/", (req, res) => {
  res.send("Server is running");
});


// Update your /signup route
app.post("/signup", async (req, res) => {
    const { email } = req.body;
  
    try {
      const existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        res.send({ message: "Email id is already registered", alert: false });
      } else {
        const data = new userModel(req.body);
        await data.save(); // Use await here to ensure it completes before sending the response.
        res.send({ message: "Successfully signed up", alert: true });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error", alert: false });
    }
  });
  

// Update your /login route
app.post("/login", async (req, res) => {
    try {
      console.log('Hitting the login part!!')
      console.log(req.body); // Log the data sent from the client
      const { email } = req.body;
      const user = await userModel.findOne({ email: email });
  
      if (user) {
        const dataSend = {
            _id: user._id,
            firstName: user.firstName,
            lastName:user.lastName ,
            email: user.email,
            // password: '1234',
            //confirmPassword: '1234',
            image: user.image,
        };
        console.log(dataSend);
        // You can send user data or a success message as needed.
        //console.log(user);
        res.send({ message: "Login is successful", user: user, alert: true, data: dataSend });
      } else {
        res.send({ message: "Email not found, please Sign-up", alert: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error", alert: false });
    }
  });
  
  
////Product Part
//product section:
const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)

//save product in the database
app.post("/uploadProduct",async(req,res)=>{
  console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({message : "Upload successfully"})
})

//fetch all the data
app.get("/product",async(req,res)=>{
  
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})


// payment gateway API

console.log(process.env.STRIPE_SECRET_KEY)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/checkout-session", async (req, res) => {
  console.log(req.body);
  try{
    const params = {
        submit_type : 'pay',
        mode : "payment",
        payment_method_types : ['card'],
        billing_address_collection : "auto",
        shipping_options : [{shipping_rate : "shr_1NwW9UIR1kI1rQYasC4HExrj"}],

        line_items : req.body.map((item)=>{
          return{
            price_data : {
              currency : "USD",
              product_data : {
                name : item.name,
                //images : [item.image]
              },
              unit_amount : item.price * 100,
            },
            adjustable_quantity : {
              enabled : true,
              minimum : 1,
            },
            quantity : item.qty
          }
        }),
        success_url : `${process.env.FRONTEND_URL}/success`,
        cancel_url : `${process.env.FRONTEND_URL}/cancel`,

    }
    const session = await stripe.checkout.sessions.create(params)
      // console.log(session)
    res.status(200).json(session.id)
     }
     catch (err){
        res.status(err.statusCode || 500).json(err.message)
     }
  // res.send({ message: "Payment Gateway", success: true });
});




app.listen(PORT, () => console.log("Server is running at port: " + PORT));
