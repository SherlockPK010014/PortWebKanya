<template>
  <canvas ref="canvas" class="space-magic" aria-hidden="true"></canvas>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

/*
  SpaceMagic — ดาวระยิบระยับ + "นางฟ้าดาว" ที่บินโปรยฝุ่นดาวสีขาว
  + ฝุ่นดาวตามเมาส์/นิ้ว + ดาวตกเป็นระยะ
  วาดบน canvas ที่คลุมพื้นที่ของ element แม่ (section) ไม่รับ pointer event
*/
export default {
  name: 'SpaceMagic',
  setup() {
    const canvas = ref(null)
    let ctx, host, raf = 0, ro, io
    let w = 0, h = 0, dpr = 1
    let running = false
    let last = 0, time = 0
    let stars = []
    const dust = []
    const shoots = []
    let emitAcc = 0
    let nextShoot = 2
    let lastPtr = null
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const MAX_DUST = 420
    const rand = (a, b) => a + Math.random() * (b - a)

    function makeStars() {
      const n = Math.max(60, Math.min(220, Math.round((w * h) / 9000)))
      stars = Array.from({ length: n }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: rand(0.4, 1.5),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.6, 2.2),
        warm: Math.random() < 0.15
      }))
    }

    function resize() {
      w = host.clientWidth
      h = host.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const c = canvas.value
      c.width = Math.round(w * dpr)
      c.height = Math.round(h * dpr)
      c.style.width = w + 'px'
      c.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      makeStars()
      if (!running) draw(0) // วาดดาวนิ่ง ๆ เมื่อหยุดอยู่
    }

    // ---------- วาด ----------
    function sparkle(x, y, s, rot) {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rot)
      ctx.beginPath()
      ctx.moveTo(0, -s)
      ctx.quadraticCurveTo(0, 0, s, 0)
      ctx.quadraticCurveTo(0, 0, 0, s)
      ctx.quadraticCurveTo(0, 0, -s, 0)
      ctx.quadraticCurveTo(0, 0, 0, -s)
      ctx.fill()
      ctx.restore()
    }

    function fairyPos(t) {
      return {
        x: w * (0.5 + 0.36 * Math.sin(t + 0.6 * Math.sin(t * 0.37))),
        y: h * (0.36 + 0.2 * Math.sin(t * 1.7) + 0.06 * Math.sin(t * 3.1))
      }
    }

    function emit(x, y, spread = 6, speed = 1) {
      if (dust.length >= MAX_DUST) return
      dust.push({
        x: x + rand(-spread, spread),
        y: y + rand(-spread, spread),
        vx: rand(-20, 20) * speed,
        vy: rand(-12, 26) * speed,
        life: 0,
        max: rand(0.9, 1.9),
        size: rand(0.8, 2.6),
        star: Math.random() < 0.28,
        rot: rand(0, Math.PI),
        tint: Math.random() < 0.2 ? 1 : 0
      })
    }

    // ระเบิดฝุ่นดาวเป็นวงกลม (ใช้ตอนรูปบานออก) พิกัดอ้างอิงจากมุมซ้ายบนของ section
    function burst(x, y, count = 40, power = 1) {
      if (reduced || !running) return
      for (let i = 0; i < count; i++) {
        if (dust.length >= MAX_DUST + 200) break
        const ang = rand(0, Math.PI * 2)
        const sp = rand(50, 230) * power
        dust.push({
          x, y,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 20,
          life: 0,
          max: rand(0.8, 1.7),
          size: rand(1, 3),
          star: Math.random() < 0.5,
          rot: rand(0, Math.PI),
          tint: Math.random() < 0.2 ? 1 : 0
        })
      }
    }

    function draw(dt) {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      // ดาวพื้นหลัง
      for (const s of stars) {
        const a = reduced ? 0.6 : 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(s.phase + time * s.speed))
        ctx.fillStyle = s.warm ? `rgba(255,236,200,${a})` : `rgba(226,240,255,${a})`
        ctx.beginPath()
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (reduced) {
        ctx.globalCompositeOperation = 'source-over'
        return
      }

      // ดาวตก
      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i]
        s.life += dt
        s.x += s.vx * dt
        s.y += s.vy * dt
        const k = s.life / s.max
        if (k >= 1) { shoots.splice(i, 1); continue }
        const a = Math.sin(Math.PI * k)
        const len = 140
        const nx = s.vx / Math.hypot(s.vx, s.vy)
        const ny = s.vy / Math.hypot(s.vx, s.vy)
        const g = ctx.createLinearGradient(s.x, s.y, s.x - nx * len, s.y - ny * len)
        g.addColorStop(0, `rgba(255,255,255,${a})`)
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.strokeStyle = g
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - nx * len, s.y - ny * len)
        ctx.stroke()
      }

      // ฝุ่นดาว
      for (let i = dust.length - 1; i >= 0; i--) {
        const p = dust[i]
        p.life += dt
        if (p.life >= p.max) { dust.splice(i, 1); continue }
        p.vy += 18 * dt // ค่อย ๆ ร่วงลงเบา ๆ
        p.vx *= 1 - 0.6 * dt
        p.x += p.vx * dt
        p.y += p.vy * dt
        const k = p.life / p.max
        const a = (1 - k) * (0.55 + 0.45 * Math.sin(p.life * 18 + p.rot))
        ctx.fillStyle = p.tint ? `rgba(186,230,253,${a})` : `rgba(255,255,255,${a})`
        if (p.star) {
          sparkle(p.x, p.y, p.size * 3.2 * (1 - k * 0.4), p.rot + p.life * 2)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * (1 - k * 0.5), 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // นางฟ้าดาว (ดวงไฟนำทาง)
      const f = fairyPos(time * 0.35)
      const pulse = 0.85 + 0.15 * Math.sin(time * 6)
      const glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 46 * pulse)
      glow.addColorStop(0, 'rgba(255,255,255,0.95)')
      glow.addColorStop(0.25, 'rgba(210,235,255,0.45)')
      glow.addColorStop(1, 'rgba(120,190,255,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(f.x, f.y, 46 * pulse, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.95)'
      sparkle(f.x, f.y, 16 * pulse, time * 0.8)
      sparkle(f.x, f.y, 9 * pulse, -time * 1.2 + 0.8)

      ctx.globalCompositeOperation = 'source-over'
    }

    function update(dt) {
      time += dt

      // นางฟ้าโปรยฝุ่นดาวตลอดทางที่บิน
      const f = fairyPos(time * 0.35)
      emitAcc += dt * 85
      while (emitAcc >= 1) { emit(f.x, f.y, 7); emitAcc -= 1 }

      // ดาวตกทุก ๆ 3–7 วินาที
      nextShoot -= dt
      if (nextShoot <= 0) {
        nextShoot = rand(3, 7)
        const ang = rand(Math.PI * 0.62, Math.PI * 0.8) // ลงซ้าย
        const sp = rand(600, 900)
        shoots.push({
          x: rand(w * 0.45, w * 1.0),
          y: rand(0, h * 0.35),
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          life: 0,
          max: rand(0.7, 1.1)
        })
      }
    }

    function frame(now) {
      if (!running) return
      const dt = Math.min((now - last) / 1000 || 0, 0.05)
      last = now
      update(dt)
      draw(dt)
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (running || reduced) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    function stop() {
      running = false
      cancelAnimationFrame(raf)
    }

    // ---------- เมาส์ / นิ้ว ----------
    function onPointerMove(e) {
      if (reduced || !running) return
      const r = host.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (lastPtr) {
        const d = Math.hypot(x - lastPtr.x, y - lastPtr.y)
        const n = Math.min(4, Math.ceil(d / 14))
        for (let i = 0; i < n; i++) {
          const k = (i + 1) / n
          emit(lastPtr.x + (x - lastPtr.x) * k, lastPtr.y + (y - lastPtr.y) * k, 3, 1.4)
        }
      }
      lastPtr = { x, y }
    }
    function onPointerLeave() { lastPtr = null }

    onMounted(() => {
      ctx = canvas.value.getContext('2d')
      host = canvas.value.parentElement
      resize()
      ro = new ResizeObserver(resize)
      ro.observe(host)
      io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0 }
      )
      io.observe(host)
      host.addEventListener('pointermove', onPointerMove)
      host.addEventListener('pointerleave', onPointerLeave)
    })

    onBeforeUnmount(() => {
      stop()
      ro?.disconnect()
      io?.disconnect()
      host?.removeEventListener('pointermove', onPointerMove)
      host?.removeEventListener('pointerleave', onPointerLeave)
    })

    return { canvas, burst }
  }
}
</script>

<style scoped>
.space-magic {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}
</style>
