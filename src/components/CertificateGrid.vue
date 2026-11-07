
<template>
  <section class="cert-section starfield" id="achievements">
    <h1 class="cert-title " v-reveal>Achievements</h1>

   
    <div class="filters" v-reveal>
      <button
        v-for="g in [{ key: 'All', label: 'All' }, ...allGroups]"
        :key="g.key"
        class="chip"
        :class="{ active: activeCategory === g.key }"
        @click="activeCategory = g.key"
      >
        {{ g.label }}
      </button>
    </div>

    <div v-for="g in groups" :key="g.key" class="group">
      <h2 class="group-title" v-reveal>{{ g.label }}</h2>

    <div class="grid">
      <article v-for="(c, i) in g.items" :key="c.title" class="card" @click="open(c)" v-reveal
    :style="{ '--delay': (i * 80) + 'ms' }">
        <div class="thumb">

          <img :src="c.images?.[0] ?? c.image" :alt="c.title" loading="lazy" />
          <span v-if="c.verified" class="ribbon">Verified</span>
          <span v-if="c.images?.length" class="multi-badge">{{ c.images.length }} images</span>
        </div>

        <div class="meta">
          <h3 class="ctitle">{{ c.title }}</h3>
          <p class="issuer">{{ c.issuer }}</p>


          <div class="cert-tags">
            <span class="cert-tag" v-for="t in c.tags" :key="t">{{ t }}</span>
          </div>

          <p class="date" v-if="c.period || c.date">{{ c.period ?? formatDate(c.date) }}</p>
        </div>
      </article>
    </div>
    </div>


    <!-- ย้ายไปไว้ที่ body เพื่อไม่ถูกกักอยู่ใน stacking context ของ section (starfield) -->
    <Teleport to="body">
    <div v-if="active" class="lightbox" @click.self="close" v-reveal>
      <div class="lightbox-inner" v-reveal style="--delay:120ms">

        <div class="viewer" v-reveal style="--delay:160ms">
          <button v-if="active.images?.length" class="nav prev" @click.stop="prev"
            aria-label="Previous image">&#10094;</button>


          <img :src="active.images?.length ? active.images[activeIndex] : active.image" :alt="active.title" />

          <button v-if="active.images?.length" class="nav next" @click.stop="next"
            aria-label="Next image">&#10095;</button>


          <div v-if="active.images?.length" class="thumbs">
            <button v-for="(img, idx) in active.images" :key="idx" class="thumb-btn"
              :class="{ active: idx === activeIndex }" @click.stop="activeIndex = idx">
              <img :src="img" :alt="`thumb-${idx}`" />
            </button>
          </div>
        </div>

        <div class="lb-info" v-reveal style="--delay:200ms">
          <h3>{{ active.title }}</h3>
          <p class="issuer">{{ [active.issuer, active.period ?? (active.date ? formatDate(active.date) : '')].filter(Boolean).join(' • ') }}</p>
          <p class="desc" v-if="active.desc">{{ active.desc }}</p>
        </div>
      <button class="btn ghost close-btn" @click="close">Close</button>
      </div>

    </div>
    </Teleport>
  </section>
</template>


<script>
import items from '@/data/achievements'

// ค่าเวลาสำหรับเรียงลำดับ: ใช้ date ถ้ามี, ไม่งั้นใช้ปีใน period (นับเป็นปลายปี)
function sortTime(item) {
  if (item.date) {
    const t = new Date(item.date).getTime()
    if (!Number.isNaN(t)) return t
  }
  if (item.period) {
    const t = new Date(`${item.period}-12-31`).getTime()
    if (!Number.isNaN(t)) return t
  }
  return -Infinity
}

// ลำดับการแสดงผลของแต่ละหมวด
const CATEGORY_ORDER = ['leadership', 'project', 'experience', 'certificate']
const CATEGORY_LABELS = {
  leadership: 'Leadership & Activities',
  project: 'Projects',
  experience: 'Experience',
  certificate: 'Certificates & Awards',
}

