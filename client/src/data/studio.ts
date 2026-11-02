export const business = {
  name: "Studio K – Photography & Film",
  brand: "STUDIO K",
  contactPerson: "Babu N",
  phones: ["8667073847", "9171000563"],
  email: "studiokbabu@gmail.com",
  address: "17/9, Gulam Murthuzа Street, Ellis Road, Chennai – 600002.",
  mapQuery: "17/9, Gulam Murthuzа Street, Ellis Road, Chennai 600002",
  generalEnquiry:
    "Hello Studio K, I would like to enquire about your photography and videography services.",
};

export type Service = {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: "screen" | "film" | "booth" | "camera" | "album" | "baby" | "stream" | "drone" | "id" | "frame" | "restore" | "tape";
};

export const services: Service[] = [
  {
    number: "01",
    title: "LED Mega Wall",
    description: "Large-format LED display sales and rental for wedding stages, receptions and live moments.",
    image: "/images/led-mega-wall.png",
    alt: "Illuminated LED mega wall at an event stage",
    icon: "screen",
  },
  {
    number: "02",
    title: "Full HD / 4K Cinematic Videography",
    description: "Thoughtful camera work, polished edits and cinematic coverage in Full HD and 4K.",
    image: "/images/cinematic-videography.jpg",
    alt: "Wedding filmmaker working with professional cinema equipment",
    icon: "film",
  },
  {
    number: "03",
    title: "360° Video Booth",
    description: "A lively 360° capture experience for guests, celebrations and unforgettable entrances.",
    image: "/images/video-booth-360.jpg",
    alt: "Guests enjoying a 360-degree event video booth",
    icon: "booth",
  },
  {
    number: "04",
    title: "Candid Photography",
    description: "Unposed glances, joyful embraces and the in-between moments that make the day yours.",
    image: "/images/candid-a-quiet-promise.jpg",
    alt: "A couple sharing a quiet moment at their wedding",
    icon: "camera",
  },
  {
    number: "05",
    title: "Synthetic Special Album",
    description: "A considered album design that brings your favourite images together in print.",
    image: "/images/special-albums-finer-details.jpg",
    alt: "Hands opening a carefully finished wedding album",
    icon: "album",
  },
  {
    number: "06",
    title: "Newborn & Toddler Photography",
    description: "Gentle, patient portrait sessions that preserve your little one’s earliest expressions.",
    image: "/images/newborn-family.jpg",
    alt: "A quiet newborn and family portrait session",
    icon: "baby",
  },
  {
    number: "07",
    title: "HD Live Streaming",
    description: "Share the ceremony with family and friends who cannot be there in person.",
    image: "/images/live-streaming.png",
    alt: "Professional HD live streaming broadcast camera with multi-antenna transmitter",
    icon: "stream",
  },
  {
    number: "08",
    title: "Helicam — Drone Photography & Videography",
    description: "Aerial perspectives that reveal the scale and setting of a celebration.",
    image: "/images/drone.png",
    alt: "Professional aerial cinema drone in flight",
    icon: "drone",
  },
  {
    number: "09",
    title: "Multiple Types of Identity Cards",
    description: "Clear, well-lit portrait photography prepared for a range of identity-card needs.",
    image: "/images/identity-cards.png",
    alt: "Custom corporate and institutional identity card with lanyard",
    icon: "id",
  },
  {
    number: "10",
    title: "Instant Photo Mirror Booth",
    description: "An interactive mirror-booth moment with instant keepsakes for your guests.",
    image: "/images/mirror-booth.jpg",
    alt: "Interactive gold-framed magic mirror photo booth setup with studio lights",
    icon: "booth",
  },
  {
    number: "11",
    title: "Imported Frame Lamination",
    description: "Finish a favourite photograph with considered framing and a polished protective finish.",
    image: "/images/frame-lamination.jpg",
    alt: "A craftsperson finishing a framed wedding portrait",
    icon: "frame",
  },
  {
    number: "12",
    title: "Restoration of Old Photos",
    description: "Give treasured photographs renewed clarity while honouring their original character.",
    image: "/images/photo-restoration.jpg",
    alt: "A restored vintage family photograph being handled with care",
    icon: "restore",
  },
  {
    number: "13",
    title: "All Types of Tape to Pendrive Conversion",
    description: "Move family tapes into a convenient digital format, ready to revisit and share.",
    image: "/images/tape-to-pendrive.png",
    alt: "Video tapes and a USB drive at a digitization workstation",
    icon: "tape",
  },
];

