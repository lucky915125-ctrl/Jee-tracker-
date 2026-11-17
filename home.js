/* Arjuna home: mission card, live tile info, feature titles, theme flag */
(function () {
    var NAMES = { 'todo': 'Aaj ka Plan', 'focus': 'Focus Mode', 'practice': 'Practice Zone', 'errorbook': 'Galti Book', 'backlog': 'Backlog Clear', 'roadmap': 'Syllabus Map', 'dashboard': 'Progress', 'smart-hud': 'Rank Radar', 'smart-planner': 'Auto Planner', 'formulas': 'Formula Vault', 'flashcards': 'Flashcards', 'analytics': 'Study Stats', 'testanalysis': 'Test Lab', 'lofi': 'Lofi Radio', 'settings': 'Settings' };
    var LINES = ['Aaj ka ek chapter, kal ki tension kam.', 'Roz thoda, rank ke paas pakka.', 'Pehle Galti Book, phir naya chapter.', 'Ek DPP abhi, baaki baad me.', '25 minute focus, phir chhota break.', 'Backlog ko aaj se kam karna shuru karo.', 'Formula yaad nahi? Likh ke dekho.', 'Galti dobara na ho, wahi asli revision hai.', 'Mock test se mat daro, wahi sach batata hai.', 'Neend poori, yaad poora.', 'Kal ka plan aaj raat likh lo.', 'Chhota target pura karo, momentum khud banega.'];
    var JEE = new Date('2028-01-24T00:00:00');
    function $(id) { return document.getElementById(id); }
    function today() { return new Date().toISOString().split('T')[0]; }
    function read(k) { try { var v = JSON.parse(localStorage.getItem(k) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
    function isDone(t) { return !!(t.completed || t.done || (t.ldn && t.ldn.l && t.ldn.d && t.ldn.n)); }
    function title(t) { var s = t.chap || String(t.text || t.title || t.name || t.task || '').replace(/^\[[^\]]*\]\s*/, ''); s = s || 'agla kaam'; return s.length > 26 ? s.slice(0, 25) + '…' : s; }

    function tile(key) { return document.querySelector('.hub-grid-item[onclick*="\'' + key + '\'"]'); }
    function setTile(key, text, badge) {
        var t = tile(key); if (!t) return;
        var s = t.querySelector('.hub-sub'); if (s && text) s.textContent = text;
        var b = t.querySelector('.hub-badge');
        if (badge > 0) { if (!b) { b = document.createElement('span'); b.className = 'hub-badge'; t.appendChild(b); } b.textContent = badge > 99 ? '99+' : badge; }
        else if (b) b.remove();
    }

    function update() {
        if (!$('heroDays')) return;
        $('heroDays').textContent = Math.max(0, Math.ceil((JEE - Date.now()) / 864e5));
        var name = ''; try { name = (localStorage.getItem('arjunaStudentName') || '').trim().split(/\s+/)[0]; } catch (e) {}
        $('heroName').textContent = name ? 'Namaste, ' + name : 'Namaste';
        $('heroLine').textContent = LINES[Math.floor(Date.now() / 864e5) % LINES.length];

        var t = read('arjunaHUD_tasks').filter(function (x) { return x.date === today(); });
        var left = t.filter(function (x) { return !isDone(x); }), d = t.length - left.length, next = left[0];
        $('heroDone').textContent = !t.length ? 'Aaj ka plan banao' : (next ? 'Agla: ' + title(next) : 'Sab done, shabash');
        $('heroGo').hidden = !next;
        $('heroRing').setAttribute('stroke-dasharray', (t.length ? 327 * d / t.length : 0) + ' 327');

        var openErr = read('arjunaHUD_errorbook').filter(function (e) { return !e.resolved; }).length;
        var pend = read('arjunaHUD_backlog').filter(function (b) { return b.status === 'pending'; }).reduce(function (s, i) { return s + (parseInt(i.count) || 1); }, 0);
        setTile('todo', t.length ? d + ' of ' + t.length + ' done' : 'Aaj ka plan banao', left.length);
        setTile('errorbook', openErr ? openErr + ' galtiyan baaki' : 'Sab clear', openErr);
        setTile('backlog', pend ? pend + ' pending' : 'Koi backlog nahi', pend);
    }

    function decorate(id) {
        setTimeout(function () {
            var v = $('view-' + id), bar = v && v.querySelector('.back-bar-header');
            if (bar && NAMES[id] && !bar.querySelector('.bar-title')) { var s = document.createElement('span'); s.className = 'bar-title'; s.textContent = NAMES[id]; bar.appendChild(s); }
            if (id === 'app-hub') update();
        }, 0);
    }
    ['switchTab', 'openSectionWithBack'].forEach(function (n) {
        var f = window[n];
        if (typeof f === 'function') window[n] = function (id) { var r = f.apply(this, arguments); decorate(id); return r; };
    });
    function flag(theme) { document.documentElement.setAttribute('data-theme', theme === 'white' ? 'light' : 'dark'); }
    var ct = window.changeTheme;
    if (typeof ct === 'function') window.changeTheme = function (th) { flag(th); return ct.apply(this, arguments); };

    window.addEventListener('DOMContentLoaded', function () {
        try { flag(localStorage.getItem('arjunaHUD_theme')); } catch (e) {}
        update();
        setInterval(function () { var h = $('view-app-hub'); if (h && h.style.display !== 'none') update(); }, 4000);
    });
})();
