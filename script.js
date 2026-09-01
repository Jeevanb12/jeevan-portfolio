document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Typewriter Effect Logic for Jeevan B ---
    const texts = [
        "Java Full Stack Developer",
        "Spring Boot Developer",
        "Frontend Developer",
        "Problem Solver"
    ];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    let isDeleting = false;
    
    const typeElement = document.getElementById("typewriter");

    function type() {
        if (!typeElement) return;

        if (count === texts.length) {
            count = 0; 
        }
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }

        typeElement.textContent = letter;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && letter.length === currentText.length) {
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500; 
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);

    // --- 2. Scroll Reveal Animations ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // --- 3. Smooth Scrolling & Active State for Floating Nav ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Smooth scrolling
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

});

// --- 5. Web3Forms Background Submission Logic ---
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            if (response.status == 200) {
                form.classList.add('opacity-0', 'pointer-events-none');
                setTimeout(() => {
                    form.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                    successMessage.classList.add('fade-in-up');
                }, 300);
            } else {
                alert("Error sending message. Please try sending directly via email at jeevancbwhs@gmail.com!");
            }
        })
        .catch(error => {
            console.log(error);
            alert("Please send an email directly to jeevancbwhs@gmail.com!");
        });
    });
}

// --- 6. Modal logic for DB/Server Projects ---
function openDemoModal(projectType) {
    const modal = document.getElementById('hostingModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    if(!modal || !modalTitle || !modalContent) return;

    if (projectType === 'emotion') {
        modalTitle.innerHTML = `<i class="fa-solid fa-brain text-purple-400"></i> Multimodal Emotion Recognition (AI & Deep Learning)`;
        modalContent.innerHTML = `
            <p><strong>Architecture & Tech:</strong> Python, DistilBERT Transformers, Librosa Audio Processing, Deep Learning.</p>
            <p>Because this project utilizes AI transformer models and audio/video feature extraction, it requires a Python backend runtime.</p>
            <div class="p-3 rounded bg-rose-950/40 border border-rose-500/30 text-xs space-y-2">
                <p>💡 <strong>How to host & present live to recruiters:</strong></p>
                <ul class="list-disc pl-4 space-y-1 text-slate-300">
                    <li><strong>Option 1 (Free Cloud Server):</strong> Deploy on <a href="https://render.com" target="_blank" class="text-rose-400 underline">Render.com</a> or <a href="https://www.pythonanywhere.com" target="_blank" class="text-rose-400 underline">PythonAnywhere</a>.</li>
                    <li><strong>Option 2 (Video Demo):</strong> Add a 30-second screen recording showing emotion analysis to your GitHub README.</li>
                </ul>
            </div>
            <p>Complete source code and model notebooks are available on GitHub.</p>
        `;
    } else if (projectType === 'college') {
        modalTitle.innerHTML = `<i class="fa-solid fa-graduation-cap text-rose-400"></i> College Counselling System (Java & MySQL)`;
        modalContent.innerHTML = `
            <p><strong>Full Stack Stack:</strong> Java, Spring Boot / Servlets, JSP, MySQL Database.</p>
            <p>This application relies on a Java Web Server (Tomcat) and a MySQL database to match student scores with cutoffs and college fee parameters.</p>
            <div class="p-3 rounded bg-rose-950/40 border border-rose-500/30 text-xs space-y-2">
                <p>💡 <strong>How to host & present live to recruiters:</strong></p>
                <ul class="list-disc pl-4 space-y-1 text-slate-300">
                    <li><strong>Option 1 (Free Hosting):</strong> Host the WAR file on <a href="https://render.com" target="_blank" class="text-rose-400 underline">Render.com</a> connected to a free MySQL database on <a href="https://aiven.io" target="_blank" class="text-rose-400 underline">Aiven.io</a>.</li>
                    <li><strong>Option 2 (GIF / Screenshots):</strong> Add screenshots of MySQL tables & matching portal UI to your GitHub repo.</li>
                </ul>
            </div>
            <p>Full Java backend code and database schema are available on GitHub.</p>
        `;
    }
    
    modal.classList.remove('hidden');
}

function closeDemoModal() {
    const modal = document.getElementById('hostingModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// --- 7. Certificate PDF Viewer Modal Logic ---
function openCertModal(certType) {
    const modal = document.getElementById('hostingModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    if(!modal || !modalTitle || !modalContent) return;

    let title = "Certificate Document";
    let sub = "Official Certificate Document Preview";
    let imgSrc = "Intership Certificate.png";

    if (certType === 'vstand4u_internship') {
        title = `<i class="fa-solid fa-award text-rose-500"></i> Vstand4U 15-Week Full Stack Internship`;
        sub = "Vstand4U Technologies Pvt. Ltd — Full Stack Development Internship Certificate (Feb - May 2026)";
        imgSrc = "Intership Certificate.png";
    } else if (certType === 'vstand4u_course') {
        title = `<i class="fa-solid fa-certificate text-rose-500"></i> Vstand4U Full Stack Course Certificate`;
        sub = "Vstand4U Technologies Pvt. Ltd — Java & Python Fullstack Development Course (Competitive Programming, Web Dev & SQL)";
        imgSrc = "Course Completion Certificate .jpg";
    } else if (certType === 'sai_glitch') {
        title = `<i class="fa-solid fa-medal text-amber-400"></i> 2nd Place: Gone-Glitch Coding Challenge`;
        sub = "Sai Intelliverse National Level Technical Symposium — Secured 2nd Place in Gone-Glitch (July 12, 2024)";
        imgSrc = "Code Debugging.jpg";
    } else if (certType === 'sai_nft') {
        title = `<i class="fa-solid fa-medal text-amber-400"></i> 2nd Place: NFT Making Competition`;
        sub = "Sai Intelliverse National Level Technical Symposium — Secured 2nd Place in NFT Making (July 12, 2024)";
        imgSrc = "NFT Making .jpg";
    } else if (certType === 'advaya') {
        title = `<i class="fa-solid fa-stopwatch text-rose-500"></i> Advaya-2k25 24-Hours Hackathon`;
        sub = "Department of CSE, Sri Sairam College of Engineering — Certification of Participation (May 6-7, 2025)";
        imgSrc = "Hackathon.jpg";
    }

    modalTitle.innerHTML = title;
    modalContent.innerHTML = `
        <div class="space-y-4">
            <p class="text-xs text-slate-300">${sub}</p>
            <div class="rounded-xl overflow-hidden border border-rose-500/30 bg-slate-950 p-2 shadow-inner flex items-center justify-center">
                <img src="${imgSrc}" alt="Certificate Preview" class="w-full max-h-[60vh] object-contain rounded-lg">
            </div>
            <div class="flex gap-3 justify-end pt-2">
                <a href="${imgSrc}" target="_blank" class="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Full HD Certificate Document
                </a>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}