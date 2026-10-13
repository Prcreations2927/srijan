import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  FileSpreadsheet, 
  PhoneCall, 
  CheckCircle,
  ArrowUpRight,
  TrendingUp,
  Award,
  Zap,
  Volume2,
  VolumeX,
  Star,
  Camera,
  Heart,
  Sparkles,
  Phone,
  X,
  Eye
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
} from 'recharts';

// --- Wedding Photography Data ---
const WEDDING_PHOTOS = [
  {
    id: 1,
    title: 'The Royal Mandap & Sacred Vows',
    category: 'Royal Wedding',
    location: 'Patna Heritage Palace',
    src: '/src/assets/images/wedding_royal_couple_1791885160806.jpg',
    description: 'A regal candid moment capturing timeless love and royal grandeur under the floral canopy.'
  },
  {
    id: 2,
    title: 'Haldi Ke Rang & Pure Laughter',
    category: 'Haldi Celebrations',
    location: 'Ganga Riverside Resort',
    src: '/src/assets/images/wedding_haldi_celebration_1791885160946.jpg',
    description: 'Joyous turmeric splashes, flying marigold petals, and spontaneous candid family laughter.'
  },
  {
    id: 3,
    title: 'The Grand Varmala & Fireworks',
    category: 'Varmala & Stage',
    location: 'Grand Lawn Gala',
    src: '/src/assets/images/wedding_varmala_exchange_1791885161251.jpg',
    description: 'Cold pyrotechnic sparkle fireworks lighting up the garland exchange with pure cinematic romance.'
  },
  {
    id: 4,
    title: 'Sunset Palace Pre-Wedding Romance',
    category: 'Pre-Wedding Shoot',
    location: 'Heritage Lake Palace',
    src: '/src/assets/images/wedding_prewedding_sunset_1791885161158.jpg',
    description: 'Dreamy golden hour sunlight, heritage architecture, and natural candid intimacy.'
  },
  {
    id: 5,
    title: 'Intricate Bridal Grace & Jewels',
    category: 'Bridal Portrait',
    location: 'Luxury Suite',
    src: '/src/assets/images/wedding_bridal_portrait_1791885161066.jpg',
    description: 'Timeless heirloom jewelry, delicate henna mehendi art, and radiant bridal elegance.'
  },
  {
    id: 6,
    title: 'Sacred Seven Pheras Around Agni',
    category: 'Pheras & Rituals',
    location: 'Vedic Mandap',
    src: '/src/assets/images/wedding_pheras_mandap_1791885204329.jpg',
    description: 'Sacred holy fire agni kund, traditional silk sarees, and vows of eternal togetherness.'
  }
];

const WEDDING_REVIEWS = [
  {
    id: 1,
    couple: 'Rohan & Simran',
    location: 'Patna / Delhi',
    shootType: '3-Day Complete Wedding & Reception',
    rating: 5,
    comment: 'Bhai kya shoot kiya hai yaar! Wedding album aur cinematic teaser dekh ke poori family literally emotional ho gayi. Har ek candid moment itni khubsurti aur perfection se capture kiya hai, lighting and angles are next level. Srijan bhai ki mehnat aur dedication 10/10 hai!'
  },
  {
    id: 2,
    couple: 'Aman & Priyanshu',
    location: 'Kolkata',
    shootType: 'Haldi & Varmala Shoot',
    rating: 5,
    comment: 'Srijan bhai and his team are insanely hardworking! Hamare rituals subah 4 baje tak chale the, but unka passion and smile continuous tha. Har ek shot me Bollywood vibe feel hoti hai. WhatsApp groups me sabhi rishtedaar photos ki tareef kar rahe hain!'
  },
  {
    id: 3,
    couple: 'Sneha & Vicky',
    location: 'Varanasi / Lucknow',
    shootType: 'Pre-Wedding & Pheras',
    rating: 5,
    comment: 'Sach me dream pre-wedding shoot ho gaya hamara! Palace location pe drone shots aur golden hour lighting ka perfect use kiya. Super humble insaan hain, koi attitude nahi, bas kaam me 100% perfection. 100+ clients ka trust sach me justified hai!'
  },
  {
    id: 4,
    couple: 'Kunal & Ananya',
    location: 'Patna',
    shootType: 'Grand Destination Wedding',
    rating: 5,
    comment: 'Best wedding photographer hands down! Time se pehle deliver kiya and raw clips se lekar final color-graded reels tak sab top notch tha. Agar aapko tension-free photography chahiye toh blindly go with Srijan Kumar!'
  }
];

