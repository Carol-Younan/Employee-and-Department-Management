import { useEffect, useState } from "react";
import { getEmployeesWithDept , deleteEmployee } from "./services/EmplyeeService";
import Table from '@mui/material/Table';
import type {Dept} from './Dept';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Zero from './assets/Zero.png';
import Add from './Add';
import { getAllDepts } from "./services/DeptService";

export type Employee = {
  EmployeeId: number;
  EmployeeName: string;
  EmployeeSalary: number;
  EmployeeAge: number;
  DeptName: string;
  DeptId: number;
};

function createEmp(
  EmployeeId: number,
  EmployeeName: string,
  EmployeeSalary: number,
  EmployeeAge: number,
  DeptName: string,
  DeptId:number,
) {
  return {EmployeeId, EmployeeName, EmployeeSalary, EmployeeAge, DeptName, DeptId};
}

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editEmp, setEditEmp] = useState<Employee | null>(null);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [Alldept, setAllDept] = useState<Dept[]>([]);
  const [dept, setDept] = useState("");
  const rowsPerPage = 4; 

   const fetchDepts = async () => {
    try {
      const data = await getAllDepts();
      console.log("Fetched Depts:", data);
       
      setAllDept(
        data.map((dept: any) => ({
          DeptName: dept.DeptName,
          DeptId: dept.DeptId
        }))
      );
    } catch (error) {
      console.error("Error fetching depts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepts();
  }, []);

  const deptOptions = (Alldept) ;

  const filteredEmployees = employees.filter((emp) => {
    const matchName = name ? emp.EmployeeName.toLowerCase().includes(name.toLowerCase()) : true;
    const matchDept = dept ? emp.DeptName === dept : true;
    return matchName && matchDept;
  });
  
    const fetchData = async () => {
    try {
      const data = await getEmployeesWithDept();
      console.log("Fetched employees:", data);
       
      setEmployees(
        data.map((emp: any) => ({
          EmployeeId: emp.EmployeeId,
          EmployeeName: emp.EmployeeName,
          EmployeeSalary: emp.EmployeeSalary,
          EmployeeAge: emp.EmployeeAge,
          DeptName: emp.DeptName,
          DeptId: emp.DeptId,
        }))
      );
    } catch (error) {
      console.error("Error fetching employees", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id);
      fetchData(); 
    }
  };


  const rows = filteredEmployees.map((emp:any)=>createEmp(
    emp.EmployeeId,
    emp.EmployeeName,
    emp.EmployeeSalary,
    emp.EmployeeAge,
    emp.DeptName,
    emp.DeptId
  ));

  const paginatedRows = rows.slice(
  (page - 1) * rowsPerPage,
  page * rowsPerPage
);

    const highlightText = (text: string, query: string) => {
      if (!query) return text;

      const regex = new RegExp(`(${query})`, "gi"); // case insensitive
      const parts = text.split(regex);

      return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
            {part}
          </span>
        ) : (
          part
        )
      );
    };

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <Stack 
  direction="row" 
  spacing={2} 
  sx={{ marginBottom: 2 }}
>
  <TextField
    label="Search by Name"
    variant="outlined"
    size="medium"
    value={name}
    onChange={(e) => {
      setName(e.target.value);
      setPage(1); 
    }}
    sx={{minWidth:300}}
  />

  <TextField
    select
    label="Filter by Department"
    variant="outlined"
    size="medium"
    value={dept}
    onChange={(e) => {
      setDept(e.target.value);
      setPage(1);
    }}
    sx={{ minWidth: 300 }}
  >
    <MenuItem value="">All</MenuItem>
    {deptOptions.map((d) => (
      <MenuItem key={d.DeptId} value={d.DeptName}>
        {d.DeptName}
      </MenuItem>
    ))}
  </TextField>
</Stack>

    <Button variant="contained" sx={{margin:'10px' , width:'100px',height:'50px'}} onClick={() => setShowAdd(!showAdd)}>{!showAdd && "Add"}</Button>
    {showAdd && <Add mode={"employee"} employee={editEmp} onSuccess={fetchData} onClose={() => { setShowAdd(false); setEditEmp(null);}} />}
      {filteredEmployees.length === 0 ?
       (<Stack 
      direction="column" 
      alignItems="center" 
      justifyContent="center" 
      spacing={2} 
      sx={{ marginTop: 4 }}
    ><img src={Zero} alt="No data" style={{ width: "200px",margin:'auto' }} /><h3>No Employees Found</h3>
    </Stack>):(
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Department Name</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      {paginatedRows.map((row) => (
          <TableRow
            key={row.EmployeeId}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.EmployeeId}
            </TableCell>
            <TableCell align="left">{highlightText(row.EmployeeName, name)}</TableCell>
            <TableCell align="right">{row.EmployeeSalary}</TableCell>
            <TableCell align="right">{row.EmployeeAge}</TableCell>
            <TableCell align="right">{row.DeptName}</TableCell>
            <TableCell align="center">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => { setEditEmp(row); setShowAdd(true); }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(row.EmployeeId)}
          style={{ marginLeft: "10px" }}
        >
          Delete
        </Button>
        </TableCell>
          </TableRow>
        ))
      }
        </TableBody>
      </Table>
    </TableContainer>
      )}
    <Stack spacing={2} alignItems="center" sx={{ margin: "20px" }}>
  <Pagination
    count={Math.ceil(filteredEmployees.length / rowsPerPage)} 
    page={page}
    onChange={(e, value) => setPage(value)}
    color="primary"
    size="large"
  />
</Stack>

    </>
  );
}
