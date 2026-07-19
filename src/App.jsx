import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const heroScenes = [
  {
    label: 'Blue hour at Olfah',
    image: '/assets/hero-desktop.jpg',
    mobile: '/assets/hero-mobile.jpg',
    position: 'center',
  },
  {
    label: 'The park after dark',
    image: '/assets/night-park.jpg',
    position: 'center 45%',
  },
  {
    label: 'Nature at its largest',
    image: '/assets/night-aerial.jpg',
    position: 'center 42%',
  },
]

const amenities = [
  { title: 'Woodland walk', copy: 'Shaded walking routes with places to pause beneath the canopy.', image: '/assets/amenity-trails.jpg' },
  { title: 'Outdoor gym', copy: 'Open-air exercise equipment woven into the landscape.', image: '/assets/amenity-outdoor-fitness.jpg' },
  { title: 'Indoor wellness', copy: 'A state-of-the-art gym for year-round movement and wellbeing.', image: '/assets/amenity-gym.jpg' },
  { title: "Children's play", copy: 'Play zones, sand play and a dedicated kids’ waterpark.', image: '/assets/amenity-play.jpg' },
  { title: 'Lawn hills', copy: 'Mounded recreational lawns and lush green retreats for slower days.', image: '/assets/amenity-retreats.jpg' },
  { title: 'Family BBQ', copy: 'Communal picnic and barbecue areas made for gathering.', image: '/assets/amenity-bbq.jpg' },
]

const destinationDetails = [
  ['01', "Sharjah's largest private community park", 'An elevated podium park covering more than 26,000 m².'],
  ['02', '84,814.40 m² total community', 'Twelve residential buildings arranged across a single-level platform.'],
  ['03', '57,529.6 m² between the buildings', 'Vast green spaces and recreational areas designed for tranquillity and everyday entertainment.'],
  ['04', 'Five swimming pools', 'A 25 m lap pool, children’s pool, jacuzzi and three large recreational pools.'],
  ['05', 'Amphitheatre & climbing wall', 'Outdoor performance seating paired with a grass stage area.'],
  ['06', 'Water, lawn and play', 'Interactive water features, lawn mounds, kids’ waterpark and sand play.'],
  ['07', 'Movement through nature', 'Jogging and cycle paths, woodland seating and outdoor exercise equipment.'],
  ['08', 'Everyday gathering', 'Family BBQ and picnic areas, retail units and private gardens for select ground-floor homes.'],
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
  night: ['/assets/night-pool.jpg', '/assets/night-park.jpg', '/assets/night-aerial.jpg', '/assets/hero-desktop.jpg', '/assets/footer-architecture.jpg'],
}

const nightScenes = [
  { title: 'Pool glow', label: 'Hidden light beneath the canopy', image: '/assets/night-pool.jpg' },
  { title: 'Park at dusk', label: 'Landscape lighting guides the way', image: '/assets/night-park.jpg' },
  { title: 'The whole community', label: 'A quiet constellation from above', image: '/assets/night-aerial.jpg' },
]

const panoramaScenes = [
  { id: 'pool', title: 'Pool courtyard', note: 'Water & landscape', image: '/assets/exterior-02.jpg' },
  { id: 'garden', title: 'Garden & BBQ', note: 'Community gathering', image: '/assets/amenity-bbq.jpg' },
  { id: 'woodland', title: 'Woodland walk', note: 'Eye-level afternoon', image: '/assets/amenity-trails.jpg' },
  { id: 'lawn', title: 'Central lawn', note: 'The park heart', image: '/assets/exterior-03.jpg' },
  { id: 'play', title: 'Play garden', note: 'Family landscape', image: '/assets/amenity-play.jpg' },
  { id: 'fitness', title: 'Fitness plaza', note: 'Outdoor movement', image: '/assets/amenity-outdoor-fitness.jpg' },
  { id: 'promenade', title: 'Evening promenade', note: 'Blue-hour arrival', image: '/assets/night-park.jpg' },
  { id: 'home', title: 'Apartment home', note: 'Interior panorama', image: '/assets/interior-03.jpg' },
]

