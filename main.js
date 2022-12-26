var express = require('express')
const { ObjectId } = require('mongodb')
var app = express()

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://0.0.0.0:27017'

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.post('/search',async (req,res)=>{
    const search = req.body.search
    console.log(results)
    res.render('view',{'results':results})
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    const results = await db.collection("products").find({ name: new RegExp(name,'i') }).toArray()
    return results
})

app.post('/edit',async (req,res)=>{
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picture = req.body.txtPic
    res.redirect('/view')
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    await db.collection("products").updateOne({ _id: ObjectId(id) },
        { $set: { "name": name, "price": price, "pictureURL": picture } })
})

app.get('/edit',async (req,res)=>{
    const id = req.query.id
    res.render('edit',{product:productToEdit})
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    const productToEdit = await db.collection("products").findOne({ _id: ObjectId(id) })
    return productToEdit
})

app.get('/delete',async (req,res)=>{
    const id = req.query.id
    res.redirect('/view')
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    await db.collection("products").deleteOne({ _id: ObjectId(id) })
})

app.get('/view',async (req,res)=>{
    res.render('view',{'results':results})
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    const results = await db.collection("products").find().toArray()
    return results
})
app.post('/new',async (req,res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let picture = req.body.txtPic
    let newProduct = {
        name : name,
        price: Number.parseInt(price) ,
        pictureURL: picture
    }
    console.log(newId.insertedId)
    res.render('home')
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    let newId = await db.collection("products").insertOne(newProduct)
    return newId
})

app.get('/new',(req,res)=>{
    res.render('newProduct')
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 5000

app.listen(PORT)
console.log("Server is running!")