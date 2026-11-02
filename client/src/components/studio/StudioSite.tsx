import {
  Aperture,
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Baby,
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  Clapperboard,
  Film,
  Frame,
  HardDrive,
  Heart,
  IdCard,
  Mail,
  Maximize2,
  MapPin,
  Menu,
  MessageCircle,
  MonitorPlay,
  Pause,
  Phone,
  Plane,
  Play,
  Radio,
  RefreshCcw,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  business,
  films,
  mapsHref,
  portfolio,
  portfolioCategories,
  services,
  whatsappHref,
  type FilmItem,
  type PortfolioCategory,
  type PortfolioItem,
  type Service,
} from "@/data/studio";

type LightboxState =
  | { type: "photo"; item: PortfolioItem }
  | { type: "film"; item: FilmItem }
  | null;

type EnquiryForm = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  location: string;
  services: string[];
  notes: string;
};

const serviceIcons: Record<Service["icon"], LucideIcon> = {
  screen: MonitorPlay,
  film: Clapperboard,
  booth: Sparkles,
  camera: Camera,
  album: BookOpen,
  baby: Baby,
  stream: Radio,
  drone: Plane,
  id: IdCard,
  frame: Frame,
  restore: RefreshCcw,
  tape: HardDrive,
};

const reasons = [
  "Professional photography",
  "Full HD & 4K production",
  "Creative cinematography",
  "Advanced camera equipment",
  "Experienced creative team",
  "Premium album design",
  "Professional editing",
  "Memorable customer experiences",
];

