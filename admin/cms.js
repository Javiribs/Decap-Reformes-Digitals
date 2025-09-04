// ===== Estilos reales dentro del iframe de preview =====
CMS.registerPreviewStyle('/src/styles/reset.css');
CMS.registerPreviewStyle('/src/styles/styles.css');
CMS.registerPreviewStyle('/src/styles/style-responsive.css'); // si existe
CMS.registerPreviewStyle('/src/styles/styles-cookies.css');   // opcional

// ===== Helpers =====
const h = window.h; // Preact que expone Decap
const get = (obj, path, def = '') =>
  path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj) ?? def;

// Convierte "img/a.jpg" -> "/src/img/a.jpg". Si el server no sirve desde raíz, ver nota abajo.
const assetUrl = (p, base = '/src/') => {
  if (!p) return '';
  if (p.startsWith('http')) return p;
  if (p.startsWith('/')) return p;       // ya absoluta
  return base + p.replace(/^\.?\//, '');
};

// ===== Preview de HOME (CA/ES) =====
function HomePreview({ entry }) {
  const data   = entry.getIn(['data']).toJS();
  const nav    = get(data, 'nav', {});
  const hero   = get(data, 'hero', {});
  const about  = get(data, 'about', {});
  const proc   = get(data, 'process', {});
  const team   = get(data, 'team', []);
  const footer = get(data, 'footer', {});

  return h('div', { id: 'body' },

    // NAV
    h('header', { id: 'header' },
      h('nav', { id: 'nav', className: 'container' },
        h('a', { id: 'nav-logo-link', href: '#' },
          h('img', {
            id: 'nav-logo',
            src: assetUrl(nav.logo || 'img/RDBlack.png'),
            alt: 'Reformes Digitals Logo'
          })
        ),
        h('ul', { id: 'nav-menu' },
          (get(nav, 'links', []) || []).map((l, i) =>
            h('li', { key: i }, h('a', { href: l.href || '#' }, l.label || ''))
          ),
          h('li', { id: 'nav-item-idioma', className: 'dropdown' },
            h('a', { href: '#', id: 'nav-link-idioma' }, 'Idioma'),
            h('ul', { className: 'dropdown-menu' },
              h('li', null, h('a', { href: '#' }, 'Cast')),
              h('li', null, h('a', { href: '#' }, 'Cat'))
            )
          )
        )
      )
    ),

    // HERO
    h('section', { id: 'hero' },
      h('div', { className: 'container' },
        h('video', {
          id: 'hero-video',
          autoPlay: true, muted: true, loop: true, playsInline: true, preload: 'auto',
          poster: assetUrl(hero.poster || 'img/hero-poster.jpg')
        },
          h('source', { src: assetUrl(hero.videoWebm || 'img/hero-gradient.webm'), type: 'video/webm' }),
          h('source', { src: assetUrl(hero.videoMp4  || 'img/hero-gradient.mp4'),  type: 'video/mp4'  })
        ),
        h('div', { id: 'hero-content', className: 'container' },
          h('h1', { id: 'hero-title' }, hero.title || ''),
          h('p',  { id: 'hero-description' }, hero.description || '')
        )
      )
    ),

    // ABOUT
    h('section', { id: 'about' },
      h('div', { className: 'container' },
        h('div', { className: 'about-box' },
          h('h2', { id: 'about-title' }, about.title || ''),
          h('p',  { id: 'about-description' }, about.description || ''),
          h('ul', { className: 'about-services' },
            (about.services || []).map((s, i) => h('li', { key: i }, s))
          )
        )
      )
    ),

    // PROCESS
    h('section', { id: 'process', className: 'section-light' },
      h('div', { className: 'container' },
        h('h1', {
          className: 'section-title',
          dangerouslySetInnerHTML: { __html: (proc.sectionTitle || '').replace(/\n/g, '<br>') }
        }),
        h('p', { className: 'section-description' }, proc.sectionDescription || ''),
        h('div', { className: 'process-grid' },
          (proc.steps || []).map((s, i) =>
            h('div', { className: `process-card step-${i + 1}`, key: i },
              h('span', { className: 'process-number' }, s.number || ''),
              h('p', null,
                s.title ? [h('strong', { key: 'st' }, s.title), h('br', { key: 'br' })] : null,
                s.text || ''
              )
            )
          )
        )
      )
    ),

    // TEAM
    h('section', { id: 'team', className: 'section-light' },
      h('div', { className: 'container' },
        h('h1', { className: 'section-title' }, 'El nostre equip'),
        h('div', { className: 'team-grid' },
          (team || []).map((m, i) =>
            h('div', { className: 'team-card', key: i },
              h('div', { className: 'team-front' },
                h('img', { src: assetUrl(m.photo || 'img/Marc-foto-perfil.jpg'), alt: m.name || '', className: 'team-photo' }),
                h('h3', { className: 'team-name' }, m.name || '')
              ),
              h('div', { className: 'team-back' },
                h('h3', { className: 'team-name' }, m.name || ''),
                h('p', null, m.bio || ''),
                Array.isArray(m.bullets) ? h('ul', null, m.bullets.map((b, j) => h('li', { key: j }, b))) : null
              )
            )
          )
        )
      )
    ),

    // FOOTER
    h('footer', { id: 'footer' },
      h('div', { className: 'container' },
        h('video', {
          id: 'footer-video',
          autoPlay: true, muted: true, loop: true, playsInline: true, preload: 'auto',
          poster: assetUrl(footer.poster || 'img/hero-poster.jpg')
        },
          h('source', { src: assetUrl(footer.videoWebm || 'img/hero-gradient.webm'), type: 'video/webm' }),
          h('source', { src: assetUrl(footer.videoMp4  || 'img/hero-gradient.mp4'),  type: 'video/mp4'  })
        ),
        h('div', { id: 'footer-content', className: 'container' },
          h('h1', { id: 'footer-title' }, footer.title || ''),
          h('p', {
            id: 'footer-contact',
            dangerouslySetInnerHTML: {
              __html: (footer.contact || '')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>')
            }
          }),
          h('a', { id: 'footer-left', href: footer.legalHref || '#' }, footer.legalText || ''),
          h('p', { id: 'footer-right' }, footer.copyright || '')
        )
      )
    )
  );
}

// Registrar el template para CA y ES
CMS.registerPreviewTemplate('home_ca', HomePreview);
CMS.registerPreviewTemplate('home_es', HomePreview);
