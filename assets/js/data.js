const TECH_STACK_DEV = [
  { name: "HTML5", icon: "code-2" },
  { name: "CSS3", icon: "palette" },
  { name: "Tailwind CSS", icon: "wind" },
  { name: "JavaScript", icon: "file-code" },
  { name: "Laravel", icon: "flame" },
  { name: "PHP", icon: "server" },
  { name: "Node.js", icon: "hexagon" },
  { name: "MySQL", icon: "database" },
  { name: "PostgreSQL", icon: "database-zap" },
  { name: "Git", icon: "git-branch" },
  { name: "Figma", icon: "figma" },
];

const TECH_STACK_SEC = [
  { name: "Nmap", icon: "radar" },
  { name: "Wireshark", icon: "activity" },
  { name: "Burp Suite", icon: "bug" },
  { name: "Metasploit", icon: "zap" },
  { name: "Kali Linux", icon: "terminal" },
  { name: "OWASP ZAP", icon: "shield-alert" },
  { name: "John the Ripper", icon: "key-round" },
  { name: "Nessus", icon: "shield-check" },
  { name: "Hydra", icon: "unlock" },
  { name: "SQLmap", icon: "database-zap" },
  { name: "Nikto", icon: "search-code" },
  { name: "Frida", icon: "atom" },
];

const EDUCATION = [
  {
    logo: "UTY",
    school: "University of Technology Yogyakarta",
    major: "S1 Informatics",
    year: "2020 — 2024",
    desc: "Earned a Bachelor's degree in Informatics with a strong academic foundation in Software Engineering and Cybersecurity. Throughout my studies, I explored secure software development, web application security, computer networks, databases, and vulnerability analysis, building the technical knowledge that supports my interests in penetration testing and application security.",
  },
  {
    logo: "SMK",
    school: "SMK Negeri 4 Bandar Lampung",
    major: "Software Engineering",
    year: "2017 — 2020",
    desc: "Graduated from the Software Engineering (RPL) program with foundational knowledge in software development, cybersecurity, computer networking, UI/UX design, and IoT. Gained early experience in designing and developing web, desktop, and mobile applications.",
  },
];

const EXPERIENCE = [
  {
    logo: "HTR",
    company: "PT Hacktrace Siber Indonesia",
    role: "Junior Pentester",
    duration: "May 2026 — June 2026",
    location: "Remote · Jakarta, Indonesia",
    desc: "Conducted web and Android penetration testing engagements to identify security vulnerabilities across applications and systems. Performed vulnerability assessments, exploitation, post-exploitation analysis, and technical reporting while providing practical remediation recommendations to strengthen application security and reduce security risks.",
  },
  {
    logo: "SE",
    company: "Self-Employed",
    role: "Web Developer & Pentester",
    duration: "Jan 2020 — April 2026",
    location: "Remote · Lampung, Indonesia",
    desc: "Developed secure and scalable web applications using Laravel, PHP, JavaScript, and Tailwind CSS while conducting web and Android penetration testing engagements. Performed reconnaissance, vulnerability assessment, exploitation, post-exploitation analysis, and technical reporting to identify security weaknesses and improve application resilience.",
  },
  {
    logo: "NGD",
    company: "Next Gen Dev",
    role: "Web Development",
    duration: "Jun 2024 — Juli 2024",
    location: "Remote · Yogyakarta, Indonesia",
    desc: "Developed full-stack web applications using PHP, JavaScript, and MySQL by building responsive user interfaces and scalable backend systems. Focused on application performance, database optimization, secure development practices, and delivering reliable user experiences.",
  },
  {
    logo: "QWRDS",
    company: "Qwords Cloud Web Hosting Indonesia",
    role: "Project-Based-Intern Fullstack Developer",
    duration: "Feb 2024 — Mar 2024",
    location: "Remote · Yogyakarta, Indonesia",
    desc: "Developed to full-stack web development projects by building responsive user interfaces, developing backend features, and managing MySQL databases. Gained experience in web hosting environments, application performance optimization, and scalable web application development.",
  },
  {
    logo: "G2S",
    company: "G2Smtech",
    role: "Fullstack Developer Intern",
    duration: "Aug 2018 — Mar 2019",
    location: "On-Site · Bandar Lampung, Indonesia",
    desc: "Developed web applications using PHP and desktop applications using Java while managing MySQL databases and implementing software development best practices. Participated in testing, debugging, deployment, and quality assurance processes to ensure reliable and maintainable software solutions.",
  },
];

