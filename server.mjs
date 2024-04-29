import dotenv from 'dotenv';

import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
// import parseFormData from './public/formParse.mjs';

    // Connect to MongoDB
  async function initializeServer() {
  try {
    //connct using .env uri
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    const db = client.db('aafDb');
    const inv = db.collection('inv');
    const loc = db.collection("loc");


    inv.createIndex({ partName: 1 }, { unique: true });
    loc.createIndex({ name: 1 }, { unique: true });
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.static)

    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      console.log(req.body);
      next();
    })

    app.get('/', (req, res) => {
      console.log("Inside get");
      res.sendFile('index.html', { root: 'public' });
    });

    app.post('/submit', async (req, res) => {
        const response = await inv.insertOne(req.body);
        console.log(response);
        if (response.acknowledged) {
          res.status(201).json({ message: "Part Added" });
        }
        this.messageDiv.textContent = "Part Added";
    });

    app.get('/parts', async (req, res) => {
      if (req.method !== "GET") {
        res.status(405).json({ message: "Method Not Allowed" });
        return;
      }
        const docCount = await inv.countDocuments();
        if (docCount === 0) {
          console.log("Database is empty");
          res.status(404).json({ message: "Database is empty" });
          return;
        } else if (docCount > 0) {
          console.log("Database has data");
        const partsArray = await inv.find().toArray();
        res.json(partsArray);
        }
      
    });
    
    app.get("/part/:id", async (req, res) => {
      console.log("get part by id")
      if (req.method !== "GET") {
        res.status(405).json({ message: "Method Not Allowed" });
        return;
      }
        const objectId = new ObjectId(req.params.id);
        const part = await inv.findOne({ _id: objectId });
        if (part) {
          res.json(part);
        } else {
          res.status(404).json({ message: "Part not found" });
        }
    });

    app.get("/form", (req, res) => {
      if (req.method !== "GET") {
        res.status(405).json({ message: "Method Not Allowed" });
        return;
      }
      res.sendFile('newPartForm.html', { root: 'public' });
    });
    // Start the server
    app.listen(PORT, () => {
      console.log(`AAF Server is running on port ${PORT}`);
      
    });

    app.get('/locations', async (req, res) => {
      if (req.method !== "GET") {
        res.status(405).json({ message: "Method Not Allowed" });
        return;
      }
        const docCount = await loc.countDocuments();
        if (docCount === 0) {
          console.log("Location Database is empty");
          res.status(404).json({ message: "Database is empty" });
          return;
        } else if (docCount > 0) {
          console.log("Location Database has data");
        const locationsArray = await loc.find().toArray();
        res.json(locationsArray);
        }
      
    });

    app.get("/location/:id", async (req, res) => {
      console.log("get location by id")
      if (req.method !== "GET") {
        res.status(405).json({ message: "Method Not Allowed" });
        return;
      }
        const objectId = new ObjectId(req.params.id);
        const location = await loc.findOne({ _id: objectId });
        if (location) {
          res.json(location);
        } else {
          res.status(404).json({ message: "Location not found" });
        }
    })

    app.get("/locationForm", (req, res) => {
      if (req.method !== "GET") {
        res.status(405).json({ message: "Method Not Allowed" });
        return;
      }
      res.sendFile('newLocationForm.html', { root: 'public' });
    })

  
    
    } catch (error) {
      console.error(error);
      console.log("Something went wrong starting the server");
    }
  }
  
initializeServer();