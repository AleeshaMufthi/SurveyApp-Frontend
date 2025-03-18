import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAdminDetailsAPI, logoutAdminAPI } from "../api/admin";
import { logoutAdmin } from "../features/adminSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { getSurveysAPI } from "../api/survey";
import Pagination from "../common/pagination";

interface Survey {
    _id: string;
    name: string;
    email: string;
    phone: string;
    nationality: string;
    message: string;
  }

  const AdminDashboard = () => {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [total, setTotal] = useState(0);
  
    const admin = useSelector((state: RootState) => state.admin.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchSurveys = async () => {
        try {
          const response = await getSurveysAPI();
          setSurveys(response.data);
          console.log(response.data,'response data')
          setTotal(response.data.length
          ); // Store total count
          console.log(response.data.length
            , 'total ethree');
          
          
        } catch (error) {
          console.error("Error fetching surveys:", error);
        }
      };
  
      fetchSurveys();
    }, []);
  
    const handleLogout = async () => {
      await logoutAdminAPI();
      dispatch(logoutAdmin());
      navigate("/admin/signin");
    };
  
    // Calculate paginated surveys
    const paginatedSurveys = surveys.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(total / limit);
  
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
          <p>Email: {admin?.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Logout
          </button>
  
          <h3 className="text-lg font-semibold mt-6">All Survey Responses</h3>
  
          {paginatedSurveys.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Nationality</th>
                  <th className="border p-2">Message</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSurveys.map((survey) => (
                  <tr key={survey._id} className="text-center">
                    <td className="border p-2">{survey.name}</td>
                    <td className="border p-2">{survey.email}</td>
                    <td className="border p-2">{survey.phone}</td>
                    <td className="border p-2">{survey.nationality}</td>
                    <td className="border p-2">{survey.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No surveys found.</p>
          )}
        </div>
  
        {/* Pagination */}
        <div className="mt-10">
        <Pagination
    page={page}
    total={totalPages}
    setPage={(newPage: number | "prev" | "next") => {
      setPage((prevPage) => {
        if (newPage === "prev") return Math.max(prevPage - 1, 1);
        if (newPage === "next") return Math.min(prevPage + 1, totalPages);
        return newPage;
      });
    }}
  />
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;