<!-- components/SkillGlassAccordion.vue -->
<template>
  <section class="skillga-section starfield" id="skills">
    <h2 class="skillga-title" v-reveal>My Skills</h2>

    <div class="skillga-layout">
      <!-- LEFT -->
      <aside class="ga-left ga-card" v-reveal>
        <div class="ga-photo">
          <transition name="fade-swap" mode="out-in">
            <img
              :key="hovering ? 'alt' : 'main'"
              :src="hovering ? picAlt : pic"
              alt="profile"
              @mouseover="hovering = true"
              @mouseleave="hovering = false"
            />
          </transition>
        </div>
        <h3 class="ga-name">Kanyasiri K.</h3>
        <p class="ga-role">Computer Science • Student</p>
      </aside>

      <!-- RIGHT -->
      <div class="ga-right">
        <div
          v-for="(group, gi) in groups"
          :key="group.category + gi"
          class="ga-acc ga-card"
          v-reveal
          :class="{ open: openIdx === gi }"
          :style="{ '--delay': (gi * 80) + 'ms' }"
        >
          <!-- รูปแบบ accordion ที่ถูกต้อง: หัวข้อครอบปุ่ม (ห้ามใส่ <h4>/<div> ไว้ในปุ่ม) -->
          <h3 class="ga-acc-heading">
            <button class="ga-acc-head" @click="toggle(gi, $event)">
              <span class="ga-acc-title">
                <span class="dot"></span>
                <span class="ga-acc-name">{{ group.category }}</span>
              </span>
              <span class="chev" :class="{ open: openIdx === gi }">▾</span>
            </button>
          </h3>

          <transition name="ga-acc">
            <div v-show="openIdx === gi" class="ga-acc-body">
              <!-- SKILL GRID -->
              <ul class="ga-skill-grid">
                <li
                  v-for="(s, i) in group.items"
                  :key="s.name + i"
                  class="ga-skill"
                  :style="{ '--item-delay': (i * 70) + 'ms' }"
                >
                  <span class="skill-dot"></span>
                  <div class="skill-content">
                    <span class="skill-name">{{ s.name }}</span>

                    <div v-if="s.tags" class="ga-tags">
                      <span class="ga-tag" v-for="t in s.tags" :key="t">{{ t }}</span>
                    </div>

                    <p v-if="s.desc" class="ga-desc">{{ s.desc }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import pic from '@/assets/kanya_1.png'
import picAlt from '@/assets/kanya_hover.png'

export default {
  name: 'SkillGlassAccordion',
  data() {
    return {
      pic,
      picAlt,
      hovering: false,
      openIdx: 0,
      groups: [
        {
          category: 'Programming',
          items: [
            { name: 'Python' },
            { name: 'C' },
            { name: 'C++' },
            { name: 'Java' },
            { name: 'Kotlin' },
            { name: 'JavaScript' },
            { name: 'HTML / CSS' },
            { name: 'Vue.js', tags: ['Vite', 'Router'], desc: 'Composition API' },
            { name: 'Next.js' },
            { name: 'SQL' }
          ]
        },
        {
          category: 'Remote Sensing & Cal/Val',
          items: [
            { name: 'Satellite Image Processing' },
            { name: 'Digital Image Processing' },
            { name: 'Geometric & Radiometric Calibration' },
            { name: 'QGIS' },
            { name: 'Rasterio' }
          ]
        },
        {
          category: 'AI & ML',
          items: [
            { name: 'OpenCV' },
            { name: 'DeepFace' },
            { name: 'FER' }
          ]
        },
        {
          category: 'Tools',
          items: [
            { name: 'Git' },
            { name: 'VS Code' },
            { name: 'NetBeans' },
            { name: 'Power BI' },
            { name: 'Figma' },
            { name: 'Android Studio' }
          ]
        },
        {
          category: 'Soft Skills',
          items: [
            { name: 'Teamwork' },
            { name: 'Critical Thinking' },
            { name: 'Time Management' },
            { name: 'Project Coordination' },
            { name: 'Project Management' }
          ]
        }
      ]
    }
  },
  methods: {
    toggle(i, evt) {
      evt?.currentTarget?.blur?.()
      this.openIdx = this.openIdx === i ? -1 : i
    }
  }
}
</script>


<style scoped>
.skillga-section{
  margin-top:120px;
  padding:3rem 2rem;
  background:
    radial-gradient(1200px 600px at 10% 0%, rgba(56,189,248,.12), transparent),
    linear-gradient(135deg,#1e293b,#0f172a);
  color:#fff;
  border-radius:16px;
  max-width:1500px;
  margin:auto;
  box-shadow:0 10px 30px rgba(0,0,0,.35);
}

.skillga-title{
  font-size:3rem;
  font-weight:800;
  color:#38bdf8;
  margin-bottom:1.4rem;
}

.skillga-layout{
  display:grid;
  grid-template-columns:360px 1fr;
  gap:1.4rem;
}
@media(max-width:980px){
  .skillga-layout{ grid-template-columns:1fr; }
}

.ga-card{
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.12);
  backdrop-filter:blur(8px);
  border-radius:16px;
  padding:1.2rem;
  box-shadow:0 14px 40px rgba(0,0,0,.25);
}

/* LEFT */
.ga-photo{
  max-width:260px;
  margin:auto;
}
.ga-photo img{
  width:100%;
  height:auto;
}
.ga-name{
  text-align:center;
  font-size:1.6rem;
  font-weight:800;
}
.ga-role{
  text-align:center;
  color:#cbd5e1;
}

/* ACCORDION */
.ga-acc + .ga-acc{ margin-top:.9rem; }

.ga-acc-head{
  width:100%;
  background:none;
  border:none;
  color:#e2e8f0;
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-weight:800;
  cursor:pointer;
}

/* <h3> ที่ครอบปุ่ม: ไม่ให้มีผลกับหน้าตา (ใช้ขนาด/น้ำหนักตัวอักษรของ element แม่ตามเดิม) */
.ga-acc-heading{
  margin:0;
  font-size:inherit;
  font-weight:inherit;
  line-height:inherit;
}

.ga-acc-title{
  display:flex;
  gap:.6rem;
  align-items:center;
}

/* ชื่อหมวด: หน้าตาเท่าตอนเป็น <h4> เดิม */
.ga-acc-name{
  display:block;
  margin-bottom:.5rem;
  font-size:calc(1.275rem + .3vw);
  font-weight:500;
  line-height:1.2;
}
@media (min-width: 1200px){
  .ga-acc-name{ font-size:1.5rem; }
}

.dot{
  width:10px;
  height:10px;
  border-radius:50%;
  background:linear-gradient(45deg,#38bdf8,#22d3ee);
}

.chev{ transition:.3s; }
.chev.open{ transform:rotate(180deg); }

.ga-acc-body{ margin-top:1rem; }

/* SKILLS */
.ga-skill-grid{
  list-style:none;
  padding:0;
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:1rem;
}

.ga-skill{
  display:flex;
  gap:.75rem;
  padding:.9rem 1rem;
  border-radius:14px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.12);
  opacity:0;
  transform:translateY(10px);
  animation:skillFade .5s ease forwards;
  animation-delay:var(--item-delay);
}

@keyframes skillFade{
  to{ opacity:1; transform:none; }
}

.skill-dot{
  width:10px;
  height:10px;
  margin-top:.45rem;
  border-radius:50%;
  background:linear-gradient(45deg,#38bdf8,#22d3ee);
}

.skill-name{
  font-weight:800;
  color:#e2e8f0;
}

.ga-tags{
  display:flex;
  gap:.35rem;
  flex-wrap:wrap;
}

.ga-tag{
  font-size:.75rem;
  padding:.18rem .5rem;
  border-radius:999px;
  background:rgba(148,163,184,.18);
  color:#cbd5e1;
}

.ga-desc{
  font-size:.9rem;
  color:#cbd5e1;
}
</style>
