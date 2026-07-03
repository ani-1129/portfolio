/* ═══════════════════════════════════════════
   ANIKET SINGH — PREMIUM 3D PORTFOLIO
   JavaScript: Three.js, Animations, Interactions
   ═══════════════════════════════════════════ */

// ─── Loader ───
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    startCounters();
    startTyped();
  }, 1200);
});

// ─── Scroll Progress Bar ───
window.addEventListener('scroll', () => {
  const s = document.documentElement;
  const pct = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';

  // Nav scroll effect
  document.getElementById('navbar').classList.toggle('scrolled', s.scrollTop > 50);

  // Back to top
  document.getElementById('back-top').classList.toggle('visible', s.scrollTop > 600);
});

// ─── Hamburger Menu ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// ─── Smooth Scroll for Nav Links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ═══════════════════════════════════════════
// THREE.JS — HERO PARTICLE NETWORK
// ═══════════════════════════════════════════
(function initHeroScene() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particle system
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];
  const spread = 40;

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    velocities.push({
      x: (Math.random() - 0.5) * 0.015,
      y: (Math.random() - 0.5) * 0.015,
      z: (Math.random() - 0.5) * 0.015,
    });
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00B4FF,
    size: 0.12,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // Wireframe globe
  const globeGeo = new THREE.IcosahedronGeometry(8, 2);
  const globeMat = new THREE.MeshBasicMaterial({
    color: 0x00B4FF,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  });
  const globe = new THREE.Mesh(globeGeo, globeMat);
  scene.add(globe);

  // Inner globe
  const innerGeo = new THREE.IcosahedronGeometry(5, 1);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x00F5C4,
    wireframe: true,
    transparent: true,
    opacity: 0.05,
  });
  const innerGlobe = new THREE.Mesh(innerGeo, innerMat);
  scene.add(innerGlobe);

  // Torus ring
  const torusGeo = new THREE.TorusGeometry(12, 0.05, 16, 100);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0xA855F7,
    transparent: true,
    opacity: 0.12,
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.rotation.x = Math.PI / 3;
  scene.add(torus);

  // Connection lines
  const linesMaterial = new THREE.LineBasicMaterial({
    color: 0x00B4FF,
    transparent: true,
    opacity: 0.06,
  });

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);

    // Update particle positions
    const pos = particleGeometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] += velocities[i].x;
      pos[i * 3 + 1] += velocities[i].y;
      pos[i * 3 + 2] += velocities[i].z;

      // Bounce
      const half = spread / 2;
      if (Math.abs(pos[i * 3]) > half) velocities[i].x *= -1;
      if (Math.abs(pos[i * 3 + 1]) > half) velocities[i].y *= -1;
      if (Math.abs(pos[i * 3 + 2]) > half) velocities[i].z *= -1;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    // Rotate objects
    globe.rotation.y += 0.002;
    globe.rotation.x += 0.001;
    innerGlobe.rotation.y -= 0.003;
    innerGlobe.rotation.z += 0.001;
    torus.rotation.z += 0.003;
    particles.rotation.y += 0.0005;

    // Mouse parallax
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 3 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

// ═══════════════════════════════════════════
// TYPED TEXT ANIMATION
// ═══════════════════════════════════════════
function startTyped() {
  const phrases = [
    'data-driven dashboards',
    'modern web experiences',
    'AI-powered pipelines',
    'RAG intelligence systems',
    'production ML deployments',
    'full-stack applications',
  ];
  const el = document.getElementById('typed-text');
  if (!el) return;

  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (!isDeleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      setTimeout(type, 60);
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 30);
    }
  }
  type();
}

// ═══════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════
function startCounters() {
  const animate = (id, target, decimals = 0) => {
    const el = document.getElementById(id);
    if (!el) return;
    let val = 0;
    const step = target / 60;
    const interval = setInterval(() => {
      val += step;
      if (val >= target) {
        el.textContent = target.toFixed(decimals);
        clearInterval(interval);
      } else {
        el.textContent = val.toFixed(decimals);
      }
    }, 20);
  };

  animate('s1', 7);
  animate('s2', 15);
  animate('s3', 4);
  animate('s4', 7.74, 2);
}

// ═══════════════════════════════════════════
// SCROLL REVEAL — INTERSECTION OBSERVER
// ═══════════════════════════════════════════
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
  revealObserver.observe(el);
});

// ─── Skill Bar Animation ───
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach((bar) => {
          bar.style.width = bar.dataset.pct + '%';
        });
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.skill-category').forEach((cat) => {
  skillObserver.observe(cat);
});

// ═══════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════
function handleForm(e) {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  const email = document.getElementById('femail').value;

  if (!/\S+@\S+\.\S+/.test(email)) {
    msg.className = 'form-msg error';
    msg.textContent = 'Please enter a valid email address.';
    return false;
  }

  msg.className = 'form-msg success';
  msg.textContent = '✓ Message sent! I\'ll get back to you soon.';
  ['fname', 'femail', 'fsubject', 'fmessage'].forEach((id) => {
    document.getElementById(id).value = '';
  });

  return false;
}

// ═══════════════════════════════════════════
// STAGGERED REVEAL FOR GRID CHILDREN
// ═══════════════════════════════════════════
const staggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, i) => {
          child.style.opacity = '0';
          child.style.transform = 'translateY(20px)';
          child.style.transition = `opacity 0.5s ${i * 0.1}s, transform 0.5s ${i * 0.1}s`;
          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, 50);
        });
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.skills-grid, .cert-grid, .project-grid').forEach((grid) => {
  staggerObserver.observe(grid);
});