const PROJECTS = [
  {
    slug: "digestive-system",
    image: "assets/images/projects/DigestiveSystemPreview.jpg",
    category: "Education",
    year: "2023",
    title: "DigestiveSystem | Learning Application Using Augmented Reality",
    desc: "Developed an Augmented Reality (AR) educational application as part of my undergraduate thesis, combining interactive 3D organ visualization and quiz-based learning to enhance students' understanding of the human digestive system. The project explored immersive learning, mobile application development, educational technology, and user-centered design to create an engaging learning experience.",
    stack: ["C#", "PHP", "MySQL", "ARCore", "Vuforia"],
    demo: "https://djournals.com/klik/article/view/1441/",
    github: "#",
    challenge:
      "Elementary students often struggle to picture how internal organs actually work from static textbook diagrams, which makes the digestive process feel abstract and hard to retain.",
    solution:
      "Built a marker-based Augmented Reality app that overlays an interactive, fully animated 3D digestive system onto a printed worksheet, paired with a lightweight PHP/MySQL backend for quizzes and progress tracking.",
    features: [
      "Marker-based AR tracking with ARCore & Vuforia for stable 3D overlays",
      "Interactive 3D organ models students can rotate, zoom, and tap to explore",
      "Stage-by-stage animation of the digestion process, from mouth to intestine",
      "Built-in quiz module with instant scoring stored via a PHP/MySQL backend",
      "Teacher dashboard to track class-wide quiz performance",
    ],
    result:
      "Piloted with 3 elementary school classes; post-test scores on digestive-system material improved noticeably compared to the textbook-only control group, and it went on to receive institutional funding recognition.",
    screenshots: [
      "assets/images/projects/DigestiveHome.png",
      "assets/images/projects/DigestiveQuiz.png",
      "assets/images/projects/DigestiveScan.jpg",
    ],
  },
  {
    slug: "si-tepat",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    category: "Smart Environment",
    year: "2023",
    title:
      "Si-Tepat | Sistem Tempat Sampah Cermat Integrated with IoT & Computer Vision",
    desc: "Served as an IoT Engineer and Web Developer in a five-member PKM innovation project focused on smart waste management. The system integrated IoT sensors, Computer Vision, and a web-based monitoring platform to automate waste classification, improve recycling efficiency, and support sustainable Zero Waste initiatives.",
    stack: ["C", "Python", "ESP32", "ESP32 CAM", "MQTT", "MySQL"],
    demo: "https://youtu.be/NAVL1kOgZ0g?si=iGPmeadqyEETVOxC",
    github: "#",
    challenge:
      "Manual waste sorting at the source is inconsistent, which contaminates recyclable batches and undermines campus Zero Waste programs before materials even reach a recycling facility.",
    solution:
      "Combined an ESP32-CAM computer-vision module with a servo-driven sorting mechanism and an ESP32 controller publishing fill-level and classification data over MQTT to a central dashboard.",
    features: [
      "Real-time waste image classification (organic / recyclable / residual) on-device",
      "Automated servo sorting mechanism routes waste to the correct bin",
      "Ultrasonic fill-level sensors with MQTT telemetry to a live dashboard",
      "Push alerts when a bin needs to be emptied, reducing overflow",
      "MySQL-backed analytics on waste composition over time",
    ],
    result:
      "Deployed as a working prototype on campus; sorting accuracy stayed consistently high in field testing and the project was awarded national student-creativity program (PKM) funding.",
    screenshots: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop",
    ],
  },
  {
    slug: "readbooks",
    image: "assets/images/projects/ReadBooksPreview.jpg",
    category: "Education",
    year: "2024",
    title: "ReadBooks | Online Book Reading Platform",
    desc: "Built a secure online book reading platform with features including user authentication, AES-256 data encryption, and payment gateway integration. The project focused on delivering a seamless reading experience while implementing secure data protection, transaction security, and scalable web application architecture.",
    stack: ["Laravel 11", "Bootstrap 5", "MySQL", "Postman"],
    demo: "#",
    github: "https://github.com",
    challenge:
      "Independent readers and small publishers needed an affordable way to sell and read digital books online without relying on a large third-party marketplace that takes a heavy cut.",
    solution:
      "Built a full Laravel 11 platform with role-based authentication, an in-browser reading experience, and an integrated payment flow for purchasing premium titles, all documented and tested through Postman.",
    features: [
      "Secure, role-based authentication for readers, authors, and admins",
      "In-browser reader with bookmarking and reading-progress sync",
      "Integrated digital payment flow for premium book purchases",
      "Author dashboard for uploading and managing book catalogues",
      "Fully documented REST API, tested end-to-end with Postman",
    ],
    result:
      "Shipped as a production-ready platform with a stable, well-tested API layer — used as the reference implementation in a university software-engineering course.",
    screenshots: [
      "assets/images/projects/ReadBooks1.PNG",
      "assets/images/projects/ReadBooks2.PNG",
      "assets/images/projects/ReadBooks3.PNG",
      "assets/images/projects/ReadBooks4.PNG",
      "assets/images/projects/ReadBooks5.PNG",
      "assets/images/projects/ReadBooks6.PNG",
      "assets/images/projects/ReadBooks7.PNG",
    ],
  },
  {
    slug: "miraiplay",
    image: "assets/images/projects/MiraiPlayPreview.png",
    category: "Entertainment",
    year: "2024",
    title: "Miraiplay | Anime Streaming Platform",
    desc: "Built an anime streaming platform with real-time content discovery through external API integration and automated data aggregation. The project focused on performance optimization, scalable content delivery, and creating a seamless user experience for browsing and discovering anime content.",
    stack: ["React", "Node.js", "Scraping"],
    demo: "#",
    github: "https://github.com",
    challenge:
      "Fans wanted a fast, ad-light way to discover and track currently-airing anime without wading through the clutter and inconsistent catalogues of typical streaming aggregator sites.",
    solution:
      "Built a React front end backed by a Node.js service that aggregates and normalizes data from external sources in real time, with a scraping layer that keeps the catalogue current without manual curation.",
    features: [
      "Real-time catalogue sync via a Node.js scraping & aggregation service",
      "Fast client-side search and filtering across genres and seasons",
      "Continue-watching history stored per browser session",
      "Responsive video-first layout optimized for both desktop and mobile",
      "Lazy-loaded thumbnails to keep the browsing experience snappy",
    ],
    result:
      "Grew to consistent organic daily traffic during peak anime seasons, with page-load times kept low even as the catalogue scaled into the thousands of titles.",
    screenshots: [
      "assets/images/projects/MiraiPlay1.PNG",
      "assets/images/projects/MiraiPlay2.PNG",
      "assets/images/projects/MiraiPlay3.PNG",
      "assets/images/projects/MiraiPlay4.PNG",
      "assets/images/projects/MiraiPlay5.PNG",
      "assets/images/projects/MiraiPlay6.PNG",
      "assets/images/projects/MiraiPlay7.PNG",
    ],
  },
  {
    slug: "htb-ctf-writeup",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRppLJ4hKwterU8Nqbc9jXrG56uUIiu-r1fmmfEHqYOmlZ04LJB8DtnnEWg&s=10",
    category: "Education",
    year: "2026",
    title: "Writeup | Hack The Box Cyber Apocalypse CTF 2026: The Salt Crown",
    desc: "Selected writeups from Hack The Box Cyber Apocalypse CTF 2026: The Salt Crown, a global cybersecurity Capture The Flag (CTF) competition. My team achieved 483rd place out of 6,773 teams worldwide, and I contributed by solving 18 challenges across Secure Coding, Cloud Security, Hardware Security, Cryptography, Digital Forensics, AI/ML, Binary Exploitation (PWN), Reverse Engineering, and Coding categories. This repository contains selected writeups documenting the methodologies, techniques, and problem-solving approaches used throughout the competition.",
    stack: [
      "Forensics",
      "Reverse Engineering",
      "Web Exploitation",
      "Cryptography",
      "Hardware",
      "AI/ML",
      "Cloud",
      "Pwn",
      "OSINT",
      "Coding",
      "Secure Coding",
    ],
    demo: "#",
    github: "https://github.com",
    challenge:
      "Cyber Apocalypse is a 4-day, high-intensity CTF spanning 11 categories against 6,773 competing teams worldwide — the challenge was covering enough breadth under time pressure to contribute meaningfully across categories, not just one specialty.",
    solution:
      "Split effort across Forensics, Web, Crypto, and Reverse Engineering challenges in parallel with teammates, documenting a repeatable methodology for each solve so techniques could be reused across similar challenges later in the event.",
    features: [
      "18 challenges solved across 8+ distinct categories",
      "Step-by-step documented methodology for each writeup, not just the final flag",
      "Reusable scripts for common exploitation/forensics patterns",
      "Collaborative approach coordinated live with teammates across time zones",
    ],
    result:
      "Team finished 483rd out of 6,773 teams globally (top ~7%), with the writeups published as a public reference for the security community.",
    screenshots: [
      "assets/images/projects/Loading.jpg",
      "assets/images/projects/ComingSoon.jpg",
    ],
  },
  {
    slug: "meta4sec-ctf-writeup",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5-8e5yNMUO4WdgyA0TCNPSuyO3UDvDrczR9AuhYVu6JEdpqn_95qVW8c&s=10",
    category: "Education",
    year: "2026",
    title: "Writeup | Meta4Sec x Redlimit CTF 2026",
    desc: "Selected writeups from the Meta4Sec x Redlimit Capture The Flag (CTF) competition, where I competed independently as a solo player, solved 20 of 24 challenges, and finished 25th overall. The challenges covered multiple cybersecurity domains, including web security, Ics/OT, OSINT, Misc, cryptography, reverse engineering, forensics, and other offensive security techniques. This project documents selected solutions, methodologies, exploitation techniques, and problem-solving approaches from the competition.",
    stack: [
      "Web",
      "Cryptography",
      "Pwn",
      "OSINT",
      "ICS/OT",
      "Forensics",
      "Reverse Engineering",
      "Misc",
    ],
    demo: "#",
    github: "https://github.com",
    challenge:
      "Solved 20 out of 24 challenges as a solo participant, covering multiple cybersecurity domains including web security, Ics/OT, OSINT, Misc, cryptography, reverse engineering, and digital forensics.",
    solution:
      "The solutions document the methodologies and technical approaches used to solve selected challenges, including vulnerability analysis, exploitation, reverse engineering, ICS/OT, Misc, OSINT, cryptographic analysis, forensic investigation, and systematic debugging. Each writeup explains the reasoning behind the solution, the techniques applied, and the steps taken to reach the final objective.",
    features: [
      "Selected challenge writeups with detailed technical explanations.",
      "Challenge categorization by cybersecurity domain.",
      "Step-by-step solution methodologies and exploitation techniques.",
      "Practical notes and lessons learned from each challenge.",
    ],
    result:
      "Finished 25th overall as a solo participant, solving 20 out of 24 challenges, with selected writeups published as a technical reference for the cybersecurity community.",
    screenshots: [
      "assets/images/projects/Loading.jpg",
      "assets/images/projects/ComingSoon.jpg",
    ],
  },
  {
    slug: "hidc-ctf-writeup",
    image:
      "https://www.hacktrace.id/assets/frontend/default/img/hidc/2026/logo.webp",
    category: "Education",
    year: "2026",
    title: "Writeup | HIDC CTF 2026",
    desc: "Selected writeups from HIDC 26, a cybersecurity Capture The Flag (CTF) competition organized by PT Hacktrace Siber Indonesia. Our team finished 44th among 200+ teams, with my contribution including 8 solved challenges across AI, Cryptography, Web Security, Boot to Root, MISC, Hardware, Digital Forensics, SDR, and Reverse Engineering. This project documents selected challenge solutions, methodologies, and technical approaches used throughout the competition.",
    stack: [
      "AI",
      "Cryptography",
      "Forensics",
      "Hardware",
      "Reverse Engineering",
      "Web",
      "Misc",
      "SDR",
    ],
    demo: "#",
    github: "https://github.com",
    challenge:
      "Contributed to solving 8 challenges across AI, Cryptography, Web Security, Boot to Root, MISC, Hardware, Digital Forensics, SDR, and Reverse Engineering.",
    solution:
      "Documented selected solutions using techniques including vulnerability analysis, cryptographic analysis, web exploitation, binary analysis, digital forensics, hardware analysis, SDR analysis, and reverse engineering.",
    features: [
      "Selected CTF Writeups — Documentation of selected challenge solutions from HIDC 26",
      "Multi-Domain Security Analysis — Covers AI, Cryptography, Web Security, Boot to Root, MISC, Hardware, Digital Forensics, SDR, and Reverse Engineering.",
      "Technical Methodologies — Step-by-step approaches, analysis techniques, and problem-solving processes.",
      "Exploitation Techniques — Practical analysis of vulnerabilities and techniques used to reach challenge objectives.",
      "Lessons Learned — Key insights and technical knowledge gained from solving the challenges.",
    ],
    result:
      "Our team finished 44th among 200+ teams, with my contribution including 8 solved challenges across multiple cybersecurity domains and selected writeups published as a technical reference for the cybersecurity community.",
    screenshots: [
      "assets/images/projects/Loading.jpg",
      "assets/images/projects/ComingSoon.jpg",
    ],
  },
];

