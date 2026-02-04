
import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Gamepad2, 
  BookOpen, 
  Cpu, 
  Mail, 
  Github, 
  Linkedin, 
  ChevronRight,
  Code2,
  Zap,
  Sparkles,
  Layers,
  MonitorSmartphone,
  Send,
  ExternalLink,
  X,
  CheckCircle
} from 'lucide-react';
import { PROJECTS, STORIES, SKILLS } from './constants';
import { Story, Project } from './types';
import { GoogleGenAI } from "@google/genai";

// 1. ENHANCED SCROLL-TRIGGERED STATS COMPONENT with neon trail
const Counter = ({ value, duration = 2000, suffix = "" }: { value: string, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const targetValue = parseInt(value.replace(/,/g, ''));
  const hasTriggered = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !hasTriggered.current) {
      hasTriggered.current = true;
      setPulse(true);
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Eased cubic animation for fluidity
        const easedProgress = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        setCount(Math.floor(easedProgress * targetValue));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
      setTimeout(() => setPulse(false), duration);
    }
  }, [isVisible, targetValue, duration]);

  const formatted = count >= 1000000 ? (count / 1000000).toFixed(0) + 'M' : count.toLocaleString();
  return (
    <div 
      ref={elementRef} 
      className={`inline-block transition-all duration-300 ${pulse ? 'animate-pulse-glow-number' : ''}`}
      style={{
        textShadow: pulse ? '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)' : 'none'
      }}
    >
      {formatted}{suffix}
    </div>
  );
};

// SECTION HEADER
const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) => (
  <div className="mb-16 text-center">
    <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl glass border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
      <Icon className="w-8 h-8 text-cyan-400" />
    </div>
    <h2 className="text-4xl md:text-5xl font-orbitron font-bold tracking-tight mb-4 uppercase">
      <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">
        {title}
      </span>
    </h2>
    {subtitle && <p className="text-gray-400 max-w-2xl mx-auto text-lg">{subtitle}</p>}
  </div>
);

// NAVBAR
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 glass border-b border-white/5' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl glass border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <Zap className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="font-orbitron font-bold text-xl tracking-wider text-white">S+L</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {['About', 'Games', 'Stories', 'Skills', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-cyan-400 transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" className="px-6 py-2 rounded-full glass border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all text-xs font-bold tracking-widest">
            UPLINK
          </a>
        </div>
      </div>
    </nav>
  );
};

