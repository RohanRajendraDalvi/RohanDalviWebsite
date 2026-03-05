import { useState, useEffect, useRef, createContext, useContext } from "react";
import { Search, Mail, Github, Linkedin, ExternalLink, ChevronDown, Gamepad2, X, Send, MapPin, Phone, Briefcase, GraduationCap, Code2, User, Menu, Sparkles, Zap, Star, Award, ShieldCheck, Sun, Moon } from "lucide-react";

const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);

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
  { title: "Xander Glasses AR", desc: "Reduced AR device test cycles from 1 year to 1.5 months through automation with Kotlin, Docker, and GPU APIs.", tags: ["Kotlin","C","Docker"], link: "https://xanderglasses.com" },
  { title: "Cine-Bot", desc: "Conversational movie search over 50K+ records with multi-LLM backend using FAISS and ChromaDB for semantic retrieval.", tags: ["React","Flask","FAISS"], link: "https://github.com/RohanRajendraDalvi/cinebot" },
  { title: "HiringTek WebRTC", desc: "Scaled to 700 concurrent video sessions at $0.30/interview-hour. Published research chapter (Francis & Taylor).", tags: ["Angular","Socket.io","AWS"], link: "#" },
  { title: "Yoga AI", desc: "Browser-based yoga pose classifier with 90% accuracy and real-time visual feedback via TensorFlow.js.", tags: ["TensorFlow.js","HTML5","JS"], link: "https://github.com/RohanRajendraDalvi/yogAi" },
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

