export const portfolioData = {
  hero: {
    title: "Hi, I'm Yash Raj",
    roles: ["Developer", "Designer", "Shipper"],
    subtitle: "A software engineer & designer building modern, cinematic web experiences.",
  },
  about: {
    description: "I am a passionate software engineer currently pursuing my B.Tech in Computer Science & Engineering at Manipal Institute of Technology. I specialize in frontend development, UI/UX design, and full-stack web applications. My journey involves creating intuitive and performant applications that solve real-world problems, with a strong foundation in core computer science principles and a versatile skill set spanning modern web technologies, AI integration, and cloud deployment.",
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
      description: "Distributed NOC/SOC platform with real-time telemetry analysis across 500+ nodes. Features Scapy-based packet inspection and a Llama 3.1 AI Copilot for automated threat remediation.",
      tags: ["React", "FastAPI", "Redis", "Docker", "Llama 3.1"],
      link: "https://github.com/yashraj-agarwal"
    },
    {
      id: 2,
      title: "VaaniPay",
      description: "Scalable voice-first banking IVR in 9 regional languages. Integrates Sarvam AI TTS for dynamic prompts and secure stateful routing. 1st Place at ACM Hackathon.",
      tags: ["Python", "Twilio", "Sarvam AI", "Flask"],
      link: "https://github.com/yashraj-agarwal"
    },
    {
      id: 3,
      title: "AeroHealth",
      description: "Azure-ready NLP triage engine categorizing symptoms across 11 departments. Includes a predictive model forecasting hospital capacities.",
      tags: ["Next.js", "Azure AI", "NLP"],
      link: "https://github.com/yashraj-agarwal"
    },
    {
      id: 4,
      title: "Project Atlas",
      description: "Interactive 3D web experience built with Three.js and GSAP for immersive storytelling.",
      tags: ["Three.js", "GSAP", "WebGL"],
      link: "https://github.com/yashraj-agarwal"
    }
  ]
};
