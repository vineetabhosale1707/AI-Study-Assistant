import { GraduationCapIcon } from "./Icons";

function Navbar() {
  return (
    <div className="logo-wrap">
      <span className="logo-badge">
        <GraduationCapIcon size={18} />
      </span>
      StudyMate <span className="logo-accent">AI</span>
    </div>
  );
}

export default Navbar;
