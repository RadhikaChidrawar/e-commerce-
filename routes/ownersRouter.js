const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", (req, res) => {
  res.send("hey it's working... owner");
});

// this is HOW TO SETUP ENV WITH CMC OR TERMINAL
// set up process_env === [$env:NODE_ENV="development"] this
// export not used here
// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    // res.send("hey it's an owner route");
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
      .status(503)
      .send("you don't have to create owner ");
    }

    let {fullname, email, password}= req.body;

    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password
    })

    res.status(201).send(createdOwner)

  });
}

module.exports = router;
