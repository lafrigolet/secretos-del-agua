import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SectionPromotion from "./components/SectionPromotion";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import InstagramFeed from "./components/InstagramFeed";
import YouTubeFeed from "./components/YouTubeFeed";

import homeInfoActive from './assets/homeinfoactiv.png';
import homeFaceOtono from './assets/Home_face_otono.png';
import homeBodyOtono from './assets/Home_body_otono.png';
import homeRest from './assets/home_rest_reg2.png';
import homeUniverse from './assets/home_universe_3.jpg';
import investigation from './assets/investigacion_.jpg';
import photo from './assets/photo_2025-03-31_13-22-36.jpg';
import conciencia from './assets/conciencia.jpg';
import logoColor from './assets/logo-secretos-color_4f430c4.png';
import logoWhite from './assets/logo-secretos-white_bc4a2a1.png';


const storeSections = [
  {
    title: "Rostro",
    links: [
      { label: "Limpiadores", href: "https://www.secretosdelagua.com/categoria/rostro/limpiadores/" },
      { label: "Cuidado de Labios", href: "https://www.secretosdelagua.com/categoria/rostro/cuidado-de-labios/" },
      { label: "Tónicos", href: "https://www.secretosdelagua.com/categoria/rostro/tonicos/" },
      { label: "Contorno de Ojos", href: "https://www.secretosdelagua.com/categoria/rostro/contorno-de-ojos/" },
      { label: "Sérums", href: "https://www.secretosdelagua.com/categoria/rostro/serums/" },
      { label: "Cremas", href: "https://www.secretosdelagua.com/categoria/rostro/cremas/" },
      { label: "Exfoliantes y Mascarillas", href: "https://www.secretosdelagua.com/categoria/rostro/exfoliantes-y-mascarillas/" },
      { label: "Tratamientos faciales", href: "https://www.secretosdelagua.com/categoria/rostro/tratamientos-faciales/" },
      { label: "Ver todos", href: "https://www.secretosdelagua.com/categoria/rostro/" }
    ]
  },
  {
    title: "Cuerpo",
    links: [
      { label: "Cremas y Aceites", href: "https://www.secretosdelagua.com/categoria/cuerpo/cremas-y-aceites/" },
      { label: "Desodorante", href: "https://www.secretosdelagua.com/categoria/cuerpo/desodorante/" },
      { label: "Fragancias", href: "https://www.secretosdelagua.com/categoria/cuerpo/fragancias/" },
      { label: "Gel de Baño", href: "https://www.secretosdelagua.com/categoria/cuerpo/gel-de-bano/" },
      { label: "Manos y Uñas", href: "https://www.secretosdelagua.com/categoria/cuerpo/manos-y-unas/" },
      { label: "Tratamientos Corporales", href: "https://www.secretosdelagua.com/categoria/cuerpo/tratamientos-corporales/" },
      { label: "Ver todos", href: "https://www.secretosdelagua.com/categoria/cuerpo/" }
    ]
  },
  {
    title: "Cabello",
    links: [
      { label: "Champús", href: "https://www.secretosdelagua.com/categoria/cabello/champus/" },
      { label: "Acondicionadores", href: "https://www.secretosdelagua.com/categoria/cabello/acondicionadores/" },
      { label: "Mascarillas", href: "https://www.secretosdelagua.com/categoria/cabello/mascarillas/" },
      { label: "Sérums Capilares", href: "https://www.secretosdelagua.com/categoria/cabello/serums-capilares/" },
      { label: "Texturizadores", href: "https://www.secretosdelagua.com/categoria/cabello/texturizadores/" },
      { label: "Fijadores", href: "https://www.secretosdelagua.com/categoria/cabello/fijadores/" },
      { label: "Cepillos", href: "https://www.secretosdelagua.com/categoria/cabello/cepillos/" },
      { label: "Tratamientos Capilares", href: "https://www.secretosdelagua.com/categoria/cabello/tratamientos-capilares/" },
      { label: "Ver todos", href: "https://www.secretosdelagua.com/categoria/cabello/" }
    ]
  },
  {
    title: "Tratamientos",
    links: [
      { label: "Antiedad", href: "https://www.secretosdelagua.com/categoria/tratamientos/antiedad/" },
      { label: "Detox", href: "https://www.secretosdelagua.com/categoria/tratamientos/detox/" },
      { label: "Iluminante", href: "https://www.secretosdelagua.com/categoria/tratamientos/iluminante/" },
      { label: "Masculina", href: "https://www.secretosdelagua.com/categoria/tratamientos/masculina/" },
      { label: "Sensitiva", href: "https://www.secretosdelagua.com/categoria/tratamientos/sensitiva/" },
      { label: "Ver todos", href: "https://www.secretosdelagua.com/categoria/tratamientos/" }
    ]
  },
  {
    title: "Protectores solares",
    links: [
      { label: "Faciales", href: "https://www.secretosdelagua.com/categoria/protectores-solares/faciales/" },
      { label: "Corporales", href: "https://www.secretosdelagua.com/categoria/protectores-solares/corporales/" },
      { label: "Capilares", href: "https://www.secretosdelagua.com/categoria/protectores-solares/capilares/" },
      { label: "Ver todos", href: "https://www.secretosdelagua.com/categoria/protectores-solares/" }
    ]
  },
  {
    title: "Color",
    links: [
      { label: "Coloración directa", href: "https://www.secretosdelagua.com/coloracion-directa/" },
      { label: "Oxidantes & Reveladores", href: "https://www.secretosdelagua.com/oxidantes-reveladores/" },
      { label: "Tratamientos de color", href: "https://www.secretosdelagua.com/tratamientos-de-color/" },
    ],
  },
  {
    title: "Salones",
    links: [
      { label: "Buscar tu salón", href: "https://www.secretosdelagua.com/salones/" },
      { label: "Salón Store Madrid", href: "https://www.secretosdelagua.com/salones/madrid/" },
      { label: "Salón Store Sevilla", href: "https://www.secretosdelagua.com/salones/sevilla/" },
    ],
  },
  {
    title: "Universo",
    links: [
      { label: "Más Allá de la Piel", href: "https://www.secretosdelagua.com/mas-alla-de-la-piel/" },
      { label: "Cultura de Color", href: "https://www.secretosdelagua.com/cultura-de-color/" },
      { label: "Agua Biopolar™", href: "https://www.secretosdelagua.com/agua-biopolar/" },
      { label: "Secretos del Agua", href: "https://www.secretosdelagua.com/universo/" },
    ],
  },
];

