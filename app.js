window.escAI=function(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]})};
/* ==========================================================================
   ARJUNA JEE TRACKER & ERROR BOOK - MASTER JS ENGINE (FULL intact & Fixed)
   ========================================================================== */
window.logQuickLectureAsTodo = function() {
    const dateInput = document.getElementById('quickDate');
    const subInput = document.getElementById('quickSub');
    const chapSelect = document.getElementById('quickChapter');
    const startTimeInput = document.getElementById('quickStartTime');
    const endTimeInput = document.getElementById('quickEndTime');

    let dateVal = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];
    let subVal = subInput ? subInput.value : 'physics';
    
    // Chapter ka naam dropdown ki selected option se sahi se fetch karein
    let chapVal = "General Lecture";
    let chapIdx = 0;
    if (chapSelect && chapSelect.selectedIndex !== -1 && chapSelect.options[chapSelect.selectedIndex]) {
        chapVal = chapSelect.options[chapSelect.selectedIndex].text;
        chapIdx = chapSelect.value;
    }

    let startVal = startTimeInput ? startTimeInput.value : '10:00';
    let endVal = endTimeInput ? endTimeInput.value : '11:00';

    let todoList = window.getTodoList();

    let newTodoItem = {
        id: Date.now(),
        sub: subVal.toUpperCase(),
        chap: chapVal,
        text: `${chapVal} (${subVal.toUpperCase()})`,
        category: 'Lecture',
        date: dateVal,
        startTime: startVal,
        endTime: endVal,
        ldn: { l: false, d: false, n: false },
        completed: false,
        done: false
    };

    todoList.unshift(newTodoItem);

    try {
        localStorage.setItem('arjunaHUD_tasks', JSON.stringify(todoList));
        localStorage.setItem('arjunaHUD_todo', JSON.stringify(todoList));
    } catch(e) {}

    if (typeof window.renderTodoList === 'function') {
        window.renderTodoList();
    }

    alert("Lecture successfully task list me add ho gaya hai!");
};

let batchConfig = JSON.parse(localStorage.getItem('arjunaBatchConfig')) || {
    batchName: "Arjuna JEE 2027",
    teachers: { physics: "TEACHER NAME", chemistry: "TEACHER NAME", maths: "TEACHER NAME" }
};

function saveBatchConfig() {
    const batch = document.getElementById('selectedBatch')?.value;
    const physT = document.getElementById('teacherPhys')?.value;
    const chemT = document.getElementById('teacherChem')?.value;
    const mathT = document.getElementById('teacherMath')?.value;
    batchConfig = {
        batchName: batch || "Arjuna JEE 2027",
        teachers: {
            physics: physT || "TEACHER NAME",
            chemistry: chemT || "TEACHER NAME",
            maths: mathT || "TEACHER NAME"
        }
    };
    localStorage.setItem('arjunaBatchConfig', JSON.stringify(batchConfig));
}

const syllabusData = {
    physics: [
        { name: "Units & Measurements", topics: "Dimensional Analysis, Errors, Vernier & Screw Gauge" },
        { name: "Mathematics tool", topics: "Calculus" },
        { name: "Motion in a Straight Line", topics: "Calculus in Kinematics, Graphs, Relative Motion 1D" },
        { name: "Motion in a Plane", topics: "Projectiles, Relative Motion 2D, Circular Motion" },
        { name: "Laws of Motion", topics: "Newton's Laws, Friction, Pseudo Force, Pulleys" },
        { name: "Circular Motion", topics: "angular speed, angular acceleration, centripetal force" },
        { name: "Work, Energy & Power", topics: "Work-Energy Theorem, Potential Energy, Collisions" },
        { name: "Center of mass & collision", topics: "mass moment, Collisions" },
        { name: "Rotational Motion", topics: "Moment of Inertia, Torque, Angular Momentum, Rolling" },
        { name: "Gravitation", topics: "Kepler's Laws, Potential, Escape Velocity" },
        { name: "Fluids & Solids", topics: "Young's Modulus, Pascal's Law, Bernoulli's Principle, Viscosity" },
        { name: "Thermodynamics", topics: "1st & 2nd Laws, Carnot Engine, Heat Capacity" },
        { name: "Waves & Oscillations", topics: "SHM Equation, Pendulum, Doppler Effect, Organ Pipes" }
    ],
    chemistry: [
        { name: "Basic Concepts of Chem", topics: "Mole Concept, Stoichiometry, Concentration Terms" },
        { name: "Structure of Atom", topics: "Bohr Model, Quantum Numbers, Photoelectric Effect" },
        { name: "Periodicity", topics: "Ionization Enthalpy, Electron Gain, Atomic Radius" },
        { name: "Chemical Bonding", topics: "VSEPR Theory, Hybridization, MOT, Dipole Moment" },
        { name: "State of matter", topics: "ideal gas equations, charles laws, boyles law" },
        { name: "Thermodynamics (Chem)", topics: "Enthalpy, Entropy, Gibbs Free Energy, Hess Law" },
        { name: "Equilibrium", topics: "Kc & Kp, Le Chatelier Principle, pH, Buffer" },
        { name: "Redox Reactions", topics: "Oxidation Numbers, Balancing, Titrations" },
        { name: "Organic Chem Basics", topics: "IUPAC Nomenclature, Isomerism, GOC" },
        { name: "Hydrocarbons", topics: "Alkanes, Alkenes, Alkynes, Aromatic Substitution" },
        { name: "Hydrogen & S-Block", topics: "Preparation of H2, Hydrides, Alkali & Alkaline Earth Metals" }
    ],
    maths: [
        { name: "Basic mathematics", topics: "identity, logarithm, modulus" },
        { name: "Sets & Functions", topics: "Venn Diagrams, Domain & Range, Types of Functions" },
        { name: "Quadratic equation", topics: "sum of roots, newton formula" },
        { name: "relation function", topics: "one one type, many one type" },
        { name: "Trigonometry", topics: "Compound Angles, Trig Equations, General Solutions" },
        { name: "Trigonometry equations", topics:"Trig Equations, General Solutions" },
        { name: "Complex Numbers", topics: "Iota Properties, Modulus & Argument, Quadratic Roots" },
        { name: "Permutations & Combinations", topics: "Fundamental Principle, Circular Permutation" },
        { name: "Binomial Theorem", topics: "General Term, Middle Term, Coefficients" },
        { name: "Sequences & Series", topics: "AP, GP, AGP, Sum of Special Series" },
        { name: "Straight Lines", topics: "Slope Forms, Distance Formula, Pair of Lines" },
        { name: "Conic Sections", topics: "Parabola, Ellipse, Hyperbola, Tangents" },
        { name: "Limits & Derivatives", topics: "Standard Limits, L'Hopital Rule, First Principle" },
        { name: "Probability", topics: "Conditional Probability, Bayes Theorem, Independent Events" },
        { name: "linear inequality", topics: "wavy curve method" },
        { name: "Mathematical Reasoning", topics: "Statements, Logical Connectives, Quantifiers" }
    ]
};
// Sabse upar global scope me yeh declare karein:
let gaugePhysInst = null;
let gaugeChemInst = null;
let gaugeMathInst = null;

let currentSub = 'physics';
let currentSchoolSub = 'physics';
let currentPracticeSub = 'physics';
let currentRevisionSubject = 'physics';
let userProgress = JSON.parse(localStorage.getItem('arjunaHUD_prog_v4')) || {};
let schoolProgress = JSON.parse(localStorage.getItem('arjunaSchool_prog')) || {};
let backlogData = JSON.parse(localStorage.getItem('arjunaHUD_backlog')) || [];
let todoData = JSON.parse(localStorage.getItem('arjunaHUD_todo')) || JSON.parse(localStorage.getItem('arjunaHUD_tasks')) || [];
let errorData = JSON.parse(localStorage.getItem('arjunaHUD_errorbook')) || [];
let studyHoursData = JSON.parse(localStorage.getItem('arjunaHUD_studyHours')) || { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
let tempErrImg = "";
let tempTestImg = "";
let db = null;

const dbReq = indexedDB.open("ArjunaJEE_DB_v2", 1);
dbReq.onupgradeneeded = function(e) {
    db = e.target.result;
    if (!db.objectStoreNames.contains("errorBook")) db.createObjectStore("errorBook", { keyPath: "id" });
    if (!db.objectStoreNames.contains("testLogs")) db.createObjectStore("testLogs", { keyPath: "id" });
};
dbReq.onsuccess = function(e) {
    db = e.target.result;
    renderErrorBookFromDB();
    renderTestLogsFromDB();
};

function handleLogin() {
    const nameInput = document.getElementById('studentNameInput');
    const phoneInput = document.getElementById('studentPhoneInput'); // Naya Phone Input
    
    if (!nameInput) return;
    const name = nameInput.value.trim();
    if (!name) return alert("Kripya apna naam darj karein!");

    // Mobile Number Validation
    const phone = phoneInput ? phoneInput.value.trim() : '';
    if (!phone || phone.length < 10) {
        return alert("Kripya sahi 10-digit ka WhatsApp mobile number dalein!");
    }

    // Name aur Mobile Number dono save kar rahe hain
    localStorage.setItem('arjunaStudentName', name);
    localStorage.setItem('arjuna_user_mobile', phone);

    const welcomeText = document.getElementById('welcomeUserText');
    if (welcomeText) welcomeText.innerText = `STUDENT: ${name.toUpperCase()}`;
         
    const loginView = document.getElementById('view-login');
    if (loginView) loginView.style.display = 'none';
         
    document.querySelectorAll('.section-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });
         
    const dashboardView = document.getElementById('view-dashboard');
    if (dashboardView) {
        dashboardView.classList.add('active');
        dashboardView.style.display = 'block';
    }
         
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const dashNav = document.getElementById('nav-dashboard');
    if (dashNav) dashNav.classList.add('active');

    recalculateSubjectGauges();
    renderStudyHoursGraph();
}


function logoutUser() {
    localStorage.removeItem('arjunaStudentName');
    location.reload();
}
window.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('arjunaStudentName');
    if (savedName) {
        const loginView = document.getElementById('view-login');
        if (loginView) loginView.style.display = 'none';
        
        const targetElement = document.getElementById('welcomeUserText');
        if (targetElement) targetElement.innerText = `STUDENT: ${savedName.toUpperCase()}`;
    }
         
    // Sabhi section-view ko pehle hide karein
    document.querySelectorAll('.section-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });

    // App khulte hi seedha main features hub (view-app-hub) ko open karein
    const appHubView = document.getElementById('view-app-hub');
    if (appHubView) {
        appHubView.classList.add('active');
        appHubView.style.display = 'block';
    }
         
    const savedTheme = localStorage.getItem('arjunaHUD_theme');
    if (savedTheme) {
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) themeSelect.value = savedTheme;
        if (typeof changeTheme === 'function') changeTheme(savedTheme);
    }
         
    if (document.getElementById('selectedBatch') && typeof batchConfig !== 'undefined') document.getElementById('selectedBatch').value = batchConfig.batchName;
    if (document.getElementById('teacherPhys') && typeof batchConfig !== 'undefined') document.getElementById('teacherPhys').value = batchConfig.teachers.physics;
    if (document.getElementById('teacherChem') && typeof batchConfig !== 'undefined') document.getElementById('teacherChem').value = batchConfig.teachers.chemistry;
    if (document.getElementById('teacherMath') && typeof batchConfig !== 'undefined') document.getElementById('teacherMath').value = batchConfig.teachers.maths;
    
    if (typeof recalculateSubjectGauges === 'function') recalculateSubjectGauges();
    if (typeof updateJeeCountdown === 'function') updateJeeCountdown();
    if (typeof loadChaptersForQuickLog === 'function') loadChaptersForQuickLog();
    if (typeof loadChaptersForBacklog === 'function') loadChaptersForBacklog();
    if (typeof loadChaptersForErrorBook === 'function') loadChaptersForErrorBook();
    if (typeof renderTodoList === 'function') renderTodoList();
    if (typeof renderErrorBook === 'function') renderErrorBook();
    if (typeof renderBacklog === 'function') renderBacklog();
    if (typeof updateFocusStatsUI === 'function') updateFocusStatsUI();
    if (typeof updateTimerDisplay === 'function') updateTimerDisplay();
    if (typeof loadChaptersForAnalytics === 'function') loadChaptersForAnalytics();

    const centerHub = document.getElementById('centerHubLogo');
    if (centerHub) {
        let pressTimer = null;
        let isLongPress = false;

        centerHub.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            isLongPress = false;
            pressTimer = setTimeout(() => {
                isLongPress = true;
                if (typeof switchTab === 'function') switchTab('settings');
            }, 500);
        });

        centerHub.addEventListener('pointerup', (e) => {
            e.preventDefault();
            clearTimeout(pressTimer);
            if (!isLongPress) {
                // Click karne par wapas main features hub par aa jaye
                document.querySelectorAll('.section-view').forEach(view => {
                    view.classList.remove('active');
                    view.style.display = 'none';
                });
                if (appHubView) {
                    appHubView.classList.add('active');
                    appHubView.style.display = 'block';
                }
            }
        });

        centerHub.addEventListener('pointercancel', (e) => {
            clearTimeout(pressTimer);
            isLongPress = false;
        });
    }
});


function previewImage(input, previewId, storageVar) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById(previewId);
            if (img) {
                img.src = e.target.result;
                img.style.display = 'block';
            }
            if (storageVar === 'tempErrImg') tempErrImg = e.target.result;
            if (storageVar === 'tempTestImg') tempTestImg = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function toggleMoreMenu() {
    const menu = document.getElementById('moreMenuPopup');
    if (menu) {
        menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
    }
}

