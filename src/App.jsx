import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Form from "./Components/Form/Form";
import Hero from "./Components/Hero/Hero";
import Navbar from "./Components/Navbar/Navbar";
import ThankYou from "./Components/ThankYou/ThankYou";
import HomePage from "./Components/HomePage/HomePage";
function App() {
  return (
    // <div>
    //   <div className="registrationHomepage">
    //     <Hero />
    //     <Form />
    //     <Navbar />
    //   </div>
    //   {/* <div className='registrationSecondpage'>
    // <Hero />
    // <ThankYou />
    // <Navbar />

    // </div>  */}
    // </div>
    <>
<Router>

        {/* <Navbar /> */}
    <Routes>
       <Route path="/" element={<HomePage/>}>
       <Route path="/" element={<Form/>}/>
       <Route path="/success" element={<ThankYou/>}/>
       </Route>
    </Routes>
</Router>
    </>
  );
}

export default App;
