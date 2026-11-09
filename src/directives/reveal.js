// v-reveal: ค่อย ๆ โผล่ขึ้นมาเมื่อ element เข้ามาในจอ และซ่อนกลับเมื่อพ้นจอ (เล่นซ้ำได้)
//
// วิธีใช้
//   <div v-reveal>                              ใช้ค่าเริ่มต้น
//   <div v-reveal style="--delay:200ms">        หน่วงเวลาก่อนโผล่
//   <div v-reveal="{ threshold: 0.3 }">         ปรับค่าของ IntersectionObserver
//
// สไตล์ของ .reveal / .reveal.in-view อยู่ใน App.vue (global)
// ถ้า element มี transition ของตัวเอง ต้องเพิ่ม opacity/translate ลงไปด้วย ไม่งั้น fade จะหาย
// (ดูตัวอย่างที่ .card ใน CertificateGrid.vue)

const DEFAULTS = { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }

// ใช้ observer ร่วมกันตามชุดค่า option แทนการสร้างใหม่ทุก element
const observers = new Map()

function getObserver(options) {
  const key = JSON.stringify(options)
  let io = observers.get(key)
  if (!io) {
    io = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle('in-view', e.isIntersecting)
    }, options)
    observers.set(key, io)
  }
  return io
}

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default {
  mounted(el, { value }) {
    el.classList.add('reveal')

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('in-view')
      return
    }

    const io = getObserver({ ...DEFAULTS, ...value })
    el.__revealIO = io
    io.observe(el)
  },
  unmounted(el) {
    el.__revealIO?.unobserve(el)
    delete el.__revealIO
  },
}