function switchSubject(sub) {
    currentSub = sub;
    document.querySelectorAll('#view-roadmap .sub-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById('btn-' + sub);
    if (btn) btn.classList.add('active');
    renderRoadmap();
}

function switchSchoolSubject(sub) {
    currentSchoolSub = sub;
    document.querySelectorAll('#view-school .sub-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById('btn-school-' + sub);
    if (btn) btn.classList.add('active');
    renderSchoolTracker();
}

function switchPracticeSubject(sub) {
    currentPracticeSub = sub;
    document.querySelectorAll('#view-practice .sub-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById('btn-practice-' + sub);
    if (btn) btn.classList.add('active');
    renderPracticeTracker();
}

function switchRevisionSubject(sub) {
    currentRevisionSubject = sub;
    document.querySelectorAll('#view-revision .sub-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById('btn-rev-' + sub);
    if (btn) btn.classList.add('active');
    renderRevisionChapters();
}

let currentActiveDeepSub = 'physics';
let currentActiveDeepChapIdx = 0;
let currentActiveDeepTab = 'all';

function openChapterDeepView(sub, chapIdx) {
    currentActiveDeepSub = sub;
    currentActiveDeepChapIdx = chapIdx;
    currentActiveDeepTab = 'all';

    document.querySelectorAll('.section-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });

    const targetView = document.getElementById('view-chapter-deep');
    if (targetView) {
        targetView.classList.add('active');
        targetView.style.display = 'block';
    }

    renderDeepChapterHeader();
    switchDeepTab('all');
}

function renderDeepChapterHeader() {
    const chap = syllabusData[currentActiveDeepSub][currentActiveDeepChapIdx];
    const key = `${currentActiveDeepSub}_${currentActiveDeepChapIdx}`;
    const data = userProgress[key] || { doneLec: 0, totalLec: 10, doneDpp: 0, totalDpp: 10 };

    let masteryPercent = calculateChapterMastery(currentActiveDeepSub, currentActiveDeepChapIdx);

    const titleElem = document.getElementById('deepChapterTitle');
    const gaugeElem = document.getElementById('deepChapterGauge');

    if (titleElem) titleElem.innerText = chap.name;
    if (gaugeElem) gaugeElem.innerText = `${masteryPercent}% Mastery`;
}

function toggleStageInstant(key, stage) {
    if (!userProgress[key]) {
        userProgress[key] = { totalLec: 10, doneLec: 0, totalDpp: 10, doneDpp: 0, questionsDone: 0 };
    }
    userProgress[key][stage] = !userProgress[key][stage];
    localStorage.setItem('arjunaHUD_prog_v4', JSON.stringify(userProgress));
    
    renderDeepChapterHeader();
    
    const chip = document.getElementById(`stage_chip_${key}_${stage}`);
    if (chip) {
        if (userProgress[key][stage]) {
            chip.classList.add('done');
        } else {
            chip.classList.remove('done');
        }
    }
}

function updatePracticeStage(key, stageId, val) {
    if (!userProgress[key]) {
        userProgress[key] = { totalLec: 10, doneLec: 0, totalDpp: 10, doneDpp: 0, questionsDone: 0 };
    }
    userProgress[key][stageId] = Number(val);
    
    let total = 0;
    ['st1', 'st2', 'st3', 'st4', 'st5', 'st6', 'st7', 'st8'].forEach(st => {
        total += Number(userProgress[key][st] || 0);
    });
    userProgress[key].questionsDone = total;

    localStorage.setItem('arjunaHUD_prog_v4', JSON.stringify(userProgress));
    renderDeepChapterHeader();
    
    if (currentActiveDeepTab === 'practice') {
        switchDeepTab('practice');
    }
}

function switchDeepTab(tab) {
    currentActiveDeepTab = tab;
    document.querySelectorAll('#view-chapter-deep .sub-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`chip-${tab}`);
    if (activeBtn) activeBtn.classList.add('active');

    const container = document.getElementById('deepChapterContentContainer');
    if (!container) return;
    container.innerHTML = '';

    const chap = syllabusData[currentActiveDeepSub][currentActiveDeepChapIdx];
    const key = `${currentActiveDeepSub}_${currentActiveDeepChapIdx}`;
    const data = userProgress[key] || { 
        totalLec: 10, doneLec: 0, 
        totalDpp: 10, doneDpp: 0, 
        questionsDone: 0,
        theory: false, notes: false, shortNotes: false, topic: false, main: false, bridge: false, adv: false, pyq: false 
    };

      if (tab === 'all') {
        const currentTeacher = batchConfig.teachers[currentActiveDeepSub] || "PW Teacher";
        
        // --- Standalone Chapter Lecture Cards Data & Sync ---
        const storageKey = `chapter_lectures_${currentActiveDeepSub}_${currentActiveDeepChapIdx}`;
        let lectures = JSON.parse(localStorage.getItem(storageKey)) || [];

        // Dynamic sync: Agar upper total count badha ya kam hua hai toh array resize hoga
        let targetTotal = Number(data.totalLec) || 10;
        
        if (lectures.length === 0 && targetTotal > 0) {
            for (let i = 1; i <= targetTotal; i++) {
                lectures.push({
                    id: Date.now() + i,
                    title: `Lecture ${i}`,
                    completed: false,
                    date: new Date().toISOString().split('T')[0],
                    ldn: { l: false, n: false, d: false }
                });
            }
            localStorage.setItem(storageKey, JSON.stringify(lectures));
        }

        let totalManualCount = lectures.length;
        let doneAutoCount = lectures.filter(l => l.completed).length;

        let lectureCardsHTML = `
            <div class="hud-card" style="margin-top: 15px; border: 1px solid rgba(0, 240, 255, 0.3); background: rgba(3, 7, 18, 0.7); border-radius: 12px; padding: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
                    <div>
                        <div style="font-size: 0.85rem; font-weight: bold; color: #fff;">Chapter Lectures Tracker</div>
                        <div style="font-size: 0.7rem; color: var(--text-sub); margin-top: 2px;">
                            Done: <b style="color: var(--success-color);">${doneAutoCount}</b> / Total: <b style="color: var(--cyan-glow);">${totalManualCount}</b>
                        </div>
                    </div>
                    <button onclick="addChapterLectureCard('${currentActiveDeepSub}', ${currentActiveDeepChapIdx})" style="background: rgba(0,240,255,0.15); border: 1px solid var(--cyan-glow); color: var(--cyan-glow); padding: 5px 12px; border-radius: 8px; font-size: 0.72rem; font-weight: bold; cursor: pointer;">+ Add Lecture</button>
                </div>
                <div style="display: flex; flex-direction: column-reverse; gap: 10px;">
        `;

        if (lectures.length === 0) {
            lectureCardsHTML += `<div style="text-align: center; color: var(--text-sub); font-size: 0.75rem; padding: 15px;">Koi lecture card nahi hai. Upar '+ Add Lecture' par click karein ya upper counter set karein!</div>`;
        } else {
            lectures.forEach((lec, index) => {
                let ldn = lec.ldn || { l: false, n: false, d: false };
                let isComplete = lec.completed || false;
                let currentDate = lec.date || new Date().toISOString().split('T')[0];

                lectureCardsHTML += `
                    <div style="background: rgba(15, 23, 42, 0.85); padding: 12px; border-radius: 10px; border: 1.5px solid ${isComplete ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)'}; box-sizing: border-box;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                            <div>
                                <div style="font-size: 0.85rem; font-weight: bold; color: ${isComplete ? '#9ca3af' : '#fff'}; text-decoration: ${isComplete ? 'line-through' : 'none'};">${lec.title || 'Lecture ' + (index + 1)}</div>
                                <div style="font-size: 0.68rem; color: var(--text-sub); margin-top: 2px;">${currentActiveDeepSub.toUpperCase()} • Chapter Lecture</div>
                            </div>
                            <input type="date" value="${currentDate}" onchange="updateLectureDate('${currentActiveDeepSub}', ${currentActiveDeepChapIdx}, ${lec.id}, this.value)" style="background: rgba(0,240,255,0.1); border: 1px solid rgba(0,240,255,0.3); color: var(--cyan-glow); padding: 3px 8px; border-radius: 6px; font-size: 0.68rem; cursor: pointer;">
                        </div>

                        <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                            <div style="display: flex; gap: 6px; align-items: center;">
                                <div onclick="toggleLectureLdn('${currentActiveDeepSub}', ${currentActiveDeepChapIdx}, ${lec.id}, 'l')" style="width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold; cursor: pointer; background: ${ldn.l ? '#10b981' : 'rgba(3,7,18,0.8)'}; color: ${ldn.l ? '#000' : '#fff'}; border: 1.5px solid ${ldn.l ? '#10b981' : 'rgba(255,255,255,0.2)'};" title="Lecture">L</div>
                                <div onclick="toggleLectureLdn('${currentActiveDeepSub}', ${currentActiveDeepChapIdx}, ${lec.id}, 'n')" style="width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold; cursor: pointer; background: ${ldn.n ? '#10b981' : 'rgba(3,7,18,0.8)'}; color: ${ldn.n ? '#000' : '#fff'}; border: 1.5px solid ${ldn.n ? '#10b981' : 'rgba(255,255,255,0.2)'};" title="Notes">N</div>
                                <div onclick="toggleLectureLdn('${currentActiveDeepSub}', ${currentActiveDeepChapIdx}, ${lec.id}, 'd')" style="width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold; cursor: pointer; background: ${ldn.d ? '#10b981' : 'rgba(3,7,18,0.8)'}; color: ${ldn.d ? '#000' : '#fff'}; border: 1.5px solid ${ldn.d ? '#10b981' : 'rgba(255,255,255,0.2)'};" title="DPP">D</div>
                            </div>

                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 0.7rem; color: var(--text-sub);">Qty: 1</span>
                                <button onclick="deleteChapterLectureCard('${currentActiveDeepSub}', ${currentActiveDeepChapIdx}, ${lec.id})" style="background: none; border: none; color: #ef4444; font-size: 0.85rem; cursor: pointer;" title="Delete">🗑️</button>
                            </div>

                            <button onclick="toggleLectureComplete('${currentActiveDeepSub}', ${currentActiveDeepChapIdx}, ${lec.id})" style="background: ${isComplete ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)'}; border: 1.5px solid ${isComplete ? '#10b981' : 'rgba(255,255,255,0.2)'}; color: ${isComplete ? '#10b981' : '#fff'}; padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 5px;">
                                <span style="font-size: 0.75rem;">${isComplete ? '✔' : '○'}</span> ${isComplete ? 'Completed' : 'Mark Complete'}
                            </button>
                        </div>
                    </div>
                `;
            });
        }
        lectureCardsHTML += `</div></div>`;

        container.innerHTML = `
            <div class="hud-card">
                <div style="font-size: 0.75rem; color: var(--purple-glow); margin-bottom: 8px;"><b>Teacher:</b> ${currentTeacher}</div>
                <div class="topic-list" style="font-size: 0.75rem; color: var(--text-sub); margin-bottom: 12px;"><b>Topics:</b> ${chap.topics}</div>
                
                <div class="trackers-box" style="margin-bottom: 12px;">
                    <div class="tracker-item">
                        <span class="tracker-label">Lectures (Done / Total)</span>
                        <div class="tracker-inputs">
                            <input type="number" class="mini-input" value="${doneAutoCount}" onchange="updateCounts('${key}', 'doneLec', this.value)">
                            <span style="font-size:0.8rem; color:var(--text-sub);">/</span>
                            <input type="number" class="mini-input" value="${data.totalLec || 10}" onchange="updateCountsWithAutoCards('${currentActiveDeepSub}', ${currentActiveDeepChapIdx}, 'totalLec', this.value)">
                        </div>
                    </div>
                    <div class="tracker-item">
                        <span class="tracker-label" style="color:var(--purple-glow);">DPPs (Done / Total)</span>
                        <div class="tracker-inputs">
                            <input type="number" class="mini-input" value="${data.doneDpp || 0}" onchange="updateCounts('${key}', 'doneDpp', this.value)">
                            <span style="font-size:0.8rem; color:var(--text-sub);">/</span>
                            <input type="number" class="mini-input" value="${data.totalDpp || 10}" onchange="updateCounts('${key}', 'totalDpp', this.value)">
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 12px; background: rgba(3, 7, 18, 0.5); padding: 10px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size: 0.75rem; color: var(--cyan-glow); font-weight:700;">Practice Questions Solved:</span>
                    <input type="number" class="mini-input" style="width: 70px;" value="${data.questionsDone || 0}" onchange="updateCounts('${key}', 'questionsDone', this.value)">
                </div>

                <div style="font-size: 0.7rem; color: var(--text-sub); margin-bottom: 8px; font-weight: bold;">8-STAGE PREPARATION CHECKLIST:</div>
                <div class="question-stages">
                    <div id="stage_chip_${key}_theory" class="stage-chip ${data.theory ? 'done' : ''}" onclick="toggleStageInstant('${key}', 'theory')">1. Theory</div>
                    <div id="stage_chip_${key}_notes" class="stage-chip ${data.notes ? 'done' : ''}" onclick="toggleStageInstant('${key}', 'notes')">2. Notes</div>
                    <div id="stage_chip_${key}_shortNotes" class="stage-chip ${data.shortNotes ? 'done' : ''}" onclick="toggleStageInstant('${key}', 'shortNotes')">3. Short Notes</div>
                    <div id="stage_chip_${key}_topic" class="stage-chip ${data.topic ? 'done' : ''}" onclick="toggleStageInstant('${key}', 'topic')">4. Topic Qs</div>
                    <div id="stage_chip_${key}_main" class="stage-chip ${data.main ? 'done' : ''}" onclick="toggleStageInstant('${key}', 'main')">5. JEE Main</div>
                    <div id="stage_chip_${key}_bridge" class="stage-chip ${data.bridge ? 'done' : ''}" onclick="toggleStageInstant('${key}', 'bridge')">6. Bridge Lvl</div>
                    <div id="stage_chip_${key}_adv" class="stage-chip ${data.adv ? 'done' : ''}" onclick="toggleStageInstant('${key}', 'adv')">7. Advanced</div>
                    <div id="stage_chip_${key}_pyq" class="stage-chip ${data.pyq ? 'done' : ''}" onclick="toggleStageInstant('${key}', 'pyq')">8. PYQs Done</div>
                </div>
            </div>
            ${lectureCardsHTML}
        `;
    }


    else if (tab === 'practice') {
        const stages = [
            { id: 'st1', title: '1. Check Your Understanding' },
            { id: 'st2', title: '2. Topic Wise' },
            { id: 'st3', title: '3. JEE Mains Level' },
            { id: 'st4', title: '4. Bridge Level' },
            { id: 'st5', title: '5. JEE Advanced Level' },
            { id: 'st6', title: '6. PYQs' },
            { id: 'st7', title: '7. Challenger' },
            { id: 'st8', title: '8. Additional Questions' }
        ];

        let totalDoneAll = 0;
        let totalSumAll = 0;
        stages.forEach(st => {
            let sData = data[st.id] || { done: 0, total: 20 };
            totalDoneAll += Number(sData.done || 0);
            totalSumAll += Number(sData.total || 20);
        });

        let savedErrors = JSON.parse(localStorage.getItem('arjunaHUD_errorbook')) || [];
        let chapErrorsCount = savedErrors.filter(e => e.chap === chap.name).length;

        let html = `
            <div class="hud-card" style="margin-bottom: 12px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <div style="font-size: 0.85rem; font-weight: bold; color: #fff;">${chap.name}</div>
                    <div style="font-size: 0.72rem; color: var(--purple-glow); margin-top: 2px;">Total Solved: ${totalDoneAll} / ${totalSumAll} Qs</div>
                </div>
                <span style="font-size: 0.68rem; background: rgba(239,68,68,0.15); color: #ef4444; padding: 3px 8px; border-radius: 6px; border: 1.5px solid rgba(239,68,68,0.3); font-weight: bold;">Errors: ${chapErrorsCount}</span>
            </div>
        `;

        stages.forEach((st) => {
            let sData = data[st.id] || { done: 0, total: 20 };
            let doneVal = Number(sData.done) || 0;
            let totalVal = Number(sData.total) || 20;
            let left = Math.max(0, totalVal - doneVal);

            html += `
                <div class="hud-card" style="margin-bottom: 10px; padding: 10px 14px;">
                    <div style="font-size: 0.78rem; font-weight: bold; color: #fff; margin-bottom: 8px;">${st.title}</div>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: var(--text-sub);">
                        <span>Done: <input type="number" class="mini-input" style="width: 50px; display:inline-block; margin:0 4px;" value="${doneVal}" onchange="updatePracticeStageField('${key}', '${st.id}', 'done', this.value)"> / Total: <input type="number" class="mini-input" style="width: 50px; display:inline-block; margin:0 4px;" value="${totalVal}" onchange="updatePracticeStageField('${key}', '${st.id}', 'total', this.value)"></span>
                        <span style="color: var(--warning-color); font-weight: bold;">Left: ${left}</span>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }
    else if (tab === 'backlog') {
        const chapBacklogs = typeof backlogData !== 'undefined' ? backlogData.filter(b => b.chap && chap.name && (b.chap.toLowerCase().includes(chap.name.toLowerCase()) || chap.name.toLowerCase().includes(b.chap.toLowerCase()))) : [];
        let totalPendingBacklogs = chapBacklogs.reduce((sum, item) => sum + (parseInt(item.count) || 1), 0);

        let bHtml = `<div style="font-size: 0.8rem; font-weight: bold; color: #f43f5e; margin-bottom: 10px;">Total Pending Backlog Qty: ${totalPendingBacklogs}</div>`;
        if (chapBacklogs.length === 0) {
            bHtml += `<div class="hud-card" style="text-align:center; color:var(--text-sub); font-size:0.8rem;">Qty: 0 (No backlogs for this chapter)</div>`;
        } else {
            chapBacklogs.forEach(item => {
                bHtml += `
                    <div class="hud-card" style="margin-bottom: 10px; border-color: rgba(244, 63, 94, 0.4);">
                        <div style="font-size: 0.8rem; font-weight: bold; color: #fff; margin-bottom: 4px;">${item.task || 'Pending Task'}</div>
                        <div style="font-size: 0.72rem; color: var(--text-sub);">Quantity / Qty: <b style="color: var(--danger-color);">${item.count || 1}</b></div>
                    </div>
                `;
            });
        }
        container.innerHTML = bHtml;
    } 
    else if (tab === 'errors') {
        const savedErrors = JSON.parse(localStorage.getItem('arjunaHUD_errorbook')) || [];
        const chapErrors = savedErrors.filter(e => e.chap && chap.name && (e.chap.toLowerCase().includes(chap.name.toLowerCase()) || chap.name.toLowerCase().includes(e.chap.toLowerCase())));
        
        let errHtml = `<div style="font-size: 0.8rem; font-weight: bold; color: #ef4444; margin-bottom: 10px;">Error Book (${chapErrors.length} Errors Found):</div>`;
        if (chapErrors.length === 0) {
            errHtml += `<div class="hud-card" style="text-align:center; padding: 15px;"><div style="font-size: 0.8rem; color: var(--text-sub);">Qty: 0 Errors Found for this chapter</div></div>`;
        } else {
            chapErrors.forEach(err => {
                errHtml += `
                    <div class="hud-card" style="margin-bottom: 10px; border-color: rgba(239,68,68,0.4);">
                        <div style="font-size: 0.8rem; font-weight: bold; color: #fff; margin-bottom: 6px;">${err.desc || err.question || 'Error Question Description'}</div>
                        ${err.img ? `<div style="margin-bottom: 6px;"><img src="${err.img}" style="max-width:100%; max-height:150px; border-radius:6px; border:1px solid rgba(255,255,255,0.1);"></div>` : ''}
                        <div style="font-size: 0.7rem; color: var(--text-sub);">Level/Topic: <b style="color: var(--cyan-glow);">${err.level || 'General'}</b></div>
                    </div>
                `;
            });
        }
        container.innerHTML = errHtml;
    }
    else if (tab === 'heatmap') {
        const savedErrors = JSON.parse(localStorage.getItem('arjunaHUD_errorbook')) || [];
        const chapErrors = savedErrors.filter(e => e.chap === chap.name);
        let errorCount = chapErrors.length;
        let solvedCount = data.questionsDone || 0;
        
        let statusText = errorCount === 0 && solvedCount > 80 ? "Strong / Mastered" : (errorCount > 3 ? "Needs Revision (Weak)" : "Moderate Practice");
        let statusColor = errorCount === 0 && solvedCount > 80 ? "var(--success-color)" : (errorCount > 3 ? "#ef4444" : "var(--warning-color)");

        container.innerHTML = `
            <div class="hud-card" style="border-color: ${statusColor};">
                <div style="font-size: 0.75rem; color: var(--text-sub); margin-bottom: 4px;">WEAK TOPIC HEATMAP & ANALYTICS</div>
                <div style="font-size: 0.95rem; font-weight: bold; color: #fff; margin-bottom: 10px;">${chap.name}</div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(3,7,18,0.6); padding: 10px; border-radius: 8px; margin-bottom: 10px;">
                    <span style="font-size: 0.75rem; color: var(--text-sub);">Questions Solved:</span>
                    <span style="font-size: 0.85rem; font-weight: bold; color: var(--cyan-glow);">${solvedCount}</span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(3,7,18,0.6); padding: 10px; border-radius: 8px; margin-bottom: 10px;">
                    <span style="font-size: 0.75rem; color: var(--text-sub);">Logged Errors:</span>
                    <span style="font-size: 0.85rem; font-weight: bold; color: #ef4444;">${errorCount}</span>
                </div>

                <div style="text-align: center; padding: 8px; background: rgba(16,185,129,0.1); border-radius: 6px; font-size: 0.78rem; font-weight: bold; color: ${statusColor};">
                    Status: ${statusText}
                </div>
            </div>
        `;
    }
    else if (tab === 'revision') {
        const revKey = `rev_${currentActiveDeepSub}_${currentActiveDeepChapIdx}`;
        const revData = JSON.parse(localStorage.getItem('arjunaRevision_prog') || '{}')[revKey] || { r1: false, r3: false, r7: false };
        container.innerHTML = `
            <div class="hud-card">
                <div class="card-header-sm">SPACED REVISION TRACKER</div>
                <div class="school-stages" style="margin-top: 10px;">
                    <div class="stage-chip ${revData.r1 ? 'done' : ''}" onclick="toggleRevision('${revKey}', 'r1'); switchDeepTab('revision');">1st Day Rev</div>
                    <div class="stage-chip ${revData.r3 ? 'done' : ''}" onclick="toggleRevision('${revKey}', 'r3'); switchDeepTab('revision');">3rd Day Rev</div>
                    <div class="stage-chip ${revData.r7 ? 'done' : ''}" onclick="toggleRevision('${revKey}', 'r7'); switchDeepTab('revision');">7th Day Rev</div>
                </div>
            </div>
        `;
    }
    else if (tab === 'formulas') {
        const matchedFormulas = getAllFormulasCombined().filter(f => f.chapter.toLowerCase() === chap.name.toLowerCase() && f.sub === currentActiveDeepSub);
        let formHTML = '';
        if (matchedFormulas.length === 0) {
            formHTML = `<div style="font-size:0.75rem; color:var(--text-sub);">Is chapter ke liye koi custom formula saved nahi hai. Formulas section se add karein.</div>`;
        } else {
            matchedFormulas.forEach(f => {
                formHTML += `
                    <div style="background: rgba(3,7,18,0.5); padding: 10px; border-radius: 8px; margin-bottom: 8px; border: 1px solid rgba(255,255,255,0.06);">
                        <div style="font-family: monospace; font-size: 0.8rem; color: var(--cyan-glow); font-weight: bold; margin-bottom: 4px;">${f.formula}</div>
                        <div style="font-size: 0.72rem; color: var(--text-sub);">${f.example}</div>
                    </div>
                `;
            });
        }
        container.innerHTML = `
            <div class="hud-card">
                <div style="font-size: 0.8rem; font-weight: bold; color: var(--cyan-glow); margin-bottom: 12px;">CHAPTER FORMULAS (${chap.name})</div>
                ${formHTML}
            </div>
        `;
    }
        else if (tab === 'school') {
        const schoolKey = `sch_${currentActiveDeepSub}_${currentActiveDeepChapIdx}`;
        const schoolData = (typeof schoolProgress !== 'undefined' && schoolProgress[schoolKey]) ? schoolProgress[schoolKey] : { theory: false, notes: false, ncert: false };
        
        container.innerHTML = `
            <div class="hud-card" style="padding: 16px; margin-bottom: 12px;">
                <div style="font-size: 0.8rem; font-weight: bold; color: var(--purple-glow); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">School Work Checklist</div>
                <div class="school-stages" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                    <div class="stage-chip ${schoolData.theory ? 'done' : ''}" onclick="toggleSchoolStage('${schoolKey}', 'theory'); switchDeepTab('school');">1. THEORY</div>
                    <div class="stage-chip ${schoolData.notes ? 'done' : ''}" onclick="toggleSchoolStage('${schoolKey}', 'notes'); switchDeepTab('school');">2. NOTES</div>
                    <div class="stage-chip ${schoolData.ncert ? 'done' : ''}" onclick="toggleSchoolStage('${schoolKey}', 'ncert'); switchDeepTab('school');">3. NCERT</div>
                </div>
            </div>
        `;
    }
}

// --- Helper Functions for Lecture Cards & Auto-Sync with Upper Counter ---
window.addChapterLectureCard = function(subKey, chapIdx) {
    let title = prompt("Naye lecture ka naam darj karein:", `Lecture ${(JSON.parse(localStorage.getItem(`chapter_lectures_${subKey}_${chapIdx}`)) || []).length + 1}`);
    if (!title) return;

    const storageKey = `chapter_lectures_${subKey}_${chapIdx}`;
    let lectures = JSON.parse(localStorage.getItem(storageKey)) || [];

    lectures.push({
        id: Date.now(),
        title: title.trim(),
        completed: false,
        date: new Date().toISOString().split('T')[0],
        ldn: { l: false, n: false, d: false }
    });

    localStorage.setItem(storageKey, JSON.stringify(lectures));
    
    // Automatically update upper total lectures count
    syncUpperLectureTotalCount(subKey, chapIdx, lectures.length);

    if (typeof switchDeepTab === 'function') switchDeepTab('all');
};

window.toggleLectureLdn = function(subKey, chapIdx, lecId, type) {
    const storageKey = `chapter_lectures_${subKey}_${chapIdx}`;
    let lectures = JSON.parse(localStorage.getItem(storageKey)) || [];

    lectures = lectures.map(l => {
        if (l.id === lecId) {
            if (!l.ldn) l.ldn = { l: false, n: false, d: false };
            l.ldn[type] = !l.ldn[type];
            
            // Agar Teeno (L, N, D) on ho jayein toh automatically complete ho jaye
            if (l.ldn.l && l.ldn.n && l.ldn.d) {
                l.completed = true;
            } else {
                l.completed = false;
            }
        }
        return l;
    });

    localStorage.setItem(storageKey, JSON.stringify(lectures));
    syncUpperLectureDoneCount(subKey, chapIdx);
    if (typeof switchDeepTab === 'function') switchDeepTab('all');
};

window.toggleLectureComplete = function(subKey, chapIdx, lecId) {
    const storageKey = `chapter_lectures_${subKey}_${chapIdx}`;
    let lectures = JSON.parse(localStorage.getItem(storageKey)) || [];

    lectures = lectures.map(l => {
        if (l.id === lecId) {
            l.completed = !l.completed;
            if (l.completed) {
                l.ldn = { l: true, n: true, d: true };
            } else {
                l.ldn = { l: false, n: false, d: false };
            }
        }
        return l;
    });

    localStorage.setItem(storageKey, JSON.stringify(lectures));
    syncUpperLectureDoneCount(subKey, chapIdx);
    if (typeof switchDeepTab === 'function') switchDeepTab('all');
};

window.updateLectureDate = function(subKey, chapIdx, lecId, newDate) {
    const storageKey = `chapter_lectures_${subKey}_${chapIdx}`;
    let lectures = JSON.parse(localStorage.getItem(storageKey)) || [];

    lectures = lectures.map(l => {
        if (l.id === lecId) l.date = newDate;
        return l;
    });

    localStorage.setItem(storageKey, JSON.stringify(lectures));
};

window.deleteChapterLectureCard = function(subKey, chapIdx, lecId) {
    const storageKey = `chapter_lectures_${subKey}_${chapIdx}`;
    let lectures = JSON.parse(localStorage.getItem(storageKey)) || [];

    lectures = lectures.filter(l => l.id !== lecId);
    localStorage.setItem(storageKey, JSON.stringify(lectures));
    
    syncUpperLectureTotalCount(subKey, chapIdx, lectures.length);
    syncUpperLectureDoneCount(subKey, chapIdx);
    if (typeof switchDeepTab === 'function') switchDeepTab('all');
};

// Sync functions to automatically update the upper userProgress counts
window.syncUpperLectureTotalCount = function(subKey, chapIdx, newTotal) {
    const key = `${subKey}_${chapIdx}`;
    if (typeof userProgress === 'undefined') window.userProgress = JSON.parse(localStorage.getItem('arjunaHUD_prog_v4')) || {};
    if (!userProgress[key]) userProgress[key] = { totalLec: 10, doneLec: 0, totalDpp: 10, doneDpp: 0, questionsDone: 0 };
    
    userProgress[key].totalLec = newTotal;
    localStorage.setItem('arjunaHUD_prog_v4', JSON.stringify(userProgress));
    if (typeof recalculateSubjectGauges === 'function') recalculateSubjectGauges();
    if (typeof renderRoadmap === 'function') renderRoadmap();
};

window.updateCountsWithAutoCards = function(subKey, chapIdx, field, val) {
    const key = `${subKey}_${chapIdx}`;
    let newTotal = parseInt(val) || 0;

    if (!userProgress[key]) {
        userProgress[key] = { totalLec: 10, doneLec: 0, totalDpp: 10, doneDpp: 0, questionsDone: 0 };
    }
    userProgress[key][field] = newTotal;
    localStorage.setItem('arjunaHUD_prog_v4', JSON.stringify(userProgress));

    // Niche ke cards ko upper input value ke hisab se sync karo
    const storageKey = `chapter_lectures_${subKey}_${chapIdx}`;
    let lectures = JSON.parse(localStorage.getItem(storageKey)) || [];

    if (newTotal > lectures.length) {
        let diff = newTotal - lectures.length;
        let startNum = lectures.length + 1;
        for (let i = 0; i < diff; i++) {
            lectures.push({
                id: Date.now() + i,
                title: `Lecture ${startNum + i}`,
                completed: false,
                date: new Date().toISOString().split('T')[0],
                ldn: { l: false, n: false, d: false }
            });
        }
    } else if (newTotal < lectures.length && newTotal >= 0) {
        lectures = lectures.slice(0, newTotal);
    }

    localStorage.setItem(storageKey, JSON.stringify(lectures));

    if (typeof recalculateSubjectGauges === 'function') recalculateSubjectGauges();
    if (typeof switchDeepTab === 'function') switchDeepTab('all');
};

         

                    
function updatePracticeStageField(key, stageId, field, val) {
    if (!userProgress[key]) {
        userProgress[key] = {};
    }
    if (!userProgress[key][stageId]) {
        userProgress[key][stageId] = { done: 0, total: 20 };
    }
    userProgress[key][stageId][field] = Number(val) || 0;

    let totalDone = 0;
    ['st1', 'st2', 'st3', 'st4', 'st5', 'st6', 'st7', 'st8'].forEach(st => {
        if (userProgress[key][st]) {
            totalDone += Number(userProgress[key][st].done || 0);
        }
    });
    userProgress[key].questionsDone = totalDone;

    localStorage.setItem('arjunaHUD_prog_v4', JSON.stringify(userProgress));
    renderDeepChapterHeader();
    if (currentActiveDeepTab === 'practice') {
        switchDeepTab('practice');
    }
}

function renderRoadmap() {
    const container = document.getElementById('chaptersContainer');
    if (!container) return;
    container.innerHTML = '';
         
    syllabusData[currentSub].forEach((chap, idx) => {
        const key = `${currentSub}_${idx}`;
        const data = userProgress[key] || { 
            totalLec: 10, doneLec: 0, 
            totalDpp: 10, doneDpp: 0, 
            questionsDone: 0,
            theory: false, notes: false, shortNotes: false, topic: false, main: false, bridge: false, adv: false, pyq: false 
        };

        let completedStages = 0;
        ['theory', 'notes', 'shortNotes', 'topic', 'main', 'bridge', 'adv', 'pyq'].forEach(st => {
            if (data[st]) completedStages++;
        });
        let stageWeight = (completedStages / 8) * 30;
        let lecWeight = data.totalLec > 0 ? (Number(data.doneLec || 0) / Number(data.totalLec || 10)) * 25 : 0;
        let dppWeight = data.totalDpp > 0 ? (Number(data.doneDpp || 0) / Number(data.totalDpp || 10)) * 20 : 0;

        const revKey = `rev_${currentSub}_${idx}`;
        const revData = JSON.parse(localStorage.getItem('arjunaRevision_prog') || '{}')[revKey] || { r1: false, r3: false, r7: false };
        let revDoneCount = (revData.r1 ? 1 : 0) + (revData.r3 ? 1 : 0) + (revData.r7 ? 1 : 0);
        let revisionWeight = (revDoneCount / 3) * 15;

        const schoolKey = `sch_${currentSub}_${idx}`;
        const schoolData = (typeof schoolProgress !== 'undefined' && schoolProgress[schoolKey]) ? schoolProgress[schoolKey] : { theory: false, notes: false, ncert: false };
        let schoolDoneCount = (schoolData.theory ? 1 : 0) + (schoolData.notes ? 1 : 0) + (schoolData.ncert ? 1 : 0);
        let schoolWeight = (schoolDoneCount / 3) * 10;

        const savedErrors = JSON.parse(localStorage.getItem('arjunaHUD_errorbook')) || [];
        const chapErrorsCount = savedErrors.filter(e => e.chap && chap.name && (e.chap.toLowerCase().includes(chap.name.toLowerCase()) || chap.name.toLowerCase().includes(e.chap.toLowerCase()))).length;

        const chapBacklogs = typeof backlogData !== 'undefined' ? backlogData.filter(b => b.chap && chap.name && (b.chap.toLowerCase().includes(chap.name.toLowerCase()) || chap.name.toLowerCase().includes(b.chap.toLowerCase()))) : [];
        let totalBacklogQty = chapBacklogs.reduce((sum, item) => sum + (parseInt(item.count) || 1), 0);

        let totalMasteryScore = lecWeight + dppWeight + stageWeight + revisionWeight + schoolWeight;
        let masteryPercent = Math.min(Math.round(totalMasteryScore), 100);
        let isCompleted = masteryPercent === 100;

        const node = document.createElement('div');
        node.className = 'hud-card';
        node.style.cssText = "transition: all 0.3s ease; border-color: " + (isCompleted ? "var(--success-color)" : "var(--border-color)") + "; cursor: pointer; margin-bottom: 12px; padding: 14px 16px;";
        
        node.onclick = () => openChapterDeepView(currentSub, idx);

        node.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
                <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; flex-wrap: wrap;">
                        <span style="font-size: 0.65rem; background: rgba(0,240,255,0.15); color: var(--cyan-glow); padding: 2px 6px; border-radius: 4px; font-weight: bold;">CH - ${idx < 9 ? '0' + (idx + 1) : idx + 1}</span>
                        ${isCompleted ? '<span style="font-size: 0.65rem; background: rgba(16,185,129,0.2); color: var(--success-color); padding: 2px 6px; border-radius: 4px; font-weight: bold;">✔ Mastered</span>' : ''}
                        ${chapErrorsCount > 0 ? `<span style="font-size: 0.65rem; background: rgba(239,68,68,0.15); color: #ef4444; padding: 2px 6px; border-radius: 4px; font-weight: bold; display: flex; align-items: center; gap: 3px;"><i class="fas fa-exclamation-triangle"></i> ${chapErrorsCount}</span>` : ''}
                        ${totalBacklogQty > 0 ? `<span style="font-size: 0.65rem; background: rgba(244,63,94,0.15); color: #f43f5e; padding: 2px 6px; border-radius: 4px; font-weight: bold; display: flex; align-items: center; gap: 3px;"><i class="fas fa-clock"></i> ${totalBacklogQty}</span>` : ''}
                    </div>

                    <div class="chap-title" style="font-size: 0.92rem; font-weight: bold; color: #fff; margin-bottom: 8px; line-height: 1.3;">${chap.name}</div>
                    
                    <div style="font-size: 0.72rem; color: var(--text-sub); display: flex; flex-wrap: wrap; gap: 10px;">
                        <span>Lec: <b style="color:#fff;">${data.doneLec || 0}/${data.totalLec || 10}</b></span>
                        <span>DPP: <b style="color:#fff;">${data.doneDpp || 0}/${data.totalDpp || 10}</b></span>
                        <span>Qs: <b style="color:var(--cyan-glow);">${data.questionsDone || 0}</b></span>
                        <span>Rev: <b style="color:${revDoneCount > 0 ? 'var(--success-color)' : 'var(--text-sub)'};">${revDoneCount}/3</b></span>
                    </div>
                </div>

                <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0; padding-top: 4px;">
                    <button onclick="event.stopPropagation(); openChapterHeatmapDirect('${currentSub}', ${idx});" 
                            title="View Heatmap"
                            style="background: rgba(239, 68, 68, 0.15); border: 1.5px solid rgba(239, 68, 68, 0.4); color: #ef4444; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 0 8px rgba(239,68,68,0.2);">
                        <i class="fas fa-fire" style="font-size: 0.9rem;"></i>
                    </button>

                    <div style="width: 42px; height: 42px; border-radius: 50%; background: rgba(3,7,18,0.9); border: 2px solid ${masteryPercent > 80 ? 'var(--success-color)' : masteryPercent > 40 ? 'var(--cyan-glow)' : 'var(--warning-color)'}; display: flex; align-items: center; justify-content: center; font-size: 0.68rem; font-weight: bold; color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
                        ${masteryPercent}%
                    </div>
                    
                    <i class="fas fa-chevron-right" style="font-size: 0.75rem; color: var(--text-sub);"></i>
                </div>
            </div>
        `;
        container.appendChild(node);
    });
}

function updateCounts(key, field, val) {
    if (!userProgress[key]) {
        userProgress[key] = { totalLec: 10, doneLec: 0, totalDpp: 10, doneDpp: 0, questionsDone: 0 };
    }
    userProgress[key][field] = Number(val);
    localStorage.setItem('arjunaHUD_prog_v4', JSON.stringify(userProgress));
    recalculateSubjectGauges();
    updatePracticeProgressGauge();
}

function toggleStage(key, stage) {
    if (!userProgress[key]) userProgress[key] = { totalLec: 10, doneLec: 0, totalDpp: 10, doneDpp: 0, questionsDone: 0 };
    userProgress[key][stage] = !userProgress[key][stage];
    localStorage.setItem('arjunaHUD_prog_v4', JSON.stringify(userProgress));
    renderRoadmap();
    recalculateSubjectGauges();
}

function renderPracticeTracker() {
    const container = document.getElementById('practiceChaptersContainer');
    if (!container) return;
    container.innerHTML = '';
    syllabusData[currentPracticeSub].forEach((chap, idx) => {
        const key = `${currentPracticeSub}_${idx}`;
        const data = userProgress[key] || { questionsDone: 0 };
        const card = document.createElement('div');
        card.className = 'hud-card';
        card.innerHTML = `
            <div class="chap-title" style="font-size: 0.85rem; margin-bottom: 6px;">${chap.name}</div>
            <div style="font-size: 0.7rem; color: var(--text-sub); margin-bottom: 8px;">Topics: ${chap.topics}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(3, 7, 18, 0.4); padding: 8px 12px; border-radius: 8px;">
                <span style="font-size: 0.75rem; color: var(--cyan-glow); font-weight: 700;">Questions Solved:</span>
                <input type="number" class="mini-input" style="width: 70px;" value="${data.questionsDone || 0}" onchange="updateCounts('${key}', 'questionsDone', this.value); renderPracticeTracker();">
            </div>
        `;
        container.appendChild(card);
    });
    updatePracticeProgressGauge();
}

let gaugePracticeInst = null, gaugePhysPracticeInst = null, gaugeChemPracticeInst = null, gaugeMathPracticeInst = null;
function updatePracticeProgressGauge() {
    let physQ = 0, chemQ = 0, mathQ = 0;
    const targetPerSub = 500;
    const targetTotalQ = 1500;
    syllabusData['physics'].forEach((_, idx) => {
        const data = userProgress[`physics_${idx}`];
        if (data && data.questionsDone) physQ += Number(data.questionsDone);
    });
    syllabusData['chemistry'].forEach((_, idx) => {
        const data = userProgress[`chemistry_${idx}`];
        if (data && data.questionsDone) chemQ += Number(data.questionsDone);
    });
    syllabusData['maths'].forEach((_, idx) => {
        const data = userProgress[`maths_${idx}`];
        if (data && data.questionsDone) mathQ += Number(data.questionsDone);
    });
    let totalQ = physQ + chemQ + mathQ;
    let totalPercent = Math.min(Math.round((totalQ / targetTotalQ) * 100), 100);
    let physPercent = Math.min(Math.round((physQ / targetPerSub) * 100), 100);
    let chemPercent = Math.min(Math.round((chemQ / targetPerSub) * 100), 100);
    let mathPercent = Math.min(Math.round((mathQ / targetPerSub) * 100), 100);
    if (document.getElementById('practiceTotalPercent')) document.getElementById('practiceTotalPercent').innerText = totalQ + " Qs";
    if (document.getElementById('practicePhysicsPercent')) document.getElementById('practicePhysicsPercent').innerText = physPercent + "%";
    if (document.getElementById('practiceChemistryPercent')) document.getElementById('practiceChemistryPercent').innerText = chemPercent + "%";
    if (document.getElementById('practiceMathsPercent')) document.getElementById('practiceMathsPercent').innerText = mathPercent + "%";
    gaugePracticeInst = drawMiniGauge('gaugePracticeTotal', totalPercent, '#00f0ff', gaugePracticeInst);
    gaugePhysPracticeInst = drawMiniGauge('gaugePracticePhysics', physPercent, '#00f0ff', gaugePhysPracticeInst);
    gaugeChemPracticeInst = drawMiniGauge('gaugePracticeChemistry', chemPercent, '#a855f7', gaugeChemPracticeInst);
    gaugeMathPracticeInst = drawMiniGauge('gaugePracticeMaths', mathPercent, '#10b981', gaugeMathPracticeInst);
}
function renderErrorBookFromDB() {
    const container = document.getElementById('errorBookList');
    if (!container || !db) return;
    container.innerHTML = '';
    const tx = db.transaction(["errorBook"], "readonly");
    const store = tx.objectStore("errorBook");
    const getReq = store.getAll();
    getReq.onsuccess = function() {
        const errorData = getReq.result;
        if (errorData.length === 0) {
            container.innerHTML = '<div style="font-size:0.8rem; color:var(--text-sub);">Koi error/solution save nahi hai.</div>';
            return;
        }
        errorData.reverse().forEach((item) => {
            const card = document.createElement('div');
            card.className = 'error-item';
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between;">
                    <span style="font-size:0.7rem; color:var(--cyan-glow);">${item.sub || 'General'} ${item.chap || 'Chapter'}</span>
                    <span style="font-size:0.65rem; color:var(--text-sub);">${item.date}</span>
                </div>
                ${item.ques ? `<div class="error-title">${item.ques}</div>` : ''}
                ${item.mistake ? `<div style="font-size:0.75rem; color:#f59e0b; margin-top:4px;"><b>Galti:</b> ${item.mistake}</div>` : ''}
                ${item.solution ? `<div class="error-sol"><b>Solution:</b>\n${item.solution}</div>` : ''}
                ${item.image ? `<img src="${item.image}" class="saved-img" alt="Uploaded Image">` : ''}
                <button style="background:transparent; border:none; color:var(--danger-color); font-size:0.7rem; margin-top:8px; cursor:pointer;" onclick="deleteErrorDB(${item.id})">Delete</button>
            `;
            container.appendChild(card);
        });
    };
}

function deleteErrorDB(id) {
    if (!db) return;
    const tx = db.transaction(["errorBook"], "readwrite");
    tx.objectStore("errorBook").delete(id);
    tx.oncomplete = () => renderErrorBookFromDB();
}

function addTestAnalysisIndexedDB() {
    if (!db) return;
    const name = document.getElementById('test-name').value;
    const score = document.getElementById('test-score').value;
    const total = document.getElementById('test-total').value;
    const mistakes = document.getElementById('test-mistakes').value;
    if (!name || !score || !total) return alert('Please fill Test Name, Score, and Total Marks!');
    const percentage = ((score / total) * 100).toFixed(1);
    const testEntry = {
        id: Date.now(), name, score, total, percentage, mistakes,
        image: tempTestImg,
        date: new Date().toLocaleDateString('hi-IN')
    };
    const tx = db.transaction(["testLogs"], "readwrite");
    tx.objectStore("testLogs").add(testEntry);
    tx.oncomplete = function() {
        document.getElementById('test-name').value = '';
        document.getElementById('test-score').value = '';
        document.getElementById('test-total').value = '';
        document.getElementById('test-mistakes').value = '';
        const imgInput = document.getElementById('testImageInput');
        if (imgInput) imgInput.value = '';
        const preview = document.getElementById('testImgPreview');
        if (preview) preview.style.display = 'none';
        tempTestImg = "";
        renderTestLogsFromDB();
        alert("Test analysis save ho gaya hai!");
    };
}

function renderTestLogsFromDB() {
    const container = document.getElementById('test-history-list');
    if (!container || !db) return;
    const tx = db.transaction(["testLogs"], "readonly");
    const store = tx.objectStore("testLogs");
    const getReq = store.getAll();
    getReq.onsuccess = function() {
        const logs = getReq.result;
        if (logs.length === 0) {
            container.innerHTML = '<div style="font-size:0.8rem; color:var(--text-sub);">No test analysis recorded yet.</div>';
        } else {
            container.innerHTML = logs.reverse().map(test => `
                <div class="hud-card" style="margin-bottom: 10px; border-color: rgba(168, 85, 247, 0.4);">
                    <div style="display: flex; justify-content: space-between; align-items: center; font-weight: bold; font-size: 0.85rem;">
                        <span style="color: #fff;">${test.name} <small style="color: var(--text-sub); font-weight: normal;">(${test.date})</small></span>
                        <span style="color: ${test.percentage >= 60 ? 'var(--success-color)' : 'var(--danger-color)'};">${test.score}/${test.total} (${test.percentage}%)</span>
                    </div>
                    <div style="margin-top: 6px; color: var(--text-sub); font-size: 0.78rem;">
                        <strong>Analysis:</strong> ${test.mistakes || 'None provided'}
                    </div>
                    ${test.image ? `<img src="${test.image}" class="saved-img" alt="Test Screenshot">` : ''}
                    <button style="background:transparent; border:none; color:var(--danger-color); font-size:0.7rem; margin-top:8px; cursor:pointer;" onclick="deleteTestLogDB(${test.id})">Delete</button>
                </div>
            `).join('');
        }
        renderTestPerformanceGraph();
    };
}

function deleteTestLogDB(id) {
    if (!db) return;
    const tx = db.transaction(["testLogs"], "readwrite");
    tx.objectStore("testLogs").delete(id);
    tx.oncomplete = () => renderTestLogsFromDB();
}

let testChartInstance = null;
function renderTestPerformanceGraph() {
    if (!db) return;
    const tx = db.transaction(["testLogs"], "readonly");
    const store = tx.objectStore("testLogs");
    const getReq = store.getAll();
    getReq.onsuccess = function() {
        const logs = getReq.result;
        const canvasElem = document.getElementById('testPerformanceChart');
        if (!canvasElem) return;
        const ctx = canvasElem.getContext('2d');
        if (testChartInstance) testChartInstance.destroy();
        const sortedLogs = [...logs].reverse();
        const labels = sortedLogs.length ? sortedLogs.map(test => test.name) : ['No Tests'];
        const percentages = sortedLogs.length ? sortedLogs.map(test => Number(test.percentage)) : [0];
        testChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Test Percentage (%)',
                    data: percentages,
                    borderColor: '#00f0ff',
                    backgroundColor: 'rgba(0, 240, 255, 0.15)',
                    borderWidth: 2,
                    pointBackgroundColor: '#a855f7',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    };
}
/* ==========================================================================
   ARJUNA FINAL PERFECT TO-DO & DATE ENGINE (MATCHED WITH YOUR HTML)
   ========================================================================== */

function loadChaptersForQuickLog() {
    const subSelect = document.getElementById('quickSub');
    const chapSelect = document.getElementById('quickChapter');
    if (!chapSelect || !subSelect) return;
         
    const sub = subSelect.value || 'physics';
    chapSelect.innerHTML = '';
         
    if (typeof syllabusData !== 'undefined' && syllabusData[sub]) {
        syllabusData[sub].forEach((chap, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${idx + 1}. ${chap.name}`;
            chapSelect.appendChild(opt);
        });
    } else {
        const opt = document.createElement('option');
        opt.value = "";
        opt.textContent = "Chapters loading...";
        chapSelect.appendChild(opt);
    }
}

function getLocalDateString(d = new Date()) {
    let year = d.getFullYear();
    let month = String(d.getMonth() + 1).padStart(2, '0');
    let day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Get tasks for currently selected date or quickDate input
window.getTodoList = function() {
    let selectedDate = localStorage.getItem('arjuna_selected_date') || getLocalDateString();
    let tasksKey = `arjuna_tasks_${selectedDate}`;
    let tasks = JSON.parse(localStorage.getItem(tasksKey));
    
    if (!tasks || !Array.isArray(tasks)) {
        let globalTasks = JSON.parse(localStorage.getItem('arjunaHUD_tasks')) || JSON.parse(localStorage.getItem('arjunaHUD_todo')) || [];
        tasks = globalTasks.filter(t => t.date === selectedDate || (!t.date && selectedDate === getLocalDateString()));
        localStorage.setItem(tasksKey, JSON.stringify(tasks));
    }
    return tasks;
};

window.saveTodoList = function(tasks) {
    let selectedDate = localStorage.getItem('arjuna_selected_date') || getLocalDateString();
    let tasksKey = `arjuna_tasks_${selectedDate}`;
    localStorage.setItem(tasksKey, JSON.stringify(tasks));
    localStorage.setItem('arjunaHUD_tasks', JSON.stringify(tasks));
    localStorage.setItem('arjunaHUD_todo', JSON.stringify(tasks));
};

function syncLectureProgress(task, isIncrement) {
    if (!task) return;
    const subKey = (task.sub || 'physics').toLowerCase();
    if (typeof syllabusData === 'undefined' || !syllabusData[subKey]) return;

    let chapIdx = -1;
    syllabusData[subKey].forEach((c, idx) => {
        if (c.name.toLowerCase() === (task.chap || '').toLowerCase() || task.text.toLowerCase().includes(c.name.toLowerCase())) {
            chapIdx = idx;
        }
    });

    if (chapIdx !== -1) {
        if (typeof userProgress === 'undefined') window.userProgress = JSON.parse(localStorage.getItem('arjunaHUD_prog_v4')) || {};
        const progKey = `${subKey}_${chapIdx}`;
        if (!userProgress[progKey]) {
            userProgress[progKey] = { totalLec: 10, doneLec: 0, totalDpp: 10, doneDpp: 0, questionsDone: 0 };
        }
        
        let currentDone = parseInt(userProgress[progKey].doneLec) || 0;
        if (isIncrement) {
            userProgress[progKey].doneLec = currentDone + 1;
        } else {
            userProgress[progKey].doneLec = Math.max(0, currentDone - 1);
        }

        localStorage.setItem('arjunaHUD_prog_v4', JSON.stringify(userProgress));
        if (typeof recalculateSubjectGauges === 'function') recalculateSubjectGauges();
        if (typeof renderRoadmap === 'function') renderRoadmap();
    }
}

// Quick Lecture Adder (Matches your HTML ID: quickDate, quickSub, quickChapter, quickStartTime, quickEndTime)
window.logQuickLectureAsTodo = function() {
    const dateInput = document.getElementById('quickDate');
    const subSelect = document.getElementById('quickSub');
    const chapSelect = document.getElementById('quickChapter');
    const startTimeInput = document.getElementById('quickStartTime');
    const endTimeInput = document.getElementById('quickEndTime');

    let targetDate = dateInput && dateInput.value ? dateInput.value : (localStorage.getItem('arjuna_selected_date') || getLocalDateString());
    const sub = subSelect ? subSelect.value.toUpperCase() : 'PHYSICS';
    let chapIndex = chapSelect ? chapSelect.value : '';
    let chapName = "General Lecture";
    
    if (chapIndex !== "" && typeof syllabusData !== 'undefined' && syllabusData[sub.toLowerCase()]) {
        let ch = syllabusData[sub.toLowerCase()][parseInt(chapIndex)];
        if (ch) chapName = ch.name;
    }

    let startTime = startTimeInput && startTimeInput.value ? startTimeInput.value : '04:00 PM';
    let endTime = endTimeInput && endTimeInput.value ? endTimeInput.value : '06:00 PM';

    // Temporarily set selected date to target date for saving
    localStorage.setItem('arjuna_selected_date', targetDate);

    const tasks = window.getTodoList();
    tasks.unshift({
        id: Date.now(),
        date: targetDate,
        sub: sub,
        chap: chapName,
        text: `[Lecture] ${sub}: ${chapName}`,
        category: 'Lecture',
        time: `${startTime} - ${endTime}`,
        ldn: { l: false, d: false, n: false },
        completed: false
    });

    window.saveTodoList(tasks);
    window.renderTodoList();
    window.initArjunaDateScroller();
    alert(`Lecture added successfully for ${targetDate}!`);
};

// Custom Task Adder
window.addNewCustomTask = function() {
    const textInput = document.getElementById('taskInputText');
    const categorySelect = document.getElementById('taskCategorySelect');
    const startTimeInput = document.getElementById('taskStartTime');
    const endTimeInput = document.getElementById('taskEndTime');

    const text = textInput ? textInput.value.trim() : '';
    const category = categorySelect ? categorySelect.value : 'Other';

    if (!text) {
        alert("Kripya task ka naam likhein!");
        return;
    }

    let selectedDate = localStorage.getItem('arjuna_selected_date') || getLocalDateString();
    let startTime = startTimeInput && startTimeInput.value ? startTimeInput.value : '09:00 AM';
    let endTime = endTimeInput && endTimeInput.value ? endTimeInput.value : '11:00 AM';

    const tasks = window.getTodoList();
    tasks.unshift({
        id: Date.now(),
        date: selectedDate,
        sub: "PHYSICS",
        chap: text,
        text: text,
        category: category,
        time: `${startTime} - ${endTime}`,
        ldn: category === "Lecture" ? { l: false, d: false, n: false } : null,
        completed: false
    });

    window.saveTodoList(tasks);
    if (textInput) textInput.value = '';
    window.renderTodoList();
};

window.toggleLdnSubTask = function(taskId, subType) {
    let tasks = window.getTodoList();
    tasks = tasks.map(t => {
        if (t.id === taskId) {
            if (!t.ldn) t.ldn = { l: false, d: false, n: false };
            t.ldn[subType] = !t.ldn[subType];

            if (subType === 'l') {
                syncLectureProgress(t, t.ldn.l);
            }

            if (t.ldn.l && t.ldn.d && t.ldn.n && !t.completed) {
                t.completed = true;
                if (typeof window.addXp === 'function') window.addXp(20);
            } else if (!(t.ldn.l && t.ldn.d && t.ldn.n) && t.completed) {
                t.completed = false;
                if (subType === 'l') syncLectureProgress(t, false);
            }
        }
        return t;
    });

    window.saveTodoList(tasks);
    window.renderTodoList();
};

window.toggleTaskComplete = function(taskId) {
    let tasks = window.getTodoList();
    tasks = tasks.map(t => {
        if (t.id === taskId) {
            t.completed = !t.completed;
            t.done = t.completed;
            
            if (t.completed) {
                if (t.ldn) { t.ldn.l = true; t.ldn.d = true; t.ldn.n = true; }
                syncLectureProgress(t, true);
                if (typeof window.addXp === 'function') {
                    window.addXp(15);
                }
            } else {
                if (t.ldn) { t.ldn.l = false; t.ldn.d = false; t.ldn.n = false; }
                syncLectureProgress(t, false);
            }
        }
        return t;
    });

    window.saveTodoList(tasks);
    window.renderTodoList();
};

window.deleteTask = function(taskId) {
    let selectedDate = localStorage.getItem('arjuna_selected_date') || getLocalDateString();
    let todayStr = getLocalDateString();
    
    if (selectedDate < todayStr) {
        alert("Purane dinon ke tasks delete nahi kiye ja sakte!");
        return;
    }

    let tasks = window.getTodoList();
    tasks = tasks.filter(t => t.id !== taskId);
    window.saveTodoList(tasks);
    window.renderTodoList();
};

window.shiftTaskToTomorrow = function(taskId) {
    let currentSelectedDate = localStorage.getItem('arjuna_selected_date') || getLocalDateString();
    let currentTasks = window.getTodoList();
    
    let taskToMove = currentTasks.find(t => t.id === taskId);
    if (!taskToMove) return;

    let updatedCurrentTasks = currentTasks.filter(t => t.id !== taskId);
    window.saveTodoList(updatedCurrentTasks);

    let [y, m, day] = currentSelectedDate.split('-').map(Number);
    let d = new Date(y, m - 1, day + 1);
    let tomorrowStr = getLocalDateString(d);

    let tomorrowKey = `arjuna_tasks_${tomorrowStr}`;
    let tomorrowTasks = JSON.parse(localStorage.getItem(tomorrowKey)) || [];
    
    taskToMove.date = tomorrowStr;
    tomorrowTasks.unshift(taskToMove);
    localStorage.setItem(tomorrowKey, JSON.stringify(tomorrowTasks));

    alert(`Task successfully shifted to tomorrow (${tomorrowStr})!`);
    window.renderTodoList();
};

// Render To-Do List matching your exact HTML element IDs (`todoListContainer`, `todoProgressText`, `todoTaskCountText`, `todoLineProgressBar`)
window.renderTodoList = function() {
    const container = document.getElementById('todoListContainer');
    const progressText = document.getElementById('todoProgressText');
    const taskCountText = document.getElementById('todoTaskCountText');
    const lineProgressBar = document.getElementById('todoLineProgressBar');
    
    let tasks = window.getTodoList();
    let selectedDate = localStorage.getItem('arjuna_selected_date') || getLocalDateString();
    let todayStr = getLocalDateString();
    let isPastDate = selectedDate < todayStr;
    
    let completedCount = tasks.filter(t => t.completed || t.done).length;
    let totalCount = tasks.length;
    let tasksLeft = totalCount - completedCount;
    let percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // Update Progress Text and Counts in your HTML Card
    if (progressText) progressText.textContent = `${percent}% Completed (${tasksLeft} Tasks Left)`;
    if (taskCountText) taskCountText.textContent = `${tasksLeft} Tasks Left`;
    if (lineProgressBar) lineProgressBar.style.width = `${percent}%`;

    // Update Top Card Title dynamically (Today's Study Goals vs Study Goals for Date)
    const topTitleElem = document.querySelector('.hud-card div[style*="TODAY"]');
    if (topTitleElem) {
        if (selectedDate === todayStr) {
            topTitleElem.textContent = "TODAY'S STUDY GOALS";
        } else {
            topTitleElem.textContent = `STUDY GOALS (${selectedDate})`;
        }
    }

    if (!container) return;

    container.innerHTML = '';

    if (tasks.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-sub); font-size: 0.75rem; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1);">Is din (${selectedDate}) ke liye koi task nahi hai.</div>`;
        return;
    }

    tasks.forEach(task => {
        const card = document.createElement('div');
        let catColor = "#00f0ff";
        if (task.category === "Spaced Revision") catColor = "#f59e0b";
        if (task.category === "Backlog") catColor = "#ef4444";
        if (task.category === "Other") catColor = "#10b981";

        const isDone = task.completed || task.done;

        card.style.cssText = `
            background: rgba(13, 20, 38, 0.55);
            backdrop-filter: blur(12px);
            border: 1px solid ${isDone ? 'rgba(16, 185, 129, 0.4)' : 'rgba(0, 240, 255, 0.25)'};
            border-radius: 14px;
            padding: 14px;
            margin-bottom: 12px;
            box-sizing: border-box;
            width: 100%;
        `;

        let ldnHtml = '';
        if (task.ldn || task.category === 'Lecture') {
            const ldn = task.ldn || { l: false, d: false, n: false };
            ldnHtml = `
                <div style="display: flex; gap: 8px; margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.06); align-items: center; justify-content: space-between;">
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <span style="font-size: 0.7rem; color: var(--text-sub); font-weight: bold;">Steps:</span>
                        <div onclick="toggleLdnSubTask(${task.id}, 'l')" style="width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: bold; cursor: pointer; background: ${ldn.l ? '#10b981' : 'rgba(3,7,18,0.7)'}; color: ${ldn.l ? '#000' : '#fff'}; border: 1.5px solid ${ldn.l ? '#10b981' : 'rgba(255,255,255,0.25)'};" title="Lecture">L</div>
                        <div onclick="toggleLdnSubTask(${task.id}, 'd')" style="width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: bold; cursor: pointer; background: ${ldn.d ? '#10b981' : 'rgba(3,7,18,0.7)'}; color: ${ldn.d ? '#000' : '#fff'}; border: 1.5px solid ${ldn.d ? '#10b981' : 'rgba(255,255,255,0.25)'};" title="DPP">D</div>
                        <div onclick="toggleLdnSubTask(${task.id}, 'n')" style="width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: bold; cursor: pointer; background: ${ldn.n ? '#10b981' : 'rgba(3,7,18,0.7)'}; color: ${ldn.n ? '#000' : '#fff'}; border: 1.5px solid ${ldn.n ? '#10b981' : 'rgba(255,255,255,0.25)'};" title="Notes">N</div>
                    </div>
                    <div style="font-size: 0.7rem; color: var(--text-sub);">
                        Status: <b style="color: ${isDone ? '#10b981' : '#f59e0b'};">${isDone ? 'Done' : 'Pending'}</b>
                    </div>
                </div>
            `;
        }

        let deleteBtnHtml = !isPastDate ? `<button onclick="deleteTask(${task.id})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 0.95rem; padding: 2px 6px;" title="Delete Task">🗑️</button>` : '';
        let shiftBtnHtml = !isDone ? `<button onclick="shiftTaskToTomorrow(${task.id})" style="background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; color: #f59e0b; font-size: 0.65rem; padding: 3px 6px; border-radius: 4px; cursor: pointer;" title="Shift to next day">⏩ Shift</button>` : '';

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="display: flex; align-items: flex-start; gap: 10px; flex: 1; overflow: hidden;">
                    <input type="checkbox" ${isDone ? 'checked' : ''} onclick="toggleTaskComplete(${task.id})" style="cursor: pointer; width: 18px; height: 18px; margin-top: 3px; accent-color: var(--cyan-glow);">
                    <div style="overflow: hidden; flex: 1;">
                        <div style="font-size: 0.88rem; font-weight: bold; color: ${isDone ? '#9ca3af' : '#fff'}; text-decoration: ${isDone ? 'line-through' : 'none'}; word-break: break-word;">
                            ${task.text}
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px; flex-wrap: wrap;">
                            <span style="font-size: 0.62rem; background: rgba(0, 240, 255, 0.12); color: ${catColor}; border: 1px solid rgba(0, 240, 255, 0.25); padding: 2px 8px; border-radius: 6px; font-weight: bold;">
                                ${task.category || 'Lecture'}
                            </span>
                            <span style="font-size: 0.65rem; color: #f59e0b; background: rgba(245, 158, 11, 0.1); padding: 2px 6px; border-radius: 4px;">
                                ⏰ ${task.time || 'All Day'}
                            </span>
                            <span style="font-size: 0.65rem; color: #9ca3af; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">
                                📅 ${task.date || selectedDate}
                            </span>
                            ${shiftBtnHtml}
                            ${isDone ? '<span style="font-size: 0.62rem; color: #10b981; font-weight: bold;">✔ Completed</span>' : ''}
                        </div>
                    </div>
                </div>
                ${deleteBtnHtml}
            </div>
            ${ldnHtml}
        `;
        container.appendChild(card);
    });
};


window.initArjunaDateScroller = function() {
    let container = document.getElementById('arjunaDateScrollerContainer');
    
    if (!container) {
        container = document.createElement('div');
        container.id = 'arjunaDateScrollerContainer';
        container.style.cssText = 'background: rgba(10, 15, 30, 0.95); border: 1px solid var(--cyan-glow); border-radius: 12px; padding: 12px; margin-bottom: 15px; color: #fff; font-family: sans-serif;';
        
        let targetArea = document.getElementById('todoListContainer') || document.body;
        targetArea.parentNode.insertBefore(container, targetArea);
    }

    let todayStr = getLocalDateString();
    let storedYearMonth = localStorage.getItem('arjuna_selected_year_month') || `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
    let [targetYear, targetMonth] = storedYearMonth.split('-').map(Number);

    let activeDate = localStorage.getItem('arjuna_selected_date') || todayStr;

    let daysInMonth = new Date(targetYear, targetMonth, 0).getDate();
    let datesHTML = '';
    let options = { month: 'short', day: 'numeric', weekday: 'short' };

    for (let day = 1; day <= daysInMonth; day++) {
        let d = new Date(targetYear, targetMonth - 1, day);
        let dateString = getLocalDateString(d);
        let displayStr = d.toLocaleDateString('en-IN', options);
        
        let isSelected = (dateString === activeDate);
        let selectionStyle = isSelected 
            ? 'border: 2px solid #00f0ff; background: rgba(0,240,255,0.25); box-shadow: 0 0 10px rgba(0,240,255,0.4);' 
            : 'background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);';

        datesHTML += `
            <div onclick="window.loadActivityForDate('${dateString}')" style="min-width: 85px; padding: 8px; text-align: center; border-radius: 8px; cursor: pointer; ${selectionStyle} font-size: 0.72rem; transition: 0.2s;">
                <div style="font-weight: bold; color: ${isSelected ? '#00f0ff' : '#9ca3af'};">${displayStr.split(',')[0]}</div>
                <div style="font-size: 0.8rem; margin-top: 2px; color: #fff;">${displayStr.split(',')[1]}</div>
            </div>
        `;
    }

    let monthsList = [
        {val: '2026-01', name: 'January 2026'}, {val: '2026-02', name: 'February 2026'},
        {val: '2026-03', name: 'March 2026'}, {val: '2026-04', name: 'April 2026'},
        {val: '2026-05', name: 'May 2026'}, {val: '2026-06', name: 'June 2026'},
        {val: '2026-07', name: 'July 2026'}, {val: '2026-08', name: 'August 2026'},
        {val: '2026-09', name: 'September 2026'}, {val: '2026-10', name: 'October 2026'},
        {val: '2026-11', name: 'November 2026'}, {val: '2026-12', name: 'December 2026'}
    ];

    let monthOptionsHTML = monthsList.map(m => `<option value="${m.val}" ${m.val === storedYearMonth ? 'selected' : ''}>${m.name}</option>`).join('');

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 0.85rem; font-weight: bold; color: var(--cyan-glow);"><i class="fas fa-calendar-alt"></i> History & Activity Log</span>
            <select id="arjunaMonthSelector" onchange="window.changeArjunaMonth(this.value)" style="background: rgba(0,0,0,0.7); border: 1px solid var(--cyan-glow); color: #00f0ff; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px; outline: none; cursor: pointer;">
                ${monthOptionsHTML}
            </select>
        </div>
        <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 5px; scrollbar-width: thin;">
            ${datesHTML}
        </div>
    `;
};

window.changeArjunaMonth = function(yearMonthStr) {
    localStorage.setItem('arjuna_selected_year_month', yearMonthStr);
    localStorage.setItem('arjuna_selected_date', `${yearMonthStr}-01`);
    window.initArjunaDateScroller();
    window.renderTodoList();
};

window.loadActivityForDate = function(dateStr, reRender = true) {
    localStorage.setItem('arjuna_selected_date', dateStr);
    
    if (reRender) {
        window.initArjunaDateScroller();
    }

    let todayStr = getLocalDateString();
    let isToday = (dateStr === todayStr);

    let allCards = document.querySelectorAll('.hud-card');
    allCards.forEach(card => {
        if (card.innerHTML.includes('CUSTOM TASK & CATEGORY ADDER') || card.innerHTML.includes('QUICK LECTURE TO-DO & TASK ADDER')) {
            card.style.display = isToday ? 'block' : 'none';
        }
    });

    window.renderTodoList();
};

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (typeof loadChaptersForQuickLog === 'function') loadChaptersForQuickLog();
        window.initArjunaDateScroller();
        window.renderTodoList();
    }, 400);
});

function renderSchoolTracker() {
    const container = document.getElementById('schoolChaptersContainer');
    if (!container) return;
    container.innerHTML = '';
    syllabusData[currentSchoolSub].forEach((chap, idx) => {
        const key = `sch_${currentSchoolSub}_${idx}`;
        const data = schoolProgress[key] || { theory: false, notes: false, ncert: false };
        const node = document.createElement('div');
        node.className = 'hud-card';
        node.innerHTML = `
            <div class="chap-title" style="margin-bottom:8px;">${chap.name}</div>
            <div class="school-stages">
                <div class="stage-chip ${data.theory ? 'done' : ''}" onclick="toggleSchoolStage('${key}', 'theory')">1. Theory</div>
                <div class="stage-chip ${data.notes ? 'done' : ''}" onclick="toggleSchoolStage('${key}', 'notes')">2. Notes</div>
                <div class="stage-chip ${data.ncert ? 'done' : ''}" onclick="toggleSchoolStage('${key}', 'ncert')">3. NCERT</div>
            </div>
        `;
        container.appendChild(node);
    });
}

function toggleSchoolStage(key, stage) {
    if (!schoolProgress[key]) schoolProgress[key] = { theory: false, notes: false, ncert: false };
    schoolProgress[key][stage] = !schoolProgress[key][stage];
    localStorage.setItem('arjunaSchool_prog', JSON.stringify(schoolProgress));
    renderSchoolTracker();
}

function loadChaptersForBacklog() {
    const subSelect = document.getElementById('backlogSubSelect');
    const chapSelect = document.getElementById('backlogChapSelect');
    if (!chapSelect || !subSelect) return;
         
    const sub = subSelect.value || 'physics';
    chapSelect.innerHTML = '';
         
    if (typeof syllabusData !== 'undefined' && syllabusData[sub]) {
        syllabusData[sub].forEach((chap, idx) => {
            const opt = document.createElement('option');
            opt.value = chap.name;
            opt.textContent = `${idx + 1}. ${chap.name}`;
            chapSelect.appendChild(opt);
        });
    }
}

function toggleBacklogForm() {
    const formCard = document.getElementById('backlogInputFormCard');
    if (formCard) {
        if (formCard.style.display === 'none' || formCard.style.display === '') {
            formCard.style.display = 'block';
        } else {
            formCard.style.display = 'none';
        }
    }
}

function saveQuickBacklogItem() {
    const sub = document.getElementById('backlogSubSelect')?.value || 'physics';
    const chapSelect = document.getElementById('backlogChapSelect');
    const chapName = chapSelect?.options[chapSelect.selectedIndex]?.text || "General Chapter";
    const taskDesc = document.getElementById('backlogTaskInput')?.value.trim() || "Pending Tasks";
    const taskCount = parseInt(document.getElementById('backlogCountInput')?.value) || 1;
         
    if (!chapName) return alert("Kripya chapter select karein!");
         
    backlogData.unshift({ 
        id: Date.now(), 
        sub: sub.toUpperCase(), 
        chap: chapName, 
        task: `${taskDesc} (Qty: ${taskCount})`, 
        level: 'JEE Main',
        count: taskCount,
        status: 'pending',
        lecDone: false,
        notesDone: false,
        dppDone: false
    });
         
    localStorage.setItem('arjunaHUD_backlog', JSON.stringify(backlogData));
    if(document.getElementById('backlogTaskInput')) document.getElementById('backlogTaskInput').value = '';
    if(document.getElementById('backlogCountInput')) document.getElementById('backlogCountInput').value = '1';
    
    const formCard = document.getElementById('backlogInputFormCard');
    if (formCard) formCard.style.display = 'none';

    renderBacklog();
    alert("Backlog successfully add ho gaya hai!");
}

function toggleBacklogStatus(id) {
    backlogData = backlogData.map(item => {
        if (item.id === id) item.status = item.status === 'done' ? 'pending' : 'done';
        return item;
    });
    localStorage.setItem('arjunaHUD_backlog', JSON.stringify(backlogData));
    renderBacklog();
}

function deleteBacklogItem(id) {
    backlogData = backlogData.filter(item => item.id !== id);
    localStorage.setItem('arjunaHUD_backlog', JSON.stringify(backlogData));
    renderBacklog();
}

let currentBacklogFilterSub = 'ALL';

function filterBacklogBySub(sub) {
    currentBacklogFilterSub = sub;
    document.querySelectorAll('#view-backlog .sub-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-backlog-${sub.toLowerCase()}`);
    if (activeBtn) activeBtn.classList.add('active');
    renderBacklog();
}

function toggleBacklogSubTracker(id, field) {
    let item = backlogData.find(b => b.id == id);
    if (item) {
        item[field] = !item[field];
        localStorage.setItem('arjunaHUD_backlog', JSON.stringify(backlogData));
        renderBacklog();
    }
}

function addBacklogToTodo(id) {
    let item = backlogData.find(b => b.id == id);
    if (!item) return;

    let tasks = window.getTodoList();
    const newTask = {
        id: Date.now(),
        text: `[Backlog] ${item.sub}: ${item.chap} - ${item.task}`,
        category: "Lecture",
        completed: false
    };

    tasks.unshift(newTask);
    localStorage.setItem('arjunaHUD_tasks', JSON.stringify(tasks));
    localStorage.setItem('arjunaHUD_todo', JSON.stringify(tasks));

    alert("Backlog task successfully 'To-Do' list me add ho gaya hai!");
    if (typeof renderTodoList === 'function') renderTodoList();
}
function renderBacklog() {
    const container = document.getElementById('backlogContainer');
    const summaryContainer = document.getElementById('backlogSummaryContainer');
    const totalCountHUD = document.getElementById('totalBacklogCountHUD');
         
    let counts = { PHYSICS: 0, CHEMISTRY: 0, MATHS: 0 };
    let totalPendingQty = 0;
    
    let pendingLectures = 0;
    let pendingNotes = 0;
    let pendingDPPs = 0;

    backlogData.forEach(item => {
        if (item.status === 'pending') {
            const s = (item.sub || '').toUpperCase();
            let qNum = Number(item.count) || 1;
            
            if (counts[s] !== undefined) {
                counts[s] += qNum;
            }
            totalPendingQty += qNum;

            if (!item.lecDone) pendingLectures += qNum;
            if (!item.notesDone) pendingNotes += qNum;
            if (!item.dppDone) pendingDPPs += qNum;
        }
    });

    if (totalCountHUD) {
        totalCountHUD.innerText = `${totalPendingQty} Items`;
    }

    if (summaryContainer) {
        summaryContainer.style.cssText = "width: 100% !important; display: block !important; box-sizing: border-box !important; margin-bottom: 12px;";
        
        summaryContainer.innerHTML = `
            <div style="width: 100%; display: flex; flex-direction: column; gap: 8px; box-sizing: border-box;">
                <div style="display: flex; width: 100%; gap: 6px; box-sizing: border-box;">
                    <div style="flex: 1; background: rgba(0, 240, 255, 0.08); padding: 8px 4px; border-radius: 8px; border: 1px solid rgba(0, 240, 255, 0.25); text-align: center;">
                        <div style="font-size: 0.6rem; color: var(--text-sub); font-weight: bold; text-transform: uppercase; white-space: nowrap;">PHYSICS</div>
                        <div style="font-size: 0.85rem; font-weight: 800; color: var(--cyan-glow); margin-top: 2px;">${counts.PHYSICS} Qty</div>
                    </div>
                    <div style="flex: 1; background: rgba(168, 85, 247, 0.08); padding: 8px 4px; border-radius: 8px; border: 1px solid rgba(168, 85, 247, 0.25); text-align: center;">
                        <div style="font-size: 0.6rem; color: var(--text-sub); font-weight: bold; text-transform: uppercase; white-space: nowrap;">CHEMISTRY</div>
                        <div style="font-size: 0.85rem; font-weight: 800; color: var(--purple-glow); margin-top: 2px;">${counts.CHEMISTRY} Qty</div>
                    </div>
                    <div style="flex: 1; background: rgba(16, 185, 129, 0.08); padding: 8px 4px; border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.25); text-align: center;">
                        <div style="font-size: 0.6rem; color: var(--text-sub); font-weight: bold; text-transform: uppercase; white-space: nowrap;">MATHS</div>
                        <div style="font-size: 0.85rem; font-weight: 800; color: var(--success-color); margin-top: 2px;">${counts.MATHS} Qty</div>
                    </div>
                </div>

                <div style="display: flex; width: 100%; gap: 6px; box-sizing: border-box;">
                    <div style="flex: 1; background: rgba(239, 68, 68, 0.08); padding: 8px 4px; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.25); text-align: center;">
                        <div style="font-size: 0.58rem; color: var(--danger-color); font-weight: bold; text-transform: uppercase; white-space: nowrap;">LEC PENDING</div>
                        <div style="font-size: 0.85rem; font-weight: 800; color: #f87171; margin-top: 2px;">${pendingLectures}</div>
                    </div>
                    <div style="flex: 1; background: rgba(245, 158, 11, 0.08); padding: 8px 4px; border-radius: 8px; border: 1px solid rgba(245, 158, 11, 0.25); text-align: center;">
                        <div style="font-size: 0.58rem; color: #f59e0b; font-weight: bold; text-transform: uppercase; white-space: nowrap;">NOTES PENDING</div>
                        <div style="font-size: 0.85rem; font-weight: 800; color: #fbbf24; margin-top: 2px;">${pendingNotes}</div>
                    </div>
                    <div style="flex: 1; background: rgba(168, 85, 247, 0.08); padding: 8px 4px; border-radius: 8px; border: 1px solid rgba(168, 85, 247, 0.25); text-align: center;">
                        <div style="font-size: 0.58rem; color: var(--purple-glow); font-weight: bold; text-transform: uppercase; white-space: nowrap;">DPP PENDING</div>
                        <div style="font-size: 0.85rem; font-weight: 800; color: #c084fc; margin-top: 2px;">${pendingDPPs}</div>
                    </div>
                </div>
            </div>
        `;
    }

    if (!container) return;
    container.innerHTML = '';

    let filtered = backlogData;
    if (currentBacklogFilterSub !== 'ALL') {
        filtered = backlogData.filter(b => (b.sub || '').toUpperCase() === currentBacklogFilterSub);
    }
         
    if (filtered.length === 0) {
        container.innerHTML = '<div style="font-size:0.75rem; color:var(--text-sub); text-align:center; padding:20px;">Koi backlog pending nahi hai!</div>';
        return;
    }
         
    filtered.forEach(item => {
        const isDone = item.status === 'done';
        const card = document.createElement('div');
        card.className = 'akiva-backlog-card';
        if (isDone) card.style.opacity = '0.5';

        card.innerHTML = `
            <div class="akiva-card-top" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                    <div class="akiva-chap-title" style="font-size: 0.85rem; font-weight: bold; color: #fff; ${isDone ? 'text-decoration: line-through;' : ''}">${item.chap}</div>
                    <div class="akiva-sub-path" style="font-size: 0.7rem; color: var(--text-sub);">${item.task || 'Lecture & DPP'} • <b style="color:var(--cyan-glow);">${item.sub}</b></div>
                </div>
                <button class="btn-add-today" onclick="addBacklogToTodo(${item.id})" style="background: rgba(0,240,255,0.15); border: 1px solid var(--cyan-glow); color: var(--cyan-glow); padding: 3px 8px; border-radius: 6px; font-size: 0.68rem; cursor: pointer;">+ Today</button>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.05);">
                <div class="akiva-tracker-group" style="display: flex; gap: 8px;">
                    <div class="akiva-circle-node ${item.lecDone ? 'active-l' : ''}" onclick="toggleBacklogSubTracker(${item.id}, 'lecDone')" title="Lecture" style="width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: bold; cursor: pointer; background: ${item.lecDone ? 'rgba(0, 240, 255, 0.25)' : 'rgba(3,7,18,0.8)'}; border: 1px solid ${item.lecDone ? 'var(--cyan-glow)' : 'rgba(255,255,255,0.2)'}; color: ${item.lecDone ? 'var(--cyan-glow)' : 'var(--text-sub)'};">L</div>
                    
                    <div class="akiva-circle-node ${item.notesDone ? 'active-n' : ''}" onclick="toggleBacklogSubTracker(${item.id}, 'notesDone')" title="Notes" style="width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: bold; cursor: pointer; background: ${item.notesDone ? 'rgba(245, 158, 11, 0.25)' : 'rgba(3,7,18,0.8)'}; border: 1px solid ${item.notesDone ? '#f59e0b' : 'rgba(255,255,255,0.2)'}; color: ${item.notesDone ? '#f59e0b' : 'var(--text-sub)'};">N</div>
                    
                    <div class="akiva-circle-node ${item.dppDone ? 'active-p' : ''}" onclick="toggleBacklogSubTracker(${item.id}, 'dppDone')" title="DPP" style="width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: bold; cursor: pointer; background: ${item.dppDone ? 'rgba(168, 85, 247, 0.25)' : 'rgba(3,7,18,0.8)'}; border: 1px solid ${item.dppDone ? 'var(--purple-glow)' : 'rgba(255,255,255,0.2)'}; color: ${item.dppDone ? 'var(--purple-glow)' : 'var(--text-sub)'};">D</div>
                </div>

                <div style="display: flex; gap: 8px; align-items: center;">
                    <span class="akiva-level-badge" style="font-size: 0.7rem; color: var(--text-sub);">Qty: ${item.count || 1}</span>
                    <button style="background:transparent; border:none; color:var(--danger-color); font-size:0.75rem; cursor:pointer;" onclick="deleteBacklogItem(${item.id})">🗑️</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderRevisionChapters() {
    const container = document.getElementById('revisionChaptersContainer');
    if (!container) return;
    container.innerHTML = '';
    syllabusData[currentRevisionSubject].forEach((chap, idx) => {
        const key = `rev_${currentRevisionSubject}_${idx}`;
        const revData = JSON.parse(localStorage.getItem('arjunaRevision_prog') || '{}')[key] || { r1: false, r3: false, r7: false };
        const card = document.createElement('div');
        card.className = 'hud-card';
        card.innerHTML = `
            <div class="chap-title" style="margin-bottom:8px;">${chap.name}</div>
            <div class="school-stages">
                <div class="stage-chip ${revData.r1 ? 'done' : ''}" onclick="toggleRevision('${key}', 'r1')">1st Day Rev</div>
                <div class="stage-chip ${revData.r3 ? 'done' : ''}" onclick="toggleRevision('${key}', 'r3')">3rd Day Rev</div>
                <div class="stage-chip ${revData.r7 ? 'done' : ''}" onclick="toggleRevision('${key}', 'r7')">7th Day Rev</div>
            </div>
        `;
        container.appendChild(card);
    });
}

function toggleRevision(key, stage) {
    const allRev = JSON.parse(localStorage.getItem('arjunaRevision_prog') || '{}');
    if (!allRev[key]) allRev[key] = { r1: false, r3: false, r7: false };
    allRev[key][stage] = !allRev[key][stage];
    localStorage.setItem('arjunaRevision_prog', JSON.stringify(allRev));
    renderRevisionChapters();
}

function loadChaptersForErrorBook() {
    const subSelect = document.getElementById('errorSubSelect');
    const chapSelect = document.getElementById('errorChapSelect');
    const filterSelect = document.getElementById('filterChapSelect');
         
    if (!chapSelect || !subSelect) return;
         
    const sub = subSelect.value || 'physics';
    chapSelect.innerHTML = '';
    if (filterSelect) filterSelect.innerHTML = '<option value="ALL">-- Show All Chapters --</option>';
         
    if (typeof syllabusData !== 'undefined' && syllabusData[sub]) {
        syllabusData[sub].forEach((chap, idx) => {
            const optText = `${idx + 1}. ${chap.name}`;
            const opt1 = document.createElement('option');
            opt1.value = chap.name;
            opt1.textContent = optText;
            chapSelect.appendChild(opt1);
            if (filterSelect) {
                const opt2 = document.createElement('option');
                opt2.value = chap.name;
                opt2.textContent = optText;
                filterSelect.appendChild(opt2);
            }
        });
    }
}

window.saveQuickErrorItemWithImage = function() {
    const sub = document.getElementById('errorSubSelect')?.value || 'physics';
    const chapSelect = document.getElementById('errorChapSelect');
    const chapName = chapSelect?.options[chapSelect.selectedIndex]?.text || "General Chapter";
    const errorDesc = document.getElementById('errorDescInput')?.value.trim();
    const errorLevel = document.getElementById('errorLevelSelect')?.value || 'Moderate';
    const imageInput = document.getElementById('errorImageInput');
         
    if (!errorDesc) {
        alert("Kripya error ya question description likhein!");
        return;
    }
         
    const file = imageInput?.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            pushErrorToStorage(sub, chapName, errorDesc, errorLevel, e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        pushErrorToStorage(sub, chapName, errorDesc, errorLevel, null);
    }
};

function pushErrorToStorage(sub, chap, desc, level, imgData) {
    if (typeof errorData === 'undefined' || !Array.isArray(errorData)) {
        errorData = JSON.parse(localStorage.getItem('arjunaHUD_errorbook')) || [];
    }
         
    errorData.unshift({ 
        id: Date.now(), 
        sub: sub.toUpperCase(), 
        chap: chap, 
        desc: desc, 
        level: level,
        image: imgData, 
        resolved: false 
    });
         
    localStorage.setItem('arjunaHUD_errorbook', JSON.stringify(errorData));
    if (document.getElementById('errorDescInput')) document.getElementById('errorDescInput').value = '';
    if (document.getElementById('errorImageInput')) document.getElementById('errorImageInput').value = '';
    renderErrorBook();
    alert("Error successfully Error Book me save ho gaya hai!");
}

function toggleErrorResolution(id) {
    errorData = errorData.map(item => {
        if (item.id === id) item.resolved = !item.resolved;
        return item;
    });
    localStorage.setItem('arjunaHUD_errorbook', JSON.stringify(errorData));
    renderErrorBook();
}

function deleteErrorItem(id) {
    errorData = errorData.filter(item => item.id !== id);
    localStorage.setItem('arjunaHUD_errorbook', JSON.stringify(errorData));
    renderErrorBook();
}

function renderErrorBook() {
    const container = document.getElementById('errorBookContainer');
    const filterChap = document.getElementById('filterChapSelect')?.value || 'ALL';
         
    if (typeof errorData === 'undefined') {
        errorData = JSON.parse(localStorage.getItem('arjunaHUD_errorbook')) || [];
    }
         
    if (!container) return;
    container.innerHTML = '';
         
    let filteredData = errorData;
    if (filterChap && filterChap !== 'ALL') {
        filteredData = errorData.filter(item => item.chap === filterChap);
    }
         
    if (filteredData.length === 0) {
        container.innerHTML = `<div style="font-size:0.8rem; color:var(--text-sub); text-align:center; padding:15px; background:rgba(255,255,255,0.02); border-radius:8px;">Is chapter me koi error recorded nahi hai!</div>`;
        return;
    }
         
    const groupedByChap = {};
    filteredData.forEach(item => {
        const key = `${item.sub} - ${item.chap}`;
        if (!groupedByChap[key]) groupedByChap[key] = [];
        groupedByChap[key].push(item);
    });
    Object.keys(groupedByChap).forEach(chapKey => {
        const items = groupedByChap[chapKey];
        const card = document.createElement('div');
        card.className = 'hud-card';
        card.style.borderColor = 'var(--danger-color)';
         
        let questionsHTML = '';
        items.forEach(err => {
            const isRes = err.resolved;
            const imgThumbnail = err.image ? `<div style="margin-top: 6px;"><a href="${err.image}" target="_blank"><img src="${err.image}" style="max-height: 100px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2);" /></a><span style="font-size:0.6rem; color:var(--cyan-glow); display:block;">(Click to view full image solution)</span></div>` : '';
            questionsHTML += `
                <div style="background: rgba(3, 7, 18, 0.5); padding: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span style="font-size: 0.65rem; background: rgba(239, 68, 68, 0.2); color: var(--danger-color); padding: 2px 6px; border-radius: 4px;">Level: ${err.level}</span>
                        <span style="font-size: 0.65rem; color: ${isRes ? 'var(--success-color)' : 'var(--warning-color)'}; cursor: pointer; font-weight: bold;" onclick="toggleErrorResolution(${err.id})">
                            ${isRes ? 'Resolved' : 'Pending'}
                        </span>
                    </div>
                    <div style="font-size: 0.85rem; color: #fff; font-weight: bold; margin-bottom: 4px; ${isRes ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${err.desc}</div>
                    ${imgThumbnail}
                    <button style="background:transparent; border:none; color:var(--danger-color); font-size:0.65rem; margin-top:6px; cursor:pointer;" onclick="deleteErrorItem(${err.id})">Remove Error</button>
                </div>
            `;
        });
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px;">
                <span style="font-size:0.8rem; color:var(--danger-color); font-weight:bold;">${chapKey}</span>
                <span style="font-size:0.65rem; background: rgba(239, 68, 68, 0.1); padding: 2px 6px; border-radius: 4px; color: var(--danger-color);">Errors: ${items.length}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">${questionsHTML}</div>
        `;
        container.appendChild(card);
    });
}
window.exportErrorBookPDF = function() {
    if (typeof errorData === 'undefined') {
        errorData = JSON.parse(localStorage.getItem('arjunaHUD_errorbook')) || [];
    }
    if (!errorData || errorData.length === 0) {
        alert("Export karne ke liye koi error data nahi hai!");
        return;
    }
    let printWindow = window.open('', '_blank');
    let htmlContent = `<html><head><title>ARJUNA JEE - ERROR BOOK REPORT</title></head><body><h1>Arjuna JEE Error Book Report</h1><hr/>`;
    errorData.forEach((err, idx) => {
        htmlContent += `<div><b>${idx + 1}. [${err.sub}] ${err.chap}</b><br>${err.desc}</div><hr/>`;
    });
    htmlContent += `</body></html>`;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
};

if (typeof window.timerInterval === 'undefined') {
    window.timerInterval = null;
    window.totalSeconds = 25 * 60;
    window.remainingSeconds = 25 * 60;
    window.isTimerRunning = false;
    window.currentModeName = 'Pomodoro';
    window.targetTimestamp = null;
}
if (typeof window.focusStats === 'undefined') {
    window.focusStats = JSON.parse(localStorage.getItem('arjunaHUD_focus')) || { minutes: 0, sessions: 0 };
}

function playAlarmSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
        console.log("Audio not supported");
    }
}

window.setTimerMode = function(minutes, modeName) {
    if (window.isTimerRunning) {
        if (!confirm("Timer chal raha hai! Kya aap mode change karna chahte hain?")) return;
        clearInterval(window.timerInterval);
        window.isTimerRunning = false;
        window.targetTimestamp = null;
        const toggleBtn = document.getElementById('timerToggleBtn');
        if (toggleBtn) toggleBtn.textContent = "START";
    }
    
    window.totalSeconds = minutes * 60;
    window.remainingSeconds = window.totalSeconds;
    window.currentModeName = modeName;

    const btnP = document.getElementById('modePomodoro');
    const btnS = document.getElementById('modeShort');
    const btnD = document.getElementById('modeDeep');

    const defaultStyle = "cursor: pointer; padding: 6px 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: #fff; border-radius: 6px;";
    
    if (btnP) btnP.style.cssText = defaultStyle;
    if (btnS) btnS.style.cssText = defaultStyle;
    if (btnD) btnD.style.cssText = defaultStyle;

    if (modeName === 'Pomodoro' && btnP) {
        btnP.style.cssText = "cursor: pointer; padding: 6px 12px; background: rgba(0,240,255,0.3); border: 1px solid var(--cyan-glow); color: #fff; border-radius: 6px;";
    } else if (modeName === 'Short Break' && btnS) {
        btnS.style.cssText = "cursor: pointer; padding: 6px 12px; background: rgba(16,185,129,0.3); border: 1px solid var(--success-color); color: #fff; border-radius: 6px;";
    } else if (modeName === 'Deep Work' && btnD) {
        btnD.style.cssText = "cursor: pointer; padding: 6px 12px; background: rgba(168,85,247,0.3); border: 1px solid var(--purple-glow); color: #fff; border-radius: 6px;";
    }

    window.updateTimerDisplay();
};

window.updateTimerDisplay = function() {
    const display = document.getElementById('timerDisplay');
    const label = document.getElementById('timerStatusLabel');
    if (!display) return;

    const mins = Math.floor(window.remainingSeconds / 60);
    const secs = window.remainingSeconds % 60;
    display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (label) label.textContent = `${window.currentModeName} Mode`;

    const circumference = 263.89;
    const progressRing = document.getElementById('timerProgressRing');
    
    if (progressRing) {
        let fraction = window.remainingSeconds / window.totalSeconds;
        let dashOffset = circumference * (1 - fraction);
        progressRing.style.strokeDashoffset = dashOffset;

        let ringColor = '#00f0ff';
        if (window.currentModeName === 'Short Break') ringColor = '#10b981';
        if (window.currentModeName === 'Deep Work') ringColor = '#a855f7';
        
        progressRing.style.stroke = ringColor;
    }
};

window.toggleTimer = function() {
    const toggleBtn = document.getElementById('timerToggleBtn');
    if (window.isTimerRunning) {
        clearInterval(window.timerInterval);
        window.isTimerRunning = false;
        if (toggleBtn) toggleBtn.textContent = "RESUME";
    } else {
        window.isTimerRunning = true;
        if (toggleBtn) toggleBtn.textContent = "PAUSE";
        window.targetTimestamp = Date.now() + (window.remainingSeconds * 1000);
        
        window.timerInterval = setInterval(() => {
            const now = Date.now();
            const diffSecs = Math.round((window.targetTimestamp - now) / 1000);
            if (diffSecs > 0) {
                window.remainingSeconds = diffSecs;
                window.updateTimerDisplay();
            } else {
                clearInterval(window.timerInterval);
                window.isTimerRunning = false;
                window.remainingSeconds = 0;
                window.updateTimerDisplay();
                if (toggleBtn) toggleBtn.textContent = "START";
                
                playAlarmSound();
                alert(`Shabaash! ${window.currentModeName} session complete ho gaya!`);
                
                if (window.currentModeName !== 'Short Break') {
                    const sessionMins = Math.floor(window.totalSeconds / 60);
                    window.focusStats.minutes += sessionMins;
                    window.focusStats.sessions += 1;
                    localStorage.setItem('arjunaHUD_focus', JSON.stringify(window.focusStats));
                    window.updateFocusStatsUI();
                }
                
                window.remainingSeconds = window.totalSeconds;
                window.updateTimerDisplay();
            }
        }, 500);
    }
};

window.resetTimer = function() {
    clearInterval(window.timerInterval);
    window.isTimerRunning = false;
    window.targetTimestamp = null;
    window.remainingSeconds = window.totalSeconds;
    const toggleBtn = document.getElementById('timerToggleBtn');
    if (toggleBtn) toggleBtn.textContent = "START";
    window.updateTimerDisplay();
};

window.updateFocusStatsUI = function() {
    if (typeof window.focusStats === 'undefined') {
        window.focusStats = JSON.parse(localStorage.getItem('arjunaHUD_focus')) || { minutes: 0, sessions: 0 };
    }
    const minsEl = document.getElementById('totalFocusMinutes');
    const sessEl = document.getElementById('totalFocusSessions');
    if (minsEl) minsEl.textContent = `${window.focusStats.minutes} Mins`;
    if (sessEl) sessEl.textContent = window.focusStats.sessions;
};

let studyChartInstance = null;
function renderStudyHoursGraph() {
    const canvasElem = document.getElementById('studyHoursChart');
    if (!canvasElem) return;
    const ctx = canvasElem.getContext('2d');
    if (studyChartInstance) studyChartInstance.destroy();
    studyChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Study Hours',
                data: [
                    studyHoursData['Mon'] || 0,
                    studyHoursData['Tue'] || 0,
                    studyHoursData['Wed'] || 0,
                    studyHoursData['Thu'] || 0,
                    studyHoursData['Fri'] || 0,
                    studyHoursData['Sat'] || 0,
                    studyHoursData['Sun'] || 0
                ],
                backgroundColor: '#00f0ff',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function drawMiniGauge(canvasId, percent, color, existingInstance) {
    const elem = document.getElementById(canvasId);
    if (!elem) return existingInstance;

    const existingChart = Chart.getChart(elem);
    if (existingChart) {
        existingChart.destroy();
    }

    if (existingInstance && typeof existingInstance.destroy === 'function') {
        existingInstance.destroy();
    }

    const ctx = elem.getContext('2d');
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [percent, 100 - percent],
                backgroundColor: [color, 'rgba(255, 255, 255, 0.05)'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: { tooltip: { enabled: false }, legend: { display: false } }
        }
    });
}

let combinedGaugeChart = null;
function updateCombinedProgress(physPercentVal, chemPercentVal, mathPercentVal) {
    const totalPercent = Math.round((physPercentVal + chemPercentVal + mathPercentVal) / 3);
    const percentTextElem = document.getElementById('totalCombinedPercent');
    if (percentTextElem) percentTextElem.innerText = totalPercent + '%';
    const ctxElem = document.getElementById('gaugeCombined');
    if (!ctxElem) return;
    const ctx = ctxElem.getContext('2d');
    if (combinedGaugeChart) {
        combinedGaugeChart.data.datasets[0].data = [totalPercent, 100 - totalPercent];
        combinedGaugeChart.update();
    } else {
        combinedGaugeChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [totalPercent, 100 - totalPercent],
                    backgroundColor: ['#00f0ff', 'rgba(255, 255, 255, 0.05)'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: { legend: { display: false }, tooltip: { enabled: false } }
            }
        });
    }
}

function toggleSubjectBreakdown() {
    const el = document.getElementById('individualSubjectsContainer');
    if (el) {
        el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'grid' : 'none';
    }
}
function recalculateSubjectGauges() {
    let totalQuestions = 0;
    let totalLectures = 0;
    let physPercent = 0, chemPercent = 0, mathPercent = 0;
    
    ['physics', 'chemistry', 'maths'].forEach(sub => {
        let totalTasks = syllabusData[sub].length * 8;
        let doneTasks = 0;
        
        syllabusData[sub].forEach((_, idx) => {
            const key = `${sub}_${idx}`;
            const data = userProgress[key];
            if (data) {
                totalQuestions += Number(data.questionsDone || 0);
                totalLectures += Number(data.doneLec || 0);
                if (data.theory) doneTasks++;
                if (data.notes) doneTasks++;
                if (data.shortNotes) doneTasks++;
                if (data.topic) doneTasks++;
                if (data.main) doneTasks++;
                if (data.bridge) doneTasks++;
                if (data.adv) doneTasks++;
                if (data.pyq) doneTasks++;
            }
        });
        
        const percent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
        
        // Yaha gaugePhysInst, gaugeChemInst, aur gaugeMathInst safely call honge:
        if (sub === 'physics') {
            physPercent = percent;
            if (document.getElementById('physPercent')) document.getElementById('physPercent').innerText = `${percent}%`;
            gaugePhysInst = drawMiniGauge('gaugePhysics', percent, '#00f0ff', gaugePhysInst);
        } else if (sub === 'chemistry') {
            chemPercent = percent;
            if (document.getElementById('chemPercent')) document.getElementById('chemPercent').innerText = `${percent}%`;
            gaugeChemInst = drawMiniGauge('gaugeChemistry', percent, '#a855f7', gaugeChemInst);
        } else if (sub === 'maths') {
            mathPercent = percent;
            if (document.getElementById('mathPercent')) document.getElementById('mathPercent').innerText = `${percent}%`;
            gaugeMathInst = drawMiniGauge('gaugeMaths', percent, '#10b981', gaugeMathInst);
        }
    });
    
    updateCombinedProgress(physPercent, chemPercent, mathPercent);
    const qElem = document.getElementById('totalQuesCount');
    const lElem = document.getElementById('totalLecCount');
    if (qElem) qElem.innerText = totalQuestions;
    if (lElem) lElem.innerText = totalLectures;
}


function updateJeeCountdown() {
    const countdownElem = document.getElementById('jeeCountdown');
    if (!countdownElem) return;
    const jeeDate = new Date('2028-01-24T00:00:00');
    const now = new Date();
    const diff = jeeDate - now;
    if (diff <= 0) {
        countdownElem.innerText = "JEE 2028 HAS STARTED!";
        return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    countdownElem.innerText = `${days} Days, ${hours} Hrs Left`;
}

function downloadReportCard() {
    const name = localStorage.getItem('arjunaStudentName') || 'Arjuna Student';
    if(document.getElementById('repStudentName')) document.getElementById('repStudentName').innerText = name;
    if(document.getElementById('repPhys')) document.getElementById('repPhys').innerText = document.getElementById('physPercent')?.innerText || '0%';
    if(document.getElementById('repChem')) document.getElementById('repChem').innerText = document.getElementById('chemPercent')?.innerText || '0%';
    if(document.getElementById('repMath')) document.getElementById('repMath').innerText = document.getElementById('mathPercent')?.innerText || '0%';
    if(document.getElementById('repTotalQ')) document.getElementById('repTotalQ').innerText = document.getElementById('totalQuesCount')?.innerText || '0';
    if(document.getElementById('repTotalLec')) document.getElementById('repTotalLec').innerText = document.getElementById('totalLecCount')?.innerText || '0';
    
    const modal = document.getElementById('reportCardModal');
    if (!modal) return;
    modal.style.display = 'block';
    
    const opt = {
        margin: 0.5,
        filename: `${name}_Report_Card.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    setTimeout(() => {
        html2pdf().set(opt).from(modal).save().then(() => {
            modal.style.display = 'none';
        }).catch(err => {
            console.log("PDF download error:", err);
            modal.style.display = 'none';
        });
    }, 5000);
}


function exportBackup() {
    if (!db) return alert("Database connection is not ready yet!");
    const txErr = db.transaction(["errorBook"], "readonly");
    const reqErr = txErr.objectStore("errorBook").getAll();
    reqErr.onsuccess = function() {
        const errData = reqErr.result;
        const txTest = db.transaction(["testLogs"], "readonly");
        const reqTest = txTest.objectStore("testLogs").getAll();
        reqTest.onsuccess = function() {
            const testData = reqTest.result;
            const backupObj = { userProgress, schoolProgress, backlogData, todoData, studyHoursData, errorBookData: errData, testLogs: testData };
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `JEE_Arjuna_Backup_${new Date().toISOString().slice(0,10)}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        };
    };
}

function importBackup(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.userProgress) localStorage.setItem('arjunaHUD_prog_v4', JSON.stringify(data.userProgress));
            if (data.schoolProgress) localStorage.setItem('arjunaSchool_prog', JSON.stringify(data.schoolProgress));
            if (data.backlogData) localStorage.setItem('arjunaHUD_backlog', JSON.stringify(data.backlogData));
            if (data.todoData) localStorage.setItem('arjunaHUD_todo', JSON.stringify(data.todoData));
            if (data.studyHoursData) localStorage.setItem('arjunaHUD_studyHours', JSON.stringify(data.studyHoursData));
            alert("Backup restored successfully!");
            location.reload();
        } catch (err) {
            alert("Invalid backup file!");
        }
    };
    reader.readAsText(file);
}

