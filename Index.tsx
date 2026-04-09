import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, Briefcase, ExternalLink, Github, Filter, Download, FileText, Calendar, MapPin, Award, ArrowUpRight, BookOpen, Send, CheckCircle, Loader2 } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import SocialLinks from '@/components/SocialLinks';
import AnimatedBackground from '@/components/AnimatedBackground';
import TypingEffect from '@/components/TypingEffect';
import profilePhoto from '@/assets/profile.jpg';

/* ─── DATA ─── */
const stats = [
  { label: 'Projects Completed', value: '4+' },
  { label: 'Internships', value: '2' },
  { label: 'Certifications', value: '6+' },
  { label: 'CGPA', value: '7.82' },
];

const projects = [
  {
    title: 'Heart Disease Prediction using ANN',
    description: 'Built a machine learning model to predict heart disease using Artificial Neural Networks with features like age, cholesterol levels, and blood pressure.',
    tech: ['Python', 'ANN', 'Pandas', 'Matplotlib'],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop',
    category: 'ML',
    colab: 'https://colab.research.google.com/drive/17RPyHBjUJ-JHflC7BxfUkq3pxIzP7ioz?usp=sharing',
  },
  {
    title: 'Credit Card Fraud Detection',
    description: 'Developed a model using ANN to detect credit card fraud, trained on transaction data to uncover complex patterns linked to fraudulent activity.',
    tech: ['Python', 'ANN', 'Scikit-learn', 'Pandas'],
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&h=400&fit=crop',
    category: 'ML',
    colab: 'https://colab.research.google.com/drive/1Uf6NQVVqWmsl7iYYF8JhXK1jQ7GYWDjh?usp=sharing',
  },
  {
    title: 'SMS Spam Detection',
    description: 'Built a model to detect spam messages using NLP techniques and ML classifiers to accurately identify and block unwanted texts.',
    tech: ['Python', 'NLP', 'Scikit-learn', 'NLTK'],
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=400&fit=crop',
    category: 'ML',
    colab: 'https://colab.research.google.com/drive/1u8ZGmiHLB2n4gcxDM-1Ew7ehI4_50q1e?usp=sharing',
  },
  {
    title: 'Movie Genre Classification',
    description: 'Classified movies into genres using machine learning techniques on textual data like plot summaries and metadata.',
    tech: ['Python', 'NLP', 'Scikit-learn', 'Pandas'],
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
    category: 'ML',
    colab: 'https://colab.research.google.com/drive/1_S-i7LgYesxMHFDxNHi4DdwTHeSke0rS?usp=sharing',
  },
];

const skills = [
  { name: 'Java', level: 85, category: 'Languages' },
  { name: 'C', level: 80, category: 'Languages' },
  { name: 'Python', level: 90, category: 'Languages' },
  { name: 'SQL', level: 85, category: 'Languages' },
  { name: 'HTML', level: 90, category: 'Web' },
  { name: 'CSS', level: 85, category: 'Web' },
  { name: 'GitHub', level: 85, category: 'Tools' },
  { name: 'PowerBI', level: 80, category: 'Tools' },
  { name: 'Tableau', level: 78, category: 'Tools' },
];

const skillCategories = ['Languages', 'Web', 'Tools'];
const categoryIcons: Record<string, string> = { Languages: '💻', Web: '🌐', Tools: '🛠️' };

const timeline = [
  { title: 'Data Science Intern', org: 'Infosys Springboard', period: 'Oct 2024 – Dec 2024', type: 'internship' },
  { title: 'Cloud Computing & Cybersecurity Intern', org: 'AICTE – Eduskills', period: '2024', type: 'internship' },
  { title: 'B.E. Computer Science & Engineering', org: 'K.S.R. College of Engineering', period: '2022 – 2026', type: 'education' },
];

const certifications = [
  'Oracle Cloud Infrastructure 2024 – AI Certified Foundations Associate',
  'AWS Academy Graduate – Cloud Foundations',
  'Cisco – Introduction to Cybersecurity',
  'Infosys Springboard – Programming using Java',
  'HackerRank – Software Engineer Certificate',
  'Great Learning – Python for Data Science',
];

const articles = [
  { title: 'Getting Started with Artificial Neural Networks', description: 'A beginner-friendly guide to understanding and building ANNs for classification problems.', date: 'Mar 2026', readTime: '8 min', tag: 'Machine Learning' },
  { title: 'Cloud Computing Fundamentals: AWS vs OCI', description: 'Comparing key cloud services and how to kickstart your cloud journey as a student.', date: 'Feb 2026', readTime: '6 min', tag: 'Cloud' },
  { title: 'NLP for Text Classification', description: 'How I built an SMS spam detector using NLP techniques and Scikit-learn.', date: 'Jan 2026', readTime: '10 min', tag: 'NLP' },
  { title: 'Data Visualization with PowerBI & Tableau', description: 'Turning raw data into compelling visual stories — techniques from my internship.', date: 'Dec 2025', readTime: '5 min', tag: 'Data Science' },
];