export default {
  directives: {
  reveal: {
    mounted(el) {

      el.classList.add('reveal');
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in-view'); 
            } else {
              e.target.classList.remove('in-view'); 
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
      );

      el.__io = io;
      io.observe(el);
    },
    unmounted(el) {
      if (el.__io) {
        el.__io.disconnect();
        delete el.__io;
      }
    }
  }
},

  name: 'CertificateGrid',
  data() {
    
    return {
      activeCategory: 'All',
      active: null,
      activeIndex: 0, 
      items,
    }
  },
  computed: {
    // ซ่อนการ์ดที่ยังไม่มีรูป
    visibleItems() {
      return this.items.filter(i => i.images?.length || (typeof i.image === 'string' && i.image))
    },
    // หมวดที่มีการ์ดอย่างน้อย 1 ใบ เรียงตาม CATEGORY_ORDER
    allGroups() {
      return CATEGORY_ORDER
        .map(key => ({
          key,
          label: CATEGORY_LABELS[key],
          // เรียงจากใหม่ไปเก่า (ไม่มีวันที่ไว้ท้ายสุด)
          items: this.visibleItems
            .filter(i => i.category === key)
            .sort((a, b) => sortTime(b) - sortTime(a)),
        }))
        .filter(g => g.items.length)
    },
    groups() {
      return this.activeCategory === 'All'
        ? this.allGroups
        : this.allGroups.filter(g => g.key === this.activeCategory)
    },
  },
  methods: {

    coverOf(item) {
      return item.images?.[0] ?? item.image
    },
    open(item) {
      this.active = item
      this.activeIndex = 0
      // ดักคีย์บอร์ดลูกศร
      window.addEventListener('keydown', this.onKey)
    },
    close() {
      this.active = null
      window.removeEventListener('keydown', this.onKey)
    },
    onKey(e) {
      if (!this.active) return
      if (e.key === 'Escape') this.close()
      if (e.key === 'ArrowRight') this.next()
      if (e.key === 'ArrowLeft') this.prev()
    },
    currentImage() {

      if (!this.active) return ''
      if (this.active.images?.length) return this.active.images[this.activeIndex]
      return this.active.image
    },
    next() {
      if (!this.active?.images?.length) return
      this.activeIndex = (this.activeIndex + 1) % this.active.images.length
    },
    prev() {
      if (!this.active?.images?.length) return
      this.activeIndex =
        (this.activeIndex - 1 + this.active.images.length) % this.active.images.length
    },
    go(i) {
      if (!this.active?.images?.length) return
      this.activeIndex = i
    },
    formatDate(iso) {
      try {
        const d = new Date(iso)
        return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
      } catch { return iso }
    }
  }
}
</script>

<style scoped>

.viewer {
  position: relative;
  background: #0b1220;
  display: flex;
  flex-direction: column;
  gap: .6rem;
  padding: .6rem;
}

.viewer img {
  width: 100%;
  height: 100%;
  max-height: 65vh;
  object-fit: contain;
  background: #0b1220;
  border-radius: 8px;
}


.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, .45);
  color: #fff;
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
  transition: background .2s ease, transform .15s ease;
}

.nav:hover {
  background: rgba(0, 0, 0, .65);
  transform: translateY(-50%) scale(1.05);
}

.nav.prev {
  left: 20px;
}

.nav.next {
  right: 20px;
}


.thumbs {
  display: flex;
  gap: .5rem;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: .2rem;
}

.thumb-btn {
  width: 64px;
  height: 48px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border-radius: 6px;
  overflow: hidden;
  opacity: .7;
  transition: opacity .2s ease, transform .15s ease, box-shadow .2s ease;
}

.thumb-btn:hover {
  opacity: 1;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, .25);
}

.thumb-btn.active {
  opacity: 1;
  outline: 2px solid #38bdf8;
  outline-offset: 2px;
}

.thumb-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.multi-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, .55);
  color: #fff;
  font-size: .8rem;
  font-weight: 700;
  padding: .25rem .5rem;
  border-radius: 8px;
}

.cert-section {
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: #fff;
  border-radius: 16px;
  max-width: 1500px;
  margin: 2rem auto;
  margin-top: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .35);
}

.cert-title {
  font-weight: 700;
  font-size: 3.5rem;
  margin-bottom: 1.25rem;
  color: #38bdf8;
  letter-spacing: .5px;
}


.filters {
  display: flex;
  gap: .6rem;
  flex-wrap: wrap;
  margin: .5rem 0 1.5rem;
}

.chip {
  background: rgba(255, 255, 255, .06);
  border: 1px solid rgba(255, 255, 255, .12);
  color: #e2e8f0;
  padding: .55rem 1rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all .25s ease;
  font-size: 1rem;
  font-weight: 600;
}

.chip:hover {
  background: rgba(56, 189, 248, .18);
}

.chip.active {
  background: rgba(56, 189, 248, .24);
  border-color: rgba(56, 189, 248, .5);
  color: #e6f6ff;
}

.group {
  margin-top: 2.5rem;
}

.group-title {
  text-align: left;
  font-size: 2.2rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 1.2rem;
  padding-left: .8rem;
  border-left: 4px solid #38bdf8;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.8rem;
}

.card {
  background: rgba(255, 255, 255, .05);
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}

.thumb {
  position: relative;
  aspect-ratio: 4 / 3;
  background: #0b1220;
  overflow: hidden;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #fff;
}