const menuItems = [
  { label: "Rostro", dropdown: storeSections.filter((s) => s.title === "Rostro") },
  { label: "Cuerpo", dropdown: storeSections.filter((s) => s.title === "Cuerpo") },
  { label: "Cabello", dropdown: storeSections.filter((s) => s.title === "Cabello") },
  { label: "Tratamientos", dropdown: storeSections.filter((s) => s.title === "Tratamientos") },
  { label: "Protectores solares", dropdown: storeSections.filter((s) => s.title === "Protectores solares") },
  { label: "Color", dropdown: storeSections.filter((s) => s.title === "Color") },
  { label: "Salones", dropdown: storeSections.filter((s) => s.title === "Salones") },
  { label: "Universo", dropdown: storeSections.filter((s) => s.title === "Universo") },
  { label: "Área formativa", href: "https://areaformativa.secretosdelagua.com" },
];

const legal =  {
  title: "Legal",
  links: [
    { label: "Aviso Legal", href: "https://www.secretosdelagua.com/aviso-legal/" },
    { label: "Política de Privacidad", href: "https://www.secretosdelagua.com/politica-de-privacidad/" },
    { label: "Política de Cookies", href: "https://www.secretosdelagua.com/politica-de-cookies/" },
    { label: "Condiciones de Compra", href: "https://www.secretosdelagua.com/condiciones-de-compra/" },
  ],
};


const products = [
  { img: homeUniverse,
    title: "UNIVERSO",
    text: "El Agua Biopolar™ es capaz de transformar la piel desde la célula con resultados avalados científicamente." },
  { img: investigation,
    title: "INVESTIGACIÓN",
    text: "El equipo de investigación de Secretos del Agua descubre el Agua Biopolar™." },
  { img: photo,
    title: "BELLEZA Y SALUD",
    text: "Sin químicos y con ingredientes saludables que actúan más allá de la piel." },
  { img: conciencia, 
    title: "CONCIENCIA",
    text: "Nuestra Misión es crear un mundo más bello, saludable y sostenible." },
];

//       <YouTubeFeed playlist="PLoUv2zo_OUSVfaFLQ1EE-EBIONWLBgNMc" />
//       <YouTubeFeed playlist="PLoUv2zo_OUSVR4QQg7z2Tw3XgYuEj5Bfa" scrollDirection="right" />

export default function App() {
  return (
    <div className="bg-secondary text-gray-900">
      <Navbar logo={logoWhite} menuItems={menuItems} />
      <SectionPromotion
        title="FUERZA Contra la Caída"
        subtitle="Este otoño protege tu cabello con el Infoactivo Fuerza, diseñado para frenar la caída estacional."
        image={homeInfoActive}
      />
      <ProductGrid products={products} />
      <SectionPromotion
        title="RITUAL de Calma y Renovación"
        subtitle="Este otoño... mima tu piel con nuestra línea de cuidado facial."
        image={homeFaceOtono}
      />
      <SectionPromotion
        title="OTOÑO en Equilibrio"
        subtitle="Regálale a tu piel el confort diario de nuestra línea Bodycare"
        image={homeBodyOtono}
      />
      <SectionPromotion
        title="RECONECTA con lo esencial"
        subtitle="Por la compra del Restaurador Biolaminar 200 ml, una Crema Regeneradora 10 ml de REGALO."
        image={homeRest}
      />
      <InstagramFeed username="secretosdelagua" />
      <Footer storeSections={[...storeSections, legal]} />
    </div>
  );
}
