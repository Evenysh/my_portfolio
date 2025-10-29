
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
// Данные проектов
// Добавьте вызов в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    // ... остальной ваш код
});
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
        demoLink: "https://evenysh.github.io/four_rules_of_layout/", // ← ИСПРАВЬТЕ НА demoLink
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

// Базовые функции для главной страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация прогресс-баров
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
    
    // Обработчик кнопки скачивания резюме
    const downloadBtn = document.querySelector('.hero-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Простое скачивание без создания DOM-элементов
            const url = 'resume.pdf';
            const fileName = 'resume.pdf';
            
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                })
                .catch(() => {
                    // Если fetch не работает, используем fallback
                    window.location.href = url;
                });
        });
    }
    
    // Загружаем проекты на главную страницу
    if (document.getElementById('homeProjectsContainer')) {
        renderHomepageProjects();
    }
    
    // Инициализация фильтров на странице проектов
    if (document.getElementById('projectsGrid')) {
        renderProjects();
        setupFilters();
    }
});

// Функция для отображения проектов на главной странице
function renderHomepageProjects() {
    const container = document.getElementById('homeProjectsContainer');
    const featuredProjects = projectsData.slice(0, 3); // Показываем первые 3 проекта
    
    container.innerHTML = featuredProjects.map(project => `
        <div class="col-md-4">
            <div class="project-preview-card" onclick="openProjectModal(${project.id})" style="cursor: pointer;">
                <div class="preview-icon">${project.icon}</div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-tags">
                    ${project.technologies.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
                <div class="project-actions mt-3">
                    <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); openProjectModal(${project.id})">
                        Подробнее
                    </button>
                </div>
            </div>
        </div>
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
        <div class="col-lg-4 col-md-6 project-item" data-category="${project.category}">
            <div class="project-card" onclick="openProjectModal(${project.id})" style="cursor: pointer;">
                <div class="project-icon">${project.icon}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => 
                        `<span class="tech-badge">${tech}</span>`
                    ).join('')}
                </div>
                <div class="project-date">${project.date}</div>
            </div>
        </div>
    `).join('');
}


// Функция для открытия модального окна
function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    document.getElementById('modalProjectTitle').textContent = project.title;
    
    // Создаем кнопки независимо от проверок
    let demoButton = '';
    let githubButton = '';
    
    // Кнопка "Посмотреть демо" - всегда показываем если есть ссылка
    if (project.demoLink && project.demoLink !== '#' && project.demoLink.trim() !== '') {
        demoButton = `<a href="${project.demoLink}" target="_blank" class="btn btn-primary me-2">Посмотреть демо</a>`;
    }
    
    // Кнопка "Исходный код"
    if (project.githubLink && project.githubLink !== '#' && project.githubLink.trim() !== '') {
        githubButton = `<a href="${project.githubLink}" target="_blank" class="btn btn-outline-secondary">Исходный код</a>`;
    }
    
    document.getElementById('modalProjectBody').innerHTML = `
        <div class="modal-project-content">
            <div class="modal-project-icon text-center mb-3" style="font-size: 3rem;">${project.icon}</div>
            <p><strong>Описание:</strong> ${project.details}</p>
            <p><strong>Технологии:</strong> ${project.technologies.join(', ')}</p>
            <p><strong>Дата создания:</strong> ${project.date}</p>
            <div class="modal-project-links mt-4">
                ${demoButton}
                ${githubButton}
            </div>
        </div>
    `;
    
    // Открываем модальное окно
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    projectModal.show();
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

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    setupFilters();
});








// ==================== ФУНКЦИИ ДЛЯ ДНЕВНИКА ====================
// ==================== ФУНКЦИИ ДЛЯ ДНЕВНИКА ====================

// Открыть модальное окно добавления записи
function openAddEntryModal() {
    const modal = new bootstrap.Modal(document.getElementById('addEntryModal'));
    modal.show();
}

// Добавить новую запись
function addNewEntry() {
    const title = document.getElementById('entryTitle').value;
    const description = document.getElementById('entryDescription').value;
    const status = document.getElementById('entryStatus').value;
    
    if (!title || !description) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    
    const newEntry = {
        title,
        description,
        status,
        date: new Date().toLocaleDateString('ru-RU')
    };
    
    console.log('Новая запись:', newEntry);
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('addEntryModal'));
    modal.hide();
    document.getElementById('addEntryForm').reset();
    alert('Запись успешно добавлена!');
}

// Инициализация страницы дневника
function initDiaryPage() {
    // Добавляем обработчики для модального окна
    const addEntryForm = document.getElementById('addEntryForm');
    if (addEntryForm) {
        addEntryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewEntry();
        });
    }
}

// ==================== АВТОМАТИЧЕСКАЯ ИНИЦИАЛИЗАЦИЯ ====================

// Запускаем только если мы на странице дневника
if (window.location.pathname.includes('diary.html') || 
    document.querySelector('.diary-title')) {
    
    document.addEventListener('DOMContentLoaded', initDiaryPage);
}







// ==================== ФУНКЦИИ ДЛЯ КОНТАКТОВ ====================

// Обработка отправки формы контактов
function handleContactSubmit(event) {
    event.preventDefault();
    
    // Получаем данные формы
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Простая валидация
    if (!formData.name || !formData.email || !formData.message) {
        alert('Пожалуйста, заполните все обязательные поля (отмечены *)');
        return;
    }
    
    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Пожалуйста, введите корректный email адрес');
        return;
    }
    
    // В реальном приложении здесь был бы AJAX запрос на сервер
    console.log('Данные формы:', formData);
    
    // Показываем сообщение об успехе
    alert('Спасибо! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.');
    
    // Очищаем форму
    document.getElementById('contactForm').reset();
}

// Копирование контактной информации
function setupContactCopy() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const text = this.querySelector('p').textContent;
            copyToClipboard(text);
        });
    });
}

// Функция копирования в буфер обмена
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Показываем временное уведомление
        showCopyNotification('Текст скопирован: ' + text);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyNotification('Текст скопирован: ' + text);
    });
}

// Показ уведомления о копировании
function showCopyNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-purple);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Анимации для уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Инициализация страницы контактов
function initContactsPage() {
    // Настраиваем обработчик формы
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Настраиваем копирование контактов
    setupContactCopy();
}

// ==================== АВТОМАТИЧЕСКАЯ ИНИЦИАЛИЗАЦИЯ ====================

// Запускаем только если мы на странице контактов
if (window.location.pathname.includes('contacts.html') || 
    document.querySelector('.contacts-title')) {
    
    document.addEventListener('DOMContentLoaded', initContactsPage);
}