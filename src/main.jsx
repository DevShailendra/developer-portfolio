import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, AtSign, BriefcaseBusiness,
  Check, ChevronDown, Code2, CodeXml, Copy, ExternalLink, Github,
  GitBranch, GraduationCap, Layers3, Linkedin, Mail, Menu, Moon,
  MousePointer2, Send, Sparkles, Sun, Terminal, X, Zap
} from 'lucide-react'
import './styles.css'

const PROFILE = {
  name: 'Shailendra Dwivedi',
  role: '.NET Backend Developer',
  location: 'India',
  github: 'https://github.com/DevShailendra',
  linkedin: 'https://www.linkedin.com/in/devshailendra?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  email: 'shailendra.softdev@gmail.com',
  resume: 'public/Shailendra_Dwivedi_SDE.pdf', // Add ./resume.pdf after placing your PDF in the public folder.
}

const skills = [
  { group: 'Backend', items: ['C#', 'ASP.NET Core', 'ASP.NET MVC', 'ASP.NET Web Forms', 'REST APIs', 'Web API', 'Entity Framework Core', 'LINQ'] },
  { group: 'Database', items: ['SQL Server', 'T-SQL', 'Stored Procedures', 'Joins & CTEs', 'Query Optimization', 'Database Design'] },
  { group: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 'React (building projects)'] },
  { group: 'Tools & Practices', items: ['Git & GitHub', 'Visual Studio', 'Postman', 'Debugging', 'API Integration', 'Azure (learning)'] },
]

const projects = [
  {
    title: 'Employee Management API',
    category: 'Backend',
    status: 'In progress',
    description: 'A .NET 8 Web API portfolio project for managing employees, departments and roles, using DTOs, Entity Framework Core and SQL Server.',
    stack: ['ASP.NET Core 8', 'C#', 'EF Core', 'SQL Server'],
    github: 'https://github.com/DevShailendra/employee-management-api',
    demo: '',
    number: '01',
    visual: 'api',
    highlights: ['Employee CRUD endpoints', 'Department and role modules', 'DTO-based request models', 'Layered Controller → Service → Repository design'],
  },
  {
    title: 'PHOTOVERSE',
    category: 'Full Stack',
    status: 'Concept / planned',
    description: 'A planned photo-editing community concept with user and admin areas, authentication, authorization and photo contest workflows.',
    stack: ['React', 'ASP.NET Core', 'SQL Server'],
    github: '',
    demo: '',
    number: '02',
    visual: 'photo',
    highlights: ['User and admin experiences', 'Authentication and authorization', 'Photo contest concept'],
  },
  {
    title: 'Business Applications',
    category: 'Enterprise',
    status: 'Professional domain',
    description: 'Experience working on business software domains such as accounting and billing, e-commerce, HRM, CRM and customized client applications.',
    stack: ['.NET', 'C#', 'SQL Server', 'JavaScript'],
    github: '',
    demo: '',
    number: '03',
    visual: 'business',
    highlights: ['Business workflow development', 'Database-driven features', 'Bug fixing and integration', 'Client-focused delivery'],
  },
]

const filters = ['All', 'Backend', 'Full Stack', 'Enterprise']

