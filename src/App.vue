<template>
  <!-- ลิงก์แรกของหน้า: ให้คนใช้คีย์บอร์ด/screen reader ข้ามเมนูไปที่เนื้อหาได้ทันที (โผล่เมื่อกด Tab) -->
  <a class="skip-link" href="#main">Skip to content</a>
  <Header />
  <main id="main" tabindex="-1">
    <Home />
    <AboutMe />
    <Achievements />
    <Skill />
    <Contact />
  </main>
</template>

<script>
import Header from './components/HeaderNav.vue' 
import Home from './components/Home.vue'       
import AboutMe from './components/AboutMe.vue'
import Achievements from './components/Achievements.vue'
import Skill from './components/Skill.vue'
import Contact from './components/Contact.vue'



export default {
  name: 'App',
  components: {
    Header,
    Home,
    AboutMe,
    Achievements,
    Skill,
    Contact,
  }
}
</script>
  
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&family=Mitr:wght@200;300;400;500;600;700&display=swap');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    border: none;
    font-family: 'IBM Plex Sans Thai',serif;
}

html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    /* จองที่ของ scrollbar ไว้เสมอ: ตอนล็อกการเลื่อน (เปิด lightbox) หน้าเว็บจะไม่กระตุก */
    scrollbar-gutter: stable;
}

/* วงโฟกัสสำหรับคนใช้คีย์บอร์ด (เดิม * { outline: none } ทำให้มองไม่เห็นว่าโฟกัสอยู่ที่ไหน)
   :focus-visible จะไม่แสดงตอนคลิกด้วยเมาส์ */
:focus-visible {
    outline: 2px solid #38bdf8;
    outline-offset: 2px;
}
/* <main> รับโฟกัสจาก skip link — ไม่ต้องตีกรอบทั้งหน้า */
main:focus {
    outline: none;
}

/* ซ่อนจากสายตา แต่ screen reader ยังอ่านได้ */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

body {
    background-color: #132743;
    color: rgb(223, 208, 184);
    line-height: 1.6;
    font-size: 1.6rem;
}

/* ค่าพื้นฐานที่เดิมได้มาจาก Bootstrap reboot (ถอด Bootstrap ออกแล้ว)
   เก็บไว้เฉพาะส่วนที่ดีไซน์ของเว็บพึ่งอยู่จริง เพื่อให้หน้าตาเหมือนเดิม */
h1, h2, h3, h4, h5, h6 {
    margin-bottom: .5rem;
    font-weight: 500;
    line-height: 1.2;
}
h1 { font-size: calc(1.375rem + 1.5vw); }
h2 { font-size: calc(1.325rem + .9vw); }
h3 { font-size: calc(1.3rem + .6vw); }
h4 { font-size: calc(1.275rem + .3vw); }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }
@media (min-width: 1200px) {
    h1 { font-size: 2.5rem; }
    h2 { font-size: 2rem; }
    h3 { font-size: 1.75rem; }
    h4 { font-size: 1.5rem; }
}

p, ul, ol {
    margin-bottom: 1rem;
}

img, svg {
    vertical-align: middle;
}

button {
    font-size: inherit;
    line-height: inherit;
}

/* ซ่อนไว้นอกจอ จนกว่าจะถูกโฟกัสด้วยปุ่ม Tab */
.skip-link {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 2000;
    padding: .8rem 1.4rem;
    border-radius: 8px;
    background: #38bdf8;
    color: #031926;
    font-weight: 700;
    translate: 0 -200%;
}
.skip-link:focus {
    translate: none;
    outline: 2px solid #fff;
    outline-offset: 2px;
}

/* Starfield: ดาวระยิบระยับเป็นพื้นหลังของ section (ใส่ class="starfield" ที่ section) */
.starfield {
    position: relative;
    isolation: isolate;
}

.starfield::before,
.starfield::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    border-radius: inherit;
    background-repeat: repeat;
}