function changeTheme(theme) {
    document.body.className = '';
    if (theme && theme !== 'cyan') {
        document.body.classList.add('theme-' + theme);
    }
    localStorage.setItem('arjunaHUD_theme', theme);
}

const availableThemes = ['cyan', 'white', 'purple', 'green', 'slate', 'ruby', 'obsidian'];

let currentThemeIndex = 0;

window.cycleAppTheme = function() {
    currentThemeIndex = (currentThemeIndex + 1) % availableThemes.length;
    const nextTheme = availableThemes[currentThemeIndex];
    changeTheme(nextTheme);
};

let customFormulasData = JSON.parse(localStorage.getItem('arjunaHUD_customFormulas')) || [];

function loadChaptersForFormulaAdder() {
    const sub = document.getElementById('customFormSub')?.value || 'physics';
    const chapSelect = document.getElementById('customFormChapSelect');
    if (!chapSelect) return;
         
    chapSelect.innerHTML = '';
    if (typeof syllabusData !== 'undefined' && syllabusData[sub]) {
        syllabusData[sub].forEach((chap) => {
            const opt = document.createElement('option');
            opt.value = chap.name;
            opt.textContent = chap.name;
            chapSelect.appendChild(opt);
        });
    }
}

function updateFilterChapters() {
    const sub = document.getElementById('filterFormSub')?.value || 'all';
    const chapSelect = document.getElementById('filterFormChap');
    if (!chapSelect) return;
         
    chapSelect.innerHTML = '<option value="ALL">-- All Chapters --</option>';
    if (sub !== 'all' && typeof syllabusData !== 'undefined' && syllabusData[sub]) {
        syllabusData[sub].forEach((chap) => {
            const opt = document.createElement('option');
            opt.value = chap.name;
            opt.textContent = chap.name;
            chapSelect.appendChild(opt);
        });
    }
}

