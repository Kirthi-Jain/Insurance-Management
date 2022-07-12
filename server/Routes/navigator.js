const router = require("express").Router(),
  { AddData, Register } = require("../SchemaModel");

router.get("/getCustomers", async (req, res) => {
  try {
    const users = await Register.find().sort({
      Policy_id: -1,
      "Date of Purchase": -1,
    });
    res.status(201).json(users);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.patch("/updateCustomer/:_id", async (req, res) => {
  try {
    const { params, body } = req,
      { _id } = params;
    user = await Register.findByIdAndUpdate(_id, body);
    res.status(201).json(user);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.post("/addCustomer", async (req, res) => {
  try {
    const { body } = req,
      user = await new Register(body).save();
    res.status(201).json(user);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/getCustomer/:_id", async (req, res) => {
  try {
    const { _id } = req.params,
      user = await Register.findById(_id);
    res.status(201).json(user);
  } catch (error) {
    res.status(422).json(error);
  }
});
router.get("/getData", async (req, res) => {
  try {
    const users = await AddData.findOne();
    users.Fuel.sort();
    users.liabilities.sort();
    users.VEHICLE_SEGMENT.sort();
    users["Customer_Income group"].sort();
    res.status(201).json(users);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/maxPolicyNumberAndCustNumber", async (req, res) => {
  try {
    let Policy_id = await Register.find()
        .sort({ Policy_id: -1 })
        .limit(1)
        .then((r) => r[0].Policy_id),
      Customer_id = await Register.find()
        .sort({ Customer_id: -1 })
        .limit(1)
        .then((r) => r[0].Customer_id);
    Policy_id++, Customer_id++;
    res.status(201).json({ Policy_id, Customer_id });
  } catch (error) {
    res.status(422).json(error);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { body } = req;
    const users = await Register.deleteMany({ _id: { $in: body } });
    res.status(201).json(users);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
