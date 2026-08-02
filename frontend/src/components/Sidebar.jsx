function Sidebar({ setActivePage }) {

  return (
    <aside className="sidebar">


      <div className="sidebar-logo">
        📚
        <h2>StudyMate AI</h2>
      </div>



      <nav className="sidebar-menu">


        <button onClick={() => setActivePage("home")}>
          🏠 Home
        </button>



        <button onClick={() => setActivePage("workspace")}>
          📄 Study Workspace
        </button>



        <button onClick={() => setActivePage("notes")}>
          📝 My Notes
        </button>



        <button onClick={() => setActivePage("settings")}>
          ⚙️ Settings
        </button>



        <button onClick={() => setActivePage("profile")}>
          👤 Profile
        </button>


      </nav>


    </aside>
  );
}


export default Sidebar;