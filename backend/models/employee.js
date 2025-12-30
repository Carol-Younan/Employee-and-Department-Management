const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Counter = require("./counter");

const EmployeeSchema = new Schema({
    EmployeeId : { type: Number, unique: true },
    EmployeeName:String,
    EmployeeSalary:Number,
    EmployeeAge:Number,
    DeptId:{ type:Number, ref:"Dept"}
})

EmployeeSchema.pre("save",async function(next){
      if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "employeeId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.EmployeeId = counter.seq;
  }

    const dept = await mongoose.model("Dept").findOne({DeptId: this.DeptId});
    if (!dept){
        return next(new Error("invalid deptId"));
    }
    next();
});
const Employee = mongoose.model("Employee",EmployeeSchema);

module.exports=Employee;