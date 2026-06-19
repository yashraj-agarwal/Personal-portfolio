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
      // Problem → Solution → Impact
      description: "SOC teams were drowning in alert noise across sprawling infrastructure. I built a distributed NOC/SOC platform that ingests real-time telemetry from 500+ nodes using Scapy packet inspection, then routes critical events to a Llama 3.1 AI Copilot that drafts remediation playbooks automatically — cutting mean time-to-response by an estimated 60%.",
      tags: ["React", "FastAPI", "Redis", "Docker", "Llama 3.1"],
      link: "https://github.com/yashraj-agarwal",
      featured: true,
    },
    {
      id: 2,
      title: "VaaniPay",
      description: "200M+ Indians remain locked out of digital banking by language barriers. VaaniPay is a voice-first banking IVR that handles secure transactions in 9 regional languages — powered by Sarvam AI TTS for natural speech and stateful session routing built on Twilio. Won 1st Place at the ACM Hackathon against 60+ teams.",
      tags: ["Python", "Twilio", "Sarvam AI", "Flask"],
      link: "https://github.com/yashraj-agarwal",
      featured: true,
    },
    {
      id: 3,
      title: "AeroHealth",
      description: "Hospital triage was manual and error-prone under peak load. AeroHealth is an Azure-ready NLP triage engine that classifies patient symptoms across 11 departments in real time, plus a predictive capacity model that forecasts bed occupancy 24 hours ahead so administrators can staff proactively.",
      tags: ["Next.js", "Azure AI", "NLP"],
      link: "https://github.com/yashraj-agarwal",
      featured: false,
    },
    {
      id: 4,
      title: "Project Atlas",
      description: "Static websites can't communicate the depth of a brand's story. Project Atlas is a scroll-driven 3D web experience built with Three.js and GSAP that guides visitors through an interactive narrative — demonstrating how immersive engineering and motion design compound to increase dwell time and recall.",
      tags: ["Three.js", "GSAP", "WebGL"],
      link: "https://github.com/yashraj-agarwal",
      featured: false,
    }
  ]
};
