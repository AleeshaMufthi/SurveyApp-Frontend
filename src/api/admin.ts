import API from "./axios";

export const adminSignInAPI = (body: { email: string; password: string }) => 
    API.post("/admin/login", body);
  
  export const getAdminDetailsAPI = async () => {
    const response = await API.get("/admin/details");
    return response.data;
  };
  
  export const logoutAdminAPI = () => API.post("/admin/logout");