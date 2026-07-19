import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const heroScenes = [
  {
    label: 'The forest within',
    image: '/assets/hero-desktop.jpg',
    mobile: '/assets/hero-mobile.jpg',
    position: 'center',
  },
  {
    label: 'A walkable heart',
    image: '/assets/community-aerial.jpg',
    position: 'center 45%',
  },
  {
    label: 'Homes in harmony',
    image: '/assets/exterior-05.jpg',
    position: 'center 42%',
  },
]

const amenities = [
  { title: 'Serene Woodland Walking Trails', image: '/assets/amenity-trails.jpg' },
  { title: 'Outdoor Fitness Spaces', image: '/assets/amenity-outdoor-fitness.jpg' },
  { title: 'State-of-the-Art Indoor Gym', image: '/assets/amenity-gym.jpg' },
  { title: "Vibrant Children's Play Zones", image: '/assets/amenity-play.jpg' },
  { title: 'Lush Landscaped Green Retreats', image: '/assets/amenity-retreats.jpg' },
  { title: 'Family-Friendly Communal BBQ Areas', image: '/assets/amenity-bbq.jpg' },
]

const destinationDetails = [
  ['01', "Sharjah's largest private community park", 'Expansive panoramas shaped around everyday community life.'],
  ['02', '26,000 m² of green space', 'Landscaped nature and entertainment areas across the community.'],
  ['03', '1, 2 & 3 bedroom apartments', 'World-class off-plan residences in Sharjah.'],
  ['04', '5 swimming pools', 'Dedicated water spaces for children and adults.'],
  ['05', 'Amphitheatre & climbing wall', 'With informal seating and a grass stage area.'],
  ['06', 'Interactive water features', 'Paired with a generous recreational lawn.'],
  ['07', 'Freehold ownership', 'Open to buyers of all nationalities.'],
  ['08', 'Flexible payment plans', 'Available directly from Alef Group.'],
]

const gallery = {
  exterior: [
    '/assets/exterior-01.jpg',
    '/assets/exterior-02.jpg',
    '/assets/exterior-03.jpg',
    '/assets/exterior-04.jpg',
    '/assets/exterior-05.jpg',
    '/assets/exterior-06.jpg',
    '/assets/exterior-07.jpg',
    '/assets/exterior-08.jpg',
  ],
  interior: ['/assets/interior-01.jpg', '/assets/interior-02.jpg', '/assets/interior-03.jpg'],
}

const navItems = [
  ['01', 'Story', '#story'],
  ['02', 'Amenities', '#amenities'],
  ['03', 'Residences', '#residences'],
  ['04', 'Location', '#location'],
]

