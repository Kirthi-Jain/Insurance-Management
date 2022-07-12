const Transport = require("express").Router(),
  csvToJSON = require("csvtojson"),
  {
    AddData,
    Register,
  } = require("../SchemaModel");

Transport.post("/customers", (req, res) => {
  csvToJSON()
    .fromFile("Data Set - Insurance Client.csv")
    .then((csvData) => {
      Register.insertMany(csvData)
        .then((r) => res.status(201).json(r))
        .catch((e) => res.status(422).json(e.message));
    })
    .catch((e) => console.log(e.message));
});

Transport.post("/data", (req, res) => {
  csvToJSON()
    .fromFile("Data.csv")
    .then((csvData) => {
      const Fuel = csvData.aryFunctions("Fuel"),
        VEHICLE_SEGMENT = csvData.aryFunctions("VEHICLE_SEGMENT"),
        liabilities = csvData.aryFunctions("liabilities"),
        income = csvData.aryFunctions("Customer_Income group");
      new AddData({ Fuel, VEHICLE_SEGMENT, liabilities,  "Customer_Income group": income })
        .save()
        .then((r) => res.status(201).json(r))
        .catch((e) => res.status(422).json(e.message));
    })
    .catch((e) => console.log(e.message));
});

Array.prototype.aryFunctions = function (key) {
  let arry = [...this].map((i) => i[key]).filter((i) => i);
  return  [...new Set(arry)];
};

module.exports = Transport;
