const express= require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const Employee=require("./models/employee");
const Dept=require("./models/dept");
mongoose.connect("mongodb://localhost:27017")
.then(()=>{
    console.log("connected successfully");
}).catch((error)=>
{
    console.log("error with connecting",error);
})
app.get("/deptWithId/:id",async(req,res)=>{
    try{
        const deptId=Number(req.params.id);
        const Thedept = await Dept.findOne(
            {DeptId:deptId}
        );
        if (!Thedept) {
        return res.status(404).json({message:"not found"});
        }

        res.json(Thedept);

    }catch(error){
        res.status(500).json({message:"error getting",error})
    }    
});

app.post("/emp", async (req,res)=>{
    const newEmployee = new Employee;
    newEmployee.EmployeeId=Employee.EmployeeId;
    newEmployee.EmployeeName=req.body.name;
    newEmployee.EmployeeSalary=req.body.salary;
    newEmployee.EmployeeAge=req.body.age;
    newEmployee.DeptId=req.body.DeptId;
    await newEmployee.save();
    res.json(newEmployee);
});

app.put("/emp/:id",async (req,res)=>{
    try{
        const empId=Number(req.params.id);
        const updatedData={};
        

        if(req.body.name) updatedData.EmployeeName=req.body.name;
        if(req.body.salary) updatedData.EmployeeSalary=req.body.salary;
        if(req.body.age) updatedData.EmployeeAge=req.body.age;
        if(req.body.DeptId) updatedData.DeptId=req.body.DeptId;

        const updatedEmployee = await Employee.findOneAndUpdate(
            {EmployeeId:empId},
            {$set:updatedData},
            {new:true}
        );

        if (!updatedEmployee){
            return res.status(400).json({message:"not found"});
        }
        res.json(updatedEmployee);
    }catch(error){
        res.status(500).json({message:"error updating",error});
    }
});
app.delete("/emp/:id",async (req,res)=>{
    try{
    const empId=Number(req.params.id);
    const deletedEmp = await Employee.findOneAndDelete(
        {EmployeeId:empId}
    );
    if (!deletedEmp) {
   return res.status(404).json({message:"not found"});
}

    res.json(deletedEmp)
}catch(error){
    res.status(500).json({message:"error deleting",error});
}
})
app.delete("/emp",async (req,res)=>{
    try{
    const deletedEmp = await Employee.deleteMany();
    if (!deletedEmp) {
   return res.status(404).json({message:"not found"});
}

    res.json(deletedEmp)
}catch(error){
    res.status(500).json({message:"error deleting",error});
}
})
app.get("/emp/:id",async (req,res) => {
    try{
        const empId=Number(req.params.id);
        const TheEmp = await Employee.findOne(
            {EmployeeId:empId}
        );
        if (!TheEmp) {
        return res.status(404).json({message:"not found"});
        }

        res.json(TheEmp);

    }catch(error){
        res.status(500).json({message:"error getting",error})
    }    
})
app.get("/emp",async (req,res) => {
    try{
        const TheEmp = await Employee.find();
        if (TheEmp.length===0) {
        return res.status(404).json({message:"not found"});
        }
        res.json(TheEmp);
    }catch(error){
        res.status(500).json({message:"error getting",error})
    }    
})
//Dept
app.post("/dept", async (req,res)=>{
    const newDept = new Dept;
    newDept.DeptId=Dept.DeptId;
    newDept.DeptName=req.body.name;
    await newDept.save();
    res.json(newDept);
});

app.put("/dept/:id",async (req,res)=>{
    try{
        const deptId=Number(req.params.id);
        const updateNames={}
        
         updateNames.DeptName = req.body.DeptName;
         
        const updatedDept = await Dept.findOneAndUpdate(
            
            {DeptId:deptId},
            {$set:updateNames},
            {new:true}
        );
        if (!updatedDept){
            return res.status(400).json({message:"not found"});
        }
        res.json(updatedDept);
    }catch(error){
        res.status(500).json({message:"error updating",error});
    }
});

app.delete("/dept/:id",async (req,res)=>{
    try{
    const deptId=Number(req.params.id);
    const deleteDept= await Dept.findOneAndDelete(
        {DeptId:deptId}
    );
    if (!deleteDept) {
   return res.status(404).json({message:"not found"});
}

    res.json(deleteDept);
}catch(error){
    res.status(500).json({message:"error deleting",error})
};
})
app.delete("/dept",async (req,res)=>{
    try{
    const deleteDept= await Dept.deleteMany();
    if (!deleteDept) {
   return res.status(404).json({message:"not found"});
}
    res.json(deleteDept);
}catch(error){
    res.status(500).json({message:"error deleting",error})
};
})
app.get("/dept/:id",async(req,res)=>{
    try{
        const deptId=Number(req.params.id);
        const TheDept = await Dept.findOne(
            {DeptId:deptId}
        );
        if(!TheDept){
            res.status(404).json({message:"not found"})
        }
        res.json(TheDept);
    }catch(error){
        res.status(500).json({message:"error getting",error});
    };
})

app.get("/deptAll", async (req, res) => {
  try {
    const depts = await Dept.find();
    res.json(depts);
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
});

app.get("/dept",async(req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;  
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        
        const [depts, total] = await Promise.all([
        Dept.find().skip(skip).limit(limit),
        Dept.countDocuments()
        ]);

        if(depts.length===0){
            return res.status(404).json({message:"not found"});
        }

        res.json({
        total,
        page,       
        limit,      
        totalPages: Math.ceil(total / limit),
        data: depts      
        });

    }catch(error){
        res.status(500).json({message:"error getting",error});
    };
})
app.get("/deptEmp/:id",async(req,res)=>{
    const deptId=req.params.id;
    try{
        const Emp = await Employee.find(
            {DeptId:deptId}
        );
        res.json(Emp);
    }catch(error){
        res.status(500).json({message:"error",error});
    }
});
app.get("/deptEmpCount/:id",async(req,res)=>{
    const deptId=req.params.id;
    try{
        const Emp = await Employee.countDocuments(
            {DeptId:deptId}
        );
        res.json(Emp);
    }catch(error){
        res.status(500).json({message:"error",error});
    }
});
app.listen(5000,console.log("Everything is okay!"));