.thumb {
  position: relative;
  aspect-ratio: 4/3;
  background: #0b1220;
  overflow: hidden;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ribbon {
  position: absolute;
  top: 10px;
  left: -12px;
  background: #22c55e;
  color: #052e16;
  font-weight: 700;
  font-size: .8rem;
  padding: .3rem .8rem;
  transform: rotate(-12deg);
  border-radius: 4px;
}

.meta {
  padding: 1rem 1.1rem 1.2rem;
}

.ctitle {
  font-size: 1.5rem;
  margin: 0 0 .35rem;
  color: #e2e8f0;
  font-weight: 700;
}

.issuer {
  margin: 0 0 .6rem;
  color: #b6c2d3;
  font-size: 1.1rem;
  font-weight: 600;
}

.date {
  font-size: 1rem;
  color: #94a3b8;
}

.cert-tags {
  display: flex;
  gap: .8rem;
  flex-wrap: wrap;
  margin: .4rem 0 1rem;
}

.cert-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1e293b;
  background: #38bdf8;
  padding: .45rem 1rem;
  border-radius: 999px;
  transition: transform .2s ease, box-shadow .2s ease;
}

.cert-tag:hover {
  transform: scale(1.06);
  box-shadow: 0 4px 12px rgba(56, 189, 248, .35);
}


.lightbox {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0,0,0,.65);
  display: grid;
  place-items: center;
  padding: 1rem;
  animation: fadeIn .25s ease;
}


@keyframes fadeIn {
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

.lightbox-inner{
  position: relative;   
  display: grid;
  grid-template-columns: minmax(320px, 60vw) minmax(280px, 420px);
  gap: 1.2rem;
  background: #0b1220;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 16px;
  overflow: hidden;
  max-height: 85vh;
  box-shadow: 0 24px 60px rgba(0,0,0,.45);
}

.close-btn{
  position: absolute;
  right: 14px;
  bottom: 14px;
  z-index: 10;
  background: #38bdf8;
  color: #031926;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  transition: filter .2s ease, transform .15s ease;
}
.close-btn:hover{ filter:brightness(1.06); transform:translateY(-2px); }


.lightbox-inner img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #0b1220;
}

.lb-info {
  position: relative;
  padding: 2rem 1.5rem 3rem;
  margin-top: 50px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  gap: .75rem;
}




.lb-info h3 {
  margin: .25rem 0;
  color: #e2e8f0;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: .2px;
}

.lb-info .issuer {
  color: #a5b4fc;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  opacity: .98;
}

.lb-info .desc {
  margin: .5rem 0 0;
  color: #cbd5e1;
  font-size: 1.15rem;
  line-height: 1.7;
}

.actions {
  display: flex;
  gap: .7rem;
  margin-top: auto;
}

.btn {
  background: #38bdf8;
  color: #031926;
  border: none;
  padding: .7rem 1.1rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 800;
  font-size: 1.5rem;
  transition: filter .2s ease, transform .15s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  filter: brightness(1.06);
  transform: translateY(-1px);
}

.btn.outline {
  background: transparent;
  color: #93c5fd;
  border: 1px solid rgba(147, 197, 253, .55);
}

.btn.ghost {
  background: transparent;
  color: #cbd5e1;
  border: 1px solid rgba(148, 163, 184, .3);
}

@media (max-width: 900px) {
  .lightbox-inner {
    grid-template-columns: 1fr;
  }

  .lb-info h3 {
    font-size: 1.8rem;
  }

  .lb-info .issuer {
    font-size: 1.15rem;
  }

  .lb-info .desc {
    font-size: 1.05rem;
  }
}
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity .7s ease,
    transform .7s ease;
  transition-delay: var(--delay, 0ms); 
  will-change: opacity, transform;
}
.reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}

.card{ will-change: transform, box-shadow; }


.card:hover{
  animation: card-pop 260ms cubic-bezier(.22,1,.36,1) both;
  box-shadow: 0 18px 36px rgba(0,0,0,.40);
  border-color: rgba(56,189,248,.45);
}


.card:active{
  transform: translateY(-2px) scale(.995);
}


@keyframes card-pop{
  0%   { transform: translateY(0) scale(1); }
  60%  { transform: translateY(-6px) scale(1.018); }
  100% { transform: translateY(-4px) scale(1.012); }
}

.card .thumb img{
  transition: transform .25s ease;
}
.card:hover .thumb img{
  transform: scale(1.02);
}

.card:focus-visible{
  outline: 2px solid #38bdf8;
  outline-offset: 2px;
  animation: card-pop 260ms cubic-bezier(.22,1,.36,1) both;
  
}

.thumb video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
}

</style>