const TECH_ICON_MAP = {
  "C#": {
    icon: "hash",
    desc: "Object-oriented language used for the app & Unity/AR logic.",
  },
  C: {
    icon: "cpu",
    desc: "Low-level language used for embedded firmware logic.",
  },
  PHP: {
    icon: "server",
    desc: "Backend language powering the API and business logic.",
  },
  MySQL: {
    icon: "database",
    desc: "Relational database for structured application data.",
  },
  ARCore: {
    icon: "scan",
    desc: "Google's AR framework for real-world tracking & overlays.",
  },
  Vuforia: {
    icon: "camera",
    desc: "Marker-based AR SDK for stable 3D model tracking.",
  },
  Python: {
    icon: "file-code",
    desc: "Used for computer-vision inference and data scripting.",
  },
  ESP32: {
    icon: "cpu",
    desc: "Microcontroller powering the embedded IoT logic.",
  },
  "ESP32 CAM": {
    icon: "camera",
    desc: "Camera module used for on-device image classification.",
  },
  MQTT: {
    icon: "radio",
    desc: "Lightweight messaging protocol for IoT telemetry.",
  },
  "Laravel 11": {
    icon: "flame",
    desc: "PHP framework powering the REST API & auth.",
  },
  "Laravel API": {
    icon: "flame",
    desc: "PHP framework serving the platform's REST API.",
  },
  "Bootstrap 5": {
    icon: "layout-grid",
    desc: "Utility framework used for consistent UI components.",
  },
  Postman: {
    icon: "send",
    desc: "Used to design, test, and document the REST API.",
  },
  React: {
    icon: "atom",
    desc: "Component-based library powering the front end.",
  },
  "Node.js": {
    icon: "hexagon",
    desc: "JavaScript runtime for the aggregation/backend service.",
  },
  Scraping: {
    icon: "search",
    desc: "Automated data collection to keep the catalogue current.",
  },
  Express: {
    icon: "server",
    desc: "Minimal Node.js framework for the REST API layer.",
  },
  "Next.js": {
    icon: "triangle",
    desc: "React framework for fast, SEO-friendly rendering.",
  },
  "AWS S3": {
    icon: "cloud",
    desc: "Object storage used for scalable video delivery.",
  },
  Forensics: {
    icon: "search",
    desc: "Digital-evidence analysis: memory, disk & network artifacts.",
  },
  "Reverse Engineering": {
    icon: "cpu",
    desc: "Analyzing compiled binaries to understand their logic.",
  },
  "Web Exploitation": {
    icon: "globe",
    desc: "Finding & exploiting vulnerabilities in web applications.",
  },
  Cryptography: {
    icon: "lock",
    desc: "Breaking or implementing cryptographic schemes.",
  },
  Hardware: {
    icon: "cpu",
    desc: "Challenges involving embedded/hardware-level analysis.",
  },
  "AI/ML": {
    icon: "brain",
    desc: "Exploiting or analyzing machine-learning based systems.",
  },
  Cloud: {
    icon: "cloud",
    desc: "Security challenges targeting cloud infrastructure.",
  },
  Pwn: {
    icon: "terminal-square",
    desc: "Binary exploitation to gain code execution.",
  },
  OSINT: {
    icon: "search",
    desc: "Open-source intelligence gathering & analysis.",
  },
  Coding: {
    icon: "code",
    desc: "Algorithmic challenges solved under time pressure.",
  },
  "Secure Coding": {
    icon: "shield-check",
    desc: "Identifying & fixing insecure code patterns.",
  },
};

