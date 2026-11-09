<template>
  <section class="ct-section starfield" id="contact">
    <header class="ct-head" v-reveal>
      <h2 class="ct-title">Contact</h2>
      <p class="ct-lead">
        Open to internship and job opportunities. Feel free to reach out.
      </p>
    </header>

    <div class="ct-wrap">
      <!-- Profile / main CTA -->
      <div class="ct-profile" v-reveal style="--delay:80ms">
        <div class="ct-avatar">
          <img :src="pic" alt="" />
        </div>
        <h3 class="ct-name">{{ profile.name }}</h3>
        <p class="ct-role">{{ profile.role }}</p>

        <a class="ct-cta" :href="`mailto:${profile.email}`">
          <svg class="ct-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" v-html="ICONS.mail"></svg>
          Email me
        </a>

        <div class="ct-socials">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noreferrer"
            class="ct-social"
            :aria-label="s.label"
            :title="s.label"
          >
            <svg class="ct-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" v-html="ICONS[s.icon]"></svg>
          </a>
        </div>
      </div>

      <!-- Channels -->
      <div class="ct-channels">
        <div
          v-for="(it, i) in primary"
          :key="it.label"
          class="ct-tile"
          v-reveal
          :style="{ '--delay': 140 + i * 80 + 'ms' }"
        >
          <a class="ct-tile-link" :href="it.href" target="_blank" rel="noreferrer">
            <span class="ct-ico">
              <svg class="ct-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" v-html="ICONS[it.icon]"></svg>
            </span>
            <span class="ct-meta">
              <span class="ct-label">{{ it.label }}</span>
              <span class="ct-sub">{{ it.sub }}</span>
            </span>
            <svg class="ct-go" viewBox="0 0 24 24" aria-hidden="true" focusable="false" v-html="ICONS.arrow"></svg>
          </a>

          <button
            v-if="it.copy"
            class="ct-copy"
            :aria-label="`Copy ${it.label}`"
            @click="copy(it.copy)"
          >
            <svg class="ct-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" v-html="ICONS.copy"></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- toast ที่มองเห็น (เกิดขึ้นพร้อมข้อความ screen reader มักไม่อ่าน จึงซ่อนจาก screen reader) -->
    <transition name="ct-toast">
      <div v-if="toast" class="ct-toast" aria-hidden="true">{{ toast }}</div>
    </transition>
    <!-- live region ที่อยู่ในหน้าตลอด: พอข้อความเปลี่ยน screen reader จะอ่านให้ฟัง -->
    <div class="sr-only" role="status" aria-live="polite">{{ toast }}</div>
  </section>
</template>

<script>
import pic from '@/assets/kanya_profile.png'

// Feather-style stroke icons (24x24)
const ICONS = {
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  line: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  arrow: '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>'
}

export default {
  name: 'ContactSection',

  data() {
    return {
      pic,
      ICONS,
      toast: '',
      toastTimer: null,
      profile: {
        name: 'Kanyasiri K.',
        role: 'Computer Science • Student',
        email: 'pksirichotkul@gmail.com'
      },
      primary: [
        {
          icon: 'mail',
          label: 'Email',
          sub: 'pksirichotkul@gmail.com',
          href: 'mailto:pksirichotkul@gmail.com',
          copy: 'pksirichotkul@gmail.com'
        },
        {
          icon: 'line',
          label: 'LINE',
          sub: '@kanyasiri_4869',
          href: 'https://line.me/R/ti/p/@kanyasiri_4869',
          copy: 'kanyasiri_4869'
        },
        {
          icon: 'phone',
          label: 'Phone',
          sub: '+66 96 945 9415',
          href: 'tel:+66969459415',
          copy: '+66969459415'
        }
      ],
      socials: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/SherlockPK010014' },
        { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/i3kxnyaz_' },
        { icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/share/16xLqbuJNz/?mibextid=wwXIfr' }
      ]
    }
  },

  beforeUnmount() {
    clearTimeout(this.toastTimer)
  },

  methods: {
    copy(text) {
      navigator.clipboard
        .writeText(text)
        .then(() => this.showToast('Copied to clipboard'))
        .catch(() => this.showToast('Could not copy'))
    },
    showToast(msg) {
      this.toast = msg
      clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => (this.toast = ''), 1600)
    }
  }
}
</script>

