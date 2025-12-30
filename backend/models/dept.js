const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Counter = require("./counter");
const Employee = require("./employee");

const DeptSchema = new Schema({
    DeptId : { type: Number, unique: true },
    DeptName : String
})
DeptSchema.pre("findOneAndDelete", async function(next) {
  const query = this.getFilter(); 
  await Employee.deleteMany({ DeptId: query.DeptId });
  next();
});
DeptSchema.pre("deleteMany", async function(next) {
  await Employee.deleteMany({});
  next();
});
DeptSchema.pre("save",async function(next) {
    if (this.isNew){
        const counter=await Counter.findByIdAndUpdate(
            { _id: "deptId" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
         this.DeptId = counter.seq;

    }
    next();
})
const Dept = mongoose.model("Dept",DeptSchema);

module.exports=Dept;