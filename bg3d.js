/* Arjuna: 3D subject background + small UI polish. Needs three.js (loaded from CDN in index.html). */
(function () {
    var KEY = 'arjunaBg';
    function get() { try { return localStorage.getItem(KEY) || 'all'; } catch (e) { return 'all'; } }
    function put(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

    /* ---- headings: static ALL-CAPS labels to sentence case ---- */
    var KEEP = /\b(JEE|NTA|DPP|AIR|PYQs?|XP|HUD|AI|JSON|PDF|NCERT|IIT|NIT|LDN|MCQ|CSV|ID)\b/gi;
    function sentence(s) {
        return s.toLowerCase().replace(/^\s*[a-z]/, function (c) { return c.toUpperCase(); })
                .replace(KEEP, function (m) { return m.toUpperCase(); });
    }
    function polish() {
        document.querySelectorAll('.card-header-sm,.brand-title,.hub-icon-label').forEach(function (el) {
            el.childNodes.forEach(function (n) {
                if (n.nodeType !== 3) return;
                var tr = n.nodeValue.trim();
                if (tr.length > 3 && tr === tr.toUpperCase() && /[A-Z]/.test(tr)) n.nodeValue = n.nodeValue.replace(tr, sentence(tr));
            });
        });
    }

    /* ---- settings control ---- */
    function addSettings(apply) {
        var v = document.getElementById('view-settings');
        if (!v || document.getElementById('bgSelect')) return;
        var c = document.createElement('div');
        c.className = 'hud-card';
        c.innerHTML = '<div class="card-header-sm">Background</div>' +
            '<select id="bgSelect" style="width:100%;padding:12px;border-radius:10px;background:rgba(255,255,255,.08);color:inherit;border:1px solid rgba(255,255,255,.2);font-size:16px">' +
            '<option value="all">Sab subjects</option><option value="phy">Physics</option><option value="chem">Chemistry</option><option value="math">Maths</option><option value="off">Band (low graphics)</option></select>' +
            '<div style="font-size:.78rem;opacity:.7;margin-top:8px">Phone garam ya slow ho to Band chuno.</div>';
        v.appendChild(c);
        var s = c.querySelector('select'); s.value = get();
        s.addEventListener('change', function () { put(s.value); apply(s.value); });
    }

    /* ---- 3D scene ---- */
    function start() {
        var cv = document.getElementById('bg3d');
        if (!cv || !window.THREE) { addSettings(function () {}); return; }
        var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, M = reduce ? 0 : 1;
        var lite = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 2);
        var R; try { R = new THREE.WebGLRenderer({ canvas: cv, antialias: !lite, alpha: true }); } catch (e) { return; }
        R.setPixelRatio(lite ? 1 : Math.min(devicePixelRatio || 1, 2));
        var S = new THREE.Scene(), C = new THREE.PerspectiveCamera(55, 1, .1, 100); C.position.z = 14;
        S.add(new THREE.AmbientLight(0x8899cc, .75));
        var L1 = new THREE.PointLight(0x2ec4b6, 2.4, 70); L1.position.set(-8, 6, 8); S.add(L1);
        var L2 = new THREE.PointLight(0xf4a340, 2.2, 70); L2.position.set(8, -6, 8); S.add(L2);
        var mat = function (c) { return new THREE.MeshStandardMaterial({ color: c, roughness: .3, metalness: .35 }); };
        var wire = function (c) { return new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: .8 }); };
        var ball = function (r, c) { return new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), mat(c)); };
        function bond(a, b, g) { var v = new THREE.Vector3().subVectors(b, a), m = new THREE.Mesh(new THREE.CylinderGeometry(.07, .07, v.length(), 8), mat(0xcfd8ea)); m.position.copy(a).add(b).multiplyScalar(.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.normalize()); g.add(m); }
        function text(t, col) { var c = document.createElement('canvas'); c.width = 256; c.height = 128; var x = c.getContext('2d'); x.font = '700 70px Georgia,serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 16; x.fillText(t, 128, 66); var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, opacity: .6 })); s.scale.set(4, 2, 1); return s; }
        var piv = [];
        function atom() { var g = new THREE.Group(); g.add(ball(.5, 0xf4a340)); [0, 1, 2].forEach(function (i) { var p = new THREE.Group(); p.rotation.y = i * Math.PI / 3; p.rotation.x = i * .6; var t = new THREE.Mesh(new THREE.TorusGeometry(1.6, .018, 8, 60), new THREE.MeshBasicMaterial({ color: 0x9fe9e1 })); t.rotation.x = Math.PI / 2; p.add(t); var e = ball(.14, 0x2ec4b6); e.position.x = 1.6; var h = new THREE.Group(); h.add(e); p.add(h); piv.push([h, 1.4 + i * .5]); g.add(p); }); return g; }
        function water() { var g = new THREE.Group(), o = new THREE.Vector3(), a = new THREE.Vector3(-.9, -.6, 0), b = new THREE.Vector3(.9, -.6, 0); g.add(ball(.52, 0xff6b6b)); var h1 = ball(.32, 0xffffff); h1.position.copy(a); var h2 = ball(.32, 0xffffff); h2.position.copy(b); g.add(h1, h2); bond(o, a, g); bond(o, b, g); return g; }
        function benzene() { var g = new THREE.Group(), pts = [], i; for (i = 0; i < 6; i++) { var an = i * Math.PI / 3, p = new THREE.Vector3(Math.cos(an) * 1.2, Math.sin(an) * 1.2, 0); pts.push(p); var c = ball(.26, 0x8fa3c8); c.position.copy(p); g.add(c); } for (i = 0; i < 6; i++) bond(pts[i], pts[(i + 1) % 6], g); g.add(new THREE.Mesh(new THREE.TorusGeometry(.75, .03, 8, 40), new THREE.MeshBasicMaterial({ color: 0xf4a340 }))); return g; }
        var icosa = function () { return new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 0), wire(0x2ec4b6)); };
        var knot = function () { return new THREE.Mesh(new THREE.TorusKnotGeometry(.8, .25, 80, 10), wire(0x9c8cf5)); };
        var T = function (t, c) { return function () { return text(t, c); }; };
        var defs = [[atom, 'phy', -.6, .72, -1, 1.1], [T('F=ma', '#9fe9e1'), 'phy', .55, .5, -2, 1], [T('E=mc²', '#ffc678'), 'phy', -.25, -.1, -5, 1.1], [T('v=u+at', '#9fe9e1'), 'phy', .4, -.78, -3, .9],
            [water, 'chem', .6, .05, 0, 1.1], [benzene, 'chem', -.62, -.45, -2, 1], [T('H₂O', '#ffc678'), 'chem', -.1, .4, -4, .9], [T('pH', '#9fe9e1'), 'chem', .1, -.4, -6, 1],
            [icosa, 'math', .55, -.35, -1, 1], [knot, 'math', -.5, .15, -3, 1], [T('π', '#c9bfff'), 'math', .8, .88, -2, 1.1], [T('∫', '#c9bfff'), 'math', -.85, -.85, -3, 1.3], [T('Σ', '#ffc678'), 'math', 0, .92, -5, 1], [T('√x', '#c9bfff'), 'math', -.1, -.68, -4, .9]];
        var items = defs.filter(function (d, i) { return !lite || i % 2 === 0; }).map(function (d, i) {
            var o = d[0](); S.add(o);
            return { o: o, s: d[1], fx: d[2], fy: d[3], z: d[4], sc: d[5], k: 1, ph: i * 1.7, sp: .4 + (i % 5) * .13, w: new THREE.Vector3(.2 + (i % 3) * .15, .3 + (i % 4) * .1, .1) };
        });
        var sel = get(), halfW = 1, halfH = 1, mx = 0, my = 0, raf = 0, last = 0, t0 = performance.now();
        function size() { var w = innerWidth, h = innerHeight; R.setSize(w, h, false); C.aspect = w / h; C.updateProjectionMatrix(); halfH = Math.tan(27.5 * Math.PI / 180) * 14; halfW = halfH * C.aspect; }
        addEventListener('resize', size); size();
        addEventListener('pointermove', function (e) { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
        function frame(now) {
            raf = requestAnimationFrame(frame);
            if (lite && now - last < 33) return; last = now;
            var t = (now - t0) / 1000 * M;
            items.forEach(function (it) {
                var tgt = sel === 'all' ? 1 : (it.s === sel ? 1.35 : 0); it.k += (tgt - it.k) * .08;
                var o = it.o; o.visible = it.k > .02; o.scale.setScalar(Math.max(it.sc * it.k, .0001));
                o.position.set(it.fx * halfW * .88 + Math.sin(t * it.sp + it.ph) * .6, it.fy * halfH * .88 + Math.cos(t * it.sp * .8 + it.ph) * .7, it.z + Math.sin(t * .5 + it.ph) * .8);
                if (!o.isSprite) { o.rotation.x = t * it.w.x; o.rotation.y = t * it.w.y; o.rotation.z = t * it.w.z; }
            });
            piv.forEach(function (p) { p[0].rotation.y = t * p[1]; });
            C.position.x += (mx * 2.2 - C.position.x) * .05; C.position.y += (-my * 2.2 - C.position.y) * .05; C.lookAt(0, 0, 0);
            R.render(S, C);
        }
        function apply(v) {
            sel = v;
            if (v === 'off') { cancelAnimationFrame(raf); raf = 0; cv.style.display = 'none'; }
            else { cv.style.display = 'block'; if (!raf) raf = requestAnimationFrame(frame); }
        }
        window.arjunaBg = { set: function (v) { put(v); apply(v); } };
        addSettings(apply); apply(sel);
    }

    window.addEventListener('DOMContentLoaded', function () { polish(); start(); });
})();