// PROJECT MODAL for expanded project details
const ProjectModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  const challenges = {
    '1': ['Complex shader optimization', 'Memory management in VR environments', 'Real-time physics calculations', 'AI pathfinding in dynamic worlds'],
    '2': ['Implementing recursive AI logic', 'Managing quantum state uncertainty', 'Natural language processing', 'Database optimization for large-scale simulations'],
    '3': ['Network packet simulation', 'Vulnerability discovery algorithms', 'Real-time threat detection', 'Distributed system debugging']
  };
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-4xl glass border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.3)] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        <div className="relative h-80">
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-10 space-y-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full mb-4 inline-block">{project.tech[0]}</span>
            <h2 className="text-5xl font-orbitron font-bold text-white mb-4">{project.title}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-orbitron font-bold text-cyan-400 uppercase">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-mono">{t}</span>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-orbitron font-bold text-violet-400 uppercase">Challenges Overcome</h3>
              <ul className="space-y-2">
                {challenges[project.id as keyof typeof challenges]?.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-violet-400 font-bold mt-1">▸</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex gap-4 pt-8 border-t border-white/10">
            <a href={project.demoUrl} className="flex-1 py-4 bg-cyan-500 text-[#0B0E14] rounded-xl font-orbitron font-bold text-center hover:scale-105 transition-transform flex items-center justify-center gap-2">
              <Gamepad2 className="w-5 h-5" /> PLAY DEMO
            </a>
            <a href={project.codeUrl} className="flex-1 py-4 glass border-white/20 text-white rounded-xl font-orbitron font-bold text-center hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              <Github className="w-5 h-5" /> VIEW SOURCE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. ENHANCED STORY MODAL with responsive animations
const StoryModal = ({ story, onClose }: { story: Story, onClose: () => void }) => {
  const [loreExpansion, setLoreExpansion] = useState('');
  const [loading, setLoading] = useState(false);

  const generateLore = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Expand on the world of "${story.title}" where the core concept is "${story.csConcept}". Plot: ${story.plot}. Write a technical lore snippet of about 100 words. Use a cyberpunk tone.`,
      });
      setLoreExpansion(response.text || '');
    } catch (e) {
      setLoreExpansion('ERROR: UNABLE TO ACCESS NEURAL ARCHIVES.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-2xl glass border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        <div className="relative h-64">
          <img src={story.illustration} alt={story.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 md:p-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full mb-4 inline-block">{story.csConcept}</span>
          <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-6">{story.title}</h3>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 italic">"{story.plot}"</p>
          {loreExpansion ? (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-bottom-2">
              <h4 className="text-xs font-bold text-violet-400 mb-2 tracking-widest uppercase">Lore Archive</h4>
              <p className="text-sm text-gray-400 font-mono leading-relaxed">{loreExpansion}</p>
            </div>
          ) : (
            <button onClick={generateLore} disabled={loading} className="w-full py-4 glass border-violet-500/30 text-violet-400 font-orbitron font-bold hover:bg-violet-500/10 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
              {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-violet-400" /> : <><Sparkles className="w-5 h-5" /> EXPLORE WORLD ENGINE</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showSkills, setShowSkills] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const skillsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShowSkills(true);
    }, { threshold: 0.1 });
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div className="bg-blob bg-cyan-600/10 -top-20 -left-20" />
      <div className="bg-blob bg-violet-600/10 bottom-40 -right-20" />
      
      <Navbar />

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-10 animate-bounce">
            <Zap className="w-4 h-4" /> Ready for Player One
          </div>
          <h1 className="text-6xl md:text-9xl font-orbitron font-black tracking-tighter mb-8 leading-[0.9]">
            SUICO AND <br />
            <span className="bg-gradient-to-r from-violet-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">LACLAC</span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-400 mb-12 font-orbitron font-medium tracking-wide">Where Code, Creativity, and Fiction Collide</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-24">
            <a href="#games" className="px-10 py-5 bg-cyan-500 text-[#0B0E14] rounded-2xl font-orbitron font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center gap-3">VIEW PROJECTS <ChevronRight className="w-5 h-5" /></a>
            <a href="#stories" className="px-10 py-5 glass border-white/10 text-white rounded-2xl font-orbitron font-bold hover:bg-white/5 transition-all flex items-center gap-3">READ STORIES <BookOpen className="w-5 h-5 text-violet-400" /></a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Projects Built', value: '12', suffix: '+', icon: Terminal },
              { label: 'Lines of Code', value: '1000000', suffix: '+', icon: Code2 },
              { label: 'Stories Told', value: '4', suffix: ' Major', icon: Layers },
              { label: 'Coffee Cups', value: '999', suffix: '∞', icon: Cpu },
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex items-center justify-center mb-3"><stat.icon className="w-6 h-6 text-gray-600" /></div>
                <div className="text-4xl font-orbitron font-bold text-white mb-2"><Counter value={stat.value} suffix={stat.suffix} /></div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="aspect-square rounded-[40px] overflow-hidden glass border-cyan-500/20 p-3 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000" alt="Developers" className="w-full h-full object-cover rounded-[30px] grayscale transition-all duration-1000" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 glass border-violet-500/20 rounded-[40px] p-8 flex flex-col justify-end shadow-[0_0_40px_rgba(139,92,246,0.2)]">
                <p className="text-xs text-violet-400 font-bold uppercase tracking-widest mb-3">Established</p>
                <p className="text-3xl font-orbitron font-bold text-white leading-tight">2022 <br/> EPOCH</p>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-8"><Cpu className="w-4 h-4" /> The Collective Mind</div>
              <h2 className="text-5xl font-orbitron font-bold mb-10 leading-tight">Engineering <span className="text-cyan-400">Logic</span> <br/> Powering <span className="text-violet-400">Dreams</span></h2>
              <div className="space-y-8 text-gray-400 text-lg leading-relaxed font-light">
                <p><strong>SUICO AND LACLAC</strong> are Computer Science developers focusing on game systems, AI, and narrative architecture. We build ecosystems where algorithms govern the laws of physics and narratives are woven into the UI.</p>
                <p>We blend high-performance code with deep storytelling to create digital worlds that challenge and captivate.</p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-6">
                {[{ name: 'SUICO', role: 'Systems & Logic' }, { name: 'LACLAC', role: 'Narrative & Architect' }].map((dev, i) => (
                  <div key={i} className="p-6 rounded-2xl glass border-white/5">
                    <h4 className="font-orbitron font-bold text-white mb-1">{dev.name}</h4>
                    <p className="text-xs text-cyan-400/70 font-bold uppercase tracking-widest">{dev.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GAMES SECTION */}
      <section id="games" className="py-32 px-6 bg-[#0B0E14]/80">
        <div className="max-w-7xl mx-auto">
          <SectionHeader icon={Gamepad2} title="Game Projects" subtitle="Interactive prototypes and playable experiences built with precision." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group glass border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="h-60 relative overflow-hidden">
                  <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-orbitron font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[9px] px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-400 font-mono uppercase tracking-widest">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setActiveProject(project)} className="flex-1 py-4 glass border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest text-center rounded-xl hover:bg-cyan-500 hover:text-[#0B0E14] transition-all">DETAILS</button>
                    <a href={project.demoUrl} className="w-14 h-14 flex items-center justify-center glass border-white/10 rounded-xl text-gray-500 hover:text-white transition-all"><Gamepad2 className="w-6 h-6" /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES SECTION (Truncated + Read More) */}
      <section id="stories" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader icon={BookOpen} title="Fictional Worlds" subtitle="Original narratives where code and logic form the laws of reality." />
          <div className="grid md:grid-cols-2 gap-10">
            {STORIES.map((story) => (
              <div key={story.id} className="group flex flex-col md:flex-row glass animate-border-cycle rounded-[40px] overflow-hidden transition-all duration-500 hover:scale-[1.01]">
                <div className="w-full md:w-64 h-64 md:h-auto shrink-0 overflow-hidden">
                  <img src={story.illustration} alt={story.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/70 mb-4">CONCEPT // {story.csConcept}</span>
                  <h3 className="text-3xl font-orbitron font-bold mb-4 group-hover:text-violet-400 transition-colors">{story.title}</h3>
                  <p className="text-gray-400 text-sm mb-8 italic leading-relaxed line-clamp-2">"{story.plot}"</p>
                  <button onClick={() => setActiveStory(story)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-all">
                    INITIATE ARCHIVE READ <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION (Enhanced with Neon Glow) */}
      <section id="skills" className="py-32 px-6 bg-[#0B0E14]/80" ref={skillsRef}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader icon={Cpu} title="Technical Skills" subtitle="The tech stack powering our digital universes." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12">
            {SKILLS.map((skill, i) => (
              <div key={i} className="space-y-4 group">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-orbitron font-bold uppercase tracking-widest text-gray-300 group-hover:text-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all">{skill.name}</span>
                  <span className="text-xs font-mono text-cyan-400">{skill.level}%</span>
                </div>
                <div className="h-2 w-full glass border-white/5 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-1000 ease-out"
                    style={{ 
                      width: showSkills ? `${skill.level}%` : '0%',
                      boxShadow: showSkills ? `0 0 20px rgba(6,182,212,0.8), 0 0 40px rgba(6,182,212,0.4), inset 0 0 10px rgba(6,182,212,0.3)` : 'none'
                    }}
                  />
                </div>
                <span className="text-[10px] text-gray-600 uppercase tracking-widest block font-bold">{skill.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (Styled Fields) */}
      <section id="contact" className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <SectionHeader icon={Mail} title="Contact Uplink" subtitle="Let’s build worlds, systems, and stories together." />
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 5000);
                  (e.target as HTMLFormElement).reset();
                }}
                className="glass border-white/10 p-10 rounded-[40px] shadow-2xl space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Identity (Name)</label>
                    <input type="text" placeholder="Subject Name" required className="w-full py-5 px-8 rounded-2xl glass border-white/10 text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Frequency (Email)</label>
                    <input type="email" placeholder="Uplink Protocol" required className="w-full py-5 px-8 rounded-2xl glass border-white/10 text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">The Message (Payload)</label>
                  <textarea rows={5} placeholder="Encrypted Data Payload..." required className="w-full py-5 px-8 rounded-2xl glass border-white/10 text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all resize-none" />
                </div>
                <button type="submit" className="w-full py-6 bg-gradient-to-r from-cyan-500 to-violet-600 text-[#0B0E14] font-orbitron font-black text-xl rounded-2xl transition-all hover:scale-[1.02] shadow-[0_0_40px_rgba(6,182,212,0.3)] flex items-center justify-center gap-4">INITIATE UPLINK <Send className="w-6 h-6" /></button>
              </form>
              
              {/* Success Message */}
              {showSuccess && (
                <div className="fixed bottom-8 right-8 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500 z-50">
                  <div className="glass border-green-500/50 p-6 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-8 h-8 text-green-400 animate-bounce" />
                      </div>
                      <div>
                        <h3 className="text-white font-orbitron font-bold text-lg">UPLINK SUCCESSFUL</h3>
                        <p className="text-green-300 text-sm mt-1">Your message has been transmitted across the network. We'll respond soon!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-2 space-y-8">
              <div className="glass border-white/10 p-10 rounded-[40px] h-full flex flex-col justify-between">
                <div>
                  <h4 className="text-3xl font-orbitron font-bold text-white mb-6">Social Grid</h4>
                  <div className="space-y-8">
                    {[{ icon: Github, text: 'github.com/suico-laclac' }, { icon: Linkedin, text: 'linkedin.com/suico-laclac' }, { icon: Mail, text: 'uplink@suico-laclac.tech' }].map((ch, i) => (
                      <a key={i} href="#" className="flex items-center gap-6 group">
                        <div className="w-14 h-14 rounded-2xl glass border-white/10 flex items-center justify-center text-gray-500 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all"><ch.icon className="w-7 h-7" /></div>
                        <p className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">{ch.text}</p>
                      </a>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest pt-10 border-t border-white/5">System Status: <span className="text-green-500">OPTIMAL</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-white/5 text-center text-gray-600 text-[10px] font-orbitron tracking-[0.4em] uppercase">
        © 2024 SUICO AND LACLAC. ENGINEERED FOR THE FUTURE FRONTIER.
      </footer>

      {activeStory && <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />}
      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
    </div>
  );
};

export default App;
