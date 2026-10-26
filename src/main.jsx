import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import redCollar from '../assets/red-collar.png';
import greenCollar from '../assets/green-collar.png';
import yellowCollar from '../assets/yellow-collar.png';
import airtagCollar from '../assets/airtag-collar.png';
import streetCat from '../assets/street-cat.png';
import iyedPhoto from '../assets/founders/iyed.png';
import wassamPhoto from '../assets/founders/wassam.jpeg';
import misketPhoto from '../assets/irl/misket.jpg';
import tobyPhoto from '../assets/irl/toby.jpg';
import zeytinPhoto from '../assets/irl/zeytin.jpg';
import './tailwind.css';
import './styles.css';

const copy = {
  en: {
    nav: ['The idea', 'Collars', 'The map', 'Stories'],
    openApp: 'Open the app',
    heroLabel: 'Istanbul / Community cat care',
    heroTitle: 'A city that knows its cats.',
    heroBody: 'A Kedibul tag turns a passing encounter into useful care: scan a collar, meet the cat, and leave the right note for the next neighbor.',
    getCollar: 'Get a collar',
    seeHow: 'See how it works',
    heroCaption: 'Built for the streets, ferries, and side roads of Istanbul.',
    scanLabel: 'The moment of contact',
    scanTitle: 'One scan. The whole neighborhood, in the loop.',
    scanBody: 'No app download. No guesswork. A standard phone camera opens a living profile made from the people who see the cat every day.',
    scanButton: 'Open Misket’s profile',
    steps: ['Scan any collar', 'Read their profile', 'Leave a useful note'],
    stepLabels: ['Scanning QR code', 'Cat profile found', 'Update shared with neighbors'],
    privacyTitle: 'Privacy',
    termsTitle: 'Terms',
    legalClose: 'Close',
    collarLabel: 'Four ways to be seen',
    collarTitle: 'Pick the signal that fits the street.',
    collarBody: 'Every color carries a small piece of information. Choose a QR collar, or add an AirTag holder for an extra layer of reassurance.',
    choose: 'Choose this collar',
    mapLabel: 'The Kedibul network',
    mapTitle: 'Care travels by neighborhood.',
    mapBody: 'From a tea garden in Kadıköy to the last tram in Beyoğlu, the people who notice a cat are already part of its safety net.',
    mapCaption: 'Illustrative district map — live coverage launches with the Kedibul community.',
    source: 'Verified figures will be published here as the network opens.',
    storyLabel: 'From the profile',
    storyTitle: 'Every collar carries a local legend.',
    storyBody: 'A useful profile is practical first — and still leaves room for the story only a neighborhood could tell.',
    storyFooter: 'Scan a collar to add a note',
    founderLabel: 'Why we built it',
    founderTitle: 'The best cat database is a city full of witnesses.',
    founderBody: 'Kedibul began with a simple question: what if the small things Istanbul already knows about its cats could be useful to everyone who stops to help?',
    footerTitle: 'Leave the street a little more informed.',
    footerBody: 'Bring a collar to a cat you know, or scan one you meet.',
    legal: 'Kedibul is a community information service, not a substitute for veterinary care or emergency help.',
  },
  tr: {
    nav: ['Fikir', 'Tasmalar', 'Harita', 'Hikâyeler'],
    openApp: 'Uygulamayı aç',
    heroLabel: 'İstanbul / Sokak kedileri için bakım',
    heroTitle: 'Kedilerini tanıyan bir şehir.',
    heroBody: 'Kedibul etiketi, rastlantısal bir karşılaşmayı faydalı bakıma dönüştürür: tasmayı okut, kediyi tanı ve bir sonraki komşuya doğru notu bırak.',
    getCollar: 'Tasma al',
    seeHow: 'Nasıl çalışır?',
    heroCaption: 'İstanbul’un sokakları, vapurları ve ara yolları için tasarlandı.',
    scanLabel: 'Karşılaşma anı',
    scanTitle: 'Tek tarama. Tüm mahalle haberdar.',
    scanBody: 'Uygulama indirmeye gerek yok. Standart telefon kamerası, kediyi her gün gören insanların oluşturduğu canlı profili açar.',
    scanButton: 'Misket’in profilini aç',
    steps: ['Tasmayı okut', 'Profilini oku', 'Faydalı bir not bırak'],
    stepLabels: ['QR kodu taranıyor', 'Kedi profili bulundu', 'Güncelleme komşularla paylaşıldı'],
    privacyTitle: 'Gizlilik',
    termsTitle: 'Koşullar',
    legalClose: 'Kapat',
    collarLabel: 'Görünür olmanın dört yolu',
    collarTitle: 'Sokağa uygun sinyali seç.',
    collarBody: 'Her renk küçük bir bilgi taşır. Bir QR tasma seç ya da daha fazla güven için AirTag yuvası ekle.',
    choose: 'Bu tasmayı seç',
    mapLabel: 'Kedibul ağı',
    mapTitle: 'Bakım mahalle mahalle yayılır.',
    mapBody: 'Kadıköy’deki çay bahçesinden Beyoğlu’ndaki son tramvaya kadar, bir kediyi fark eden herkes onun güvenlik ağının parçasıdır.',
    mapCaption: 'Örnek ilçe haritası — canlı kapsama Kedibul topluluğuyla başlayacak.',
    source: 'Doğrulanmış rakamlar ağ açıldıkça burada yayınlanacak.',
    storyLabel: 'Profilden',
    storyTitle: 'Her tasma yerel bir hikâye taşır.',
    storyBody: 'İyi bir profil önce pratiktir — ama sadece mahallenin anlatabileceği hikâyeye de yer bırakır.',
    storyFooter: 'Not eklemek için tasmayı okut',
    founderLabel: 'Neden yaptık',
    founderTitle: 'En iyi kedi veritabanı, tanıklarla dolu bir şehirdir.',
    founderBody: 'Kedibul basit bir soruyla başladı: İstanbul’un kedileri hakkında zaten bildiği küçük şeyler, yardım etmek için duran herkes için faydalı olabilir mi?',
    footerTitle: 'Sokağı biraz daha bilgili bırak.',
    footerBody: 'Tanıdığın bir kediye tasma getir ya da karşılaştığını okut.',
    legal: 'Kedibul bir topluluk bilgi hizmetidir; veteriner bakımı veya acil yardım yerine geçmez.',
  },
};

