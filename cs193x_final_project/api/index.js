import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";

let DATABASE_NAME = "finalDB";
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";

const api = express.Router();
let conn = null;
let db = null;
let Groups = null;
//let Profiles = null;

const initApi = async app => {
  app.set("json spaces", 2);
  app.use("/api", api);

  //conn = await MongoClient.connect("mongodb://localhost");
  conn = await MongoClient.connect(MONGODB_URL);
  db = conn.db(DATABASE_NAME);
  Groups = db.collection("groups");
  //Profiles = db.collection("profiles");
  console.log('init test')

};

api.use(bodyParser.json());
api.use(cors());

api.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

//get a list of existing groups
api.get("/groups", async (req, res) => {
  let groups = await Groups.find().toArray();
  groups = groups.map(groups => groups.id);
  res.json({ groups });
});

// middleware function
api.use("/groups/:id", async(req, res, next) => {
  console.log('middleware test')
  let id = req.params.id;
  let group = await Groups.findOne({ id });
  if(!group) {
    res.status(404).json({error: `No group with ID ${id}`});
    return; 
  }
  res.locals.group = group;
  next();
});

//get the profile for the user id
api.get("/groups/:id", async (req, res) => {
  console.log('test')
  let group = res.locals.group;
  delete group._id;
  res.json(group);
});

//create a new group
api.post("/groups", async (req, res) => {
  console.log(req)
  let id = req.body.id;
  let title = req.body.title;
  let description = req.body.description;
  let profiles = req.body.profiles;
  console.log(id)
  if (!id) {
    res.status(400).json({error: `Request id missing`});
    return;
  } 
  let group = await Groups.findOne({ id });
  if (group){
    res.status(404).json({error: `Group ${id} already exists`});
    return;
  }
  await Groups.insertOne({id: id, title: title, description: description, profiles: profiles});
  res.json({success: true})
});

//update a groups's profiles
api.patch("/groups/:id", async (req, res) => {
  let group = res.locals.group;
  let id = group.id;
  let profile = req.body;
  let profiles = group.profiles;

  profiles.push(profile)
  
  await Groups.updateOne({"id" : id}, {$set:{"profiles": profiles}});
  delete group._id;
  res.json(group);
});

export default initApi;
