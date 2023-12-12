const express = require('express');
const cors = require('cors')
require('./config');
const { ObjectId } = require('mongodb');

const _id = new ObjectId();
const Product = require('./product');
const product = require('./product');
const connectDB = require('./config');

const app = express();

app.use(cors({origin:"*"}))
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// db call
connectDB();

app.post("/create", async(req, res)=> {
  let   data = await product(req.body);
  let result = await data.save();
    console.log(result);
    res.send(result);
});


app.get("/list", async(req, res)=>{
let data = await product.find();
return res.status(200).send({'data': data});
})

app.delete("/delete/:title", async(req, res)=>{
  let data = await product.deleteOne(req.params);
  console.log("delete data",req.params);
  return res.status(200).send({'data': data});
})

  
/* This code block is defining a PUT endpoint `/update/:id` that updates a product with a specific ID.
It takes in the request parameters `id` and the request body containing the updated product
information. It then uses the `findOneAndUpdate` method to find the product with the specified ID
and update it with the new information provided in the request body. Finally, it sends the updated
product data as a response. */
  app.put("/update/:id", async (req, res)=>{
    try {
      console.log(req.params);
      console.log(req.body)
      let data = await Product.findOneAndUpdate(
        {_id: req.params.id},
          req.body
              )
      res.send(data);
      
    } catch (error) {
      console.log('error', error);
    }
  })
app.listen(8080, ()=>{
    console.log('server started');
});




