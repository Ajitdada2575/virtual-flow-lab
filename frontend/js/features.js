// ============================================================
//  Virtual Flow Lab — features.js
//  All site feature data, how-it-works steps, and FAQ content
// ============================================================

const VFL = {

  // ── MAIN FEATURES ────────────────────────────────────────
  features: [
    {
      id: "learning",
      icon: "📖",
      color: "#60a5fa",
      title: "Learning Modules",
      tagline: "Master theory before you touch the hardware",
      description:
        "Structured pre-lab modules walk you through the underlying fluid-dynamics theory, safety protocols, and standard operating procedures. Each module includes short quizzes to confirm understanding before you are allowed to book a hardware slot.",
      highlights: [
        "Video walkthroughs + written theory",
        "Safety checklist per experiment type",
        "Auto-graded quizzes with instant feedback",
        "Progress tracking across all modules",
      ],
    },
    {
      id: "booking",
      icon: "📅",
      color: "#c084fc",
      title: "Slot Booking",
      tagline: "Reserve your time — no conflicts, ever",
      description:
        "A real-time calendar lets you see every available hardware window across all rigs. Once you pick a slot it is exclusively yours — no double-booking, no interruptions. You receive an email reminder 15 minutes before your session starts.",
      highlights: [
        "Live availability calendar",
        "Exclusive 30 / 60 / 90-minute slots",
        "Email + in-app reminder system",
        "Easy reschedule or cancellation",
      ],
    },
    {
      id: "control",
      icon: "🎮",
      color: "#4ade80",
      title: "Real-Time Hardware Control",
      tagline: "Operate pumps, valves and sensors live",
      description:
        "During your booked slot you get a full-screen control panel with actuator toggles, setpoint sliders, and a live video feed from the rig camera. Every command you send is executed in under 20 ms.",
      highlights: [
        "Pump speed & valve position control",
        "Live HD camera feed of the rig",
        "Emergency stop button always visible",
        "Command log for full audit trail",
      ],
    },
    {
      id: "monitoring",
      icon: "📊",
      color: "#ffd43b",
      title: "Live Data Monitoring",
      tagline: "Sensor graphs that update every second",
      description:
        "Flow rate, pressure, temperature, and level sensors stream data directly to your browser. Charts update in real-time so you can observe system behaviour as it happens and make immediate adjustments.",
      highlights: [
        "Multi-sensor dashboard in one view",
        "Zoom and pan on any time-window",
        "Threshold alerts with visual warnings",
        "Annotate chart events during the run",
      ],
    },
    {
      id: "export",
      icon: "💾",
      color: "#38bdf8",
      title: "Data Export & Analysis",
      tagline: "Download raw CSV or auto-generated reports",
      description:
        "After your session ends all sensor data is packaged into a timestamped CSV you can download instantly. An auto-generated PDF report includes your experiment metadata, graphs, and a statistical summary.",
      highlights: [
        "CSV download — all sensor channels",
        "Auto PDF report with graphs",
        "Compatible with Excel, MATLAB, Python",
        "Data stored for 90 days post-session",
      ],
    },
    {
      id: "collaboration",
      icon: "👥",
      color: "#f472b6",
      title: "Team Collaboration",
      tagline: "Invite teammates to observe your live session",
      description:
        "Share a read-only live link with up to 10 observers. Observers see the same real-time graphs and camera feed, and can chat in a session-specific sidebar. Only the host controls the hardware.",
      highlights: [
        "Up to 10 live observers per session",
        "In-session chat sidebar",
        "Role-based access (host vs. observer)",
        "Share link expires when session ends",
      ],
    },
    {
      id: "certificates",
      icon: "🏅",
      color: "#fb923c",
      title: "Certificates & Badges",
      tagline: "Earn verifiable credentials for every experiment",
      description:
        "Complete an experiment end-to-end and a digitally signed certificate is issued automatically. Certificates are verifiable via a public URL and can be added directly to your LinkedIn profile.",
      highlights: [
        "Digitally signed PDF certificate",
        "Public verification link",
        "One-click LinkedIn integration",
        "Badge wall on your profile page",
      ],
    },
    {
      id: "safety",
      icon: "🛡️",
      color: "#a78bfa",
      title: "Safety & Compliance",
      tagline: "Hardware protected at every level",
      description:
        "All rigs have software-enforced operating limits. If a setpoint would take a sensor outside safe bounds the command is blocked and you are notified. A dedicated watchdog server monitors every rig 24/7.",
      highlights: [
        "Software-enforced actuator limits",
        "Real-time watchdog monitoring",
        "Automatic shutdown on fault detection",
        "Full incident log accessible to admins",
      ],
    },
  ],

  // ── HOW IT WORKS — STEPS ────────────────────────────────
  steps: [
    {
      number: "01",
      icon: "🔐",
      title: "Create your account",
      detail:
        "Sign up with your institutional email. Verify your account, complete your profile, and get instant access to all learning modules.",
    },
    {
      number: "02",
      icon: "📖",
      title: "Complete the pre-lab module",
      detail:
        "Pick the experiment you want to run. Study the theory and safety content, then pass the short quiz. This unlocks the booking calendar for that experiment.",
    },
    {
      number: "03",
      icon: "📅",
      title: "Book a hardware slot",
      detail:
        "Choose a free window on the live calendar. Select 30, 60, or 90 minutes. Your slot is confirmed immediately and added to your dashboard.",
    },
    {
      number: "04",
      icon: "🎮",
      title: "Run your experiment",
      detail:
        "At your start time the control panel unlocks. Operate the hardware, watch the live camera feed, and monitor all sensor graphs in real time.",
    },
    {
      number: "05",
      icon: "📊",
      title: "Analyze & export data",
      detail:
        "When your session ends, download your CSV data and auto-generated PDF report. Share results with teammates or your supervisor.",
    },
    {
      number: "06",
      icon: "🏅",
      title: "Earn your certificate",
      detail:
        "A digitally signed certificate is issued automatically. Add it to LinkedIn or share the public verification link.",
    },
  ],

  // ── TECH SPECS ──────────────────────────────────────────
  specs: [
    { label: "Control latency",   value: "< 20 ms",   icon: "⚡" },
    { label: "Sensor sample rate", value: "1 Hz",      icon: "📡" },
    { label: "Video feed",         value: "720p / 30fps", icon: "🎥" },
    { label: "Data retention",     value: "90 days",   icon: "💾" },
    { label: "Max observers",      value: "10 / session", icon: "👥" },
    { label: "Uptime SLA",         value: "99.8 %",    icon: "🛡️" },
  ],

  // ── FAQ ─────────────────────────────────────────────────
  faq: [
    {
      q: "Do I need any special hardware to use Virtual Flow Lab?",
      a: "No. All you need is a modern browser (Chrome, Firefox, Edge, Safari) and a stable internet connection of at least 5 Mbps for the live video feed.",
    },
    {
      q: "Can I use Virtual Flow Lab on a mobile device?",
      a: "The learning modules and data export pages work on mobile. The hardware control panel is optimised for a desktop or tablet screen (1024 px wide or more) for the best experience.",
    },
    {
      q: "What happens if my internet drops during a session?",
      a: "The rig switches to a safe-hold state automatically — all actuators freeze at their last setpoint. When you reconnect within 2 minutes your session resumes. After 2 minutes the slot is released and rescheduled free of charge.",
    },
    {
      q: "How do I reschedule or cancel a slot?",
      a: "Open your dashboard, find the booking, and click 'Reschedule' or 'Cancel'. Cancellations made more than 30 minutes before the start time are free. Late cancellations count against your monthly booking allowance.",
    },
    {
      q: "Are the certificates recognised by universities?",
      a: "Certificates are digitally signed and publicly verifiable. Recognition depends on your institution's policy. Several partner universities formally accept them as lab credit — check the Institutions page for the current list.",
    },
    {
      q: "Can my whole lab group share one session?",
      a: "Yes. The session host controls the hardware while up to 10 teammates observe the live feed and charts in real time via a shared link. Only one person controls the rig at a time.",
    },
    {
      q: "Is my experiment data private?",
      a: "Yes. Your data is stored encrypted and is only accessible to you, your invited observers, and your institution admin. It is never shared with third parties.",
    },
    {
      q: "What experiments are currently available?",
      a: "The current catalogue includes: pipe flow & head loss, centrifugal pump characteristics, flow over a weir, orifice & venturi meter, and Reynolds number demonstration. New rigs are added every semester.",
    },
  ],

};

// Export for use in features.html
if (typeof module !== 'undefined') module.exports = VFL;
