// Small enhancements: menu toggle, current year, smooth scroll, and subtle particles background
document.addEventListener('DOMContentLoaded', function(){
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if(btn){
    btn.addEventListener('click', ()=>{ nav.classList.toggle('visible'); btn.classList.toggle('open'); });
  }
  // insert current year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;
  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href && href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });
  // initialize canvas particles
  // respect user's reduced motion preference
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce) initParticles('bg-canvas');
});

// Particle background: subtle glowing particles
function initParticles(canvasId){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  const baseColors = [ [98,166,255], [120,180,255], [100,160,255] ];
  const particles = [];
  const opts = {count: Math.max(30, Math.round((w*h)/90000)), maxR: 3.2};

  function rand(min,max){return Math.random()*(max-min)+min}

  function create(){
    for(let i=0;i<opts.count;i++){
      const c = baseColors[Math.floor(Math.random()*baseColors.length)];
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: rand(0.6, opts.maxR),
        vx: rand(-0.2,0.2),
        vy: rand(-0.2,0.2),
        color: c
      });
    }
  }

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles.length = 0;
    opts.count = Math.max(30, Math.round((w*h)/90000));
    create();
  }

  function render(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.x < -20) p.x = w + 20; if(p.x > w + 20) p.x = -20;
      if(p.y < -20) p.y = h + 20; if(p.y > h + 20) p.y = -20;

      // draw radial gradient
      const [rC,gC,bC] = p.color;
      const grad = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
      grad.addColorStop(0, `rgba(${rC},${gC},${bC},0.9)`);
      grad.addColorStop(0.4, `rgba(${rC},${gC},${bC},0.25)`);
      grad.addColorStop(1, `rgba(${rC},${gC},${bC},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r*8, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(render);
  }

  create();
  render();
  window.addEventListener('resize', resize);
}

// Modal logic for project details
document.addEventListener('click', function(e){
  const target = e.target;
  // open modal
  if(target.matches('[data-project]')){
    e.preventDefault();
    const id = target.getAttribute('data-project');
    const modal = document.getElementById('modal');
    if(modal){
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden','false');
      // focus for accessibility
      const close = modal.querySelector('.modal-close');
      if(close) close.focus();
    }
  }
  // close when clicking overlay or close button
  if(target.matches('.modal-close') || target.matches('.modal')){
    const modal = document.getElementById('modal');
    if(modal){
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden','true');
    }
  }
});

// close modal on ESC
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    const modal = document.getElementById('modal');
    if(modal && !modal.classList.contains('hidden')){
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden','true');
    }
  }
});

// Contact form submit handler (supports Formspree)
document.addEventListener('DOMContentLoaded', function(){
  const form = document.querySelector('.contact-form');
  if(!form) return;
  const endpoint = form.getAttribute('data-endpoint') || '';
  const msgEl = form.querySelector('.form-message');

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    if(!endpoint || endpoint.includes('your-id')){
      // endpoint not configured: instruct user to set Formspree endpoint
      if(msgEl) msgEl.textContent = 'Form endpoint not configured. Replace data-endpoint on the form with your Formspree URL or click Email me.';
      return;
    }
    const fd = new FormData(form);
    try{
      const res = await fetch(endpoint, {method:'POST', body:fd, headers:{'Accept':'application/json'}});
      if(res.ok){
        if(msgEl) msgEl.textContent = 'Thanks — I received your message and will reply shortly.';
        form.reset();
      } else {
        const data = await res.json().catch(()=>({}));
        if(msgEl) msgEl.textContent = data.error || 'Submission failed — please try again or email me directly.';
      }
    }catch(err){
      if(msgEl) msgEl.textContent = 'Network error — please try again or email me directly.';
    }
  });
});
