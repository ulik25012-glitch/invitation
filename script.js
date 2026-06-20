document.addEventListener("DOMContentLoaded", () => {
    // --- ЕЛЕМЕНТИ DOM ---
    const bgPhotoContainer = document.getElementById('bg-photo-container'); // Розмиваємо всі 3 фото разом
    const heroSectionFixed = document.getElementById('hero-section-fixed');
    const scrollHint = document.getElementById('scroll-hint');
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const closeBtn = document.getElementById("close-btn");
    const letter = document.getElementById("letter");

    // --- СПИСОК ГОСТЕЙ ---
    const guests = { 
        "1": "Любі Мамо та Тато!", "2": "Любі Таня та Максим!", "3": "Любі Рома та Даша!", 
        "4": "Любі Юля та Діма!", "5": "Любий Женя!", "6": "Любий Юра!", 
        "7": "Любий Ігор. Будемо щиро раді бачити тебе та твою чарівну половинку на нашому весіллі!", "8": "Любий Діма!", "9": "Любі Мамо та Тато!", 
        "10": "Любі Надюшка і Стас!", "11": "Любі Аня, Зураб та Тімур!", "12": "Любий Богдане. Будемо щиро раді бачити тебе та твою чарівну половинку на нашому весіллі!", 
        "13": "Любі Наташа, Вадім, Стас, Саша і Ростік!", "14": "Любі Бабуся Аня та Дідусь Віталік!", 
        "15": "Любий Дідусь Рома!", "16": "Люба Маша. Будемо щиро раді бачити тебе та твою чарівну половинку на нашому весіллі!", "17": "Любі Настя та Максим!", 
        "18": "Любі Дарина та Денис!", "19": "Любі Таня та Володимир!", "20": "Любі Юля та Олексій!", 
        "21": "Любі Лариса та Сергій!", "22": "Любий Вова. Будемо щиро раді бачити тебе та твою чарівну половинку на нашому весіллі!", 
        "23": "Люба Анна-Марія!", "24": "Люба Іра!" 
    };

    // --- ЛОГІКА ПІДСТАНОВКИ ІМЕН ---
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('g'); 
    const guestNameElement = document.getElementById('guest-name');
    if (guestId && guests[guestId]) { 
        guestNameElement.textContent = guests[guestId]; 
    }

    // --- 1. ТАЙМЕР ДЛЯ СТРІЛОЧКИ (5 секунд) ---
    let hintTimeout = setTimeout(() => { 
        if (window.scrollY < 10) { 
            scrollHint.style.opacity = "1"; 
        } 
    }, 1000);

    // --- 2. ЛОГІКА СКРОЛУ ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const triggerHeight = 500; 

        if (scrollY > 10) { 
            scrollHint.style.opacity = "0"; 
            clearTimeout(hintTimeout); 
        }

        // АНІМАЦІЯ РОЗМИТТЯ ТА ЗАТЕМНЕННЯ ФОНУ
        let blurVal = Math.min(scrollY / 100, 10);
        let brightnessVal = Math.max(1 - (scrollY / 1000), 0.4);
        bgPhotoContainer.style.filter = `blur(${blurVal}px) brightness(${brightnessVal})`;

        // ПЛАВНА ПОЯВА КОНВЕРТА
        let opacityVal = Math.min(scrollY / triggerHeight, 1);
        heroSectionFixed.style.opacity = opacityVal;
        
        if (opacityVal >= 0.8) { 
            heroSectionFixed.classList.add('revealed'); 
        } else { 
            heroSectionFixed.classList.remove('revealed'); 
        }
    });

    // --- 3. ЛОГІКА ВІДКРИТТЯ/ЗАКРИТТЯ КОНВЕРТА ---
    envelopeWrapper.addEventListener("click", function(e) { 
        if(!heroSectionFixed.classList.contains('revealed') || this.classList.contains("open") || this.classList.contains("closing")) return; 
        if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return; 
        
        this.classList.add("open"); 
        setTimeout(() => { letter.scrollTop = 0; }, 300); 
    });

    closeBtn.addEventListener("click", (e) => { 
        e.stopPropagation(); 
        envelopeWrapper.classList.remove("open"); 
        envelopeWrapper.classList.add("closing"); 
        setTimeout(() => { envelopeWrapper.classList.remove("closing"); }, 1300); 
    });
});
