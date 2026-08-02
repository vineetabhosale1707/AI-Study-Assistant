import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import StudyWorkspace from "./components/StudyWorkspace";
import Notes from "./components/Notes";

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
          style={{
            display: activePage === "settings" ? "block" : "none"
          }}
        >

          <h2>
            ⚙️ Settings
          </h2>

          <p>
            Customize your StudyMate AI experience.
          </p>

        </section>





        <section
          style={{
            display: activePage === "profile" ? "block" : "none"
          }}
        >

          <h2>
            👤 Profile
          </h2>

          <p>
            Student profile and learning progress.
          </p>

        </section>



      </main>


    </>

  );

}


export default App;