const collars = [
  { key: 'green', name: 'Green', tr: 'Yeşil', note: 'Say hello.', trNote: 'Selam ver.', badge: 'Friendly', trBadge: 'Dost canlısı', price: '₺180', color: '#7FB39A', image: greenCollar },
  { key: 'yellow', name: 'Yellow', tr: 'Sarı', note: 'Give me a little space.', trNote: 'Biraz alan bırak.', badge: 'Caution', trBadge: 'Dikkat', price: '₺180', color: '#F5B700', image: yellowCollar },
  { key: 'red', name: 'Red', tr: 'Kırmızı', note: 'Watch from a distance.', trNote: 'Uzaktan izle.', badge: 'Do not approach', trBadge: 'Yaklaşma', price: '₺180', color: '#D2442F', image: redCollar },
  { key: 'airtag', name: 'AirTag', tr: 'AirTag', note: 'Two ways to find the way home.', trNote: 'Eve dönüş için iki yol.', badge: 'Track + scan', trBadge: 'Takip + tarama', price: '₺480', color: '#D6A93A', image: airtagCollar },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = '' }) {
  const [ref, visible] = useReveal();
  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>;
}

function Grain() {
  return <div className="grain" aria-hidden="true" />;
}

function Nav({ lang, setLang, t }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`site-header ${hidden ? 'is-hidden' : ''}`}>
      <a className="brand" href="#top" aria-label="Kedibul home"><span className="brand-mark">k</span><span>kedibul<span className="brand-dot">.</span></span></a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#top">{t.nav[0]}</a><a href="#collars">{t.nav[1]}</a><a href="#map">{t.nav[2]}</a><a href="#stories">{t.nav[3]}</a>
      </nav>
      <div className="nav-actions">
        <button className="lang-toggle" onClick={() => setLang(lang === 'en' ? 'tr' : 'en')} aria-label="Switch language">
          <span className={lang === 'en' ? 'active' : ''}>EN</span><i>/</i><span className={lang === 'tr' ? 'active' : ''}>TR</span>
        </button>
        <a className="button button-dark nav-cta" href="#footer">{t.openApp}<span>↗</span></a>
      </div>
    </header>
  );
}