const eventOptions = [
  "Wedding",
  "Pre-wedding",
  "Engagement",
  "Baby & toddler",
  "Family portrait",
  "Birthday or celebration",
  "Corporate event",
  "Other",
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand-lockup ${light ? "brand-lockup-light" : ""}`} href="#home" aria-label="Studio K home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="19.25" />
          <path d="M13.5 12.5v19M14 22l17-10M14 22l17 10M25.4 15.3l5.2 6.7-5.2 6.7" />
          <circle cx="22" cy="22" r="3.2" />
        </svg>
      </span>
      <span className="brand-type">
        <strong>STUDIO K</strong>
        <span>PHOTOGRAPHY & FILM</span>
      </span>
    </a>
  );
}

function SectionIntro({
  index,
  eyebrow,
  title,
  copy,
  light = false,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-intro ${light ? "section-intro-light" : ""}`}>
      <div className="section-intro-top">
        <span className="section-index">{index}</span>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function ParallaxPhoto({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(imageProgress, [0, 1], ["-5%", "5%"]);
  return <motion.img ref={imageRef} className={className} src={src} alt={alt} loading="lazy" style={{ y: imageY, scale: 1.08 }} />;
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.72, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function FilmPlayer({ film }: { film: FilmItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateTime = () => setCurrentTime(video.currentTime || 0);
    const updateDuration = () => setDuration(video.duration || 0);
    const updatePlay = () => setPlaying(!video.paused);
    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("play", updatePlay);
    video.addEventListener("pause", updatePlay);
    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("play", updatePlay);
      video.removeEventListener("pause", updatePlay);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "0:00";
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  };

  return (
    <div className="film-player" ref={undefined}>
      <video
        ref={videoRef}
        className="film-player-video"
        src={film.source}
        poster={film.poster}
        playsInline
        autoPlay
        onClick={togglePlay}
        aria-label={`${film.title} film preview`}
      />
      <div className="film-player-controls" aria-label="Video controls">
        <button type="button" onClick={togglePlay} aria-label={playing ? "Pause film" : "Play film"}>
          {playing ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
        </button>
        <span className="film-time">{formatTime(currentTime)}</span>
        <input
          aria-label="Film progress"
          className="film-seek"
          type="range"
          min={0}
          max={duration || 1}
          step={0.1}
          value={Math.min(currentTime, duration || 1)}
          onChange={(event) => {
            const video = videoRef.current;
            if (video) video.currentTime = Number(event.target.value);
          }}
        />
        <span className="film-time">{formatTime(duration)}</span>
        <button
          type="button"
          onClick={() => {
            const video = videoRef.current;
            if (video) {
              video.muted = !video.muted;
              setMuted(video.muted);
            }
          }}
          aria-label={muted ? "Unmute film" : "Mute film"}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
        <button
          type="button"
          onClick={() => {
            const element = videoRef.current?.parentElement;
            if (element?.requestFullscreen) void element.requestFullscreen();
          }}
          aria-label="View film fullscreen"
        >
          <Maximize2 size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function Modal({
  children,
  onClose,
  label,
  className = "",
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
  className?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className={`modal-backdrop ${className}`}
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.99 }}
        transition={{ duration: 0.28 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function ServiceCard({
  service,
  onOpen,
}: {
  service: Service;
  onOpen: (service: Service) => void;
}) {
  const Icon = serviceIcons[service.icon];
  return (
    <article className="service-card">
      <button className="service-card-open" type="button" onClick={() => onOpen(service)} aria-label={`Explore ${service.title}`}>
        <div className="service-image-wrap">
          <img src={service.image} alt={service.alt} loading="lazy" />
          <span className="service-number">{service.number}</span>
          <span className="service-card-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
        </div>
        <div className="service-card-body">
          <div className="service-card-title-row">
            <span className="service-icon"><Icon size={17} strokeWidth={1.6} /></span>
            <h3>{service.title}</h3>
          </div>
          <p>{service.description}</p>
          <span className="text-link">Explore Service <ArrowRight size={14} /></span>
        </div>
      </button>
      <a
        className="service-whatsapp"
        href={whatsappHref(`${business.generalEnquiry} I am interested in ${service.title}.`)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Enquire on WhatsApp about ${service.title}`}
      >
        <MessageCircle size={13} />
      </a>
    </article>
  );
}

function StudioCursor() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;
    const cursor = document.querySelector<HTMLElement>(".studio-cursor");
    if (!cursor) return;
    const move = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    const active = () => cursor.classList.add("is-visible");
    const inactive = () => cursor.classList.remove("is-visible");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", active);
    document.addEventListener("pointerout", inactive);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", active);
      document.removeEventListener("pointerout", inactive);
    };
  }, []);
  return <span className="studio-cursor" aria-hidden="true"><span /></span>;
}

function StudioSite() {
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<PortfolioCategory>("All stories");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formMessage, setFormMessage] = useState("");
  const [followUpUrl, setFollowUpUrl] = useState("");
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroY = useTransform(scrollYProgress, [0, 0.28], ["0%", "14%"]);
  const filteredPortfolio = useMemo(
    () => category === "All stories" ? portfolio : portfolio.filter((item) => item.category === category),
    [category],
  );
  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left - bounds.width / 2;
    const offsetY = event.clientY - bounds.top - bounds.height / 2;
    event.currentTarget.style.setProperty("--hero-mouse-x", `${-offsetX * 0.007}px`);
    event.currentTarget.style.setProperty("--hero-mouse-y", `${-offsetY * 0.005}px`);
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), reducedMotion ? 0 : 650);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const magnets = Array.from(document.querySelectorAll<HTMLElement>(".button, .header-booking, .footer-back-top"));
    const move = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - (bounds.left + bounds.width / 2)) * 0.08;
      const y = (event.clientY - (bounds.top + bounds.height / 2)) * 0.08;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const reset = (event: PointerEvent) => {
      (event.currentTarget as HTMLElement).style.transform = "";
    };
    magnets.forEach((element) => {
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", reset);
    });
    return () => magnets.forEach((element) => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
    });
  }, []);

  const openWhatsApp = (service?: string) => {
    const message = service
      ? `${business.generalEnquiry} I am interested in ${service}.`
      : business.generalEnquiry;
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
  };

  const toggleRequiredService = (name: string) => {
    setSelectedServices((current) => current.includes(name)
      ? current.filter((item) => item !== name)
      : [...current, name]);
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      "Hello Studio K, I would like to enquire about your photography and videography services.",
      "",
      `Name: ${String(data.get("name") ?? "")}`,
      `Phone: ${String(data.get("phone") ?? "")}`,
      `Email: ${String(data.get("email") ?? "")}`,
      `Event: ${String(data.get("eventType") ?? "")}`,
      `Event date: ${String(data.get("eventDate") ?? "")}`,
      `Location: ${String(data.get("location") ?? "")}`,
      `Services: ${selectedServices.length ? selectedServices.join(", ") : "Not selected"}`,
      `Additional requirements: ${String(data.get("notes") ?? "") || "None"}`,
    ].join("\n");
    const url = whatsappHref(message);
    setFollowUpUrl(url);
    setFormMessage("Your enquiry is prepared. Continue in WhatsApp and tap send to reach Studio K.");
    window.open(url, "_blank", "noopener,noreferrer");
    form.reset();
    setSelectedServices([]);
  };

  const closeService = () => setSelectedService(null);
  const closeLightbox = () => setLightbox(null);

  return (
    <div className="studio-site">
      <motion.div className="scroll-progress" style={{ scaleX: progressScale }} aria-hidden="true" />
      <StudioCursor />

      <AnimatePresence>
        {loading && (
          <motion.div className="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} aria-label="Loading Studio K">
            <div className="preloader-inner">
              <Logo light />
              <div className="preloader-line"><span /></div>
              <span className="preloader-note">A story is coming into focus</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`site-header ${menuOpen ? "menu-open" : ""}`}>
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#work">Selected work</a>
          <a href="#story">Our story</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-booking" href="#booking">Book your experience <ArrowUpRight size={15} /></a>
        <button
          className="mobile-menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} aria-label="Mobile navigation">
              {[["Services", "#services"], ["Selected work", "#work"], ["Film", "#films"], ["Our story", "#story"], ["Contact", "#contact"]].map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={15} /></a>
              ))}
              <a className="mobile-nav-cta" href="#booking" onClick={() => setMenuOpen(false)}>Book your experience <ArrowRight size={15} /></a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section
          className="hero-section"
          id="home"
          aria-labelledby="hero-title"
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--hero-mouse-x", "0px");
            event.currentTarget.style.setProperty("--hero-mouse-y", "0px");
          }}
        >
          <motion.div className="hero-media" style={{ y: heroY }} aria-hidden="true">
            <img className="hero-poster" src="/images/backlit-portrait.jpg" alt="Studio K wedding photography" fetchPriority="high" />
            <video autoPlay muted loop playsInline poster="/images/backlit-portrait.jpg">
              <source src="https://videos.pexels.com/video-files/31139763/13305464_1920_1080_50fps.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-spark hero-spark-one" aria-hidden="true" />
          <div className="hero-spark hero-spark-two" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-kicker"><span /> CHENNAI · PHOTOGRAPHY & FILM</div>
            <motion.h1
              id="hero-title"
              aria-label="WE CAPTURE WHAT WORDS CANNOT EXPRESS."
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.055, delayChildren: 0.2 } } }}
            >
              <span className="hero-line">
                {"WE CAPTURE".split("").map((letter, index) => <motion.span key={`a-${index}`} aria-hidden="true" variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.52 }}>{letter === " " ? "\u00a0" : letter}</motion.span>)}
              </span>
              <span className="hero-line hero-line-accent">
                {"WHAT WORDS".split("").map((letter, index) => <motion.span key={`b-${index}`} aria-hidden="true" variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.52 }}>{letter === " " ? "\u00a0" : letter}</motion.span>)}
              </span>
              <span className="hero-line hero-line-italic">
                {"CANNOT EXPRESS.".split("").map((letter, index) => <motion.span key={`c-${index}`} aria-hidden="true" variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.52 }}>{letter === " " ? "\u00a0" : letter}</motion.span>)}
              </span>
            </motion.h1>
            <motion.p className="hero-copy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}>
              Photography & Film — Preserving your most beautiful moments, one frame at a time.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.7 }}>
              <a className="button button-gold" href="#work">Explore Our Work <ArrowDownRight size={16} /></a>
              <a className="button button-quiet" href="#booking">Book Your Experience <ArrowUpRight size={16} /></a>
            </motion.div>
          </div>
          <div className="hero-side-note"><span>01</span><i /> EVERY FRAME TELLS A STORY</div>
          <a className="hero-scroll" href="#opening-note"><span>Scroll to explore</span><ArrowDown size={15} /></a>
          <div className="hero-bottom-meta"><span>WEDDINGS · PORTRAITS · FILM</span><span>13°04' N&nbsp; 80°16' E</span></div>
          <span className="hero-credit">Hero film preview · Pexels</span>
        </section>

        <section className="opening-note" id="opening-note">
          <Reveal className="opening-note-copy">
            <span className="eyebrow">A FRAME. A FEELING. A FOREVER.</span>
            <p>Some moments deserve more than a photograph. They deserve to be <em>felt again.</em></p>
            <span className="opening-signature">STUDIO K <span>·</span> CHENNAI, INDIA</span>
          </Reveal>
          <Reveal className="opening-note-image" delay={0.12}>
            <ParallaxPhoto src="/images/candid-a-quiet-promise.jpg" alt="A couple sharing a candid moment in traditional wedding attire" />
            <span className="image-caption">THE PAUSE BETWEEN THE MOMENTS</span>
          </Reveal>
          <div className="opening-side-number" aria-hidden="true">K / 01</div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="section-shell">
            <div className="services-heading-row">
              <SectionIntro index="02" eyebrow="Made for every kind of memory" title={<>A thoughtful eye.<br /><em>Every detail.</em></>} copy="From the first photograph to the final frame, every part of the experience is considered." />
              <div className="services-side-copy">
                <p>One celebration, many ways to remember it. Explore a selection of photography, film and keepsake services.</p>
                <a className="text-link" href="#booking">Discuss your event <ArrowUpRight size={15} /></a>
              </div>
            </div>
            <div className="service-grid">
              {services.map((service, index) => (
                <Reveal key={service.number} className={`service-grid-cell service-grid-cell-${index + 1}`} delay={(index % 3) * 0.06}>
                  <ServiceCard service={service} onOpen={setSelectedService} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="portfolio-section section-pad" id="work">
          <div className="section-shell">
            <div className="portfolio-header">
              <SectionIntro index="03" eyebrow="Selected visual stories" title={<>Moments, <em>kept close.</em></>} copy="A small window into celebrations, portraits and the quiet details around them." />
              <div className="portfolio-mark" aria-hidden="true"><Aperture size={54} strokeWidth={0.7} /><span>STORIES<br />IN STILLNESS</span></div>
            </div>
            <div className="portfolio-filters" role="group" aria-label="Filter portfolio by category">
              {portfolioCategories.map((item) => (
                <button key={item} type="button" className={category === item ? "is-active" : ""} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>
              ))}
            </div>
            <div className="portfolio-horizontal" aria-label="Horizontal preview gallery">
              {filteredPortfolio.slice(0, 5).map((item) => (
                <button key={`reel-${item.id}`} type="button" onClick={() => setLightbox({ type: "photo", item })} aria-label={`Open ${item.title}`}>
                  <img src={item.image} alt="" loading="lazy" />
                  <span>{item.category}</span>
                </button>
              ))}
            </div>
            <div className="portfolio-masonry" aria-live="polite">
              {filteredPortfolio.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`portfolio-tile portfolio-tile-${item.shape}`}
                  type="button"
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: index * 0.035 }}
                  onClick={() => setLightbox({ type: "photo", item })}
                  aria-label={`View ${item.title}, ${item.category}`}
                >
                  <img src={item.image} alt={item.alt} loading="lazy" />
                  <span className="portfolio-tile-shade" />
                  <span className="portfolio-tile-info"><span><small>{item.category}</small><strong>{item.title}</strong></span><span className="portfolio-tile-open"><ArrowUpRight size={18} /></span></span>
                </motion.button>
              ))}
            </div>
            <p className="visual-preview-note">Editorial visual previews are shown here; replace with Studio K’s own commissioned work before representing them as client stories.</p>
          </div>
        </section>

        <section className="film-section" id="films">
          <div className="film-backdrop" aria-hidden="true">
            <img src="/images/backlit-portrait.jpg" alt="" loading="lazy" />
            <span />
          </div>
          <div className="film-content section-shell">
            <div className="film-heading">
              <SectionIntro index="04" eyebrow="Film, with feeling" title={<>The day, <em>in motion.</em></>} copy="The glances, gestures and atmosphere that a still frame can only begin to tell." light />
              <span className="film-reel-label"><span className="reel-dot" /> CINEMATIC FILM PREVIEWS</span>
            </div>
            <div className="film-coverage-tags" aria-label="Film coverage formats"><span>Wedding highlights</span><span>Cinematic trailers</span><span>Event coverage</span><span>Drone footage</span><span>Special moments</span></div>
            <div className="film-grid">
              {films.slice(0, 3).map((film, index) => (
                <Reveal key={film.title} className={`film-card film-card-${index + 1}`} delay={index * 0.08}>
                  <button type="button" className="film-card-button" onClick={() => setLightbox({ type: "film", item: film })} aria-label={`Play ${film.title}`}>
                    <span className="film-card-image"><img src={film.poster} alt="" loading="lazy" /><span className="film-play"><Play size={18} fill="currentColor" /></span><span className="film-duration">{index === 1 ? "00:06" : index === 2 ? "00:04" : "00:05"}</span></span>
                    <span className="film-card-meta"><span><small>{film.category}</small><strong>{film.title}</strong></span><ArrowUpRight size={17} /></span>
                  </button>
                </Reveal>
              ))}
            </div>
            <div className="film-disclosure">Short sample clips from Pexels · {films.slice(0, 3).map((film, index) => <span key={film.title}>{index > 0 && " · "}<a href={index === 0 ? "https://www.pexels.com/video/elegant-south-indian-wedding-rituals-captured-31139763/" : index === 1 ? "https://www.pexels.com/video/intimate-south-indian-wedding-moments-captured-31139774/" : "https://www.pexels.com/video/elegant-south-indian-bride-moments-captured-31139767/"} target="_blank" rel="noreferrer">{film.credit}</a></span>)}. These are visual previews, not Studio K commissions.</div>
          </div>
        </section>

        <section className="why-section section-pad">
          <div className="section-shell why-layout">
            <div className="why-intro">
              <SectionIntro index="05" eyebrow="Why Choose Studio K?" title={<>Craft you can <em>feel.</em></>} copy="The details that shape a calm, considered experience—from planning through the final edit." />
              <div className="why-stamp"><span>STUDIO</span><strong>K</strong><span>PHOTOGRAPHY<br />& FILM</span></div>
            </div>
            <div className="why-list">
              {reasons.map((reason, index) => (
                <Reveal key={reason} delay={index * 0.035}>
                  <div className="why-row"><span className="why-index">0{index + 1}</span><span>{reason}</span><ArrowUpRight size={16} /></div>
                </Reveal>
              ))}
              <p className="why-note">Every story is different. We listen first, then shape the experience around what matters to you.</p>
            </div>
          </div>
        </section>

        <section className="story-section" id="story">
          <div className="story-image">
            <ParallaxPhoto src="/images/photographer.jpg" alt="Studio K founder and photographer Babu N with camera" />
            <span className="story-image-label">BEHIND THE FRAME <i /> STUDIO K</span>
          </div>
          <div className="story-copy">
            <SectionIntro index="06" eyebrow="A note from the studio" title={<>BEHIND EVERY<br />FRAME IS <em>A STORY.</em></>} />
            <p className="story-lede">The photographs we return to are rarely just photographs.</p>
            <p>They bring back the warmth of a room, a familiar voice, the small gesture that meant everything. Studio K is devoted to noticing those details and preserving them with care.</p>
            <p>From photography and film to albums and keepsakes, our work is shaped around the people and moments that matter to you.</p>
            <a className="text-link" href="#booking">Tell us what you’re celebrating <ArrowRight size={15} /></a>
            <span className="story-signoff">With care, <em>Studio K</em></span>
          </div>
        </section>

        <section className="booking-section section-pad" id="booking">
          <div className="section-shell booking-layout">
            <div className="booking-intro">
              <SectionIntro index="07" eyebrow="Start a conversation" title={<>Let’s make<br /><em>room for the moment.</em></>} copy="Tell us a little about your plans. We’ll prepare your enquiry so you can send it directly to Studio K on WhatsApp." />
              <div className="booking-note"><span className="note-icon"><Heart size={16} /></span><p>No automated booking confirmation. Your message goes only when you choose to send it in WhatsApp.</p></div>
              <a className="button button-outline" href={whatsappHref()} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Message us on WhatsApp</a>
            </div>
            <form className="booking-form" onSubmit={submitEnquiry}>
              <div className="form-header"><span>YOUR ENQUIRY</span><span>01 / 03</span></div>
              <div className="form-grid">
                <label className="form-field"><span>Full name <i>*</i></span><input name="name" autoComplete="name" placeholder="Your name" required /></label>
                <label className="form-field"><span>Phone number <i>*</i></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" pattern="[0-9+()\-\s]{7,20}" title="Enter a valid phone number" placeholder="+91" required /></label>
                <label className="form-field"><span>Email <i>*</i></span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
                <label className="form-field"><span>Event type <i>*</i></span><select name="eventType" defaultValue="" required><option value="" disabled>Select an occasion</option>{eventOptions.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label>
                <label className="form-field"><span>Event date <i>*</i></span><input name="eventDate" type="date" required /></label>
                <label className="form-field"><span>Event location <i>*</i></span><input name="location" autoComplete="street-address" placeholder="City or venue" required /></label>
              </div>
              <fieldset className="service-select-field">
                <legend>Services you’re interested in <span>(select all that apply)</span></legend>
                <div className="service-check-grid">
                  {services.map((service) => (
                    <label key={service.number} className={`service-check ${selectedServices.includes(service.title) ? "selected" : ""}`}>
                      <input type="checkbox" checked={selectedServices.includes(service.title)} onChange={() => toggleRequiredService(service.title)} />
                      <span className="check-box"><Check size={11} /></span>
                      <span>{service.title}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="form-field form-notes"><span>Additional requirements</span><textarea name="notes" rows={3} placeholder="Anything else you’d like us to know?" /></label>
              <div className="form-submit-row">
                <button className="button button-gold" type="submit">Prepare WhatsApp enquiry <Send size={15} /></button>
                <span>Fields marked <i>*</i> are required</span>
              </div>
              <AnimatePresence>
                {formMessage && (
                  <motion.div className="form-success" role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                    <span className="success-check"><Check size={14} /></span>
                    <div><strong>{formMessage}</strong><a href={followUpUrl} target="_blank" rel="noreferrer">Open WhatsApp again <ArrowUpRight size={13} /></a></div>
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="form-privacy">Your details are placed into your WhatsApp message; this page does not store or send them to a server.</span>
            </form>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-top section-shell">
            <SectionIntro index="08" eyebrow="Find the studio" title={<>Close to home.<br /><em>Made for your story.</em></>} copy="Come by, call or send us a note. We’d love to hear what you have in mind." light />
            <a className="contact-map-cta" href={mapsHref()} target="_blank" rel="noreferrer">Open directions <ArrowUpRight size={15} /></a>
          </div>
          <div className="contact-grid section-shell">
            <div className="contact-details">
              <div className="contact-detail"><span className="contact-icon"><MapPin size={17} /></span><div><small>VISIT</small><p>{business.address}</p><a href={mapsHref()} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={14} /></a></div></div>
              <div className="contact-detail"><span className="contact-icon"><Phone size={17} /></span><div><small>CALL / WHATSAPP</small><p><a href="tel:+918667073847">+91 86670 73847</a><br /><a href="tel:+919171000563">+91 91710 00563</a></p><a href={whatsappHref()} target="_blank" rel="noreferrer">Start a WhatsApp enquiry <ArrowUpRight size={14} /></a></div></div>
              <div className="contact-detail"><span className="contact-icon"><Mail size={17} /></span><div><small>WRITE</small><p><a href={`mailto:${business.email}`}>{business.email}</a></p><a href={`mailto:${business.email}`}>Send an email <ArrowUpRight size={14} /></a></div></div>
              <div className="contact-person"><span>YOUR CONTACT</span><strong>Babu N</strong><span>Studio K — Photography & Film</span></div>
            </div>
            <div className="contact-map-wrap">
              <iframe
                title="Map showing Studio K at Ellis Road, Chennai"
                src={`https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a className="map-overlay-link" href={mapsHref()} target="_blank" rel="noreferrer">17/9, Gulam Murthuzа Street <span>CHENNAI · 600002</span><ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main section-shell">
          <div className="footer-brand"><Logo light /><p>Every frame tells a story.<br />Let’s preserve yours.</p></div>
          <div className="footer-nav"><span>EXPLORE</span><a href="#services">Services</a><a href="#work">Selected work</a><a href="#films">Film</a><a href="#story">Our story</a></div>
          <div className="footer-nav"><span>CONNECT</span><a href={whatsappHref()} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={12} /></a><a href={`mailto:${business.email}`}>Email <ArrowUpRight size={12} /></a><a href={mapsHref()} target="_blank" rel="noreferrer">Directions <ArrowUpRight size={12} /></a></div>
          <a className="footer-back-top" href="#home" aria-label="Back to top"><ArrowUpRight size={19} /></a>
        </div>
        <div className="footer-bottom section-shell"><span>© {new Date().getFullYear()} STUDIO K · PHOTOGRAPHY & FILM</span><span>MADE WITH ATTENTION IN CHENNAI</span><span>VISUAL PREVIEW IMAGERY IS NOT A CLAIM OF STUDIO K CLIENT WORK</span></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappHref()} target="_blank" rel="noreferrer" aria-label="Enquire with Studio K on WhatsApp">
        <MessageCircle size={19} /><span>Enquire</span>
      </a>

      <AnimatePresence>
        {selectedService && (
          <Modal onClose={closeService} label={`${selectedService.title} service details`} className="service-modal-backdrop">
            <button type="button" className="modal-close" onClick={closeService} aria-label="Close service details"><X size={19} /></button>
            <div className="service-modal-image"><img src={selectedService.image} alt={selectedService.alt} /><span>{selectedService.number} / STUDIO K SERVICES</span></div>
            <div className="service-modal-copy"><span className="eyebrow">A STUDIO K SERVICE</span><h2>{selectedService.title}</h2><p>{selectedService.description}</p><p>Tell us what you’re planning and we’ll help you choose an approach that fits the moment, the people and the place.</p><a className="button button-gold" href={whatsappHref(`${business.generalEnquiry} I am interested in ${selectedService.title}.`)} target="_blank" rel="noreferrer">Enquire about this service <MessageCircle size={15} /></a></div>
          </Modal>
        )}
        {lightbox && (
          <Modal onClose={closeLightbox} label={lightbox.type === "photo" ? lightbox.item.title : lightbox.item.title} className="lightbox-backdrop">
            <button type="button" className="modal-close" onClick={closeLightbox} aria-label="Close fullscreen view"><X size={19} /></button>
            {lightbox.type === "photo" ? (
              <div className="lightbox-photo"><img src={lightbox.item.image} alt={lightbox.item.alt} /><div className="lightbox-caption"><span>{lightbox.item.category}</span><strong>{lightbox.item.title}</strong></div></div>
            ) : (
              <div className="lightbox-film"><FilmPlayer key={lightbox.item.source} film={lightbox.item} /><div className="lightbox-caption"><span>{lightbox.item.category}</span><strong>{lightbox.item.title}</strong><small>{lightbox.item.credit} · Stock footage preview, not Studio K work</small></div></div>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default StudioSite;
