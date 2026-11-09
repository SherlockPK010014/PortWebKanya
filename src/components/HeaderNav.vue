<template>
  <header ref="header" class="logohead">
    <a href="#home" class="logo" @click="close">Prang Kanyasiri</a>

    <!-- แสดงเฉพาะจอ ≤768px -->
    <button
      ref="toggle"
      class="menu-toggle"
      type="button"
      aria-controls="site-nav"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-label="open ? 'Close menu' : 'Open menu'"
      @click="open = !open"
    >
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

    <nav id="site-nav" class="navbar" :class="{ open }" aria-label="Main">
      <a v-for="l in links" :key="l.href" :href="l.href" @click="close">{{ l.label }}</a>
    </nav>
  </header>
</template>

<script>
const DESKTOP = '(min-width: 769px)'

export default {
  name: 'Header',
  data() {
    return {
      open: false,
      links: [
        { href: '#home', label: 'Home' },
        { href: '#about-me', label: 'About Me' },
        { href: '#achievements', label: 'Achievements' },
        { href: '#skills', label: 'skills' },
        { href: '#contact', label: 'contact' },
      ],
    }
  },
  watch: {
    // ดักคลิกนอกเมนู / ปุ่ม Esc เฉพาะตอนเมนูเปิดอยู่
    open(isOpen) {
      const method = isOpen ? 'addEventListener' : 'removeEventListener'
      document[method]('pointerdown', this.onPointerDown)
      document[method]('keydown', this.onKeydown)
    },
  },
  mounted() {
    // ขยายจอกลับเป็นเดสก์ท็อป -> ปิดเมนู
    this.mq = window.matchMedia(DESKTOP)
    this.mq.addEventListener('change', this.onBreakpoint)

    // เก็บความสูงจริงของ header ไว้ใน --header-h (ใช้กับ scroll-margin-top ของ section)
    this.ro = new ResizeObserver(this.syncHeight)
    this.ro.observe(this.$refs.header)
  },
  beforeUnmount() {
    this.open = false
    document.removeEventListener('pointerdown', this.onPointerDown)
    document.removeEventListener('keydown', this.onKeydown)
    this.mq?.removeEventListener('change', this.onBreakpoint)
    this.ro?.disconnect()
  },
  methods: {
    close() {
      this.open = false
    },
    onPointerDown(e) {
      if (!this.$refs.header.contains(e.target)) this.close()
    },
    onKeydown(e) {
      if (e.key !== 'Escape') return
      this.close()
      this.$refs.toggle.focus()
    },
    onBreakpoint(e) {
      if (e.matches) this.close()
    },
    syncHeight() {
      document.documentElement.style.setProperty('--header-h', `${this.$refs.header.offsetHeight}px`)
    },
  },
}
</script>

<style scoped>
.logohead {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #142d4c;
  padding: 1rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.logo {
  font-size: 3rem;
  font-weight: 700;
  color: rgb(253, 247, 244);
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

.navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: .5rem 0;
}

.navbar a {
  margin-left: 3rem;
  color: #e2e8f0;
  position: relative;
  padding: 0.25rem 0;
  transition: color 0.3s ease;
  font-size: 2rem;
  font-weight: 500;
}
.navbar a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0%;
  height: 2px;
  background-color: #38bdf8;
  transition: width 0.3s ease;
}

.navbar a:hover {
  color: #38bdf8;
}
.navbar a:hover::after {
  width: 100%;
}
.navbar a:focus-visible {
  outline: 2px solid #38bdf8;
  outline-offset: 4px;
}

/* ปุ่ม hamburger: ซ่อนบนเดสก์ท็อป */
.menu-toggle {
  display: none;
}

/* ===== มือถือ / แท็บเล็ต ===== */
@media (max-width: 768px) {
  .menu-toggle {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 44px;
    height: 44px;
    padding: 10px;
    background: transparent;
    border-radius: 10px;
    cursor: pointer;
  }
  .menu-toggle:focus-visible {
    outline: 2px solid #38bdf8;
    outline-offset: 2px;
  }

  .bar {
    display: block;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background: #e2e8f0;
    transition: transform .25s ease, opacity .2s ease;
  }
  /* ขีด 3 เส้น -> กากบาท (ระยะระหว่างเส้น = gap 5px + สูง 2px = 7px) */
  .menu-toggle[aria-expanded="true"] .bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .menu-toggle[aria-expanded="true"] .bar:nth-child(2) { opacity: 0; }
  .menu-toggle[aria-expanded="true"] .bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* เมนูแบบ dropdown ใต้ header — ตอนปิดใช้ visibility:hidden เพื่อไม่ให้ลิงก์ถูก Tab ไปถึง */
  .navbar {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    padding: .4rem 5% 1.2rem;
    background: #142d4c;
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.35);
    visibility: hidden;
    opacity: 0;
    translate: 0 -8px;
    transition: opacity .2s ease, translate .2s ease, visibility 0s linear .2s;
  }
  .navbar.open {
    visibility: visible;
    opacity: 1;
    translate: none;
    transition: opacity .2s ease, translate .2s ease, visibility 0s;
  }

  .navbar a {
    margin: 0;
    padding: 1.2rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  .navbar a:first-child {
    border-top: 0;
  }
  .navbar a::after {
    display: none;
  }
  .navbar a:focus-visible {
    outline-offset: -2px;
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 2.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .navbar,
  .bar {
    transition: none;
  }
}
</style>
