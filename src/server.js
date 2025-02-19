import express from 'express';
import { cartItems as cartItemsRaw, products as productsRaw, } from './temp-data';

let cartItems = cartItemsRaw
let products = productsRaw

const app = express();
app.use(express.json());

const connectDB = require("./db");
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("myCollection");
    
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));


app.get('/products', (req, res) => {
res.json(products);
});

function populateCartIds(ids){
    return ids.map(id => products.find(product => product.id === id));
}
app.get('/cart',(req,res) => {
    const populatedCart = populateCartIds(cartItems);
   res.json(populatedCart);
}),

app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = products.find(product => product.id === productId)
    res.json(product);
})

app.post('/cart', (req, res) => {
    const productId = req.body.id;
    cartItems.push(productId);
    const populatedCart = populateCartIds(cartItems)
    res.json(populatedCart);
});

app.delete('/cart/:productId', (req, res) => {
  const productId = req.params.productId;
  cartItems = cartItems.filter(id => id !== productId);
  const populatedCart = populateCartIds(cartItems)
  res.json(populatedCart);

})

app.listen(8000, () => {
    console.log('Server is listening on port 8000')
})
