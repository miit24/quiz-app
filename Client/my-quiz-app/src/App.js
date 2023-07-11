import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import HomeScreen from './Screens/Home/HomeScreen.js';
import RegisterScreen from './Components/Register/RegisterScreen';
import AdminScreen from "./Screens/Admin/AdminHome/AdminScreen.js";
import EventScreen from "./Screens/Admin/Events/EventScreen.js";
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store.js';
import axios from 'axios';
import QuestionScreen from "./Screens/Admin/Question/QuestionScreen.js";
import SingleQuestion from "./Screens/Admin/Question/SingleQuestion.js";

function App() {
  const { events, setEvents,change } = useContext(Store)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const callApi = async () => {
      setLoading(true)
      const { data } = await axios.get("/category/all")
      setLoading(false)
      setEvents(data)
    }
    callApi()
  }, [change])

  return (
    <div className="App">
      <Toaster position="top-right"></Toaster>
      <Routes>
        <Route path='/home' element={<HomeScreen />} />
        <Route path='/create' element={<RegisterScreen />} />
        <Route path="/admin/home" element={<AdminScreen />} />
        <Route path="/admin/home/events" element={<EventScreen />} />
        <Route path="/admin/home/questions" element={<QuestionScreen />} />
        <Route path="/admin/home/questions/:id" element={<SingleQuestion />} />
      </Routes>
    </div>
  );
}

export default App;
