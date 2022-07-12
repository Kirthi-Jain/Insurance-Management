const { Schema, model } = require("mongoose"),
  UserSchema = new Schema(
    {
      Policy_id: {
        type: Number,
        unique: true,
      },
      "Date of Purchase": {
        type: String,
      },
      Customer_id: {
        type: Number,
      },
      Fuel: {
        type: String,
      },
      VEHICLE_SEGMENT: {
        type: String,
      },
      Premium: {
        type: Number,
      },
      "bodily injury liability": {
        type: Number,
      },
      "personal injury protection": {
        type: Number,
      },
      "property damage liability": {
        type: Number,
      },
      collision: {
        type: Number,
      },
      comprehensive: {
        type: Number,
      },
      Customer_Gender: {
        type: String,
      },
      "Customer_Income group": {
        type: String,
      },
      Customer_Region: {
        type: String,
      },
      Customer_Marital_status: {
        type: Number,
      },
    },
    { timestamps: true }
  ),
  DataSchema = new Schema(
    {
      Fuel: {
        type: Object,
        unique: true,
      },
      "Customer_Income group": {
        type: Object,
        unique: true,
      },
      liabilities: {
        type: Object,
        unique: true,
      },
      VEHICLE_SEGMENT: {
        type: Object,
        unique: true,
      },
    },
    { timestamps: true }
  );

exports.AddData = model("Data", DataSchema);
exports.Register = model("Customer", UserSchema);
