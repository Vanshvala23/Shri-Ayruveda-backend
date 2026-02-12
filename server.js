const express = require('express');
const contactRoutes=require('./routes/contactRoutes');
const cors=require('cors');
const connectDB=require('./config/db');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());
connectDB();
app.use('/api/contact',contactRoutes);

app.get('/',(req,res)=>{
    res.send('Hello');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})