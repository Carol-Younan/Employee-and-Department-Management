import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Add from './Add';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getDepts , deleteDept } from "./services/DeptService";

export type Dept = {
  DeptId: number;
  DeptName: string;
};

function createDept(
  DeptId: number,
  DeptName: string,
) {
  return {DeptId, DeptName};
}

export default function Depts() {
  const [Depts, setDepts] = useState<Dept[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editDept, setEditDept] = useState<Dept | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  
    const fetchData = async () => {
    try {
      const res = await getDepts(page,limit);
      console.log("Fetched Depts:", res);
       
      setDepts(
        res.data.map((Depts: any) => ({
          DeptId: Depts.DeptId,
          DeptName: Depts.DeptName,
        }))
      );
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error fetching employees", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this deparetment?")) {
      await deleteDept(id);
      fetchData(); 
    }
  };

  const rows = Depts.map((Dept:any)=>createDept(
    Dept.DeptId,
    Dept.DeptName,

  ));

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <Button variant="contained" sx={{margin:'10px', width:'100px',height:'50px'}} onClick={() => setShowAdd(!showAdd)}>{!showAdd && "Add"}</Button>
    {showAdd && <Add mode={"dept"} dept={editDept} onSuccess={fetchData} onClose={() => { setShowAdd(false); setEditDept(null);}} />}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Department Id</TableCell>
            <TableCell >Department Name</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      {rows.map((row) => (
          <TableRow
            key={row.DeptId}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.DeptId}
            </TableCell>
            <TableCell align="left">{row.DeptName}</TableCell>
            <TableCell align="center">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => { setEditDept(row); setShowAdd(true); }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(row.DeptId)}
          style={{ marginLeft: "10px" }}
        >
          Delete
        </Button>
        </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Stack spacing={2} alignItems="center" sx={{ margin: "20px" }}>
  <Pagination
    count={totalPages}
    page={page}
    onChange={(e, value) => setPage(value)}
    color="primary"
    size="large"
  />
</Stack>
    </>
  );
}