function saveChapterFormula() {
    const sub = document.getElementById('customFormSub').value;
    const chapter = document.getElementById('customFormChapSelect').value;
    const formula = document.getElementById('customFormText').value.trim();
    const example = document.getElementById('customFormEx').value.trim();
         
    if (!chapter || !formula) {
        alert("Kripya chapter select karein aur formula likhein!");
        return;
    }
         
    const newEntry = { sub, chapter, formula, example: example || "Custom saved note." };
    customFormulasData.unshift(newEntry);
    localStorage.setItem('arjunaHUD_customFormulas', JSON.stringify(customFormulasData));
         
    document.getElementById('customFormText').value = '';
    document.getElementById('customFormEx').value = '';
         
    renderChapterFormulas();
    alert("Is chapter me formula successfully save ho gaya hai!");
}
const class11FormulaDatabase = [
    {
        sub: 'physics', chapter: 'Units & Measurements',
        formula: 'Error Propagation: Z = A ± ΔA, ΔZ = ΔA + ΔB | Z = A*B ⇒ ΔZ/Z = ΔA/A + ΔB/B',
        example: 'Example: length 10 ± 0.1 and breadth 5 ± 0.2, max absolute error in perimeter = 0.3.'
    },
    {
        sub: 'physics', chapter: 'Mathematics tool',
        formula: 'Differentiation & Integration: d/dx(x^n) = n*x^(n-1), ∫ x^n dx = (x^(n+1))/(n+1)',
        example: 'Example: d/dx(x^3) = 3x^2, aur ∫ x^2 dx = x^3/3 + C.'
    },
    {
        sub: 'physics', chapter: 'Motion in a Straight Line',
        formula: 'Equations of Motion: v = u + at, s = ut + ½at², v² = u² + 2as',
        example: 'Example: u = 0, a = 2 m/s², t = 3s ⇒ v = 6 m/s.'
    },
    {
        sub: 'physics', chapter: 'Motion in a Plane',
        formula: 'Projectile Motion: R = (u² sin 2θ) / g, H_max = (u² sin²θ)/(2g), T = 2u sin θ / g',
        example: 'Example: u = 20 m/s, θ = 45° (g=10) ⇒ R = 40 meters.'
    },
    {
        sub: 'physics', chapter: 'Laws of Motion',
        formula: 'Newton\'s Second Law: F_net = ma = dp/dt, Friction: f_s ≤ μ_s N, f_k = μ_k N',
        example: 'Example: 2 kg mass par 10 N force lagne par a = 10 / 2 = 5 m/s².'
    },
    {
        sub: 'physics', chapter: 'Circular Motion',
        formula: 'Centripetal Force: F_c = (mv²) / r = mω²r, a_c = v²/r = ω²r',
        example: 'Example: Mass 1 kg, velocity 4 m/s, radius 2 m ⇒ F_c = 8 N.'
    },
    {
        sub: 'physics', chapter: 'Work, Energy & Power',
        formula: 'Work & Power: W = F·s·cos(θ), K.E. = p²/(2m), P = W/t = F·v',
        example: 'Example: 10 N force 4m displacement with cos(0)=1 ⇒ W = 40 Joules.'
    },
    {
        sub: 'physics', chapter: 'Center of mass & collision',
        formula: 'Center of Mass: X_cm = Σ(m_i * x_i) / Σ m_i, e = (v_2 - v_1)/(u_1 - u_2)',
        example: 'Example: 2kg at x=0 and 3kg at x=5 ⇒ X_cm = 3m.'
    },
    {
        sub: 'physics', chapter: 'Rotational Motion',
        formula: 'Moment of Inertia, Torque & Angular Momentum: I = Σmr², τ = Iα, L = Iω',
        example: 'Example: I = 2 kg·m², ω = 5 rad/s ⇒ L = 10 kg·m²/s.'
    },
    {
        sub: 'physics', chapter: 'Gravitation',
        formula: 'Gravitational Force & Potential: F = (Gm₁m₂)/r², g = GM/R², V = -GM/r',
        example: 'Example: Distance double (2r) karne par force 1/4 ho jata hai.'
    },
    {
        sub: 'physics', chapter: 'Fluids & Solids',
        formula: 'Stress-Strain & Viscosity: Y = (F/A)/(ΔL/L), F = 6πηrv (Stokes Law)',
        example: 'Example: Hydraulic lift me Pascal\'s law ke through pressure transmission hota hai.'
    },
    {
        sub: 'physics', chapter: 'Thermodynamics',
        formula: 'First Law: ΔQ = ΔU + ΔW, Efficiency of Carnot Engine: η = 1 - (T₂/T₁)',
        example: 'Example: ΔQ = 100J, ΔW = 40J ⇒ ΔU = 60J.'
    },
    {
        sub: 'physics', chapter: 'Waves & Oscillations',
        formula: 'SHM & Pendulum: x(t) = A sin(ωt + φ), T = 2π√(L/g), v = √(T/μ)',
        example: 'Example: Pendulum ki length badhane par time period badh jata hai.'
    },
    {
        sub: 'chemistry', chapter: 'Basic Concepts of Chem',
        formula: 'Mole Concept: n = Given Mass / Molar Mass = Molarity * Volume(L)',
        example: 'Example: 9g of Water (H2O, molar mass 18) me moles = 9/18 = 0.5 moles.'
    },
    {
        sub: 'chemistry', chapter: 'Structure of Atom',
        formula: 'Energy & Radius: E = -13.6 * (Z²/n²) eV, r = 0.529 * (n²/Z) Å',
        example: 'Example: Hydrogen atom ke 1st orbit ki radius 0.529 Å hoti hai.'
    },
    {
        sub: 'chemistry', chapter: 'Periodicity',
        formula: 'Effective Nuclear Charge: Z_eff = Z - σ (Slater\'s rules)',
        example: 'Example: Period me left se right jane par Z_eff badhta hai aur size choti hoti hai.'
    },
    {
        sub: 'chemistry', chapter: 'Chemical Bonding',
        formula: 'Formal Charge = Valence e⁻ - Non-bonding e⁻ - ½(Bonding e⁻)',
        example: 'Example: Stable Lewis structure wohi hoti hai jiska formal charge minimum ho.'
    },
    {
        sub: 'chemistry', chapter: 'State of matter',
        formula: 'Ideal Gas Equation: PV = nRT, Van der Waals: (P + an²/V²)(V - nb) = nRT',
        example: 'Example: Constant temperature par P aur V inverse relation rakhte hain.'
    },
    {
        sub: 'chemistry', chapter: 'Thermodynamics (Chem)',
        formula: 'Gibbs Free Energy: ΔG = ΔH - TΔS (Spontaneous if ΔG < 0)',
        example: 'Example: Negative ΔG wali reactions spontaneous hoti hain.'
    },
    {
        sub: 'chemistry', chapter: 'Equilibrium',
        formula: 'Equilibrium Constants: K_c = [C]^c[D]^d/[A]^a[B]^b, pH = -log[H⁺]',
        example: 'Example: Neutral water ka pH 25°C par 7 hota hai.'
    },
    {
        sub: 'chemistry', chapter: 'Redox Reactions',
        formula: 'Oxidation Number Rules: Oxygen = -2 (except peroxides), H = +1 (with non-metals)',
        example: 'Example: H₂SO₄ me Sulfur (S) ka oxidation state +6 hota hai.'
    },
    {
        sub: 'chemistry', chapter: 'Organic Chem Basics',
        formula: 'Degree of Unsaturation: DU = C + 1 - (H/2) + (N/2) - (Halogens/2)',
        example: 'Example: C₆H₁₂ ki DU = 1 (yani 1 ring ya double bond hai).'
    },
    {
        sub: 'chemistry', chapter: 'Hydrocarbons',
        formula: 'Markovnikov Rule: H⁺ attaches to carbon with more hydrogens during addition.',
        example: 'Example: Propene + HBr give 2-Bromopropane as major product.'
    },
    {
        sub: 'chemistry', chapter: 'Hydrogen & S-Block',
        formula: 'Plaster of Paris: CaSO₄·½H₂O, Gypsum: CaSO₄·2H₂O',
        example: 'Example: Gypsum ko 393K par heat karne par Plaster of Paris banta hai.'
    },
    {
        sub: 'maths', chapter: 'Basic mathematics',
        formula: 'Logarithm: log(ab) = log(a) + log(b), log_b(a) = (ln a)/(ln b)',
        example: 'Example: log(10) + log(100) = 1 + 2 = 3.'
    },
    {
        sub: 'maths', chapter: 'Sets & Functions',
        formula: 'Sets Union/Intersection: n(A ∪ B) = n(A) + n(B) - n(A ∩ B)',
        example: 'Example: De Morgan\'s Law: (A ∪ B)\' = A\' ∩ B\'.'
    },
    {
        sub: 'maths', chapter: 'Quadratic equation',
        formula: 'Roots & Discriminant: x = (-b ± √(b² - 4ac)) / 2a, D = b² - 4ac',
        example: 'Example: x² - 5x + 6 = 0 ke roots x = 2 aur x = 3 hain.'
    },
    {
        sub: 'maths', chapter: 'relation function',
        formula: 'Total Relations from A to B = 2^(n(A)*n(B))',
        example: 'Example: n(A)=2, n(B)=3 ⇒ total relations = 2^6 = 64.'
    },
    {
        sub: 'maths', chapter: 'Trigonometry',
        formula: 'Compound Angles: sin(A ± B) = sin A cos B ± cos A sin B',
        example: 'Example: sin(75°) = (√3 + 1) / (2√2).'
    },
    {
        sub: 'maths', chapter: 'Trigonometry equations',
        formula: 'General Solutions: sin θ = 0 ⇒ θ = nπ, cos θ = 0 ⇒ θ = (2n+1)π/2',
        example: 'Example: sin θ = sin α ⇒ θ = nπ + (-1)^n α.'
    },
    {
        sub: 'maths', chapter: 'Complex Numbers',
        formula: 'Modulus & Argument: |z| = √(x² + y²), arg(z) = tan⁻¹(y/x), i² = -1',
        example: 'Example: z = 3 + 4i ⇒ |z| = 5.'
    },
    {
        sub: 'maths', chapter: 'Permutations & Combinations',
        formula: 'nPr = n! / (n-r)!, nCr = n! / (r!(n-r)!)',
        example: 'Example: 5C2 = 10.'
    },
    {
        sub: 'maths', chapter: 'Binomial Theorem',
        formula: 'General Term: T_(r+1) = nCr * x^(n-r) * a^r',
        example: 'Example: (1+x)^n ke expansion me total terms (n + 1) hote hain.'
    },
    {
        sub: 'maths', chapter: 'Sequences & Series',
        formula: 'AP Sum: S_n = (n/2)[2a + (n-1)d], GP Sum: S_n = a(rⁿ - 1)/(r - 1)',
        example: 'Example: AP ka a=2, d=3 ⇒ 5th term = 14.'
    },
    {
        sub: 'maths', chapter: 'Straight Lines',
        formula: 'Slope & Equation: m = (y₂ - y₁) / (x₂ - x₁), y - y₁ = m(x - x₁)',
        example: 'Example: Points (1,2) and (3,4) ki slope m = 1.'
    },
    {
        sub: 'maths', chapter: 'Conic Sections',
        formula: 'Parabola: y² = 4ax, Ellipse: (x²/a²) + (y²/b²) = 1',
        example: 'Example: y² = 8x me focus (2, 0) par hota hai.'
    },
    {
        sub: 'maths', chapter: 'Limits & Derivatives',
        formula: 'Standard Limit: lim(x→0) (sin x)/x = 1, Power Rule: d/dx(xⁿ) = n*x^(n-1)',
        example: 'Example: d/dx(x⁴) = 4x³.'
    },
    {
        sub: 'maths', chapter: 'Probability',
        formula: 'Conditional Probability: P(A|B) = P(A ∩ B) / P(B)',
        example: 'Example: P(A ∪ B) = P(A) + P(B) - P(A ∩ B).'
    },
    {
        sub: 'maths', chapter: 'linear inequality',
        formula: 'Wavy Curve Method: Positive intervals ko check karke sign scheme nikalna.',
        example: 'Example: (x-2)(x-3) > 0 ⇒ x ∈ (-∞, 2) ∪ (3, ∞).'
    },
    {
        sub: 'maths', chapter: 'Mathematical Reasoning',
        formula: 'Negations: ~(p ∧ q) = ~p ∨ ~q, ~(p ∨ q) = ~p ∧ ~q',
        example: 'Example: "AND" statement ka negation "OR" ban jata hai.'
    }
];

