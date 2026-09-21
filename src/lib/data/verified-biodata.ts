/**
 * VERIFIED BIODATA — single source of truth
 * -------------------------------------------------
 * Every value here comes directly from the official biodata supplied for
 * Rameshwar Parmeshwar More. Nothing below is invented. `prisma/seed.ts`
 * loads this file to populate the database on first setup.
 *
 * When real, additional facts are confirmed (new awards, events, articles,
 * testimonials, etc.) add them here or directly through the Admin Panel —
 * do not hardcode unverified numbers anywhere else in the codebase.
 */

export const profile = {
  fullName: "Rameshwar Parmeshwar More",
  designation: "Founder of Suryaseva Green Energy Pvt Ltd | Kirtankar | Speaker | Researcher | Social Contributor",
  tagline: "Connecting Tradition, Knowledge, Literature and Social Awareness.",
  email: "rameshwarmore9964@gmail.com",
  phone: "7517363644",
  address: "Talukhed, Taluka Majalgaon, District Beed, Maharashtra",
  dateOfBirth: "2003-02-12",
  languagesSpoken: "Marathi, Hindi, English",
  yearsOfKirtan: 10,
  aboutShort:
    "Rameshwar Parmeshwar More is a young Marathi cultural and knowledge-oriented personality whose work connects Kirtan, literature, public speaking, research, youth-oriented initiatives, social awareness and educational activities.",
  aboutLong:
    "For over ten years, Rameshwar has used Kirtan as a medium of public awareness and social communication, carrying the traditions of Marathi Sant literature to audiences across Maharashtra. Alongside his Kirtan practice, he has built a parallel identity as a researcher and post-graduate student of Marathi literature, a public speaker invited to state and national forums, and a coordinator of youth-facing career and education programs through the Career Katta initiative. His work sits at the intersection of culture, knowledge, and social awareness — combining a grounding in Sant literature with an active interest in agriculture, technology, and youth development.",
};

export const education = [
  {
    level: "SSC",
    institution: "Aurangabad Division",
    boardOrUni: "Aurangabad Divisional Board",
    year: 2019,
    order: 1,
  },
  {
    level: "HSC",
    institution: "Aurangabad Division",
    boardOrUni: "Aurangabad Divisional Board",
    year: 2021,
    order: 2,
  },
  {
    level: "B.A.",
    institution: "Dr. Babasaheb Ambedkar Marathwada University, Aurangabad",
    boardOrUni: "Dr. Babasaheb Ambedkar Marathwada University",
    year: 2024,
    order: 3,
  },
  {
    level: "M.A. Marathi",
    institution: "Savitribai Phule Pune University",
    boardOrUni: "Savitribai Phule Pune University",
    year: 2026,
    percentage: 72.2,
    order: 4,
  },
];

export const researchProjects = [
  {
    title: "Study of the Philosophy in the Abhangas of Sant Muktabai",
    type: "Dissertation",
    description:
      "Completed as part of the M.A. Marathi curriculum, examining the philosophical themes present in the Abhangas of Sant Muktabai.",
    year: 2026,
    order: 1,
  },
  {
    title: "Anandvari: Ek Aakalan",
    type: "Dissertation",
    description: "Completed as part of the M.A. Marathi curriculum.",
    year: 2026,
    order: 2,
  },
];

export const publications = [
  {
    title: "Indian Knowledge System",
    journal: "International Research Journal",
    publisher: "B.J.S. College, Pune",
    eIssn: "2348-7143",
    month: "January",
    year: 2026,
    order: 1,
  },
];

export const journeyItems = [
  {
    title: "Career Katta — Divisional Planning Coordinator",
    organization:
      "Maharashtra State Higher & Technical Education Department & Maharashtra Information Technology Support Centre",
    description:
      "Divisional program planning, coordination and organization of youth-oriented educational and career initiatives under the Career Katta program.",
    startYear: 2025,
    endYear: null,
    category: "EXPERIENCE",
    order: 1,
  },
  {
    title: "10 Years of Kirtan & Social Awareness",
    organization: null,
    description:
      "A decade of using Kirtan as a medium of public awareness and social communication across Maharashtra.",
    startYear: null,
    endYear: null,
    category: "KIRTAN",
    order: 0,
  },
];

