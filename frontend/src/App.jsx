import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import StudyWorkspace from "./components/StudyWorkspace";
import Notes from "./components/Notes";
import Settings from "./components/Settings";
import "./App.css";


function App() {

  const [activePage, setActivePage] = useState("home");


  return (

    <>

      <Navbar />


      <Sidebar setActivePage={setActivePage} />


      <main>


        <section
          style={{
            display: activePage === "home" ? "block" : "none"
          }}
        >

          <h1>
            Study Smarter. Learn Faster. 🚀
          </h1>

          <p>
            Upload your notes and let AI help you study.
          </p>


        </section>



        <section
          style={{
            display: activePage === "workspace" ? "block" : "none"
          }}
        >

          <StudyWorkspace />

        </section>




        <section
          style={{
            display: activePage === "notes" ? "block" : "none"
          }}
        >

          <Notes />

        </section>




        <section
  id="settings"
  style={{
    display: activePage === "settings" ? "block" : "none"
  }}
>
  <Settings />
</section>




        <section
  id="profile"
  style={{
    display: activePage === "profile" ? "block" : "none"
  }}
>
  <Profile />
</section>


      </main>


    </>

  );

}


export default App;