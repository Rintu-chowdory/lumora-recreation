/* Lumora Recreation — faithful editorial recreation with asymmetrical composition, Onest typography, pale stone surfaces, copper signal color, hairline dividers, and restrained motion. */
import { FormEvent, useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Globe2, Menu, X } from 'lucide-react';

const heroSlides = [
  { eyebrow: 'CONVERSION DESIGN', title: 'Crafted to convert.' },
  { eyebrow: 'PRODUCT STRATEGY', title: 'Clarity that compounds.' },
  { eyebrow: 'BRAND SYSTEMS', title: 'Built for the long view.' },
];

const projects = [
  { year: 'Featured', type: 'AI Engineering', name: 'Aura-AI', description: 'AI-powered interview coach with voice mode and Cloudflare Worker proxy.', tags: ['React', 'Vite', 'Groq', 'Cloudflare'], image: '/manus-storage/lumora-work-aster_3056238c.jpg', href: 'https://rintu-portfolio.vercel.app/' },
  { year: 'Featured', type: 'Full-Stack', name: 'ChatGPT Clone (NexusAI)', description: 'Dark-themed GPT clone with multi-session sidebar, streaming, and voice Talk Mode, built on Alpine Linux via QEMU.', tags: ['FastAPI', 'Groq', 'Vercel'], image: '/manus-storage/lumora-work-nova_a608fc9d.jpg', href: 'https://rintu-portfolio.vercel.app/' },
  { year: 'Featured', type: 'Civic Tech', name: 'GrundgesetzGPT', description: 'AI-powered German Basic Law app deployed to Manus, using Groq Llama3-70b through a Cloudflare Worker.', tags: ['React', 'Vite', 'Groq', 'Cloudflare'], image: '/manus-storage/lumora-work-pulse_bea3b703.jpg', href: 'https://rintu-portfolio.vercel.app/' },
  { year: 'Featured', type: 'Social Impact', name: 'Name statt Können', description: 'Social impact platform visualizing hiring discrimination in Germany.', tags: ['React', 'Vite', 'Tailwind'], image: '/manus-storage/lumora-work-aster_3056238c.jpg', href: 'https://rintu-portfolio.vercel.app/' },
];

const services = [
  ['01', 'Software Development', 'Scalable web & mobile products built to last.'],
  ['02', 'Product Design', 'Interfaces that feel effortless and look sharp.'],
  ['03', 'Quality Assurance', 'Rigorous testing for flawless, confident releases.'],
  ['04', 'Consulting', 'Strategy and direction for ambitious teams.'],
];

