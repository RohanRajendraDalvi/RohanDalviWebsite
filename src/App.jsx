import { useState, useEffect, useRef, createContext, useContext, useMemo } from "react";
import { Github, Linkedin, ExternalLink, Gamepad2, Briefcase, GraduationCap, Code2, Menu, Award, ShieldCheck, Sun, Moon, ChevronDown, Search, Star, Zap, X, Mail, Phone, MapPin, Send, FileText } from "lucide-react";
import emailjs from "@emailjs/browser";

const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);

const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const CONTACT_RATE_LIMIT_MS = 60000;
const CONTACT_MAX_MESSAGE_CHARS = 2000;

const T = {
  light: {
    bg: "#fafbfc", bg2: "#f8faf5", bg3: "#f0fdf4", card: "white", cardBorder: "#e5e7eb", cardHover: "#86efac",
    text: "#111827", text2: "#4b5563", text3: "#6b7280", text4: "#9ca3af",
    green: "#16a34a", greenDark: "#15803d", greenLight: "#22c55e", greenBg: "#f0fdf4", greenBorder: "#bbf7d0",
    inputBg: "white", inputBorder: "#e5e7eb", inputFocus: "#86efac",
    navBg: "rgba(250,251,252,0.85)", navBorder: "#f3f4f6",
    tagBg: "#f3f4f6", shadow: "0 1px 3px rgba(0,0,0,0.04)", shadowHover: "0 4px 20px rgba(22,163,74,0.08)",
    heroBg: "linear-gradient(180deg, #f0fdf4 0%, #fafbfc 60%)", heroOrb: "rgba(22,163,74,0.06)", heroOrb2: "rgba(34,197,94,0.04)",
    avatarBg: "linear-gradient(135deg, #f0fdf4, #dcfce7)", avatarBorder: "#bbf7d0",
    btnSecBg: "white", btnSecColor: "#374151", btnSecBorder: "#e5e7eb",
    footerBorder: "#f3f4f6",
    gameBg: "#f8faf5", gameBorder: "#e5e7eb", gameCard: "white",
    canvasBg: "#f8faf5", snakeColor: "#16a34a",
    reactionWait: "#f3f4f6", reactionReady: "#fef2f2", reactionGo: "#dcfce7", reactionEarly: "#fefce8",
    scrollTrack: "#fafbfc", scrollThumb: "#d1d5db",
  },
  dark: {
    bg: "#0a0a0b", bg2: "#111113", bg3: "#0d1a0d", card: "#161618", cardBorder: "#27272a", cardHover: "#22c55e55",
    text: "#f0f0f0", text2: "#a1a1aa", text3: "#71717a", text4: "#52525b",
    green: "#22c55e", greenDark: "#16a34a", greenLight: "#4ade80", greenBg: "rgba(22,163,74,0.1)", greenBorder: "rgba(34,197,94,0.25)",
    inputBg: "#161618", inputBorder: "#27272a", inputFocus: "#22c55e55",
    navBg: "rgba(10,10,11,0.85)", navBorder: "#1a1a1e",
    tagBg: "#1e1e22", shadow: "0 1px 3px rgba(0,0,0,0.3)", shadowHover: "0 4px 20px rgba(34,197,94,0.12)",
    heroBg: "linear-gradient(180deg, #0d1a0d 0%, #0a0a0b 60%)", heroOrb: "rgba(22,163,74,0.08)", heroOrb2: "rgba(34,197,94,0.05)",
    avatarBg: "linear-gradient(135deg, rgba(22,163,74,0.15), rgba(34,197,94,0.1))", avatarBorder: "rgba(34,197,94,0.3)",
    btnSecBg: "#161618", btnSecColor: "#e4e4e7", btnSecBorder: "#27272a",
    footerBorder: "#1a1a1e",
    gameBg: "#111113", gameBorder: "#27272a", gameCard: "#161618",
    canvasBg: "#0a0a0b", snakeColor: "#22c55e",
    reactionWait: "#1e1e22", reactionReady: "#2a1215", reactionGo: "#0d2818", reactionEarly: "#2a2510",
    scrollTrack: "#0a0a0b", scrollThumb: "#333",
  }
};

const SKILLS_DATA = [
  { name: "React.js", category: "Frontend", tags: ["frontend","javascript","ui","web","spa","component"] },
  { name: "JavaScript (ES6+)", category: "Frontend", tags: ["frontend","javascript","web","scripting"] },
  { name: "TypeScript", category: "Frontend", tags: ["frontend","javascript","typed","web"] },
  { name: "HTML5 / CSS3", category: "Frontend", tags: ["frontend","html","css","styling","ui","web"] },
  { name: "Redux Toolkit", category: "Frontend", tags: ["frontend","state","react","redux"] },
  { name: "Material UI", category: "Frontend", tags: ["frontend","ui","component","design","react"] },
  { name: "Next.js", category: "Frontend", tags: ["frontend","react","ssr","fullstack","web"] },
  { name: "Angular", category: "Frontend", tags: ["frontend","typescript","spa","web"] },
  { name: "Node.js", category: "Backend", tags: ["backend","javascript","server","api","express"] },
  { name: "Express.js", category: "Backend", tags: ["backend","javascript","api","rest","server","node"] },
  { name: "Python", category: "Backend", tags: ["backend","ml","data","scripting","ai","flask"] },
  { name: "Java", category: "Backend", tags: ["backend","enterprise","spring","oop"] },
  { name: "MongoDB", category: "Database", tags: ["backend","database","nosql","data","mongoose","schema"] },
  { name: "PostgreSQL", category: "Database", tags: ["backend","database","sql","data","relational"] },
  { name: "Firebase", category: "Database", tags: ["backend","database","realtime","cloud","mobile","auth"] },
  { name: "REST APIs", category: "Backend", tags: ["api","backend","integration","json","http"] },
  { name: "GraphQL", category: "Backend", tags: ["api","backend","frontend","query"] },
  { name: "JWT / RBAC", category: "Security", tags: ["auth","security","jwt","role","access","backend"] },
  { name: "Docker", category: "DevOps", tags: ["devops","containers","deployment","cloud","ci"] },
  { name: "Kubernetes", category: "DevOps", tags: ["devops","orchestration","containers","cloud","scaling"] },
  { name: "AWS", category: "Cloud", tags: ["cloud","devops","infrastructure","deployment","ec2","certified"] },
  { name: "Google Cloud", category: "Cloud", tags: ["cloud","gcp","infrastructure","deployment","certified","ml"] },
  { name: "GitHub Actions", category: "DevOps", tags: ["ci","cd","devops","automation","pipeline"] },
  { name: "TensorFlow.js", category: "AI/ML", tags: ["ai","ml","deep learning","javascript","computer vision"] },
  { name: "WebRTC", category: "Speciality", tags: ["realtime","video","streaming","peer","socket","webrtc"] },
  { name: "React Native", category: "Mobile", tags: ["mobile","react","ios","android","expo","cross-platform"] },
  { name: "Jest / Cypress", category: "Testing", tags: ["testing","jest","cypress","unit","e2e","qa"] },
  { name: "Git / GitHub", category: "Tools", tags: ["version control","collaboration","devops","git"] },
];

const JOB_ROLES = [
  { title: "Frontend Developer", keywords: ["react","javascript","typescript","html","css","frontend","ui","component","redux","next","angular","spa","web"] },
  { title: "Backend Developer", keywords: ["node","express","python","java","api","rest","graphql","server","backend","auth","jwt"] },
  { title: "Full Stack Developer", keywords: ["react","node","express","mongodb","javascript","typescript","frontend","backend","api","fullstack","web","database"] },
  { title: "MERN Stack Developer", keywords: ["mongodb","express","react","node","javascript","mongoose","nosql","api","rest","frontend","backend"] },
  { title: "Cloud / DevOps Engineer", keywords: ["aws","gcp","docker","kubernetes","ci","cd","devops","cloud","deployment","infrastructure","automation"] },
  { title: "Mobile Developer", keywords: ["react","mobile","ios","android","expo","cross-platform","firebase","native"] },
  { title: "ML / AI Engineer", keywords: ["python","ml","ai","tensorflow","deep learning","data","computer vision"] },
  { title: "Software Engineer", keywords: ["javascript","typescript","python","java","react","node","api","database","git","testing","docker","cloud"] },
  { title: "QA / Test Engineer", keywords: ["testing","jest","cypress","unit","e2e","qa","ci","automation"] },
  { title: "API Developer", keywords: ["rest","graphql","api","node","express","json","http","backend","integration"] },
];

