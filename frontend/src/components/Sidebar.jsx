import {
  HomeIcon,
  BookIcon,
  NotebookIcon,
  UserIcon,
  SettingsIcon,
} from "./Icons";

function Sidebar({ setActivePage, activePage }) {
  return (
    <nav className="nav-pills">
      <button
        className={activePage === "home" ? "active" : ""}
        onClick={() => setActivePage("home")}
      >
        <HomeIcon size={16} />
        <span className="nav-label">Home</span>
      </button>

      <button
        className={activePage === "workspace" ? "active" : ""}
        onClick={() => setActivePage("workspace")}
      >
        <BookIcon size={16} />
        <span className="nav-label">Study Workspace</span>
      </button>

      <button
        className={activePage === "notes" ? "active" : ""}
        onClick={() => setActivePage("notes")}
      >
        <NotebookIcon size={16} />
        <span className="nav-label">My Notes</span>
      </button>

      <button
        className={activePage === "profile" ? "active" : ""}
        onClick={() => setActivePage("profile")}
      >
        <UserIcon size={16} />
        <span className="nav-label">Profile</span>
      </button>

      <button
        className={activePage === "settings" ? "active" : ""}
        onClick={() => setActivePage("settings")}
      >
        <SettingsIcon size={16} />
        <span className="nav-label">Settings</span>
      </button>
    </nav>
  );
}

export default Sidebar;