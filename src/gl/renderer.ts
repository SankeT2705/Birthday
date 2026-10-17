/**
 * renderer.ts — Three.js WebGL Stylized Sea, Starfield, and Moon.
 * Implements Blueprint Prompt 3:
 * - Dynamic GLSL ocean wave shader with layered noise, Fresnel reflection, and sun reflection path
 * - Real-time touch/pointer ripples array (up to 8 points with age fade)
 * - Twinkling starfield that fades out at dawn
 * - Luminous crescent moon with soft atmospheric halo
 * - Camera parallax driven by device tilt (gyroscope / pointer)
 * - Time-of-day progression driven by scroll progress (night -> dawn -> sunrise)
 */

import * as THREE from 'three';
import { onTilt } from '../core/tilt';

export interface SeaRenderer {
  setProgress(progress: number): void;
  addRipple(x: number, y: number): void;
  destroy(): void;
}

export function initSeaRenderer(container: HTMLElement): SeaRenderer | null {
  try {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    renderer.domElement.id = 'webgl-sea-canvas';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '1';
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 2000);
    camera.position.set(0, 15, 60);
    camera.lookAt(0, 0, 0);

    // ── 1. Twinkling Starfield ─────────────────────────────
    const starCount = 350;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3]     = (Math.random() - 0.5) * 600;
      starPositions[i * 3 + 1] = 20 + Math.random() * 250;
      starPositions[i * 3 + 2] = -400 + (Math.random() - 0.5) * 200;
      starSizes[i] = 1.2 + Math.random() * 2.4;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        varying float vAlpha;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * (0.8 + 0.3 * sin(uTime * 2.5 + position.x * 0.1));
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = 0.8 + 0.2 * sin(uTime * 3.0 + position.y);
        }
      `,
      fragmentShader: `
        uniform float uProgress;
        varying float vAlpha;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float fade = smoothstep(0.5, 0.05, dist);
          // Stars fade out at dawn (progress 0.35 to 0.65)
          float dawnFade = 1.0 - smoothstep(0.3, 0.65, uProgress);
          vec3 starColor = mix(vec3(0.9, 0.95, 1.0), vec3(0.96, 0.81, 0.48), 0.3);
          gl_FragColor = vec4(starColor, fade * vAlpha * dawnFade * 0.85);
        }
      `,
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // ── 2. Luminous Moon & Halo ────────────────────────────
    const moonGroup = new THREE.Group();
    moonGroup.position.set(70, 75, -280);

    // Moon disk
    const moonGeo = new THREE.CircleGeometry(14, 32);
    const moonMat = new THREE.MeshBasicMaterial({
      color: 0xfff9e6,
      transparent: true,
      opacity: 0.92,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonGroup.add(moonMesh);

    // Moon atmosphere halo
    const haloGeo = new THREE.CircleGeometry(38, 32);
    const haloMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uProgress: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uProgress;
        varying vec2 vUv;
        void main() {
          float dist = length(vUv - vec2(0.5));
          float halo = smoothstep(0.5, 0.12, dist);
          float dawnFade = 1.0 - smoothstep(0.35, 0.7, uProgress);
          gl_FragColor = vec4(0.96, 0.81, 0.48, halo * 0.28 * dawnFade);
        }
      `,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.z = -0.5;
    moonGroup.add(haloMesh);
    scene.add(moonGroup);

    // ── 3. Stylized Sea Plane with Waves & Ripples ─────────
    const seaGeometry = new THREE.PlaneGeometry(360, 240, 120, 90);
    seaGeometry.rotateX(-Math.PI / 2);
    seaGeometry.translate(0, -6, 20);

    const MAX_RIPPLES = 8;
    const rippleData = new Float32Array(MAX_RIPPLES * 4); // [x, z, age, maxAge]

    const seaMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: true,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uRipples: { value: rippleData },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uProgress;
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying vec2 vUv;

        // Simple wave elevation
        float getWave(vec2 p) {
          float w1 = sin(p.x * 0.08 + uTime * 1.8) * 1.2;
          float w2 = cos(p.y * 0.06 + uTime * 1.4) * 0.9;
          float w3 = sin((p.x + p.y) * 0.05 + uTime * 2.2) * 0.6;
          return w1 + w2 + w3;
        }

        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.y += getWave(pos.xz);

          // Calculate normal approximation
          float delta = 0.4;
          float hL = getWave(pos.xz - vec2(delta, 0.0));
          float hR = getWave(pos.xz + vec2(delta, 0.0));
          float hD = getWave(pos.xz - vec2(0.0, delta));
          float hU = getWave(pos.xz + vec2(0.0, delta));
          vNormal = normalize(vec3(hL - hR, 2.0 * delta, hD - hU));

          vec4 worldPos = modelMatrix * vec4(pos, 1.0);
          vWorldPos = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        uniform vec4 uRipples[${MAX_RIPPLES}];
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying vec2 vUv;

        void main() {
          vec3 viewDir = normalize(cameraPosition - vWorldPos);
          float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

          // ── Color palette transitions ──
          // Deep night colors
          vec3 nightDeep  = vec3(0.027, 0.043, 0.102); // #070B1A
          vec3 nightWater = vec3(0.058, 0.105, 0.239); // #0F1B3D
          vec3 nightHigh  = vec3(0.184, 0.498, 0.525); // #2F7F86

          // Sunrise colors
          vec3 dawnSky    = vec3(0.168, 0.298, 0.494); // #2B4C7E
          vec3 sunGold    = vec3(0.964, 0.811, 0.478); // #F6CF7A
          vec3 sunCoral   = vec3(0.949, 0.525, 0.419); // #F2866B

          // Interpolate water base color from night to sunrise
          vec3 deepColor = mix(nightDeep, mix(dawnSky, sunCoral, 0.5), smoothstep(0.2, 0.8, uProgress));
          vec3 surfaceColor = mix(nightWater, sunGold, smoothstep(0.4, 0.9, uProgress));

          // Base water shading
          vec3 color = mix(deepColor, surfaceColor, fresnel * 0.7);

          // Golden sun reflection path on the water as sunrise approaches
          if (uProgress > 0.4) {
            float sunPathFactor = smoothstep(0.4, 0.85, uProgress);
            float distFromCenter = abs(vWorldPos.x);
            float pathWidth = 24.0 + (1.0 - vUv.y) * 45.0;
            float path = smoothstep(pathWidth, 0.0, distFromCenter);
            float glitter = sin(vWorldPos.x * 2.2 + uTime * 4.0) * cos(vWorldPos.z * 1.8 + uTime * 3.5);
            glitter = smoothstep(0.2, 0.8, glitter);
            color += sunGold * path * glitter * sunPathFactor * 0.65;
          }

          // Gentle foam crest highlights
          float foam = smoothstep(1.8, 2.6, vWorldPos.y);
          color += vec3(0.95, 0.92, 0.85) * foam * 0.25;

          // Touch ripples on water
          for (int i = 0; i < ${MAX_RIPPLES}; i++) {
            vec4 rip = uRipples[i];
            float age = rip.z;
            float maxAge = rip.w;
            if (maxAge > 0.0 && age < maxAge) {
              float d = distance(vWorldPos.xz, rip.xy);
              float ripRadius = (age / maxAge) * 45.0;
              float ring = abs(d - ripRadius);
              float intensity = smoothstep(2.5, 0.0, ring) * (1.0 - age / maxAge);
              color += sunGold * intensity * 0.45;
            }
          }

          // Smooth distance fog into horizon
          float distFog = smoothstep(40.0, 180.0, length(vWorldPos.xz));
          vec3 skyFogColor = mix(nightDeep, sunCoral, smoothstep(0.3, 0.8, uProgress));
          color = mix(color, skyFogColor, distFog * 0.85);

          gl_FragColor = vec4(color, 0.88);
        }
      `,
    });

    const seaMesh = new THREE.Mesh(seaGeometry, seaMaterial);
    scene.add(seaMesh);

    // ── 4. Parallax Camera & Animation Loop ─────────────────
    let currentTiltX = 0;
    let currentTiltY = 0;
    let clock = new THREE.Clock();
    let animId = 0;
    let activeRipples: { x: number; z: number; age: number; maxAge: number }[] = [];

    // Subscribe to device tilt
    const unsubTilt = onTilt(({ x, y }) => {
      currentTiltX = x;
      currentTiltY = y;
    });

    function animate() {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Update uniforms
      starMaterial.uniforms.uTime.value = elapsed;
      seaMaterial.uniforms.uTime.value = elapsed;

      // Update ripple ages
      for (let i = activeRipples.length - 1; i >= 0; i--) {
        activeRipples[i].age += delta;
        if (activeRipples[i].age >= activeRipples[i].maxAge) {
          activeRipples.splice(i, 1);
        }
      }

      // Pack ripples into uniform array
      rippleData.fill(0);
      for (let i = 0; i < Math.min(activeRipples.length, MAX_RIPPLES); i++) {
        const r = activeRipples[i];
        rippleData[i * 4]     = r.x;
        rippleData[i * 4 + 1] = r.z;
        rippleData[i * 4 + 2] = r.age;
        rippleData[i * 4 + 3] = r.maxAge;
      }

      // Parallax camera sway
      const targetCamX = currentTiltX * 8;
      const targetCamY = 15 + currentTiltY * 5;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Parallax moon sway
      moonGroup.position.x = 70 + currentTiltX * 12;
      moonGroup.position.y = 75 + currentTiltY * 8;

      renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return {
      setProgress(p: number) {
        starMaterial.uniforms.uProgress.value = p;
        haloMat.uniforms.uProgress.value = p;
        seaMaterial.uniforms.uProgress.value = p;

        // Moon sinks gently as sunrise arrives
        moonMesh.material.opacity = Math.max(0, 0.92 * (1 - p * 1.3));
      },

      addRipple(screenX: number, screenY: number) {
        // Map screen coordinates roughly to sea plane coordinates
        const normX = (screenX / window.innerWidth - 0.5) * 120;
        const normZ = (screenY / window.innerHeight) * 60;
        activeRipples.push({
          x: normX,
          z: normZ,
          age: 0,
          maxAge: 3.5,
        });
        if (activeRipples.length > MAX_RIPPLES) {
          activeRipples.shift();
        }
      },

      destroy() {
        cancelAnimationFrame(animId);
        unsubTilt();
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        renderer.domElement.remove();
      },
    };
  } catch (err) {
    console.warn('[Her Shore WebGL] Three.js renderer initialization skipped (falling back to CSS backdrop):', err);
    return null;
  }
}