const EXPERIENCE = [
  { role: "Web Application Developer", company: "State Street Corporation", location: "Boston, MA", period: "May 2024 – Present", bullets: ["Developed a React.js web app for portfolio managers to review fund holdings, transactions, daily NAV, and performance summaries — reducing manual Excel reporting by ~35%.","Managed state with React Hooks & Context API for portfolio selection and reporting, improving data consistency and minimizing redundant backend calls.","Built Node.js/Express REST APIs serving normalized investment data (positions, cash balances, valuations) — 10,000+ daily requests with sub-second response times.","Designed MongoDB schemas & aggregation pipelines to compute period-based performance metrics at the database level.","Implemented JWT auth and role-level authorization for sensitive client/fund data, aligned with internal security & audit requirements.","Supported containerized Docker deployments on AWS EC2, achieving ~25% reduction in deployment-related production issues."] },
  { role: "Full Stack Developer", company: "Infosys", location: "India", period: "Jun 2021 – Jul 2023", bullets: ["Developed a React.js ITSM portal used by 2,000+ employees to submit, track, and manage IT service requests across multiple business units.","Built Node.js/Express backend services managing full request lifecycle — submission, approval routing, escalation, and closure.","Designed MongoDB collections for service tickets, approval workflows, and audit logs for compliance and operational reporting.","Implemented SLA monitoring & escalation logic to auto-flag overdue requests, improving resolution time by ~20%.","Developed configurable request forms with client-side validation, reducing incomplete submissions by ~30%."] },
];

const EDUCATION = [
  { degree: "M.S. Computer Science", school: "Northeastern University", sub: "Khoury College of Computer Science, Boston, MA", period: "Graduated Dec 2025", detail: "GPA: 3.92/4.0 · Lead Graduate TA · Built TDD curriculum for 400+ students" },
  { degree: "B.E. Computer Engineering", school: "University of Mumbai", sub: "Mumbai, Maharashtra, India", period: "Graduated Jul 2023", detail: "GPA: 9.78/10 · Published researcher · Google DSC Core Committee" },
];

const PROJECTS = [
  { title: "FROST — Slip Tracking", desc: "CMT award-winning React Native + Firebase app combining computer vision, spatiotemporal decay, weather multipliers for real-time winter road slip probabilities.", tags: ["React Native","Firebase","CV"], link: "https://github.com/RohanRajendraDalvi/CMT-winners" },
  { title: "Meet'N'Treat", desc: "iOS app for scheduling pet interactions — 'Airbnb for pet meetups' — with real-time DB, maps, and Firebase auth.", tags: ["Swift","Firebase","MapKit"], link: "https://github.com/RohanRajendraDalvi/MeetNTreat-New" },
  { title: "Xander Glasses AR", desc: "Reduced AR device test cycles from 1 year to 1.5 months through automation with Kotlin, Docker, and GPU APIs.", tags: ["Kotlin","C","Docker"], link: "https://www.xanderglasses.com/xanderglasses" },
  { title: "Cine-Bot", desc: "Conversational movie search over 50K+ records with multi-LLM backend using FAISS and ChromaDB for semantic retrieval.", tags: ["React","Flask","FAISS"], link: "https://github.com/Mansi142000/NLP-Project" },
  { title: "HiringTek WebRTC", desc: "Scaled to 700 concurrent video sessions at $0.30/interview-hour. Published research chapter (Francis & Taylor).", tags: ["Angular","Socket.io","AWS"], link: "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003440901-12/revamping-hiring-process-using-webrtc-aws-cloud-gaze-tracking-application-megharani-patil-rohan-rajendra-dalvi-faraz-hussain-suyog-gupta?context=ubx&refId=018d159d-21f4-4cd4-bb0f-fc2f7edbf423" },
  { title: "Yoga AI", desc: "Browser-based yoga pose classifier with 90% accuracy and real-time visual feedback via TensorFlow.js.", tags: ["TensorFlow.js","HTML5","JS"], link: "https://yogai.onrender.com/" },
];

const ACHIEVEMENTS = [
  { title: "Cambridge Mobile Telematics Innovation Challenge", result: "3rd Place", year: "2025", emoji: "🥉" },
  { title: "TCET AAKAAR Project Competition", result: "Winner", year: "2022", emoji: "🥇" },
  { title: "Progressive India Idea Competition", result: "Runner Up", year: "2021", emoji: "🥈" },
];

const CERTIFICATIONS = [
  { name: "AWS Certified Cloud Architect", year: "2025" },
  { name: "AWS Certified ML Engineer", year: "2025" },
  { name: "Google Cloud Certification", year: "2023" },
  { name: "Google Cloud ML Certification", year: "2023" },
  { name: "Cyber Security — Univ. System of Georgia", year: "2021" },
  { name: "Information Security — Univ. of London", year: "2019" },
];

const STOP_WORDS = new Set(["a","an","the","with","for","and","or","to","of","in","on","at","by","as","is","are","be","from","using","experience","knowledge","required","preferred","plus","role","position","years"]);
const TOKEN_ALIASES = {
  "full stack": ["fullstack","mern","frontend","backend","api","database"],
  "software engineer": ["software developer","developer","engineer"],
  "software developer": ["software engineer","developer","engineer"],
  "frontend": ["front end","react","ui","javascript","typescript","html","css"],
  "backend": ["back end","nodejs","express","api","server"],
  "machine learning": ["ml","ai","python","tensorflow","deep learning"],
  "artificial intelligence": ["ai","ml","python","deep learning"],
  "devops": ["docker","kubernetes","cicd","cloud"],
  "testing": ["test","qa","sdet","automation","jest","cypress"],
  "qa": ["testing","test","sdet","automation"],
  "sdet": ["qa","testing","automation","jest","cypress"],
  "nodejs": ["node","node js","node.js"],
  "react": ["reactjs","react js","react.js"],
  "typescript": ["ts"],
  "javascript": ["js"],
  "cicd": ["ci/cd","ci cd","pipeline"],
};
const ROLE_INTENT_SKILLS = {
  "full stack": ["React.js","Node.js","Express.js","MongoDB","REST APIs","PostgreSQL","TypeScript","JavaScript (ES6+)","JWT / RBAC"],
  "software engineer": ["JavaScript (ES6+)","TypeScript","React.js","Node.js","REST APIs","PostgreSQL","Git / GitHub","Docker"],
  "frontend": ["React.js","JavaScript (ES6+)","TypeScript","HTML5 / CSS3","Redux Toolkit","Next.js","Material UI"],
  "backend": ["Node.js","Express.js","REST APIs","GraphQL","MongoDB","PostgreSQL","JWT / RBAC","Docker"],
  "devops": ["Docker","Kubernetes","GitHub Actions","AWS","Google Cloud"],
  "cloud": ["AWS","Google Cloud","Docker","Kubernetes"],
  "ml": ["Python","TensorFlow.js","Google Cloud","AWS"],
  "ai": ["Python","TensorFlow.js","Google Cloud","AWS"],
  "machine learning": ["Python","TensorFlow.js","Google Cloud","AWS"],
  "artificial intelligence": ["Python","TensorFlow.js","Google Cloud","AWS"],
  "testing": ["Jest / Cypress","GitHub Actions","TypeScript","JavaScript (ES6+)"],
  "qa": ["Jest / Cypress","GitHub Actions","JavaScript (ES6+)"],
  "sdet": ["Jest / Cypress","GitHub Actions","TypeScript"],
};
const SKILL_SYNONYMS = {
  "React.js": ["react","reactjs","spa"],
  "JavaScript (ES6+)": ["javascript","js","es6"],
  "TypeScript": ["typescript","ts"],
  "Node.js": ["node","nodejs","node.js"],
  "Express.js": ["express","expressjs","express.js"],
  "REST APIs": ["rest","api","apis","http","json"],
  "MongoDB": ["mongodb","mongo","nosql"],
  "PostgreSQL": ["postgres","postgresql","sql"],
  "JWT / RBAC": ["jwt","rbac","auth","authorization"],
  "GitHub Actions": ["cicd","ci","cd","pipeline"],
  "Jest / Cypress": ["testing","test","qa","sdet","automation","unit test","e2e","cypress","jest"],
  "TensorFlow.js": ["ml","ai","machine learning","deep learning","computer vision"],
  "Python": ["ml","ai","machine learning","backend scripting"],
  "AWS": ["cloud","ec2","s3","devops"],
  "Google Cloud": ["gcp","cloud","mlops"],
};

