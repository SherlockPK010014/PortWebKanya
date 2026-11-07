// ข้อมูลผลงาน/กิจกรรมทั้งหมด
// category: 'project' | 'experience' | 'leadership' | 'certificate'
import CAB_LINKG from '@/assets/cablink.jpg'
import NEXTJS from '@/assets/Next_JS_.jpg'
import mathLabCert from '@/assets/MathLABcertificate.jpg'
import SPANSDG001 from '@/assets/SPA&SDGs_page-0001.jpg'
import SPANSDG002 from '@/assets/SPA&SDGs_page-0002.jpg'
import FrontEnd from '@/assets/front-end.jpg'
import DSC1 from '@/assets/SDGs/DSC_1429.jpg'
import DSC2 from '@/assets/SDGs/DSC_1751.jpg'
import DSC3 from '@/assets/SDGs/DSC_1397.jpg'
import DSC4 from '@/assets/SDGs/DSC_1754.jpg'
import DSC5 from '@/assets/SDGs/DSC_1539.jpg'
import DSC6 from '@/assets/SDGs/DSC_1622.jpg'
import IOT1 from '@/assets/IOT/iot_1.jpg'
import IOT2 from '@/assets/IOT/iot_2.jpg'
import IOT3 from '@/assets/IOT/iot_3.jpg'
import IOT4 from '@/assets/IOT/iot_4.jpg'
import IOT5 from '@/assets/IOT/iot_5.jpg'
import IOT6 from '@/assets/IOT/iot_6.jpg'
import IOT7 from '@/assets/IOT/iot_7.jpg'
import Pro_1 from '@/assets/Promote/Pro_1.jpg'
import Pro_2 from '@/assets/Promote/Pro_2.jpg'
import Pro_3 from '@/assets/Promote/Pro_3.jpg'
import Pro_4 from '@/assets/Promote/Pro_4.jpg'
import Pro_5 from '@/assets/Promote/Pro_5.jpg'
import Pro_6 from '@/assets/Promote/Pro_6.jpg'
import Pro_7 from '@/assets/Promote/Pro_7.jpg'
import Pro_8 from '@/assets/Promote/Pro_8.jpg'
import Pro_9 from '@/assets/Promote/Pro_9.jpg'
import A1 from '@/assets/Anniversary/A1.jpg'
import A2 from '@/assets/Anniversary/A2.jpg'
import A3 from '@/assets/Anniversary/A3.jpg'
import G2 from '@/assets/GPT/G2.jpg'
import G3 from '@/assets/GPT/G3.jpg'
import O1 from '@/assets/OPHSC/O1.jpg'
import O2 from '@/assets/OPHSC/O2.jpg'
import O3 from '@/assets/OPHSC/O3.jpg'
import O4 from '@/assets/OPHSC/O4.jpg'
import O5 from '@/assets/OPHSC/O5.jpg'
import O6 from '@/assets/OPHSC/O6.jpg'
import O7 from '@/assets/OPHSC/O7.jpg'
import S1 from '@/assets/SWU/SWU1.jpg'
import S2 from '@/assets/SWU/SWU2.jpg'
import S3 from '@/assets/SWU/SWU3.jpg'
import S4 from '@/assets/SWU/SWU4.jpg'
import S5 from '@/assets/SWU/SWU5.jpg'
import S6 from '@/assets/SWU/SWU6.jpg'
import S7 from '@/assets/SWU/SWU7.jpg'
import SBO1 from '@/assets/SBO/SBO1.jpg'
import SBO2 from '@/assets/SBO/SBO2.jpg'
import SBO3 from '@/assets/SBO/SBO3.jpg'
import SBO4 from '@/assets/SBO/SBO4.jpg'
import SBO5 from '@/assets/SBO/SBO5.jpg'
import SBO6 from '@/assets/SBO/SBO6.jpg'
import SBO7 from '@/assets/SBO/SBO7.jpg'
import SBO8 from '@/assets/SBO/SBO8.jpg'
import SBO9 from '@/assets/SBO/SBO9.jpg'
import SBO10 from '@/assets/SBO/SBO10.jpg'
import SEM1 from '@/assets/Seminar66/SEM1.jpg'
import SEM2 from '@/assets/Seminar66/SEM2.jpg'
import SEM3 from '@/assets/Seminar66/SEM3.jpg'
import SEM4 from '@/assets/Seminar66/SEM4.jpg'
import SEM5 from '@/assets/Seminar66/SEM5.jpg'
import SEM6 from '@/assets/Seminar66/SEM6.jpg'
import SEM7 from '@/assets/Seminar66/SEM7.jpg'
import SEM8 from '@/assets/Seminar66/SEM8.jpg'
import SE1 from '@/assets/Seminar67/SE1.jpg'
import SE2 from '@/assets/Seminar67/SE2.jpg'
import SE3 from '@/assets/Seminar67/SE3.jpg'
import SE4 from '@/assets/Seminar67/SE4.jpg'
import SE5 from '@/assets/Seminar67/SE5.jpg'
import SE6 from '@/assets/Seminar67/SE6.jpg'
import SE7 from '@/assets/Seminar67/SE7.jpg'
import F1 from '@/assets/figma/f1.png'
import F2 from '@/assets/figma/f2.png'
import F3 from '@/assets/figma/f3.png'
import F4 from '@/assets/figma/f4.png'
import F5 from '@/assets/figma/f5.png'
import F6 from '@/assets/figma/f6.png'
import F7 from '@/assets/figma/f7.png'
import Biotech from '@/assets/NCHU/Biotech.jpg'
import N2 from '@/assets/NCHU/N2.jpg'
import N3 from '@/assets/NCHU/N3.jpg'
import N4 from '@/assets/NCHU/N4.jpg'
import N5 from '@/assets/NCHU/N5.jpg'
import N6 from '@/assets/NCHU/N6.jpg'
import N7 from '@/assets/NCHU/N7.jpg'
import N8 from '@/assets/NCHU/N8.jpg'
import N9 from '@/assets/NCHU/N9.jpg'
import N10 from '@/assets/NCHU/N10.jpg'
import N11 from '@/assets/NCHU/N11.jpg'
import sudo from '@/assets/SUDOKU/SUDO2.png'
import emotion from '@/assets/Emotional/emo.png'
import D3 from '@/assets/3D/3Dgra.png'
import D3x from '@/assets/3D/3Dsatur.png'

