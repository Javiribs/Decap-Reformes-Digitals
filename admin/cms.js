// Cargar tus estilos reales en el panel de preview
CMS.registerPreviewStyle('/reset.css');
CMS.registerPreviewStyle('/styles.css');
CMS.registerPreviewStyle('/styles-cookies.css'); // opcional

// Utilidad: acceso seguro a rutas anidadas
const get = (obj, path, def='') =>
  path.split('.').reduce((o,k)=> (o && o[k] !== undefined ? o[k] : undefined), obj) ?? def;

// Componente de previsualización de HOME
const HomePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  const navLinks = get(data, 'nav.links', []);
  const hero = get(data, 'hero', {});
  const about = get(data, 'about', {});
  const process = get(data, 'process', {});
  const team = get(data, 'team', []);
  const footer = get(data, 'footer', {});

  return (
    <div id="body">
      <header id="header">
        <nav id="nav" className="container">
          <a id="nav-logo-link" href="#">
            <img id="nav-logo" src={get(data,'nav.logo','/src/img/RDBlack.png')} alt="Reformes Digitals Logo" />
          </a>
          <ul id="nav-menu">
            {(navLinks || []).map((l,i)=>(
              <li key={i}><a href={l.href || '#'}>{l.label || ''}</a></li>
            ))}
            <li id="nav-item-idioma" className="dropdown">
              <a href="#" id="nav-link-idioma">Idioma</a>
              <ul className="dropdown-menu">
                <li><a href="#">Cast</a></li>
                <li><a href="#">Cat</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      {/* HERO */}
      <section id="hero">
        <div className="container">
          <video id="hero-video" autoPlay muted loop playsInline preload="auto" poster={hero.poster || '/src/img/hero-poster.jpg'}>
            <source src={hero.videoWebm || '/src/img/hero-gradient.webm'} type="video/webm" />
            <source src={hero.videoMp4 || '/src/img/hero-gradient.mp4'} type="video/mp4" />
          </video>
          <div id="hero-content" className="container">
            <h1 id="hero-title">{hero.title || ''}</h1>
            <p id="hero-description">{hero.description || ''}</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="about-box">
            <h2 id="about-title">{about.title || ''}</h2>
            <p id="about-description">{about.description || ''}</p>
            <ul className="about-services">
              {(about.services || []).map((s,i)=><li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="section-light">
        <div className="container">
          <h1 className="section-title" dangerouslySetInnerHTML={{__html: (process.sectionTitle || '').replace(/\n/g,'<br>')}} />
          <p className="section-description">{process.sectionDescription || ''}</p>
          <div className="process-grid">
            {(process.steps || []).map((s,i)=>(
              <div className={`process-card step-${i+1}`} key={i}>
                <span className="process-number">{s.number || ''}</span>
                <p>{s.title ? <><strong>{s.title}</strong><br/></> : null}{s.text || ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="section-light">
        <div className="container">
          <h1 className="section-title">El nostre equip / Nuestro equipo</h1>
          <div className="team-grid">
            {(team || []).map((m,i)=>(
              <div className="team-card" key={i}>
                <div className="team-front">
                  <img src={m.photo || '/src/img/Marc-foto-perfil.jpg'} alt={m.name || ''} className="team-photo" />
                  <h3 className="team-name">{m.name || ''}</h3>
                </div>
                <div className="team-back">
                  <h3 className="team-name">{m.name || ''}</h3>
                  <p>{m.bio || ''}</p>
                  {Array.isArray(m.bullets) && <ul>{m.bullets.map((b,j)=><li key={j}>{b}</li>)}</ul>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer">
        <div className="container">
          <video
            id="footer-video" autoPlay muted loop playsInline preload="auto"
            poster={footer.poster || '/src/img/hero-poster.jpg'}
          >
            <source src={footer.videoWebm || '/src/img/hero-gradient.webm'} type="video/webm" />
            <source src={footer.videoMp4 || '/src/img/hero-gradient.mp4'} type="video/mp4" />
          </video>
          <div id="footer-content" className="container">
            <h1 id="footer-title">{footer.title || ''}</h1>
            <p id="footer-contact" dangerouslySetInnerHTML={{
              __html: (footer.contact || '').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>')
            }}/>
            <a id="footer-left" href={footer.legalHref || '#'}>{footer.legalText || ''}</a>
            <p id="footer-right">{footer.copyright || ''}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Registrar la misma plantilla para Home CA y ES
CMS.registerPreviewTemplate('home_ca', HomePreview);
CMS.registerPreviewTemplate('home_es', HomePreview);
