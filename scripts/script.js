// Управление тёмной темой
function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButton(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const icon = theme === 'light' ? '🌙' : '☀️';
        const text = theme === 'light' ? 'Тёмная' : 'Светлая';
        themeToggle.innerHTML = `${icon} ${text}`;
    }
}

// Мобильное меню
function initMobileMenu() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('nav__menu--active');
        });
    }
}

// Данные проектов
const projectsData = [
    {
        id: 1,
        title: "Личный сайт",
        category: "html",
        description: "Современный адаптивный сайт-портфолио",
        technologies: ["HTML", "CSS", "JavaScript"],
        details: "Элегантный адаптивный сайт-портфолио с акцентом на чистый дизайн и удобство использования. Полностью адаптирован для мобильных устройств.",
        icon: "🌐",
        date: "Октябрь 2025",
        demoLink: "http://127.0.0.1:5500/index.html",
        githubLink: "https://github.com/Evenysh/my_portfolio"
    },
    {
        id: 2,
        title: "Одностраничный сайт",
        category: "html",
        description: "Минималистичный сайт для изучения вёрстки",
        technologies: ["HTML", "CSS"],
        details: "Простой и чистый одностраничный сайт, созданный для отработки навыков вёрстки и освоения базовых принципов веб-дизайна.",
        icon: "✅",
        date: "Сентябрь 2025",
        demoLink: "https://evenysh.github.io/four_rules_of_layout/",
        githubLink: "https://github.com/Evenysh/four_rules_of_layout"
    },
    {
        id: 3,
        title: "Проект от МИРЭА",
        category: "html", 
        description: "Портфолио студента",
        technologies: ["HTML", "CSS", "JavaScript"],
        details: "Многостраничный сайт",
        icon: "🌐",
        date: "Сентябрь 2025",
        demoLink: "https://evenysh.github.io/frontend-and-backend-practice/",
        githubLink: "https://github.com/Evenysh/frontend-and-backend-practice"
    },
    {
        id: 4,
        title: "Лендинг-пейдж",
        category: "html",
        description: "Посадочная страница для бизнеса",
        technologies: ["HTML", "CSS", "Bootstrap"],
        details: "Продающая посадочная страница с адаптивным дизайном и оптимизацией для поисковых систем.",
        icon: "🎨",
        date: "Март 2025"
    },
    {
        id: 5,
        title: "Погодное приложение",
        category: "js",
        description: "Приложение для просмотра погоды",
        technologies: ["JavaScript", "API"],
        details: "Приложение для получения актуальной информации о погоде с использованием открытого API.",
        icon: "☀️",
        date: "Апрель 2025"
    },
    {
        id: 6,
        title: "Чат-приложение",
        category: "react",
        description: "Реал-тайм чат",
        technologies: ["React", "WebSocket"],
        details: "Приложение для общения в реальном времени с созданием комнат и обменом сообщений.",
        icon: "💬",
        date: "Май 2025"
    }
];

// Функция для отображения проектов на главной странице
function renderHomepageProjects() {
    const container = document.getElementById('homeProjectsContainer');
    if (!container) return;
    
    const featuredProjects = projectsData.slice(0, 3);
    
    container.innerHTML = featuredProjects.map(project => `
        <article class="project-card" onclick="openProjectModal(${project.id})">
            <div class="project-card__icon">${project.icon}</div>
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__description">${project.description}</p>
            <div class="project-card__tech">
                ${project.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
            <div class="project-card__actions">
                <button class="btn btn--primary" onclick="event.stopPropagation(); openProjectModal(${project.id})">
                    Подробнее
                </button>
            </div>
        </article>
    `).join('');
}

// Функция для отображения проектов на странице проектов
function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    const filteredProjects = filter === 'all' 
        ? projectsData 
        : projectsData.filter(project => project.category === filter);
    
    grid.innerHTML = filteredProjects.map(project => `
        <article class="project-card" onclick="openProjectModal(${project.id})">
            <div class="project-card__icon">${project.icon}</div>
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__description">${project.description}</p>
            <div class="project-card__tech">
                ${project.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
            <div class="project-card__category">
                <span class="category-badge category-${project.category}">${project.category}</span>
            </div>
            <div class="project-card__actions">
                <button class="btn btn--primary" onclick="event.stopPropagation(); openProjectModal(${project.id})">
                    Подробнее
                </button>
            </div>
        </article>
    `).join('');
}

// Функция для открытия модального окна
function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    document.getElementById('modalProjectTitle').textContent = project.title;
    
    let demoButton = '';
    let githubButton = '';
    
    if (project.demoLink && project.demoLink !== '#' && project.demoLink.trim() !== '') {
        demoButton = `<a href="${project.demoLink}" target="_blank" class="btn btn--primary">Посмотреть демо</a>`;
    }
    
    if (project.githubLink && project.githubLink !== '#' && project.githubLink.trim() !== '') {
        githubButton = `<a href="${project.githubLink}" target="_blank" class="btn btn--outline">Исходный код</a>`;
    }
    
    document.getElementById('modalProjectBody').innerHTML = `
        <div class="modal-project">
            <div class="modal-project__icon">${project.icon}</div>
            <p><strong>Описание:</strong> ${project.details}</p>
            <p><strong>Технологии:</strong> ${project.technologies.join(', ')}</p>
            <p><strong>Категория:</strong> <span class="category-badge category-${project.category}">${project.category}</span></p>
            <p><strong>Дата создания:</strong> ${project.date}</p>
            <div class="modal-project__links">
                ${demoButton}
                ${githubButton}
            </div>
        </div>
    `;
    
    document.getElementById('projectModal').classList.add('modal--active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('modal--active');
    document.body.style.overflow = 'auto';
}

// Фильтрация проектов
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProjects(this.getAttribute('data-filter'));
        });
    });
}

// ==================== ФУНКЦИИ ДЛЯ ДНЕВНИКА ====================

function openAddEntryModal() {
    document.getElementById('addEntryModal').classList.add('modal--active');
    document.body.style.overflow = 'hidden';
}

function closeAddEntryModal() {
    document.getElementById('addEntryModal').classList.remove('modal--active');
    document.body.style.overflow = 'auto';
}

function addNewEntry() {
    const title = document.getElementById('entryTitle').value;
    const description = document.getElementById('entryDescription').value;
    const status = document.getElementById('entryStatus').value;
    
    if (!title || !description) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    
    alert(`Запись "${title}" добавлена!`);
    closeAddEntryModal();
    document.getElementById('addEntryForm').reset();
}

// ==================== ФУНКЦИИ ДЛЯ КОНТАКТОВ ====================

function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    if (!formData.name || !formData.email || !formData.message) {
        alert('Пожалуйста, заполните все обязательные поля (отмечены *)');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Пожалуйста, введите корректный email адрес');
        return;
    }
    
    alert('Спасибо! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.');
    document.getElementById('contactForm').reset();
}

// ==================== ОБЩАЯ ИНИЦИАЛИЗАЦИЯ ====================

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initMobileMenu();
    
    // Главная страница
    if (document.getElementById('homeProjectsContainer')) {
        renderHomepageProjects();
    }
    
    // Страница проектов
    if (document.getElementById('projectsGrid')) {
        renderProjects();
        setupFilters();
    }
    
    // Страница контактов
    if (document.getElementById('contactForm')) {
        document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);
    }
    
    // Анимация прогресс-баров
    const progressBars = document.querySelectorAll('.skill-progress-bar, .course-progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initMobileMenu(); // ← ЭТА СТРОКА ДОЛЖНА БЫТЬ!
    // ... остальной код
});