const normalizeText = (text="") => text
  .toLowerCase()
  .replace(/full[\s-]?stack/g, "full stack")
  .replace(/software\s+developer/g, "software engineer")
  .replace(/front[\s-]?end/g, "frontend")
  .replace(/back[\s-]?end/g, "backend")
  .replace(/node\.?\s*js/g, "nodejs")
  .replace(/react\.?\s*js/g, "react")
  .replace(/ci\s*\/?\s*cd/g, "cicd")
  .replace(/[^a-z0-9+#.\s]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const matchStrength = (signal, target) => {
  if (!signal || !target) return 0;
  if (signal === target) return 1;
  if (signal.length >= 3 && target.includes(signal)) return 0.68;
  if (target.length >= 3 && signal.includes(target)) return 0.58;
  if (signal.length >= 6 && target.startsWith(signal.slice(0, 5))) return 0.4;
  return 0;
};

const extractSignals = (query="") => {
  const normalized = normalizeText(query);
  if (!normalized) return [];
  const baseTokens = normalized.split(" ").filter(token => token.length > 1 && !STOP_WORDS.has(token));
  const signals = new Set(baseTokens);
  for (let i = 0; i < baseTokens.length - 1; i += 1) signals.add(`${baseTokens[i]} ${baseTokens[i + 1]}`);
  for (let i = 0; i < baseTokens.length - 2; i += 1) signals.add(`${baseTokens[i]} ${baseTokens[i + 1]} ${baseTokens[i + 2]}`);

  baseTokens.forEach(token => {
    if (token.length < 2) return;

    Object.entries(TOKEN_ALIASES).forEach(([phrase, expansions]) => {
      const phraseWords = phrase.split(" ");
      const isPrefix = phrase.startsWith(token) || phraseWords.some(word => word.startsWith(token));
      if (isPrefix) {
        signals.add(phrase);
        expansions.forEach(term => signals.add(normalizeText(term)));
      }
    });

    Object.entries(ROLE_INTENT_SKILLS).forEach(([intent, skills]) => {
      const intentWords = intent.split(" ");
      const isIntentPrefix = intent.startsWith(token) || intentWords.some(word => word.startsWith(token));
      if (isIntentPrefix) {
        signals.add(intent);
        skills.forEach(skillName => signals.add(normalizeText(skillName)));
      }
    });

    SKILLS_DATA.forEach(skill => {
      const skillName = normalizeText(skill.name);
      const category = normalizeText(skill.category);
      const startsName = skillName.split(" ").some(word => word.startsWith(token));
      const startsCat = category.split(" ").some(word => word.startsWith(token));
      const startsTag = skill.tags.some(tag => normalizeText(tag).split(" ").some(word => word.startsWith(token)));
      if (startsName || startsCat || startsTag) {
        signals.add(skillName);
        skill.tags.forEach(tag => signals.add(normalizeText(tag)));
      }
    });
  });

  Object.entries(TOKEN_ALIASES).forEach(([phrase, expansions]) => {
    if (normalized.includes(phrase)) {
      signals.add(phrase);
      expansions.forEach(term => signals.add(normalizeText(term)));
    }
  });
  return Array.from(signals);
};

const getIntentBoostMap = (normalizedQuery="") => {
  const boostMap = {};
  Object.entries(ROLE_INTENT_SKILLS).forEach(([intent, skills]) => {
    const fullMatch = normalizedQuery.includes(intent);
    const prefixMatch = normalizedQuery.length >= 2 && intent.split(" ").some(word => word.startsWith(normalizedQuery));
    if (fullMatch || prefixMatch) {
      skills.forEach(skillName => { boostMap[skillName] = (boostMap[skillName] || 0) + 3.6; });
    }
  });
  return boostMap;
};

const getSkillTerms = (skill) => {
  const terms = new Set();
  const addNormalized = (value="") => {
    const n = normalizeText(value);
    if (!n) return;
    terms.add(n);
    n.split(" ").forEach(token => { if (token.length > 1 && !STOP_WORDS.has(token)) terms.add(token); });
  };

  addNormalized(skill.name);
  addNormalized(skill.category);
  skill.tags.forEach(tag => addNormalized(tag));
  (SKILL_SYNONYMS[skill.name] || []).forEach(alias => addNormalized(alias));
  return Array.from(terms);
};

// ─── GAMES ───────────────────────────────────────────────────────────────────
function SnakeGame() {
  const t = useTheme();
  const canvasRef = useRef(null);
  const gameRef = useRef({ snake:[{x:10,y:10}], dir:{x:1,y:0}, food:{x:15,y:15}, score:0, running:true, nextDir:{x:1,y:0} });
  const [score,setScore]=useState(0);
  const [over,setOver]=useState(false);
  const CELL=16, W=25, H=18;

  const reset=()=>{
    gameRef.current = { snake:[{x:10,y:10}], dir:{x:1,y:0}, food:{x:15,y:15}, score:0, running:true, nextDir:{x:1,y:0} };
    setScore(0);
    setOver(false);
  };

  useEffect(()=>{
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const game = gameRef.current;

    const drawGame = () => {
      ctx.fillStyle = t.canvasBg;
      ctx.fillRect(0,0,W*CELL,H*CELL);
      ctx.fillStyle = t.snakeColor;
      game.snake.forEach(s => ctx.fillRect(s.x*CELL,s.y*CELL,CELL-1,CELL-1));
      ctx.fillStyle = '#f97316';
      ctx.fillRect(game.food.x*CELL,game.food.y*CELL,CELL-1,CELL-1);
    };

    const gameLoop = () => {
      if(!game.running) return;
      game.dir = game.nextDir;
      const head = game.snake[0];
      const nx = (head.x + game.dir.x + W) % W;
      const ny = (head.y + game.dir.y + H) % H;
      
      if(game.snake.some(s => s.x===nx && s.y===ny)){
        game.running = false;
        setOver(true);
        return;
      }
      
      game.snake.unshift({x:nx,y:ny});
      if(nx===game.food.x && ny===game.food.y){
        game.score += 10;
        setScore(game.score);
        game.food = {x:Math.floor(Math.random()*W), y:Math.floor(Math.random()*H)};
      } else {
        game.snake.pop();
      }
      drawGame();
    };

    const handleKey = (e) => {
      const key = e.key;
      if(key==='ArrowUp' && game.dir.y===0) game.nextDir={x:0,y:-1};
      if(key==='ArrowDown' && game.dir.y===0) game.nextDir={x:0,y:1};
      if(key==='ArrowLeft' && game.dir.x===0) game.nextDir={x:-1,y:0};
      if(key==='ArrowRight' && game.dir.x===0) game.nextDir={x:1,y:0};
    };

    window.addEventListener('keydown', handleKey);
    drawGame();
    const i = setInterval(gameLoop, 100);
    return () => { clearInterval(i); window.removeEventListener('keydown', handleKey); };
  },[over,t]);

  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"}}><span style={{color:t.green,fontFamily:"monospace",fontSize:16,fontWeight:700}}>Score: {score}</span>{over&&<button onClick={reset} style={{padding:"6px 16px",background:t.green,color:"white",border:"none",borderRadius:8,fontWeight:700,fontSize:13,cursor:"pointer"}}>Restart</button>}</div><canvas ref={canvasRef} width={W*CELL} height={H*CELL} style={{border:`2px solid ${t.gameBorder}`,borderRadius:12,background:t.canvasBg}}/><p style={{color:t.text4,fontSize:12}}>Arrow keys to play</p></div>);
}

function ReactionGame(){
  const t=useTheme();
  const[st,setSt]=useState("waiting");const[t0,setT0]=useState(0);const[res,setRes]=useState(0);const[best,setBest]=useState(null);

  const go=()=>{
    setSt("waiting");
    setTimeout(() => {
      setSt("ready");
      setTimeout(() => {
        setSt("go");
        setT0(Date.now());
      }, Math.random()*2000+1000);
    }, 500);
  };

  const cl=()=>{
    if(st==="go"){
      const r = Date.now()-t0;
      setRes(r);
      setSt("done");
      if(!best || r<best) setBest(r);
    } else if(st==="ready"){
      setSt("early");
      setTimeout(go, 1500);
    }
  };

  useEffect(go, []);

  const bg={waiting:t.reactionWait,ready:t.reactionReady,go:t.reactionGo,early:t.reactionEarly,done:t.reactionWait};
  const msg={waiting:"Click Start",ready:"Wait for green...",go:"CLICK NOW!",early:"Too early!",done:`${res}ms${best===res?" — Best!":""}`};

  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>{best&&<p style={{color:t.green,fontFamily:"monospace",fontSize:14}}>Best: {best}ms</p>}<div onClick={st==="ready"||st==="go"?cl:undefined} style={{width:"100%",height:180,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:bg[st],border:`2px solid ${t.gameBorder}`,transition:"all 0.2s"}}><span style={{fontSize:20,fontWeight:700,color:t.text}}>{msg[st]}</span></div>{(st==="waiting"||st==="done"||st==="early")&&<button onClick={go} style={{padding:"10px 24px",background:t.green,color:"white",border:"none",borderRadius:12,fontWeight:700,cursor:"pointer"}}>{st==="waiting"?"Start":"Try Again"}</button>}</div>);
}

function MemoryGame(){
  const t=useTheme();
  const[cards,setCards]=useState([]);
  const[fl,setFl]=useState([]);
  const[ma,setMa]=useState([]);
  const[mv,setMv]=useState(0);

  const init=()=>{
    const emojis=["⚡","🎮","🚀","💎","🔥","🌟","🎯","💚"];
    const shuffled = [...emojis, ...emojis].sort(()=>Math.random()-0.5);
    setCards(shuffled);
    setFl([]);
    setMa([]);
    setMv(0);
  };

  useEffect(init,[]);

  const flip=id=>{
    if(fl.length>=2 || fl.includes(id) || ma.includes(id)) return;
    const nf = [...fl, id];
    setFl(nf);
    if(nf.length===2){
      if(cards[nf[0]]===cards[nf[1]]){
        setMa([...ma, nf[0], nf[1]]);
        setFl([]);
      } else {
        setTimeout(()=>setFl([]), 600);
      }
      setMv(mv+1);
    }
  };

  const won=ma.length===cards.length&&cards.length>0;

  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}><div style={{display:"flex",justifyContent:"space-between",width:"100%"}}><span style={{color:t.green,fontFamily:"monospace"}}>Moves: {mv}</span>{won&&<span style={{color:"#ca8a04",fontWeight:700}}>You won!</span>}</div><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,width:"100%",maxWidth:280,margin:"0 auto"}}>{cards.map((c,i)=>(<div key={i} onClick={()=>flip(i)} style={{width:50,height:50,background:fl.includes(i)||ma.includes(i)?t.green:t.tagBg,color:t.text,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,borderRadius:8,cursor:"pointer",transition:"all 0.2s",border:`1px solid ${t.cardBorder}`}}>{fl.includes(i)||ma.includes(i)?c:"?"}</div>))}</div>{won&&<button onClick={init} style={{padding:"8px 20px",background:t.green,color:"white",border:"none",borderRadius:10,fontWeight:700,fontSize:13,cursor:"pointer"}}>Play Again</button>}</div>);
}