function App() {
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [repos, setRepos] = useState([])
  const [repoState, setRepoState] = useState('loading')
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [formError, setFormError] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  useEffect(() => {
    let active = true
    fetch('https://api.github.com/users/DevShailendra/repos?sort=updated&per_page=100')
      .then(res => {
        if (!res.ok) throw new Error('GitHub API unavailable')
        return res.json()
      })
      .then(data => {
        if (!active) return
        setRepos(data.filter(repo => !repo.fork).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 6))
        setRepoState('ready')
      })
      .catch(() => { if (active) setRepoState('error') })
    return () => { active = false }
  }, [])

  const visibleProjects = useMemo(() => filter === 'All' ? projects : projects.filter(p => p.category === filter), [filter])

  const copyEmail = async () => {
    if (!PROFILE.email) {
      setFormError('Add your email in src/main.jsx to enable one-click email copying.')
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  const submitContact = (e) => {
    e.preventDefault()
    setFormError('')
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormError('Please complete all three fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError('Please enter a valid email address.')
      return
    }
    if (!PROFILE.email) {
      setFormError('Contact form is ready, but the destination email is not configured yet. Add PROFILE.email in src/main.jsx.')
      return
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nReply to: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Shailendra home">
          <span className="brand-mark">S<span>.</span></span>
          <span className="brand-name">shailendra<span>.dev</span></span>
        </a>
        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map(item =>
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
          )}
          <a className="nav-resume" href={PROFILE.resume || '#contact'} onClick={closeMenu}>
            Resume <ArrowUpRight size={15}/>
          </a>
        </nav>
        <div className="top-actions">
          <button className="icon-button theme-toggle" onClick={() => setDark(v => !v)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot"/> OPEN TO THE RIGHT OPPORTUNITY <span className="eyebrow-line"/></div>
            <h1>Building reliable<br/><span className="headline-accent">backend systems.</span></h1>
            <p className="hero-lede">I'm <strong>Shailendra Dwivedi</strong>, a software developer focused on .NET, C#, SQL Server and practical business applications. I turn complex requirements into maintainable software.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a>
              <a className="button button-secondary" href="#contact"><Mail size={17}/> Let's talk</a>
            </div>
            <div className="hero-socials">
              <a href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={13}/></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={13}/></a>
              <span className="social-location"><span className="location-pin"/> Based in {PROFILE.location}</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Decorative code illustration">
            <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
            <div className="art-grid"/>
            <div className="code-window">
              <div className="window-top"><div className="window-dots"><i/><i/><i/></div><span>Developer.cs</span><span className="window-status"><span/> C#</span></div>
              <div className="code-body">
                <div><span className="line-no">01</span><span className="syntax-purple">public class</span> <span className="syntax-blue">Developer</span></div>
                <div><span className="line-no">02</span>{'{'}</div>
                <div><span className="line-no">03</span>  <span className="syntax-purple">public string</span> Focus =&gt;</div>
                <div><span className="line-no">04</span>    <span className="syntax-green">".NET &amp; APIs"</span>;</div>
                <div><span className="line-no">05</span>  <span className="syntax-purple">public bool</span> LovesCleanCode =&gt;</div>
                <div><span className="line-no">06</span>    <span className="syntax-orange">true</span>;</div>
                <div><span className="line-no">07</span>{'}'}</div>
              </div>
              <div className="window-footer"><span><GitBranch size={13}/> main</span><span><Check size={13}/> Ready to build</span></div>
            </div>
            <div className="floating-chip chip-top"><span className="chip-icon"><Code2 size={16}/></span><span><b>Clean code</b><small>Built to maintain</small></span></div>
            <div className="floating-chip chip-bottom"><span className="chip-icon chip-green"><Zap size={16}/></span><span><b>API first</b><small>Reliable by design</small></span></div>
            <div className="art-caption">CRAFTED WITH CURIOSITY <Sparkles size={13}/></div>
          </div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={16}/></a>
        </section>

        <section className="intro-strip">
          <div className="strip-inner"><span>WHAT I WORK WITH</span><div className="strip-tech"><b>C#</b><i/> ASP.NET Core <i/> SQL Server <i/> REST APIs <i/> React <i/> Git</div></div>
        </section>

        <section className="section-wrap section-block" id="about">
          <div className="section-heading"><div><span className="section-kicker">01 / A LITTLE ABOUT ME</span><h2>Engineer by mindset.<br/><span className="muted-heading">Problem-solver by nature.</span></h2></div><p className="section-aside">I care about what happens behind the interface: clear architecture, dependable data and software that solves real problems.</p></div>
          <div className="about-grid">
            <div className="about-main"><span className="big-quote">“</span><p>My work sits at the intersection of backend development and real-world business needs. I have worked with .NET technologies and SQL Server to build and maintain data-driven applications, integrate features, troubleshoot issues and support delivery.</p><p>I'm continuing to strengthen my modern .NET practices and building portfolio projects that demonstrate thoughtful structure, readable code and practical engineering decisions.</p><div className="about-signoff"><span className="sign-line"/><span>Curious. Consistent. Always learning.</span></div></div>
            <div className="about-facts">
              <div className="fact-card"><span className="fact-icon"><BriefcaseBusiness size={19}/></span><span className="fact-label">CORE FOCUS</span><b>Backend Engineering</b><small>APIs, business logic & data</small></div>
              <div className="fact-card"><span className="fact-icon"><Layers3 size={19}/></span><span className="fact-label">APPROACH</span><b>Structured & maintainable</b><small>Readable code, clear layers</small></div>
              <div className="fact-card"><span className="fact-icon"><GraduationCap size={19}/></span><span className="fact-label">EDUCATION</span><b>Master of Computer Applications</b><small>Chandigarh University</small></div>
              <div className="fact-card"><span className="fact-icon"><Terminal size={19}/></span><span className="fact-label">CURRENTLY EXPLORING</span><b>Modern .NET & cloud</b><small>React, Azure and deployment</small></div>
            </div>
          </div>
        </section>

        <section className="section-wrap section-block skills-section" id="skills">
          <div className="section-heading"><div><span className="section-kicker">02 / THE TOOLKIT</span><h2>Technologies I use<br/><span className="muted-heading">to bring ideas to life.</span></h2></div><p className="section-aside">A practical toolkit for building, integrating and maintaining business applications.</p></div>
          <div className="skills-grid">
            {skills.map((group, idx) => <article className="skill-card" key={group.group}><div className="skill-card-top"><span className="skill-index">0{idx + 1}</span><CodeXml size={20}/></div><h3>{group.group}</h3><div className="skill-tags">{group.items.map(item => <span key={item} className="skill-tag">{item}</span>)}</div></article>)}
          </div>
          <p className="skills-note"><span className="note-dot"/> Skill labels reflect practical focus and current learning; they are not proficiency scores.</p>
        </section>

        <section className="section-wrap section-block projects-section" id="projects">
          <div className="section-heading"><div><span className="section-kicker">03 / SELECTED WORK</span><h2>Projects with a<br/><span className="muted-heading">purpose behind them.</span></h2></div><a className="text-link" href={PROFILE.github} target="_blank" rel="noreferrer">All repositories <ArrowUpRight size={16}/></a></div>
          <div className="filter-row" role="group" aria-label="Filter projects">{filters.map(f => <button key={f} className={`filter-button ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>)}</div>
          <div className="project-grid">
            {visibleProjects.map(project => <article className={`project-card project-${project.visual}`} key={project.title}>
              <div className="project-visual">
                <div className="project-visual-top"><span className="project-number">{project.number} / PROJECT</span><span className="project-status">{project.status}</span></div>
                {project.visual === 'api' ? <div className="api-illustration"><div className="api-node api-node-main"><Code2 size={23}/><b>API</b></div><div className="api-connector c1"/><div className="api-connector c2"/><div className="api-node api-node-small n1">DTO</div><div className="api-node api-node-small n2">SQL</div><div className="api-base">CONTROLLER <span/> SERVICE <span/> REPOSITORY</div></div> :
                  project.visual === 'photo' ? <div className="photo-illustration"><div className="photo-frame"><span className="sun-shape"/><span className="mountain-shape m1"/><span className="mountain-shape m2"/><span className="photo-spark">✦</span></div><div className="photo-stamp">CREATIVE<br/>COMMUNITY</div></div> :
                  <div className="business-illustration"><div className="business-bar bar1"/><div className="business-bar bar2"/><div className="business-bar bar3"/><div className="business-bar bar4"/><div className="business-line"><span/><span/><span/><span/></div><div className="business-label">BUSINESS SYSTEMS / DATA / WORKFLOWS</div></div>}
              </div>
              <div className="project-content"><div className="project-category">{project.category}</div><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
                <details className="project-details"><summary>What it covers <ChevronDown size={15}/></summary><ul>{project.highlights.map(h => <li key={h}>{h}</li>)}</ul></details>
                <div className="project-links">{project.github ? <a href={project.github} target="_blank" rel="noreferrer"><Github size={16}/> Source code <ArrowUpRight size={14}/></a> : <span className="planned-label"><Layers3 size={15}/> {project.status === 'Professional domain' ? 'Domain experience' : 'Planned project'}</span>}{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={14}/></a>}</div>
              </div>
            </article>)}
          </div>
          <div className="github-panel"><div className="github-panel-icon"><Github size={25}/></div><div className="github-panel-copy"><b>Live from GitHub</b><p>{repoState === 'loading' ? 'Checking public repositories…' : repoState === 'ready' ? `${repos.length} recently updated public repositories found.` : 'Repository preview is unavailable right now. You can still browse the GitHub profile.'}</p></div><a className="button button-dark" href={PROFILE.github} target="_blank" rel="noreferrer">Visit GitHub <ArrowUpRight size={15}/></a></div>
          {repoState === 'ready' && repos.length > 0 && <div className="repo-grid">{repos.map(repo => <a className="repo-card" href={repo.html_url} key={repo.id} target="_blank" rel="noreferrer"><div className="repo-head"><Github size={16}/><ArrowUpRight size={14}/></div><b>{repo.name}</b><p>{repo.description || 'Public repository on GitHub.'}</p><div className="repo-meta"><span>{repo.language || 'Code'}</span><span><GitBranch size={13}/> {repo.forks_count}</span><span>★ {repo.stargazers_count}</span></div></a>)}</div>}
        </section>

        <section className="section-wrap section-block experience-section" id="experience">
          <div className="section-heading"><div><span className="section-kicker">04 / THE JOURNEY</span><h2>Experience that<br/><span className="muted-heading">keeps me moving.</span></h2></div><p className="section-aside">Focused on practical software delivery, understanding business requirements and growing as an engineer.</p></div>
          <div className="timeline">
            <div className="timeline-item"><div className="timeline-rail"><span className="timeline-dot current-dot"/><span className="timeline-line"/></div><div className="timeline-body"><div className="timeline-meta"><span>MAR 2022 — SEP 2026</span><span className="timeline-type">PROFESSIONAL EXPERIENCE</span></div><h3>.NET Developer <span>@ Sigma IT Software Solutions</span></h3><p>Worked on .NET-based business applications, database-driven features, integrations, debugging and ongoing application improvements.</p><div className="timeline-tags"><span>C# / .NET</span><span>SQL Server</span><span>API Integration</span><span>Business Software</span></div></div></div>
            <div className="timeline-item"><div className="timeline-rail"><span className="timeline-dot"/><span className="timeline-line timeline-line-end"/></div><div className="timeline-body"><div className="timeline-meta"><span>CONTINUOUS LEARNING</span><span className="timeline-type">PERSONAL DEVELOPMENT</span></div><h3>Modern .NET & portfolio engineering</h3><p>Building an Employee Management API with .NET 8, DTOs, EF Core, SQL Server and layered architecture; exploring React, Azure and deployment workflows.</p><div className="timeline-tags"><span>.NET 8 Web API</span><span>EF Core</span><span>GitHub</span><span>React</span></div></div></div>
          </div>
        </section>

        <section className="education-band"><div className="section-wrap education-inner"><div className="education-icon"><GraduationCap size={25}/></div><div><span className="section-kicker">EDUCATION</span><h3>Master of Computer Applications (MCA)</h3><p>Chandigarh University</p></div><div className="education-divider"/><div><span className="section-kicker">FOUNDATION</span><h3>Computer Applications</h3><p>Bachelor of Computer Applications (BCA) · Agra University</p></div></div></section>

        <section className="section-wrap contact-section section-block" id="contact">
          <div className="contact-panel"><div className="contact-copy"><span className="section-kicker">05 / YOUR NEXT MOVE</span><h2>Have a project<br/>or opportunity?<br/><span className="muted-heading">Let's connect.</span></h2><p>I'm interested in meaningful engineering challenges, backend development roles and collaborating with people who care about building useful software.</p><div className="contact-methods">
            <button className="contact-method" onClick={copyEmail}><span className="contact-method-icon">{copied ? <Check size={18}/> : <AtSign size={18}/>}</span><span><small>EMAIL</small><b>{PROFILE.email || 'Set your email in config'}</b></span><span className="method-action">{copied ? 'Copied' : <Copy size={15}/>}</span></button>
            <a className="contact-method" href={PROFILE.github} target="_blank" rel="noreferrer"><span className="contact-method-icon"><Github size={18}/></span><span><small>GITHUB</small><b>github.com/DevShailendra</b></span><ArrowUpRight size={16}/></a>
            <a className="contact-method" href={PROFILE.linkedin} target="_blank" rel="noreferrer"><span className="contact-method-icon"><Linkedin size={18}/></span><span><small>LINKEDIN</small><b>Connect professionally</b></span><ArrowUpRight size={16}/></a>
          </div></div>
          <form className="contact-form" onSubmit={submitContact}><div className="form-heading"><span className="form-heading-icon"><Send size={18}/></span><div><h3>Send a message</h3><p>I'll be glad to hear from you.</p></div></div><label htmlFor="contact-name">Your name</label><input id="contact-name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Jane Smith" autoComplete="name" required/><label htmlFor="contact-email">Email address</label><input id="contact-email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="jane@company.com" autoComplete="email" required/><label htmlFor="contact-message">Message</label><textarea id="contact-message" rows="4" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell me a little about the opportunity…" required/>{formError && <p className="form-feedback" role="status">{formError}</p>}<button className="button button-primary form-submit" type="submit">Prepare email <ArrowUpRight size={16}/></button><p className="form-footnote">Your message opens in your default email app. No message is stored on this website.</p></form></div>
        </section>
      </main>

      <footer className="footer"><div className="section-wrap footer-inner"><a className="brand" href="#home"><span className="brand-mark">S<span>.</span></span><span className="brand-name">shailendra<span>.dev</span></span></a><p>Designed with intent. Built with code.</p><div className="footer-right"><span>© {new Date().getFullYear()} Shailendra Dwivedi</span><a href="#home" aria-label="Back to top"><ArrowUpRight size={17}/></a></div></div></footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