const navItems = [
  ['Story', '#story'],
  ['Amenities', '#amenities'],
  ['Residences', '#residences'],
  ['360° Tour', '#panorama'],
  ['Location', '#location'],
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
          {navItems.map(([label, href]) => (
            <a key={href} className="nav-link" href={href}>
              <b>{label}</b>
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
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
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
            <span>Register interest with Alef Group</span>
          </div>
        </div>

        <div className="hero-bottom grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.85fr)] lg:items-end">
          <div>
            <p className="eyebrow text-white/75">Muwaileh, Sharjah <span /> Close access to E311</p>
            <h1 className="hero-title" aria-label="Embrace life.">
              {'Embrace life.'.split('').map((char, index) => (
                <span className="char-clip" key={`${char}-${index}`}><i>{char === ' ' ? '\u00a0' : char}</i></span>
              ))}
            </h1>
          </div>
          <div className="hero-copy">
            <p>A modern retreat in Muwaileh where contemporary homes, Sharjah’s largest private community park and everyday life meet beneath the trees.</p>
            <div className="flex flex-wrap gap-3">
              <a className="button button-light magnetic" href="#panorama">Enter Olfah in 360° <Arrow /></a>
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
              <p className="section-index">The community</p>
              <p className="mt-10 max-w-sm text-[15px] leading-7 text-[#53604f]">Inspired by humanity. Built for community. Designed so daily life moves at the gentler pace of a walk through the trees.</p>
            </div>
            <div data-reveal>
              <h2 className="display-heading">Nature at its largest.<br /><em>Life at its gentlest.</em></h2>
              <p className="mt-10 max-w-2xl text-lg leading-8 text-[#4b5548]">Twelve thoughtfully designed buildings rise between 9 and 11 floors on a unified platform, framing an expansive walkable neighbourhood. Olfah sits next to the Sharjah Academy for Astronomy, Space Sciences and Technology, with close access to E311.</p>
            </div>
          </div>

          <div className="metrics mt-24 grid border-y border-[#20281f]/20 md:grid-cols-3 md:divide-x md:divide-[#20281f]/20 lg:mt-36">
            <div data-reveal><strong>84,814.40</strong><span>Square metres total area</span></div>
            <div data-reveal><strong>57,529.6</strong><span>Square metres of green & recreation</span></div>
            <div data-reveal><strong>12</strong><span>Buildings · 9–11 floors</span></div>
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
                <p className="section-index text-white/70">A landscape to live in</p>
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
          <p className="section-index">Amenities & community perks</p>
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
              <div><h3>{item.title}</h3><p>{item.copy}</p></div>
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
            <p className="section-index">A destination by Alef</p>
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
            <p className="numbers-note">*Project numbers and specifications may vary. Confirm current availability directly with Alef Group.</p>
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
            <p className="section-index text-white/65">The residences</p>
            <h2 className="display-heading mt-8 text-white">Space for every<br /><em>way of living.</em></h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/80" data-reveal>World-class one, two and three bedroom apartments sit within 12 contemporary buildings. Green rooftops, considered balconies and calm interiors keep every home connected to the landscape beyond.</p>
        </div>

        <div className="residence-grid mt-20 grid gap-px overflow-hidden border border-white/25 bg-white/25 md:grid-cols-3 lg:mt-28">
          {['One bedroom', 'Two bedroom', 'Three bedroom'].map((title, index) => (
            <article key={title} className="residence-type bg-[#b66f50] p-7 md:min-h-72 md:p-9" data-residence>
              <span>0{index + 1}</span>
              <div><h3>{title}</h3><p>Olfah apartment</p></div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/25 pt-6 text-sm text-white/75">
          <span>Building heights: 9–11 floors · 1, 2 & 3 bedroom apartments</span>
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
            <p className="section-index text-white/60">Gallery</p>
            <h2 className="display-heading mt-6 text-white">See life at Olfah.</h2>
          </div>
          <div className="gallery-actions">
            <div className="gallery-tabs" role="tablist" aria-label="Gallery categories">
              {['exterior', 'interior', 'night'].map((name) => (
                <button key={name} type="button" role="tab" aria-selected={tab === name} className={tab === name ? 'is-active' : ''} onClick={() => setTab(name)}>{name}</button>
              ))}
            </div>
            <a className="gallery-proof-link" href="/enhanced/">All high-resolution images <Arrow /></a>
          </div>
        </div>
      </div>
      <div className="gallery-grid px-5 pb-24 md:px-8 md:pb-36 lg:px-12 lg:pb-44">
        {images.map((image, index) => (
          <button key={image} className="gallery-item" type="button" data-gallery-item onClick={() => openLightbox({ images, index })} aria-label={`Open ${tab} image ${index + 1}`}>
            <img src={image} alt={`${tab === 'exterior' ? 'Exterior architecture' : tab === 'interior' ? 'Interior residence' : 'Blue-hour landscape'} at Olfah`} loading="lazy" />
            <span>{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function AfterDark() {
  return (
    <section className="after-dark" aria-labelledby="after-dark-title">
      <div className="after-dark-intro" data-reveal>
        <p className="section-index">Olfah after dark</p>
        <h2 id="after-dark-title" className="display-heading">When the garden<br /><em>begins to glow.</em></h2>
        <p>At blue hour, discreet light beneath the trees, along pathways and across the water turns the park into a calm evening landscape—warm, legible and never overlit.</p>
      </div>
      <div className="night-panels">
        {nightScenes.map((scene, index) => (
          <figure className="night-panel" key={scene.title} data-night-panel>
            <img src={scene.image} alt={`${scene.title} at Olfah during blue hour`} loading="lazy" />
            <figcaption>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><strong>{scene.title}</strong><small>{scene.label}</small></div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function PanoramaExperience() {
  const [scene, setScene] = useState('pool')
  const active = panoramaScenes.find((item) => item.id === scene) ?? panoramaScenes[0]

  return (
    <section id="panorama" className="panorama-experience" aria-labelledby="panorama-title">
      <div className="panorama-copy" data-reveal>
        <div>
          <p className="section-index">Eight immersive viewpoints</p>
          <h2 id="panorama-title" className="display-heading">Stand inside<br /><em>the landscape.</em></h2>
        </div>
        <div className="panorama-intro-copy">
          <p>Move through Olfah at eye level—from the pool and woodland walk to the central lawn, fitness plaza, evening promenade and a finished apartment.</p>
          <a className="button button-light" href={`/360/index.html?scene=${scene}`} target="_blank" rel="noreferrer">Open fullscreen <Arrow /></a>
        </div>
      </div>

      <div className="panorama-stage" data-panorama-stage>
        <iframe
          key={scene}
          src={`/360/index.html?scene=${scene}&embed=1`}
          title={`Interactive 360° view: ${active.title}`}
          loading="eager"
          allow="fullscreen; accelerometer; gyroscope"
        />
        <div className="panorama-stage-label" aria-hidden="true"><span>Now exploring</span><strong>{active.title}</strong></div>
      </div>

      <div className="panorama-scenes" role="group" aria-label="Choose a panorama scene">
        {panoramaScenes.map((item) => (
          <button key={item.id} type="button" className={scene === item.id ? 'is-active' : ''} aria-pressed={scene === item.id} onClick={() => setScene(item.id)}>
            <span className="panorama-thumb"><img src={item.image} alt="" aria-hidden="true" loading="lazy" /></span>
            <span className="panorama-scene-copy"><strong>{item.title}</strong><small>{item.note}</small></span>
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
            <p className="section-index">Location</p>
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
          <p className="section-index">Register your interest</p>
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
            <div><h3>Explore</h3><a href="#story">Community</a><a href="#amenities">Amenities</a><a href="#residences">Residences</a><a href="/enhanced/">Enhanced imagery</a></div>
            <div><h3>Connect</h3><a href="#location">Location</a><a href="#enquire">Enquire</a><a href="/assets/olfah-brochure.pdf" download>Brochure</a><a href="/360/index.html">360° experience</a></div>
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
    let active = true
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

        gsap.utils.toArray('[data-gallery-item]').forEach((element) => {
          const image = element.querySelector('img')
          if (!image) return
          gsap.fromTo(image,
            { scale: 0.92, opacity: 0.72 },
            {
              scale: 1,
              opacity: 1,
              ease: 'none',
              scrollTrigger: { trigger: element, start: 'top 94%', end: 'center 58%', scrub: 0.7 },
            },
          )
        })

        gsap.from('[data-residence]', {
          y: 76,
          opacity: 0,
          stagger: 0.14,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.residence-grid', start: 'top 82%', end: 'top 48%', scrub: 0.8 },
        })

        gsap.utils.toArray('[data-night-panel]').forEach((panel) => {
          const image = panel.querySelector('img')
          gsap.fromTo(image,
            { scale: 1.08 },
            { scale: 1, ease: 'none', scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
          )
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
        const leave = () => gsap.to(element, { x: 0, y: 0, duration: 0.55, ease: 'power4.out' })
        element.addEventListener('pointermove', move)
        element.addEventListener('pointerleave', leave)
      })
    }, appRef)

    document.fonts.ready.then(() => {
      if (!active) return
      ScrollTrigger.refresh()
      if (jump !== null) {
        window.scrollTo(0, Number(jump) || 0)
        ScrollTrigger.update()
      }
      requestAnimationFrame(() => { window.__ready = true })
    })

    return () => {
      active = false
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
      <main className="w-full max-w-full overflow-x-hidden">
        <Hero activeScene={activeScene} setActiveScene={setActiveScene} />
        <Story />
        <Amenities />
        <Destination />
        <Residences />
        <AfterDark />
        <PanoramaExperience />
        <Gallery openLightbox={setLightbox} />
        <Location />
        <Enquiry />
      </main>
      <Footer />
      <Lightbox lightbox={lightbox} close={() => setLightbox(null)} move={moveLightbox} />
    </div>
  )
}