function getAllFormulasCombined() {
    return [...customFormulasData, ...class11FormulaDatabase];
}
function renderChapterFormulas() {
    const container = document.getElementById('formulaListContainer');
    if (!container) return;
    container.innerHTML = '';
         
    const selectedSub = document.getElementById('filterFormSub')?.value || 'all';
    const selectedChap = document.getElementById('filterFormChap')?.value || 'ALL';
    const searchQuery = document.getElementById('formulaSearchInput')?.value.toLowerCase().trim() || '';
         
    const allFormulas = getAllFormulasCombined();
         
    const filtered = allFormulas.filter(item => {
        const matchesSub = (selectedSub === 'all' || item.sub === selectedSub);
        const matchesChap = (selectedChap === 'ALL' || item.chapter === selectedChap);
        const matchesQuery = item.chapter.toLowerCase().includes(searchQuery) ||                              item.formula.toLowerCase().includes(searchQuery) ||                              item.example.toLowerCase().includes(searchQuery);
        return matchesSub && matchesChap && matchesQuery;
    });
         
    if (filtered.length === 0) {
        container.innerHTML = '<div class="hud-card" style="text-align:center; color:var(--text-sub); font-size:0.8rem;">Koi formula nahi mila. Upar form se add karein!</div>';
        return;
    }
         
    filtered.forEach(item => {
        let badgeColor = item.sub === 'physics' ? 'var(--cyan-glow)' : item.sub === 'chemistry' ? 'var(--purple-glow)' : 'var(--success-color)';
        const card = document.createElement('div');
        card.className = 'hud-card';
        card.style.borderColor = badgeColor;
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 0.65rem; color: ${badgeColor}; font-weight: 800; text-transform: uppercase;">${item.sub}</span>
                <span style="font-size: 0.7rem; color: #fff; font-weight: bold;">${item.chapter}</span>
            </div>
            <div style="background: rgba(3, 7, 18, 0.6); padding: 10px; border-radius: 8px; font-family: monospace; font-size: 0.82rem; color: var(--cyan-glow); margin-bottom: 8px; border: 1px solid rgba(255,255,255,0.05); word-break: break-all;">
                ${item.formula}
            </div>
            <div style="font-size: 0.75rem; color: var(--text-sub); line-height: 1.4;">
                ${item.example}
            </div>
        `;
        container.appendChild(card);
    });
}

let currentFlashcardIndex = 0;
let isCardFlipped = false;

function loadNextFlashcard() {
    const allFormulas = getAllFormulasCombined();
    if (!allFormulas || allFormulas.length === 0) return;
         
    if (currentFlashcardIndex >= allFormulas.length) {
        currentFlashcardIndex = 0;
    }
         
    const cardData = allFormulas[currentFlashcardIndex];
         
    const subBadge = document.getElementById('cardSubBadge');
    const qText = document.getElementById('cardQuestionText');
    const aText = document.getElementById('cardAnswerText');
    const stats = document.getElementById('flashcardStats');
         
    if (subBadge) subBadge.innerText = `${cardData.sub} - ${cardData.chapter}`;
    if (qText) qText.innerText = `What is the core formula / concept for ${cardData.chapter}?`;
    if (aText) aText.innerText = `${cardData.formula}\n\n${cardData.example}`;
    if (stats) stats.innerText = `Card ${currentFlashcardIndex + 1} of ${allFormulas.length}`;
         
    isCardFlipped = false;
    const inner = document.getElementById('flashcardInner');
    if (inner) inner.style.transform = 'rotateY(0deg)';
}

function flipFlashcard() {
    isCardFlipped = !isCardFlipped;
    const inner = document.getElementById('flashcardInner');
    if (inner) {
        inner.style.transform = isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    }
}

function rateFlashcard(status) {
    if (status === 'remembered') {
        addXP(10);
    }
    currentFlashcardIndex++;
    loadNextFlashcard();
}

let currentHeatmapSub = 'physics';
function renderHeatmap(sub) {
    currentHeatmapSub = sub;
    ['physics', 'chemistry', 'maths'].forEach(s => {
        const btn = document.getElementById('btn-heat-' + s);
        if (btn) btn.classList.remove('active');
    });
    const activeBtn = document.getElementById('btn-heat-' + sub);
    if (activeBtn) activeBtn.classList.add('active');
    const container = document.getElementById('heatmapGridContainer');
    if (!container) return;
    container.innerHTML = '';
    const chapters = syllabusData[sub] || [];
         
    const savedErrors = JSON.parse(localStorage.getItem('arjunaHUD_errorbook')) || [];
    chapters.forEach((chap, idx) => {
        const key = `${sub}_${idx}`;
        const prog = userProgress[key] || { questionsDone: 0 };
                  
        const chapErrors = savedErrors.filter(e => e.chap === chap.name && e.sub.toLowerCase() === sub);
        const errCount = chapErrors.length;
         
        let statusColor = 'var(--success-color)';
        let statusText = 'Strong / Mastered';
        let borderColor = 'rgba(16, 185, 129, 0.4)';
        if (errCount >= 2 || (prog.questionsDone < 20 && errCount > 0)) {
            statusColor = 'var(--danger-color)';
            statusText = `Critical Weakness (${errCount} Errors)`;
            borderColor = 'rgba(239, 68, 68, 0.5)';
        } else if (errCount === 1 || (prog.questionsDone < 50)) {
            statusColor = '#f59e0b';
            statusText = 'Moderate / Needs Practice';
            borderColor = 'rgba(245, 158, 11, 0.4)';
        }
        const card = document.createElement('div');
        card.className = 'hud-card';
        card.style.borderColor = borderColor;
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 0.8rem; font-weight: bold; color: #fff;">${chap.name}</span>
                <span style="font-size: 0.7rem; color: ${statusColor}; font-weight: bold;">${statusText}</span>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-sub); display: flex; justify-content: space-between;">
                <span>Questions Solved: ${prog.questionsDone || 0}</span>
                <span>Logged Errors: ${errCount}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

let currentAnalyticsMode = 'daily';
function switchAnalyticsMode(mode) {
    currentAnalyticsMode = mode;
    document.querySelectorAll('#view-analytics .sub-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-anal-${mode}`).classList.add('active');
         
    const label = document.getElementById('analyticsLabel');
    if (label) {
        if (mode === 'daily') label.innerText = "SELECT DATE";
        if (mode === 'weekly') label.innerText = "SELECT WEEK START DATE";
        if (mode === 'monthly') label.innerText = "SELECT MONTH";
    }
    renderAnalyticsData();
}

function loadChaptersForAnalytics() {
    const subSelect = document.getElementById('analSubjectSelect');
    const chapSelect = document.getElementById('analChapterSelect');
    if (!chapSelect || !subSelect) return;
    const sub = subSelect.value || 'physics';
    let chapters = [];
    if (typeof syllabusData !== 'undefined' && syllabusData[sub]) {
        chapters = syllabusData[sub].map(c => c.name);
    }
    let html = '';
    chapters.forEach(chap => {
        html += `<option value="${chap}">${chap}</option>`;
    });
    chapSelect.innerHTML = html;
}

function logStudyHoursAdvanced() {
    const dateVal = document.getElementById('analyticsDateInput').value;
    const hoursVal = parseFloat(document.getElementById('manualStudyHours').value) || 0;
    const subVal = document.getElementById('analSubjectSelect').value;
    const chapVal = document.getElementById('analChapterSelect').value;
    const lecsVal = parseInt(document.getElementById('analLecInput').value) || 0;
    const quesVal = parseInt(document.getElementById('analQuesInput').value) || 0;
         
    if (!dateVal) {
        alert("Kripya pehle date select karein!");
        return;
    }
    if (hoursVal <= 0 && lecsVal <= 0 && quesVal <= 0) {
        alert("Kripya kam se kam Hours, Lectures ya Questions toh dalein!");
        return;
    }
    let detailedLogs = JSON.parse(localStorage.getItem('arjunaHUD_detailedLogs')) || {};
    if (!detailedLogs[dateVal]) {
        detailedLogs[dateVal] = { hours: 0, activities: [] };
    }
    detailedLogs[dateVal].hours += hoursVal;
    detailedLogs[dateVal].activities.push({
        subject: subVal,
        chapter: chapVal,
        lectures: lecsVal,
        questions: quesVal,
        hours: hoursVal
    });
    localStorage.setItem('arjunaHUD_detailedLogs', JSON.stringify(detailedLogs));
    alert("Study session successfully log ho gaya!");
         
    document.getElementById('manualStudyHours').value = '';
    document.getElementById('analLecInput').value = '';
    document.getElementById('analQuesInput').value = '';
    renderAnalyticsData();
    addXP(20);
}

function renderAnalyticsData() {
    const dateVal = document.getElementById('analyticsDateInput')?.value || new Date().toISOString().split('T')[0];
    const detailedLogs = JSON.parse(localStorage.getItem('arjunaHUD_detailedLogs')) || {};
         
    let totalHours = 0;
    let totalLecs = 0;
    let totalQues = 0;
    let collectedActivities = [];
    let subStats = {
        physics: { hours: 0, lecs: 0, ques: 0 },
        chemistry: { hours: 0, lecs: 0, ques: 0 },
        maths: { hours: 0, lecs: 0, ques: 0 }
    };
    if (currentAnalyticsMode === 'daily') {
        if (detailedLogs[dateVal]) {
            totalHours = detailedLogs[dateVal].hours || 0;
            collectedActivities = detailedLogs[dateVal].activities || [];
            collectedActivities.forEach(act => {
                totalLecs += act.lectures;
                totalQues += act.questions;
                if (subStats[act.subject]) {
                    subStats[act.subject].hours += act.hours;
                    subStats[act.subject].lecs += act.lectures;
                    subStats[act.subject].ques += act.questions;
                }
            });
        }
    } else if (currentAnalyticsMode === 'weekly') {
        let start = new Date(dateVal);
        for (let i = 0; i < 7; i++) {
            let d = new Date(start);
            d.setDate(d.getDate() + i);
            let dString = d.toISOString().split('T')[0];
            if (detailedLogs[dString]) {
                totalHours += detailedLogs[dString].hours || 0;
                (detailedLogs[dString].activities || []).forEach(act => {
                    totalLecs += act.lectures;
                    totalQues += act.questions;
                    collectedActivities.push({ ...act, date: dString });
                    if (subStats[act.subject]) {
                        subStats[act.subject].hours += act.hours;
                        subStats[act.subject].lecs += act.lectures;
                        subStats[act.subject].ques += act.questions;
                    }
                });
            }
        }
    } else if (currentAnalyticsMode === 'monthly') {
        let monthPrefix = dateVal.substring(0, 7);
        for (let key in detailedLogs) {
            if (key.startsWith(monthPrefix)) {
                totalHours += detailedLogs[key].hours || 0;
                (detailedLogs[key].activities || []).forEach(act => {
                    totalLecs += act.lectures;
                    totalQues += act.questions;
                    collectedActivities.push({ ...act, date: key });
                    if (subStats[act.subject]) {
                        subStats[act.subject].hours += act.hours;
                        subStats[act.subject].lecs += act.lectures;
                        subStats[act.subject].ques += act.questions;
                    }
                });
            }
        }
    }
    if(document.getElementById('analTotalHours')) document.getElementById('analTotalHours').innerText = `${totalHours.toFixed(1)} Hours`;
    if(document.getElementById('analTotalLecs')) document.getElementById('analTotalLecs').innerText = `${totalLecs} Completed`;
    if(document.getElementById('analTotalQues')) document.getElementById('analTotalQues').innerText = `${totalQues} Solved`;
         
    if(document.getElementById('gaugeLogPhysHours')) document.getElementById('gaugeLogPhysHours').innerText = `${subStats.physics.hours.toFixed(1)} h`;
    if(document.getElementById('gaugeLogPhysQues')) document.getElementById('gaugeLogPhysQues').innerText = `${subStats.physics.ques} Qs | ${subStats.physics.lecs} Lec`;
    if(document.getElementById('gaugeLogChemHours')) document.getElementById('gaugeLogChemHours').innerText = `${subStats.chemistry.hours.toFixed(1)} h`;
    if(document.getElementById('gaugeLogChemQues')) document.getElementById('gaugeLogChemQues').innerText = `${subStats.chemistry.ques} Qs | ${subStats.chemistry.lecs} Lec`;
    if(document.getElementById('gaugeLogMathHours')) document.getElementById('gaugeLogMathHours').innerText = `${subStats.maths.hours.toFixed(1)} h`;
    if(document.getElementById('gaugeLogMathQues')) document.getElementById('gaugeLogMathQues').innerText = `${subStats.maths.ques} Qs | ${subStats.maths.lecs} Lec`;
         
    const detailsContainer = document.getElementById('analyticsDetailsContainer');
    if (!detailsContainer) return;
    if (collectedActivities.length === 0) {
        detailsContainer.innerHTML = `<div style="text-align: center; color: var(--text-sub); font-size: 0.75rem; padding: 20px;">Is period ke liye koi activity log nahi ki gayi hai.</div>`;
        return;
    }
    let html = '';
    collectedActivities.forEach(act => {
        html += `
            <div style="background: rgba(3,7,18,0.6); border: 1px solid var(--border-color); border-radius: 10px; padding: 10px; font-size: 0.75rem; margin-bottom: 6px;">
                <div style="display: flex; justify-content: space-between; color: var(--cyan-glow); font-weight: bold; margin-bottom: 4px;">
                    <span>${act.subject.toUpperCase()} - ${act.chapter}</span>
                    <span>${act.hours} Hrs</span>
                </div>
                <div style="color: var(--text-sub);">
                    Lectures: <b style="color: var(--purple-glow);">${act.lectures}</b> &nbsp;|&nbsp; Questions: <b style="color: var(--success-color);">${act.questions}</b>
                    ${act.date ? `<span style="float: right; font-size: 0.65rem; color: var(--warning-color);">${act.date}</span>` : ''}
                </div>
            </div>
        `;
    });
    detailsContainer.innerHTML = html;
}
let akivaRingChartInstance = null;
let subGaugeInstances = { physics: null, chemistry: null, maths: null };

function renderMasterReportCard() {
    try {
        const userProgress = JSON.parse(localStorage.getItem('arjunaHUD_prog_v4') || '{}');
        const backlogList = JSON.parse(localStorage.getItem('arjunaHUD_backlog') || '[]');
        const errorBookList = JSON.parse(localStorage.getItem('arjunaHUD_errorbook') || '[]');

        let totalTasks = 0;
        let doneTasks = 0;
        
        let subjectScores = { physics: 0, chemistry: 0, maths: 0 };
        let subjectBacklogs = { physics: 0, chemistry: 0, maths: 0 };

        ['physics', 'chemistry', 'maths'].forEach(sub => {
            let subTotal = 0;
            let subDone = 0;
            
            if (typeof syllabusData !== 'undefined' && syllabusData[sub]) {
                syllabusData[sub].forEach((_, idx) => {
                    const key = `${sub}_${idx}`;
                    const data = userProgress[key];
                    
                    subTotal += 8;
                    totalTasks += 8;
                    
                    if (data) {
                        if (data.theory) { subDone++; doneTasks++; }
                        if (data.notes) { subDone++; doneTasks++; }
                        if (data.shortNotes) { subDone++; doneTasks++; }
                        if (data.topic) { subDone++; doneTasks++; }
                        if (data.main) { subDone++; doneTasks++; }
                        if (data.bridge) { subDone++; doneTasks++; }
                        if (data.adv) { subDone++; doneTasks++; }
                        if (data.pyq) { subDone++; doneTasks++; }
                    }
                });
            }
            subjectScores[sub] = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : 0;
        });

        let syllabusPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
        
        let pendingBacklogsQty = 0;
        backlogList.forEach(item => {
            if (item.status === 'pending') {
                let qNum = Number(item.count || 1);
                pendingBacklogsQty += qNum;
                const s = (item.sub || '').toLowerCase();
                if (subjectBacklogs[s] !== undefined) {
                    subjectBacklogs[s] += qNum;
                }
            }
        });

        let backlogScoreFactor = Math.max(0, 100 - (pendingBacklogsQty * 2));

        let resolvedErrors = errorBookList.filter(e => e.resolved).length;
        let errorPercent = errorBookList.length > 0 ? Math.round((resolvedErrors / errorBookList.length) * 100) : 100;

        let overallReadiness = Math.round((syllabusPercent * 0.5) + (backlogScoreFactor * 0.3) + (errorPercent * 0.2));
        overallReadiness = Math.min(Math.max(overallReadiness, 5), 100);

        const canvasElem = document.getElementById('akivaMasterRing');
        if (canvasElem && typeof Chart !== 'undefined') {
            const ctx = canvasElem.getContext('2d');
            if (akivaRingChartInstance) {
                akivaRingChartInstance.destroy();
            }
            akivaRingChartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [overallReadiness, 100 - overallReadiness],
                        backgroundColor: ['#00f0ff', 'rgba(255, 255, 255, 0.05)'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '80%',
                    plugins: { tooltip: { enabled: false }, legend: { display: false } }
                }
            });
        }

        if (document.getElementById('akivaReadinessPercent')) document.getElementById('akivaReadinessPercent').innerText = overallReadiness + '%';
        if (document.getElementById('akivaSyllabusText')) document.getElementById('akivaSyllabusText').innerText = syllabusPercent + '%';
        if (document.getElementById('akivaSyllabusBar')) document.getElementById('akivaSyllabusBar').style.width = syllabusPercent + '%';

        let backlogBarPercent = Math.max(0, 100 - (pendingBacklogsQty * 2));
        if (document.getElementById('akivaBacklogText')) document.getElementById('akivaBacklogText').innerText = `${pendingBacklogsQty} Pending`;
        if (document.getElementById('akivaBacklogBar')) document.getElementById('akivaBacklogBar').style.width = backlogBarPercent + '%';

        if (document.getElementById('akivaErrorText')) document.getElementById('akivaErrorText').innerText = errorPercent + '%';
        if (document.getElementById('akivaErrorBar')) document.getElementById('akivaErrorBar').style.width = errorPercent + '%';

        let airText = overallReadiness > 80 ? "AIR 1,000 - 3,000" : overallReadiness > 50 ? "AIR 5,000 - 15,000" : "AIR 25,000+";
        let batchText = overallReadiness > 75 ? "Top 5% in Batch" : "Competitive Tier";
        if (document.getElementById('akivaEstRank')) document.getElementById('akivaEstRank').innerText = airText;
        if (document.getElementById('akivaBatchPos')) document.getElementById('akivaBatchPos').innerText = batchText;

        const alertBox = document.getElementById('smartExamAlertText');
        if (alertBox) {
            if (pendingBacklogsQty > 5) {
                alertBox.innerHTML = `<b>Action Required:</b> Aapke paas total ${pendingBacklogsQty} pending backlog items hain. Readiness index improve karne ke liye inhe clear karein!`;
            } else {
                alertBox.innerHTML = `<b>Great Momentum:</b> Aapka Arjuna readiness score ${overallReadiness}% par hai. Is hi raftar se padhai jari rakhein!`;
            }
        }

        ['physics', 'chemistry', 'maths'].forEach(sub => {
            let val = subjectScores[sub];
            let pElem = document.getElementById(`percentSub_${sub}`);
            if (pElem) pElem.innerText = val + '%';

            let bElem = document.getElementById(`backlogSub_${sub}`);
            if (bElem) bElem.innerText = `Backlog: ${subjectBacklogs[sub]}`;

            let color = sub === 'physics' ? '#00f0ff' : sub === 'chemistry' ? '#a855f7' : '#10b981';
            if (document.getElementById(`gaugeSub_${sub}`)) {
                subGaugeInstances[sub] = drawMiniGauge(`gaugeSub_${sub}`, val, color, subGaugeInstances[sub]);
            }
        });

    } catch (err) {
        console.error("Master Report Card Render Error: ", err);
    }
}

let currentSetIndex = 0;

const orbitSet1 = [
    { name: 'Dashboard', icon: 'fas fa-chart-pie', tab: 'dashboard', color: 'linear-gradient(135deg, #00f0ff, #0077ff)' },
    { name: 'Roadmap', icon: 'fas fa-route', tab: 'roadmap', color: 'linear-gradient(135deg, #ff9900, #ff3300)' },
    { name: 'Practice', icon: 'fas fa-pencil-alt', tab: 'practice', color: 'linear-gradient(135deg, #00ff88, #00aa55)' },
    { name: 'Leaderboard', icon: 'fas fa-trophy', tab: 'leaderboard', color: 'linear-gradient(135deg, #a855f7, #6366f1)' },
    { name: 'To-Do', icon: 'fas fa-check-square', tab: 'todo', color: 'linear-gradient(135deg, #ffcc00, #ff6600)' },
    { name: 'School', icon: 'fas fa-school', tab: 'school', color: 'linear-gradient(135deg, #00f0ff, #0099ff)' }
];

const orbitSet2 = [
    { name: 'Backlog', icon: 'fas fa-bookmark', tab: 'backlog', color: 'linear-gradient(135deg, #f43f5e, #be123c)' },
    { name: 'Modules', icon: 'fas fa-box', tab: 'module', color: 'linear-gradient(135deg, #34d399, #059669)' },
    { name: 'Tests', icon: 'fas fa-chart-bar', tab: 'testanalysis', color: 'linear-gradient(135deg, #fbbf24, #d97706)' },
    { name: 'Errors', icon: 'fas fa-exclamation-triangle', tab: 'errorbook', color: 'linear-gradient(135deg, #ef4444, #991b1b)' },
    { name: 'Formulas', icon: 'fas fa-bolt', tab: 'formulas', color: 'linear-gradient(135deg, #a855f7, #7c3aed)' },
    { name: 'Timer', icon: 'fas fa-stopwatch', tab: 'focus', color: 'linear-gradient(135deg, #00f0ff, #0284c7)' }
];

const orbitSet3 = [
    { name: 'Revision', icon: 'fas fa-sync', tab: 'revision', color: 'linear-gradient(135deg, #10b981, #047857)' },
    { name: 'Heatmap', icon: 'fas fa-fire', tab: 'heatmap', color: 'linear-gradient(135deg, #f59e0b, #b45309)' },
    { name: 'Cards', icon: 'fas fa-lightbulb', tab: 'flashcards', color: 'linear-gradient(135deg, #ec4899, #db2777)' },
    { name: 'Lofi', icon: 'fas fa-headphones', tab: 'lofi', color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' },
    { name: 'Report', icon: 'fas fa-chart-line', tab: 'report-card', color: 'linear-gradient(135deg, #06b6d4, #0891b2)' },
    { name: 'Settings', icon: 'fas fa-cog', tab: 'settings', color: 'linear-gradient(135deg, #64748b, #334155)' }
];

function handleCenterButtonClick() {
    const wheel = document.getElementById('appleWatchWheel');
    if (!wheel) return;

    currentSetIndex = (currentSetIndex + 1) % 4;

    if (currentSetIndex === 0) {
        wheel.classList.remove('active');
    } else {
        wheel.classList.add('active');
        renderCurrentOrbitSet();
    }
}

function renderCurrentOrbitSet() {
    const container = document.getElementById('watchNodesContainer');
    if (!container) return;
    container.innerHTML = '';

    let activeSet = orbitSet1;
    if (currentSetIndex === 2) activeSet = orbitSet2;
    if (currentSetIndex === 3) activeSet = orbitSet3;

    const radius = 80;
    const centerX = 110;
    const centerY = 110;

    activeSet.forEach((item, index) => {
        const angle = (index / activeSet.length) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle) - 21;
        const y = centerY + radius * Math.sin(angle) - 21;

        const node = document.createElement('div');
        node.className = 'watch-node';
        node.style.cssText = `left: ${x}px; top: ${y}px; background: ${item.color};`;
        node.innerHTML = `<i class="${item.icon}" style="color: #fff;"></i>`;
        node.title = item.name;
        node.onclick = (e) => {
            e.stopPropagation();
            switchTab(item.tab);
            currentSetIndex = 0;
            document.getElementById('appleWatchWheel').classList.remove('active');
        };
        container.appendChild(node);
    });
}

const floatDock = document.getElementById('floatingWatchDock');
let isDragging = false;
let startX, startY, initialX, initialY;

if (floatDock) {
    floatDock.addEventListener('pointerdown', (e) => {
        if (e.target.closest('.watch-node')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = floatDock.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        floatDock.setPointerCapture(e.pointerId);
    });

    floatDock.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        floatDock.style.left = `${initialX + dx}px`;
        floatDock.style.top = `${initialY + dy}px`;
        floatDock.style.bottom = 'auto';
        floatDock.style.right = 'auto';
    });

    floatDock.addEventListener('pointerup', (e) => {
        isDragging = false;
        floatDock.releasePointerCapture(e.pointerId);
    });
}

window.playPauseLofi = function() {
    const audioElem = document.getElementById('lofiAudioElement');
    if (!audioElem) return;
    if (audioElem.paused) {
        audioElem.play().catch(e => console.log("Audio play blocked:", e));
    } else {
        audioElem.pause();
    }
};

window.changeLofiTrack = function(trackId) {
    const audioElem = document.getElementById('lofiAudioElement');
    if (!audioElem) return;
    audioElem.src = trackId; 
    audioElem.play().catch(e => console.log("Track change play error:", e));
};
let currentModuleSub = 'physics';