const globImages = (mods) =>
  Object.entries(mods)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url)

const KURU_IMGS = globImages(
  import.meta.glob('../assets/KURU/*.{jpg,jpeg,png,JPG}', { eager: true, import: 'default' })
)
const CALVAL_IMGS = globImages(
  import.meta.glob('../assets/CalVal/*.{jpg,jpeg,png,JPG}', { eager: true, import: 'default' })
)
import ACADEMIC from '@/assets/Academic_Excellence_Award.png'

const TADS_IMGS = globImages(
  import.meta.glob('../assets/TADS/*.{jpg,jpeg,png,JPG}', { eager: true, import: 'default' })
)
const TSX_IMGS =globImages(
  import.meta.glob('../assets/TSX2026/*.{jpg,jpeg,png,JPG}', { eager: true, import: 'default' })
)

export const CATEGORIES = ['project', 'experience', 'leadership', 'certificate']

export default [
  {
    title: 'MathLab Certificate',
    category: 'certificate',
    issuer: 'MathLab Academy',
    date: '2024-03-08',
    tags: ['MathLab'],
    image: mathLabCert,
    file: null,
    verified: false,
    desc: 'Fundamentals of MATLAB scripting, matrices, and visualization.',
  },
  {
    title: 'Academic Excellence Award',
    category: 'certificate',
    issuer: 'Faculty of Computer Science • Kasetsart University',
    date: '2026-07-09',
    tags: ['KU', 'Academic'],
    image: ACADEMIC,
    verified: false,
    desc: 'Awarded by Kasetsart University for outstanding academic performance in the 2025 academic year (B.E. 2568) as a student of the Faculty of Computer Science.',
  },
  {
    title: 'President of the Student Constitution Committee',
    category: 'leadership',
    issuer: 'Spanisit • Kasetsart University',
    date: '2024-02-26',
    tags: ['KU', 'Student Council'],
    image: SPANSDG001,
    file: null,
    verified: false,
    desc: 'Recognized for serving as the President of the Student Constitution Committee under the Student Representative Council at Kasetsart University, Sriracha Campus, during the academic year 2024. This role highlights leadership in student governance and responsibility in upholding student rights and constitutional principles.',
  },
  {
    title: '2nd Runner-up Award – Sustainable Development Project (SDGs)',
    category: 'certificate',
    issuer: 'SDGs • Kasetsart University',
    date: '2025-02-10',
    tags: ['KU', 'SDGs'],
    image: SPANSDG002,
    file: null,
    verified: false,
    desc: 'Awarded 2nd Runner-up in the Sustainability Project Competition (SDGs) at Kasetsart University in 2024, under the theme Happy University @KU. The project, New-Council Activities Trainer Camp, promoted student leadership and sustainable engagement through innovative volunteer activities.',
  },
  {
    title: 'Front-end Web Development using React Certificate',
    category: 'certificate',
    issuer: 'Web Development • React',
    date: '2024-04-20',
    tags: ['WEB'],
    image: FrontEnd,
    file: null,
    verified: false,
    desc: 'Successfully completed the Front-end Web Development using React training program held on April 19–20, 2024, organized by Kasetsart University, Sriracha Campus. This certificate formally recognizes the achievement and proficiency in modern web development technologies with React.',
  },
  {
    title: 'KU Green Blood Camp',
    category: 'leadership',
    issuer: 'SDGs • Kasetsart University',
    date: '2024-05-07',
    tags: ['KU', 'SDGs'],
    images: [DSC1, DSC2, DSC3, DSC4, DSC5, DSC6],
    verified: false,
    desc: 'The KU Green Blood Camp 2024 is a sustainability-driven volunteer program that builds a network of SDGs ambassadors. Participants learn about the UN Sustainable Development Goals, practice calculating carbon footprints, and co-design activities that promote sustainability both within and beyond Kasetsart University.',
  },
  {
    title: 'Host & Staff – Robotics and IoT Training Workshop for Primary Students',
    category: 'leadership',
    issuer: 'IoT Training Workshop',
    date: '2025-08-19',
    tags: ['KU','IOT'],
    images: [IOT1, IOT2, IOT3, IOT4, IOT5, IOT6, IOT7],
    verified: false,
    desc: 'Served as a host and staff member in the Robotics and IoT Training Workshop for primary school students. The program aimed to inspire young learners through hands-on activities, introducing the fundamentals of robotics and IoT in an engaging and accessible way.',
  },
  {
    title: 'Host & Promotional Model – Faculty of Science, Kasetsart University Sriracha Campus',
    category: 'leadership',
    issuer: 'Promotional Faculty of Science ',
    date: '2024-02-19',
    tags: ['KU'],
    images: [Pro_1, Pro_2, Pro_3, Pro_4, Pro_5, Pro_6, Pro_7, Pro_8, Pro_9],
    verified: false,
    desc: 'Participated as a female host and promotional model in the publicity event for the Faculty of Science, Kasetsart University Sriracha Campus. Contributed to presenting the program, engaging the audience, and representing the faculty through professional photoshoots for promotional materials.',
  },
  {
    title: 'Kasetsart University Founding Anniversary',
    category: 'leadership',
    issuer: 'KU Anniversary Event • งานวันคล้ายวันสถาปนา',
    date: '2023-02-02',
    tags: ['KU'],
    images: [A1, A2, A3],
    verified: false,
    desc: 'I joined the Kasetsart University Founding Anniversary, an annual celebration honoring the university’s heritage and contributions to society. The event highlighted academic achievements and traditions, fostering a strong sense of community and pride.',
  },
  {
    title: 'Training Program – Learning Intelligent Technology: ChatGPT',
    category: 'experience',
    issuer: 'ChatGPT',
    date: '2024-08-21',
    tags: ['KU'],
    images: [G2, G3],
    verified: false,
    desc: 'Completed a training program on intelligent technology with ChatGPT, focusing on practical applications of generative AI. The course introduced core concepts, usage techniques, and innovative ways to apply ChatGPT in academic and professional contexts.',
  },
  {
    title: 'The Student Constitution Open House',
    category: 'leadership',
    issuer: 'Student Constitution • โครงการเปิดบ้านธรรมนูญนิสิต',
    date: '2024-10-05',
    tags: ['KU', 'Student Council'],
    images: [O1, O2, O3, O4, O5, O6, O7],
    verified: false,
    desc: 'The Student Constitution Open House introduces students to their rights and responsibilities through interactive activities and fun experiences, fostering awareness and community spirit',
  },
  {
    title: 'Student Council Exchange Meeting',
    category: 'leadership',
    issuer: 'Kasetsart University Sriracha & Srinakharinwirot University',
    date: '2024-09-10',
    tags: ['KU', 'Student Council'],
    images: [S6, S2, S3, S4, S5, S1, S7],
    verified: false,
    desc: 'An academic exchange meeting between the Student Council of Kasetsart University, Sriracha Campus, and the Student Council of Srinakharinwirot University. The program provided a platform to share ideas, discuss student governance, and strengthen collaboration between the two institutions.',
  },
  {
    title: 'Seminar of Student Organizations—4 Campuses',
    category: 'leadership',
    issuer: 'สัมมนาองค์การนิสิต 4 วิทยาเขต',
    date: '2024-03-01',
    tags: ['KU', 'Student Council'],
    images: [SBO1, SBO2, SBO3, SBO4, SBO5, SBO6, SBO7, SBO8, SBO9, SBO10],
    verified: false,
    desc: 'The Seminar of Student Organizations—4 Campuses , 2024 is a collaborative program that brings together student leaders from four Kasetsart University campuses. The seminar aims to exchange ideas, share best practices in student governance, and foster unity and cooperation across campuses.',
  },
  {
    title: 'Seminar of Student Council—4 Campuses 2024',
    category: 'leadership',
    issuer: 'สัมมนาสภานิสิต 4 วิทยาเขต',
    date: '2024-02-23',
    tags: ['KU', 'Student Council'],
    images: [SEM1, SEM2, SEM3, SEM4, SEM5, SEM6, SEM7, SEM8],
    verified: false,
    desc: '',
  },
  {
    title: 'Seminar of Student Council—4 Campuses 2025',
    category: 'leadership',
    issuer: 'สัมมนาสภานิสิต 4 วิทยาเขต',
    date: '2025-02-22',
    tags: ['KU', 'Student Council'],
    images: [SE1, SE2, SE3, SE4, SE5, SE6, SE7],
    verified: false,
    desc: 'The Seminar of Student Organizations—4 Campuses FEBRUARY 22-23, 2025 is a collaborative program that brings together student leaders from four Kasetsart University campuses. The seminar aims to exchange ideas, share best practices in student governance, and foster unity and cooperation across campuses.',
  },
  {
    title: 'Figma Workshop',
    category: 'project',
    issuer: 'Figma Design – University Leave Request Form',
    date: '2025-07-10',
    tags: ['KU', 'Figma'],
    images: [F1, F2, F3, F4, F5, F6, F7],
    verified: false,
    desc: 'Designed a digital prototype of the official university leave request form using Figma. The project focused on creating a clear, user-friendly interface that simplifies the leave application process for students and ensures accessibility across devices.',
  },
  {
    title: 'LINK Certified – Network Cabling Training for Engineering',
    category: 'certificate',
    issuer: 'American Cabling • LCCE • Link Asia Limited',
    date: '2025-09-17',
    tags: ['KU', 'NETWORK'],
    image: CAB_LINKG,
    file: null,
    verified: false,
    desc: 'This workshop provides participants with a comprehensive understanding of international standards for structured cabling systems. The training includes hands-on practice in installation, testing, and quality verification of network cabling to strengthen engineering skills in network infrastructure and ensure compliance with LINK standards.',
  },
  {
    title: 'Future Web Development with Next.js',
    category: 'certificate',
    issuer: 'Next.js Fundamentals & Practical Web Development',
    date: '2025-11-12',
    tags: ['KU', 'WEB'],
    image: NEXTJS,
    file: null,
    verified: false,
    desc: 'This course provides participants with a solid understanding of Next.js, a modern React framework for building high-performance web applications. The training covers core concepts such as routing, server-side rendering (SSR), API routes, data fetching, and project structuring. Participants will also engage in hands-on practice to develop real-world applications and strengthen their skills in modern full-stack web development.',
  },
  {
    title: 'Student Exchange Program',
    category: 'experience',
    issuer: 'Faculty of Science, Sriracha Campus, in collaboration with National Chung Hsing University (NCHU) Taiwan',
    date: '2025-11-10',
    tags: ['KU', 'Exchange Program'],
    images:[Biotech, N6, N3, N4, N5, N7, N8, N9, N10, N11],
    verified: false,
    desc: 'I was selected to participate in the student exchange program between the Faculty of Science, Sriracha Campus, and National Chung Hsing University (NCHU). This program provided my first overseas experience, allowing me to step outside my comfort zone and adapt to a new cultural environment. At NCHU, I gained firsthand exposure to Taiwan’s education and research systems through laboratory visits and discussions with professors and researchers, particularly in the rapidly growing semiconductor field. The program also enhanced my practical use of English and Chinese in real-life situations.',
  },
  {
    title: 'SUDOKU Puzzle with Python Programming',
    category: 'project',
    period: '2025',
    issuer: 'AR Sudoku Game Development using Hand Tracking',
    tags: ['Project'],
    image: sudo,
    verified: false,
    desc: 'Built an AR Sudoku game that lets players select cells and enter numbers with webcam-tracked hand gestures (OpenCV, cvzone.HandTrackingModule)'
  },
  {
    title: 'Emotional Recognition System using Deep Learning',
    category: 'project',
    period: '2025',
    issuer: 'AI Emotion Detection from Facial Expressions',
    tags: ['Project'],
    image: emotion,
    verified: false,
    desc: 'Developed a facial emotion recognition system using DeepFace and FER libraries to classify emotions from webcam images in real-time.'
  },
  {
    title : '3D Particle System',
    category: 'project',
    period: '2025',
    issuer : 'Interactive 3D Graphics powered by Hand-Gesture AI',
    tags: ['Project'],
    images: [D3 , D3x],
    verified :false ,
    desc : 'Developed an immersive 3D particle system using Three.js and MediaPipe. Integrated Real-time Hand Tracking to map human gestures (Pinch & Rotation) to 3D object manipulations with post-processing Bloom effects.'
  },
  {
    title : 'KURU — Intelligent Academic Regulations Chatbot',
    category: 'project',
    issuer: 'Senior Project • Team Project',
    period: '2026',
    tags : ['Project'],
    images : KURU_IMGS,
    verified : false,
    desc : 'A chatbot prototype that answers questions about university academic regulations using Retrieval-Augmented Generation (RAG) over official academic documents. I contributed to frontend development, RAG implementation, system integration, and administrative features, and ran system testing to ensure reliable interaction between components.'
  },
  {
    title:'TADS — THEOS-2 Anomaly Detection System',
    category: 'project',
    issuer:'Python • Digital Image Processing',
    period: '2026',
    tags:['Project'],
    images : TADS_IMGS,
    verified : false,
    desc:'A Python-based system that detects and assesses oversaturation anomalies in THEOS-2 satellite imagery. Implemented saturation detection, connected-component analysis, severity assessment, batch processing, and mask generation, with both CLI and GUI interfaces to support image analysis workflows.'
  },
  {
    title: 'Programmer (Co-op Intern) — GISTDA Cal/Val Team',
    category: 'experience',
    issuer: 'Geo-Informatics and Space Technology Development Agency (GISTDA) • Si Racha',
    period: '2026',
    tags : ['Experience'],
    images: CALVAL_IMGS,
    verified:false,
    desc : 'Co-op internship with the Calibration & Validation (Cal/Val) Team, Satellite Data Operations Division. Developed TADS for detecting oversaturation anomalies in THEOS-2 imagery; tested internal Cal/Val systems (Web Cal/Val Portal, SR-ARD modules) and documented results; joined field activities supporting geometric and radiometric calibration; processed and visualized satellite imagery with QGIS and GIMP (DEM generation, 3D anaglyph); and completed training in Super Resolution, GeoAI, and SAR/Optical image processing.'
  },
  {
    title:'Thailand Space Expo 2026',
    category: 'experience',
    issuer : 'Participant • Space Technology Exhibition',
    period: '2026',
    tags :['Experience'],
    images : TSX_IMGS,
    verified : false,
    desc : "Attended Thailand's space technology exhibition and explored developments in satellite technology, space innovation, and geospatial applications."
  }
]
