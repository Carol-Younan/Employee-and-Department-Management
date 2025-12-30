import { useEffect, useState } from "react";
import { getAllDepts, getDepts, getEmpCount } from "./services/DeptService";
function Count(){
        type Dept = {
        DeptId: number;
        DeptName: string;
        };

    const [deptId, setDeptId] = useState<number | "">("");
    const [depts, setDepts] = useState<Dept[]>([]);
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
          const fetchDepts = async () => {
            try {
              const data = await getAllDepts();
              setDepts(data);
            } catch (error) {
              console.error("Error fetching departments:", error);
            }
          };
          fetchDepts();
        }, []);

    useEffect(()=>{
        const fetchCount= async() =>{
            if(deptId !== ""){
                try{
                    const data = await getEmpCount(Number(deptId));
                    setCount(data);
                }catch(error){
                    console.error("Error fetching count:", error);
                }
            } else{
                setCount(null);
            }           
        };
        fetchCount();
    },[deptId]);

    return(
        <>
        <h2>The Number of Employees in each Department:</h2>
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
              {count && <h3>Number of employees:{count}</h3>}
              </>
    );
}
export default Count;