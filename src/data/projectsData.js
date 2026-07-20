export const projectsData = [
  {
    id: "support-intelligence",
    title: "Customer Support Intelligence Platform",
    subtitle: "RAG & LLM Ticket Triage Platform",
    category: "ai",
    featured: true,
    num: "01",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    description: "RAG-driven ticket summarisation, intent extraction, and agent recommendation system. Given a raw support interaction (chat, email, or voice transcript), the platform cleans, anonymises, summarises, and triages tickets into structured action plans.",
    metrics: [
      { label: "MRR Score", value: "1.000" },
      { label: "nDCG@3", value: "0.890" },
      { label: "ROUGE-1", value: "0.436" },
      { label: "Intent F1", value: "0.800" }
    ],
    highlights: [
      "PII-aware ingestion pipeline (email, phone, SSN, credit card masking) prior to vector indexing in Qdrant.",
      "2–3 sentence agent-ready summarisation enriched with intent, sentiment score, SLA priority, and NER extractions.",
      "RAG retrieval architecture featuring cross-encoder reranking, LLM orchestration, and Streamlit agent UI with active human-in-the-loop feedback.",
      "OAuth2 JWT authentication, granular RBAC, rate-limiting middleware, and production Docker containerization."
    ],
    tags: ["Python", "FastAPI", "Streamlit", "Qdrant", "RAG", "LLM", "Docker", "JWT"],
    github: "https://github.com/ani-1129/customer-support-intelligence-platform",
    demo: "https://support-intelligence-platform.streamlit.app/",
    apiDocs: "https://customer-support-api-4xns.onrender.com/docs"
  },
  {
    id: "fraud-detection",
    title: "Financial Fraud Detection AI",
    subtitle: "Real-Time Intelligence Dashboard",
    category: "dashboards",
    featured: false,
    num: "02",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    description: "AI-powered fraud intelligence dashboard analyzing financial transactions in real time, surfacing suspicious anomaly patterns through 15+ interactive visualizations.",
    metrics: [
      { label: "Visual Charts", value: "15+" },
      { label: "Latency", value: "<150ms" },
      { label: "Risk Radar", value: "Real-Time" }
    ],
    highlights: [
      "Glassmorphism dashboard with 15 interactive Plotly charts for fraud trends, anomaly risk scores, and geographic transaction hotspots.",
      "Multi-dimensional filters by payment method, city, fraud status, custom date range, and risk severity.",
      "One-click timestamped CSV data export for regulatory compliance and downstream audit workflows."
    ],
    tags: ["Python", "Streamlit", "Plotly", "Pandas", "NumPy", "Scikit-Learn"],
    github: "https://github.com/ani-1129",
    demo: "https://fraud-detection-system-by-aniket-singh.streamlit.app/"
  },
  {
    id: "ecommerce-sentiment",
    title: "E-Commerce Sentiment & Pricing Engine",
    subtitle: "Dynamic Pricing & Review Intelligence",
    category: "ai",
    featured: false,
    num: "03",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    description: "AI-driven pricing engine converting customer reviews into sentiment metrics and recommending optimized dynamic price adjustments across a 5-page analytics dashboard.",
    metrics: [
      { label: "Dashboard Pages", value: "5" },
      { label: "LLM Model", value: "Llama 3.2" },
      { label: "Sentiment Scale", value: "-1 to +1" }
    ],
    highlights: [
      "Local LLM (Ollama llama3.2) converts star ratings and raw customer reviews into exact sentiment scores (-1.0 to +1.0).",
      "5-page Streamlit analytics suite with 15+ Plotly charts covering product performance, price elasticity, and review polarity.",
      "Dynamic pricing engine calculating price change recommendations based on sentiment momentum and competitive benchmarks."
    ],
    tags: ["Python", "Streamlit", "Plotly", "PostgreSQL", "Ollama", "LLM", "NLP"],
    github: "https://github.com/ani-1129/ecommerce-sentiment-pricing",
    demo: "https://ecommerce-sentiment-pricing-mdndwngpuggu4jpsyfajrp.streamlit.app/"
  },
  {
    id: "telecom-churn",
    title: "Telecom Customer Churn Prediction System",
    subtitle: "ML Model Deployment & Analytics",
    category: "ai",
    featured: false,
    num: "04",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    description: "End-to-end machine learning ecosystem for predicting customer churn for 7,043 telecom accounts, complete with FastAPI REST service, MLflow tracking, and Docker Compose orchestration.",
    metrics: [
      { label: "Dataset Size", value: "7,043" },
      { label: "Balancing", value: "SMOTE" },
      { label: "Tracking", value: "MLflow" }
    ],
    highlights: [
      "Full predictive pipeline engineered for 7,043 accounts with SMOTE oversampling and automated model evaluation.",
      "Secure FastAPI REST API with bearer token authentication, batch inference endpoints, and structured churn probability outputs.",
      "Docker Compose containerization with Nginx reverse proxy, MLflow experiment tracking, and live Streamlit scoring portal."
    ],
    tags: ["Python", "FastAPI", "Streamlit", "MLflow", "Docker", "scikit-learn"],
    github: "https://github.com/ani-1129/telecom-churn-ml",
    demo: "https://churn-dashboard-zszi.onrender.com/",
    apiDocs: "https://churn-api-tmje.onrender.com/docs"
  },
  {
    id: "ai-job-agent",
    title: "AI Job Application & Resume Agent",
    subtitle: "Autonomous Career Assistant",
    category: "ai",
    featured: false,
    num: "05",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    description: "Autonomous AI agent leveraging LLMs and RAG to match job requirements, tailor resumes in real time, and generate customized cover letters for recruiters.",
    metrics: [
      { label: "Match Score", value: "95%" },
      { label: "Generation", value: "<5s" },
      { label: "Formats", value: "PDF / MD" }
    ],
    highlights: [
      "Parses job descriptions using Gemini/OpenAI API to extract key missing skill keywords and candidate match scores.",
      "Tailors resume bullet points dynamically based on targeted job specifications while preserving authentic facts.",
      "Generates recruiter email pitches and cover letters tailored to individual company cultures."
    ],
    tags: ["Python", "LangChain", "Gemini API", "React", "FastAPI"],
    github: "https://github.com/ani-1129",
    demo: "https://github.com/ani-1129"
  },
  {
    id: "ai-computer-agent",
    title: "AI Computer Control & Vision Agent",
    subtitle: "Autonomous GUI Navigation System",
    category: "ai",
    featured: false,
    num: "06",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    description: "Multimodal AI agent capable of understanding screen coordinates, executing OS terminal commands, and automating complex web navigation tasks.",
    metrics: [
      { label: "Vision LLM", value: "Multimodal" },
      { label: "Execution", value: "Local Sandbox" },
      { label: "Automation", value: "Web & OS" }
    ],
    highlights: [
      "Combines vision language models with desktop automation tools to perform multi-step web workflows.",
      "Parses DOM states and visual cues to fill forms, extract dynamic data, and execute tasks without human intervention."
    ],
    tags: ["Python", "OpenAI", "Playwright", "Computer Vision", "FastAPI"],
    github: "https://github.com/ani-1129",
    demo: "https://github.com/ani-1129"
  },
  {
    id: "alumni-connect",
    title: "Alumni Connect Platform",
    subtitle: "Full-Stack Networking Portal",
    category: "fullstack",
    featured: false,
    num: "07",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    description: "Full-stack web application designed for university alumni networking, job postings, and knowledge sharing — bridging students with industry mentors.",
    metrics: [
      { label: "Architecture", value: "MVC" },
      { label: "DBMS", value: "MySQL" },
      { label: "Responsiveness", value: "100%" }
    ],
    highlights: [
      "Structured DBMS schema optimizing search performance across student profiles, alumni directories, and job listings.",
      "Full CRUD functionality for blog publishing, event RSVPs, and alumni messaging.",
      "Mobile-responsive web interface built with pure CSS3 and vanilla JavaScript for high accessibility."
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    github: "https://github.com/ani-1129"
  },
  {
    id: "ecommerce-website",
    title: "Full-Stack E-Commerce Portal",
    subtitle: "Product Management & Checkout System",
    category: "fullstack",
    featured: false,
    num: "08",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    description: "E-Commerce web platform featuring interactive product catalogs, cart state management, user authentication, and order processing workflows.",
    metrics: [
      { label: "Cart State", value: "Persistent" },
      { label: "Database", value: "Relational" }
    ],
    highlights: [
      "Product catalog with dynamic filtering, live query search, category sorting, and cart state synchronization.",
      "User lifecycle management with session handling, secure password hashing, and user order history."
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    github: "https://github.com/ani-1129"
  },
  {
    id: "salesforce-crm",
    title: "Salesforce CRM Mini-App",
    subtitle: "Custom Objects & LWC Development",
    category: "cloud",
    featured: false,
    num: "09",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    description: "Enterprise exploration in Salesforce Developer Edition implementing custom objects, automated record flows, Apex triggers, and Lightning Web Components (LWC).",
    metrics: [
      { label: "Platform", value: "Salesforce" },
      { label: "Tech", value: "Apex & LWC" }
    ],
    highlights: [
      "Custom object model designed for tracking customer cases, automated escalation rules, and status triggers.",
      "Lightning Web Components (LWC) interface built for quick case updates and manager analytics dashboards."
    ],
    tags: ["Salesforce", "Apex", "LWC", "CRM", "Flows"],
    github: "https://github.com/ani-1129"
  }
];