function TypingGame(){
  const t=useTheme();
  const[phrase,setPhrase]=useState("");
  const[input,setInput]=useState("");
  const[started,setStarted]=useState(false);
  const[t0,setT0]=useState(0);
  const[wpm,setWpm]=useState(null);
  const[done,setDone]=useState(false);
  const[best,setBest]=useState(null);

  const start=()=>{
    const phrases=["the quick brown fox jumps","react node mongodb express","full stack web developer","cloud native applications","scalable microservices api","continuous integration deploy","typescript interface pattern"];
    setPhrase(phrases[Math.floor(Math.random()*phrases.length)]);
    setInput("");
    setStarted(true);
    setDone(false);
    setWpm(null);
    setT0(Date.now());
  };

  useEffect(start,[]);

  const handle=v=>{
    if(!started) return;
    setInput(v);
    if(v===phrase){
      const t = (Date.now()-t0)/1000/60;
      const w = (phrase.split(" ").length)/t;
      setWpm(Math.round(w));
      setDone(true);
      setBest(!best||w>best?w:best);
    }
  };

  const accuracy = input.split("").filter((c,i)=>c===phrase[i]).length/phrase.length*100;

  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}><div style={{color:t.text,fontFamily:"monospace",fontSize:16,letterSpacing:2}}>{phrase}</div><input value={input} onChange={e=>handle(e.target.value)} style={{width:"100%",padding:"10px",border:`2px solid ${t.cardBorder}`,borderRadius:8,background:t.inputBg,color:t.text,fontFamily:"monospace",fontSize:14}} placeholder="Type here..." /><div style={{display:"flex",gap:20,fontSize:12}}><span style={{color:t.green}}>Accuracy: {Math.round(accuracy)}%</span>{wpm&&<span style={{color:t.green}}>WPM: {wpm}</span>}</div>{done&&<button onClick={start} style={{padding:"8px 16px",background:t.green,color:"white",border:"none",borderRadius:8,fontWeight:700,cursor:"pointer"}}>Try Again</button>}</div>);
}

