const API_URL = "https://employee-and-department-management-sandy.vercel.app";

export const getDepts = async (page: number, limit: number) => {
  const res = await fetch(`${API_URL}/dept?page=${page}&limit=${limit}`);
  return await res.json();
};

export const getAllDepts = async () => {
  const res = await fetch(`${API_URL}/deptAll`);
  return await res.json();
};

export const getDeptsById = async (id: number) => {
  const res = await fetch(`${API_URL}/dept/${id}`);
  return await res.json();
};

export const getEmpInDept = async (id: number) => {
  const res = await fetch(`${API_URL}/deptEmp/${id}`);
  return await res.json();
};

export const getEmpCount = async (id: number) => {
  const res = await fetch(`${API_URL}/deptEmpCount/${id}`);
  return await res.json();
};

export const addDept = async (department: { name: string }) => {
  const res = await fetch(`${API_URL}/dept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(department),
  });
  if (!res.ok) throw new Error("Failed to add employee");
  return await res.json();
};

export const updateDept = async (id: number, dept: { DeptName: string }) => {
  const res = await fetch(`${API_URL}/dept/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dept),
  });
  if (!res.ok) throw new Error("Failed to update employee");
  return await res.json();
};

export const deleteDept = async (id: number) => {
  const res = await fetch(`${API_URL}/dept/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete employee");
  return await res.json();
};

export const deleteAllDept = async () => {
  const res = await fetch(`${API_URL}/dept`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete employees");
  return await res.json();
};
