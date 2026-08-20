const API_URL = "https://employee-and-department-management-sandy.vercel.app";

export const getEmployees = async () => {
  const res = await fetch(`${API_URL}/emp`);
  return await res.json();
};

export const getEmployeesId = async (id: number) => {
  const res = await fetch(`${API_URL}/emp/${id}`);
  return await res.json();
};

export const getDeptName = async (id: number) => {
  const res = await fetch(`${API_URL}/dept/${id}`);
  return await res.json();
};

export const getEmployeesWithDept = async () => {
  const res = await fetch(`${API_URL}/emp`);
  const employees = await res.json();
  const employeesWithDept = await Promise.all(
    employees.map(async (emp: any) => {
      let deptName = "";
      if (emp.DeptId) {
        const dept = await getDeptName(emp.DeptId);
        deptName = dept.DeptName;
      }
      return {
        EmployeeId: emp.EmployeeId,
        EmployeeName: emp.EmployeeName,
        EmployeeSalary: emp.EmployeeSalary,
        EmployeeAge: emp.EmployeeAge,
        DeptId: emp.DeptId ?? 0,
        DeptName: deptName,
      };
    }),
  );
  return employeesWithDept;
};

// const data = await getEmployees();
// setEmployees(
//   data.map((emp: any) => ({
//     EmployeeId: emp.EmployeeId,
//     EmployeeName: emp.EmployeeName,
//     EmployeeSalary: emp.EmployeeSalary,
//     EmployeeAge: emp.EmployeeAge,
//     DeptId: emp.DeptId,
//   }))
// );

export const addEmployee = async (employee: {
  name: string;
  salary: number;
  age: number;
  DeptId: number;
}) => {
  const res = await fetch(`${API_URL}/emp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  if (!res.ok) throw new Error("Failed to add employee");
  return await res.json();
};

export const updateEmployee = async (
  id: number,
  updatedData: {
    name?: string;
    salary?: number;
    age?: number;
    DeptId?: number;
  },
) => {
  const res = await fetch(`${API_URL}/emp/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update employee");
  return await res.json();
};

export const deleteEmployee = async (id: number) => {
  const res = await fetch(`${API_URL}/emp/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete employee");
  return await res.json();
};

export const deleteAllEmployees = async () => {
  const res = await fetch(`${API_URL}/emp`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete employees");
  return await res.json();
};
