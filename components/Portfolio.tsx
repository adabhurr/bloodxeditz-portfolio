'use client';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Play, Youtube, Instagram, Sparkles, Clapperboard, MonitorPlay, ExternalLink, X, Menu } from 'lucide-react';

type Video = { id: string; title: string; description: string; publishedAt: string; thumbnail: string };
type Feed = { configured: boolean; message?: string; error?: string; videos?: Video[]; channel?: { title: string; description: string } };

export default function Portfolio() {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [selected, setSelected] = useState<Video | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => { fetch('/api/videos').then(r => r.json()).then(setFeed).catch(() => setFeed({ configured: false })); }, []);
  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: (e.clientX / window.innerWidth - .5) * 12, y: (e.clientY / window.innerHeight - .5) * 12 });
    window.addEventListener('mousemove', move); return () => window.removeEventListener('mousemove', move);
  }, []);
  const videos = feed?.videos || [];
  const date = (s: string) => new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return <main>
    <div className="wallpaper" style={{ transform: `scale(1.08) translate(${mouse.x * -.12}px, ${mouse.y * -.12}px)` }}><video autoPlay muted loop playsInline poster="/wallpaper-frame.jpg"><source src="/wallpaper.mp4" type="video/mp4" /></video></div>
    <div className="shade" />
    <header className="nav glass"><a className="brand" href="#home"><span className="brand-mark">B<span>X</span></span><span>BLOOD<span className="muted">EDITZ</span><small>VISUAL CREATIVE STUDIO</small></span></a>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}><a href="#work" onClick={() => setMenuOpen(false)}>WORK</a><a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a><a href="#skills" onClick={() => setMenuOpen(false)}>SKILLS</a><a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a></nav>
      <a className="nav-cta" href="https://www.youtube.com/@bloodxeditz699" target="_blank" rel="noreferrer">SUBSCRIBE <ArrowUpRight size={15}/></a>
    </header>

    <section className="hero" id="home">
      <div className="hero-copy"><div className="eyebrow"><span className="live-dot"/> INDEPENDENT VIDEO EDITOR <span className="eyebrow-line"/></div>
        <h1>VISUALS<br/><span>BEYOND</span><br/>REALITY<span className="period">.</span></h1>
        <p className="hero-desc">I turn ideas into <b>visual experiences.</b><br/>Crafted frame by frame in Adobe After Effects.</p>
        <div className="hero-actions"><a className="primary-btn" href="#work">EXPLORE MY WORK <ArrowDown size={16}/></a><a className="text-btn" href="https://www.youtube.com/@bloodxeditz699" target="_blank" rel="noreferrer"><Youtube size={18}/> YOUTUBE CHANNEL <ArrowUpRight size={15}/></a></div>
      </div>
      <div className="hero-side"><div className="orbit"><div className="orbit-inner"><span>BX</span><small>CREATIVE<br/>VISIONS</small></div><i/><b/></div><div className="side-note">MOTION / RHYTHM / STORY<br/><span>EST. IN THE EDITING ROOM</span></div></div>
      <div className="hero-bottom"><span>SCROLL TO DISCOVER</span><div className="scroll-line"/><span>01 — 04</span></div>
    </section>

    <section className="work-section" id="work"><div className="section-head"><div><div className="eyebrow">THE CREATIVE ARCHIVE</div><h2>SELECTED <span>WORK.</span></h2></div><div className="section-meta">MY YOUTUBE UPLOADS<br/><span>{feed?.configured && videos.length ? `${videos.length} PUBLIC VIDEOS` : 'VIDEO COLLECTION'}</span></div></div>
      {!feed && <div className="loading glass">Loading channel uploads<span className="loader"/></div>}
      {feed && !feed.configured && <div className="notice glass"><Sparkles size={20}/><div><b>Connect the YouTube feed</b><p>Add your YouTube Data API key in <code>.env.local</code>. Your public uploads will appear here automatically.</p></div></div>}
      {feed?.error && <div className="notice glass"><b>Could not load videos:</b> {feed.error}</div>}
      {feed?.configured && videos.length > 0 && <div className="video-grid">{videos.map((v, i) => <button className="video-card" key={v.id} onClick={() => setSelected(v)}><div className="thumb-wrap"><img src={v.thumbnail} alt={v.title} loading="lazy"/><span className="play"><Play fill="currentColor" size={19}/></span><span className="index">{String(i + 1).padStart(2, '0')}</span></div><div className="video-info"><div><h3>{v.title}</h3><p>{date(v.publishedAt)}</p></div><ArrowUpRight size={19}/></div></button>)}</div>}
      {feed?.configured && videos.length === 0 && !feed.error && <p className="empty">No public uploads were returned for this channel yet.</p>}
      <a className="all-videos" href="https://www.youtube.com/@bloodxeditz699/videos" target="_blank" rel="noreferrer">VIEW CHANNEL ON YOUTUBE <ExternalLink size={15}/></a>
    </section>

    <section className="about-section" id="about"><div className="about-stamp"><span>THE PERSON</span><b>BEHIND<br/>THE EDITS</b><i>✳</i></div><div className="about-copy"><div className="eyebrow">A LITTLE ABOUT ME</div><h2>HEY, I'M<br/><span>BLOODXEDITZ.</span></h2><p>I'm a video editor passionate about creating impactful visuals, clean transitions and edits that tell a story. I work with <b>Adobe After Effects</b> to bring creative ideas to life — one frame at a time.</p><p>This is my space to showcase my edits, experiment with motion and share the visuals I create. Every project is another chance to push creativity further.</p><a className="text-btn" href="https://www.youtube.com/@bloodxeditz699" target="_blank" rel="noreferrer">SEE MY CREATIVE JOURNEY <ArrowUpRight size={15}/></a></div></section>

    <section className="skills-section" id="skills"><div className="eyebrow">TOOLS & CRAFT</div><h2>BUILT WITH <span>INTENTION.</span></h2><div className="skills-grid"><div className="skill glass"><Clapperboard/><b>AFTER EFFECTS</b><p>Motion, compositing & visual edits</p><span>01</span></div><div className="skill glass"><Sparkles/><b>VISUAL EFFECTS</b><p>Effects, atmosphere & detail</p><span>02</span></div><div className="skill glass"><MonitorPlay/><b>VIDEO EDITING</b><p>Timing, rhythm & storytelling</p><span>03</span></div></div></section>

    <section className="contact-section" id="contact"><div className="eyebrow">HAVE A LOOK AROUND</div><h2>LET'S MAKE<br/><span>IT VISUAL.</span></h2><a className="primary-btn" href="https://www.youtube.com/@bloodxeditz699" target="_blank" rel="noreferrer">VISIT MY YOUTUBE <Youtube size={17}/></a><div className="socials"><a href="https://www.youtube.com/@bloodxeditz699" target="_blank" rel="noreferrer"><Youtube/> YOUTUBE</a></div></section>
    <footer><a className="brand" href="#home"><span className="brand-mark">B<span>X</span></span><span>BLOOD<span className="muted">EDITZ</span><small>VISUAL CREATIVE STUDIO</small></span></a><span>DESIGNED TO FEEL DIFFERENT. © 2026</span><a href="#home">BACK TO TOP ↑</a></footer>
    {selected && <div className="modal" onClick={() => setSelected(null)}><div className="modal-content glass" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}><X/></button><div className="player"><iframe src={`https://www.youtube-nocookie.com/embed/${selected.id}?autoplay=1&rel=0`} title={selected.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/></div><div className="modal-text"><span>{date(selected.publishedAt)}</span><h3>{selected.title}</h3><p>{selected.description || 'No description provided.'}</p><a href={`https://www.youtube.com/watch?v=${selected.id}`} target="_blank" rel="noreferrer">OPEN ON YOUTUBE <ArrowUpRight size={15}/></a></div></div></div>}
  </main>;
}