function AimTrainer(){
  const t=useTheme();const[targets,setTargets]=useState([]);const[score,setScore]=useState(0);const[timeLeft,setTimeLeft]=useState(15);const[playing,setPlaying]=useState(false);const[finalScore,setFinalScore]=useState(null);
  const spawn=()=>{setTargets(prev=>[...prev.slice(-4),{id:Date.now()+Math.random(),x:10+Math.random()*80,y:10+Math.random()*80,size:20+Math.random()*25}])};
  const startGame=()=>{setScore(0);setTimeLeft(15);setPlaying(true);setFinalScore(null);setTargets([])};
  useEffect(()=>{if(!playing)return;spawn();const si=setInterval(spawn,900);const ti=setInterval(()=>setTimeLeft(v=>{if(v<=1){setPlaying(false);clearInterval(si);clearInterval(ti);return 0}return v-1}),1000);return()=>{clearInterval(si);clearInterval(ti)}},[playing]);
  useEffect(()=>{if(playing||timeLeft===0)setFinalScore(score)},[playing,timeLeft,score]);
  const hit=id=>{setTargets(p=>p.filter(x=>x.id!==id));setScore(s=>s+1)};
  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>{!playing&&finalScore===null&&<button onClick={startGame} style={{padding:"10px 24px",background:t.green,color:"white",border:"none",borderRadius:12,fontWeight:700,cursor:"pointer"}}>Start (15s)</button>}{playing&&<div style={{display:"flex",justifyContent:"space-between",width:"100%"}}><span style={{color:t.green,fontFamily:"monospace",fontWeight:700}}>Hits: {score}</span><span style={{color:timeLeft<=5?"#ef4444":t.text3,fontFamily:"monospace",fontWeight:700}}>{timeLeft}s</span></div>}{(playing||finalScore!==null)&&<div style={{width:"100%",height:260,background:t.canvasBg,borderRadius:16,border:`2px solid ${t.gameBorder}`,position:"relative",overflow:"hidden"}}>{targets.map(x=>(<div key={x.id} onClick={()=>hit(x.id)} style={{position:"absolute",left:`${x.x}%`,top:`${x.y}%`,width:x.size,height:x.size,borderRadius:"50%",background:`linear-gradient(135deg, ${t.green}, ${t.greenLight})`,cursor:"crosshair",boxShadow:`0 2px 8px ${t.green}44`}}/>))}{finalScore!==null&&<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:t.bg+"ee"}}><p style={{fontSize:36,fontWeight:800,color:t.green}}>{finalScore}</p><p style={{color:t.text3,fontSize:14}}>targets hit</p><button onClick={startGame} style={{marginTop:12,padding:"8px 20px",background:t.green,color:"white",border:"none",borderRadius:10,fontWeight:700,fontSize:13,cursor:"pointer"}}>Play Again</button></div>}</div>}</div>);
}
function ColorMatch(){
  const t=useTheme();
  const[round,setRound]=useState(0);const[correct,setCorrect]=useState(0);const[display,setDisplay]=useState(null);const[options,setOptions]=useState([]);const[feedback,setFeedback]=useState(null);const total=10;
  const gen=()=>{
    const colors=[{name:"RED",hex:"#ef4444"},{name:"BLUE",hex:"#3b82f6"},{name:"GREEN",hex:"#22c55e"},{name:"YELLOW",hex:"#eab308"},{name:"PURPLE",hex:"#a855f7"}];
    const tc=colors[Math.floor(Math.random()*colors.length)];const dc=colors[Math.floor(Math.random()*colors.length)];setDisplay({text:tc.name,color:dc.hex,answer:dc.name});const o=[dc.name];while(o.length<3){const r=colors[Math.floor(Math.random()*colors.length)].name;if(!o.includes(r))o.push(r)}setOptions(o.sort(()=>Math.random()-0.5));setFeedback(null)
  };
  useEffect(gen,[]);
  const pick=name=>{if(round>=total)return;if(name===display.answer)setCorrect(c=>c+1);setFeedback(name===display.answer?"correct":"wrong");setTimeout(()=>{setRound(r=>r+1);if(round+1<total)gen()},400)};
  const restart=()=>{setRound(0);setCorrect(0);gen()};
  if(round>=total)return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}><p style={{fontSize:28,fontWeight:800,color:t.green}}>{correct}/{total}</p><p style={{color:t.text3,fontSize:14}}>Color match score</p><button onClick={restart} style={{padding:"8px 20px",background:t.green,color:"white",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer"}}>Play Again</button></div>);
  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}><div style={{display:"flex",justifyContent:"space-between",width:"100%"}}><span style={{color:t.green,fontFamily:"monospace",fontWeight:700}}>{correct}/{round}</span><span style={{color:t.text3,fontFamily:"monospace"}}>{round+1}/{total}</span></div><p style={{fontSize:12,color:t.text3}}>What <b>color</b> is the text displayed in?</p>{display&&<p style={{fontSize:48,fontWeight:900,color:display.color,lineHeight:1}}>{display.text}</p>}<div style={{display:"flex",gap:10}}>{options.map(o=>(<button key={o} onClick={()=>pick(o)} style={{padding:"10px 20px",borderRadius:10,border:`2px solid ${t.gameBorder}`,background:feedback&&o===display.answer?t.greenBg:t.card,fontWeight:700,fontSize:14,cursor:"pointer",color:t.text}}>{o}</button>))}</div></div>);
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
const GlowCard=({children,className=""})=>{const t=useTheme();return(<div className={className} style={{background:t.card,border:`1px solid ${t.cardBorder}`,borderRadius:16,padding:24,transition:"all 0.3s",boxShadow:t.shadow}} onMouseEnter={e=>{e.currentTarget.style.borderColor=t.cardHover;e.currentTarget.style.boxShadow=t.shadowHover}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.cardBorder;e.currentTarget.style.boxShadow=t.shadow}}>{children}</div>)};
const SectionTitle=({icon:Icon,title,subtitle})=>{const t=useTheme();return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",marginBottom:48}}><div style={{width:48,height:48,borderRadius:14,background:t.greenBg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}><Icon size={24} color={t.green}/></div><h2 style={{fontSize:32,fontWeight:800,color:t.text,marginBottom:8}}>{title}</h2><p style={{color:t.text3,maxWidth:500,fontSize:15,lineHeight:1.6}}>{subtitle}</p><div style={{width:48,height:3,background:`linear-gradient(90deg, ${t.green}, ${t.greenLight})`,borderRadius:4,marginTop:16}}/></div>)};

const ThemeToggle=({dark,toggle})=>{const t=useTheme();return(<button onClick={toggle} style={{width:40,height:40,borderRadius:12,background:t.tagBg,border:`1px solid ${t.cardBorder}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.3s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=t.green} onMouseLeave={e=>e.currentTarget.style.borderColor=t.cardBorder}>{dark?<Sun size={18} color="#eab308"/>:<Moon size={18} color={t.text3}/>}</button>)};const ResumeModal=({isOpen,onClose})=>{const t=useTheme();if(!isOpen)return null;return(<div onClick={onClose} style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"24px"}}>  <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:"90vh",height:"90vh",background:t.card,borderRadius:16,border:`2px solid ${t.cardBorder}`,display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:`0 20px 40px rgba(0,0,0,0.3)`}}>    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 24px",borderBottom:`1px solid ${t.cardBorder}`}}>      <h2 style={{fontSize:18,fontWeight:700,color:t.text}}>My Resume</h2>      <button onClick={onClose} style={{width:32,height:32,border:"none",background:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:8,transition:"all 0.2s"}}>        <X size={20} color={t.text3}/>      </button>    </div>    <div style={{flex:1,overflow:"auto",display:"flex",alignItems:"center",justifyContent:"center"}}>      <iframe src="/resume.pdf" style={{width:"100%",height:"100%",border:"none",borderRadius:"0 0 16 16"}} title="Resume"/>    </div>  </div></div>);}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function Portfolio(){
  const[dark,setDark]=useState(false);
  const t=dark?T.dark:T.light;
  const[activeSection,setActiveSection]=useState("hero");
  const[jobQuery,setJobQuery]=useState("");
  const[matchedSkills,setMatchedSkills]=useState([]);
  const[matchedRoles,setMatchedRoles]=useState([]);
  const[skillScoreMap,setSkillScoreMap]=useState({});
  const[searchMeta,setSearchMeta]=useState({signals:0,skillHits:0,roleHits:0});
  const[activeGame,setActiveGame]=useState(null);
  const[mobileMenu,setMobileMenu]=useState(false);
  const[contactForm,setContactForm]=useState({name:"",email:"",message:"",website:""});
  const[contactError,setContactError]=useState("");
  const[isSending,setIsSending]=useState(false);
  const[sent,setSent]=useState(false);
  const[expandedExp,setExpandedExp]=useState(0);
  const[showResumeModal,setShowResumeModal]=useState(false);
  const sections=useMemo(()=>["hero","skills","experience","education","projects","achievements","games","contact"],[]);
  const fontFamily="'Outfit','Inter',system-ui,-apple-system,sans-serif";

  useEffect(()=>{const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActiveSection(e.target.id)})},{threshold:0.15});sections.forEach(s=>{const el=document.getElementById(s);if(el)obs.observe(el)});return()=>obs.disconnect()},[sections]);

  const searchSkills=query=>{
    setJobQuery(query);
    const normalized = normalizeText(query);
    if(!normalized){
      setMatchedSkills([]);
      setMatchedRoles([]);
      setSkillScoreMap({});
      setSearchMeta({signals:0,skillHits:0,roleHits:0});
      return;
    }

    const signals = extractSignals(normalized);
    const intentBoostMap = getIntentBoostMap(normalized);
    const scoreMap = {};
    const inferredIntents = Object.keys(ROLE_INTENT_SKILLS).filter(intent => {
      const words = intent.split(" ");
      const tokenMatch = words.some(word => normalized.includes(word) || word.startsWith(normalized));
      return normalized.includes(intent) || signals.includes(intent) || tokenMatch;
    });

    SKILLS_DATA.forEach(skill => {
      const terms = getSkillTerms(skill);
      const name = normalizeText(skill.name);
      let score = 0;

      signals.forEach(signal => {
        let best = 0;
        terms.forEach(term => {
          const strength = matchStrength(signal, term);
          if (term === name) best = Math.max(best, strength * 5.5);
          else best = Math.max(best, strength * 3.1);
        });
        score += best;
      });

      const nameHits = normalized.includes(name) ? 1 : 0;
      const aliasHits = (SKILL_SYNONYMS[skill.name] || []).reduce((acc, alias) => acc + (normalized.includes(normalizeText(alias)) ? 1 : 0), 0);
      score += nameHits * 5 + aliasHits * 2.2;
      score += intentBoostMap[skill.name] || 0;
      if (normalized.includes("mern") && ["MongoDB","Express.js","React.js","Node.js"].includes(skill.name)) score += 4;
      score = Number(score.toFixed(2));
      scoreMap[skill.name] = score;
    });

    const broadRoleQuery = /full stack|software engineer|software developer|developer|frontend|backend|mern|qa|testing|sdet|ai|ml/.test(normalized);
    const fallbackSkills = broadRoleQuery
      ? Array.from(new Set([
          "React.js","Node.js","Express.js","MongoDB","REST APIs","TypeScript","JavaScript (ES6+)","PostgreSQL",
          ...inferredIntents.flatMap(intent => ROLE_INTENT_SKILLS[intent] || []),
        ]))
      : [];
    fallbackSkills.forEach(skillName => {
      if ((scoreMap[skillName] || 0) < 1.3) scoreMap[skillName] = 1.3;
    });

    const rankedSkillList = [...SKILLS_DATA]
      .map(skill => ({ skill, score: scoreMap[skill.name] || 0 }))
      .filter(item => broadRoleQuery ? item.score >= 1.25 : item.score > 0)
      .sort((a,b)=>b.score-a.score);

    const topSkills = rankedSkillList.slice(0, 12);

    const rankedRoles = JOB_ROLES.map(role => {
      const title = normalizeText(role.title);
      const matchedKeywords = role.keywords.filter(keyword => {
        const k = normalizeText(keyword);
        return signals.some(signal => matchStrength(signal, k) >= 0.58);
      });
      const titleScore = signals.reduce((acc, signal) => acc + (matchStrength(signal, title) * 2.2), 0);
      const skillSupport = topSkills.reduce((acc, item) => {
        const roleMatch = role.keywords.some(keyword => normalizeText(item.skill.name).includes(normalizeText(keyword)) || normalizeText(keyword).includes(normalizeText(item.skill.name)));
        return roleMatch ? acc + Math.max(0.5, item.score * 0.16) : acc;
      }, 0);
      const score = matchedKeywords.length * 2.8 + titleScore + skillSupport + (normalized.includes(title) ? 3 : 0) + (inferredIntents.some(intent => title.includes(intent.split(" ")[0])) ? 1.2 : 0);
      return {...role, matchedKeywords, score};
    }).filter(role => role.score >= 2.2).sort((a,b)=>b.score-a.score).slice(0,6);

    const topRoleScore = rankedRoles.length ? rankedRoles[0].score : 0;
    const rankedRolesWithConfidence = rankedRoles.map(role => {
      const coverage = role.keywords.length ? role.matchedKeywords.length / role.keywords.length : 0;
      const relative = topRoleScore ? role.score / topRoleScore : 0;
      const confidence = Math.round(Math.min(96, Math.max(18, (coverage * 60) + (relative * 36))));
      return { ...role, confidence };
    });

    setMatchedSkills(topSkills.map(item => item.skill));
    setMatchedRoles(rankedRolesWithConfidence);
    setSkillScoreMap(scoreMap);
    setSearchMeta({signals:signals.length,skillHits:topSkills.length,roleHits:rankedRolesWithConfidence.length});
  };
  const handleContactSubmit=async(e)=>{
    e.preventDefault();
    setContactError("");
    const sanitize = (value="") => value.replace(/[<>]/g, "").trim();
    const name = sanitize(contactForm.name);
    const email = sanitize(contactForm.email).toLowerCase();
    const message = sanitize(contactForm.message);

    if(contactForm.website.trim()){
      setContactError("Submission blocked.");
      return;
    }

    if(!name || !email || !message){
      setContactError("Please fill in your name, email, and message.");
      return;
    }

    // Name validation: length and format
    if(name.length < 2){
      setContactError("Name must be at least 2 characters.");
      return;
    }
    if(name.length > 80){
      setContactError("Name must not exceed 80 characters.");
      return;
    }
    if(/[^a-zA-Z\s'-]/.test(name)){
      setContactError("Name can only contain letters, spaces, hyphens, and apostrophes.");
      return;
    }

    // Email validation: comprehensive regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if(!emailRegex.test(email)){
      setContactError("Please enter a valid email address (e.g., user@example.com).");
      return;
    }
    if(email.length > 120){
      setContactError("Email address is too long.");
      return;
    }

    // Message validation: length and format
    if(message.length < 10){
      setContactError("Message must be at least 10 characters.");
      return;
    }
    if(message.length > CONTACT_MAX_MESSAGE_CHARS){
      setContactError(`Message must not exceed ${CONTACT_MAX_MESSAGE_CHARS} characters.`);
      return;
    }
    if(message.split('\n').length > 30){
      setContactError("Message has too many line breaks. Please keep it concise.");
      return;
    }

    const suspiciousPattern = /<script|javascript:|onerror=|onload=|data:text\/html/i;
    const urlCount = (message.match(/https?:\/\//gi) || []).length + (message.match(/www\./gi) || []).length;
    if(suspiciousPattern.test(`${name} ${email} ${message}`) || urlCount > 4){
      setContactError("Message blocked for safety. Please remove scripts or excessive links.");
      return;
    }

    const now = Date.now();
    const lastSubmitAt = Number(localStorage.getItem("contact_last_submit_at") || 0);
    const waitMs = CONTACT_RATE_LIMIT_MS - (now - lastSubmitAt);
    if(waitMs > 0){
      setContactError(`Please wait ${Math.ceil(waitMs / 1000)}s before sending another message.`);
      return;
    }

    if(!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID){
      setContactError("Missing EmailJS config. Add REACT_APP_EMAILJS_PUBLIC_KEY, REACT_APP_EMAILJS_SERVICE_ID, and REACT_APP_EMAILJS_TEMPLATE_ID in .env");
      return;
    }

    setIsSending(true);
    try {
      const time = new Date().toLocaleString();
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name,
          email,
          message,
          title: "Portfolio Inquiry",
          time,
          to_email: "rohanrajendradalvi@gmail.com",
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      localStorage.setItem("contact_last_submit_at", String(now));
      setSent(true);
      setContactForm({name:"",email:"",message:"",website:""});
    } catch {
      setContactError("Unable to send message right now. Please try again in a few moments.");
    } finally {
      setIsSending(false);
    }
  };
  const scrollTo=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMobileMenu(false)};
  const gameMap={snake:SnakeGame,reaction:ReactionGame,memory:MemoryGame,typing:TypingGame,aim:AimTrainer,color:ColorMatch};
  const GameComp=activeGame?gameMap[activeGame]:null;
  const maxSkillScore = useMemo(()=>Math.max(0,...Object.values(skillScoreMap)),[skillScoreMap]);
  const hasQuery = Boolean(jobQuery.trim());
  const displaySkills = hasQuery ? matchedSkills : SKILLS_DATA;

  return(
    <ThemeCtx.Provider value={t}>
    <div style={{minHeight:"100vh",background:t.bg,color:t.text,overflowX:"hidden",fontFamily,transition:"background 0.4s, color 0.4s"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes slide-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .anim-float{animation:float 6s ease-in-out infinite}
        .anim-slide{animation:slide-up .8s ease-out both}
        .grad-text{background:linear-gradient(135deg,${t.greenDark},${t.green},${t.greenLight});background-size:200% 200%;animation:gradient-shift 4s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${t.scrollTrack}}::-webkit-scrollbar-thumb{background:${t.scrollThumb};border-radius:3px}::-webkit-scrollbar-thumb:hover{background:${t.green}}
        *{box-sizing:border-box;margin:0;padding:0;transition:background-color 0.3s,border-color 0.3s,color 0.3s}
        .nav-container{display:flex;align-items:center;justify-content:space-between;max-width:1200px;margin:0 auto;width:100%;height:64px;padding:0 24px}
        .nav-logo{display:flex;align-items:center;gap:12;border:none;background:none;cursor:pointer;flex-shrink:0;padding:0}
        .nav-logo img{height:36px;width:auto}
        .nav-logo-text{font-weight:800;font-size:18px;letter-spacing:-0.5px;margin-left:4px}
        .nav-desktop{display:flex;align-items:center;gap:28;flex:1;justify-content:center}
        .nav-desktop-link{border:none;background:none;cursor:pointer;font-size:14px;font-weight:500;text-transform:capitalize;padding:8px 2px;border-bottom:2px solid transparent;transition:color 0.2s,border-color 0.2s;white-space:nowrap}
        .nav-desktop-link.active{border-bottom-color:currentColor}
        .nav-right{display:flex;align-items:center;gap:12;flex-shrink:0}
        .nav-mobile{display:flex;align-items:center;gap:8;flex-shrink:0}
        .nav-mobile-btn{padding:8px;border:none;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:8px;transition:background 0.2s}
        .nav-mobile-btn:hover{background:${t.tagBg}}
        .mobile-menu{position:fixed;top:64px;left:0;right:0;background:${t.navBg};border-top:1px solid ${t.navBorder};z-index:49;max-height:calc(100vh - 64px);overflow-y:auto;display:none;flex-direction:column}
        .mobile-menu.active{display:flex}
        .mobile-menu-item{border:none;background:none;cursor:pointer;font-size:15px;font-weight:500;text-transform:capitalize;padding:14px 24px;text-align:left;transition:background 0.2s;border-left:4px solid transparent}
        .mobile-menu-item:hover{background:${t.card}}
        .mobile-menu-item.active{border-left-color:${t.green};background:${t.greenBg}}
        .logo-text{display:inline}
        .contact-grid{display:grid;grid-template-columns:1fr;gap:40}
        .form-inputs{display:grid;grid-template-columns:1fr;gap:14}
        @media (max-width:768px){
          .nav-container{height:56px !important;padding:0 12px !important}
          .nav-logo{gap:8}
          .nav-logo img{height:32px}
          .nav-logo-text{margin-left:0}
          .logo-text{display:none}
          .nav-desktop{display:none}
          .nav-right{display:none}
          .nav-mobile-btn{padding:6px}
          .mobile-menu{top:56px;max-height:calc(100vh - 56px)}
          .mobile-menu-item{padding:12px 20px;font-size:14px}
          .contact-grid{grid-template-columns:1fr;gap:60px}
          .contact-grid > div:last-child{margin-top:20px}
          .form-inputs{grid-template-columns:1fr}
          .submit-btn-mobile{width:100%;display:flex !important}
        }
        @media (min-width:769px){
          .nav-container{height:70px !important;padding:0 32px !important;max-width:1320px;gap:24px}
          .nav-logo{margin-right:20px}
          .nav-logo img{height:46px}
          .logo-text{display:inline !important;margin-left:10px;font-size:20px;font-weight:800;letter-spacing:-0.5px}
          .nav-desktop{display:flex !important}
          .nav-desktop{gap:34px;flex:1;justify-content:center}
          .nav-desktop-link{padding:8px 6px}
          .nav-right{display:flex !important}
          .nav-right{margin-left:auto}
          .nav-mobile{display:none}
          .mobile-menu{display:none !important}
          .contact-grid{grid-template-columns:2fr 3fr}
          .form-inputs{grid-template-columns:1fr 1fr}
        }
      `}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:50,backdropFilter:"blur(20px)",background:t.navBg,borderBottom:`1px solid ${t.navBorder}`,transition:"all 0.3s",width:"100%"}}>
        <div className="nav-container">
          <button onClick={()=>scrollTo("hero")} className="nav-logo" style={{color:t.text}}>
            <img src="/logo.png" alt="Rohan Dalvi" />
            <span className="logo-text" style={{color:t.text}}>rohan<span style={{color:t.green}}>dalvi</span></span>
          </button>
          <div className="nav-desktop">
            {sections.filter(s=>s!=="hero").map(s=>(<button key={s} onClick={()=>scrollTo(s)} className={`nav-desktop-link ${activeSection===s?'active':''}`} style={{color:activeSection===s?t.green:t.text3}}>{s}</button>))}
          </div>
          <div className="nav-right">
            <ThemeToggle dark={dark} toggle={()=>setDark(!dark)}/>
          </div>
          <div className="nav-mobile">
            <ThemeToggle dark={dark} toggle={()=>setDark(!dark)}/>
            <button onClick={()=>setMobileMenu(!mobileMenu)} className="nav-mobile-btn" style={{color:t.text3}}><Menu size={20}/></button>
          </div>
        </div>
        <div className={`mobile-menu ${mobileMenu?'active':''}`}>
          {sections.filter(s=>s!=="hero").map(s=>(<button key={s} onClick={()=>{scrollTo(s);setMobileMenu(false)}} className={`mobile-menu-item ${activeSection===s?'active':''}`} style={{color:activeSection===s?t.green:t.text2}}>{s}</button>))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",paddingTop:80,background:t.heroBg,position:"relative"}}>
        <div style={{position:"absolute",top:80,right:"10%",width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle,${t.heroOrb},transparent 70%)`}}/>
        <div style={{position:"absolute",bottom:100,left:"5%",width:200,height:200,borderRadius:"50%",background:`radial-gradient(circle,${t.heroOrb2},transparent 70%)`}}/>
        <div className="anim-slide" style={{textAlign:"center",padding:"0 24px",position:"relative",zIndex:1}}>
          <div className="anim-float" style={{width:120,height:120,borderRadius:"50%",background:t.avatarBg,border:`3px solid ${t.avatarBorder}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 32px",overflow:"hidden"}}><img src="/profile.jpg" alt="Rohan Dalvi" style={{width:"100%",height:"100%",objectFit:"cover"}} /></div>
          <p style={{color:t.green,fontFamily:"monospace",fontSize:13,letterSpacing:3,textTransform:"uppercase",marginBottom:12,fontWeight:600}}>Hello, I'm</p>
          <h1 style={{fontSize:"clamp(40px,8vw,80px)",fontWeight:900,letterSpacing:-2,lineHeight:1.05,marginBottom:12}}><span className="grad-text">Rohan Dalvi</span></h1>
          <p style={{fontSize:"clamp(16px,2.5vw,22px)",color:t.text2,fontWeight:400,marginBottom:8,maxWidth:650,margin:"0 auto 8px",lineHeight:1.5}}>Full-Stack Developer · <span style={{color:t.text,fontWeight:600}}>MERN Specialist</span> · AWS & GCP Certified</p>
          <p style={{fontSize:14,color:t.text4,marginBottom:32}}>MS CS @ Northeastern · 3+ yrs shipping production systems</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center"}}>
            <button onClick={()=>scrollTo("contact")} style={{padding:"14px 32px",background:`linear-gradient(135deg,${t.greenDark},${t.green})`,color:"white",border:"none",borderRadius:14,fontWeight:700,fontSize:15,cursor:"pointer",fontFamily,boxShadow:`0 4px 14px ${t.green}40`}}>Get in Touch</button>
            <button onClick={()=>scrollTo("projects")} style={{padding:"14px 32px",background:t.btnSecBg,color:t.btnSecColor,border:`2px solid ${t.btnSecBorder}`,borderRadius:14,fontWeight:600,fontSize:15,cursor:"pointer",fontFamily}}>View Work</button>
            <button onClick={()=>setShowResumeModal(true)} style={{padding:"14px 32px",background:t.btnSecBg,color:t.btnSecColor,border:`2px solid ${t.btnSecBorder}`,borderRadius:14,fontWeight:600,fontSize:15,cursor:"pointer",fontFamily,display:"flex",alignItems:"center",gap:8}}><FileText size={16}/> Resume</button>
          </div>
          <div style={{marginTop:64,animation:"float 2s ease-in-out infinite",display:"flex",justifyContent:"center"}}><button onClick={()=>scrollTo("skills")} style={{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronDown size={24} color={t.text4}/></button></div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{padding:"96px 24px",maxWidth:1100,margin:"0 auto",width:"100%"}}>
        <SectionTitle icon={Zap} title="Skills & Job Matcher" subtitle="Paste any job title or full JD — the matcher returns the top relevant skills and role fits"/>
        <div style={{position:"relative",maxWidth:600,margin:"0 auto 20px"}}>
          <Search size={20} color={t.text4} style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)"}}/>
          <textarea value={jobQuery} onChange={e=>searchSkills(e.target.value)} rows={4} placeholder="Try: fullstack developer, software developer, backend engineer, or paste an entire JD" style={{width:"100%",paddingLeft:48,paddingRight:16,paddingTop:16,paddingBottom:16,background:t.inputBg,border:`2px solid ${t.inputBorder}`,borderRadius:16,fontSize:15,outline:"none",fontFamily,color:t.text,resize:"vertical",minHeight:110,lineHeight:1.5}} onFocus={e=>e.target.style.borderColor=t.inputFocus} onBlur={e=>e.target.style.borderColor=t.inputBorder}/>
          {matchedSkills.length>0&&<div style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",background:t.greenBg,color:t.green,fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:20}}>{matchedSkills.length} match{matchedSkills.length>1?"es":""}</div>}
        </div>
        {hasQuery&&<p style={{textAlign:"center",color:t.text4,fontSize:12,marginBottom:16}}>Top {searchMeta.skillHits} skills · Signals parsed: {searchMeta.signals} · Related roles: {searchMeta.roleHits}</p>}
        {matchedRoles.length>0&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:10,marginBottom:20}}>
            {matchedRoles.map(r=>(
              <div key={r.title} style={{background:t.card,border:`1px solid ${t.cardBorder}`,borderRadius:12,padding:12}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontSize:13,fontWeight:700,color:t.greenDark,display:"flex",alignItems:"center",gap:6}}><Briefcase size={12}/>{r.title}</span>
                  <span style={{fontSize:12,color:t.green,fontWeight:700}}>{r.confidence}%</span>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {r.matchedKeywords.slice(0,4).map(k=>(<span key={`${r.title}-${k}`} style={{fontSize:11,padding:"3px 8px",borderRadius:999,background:t.greenBg,color:t.green,border:`1px solid ${t.greenBorder}`}}>{k}</span>))}
                  {r.matchedKeywords.length===0&&<span style={{fontSize:11,color:t.text4}}>intent match</span>}
                </div>
              </div>
            ))}
          </div>
        )}
        {hasQuery&&displaySkills.length===0&&<p style={{textAlign:"center",color:t.text4,fontSize:13,marginBottom:16}}>No strong skill matches yet — try adding stack keywords like React, Node, AWS, APIs, TypeScript.</p>}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10}}>
          {displaySkills.map(s=>{const isM=hasQuery;const pct=maxSkillScore?Math.round(((skillScoreMap[s.name]||0)/maxSkillScore)*100):0;return(<div key={s.name} style={{position:"relative",borderRadius:14,padding:"14px 16px",border:isM?`2px solid ${t.greenBorder}`:`1px solid ${t.cardBorder}`,background:isM?t.greenBg:t.card,opacity:1,transition:"all 0.35s",transform:isM?"scale(1.01)":"scale(1)",boxShadow:isM?t.shadowHover:"none"}}>{isM&&<Star size={12} color={t.green} fill={t.green} style={{position:"absolute",top:8,right:8}}/>}<p style={{fontWeight:600,fontSize:13,color:isM?t.greenDark:t.text}}>{s.name}</p><p style={{fontSize:11,color:t.text4,marginTop:4,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span>{s.category}</span>{hasQuery&&<span style={{color:t.green,fontWeight:700}}>{pct}%</span>}</p></div>)})}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{padding:"96px 24px",background:t.bg2,width:"100%"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <SectionTitle icon={Briefcase} title="Experience" subtitle="Production-grade work in fintech and enterprise IT"/>
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            {EXPERIENCE.map((exp,i)=>(<GlowCard key={i}><div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:4}}><div><h3 style={{fontSize:18,fontWeight:700,color:t.text}}>{exp.role}</h3><p style={{color:t.green,fontWeight:600,fontSize:14}}>{exp.company} · <span style={{color:t.text4}}>{exp.location}</span></p></div><span style={{fontSize:12,fontFamily:"monospace",color:t.text3,background:t.tagBg,padding:"4px 12px",borderRadius:20,whiteSpace:"nowrap"}}>{exp.period}</span></div><button onClick={()=>setExpandedExp(expandedExp===i?-1:i)} style={{fontSize:12,color:t.green,background:"none",border:"none",cursor:"pointer",fontFamily,fontWeight:600,marginTop:8,marginBottom:4}}>{expandedExp===i?"Hide details ▲":"Show details ▼"}</button>{expandedExp===i&&(<div style={{display:"flex",flexDirection:"column",gap:8,marginTop:8}}>{exp.bullets.map((b,j)=>(<div key={j} style={{display:"flex",gap:8,fontSize:14,color:t.text2,lineHeight:1.6}}><span style={{color:t.green,flexShrink:0,marginTop:2}}>▸</span><span>{b}</span></div>))}</div>)}</GlowCard>))}
          </div>
          <div style={{marginTop:40,textAlign:"center"}}><button style={{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",border:`2px solid ${t.greenBorder}`,color:t.green,borderRadius:14,background:t.card,fontWeight:600,fontSize:14,cursor:"pointer",fontFamily}}><ExternalLink size={16}/>Download Full Resume</button></div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{padding:"96px 24px",maxWidth:1000,margin:"0 auto",width:"100%"}}>
        <SectionTitle icon={GraduationCap} title="Education" subtitle="Where it all began"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:20}}>
          {EDUCATION.map((ed,i)=>(<GlowCard key={i}><div style={{display:"flex",gap:16}}><div style={{width:48,height:48,borderRadius:14,background:t.greenBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><GraduationCap size={22} color={t.green}/></div><div><h3 style={{fontWeight:700,color:t.text,fontSize:17}}>{ed.degree}</h3><p style={{color:t.green,fontSize:14,fontWeight:600}}>{ed.school}</p><p style={{color:t.text4,fontSize:12}}>{ed.sub}</p><p style={{color:t.text4,fontSize:12,fontFamily:"monospace",marginTop:4}}>{ed.period}</p><p style={{color:t.text2,fontSize:14,marginTop:12,lineHeight:1.6}}>{ed.detail}</p></div></div></GlowCard>))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{padding:"96px 24px",background:t.bg2,width:"100%"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <SectionTitle icon={Code2} title="Projects" subtitle="Shipped products, not just side projects"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:20}}>
            {PROJECTS.map((p,i)=>(<GlowCard key={i}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}><h3 style={{fontWeight:700,color:t.text,fontSize:17}}>{p.title}</h3><a href={p.link} target="_blank" rel="noopener noreferrer" style={{color:t.text4,flexShrink:0}}><ExternalLink size={16}/></a></div><p style={{color:t.text2,fontSize:14,lineHeight:1.6,marginBottom:14}}>{p.desc}</p><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{p.tags.map(x=>(<span key={x} style={{fontSize:11,fontFamily:"monospace",padding:"4px 10px",background:t.greenBg,color:t.greenDark,borderRadius:20,fontWeight:600}}>{x}</span>))}</div></GlowCard>))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" style={{padding:"96px 24px",maxWidth:1100,margin:"0 auto",width:"100%"}}>
        <SectionTitle icon={Award} title="Achievements & Certifications" subtitle="Recognition and professional credentials"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:40}}>
          <div>
            <h3 style={{fontSize:13,fontWeight:700,color:t.green,textTransform:"uppercase",letterSpacing:2,marginBottom:20,display:"flex",alignItems:"center",gap:8}}><Award size={16}/>Achievements</h3>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {ACHIEVEMENTS.map((a,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:14,background:t.card,border:`1px solid ${t.cardBorder}`,borderRadius:14,padding:16,transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=t.greenBorder} onMouseLeave={e=>e.currentTarget.style.borderColor=t.cardBorder}><span style={{fontSize:28}}>{a.emoji}</span><div><p style={{color:t.text,fontWeight:600,fontSize:14}}>{a.title}</p><p style={{color:t.green,fontSize:12,fontWeight:600}}>{a.result} · {a.year}</p></div></div>))}
            </div>
          </div>
          <div>
            <h3 style={{fontSize:13,fontWeight:700,color:t.green,textTransform:"uppercase",letterSpacing:2,marginBottom:20,display:"flex",alignItems:"center",gap:8}}><ShieldCheck size={16}/>Certifications</h3>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {CERTIFICATIONS.map((c,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:14,background:t.card,border:`1px solid ${t.cardBorder}`,borderRadius:14,padding:16,transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=t.greenBorder} onMouseLeave={e=>e.currentTarget.style.borderColor=t.cardBorder}><div style={{width:36,height:36,borderRadius:10,background:t.greenBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><ShieldCheck size={16} color={t.green}/></div><div><p style={{color:t.text,fontWeight:600,fontSize:14}}>{c.name}</p><p style={{color:t.text4,fontSize:12}}>{c.year}</p></div></div>))}
            </div>
          </div>
        </div>
      </section>

      {/* GAMES */}
      <section id="games" style={{padding:"96px 24px",background:t.bg2,width:"100%"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <SectionTitle icon={Gamepad2} title="Mini Games" subtitle="Take a break — have some fun while you're here"/>
          {!activeGame?(<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:14}}>
            {[{id:"snake",icon:"🐍",name:"Snake",desc:"Classic arcade"},{id:"reaction",icon:"⚡",name:"Reaction",desc:"Test reflexes"},{id:"memory",icon:"🧠",name:"Memory",desc:"Match pairs"},{id:"typing",icon:"⌨️",name:"Typing",desc:"Speed test"},{id:"aim",icon:"🎯",name:"Aim Trainer",desc:"Click targets"},{id:"color",icon:"🎨",name:"Color Match",desc:"Brain teaser"}].map(g=>(<button key={g.id} onClick={()=>setActiveGame(g.id)} style={{background:t.card,border:`2px solid ${t.cardBorder}`,borderRadius:16,padding:20,textAlign:"center",cursor:"pointer",fontFamily,transition:"all 0.3s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=t.cardHover;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=t.shadowHover}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.cardBorder;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}><div style={{fontSize:32,marginBottom:8}}>{g.icon}</div><p style={{fontWeight:700,color:t.text,fontSize:14}}>{g.name}</p><p style={{fontSize:12,color:t.text4,marginTop:2}}>{g.desc}</p></button>))}
          </div>):(<div style={{maxWidth:500,margin:"0 auto"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}><h3 style={{fontSize:18,fontWeight:700,color:t.text,textTransform:"capitalize"}}>{activeGame==="reaction"?"Reaction Time":activeGame==="memory"?"Memory Cards":activeGame==="typing"?"Typing Speed":activeGame==="aim"?"Aim Trainer":activeGame==="color"?"Color Match":activeGame}</h3><button onClick={()=>setActiveGame(null)} style={{width:36,height:36,borderRadius:10,background:t.tagBg,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={18} color={t.text3}/></button></div><div style={{background:t.card,border:`2px solid ${t.cardBorder}`,borderRadius:20,padding:24}}>{GameComp&&<GameComp/>}</div></div>)}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:"96px 24px",maxWidth:1000,margin:"0 auto",width:"100%"}}>
        <SectionTitle icon={Mail} title="Get in Touch" subtitle="Have a role or project in mind? Let's talk."/>
        <div className="contact-grid">
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[{icon:Mail,label:"rohanrajendradalvi@gmail.com",href:"mailto:rohanrajendradalvi@gmail.com"},{icon:Phone,label:"+1 (857) 491-3859",href:"tel:+18574913859"},{icon:MapPin,label:"Massachusetts, USA (Open to relocate)"}].map(({icon:I,label,href})=>(<a key={label} href={href||"#"} style={{display:"flex",alignItems:"center",gap:12,color:t.text2,textDecoration:"none",fontSize:14}}><div style={{width:40,height:40,borderRadius:12,background:t.greenBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I size={18} color={t.green}/></div><span style={{wordBreak:"break-all"}}>{label}</span></a>))}
            <div style={{display:"flex",gap:10,marginTop:12}}>
              <a href="https://github.com/RohanRajendraDalvi" target="_blank" rel="noopener noreferrer" style={{width:40,height:40,borderRadius:12,background:t.tagBg,display:"flex",alignItems:"center",justifyContent:"center",color:t.text3}}><Github size={18}/></a>
              <a href="https://www.linkedin.com/in/rohan-dalvi-0983693a9/" target="_blank" rel="noopener noreferrer" style={{width:40,height:40,borderRadius:12,background:t.tagBg,display:"flex",alignItems:"center",justifyContent:"center",color:t.text3}}><Linkedin size={18}/></a>
            </div>
          </div>
          <div>
            {sent?(<div style={{background:t.greenBg,border:`2px solid ${t.greenBorder}`,borderRadius:20,padding:40,textAlign:"center"}}><div style={{fontSize:40,marginBottom:8}}>🎉</div><p style={{color:t.green,fontWeight:700,fontSize:18}}>Message Sent!</p><p style={{color:t.text3,fontSize:14,marginTop:4}}>Thanks — I’ll get back to you soon.</p><button onClick={()=>{setSent(false);setContactError("");setContactForm({name:"",email:"",message:"",website:""})}} style={{marginTop:16,fontSize:12,color:t.text4,background:"none",border:"none",cursor:"pointer",fontFamily}}>Send another</button></div>):(<form onSubmit={handleContactSubmit} style={{display:"flex",flexDirection:"column",gap:14}}>
              <div className="form-inputs">
                <input type="text" placeholder="Your Name" value={contactForm.name} onChange={e=>setContactForm({...contactForm,name:e.target.value})} style={{background:t.inputBg,border:`2px solid ${t.inputBorder}`,borderRadius:14,padding:"14px 16px",fontSize:15,outline:"none",fontFamily,color:t.text}} onFocus={e=>e.target.style.borderColor=t.inputFocus} onBlur={e=>e.target.style.borderColor=t.inputBorder}/>
                <input type="email" placeholder="Your Email" value={contactForm.email} onChange={e=>setContactForm({...contactForm,email:e.target.value})} style={{background:t.inputBg,border:`2px solid ${t.inputBorder}`,borderRadius:14,padding:"14px 16px",fontSize:15,outline:"none",fontFamily,color:t.text}} onFocus={e=>e.target.style.borderColor=t.inputFocus} onBlur={e=>e.target.style.borderColor=t.inputBorder}/>
              </div>
              <input type="text" autoComplete="off" tabIndex={-1} value={contactForm.website} onChange={e=>setContactForm({...contactForm,website:e.target.value})} style={{position:"absolute",left:"-9999px",width:1,height:1,opacity:0,pointerEvents:"none"}} aria-hidden="true" />
              <textarea placeholder="Your Message" rows={5} value={contactForm.message} onChange={e=>setContactForm({...contactForm,message:e.target.value})} style={{background:t.inputBg,border:`2px solid ${t.inputBorder}`,borderRadius:14,padding:"14px 16px",fontSize:15,outline:"none",fontFamily,color:t.text,resize:"none"}} onFocus={e=>e.target.style.borderColor=t.inputFocus} onBlur={e=>e.target.style.borderColor=t.inputBorder}/>
              {contactError&&<p style={{color:"#ef4444",fontSize:13}}>{contactError}</p>}
              <button type="submit" disabled={isSending} className="submit-btn-mobile" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px 28px",background:`linear-gradient(135deg,${t.greenDark},${t.green})`,color:"white",border:"none",borderRadius:14,fontWeight:700,fontSize:15,cursor:isSending?"not-allowed":"pointer",fontFamily,alignSelf:"flex-end",boxShadow:`0 4px 14px ${t.green}40`,opacity:isSending?0.7:1}}><Send size={16}/>{isSending?"Sending...":"Send Message"}</button>
            </form>)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:`1px solid ${t.footerBorder}`,padding:"32px 24px",textAlign:"center"}}><p style={{color:t.text4,fontSize:14}}>© 2026 Rohan Dalvi · Built with <span style={{color:t.green,fontWeight:600}}>React</span></p></footer>

      <ResumeModal isOpen={showResumeModal} onClose={()=>setShowResumeModal(false)}/>
    </div>
    </ThemeCtx.Provider>
  );
}
