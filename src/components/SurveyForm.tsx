import { useForm } from "react-hook-form";
import { createSurveyAPI } from "../api/survey";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import React, {useState} from 'react'
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion } from "framer-motion"


const schema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.string().min(1, "Gender is required"),
  nationality: z.string().min(1, "Nationality is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),
  address: z.string().min(1, "Address is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

interface SurveyFormData {
  name: string
  gender: string
  nationality: string
  email: string
  phone: string
  address: string
  message: string
}

const SurveyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SurveyFormData>({
    resolver: zodResolver(schema),
  })

  const [modalData, setModalData] = useState<{ type: string; message: string; name?: string } | null>(null)

  const formValues = watch()
  const totalFields = 7
  const filledFields = Object.values(formValues).filter(Boolean).length
  const progress = (filledFields / totalFields) * 100

  const onSubmit = async (data: SurveyFormData) => {
    try {
      const response = await createSurveyAPI(data); // Call the API function
  
      setModalData({
        type: "success",
        name: data.name,
        message: `Thank you, ${data.name}! Your feedback has been received. We appreciate you taking the time to share your thoughts.`,
      });
  
      reset(); 
    } catch (error) {
      setModalData({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Illustration and Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block"
          >
            <img
              src="https://i.pinimg.com/736x/73/00/6a/73006affa136bd303293d973c8c0df3d.jpg"
              alt="Survey Illustration"
              className="w-full max-w-md mx-auto"
            />
            <div className="mt-8 space-y-4 text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                We Value Your Feedback
              </h1>
              <p className="text-gray-600 text-lg">Help us improve by sharing your thoughts and experiences</p>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    {...register("name")}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Gender</label>
                  <select
                    {...register("gender")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-red-500 text-sm">{errors.gender.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nationality</label>
                  <input
                    {...register("nationality")}
                    placeholder="Enter your nationality"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  />
                  {errors.nationality && <p className="mt-1 text-red-500 text-sm">{errors.nationality.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone</label>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  />
                  {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Address</label>
                  <input
                    {...register("address")}
                    placeholder="Enter your address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  />
                  {errors.address && <p className="mt-1 text-red-500 text-sm">{errors.address.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  {...register("message")}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 min-h-[120px]"
                ></textarea>
                {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Submit Survey
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Modal Dialog */}
      {modalData && (
        <Dialog open={true} onClose={() => setModalData(null)} className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <DialogPanel className="fixed inset-0 bg-black/40" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full"
            >
              <div className="text-center">
                {modalData.type === "success" ? (
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                <DialogTitle
                  className={`text-2xl font-bold ${modalData.type === "success" ? "text-green-600" : "text-red-600"}`}
                >
                  {modalData.type === "success" ? "Success!" : "Error"}
                </DialogTitle>
                <p className="mt-4 text-lg text-gray-600">{modalData.message}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setModalData(null)}
                  className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </div>
  )
}

export default SurveyForm