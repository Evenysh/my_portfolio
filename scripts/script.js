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
});

// Данные проектов
const projectsData = [
    {
        id: 1,
        title: "Личный сайт",
        category: "html",
        description: "Современный адаптивный сайт-портфолио",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        details: "Элегантный адаптивный сайт-портфолио с акцентом на чистый дизайн и удобство использования. Полностью адаптирован для мобильных устройств.",
        icon: "🌐",
        date: "Декабрь 2024"
    },
    {
        id: 2,
        title: "Todo-приложение", 
        category: "js",
        description: "Минималистичное приложение для управления задачами",
        technologies: ["JavaScript", "LocalStorage"],
        details: "Простое и эффективное приложение для управления повседневными задачами с локальным сохранением данных.",
        icon: "✅",
        date: "Январь 2025"
    },
    {
        id: 3,
        title: "Интернет-магазин",
        category: "react", 
        description: "Прототип интернет-магазина",
        technologies: ["React", "API"],
        details: "Функциональный прототип интернет-магазина с корзиной товаров и системой фильтрации.",
        icon: "🛒",
        date: "Февраль 2025"
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
        details: "Приложение для общения в реальном времени с созданием комнат и обменом сообщениями.",
        icon: "💬",
        date: "Май 2025"
    }
];

// Функция для отображения проектов
function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    const filteredProjects = filter === 'all' 
        ? projectsData 
        : projectsData.filter(project => project.category === filter);
    
    grid.innerHTML = filteredProjects.map(project => `
        <div class="col-lg-4 col-md-6 project-item" data-category="${project.category}">
            <div class="project-card" onclick="openProjectModal(${project.id})">
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
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectBody').innerHTML = `
        <div class="modal-project-content">
            <div class="modal-project-icon">${project.icon}</div>
            <p><strong>Описание:</strong> ${project.details}</p>
            <p><strong>Технологии:</strong> ${project.technologies.join(', ')}</p>
            <p><strong>Дата создания:</strong> ${project.date}</p>
            <div class="modal-project-links">
                <button class="btn btn-primary">Посмотреть демо</button>
                <button class="btn btn-outline-secondary">Исходный код</button>
            </div>
        </div>
    `;
    
    new bootstrap.Modal(document.getElementById('projectModal')).show();
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