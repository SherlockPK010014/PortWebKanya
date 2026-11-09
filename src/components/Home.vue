<template>
  <section class="section" id="home">
    <SpaceMagic ref="magic" />
    <!-- \u0E41\u0E22\u0E01\u0E40\u0E1B\u0E47\u0E19 "\u0E04\u0E33" (\u0E2B\u0E49\u0E32\u0E21\u0E15\u0E31\u0E14\u0E01\u0E25\u0E32\u0E07\u0E04\u0E33) \u0E41\u0E25\u0E49\u0E27\u0E04\u0E48\u0E2D\u0E22\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23 (\u0E44\u0E27\u0E49\u0E17\u0E33\u0E2D\u0E19\u0E34\u0E40\u0E21\u0E0A\u0E31\u0E19\u0E17\u0E35\u0E25\u0E30\u0E15\u0E31\u0E27)
         \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07 {{ ' ' }} \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E04\u0E33\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E08\u0E2D\u0E41\u0E04\u0E1A\u0E02\u0E36\u0E49\u0E19\u0E1A\u0E23\u0E23\u0E17\u0E31\u0E14\u0E43\u0E2B\u0E21\u0E48\u0E44\u0E14\u0E49 -->
    <h1 class="title animated-title" v-reveal>
      <template v-for="(word, wi) in titleWords" :key="wi">
        <span class="word">
          <span
            v-for="c in word"
            :key="c.i"
            class="char"
            :style="{ animationDelay: (c.i * 0.05) + 's' }"
          >{{ c.ch }}</span>
        </span>{{ ' ' }}
      </template>
    </h1>
    <!-- คำโปรย ไม่ใช่หัวข้อของส่วนใด จึงเป็น <p> (หน้าเว็บมี <h1> เดียวคือบรรทัดบน) -->
    <p class="typing" v-reveal>
      <template v-for="(word, wi) in subtitleWords" :key="wi">
        <span class="word">
          <span
            v-for="c in word"
            :key="c.i"
            class="char"
            :style="{ animationDelay: (c.i * 0.15) + 's' }"
          >{{ c.ch }}</span>
        </span>{{ ' ' }}
      </template>
    </p>
    <div :class="['Homepic-container', { expanded: isExpanded }]"
  @mouseover="expandImages"
  @click="expandImages"
  v-reveal>
      <div class="Homepic">
        <img src="@/assets/34264.jpg" alt="MainProfile-pic" class="main-pic" />
        <img src="@/assets/34276.jpg" alt="Extra Pic1" class="extra-1" />
        <img src="@/assets/34278.jpg" alt="Extra Pic2" class="extra-2" />
        <img src="@/assets/34277.jpg" alt="Extra Pic3" class="extra-3" />
        <img src="@/assets/34323.jpg" alt="Extra Pic4" class="extra-4" />
      </div>
    </div>
  </section>
</template>

<script>
import SpaceMagic from './SpaceMagic.vue'

// "HELLO, ME" -> [[{ch:'H',i:0}, ...], [{ch:'M',i:7}, ...]]
// i คือลำดับตัวอักษรในข้อความเต็ม (นับช่องว่างด้วย) เพื่อให้จังหวะอนิเมชันเท่าเดิม
function splitWords(text) {
  const words = []
  let current = []
  ;[...text].forEach((ch, i) => {
    if (ch === ' ') {
      if (current.length) words.push(current)
      current = []
    } else {
      current.push({ ch, i })
    }
  })
  if (current.length) words.push(current)
  return words
}

export default {
  components: { SpaceMagic },
  data() {
    return {
      isExpanded: false,
      text: "HELLO, GET TO KNOW ME...",
      text2: "Welcome to my profile",
    };
  },
  computed: {
    titleWords() {
      return splitWords(this.text);
    },
    subtitleWords() {
      return splitWords(this.text2);
    }
  },
  methods: {
    expandImages() {
      if (this.isExpanded) return;
      this.isExpanded = true;
      this.castMagic();
    },
    // โปรยเวทมนตร์ดาวตอนรูปบานออก: เริ่มที่รูปหลัก แล้วไล่ไปทีละรูป
    castMagic() {
      const magic = this.$refs.magic;
      if (!magic?.burst) return;
      const imgs = Array.from(this.$el.querySelectorAll('.Homepic img'));
      const burstAt = (img, count, power) => {
        const s = this.$el.getBoundingClientRect();
        const r = img.getBoundingClientRect();
        magic.burst(r.left - s.left + r.width / 2, r.top - s.top + r.height / 2, count, power);
      };
      burstAt(imgs[0], 45, 1.1);
      // ลำดับรูปที่ขยายออก: ซ้ายสุด -> ขวาสุด (extra-1, extra-2, extra-3, extra-4)
      const order = [1, 2, 3, 4];
      order.forEach((idx, n) => {
        setTimeout(() => imgs[idx] && burstAt(imgs[idx], 35, 0.9), 280 + n * 130);
      });
    }
  },
};

</script>

<style scoped>
/* ให้ canvas เวทมนตร์อวกาศอยู่หลังเนื้อหาแต่ในขอบเขตของ section */
#home {
  position: relative;
  isolation: isolate;
}

.title{
  margin-top: 3%;
}

/* overflow:hidden ทำให้ตัวอักษรดูเหมือน "โผล่ขึ้นจากขอบ" ตอนเริ่มอนิเมชัน */
.animated-title {
  display: inline-block;
  overflow: hidden;
}

/* คำหนึ่งคำห้ามถูกตัดขึ้นบรรทัดใหม่ — ตัดได้เฉพาะช่องว่างระหว่างคำ */
.word {
  display: inline-block;
  white-space: nowrap;
}

