import { useEffect, useState } from "react";
import { getAllDepts, getDepts, getEmpInDept } from "./services/DeptService";
import type { Employee } from "./Emp";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function EmpInDept(){
    type Dept = {
        DeptId: number;
        DeptName: string;
        };
    const [deptId, setDeptId] = useState<number | "">("");
    const [depts, setDepts] = useState<Dept[]>([]);
    const [Emp, setEmp] = useState<Employee[]>([]);

    useEffect(()=>{
        const fetchDepts=async()=>{
            try{
                const data = await getAllDepts();
                setDepts(data);
            }catch(error){
                console.log("Error fetching departments:",error);
            }
        };
        fetchDepts();
    },[]);

    useEffect(()=>{
        const fetchEmps=async()=>{
            try{
                const data = await getEmpInDept(Number(deptId));
                setEmp(data);
            }catch(error){
                console.log("Error fetching employees:",error);
            }
        };
        fetchEmps();
    },[deptId]);

    return(
        <>
        <h2>The Data of Employees in each Department:</h2>
        <select
                value={deptId}
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
              {deptId && <div>
              <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      {Emp.map((row) => (
          <TableRow
            key={row.EmployeeId}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.EmployeeId}
            </TableCell>
            <TableCell align="left">{row.EmployeeName}</TableCell>
            <TableCell align="right">{row.EmployeeSalary}</TableCell>
            <TableCell align="right">{row.EmployeeAge}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
}
              </>
    )
}
export default EmpInDept;

function async(arg0: number) {
    throw new Error("Function not implemented.");
}
