export const portfolioData = {
  hero: {
    title: "Hi, I'm Yash Raj",
    roles: ["Developer", "Designer", "Shipper"],
    subtitle: "A software engineer & designer building modern, cinematic web experiences.",
  },

  about: {
    description: "I build the web experiences people screenshot. Currently a CSE undergrad at Manipal Institute of Technology, I've shipped 10+ projects blending engineering precision with design intent — from AI-powered security platforms monitoring 500+ nodes in real time, to voice-first banking systems deployed at hackathons. I move fast without breaking things: full-stack with React, Node, Python and cloud infra; comfortable owning a feature end-to-end from Figma frame to production deploy. Available for internships and project collaborations from August 2026.",
  },
  achievements: [
    {
      id: 1,
      title: "Top 50 - NameSpace Hackhazards 2026",
      description: "Largest international hackathon with 31000+ participants.",
      icon: "trophy"
    },
    {
      id: 2,
      title: "Top 250 - Microsoft AI Unlocked Hackathon 2026",
      description: "Competed globally building innovative AI-driven solutions.",
      icon: "star"
    },
    {
      id: 3,
      title: "SIH Regional Finalist 2026",
      description: "Smart India Hackathon Regional Finalist for developing impactful tech solutions.",
      icon: "medal"
    },
    {
      id: 4,
      title: "1st Place - ACM Hackathon 2026",
      description: "Architected and pitched project VaaniPay, securing first place at Manipal ACM Hackathon.",
      icon: "crown"
    },
    {
      id: 5,
      title: "1st Place - iDesign",
      description: "TechTatva 2025: Designed an AI-powered in-car infotainment system in Figma.",
      icon: "crown"
    },
    {
      id: 6,
      title: "1st Place - Negative Space 2026",
      description: "IECSE UI/UX Competition: Conceived an end-to-end college discovery platform.",
      icon: "crown"
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Manipal Institute of Technology",
      duration: "July 2024 - July 2028",
      description: "Location: Manipal, Karnataka, India."
    },
    {
      id: 2,
      degree: "High School (12th Grade), ISC",
      institution: "The Assam Valley School",
      duration: "April 2021 - April 2023",
      description: "Location: Tezpur, Assam, India."
    }
  ],
  experience: [
    {
      id: 1,
      role: "Software Developer Intern",
      company: "Universal Systems",
      duration: "May 2026 - July 2026",
      description: "Designed and deployed a client-facing business website end-to-end using Astro, TypeScript, HTML, CSS, achieving 100/100 Lighthouse Performance and SEO score. Built a business analytics dashboard using Python, Pandas, NumPy to process daily inventory and business data for EDA, trend analysis, inventory insights and statistical reporting to support data-driven decisions."
    },
    {
      id: 2,
      role: "Frontend Developer",
      company: "Froker (Freelance)",
      duration: "May 2025 - July 2025",
      description: "Collaborated remotely with a large tech team to help scale a MERN-stack app from a few hundred to 50,000+ downloads, gathering and translating requirements into interface specifications and high-fidelity prototypes. Built React frontend features across 20+ client projects from requirement discussions through deployment, driving repeat engagements through consistent client trust."
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS",
    "Node.js", "UI/UX Design", "Framer Motion"
  ],
  projects: [
    {
      id: 1,
      title: "NetSight AI",
      description: "Built a distributed, event-driven network monitoring platform (Redis Pub/Sub, WebSockets, Docker) processing 10,000+ real-time telemetry across 500+ nodes, cutting manual triage time for anomaly detection. Implemented Scapy-based packet inspection and threat-detection pipelines with an integrated LLM diagnostics copilot to automate root-cause analysis and shorten incident-response time.",
      tags: ["FastAPI", "Redis", "Docker", "Scapy", "WebSockets"],
      link: "https://github.com/yashraj-agarwal",
      featured: true,
    },
    {
      id: 2,
      title: "VaaniPay",
      description: "Designed a voice-first UPI payments solution for financial inclusion, built on a Twilio-based IVR system that lets feature-phone users authorize transactions over standard voice calls delivering 7+ offline banking workflows with zero internet dependency for underserved users. Engineered a fault-tolerant session recovery mechanism and secured transactions with bcrypt MPIN validation, integrating Sarvam AI to dynamically route 260+ voice interactions across 9 regional languages.",
      tags: ["Python", "FastAPI", "Twilio", "Sarvam AI", "bcrypt"],
      link: "https://github.com/yashraj-agarwal",
      featured: true,
    },
    {
      id: 3,
      title: "AeroHealth",
      problem: "ER triage under peak load is done manually, causing patient misrouting across departments and unpredictable bed-capacity crises that administrators can't anticipate.",
      solution: "Azure-ready NLP engine classifying patient symptoms across 11 departments in real time, plus a predictive capacity model forecasting bed occupancy 24 hours ahead.",
      impact: "Enables proactive staffing decisions — administrators act on forecasts, not crises.",
      description: "Built an AI-driven healthcare routing platform dispatching patients to optimal hospitals in real time, using Azure AI Language to extract clinical entities from free-textsymptoms and classify across 11 departments and 5 urgency levels, with a rule-based fallback ensuring the system degrades gracefully if Azure is unreachable. Designed a 6-variable weighted forecasting model predicting each hospital’s 60-minute occupancy, feeding a hospital-scoring engine that dynamically reroutes ambulances via OSRM traffic-aware routing when a destination saturates en route.",
      tags: ["React", "Node.js", "Azure AI", "Socket.IO", "OpenRouteService"],
      link: "https://github.com/yashraj-agarwal",
      featured: false,
    },
    {
      id: 4,
      title: "Project Atlas",
      problem: "Static brand websites feel flat and forgettable — no depth, no narrative arc, no reason for a visitor to stay longer than 10 seconds.",
      solution: "Scroll-driven 3D web experience built with Three.js + GSAP using custom WebGL shaders, depth-layered parallax, and timeline-synced motion to guide users through a visual narrative.",
      impact: "Renders at 60 fps across modern browsers; demonstrates how immersive frontend engineering directly increases dwell time and brand recall for creative clients.",
      description: "Static brand websites feel flat and forgettable — no depth, no reason to stay. Project Atlas is a scroll-driven 3D web experience built with Three.js + GSAP, using custom WebGL shaders and timeline-synced motion to guide users through an immersive brand narrative. Runs at 60 fps — demonstrating how frontend engineering multiplies dwell time and recall for creative clients.",
      tags: ["Three.js", "GSAP", "WebGL"],
      link: "https://github.com/yashraj-agarwal",
      featured: false,
    }
  ]
};
