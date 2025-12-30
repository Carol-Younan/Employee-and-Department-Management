import { useEffect, useState } from 'react';
import type { Employee } from './Emp';
import { addEmployee , updateEmployee } from './services/EmplyeeService';
import { getDepts , updateDept , addDept, getAllDepts } from './services/DeptService';
import Button from '@mui/material/Button';
import './Add.css';

type Dept = {
  DeptId: number;
  DeptName: string;
};

type AddProps = {
  mode: "employee" | "dept";
  employee?: Employee | null;
  dept?: Dept | null;
  onSuccess: () => void;
  onClose: () => void;
};

function Add ({mode ,employee,dept, onSuccess,onClose}:AddProps) {
  const [Empname, setEmpName] = useState("");
  const [Empsalary, setEmpSalary] = useState<number | "">("");
  const [Empage, setEmpAge] = useState<number | "">("");
  const [deptId, setDeptId] = useState<number | "">("");
  const [depts, setDepts] = useState<Dept[]>([]);
  const [message,setMessage]=useState("");

  const [DeptName, setDeptName] = useState("");

  useEffect(() => {
    if (mode === "employee") {
      const fetchDepts = async () => {
        try {
          const data = await getAllDepts();
          setDepts(data);
        } catch (error) {
          console.error("Error fetching departments:", error);
        }
      };
      fetchDepts();
    }
  }, [mode]);

  useEffect(() => {
    if (mode === "employee" && employee) {
      setEmpName(employee.EmployeeName);
      setEmpSalary(employee.EmployeeSalary);
      setEmpAge(employee.EmployeeAge);
      setDeptId(employee.DeptId);
    } else if (mode === "dept" && dept) {
      setDeptName(dept.DeptName);
    } else {
      // reset
      setEmpName("");
      setEmpSalary("");
      setEmpAge("");
      setDeptId("");
      setDeptName("");
    }
  }, [mode, employee, dept]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(mode === "employee"){
        if (!Empname || !Empsalary || !Empage || !deptId) {
          setMessage("Please fill all fields");
          return;
        }
        if (employee) {
          await updateEmployee(employee.EmployeeId, {
            name: Empname,
            salary: Number(Empsalary),
            age: Number(Empage),
            DeptId: Number(deptId),
          });
        } else {
          await addEmployee({
            name: Empname,
            salary: Number(Empsalary),
            age: Number(Empage),
            DeptId: Number(deptId),
          });
        }
      } 
      else if(mode === "dept") {
        if (!DeptName) {
          setMessage("Please enter department name");
          return;
        }
        if (dept) {
          await updateDept(dept.DeptId, { DeptName });
        } else {
          await addDept({ name: DeptName });
        }
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage("Error saving data");
    }
  };


  return (
    <div className="overlay" onClick={onClose}>
      <div className="Form" onClick={(e) => e.stopPropagation()}>
        <h2 className="create" style={{color:"white"}}> {mode === "employee" 
            ? (employee ? "Edit Employee" : "Add Employee") 
            : (dept ? "Edit Department" : "Add Department")}
        </h2>
        <form onSubmit={handleSubmit}>
            {mode === "employee" && (
            <>
              <label className="theLabel">Name:</label>
              <input
                type="text"
                value={Empname}
                onChange={(e) => setEmpName(e.target.value)}
                className="inputField"
                placeholder="Enter employee name"
              />

              <label className="theLabel">Salary:</label>
              <input
                type="number"
                value={Empsalary}
                onChange={(e) =>
                  setEmpSalary(e.target.value ? Number(e.target.value) : "")
                }
                className="inputField"
                placeholder="Enter salary"
              />

              <label className="theLabel">Age:</label>
              <input
                type="number"
                value={Empage}
                onChange={(e) =>
                  setEmpAge(e.target.value ? Number(e.target.value) : "")
                }
                className="inputField"
                placeholder="Enter age"
              />

              <label className="theLabel">Department:</label>
              <select
                value={deptId !== "" ? deptId : ""}
                onChange={(e) => setDeptId(Number(e.target.value))}
                className="inputField"
              >
                <option value="">-- Select Department --</option>
                {depts.map((dept) => (
                  <option key={dept.DeptId} value={dept.DeptId}>
                    {dept.DeptName}
                  </option>
                ))}
              </select>
            </>
          )}
            {mode === "dept" && (
            <>
              <label className="theLabel">Department Name:</label>
              <input
                type="text"
                value={DeptName}
                onChange={(e) => setDeptName(e.target.value)}
                className="inputField"
                placeholder="Enter department name"
              />
            </>
          )}
        <Button type="submit" variant="contained" sx={{margin:'20px'}} >Submit</Button>
                </form>
        {message && <p style={{ color: "white", marginTop: "10px" }}>{message}</p>}
            </div>
            </div>
        );
        }
export default Add;