function switchModuleSubject(sub) {
    currentModuleSub = sub;
    document.querySelectorAll('#view-module .sub-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById('btn-mod-' + sub);
    if (btn) btn.classList.add('active');
    renderModuleTracker();
}

function getModuleData() {
    return JSON.parse(localStorage.getItem('arjunaHUD_moduleTracker')) || {};
}

function saveModuleData(data) {
    localStorage.setItem('arjunaHUD_moduleTracker', JSON.stringify(data));
}

const moduleSectionsList = [
    { key: 'cyu', name: '1. Check Your Understanding' },
    { key: 'topic', name: '2. Topic Wise' },
    { key: 'main', name: '3. JEE Mains Level' },
    { key: 'bridge', name: '4. Bridge Level' },
    { key: 'adv', name: '5. JEE Advanced Level' },
    { key: 'pyq', name: '6. PYQs' },
    { key: 'challenger', name: '7. Challengers Question' },
    { key: 'additional', name: '8. Additional Questions' }
];

function renderModuleTracker() {
    const container = document.getElementById('moduleChaptersContainer');
    if (!container) return;
    container.innerHTML = '';

    const chapters = syllabusData[currentModuleSub] || [];
    const allModules = getModuleData();
    const savedErrors = JSON.parse(localStorage.getItem('arjunaHUD_errorbook')) || [];

    chapters.forEach((chap, idx) => {
        const chapKey = `${currentModuleSub}_${idx}`;
        if (!allModules[chapKey]) allModules[chapKey] = {};

        const chapErrors = savedErrors.filter(e => e.chap === chap.name && e.sub.toLowerCase() === currentModuleSub);
        const totalChapterErrors = chapErrors.length;

        let chapCard = document.createElement('div');
        chapCard.className = 'hud-card';
        chapCard.style.cssText = "border-color: var(--cyan-glow); margin-bottom: 14px;";

        let sectionsHTML = '';
        let chapterTotalQ = 0;
        let chapterDoneQ = 0;

        moduleSectionsList.forEach(sec => {
            if (!allModules[chapKey][sec.key]) {
                allModules[chapKey][sec.key] = { total: 20, done: 0 };
            }
            let secData = allModules[chapKey][sec.key];
            chapterTotalQ += Number(secData.total) || 0;
            chapterDoneQ += Number(secData.done) || 0;
            let unsolved = Math.max(0, (secData.total - secData.done));

            sectionsHTML += `
                <div style="background: rgba(3, 7, 18, 0.5); padding: 10px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 8px;">
                    <div style="font-size: 0.78rem; font-weight: bold; color: #fff; margin-bottom: 6px;">${sec.name}</div>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: var(--text-sub); flex-wrap: wrap; gap: 8px;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <span>Done:</span>
                            <input type="number" class="mini-input" style="width: 55px; text-align: center;" value="${secData.done}" onchange="updateModuleCount('${chapKey}', '${sec.key}', 'done', this.value)"> 
                            <span>/ Total:</span>
                            <input type="number" class="mini-input" style="width: 55px; text-align: center;" value="${secData.total}" onchange="updateModuleCount('${chapKey}', '${sec.key}', 'total', this.value)">
                        </div>
                        <div style="color: #f59e0b;">Left: <b>${unsolved}</b></div>
                    </div>
                </div>
            `;
        });

        chapCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
                <div>
                    <div style="font-size: 0.95rem; font-weight: bold; color: #fff;">${idx + 1}. ${chap.name}</div>
                    <div style="font-size: 0.72rem; color: var(--purple-glow); margin-top: 2px;">Total Solved: ${chapterDoneQ} / ${chapterTotalQ} Qs</div>
                </div>
                <div style="font-size: 0.7rem; background: rgba(239, 68, 68, 0.15); color: var(--danger-color); padding: 5px 9px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.3);">
                    Errors: <b>${totalChapterErrors}</b>
                </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
                ${sectionsHTML}
            </div>
        `;
        container.appendChild(chapCard);
    });
}

function updateModuleCount(chapKey, secKey, field, val) {
    let allModules = getModuleData();
    if (!allModules[chapKey]) allModules[chapKey] = {};
    if (!allModules[chapKey][secKey]) allModules[chapKey][secKey] = { total: 20, done: 0 };

    allModules[chapKey][secKey][field] = parseInt(val) || 0;
    saveModuleData(allModules);

    let totalDoneForChap = 0;
    moduleSectionsList.forEach(sec => {
        if (allModules[chapKey][sec.key]) {
            totalDoneForChap += Number(allModules[chapKey][sec.key].done) || 0;
        }
    });

    if (typeof userProgress[chapKey] === 'undefined') {
        userProgress[chapKey] = { totalLec: 10, doneLec: 0, totalDpp: 10, doneDpp: 0, questionsDone: 0 };
    }
    userProgress[chapKey].questionsDone = totalDoneForChap;
    localStorage.setItem('arjunaHUD_prog_v4', JSON.stringify(userProgress));

    if (typeof recalculateSubjectGauges === 'function') recalculateSubjectGauges();
    if (typeof updatePracticeProgressGauge === 'function') updatePracticeProgressGauge();

    renderModuleTracker();
}

let arjunaGamification = JSON.parse(localStorage.getItem('arjunaHUD_gamification')) || {
    xp: 0,
    streak: 1,
    lastCheckIn: ""
};

function updateGamificationUI() {
    const xpElem = document.getElementById('userTotalXP');
    const streakElem = document.getElementById('userStreakCount');
    const levelElem = document.getElementById('userLevelNum');
    const rankElem = document.getElementById('userRankName');
    
    const xp = arjunaGamification.xp || 0;
    const level = Math.floor(xp / 500) + 1;
         
    let rank = "Arjuna Novice";
    if (level >= 3) rank = "JEE Challenger";
    if (level >= 6) rank = "Advanced Sniper";
    if (level >= 10) rank = "IIT Bombay Contender";
         
    if (xpElem) xpElem.innerText = xp;
    if (streakElem) streakElem.innerHTML = `🔥 ${arjunaGamification.streak || 0} Days`;
    if (levelElem) levelElem.innerText = `Level ${level}`;
    if (rankElem) rankElem.innerText = rank;
}

function addXP(amount) {
    arjunaGamification.xp = (arjunaGamification.xp || 0) + amount;
    localStorage.setItem('arjunaHUD_gamification', JSON.stringify(arjunaGamification));
    updateGamificationUI();
}

function claimDailyBonusXP() {
    const today = new Date().toDateString();
    
    if (arjunaGamification.lastCheckIn === today) {
        alert("Aapne aaj ka daily bonus pehle hi claim kar liya hai! Kal wapas aana.");
        return;
    }

    arjunaGamification.lastCheckIn = today;
    arjunaGamification.streak = (arjunaGamification.streak || 0) + 1;
    
    addXP(50);
    alert(`🔥 SHABAASH!\n\nDaily Bonus Claimed!\n+50 XP added & Daily Streak updated to ${arjunaGamification.streak} Days!`);
}

let mockTestData = [
    {
        id: 1,
        sub: 'PHYSICS',
        question: "A particle starts from rest with a uniform acceleration of 2 m/s². What is its velocity after 5 seconds?",
        options: ["5 m/s", "10 m/s", "15 m/s", "20 m/s"],
        correct: 1,
        solution: "v = u + at => v = 0 + (2 * 5) = 10 m/s"
    },
    {
        id: 2,
        sub: 'CHEMISTRY',
        question: "Which of the following orbitals has spherical symmetry?",
        options: ["p-orbital", "d-orbital", "s-orbital", "f-orbital"],
        correct: 2,
        solution: "s-orbitals are spherically symmetric."
    },
    {
        id: 3,
        sub: 'MATHS',
        question: "If log₂ (x - 1) = 3, then the value of x is:",
        options: ["7", "8", "9", "10"],
        correct: 2,
        solution: "x - 1 = 2³ => x - 1 = 8 => x = 9"
    }
];

let currentTestState = {
    timerSeconds: 1800,
    timerInterval: null,
    answers: {},
    reviewStatus: {},
    currentQIndex: 0
};
function renderTestAnalysis() {
    const container = document.getElementById('testAnalysisContainer');
    if (!container) return;

    let testHistory = JSON.parse(localStorage.getItem('arjunaHUD_testHistory')) || [];

    let historyHTML = testHistory.length === 0 ? 
        '<div style="font-size:0.75rem; color:var(--text-sub); text-align:center; padding:15px;">Aapne abhi tak koi Mock Test nahi diya hai!</div>' :
        testHistory.map(t => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-size:0.8rem; font-weight:bold; color:#fff;">${t.title}</div>
                    <div style="font-size:0.65rem; color:var(--text-sub);">${t.date} • Accuracy: ${t.accuracy}%</div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:0.9rem; font-weight:800; color:var(--cyan-glow);">${t.score} / ${t.totalMarks}</div>
                    <div style="font-size:0.65rem; color:var(--success-color);">+${t.xpEarned} XP</div>
                </div>
            </div>
        `).join('');

    container.innerHTML = `
        <div style="width: 100%; box-sizing: border-box;">
            <div style="background: linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(168, 85, 247, 0.1)); border: 1px solid var(--cyan-glow); padding: 15px; border-radius: 12px; margin-bottom: 15px; text-align: center;">
                <h3 style="font-size: 1rem; color: #fff; margin-bottom: 6px;">🎯 NTA Pattern JEE Mock Test</h3>
                <p style="font-size: 0.72rem; color: var(--text-sub); margin-bottom: 12px;">Real Exam Timer • Marking (+4 / -1) • Instant XP Reward</p>
                <button onclick="startJEEMockTest()" style="background: var(--cyan-glow); color: #000; font-weight: bold; font-size: 0.85rem; padding: 10px 20px; border-radius: 8px; cursor: pointer; box-shadow: 0 0 12px rgba(0,240,255,0.4);">🚀 START MOCK TEST</button>
            </div>
            <div style="font-size: 0.8rem; font-weight: bold; color: var(--text-sub); margin-bottom: 8px;">PREVIOUS TEST RESULTS</div>
            ${historyHTML}
        </div>
    `;
}

function startJEEMockTest() {
    currentTestState.currentQIndex = 0;
    currentTestState.answers = {};
    currentTestState.reviewStatus = {};
    currentTestState.timerSeconds = 1800;

    if (currentTestState.timerInterval) clearInterval(currentTestState.timerInterval);
    currentTestState.timerInterval = setInterval(() => {
        currentTestState.timerSeconds--;
        const timerElem = document.getElementById('ntaLiveTimer');
        if (timerElem) {
            let m = Math.floor(currentTestState.timerSeconds / 60);
            let s = currentTestState.timerSeconds % 60;
            timerElem.innerText = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
        }
        if (currentTestState.timerSeconds <= 0) {
            clearInterval(currentTestState.timerInterval);
            submitJEEMockTest();
        }
    }, 1000);

    renderNTAExamScreen();
}

function renderNTAExamScreen() {
    const container = document.getElementById('testAnalysisContainer');
    if (!container) return;

    const q = mockTestData[currentTestState.currentQIndex];

    let paletteHTML = mockTestData.map((item, idx) => {
        let isAnswered = currentTestState.answers[item.id] !== undefined;
        let isReview = currentTestState.reviewStatus[item.id];
        let bgColor = "rgba(255,255,255,0.1)";
        let borderColor = "rgba(255,255,255,0.2)";

        if (isReview) bgColor = "#a855f7";
        else if (isAnswered) bgColor = "#10b981";
        else if (idx === currentTestState.currentQIndex) bgColor = "#ef4444";

        return `<button onclick="jumpToNTAQuestion(${idx})" style="width: 28px; height: 28px; border-radius: 6px; border: 1px solid ${borderColor}; background: ${bgColor}; color: #fff; font-weight: bold; font-size: 0.7rem; cursor: pointer;">${idx + 1}</button>`;
    }).join('');

    let optionsHTML = q.options.map((opt, idx) => {
        let isSelected = currentTestState.answers[q.id] === idx;
        return `
            <div onclick="selectNTAOption(${q.id}, ${idx})" style="background: ${isSelected ? 'rgba(0,240,255,0.15)' : 'rgba(255,255,255,0.03)'}; border: 1px solid ${isSelected ? 'var(--cyan-glow)' : 'rgba(255,255,255,0.1)'}; padding: 10px; border-radius: 8px; margin-bottom: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                <div style="width: 16px; height: 16px; border-radius: 50%; border: 2px solid ${isSelected ? 'var(--cyan-glow)' : 'rgba(255,255,255,0.4)'}; background: ${isSelected ? 'var(--cyan-glow)' : 'transparent'};"></div>
                <div style="font-size: 0.8rem; color: ${isSelected ? 'var(--cyan-glow)' : '#fff'};">${opt}</div>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div style="background: #030712; padding: 12px; border-radius: 12px; border: 1px solid rgba(0,240,255,0.3); width: 100%; box-sizing: border-box;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <span style="font-size: 0.75rem; color: var(--cyan-glow); font-weight: bold;">SUB: ${q.sub}</span>
                <span style="font-size: 0.85rem; color: #f59e0b; font-weight: 800; font-family: monospace;">⏳ <span id="ntaLiveTimer">30:00</span></span>
            </div>
            <div style="font-size: 0.85rem; font-weight: bold; color: #fff; margin-bottom: 12px;">Q${currentTestState.currentQIndex + 1}. ${q.question}</div>
            <div style="margin-bottom: 12px;">${optionsHTML}</div>
            <div style="margin-bottom: 15px;">
                <div style="font-size: 0.65rem; color: var(--text-sub); margin-bottom: 6px;">QUESTION PALETTE:</div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">${paletteHTML}</div>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 6px;">
                <button onclick="toggleNTAReview(${q.id})" style="background: rgba(168,85,247,0.2); border: 1px solid var(--purple-glow); color: var(--purple-glow); padding: 8px 10px; border-radius: 6px; font-size: 0.7rem; cursor: pointer;">Mark Review</button>
                <div style="display: flex; gap: 6px;">
                    ${currentTestState.currentQIndex > 0 ? `<button onclick="jumpToNTAQuestion(${currentTestState.currentQIndex - 1})" style="background: rgba(255,255,255,0.1); border: none; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 0.7rem; cursor: pointer;">Prev</button>` : ''}
                    ${currentTestState.currentQIndex < mockTestData.length - 1 ? `<button onclick="jumpToNTAQuestion(${currentTestState.currentQIndex + 1})" style="background: var(--cyan-glow); color: #000; font-weight: bold; border: none; padding: 8px 12px; border-radius: 6px; font-size: 0.7rem; cursor: pointer;">Next ➔</button>` : ''}
                </div>
            </div>
            <button onclick="submitJEEMockTest()" style="width: 100%; margin-top: 15px; background: rgba(239,68,68,0.2); border: 1px solid var(--danger-color); color: var(--danger-color); font-weight: bold; padding: 10px; border-radius: 8px; font-size: 0.8rem; cursor: pointer;">SUBMIT TEST NOW</button>
        </div>
    `;
}

function selectNTAOption(qId, optionIdx) {
    currentTestState.answers[qId] = optionIdx;
    renderNTAExamScreen();
}

function jumpToNTAQuestion(idx) {
    currentTestState.currentQIndex = idx;
    renderNTAExamScreen();
}

function toggleNTAReview(qId) {
    currentTestState.reviewStatus[qId] = !currentTestState.reviewStatus[qId];
    renderNTAExamScreen();
}

function submitJEEMockTest() {
    if (currentTestState.timerInterval) clearInterval(currentTestState.timerInterval);

    let totalMarks = mockTestData.length * 4;
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;

    mockTestData.forEach(q => {
        let userAns = currentTestState.answers[q.id];
        if (userAns !== undefined) {
            if (userAns === q.correct) {
                score += 4;
                correctCount++;
            } else {
                score -= 1;
                wrongCount++;
            }
        }
    });

    let accuracy = (correctCount + wrongCount) > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0;
    let xpEarned = Math.max(20, score * 5);

    let testHistory = JSON.parse(localStorage.getItem('arjunaHUD_testHistory')) || [];
    testHistory.unshift({
        title: "Arjuna NTA Mock Test",
        date: new Date().toLocaleDateString(),
        score: score,
        totalMarks: totalMarks,
        accuracy: accuracy,
        xpEarned: xpEarned
    });
    localStorage.setItem('arjunaHUD_testHistory', JSON.stringify(testHistory));

    if (typeof addXP === 'function') addXP(xpEarned);

    alert(`🎉 TEST SUBMITTED!\n\nScore: ${score} / ${totalMarks}\nCorrect: ${correctCount} | Wrong: ${wrongCount}\nAccuracy: ${accuracy}%\n+${xpEarned} XP Added!`);
    renderTestAnalysis();
}

let subjectGaugeInstances = {};

function renderSmartHUDSection() {
    let subjects = ['physics', 'chemistry', 'maths'];

    setTimeout(() => {
        subjects.forEach(sub => {
            let subQues = 0, subLec = 0, doneSubTasks = 0, totalSubTasks = 10 * 8;
            
            if (typeof syllabusData !== 'undefined' && syllabusData[sub]) {
                syllabusData[sub].forEach((chap, idx) => {
                    let key = `${sub}_${idx}`;
                    let prog = userProgress[key];
                    if (prog) {
                        subQues += Number(prog.questionsDone || 0);
                        subLec += Number(prog.doneLec || 0);
                        if (prog.theory) doneSubTasks++;
                        if (prog.notes) doneSubTasks++;
                        if (prog.shortNotes) doneSubTasks++;
                        if (prog.topic) doneSubTasks++;
                        if (prog.main) doneSubTasks++;
                        if (prog.bridge) doneSubTasks++;
                        if (prog.adv) doneSubTasks++;
                        if (prog.pyq) doneSubTasks++;
                    }
                });
            }

            let percent = Math.min(Math.round((doneSubTasks / totalSubTasks) * 100), 100);
            
            let subBacklogCount = 0;
            if (typeof backlogData !== 'undefined' && Array.isArray(backlogData)) {
                backlogData.forEach(item => {
                    if ((item.sub || '').toLowerCase() === sub && item.status === 'pending') {
                        subBacklogCount += Number(item.count || 1);
                    }
                });
            }

            const pElem = document.getElementById(`percentSub_${sub}`);
            const bElem = document.getElementById(`backlogSub_${sub}`);
            if (pElem) pElem.innerText = percent + '%';
            if (bElem) bElem.innerText = `Backlog: ${subBacklogCount}`;

            let color = sub === 'physics' ? '#00f0ff' : sub === 'chemistry' ? '#a855f7' : '#10b981';
            subjectGaugeInstances[sub] = drawMiniGauge(`gaugeSub_${sub}`, percent, color, subjectGaugeInstances[sub]);
        });
    }, 100);

    const urgentContainer = document.getElementById('urgentPendingTasksContainer');
    if (urgentContainer) {
        let tasks = window.getTodoList();
        let pendingList = tasks.filter(t => !t.completed && !t.done);
        if (pendingList.length === 0) {
            urgentContainer.innerHTML = `<div style="font-size: 0.7rem; color: var(--text-sub); text-align: center; padding: 10px;">Koi pending task nahi hai! Shabaash!</div>`;
        } else {
            urgentContainer.innerHTML = pendingList.map((task) => {
                let diffDays = Math.floor((Date.now() - (task.id || Date.now())) / (1000 * 60 * 60 * 24));
                let timeText = diffDays === 0 ? "Aaj ka task" : `${diffDays} din purana`;

                return `
                    <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); padding: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <div>
                            <div style="font-size: 0.75rem; color: #fff;">${task.text}</div>
                            <div style="font-size: 0.6rem; color: var(--warning-color); margin-top: 2px;">⏳ ${timeText}</div>
                        </div>
                        <button onclick="toggleTaskComplete(${task.id})" style="background: var(--success-color); color: #000; border: none; font-weight: bold; font-size: 0.65rem; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Done</button>
                    </div>
                `;
            }).join('');
        }
    }
}
function openSectionWithBack(sectionId) {
    document.querySelectorAll('.section-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });

    if (sectionId === 'app-hub' || sectionId === 'dashboard') {
        if (typeof goBackToHub === 'function' && sectionId === 'app-hub') {
            goBackToHub();
            return;
        }
    }

    let targetView = document.getElementById(`view-${sectionId}`);
    
    if (!targetView && (sectionId === 'dashboard' || sectionId === 'main-dashboard')) {
        targetView = document.getElementById('view-dashboard') || document.getElementById('view-main-dashboard');
    }
    if (!targetView && sectionId === 'school-tracker') {
        targetView = document.getElementById('view-school') || document.getElementById('view-school-tracker');
    }

    if (targetView) {
        targetView.classList.add('active');
        targetView.style.display = 'block';

        if (!targetView.querySelector('.back-bar-header') && sectionId !== 'app-hub') {
            const backBar = document.createElement('div');
            backBar.className = 'back-bar-header';
            backBar.style.cssText = "margin-bottom: 15px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.08);";
            backBar.innerHTML = `
                <button class="btn-back-link" onclick="openSectionWithBack('app-hub')" style="background: rgba(0,240,255,0.15); border: 1px solid var(--cyan-glow); color: var(--cyan-glow); padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                    <i class="fas fa-arrow-left"></i> Home
                </button>
            `;
            targetView.insertBefore(backBar, targetView.firstChild);
        }

        if (sectionId === 'smart-hud' && typeof renderMasterReportCard === 'function') {
            renderMasterReportCard();
        }
        if (sectionId === 'errorbook' && typeof renderErrorBook === 'function') {
            renderErrorBook();
        }
        if (sectionId === 'backlog' && typeof renderBacklog === 'function') {
            renderBacklog();
        }
        if (sectionId === 'testanalysis' && typeof renderTestAnalysis === 'function') {
            renderTestAnalysis();
        }
        if ((sectionId === 'dashboard' || sectionId === 'main-dashboard')) {
            if (typeof recalculateSubjectGauges === 'function') recalculateSubjectGauges();
            if (typeof renderStudyHoursGraph === 'function') renderStudyHoursGraph();
        }
    }
}

function goBackToHub() {
    document.querySelectorAll('.section-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });
    
    const hubView = document.getElementById('view-app-hub');
    if (hubView) {
        hubView.classList.add('active');
        hubView.style.display = 'block';
    }
}

function toggleHubExtension() {
    const extraContainer = document.getElementById('extraHubItems');
    const toggleText = document.getElementById('hubToggleText');
    const toggleIcon = document.getElementById('hubToggleIcon');

    if (!extraContainer) return;

    if (extraContainer.style.display === 'none' || extraContainer.style.display === '') {
        extraContainer.style.display = 'grid';
        if (toggleText) toggleText.innerText = 'Kam dikhao';
        if (toggleIcon) toggleIcon.className = 'fas fa-chevron-up';
    } else {
        extraContainer.style.display = 'none';
        if (toggleText) toggleText.innerText = 'Aur features';
        if (toggleIcon) toggleIcon.className = 'fas fa-chevron-down';
    }
}

function calculateOverallReadiness() {
    let progData = JSON.parse(localStorage.getItem('arjunaHUD_prog_v4')) || {};
    let keys = Object.keys(progData);
    let totalScore = 0;
    let count = 0;

    keys.forEach(k => {
        let item = progData[k];
        if (item) {
            let lecPct = item.totalLec ? (item.doneLec / item.totalLec) * 100 : 0;
            totalScore += Math.min(lecPct, 100);
            count++;
        }
    });

    let finalPct = count > 0 ? Math.round(totalScore / count) : 0;
    
    const readinessElem = document.querySelector('.readiness-percentage') || document.getElementById('overallReadinessScore');
    if (readinessElem) {
        readinessElem.innerText = `${finalPct}%`;
    }
}

function openChapterHeatmapDirect(sub, chapIdx) {
    currentActiveDeepSub = sub;
    currentActiveDeepChapIdx = chapIdx;

    document.querySelectorAll('.section-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });

    const targetView = document.getElementById('view-chapter-deep');
    if (targetView) {
        targetView.classList.add('active');
        targetView.style.display = 'block';
    }

    renderDeepChapterHeader();
    switchDeepTab('heatmap');
}

function calculateChapterMastery(sub, idx) {
    const key = `${sub}_${idx}`;
    const data = userProgress[key] || { 
        totalLec: 10, doneLec: 0, 
        totalDpp: 10, doneDpp: 0, 
        questionsDone: 0,
        theory: false, notes: false, shortNotes: false, topic: false, main: false, bridge: false, adv: false, pyq: false 
    };

    let completedStages = 0;
    ['theory', 'notes', 'shortNotes', 'topic', 'main', 'bridge', 'adv', 'pyq'].forEach(st => {
        if (data[st]) completedStages++;
    });
    let stageWeight = (completedStages / 8) * 30;
    let lecWeight = data.totalLec > 0 ? (Number(data.doneLec || 0) / Number(data.totalLec || 10)) * 25 : 0;
    let dppWeight = data.totalDpp > 0 ? (Number(data.doneDpp || 0) / Number(data.totalDpp || 10)) * 20 : 0;

    const revKey = `rev_${sub}_${idx}`;
    const revData = JSON.parse(localStorage.getItem('arjunaRevision_prog') || '{}')[revKey] || { r1: false, r3: false, r7: false };
    let revDoneCount = (revData.r1 ? 1 : 0) + (revData.r3 ? 1 : 0) + (revData.r7 ? 1 : 0);
    let revisionWeight = (revDoneCount / 3) * 15;

    const schoolKey = `sch_${sub}_${idx}`;
    const schoolData = (typeof schoolProgress !== 'undefined' && schoolProgress[schoolKey]) ? schoolProgress[schoolKey] : { theory: false, notes: false, ncert: false };
    let schoolDoneCount = (schoolData.theory ? 1 : 0) + (schoolData.notes ? 1 : 0) + (schoolData.ncert ? 1 : 0);
    let schoolWeight = (schoolDoneCount / 3) * 10;

    let totalScore = lecWeight + dppWeight + stageWeight + revisionWeight + schoolWeight;
    return Math.min(Math.round(totalScore), 100);
}

window.switchTab = function(tabId) {
    const menu = document.getElementById('moreMenuPopup');
    if (menu) menu.style.display = 'none';
         
    document.querySelectorAll('.section-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });
         
    let targetView = document.getElementById('view-' + tabId);
    
    if (!targetView && tabId === 'dashboard') {
        targetView = document.getElementById('view-dashboard') || document.getElementById('view-main-dashboard');
    }

    if (targetView) {
        targetView.classList.add('active');
        targetView.style.display = 'block';

        if (!targetView.querySelector('.back-bar-header') && tabId !== 'app-hub' && tabId !== 'dashboard') {
            const backBar = document.createElement('div');
            backBar.className = 'back-bar-header';
            backBar.style.cssText = "margin-bottom: 15px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.08);";
            backBar.innerHTML = `
                <button class="btn-back-link" onclick="openSectionWithBack('app-hub')" style="background: rgba(0,240,255,0.15); border: 1px solid var(--cyan-glow); color: var(--cyan-glow); padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                    <i class="fas fa-arrow-left"></i> Home
                </button>
            `;
            targetView.insertBefore(backBar, targetView.firstChild);
        }
    }

    if (tabId === 'todo') renderTodoList();
    if (tabId === 'focus') {
        window.updateFocusStatsUI();
        window.updateTimerDisplay();
    }
    if (tabId === 'backlog' && typeof renderBacklog === 'function') renderBacklog();
    if (tabId === 'errorbook' && typeof renderErrorBook === 'function') renderErrorBook();
    if (tabId === 'testanalysis' && typeof renderTestAnalysis === 'function') renderTestAnalysis();
};

window.openLocalMusicModal = function() {
    const modal = document.getElementById('localMusicModal');
    if (modal) modal.style.display = 'flex';
};

window.closeLocalMusicModal = function() {
    const modal = document.getElementById('localMusicModal');
    if (modal) modal.style.display = 'none';
};

window.loadLocalAudioFiles = function(input) {
    const files = input.files;
    const playlistContainer = document.getElementById('localPlaylistContainer');
    const audioPlayer = document.getElementById('floatingCustomAudioPlayer');
    if (!playlistContainer || files.length === 0) return;

    playlistContainer.innerHTML = '';
    Array.from(files).forEach((file, index) => {
        const fileURL = URL.createObjectURL(file);
        if (index === 0 && audioPlayer) {
            audioPlayer.src = fileURL;
        }

        const item = document.createElement('div');
        item.style.cssText = "padding: 6px 10px; background: rgba(3,7,18,0.5); margin-bottom: 4px; border-radius: 6px; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #fff;";
        item.innerText = `${index + 1}. ${file.name}`;
        item.onclick = () => {
            if (audioPlayer) {
                audioPlayer.src = fileURL;
                audioPlayer.play().catch(e => console.log("Audio play error:", e));
            }
        };
        playlistContainer.appendChild(item);
    });
};
window.updateHeaderStats = function() {
    const xpElem = document.getElementById('headerXpDisplay') || document.getElementById('xpNumText');
    const streakElem = document.getElementById('headerStreakDisplay') || document.getElementById('streakNumText');
    
    const gamification = JSON.parse(localStorage.getItem('arjunaHUD_gamification')) || { xp: 2530, streak: 7 };
    
    if (xpElem) xpElem.textContent = `${gamification.xp || 2530} `;
    if (streakElem) streakElem.textContent = `🔥 ${gamification.streak || 7} `;
};

// DOMContentLoaded ke andar ise add kar dein:
window.addEventListener('DOMContentLoaded', () => {
    window.updateHeaderStats();
    updateJeeCountdown();
});


window.getGamificationData = function() {
    let data = JSON.parse(localStorage.getItem('arjunaHUD_gamification'));
    if (!data) {
        data = { xp: 0, streak: 0, lastCheckIn: null };
        localStorage.setItem('arjunaHUD_gamification', JSON.stringify(data));
    }
    return data;
};

window.claimDailyCheckIn = function() {
    const data = window.getGamificationData();
    const today = new Date().toDateString();

    if (data.lastCheckIn === today) {
        alert("Aaj ka Daily Check-In pehle se claimed hai! Kal dobara aayein.");
        return;
    }

    data.xp += 50;
    data.streak += 1;
    data.lastCheckIn = today;

    localStorage.setItem('arjunaHUD_gamification', JSON.stringify(data));
    window.updateHeaderStats();
    alert("Shabaash! +50 XP aur +1 Day Streak add ho gaya! 🔥");
};

window.addXp = function(amount) {
    const data = window.getGamificationData();
    data.xp += amount;
    localStorage.setItem('arjunaHUD_gamification', JSON.stringify(data));
    window.updateHeaderStats();
};

window.openXpLeaderboardModal = function() {
    if (typeof switchTab === 'function') {
        switchTab('leaderboard');
    }
};

window.updateArjunaStudyGoalsHUD = function() {
    let tasks = [];
    try {
        tasks = JSON.parse(localStorage.getItem('arjunaHUD_tasks')) || JSON.parse(localStorage.getItem('arjunaHUD_todo')) || [];
    } catch(e) {
        tasks = [];
    }

    let totalCount = tasks.length;
    let completedCount = tasks.filter(t => t.completed || t.done).length;
    let tasksLeft = totalCount - completedCount;
    let percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const tasksLeftElem = document.getElementById('todoTaskCountText');
    if (tasksLeftElem) {
        tasksLeftElem.textContent = `${tasksLeft} Tasks Left`;
    }

    const progressBarInner = document.getElementById('todoLineProgressBar');
    if (progressBarInner) {
        progressBarInner.style.width = `${percent}%`;
        progressBarInner.style.transition = 'width 0.3s ease';
    }
};

const existingRenderForHUD = window.renderTodoList;
if (typeof existingRenderForHUD === 'function') {
    window.renderTodoList = function() {
        existingRenderForHUD();
        window.updateArjunaStudyGoalsHUD();
    };
}

window.playArjunaAlarmRingtone = function() {
    try {
        const audioCtx = new (window.webkitAudioContext || window.AudioContext)();
        let notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, index) => {
            let osc = audioCtx.createOscillator();
            let gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime + (index * 0.15));
            gain.gain.setValueAtTime(0.15, audioCtx.currentTime + (index * 0.15));
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (index * 0.15) + 0.4);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + (index * 0.15));
            osc.stop(audioCtx.currentTime + (index * 0.15) + 0.4);
        });
    } catch(e) {
        console.log("Audio alert not supported or blocked");
    }
};

window.requestArjunaNotifications = function() {
    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
    }
};

window.checkArjunaSmartSchedulerAndAlerts = function() {
    let tasks = [];
    try {
        tasks = JSON.parse(localStorage.getItem('arjunaHUD_tasks')) || JSON.parse(localStorage.getItem('arjunaHUD_todo')) || [];
    } catch(e) {
        tasks = [];
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const todayDateStr = now.toISOString().split('T')[0];

    tasks.forEach(task => {
        if (!task.completed && !task.done && task.startTime) {
            let [startH, startM] = task.startTime.split(':').map(Number);
            let totalStartMins = startH * 60 + startM;
            let currentTotalMins = currentHour * 60 + currentMin;
            let diffMins = totalStartMins - currentTotalMins;

            if (diffMins === 10 && !task.warned10Min) {
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification("⚠️ Class Alert: 10 Mins Left!", {
                        body: `Aapki class / task "${task.text}" shuru hone me sirf 10 minute baaki hain! Taiyar ho jao.`,
                    });
                }
                window.playArjunaAlarmRingtone();
                task.warned10Min = true;
                localStorage.setItem('arjunaHUD_tasks', JSON.stringify(tasks));
                localStorage.setItem('arjunaHUD_todo', JSON.stringify(tasks));
            }

            if (diffMins === 0 && !task.notifiedExact) {
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification("🚀 Class Time Ho Gaya!", {
                        body: `Abhi ka task shuru karne ka time ho gaya hai: ${task.text}`,
                    });
                }
                window.playArjunaAlarmRingtone();
                task.notifiedExact = true;
                localStorage.setItem('arjunaHUD_tasks', JSON.stringify(tasks));
                localStorage.setItem('arjunaHUD_todo', JSON.stringify(tasks));
            }
        }
    });

    let revisionProg = {};
    try {
        revisionProg = JSON.parse(localStorage.getItem('arjunaRevision_prog') || '{}');
    } catch(e) {
        revisionProg = {};
    }

    let lastDailyAlert = localStorage.getItem('arjunaLastDailyAlertDate') || '';
    if (currentHour === 9 && currentMin === 0 && lastDailyAlert !== todayDateStr) {
        let pendingRevisions = [];
        if (typeof syllabusData !== 'undefined') {
            ['physics', 'chemistry', 'maths'].forEach(sub => {
                if (syllabusData[sub]) {
                    syllabusData[sub].forEach((chap, idx) => {
                        let revKey = `rev_${sub}_${idx}`;
                        let rData = revisionProg[revKey];
                        if (!rData || !rData.r1 || !rData.r3 || !rData.r7) {
                            pendingRevisions.push(`${sub.toUpperCase()}: ${chap.name}`);
                        }
                    });
                }
            });
        }

        if (pendingRevisions.length > 0) {
            let sampleChap = pendingRevisions[Math.floor(Math.random() * pendingRevisions.length)];
            if ("Notification" in window && Notification.permission === "granted") {
                new Notification("📚 Spaced Revision Alert (1-3-7 Rule)", {
                    body: `Aaj ka revision target: ${sampleChap} ko achhe se revise karein!`,
                });
            }
            window.playArjunaAlarmRingtone();
            localStorage.setItem('arjunaLastDailyAlertDate', todayDateStr);
        }
    }
};

window.updateLeaderboardTabView = function() {
    let gamification = { xp: 0, streak: 0 };
    try {
        const stored = JSON.parse(localStorage.getItem('arjunaHUD_gamification')) || JSON.parse(localStorage.getItem('arjuna_gamification'));
        if (stored) {
            if (typeof stored.xp === 'number') gamification.xp = stored.xp;
            if (typeof stored.streak === 'number') gamification.streak = stored.streak;
        }
    } catch(e) {}

    let currentLevel = Math.floor(gamification.xp / 500) + 1;
    let rankTitle = "Arjuna Beginner";
    if (gamification.xp >= 2000000) rankTitle = "IIT Bombay Mechatronics Elite 🚀";
    else if (gamification.xp >= 100000) rankTitle = "Arjuna Cyber Scholar ⚡";
    else if (gamification.xp >= 50000) rankTitle = "Advanced JEE Aspirant 📚";

    const totalXpElem = document.getElementById('leaderboardTotalXp');
    if (totalXpElem) totalXpElem.textContent = `${gamification.xp} XP`;

    const streakElem = document.getElementById('leaderboardStreakVal');
    if (streakElem) streakElem.textContent = `${gamification.streak} Days`;

    const levelElem = document.getElementById('leaderboardLevelVal');
    if (levelElem) levelElem.textContent = `Level ${currentLevel}`;

    const rankTitleElem = document.getElementById('leaderboardRankTitle');
    if (rankTitleElem) rankTitleElem.textContent = rankTitle;

    const listContainer = document.getElementById('leaderboardListContainer');
    if (listContainer) {
        let peers = [
            { name: "Aarav Sharma (Delhi)", xp: 2450, streak: 12, level: 5 },
            { name: "Ujjwal Yadav (Surat) ⭐ [YOU]", xp: gamification.xp, streak: gamification.streak, level: currentLevel, isUser: true },
            { name: "Priya Patel (Kota)", xp: 1890, streak: 9, level: 4 },
            { name: "Rahul Verma (Mumbai)", xp: 1350, streak: 6, level: 3 },
            { name: "Sneha Gupta (Hyderabad)", xp: 820, streak: 4, level: 2 }
        ];

        peers.sort((a, b) => b.xp - a.xp);

        let html = '';
        peers.forEach((peer, idx) => {
            let rankNum = idx + 1;
            let bgStyle = peer.isUser ? 'background: rgba(0, 240, 255, 0.15); border: 1px solid var(--cyan-glow);' : 'background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08);';
            let crownIcon = rankNum === 1 ? '👑 ' : `#${rankNum} `;

            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-radius: 10px; ${bgStyle}">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-weight: bold; color: ${rankNum === 1 ? '#ffcc00' : 'var(--text-sub)'}; font-size: 0.8rem; width: 22px;">${crownIcon}</span>
                        <div>
                            <div style="font-size: 0.78rem; font-weight: bold; color: ${peer.isUser ? 'var(--cyan-glow)' : '#fff'};">${peer.name}</div>
                            <div style="font-size: 0.62rem; color: var(--text-sub);">Level ${peer.level} • 🔥 ${peer.streak} Days Streak</div>
                        </div>
                    </div>
                    <div style="font-size: 0.8rem; font-weight: 900; color: #ffcc00;">${peer.xp} XP</div>
                </div>
            `;
        });
        listContainer.innerHTML = html;
    }
};

const originalSwitchTabForLB = window.switchTab;
if (typeof originalSwitchTabForLB === 'function') {
    window.switchTab = function(tabId) {
        originalSwitchTabForLB(tabId);
        if (tabId === 'leaderboard') {
            window.updateLeaderboardTabView();
        }
    };
}

// -------------------------------------------------------------------------
// BACKLOG ENGINE (Fixed & Conflict-Free)
// -------------------------------------------------------------------------
window.toggleBacklogComplete = function(index) {
    let backlogList = [];
    try {
        backlogList = JSON.parse(localStorage.getItem('arjunaHUD_backlog')) || JSON.parse(localStorage.getItem('arjuna_backlog')) || [];
    } catch(e) {}

    if (backlogList[index]) {
        let currentStatus = backlogList[index].status === 'done' || backlogList[index].completed === true;
        backlogList[index].status = currentStatus ? 'pending' : 'done';
        backlogList[index].completed = !currentStatus;
        backlogList[index].done = !currentStatus;

        localStorage.setItem('arjunaHUD_backlog', JSON.stringify(backlogList));
        
        if (typeof window.renderBacklog === 'function') window.renderBacklog();
        window.updateBacklogProgressHUD();
    }
};

window.updateBacklogProgressHUD = function() {
    let backlogList = [];
    try {
        backlogList = JSON.parse(localStorage.getItem('arjunaHUD_backlog')) || JSON.parse(localStorage.getItem('arjuna_backlog')) || [];
    } catch(e) {
        backlogList = [];
    }

    let totalCount = backlogList.length;
    let completedCount = 0;

    backlogList.forEach(item => {
        if (item.status === 'done' || item.completed === true || item.done === true) {
            completedCount++;
        }
    });

    let itemsLeft = Math.max(0, totalCount - completedCount);
    let percent = totalCount > 0 ? Math.min(100, Math.round((completedCount / totalCount) * 100)) : 0;

    const countElem = document.getElementById('totalBacklogCountHUD');
    if (countElem) countElem.textContent = `${itemsLeft} Items Left`;

    const progText = document.getElementById('backlogProgressText');
    if (progText) progText.textContent = `${percent}% Completed (${completedCount}/${totalCount} Cleared)`;

    const progressBar = document.getElementById('backlogLineProgressBar');
    if (progressBar) {
        progressBar.style.width = `${percent}%`;
        progressBar.style.transition = 'width 0.3s ease';
    }

    const container = document.getElementById('backlogContainer');
    if (container) {
        const cards = container.children;
        Array.from(cards).forEach((card, idx) => {
            let item = backlogList[idx];
            if (item) {
                let isFinished = (item.status === 'done' || item.completed === true);

                const todayBtn = card.querySelector('button, .today-btn');
                if (todayBtn && !todayBtn.style.padding) {
                    todayBtn.style.cssText = 'padding: 2px 8px !important; font-size: 0.65rem !important; border-radius: 6px !important; height: auto !important;';
                }

                let existingWrap = card.querySelector('.custom-action-wrap');
                if (existingWrap) existingWrap.remove();

                let actionWrap = document.createElement('div');
                actionWrap.className = 'custom-action-wrap';
                actionWrap.style.cssText = 'margin-top: 8px; display: flex; align-items: center; justify-content: flex-end;';

                let btn = document.createElement('button');
                btn.onclick = () => window.toggleBacklogComplete(idx);
                
                if (isFinished) {
                    card.style.opacity = '0.7';
                    btn.style.cssText = 'background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #10b981; padding: 3px 10px; border-radius: 6px; font-size: 0.68rem; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;';
                    btn.innerHTML = '<i class="fas fa-check-circle" style="font-size: 0.65rem;"></i> Completed';
                } else {
                    card.style.opacity = '1';
                    btn.style.cssText = 'background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); color: var(--text-sub); padding: 3px 10px; border-radius: 6px; font-size: 0.68rem; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;';
                    btn.innerHTML = '<i class="far fa-circle" style="font-size: 0.65rem;"></i> Mark Complete';
                }

                actionWrap.appendChild(btn);
                card.appendChild(actionWrap);
            }
        });
    }
};
window.updateTodoProgressHUD = function() {
    let todoList = [];
    try {
        todoList = JSON.parse(localStorage.getItem('arjunaHUD_todo')) || JSON.parse(localStorage.getItem('arjuna_todo')) || [];
    } catch(e) {
        todoList = [];
    }

    let totalCount = todoList.length;
    let completedCount = 0;

    todoList.forEach(item => {
        if (item.status === 'done' || item.completed === true || item.done === true) {
            completedCount++;
        }
    });

    let tasksLeft = Math.max(0, totalCount - completedCount);
    let percent = totalCount > 0 ? Math.min(100, Math.round((completedCount / totalCount) * 100)) : 0;

    const countElem = document.getElementById('todoTaskCountText');
    if (countElem) countElem.textContent = `${tasksLeft} Tasks Left`;

    const progText = document.getElementById('todoProgressText');
    if (progText) progText.textContent = `${percent}% Completed (${tasksLeft} Tasks Left)`;

    const progressBar = document.getElementById('todoLineProgressBar');
    if (progressBar) {
        progressBar.style.width = `${percent}%`;
        progressBar.style.transition = 'width 0.3s ease';
    }
};

window.addEventListener('DOMContentLoaded', () => {
    window.requestArjunaNotifications();
    window.updateBacklogProgressHUD();
    window.updateTodoProgressHUD();
    window.updateLeaderboardTabView();
});

setInterval(() => {
    window.checkArjunaSmartSchedulerAndAlerts();
    window.updateBacklogProgressHUD();
    window.updateTodoProgressHUD();
}, 3000);
window.forceCheckAndRenderTasks = function() {
    let tasks = window.getTodoList();
    const container = document.getElementById('todoListContainer');
    
    if (container) {
        if (tasks.length === 0) {
            container.innerHTML = `<div style="text-align: center; color: #9ca3af; font-size: 0.75rem; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1);">Koi active task nahi hai. Naya task add karein!</div>`;
        } else {
            // Agar tasks hain toh renderTodoList call kar do
            if (typeof renderTodoList === 'function') {
                renderTodoList();
            }
        }
    }
};

// Page load hone par automatically check karega
window.addEventListener('DOMContentLoaded', () => {
    window.forceCheckAndRenderTasks();
});








// --- 1. NOTIFICATION PERMISSION & IN-APP NOTIFICATION BANNER ---
window.requestArjunaNotifications = function() {
    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
    }
};

// In-App Notification Banner Show Karne ka Function
window.showArjunaInAppNotification = function(title, message, type = 'info') {
    let oldBanner = document.getElementById('arjunaInAppBanner');
    if (oldBanner) oldBanner.remove();

    const banner = document.createElement('div');
    banner.id = 'arjunaInAppBanner';
    let borderColor = type === 'success' ? '#10b981' : (type === 'warning' ? '#f59e0b' : '#00f0ff');
    let bgColor = type === 'success' ? 'rgba(16, 185, 129, 0.15)' : (type === 'warning' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0, 240, 255, 0.15)');

    banner.style.cssText = `
        position: fixed;
        top: 75px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 450px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(16px);
        border: 1.5px solid ${borderColor};
        box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 15px ${borderColor};
        border-radius: 14px;
        padding: 14px 18px;
        z-index: 999999;
        animation: slideDownIn 0.3s ease forwards;
        box-sizing: border-box;
    `;

    banner.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
            <div style="font-size: 0.82rem; font-weight: bold; color: ${borderColor};">${title}</div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: #ef4444; font-size: 1rem; cursor: pointer; padding: 0;">✕</button>
        </div>
        <div style="font-size: 0.75rem; color: #fff; line-height: 1.4;">${message}</div>
    `;

    document.body.appendChild(banner);

    // 5 seconds baad automatic hat jayega
    setTimeout(() => {
        if (banner && banner.parentElement) {
            banner.remove();
        }
    }, 6000);
};

// --- 2. AUDIO CELEBRATION SOUND (Clapping / Bell Effect) ---
window.playArjunaCelebrationSound = function() {
    try {
        const audioCtx = new (window.webkitAudioContext || window.AudioContext)();
        let notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, index) => {
            let osc = audioCtx.createOscillator();
            let gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime + (index * 0.12));
            gain.gain.setValueAtTime(0.2, audioCtx.currentTime + (index * 0.12));
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (index * 0.12) + 0.3);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + (index * 0.12));
            osc.stop(audioCtx.currentTime + (index * 0.12) + 0.3);
        });
    } catch(e) {
        console.log("Audio not supported");
    }
};