// --- Data ---
const CREATOR_DATA = [
  { name: 'Female', value: 85, color: '#000000' },
  { name: 'Male', value: 15, color: '#e5e5e5' },
];

const NANO_REACH_DATA = [
  { name: '100 Creators', reach: 0.35 },
  { name: '500 Creators', reach: 1.8 },
  { name: '1000 Creators', reach: 3.5 },
];

const MICRO_REACH_DATA = [
  { name: '100 Creators', reach: 0.6 },
  { name: '300 Creators', reach: 2.1 },
  { name: '500 Creators', reach: 3.5 },
];

const NICHES = ['Beauty', 'Skincare', 'Lifestyle', 'Fashion'];

const DEFAULT_CREATORS = [
  { username: '@riya_fitness', followers: '125K' },
  { username: '@tanvi_lifestyle', followers: '85K' },
  { username: '@ananya_beauty', followers: '210K' },
  { username: '@isha_skincare', followers: '45K' },
  { username: '@sneha_vlogs', followers: '92K' },
  { username: '@pooja_fashion', followers: '150K' },
  { username: '@megha_fit', followers: '68K' },
  { username: '@divya_glow', followers: '115K' },
  { username: '@kavya_trends', followers: '78K' },
];

const STEPS = [
  {
    title: 'Precision Selection',
    description: 'We curate creators from our 50k+ database, matching them exactly to brand requirements.',
    icon: Users,
  },
  {
    title: 'Scale Outreach',
    description: 'Automated briefing via WhatsApp APIs ensures 100% reach and real-time communication.',
    icon: MessageSquare,
  },
  {
    title: 'Content Tracking',
    description: 'Centralized submission system for creators to provide content URLs for tracking.',
    icon: FileSpreadsheet,
  },
  {
    title: 'Management',
    description: 'Manual follow-ups and quality checks to ensure all content meets brand standards.',
    icon: PhoneCall,
  },
  {
    title: 'Execution',
    description: 'Final dashboard delivery for brand confirmation and campaign completion.',
    icon: CheckCircle,
  },
];

const BEAUTY_BRANDS = [
  { name: 'Lakmé', domain: 'lakmeindia.com', style: 'font-serif italic' },
  { name: 'Mamaearth', domain: 'mamaearth.in', style: 'font-sans font-bold' },
  { name: 'Sugar', domain: 'sugarcosmetics.com', style: 'font-mono' },
  { name: 'Nykaa', domain: 'nykaa.com', style: 'font-sans font-black' },
  { name: 'Wow Skin Science', domain: 'buywow.in', style: 'font-sans font-medium' },
  { name: 'Biotique', domain: 'biotique.com', style: 'font-serif' },
  { name: 'Lotus Herbals', domain: 'lotusherbals.com', style: 'font-sans' },
  { name: 'Plum Goodness', domain: 'plumgoodness.com', style: 'font-sans font-bold italic' },
  { name: 'Forest Essentials', domain: 'forestessentialsindia.com', style: 'font-serif font-light' },
  { name: 'Kama Ayurveda', domain: 'kamaayurveda.com', style: 'font-serif tracking-widest' },
  { name: 'MyGlamm', domain: 'myglamm.com', style: 'font-mono uppercase' },
  { name: 'Faces Canada', domain: 'facescanada.com', style: 'font-sans' },
  { name: 'Colorbar', domain: 'colorbarcosmetics.com', style: 'font-sans font-black italic' },
  { name: 'VLCC', domain: 'vlccpersonalcare.com', style: 'font-sans font-bold' },
  { name: 'Just Herbs', domain: 'justherbs.in', style: 'font-serif italic' },
  { name: 'Khadi Natural', domain: 'khadinatural.com', style: 'font-serif' },
  { name: 'Elle 18', domain: 'elle18.in', style: 'font-sans font-black' },
  { name: 'Blue Heaven', domain: 'blueheavencosmetics.com', style: 'font-serif bold' },
  { name: 'Himalaya', domain: 'himalayawellness.in', style: 'font-sans font-bold italic' },
  { name: 'mCaffeine', domain: 'mcaffeine.com', style: 'font-mono font-bold' },
  { name: 'Dot & Key', domain: 'dotandkey.com', style: 'font-sans italic' },
  { name: 'Juicy Chemistry', domain: 'juicychemistry.com', style: 'font-serif font-bold' },
  { name: 'Re\'equil', domain: 'reequil.com', style: 'font-sans' },
  { name: 'Minimalist', domain: 'beminimalist.co', style: 'font-mono lowercase' },
  { name: 'The Derma Co', domain: 'thedermaco.com', style: 'font-sans font-black uppercase' },
  { name: 'Dr. Sheth\'s', domain: 'drsheths.com', style: 'font-serif italic' },
  { name: 'Aqualogica', domain: 'aqualogica.in', style: 'font-sans font-light' },
  { name: 'Foxtale', domain: 'foxtale.in', style: 'font-serif tracking-tighter' },
  { name: 'Earth Rhythm', domain: 'earthrhythm.com', style: 'font-sans italic font-bold' },
  { name: 'Joy Personal Care', domain: 'joypersonalcare.co.in', style: 'font-sans uppercase font-black' }
];