function Arrow({ direction = 'right' }) {
  const rotate = direction === 'left' ? 'rotate(180 12 12)' : undefined
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none">
      <path d="M5 12h14M14 7l5 5-5 5" transform={rotate} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="site-header fixed inset-x-0 top-0" data-header>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-8 lg:px-12">
        <a href="#top" className="brand-lockup" aria-label="Olfah home">
          <img src="/assets/olfah-logo.svg" alt="Olfah" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map(([index, label, href]) => (
            <a key={href} className="nav-link" href={href}>
              <span>{index}</span>
              <b>/ {label}</b>
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a className="header-call" href="tel:800998">Call 800 998</a>
          <a className="button button-light magnetic" href="#enquire">Register interest <Arrow /></a>
        </div>

        <button
          type="button"
          className="menu-toggle md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu md:hidden ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu-inner">
          <nav aria-label="Mobile navigation">
            {navItems.map(([index, label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                <small>{index}</small>{label}
              </a>
            ))}
          </nav>
          <a className="button button-dark" href="#enquire" onClick={() => setMenuOpen(false)}>Register interest <Arrow /></a>
        </div>
      </div>
    </header>
  )
}

function Hero({ activeScene, setActiveScene }) {
  return (
    <section id="top" className="hero relative min-h-[100dvh] overflow-hidden bg-[#20281f] text-white" aria-label="Olfah introduction">
      <div className="absolute inset-0">
        {heroScenes.map((scene, index) => (
          <picture key={scene.label} className={`hero-image ${activeScene === index ? 'is-active' : ''}`}>
            {scene.mobile && <source media="(max-width: 640px)" srcSet={scene.mobile} />}
            <img src={scene.image} alt="" aria-hidden="true" style={{ objectPosition: scene.position }} />
          </picture>
        ))}
        <div className="hero-wash" />
        <div className="grain" aria-hidden="true" />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col justify-end px-5 pb-8 pt-32 md:px-8 md:pb-10 lg:px-12 lg:pb-12">
        <div className="mb-auto mt-24 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="hero-switcher" aria-label="Featured Olfah views">
            {heroScenes.map((scene, index) => (
              <button
                key={scene.label}
                type="button"
                className={activeScene === index ? 'is-active' : ''}
                onClick={() => setActiveScene(index)}
                aria-pressed={activeScene === index}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b>/ {scene.label}</b>
              </button>
            ))}
          </div>
          <div className="availability" role="status">
            <i />
            <span>Freehold ownership available</span>
          </div>
        </div>

        <div className="hero-bottom grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.85fr)] lg:items-end">
          <div>
            <p className="eyebrow text-white/75">Muwaileh, Sharjah <span /> Close access to E311</p>
            <h1 className="hero-title" aria-label="Life, rooted.">
              {'Life, rooted.'.split('').map((char, index) => (
                <span className="char-clip" key={`${char}-${index}`}><i>{char === ' ' ? '\u00a0' : char}</i></span>
              ))}
            </h1>
          </div>
          <div className="hero-copy">
            <p>A forest-inspired, walkable residential community where architecture, landscape, and everyday living are shaped by nature.</p>
            <div className="flex flex-wrap gap-3">
              <a className="button button-light magnetic" href="#enquire">Discover Olfah <Arrow /></a>
              <a className="button button-ghost" href="/assets/olfah-brochure.pdf" download>Brochure <Arrow /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true"><span /> Scroll to enter</div>
    </section>
  )
}

function Story() {
  return (
    <>
      <section id="story" className="section-shell bg-[#f1eee5] text-[#20281f]">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-36 lg:px-12 lg:py-44">
          <div className="grid gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div data-reveal>
              <p className="section-index">01 / The community</p>
              <p className="mt-10 max-w-sm text-[15px] leading-7 text-[#53604f]">Inspired by humanity. Built for community. Designed so daily life moves at the gentler pace of a walk through the trees.</p>
            </div>
            <div data-reveal>
              <h2 className="display-heading">Nature and modernity,<br /><em>in quiet harmony.</em></h2>
              <p className="mt-10 max-w-2xl text-lg leading-8 text-[#4b5548]">Twelve thoughtfully designed buildings rise between 9 and 11 floors, framing a fully walkable neighbourhood. Olfah sits a short distance from the Sharjah Academy for Astronomy, Space Sciences and Technology, with direct access to the wider city through the E311.</p>
            </div>
          </div>

          <div className="metrics mt-24 grid border-y border-[#20281f]/20 md:grid-cols-3 md:divide-x md:divide-[#20281f]/20 lg:mt-36">
            <div data-reveal><strong>912,779</strong><span>Sq. ft. of total area</span></div>
            <div data-reveal><strong>1, 2, 3</strong><span>Bedroom apartments</span></div>
            <div data-reveal><strong>12</strong><span>Buildings across Olfah</span></div>
          </div>
        </div>
      </section>

      <section className="film-intro bg-[#20281f] text-white">
        <div className="film-stage relative min-h-[100dvh] overflow-hidden">
          <img className="film-image absolute inset-0 h-full w-full object-cover" src="/assets/community-aerial.jpg" alt="Aerial view of the Olfah community master plan" />
          <div className="film-overlay absolute inset-0" />
          <div className="relative mx-auto flex min-h-[100dvh] max-w-[1440px] items-end px-5 pb-12 md:px-8 md:pb-16 lg:px-12 lg:pb-20">
            <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="section-index text-white/70">02 / A landscape to live in</p>
                <h2 className="display-heading mt-8 text-white">Over 912,935 sq. ft.<br /><em>shaped around belonging.</em></h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-white/80">A generous forest-inspired community where shaded paths, green roofs, pools and social spaces turn the landscape into the centre of everyday life.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Amenities() {
  return (
    <section id="amenities" className="amenities-run overflow-hidden bg-[#d8dfd0] text-[#20281f]">
      <div className="amenities-header mx-auto flex max-w-[1440px] items-end justify-between gap-8 px-5 pb-10 pt-20 md:px-8 md:pt-24 lg:px-12">
        <div>
          <p className="section-index">03 / Amenities & community perks</p>
          <h2 className="display-heading mt-5">Find your rhythm.</h2>
        </div>
        <p className="hidden max-w-sm text-sm leading-6 text-[#53604f] md:block">Walkable paths, vibrant energy and secure spaces shape a life that feels beautifully intentional.</p>
      </div>
      <div className="amenities-track flex w-max gap-4 px-5 pb-20 md:gap-6 md:px-8 lg:px-12">
        {amenities.map((item, index) => (
          <article className="amenity-card" key={item.title}>
            <div className="amenity-image-wrap">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
            <div className="flex items-start justify-between gap-8 pt-5">
              <h3>{item.title}</h3>
              <span>{String(index + 1).padStart(2, '0')} / 06</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Destination() {
  return (
    <section className="section-shell bg-[#f1eee5] text-[#20281f]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-36 lg:px-12 lg:py-44">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start" data-reveal>
            <p className="section-index">04 / A destination by Alef</p>
            <h2 className="display-heading mt-8">A private park.<br /><em>A connected life.</em></h2>
            <p className="mt-8 max-w-md text-base leading-7 text-[#53604f]">Olfah pairs a calm forest setting with convenient access to E311, Sharjah and Dubai international airports, and Sharjah University City.</p>
          </div>
          <div className="destination-list border-t border-[#20281f]/25">
            {destinationDetails.map(([index, title, copy]) => (
              <article key={index} className="destination-row" data-reveal>
                <span>{index}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Residences() {
  return (
    <section id="residences" className="bg-[#b66f50] text-[#f6f1e8]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-36 lg:px-12 lg:py-44">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div data-reveal>
            <p className="section-index text-white/65">05 / The residences</p>
            <h2 className="display-heading mt-8 text-white">Space for every<br /><em>way of living.</em></h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/80" data-reveal>World-class one, two and three bedroom apartments sit within 12 contemporary buildings. Green rooftops, considered balconies and calm interiors keep every home connected to the landscape beyond.</p>
        </div>

        <div className="residence-grid mt-20 grid gap-px overflow-hidden border border-white/25 bg-white/25 md:grid-cols-3 lg:mt-28">
          {['One bedroom', 'Two bedroom', 'Three bedroom'].map((title, index) => (
            <article key={title} className="residence-type bg-[#b66f50] p-7 md:min-h-72 md:p-9" data-reveal>
              <span>0{index + 1}</span>
              <div><h3>{title}</h3><p>Olfah apartment</p></div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/25 pt-6 text-sm text-white/75">
          <span>Building heights: 9–11 floors</span>
          <a className="button button-light" href="/assets/olfah-brochure.pdf" download>Download brochure <Arrow /></a>
        </div>
      </div>
    </section>
  )
}

function Gallery({ openLightbox }) {
  const [tab, setTab] = useState('exterior')
  const images = gallery[tab]

  return (
    <section className="gallery-section bg-[#20281f] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-24 md:px-8 md:pt-36 lg:px-12 lg:pt-44">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="section-index text-white/60">06 / Gallery</p>
            <h2 className="display-heading mt-6 text-white">See life at Olfah.</h2>
          </div>
          <div className="gallery-tabs" role="tablist" aria-label="Gallery categories">
            {['exterior', 'interior'].map((name) => (
              <button key={name} type="button" role="tab" aria-selected={tab === name} className={tab === name ? 'is-active' : ''} onClick={() => setTab(name)}>{name}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="gallery-grid px-5 pb-24 md:px-8 md:pb-36 lg:px-12 lg:pb-44">
        {images.map((image, index) => (
          <button key={image} className="gallery-item" type="button" onClick={() => openLightbox({ images, index })} aria-label={`Open ${tab} image ${index + 1}`}>
            <img src={image} alt={`${tab === 'exterior' ? 'Exterior architecture' : 'Interior residence'} at Olfah`} loading="lazy" />
            <span>{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function Location() {
  return (
    <section id="location" className="bg-[#f1eee5] text-[#20281f]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-36 lg:px-12 lg:py-44">
        <div className="grid gap-16 lg:grid-cols-[0.76fr_1.24fr] lg:items-center lg:gap-24">
          <div data-reveal>
            <p className="section-index">07 / Location</p>
            <h2 className="display-heading mt-8">Close to the city.<br /><em>Closer to nature.</em></h2>
            <p className="mt-8 max-w-md text-base leading-7 text-[#53604f]">A prime residential address near Sharjah University City and the Sharjah Academy for Astronomy, Space Sciences and Technology, with close access to E311 and both Sharjah and Dubai international airports.</p>
            <div className="location-links mt-10 border-t border-[#20281f]/20">
              {['E311 access', 'Sharjah University City', 'Sharjah International Airport', 'Dubai International Airport'].map((place) => <span key={place}>{place}</span>)}
            </div>
          </div>
          <figure className="map-frame" data-reveal>
            <img src="/assets/location-map.png" alt="Map showing Olfah's location in Sharjah near E311" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}

function Enquiry() {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const submit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nextErrors = {}
    if (!data.get('name')?.trim()) nextErrors.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(data.get('email') || '')) nextErrors.email = 'Enter a valid email address.'
    if (!data.get('phone')?.trim()) nextErrors.phone = 'Please enter your phone number.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('error')
      return
    }
    setStatus('loading')
    window.setTimeout(() => setStatus('success'), 850)
  }

  return (
    <section id="enquire" className="enquiry-section bg-[#d8dfd0] text-[#20281f]">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="enquiry-visual min-h-[520px] lg:min-h-[850px]" data-reveal>
          <img src="/assets/footer-architecture.jpg" alt="Olfah residential architecture at sunset" loading="lazy" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
            <img className="w-28 brightness-0 invert" src="/assets/olfah-logo.svg" alt="Olfah" />
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/80">One, two and three bedroom apartments in a walkable forest-inspired community.</p>
          </div>
        </div>
        <div className="px-5 py-20 md:px-12 md:py-24 lg:px-16 lg:py-28">
          <p className="section-index">08 / Register your interest</p>
          <h2 className="display-heading mt-7">Find your perfect<br /><em>space at Olfah.</em></h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#53604f]">Contact the Alef sales team or complete the form to enquire about owning a spacious apartment at Olfah.</p>

          {status === 'success' ? (
            <div className="form-success mt-12" role="status">
              <span>Enquiry ready</span>
              <h3>Thank you for your interest.</h3>
              <p>This concept form demonstrates the completed interaction. For a live launch, connect it to Alef Group's approved enquiry endpoint.</p>
              <button type="button" className="button button-dark mt-7" onClick={() => setStatus('idle')}>Send another enquiry <Arrow /></button>
            </div>
          ) : (
            <form className="enquiry-form mt-10" onSubmit={submit} noValidate>
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" autoComplete="name" aria-describedby={errors.name ? 'name-error' : undefined} aria-invalid={Boolean(errors.name)} />
                {errors.name && <span id="name-error" className="form-error">{errors.name}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="email">Email ID</label>
                <input id="email" name="email" type="email" autoComplete="email" aria-describedby={errors.email ? 'email-error' : undefined} aria-invalid={Boolean(errors.email)} />
                {errors.email && <span id="email-error" className="form-error">{errors.email}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="phone">Phone number</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" aria-describedby={errors.phone ? 'phone-error' : undefined} aria-invalid={Boolean(errors.phone)} />
                {errors.phone && <span id="phone-error" className="form-error">{errors.phone}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="message">Message <small>Optional</small></label>
                <textarea id="message" name="message" rows="3" />
              </div>
              <button className="button button-dark mt-4 w-full justify-between md:w-auto" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Preparing enquiry…' : 'Submit your enquiry'} <Arrow />
              </button>
              {status === 'error' && <p className="mt-4 text-sm text-[#8a321d]" role="alert">Please review the highlighted fields.</p>}
            </form>
          )}

          <div className="mt-14 grid gap-3 border-t border-[#20281f]/20 pt-7 sm:grid-cols-2">
            <a className="contact-link" href="tel:800998"><span>Call sales</span><strong>800 998</strong></a>
            <a className="contact-link" href="https://wa.me/971800253323?text=Hello%20I%20am%20interested%20in%20Olfah.%20Please%20share%20more%20details." target="_blank" rel="noreferrer"><span>Message sales</span><strong>WhatsApp</strong></a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#20281f] text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20 lg:px-12">
        <div className="grid gap-16 border-b border-white/15 pb-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <img className="w-36 brightness-0 invert" src="/assets/olfah-logo.svg" alt="Olfah" />
            <p className="mt-7 max-w-lg text-sm leading-7 text-white/65">Alef is a premier real estate developer in the UAE, creating premium lifestyle communities, world-class destinations and enduring experiences through strategic investments and joint ventures.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div><h3>Explore</h3><a href="#story">Community</a><a href="#amenities">Amenities</a><a href="#residences">Residences</a></div>
            <div><h3>Connect</h3><a href="#location">Location</a><a href="#enquire">Enquire</a><a href="/assets/olfah-brochure.pdf" download>Brochure</a></div>
            <div><h3>Official</h3><a href="https://www.alefgroup.ae/alef-communities/olfah/" target="_blank" rel="noreferrer">Project page</a><a href="https://www.alefgroup.ae/contact-us/" target="_blank" rel="noreferrer">Contact</a><a href="https://www.alefgroup.ae/privacy-policy/" target="_blank" rel="noreferrer">Privacy</a></div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-xs uppercase tracking-[0.14em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Alef Group LLC</span>
          <span>Olfah — Sharjah, UAE</span>
        </div>
      </div>
    </footer>
  )
}

function Lightbox({ lightbox, close, move }) {
  if (!lightbox) return null
  const image = lightbox.images[lightbox.index]
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Olfah image gallery" onClick={close}>
      <button className="lightbox-close" type="button" onClick={close}>Close</button>
      <button className="lightbox-nav left" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); move(-1) }}><Arrow direction="left" /></button>
      <img src={image} alt="Expanded Olfah gallery view" onClick={(event) => event.stopPropagation()} />
      <button className="lightbox-nav right" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); move(1) }}><Arrow /></button>
      <span className="lightbox-count">{String(lightbox.index + 1).padStart(2, '0')} / {String(lightbox.images.length).padStart(2, '0')}</span>
    </div>
  )
}

export default function App() {
  const appRef = useRef(null)
  const [activeScene, setActiveScene] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    let cancelled = false
    Promise.resolve(document.fonts?.ready).then(() => {
      requestAnimationFrame(() => {
        if (!cancelled) window.__ready = true
      })
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    heroScenes.forEach((scene) => {
      const image = new Image()
      image.src = scene.image
    })
    const interval = window.setInterval(() => setActiveScene((scene) => (scene + 1) % heroScenes.length), 7000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setLightbox(null)
      if (event.key === 'ArrowRight') setLightbox((current) => current ? { ...current, index: (current.index + 1) % current.images.length } : current)
      if (event.key === 'ArrowLeft') setLightbox((current) => current ? { ...current, index: (current.index - 1 + current.images.length) % current.images.length } : current)
    }
    window.addEventListener('keydown', onKey)
    document.body.classList.toggle('modal-open', Boolean(lightbox))
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
    }
  }, [lightbox])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const jump = new URLSearchParams(window.location.search).get('jump')
    let lenis
    let ticker

    if (jump !== null) window.history.scrollRestoration = 'manual'

    const context = gsap.context(() => {
      if (!reducedMotion && jump === null) {
        lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
        lenis.on('scroll', ScrollTrigger.update)
        ticker = (time) => lenis.raf(time * 1000)
        gsap.ticker.add(ticker)
        gsap.ticker.lagSmoothing(0)
      }

      if (!reducedMotion) {
        gsap.from('.hero-title .char-clip i', { yPercent: 120, duration: 1.05, stagger: 0.035, ease: 'power4.out', delay: 0.15 })
        gsap.from('.hero-copy', { x: 70, opacity: 0, duration: 0.9, ease: 'power4.out', delay: 0.45 })

        gsap.timeline({
          scrollTrigger: { trigger: '.film-intro', start: 'top top', end: '+=130%', pin: '.film-stage', scrub: 1, anticipatePin: 1 },
        })
          .fromTo('.film-image', { scale: 1.12 }, { scale: 1, ease: 'none' }, 0)
          .fromTo('.film-overlay', { opacity: 0.35 }, { opacity: 0.72, ease: 'none' }, 0)

        const track = document.querySelector('.amenities-track')
        if (track) {
          const horizontal = gsap.to(track, {
            x: () => -Math.max(0, track.scrollWidth - window.innerWidth + 48),
            ease: 'none',
            scrollTrigger: {
              trigger: '.amenities-run',
              start: 'top top',
              end: () => `+=${Math.max(window.innerWidth, track.scrollWidth - window.innerWidth)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          void horizontal
        }

        document.querySelectorAll('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            y: 54,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          })
        })
      }

      ScrollTrigger.create({
        start: 40,
        end: 'max',
        toggleClass: { targets: '[data-header]', className: 'is-scrolled' },
      })

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => document.documentElement.style.setProperty('--page-progress', self.progress),
      })

      document.querySelectorAll('.magnetic').forEach((element) => {
        const move = (event) => {
          const rect = element.getBoundingClientRect()
          gsap.to(element, { x: (event.clientX - rect.left - rect.width / 2) * 0.12, y: (event.clientY - rect.top - rect.height / 2) * 0.12, duration: 0.35, ease: 'power3.out' })
        }
        const leave = () => gsap.to(element, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.4)' })
        element.addEventListener('pointermove', move)
        element.addEventListener('pointerleave', leave)
      })
    }, appRef)

    document.fonts.ready.then(() => {
      ScrollTrigger.refresh()
      if (jump !== null) {
        window.scrollTo(0, Number(jump) || 0)
        ScrollTrigger.update()
      }
      requestAnimationFrame(() => { window.__ready = true })
    })

    return () => {
      if (ticker) gsap.ticker.remove(ticker)
      if (lenis) lenis.destroy()
      context.revert()
    }
  }, [])

  const moveLightbox = (delta) => setLightbox((current) => ({ ...current, index: (current.index + delta + current.images.length) % current.images.length }))

  return (
    <div ref={appRef}>
      <div className="page-progress" aria-hidden="true" />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero activeScene={activeScene} setActiveScene={setActiveScene} />
        <Story />
        <Amenities />
        <Destination />
        <Residences />
        <Gallery openLightbox={setLightbox} />
        <Location />
        <Enquiry />
      </main>
      <Footer />
      <Lightbox lightbox={lightbox} close={() => setLightbox(null)} move={moveLightbox} />
    </div>
  )
}
