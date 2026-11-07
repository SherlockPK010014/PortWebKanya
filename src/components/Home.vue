<template>
  <section class="section" id="home">
    <SpaceMagic ref="magic" />
    <h1 class="title animated-title" v-reveal>
  <span
    v-for="(ch, i) in letters"
    :key="i"
    :style="{ animationDelay: (i * 0.05) + 's' }"
  >
    {{ ch === ' ' ? '\u00A0' : ch }}
  </span>
</h1>
    <h2 class="typing" v-reveal>
  <span
    v-for="(ch, i) in lettersH2"
    :key="i"
    :style="{ animationDelay: (i * 0.15) + 's' }"
  >
    {{ ch === ' ' ? '\u00A0' : ch }}
  </span>
</h2>
    <br>
    <div :class="['Homepic-container', { expanded: isExpanded }]"
  @mouseover="expandImages"
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
    letters() {
      return this.text.split('');
    },
    lettersH2() {
      return this.text2.split("");
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
  directives: {
    reveal: {
      mounted(el) {
       
        el.classList.add('reveal');

        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add('in-view');   // โผล่
              } else {
                e.target.classList.remove('in-view'); // ซ่อนเมื่อพ้นจอ (เล่นซ้ำได้)
              }
            });
          },
          {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px',
          }
        );

        io.observe(el);
      },
    },
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

.animated-title {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
}

.animated-title span {
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

.typing span {
  display: inline-block;
  opacity: 0;
  animation: blinkIn 0.6s forwards;
}

@keyframes blinkIn {
  0%   { opacity: 0; }
  50%  { opacity: 1; }
  100% { opacity: 1; }
}
.Homepic-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  transition: width 0.3s ease; 
}

.Homepic-container.expanded {
  width: 1080px; 
}

.Homepic {
  margin-top: 5%;
  position: relative;
  width: 100%;
  height: 100%;
}

.main-pic {
  width: 200px;
  height: 200px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  transition: all 0.3s ease;
}

.extra-1,
.extra-2,
.extra-3,
.extra-4 {
  position: absolute;
  width: 200px;
  height: 200px;
  object-fit: cover;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1;
  top: 0;
}

.extra-1,
.extra-2,
.extra-3,
.extra-4 {
  left: 50%;
  transform: translateX(-50%);
}

.expanded .extra-1,
.expanded .extra-2,
.expanded .extra-3,
.expanded .extra-4 {
  opacity: 1;
}

.expanded .extra-1 {
  left: 0;
  transform: translateX(0);
  animation: magicIn 1.1s ease-out 0.28s both;
}

.expanded .extra-2 {
  left: 220px;
  transform: translateX(0);
  animation: magicIn 1.1s ease-out 0.41s both;
}

.expanded .main-pic {
  left: 440px;
  transform: translateX(0);
  animation: magicGlow 1.4s ease-out both;
}

.expanded .extra-3 {
  left: 660px;
  transform: translateX(0);
  animation: magicIn 1.1s ease-out 0.54s both;
}

.expanded .extra-4 {
  left: 880px;
  transform: translateX(0);
  animation: magicIn 1.1s ease-out 0.67s both;
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

.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity .7s ease,
    transform .7s ease;
  /* ถ้าอยากหน่วงแต่ละบล็อก ใส่ inline style: style="--delay:200ms" ได้ */
  transition-delay: var(--delay, 0ms);
  will-change: opacity, transform;
}

.reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}

</style>