export const awards = [
  {
    title: "Career Sansad Outstanding Officer State-Level Award",
    organization: "Government of Maharashtra",
    order: 1,
    featured: true,
  },
  {
    title: "Sant Sahitya Prajna Award",
    organization: "Sant Eknath Maharaj Mission, Paithan",
    order: 2,
    featured: true,
  },
  {
    title: "Special Invitation — Meri Mati Mera Desh Closing Ceremony",
    organization: "Government of India",
    description:
      "Specially invited to attend the closing ceremony of the Meri Mati Mera Desh program in Delhi, in the presence of Prime Minister Narendra Modi.",
    location: "Delhi",
    order: 3,
    featured: true,
  },
  {
    title: "National Integration Camp — Participant",
    organization: "Government of India",
    location: "Hevra, Uttar Pradesh",
    order: 4,
    featured: false,
  },
  {
    title: "Fourth Indrayani Literary Conference — Discussant (Charchak)",
    organization: "Indrayani Literary Conference",
    order: 5,
    featured: false,
  },
  {
    title: "Recognition in Mumbai",
    organization: "Honoured by Industry Minister Uday Samant",
    location: "Mumbai",
    order: 6,
    featured: false,
  },
];

export const lectures = [
  {
    title: "Lecture at the Fourth Indrayani Literary Conference",
    type: "CONFERENCE",
    location: "Pune",
    order: 1,
  },
  {
    title:
      "Discussant — \"Sant Tukaram Maharaj: Literary Reflection and Critical Study\" (two-day state-level discussion session)",
    type: "DISCUSSION",
    organizer:
      "Savitribai Phule Pune University, Sant Tukaram Maharaj Chair, Department of Marathi",
    order: 2,
  },
  {
    title: "Central Youth Festival 2022 — Participant, various art forms",
    type: "CONFERENCE",
    organizer: "Dr. Babasaheb Ambedkar Marathwada University, Aurangabad",
    year: 2022,
    order: 3,
  },
  {
    title:
      "National Discussion Session on the Literature of Dr. Tukaram Romte — Discussant",
    type: "DISCUSSION",
    order: 4,
  },
  {
    title: "Startup Ecosystem in Higher Education — Train the Trainer Level 1",
    type: "WORKSHOP",
    order: 5,
  },
  {
    title: "Clean Cooking and Solar Concentrator Technologies Workshop",
    type: "WORKSHOP",
    location: "Dhule",
    order: 6,
  },
  {
    title: "Special Lecture — Seven-Day NSS Special Labour Camp",
    type: "LECTURE",
    organizer: "Pandit Jawaharlal Nehru College, Aurangabad",
    location: "Bhindon, Chhatrapati Sambhajinagar District",
    order: 7,
  },
  {
    title: "Special Lecture — Seven-Day NSS Special Labour Camp",
    type: "LECTURE",
    organizer: "Sundarrao Solanke College, Majalgaon",
    location: "Laul, Beed District",
    order: 8,
  },
  {
    title: "Five-Day State-Level Career Sansad Convention — Participant",
    type: "CONFERENCE",
    organizer: "Career Katta",
    order: 9,
  },
  {
    title: "Two Visits — Krishi Vigyan Kendra, Baramati",
    type: "LECTURE",
    location: "Baramati",
    order: 10,
  },
];

export const certifications = [
  {
    title: "MS-CIT",
    issuer: "MKCL",
    score: "71%",
    date: "2026-01-01",
    order: 1,
  },
  {
    title: "English Language Skills, Communication Skills and Soft Skills",
    issuer: "MKCL",
    score: "76%",
    order: 2,
  },
  {
    title: "Basic Information Technology Skills",
    issuer: "MKCL",
    score: "77%",
    order: 3,
  },
  {
    title: "Hardware and Networking",
    issuer: "MKCL",
    score: "82%",
    order: 4,
  },
];

export const skills = [
  "Public Speaking",
  "Communication Skills",
  "Leadership",
  "Coordination",
  "Teamwork",
  "Management Skills",
  "Socially-Oriented Perspective",
  "Event Organization",
  "Program Coordination",
];

export const seoKeywords = [
  "Rameshwar More",
  "Rameshwar More Kirtankar",
  "Rameshwar More Kirtan",
  "Rameshwar More Maharashtra",
  "Marathi Kirtan",
  "Kirtankar Maharashtra",
  "Marathi Speaker",
  "Marathi Literature",
  "Sant Literature",
  "Marathi Spiritual Speaker",
];