const CERTIFICATIONS = [
  {
    image: "assets/images/certificate/Cisco.png",
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "February 2024",
    type: "certificate",
  },
  {
    image: "assets/images/certificate/MachineLearning.png",
    name: "Machine Learning Professional Certificate",
    issuer: "RapidMiner",
    date: "June 2022",
    type: "certificate",
  },
  {
    image: "assets/images/certificate/DicodingAWS.png",
    name: "Cloud Practitioner Essentials",
    issuer: "Dicoding",
    date: "Maret 2024",
    type: "certificate",
  },
  {
    image: "assets/images/certificate/DataEngineering.png",
    name: "Data Enggineering Professional Certificate",
    issuer: "RapidMiner",
    date: "January 2022",
    type: "certificate",
  },
  {
    image: "assets/images/certificate/DicodingBackend.jpg",
    name: "Belajar Membuat Aplikasi Backend untuk Pemula",
    issuer: "Dicoding",
    date: "Maret 2024",
    type: "certificate",
  },
  {
    image: "assets/images/certificate/JS.png",
    name: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding",
    date: "February 2024",
    type: "certificate",
  },
  {
    image: "assets/images/certificate/frontend.png",
    name: "Belajar Dasar Membuat Front-end Web untuk Pemula",
    issuer: "Dicoding",
    date: "June 2024",
    type: "certificate",
  },
  {
    image: "assets/images/certificate/frontend.png",
    name: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding",
    date: "May 2024",
    type: "certificate",
  },
  {
    image: "assets/images/certificate/htb.jpg",
    name: "483rd Place — Hack The Box Cyber Apocalypse CTF 2026: The Salt Crown",
    issuer: "Hack The Box",
    date: "July 2026",
    type: "award",
  },
  {
    image:
      "https://feb.ums.ac.id/wp-content/uploads/sites/34/2023/02/Logo-PKM-Warna-1024x576-1.png",
    name: "Passed PKM KC 2023 Funding",
    issuer:
      "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek)",
    date: "October 2023",
    type: "award",
  },
  {
    image:
      "https://images.seeklogo.com/logo-png/66/2/bpjs-kesehatan-logo-png_seeklogo-669601.png",
    name: "Top 45 Capture The Flag Healthkathon BPJS 2023",
    issuer: "Badan Penyelenggara Jaminan Sosial (BPJS) Kesehatan",
    date: "September 2023",
    type: "award",
  },
  {
    image:
      "https://ctftime.org/media/events/73b32f71c82304b9e3df7fe9dedada59-transformed.png",
    name: "Top 60 National Hacking Competion CTF Cyber Jawara 2021",
    issuer: "Computer Security Incident Response Team (CSIRT.ID) Indonesia",
    date: "October 2021",
    type: "award",
  },
  {
    image:
      "https://ctftime.org/media/events/73b32f71c82304b9e3df7fe9dedada59-transformed.png",
    name: "Top 50 National Hacking Competion CTF Cyber Jawara 2019",
    issuer: "Computer Security Incident Response Team (CSIRT.ID) Indonesia",
    date: "October 2019",
    type: "award",
  },
  {
    image: "https://meta4sec.com/wp-content/uploads/2026/01/logo-meta-2.png",
    name: "Top 25 National Hacking Competion CTF Meta4Sec x Redlimit 2026",
    issuer: "Meta4Sec x Redlimit",
    date: "August 2026",
    type: "award",
  },
  {
    image:
      "https://www.hacktrace.id/assets/frontend/default/img/hidc/2026/logo.webp",
    name: "Top 44 National Hacking Competion CTF HIDC 2026",
    issuer: "PT Hacktrace Siber Indonesia",
    date: "August 2026",
    type: "award",
  },
];

const ARTICLES = [
  {
    image: "https://placehold.co/600x400/111827/8b5cf6?text=Article",
    name: "What Is Cybersecurity? Fundamentals to Understand Before Learning Hacking",
    issuer: "Medium",
    date: "August 2026",
    url: "https://medium.com/@adtyyyy/what-is-cybersecurity-fundamentals-to-understand-before-learning-hacking-fa92a444c434",
  },
  {
    image: "https://placehold.co/600x400/111827/3b82f6?text=Article",
    name: "Analyzing Android malware disguised as a digital wedding invitation",
    issuer: "Medium",
    date: "August 2026",
    url: "https://medium.com/@adtyyyy/analyzing-android-malware-disguised-as-a-digital-wedding-invitation-4bd9c9cab79d",
  },
];

const PUBLICATIONS = [
  {
    image: "https://placehold.co/600x400/111827/06b6d4?text=Publication",
    name: "The Role of Augmented Reality in Introducing the Human Digestive System to Elementary School Children",
    issuer: "KLIK: Kajian Ilmiah Informatika dan Komputer",
    date: "December 2023",
    url: "https://djournals.com/klik/article/view/1441",
  },
];