.animated-title .char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1.2s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* หน้าตาเท่าตอนเป็น <h2> เดิม
   margin-bottom = .5rem (ของ h2) + 2.56rem (บรรทัดว่างของ <br> ที่เคยคั่นอยู่ = 1.6rem × line-height 1.6) */
.typing {
  font-size: calc(1.325rem + .9vw);
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 3.06rem;
}
@media (min-width: 1200px) {
  .typing { font-size: 2rem; }
}

.typing .char {
  display: inline-block;
  opacity: 0;
  animation: blinkIn 0.6s forwards;
}

@keyframes blinkIn {
  0%   { opacity: 0; }
  50%  { opacity: 1; }
  100% { opacity: 1; }
}
/* ===== รูป 5 รูปที่บานออก =====
   ขนาดคิดจากความกว้างของ section (cqi = 1% ของความกว้าง #home)
   --pic  ขนาดรูป: จอกว้างได้ 200px เท่าเดิม จอแคบลงจะย่อตาม
   --step ระยะจากรูปหนึ่งถึงรูปถัดไป (รูป + ช่องว่าง 10%)
   แถวเต็ม = 5 รูป + 4 ช่องว่าง = 5.4 × --pic (= 1080px บนจอกว้าง) */
#home {
  container-type: inline-size;
}

.Homepic-container {
  --pic: min(200px, 100cqi / 5.4);
  --step: calc(var(--pic) * 1.1);
  /* กัน margin-top ของ .Homepic ทะลุออกไปรวม (collapse) กับ margin ของคำโปรยด้านบน */
  display: flow-root;
  position: relative;
  width: var(--pic);
  height: var(--pic);
  margin: 0 auto;
  /* opacity/translate มาจาก v-reveal */
  transition:
    width 0.3s ease,
    height 0.3s ease,
    opacity .7s ease var(--delay, 0ms),
    translate .7s ease var(--delay, 0ms);
}

.Homepic-container.expanded {
  width: calc(var(--pic) * 5.4);
}

.Homepic {
  margin-top: 5%;
  position: relative;
  width: 100%;
  height: 100%;
}

/* ก่อนบาน: ทุกรูปซ้อนกันอยู่กลาง container (เห็นแค่รูปหลัก) */
.Homepic img {
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--pic);
  height: var(--pic);
  object-fit: cover;
  transform: translateX(-50%);
  border-radius: 20%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.main-pic { z-index: 2; }

.extra-1,
.extra-2,
.extra-3,
.extra-4 {
  opacity: 0;
  z-index: 1;
}

/* ลำดับในแถว: extra-1, extra-2, รูปหลัก, extra-3, extra-4 */
.extra-1  { --i: 0; }
.extra-2  { --i: 1; }
.main-pic { --i: 2; }
.extra-3  { --i: 3; }
.extra-4  { --i: 4; }

.expanded .Homepic img {
  left: calc(var(--i) * var(--step));
  transform: translateX(0);
}

.expanded .extra-1,
.expanded .extra-2,
.expanded .extra-3,
.expanded .extra-4 {
  opacity: 1;
}

.expanded .main-pic { animation: magicGlow 1.4s ease-out both; }
.expanded .extra-1  { animation: magicIn 1.1s ease-out 0.28s both; }
.expanded .extra-2  { animation: magicIn 1.1s ease-out 0.41s both; }
.expanded .extra-3  { animation: magicIn 1.1s ease-out 0.54s both; }
.expanded .extra-4  { animation: magicIn 1.1s ease-out 0.67s both; }

/* จอแคบ: แถวละ 5 รูปจะเล็กเกินไป -> จัดเป็นคอลลาจ
   รูปหลักใหญ่อยู่บน + รูปเสริม 4 รูปเป็นตาราง 2×2 ข้างล่าง (กว้างเท่ารูปหลัก) */
@media (max-width: 700px) {
  .Homepic-container {
    --pic: min(200px, 100cqi);
    --gap: 10px;
    --tile: calc((var(--pic) - var(--gap)) / 2);
  }
  .Homepic-container.expanded {
    width: var(--pic);
    height: calc(var(--pic) + 2 * var(--tile) + 2 * var(--gap));
  }

  .expanded .Homepic img { left: 0; }

  .expanded .extra-1,
  .expanded .extra-2,
  .expanded .extra-3,
  .expanded .extra-4 {
    width: var(--tile);
    height: var(--tile);
  }
  .expanded .extra-1,
  .expanded .extra-2 { top: calc(var(--pic) + var(--gap)); }
  .expanded .extra-3,
  .expanded .extra-4 { top: calc(var(--pic) + var(--tile) + 2 * var(--gap)); }
  /* ต้องเจาะจงกว่า .expanded .Homepic img ที่ตั้ง left ไว้ */
  .expanded .Homepic .extra-2,
  .expanded .Homepic .extra-4 { left: calc(var(--tile) + var(--gap)); }
}

/* รูปโผล่แบบเวทมนตร์: สว่างวาบ เบลอ แล้วค่อยชัด */
@keyframes magicIn {
  0% {
    opacity: 0;
    transform: translateX(0) scale(0.55) rotate(-8deg);
    filter: brightness(2.4) blur(8px);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
  45% {
    opacity: 1;
    filter: brightness(1.6) blur(1px);
    box-shadow: 0 0 46px 10px rgba(255, 255, 255, 0.65);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1) rotate(0);
    filter: none;
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
}

@keyframes magicGlow {
  0% {
    filter: brightness(1);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
  35% {
    filter: brightness(1.5);
    box-shadow: 0 0 46px 10px rgba(255, 255, 255, 0.65);
  }
  100% {
    filter: none;
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .expanded .extra-1,
  .expanded .extra-2,
  .expanded .extra-3,
  .expanded .extra-4,
  .expanded .main-pic {
    animation: none;
  }
}

</style>