// --- 3. MILESTONE & PROGRESS NOTIFICATION CHECKER ---
window.checkArjunaMilestoneNotifications = function(percent) {
    let lastNotifiedMilestone = parseInt(localStorage.getItem('arjunaLastMilestone') || '0');
    
    // 50% Milestone Notification
    if (percent >= 50 && percent < 60 && lastNotifiedMilestone < 50) {
        let title = "🎯 Arjuna Halfway Milestone!";
        let msg = "Complete half task of the day!";
        
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(title, { body: msg });
        }
        window.showArjunaInAppNotification(title, msg, 'warning');
        localStorage.setItem('arjunaLastMilestone', '50');
    }
    // 60% - 80% Milestone Notification
    else if (percent >= 60 && percent < 90 && lastNotifiedMilestone < 60) {
        let title = "🔥 Momentum Unleashed!";
        let msg = "Go aspirant you can do it, you can do more for your future!";
        
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(title, { body: msg });
        }
        window.showArjunaInAppNotification(title, msg, 'info');
        localStorage.setItem('arjunaLastMilestone', '60');
    }
    // 90% - 100% Milestone (Heaven Welcome + Clapping Sound)
    else if (percent >= 90 && lastNotifiedMilestone < 90) {
        window.playArjunaCelebrationSound();
        let title = "🏆 Welcome in Heaven JEE Aspirant!";
        let msg = "Every day consistency beat talent and your hardwork always pay off!";
        
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(title, { body: msg });
        }
        window.showArjunaInAppNotification(title, msg, 'success');
        localStorage.setItem('arjunaLastMilestone', '90');
    }
    else if (percent < 50) {
        localStorage.setItem('arjunaLastMilestone', '0');
    }
};

// --- 4. SMART SCHEDULER & BACKGROUND CHECKS ---
window.checkArjunaSmartSchedulerAndAlerts = function() {
    let tasks = [];
    try {
        tasks = JSON.parse(localStorage.getItem('arjunaHUD_tasks')) || JSON.parse(localStorage.getItem('arjunaHUD_todo')) || [];
    } catch(e) {
        tasks = [];
    }

    let totalCount = tasks.length;
    let completedCount = tasks.filter(t => t.completed || t.done).length;
    let percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    if (totalCount > 0) {
        window.checkArjunaMilestoneNotifications(percent);
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const todayDateStr = now.toISOString().split('T')[0];

    // 10-Minute Class Reminder
    tasks.forEach(task => {
        if (!task.completed && !task.done && task.startTime) {
            let [startH, startM] = task.startTime.split(':').map(Number);
            let totalStartMins = startH * 60 + startM;
            let currentTotalMins = currentHour * 60 + currentMin;
            let diffMins = totalStartMins - currentTotalMins;

            if (diffMins === 10 && !task.warned10Min) {
                let title = "⏳ Class Alert: 10 Mins Left!";
                let msg = `Aapki class / task "${task.text}" shuru hone me sirf 10 minute baaki hain! Ready ho jao.`;
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification(title, { body: msg });
                }
                window.showArjunaInAppNotification(title, msg, 'warning');
                if (typeof playArjunaAlarmRingtone === 'function') playArjunaAlarmRingtone();
                task.warned10Min = true;
                localStorage.setItem('arjunaHUD_tasks', JSON.stringify(tasks));
                localStorage.setItem('arjunaHUD_todo', JSON.stringify(tasks));
            }
        }
    });

    // Spaced Revision 1-3-7 Rule Background Alerts
    let lastRevisionAlertDate = localStorage.getItem('arjunaLastRevisionAlert') || '';
    if (currentHour >= 10 && currentHour <= 20 && lastRevisionAlertDate !== todayDateStr) {
        let revisionProg = JSON.parse(localStorage.getItem('arjunaRevision_prog') || '{}');
        let pendingChapters = [];

        if (typeof syllabusData !== 'undefined') {
            ['physics', 'chemistry', 'maths'].forEach(sub => {
                if (syllabusData[sub]) {
                    syllabusData[sub].forEach((chap, idx) => {
                        let revKey = `rev_${sub}_${idx}`;
                        let rData = revisionProg[revKey];
                        if (!rData || !rData.r1 || !rData.r3 || !rData.r7) {
                            pendingChapters.push(`${sub.toUpperCase()}: ${chap.name}`);
                        }
                    });
                }
            });
        }

        if (pendingChapters.length > 0) {
            let randomChap = pendingChapters[Math.floor(Math.random() * pendingChapters.length)];
            let title = "🧠 Spaced Revision Reminder (1-3-7 Rule)";
            let msg = `Revision karna hai! Aaj ka target chapter: ${randomChap}. Bhoolna mat!`;
            if ("Notification" in window && Notification.permission === "granted") {
                new Notification(title, { body: msg });
            }
            window.showArjunaInAppNotification(title, msg, 'info');
            if (typeof playArjunaAlarmRingtone === 'function') playArjunaAlarmRingtone();
            localStorage.setItem('arjunaLastRevisionAlert', todayDateStr);
        }
    }
};

setInterval(() => {
    window.checkArjunaSmartSchedulerAndAlerts();
}, 30000);

// App khulte hi Welcome Notification aur Permission Request ke liye
window.addEventListener('DOMContentLoaded', () => {
    window.requestArjunaNotifications();
    
    // App khulte hi welcome notification
    setTimeout(() => {
        window.showArjunaInAppNotification(
            "🌟 Welcome to Arjuna JEE", 
            "Hello aspirant, welcome in JEE journey! What's today's task?", 
            'success'
        );
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("🌟 Welcome to Arjuna JEE", {
                body: "Hello aspirant, welcome in JEE journey! What's today's task?"
            });
        }
    }, 1000);
});

/* ==========================================================================
   ARJUNA FAST DOM & STATE AUTO-SYNC ENGINE (Milliseconds Update Fix)
   ========================================================================== */
window.forceInstantAppSync = function() {
    try {
        // 1. Storage aur Progress state ko turant refresh karein
        if (typeof window.getTodoList === 'function') {
            window.getTodoList();
        }
        if (typeof window.renderTodoList === 'function') {
            window.renderTodoList();
        }
        if (typeof window.recalculateSubjectGauges === 'function') {
            window.recalculateSubjectGauges();
        }
        if (typeof window.updateHeaderStats === 'function') {
            window.updateHeaderStats();
        }
        if (typeof window.renderBacklog === 'function') {
            window.renderBacklog();
        }
        if (typeof window.renderErrorBook === 'function') {
            window.renderErrorBook();
        }

        // 2. Saare buttons, tabs, aur interactive elements ko event listeners assign karein
        document.querySelectorAll('.hud-card, .stage-chip, button, .nav-item, input[type="checkbox"]').forEach(el => {
            if (!el.getAttribute('data-fast-synced')) {
                el.setAttribute('data-fast-synced', 'true');
            }
        });
    } catch (err) {
        console.log("Fast sync minor notice: ", err);
    }
};

// DOM load hote hi turant execute ho
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(window.forceInstantAppSync, 50);
} else {
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(window.forceInstantAppSync, 50);
    });
}

// Har 200 milliseconds me background state aur UI ko instant sync rakhega taaki koi delay na ho
setInterval(() => {
    if (typeof window.updateArjunaStudyGoalsHUD === 'function') {
        window.updateArjunaStudyGoalsHUD();
    }
}, 3000);

// Jab bhi user kisi section ya tab par click kare, toh bina refresh ke elements turant render ho
const originalGlobalSwitchTab = window.switchTab;
if (typeof originalGlobalSwitchTab === 'function') {
    window.switchTab = function(tabId) {
        originalGlobalSwitchTab(tabId);
        setTimeout(window.forceInstantAppSync, 30);
    };
}
/* ==========================================================================
   ARJUNA INSTANT ROADMAP & LDN BUTTON FIX ENGINE
   ========================================================================== */

// 1. Roadmap aur Practice view khulte hi blank screen ki problem fix karne ke liye
const originalSwitchSubOrTab = window.switchTab;
if (typeof originalSwitchSubOrTab === 'function') {
    window.switchTab = function(tabId) {
        originalSwitchSubOrTab(tabId);
        setTimeout(() => {
            if (tabId === 'roadmap' && typeof window.renderRoadmap === 'function') {
                window.renderRoadmap();
            }
            if (tabId === 'practice' && typeof window.renderPracticeTracker === 'function') {
                window.renderPracticeTracker();
            }
        }, 20);
    };
}

// 2. Chapter deep view ke andhar L, N, D buttons ko bina refresh ke turant update karne ke liye
window.toggleLectureLdn = function(subKey, chapIdx, lecId, type) {
    const storageKey = `chapter_lectures_${subKey}_${chapIdx}`;
    let lectures = JSON.parse(localStorage.getItem(storageKey)) || [];

    lectures = lectures.map(l => {
        if (l.id === lecId) {
            if (!l.ldn) l.ldn = { l: false, n: false, d: false };
            l.ldn[type] = !l.ldn[type];
            
            // Agar teeno (L, N, D) on ho jayein toh automatically complete ho jaye
            if (l.ldn.l && l.ldn.n && l.ldn.d) {
                l.completed = true;
            } else {
                l.completed = false;
            }
        }
        return l;
    });

    localStorage.setItem(storageKey, JSON.stringify(lectures));
    
    if (typeof window.syncUpperLectureDoneCount === 'function') {
        window.syncUpperLectureDoneCount(subKey, chapIdx);
    }

    // Bina refresh ke turant current deep tab ko re-render karega
    if (typeof window.switchDeepTab === 'function' && typeof currentActiveDeepTab !== 'undefined') {
        window.switchDeepTab(currentActiveDeepTab);
    }
};

// 3. Page load hote hi agar roadmap ya practice active ho toh auto render kar dega
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (typeof window.renderRoadmap === 'function') window.renderRoadmap();
        if (typeof window.renderPracticeTracker === 'function') window.renderPracticeTracker();
    }, 50);
});
/* ==========================================================================
   ARJUNA SMART AI PLANNER & TIMETABLE GENERATOR ENGINE (V6.0 ULTIMATE)
   ========================================================================== */

window.initArjunaSmartPlanner = function() {
    let plannerView = document.getElementById('view-smart-planner');
    if (!plannerView) {
        plannerView = document.createElement('div');
        plannerView.id = 'view-smart-planner';
        plannerView.className = 'section-view';
        plannerView.style.cssText = 'display: none; padding: 15px; box-sizing: border-box;';
        
        plannerView.innerHTML = `
            <div class="hud-card" style="border: 1.5px solid var(--cyan-glow); margin-bottom: 15px; background: rgba(3,7,18,0.9); border-radius: 12px; padding: 15px; box-shadow: 0 0 15px rgba(0,240,255,0.2);">
                <div style="font-size: 1rem; font-weight: bold; color: var(--cyan-glow); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-brain"></i> AI Smart Planner & TimeTable Generator
                </div>
                <div style="font-size: 0.75rem; color: var(--text-sub); margin-bottom: 12px;">
                    Yeh planner tumhare active backlog, school/coaching timings aur target days ko analyze karke exact custom timetable banayega.
                </div>
                
                <button onclick="window.openAdvancedPlannerWizard()" style="background: linear-gradient(135deg, #00f0ff, #0077ff); color: #000; font-weight: bold; font-size: 0.8rem; padding: 10px 16px; border-radius: 8px; border: none; cursor: pointer; width: 100%; box-shadow: 0 0 12px rgba(0,240,255,0.4);">
                    <i class="fas fa-sliders-h"></i> Configure Full Routine & Target Days
                </button>
            </div>
            
            <div id="plannerResultsContainer"></div>
        `;
        
        const mainHub = document.getElementById('view-app-hub') || document.body;
        mainHub.parentElement.appendChild(plannerView);
    }
};

window.openAdvancedPlannerWizard = function() {
    let existingModal = document.getElementById('arjunaAdvancedPlannerModal');
    if (existingModal) existingModal.remove();

    let backlogList = JSON.parse(localStorage.getItem('arjunaHUD_backlog') || '[]');
    let totalBacklogItems = backlogList.filter(b => b.status === 'pending').reduce((sum, item) => sum + (parseInt(item.count) || 1), 0);
    
    // Alert box styling & text based on backlog status
    let alertBoxHTML = '';
    if (totalBacklogItems === 0) {
        alertBoxHTML = `
            <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 8px; padding: 10px; margin-bottom: 12px; font-size: 0.78rem; color: #34d399;">
                <i class="fas fa-check-circle"></i> <b>Zero Backlog Mode:</b> Mubarak ho! Aapka koi backlog pending nahi hai. Ab aap Peak Revision Mode me hain!
            </div>
        `;
    } else {
        alertBoxHTML = `
            <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; border-radius: 8px; padding: 10px; margin-bottom: 12px; font-size: 0.78rem; color: #fca5a5;">
                <i class="fas fa-exclamation-triangle"></i> <b>Backlog Alert:</b> Aapka current active backlog <b>${totalBacklogItems} lectures</b> ka pending hai!
            </div>
        `;
    }

    const modal = document.createElement('div');
    modal.id = 'arjunaAdvancedPlannerModal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(3,7,18,0.85); backdrop-filter: blur(5px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 15px; box-sizing: border-box;';

    modal.innerHTML = `
        <div style="background: rgba(10, 15, 30, 0.95); border: 2px solid var(--cyan-glow); width: 100%; max-width: 390px; border-radius: 16px; padding: 20px; box-shadow: 0 0 25px rgba(0,240,255,0.3); color: #fff; max-height: 90vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(0,240,255,0.3); padding-bottom: 8px;">
                <h3 style="margin: 0; color: var(--cyan-glow); font-size: 0.95rem;"><i class="fas fa-clock"></i> Routine & Backlog Target Setup</h3>
                <button onclick="document.getElementById('arjunaAdvancedPlannerModal').remove()" style="background: none; border: none; color: #ff3366; font-size: 1.2rem; cursor: pointer;"><i class="fas fa-times"></i></button>
            </div>

            ${alertBoxHTML}

            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.8rem;">
                <div>
                    <label style="color: var(--text-sub); display: block; margin-bottom: 3px;">Yeh Backlog kitne dinon (Days) me khatam karna hai?:</label>
                    <input type="number" id="wizTargetDays" value="10" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.6); border: 1px solid rgba(0,240,255,0.4); border-radius: 6px; color: #fff; box-sizing: border-box;">
                </div>

                <div>
                    <label style="color: var(--text-sub); display: block; margin-bottom: 3px;">Aaj ka Day Status (School ya Chhutti?):</label>
                    <select id="wizDayType" onchange="window.handleWizardDayStatusChange()" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.8); border: 1px solid rgba(0,240,255,0.4); border-radius: 6px; color: #fff; box-sizing: border-box;">
                        <option value="school">Regular School Working Day (School + Coaching)</option>
                        <option value="saturday">Saturday (Half Day / Special)</option>
                        <option value="sunday">Sunday (Full Holiday)</option>
                        <option value="holiday">School Holiday / Vacation</option>
                    </select>
                </div>

                <!-- Dynamic School Timing Container (Hidden automatically on Saturday, Sunday, Holiday) -->
                <div id="wizSchoolTimingContainer">
                    <label style="color: var(--text-sub); display: block; margin-bottom: 3px;">School Timing (Kitne baje se kitne baje tak):</label>
                    <input type="text" id="wizSchoolTime" value="07:30 AM - 02:00 PM" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.6); border: 1px solid rgba(0,240,255,0.4); border-radius: 6px; color: #fff; box-sizing: border-box;">
                </div>

                <div>
                    <label style="color: var(--text-sub); display: block; margin-bottom: 3px;">Online Coaching/Classes Timing:</label>
                    <input type="text" id="wizCoachingTime" value="04:00 PM - 08:00 PM" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.6); border: 1px solid rgba(0,240,255,0.4); border-radius: 6px; color: #fff; box-sizing: border-box;">
                </div>

                <div>
                    <label style="color: var(--text-sub); display: block; margin-bottom: 3px;">Sleep Timing:</label>
                    <input type="text" id="wizSleepTime" value="03:00 AM - 09:00 AM (6 Hours)" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.6); border: 1px solid rgba(0,240,255,0.4); border-radius: 6px; color: #fff; box-sizing: border-box;">
                </div>

                <button onclick="window.generateCalculatedArjunaPlan()" style="margin-top: 8px; background: var(--cyan-glow); color: #000; font-weight: bold; padding: 10px; border-radius: 8px; border: none; cursor: pointer; box-shadow: 0 0 12px rgba(0,240,255,0.5);"><i class="fas fa-bolt"></i> Generate Target TimeTable</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

// Toggle School Timing Field based on Day Status selection
window.handleWizardDayStatusChange = function() {
    let dayType = document.getElementById('wizDayType').value;
    let schoolTimingContainer = document.getElementById('wizSchoolTimingContainer');
    
    if (!schoolTimingContainer) return;

    if (dayType === 'sunday' || dayType === 'holiday' || dayType === 'saturday') {
        schoolTimingContainer.style.display = 'none'; // Hide school timing on holidays/weekends
    } else {
        schoolTimingContainer.style.display = 'block'; // Show on regular school days
    }
};

window.generateCalculatedArjunaPlan = function() {
    const targetDays = parseInt(document.getElementById('wizTargetDays').value) || 10;
    const dayType = document.getElementById('wizDayType').value;
    const schoolTimeStr = document.getElementById('wizSchoolTime') ? document.getElementById('wizSchoolTime').value : "";
    const coachingTimeStr = document.getElementById('wizCoachingTime').value;
    const sleepTimeStr = document.getElementById('wizSleepTime').value;

    const modalEl = document.getElementById('arjunaAdvancedPlannerModal');
    if (modalEl) modalEl.remove();

    let backlogList = JSON.parse(localStorage.getItem('arjunaHUD_backlog') || '[]');
    let totalBacklogItems = backlogList.filter(b => b.status === 'pending').reduce((sum, item) => sum + (parseInt(item.count) || 1), 0);

    let container = document.getElementById('plannerResultsContainer');
    if (!container) return;

    let dayRoutineHTML = '';
    
    // Generate Routine based on Day Status
    if(dayType === 'school') {
        dayRoutineHTML = `
            <div style="background: rgba(3,7,18,0.6); padding: 8px; border-radius: 6px; border-left: 3px solid #00f0ff; margin-bottom: 6px;"><b>${sleepTimeStr}</b>: Sleep & Rest</div>
            <div style="background: rgba(3,7,18,0.6); padding: 8px; border-radius: 6px; border-left: 3px solid #f59e0b; margin-bottom: 6px;"><b>${schoolTimeStr}</b>: School Hours & Quick Revision</div>
            <div style="background: rgba(3,7,18,0.6); padding: 8px; border-radius: 6px; border-left: 3px solid #10b981; margin-bottom: 6px;"><b>${coachingTimeStr}</b>: Online Coaching Lectures</div>
            <div style="background: rgba(3,7,18,0.6); padding: 8px; border-radius: 6px; border-left: 3px solid #a855f7;"><b>09:00 PM - 01:00 AM:</b> Backlog & Problem Practice</div>
        `;
    } else {
        // Holiday / Sunday / Saturday Mode (No School Timings)
        let modeTitle = dayType === 'saturday' ? 'Saturday Special / Half-Day Mode' : 'Holiday / Sunday Self-Study Mode';
        dayRoutineHTML = `
            <div style="background: rgba(3,7,18,0.6); padding: 8px; border-radius: 6px; border-left: 3px solid #00f0ff; margin-bottom: 6px;"><b>Night Sleep:</b> Full 7-8 Hours Rest</div>
            <div style="background: rgba(3,7,18,0.6); padding: 8px; border-radius: 6px; border-left: 3px solid #10b981; margin-bottom: 6px;"><b>Morning (09:00 AM - 01:00 PM):</b> Heavy Study / Backlog Session</div>
            <div style="background: rgba(3,7,18,0.6); padding: 8px; border-radius: 6px; border-left: 3px solid #f59e0b; margin-bottom: 6px;"><b>Afternoon (02:00 PM - 06:00 PM):</b> Module Practice, DPPs & Mock Test</div>
            <div style="background: rgba(3,7,18,0.6); padding: 8px; border-radius: 6px; border-left: 3px solid #a855f7;"><b>Evening (07:00 PM - 11:00 PM):</b> Notes Making & Roadmap Revision</div>
        `;
    }

    // Zero-Backlog & Revision Protocol Integration
    let summaryCardHTML = '';
    let strategyBannerHTML = '';

    if (totalBacklogItems === 0) {
        // Fetch completed chapters from Roadmap storage if available
        let completedChapters = JSON.parse(localStorage.getItem('arjuna_completed_chapters')) || ["Units & Measurements", "Vectors"];
        let chaptersListStr = completedChapters.join(', ');

        summaryCardHTML = `
            <div class="hud-card" style="border-color: #10b981; margin-bottom: 15px; background: rgba(3,7,18,0.9); border-radius: 12px; padding: 12px;">
                <div style="font-size: 0.9rem; font-weight: bold; color: #10b981; margin-bottom: 8px;"><i class="fas fa-check-circle"></i> Zero-Backlog Peak Performance & Revision Protocol</div>
                <div style="font-size: 0.75rem; color: #fff; line-height: 1.5; margin-bottom: 8px;">
                    • <b>Status:</b> <span style="color: #34d399; font-weight: bold;">All Backlogs Cleared! 🎉</span><br>
                    • <b>Completed Chapters Tracked:</b> <span style="color: var(--cyan-glow);">${chaptersListStr}</span><br>
                    • <b>AI Recommendation:</b> Kyunki aapka koi backlog pending nahi hai, aapka aaj ka focus fresh lectures aur pichle chapters ke revision par hona chahiye.
                </div>
                <div style="font-size: 0.72rem; color: var(--text-sub); background: rgba(16,185,129,0.1); padding: 8px; border-radius: 6px; border: 1px dashed #10b981;">
                    <b>💡 Roadmap Revision Check:</b> Kya aap aaj in completed chapters ke short notes revise karna chahenge ya baad me? (Roadmap section me jakar status verify kar sakte hain).
                </div>
            </div>
        `;
    } else {
        let lecturesPerDay = (totalBacklogItems / targetDays).toFixed(1);
        let weeklyTargetLectures = Math.ceil(lecturesPerDay * 7);
        let suggestedSpeed = totalBacklogItems > 15 ? "1.75x" : "1.5x";

        summaryCardHTML = `
            <div class="hud-card" style="border-color: #10b981; margin-bottom: 15px; background: rgba(3,7,18,0.9); border-radius: 12px; padding: 12px;">
                <div style="font-size: 0.9rem; font-weight: bold; color: #10b981; margin-bottom: 8px;"><i class="fas fa-chart-line"></i> Backlog Diagnosis & Target Summary</div>
                <div style="font-size: 0.75rem; color: #fff; line-height: 1.5; margin-bottom: 8px;">
                    • <b>Active Pending Backlog:</b> <span style="color: #ef4444;">${totalBacklogItems} items</span><br>
                    • <b>Selected Target Duration:</b> <span style="color: var(--cyan-glow);">${targetDays} Days</span><br>
                    • <b>Required Daily Pace:</b> <span style="color: #f59e0b; font-weight: bold;">${lecturesPerDay} Lectures / day</span><br>
                    • <b>Recommended Video Speed:</b> <span style="color: #00f0ff; font-weight: bold;">${suggestedSpeed}</span> (Notes lecture ke baad banayein)
                </div>
                <div style="font-size: 0.72rem; color: var(--text-sub); background: rgba(16,185,129,0.1); padding: 8px; border-radius: 6px;">
                    <b>AI Target Strategy:</b> Aapne ${targetDays} din ka target rakha hai. Video ko <b>${suggestedSpeed}</b> speed par dekhein aur time bachane ke liye lecture poora hone ke baad short notes prepare karein.
                </div>
            </div>

            <div class="hud-card" style="border-color: #a855f7; margin-bottom: 15px; background: rgba(3,7,18,0.9); border-radius: 12px; padding: 12px;">
                <div style="font-size: 0.9rem; font-weight: bold; color: #a855f7; margin-bottom: 8px;"><i class="fas fa-calendar-alt"></i> Monthly / Period Target Planner</div>
                <div style="font-size: 0.78rem; color: #fff; line-height: 1.6;">
                    • <b>Goal:</b> Finish complete pending backlog of ${totalBacklogItems} lectures within ${targetDays} days.<br>
                    • <b>Subject Division:</b> 60% Maths, 25% Physics, 15% Chemistry.<br>
                    • <b>Execution:</b> Watch at ${suggestedSpeed} speed + solve DPPs.
                </div>
            </div>

            <div class="hud-card" style="border-color: #f59e0b; margin-bottom: 15px; background: rgba(3,7,18,0.9); border-radius: 12px; padding: 12px;">
                <div style="font-size: 0.9rem; font-weight: bold; color: #f59e0b; margin-bottom: 8px;"><i class="fas fa-tasks"></i> Weekly Target Breakdown</div>
                <div style="font-size: 0.78rem; color: #fff; line-height: 1.6;">
                    • <b>Weekly Lectures Goal:</b> ~${weeklyTargetLectures} Lectures per week.<br>
                    • <b>Question Practice:</b> Minimum 150-200 Module questions.<br>
                    • <b>Weekend Review:</b> Sunday mock test & formula recap.
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        ${summaryCardHTML}

        <div class="hud-card" style="border-color: #00f0ff; margin-bottom: 15px; background: rgba(3,7,18,0.9); border-radius: 12px; padding: 12px;">
            <div style="font-size: 0.9rem; font-weight: bold; color: var(--cyan-glow); margin-bottom: 8px;"><i class="fas fa-clock"></i> Day-Wise Target Routine (${dayType === 'school' ? 'Regular School Day' : dayType.toUpperCase() + ' Mode'})</div>
            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.75rem;">
                ${dayRoutineHTML}
            </div>
        </div>
    `;
};

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(window.initArjunaSmartPlanner, 200);
});

const originalSwitchTabForPlanner = window.switchTab;
if (typeof originalSwitchTabForPlanner === 'function') {
    window.switchTab = function(tabId) {
        originalSwitchTabForPlanner(tabId);
        if (tabId === 'smart-planner' || tabId === 'planner') {
            window.initArjunaSmartPlanner();
        }
    };
}

/* ==========================================================================
   ARJUNA AI STUDY ROBOT - REAL-TIME LIVE LOCALSTORAGE SYNC ENGINE (V15.0 FINAL)
   ========================================================================== */

// 1. Auto-Initialize Floating Robot Widget
window.initArjunaFloatingAIRobot = function() {
    let existingWidget = document.getElementById('arjunaAIRobotWidget');
    if (existingWidget) return;

    const widget = document.createElement('div');
    widget.id = 'arjunaAIRobotWidget';
    widget.title = 'AI Study Assistant & Smart Hub';
    
    widget.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00f0ff, #7928ca);
        border: 2px solid #00f0ff;
        box-shadow: 0 0 18px rgba(0, 240, 255, 0.6), 0 0 30px rgba(121, 40, 202, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 1.6rem;
        cursor: grab;
        z-index: 99999;
        user-select: none;
        touch-action: none;
        transition: transform 0.15s ease, box-shadow 0.2s ease;
    `;

    widget.innerHTML = `
        <i class="fas fa-robot" style="filter: drop-shadow(0 0 5px rgba(255,255,255,0.8));"></i>
        <span style="position: absolute; top: 2px; right: 2px; width: 12px; height: 12px; background: #10b981; border: 2px solid #030712; border-radius: 50%;"></span>
    `;

    document.body.appendChild(widget);
    makeWidgetDraggable(widget);

    widget.addEventListener('click', () => {
        if (widget.getAttribute('data-is-dragging') === 'true') return;
        window.openAIChatAssistantModal();
    });
};

