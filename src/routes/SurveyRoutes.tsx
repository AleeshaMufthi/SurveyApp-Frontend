import { Routes, Route } from "react-router-dom";
import SurveyForm from "../components/SurveyForm";

const SurveyRoutes = () => (
    <Routes>
      <Route path="/" element={<SurveyForm />} />
    </Routes>
  );
  
  export default SurveyRoutes;