<style scoped>
/* ===== Section ===== */
.ct-section {
  margin: 140px auto 0;
  padding: 4rem 2rem;
  max-width: 1500px;
  color: #e2e8f0;
  border-radius: 16px;
  background:
    radial-gradient(900px 500px at 85% 0%, rgba(56, 189, 248, .14), transparent),
    radial-gradient(700px 400px at 0% 100%, rgba(34, 211, 238, .08), transparent),
    linear-gradient(135deg, #1e293b, #0f172a);
  box-shadow: 0 10px 30px rgba(0, 0, 0, .35);
}

.ct-head {
  text-align: center;
  margin-bottom: 2.6rem;
}
.ct-title {
  font-size: 3rem;
  font-weight: 800;
  color: #38bdf8;
  margin-bottom: .6rem;
}
.ct-lead {
  color: #94a3b8;
  font-size: 1.1rem;
  max-width: 560px;
  margin: 0 auto;
}

/* ===== Layout ===== */
.ct-wrap {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 1.6rem;
  max-width: 1050px;
  margin: 0 auto;
  align-items: stretch;
}
@media (max-width: 900px) {
  .ct-wrap { grid-template-columns: 1fr; }
}

/* ===== Profile card ===== */
.ct-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: .5rem;
  padding: 2rem 1.4rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, .05);
  border: 1px solid rgba(255, 255, 255, .1);
  backdrop-filter: blur(8px);
}
.ct-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: .6rem;
  background: linear-gradient(135deg, rgba(56, 189, 248, .35), rgba(34, 211, 238, .15));
  border: 2px solid rgba(56, 189, 248, .4);
  box-shadow: 0 0 0 6px rgba(56, 189, 248, .08);
}
.ct-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.ct-name { font-size: 1.5rem; font-weight: 800; }
.ct-role { color: #94a3b8; margin-bottom: .8rem; }

.ct-cta {
  display: inline-flex;
  align-items: center;
  gap: .6rem;
  padding: .75rem 1.5rem;
  border-radius: 999px;
  font-weight: 700;
  color: #0b1220;
  background: linear-gradient(135deg, #38bdf8, #22d3ee);
  box-shadow: 0 8px 22px rgba(56, 189, 248, .3);
  transition: transform .25s ease, box-shadow .25s ease;
}
.ct-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(56, 189, 248, .45);
}
.ct-cta .ct-svg { width: 18px; height: 18px; }

.ct-socials {
  display: flex;
  gap: .7rem;
  margin-top: 1.2rem;
}
.ct-social {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: #cbd5e1;
  background: rgba(255, 255, 255, .06);
  border: 1px solid rgba(255, 255, 255, .12);
  transition: transform .25s ease, color .25s ease, border-color .25s ease, background .25s ease;
}
.ct-social:hover {
  transform: translateY(-3px);
  color: #38bdf8;
  border-color: rgba(56, 189, 248, .5);
  background: rgba(56, 189, 248, .1);
}
.ct-social .ct-svg { width: 20px; height: 20px; }

/* ===== Channel tiles ===== */
.ct-channels {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

.ct-tile {
  display: flex;
  align-items: center;
  gap: .6rem;
  padding: .4rem .6rem .4rem .4rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, .05);
  border: 1px solid rgba(255, 255, 255, .1);
  /* opacity/translate มาจาก v-reveal */
  transition:
    border-color .25s ease,
    background .25s ease,
    transform .25s ease,
    opacity .7s ease var(--delay, 0ms),
    translate .7s ease var(--delay, 0ms);
}
.ct-tile:hover {
  border-color: rgba(56, 189, 248, .45);
  background: rgba(56, 189, 248, .06);
}

.ct-tile-link {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: .8rem;
  color: inherit;
}
.ct-ico {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  color: #38bdf8;
  background: rgba(56, 189, 248, .12);
}
.ct-ico .ct-svg { width: 24px; height: 24px; }

.ct-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}
.ct-label { font-weight: 800; font-size: 1.05rem; }
.ct-sub {
  color: #94a3b8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ct-go {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: #64748b;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform .25s ease, stroke .25s ease;
}
.ct-tile:hover .ct-go {
  stroke: #38bdf8;
  transform: translate(2px, -2px);
}

.ct-copy {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  cursor: pointer;
  color: #94a3b8;
  background: transparent;
  border: 1px solid rgba(148, 163, 184, .3);
  transition: color .25s ease, border-color .25s ease, background .25s ease;
}
.ct-copy:hover {
  color: #38bdf8;
  border-color: rgba(56, 189, 248, .5);
  background: rgba(56, 189, 248, .08);
}
.ct-copy .ct-svg { width: 18px; height: 18px; }

/* ===== Shared icon style ===== */
.ct-svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ===== Focus (keyboard) ===== */
.ct-cta:focus-visible,
.ct-social:focus-visible,
.ct-tile-link:focus-visible,
.ct-copy:focus-visible {
  outline: 2px solid #38bdf8;
  outline-offset: 3px;
}

/* ===== Toast ===== */
.ct-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #0b1220;
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, .12);
  padding: .6rem 1rem;
  border-radius: 10px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, .35);
}
.ct-toast-enter-from,
.ct-toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}
.ct-toast-enter-active,
.ct-toast-leave-active {
  transition: all .25s ease;
}
</style>