// 2. Drag & Drop Engine (Mouse & Touch)
function makeWidgetDraggable(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.cursor = 'grabbing';
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e.preventDefault();
        elmnt.setAttribute('data-is-dragging', 'true');
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        let newTop = Math.max(10, Math.min(window.innerHeight - 70, elmnt.offsetTop - pos2));
        let newLeft = Math.max(10, Math.min(window.innerWidth - 70, elmnt.offsetLeft - pos1));
        elmnt.style.top = newTop + "px";
        elmnt.style.left = newLeft + "px";
        elmnt.style.bottom = 'auto';
        elmnt.style.right = 'auto';
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.cursor = 'grab';
        setTimeout(() => elmnt.setAttribute('data-is-dragging', 'false'), 50);
    }
    function dragTouchStart(e) {
        let touch = e.touches[0];
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        document.ontouchend = closeTouchDrag;
        document.ontouchmove = touchDrag;
    }
    function touchDrag(e) {
        let touch = e.touches[0];
        elmnt.setAttribute('data-is-dragging', 'true');
        pos1 = pos3 - touch.clientX;
        pos2 = pos4 - touch.clientY;
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        let newTop = Math.max(10, Math.min(window.innerHeight - 70, elmnt.offsetTop - pos2));
        let newLeft = Math.max(10, Math.min(window.innerWidth - 70, elmnt.offsetLeft - pos1));
        elmnt.style.top = newTop + "px";
        elmnt.style.left = newLeft + "px";
        elmnt.style.bottom = 'auto';
        elmnt.style.right = 'auto';
    }
    function closeTouchDrag() {
        document.ontouchend = null;
        document.ontouchmove = null;
        setTimeout(() => elmnt.setAttribute('data-is-dragging', 'false'), 50);
    }
}

// 3. AI Conversational Chat Assistant Modal with Plus (+) Menu
window.openAIChatAssistantModal = function() {
    let existingModal = document.getElementById('arjunaAIChatModal');
    if (existingModal) existingModal.remove();

    let backlogList = JSON.parse(localStorage.getItem('arjunaHUD_backlog') || '[]');
    let pendingBacklogs = backlogList.filter(b => b.status === 'pending');
    let totalBacklogCount = pendingBacklogs.reduce((sum, item) => sum + (parseInt(item.count) || 1), 0);

    const modal = document.createElement('div');
    modal.id = 'arjunaAIChatModal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(3,7,18,0.85); backdrop-filter: blur(8px); z-index: 999999; display: flex; align-items: center; justify-content: center; padding: 15px; box-sizing: border-box;';

    modal.innerHTML = `
        <div style="background: rgba(10, 15, 30, 0.98); border: 2px solid var(--cyan-glow); width: 100%; max-width: 440px; height: 85vh; border-radius: 16px; display: flex; flex-direction: column; box-shadow: 0 0 30px rgba(0,240,255,0.3); color: #fff; overflow: hidden; position: relative;">
            
            <!-- Chat Header -->
            <div style="padding: 12px 15px; background: rgba(0,240,255,0.1); border-bottom: 1px solid rgba(0,240,255,0.3); display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-robot" style="color: var(--cyan-glow); font-size: 1.2rem;"></i>
                    <span style="font-weight: bold; color: var(--cyan-glow); font-size: 0.95rem;">Arjuna Saathi</span>
                </div>
                <button onclick="document.getElementById('arjunaAIChatModal').remove()" style="background: none; border: none; color: #ff3366; font-size: 1.2rem; cursor: pointer;"><i class="fas fa-times"></i></button>
            </div>

            <!-- Chat Messages Container -->
            <div id="aiChatMessages" style="flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; font-size: 0.8rem;">
                <div style="background: rgba(0,240,255,0.1); border-left: 3px solid var(--cyan-glow); padding: 10px; border-radius: 6px; color: #fff; line-height: 1.4;">
                    Namaste ${escAI((localStorage.getItem('arjunaStudentName')||'').trim().split(/\s+/)[0]||'dost')}! Main Arjuna, aapka study saathi. Abhi <b>${totalBacklogCount} backlog items</b> pending hain. Neeche se kuch chuno ya apna sawaal likho.
                </div>
                <div class="ai-chips">
                    <button onclick="window.handleSmartOptionClick(4)">Backlog dikhao</button>
                    <button onclick="window.handleSmartOptionClick(1)">Syllabus kitna hua</button>
                    <button onclick="window.handleSmartOptionClick(2)">Meri readiness</button>
                    <button onclick="window.handleSmartOptionClick(6)">Galti Book</button>
                </div>
            </div>

            <!-- Plus Options Popup Menu -->
            <div id="aiPlusOptionsMenu" style="display: none; position: absolute; bottom: 65px; left: 12px; right: 12px; background: rgba(10, 15, 30, 0.98); border: 1.5px solid var(--cyan-glow); border-radius: 12px; padding: 10px; box-shadow: 0 0 20px rgba(0,240,255,0.4); z-index: 10; max-height: 250px; overflow-y: auto;">
                <div style="font-size: 0.75rem; color: var(--cyan-glow); font-weight: bold; margin-bottom: 6px; border-bottom: 1px solid rgba(0,240,255,0.3); padding-bottom: 4px;">⚡ Smart AI Options (Live Local Storage):</div>
                <div onclick="window.handleSmartOptionClick(1)" style="padding: 7px; font-size: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer; color: #fff;">1. 📊 Live Syllabus Completion % & Subject Wise</div>
                <div onclick="window.handleSmartOptionClick(2)" style="padding: 7px; font-size: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer; color: #fff;">2. 🎯 JEE Readiness Score & Target Rank</div>
                <div onclick="window.handleSmartOptionClick(3)" style="padding: 7px; font-size: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer; color: #fff;">3. 📈 Question Practice Analytics (Modules)</div>
                <div onclick="window.handleSmartOptionClick(4)" style="padding: 7px; font-size: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer; color: #fff;">4. ⚠️ Live Backlog & Chapters List</div>
                <div onclick="window.handleSmartOptionClick(5)" style="padding: 7px; font-size: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer; color: #fff;">5. 📝 Test Performance & History</div>
                <div onclick="window.handleSmartOptionClick(6)" style="padding: 7px; font-size: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer; color: #fff;">6. ❌ Error Book Tracker Status</div>
                <div onclick="window.handleSmartOptionClick(7)" style="padding: 7px; font-size: 0.75rem; cursor: pointer; color: #fff;">7. 🔄 Chapter Revision Recommendations</div>
            </div>

            <!-- Chat Input Box with Plus Icon -->
            <div style="padding: 10px; background: rgba(0,0,0,0.6); border-top: 1px solid rgba(0,240,255,0.3); display: flex; gap: 6px; align-items: center;">
                <button onclick="window.toggleAIPlusMenu()" style="background: rgba(0,240,255,0.2); border: 1px solid var(--cyan-glow); color: var(--cyan-glow); width: 36px; height: 36px; border-radius: 50%; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center;"><i class="fas fa-plus"></i></button>
                <input type="text" id="aiChatUserInput" placeholder="Apna message likhein..." style="flex: 1; padding: 10px; background: rgba(0,0,0,0.8); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; color: #fff; font-size: 0.8rem; outline: none;" onkeypress="if(event.key === 'Enter') window.sendAIChatMessage()">
                <button onclick="window.sendAIChatMessage()" style="background: var(--cyan-glow); color: #000; border: none; padding: 0 14px; height: 36px; border-radius: 8px; font-weight: bold; cursor: pointer; box-shadow: 0 0 10px (0,240,255,0.4);"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

// 4. Toggle Plus Options Menu
window.toggleAIPlusMenu = function() {
    const menu = document.getElementById('aiPlusOptionsMenu');
    if (menu) {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
};

// 5. Smart Options Logic with Dynamic Calculation from Real App State
window.handleSmartOptionClick = function(optionNumber) {
    document.getElementById('aiPlusOptionsMenu').style.display = 'none';
    const chatContainer = document.getElementById('aiChatMessages');

    // Har baar click par live calculated data read hoga (No static cache)
    let userProgressData = JSON.parse(localStorage.getItem('arjunaHUD_prog_v4') || '{}');
    let backlogList = JSON.parse(localStorage.getItem('arjunaHUD_backlog') || '[]');
    let errorBookList = JSON.parse(localStorage.getItem('arjunaHUD_errorbook') || '[]');
    let testLogsList = JSON.parse(localStorage.getItem('arjunaHUD_testHistory') || '[]');

    let pendingBacklogs = backlogList.filter(b => b.status === 'pending');
    let totalBacklogCount = pendingBacklogs.reduce((sum, item) => sum + (parseInt(item.count) || 1), 0);

    // Subject-wise live calculation exact roadmap formula ke mutabiq
    let subPercents = { physics: 0, chemistry: 0, maths: 0 };
    let totalQuestionsSolved = 0;
    let totalLecturesCompleted = 0;

    ['physics', 'chemistry', 'maths'].forEach(sub => {
        let subTotalTasks = syllabusData[sub].length * 8;
        let subDoneTasks = 0;
        syllabusData[sub].forEach((_, idx) => {
            let key = `${sub}_${idx}`;
            let data = userProgressData[key];
            if (data) {
                totalQuestionsSolved += Number(data.questionsDone || 0);
                totalLecturesCompleted += Number(data.doneLec || 0);
                ['theory', 'notes', 'shortNotes', 'topic', 'main', 'bridge', 'adv', 'pyq'].forEach(st => {
                    if (data[st]) subDoneTasks++;
                });
            }
        });
        subPercents[sub] = subTotalTasks > 0 ? Math.round((subDoneTasks / subTotalTasks) * 100) : 0;
    });

    let overallSyllabusPercent = Math.round((subPercents.physics + subPercents.chemistry + subPercents.maths) / 3);

    let optionTitle = "";
    let botResponse = "";

    switch(optionNumber) {
        case 1:
            optionTitle = "Live Syllabus Completion %";
            botResponse = `<b>📊 Real-Time App Syllabus Analytics:</b><br>` +
                          `• Overall Progress: <b>${overallSyllabusPercent}%</b><br>` +
                          `• Physics: <b>${subPercents.physics}%</b><br>` +
                          `• Chemistry: <b>${subPercents.chemistry}%</b><br>` +
                          `• Mathematics: <b>${subPercents.maths}%</b><br>` +
                          `<i>Ye data aapke live roadmap se calculate kiya gaya hai!</i>`;
            break;
        case 2:
            optionTitle = "JEE Readiness Score & Target Rank";
            let readinessScore = Math.min(100, Math.max(5, overallSyllabusPercent));
            let estRank = readinessScore > 75 ? "AIR 1,000 - 5,000" : readinessScore > 40 ? "AIR 5,000 - 15,000" : "AIR 25,000+";
            botResponse = `<b>🎯 JEE Readiness Metrics (Live):</b><br>` +
                          `• Readiness Score: <b>${readinessScore}%</b><br>` +
                          `• Projected AIR Rank: <b>${estRank}</b><br>` +
                          `• Target College: IIT Bombay / Delhi (CSE / Electrical)<br>` +
                          `<b>Action Plan:</b> Rozana self-study aur questions practice jari rakhein!`;
            break;
        case 3:
            optionTitle = "Question Practice Analytics";
            botResponse = `<b>📈 Question Practice Analytics:</b><br>` +
                          `• Total Questions Solved: <b>${totalQuestionsSolved} Qs</b><br>` +
                          `• Total Lectures Done: <b>${totalLecturesCompleted} Lecs</b><br>` +
                          `<i>Live app counters se synced hai!</i>`;
            break;
        case 4:
            optionTitle = "Live Backlog & Chapters List";
            let backlogNames = pendingBacklogs.map(b => b.chap || "Chapter").slice(0, 3).join(', ') || "Koyi backlog nahi hai!";
            botResponse = `<b>⚠️ Live Backlog Recovery HUD:</b><br>` +
                          `• Total Pending Items: <b>${totalBacklogCount} Items</b><br>` +
                          `• Pending Focus Chapters: <i>${backlogNames}</i><br>` +
                          `<i>Jaise hi app me backlog clear karoge, yahan count live update hoga!</i>`;
            break;
        case 5:
            optionTitle = "Test Performance & History";
            let lastTest = testLogsList.length > 0 ? testLogsList[0] : null;
            botResponse = `<b>📝 Test Performance Summary:</b><br>` +
                          `• Tests Given: <b>${testLogsList.length}</b><br>` +
                          `• Latest Test Score: <b>${lastTest ? lastTest.score + '/' + lastTest.totalMarks : 'N/A'}</b><br>` +
                          `<i>Mock test section se naye tests record karein!</i>`;
            break;
        case 6:
            optionTitle = "Error Book Tracker Status";
            let totalErrors = errorBookList.length;
            let resolvedErrors = errorBookList.filter(e => e.resolved).length;
            botResponse = `<b>❌ Error Book Tracker:</b><br>` +
                          `• Total Errors Logged: <b>${totalErrors}</b><br>` +
                          `• Resolved Errors: <b>${resolvedErrors}</b><br>` +
                          `<i>Error Book section me jaakar errors inspect karein.</i>`;
            break;
        case 7:
            optionTitle = "Chapter Revision Recommendations";
            botResponse = `<b>🔄 Revision Tracker:</b><br>` +
                          `• Aapka current overall syllabus progress <b>${overallSyllabusPercent}%</b> hai. Jo chapters complete ho chuke hain unke 1-3-7 Spaced Revision rules follow karein!`;
            break;
    }

    chatContainer.innerHTML += `
        <div style="background: rgba(168,85,247,0.2); border-left: 3px solid #a855f7; padding: 10px; border-radius: 6px; color: #fff; align-self: flex-end; max-width: 85%;">
            <b>Aapne select kiya:</b> ${optionTitle}
        </div>
        <div style="background: rgba(0,240,255,0.1); border-left: 3px solid var(--cyan-glow); padding: 10px; border-radius: 6px; color: #fff; line-height: 1.4; max-width: 85%;">
            ${botResponse}
        </div>
    `;
    chatContainer.scrollTop = chatContainer.scrollHeight;
};

// 6. Send Normal Chat Message with Live Data Sync
window.sendAIChatMessage = function() {
    const inputField = document.getElementById('aiChatUserInput');
    const chatContainer = document.getElementById('aiChatMessages');
    const userText = inputField.value.trim();
    if (!userText) return;

    chatContainer.innerHTML += `
        <div style="background: rgba(168,85,247,0.2); border-left: 3px solid #a855f7; padding: 10px; border-radius: 6px; color: #fff; align-self: flex-end; max-width: 85%;">
            ${escAI(userText)}
        </div>
    `;
    inputField.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;
    const q = userText.toLowerCase();
    const routes = [[/backlog|pending/, 4], [/syllabus|chapter|complete/, 1], [/rank|ready|score/, 2], [/practice|question|dpp/, 3], [/test|mock|marks/, 5], [/error|galti|mistake/, 6], [/revis|yaad/, 7]];
    const hit = routes.find(r => r[0].test(q));
    if (hit && typeof window.handleSmartOptionClick === 'function') { setTimeout(() => window.handleSmartOptionClick(hit[1]), 300); return; }

    let backlogList = JSON.parse(localStorage.getItem('arjunaHUD_backlog') || '[]');
    let totalBacklogCount = backlogList.filter(b => b.status === 'pending').reduce((sum, item) => sum + (parseInt(item.count) || 1), 0);

    let botReply = `Is sawaal ka jawab mere paas abhi nahi hai. Backlog, syllabus, rank, practice, test ya Galti Book ke baare me pooch sakte ho, ya + dabake options dekho.`;

    setTimeout(() => {
        chatContainer.innerHTML += `
            <div style="background: rgba(0,240,255,0.1); border-left: 3px solid var(--cyan-glow); padding: 10px; border-radius: 6px; color: #fff; line-height: 1.4; max-width: 85%;">
                ${botReply}
            </div>
        `;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 400);
};

// Page Load Initialization
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(window.initArjunaFloatingAIRobot, 300);
});

/* ==========================================================================
   ARJUNA 30-MIN & 10-MIN EMERGENCY ALARM & NOTIFICATION ENGINE
   ========================================================================== */

// 1. Emergency Alarm Modal Injector
function injectArjunaAlarmModal() {
    if (document.getElementById('arjunaEmergencyModal')) return;

    let modalHTML = `
    <div id="arjunaEmergencyModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 999999; justify-content: center; align-items: center; font-family: sans-serif;">
        <div style="background: #111827; border: 2px solid #ef4444; padding: 30px; border-radius: 16px; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);">
            <div style="font-size: 3rem; margin-bottom: 10px;">🚨</div>
            <h2 id="alarmTitle" style="color: #ef4444; margin-bottom: 15px; font-size: 22px;">LECTURE ALERT!</h2>
            <p id="alarmMessage" style="color: #f3f4f6; font-size: 15px; margin-bottom: 25px; line-height: 1.5;">Aapke lecture ka time ho chuka hai!</p>
            <button onclick="dismissArjunaAlarm()" style="background: #ef4444; color: #fff; border: none; padding: 12px 25px; font-size: 16px; font-weight: bold; border-radius: 8px; cursor: pointer; width: 100%;">I AM ATTENDING NOW 💪</button>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}
window.addEventListener('DOMContentLoaded', injectArjunaAlarmModal);

// 2. Audio Buzzer
let activeAlarmOscillator = null;
function playContinuousBuzzer() {
    try {
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (activeAlarmOscillator) return; 

        let osc = audioCtx.createOscillator();
        let gain = audioCtx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.5);
        
        gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        activeAlarmOscillator = osc;
    } catch(e) {
        console.log("Audio locked.");
    }
}

function dismissArjunaAlarm() {
    let modal = document.getElementById('arjunaEmergencyModal');
    if (modal) modal.style.display = 'none';

    if (activeAlarmOscillator) {
        try {
            activeAlarmOscillator.stop();
            activeAlarmOscillator.disconnect();
        } catch(e){}
        activeAlarmOscillator = null;
    }
}

function triggerEmergencyModal(title, text) {
    injectArjunaAlarmModal();
    let modal = document.getElementById('arjunaEmergencyModal');
    let titleEl = document.getElementById('alarmTitle');
    let msgEl = document.getElementById('alarmMessage');

    if (titleEl) titleEl.innerText = title;
    if (msgEl) msgEl.innerText = text;
    if (modal) modal.style.display = 'flex';

    playContinuousBuzzer();
}

// 3. Smart Time Parser (12-hour aur 24-hour handle karne ke liye)
function parseTaskTimeToMinutes(timeStr) {
    if (!timeStr) return null;
    timeStr = timeStr.toString().trim().toUpperCase();

    let isPM = timeStr.includes('PM');
    let isAM = timeStr.includes('AM');
    
    let cleanTime = timeStr.replace('AM', '').replace('PM', '').trim();
    let parts = cleanTime.split(':');
    
    let hours = parseInt(parts[0], 10);
    let minutes = parts[1] ? parseInt(parts[1], 10) : 0;

    if (isNaN(hours)) return null;

    if (isPM && hours < 12) hours += 12;
    if (isAM && hours === 12) hours = 0;

    return hours * 60 + minutes;
}

// 4. Task Scanner with 30-Min & 10-Min Logic
window.checkArjunaSmartSchedulerAndAlerts = function() {
    let tasks = [];
    try {
        tasks = JSON.parse(localStorage.getItem('arjunaHUD_tasks')) || [];
    } catch(e) {
        tasks = [];
    }

    let now = new Date();
    let totalCurrentMins = now.getHours() * 60 + now.getMinutes();

    tasks.forEach(task => {
        if (task.completed === true || task.status === 'completed') return;

        let startTime = task.time || task.startTime || task.lectureTime;
        if (!startTime) return;

        let totalTaskMins = parseTaskTimeToMinutes(startTime);
        if (totalTaskMins === null) return;

        let diffMins = totalTaskMins - totalCurrentMins;
        let taskName = task.name || task.title || task.chap || "Scheduled Lecture";

        let alertKey30 = `arjuna_alert_30min_${taskName}_${startTime}_${now.toDateString()}`;
        let alertKey10 = `arjuna_alert_10min_${taskName}_${startTime}_${now.toDateString()}`;

        // A. Exactly 30 minutes pehle warning
        if (diffMins === 30 && localStorage.getItem(alertKey30) !== 'true') {
            triggerEmergencyModal(
                "⏳ 30 MINS LEFT!",
                `Taiyar ho jao! ${taskName} shuru hone me 30 minute bache hain.`
            );
            localStorage.setItem(alertKey30, 'true');
        }

        // B. Exactly 10 minutes pehle warning
        if (diffMins === 10 && localStorage.getItem(alertKey10) !== 'true') {
            triggerEmergencyModal(
                "🚨 10 MINS LEFT - URGENT!",
                `Jaldi karo bhai! ${taskName} ka time hone wala hai. Desk par aao!`
            );
            localStorage.setItem(alertKey10, 'true');
        }
    });
};

// 5. Background Loop (Har 5 seconds me check karega)
setInterval(() => {
    if (typeof window.checkArjunaSmartSchedulerAndAlerts === 'function') {
        window.checkArjunaSmartSchedulerAndAlerts();
    }
}, 5000);

/* ==========================================================================
   ARJUNA ADVANCED CUSTOM TASK & DYNAMIC CATEGORY ENGINE
   ========================================================================== */

function handleCustomCategoryChange() {
    const cat = document.getElementById('taskCategorySelect').value;
    const practiceDiv = document.getElementById('practiceExtraFields');
    const backlogDiv = document.getElementById('backlogExtraFields');
    const textInput = document.getElementById('taskInputText');

    if (practiceDiv) practiceDiv.style.display = (cat === 'Practice Session') ? 'block' : 'none';
    if (backlogDiv) backlogDiv.style.display = (cat === 'Backlog') ? 'block' : 'none';

    if (cat === 'Practice Session') {
        loadCustomChapters('practice');
        if (textInput) textInput.style.display = 'none'; // Name auto-generated hoga
    } else if (cat === 'Backlog') {
        loadCustomChapters('backlog');
        if (textInput) textInput.style.display = 'none'; // Name auto-generated hoga
    } else {
        if (textInput) {
            textInput.style.display = 'block';
            textInput.placeholder = "Task ka naam likhein...";
        }
    }
}

function loadCustomChapters(type) {
    const subSelect = document.getElementById(`${type}Sub`);
    const chapSelect = document.getElementById(`${type}Chapter`);
    if (!chapSelect || !subSelect) return;

    const sub = subSelect.value || 'physics';
    chapSelect.innerHTML = '';

    if (typeof syllabusData !== 'undefined' && syllabusData[sub]) {
        syllabusData[sub].forEach((chap, idx) => {
            const opt = document.createElement('option');
            opt.value = chap.name;
            opt.textContent = `${idx + 1}. ${chap.name}`;
            chapSelect.appendChild(opt);
        });
    } else {
        const opt = document.createElement('option');
        opt.value = "General Chapter";
        opt.textContent = "General Chapter";
        chapSelect.appendChild(opt);
    }
}

// Override addNewCustomTask to support Date, Practice Qty & Backlog Chapter selection
window.addNewCustomTask = function() {
    const dateInput = document.getElementById('customTaskDate');
    const textInput = document.getElementById('taskInputText');
    const categorySelect = document.getElementById('taskCategorySelect');
    const startTimeInput = document.getElementById('taskStartTime');
    const endTimeInput = document.getElementById('taskEndTime');

    let targetDate = dateInput && dateInput.value ? dateInput.value : (localStorage.getItem('arjuna_selected_date') || getLocalDateString());
    const category = categorySelect ? categorySelect.value : 'Other';

    let taskText = '';
    let subName = 'PHYSICS';

    if (category === 'Practice Session') {
        const sub = document.getElementById('practiceSub').value.toUpperCase();
        const chap = document.getElementById('practiceChapter').value;
        const qty = document.getElementById('practiceQty').value || '20';
        subName = sub;
        taskText = `[Practice] ${sub}: ${chap} (${qty} Qs)`;
    } else if (category === 'Backlog') {
        const sub = document.getElementById('backlogSub').value.toUpperCase();
        const chap = document.getElementById('backlogChapter').value;
        subName = sub;
        taskText = `[Backlog] ${sub}: ${chap}`;
    } else {
        taskText = textInput ? textInput.value.trim() : '';
        if (!taskText) {
            alert("Kripya task ka naam likhein!");
            return;
        }
    }

    let startTime = startTimeInput && startTimeInput.value ? startTimeInput.value : '09:00 AM';
    let endTime = endTimeInput && endTimeInput.value ? endTimeInput.value : '11:00 AM';

    // Temporarily point to target date storage
    localStorage.setItem('arjuna_selected_date', targetDate);

    const tasks = window.getTodoList();
    tasks.unshift({
        id: Date.now(),
        date: targetDate,
        sub: subName,
        chap: taskText,
        text: taskText,
        category: category,
        time: `${startTime} - ${endTime}`,
        ldn: category === "Lecture" || category === "Backlog" ? { l: false, d: false, n: false } : null,
        completed: false
    });

    window.saveTodoList(tasks);
    
    if (textInput) textInput.value = '';
    const qtyInput = document.getElementById('practiceQty');
    if (qtyInput) qtyInput.value = '';

    window.renderTodoList();
    window.initArjunaDateScroller();
    alert(`Task successfully added for date: ${targetDate}!`);
};

// Initialize default date in customTaskDate input on load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const customDateInput = document.getElementById('customTaskDate');
        if (customDateInput) {
            customDateInput.value = localStorage.getItem('arjuna_selected_date') || getLocalDateString();
        }
        loadCustomChapters('practice');
        loadCustomChapters('backlog');
    }, 500);
});
