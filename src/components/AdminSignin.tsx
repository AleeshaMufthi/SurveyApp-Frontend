import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminSignInAPI } from "../api/admin";
import { setAdmin } from "../features/adminSlice";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const AdminSignin = () => {
    type FormValues = {
      email: string;
      password: string;
    };
  
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
        setLoading(true);
        setErrorMessage("");
        const response = await adminSignInAPI(data);
        dispatch(setAdmin({ email: response.data.email }));
        navigate("/admin/dashboard");
      } catch (error) {
        setErrorMessage("Invalid email or password.");
        console.error("Sign-in failed", error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left Side (Form) */}
        
        <div className="flex items-center justify-center bg-gray-100 p-6 w-full h-full">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">Admin Sign In</h2>
            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
  
        {/* Right Side (Background Section) */}
{/* Right Side (Background Section) */}
<div 
  className="hidden md:flex items-center justify-center bg-gray-900 w-full h-full bg-cover bg-center"
  style={{ backgroundImage: "url('https://i.pinimg.com/474x/8c/d6/d5/8cd6d5d69faade52f29f55a8eb9c5b48.jpg')" }}
>
  
</div>

      </div>
    );
  };
  
  export default AdminSignin;
  
