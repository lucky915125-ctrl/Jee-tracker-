/* Arjuna opening: an arrow flies into a 3D target, then the login card rises in. Once per session, skipped for logged-in users. */
(function () {
    var name = '', seen = '';
    try { name = localStorage.getItem('arjunaStudentName'); seen = sessionStorage.getItem('arjunaIntro'); } catch (e) {}
    if (name || seen || !window.THREE || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function boot() {
        try { sessionStorage.setItem('arjunaIntro', '1'); } catch (e) {}
        var wrap = document.createElement('div'); wrap.id = 'introWrap';
        wrap.innerHTML = '<canvas id="introCv"></canvas><div class="intro-title"><div class="intro-name">Arjuna</div><div class="intro-tag">JEE ki taiyari, nishana pakka.</div></div><button class="intro-skip" type="button">Skip</button>';
        document.body.appendChild(wrap);
        var R; try { R = new THREE.WebGLRenderer({ canvas: wrap.querySelector('#introCv'), antialias: true, alpha: true }); } catch (e) { wrap.remove(); return; }
        R.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
        var S = new THREE.Scene(), C = new THREE.PerspectiveCamera(50, 1, .1, 100);
        S.add(new THREE.AmbientLight(0x99a8d0, .85));
        var p1 = new THREE.PointLight(0x2ec4b6, 2.6, 80); p1.position.set(-6, 5, 10); S.add(p1);
        var p2 = new THREE.PointLight(0xf4a340, 2.4, 80); p2.position.set(7, -4, 10); S.add(p2);
        function size() { R.setSize(innerWidth, innerHeight, false); C.aspect = innerWidth / innerHeight; C.updateProjectionMatrix(); }
        size(); addEventListener('resize', size);
        var M = function (c, e) { return new THREE.MeshStandardMaterial({ color: c, roughness: .3, metalness: .4, emissive: e || 0x000000 }); };

        var target = new THREE.Group(); S.add(target);
        var back = new THREE.Mesh(new THREE.CircleGeometry(3.3, 48), new THREE.MeshBasicMaterial({ color: 0x0e1428, transparent: true, opacity: .75 })); back.position.z = -.3; target.add(back);
        [[3, 0xeef1f7], [2.4, 0x2ec4b6], [1.8, 0xeef1f7], [1.2, 0xf4a340], [.6, 0x2ec4b6]].forEach(function (r, i) {
            var t = new THREE.Mesh(new THREE.TorusGeometry(r[0], .13, 14, 64), M(r[1])); t.position.z = i * .1; target.add(t);
        });
        var eye = new THREE.Mesh(new THREE.SphereGeometry(.34, 20, 16), M(0xf4a340, 0x3a2200)); eye.position.z = .3; target.add(eye);

        var arrow = new THREE.Group();
        var shaft = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, 2.4, 8), M(0xeef1f7)); shaft.rotation.x = Math.PI / 2; arrow.add(shaft);
        var head = new THREE.Mesh(new THREE.ConeGeometry(.14, .5, 10), M(0xf4a340)); head.rotation.x = -Math.PI / 2; head.position.z = -1.45; arrow.add(head);
        for (var i = 0; i < 3; i++) { var f = new THREE.Group(); f.rotation.z = i * Math.PI * 2 / 3; var b = new THREE.Mesh(new THREE.BoxGeometry(.36, .012, .42), M(0x2ec4b6)); b.position.set(.17, 0, 1.0); f.add(b); arrow.add(f); }
        S.add(arrow);

        var N = 90, pg = new THREE.BufferGeometry(), pp = new Float32Array(N * 3), dir = [];
        for (i = 0; i < N; i++) { var a = Math.random() * 6.283, e = (Math.random() - .5) * 3; dir.push([Math.cos(a) * (1 + Math.random() * 2.2), Math.sin(a) * (1 + Math.random() * 2.2), e]); }
        pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
        var pm = new THREE.PointsMaterial({ color: 0xffc678, size: .14, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
        S.add(new THREE.Points(pg, pm));

        var t0 = performance.now(), raf = 0, done = false, hitAt = 1.5;
        var ease = function (x) { return x * x * (3 - 2 * x); };
        function finish(fast) {
            if (done) return; done = true; cancelAnimationFrame(raf);
            wrap.classList.add('out');
            var lb = document.querySelector('.login-box'); if (lb) lb.classList.add('reveal');
            setTimeout(function () { removeEventListener('resize', size); R.dispose(); wrap.remove(); }, fast ? 500 : 800);
        }
        function frame(now) {
            raf = requestAnimationFrame(frame);
            var t = (now - t0) / 1000;
            var k = Math.min(t / hitAt, 1), kk = Math.pow(k, 2.2);
            arrow.position.set((1 - kk) * .8, -2.4 * (1 - kk), 26 * (1 - kk) + .4);
            arrow.rotation.set(.12 * (1 - kk), -.1 * (1 - kk), t * 2.2 * (1 - kk));
            var dt = Math.max(0, t - hitAt);
            target.scale.setScalar(1 + .2 * Math.exp(-6 * dt) * Math.cos(18 * dt));
            target.rotation.y = Math.sin(t * .9) * .35 * (t < 2.6 ? 1 : Math.max(0, 1 - (t - 2.6) * 1.5));
            target.rotation.x = Math.cos(t * .7) * .15;
            if (t >= hitAt) { wrap.classList.add('on'); pm.opacity = Math.max(0, 1 - dt * 1.1); for (var j = 0; j < N; j++) { pp[j * 3] = dir[j][0] * dt * 2.2; pp[j * 3 + 1] = dir[j][1] * dt * 2.2; pp[j * 3 + 2] = dir[j][2] * dt * 2.2 + .3; } pg.attributes.position.needsUpdate = true; }
            var cz = t < 2.6 ? 18 - t * 1.1 : 15.2 - ease(Math.min((t - 2.6) / .9, 1)) * 12;
            C.position.set(Math.sin(t * .8) * 1.2, Math.cos(t * .6) * .6, cz); C.lookAt(0, 0, 0);
            R.render(S, C);
            if (t > 3.5) finish(false);
        }
        wrap.addEventListener('click', function () { finish(true); });
        raf = requestAnimationFrame(frame);
    }
    window.addEventListener('DOMContentLoaded', boot);
})();
