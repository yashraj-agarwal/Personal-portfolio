export const portfolioData = {
  hero: {
    title: "Hi, I'm Yash Raj",
    roles: ["Developer", "Designer", "Shipper"],
    subtitle: "A software engineer & designer building modern, cinematic web experiences.",
  },
  about: {
    description: "I build the web experiences people screenshot. Currently a CSE undergrad at Manipal Institute of Technology, I've shipped 10+ projects blending engineering precision with design intent — from AI-powered security platforms monitoring 500+ nodes in real time, to voice-first banking systems deployed at hackathons. I move fast without breaking things: full-stack with React, Node, Python and cloud infra; comfortable owning a feature end-to-end from Figma frame to production deploy. Available for internships and project collaborations from August 2026.",
  },
  process: [
    {
      id: 1,
      title: "System Architecture",
      description: "Designing scalable data models, system interactions, and robust infrastructure before writing code.",
      icon: "architecture"
    },
    {
      id: 2,
      title: "Core Engineering",
      description: "Developing clean, maintainable backend logic and performant frontend architectures.",
      icon: "engineering"
    },
    {
      id: 3,
      title: "Automation & CI/CD",
      description: "Building automated pipelines, data ETLs, and testing suites to ensure reliability and rapid iteration.",
      icon: "automation"
    },
    {
      id: 4,
      title: "Deployment & Scaling",
      description: "Deploying to cloud platforms with continuous monitoring and optimization for scale.",
      icon: "deployment"
    }
  ],
  experience: [
    {
      id: 1,
      role: "Winter Intern",
      company: "Universal Systems",
      duration: "Dec 2025 - Jan 2026",
      description: "Developed a full-stack business analytics platform using React.js, Node.js, and MongoDB to centralize operational and financial data from multiple sources. Built automated ETL and analysis pipelines in Python to process and analyze 100,000+ records, reducing report generation time by 80%."
    },
    {
      id: 2,
      role: "UI/UX & Frontend Development",
      company: "Froker (Freelance)",
      duration: "May 2025 - July 2025",
      description: "Designed 25+ mobile and web interfaces in Figma, covering user flows, wireframes, and high-fidelity designs. Implemented frontend components using HTML, CSS, and JavaScript, ensuring responsive layouts and smooth user interactions, and contributed to 15+ client projects improving user experience."
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
      description: "Architected a distributed NOC/SOC platform using React, FastAPI, PostgreSQL, Redis Pub/Sub, WebSockets, and Docker, supporting automated device discovery, topology visualization, security monitoring, and real-time analysis of 10,000+ telemetry events across 500+ network nodes. Built Scapy-based packet inspection, protocol analysis, threat detection, and attack simulation workflows, integrating an Ollama (Llama 3.1) AI Copilot for root-cause investigation and automated remediation recommendations.",
      tags: ["React", "FastAPI", "Redis", "Docker", "Llama 3.1"],
      link: "https://github.com/yashraj-agarwal",
      featured: true,
    },
    {
      id: 2,
      title: "VaaniPay",
      description: "Developed a scalable voice-first banking IVR with Python (Flask) & Twilio API, enabling 7+ offline financial services for feature phones in 9 regional languages. Integrated Sarvam AI TTS to synthesize 260+ dynamic audio prompts, implementing secure stateful routing and RESTful APIs. Won 1st Place at the ACM Hackathon against 60+ teams.",
      tags: ["Python", "Twilio", "Sarvam AI", "Flask"],
      link: "https://github.com/yashraj-agarwal",
      featured: true,
    },
    {
      id: 3,
      title: "AeroHealth",
      problem: "ER triage under peak load is done manually, causing patient misrouting across departments and unpredictable bed-capacity crises that administrators can't anticipate.",
      solution: "Azure-ready NLP engine classifying patient symptoms across 11 departments in real time, plus a predictive capacity model forecasting bed occupancy 24 hours ahead.",
      impact: "Enables proactive staffing decisions — administrators act on forecasts, not crises.",
      description: "ER triage under peak load is done manually, causing patient misrouting and unpredictable bed-capacity crises. AeroHealth is an Azure-ready NLP engine that classifies symptoms across 11 departments in real time, paired with a capacity-forecasting model that predicts bed occupancy 24 hours ahead — enabling proactive staffing, not reactive scrambling.",
      tags: ["Next.js", "Azure AI", "NLP"],
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