.starfield::before {
    background-size: 460px 460px;
    background-image:
        radial-gradient(1px 1px at 23px 41px, rgba(255,255,255,.9), transparent),
        radial-gradient(1.5px 1.5px at 97px 210px, rgba(255,255,255,.8), transparent),
        radial-gradient(1px 1px at 160px 78px, rgba(226,240,255,.9), transparent),
        radial-gradient(1px 1px at 212px 330px, rgba(255,255,255,.7), transparent),
        radial-gradient(1.5px 1.5px at 280px 140px, rgba(255,255,255,.9), transparent),
        radial-gradient(1px 1px at 333px 402px, rgba(255,236,200,.8), transparent),
        radial-gradient(1px 1px at 390px 60px, rgba(255,255,255,.8), transparent),
        radial-gradient(1.5px 1.5px at 430px 260px, rgba(226,240,255,.8), transparent),
        radial-gradient(1px 1px at 70px 380px, rgba(255,255,255,.7), transparent),
        radial-gradient(1px 1px at 250px 10px, rgba(255,255,255,.9), transparent);
    animation: starTwinkleA 5s ease-in-out infinite;
}

.starfield::after {
    background-size: 577px 577px;
    background-image:
        radial-gradient(1px 1px at 50px 120px, rgba(255,255,255,.9), transparent),
        radial-gradient(1.5px 1.5px at 140px 450px, rgba(255,255,255,.8), transparent),
        radial-gradient(1px 1px at 210px 200px, rgba(226,240,255,.9), transparent),
        radial-gradient(1px 1px at 300px 540px, rgba(255,255,255,.7), transparent),
        radial-gradient(1.5px 1.5px at 360px 90px, rgba(255,255,255,.9), transparent),
        radial-gradient(1px 1px at 420px 330px, rgba(255,255,255,.8), transparent),
        radial-gradient(1px 1px at 500px 470px, rgba(255,236,200,.8), transparent),
        radial-gradient(1px 1px at 540px 30px, rgba(255,255,255,.8), transparent),
        radial-gradient(1.5px 1.5px at 180px 20px, rgba(226,240,255,.8), transparent),
        radial-gradient(1px 1px at 470px 190px, rgba(255,255,255,.7), transparent);
    animation: starTwinkleB 7s ease-in-out 1.5s infinite;
}

@keyframes starTwinkleA {
    0%, 100% { opacity: .35; }
    50% { opacity: 1; }
}
@keyframes starTwinkleB {
    0%, 100% { opacity: 1; }
    50% { opacity: .3; }
}

@media (prefers-reduced-motion: reduce) {
    .starfield::before,
    .starfield::after { animation: none; opacity: .7; }
}

/* v-reveal (src/directives/reveal.js): โผล่ขึ้นเมื่อเลื่อนมาถึง
   ใช้ property `translate` แยกจาก `transform` เพื่อไม่ชนกับ hover/active ของแต่ละ component
   หน่วงเวลาด้วย inline style: style="--delay:200ms" */
.reveal {
    opacity: 0;
    translate: 0 16px;
    transition:
        opacity .7s ease var(--delay, 0ms),
        translate .7s ease var(--delay, 0ms);
    will-change: opacity, translate;
}

.reveal.in-view {
    opacity: 1;
    translate: none;
}

@media (prefers-reduced-motion: reduce) {
    .reveal {
        opacity: 1;
        translate: none;
        transition: none;
    }
}

/* Section Styling */
section {
    padding: 8rem 10%;
    min-height: 100vh;
    text-align: center;
    /* กดลิงก์ในเมนูแล้ว section ไม่ไปมุดอยู่ใต้ header (--header-h ตั้งจาก HeaderNav.vue) */
    scroll-margin-top: var(--header-h, 7rem);
}

section .title {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 3rem;
    color: rgb(253, 247, 244);
}

/* Responsive Design */
@media (max-width: 768px) {
    html {
        font-size: 55%;
    }
}

@media (max-width: 480px) {
    html {
        font-size: 50%;
    }

    /* ขอบซ้าย-ขวา 10% เปลืองที่เกินไปบนมือถือ (คงขอบบนไว้ ไม่ให้เนื้อหาไปอยู่ใต้ header) */
    section {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    section .title {
        font-size: 3.2rem;
    }
}

</style>