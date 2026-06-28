import {
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardSignature,
  FileText,
  Gavel,
  Handshake,
  Home,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Locale = "en" | "ne";
export type LocalizedText = string | Record<Locale, string>;
export type WithIcon = {
  icon: LucideIcon;
};

export const firm = {
  name: "Law Lens Nepal",
  tagline: "Legal Solutions | Advocacy & Consultancy",
  leadAdvocate: "Anil Kumar Sah",
  location: {
    en: "Maitighar, Kathmandu, Nepal",
    ne: "माइतीघर, काठमाडौं, नेपाल",
  },
  shortLocation: {
    en: "Maitighar, Kathmandu",
    ne: "माइतीघर, काठमाडौं",
  },
  phone: "9840349555, 9824210365",
  email: "lawlensnepal@gmail.com",
  advocateEmail: "anilsah341@gmail.com",
  hours: {
    en: "Sunday - Friday, 10:00 AM - 5:00 PM",
    ne: "आइतबार - शुक्रबार, बिहान १०:०० - साँझ ५:००",
  },
  // Replace this with the final Google Maps embed URL for Maitighar or the office location.
  mapEmbedUrl: "",
};

export const languages = [
  { code: "en", shortLabel: "EN", label: "English" },
  { code: "ne", shortLabel: "ने", label: "नेपाली" },
] as const;

export const navLinks = [
  { label: { en: "Home", ne: "गृहपृष्ठ" }, href: "#home" },
  { label: { en: "About", ne: "परिचय" }, href: "#about" },
  { label: { en: "Services", ne: "सेवा" }, href: "#services" },
  { label: { en: "Process", ne: "प्रक्रिया" }, href: "#process" },
  { label: { en: "Publication", ne: "प्रकाशन" }, href: "/blog" },
  { label: { en: "Contact", ne: "सम्पर्क" }, href: "#contact" },
];

export const practiceAreas = [
  {
    title: { en: "Corporate and Business Law", ne: "कर्पोरेट तथा व्यवसायिक कानुन" },
    description: {
      en: "Practical support for company matters, governance, compliance, and business transactions.",
      ne: "कम्पनी सम्बन्धी विषय, शासन, अनुपालन र व्यवसायिक कारोबारका लागि व्यावहारिक कानुनी सहयोग।",
    },
    icon: BriefcaseBusiness,
  },
  {
    title: { en: "Civil Litigation and Dispute Resolution", ne: "देवानी मुद्दा तथा विवाद समाधान" },
    description: {
      en: "Focused assistance for civil disputes, negotiation, documentation, and representation-related support.",
      ne: "देवानी विवाद, वार्ता, कागजात तयारी र प्रतिनिधित्वसम्बन्धी सहयोगका लागि केन्द्रित सेवा।",
    },
    icon: Gavel,
  },
  {
    title: { en: "Criminal Law Assistance", ne: "फौजदारी कानुनी सहायता" },
    description: {
      en: "Professional guidance for criminal law concerns, case preparation, and procedural support.",
      ne: "फौजदारी कानुनका विषय, मुद्दा तयारी र प्रक्रियागत सहयोगका लागि व्यावसायिक मार्गदर्शन।",
    },
    icon: Scale,
  },
  {
    title: { en: "Family Law and Property Matters", ne: "पारिवारिक कानुन तथा सम्पत्ति विषय" },
    description: {
      en: "Clear advice for family matters, inheritance concerns, property disputes, and settlement documentation.",
      ne: "पारिवारिक विषय, उत्तराधिकार, सम्पत्ति विवाद र मिलापत्र कागजातका लागि स्पष्ट सल्लाह।",
    },
    icon: Home,
  },
  {
    title: { en: "Contract Drafting and Legal Documentation", ne: "सम्झौता मस्यौदा तथा कानुनी कागजात" },
    description: {
      en: "Drafting, review, and refinement of contracts, applications, notices, agreements, and legal papers.",
      ne: "सम्झौता, निवेदन, सूचना, करार र कानुनी कागजातको मस्यौदा, समीक्षा र परिमार्जन।",
    },
    icon: ClipboardSignature,
  },
  {
    title: { en: "Banking, Finance, and Recovery Matters", ne: "बैंकिङ, वित्त तथा असुली विषय" },
    description: {
      en: "Legal support for finance documentation, recovery matters, and banking-related disputes.",
      ne: "वित्तीय कागजात, असुली प्रक्रिया र बैंकिङसम्बन्धी विवादका लागि कानुनी सहयोग।",
    },
    icon: Banknote,
  },
  {
    title: { en: "Employment and Labor Law", ne: "रोजगार तथा श्रम कानुन" },
    description: {
      en: "Advice for employment contracts, workplace disputes, policy documents, and labor compliance.",
      ne: "रोजगार करार, कार्यस्थल विवाद, नीति कागजात र श्रम अनुपालनका लागि सल्लाह।",
    },
    icon: Users,
  },
  {
    title: { en: "Legal Consultation and Advisory", ne: "कानुनी परामर्श तथा सल्लाह" },
    description: {
      en: "Structured consultations that help clients understand legal position, options, and next steps.",
      ne: "ग्राहकलाई आफ्नो कानुनी अवस्था, विकल्प र आगामी कदम बुझ्न मद्दत गर्ने संरचित परामर्श।",
    },
    icon: MessageSquareText,
  },
  {
    title: {
      en: "Land, Property, and Malpot-related Legal Support",
      ne: "जग्गा, सम्पत्ति तथा मालपोतसम्बन्धी सहयोग",
    },
    description: {
      en: "Support for land ownership, property documentation, Malpot procedures, and related legal issues.",
      ne: "जग्गा स्वामित्व, सम्पत्ति कागजात, मालपोत प्रक्रिया र सम्बन्धित कानुनी विषयमा सहयोग।",
    },
    icon: Landmark,
  },
  {
    title: {
      en: "Government Office and Administrative Legal Support",
      ne: "सरकारी कार्यालय तथा प्रशासनिक कानुनी सहयोग",
    },
    description: {
      en: "Guidance for administrative processes, applications, official correspondence, and public office matters.",
      ne: "प्रशासनिक प्रक्रिया, निवेदन, आधिकारिक पत्राचार र सरकारी कार्यालयका विषयमा मार्गदर्शन।",
    },
    icon: Building2,
  },
];

export const values = [
  {
    title: { en: "Confidentiality", ne: "गोपनीयता" },
    description: {
      en: "Sensitive legal matters are handled with care, discretion, and professional responsibility.",
      ne: "संवेदनशील कानुनी विषयहरू सावधानी, विवेक र व्यावसायिक जिम्मेवारीका साथ सम्हालिन्छन्।",
    },
    icon: LockKeyhole,
  },
  {
    title: { en: "Clarity", ne: "स्पष्टता" },
    description: {
      en: "Clients receive plain-language advice, realistic options, and clear next steps.",
      ne: "ग्राहकले सरल भाषामा सल्लाह, यथार्थपरक विकल्प र स्पष्ट आगामी कदम प्राप्त गर्छन्।",
    },
    icon: FileText,
  },
  {
    title: { en: "Integrity", ne: "इमानदारी" },
    description: {
      en: "The firm maintains ethical communication and avoids promises about legal outcomes.",
      ne: "फर्मले नैतिक संवाद कायम राख्छ र कानुनी परिणामबारे अवास्तविक वाचा गर्दैन।",
    },
    icon: ShieldCheck,
  },
  {
    title: { en: "Practical Advice", ne: "व्यावहारिक सल्लाह" },
    description: {
      en: "Recommendations are grounded in Nepal's legal and administrative process.",
      ne: "सिफारिसहरू नेपालको कानुनी तथा प्रशासनिक प्रक्रियामा आधारित हुन्छन्।",
    },
    icon: CheckCircle2,
  },
];

export const whyChooseUs = [
  { en: "Clear legal advice", ne: "स्पष्ट कानुनी सल्लाह" },
  { en: "Client-focused representation", ne: "ग्राहक केन्द्रित प्रतिनिधित्व" },
  { en: "Confidential handling of matters", ne: "विषयको गोपनीय व्यवस्थापन" },
  { en: "Practical solutions", ne: "व्यावहारिक समाधान" },
  {
    en: "Local understanding of Nepal's legal and administrative system",
    ne: "नेपालको कानुनी तथा प्रशासनिक प्रणालीको स्थानीय बुझाइ",
  },
  { en: "Professional communication", ne: "व्यावसायिक संवाद" },
];

export const processSteps = [
  {
    title: { en: "Share your legal issue", ne: "आफ्नो कानुनी विषय साझा गर्नुहोस्" },
    description: {
      en: "Send a short summary of the matter, key documents, and the result you are seeking.",
      ne: "विषयको छोटो सार, मुख्य कागजात र अपेक्षित नतिजाबारे जानकारी पठाउनुहोस्।",
    },
  },
  {
    title: { en: "Initial consultation", ne: "प्रारम्भिक परामर्श" },
    description: {
      en: "Discuss facts, timelines, immediate risks, and the legal options available.",
      ne: "तथ्य, समयसीमा, तत्काल जोखिम र उपलब्ध कानुनी विकल्पबारे छलफल गर्नुहोस्।",
    },
  },
  {
    title: { en: "Legal strategy and documentation", ne: "कानुनी रणनीति तथा कागजात" },
    description: {
      en: "Prepare the approach, required documents, filings, notices, or correspondence.",
      ne: "आवश्यक रणनीति, कागजात, दर्ता, सूचना वा पत्राचार तयार गरिन्छ।",
    },
  },
  {
    title: { en: "Action and follow-up", ne: "कारबाही तथा फलो-अप" },
    description: {
      en: "Move forward with the agreed legal steps and keep communication clear throughout.",
      ne: "सहमति भएका कानुनी कदम अघि बढाइन्छ र सम्पूर्ण प्रक्रियामा स्पष्ट संवाद राखिन्छ।",
    },
  },
];

export const clientGroups = [
  { en: "Individuals", ne: "व्यक्ति" },
  { en: "Startups", ne: "स्टार्टअप" },
  { en: "Businesses", ne: "व्यवसाय" },
  { en: "Land and property owners", ne: "जग्गा तथा सम्पत्ति धनी" },
  { en: "Families", ne: "परिवार" },
  { en: "Organizations", ne: "संस्था" },
];

export const contactCards = [
  { label: { en: "Visit", ne: "ठेगाना" }, value: firm.location, icon: MapPin },
  { label: { en: "Advocate", ne: "अधिवक्ता" }, value: firm.leadAdvocate, icon: Scale },
  { label: { en: "Call", ne: "फोन" }, value: firm.phone, icon: Phone },
  { label: { en: "Email", ne: "इमेल" }, value: firm.email, icon: Mail },
  { label: { en: "Advocate Email", ne: "अधिवक्ताको इमेल" }, value: firm.advocateEmail, icon: Mail },
  { label: { en: "Hours", ne: "कार्यालय समय" }, value: firm.hours, icon: BadgeCheck },
];

export const highlights = [
  {
    value: { en: "Maitighar", ne: "माइतीघर" },
    label: { en: "Kathmandu-based legal office", ne: "काठमाडौंस्थित कानुनी कार्यालय" },
  },
  { value: "10+", label: { en: "Practice support areas", ne: "सेवा क्षेत्रहरू" } },
  {
    value: { en: "Client-first", ne: "ग्राहक केन्द्रित" },
    label: { en: "Professional legal guidance", ne: "व्यावसायिक कानुनी मार्गदर्शन" },
  },
];

export const uiText = {
  en: {
    navCta: "Book a Consultation",
    heroEyebrow: "Law Firm in Maitighar, Kathmandu",
    heroTitle: "Clear Legal Guidance. Strong Representation. Trusted Counsel in Nepal.",
    heroBody:
      "Law Lens Nepal provides practical legal solutions for individuals, businesses, and organizations from Maitighar, Kathmandu.",
    viewServices: "View Services",
    aboutEyebrow: "About Law Lens Nepal",
    aboutTitle: "Practical counsel with a client-first approach",
    aboutIntro:
      "Based in Maitighar, Kathmandu, Law Lens Nepal helps clients understand their legal position, prepare the right documents, and move forward with confidence.",
    aboutBody:
      "The firm is built around clear communication, careful preparation, and responsible legal support. Clients can expect practical advice, confidential handling of matters, and professional guidance suited to Nepal's legal and administrative environment.",
    servicesEyebrow: "Practice Areas",
    servicesTitle: "Legal services for personal, business, and administrative matters",
    servicesIntro:
      "From documentation and advisory work to dispute support and representation-related assistance, the firm helps clients approach legal matters with structure.",
    whyEyebrow: "Why Choose Us",
    whyTitle: "Professional support shaped around the matter",
    whyIntro:
      "Legal issues can be stressful and time-sensitive. Law Lens Nepal focuses on practical communication, document readiness, and careful follow-up at each step.",
    processEyebrow: "Consultation Process",
    processTitle: "A clear path from first concern to next action",
    processIntro:
      "The process is designed to help clients share facts, understand options, and proceed with organized legal steps.",
    supportEyebrow: "Client-Focused Legal Support",
    supportTitle: "Support for different legal and administrative needs",
    supportIntro:
      "The firm assists individuals, startups, businesses, land and property owners, families, and organizations with legal guidance suited to their circumstances.",
    contactEyebrow: "Contact",
    contactTitle: "Book a consultation with Law Lens Nepal",
    contactIntro:
      "Share a short summary of your legal issue and the office will guide you on possible next steps.",
    mapTitle: "Maitighar, Kathmandu",
    mapPlaceholder: "Google Maps embed placeholder",
    formName: "Name",
    formPhone: "Phone",
    formEmail: "Email",
    formIssueType: "Legal Issue Type",
    formIssuePlaceholder: "Select a matter",
    formMessage: "Message",
    formSubmit: "Send Consultation Request",
    formStatus:
      "Thank you. Please call or email the office to confirm your consultation request.",
    footerSummary:
      "Professional legal consultation, documentation, dispute support, and client-focused legal guidance in Nepal.",
    footerQuickLinks: "Quick Links",
    footerPracticeAreas: "Practice Areas",
    footerContactInfo: "Contact Info",
    disclaimer:
      "The information on this website is for general informational purposes only and does not constitute legal advice. Contacting Law Lens Nepal through this website does not create a lawyer-client relationship unless formally agreed.",
    rights: "All rights reserved.",
    languageLabel: "Language",
  },
  ne: {
    navCta: "परामर्श बुक गर्नुहोस्",
    heroEyebrow: "माइतीघर, काठमाडौंमा कानुनी फर्म",
    heroTitle: "स्पष्ट कानुनी मार्गदर्शन। बलियो प्रतिनिधित्व। नेपालमा विश्वसनीय परामर्श।",
    heroBody:
      "ल लेंस नेपालले माइतीघर, काठमाडौंबाट व्यक्ति, व्यवसाय र संस्थाहरूका लागि व्यावहारिक कानुनी समाधान प्रदान गर्दछ।",
    viewServices: "सेवा हेर्नुहोस्",
    aboutEyebrow: "ल लेंस नेपालको परिचय",
    aboutTitle: "ग्राहक केन्द्रित दृष्टिकोणसहित व्यावहारिक कानुनी परामर्श",
    aboutIntro:
      "माइतीघर, काठमाडौंमा आधारित ल लेंस नेपालले ग्राहकलाई आफ्नो कानुनी अवस्था बुझ्न, आवश्यक कागजात तयार गर्न र आत्मविश्वासका साथ अघि बढ्न सहयोग गर्छ।",
    aboutBody:
      "फर्म स्पष्ट संवाद, सावधानीपूर्वक तयारी र जिम्मेवार कानुनी सहयोगमा केन्द्रित छ। ग्राहकले नेपालको कानुनी तथा प्रशासनिक वातावरणअनुसार व्यावहारिक सल्लाह, गोपनीय व्यवस्थापन र व्यावसायिक मार्गदर्शन प्राप्त गर्छन्।",
    servicesEyebrow: "सेवा क्षेत्र",
    servicesTitle: "व्यक्ति, व्यवसाय र प्रशासनिक विषयका लागि कानुनी सेवा",
    servicesIntro:
      "कागजात तथा सल्लाहदेखि विवाद सहयोग र प्रतिनिधित्वसम्बन्धी सहायतालाई व्यवस्थित ढंगले अघि बढाउन फर्मले सहयोग गर्दछ।",
    whyEyebrow: "हामीलाई किन रोज्ने",
    whyTitle: "विषयअनुसार तयार गरिएको व्यावसायिक सहयोग",
    whyIntro:
      "कानुनी विषय तनावपूर्ण र समय संवेदनशील हुन सक्छ। ल लेंस नेपालले व्यावहारिक संवाद, कागजात तयारी र प्रत्येक चरणमा सावधानीपूर्ण फलो-अपमा ध्यान दिन्छ।",
    processEyebrow: "परामर्श प्रक्रिया",
    processTitle: "पहिलो चासोदेखि आगामी कदमसम्म स्पष्ट प्रक्रिया",
    processIntro:
      "यो प्रक्रिया ग्राहकलाई तथ्य साझा गर्न, विकल्प बुझ्न र व्यवस्थित कानुनी कदम अघि बढाउन सहयोग गर्ने गरी बनाइएको छ।",
    supportEyebrow: "ग्राहक केन्द्रित कानुनी सहयोग",
    supportTitle: "विभिन्न कानुनी तथा प्रशासनिक आवश्यकताका लागि सहयोग",
    supportIntro:
      "फर्मले व्यक्ति, स्टार्टअप, व्यवसाय, जग्गा तथा सम्पत्ति धनी, परिवार र संस्थाहरूलाई उनीहरूको परिस्थितिअनुसार कानुनी मार्गदर्शन प्रदान गर्दछ।",
    contactEyebrow: "सम्पर्क",
    contactTitle: "ल लेंस नेपालसँग परामर्श बुक गर्नुहोस्",
    contactIntro:
      "आफ्नो कानुनी विषयको छोटो विवरण पठाउनुहोस्, कार्यालयले सम्भावित आगामी कदमबारे मार्गदर्शन गर्नेछ।",
    mapTitle: "माइतीघर, काठमाडौं",
    mapPlaceholder: "गुगल म्याप्स एम्बेड स्थान",
    formName: "नाम",
    formPhone: "फोन",
    formEmail: "इमेल",
    formIssueType: "कानुनी विषयको प्रकार",
    formIssuePlaceholder: "विषय छान्नुहोस्",
    formMessage: "सन्देश",
    formSubmit: "परामर्श अनुरोध पठाउनुहोस्",
    formStatus:
      "धन्यवाद। कृपया आफ्नो परामर्श अनुरोध पुष्टि गर्न कार्यालयमा फोन वा इमेल गर्नुहोस्।",
    footerSummary:
      "नेपालमा व्यावसायिक कानुनी परामर्श, कागजात सहयोग, विवाद सहयोग र ग्राहक केन्द्रित कानुनी मार्गदर्शन।",
    footerQuickLinks: "छिटो लिंक",
    footerPracticeAreas: "सेवा क्षेत्र",
    footerContactInfo: "सम्पर्क जानकारी",
    disclaimer:
      "यस वेबसाइटमा रहेको जानकारी सामान्य सूचनाका लागि मात्र हो र यसले कानुनी सल्लाहको रूपमा काम गर्दैन। यस वेबसाइटमार्फत ल लेंस नेपाललाई सम्पर्क गर्नुले औपचारिक सहमति नभएसम्म वकिल-ग्राहक सम्बन्ध सिर्जना गर्दैन।",
    rights: "सबै अधिकार सुरक्षित।",
    languageLabel: "भाषा",
  },
};

export { Handshake, Scale as BrandMark };
