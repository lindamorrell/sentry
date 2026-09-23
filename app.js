/* =========================================================================
   Skillforge — page runtime.
   Everything here is progressive enhancement: if a block is missing, the
   rest of the page still works. Respects prefers-reduced-motion.
   ========================================================================= */
(() => {
  'use strict';

  const DATA = window.SKILLFORGE_DATA || { totals: {}, categories: [], repos: [] };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const fmt = (n) => new Intl.NumberFormat('en-US').format(n);
  const PALETTE = ['#5eead4', '#38bdf8', '#818cf8', '#a78bfa', '#f0abfc', '#fda4af', '#fdba74', '#facc15'];

  /* ---------------------------------------------------------------- data */
  function hydrateData() {
    const t = DATA.totals || {};
    $$('[data-total-skills]').forEach((el) => (el.textContent = fmt(t.skills_total || 0)));
    $$('[data-generated]').forEach((el) => (el.textContent = DATA.generated || ''));

    // hero + statement counters use data-count attributes already in markup;
    // keep them in sync with real data when ids are present.
    const statRow = $('#statRow');
    if (statRow) {
      const stats = [
        [t.repos || DATA.repos.length, 'repositories'],
        [t.tools_verified || 0, 'clis installed & verified'],
        [t.skills_total || 0, 'skills in the library'],
        [t.categories || (DATA.categories || []).length, 'skill categories'],
      ];
      statRow.innerHTML = stats
        .map(([v, label]) => `<div class="stat" data-reveal><b data-count="${v}">0</b><span>${label}</span></div>`)
        .join('');
    }

    const chart = $('#chart');
    if (chart) {
      const cats = (DATA.categories || []).slice(0, 12);
      const max = Math.max(1, ...cats.map((c) => c.count));
      chart.innerHTML = cats
        .map((c, i) => {
          const pct = (c.count / max) * 100;
          const color = PALETTE[i % PALETTE.length];
          return `<div class="row" data-reveal>
            <span class="row__name mono">${c.name}</span>
            <span class="row__track"><span class="row__fill" data-w="${pct}" style="background:linear-gradient(90deg,${color},${color}88)"></span></span>
            <span class="row__count">${fmt(c.count)}</span>
          </div>`;
        })
        .join('');
    }

    const track = $('#marqueeTrack');
    if (track) {
      const names = (DATA.repos || []).map((r) => r.repo);
      const strip = names.map((n) => `<span>${n}</span>`).join('');
      track.innerHTML = strip + strip; // duplicated for a seamless loop
    }

    const grid = $('#repoGrid');
    if (grid) {
      grid.innerHTML = (DATA.repos || [])
        .map((r) => {
          const installed = r.status === 'installed';
          const chip = installed
            ? '<span class="chip chip--installed">installed</span>'
            : `<span class="chip chip--blocked">${
                r.status === 'failed' ? 'blocked' : r.status === 'present' ? 'already present' : 'no cli'
              }</span>`;
          const skills = r.skill_count ? `${fmt(r.skill_count)} skill${r.skill_count === 1 ? '' : 's'}` : 'no skills shipped';
          const why = !installed && r.blocker ? `<p class="card__why">${r.blocker}</p>` : '';
          return `<article class="card" data-status="${installed ? 'installed' : 'blocked'}" data-reveal>
            <div class="card__top"><h3 class="card__name">${r.repo}</h3>${chip}</div>
            <p class="card__blurb">${r.blurb || ''}</p>
            ${why}
            <div class="card__meta">
              <span class="card__skill">${skills}</span>
              <a class="card__link" href="${r.url}" target="_blank" rel="noopener noreferrer" data-magnetic>github ↗</a>
            </div>
          </article>`;
        })
        .join('');
      const counts = {
        all: DATA.repos.length,
        installed: DATA.repos.filter((r) => r.status === 'installed').length,
        blocked: DATA.repos.filter((r) => r.status !== 'installed').length,
      };
      const cAll = $('#cAll'); if (cAll) cAll.textContent = counts.all;
      const cIn = $('#cInstalled'); if (cIn) cIn.textContent = counts.installed;
      const cBl = $('#cBlocked'); if (cBl) cBl.textContent = counts.blocked;

      const filter = $('#filter');
      if (filter) {
        filter.addEventListener('click', (e) => {
          const btn = e.target.closest('button[data-filter]');
          if (!btn) return;
          $$('button', filter).forEach((b) => b.classList.toggle('is-active', b === btn));
          const want = btn.dataset.filter;
          $$('.card', grid).forEach((card) => {
            const show = want === 'all' || card.dataset.status === want;
            card.classList.toggle('is-hidden', !show);
          });
        });
      }
    }
  }

  /* ------------------------------------------------------------ preloader */
  function preloader() {
    const el = $('#preloader');
    const count = $('#preCount');
    if (!el) { document.body.classList.add('is-ready'); return; }
    const start = performance.now();
    const MIN = reduce ? 0 : 900;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      el.classList.add('is-done');
      document.body.classList.add('is-ready');
      document.body.classList.remove('is-locked');
      setTimeout(() => el.remove(), 900);
    };

    const step = (now) => {
      const p = clamp(((now - start) / MIN) * 100, 0, 100);
      if (count) count.textContent = String(Math.round(p));
      if (p < 100) requestAnimationFrame(step);
      else setTimeout(finish, 120);
    };
    document.body.classList.add('is-locked');
    if (reduce) { if (count) count.textContent = '100'; finish(); return; }
    requestAnimationFrame(step);
    // hard stop so a stalled rAF can never trap the page
    setTimeout(finish, 2600);
  }

  /* --------------------------------------------------------------- cursor */
  function cursor() {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = $('#cursor');
    if (!el) return;
    const dot = $('.cursor__dot', el);
    const ring = $('.cursor__ring', el);
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY;
      el.classList.add('is-on');
      if (dot) dot.style.transform = `translate(${x}px, ${y}px)`;
      const hot = e.target.closest('a, button, [data-magnetic], .card');
      el.classList.toggle('is-hover', !!hot);
    }, { passive: true });
    (function loop() {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    })();

    $$('[data-magnetic]').forEach((node) => {
      node.addEventListener('pointermove', (e) => {
        const r = node.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        node.style.transform = `translate(${dx * 7}px, ${dy * 7}px)`;
      });
      node.addEventListener('pointerleave', () => { node.style.transform = ''; });
    });
  }

  /* ------------------------------------------------------- hero flow field */
  function flowField() {
    const canvas = $('#field');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let w = 0, h = 0, dpr = 1, particles = [], raf = 0;
    const pointer = { x: -999, y: -999, active: false };

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = clamp(Math.round((w * h) / 22000), 60, 220);
      particles = Array.from({ length: target }, () => spawn());
      ctx.clearRect(0, 0, w, h);
      if (reduce) draw(true);
    };

    const spawn = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      life: 40 + Math.random() * 160,
      hue: Math.random() < 0.5 ? '94,234,212' : Math.random() < 0.5 ? '96,165,250' : '167,139,250',
      size: 0.6 + Math.random() * 1.5,
    });

    // deterministic-ish field: pure function of position and time
    const field = (x, y, t) => {
      const s = 0.0016;
      const a = Math.sin(x * s + t * 0.00018) * Math.cos(y * s * 1.3 - t * 0.00012) * Math.PI * 1.6;
      return a;
    };

    let t0 = 0;
    const draw = (once = false) => {
      const now = once ? 0 : performance.now();
      if (!once) {
        ctx.fillStyle = 'rgba(4, 6, 12, 0.085)';
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
      for (const p of particles) {
        const a = field(p.x, p.y, now - t0);
        p.vx += Math.cos(a) * 0.055;
        p.vy += Math.sin(a) * 0.055;
        if (pointer.active) {
          const dx = p.x - pointer.x, dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 26000) {
            const f = (1 - d2 / 26000) * 0.5;
            const d = Math.sqrt(d2) || 1;
            p.vx += (dx / d) * f; p.vy += (dy / d) * f;
          }
        }
        p.vx *= 0.94; p.vy *= 0.94;
        p.x += p.vx; p.y += p.vy;
        p.life -= 1;
        if (p.life <= 0 || p.x < -40 || p.x > w + 40 || p.y < -40 || p.y > h + 40) Object.assign(p, spawn());
        const speed = Math.min(1, Math.hypot(p.vx, p.vy) * 6);
        ctx.strokeStyle = `rgba(${p.hue}, ${0.16 + speed * 0.5})`;
        ctx.lineWidth = p.size;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 5, p.y - p.vy * 5);
        ctx.stroke();
      }
      if (once) return;
      raf = requestAnimationFrame(draw);
    };

    addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true;
    }, { passive: true });
    addEventListener('pointerleave', () => { pointer.active = false; });
    addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); if (!reduce) draw(); });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) { cancelAnimationFrame(raf); draw(); }
    });
    resize();
    if (!reduce) draw();
  }

  /* --------------------------------------------------------------- reveals */
  function reveals() {
    const nodes = $$('[data-reveal], .row');
    if (!nodes.length) return;
    if (reduce) { nodes.forEach((n) => n.classList.add('is-in')); animateBars(nodes); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        node.style.transitionDelay = `${Math.min(i * 60, 320)}ms`;
        node.classList.add('is-in');
        const fill = $('.row__fill', node);
        if (fill && !fill.dataset.done) {
          fill.dataset.done = '1';
          requestAnimationFrame(() => { fill.style.width = `${fill.dataset.w}%`; });
        }
        const counter = $('[data-count]', node);
        if (counter) count(counter);
        if (node.matches('[data-count]')) count(node);
        io.unobserve(node);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    nodes.forEach((n) => io.observe(n));
  }

  function animateBars(nodes) {
    nodes.forEach((node) => {
      const fill = $('.row__fill', node);
      if (fill) fill.style.width = `${fill.dataset.w}%`;
      const counter = $('[data-count]', node) || (node.matches('[data-count]') ? node : null);
      if (counter) counter.textContent = fmt(Number(counter.dataset.count));
    });
  }

  function count(el) {
    const target = Number(el.dataset.count || 0);
    if (reduce) { el.textContent = fmt(target); return; }
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = clamp((now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target);
    };
    requestAnimationFrame(tick);
  }

  /* --------------------------------------------------- manifesto word fade */
  function manifesto() {
    const block = $('[data-words]');
    if (!block) return;
    const p = $('p', block);
    if (!p) return;
    const words = p.textContent.trim().split(/\s+/);
    p.innerHTML = words.map((word, i) => {
      const last = i === words.length - 1;
      return `<span class="w" style="opacity:.14">${word}${last ? '' : ' '}</span>`;
    }).join('');
    const spans = $$('.w', p);
    if (reduce) { spans.forEach((s) => { s.style.opacity = '1'; s.style.color = '#eef2fb'; }); return; }
    const update = () => {
      const r = block.getBoundingClientRect();
      const vh = innerHeight;
      const progress = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35));
      const lit = Math.floor(progress * spans.length * 1.08);
      spans.forEach((s, i) => {
        const on = i < lit;
        s.style.opacity = on ? '1' : '0.14';
        s.style.color = on ? '#eef2fb' : '';
      });
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
  }

  /* ----------------------------------------------------------- film player */
  function player() {
    const video = $('#video');
    const wrap = $('#player');
    const film = $('#film');
    const fill = $('#playerFill');
    const bar = $('#playerBar');
    const time = $('#playerTime');
    const btn = $('#playBtn');
    const mode = $('#playerMode');
    if (!video || !film) return;

    let playing = false;
    let duration = 16;

    const one = (s) => $(s);

    video.addEventListener('loadedmetadata', () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        duration = video.duration;
        $$('[data-video-dur]').forEach((el) => (el.textContent = duration.toFixed(1)));
      }
    });
    video.addEventListener('error', () => {
      if (wrap) wrap.classList.add('is-missing');
      if (mode) mode.textContent = 'video unavailable offline';
    });

    const setUI = (ratio) => {
      if (fill) fill.style.width = `${clamp(ratio) * 100}%`;
      if (bar) bar.setAttribute('aria-valuenow', String(Math.round(clamp(ratio) * 100)));
      if (time) time.innerHTML = `${(ratio * duration).toFixed(1)}s / <span data-video-dur>${duration.toFixed(1)}</span>s`;
    };

    // scroll scrub — the film advances as you read past it
    const scrubOK = () => !reduce && film.offsetHeight > innerHeight * 1.2;
    const onScroll = () => {
      if (playing || !scrubOK()) return;
      const r = film.getBoundingClientRect();
      const travel = Math.max(1, r.height - innerHeight);
      const progress = clamp(-r.top / travel);
      const ratio = clamp(progress);
      if (video.readyState >= 1) {
        try { video.currentTime = ratio * duration; } catch (_) {}
      }
      setUI(ratio);
    };
    if (!reduce) { addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll(); }

    const icon = (isPlaying) =>
      isPlaying
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

    if (btn) {
      btn.addEventListener('click', async () => {
        if (playing) {
          video.pause(); playing = false;
        } else {
          try { await video.play(); playing = true; } catch (_) { playing = false; }
        }
        btn.innerHTML = icon(playing);
        btn.setAttribute('aria-label', playing ? 'Pause the film' : 'Play the film');
        if (mode) mode.textContent = playing ? 'playing' : 'scroll to scrub';
      });
    }
    video.addEventListener('timeupdate', () => { if (playing) setUI(video.currentTime / duration); });
    video.addEventListener('ended', () => {
      playing = false;
      if (btn) btn.innerHTML = icon(false);
      if (mode) mode.textContent = 'scroll to scrub';
    });

    if (bar) {
      const seek = (e) => {
        const r = bar.getBoundingClientRect();
        const ratio = clamp((e.clientX - r.left) / r.width);
        try { video.currentTime = ratio * duration; } catch (_) {}
        setUI(ratio);
      };
      bar.addEventListener('pointerdown', (e) => { bar.setPointerCapture?.(e.pointerId); seek(e); });
      bar.addEventListener('pointermove', (e) => { if (e.buttons === 1) seek(e); });
      bar.addEventListener('keydown', (e) => {
        const step = 1 / Math.max(1, duration);
        if (e.key === 'ArrowRight') { video.currentTime = Math.min(duration, video.currentTime + 1); setUI(video.currentTime / duration); }
        if (e.key === 'ArrowLeft') { video.currentTime = Math.max(0, video.currentTime - 1); setUI(video.currentTime / duration); }
      });
    }
    if (video.readyState >= 1) {
      if (Number.isFinite(video.duration) && video.duration > 0) duration = video.duration;
      setUI(0);
    }
    one('#video')?.setAttribute('aria-label', 'Skillforge — a 16 second film rendered from HTML');
  }

  /* -------------------------------------------------------------- progress */
  function scrollProgress() {
    const bar = $('#progress span');
    if (!bar) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? clamp(scrollY / max) : 0;
      bar.style.width = `${p * 100}%`;
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
  }

  /* ----------------------------------------------------------------- boot */
  function boot() {
    hydrateData();
    preloader();
    cursor();
    flowField();
    reveals();
    manifesto();
    player();
    scrollProgress();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