// --- Shared Components ---
const SectionHeader = ({ label, title, description }: { label: string; title: string; description?: string }) => (
  <div className="mb-12">
    <span className="section-label">{label}</span>
    <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
    {description && <p className="text-muted text-lg max-w-2xl leading-relaxed">{description}</p>}
  </div>
);

const InfiniteMarquee = ({ children, speed = 25 }: { children: React.ReactNode; speed?: number }) => (
  <div className="flex overflow-hidden py-10 border-y border-border select-none">
    <motion.div
      animate={{ x: [0, -50 + '%'] }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      className="flex gap-12 items-center flex-none min-w-full justify-between"
    >
      {children}
      {children}
    </motion.div>
  </div>
);

const ViralReel = ({ src, views, time }: { src: string, views: string, time: string }) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black ring-1 ring-white/10 shadow-black/20">
        <video 
          src={src} 
          autoPlay 
          loop 
          muted={isMuted} 
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all text-[10px] font-bold uppercase tracking-widest shadow-sm ${
            !isMuted ? 'bg-fg text-bg border-fg' : 'bg-white text-fg border-border hover:border-fg'
          }`}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          {isMuted ? 'Unmute' : 'Muted'}
        </button>

        <div className="text-center group">
          <div className="text-3xl font-black text-fg tracking-tighter leading-none">{views}</div>
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mt-2 group-hover:text-fg transition-colors">in {time}</p>
        </div>
      </div>
    </div>
  );
};

export default function Landing() {
  const [creators, setCreators] = useState<{ username: string; followers: string }[]>(DEFAULT_CREATORS);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof WEDDING_PHOTOS[0] | null>(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await fetch('/api/creators');
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((c: any) => ({ 
            username: c.username || '@creator',
            followers: c.followers || '10K+'
          }));
          setCreators([...formatted, ...DEFAULT_CREATORS]);
        }
      } catch (err) {
        console.warn('Dynamic creators could not be loaded:', err);
      }
    };
    
    fetchCreators();
  }, []);

  return (
    <div className="min-h-screen bg-bg relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-14 md:h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-fg flex items-center gap-2">
            <span>PR CREATIONS</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-fg text-bg uppercase tracking-widest hidden sm:inline-block">Marketing Lead</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="text-sm font-medium hover:text-muted transition-colors">About</a>
            <a href="#wedding" className="text-sm font-medium hover:text-muted transition-colors flex items-center gap-1.5 text-fg font-semibold">
              <Camera size={15} /> Wedding Shoots
            </a>
            <a href="#network" className="text-sm font-medium hover:text-muted transition-colors">Network</a>
            <a href="#process" className="text-sm font-medium hover:text-muted transition-colors">Process</a>
            <a href="#contact" className="text-sm font-medium hover:text-muted transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
             <a 
              href="https://wa.me/916202967087" 
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold uppercase tracking-widest px-6 py-2.5 bg-fg text-bg rounded-md hover:bg-muted transition-all flex items-center gap-2"
            >
              <span>Work with us</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero / About */}
      <section id="about" className="pt-32 md:pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-12 mb-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tighter uppercase"
              >
                PR CREATIONS <span className="text-muted/60 block text-[10px] md:text-xs tracking-[0.4em] font-bold mt-4">Head Marketing Executive • Srijan Kumar (4+ Years Exp.)</span>
              </motion.h1>

              {/* Srijan Kumar Corner Photo Profile Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="shrink-0 flex items-center gap-4 p-3.5 bg-surface border border-border rounded-2xl shadow-sm hover:shadow-md transition-all self-start md:self-auto"
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 border border-border shadow-inner group">
                  <img 
                    src="/src/assets/images/srijan_profile_headshot_1791886441680.jpg" 
                    alt="Srijan Kumar" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" title="Active & Available" />
                </div>
                <div className="pr-2">
                  <div className="text-base font-extrabold text-fg tracking-tight">Srijan Kumar</div>
                  <div className="text-xs font-bold text-fg">Head Marketing Executive</div>
                  <div className="text-[11px] font-semibold text-muted">PRCreations • 4+ Years Experience</div>
                  <div className="text-[10px] text-green-700 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded-md w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Growth & Performance Specialist
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="section-label">Marketing Leadership & Portfolio</span>
              <p className="text-2xl md:text-3xl text-muted font-medium mb-8 leading-tight">
                Driving <span className="text-fg italic font-bold">Direct-to-Consumer brand scaling</span> <span className="text-green-500 font-extrabold drop-shadow-[0_2px_10px_rgba(34,197,94,0.5)]">ORGANICALLY</span> & leading premium visual shoots with 4+ years of expertise.
              </p>
              
              <div className="space-y-6 text-lg text-muted max-w-2xl leading-relaxed">
                <p>
                  Hi, I’m <span className="text-fg font-semibold">Srijan Kumar</span>, Head Marketing Executive at <strong>PRCreations</strong> with over <strong>4+ years of hands-on industry experience</strong>. Known for relentless hard work, strategic execution, and a results-first mindset, I lead high-impact creator campaigns and premium visual productions. Whether scaling D2C brands to tens of millions in reach or managing top-tier wedding shoots with cinematic emotion, I bring 4+ years of proven expertise, dedication, and perfection to every project.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border">
                  <div>
                    <div className="text-fg font-bold text-2xl uppercase">4+ Yrs</div>
                    <div className="text-[10px] font-bold uppercase text-muted tracking-widest mt-1">Marketing Exp.</div>
                  </div>
                  <div>
                    <div className="text-fg font-bold text-2xl uppercase">100+</div>
                    <div className="text-[10px] font-bold uppercase text-muted tracking-widest mt-1">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-fg font-bold text-2xl uppercase">50K+</div>
                    <div className="text-[10px] font-bold uppercase text-muted tracking-widest mt-1">Creators Managed</div>
                  </div>
                  <div>
                    <div className="text-fg font-bold text-2xl uppercase">800M+</div>
                    <div className="text-[10px] font-bold uppercase text-muted tracking-widest mt-1">Organic Reach</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
             <div className="bg-surface p-8 rounded-2xl border border-border">
                <div className="space-y-6 text-sm leading-relaxed text-muted">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-fg/70">What Srijan Kumar Brings to the Table</h5>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-fg font-bold mb-1">4+ Years Marketing Mastery</h4>
                      <p>Deep expertise in brand positioning, creator ROI, conversion optimization, and viral organic reach.</p>
                    </div>
                    <div>
                      <h4 className="text-fg font-bold mb-1">Relentless Hard Work</h4>
                      <p>Always accessible, tireless dedication, and a relentless drive to deliver beyond client expectations.</p>
                    </div>
                    <div>
                      <h4 className="text-fg font-bold mb-1">100+ Satisfied Clients</h4>
                      <p>A proven track record of happy brand partners and couples across India with consistent 5-star feedback.</p>
                    </div>
                    <div>
                      <h4 className="text-fg font-bold mb-1">High-Precision Shoot Direction</h4>
                      <p>Seamlessly bridging performance marketing metrics with high-end aesthetic wedding and brand visuals.</p>
                    </div>
                    <div>
                      <h4 className="text-fg font-bold mb-1">End-to-End Account Ownership</h4>
                      <p>From initial brief to execution, quality control, and post-delivery success — 100% managed with care.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-3">
                   <div className="h-px flex-1 bg-border" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Wedding Shoot & Films Section */}
      <section id="wedding" className="py-24 px-6 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <span className="section-label">exclusive photography & cinema</span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-fg">
                WEDDING SHOOTS & STORIES
              </h2>
              <p className="text-muted text-lg max-w-2xl mt-4 leading-relaxed">
                Capturing sacred vows, joyous laughter, and timeless celebrations. Worked with <span className="text-fg font-bold underline decoration-yellow-400 decoration-2">more than 100 happy clients</span> across India with 100% 5-star reviews.
              </p>
            </div>
            
            {/* 100+ Happy Clients Trust Badge */}
            <div className="shrink-0 bg-white p-6 rounded-2xl border border-border shadow-sm max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#facc15" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-sm font-bold text-fg">5.0 / 5.0</span>
              </div>
              <div className="text-xl font-black text-fg tracking-tight">100+ Happy Clients</div>
              <p className="text-xs text-muted mt-1 leading-relaxed">Trusted across Patna, Delhi, Kolkata, Varanasi & destination weddings.</p>
            </div>
          </div>

          {/* 6 Wedding Works Showcase Grid */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted">
                <Camera size={16} className="text-fg" />
                <span>Featured Wedding Showcase (6 Works)</span>
              </div>
              <span className="text-xs text-muted font-medium">Click any photo for high-res preview</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {WEDDING_PHOTOS.map((photo) => (
                <motion.div
                  key={photo.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                      <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                        <Eye size={14} /> Tap to expand
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white text-fg flex items-center justify-center shadow-lg">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                    <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-fg">
                      {photo.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5">{photo.location}</div>
                      <h3 className="text-lg font-bold text-fg group-hover:text-muted transition-colors leading-snug">{photo.title}</h3>
                      <p className="text-xs text-muted mt-2 leading-relaxed line-clamp-2">{photo.description}</p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-fg">
                      <span className="flex items-center gap-1 text-muted text-[11px]">
                        <Heart size={13} className="text-red-500 fill-red-500" /> Candid Shot
                      </span>
                      <span className="text-[11px] font-bold text-fg underline decoration-border group-hover:decoration-fg transition-all">View Full Size</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hinglish Client Reviews (All 5-Star) */}
          <div className="pt-8 border-t border-border">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="section-label mx-auto">real client love • genuine words</span>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-fg">
                Client Reviews In Their Own Words
              </h3>
              <p className="text-sm text-muted mt-2">
                All 5-star verified feedback from our 100+ happy couples and families.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WEDDING_REVIEWS.map((review) => (
                <div 
                  key={review.id}
                  className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="#facc15" strokeWidth={0} />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                        Verified 5★ Client
                      </span>
                    </div>

                    <p className="text-base text-fg font-medium leading-relaxed italic mb-6">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-fg">{review.couple}</div>
                      <div className="text-[11px] text-muted">{review.location} • {review.shootType}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">100% Satisfied</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Wedding Shoot Booking Call to Action */}
            <div className="mt-14 bg-fg text-bg rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">
                  <Sparkles size={16} />
                  <span>Limited Dates Available for 2026 Season</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                  Plan Your Wedding or Pre-Wedding Shoot
                </h4>
                <p className="text-muted-bg text-sm max-w-xl leading-relaxed">
                  Join more than 100 happy clients who trusted Srijan Kumar for timeless cinematic memories. Let’s discuss your dates, locations, and vision directly on WhatsApp.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
                <a
                  href="https://wa.me/916202967087?text=Hi%20Srijan,%20I%20would%20like%20to%20inquire%20about%20a%20wedding%20shoot!"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp: +91 6202967087</span>
                </a>
                <a
                  href="tel:+916202967087"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 transition-all"
                >
                  <Phone size={15} />
                  <span>Call Srijan</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section id="network" className="py-20 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            label="network analytics"
            title="CREATORs NETWORK"
            description="Our pool of 50,000+ creators is strategically diverse, with a primary focus on the high-intent female demographic."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                   <h4 className="text-xs font-bold uppercase tracking-widest">Demographics</h4>
                   <TrendingUp size={14} className="text-muted" />
                </div>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={CREATOR_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {CREATOR_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                   <div className="flex items-center gap-2 text-xs font-bold"><div className="w-2 h-2 rounded-full bg-fg" /> 85% Female</div>
                   <div className="flex items-center gap-2 text-xs font-bold"><div className="w-2 h-2 rounded-full bg-border" /> 15% Male</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-fg text-bg p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap size={18} className="text-yellow-400" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-bg">Nano Projection</h4>
                  </div>
                  <p className="text-xl font-bold mb-2 leading-tight">
                    1,000 Nano <ArrowUpRight className="inline" size={16} /> 3.5M+ Organic Reach (Minimums)
                  </p>
                  <p className="text-[10px] text-muted-bg leading-relaxed">
                    High-impact visibility through micro-targeted creator clusters.
                  </p>
                </div>
                <div className="bg-fg text-bg p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap size={18} className="text-yellow-400" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-bg">Micro Projection</h4>
                  </div>
                  <p className="text-xl font-bold mb-2 leading-tight">
                    500 Micro <ArrowUpRight className="inline" size={16} /> 3.5M+ Organic Reach (Minimums)
                  </p>
                  <p className="text-[10px] text-muted-bg leading-relaxed">
                    Premium quality creators (10k-100k followers) for deeper influence.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-border">
                  <div className="flex items-center justify-between mb-6">
                     <h4 className="text-xs font-bold uppercase tracking-widest">Nano Reach Scaling</h4>
                     <TrendingUp size={14} className="text-muted" />
                  </div>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={NANO_REACH_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="reach"
                          strokeWidth={0}
                        >
                          {NANO_REACH_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#6366f1', '#a855f7', '#ec4899'][index]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '10px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                     {NANO_REACH_DATA.map((d, i) => (
                       <div key={i} className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: ['#6366f1', '#a855f7', '#ec4899'][i] }} />
                            {d.name}
                         </div>
                         <span className="text-fg">{i === 0 ? '3.5 Lakh+' : `${d.reach} Million+`} Reach</span>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="bg-white p-8 rounded-2xl border border-border">
                  <div className="flex items-center justify-between mb-6">
                     <h4 className="text-xs font-bold uppercase tracking-widest">Micro Reach Scaling</h4>
                     <TrendingUp size={14} className="text-muted" />
                  </div>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={MICRO_REACH_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="reach"
                          strokeWidth={0}
                        >
                          {MICRO_REACH_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b'][index]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '10px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                     {MICRO_REACH_DATA.map((d, i) => (
                       <div key={i} className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: ['#3b82f6', '#10b981', '#f59e0b'][i] }} />
                            {d.name}
                         </div>
                         <span className="text-fg">{i === 0 ? '6 Lakh+' : `${d.reach} Million+`} Reach</span>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="pt-4">
                  <span className="section-label">Core Verticals</span>
                  <div className="flex flex-wrap gap-2">
                    {NICHES.map((niche) => (
                      <span key={niche} className="px-5 py-2 bg-white border border-border rounded-full text-[10px] font-bold uppercase tracking-wider transition-all hover:bg-fg hover:text-bg cursor-default">
                        {niche}
                      </span>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section - Sliding Form */}
      <section id="community" className="py-16 border-y border-border">
        <div className="px-6 max-w-7xl mx-auto mb-8 text-center md:text-left">
          <SectionHeader 
            label="Visual network" 
            title="OUR CREATORS COMMUNITY" 
          />
        </div>
        
        <InfiniteMarquee speed={35}>
          {creators.map((creator, i) => (
            <div key={i} className="w-64 h-40 flex-none rounded-2xl bg-white border border-border p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Users size={80} />
              </div>
              
              <div>
                <div className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-1">Instagram</div>
                <h4 className="text-xl font-bold tracking-tight text-fg truncate">
                  {creator.username}
                </h4>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Followers</div>
                  <div className="text-2xl font-black text-fg">{creator.followers}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-fg text-bg flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </InfiniteMarquee>

        <div className="px-6 max-w-7xl mx-auto mt-8 text-center">
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2">
              Tap to explore our 50,000+ strong creator network
            </p>
            <p className="text-[9px] font-medium text-muted/60 uppercase tracking-widest mb-8">
              We have 5 to 8 groups similarly
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://whatsapp.com/channel/0029Vb6c83QGzzKTdxBFQG0c"
                target="_blank"
                rel="noreferrer"
                className="group relative px-8 py-4 bg-fg text-bg rounded-xl font-bold uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-2xl"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <MessageSquare size={16} />
                <span>Join Group 1</span>
                <ArrowUpRight size={14} className="opacity-50" />
              </a>
              
              <a 
                href="https://whatsapp.com/channel/0029Vb8Kd8B60eBil3ggpM3Z"
                target="_blank"
                rel="noreferrer"
                className="group relative px-8 py-4 bg-white text-fg border-2 border-fg rounded-xl font-bold uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-xl"
              >
                <div className="absolute inset-0 bg-fg/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <MessageSquare size={16} />
                <span>Join Group 2</span>
                <ArrowUpRight size={14} className="opacity-50" />
              </a>
            </div>
        </div>
      </section>

      {/* Viral Reels Section */}
      <section className="py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="section-label mx-auto">Proof of Impact</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Most Viral Reels Organically</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-5xl mx-auto">
             <ViralReel src="/reel_1.mp4" views="1.1 Million" time="20 days" />
             <ViralReel src="/reel_2.mp4" views="880k Views" time="8 days" />
             <ViralReel src="/reel_3.mp4" views="700k Views" time="3 days" />
          </div>
        </div>
      </section>

      {/* Brands Sliding */}
      <section className="py-20 bg-fg text-bg overflow-hidden">
        <div className="px-6 max-w-7xl mx-auto mb-12">
          <SectionHeader label="trusted by" title="Global Brand Partnerships" />
        </div>
        
        <div className="space-y-6">
          <InfiniteMarquee speed={50}>
            {BEAUTY_BRANDS.slice(0, 15).map((brand, i) => (
              <div key={i} className="flex-none flex items-center gap-6 px-8 py-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/30 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <img 
                    src={`https://logo.clearbit.com/${brand.domain}`} 
                    alt={brand.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`;
                    }}
                  />
                </div>
                <span className={`text-2xl md:text-3xl tracking-tighter uppercase whitespace-nowrap opacity-40 group-hover:opacity-100 transition-opacity cursor-default ${brand.style}`}>
                  {brand.name}
                </span>
              </div>
            ))}
          </InfiniteMarquee>

          <InfiniteMarquee speed={60}>
            {BEAUTY_BRANDS.slice(15, 30).map((brand, i) => (
              <div key={i} className="flex-none flex items-center gap-6 px-8 py-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/30 transition-all group">
                 <div className="w-14 h-14 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <img 
                    src={`https://logo.clearbit.com/${brand.domain}`} 
                    alt={brand.name}
                    className="w-full h-full object-contain"
                     onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`;
                    }}
                  />
                </div>
                <span className={`text-2xl md:text-3xl tracking-tighter uppercase whitespace-nowrap opacity-40 group-hover:opacity-100 transition-opacity cursor-default ${brand.style}`}>
                  {brand.name}
                </span>
              </div>
            ))}
          </InfiniteMarquee>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            label="how we work" 
            title="Strategic Campaign Pipeline" 
            description="Our 5-step framework ensures massive scale without compromising on quality or brand alignment."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {STEPS.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="clean-card group p-8"
              >
                <div className="text-2xl font-black text-border group-hover:text-fg mb-10 transition-colors">{`0${index + 1}`}</div>
                <div className="w-8 h-8 mb-6 text-fg">
                  <step.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-base mb-3">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed group-hover:text-fg transition-colors">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer id="contact" className="py-24 px-6 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              Accepting brand partnerships & wedding bookings
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-12 leading-none">
              READY TO CREATE MAGIC? <br /> <span className="text-muted">LET'S CONNECT.</span>
            </h2>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="section-label">General Inquiry</span>
                <a href="mailto:prcreations2927@gmail.com" className="text-xl md:text-3xl font-bold hover:text-muted transition-colors border-b-2 border-fg pb-1">
                  prcreations2927@gmail.com
                </a>
              </div>
              
              <div className="space-y-3">
                <span className="section-label">Direct Phone & WhatsApp</span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <a href="tel:+916202967087" className="text-xl md:text-3xl font-bold hover:text-muted transition-colors border-b-2 border-fg pb-1">
                    +91 6202967087
                  </a>
                  <a 
                    href="https://wa.me/916202967087" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider w-fit"
                  >
                    <MessageSquare size={14} /> WhatsApp Srijan
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-80 space-y-12">
            <div className="space-y-5">
              <span className="section-label">Executive Leadership</span>
              <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-border shrink-0">
                  <img 
                    src="/src/assets/images/srijan_profile_headshot_1791886441680.jpg" 
                    alt="Srijan Kumar" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="font-bold text-sm text-fg">Srijan Kumar</div>
                  <div className="text-[11px] font-semibold text-fg">Head Marketing Executive</div>
                  <div className="text-[10px] text-muted">4+ Years Experience @ PRCreations</div>
                </div>
              </div>

              <div className="flex flex-col gap-3 font-bold uppercase text-[10px] tracking-widest pt-2">
                <a href="https://www.instagram.com/itsprcreations?igsh=NGxkYm42dnh0M2Z4" target="_blank" rel="noreferrer" className="flex justify-between items-center hover:text-muted py-2 border-b border-border">INSTAGRAM <ArrowUpRight size={12} /></a>
                <a href="https://wa.me/916202967087" target="_blank" rel="noreferrer" className="flex justify-between items-center hover:text-muted py-2 border-b border-border">WHATSAPP DIRECT <ArrowUpRight size={12} /></a>
              </div>
            </div>
            
            <div className="space-y-3 leading-relaxed text-xs text-muted">
              <p>PRCreations marketing campaigns and visual media are directed by Srijan Kumar, combining 4+ years of influencer marketing expertise with luxury wedding cinematography across India.</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 flex flex-col sm:flex-row justify-between items-center gap-6 py-8 border-t border-border text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
          <span>ESTABLISHED 2022 • © 2026 PR CREATIONS • SRIJAN KUMAR</span>
          <span>HEAD MARKETING EXECUTIVE • +91 6202967087</span>
        </div>
      </footer>

      {/* Floating Corner Avatar & Quick Contact Widget */}
      <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-white/95 backdrop-blur-md border border-border p-2 pr-4 rounded-full shadow-2xl hover:shadow-black/10 transition-all hover:scale-105 group">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-fg/10 shrink-0">
          <img 
            src="/src/assets/images/srijan_profile_headshot_1791886441680.jpg" 
            alt="Srijan Kumar" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        </div>
        <div className="text-left">
          <div className="text-xs font-bold text-fg leading-tight">Srijan Kumar</div>
          <div className="text-[9px] text-muted font-medium">Head Marketing Exec (4+ Yrs)</div>
          <a 
            href="https://wa.me/916202967087" 
            target="_blank" 
            rel="noreferrer"
            className="text-[10px] font-semibold text-green-600 hover:text-green-700 flex items-center gap-1"
          >
            <span>+91 6202967087</span>
            <ArrowUpRight size={10} />
          </a>
        </div>
      </aside>

      {/* Wedding Photo Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center max-h-[60vh]">
              <img 
                src={selectedPhoto.src} 
                alt={selectedPhoto.title} 
                className="w-full h-full object-contain max-h-[60vh]"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 sm:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted bg-surface px-3 py-1 rounded-full border border-border">
                  {selectedPhoto.category} • {selectedPhoto.location}
                </span>
                <h3 className="text-2xl font-extrabold text-fg mt-2">{selectedPhoto.title}</h3>
                <p className="text-sm text-muted mt-1 max-w-xl leading-relaxed">{selectedPhoto.description}</p>
              </div>

              <div className="shrink-0 flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/916202967087?text=Hi%20Srijan,%20I%20loved%20the%20${encodeURIComponent(selectedPhoto.title)}%20wedding%20shot!`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-fg text-bg hover:bg-muted text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all w-full sm:w-auto justify-center"
                >
                  <MessageSquare size={14} />
                  <span>Inquire This Style</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