export const portfolioCategories = [
  "All stories",
  "Wedding Photography",
  "Wedding Cinematography",
  "Candid Photography",
  "Pre-Wedding Shoots",
  "Baby & Toddler Photography",
  "Events",
  "Portrait Photography",
  "Drone Cinematography",
  "Special Albums",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export type PortfolioItem = {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, "All stories">;
  image: string;
  alt: string;
  shape: "tall" | "wide" | "square";
};

export const portfolio: PortfolioItem[] = [
  {
    id: "ritual-light",
    title: "Ritual in the evening light",
    category: "Wedding Photography",
    image: "/images/ritual-in-the-evening-light.jpg",
    alt: "Indian wedding couple framed in warm evening light",
    shape: "tall",
  },
  {
    id: "quiet-promise",
    title: "A quiet promise",
    category: "Candid Photography",
    image: "/images/candid-a-quiet-promise.jpg",
    alt: "A couple sharing an intimate wedding moment",
    shape: "wide",
  },
  {
    id: "the-finer-details",
    title: "The finer details",
    category: "Special Albums",
    image: "/images/special-albums-finer-details.jpg",
    alt: "A fine-art wedding album displayed on a studio table",
    shape: "square",
  },
  {
    id: "bride-before-the-vows",
    title: "Radiant Bride",
    category: "Portrait Photography",
    image: "/images/bride.jpg",
    alt: "Radiant bride in traditional wedding attire",
    shape: "tall",
  },
  {
    id: "a-day-in-motion",
    title: "A day in motion",
    category: "Wedding Cinematography",
    image: "/images/cinematic-videography.jpg",
    alt: "A wedding filmmaker framing a couple ceremony",
    shape: "wide",
  },
  {
    id: "small-wonder",
    title: "A small wonder",
    category: "Baby & Toddler Photography",
    image: "/images/baby-toddler-small-wonder.png",
    alt: "A peaceful newborn baby cradled in loving hands",
    shape: "square",
  },
  {
    id: "from-above",
    title: "Silhouette of Two Souls",
    category: "Drone Cinematography",
    image: "/images/backlit-portrait.jpg",
    alt: "Silhouette of two souls in warm golden light",
    shape: "wide",
  },
  {
    id: "gathered-together",
    title: "Shadow Portrait",
    category: "Events",
    image: "/images/portrait.jpg",
    alt: "Artistic portrait with light and shadow",
    shape: "tall",
  },
  {
    id: "before-the-first-look",
    title: "Mehendi Moments",
    category: "Pre-Wedding Shoots",
    image: "/images/bride-and-groom.jpg",
    alt: "A couple photographed during celebrations",
    shape: "square",
  },
];

export type FilmItem = {
  title: string;
  category: string;
  description: string;
  poster: string;
  source: string;
  credit: string;
};

export const films: FilmItem[] = [
  {
    title: "Rituals, in the moment",
    category: "South Indian wedding · 5 sec preview",
    description: "A short free-stock sample of a South Indian wedding ritual.",
    poster: "/images/backlit-portrait.jpg",
    source: "https://videos.pexels.com/video-files/31139763/13305464_1920_1080_50fps.mp4",
    credit: "Anandu Mohan Mr · Pexels",
  },
  {
    title: "The moments between",
    category: "Wedding highlight · 6 sec preview",
    description: "A short free-stock sample focused on intimate wedding moments.",
    poster: "/images/bride-and-groom.jpg",
    source: "https://videos.pexels.com/video-files/31139774/13305463_1920_1080_50fps.mp4",
    credit: "Anandu Mohan Mr · Pexels",
  },
  {
    title: "A portrait in motion",
    category: "Bridal film · 4 sec preview",
    description: "A short free-stock sample of a bride in traditional attire.",
    poster: "/images/bride.jpg",
    source: "https://videos.pexels.com/video-files/31139767/13305418_1920_1080_50fps.mp4",
    credit: "Anandu Mohan Mr · Pexels",
  },
  {
    title: "A little outside the frame",
    category: "Outdoor couple · 5 sec preview",
    description: "A short free-stock sample of a couple outdoors after their ceremony.",
    poster: "/images/groom.jpg",
    source: "https://videos.pexels.com/video-files/31262060/13350808_1920_1080_50fps.mp4",
    credit: "Anandu Mohan Mr · Pexels",
  },
];

export function whatsappHref(message = business.generalEnquiry, number = business.phones[0]) {
  const internationalNumber = `91${number.replace(/\D/g, "")}`;
  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(message)}`;
}

export function mapsHref() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapQuery)}`;
}