function Brand({ dark = false }: { dark?: boolean }) {
  return <span className={`brand ${dark ? 'brand-dark' : ''}`}><span className="brand-mark">✦</span><span>Lumora</span></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const sendContact = trpc.contact.send.useMutation({
    onSuccess: () => { setSubmitted(true); setFormError(''); },
    onError: () => setFormError('We could not send your message right now. Please email or WhatsApp directly.'),
  });
  const [time, setTime] = useState('10:07pm');

  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date()).toLowerCase());
    tick(); const id = window.setInterval(tick, 30000); return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || contactOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, contactOpen]);

  const go = (id: string) => { setMenuOpen(false); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80); };
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); const form = new FormData(e.currentTarget); sendContact.mutate({ name: String(form.get('name') || ''), email: String(form.get('email') || ''), project: String(form.get('project') || '') }); };

  return (
    <div className="site">
      <header className="site-header">
        <button className="brand-button" onClick={() => go('home')} aria-label="Lumora home"><Brand /></button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {['Home', 'Work', 'Services', 'Studio', 'Careers', 'Contact'].map((item) => <button key={item} onClick={() => item === 'Contact' ? setContactOpen(true) : go(item.toLowerCase())}>{item}{item === 'Services' && <ChevronDown size={12} />}</button>)}
        </nav>
        <div className="header-actions">
          <div className="clock-chip"><span>Local time</span><strong>{time}</strong><i /> <strong>21 August, 2026</strong></div>
          <button className="menu-trigger" onClick={() => setMenuOpen(true)}><Menu size={14} /><span>Menu</span></button>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <img className="hero-image" src="/manus-storage/Foto2026_ccd62c17.png" alt="Editorial portrait" />
          <div className="hero-vignette" />
          <div className="hero-inner lumora-shell">
            <div className="hero-copy">
              <span className="eyebrow reveal">• &nbsp; Independent Studio</span>
              <h1 className="reveal delay-1">Bold ideas,<br />shipped with<br />quiet precision</h1>
              <div className="rating reveal delay-2"><span>★★★★</span><small>200+ brands shipped</small></div>
              <div className="hero-ctas reveal delay-3"><button className="pill-button dark" onClick={() => setContactOpen(true)}>Let's Talk <span><ArrowUpRight size={14} /></span></button><button className="pill-button" onClick={() => go('work')}>View Work <span><ArrowDownRight size={14} /></span></button></div>
            </div>
            <div className="hero-side reveal delay-2"><div className="hero-identity"><strong>Rintu Chowdory</strong><span>DevOps Engineer</span><a href="https://rintu-portfolio.vercel.app/" target="_blank" rel="noreferrer">View portfolio <ArrowUpRight size={12} /></a></div>
              <div className="hero-card"><div className="hero-card-row"><div className="hero-tile"><span>✦</span></div><div className="hero-panel"><div><small>{heroSlides[slide].eyebrow}</small><strong>{heroSlides[slide].title}</strong></div><div className="card-bottom"><div className="dots">{heroSlides.map((_, i) => <i className={i === slide ? 'active' : ''} key={i} />)}</div><div className="card-arrows"><button onClick={() => setSlide((slide + heroSlides.length - 1) % heroSlides.length)} aria-label="Previous"><ArrowLeft size={13} /></button><button onClick={() => setSlide((slide + 1) % heroSlides.length)} aria-label="Next"><ArrowRight size={13} /></button></div></div></div></div></div>
              <div className="partners"><small>Trusted by</small><div>{['Kaido', 'Northpeak', 'Vellum', 'Orbit', 'Brightline', 'Cobalt', 'Mesa'].map((p) => <span key={p}>◦ {p}</span>)}</div></div>
            </div>
          </div>
          <div className="hero-watermark">LUMORA</div>
          <div className="hero-status lumora-shell"><span>Working since 2014</span><span className="status-center">Remote-first, worldwide</span><span>Scroll to explore <ArrowDownRight size={14} /></span></div>
        </section>

        <section className="about lumora-shell" id="studio"><div className="about-art"><span>◎</span><div className="section-label">The Studio</div><p>A distributed team<br />building across<br />every time zone.</p></div><div className="about-copy"><h2>We partner with ambitious teams to ship <em>digital products, brand systems, and the strategy that holds them together.</em></h2><div className="about-bottom"><div><small>Find us online</small><div className="socials"><a className="social-x" href="https://github.com/Rintu-chowdory" target="_blank" rel="noreferrer" aria-label="GitHub">⌘</a><a href="https://www.linkedin.com/in/rintu-chowdory/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a href="https://rintu-portfolio.vercel.app/" target="_blank" rel="noreferrer" aria-label="Portfolio">↗</a></div></div><button className="text-link" onClick={() => go('about')}>About Us <ArrowUpRight size={15} /></button></div></div></section>

        <section className="create-band" id="about"><div className="create-tile light">We</div><div className="create-tile copper">Build</div><div className="create-tile dark">✦</div><div className="create-tile ghost">Better</div></section>

        <section className="portfolio lumora-shell" id="work"><div className="section-heading"><div className="section-label">Portfolio</div><h2>Selected Work</h2></div><div className="project-list">{projects.map((p, i) => <a className="project" href={p.href} target="_blank" rel="noreferrer" key={p.name}><div className="project-meta"><span>{p.type} — {p.year}</span><b>®</b></div><div className="project-image"><img src={p.image} alt="" /></div><div className="project-info"><h3>{p.name}</h3><p>{p.description}</p><div className="tags">{p.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><ArrowUpRight className="project-arrow" size={20} /></a>)}</div></section>

        <section className="services lumora-shell" id="services"><div className="section-heading"><div className="section-label">Services</div><h2>What we do best</h2></div><div className="service-list">{services.map(([num, name, desc]) => <a href={`#${name.toLowerCase().replaceAll(' ', '-')}`} className="service" key={num}><span>{num}</span><div><h3>{name}</h3><p>{desc}</p></div><ArrowUpRight size={18} /></a>)}</div></section>

        <section className="numbers lumora-shell"><div className="section-heading"><div className="section-label">By the numbers</div><h2>Proof in the work,<br /><em>not the words.</em></h2></div><div className="number-grid">{[['200+', 'Projects delivered'], ['98%', 'Client retention'], ['12', 'Years of craft'], ['24+', 'Team members']].map(([n, label]) => <div key={label}><strong>{n}</strong><span>{label}</span></div>)}</div></section>

        <section className="contact-cta"><div className="lumora-shell"><h2>Have a project<br />in mind? Let's<br /><em>get to work.</em></h2><button className="pill-button light-button" onClick={() => setContactOpen(true)}>Start a project <span><ArrowUpRight size={14} /></span></button></div></section>
      </main>

      <footer className="footer"><div className="lumora-shell footer-grid"><div><Brand dark /><p>An independent studio crafting brands, products, and the systems that connect them.</p><div className="footer-contact"><a href="mailto:chowdorydevops@gmail.com">chowdorydevops@gmail.com</a><a href="tel:017666621563">017666621563</a><a href="https://wa.me/4917666621563" target="_blank" rel="noreferrer">WhatsApp direct message</a><a href="https://rintu-portfolio.vercel.app/" target="_blank" rel="noreferrer">Personal portfolio ↗</a></div></div><div><h4>Company</h4><a href="#about">About</a><a href="#careers">Careers</a><a href="#partners">Partners</a><button onClick={() => setContactOpen(true)}>Contact</button></div><div><h4>Services</h4><a href="#development">Development</a><a href="#design">Design</a><a href="#qa">Quality Assurance</a><a href="#consulting">Consulting</a></div><div><h4>Social</h4><a href="https://github.com/Rintu-chowdory" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/rintu-chowdory/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://rintu-portfolio.vercel.app/" target="_blank" rel="noreferrer">Portfolio</a><a href="https://wa.me/4917666621563" target="_blank" rel="noreferrer">WhatsApp</a></div></div><div className="lumora-shell footer-bottom"><span>© 2025 Lumora Studio. All rights reserved.</span><span><a href="#privacy">Privacy</a><a href="#terms">Terms</a></span></div></footer>

      {menuOpen && <div className="overlay menu-overlay"><div className="overlay-top"><Brand dark /><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={20} /> Close</button></div><div className="menu-links">{['Home', 'Work', 'Services', 'Studio', 'Careers', 'Contact'].map((item, i) => <button key={item} onClick={() => item === 'Contact' ? (setMenuOpen(false), setContactOpen(true)) : go(item.toLowerCase())}><small>0{i + 1}</small>{item}</button>)}</div><div className="overlay-bottom"><span>Local time — {time}</span><button onClick={() => { setMenuOpen(false); setContactOpen(true); }}>Start a project <ArrowRight size={16} /></button></div></div>}
      {contactOpen && <div className="overlay contact-overlay"><div className="overlay-top"><Brand dark /><button onClick={() => { setContactOpen(false); setSubmitted(false); }} aria-label="Close contact"><X size={20} /> Close</button></div><div className="contact-form-wrap"><div className="section-label">Start a project</div><h2>Tell us what<br />you're building.</h2>{submitted ? <div className="success"><span>✦</span><h3>Demo request captured.</h3><p>Email forwarding will activate after the Gmail setup is completed.</p><button className="text-link" onClick={() => { setContactOpen(false); setSubmitted(false); }}>Back to site <ArrowUpRight size={15} /></button></div> : <form onSubmit={submit}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@company.com" /></label><label>Project<textarea required name="project" rows={4} placeholder="A little about what you're building..." /></label><div className="form-foot"><small>We reply within one business day.<br /><a className="contact-inline" href="mailto:chowdorydevops@gmail.com">chowdorydevops@gmail.com</a><br /><a className="contact-inline" href="tel:017666621563">017666621563</a><br /><a className="contact-inline" href="https://wa.me/4917666621563" target="_blank" rel="noreferrer">WhatsApp me</a><br /><a className="contact-inline" href="https://rintu-portfolio.vercel.app/" target="_blank" rel="noreferrer">View personal portfolio</a>{formError && <span className="contact-error">{formError}</span>}</small><button className="pill-button dark" type="submit" disabled={sendContact.isPending}>{sendContact.isPending ? 'Sending…' : 'Send request'} <span><ArrowUpRight size={14} /></span></button></div></form>}</div></div>}
    </div>
  );
}