function Hero({ t }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = ref.current?.getBoundingClientRect();
      if (rect) setTilt(Math.max(-5, Math.min(5, (window.innerHeight * 0.42 - rect.top) / 160)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <section className="hero section-paper" id="top" ref={ref}>
      <div className="hero-copy">
        <p className="eyebrow">{t.heroLabel}</p>
        <h1>{t.heroTitle}</h1>
        <p className="hero-body">{t.heroBody}</p>
        <div className="hero-actions"><a className="button button-red" href="#collars">{t.getCollar}<span>↗</span></a><a className="text-link" href="#scan">{t.seeHow}<span>↓</span></a></div>
        <p className="hero-caption"><span className="caption-line" />{t.heroCaption}</p>
      </div>
      <div className="hero-stage" style={{ '--hero-tilt': `${tilt}deg` }}>
        <div className="hero-stage-meta"><span>41° 01′ N</span><span>29° 00′ E</span></div>
        <div className="hero-collar-wrap"><img src={redCollar} alt="Red Kedibul collar with QR tag" /><span className="hero-tag">QR</span></div>
        <div className="hero-stage-bottom"><span>IST / 2026</span><span>Scan. Know. Care.</span></div>
      </div>
    </section>
  );
}

function PhoneDemo({ t }) {
  const [ref, visible] = useReveal();
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    if (!visible) return undefined;
    const timer = window.setInterval(() => setActiveStep((step) => (step < 2 ? step + 1 : step)), 2400);
    return () => window.clearInterval(timer);
  }, [visible]);
  return (
    <section className="scan section-dark" id="scan" ref={ref}>
      <div className="scan-intro"><p className="eyebrow eyebrow-yellow">{t.scanLabel}</p><h2>{t.scanTitle}</h2><p>{t.scanBody}</p></div>
      <div className={`phone-demo ${visible ? 'is-scanning' : ''}`} aria-label="Animated profile scan demo">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="phone-top"><span>09:41</span><span>●●●</span></div>
          <div className="scan-heading"><span>KEDIBUL / PROFILE</span><b>● LIVE</b></div>
          <div className={`qr-box step-${activeStep}`} aria-label="Decorative QR code">
            {Array.from({ length: 49 }, (_, i) => <i key={i} className={(i % 7 === 0 || i % 11 === 0 || [0, 1, 2, 7, 14, 42, 43, 44, 35, 28].includes(i)) ? 'dark' : ''} />)}
            <span className="scan-line" />
          </div>
          <div className={`profile-card step-card-${activeStep}`}><div className="profile-avatar"><img src={misketPhoto} alt="Misket the cat" /></div><div><span className="profile-kicker">CAT PROFILE / 0042</span><h3>Misket</h3><p>📍 Karaköy, Mumhane Street</p></div><div className="profile-details"><span><b>Temperament</b>Friendly, observant</span><span><b>Last seen</b>By the blue door, 2 hours ago</span><span><b>Update</b>Wet food after the ferry rush. Fresh water nearby.</span></div><small>Last checked by a neighbor · 2 hours ago</small></div>
        </div>
      </div>
      <div className="scan-steps">{t.steps.map((step, index) => <div className={`scan-step ${activeStep === index ? 'is-active' : ''}`} key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div>
      <p className="scan-current"><span>0{activeStep + 1}</span>{t.stepLabels[activeStep]}</p>
    </section>
  );
}

function CollarSelector({ lang, t }) {
  const [selected, setSelected] = useState(2);
  const collar = collars[selected];
  return (
    <section className="collars section-paper" id="collars" style={{ '--selected-color': collar.color }}>
      <div className="section-heading"><p className="eyebrow" style={{ color: collar.color }}>{t.collarLabel}</p><h2>{t.collarTitle}</h2><p>{t.collarBody}</p></div>
      <div className="collar-layout"><div className="collar-feature" style={{ backgroundColor: collar.color }}><span className="feature-label">{lang === 'en' ? collar.badge : collar.trBadge}</span><img src={collar.image} alt={`${lang === 'en' ? collar.name : collar.tr} Kedibul collar`} /><div className="feature-copy"><strong>{lang === 'en' ? collar.name : collar.tr}</strong><span>{collar.price}</span></div></div>
        <div className="collar-options" role="listbox" aria-label="Choose a collar">
          {collars.map((item, index) => <button key={item.key} className={`collar-option ${selected === index ? 'selected' : ''}`} onClick={() => setSelected(index)} role="option" aria-selected={selected === index} style={{ '--option-color': item.color }}><span className="option-swatch" /><span><b>{lang === 'en' ? item.name : item.tr}</b><small>{lang === 'en' ? item.note : item.trNote}</small></span><i>{selected === index ? '↗' : '＋'}</i></button>)}
          <a className="button button-dark selector-button" href="#footer">{t.choose}<span>↗</span></a>
        </div>
      </div>
    </section>
  );
}

function MapSection({ t }) {
  const [ref, visible] = useReveal();
  const stats = [['39', 'Istanbul districts'], ['2,000+', 'Registered cats'], ['20+', 'Community updates'], ['10+', 'Partner clinics']];
  return (
    <section className="map-section section-dark" id="map" ref={ref}><div className="map-copy"><p className="eyebrow eyebrow-sage">{t.mapLabel}</p><h2>{t.mapTitle}</h2><p>{t.mapBody}</p><p className="map-caption">{t.mapCaption}</p></div><div className="map-visual"><svg viewBox="0 0 620 410" role="img" aria-label="Stylized map of Istanbul districts"><path className="map-land" d="M66 84c65-34 119-39 177-12 26 12 50 9 75-8 39-26 83-21 123 10l93 72-36 49-64-17-48 54-81-13-41 55-75-16-26-52-77-19-29-61z" /><path className="map-water" d="M300 24c-25 55-38 93-23 134 14 38 11 67-18 105l-26 44 31 16c39-48 61-90 55-129-6-40 20-84 62-141z" /><path className="map-line" d="M91 141l162 27 68-45 116 38 105-9M158 247l103-79 58 85 109-66M251 168l-17 108" />{[[140,130,'Kadıköy'], [342,103,'Beyoğlu'], [470,155,'Beşiktaş'], [245,270,'Üsküdar'], [400,260,'Fatih']].map(([x, y, name]) => <g className="map-pin" key={name} transform={`translate(${x} ${y})`}><circle className="pin-pulse" r="13" /><circle className="pin-dot" r="5" /><text x="12" y="4">{name}</text></g>)}</svg></div><div className="stats">{stats.map(([value, label]) => <div className="stat" key={label}><strong className={visible ? 'count-in' : ''}>{value}</strong><span>{label}</span></div>)}</div><p className="source-note">{t.source}</p></section>
  );
}

function Stories({ t }) {
  const stories = [['Misket', 'Karaköy', 'The ferry watcher', 'Friendly, observant', misketPhoto], ['Toby', 'Taksim', 'Guardian of the metro', 'Friendly, always on time', tobyPhoto], ['Zeytin', 'Moda', 'The quiet regular', 'Cautious, loves sardines', zeytinPhoto]];
  return <section className="stories section-paper" id="stories"><div className="section-heading"><p className="eyebrow">{t.storyLabel}</p><h2>{t.storyTitle}</h2><p>{t.storyBody}</p></div><div className="story-grid">{stories.map((story, index) => <Reveal className={`story-card story-${index + 1}`} key={story[0]}><div className="story-photo"><img src={story[4]} alt={`${story[0]} in ${story[1]}`} /><small>00{index + 1} / 03</small></div><div className="story-content"><p>{story[1]} · {story[3]}</p><h3>{story[0]}</h3><strong>{story[2]}</strong><span className="story-arrow">↗</span></div></Reveal>)}</div><p className="story-footer">{t.storyFooter} <span>↗</span></p></section>;
}

function Founders({ t }) {
  const founders = [['Iyed', iyedPhoto, 'Previously worked at a language-learning startup, bringing product thinking and field research to Kedibul.'], ['Wassam', wassamPhoto, 'Hands-on marketing and logistics experience, turning a good idea into something a neighborhood can use.']];
  return <section className="founders section-red"><div className="founder-copy"><p className="eyebrow eyebrow-paper">{t.founderLabel}</p><h2>{t.founderTitle}</h2><p>{t.founderBody}</p></div><div className="founder-grid">{founders.map(([name, image, bio]) => <article className="founder-card" key={name}><img src={image} alt={name} /><div><span>Co-founder</span><h3>{name}</h3><p>{bio}</p></div></article>)}</div></section>;
}

function Footer({ t, setLegal }) {
  return <footer className="footer section-dark" id="footer"><div><p className="eyebrow eyebrow-yellow">KEDIBUL / ISTANBUL</p><h2>{t.footerTitle}</h2><p>{t.footerBody}</p><span className="button button-yellow button-disabled" aria-disabled="true">{t.openApp}<span>↗</span></span></div><div className="footer-links"><a href="https://instagram.com/kedibul.app">Instagram ↗</a><a href="mailto:hello@kedibul.app">Contact ↗</a><button onClick={() => setLegal('privacy')}>{t.privacyTitle}</button><button onClick={() => setLegal('terms')}>{t.termsTitle}</button></div><div className="footer-bottom"><span>© 2026 Kedibul</span><span>{t.legal}</span><span>Istanbul, Türkiye</span></div></footer>;
}

function LegalPage({ type, t, setLegal }) {
  const isPrivacy = type === 'privacy';
  return <div className="legal-overlay" role="dialog" aria-modal="true" aria-labelledby="legal-title"><div className="legal-panel"><button className="legal-close" onClick={() => setLegal(null)} aria-label={t.legalClose}>×</button><p className="eyebrow">{isPrivacy ? t.privacyTitle : t.termsTitle}</p><h2 id="legal-title">{isPrivacy ? t.privacyTitle : t.termsTitle}</h2>{isPrivacy ? <><p>Kedibul uses the information you choose to share to keep community cat profiles useful and safe.</p><h3>What we collect</h3><p>Profile notes, neighborhood observations, and contact details you send to Kedibul. We do not ask for precise location access to browse a profile.</p><h3>Your choices</h3><p>You can request access, correction, or deletion of information connected to your account by emailing hello@kedibul.app.</p></> : <><p>Kedibul helps neighbors identify and support street cats. Use the service respectfully and only share information you have a reasonable basis to provide.</p><h3>Community updates</h3><p>Profiles are community-provided and may be incomplete or out of date. Do not publish private contact details, unsafe instructions, or misleading health claims.</p><h3>Service limits</h3><p>Kedibul is not a substitute for professional veterinary advice, emergency services, or a confirmed medical record.</p></>}<button className="button button-dark" onClick={() => setLegal(null)}>{t.legalClose}</button></div></div>;
}

function App() {
  const [lang, setLang] = useState('en');
  const [legal, setLegal] = useState(null);
  const t = copy[lang];
  return <><Grain /><Nav lang={lang} setLang={setLang} t={t} /><main><Hero t={t} /><PhoneDemo t={t} /><CollarSelector lang={lang} t={t} /><MapSection t={t} /><Stories t={t} /><Founders t={t} /><Footer t={t} setLegal={setLegal} /></main>{legal && <LegalPage type={legal} t={t} setLegal={setLegal} />}</>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
