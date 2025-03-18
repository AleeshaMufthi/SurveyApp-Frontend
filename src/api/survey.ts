import API from "./axios";

interface SurveyData {
    name: string;
    gender: string;
    nationality: string;
    email: string;
    phone: string;
    address: string;
    message: string;
  }

export const createSurveyAPI = async (data: SurveyData) => {
    return await API.post("/survey/create", data);
  };

export const getSurveysAPI = async () => {
    return await API.get("/survey/details");
  };
  
  