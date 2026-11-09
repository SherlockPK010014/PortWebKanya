<template>
  <section class="section starfield" id="about-me">
    <div class="about-me-container">
      <div class="Pic-ABU" v-reveal style="--delay:0ms">
        <div class="card">
          <div class="card-face front">
            <img src="@/assets/34285.jpg" alt="Kanyasiri (Prang) in her university uniform, outdoors" />
          </div>
          <div class="card-face back">
            <img src="@/assets/34287.jpg" alt="Kanyasiri (Prang) blowing soap bubbles by a lake" />
          </div>
        </div>
      </div>

      <div class="profile-content">
        <h2 class="title" v-reveal style="--delay:120ms">About Me</h2>
        <!-- รายการ "หัวข้อ : ค่า" -> <dl> (dt = หัวข้อ, dd = ค่า) แทน <h4> ที่ไม่ใช่หัวข้อจริง -->
        <dl class="profile-inner">
          <!-- หน้าเว็บเป็นภาษาอังกฤษ (lang="en") บรรทัดนี้เป็นภาษาไทย ให้ screen reader อ่านเป็นภาษาไทย -->
          <div class="row" lang="th" v-reveal style="--delay:200ms">
            <dt class="label">ชื่อ - นามสกุล : </dt>
            <dd class="value">{{ profile.fullNameTH }}</dd>
          </div>
          <div class="row" v-reveal style="--delay:280ms">
            <dt class="label">Name : </dt>
            <dd class="value">{{ profile.fullNameEN }}</dd>
          </div>
          <div class="row" v-reveal style="--delay:360ms">
            <dt class="label">Nickname : </dt>
            <dd class="value">{{ profile.nickname }}</dd>
          </div>
          <div class="row" v-reveal style="--delay:520ms">
            <dt class="label">Major : </dt>
            <dd class="value">{{ profile.major }}</dd>
          </div>
          <div class="row" v-reveal style="--delay:600ms">
            <dt class="label">University : </dt>
            <dd class="value">{{ profile.university }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>


<script>
import profileData from '@/data/db.json'

export default {
  name: 'AboutMe',
  data() {
    return { profile: { ...profileData } }
  }
}
</script>



<style scoped>
.section {
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: #fff;
  border-radius: 16px;
  max-width: 1500px;
  min-height: 400px; 
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
}

.section:hover {
  transform: translateY(-3px);
}

.about-me-container {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap; 
}

.Pic-ABU {
  
  margin: 1rem;
  margin-left: 5rem;
  flex: 1;
  min-width: 350px;
  max-width: 400px;
  height: 460px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  perspective: 1000px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}
.Pic-ABU img {
  width: 80%;
  height: 80%;
  margin-top: 12%;
  object-fit: cover;
  border-radius: 10px;
  margin-left: 1%;
}
.card {
  position: relative;
  width: 100%;
  height: 100%;
  /* กรอบพื้นขาว (เดิมได้มาจาก .card ของ Bootstrap) */
  background: #fff;
  border: 1px solid rgba(0, 0, 0, .176);
  border-radius: .375rem;
  transform-style: preserve-3d;
  animation: flip 8s infinite;
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
}

.card-face.front { transform: rotateY(0deg); }
.card-face.back { transform: rotateY(180deg); }




.profile-content {
  flex: 2;
  text-align: left;
  padding: rem;
}

/* ระยะห่างเดิมได้จาก <br /> (บรรทัดว่าง 1 บรรทัด = 1.6rem × line-height 1.6 = 2.56rem)
   ตอนนี้ใส่เป็น margin แทน: ระยะเท่าเดิม */
.title {
  margin-left: 1rem;
  margin-top: 2.56rem;
  font-size: 3.5rem;
  margin-bottom: 3.56rem;  /* 1rem + บรรทัดว่าง */
  color: #38bdf8;
  font-weight: 700;
  letter-spacing: 1px;
}

.profile-inner .row {
  margin-left: 1rem;
  margin-bottom: 3.56rem;  /* 1rem + บรรทัดว่าง */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1.2;        /* เท่าตอนเป็น <h4> */
}

.label {
  font-size: 2.5rem;
  font-weight: 600;
  color: #fbbf24; 
}

.value {
  font-size: 2rem;
  color: #e2e8f0;
  font-weight: 400;
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  transition: background 0.3s ease;
}

.value:hover {
  background: rgba(56, 189, 248, 0.15);
}

@keyframes flip {
  0%   { transform: rotateY(0deg); }
  45%  { transform: rotateY(180deg); }
  50%  { transform: rotateY(180deg); }
  95%  { transform: rotateY(0deg); }
  100% { transform: rotateY(0deg); }
}

@media (max-width: 900px) {
  .about-me-container { flex-direction: column; align-items: center; }

  /* เดิม flex:1 ในแนวตั้งทำให้กรอบรูปสูงเหลือ 2px (รูปหายไป) และ min-width 350px + margin-left ทำให้ล้นจอ
     -> ใช้ขนาด 350×460 เท่าเดิม แต่ย่อตามจอได้ และอยู่กึ่งกลาง */
  .Pic-ABU {
    flex: none;
    margin: 1rem auto;
    min-width: 0;
    width: min(350px, 100%);
    height: auto;
    aspect-ratio: 350 / 460;
  }

  .profile-content {
    flex: none;
    width: 100%;
    min-width: 0;
    text-align: center;
  }
  .title { text-align: center; margin-left: 0; }

  /* หัวข้อกับค่ายาว ๆ (เช่นชื่อเต็ม) ขึ้นบรรทัดใหม่ได้ ไม่ล้นจอ */
  .profile-inner .row {
    justify-content: center;
    flex-wrap: wrap;
    margin-left: 0;
  }
  .value { max-width: 100%; }
}
</style>