// ─── GAMES ───────────────────────────────────────────────────────────────────
function SnakeGame() {
  const t = useTheme();
  const canvasRef = useRef(null); const gameRef = useRef({ snake:[{x:10,y:10}], dir:{x:1,y:0}, food:{x:15,y:15}, score:0, running:true, nextDir:{x:1,y:0} }); const [score,setScore]=useState(0); const [over,setOver]=useState(false); const CELL=16,W=25,H=18;
  const reset=()=>{gameRef.current={snake:[{x:10,y:10}],dir:{x:1,y:0},food:{x:Math.floor(Math.random()*W),y:Math.floor(Math.random()*H)},score:0,running:true,nextDir:{x:1,y:0}};setScore(0);setOver(false)};
  useEffect(()=>{
    const hk=e=>{const g=gameRef.current;const m={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}};if(m[e.key]&&!(m[e.key].x===-g.dir.x&&m[e.key].y===-g.dir.y)){g.nextDir=m[e.key];e.preventDefault()}};
    window.addEventListener("keydown",hk);
    const iv=setInterval(()=>{const g=gameRef.current;if(!g.running)return;g.dir=g.nextDir;const h={x:g.snake[0].x+g.dir.x,y:g.snake[0].y+g.dir.y};if(h.x<0||h.x>=W||h.y<0||h.y>=H||g.snake.some(s=>s.x===h.x&&s.y===h.y)){g.running=false;setOver(true);return}g.snake.unshift(h);if(h.x===g.food.x&&h.y===g.food.y){g.score++;setScore(g.score);g.food={x:Math.floor(Math.random()*W),y:Math.floor(Math.random()*H)}}else g.snake.pop();const ctx=canvasRef.current?.getContext("2d");if(!ctx)return;ctx.fillStyle=t.canvasBg;ctx.fillRect(0,0,W*CELL,H*CELL);g.snake.forEach((s,i)=>{ctx.globalAlpha=1-i*0.015;ctx.fillStyle=t.snakeColor;ctx.fillRect(s.x*CELL+1,s.y*CELL+1,CELL-2,CELL-2)});ctx.globalAlpha=1;ctx.fillStyle="#ef4444";ctx.beginPath();ctx.arc(g.food.x*CELL+CELL/2,g.food.y*CELL+CELL/2,CELL/2-2,0,Math.PI*2);ctx.fill()},100);
    return()=>{clearInterval(iv);window.removeEventListener("keydown",hk)};
  },[over,t]);
  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"}}><span style={{color:t.green,fontFamily:"monospace",fontSize:16,fontWeight:700}}>Score: {score}</span>{over&&<button onClick={reset} style={{padding:"6px 16px",background:t.green,color:"white",border:"none",borderRadius:8,fontWeight:700,fontSize:13,cursor:"pointer"}}>Restart</button>}</div><canvas ref={canvasRef} width={W*CELL} height={H*CELL} style={{border:`2px solid ${t.gameBorder}`,borderRadius:12,background:t.canvasBg}}/><p style={{color:t.text4,fontSize:12}}>Arrow keys to play</p></div>);
}
function ReactionGame(){
  const t=useTheme();
  const[st,setSt]=useState("waiting");const[t0,setT0]=useState(0);const[res,setRes]=useState(0);const[best,setBest]=useState(null);const tr=useRef(null);
  const go=()=>{setSt("ready");tr.current=setTimeout(()=>{setSt("go");setT0(Date.now())},1000+Math.random()*4000)};
  const cl=()=>{if(st==="ready"){clearTimeout(tr.current);setSt("early")}else if(st==="go"){const d=Date.now()-t0;setRes(d);setSt("done");if(!best||d<best)setBest(d)}};
  const bg={waiting:t.reactionWait,ready:t.reactionReady,go:t.reactionGo,early:t.reactionEarly,done:t.reactionWait};
  const msg={waiting:"Click Start",ready:"Wait for green...",go:"CLICK NOW!",early:"Too early!",done:`${res}ms${best===res?" — Best!":""}`};
  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>{best&&<p style={{color:t.green,fontFamily:"monospace",fontSize:14}}>Best: {best}ms</p>}<div onClick={st==="ready"||st==="go"?cl:undefined} style={{width:"100%",height:180,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:bg[st],border:`2px solid ${t.gameBorder}`,transition:"all 0.2s"}}><span style={{fontSize:20,fontWeight:700,color:t.text}}>{msg[st]}</span></div>{(st==="waiting"||st==="done"||st==="early")&&<button onClick={go} style={{padding:"10px 24px",background:t.green,color:"white",border:"none",borderRadius:12,fontWeight:700,cursor:"pointer"}}>{st==="waiting"?"Start":"Try Again"}</button>}</div>);
}
function MemoryGame(){
  const t=useTheme();const emojis=["⚡","🎮","🚀","💎","🔥","🌟","🎯","💚"];const[cards,setCards]=useState([]);const[fl,setFl]=useState([]);const[ma,setMa]=useState([]);const[mv,setMv]=useState(0);
  const init=()=>{setCards([...emojis,...emojis].sort(()=>Math.random()-0.5).map((e,i)=>({id:i,emoji:e})));setFl([]);setMa([]);setMv(0)};
  useEffect(init,[]);
  const flip=id=>{if(fl.length===2||fl.includes(id)||ma.includes(id))return;const n=[...fl,id];setFl(n);if(n.length===2){setMv(m=>m+1);if(cards[n[0]].emoji===cards[n[1]].emoji){setMa(m=>[...m,...n]);setFl([])}else setTimeout(()=>setFl([]),700)}};
  const won=ma.length===cards.length&&cards.length>0;
  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}><div style={{display:"flex",justifyContent:"space-between",width:"100%"}}><span style={{color:t.green,fontFamily:"monospace"}}>Moves: {mv}</span>{won&&<span style={{color:"#ca8a04",fontWeight:700}}>You won!</span>}</div><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,width:"100%",maxWidth:280,margin:"0 auto"}}>{cards.map(c=>{const show=fl.includes(c.id)||ma.includes(c.id);return(<div key={c.id} onClick={()=>flip(c.id)} style={{aspectRatio:"1",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,cursor:"pointer",transition:"all 0.3s",background:show?t.greenBg:t.tagBg,border:ma.includes(c.id)?`2px solid ${t.green}`:`2px solid ${t.gameBorder}`,transform:show?"scale(0.95)":"scale(1)"}}>{show?c.emoji:<Sparkles size={14} color={t.text4}/>}</div>)})}</div>{won&&<button onClick={init} style={{padding:"8px 20px",background:t.green,color:"white",border:"none",borderRadius:10,fontWeight:700,fontSize:13,cursor:"pointer"}}>Play Again</button>}</div>);
}
function TypingGame(){
  const t=useTheme();const phrases=["the quick brown fox jumps","react node mongodb express","full stack web developer","cloud native applications","scalable microservices api","continuous integration deploy","typescript interface pattern"];
  const[phrase,setPhrase]=useState("");const[input,setInput]=useState("");const[started,setStarted]=useState(false);const[t0,setT0]=useState(0);const[wpm,setWpm]=useState(null);const[done,setDone]=useState(false);const[best,setBest]=useState(null);
  const start=()=>{setPhrase(phrases[Math.floor(Math.random()*phrases.length)]);setInput("");setStarted(false);setWpm(null);setDone(false)};
  useEffect(start,[]);
  const handle=v=>{if(!started){setStarted(true);setT0(Date.now())}setInput(v);if(v===phrase){const el=(Date.now()-t0)/60000;const w=Math.round(phrase.split(" ").length/el);setWpm(w);setDone(true);if(!best||w>best)setBest(w)}};
  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>{best&&<p style={{color:t.green,fontFamily:"monospace",fontSize:14}}>Best: {best} WPM</p>}<div style={{background:t.canvasBg,borderRadius:12,padding:16,border:`2px solid ${t.gameBorder}`,width:"100%",fontFamily:"monospace",fontSize:16,letterSpacing:0.5}}>{phrase.split("").map((ch,i)=>{const typed=input[i];let col=t.text4;if(typed!=null)col=typed===ch?t.green:"#ef4444";return<span key={i} style={{color:col,fontWeight:typed!=null?700:400,textDecoration:i===input.length?"underline":"none"}}>{ch}</span>})}</div>{done?(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}><p style={{fontSize:28,fontWeight:800,color:t.green}}>{wpm} WPM</p><button onClick={start} style={{padding:"8px 20px",background:t.green,color:"white",border:"none",borderRadius:10,fontWeight:700,fontSize:13,cursor:"pointer"}}>New Phrase</button></div>):(<input autoFocus value={input} onChange={e=>handle(e.target.value)} placeholder="Start typing..." style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`2px solid ${t.gameBorder}`,fontSize:16,fontFamily:"monospace",outline:"none",background:t.inputBg,color:t.text}}/>)}</div>);
}
function AimTrainer(){
  const t=useTheme();const[targets,setTargets]=useState([]);const[score,setScore]=useState(0);const[timeLeft,setTimeLeft]=useState(15);const[playing,setPlaying]=useState(false);const[finalScore,setFinalScore]=useState(null);
  const spawn=()=>{setTargets(prev=>[...prev.slice(-4),{id:Date.now()+Math.random(),x:10+Math.random()*80,y:10+Math.random()*80,size:20+Math.random()*25}])};
  const startGame=()=>{setScore(0);setTimeLeft(15);setPlaying(true);setFinalScore(null);setTargets([])};
  useEffect(()=>{if(!playing)return;spawn();const si=setInterval(spawn,900);const ti=setInterval(()=>setTimeLeft(v=>{if(v<=1){setPlaying(false);clearInterval(si);clearInterval(ti);return 0}return v-1}),1000);return()=>{clearInterval(si);clearInterval(ti)}},[playing]);
  useEffect(()=>{if(!playing&&timeLeft===0)setFinalScore(score)},[playing,timeLeft]);
  const hit=id=>{setTargets(p=>p.filter(x=>x.id!==id));setScore(s=>s+1)};
  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>{!playing&&finalScore===null&&<button onClick={startGame} style={{padding:"10px 24px",background:t.green,color:"white",border:"none",borderRadius:12,fontWeight:700,cursor:"pointer"}}>Start (15s)</button>}{playing&&<div style={{display:"flex",justifyContent:"space-between",width:"100%"}}><span style={{color:t.green,fontFamily:"monospace",fontWeight:700}}>Hits: {score}</span><span style={{color:timeLeft<=5?"#ef4444":t.text3,fontFamily:"monospace",fontWeight:700}}>{timeLeft}s</span></div>}{(playing||finalScore!==null)&&<div style={{width:"100%",height:260,background:t.canvasBg,borderRadius:16,border:`2px solid ${t.gameBorder}`,position:"relative",overflow:"hidden"}}>{targets.map(x=>(<div key={x.id} onClick={()=>hit(x.id)} style={{position:"absolute",left:`${x.x}%`,top:`${x.y}%`,width:x.size,height:x.size,borderRadius:"50%",background:`linear-gradient(135deg, ${t.green}, ${t.greenLight})`,cursor:"crosshair",boxShadow:`0 2px 8px ${t.green}44`}}/>))}{finalScore!==null&&<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:t.bg+"ee"}}><p style={{fontSize:36,fontWeight:800,color:t.green}}>{finalScore}</p><p style={{color:t.text3,fontSize:14}}>targets hit</p><button onClick={startGame} style={{marginTop:12,padding:"8px 20px",background:t.green,color:"white",border:"none",borderRadius:10,fontWeight:700,fontSize:13,cursor:"pointer"}}>Play Again</button></div>}</div>}</div>);
}
function ColorMatch(){
  const t=useTheme();const colors=[{name:"RED",hex:"#ef4444"},{name:"BLUE",hex:"#3b82f6"},{name:"GREEN",hex:"#22c55e"},{name:"YELLOW",hex:"#eab308"},{name:"PURPLE",hex:"#a855f7"}];
  const[round,setRound]=useState(0);const[correct,setCorrect]=useState(0);const[display,setDisplay]=useState(null);const[options,setOptions]=useState([]);const[feedback,setFeedback]=useState(null);const total=10;
  const gen=()=>{const tc=colors[Math.floor(Math.random()*colors.length)];const dc=colors[Math.floor(Math.random()*colors.length)];setDisplay({text:tc.name,color:dc.hex,answer:dc.name});const o=[dc.name];while(o.length<3){const r=colors[Math.floor(Math.random()*colors.length)].name;if(!o.includes(r))o.push(r)}setOptions(o.sort(()=>Math.random()-0.5));setFeedback(null)};
  useEffect(gen,[]);
  const pick=name=>{if(round>=total)return;if(name===display.answer)setCorrect(c=>c+1);setFeedback(name===display.answer?"correct":"wrong");setTimeout(()=>{setRound(r=>r+1);if(round+1<total)gen()},400)};
  const restart=()=>{setRound(0);setCorrect(0);gen()};
  if(round>=total)return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}><p style={{fontSize:28,fontWeight:800,color:t.green}}>{correct}/{total}</p><p style={{color:t.text3,fontSize:14}}>Color match score</p><button onClick={restart} style={{padding:"8px 20px",background:t.green,color:"white",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer"}}>Play Again</button></div>);
  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}><div style={{display:"flex",justifyContent:"space-between",width:"100%"}}><span style={{color:t.green,fontFamily:"monospace",fontWeight:700}}>{correct}/{round}</span><span style={{color:t.text3,fontFamily:"monospace"}}>{round+1}/{total}</span></div><p style={{fontSize:12,color:t.text3}}>What <b>color</b> is the text displayed in?</p>{display&&<p style={{fontSize:48,fontWeight:900,color:display.color,lineHeight:1}}>{display.text}</p>}<div style={{display:"flex",gap:10}}>{options.map(o=>(<button key={o} onClick={()=>pick(o)} style={{padding:"10px 20px",borderRadius:10,border:`2px solid ${t.gameBorder}`,background:feedback&&o===display.answer?t.greenBg:t.card,fontWeight:700,fontSize:14,cursor:"pointer",color:t.text}}>{o}</button>))}</div></div>);
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
const GlowCard=({children,className=""})=>{const t=useTheme();return(<div className={className} style={{background:t.card,border:`1px solid ${t.cardBorder}`,borderRadius:16,padding:24,transition:"all 0.3s",boxShadow:t.shadow}} onMouseEnter={e=>{e.currentTarget.style.borderColor=t.cardHover;e.currentTarget.style.boxShadow=t.shadowHover}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.cardBorder;e.currentTarget.style.boxShadow=t.shadow}}>{children}</div>)};
const SectionTitle=({icon:Icon,title,subtitle})=>{const t=useTheme();return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",marginBottom:48}}><div style={{width:48,height:48,borderRadius:14,background:t.greenBg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}><Icon size={24} color={t.green}/></div><h2 style={{fontSize:32,fontWeight:800,color:t.text,marginBottom:8}}>{title}</h2><p style={{color:t.text3,maxWidth:500,fontSize:15,lineHeight:1.6}}>{subtitle}</p><div style={{width:48,height:3,background:`linear-gradient(90deg, ${t.green}, ${t.greenLight})`,borderRadius:4,marginTop:16}}/></div>)};

const ThemeToggle=({dark,toggle})=>{const t=useTheme();return(<button onClick={toggle} style={{width:40,height:40,borderRadius:12,background:t.tagBg,border:`1px solid ${t.cardBorder}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.3s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=t.green} onMouseLeave={e=>e.currentTarget.style.borderColor=t.cardBorder}>{dark?<Sun size={18} color="#eab308"/>:<Moon size={18} color={t.text3}/>}</button>)};

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function Portfolio(){
  const[dark,setDark]=useState(false);
  const t=dark?T.dark:T.light;
  const[activeSection,setActiveSection]=useState("hero");
  const[jobQuery,setJobQuery]=useState("");
  const[matchedSkills,setMatchedSkills]=useState([]);
  const[matchedRoles,setMatchedRoles]=useState([]);
  const[activeGame,setActiveGame]=useState(null);
  const[mobileMenu,setMobileMenu]=useState(false);
  const[contactForm,setContactForm]=useState({name:"",email:"",message:""});
  const[sent,setSent]=useState(false);
  const[expandedExp,setExpandedExp]=useState(0);
  const sections=["hero","skills","experience","education","projects","achievements","games","contact"];
  const fontFamily="'Outfit','Inter',system-ui,-apple-system,sans-serif";

  useEffect(()=>{const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActiveSection(e.target.id)})},{threshold:0.15});sections.forEach(s=>{const el=document.getElementById(s);if(el)obs.observe(el)});return()=>obs.disconnect()},[]);

  const searchSkills=query=>{setJobQuery(query);if(!query.trim()){setMatchedSkills([]);setMatchedRoles([]);return}const words=query.toLowerCase().split(/[\s,;|/]+/).filter(w=>w.length>1);const ms=SKILLS_DATA.filter(s=>words.some(w=>s.name.toLowerCase().includes(w)||s.category.toLowerCase().includes(w)||s.tags.some(x=>x.includes(w))));setMatchedSkills(ms);const mr=JOB_ROLES.map(r=>({...r,mc:r.keywords.filter(k=>words.some(w=>k.includes(w)||w.includes(k))).length})).filter(r=>r.mc>0).sort((a,b)=>b.mc-a.mc).slice(0,4);setMatchedRoles(mr)};
  const scrollTo=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMobileMenu(false)};
  const gameMap={snake:SnakeGame,reaction:ReactionGame,memory:MemoryGame,typing:TypingGame,aim:AimTrainer,color:ColorMatch};
  const GameComp=activeGame?gameMap[activeGame]:null;

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
      `}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:50,backdropFilter:"blur(20px)",background:t.navBg,borderBottom:`1px solid ${t.navBorder}`,transition:"all 0.3s"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <button onClick={()=>scrollTo("hero")} style={{display:"flex",alignItems:"center",gap:10,border:"none",background:"none",cursor:"pointer",fontFamily}}>
            <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${t.greenDark},${t.greenLight})`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
              <span style={{color:"white",fontWeight:900,fontSize:15,fontFamily,letterSpacing:-0.5}}>R</span>
              <div style={{position:"absolute",bottom:-1,right:-1,width:10,height:10,borderRadius:"50%",background:t.greenLight,border:`2px solid ${t.bg}`}}/>
            </div>
            <span style={{fontWeight:800,fontSize:18,color:t.text,letterSpacing:-0.5}}>rohan<span style={{color:t.green}}>dalvi</span></span>
          </button>
          <div style={{display:"flex",alignItems:"center",gap:24}} className="hidden md:flex">
            {sections.filter(s=>s!=="hero").map(s=>(<button key={s} onClick={()=>scrollTo(s)} style={{border:"none",background:"none",cursor:"pointer",fontSize:14,fontWeight:500,color:activeSection===s?t.green:t.text3,textTransform:"capitalize",fontFamily,borderBottom:activeSection===s?`2px solid ${t.green}`:"2px solid transparent",paddingBottom:2,transition:"color 0.2s"}}>{s}</button>))}
            <ThemeToggle dark={dark} toggle={()=>setDark(!dark)}/>
          </div>
          <div className="md:hidden" style={{display:"flex",alignItems:"center",gap:8}}>
            <ThemeToggle dark={dark} toggle={()=>setDark(!dark)}/>
            <button onClick={()=>setMobileMenu(!mobileMenu)} style={{border:"none",background:"none",cursor:"pointer"}}><Menu size={22} color={t.text3}/></button>
          </div>
        </div>
        {mobileMenu&&(<div className="md:hidden" style={{background:t.navBg,borderTop:`1px solid ${t.navBorder}`,padding:"16px 24px",display:"flex",flexDirection:"column",gap:12}}>{sections.filter(s=>s!=="hero").map(s=>(<button key={s} onClick={()=>scrollTo(s)} style={{textAlign:"left",border:"none",background:"none",cursor:"pointer",fontSize:14,fontWeight:500,color:t.text2,textTransform:"capitalize",fontFamily,padding:"4px 0"}}>{s}</button>))}</div>)}
      </nav>

      {/* HERO */}
      <section id="hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",paddingTop:80,background:t.heroBg,position:"relative"}}>
        <div style={{position:"absolute",top:80,right:"10%",width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle,${t.heroOrb},transparent 70%)`}}/>
        <div style={{position:"absolute",bottom:100,left:"5%",width:200,height:200,borderRadius:"50%",background:`radial-gradient(circle,${t.heroOrb2},transparent 70%)`}}/>
        <div className="anim-slide" style={{textAlign:"center",padding:"0 24px",position:"relative",zIndex:1}}>
          <div className="anim-float" style={{width:120,height:120,borderRadius:"50%",background:t.avatarBg,border:`3px solid ${t.avatarBorder}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 32px"}}><User size={52} color={t.green}/></div>
          <p style={{color:t.green,fontFamily:"monospace",fontSize:13,letterSpacing:3,textTransform:"uppercase",marginBottom:12,fontWeight:600}}>Hello, I'm</p>
          <h1 style={{fontSize:"clamp(40px,8vw,80px)",fontWeight:900,letterSpacing:-2,lineHeight:1.05,marginBottom:12}}><span className="grad-text">Rohan Dalvi</span></h1>
          <p style={{fontSize:"clamp(16px,2.5vw,22px)",color:t.text2,fontWeight:400,marginBottom:8,maxWidth:650,margin:"0 auto 8px",lineHeight:1.5}}>Full-Stack Developer · <span style={{color:t.text,fontWeight:600}}>MERN Specialist</span> · AWS & GCP Certified</p>
          <p style={{fontSize:14,color:t.text4,marginBottom:32}}>MS CS @ Northeastern · 3+ yrs shipping production systems</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center"}}>
            <button onClick={()=>scrollTo("contact")} style={{padding:"14px 32px",background:`linear-gradient(135deg,${t.greenDark},${t.green})`,color:"white",border:"none",borderRadius:14,fontWeight:700,fontSize:15,cursor:"pointer",fontFamily,boxShadow:`0 4px 14px ${t.green}40`}}>Get in Touch</button>
            <button onClick={()=>scrollTo("projects")} style={{padding:"14px 32px",background:t.btnSecBg,color:t.btnSecColor,border:`2px solid ${t.btnSecBorder}`,borderRadius:14,fontWeight:600,fontSize:15,cursor:"pointer",fontFamily}}>View Work</button>
          </div>
          <div style={{marginTop:64,animation:"float 2s ease-in-out infinite"}}><ChevronDown size={24} color={t.text4}/></div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{padding:"96px 24px",maxWidth:1100,margin:"0 auto"}}>
        <SectionTitle icon={Zap} title="Skills & Job Matcher" subtitle="Search by role, keywords, or paste a job description — matching skills and related roles appear instantly"/>
        <div style={{position:"relative",maxWidth:600,margin:"0 auto 20px"}}>
          <Search size={20} color={t.text4} style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)"}}/>
          <input type="text" value={jobQuery} onChange={e=>searchSkills(e.target.value)} placeholder="e.g. 'Full stack MERN developer with AWS'" style={{width:"100%",paddingLeft:48,paddingRight:16,paddingTop:16,paddingBottom:16,background:t.inputBg,border:`2px solid ${t.inputBorder}`,borderRadius:16,fontSize:15,outline:"none",fontFamily,color:t.text}} onFocus={e=>e.target.style.borderColor=t.inputFocus} onBlur={e=>e.target.style.borderColor=t.inputBorder}/>
          {matchedSkills.length>0&&<div style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",background:t.greenBg,color:t.green,fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:20}}>{matchedSkills.length} match{matchedSkills.length>1?"es":""}</div>}
        </div>
        {matchedRoles.length>0&&(<div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:24}}><span style={{fontSize:12,color:t.text4,fontWeight:600,alignSelf:"center"}}>Matching roles:</span>{matchedRoles.map(r=>(<span key={r.title} style={{fontSize:13,fontWeight:600,color:t.greenDark,background:t.greenBg,border:`1px solid ${t.greenBorder}`,padding:"6px 14px",borderRadius:20,display:"flex",alignItems:"center",gap:4}}><Briefcase size={12}/>{r.title}</span>))}</div>)}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10}}>
          {SKILLS_DATA.map(s=>{const isM=matchedSkills.includes(s);const dim=jobQuery&&!isM;return(<div key={s.name} style={{position:"relative",borderRadius:14,padding:"14px 16px",border:isM?`2px solid ${t.greenBorder}`:`1px solid ${t.cardBorder}`,background:isM?t.greenBg:t.card,opacity:dim?0.3:1,transition:"all 0.4s",transform:isM?"scale(1.03)":"scale(1)",boxShadow:isM?t.shadowHover:"none"}}>{isM&&<Star size={12} color={t.green} fill={t.green} style={{position:"absolute",top:8,right:8}}/>}<p style={{fontWeight:600,fontSize:13,color:isM?t.greenDark:t.text}}>{s.name}</p><p style={{fontSize:11,color:t.text4,marginTop:4}}>{s.category}</p></div>)})}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{padding:"96px 24px",background:t.bg2}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <SectionTitle icon={Briefcase} title="Experience" subtitle="Production-grade work in fintech and enterprise IT"/>
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            {EXPERIENCE.map((exp,i)=>(<GlowCard key={i}><div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:4}}><div><h3 style={{fontSize:18,fontWeight:700,color:t.text}}>{exp.role}</h3><p style={{color:t.green,fontWeight:600,fontSize:14}}>{exp.company} · <span style={{color:t.text4}}>{exp.location}</span></p></div><span style={{fontSize:12,fontFamily:"monospace",color:t.text3,background:t.tagBg,padding:"4px 12px",borderRadius:20,whiteSpace:"nowrap"}}>{exp.period}</span></div><button onClick={()=>setExpandedExp(expandedExp===i?-1:i)} style={{fontSize:12,color:t.green,background:"none",border:"none",cursor:"pointer",fontFamily,fontWeight:600,marginTop:8,marginBottom:4}}>{expandedExp===i?"Hide details ▲":"Show details ▼"}</button>{expandedExp===i&&(<div style={{display:"flex",flexDirection:"column",gap:8,marginTop:8}}>{exp.bullets.map((b,j)=>(<div key={j} style={{display:"flex",gap:8,fontSize:14,color:t.text2,lineHeight:1.6}}><span style={{color:t.green,flexShrink:0,marginTop:2}}>▸</span><span>{b}</span></div>))}</div>)}</GlowCard>))}
          </div>
          <div style={{marginTop:40,textAlign:"center"}}><button style={{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",border:`2px solid ${t.greenBorder}`,color:t.green,borderRadius:14,background:t.card,fontWeight:600,fontSize:14,cursor:"pointer",fontFamily}}><ExternalLink size={16}/>Download Full Resume</button></div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{padding:"96px 24px",maxWidth:1000,margin:"0 auto"}}>
        <SectionTitle icon={GraduationCap} title="Education" subtitle="Where it all began"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:20}}>
          {EDUCATION.map((ed,i)=>(<GlowCard key={i}><div style={{display:"flex",gap:16}}><div style={{width:48,height:48,borderRadius:14,background:t.greenBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><GraduationCap size={22} color={t.green}/></div><div><h3 style={{fontWeight:700,color:t.text,fontSize:17}}>{ed.degree}</h3><p style={{color:t.green,fontSize:14,fontWeight:600}}>{ed.school}</p><p style={{color:t.text4,fontSize:12}}>{ed.sub}</p><p style={{color:t.text4,fontSize:12,fontFamily:"monospace",marginTop:4}}>{ed.period}</p><p style={{color:t.text2,fontSize:14,marginTop:12,lineHeight:1.6}}>{ed.detail}</p></div></div></GlowCard>))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{padding:"96px 24px",background:t.bg2}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <SectionTitle icon={Code2} title="Projects" subtitle="Shipped products, not just side projects"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:20}}>
            {PROJECTS.map((p,i)=>(<GlowCard key={i}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}><h3 style={{fontWeight:700,color:t.text,fontSize:17}}>{p.title}</h3><a href={p.link} target="_blank" rel="noopener noreferrer" style={{color:t.text4,flexShrink:0}}><ExternalLink size={16}/></a></div><p style={{color:t.text2,fontSize:14,lineHeight:1.6,marginBottom:14}}>{p.desc}</p><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{p.tags.map(x=>(<span key={x} style={{fontSize:11,fontFamily:"monospace",padding:"4px 10px",background:t.greenBg,color:t.greenDark,borderRadius:20,fontWeight:600}}>{x}</span>))}</div></GlowCard>))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" style={{padding:"96px 24px",maxWidth:1100,margin:"0 auto"}}>
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
      <section id="games" style={{padding:"96px 24px",background:t.bg2}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <SectionTitle icon={Gamepad2} title="Mini Games" subtitle="Take a break — have some fun while you're here"/>
          {!activeGame?(<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:14}}>
            {[{id:"snake",icon:"🐍",name:"Snake",desc:"Classic arcade"},{id:"reaction",icon:"⚡",name:"Reaction",desc:"Test reflexes"},{id:"memory",icon:"🧠",name:"Memory",desc:"Match pairs"},{id:"typing",icon:"⌨️",name:"Typing",desc:"Speed test"},{id:"aim",icon:"🎯",name:"Aim Trainer",desc:"Click targets"},{id:"color",icon:"🎨",name:"Color Match",desc:"Brain teaser"}].map(g=>(<button key={g.id} onClick={()=>setActiveGame(g.id)} style={{background:t.card,border:`2px solid ${t.cardBorder}`,borderRadius:16,padding:20,textAlign:"center",cursor:"pointer",fontFamily,transition:"all 0.3s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=t.cardHover;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=t.shadowHover}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.cardBorder;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}><div style={{fontSize:32,marginBottom:8}}>{g.icon}</div><p style={{fontWeight:700,color:t.text,fontSize:14}}>{g.name}</p><p style={{fontSize:12,color:t.text4,marginTop:2}}>{g.desc}</p></button>))}
          </div>):(<div style={{maxWidth:500,margin:"0 auto"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}><h3 style={{fontSize:18,fontWeight:700,color:t.text,textTransform:"capitalize"}}>{activeGame==="reaction"?"Reaction Time":activeGame==="memory"?"Memory Cards":activeGame==="typing"?"Typing Speed":activeGame==="aim"?"Aim Trainer":activeGame==="color"?"Color Match":activeGame}</h3><button onClick={()=>setActiveGame(null)} style={{width:36,height:36,borderRadius:10,background:t.tagBg,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={18} color={t.text3}/></button></div><div style={{background:t.card,border:`2px solid ${t.cardBorder}`,borderRadius:20,padding:24}}>{GameComp&&<GameComp/>}</div></div>)}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:"96px 24px",maxWidth:1000,margin:"0 auto"}}>
        <SectionTitle icon={Mail} title="Get in Touch" subtitle="Have a role or project in mind? Let's talk."/>
        <div style={{display:"grid",gridTemplateColumns:"2fr 3fr",gap:40}}>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[{icon:Mail,label:"rohanrajendradalvi@gmail.com",href:"mailto:rohanrajendradalvi@gmail.com"},{icon:Phone,label:"+1 (857) 491-3859",href:"tel:+18574913859"},{icon:MapPin,label:"Massachusetts, USA (Open to relocate)"}].map(({icon:I,label,href})=>(<a key={label} href={href||"#"} style={{display:"flex",alignItems:"center",gap:12,color:t.text2,textDecoration:"none",fontSize:14}}><div style={{width:40,height:40,borderRadius:12,background:t.greenBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I size={18} color={t.green}/></div><span style={{wordBreak:"break-all"}}>{label}</span></a>))}
            <div style={{display:"flex",gap:10,marginTop:12}}>
              <a href="https://github.com/RohanRajendraDalvi" target="_blank" rel="noopener noreferrer" style={{width:40,height:40,borderRadius:12,background:t.tagBg,display:"flex",alignItems:"center",justifyContent:"center",color:t.text3}}><Github size={18}/></a>
              <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" style={{width:40,height:40,borderRadius:12,background:t.tagBg,display:"flex",alignItems:"center",justifyContent:"center",color:t.text3}}><Linkedin size={18}/></a>
            </div>
          </div>
          <div>
            {sent?(<div style={{background:t.greenBg,border:`2px solid ${t.greenBorder}`,borderRadius:20,padding:40,textAlign:"center"}}><div style={{fontSize:40,marginBottom:8}}>🎉</div><p style={{color:t.green,fontWeight:700,fontSize:18}}>Message Sent!</p><p style={{color:t.text3,fontSize:14,marginTop:4}}>I'll get back to you soon.</p><button onClick={()=>{setSent(false);setContactForm({name:"",email:"",message:""})}} style={{marginTop:16,fontSize:12,color:t.text4,background:"none",border:"none",cursor:"pointer",fontFamily}}>Send another</button></div>):(<div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <input type="text" placeholder="Your Name" value={contactForm.name} onChange={e=>setContactForm({...contactForm,name:e.target.value})} style={{background:t.inputBg,border:`2px solid ${t.inputBorder}`,borderRadius:14,padding:"14px 16px",fontSize:15,outline:"none",fontFamily,color:t.text}} onFocus={e=>e.target.style.borderColor=t.inputFocus} onBlur={e=>e.target.style.borderColor=t.inputBorder}/>
                <input type="email" placeholder="Your Email" value={contactForm.email} onChange={e=>setContactForm({...contactForm,email:e.target.value})} style={{background:t.inputBg,border:`2px solid ${t.inputBorder}`,borderRadius:14,padding:"14px 16px",fontSize:15,outline:"none",fontFamily,color:t.text}} onFocus={e=>e.target.style.borderColor=t.inputFocus} onBlur={e=>e.target.style.borderColor=t.inputBorder}/>
              </div>
              <textarea placeholder="Your Message" rows={5} value={contactForm.message} onChange={e=>setContactForm({...contactForm,message:e.target.value})} style={{background:t.inputBg,border:`2px solid ${t.inputBorder}`,borderRadius:14,padding:"14px 16px",fontSize:15,outline:"none",fontFamily,color:t.text,resize:"none"}} onFocus={e=>e.target.style.borderColor=t.inputFocus} onBlur={e=>e.target.style.borderColor=t.inputBorder}/>
              <button onClick={()=>setSent(true)} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px 28px",background:`linear-gradient(135deg,${t.greenDark},${t.green})`,color:"white",border:"none",borderRadius:14,fontWeight:700,fontSize:15,cursor:"pointer",fontFamily,alignSelf:"flex-end",boxShadow:`0 4px 14px ${t.green}40`}}><Send size={16}/>Send Message</button>
            </div>)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:`1px solid ${t.footerBorder}`,padding:"32px 24px",textAlign:"center"}}><p style={{color:t.text4,fontSize:14}}>© 2026 Rohan Dalvi · Built with <span style={{color:t.green,fontWeight:600}}>React</span></p></footer>
    </div>
    </ThemeCtx.Provider>
  );
}