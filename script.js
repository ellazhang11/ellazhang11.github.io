document.addEventListener('DOMContentLoaded', () => {
    const languageDropdowns = document.querySelectorAll('.language-dropdown');
    const languageToggles = document.querySelectorAll('.language-toggle');
    const languageOptions = document.querySelectorAll('.language-option');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.close-btn');
    let currentLang = localStorage.getItem('language') || 'en';
    
    // 初始化語言
    updateLanguage(currentLang);
    
    // 為語言切換按鈕添加事件監聽器
    languageToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = toggle.closest('.language-dropdown');
            dropdown.classList.toggle('active');
        });
    });

    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            currentLang = lang;
            localStorage.setItem('language', lang);
            updateLanguage(lang);
            
            // 更新當前語言顯示
            document.querySelectorAll('.current-lang').forEach(el => {
                el.textContent = lang.toUpperCase();
            });
            
            // 關閉所有下拉選單
            languageDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    });

    // 點擊頁面其他地方時關閉下拉選單
    document.addEventListener('click', () => {
        languageDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });

    // 選單開關功能
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    function updateLanguage(lang) {
        // 更新所有帶有 data-i18n 屬性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            const text = getTranslation(key, lang);
            if (text) {
                element.textContent = text;
            }
        });
        
        // 更新 HTML lang 屬性
        document.documentElement.lang = lang;
    }
    
    function getTranslation(key, lang) {
        const keys = key.split('.');
        let value = translations[lang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return null;
            }
        }
        
        return value;
    }
}); 