const profiles = [
  { name: 'GitHub', handle: '@sanjeevkumar', url: 'https://github.com', icon: '🐙', stats: 'Open Source Projects' },
  { name: 'LeetCode', handle: '@sanjeevkumar', url: 'https://leetcode.com', icon: '🧩', stats: 'Problem Solving' },
  { name: 'HackerRank', handle: '@sanjeevkumar', url: 'https://hackerrank.com', icon: '💚', stats: 'Software Engineer Certified' },
];

/* ─── ANIMATION HELPERS ─── */
const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

const sectionHeading = (text1: string, text2: string) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-3xl md:text-5xl font-bold mb-4 text-center"
  >
    {text1} <span className="gradient-text">{text2}</span>
  </motion.h2>
);

/* ─── COMPONENT ─── */
const Index = () => {
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setTimeout(() => { setStatus('success'); setForm({ name: '', email: '', message: '' }); setTimeout(() => setStatus('idle'), 3000); }, 1500);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={item} className="flex justify-center mb-8">
            <motion.div whileHover={{ scale: 1.05 }} className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary/50 glow-primary">
              <img src={profilePhoto} alt="Sanjeevkumar M" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
          <motion.h1 variants={item} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary">Sanjeevkumar M</motion.h1>
          <motion.div variants={item} className="text-base md:text-lg text-muted-foreground mb-8">
            <TypingEffect />
          </motion.div>
          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center mb-12">
            <motion.button onClick={() => scrollTo('projects')} whileHover={{ scale: 1.05, boxShadow: '0 0 30px hsl(var(--primary) / 0.5)' }} whileTap={{ scale: 0.95 }} className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold glow-primary">
              View Projects
            </motion.button>
            <motion.button onClick={() => scrollTo('contact')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 rounded-full glass gradient-border font-semibold text-foreground">
              <Briefcase className="inline w-4 h-4 mr-2" />Hire Me
            </motion.button>
          </motion.div>
          <motion.div variants={item} className="flex justify-center"><SocialLinks /></motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground cursor-pointer" onClick={() => scrollTo('about')}>
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-6">
          {sectionHeading('About', 'Me')}
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Passionate about technology, software development, and machine learning.
          </motion.p>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <GlassCard hover={false}>
              <p className="text-muted-foreground leading-relaxed text-lg">
                I am a passionate Computer Science Engineering student with a strong interest in technology and software development. I possess a foundational understanding of programming, web development, and data structures.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg mt-4">
                I thrive in collaborative environments, adapt quickly to new challenges, and am committed to contributing meaningfully to real-world projects.
              </p>
            </GlassCard>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <GlassCard key={stat.label} delay={i * 0.1}>
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3, type: 'spring', stiffness: 200 }} className="text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" className="py-24 relative">
        <div className="container mx-auto px-6">
          {sectionHeading('My', 'Projects')}
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            A curated selection of projects showcasing my skills.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center gap-3 mb-12">
            <Filter size={18} className="text-muted-foreground mt-2" />
            {['All', 'ML', 'Web'].map(cat => (
              <motion.button key={cat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-primary text-primary-foreground glow-primary' : 'glass text-muted-foreground hover:text-foreground'}`}>
                {cat}
              </motion.button>
            ))}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, i) => (
                <motion.div key={project.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -8, rotateY: 2 }} style={{ perspective: 1000 }}>
                  <GlassCard delay={0} className="group overflow-hidden p-0 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.a whileHover={{ scale: 1.2 }} href={project.colab} target="_blank" rel="noopener noreferrer" className="glass w-9 h-9 rounded-full flex items-center justify-center text-foreground" title="Run in Google Colab"><ExternalLink size={16} /></motion.a>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => <span key={t} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{t}</span>)}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section id="skills" className="py-24 relative">
        <div className="container mx-auto px-6">
          {sectionHeading('My', 'Skills')}
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </motion.p>
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((cat, ci) => (
              <motion.div key={cat} initial={{ opacity: 0, x: ci % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: ci * 0.15 }}>
                <GlassCard delay={0} hover={false}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{categoryIcons[cat]}</span>
                    <h3 className="text-xl font-bold gradient-text">{cat}</h3>
                  </div>
                  <div className="space-y-5">
                    {skills.filter(s => s.category === cat).map((skill, i) => (
                      <motion.div key={skill.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 + i * 0.1 }}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                          <motion.span className="text-sm text-primary font-mono" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{skill.level}%</motion.span>
                        </div>
                        <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }} className="h-full rounded-full relative" style={{ background: `linear-gradient(90deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))` }}>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-foreground border-2 border-primary shadow-lg" />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESUME ═══ */}
      <section id="resume" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          {sectionHeading('My', 'Resume')}
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground text-center mb-12">
            My journey, experience, and qualifications.
          </motion.p>
          <GlassCard className="max-w-md mx-auto mb-16 text-center py-10">
            <motion.div whileHover={{ rotateY: 10 }} style={{ perspective: 800 }}>
              <FileText className="w-14 h-14 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-1">Sanjeev Kumar M</h3>
              <p className="text-muted-foreground text-sm mb-6">Resume.pdf • Updated April 2026</p>
              <motion.a href="/SANJEEVKUMAR_M.pdf" download whileHover={{ scale: 1.05, boxShadow: '0 0 30px hsl(var(--primary) / 0.5)' }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold glow-primary">
                <Download size={18} />Download Resume
              </motion.a>
            </motion.div>
          </GlassCard>
          <h3 className="text-2xl font-bold mb-8 text-center"><span className="gradient-text">Experience & Education</span></h3>
          <div className="relative mb-16">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/20 hidden md:block" />
            {timeline.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className={`mb-8 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:ml-0' : 'md:pl-12 md:ml-auto'}`}>
                <GlassCard delay={0}>
                  <div className="flex items-center gap-2 text-primary text-xs font-mono mb-2"><Calendar size={12} />{t.period}</div>
                  <h4 className="font-bold text-foreground text-lg">{t.title}</h4>
                  <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1"><MapPin size={12} />{t.org}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
          <h3 className="text-2xl font-bold mb-8 text-center"><span className="gradient-text">Certifications</span></h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <motion.div key={cert} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <GlassCard delay={0} className="flex items-start gap-3"><Award size={18} className="text-primary shrink-0 mt-0.5" /><p className="text-sm text-foreground">{cert}</p></GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ARTICLES ═══ */}
      <section id="articles" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          {sectionHeading('Featured', 'Articles')}
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground text-center mb-16">
            Thoughts and tutorials on tech I'm passionate about.
          </motion.p>
          <div className="space-y-4">
            {articles.map((a, i) => (
              <motion.div key={a.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ x: 8 }}>
                <GlassCard delay={0} className="group cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex gap-3 items-center text-xs text-muted-foreground mb-2">
                        <BookOpen size={12} /><span>{a.date}</span><span>·</span><span>{a.readTime} read</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">{a.tag}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">{a.title}</h3>
                      <p className="text-muted-foreground text-sm">{a.description}</p>
                    </div>
                    <motion.div className="shrink-0 mt-1" whileHover={{ rotate: 45 }}>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CODING PROFILES ═══ */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          {sectionHeading('Coding', 'Profiles')}
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground text-center mb-16">
            My competitive programming and open source presence.
          </motion.p>
          <div className="grid sm:grid-cols-3 gap-6">
            {profiles.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} whileHover={{ y: -8, scale: 1.03 }}>
                <GlassCard delay={0} className="group h-full text-center">
                  <motion.div className="text-4xl mb-4" whileHover={{ scale: 1.3, rotate: 15 }} transition={{ type: 'spring', stiffness: 300 }}>{p.icon}</motion.div>
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-muted-foreground text-sm mb-1">{p.handle}</p>
                  <p className="text-primary text-sm font-medium mb-4">{p.stats}</p>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group-hover:underline">
                    Visit <ExternalLink size={14} />
                  </a>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-2xl">
          {sectionHeading('Get In', 'Touch')}
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground text-center mb-12">
            Have a project in mind? Let's talk about it.
          </motion.p>
          <GlassCard hover={false}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 200 }} className="text-center py-12">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: 2, duration: 0.5 }}>
                    <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground mt-2">I'll get back to you soon.</p>
                  <Sparkles className="w-6 h-6 text-primary mx-auto mt-4" />
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                  {(['name', 'email'] as const).map((field) => (
                    <motion.div key={field} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: field === 'name' ? 0.3 : 0.4 }}>
                      <label className="block text-sm font-medium text-foreground mb-2 capitalize">{field}</label>
                      <div className="relative">
                        <input type={field === 'email' ? 'email' : 'text'} value={form[field]} onFocus={() => setFocused(field)} onBlur={() => setFocused(null)} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder={`Your ${field}`} />
                        {focused === field && <motion.div layoutId="input-glow" className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.2)' }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} />}
                      </div>
                      {errors[field] && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-xs mt-1">{errors[field]}</motion.p>}
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <div className="relative">
                      <textarea rows={5} value={form.message} onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" placeholder="Tell me about your project..." />
                      {focused === 'message' && <motion.div layoutId="input-glow" className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.2)' }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} />}
                    </div>
                    {errors.message && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-xs mt-1">{errors.message}</motion.p>}
                  </motion.div>
                  <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 30px hsl(var(--primary) / 0.4)' }} whileTap={{ scale: 0.98 }} type="submit" disabled={status === 'loading'} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold glow-primary flex items-center justify-center gap-2 disabled:opacity-70">
                    {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send size={18} />Send Message</>}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
          <div className="flex justify-center mt-12"><SocialLinks /></div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2026 Sanjeev Kumar M. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Index;
