/*
  Small inline SVG icon set for StudyMate AI.
  Pure presentation - no logic, no state, no side effects.
  Every icon accepts a `className` and `size` (defaults to 18) so
  callers can control color (via currentColor) and sizing from CSS.
*/

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function GraduationCapIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M2 8.5 12 4l10 4.5-10 4.5-10-4.5Z" />
      <path d="M6 10.7v4.6c0 1.4 2.7 3.2 6 3.2s6-1.8 6-3.2v-4.6" />
      <path d="M20.5 9v5.5" />
    </svg>
  );
}

export function HomeIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M3.5 10.5 12 3.5l8.5 7" />
      <path d="M5.5 9v9.5a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1V15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3.5a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1V9" />
    </svg>
  );
}

export function BookIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v17H6.5A2.5 2.5 0 0 0 4 22.5v-17Z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v17h5.5A2.5 2.5 0 0 1 20 22.5v-17Z" />
    </svg>
  );
}

export function NotebookIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 3.5h11.5A1.5 1.5 0 0 1 18 5v15a1.5 1.5 0 0 1-1.5 1.5H5.8" />
      <path d="M5.2 3.5c-1 0-1.7.8-1.7 1.7v13.6c0 1 .8 1.7 1.7 1.7" />
      <path d="M8 8h6M8 12h6M8 16h4" />
    </svg>
  );
}

export function UserIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" />
    </svg>
  );
}

export function SettingsIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10c.1.7.6 1.3 1.6 1.4h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z" />
    </svg>
  );
}

export function SparkleIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.05 2.3a1 1 0 0 1 1.9 0l1.2 3.6a4 4 0 0 0 2.55 2.55l3.6 1.2a1 1 0 0 1 0 1.9l-3.6 1.2a4 4 0 0 0-2.55 2.55l-1.2 3.6a1 1 0 0 1-1.9 0l-1.2-3.6a4 4 0 0 0-2.55-2.55l-3.6-1.2a1 1 0 0 1 0-1.9l3.6-1.2A4 4 0 0 0 9.85 5.9Z" />
      <path d="M19 15.5a.7.7 0 0 1 1.3 0l.4 1.1c.14.36.42.64.78.78l1.1.4a.7.7 0 0 1 0 1.32l-1.1.4a1.2 1.2 0 0 0-.78.78l-.4 1.1a.7.7 0 0 1-1.3 0l-.4-1.1a1.2 1.2 0 0 0-.78-.78l-1.1-.4a.7.7 0 0 1 0-1.32l1.1-.4c.36-.14.64-.42.78-.78Z" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4.5 12h15" />
      <path d="M13 5.5 19.5 12 13 18.5" />
    </svg>
  );
}

export function FileTextIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M7 3.5h7l4.5 4.5v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M8.5 12.5h7M8.5 15.5h7M8.5 18h4" />
    </svg>
  );
}

export function ListChecksIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="m3 6 1.5 1.5L7.5 4.5" />
      <path d="m3 13 1.5 1.5 3-3" />
      <path d="M11 6h10M11 13h10M11 19.5h10" />
      <path d="m3 19 1.5 1.5 3-3" />
    </svg>
  );
}

export function LayersIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="m12 3 9 4.7-9 4.7-9-4.7Z" />
      <path d="m3 12.3 9 4.7 9-4.7" />
      <path d="m3 17 9 4.7L21 17" />
    </svg>
  );
}

export function ChatIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 12c0-4.4 3.8-8 8.5-8s8.5 3.6 8.5 8-3.8 8-8.5 8c-1 0-1.9-.14-2.8-.4L4.5 21l1.2-3.9C4.6 15.7 4 14 4 12Z" />
    </svg>
  );
}

export function UploadCloudIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M7.5 17.5a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.4 8a4.25 4.25 0 0 1 1.1 8.35" />
      <path d="M12 12v7.5" />
      <path d="m9 15 3-3 3 3" />
    </svg>
  );
}

export function LightbulbIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.46 1.1 1.2 1.1 2.2h5c0-1 .5-1.74 1.1-2.2A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

export function EditIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M13.5 4.5 19 10l-9.5 9.5-6 1 1-6Z" />
      <path d="m17 6.5 1.5 1.5" />
    </svg>
  );
}

export function TrashIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4.5 7h15" />
      <path d="M9.5 7V5.2A1.2 1.2 0 0 1 10.7 4h2.6a1.2 1.2 0 0 1 1.2 1.2V7" />
      <path d="M6.5 7 7.3 19a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4L17.5 7" />
      <path d="M10.3 11v6M13.7 11v6" />
    </svg>
  );
}

export function DownloadIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3.5v11.5" />
      <path d="m8 11.5 4 4 4-4" />
      <path d="M5 17.5v1.7a2.3 2.3 0 0 0 2.3 2.3h9.4a2.3 2.3 0 0 0 2.3-2.3v-1.7" />
    </svg>
  );
}

export function RefreshIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 12a8 8 0 0 1 13.66-5.66L20 8.5" />
      <path d="M20 4v4.5h-4.5" />
      <path d="M20 12a8 8 0 0 1-13.66 5.66L4 15.5" />
      <path d="M4 20v-4.5h4.5" />
    </svg>
  );
}

export function SendIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M3.4 3.6a.8.8 0 0 1 .87-.13l16.5 7.7a.8.8 0 0 1 0 1.46l-16.5 7.7a.8.8 0 0 1-1.13-.85l1.7-6.9a.8.8 0 0 1 .6-.6l7-1.62a.15.15 0 0 0 0-.3l-7-1.62a.8.8 0 0 1-.6-.6l-1.7-6.9a.8.8 0 0 1 .26-.44Z" />
    </svg>
  );
}

export function BarChartIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 20V10M12 20V4M19 20v-7" />
      <path d="M3.5 20.5h17" />
    </svg>
  );
}

export function NoteEditIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 20.5H6.5A1.5 1.5 0 0 1 5 19V5a1.5 1.5 0 0 1 1.5-1.5H15L19 7.5v3" />
      <path d="M15 3.5V8h4" />
      <path d="M20.4 12.6 22 14.2l-6.3 6.3-2.3.6.6-2.3Z" />
    </svg>
  );
}

export function PlusIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 4.5v15M4.5 12h15" />
    </svg>
  );
}

export function DatabaseIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5V12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8V5.5" />
      <path d="M4.5 12v6.5c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8V12" />
    </svg>
  );
}

export function InfoIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
