import MobileNav from './mobile-nav.js';
import Validator from './form-validation/Validator.js';
import { debounce } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const mobileNav = new MobileNav();
    
    document.querySelectorAll('a[href^="#"]').forEach(element => {
        element.addEventListener('click', function (event) {
            event.preventDefault();
            const target = this.getAttribute('href');
            mobileNav.onScroll(target);
        });
    });

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    
    if('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
});

const initScrollAnimations = (selector = '[data-scroll]', options = { threshold: 0.2, rootMargin: '0px' }) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const element = entry.target;
        
                requestAnimationFrame(() => {
                    element.style.opacity = 1;
                    element.style.transform = 'translate3d(0, 0, 0)';
                }); 

                observer.unobserve(element);
            }
        });
    }, options);
  
    document.querySelectorAll(selector).forEach(element => {
        observer.observe(element);
    });
};

document.addEventListener('DOMContentLoaded', debounce(function () {
    initScrollAnimations();
}));
 
window.addEventListener('resize', debounce(function () {
    initScrollAnimations();
}));

window.addEventListener('scroll', debounce(function () {
    initScrollAnimations();
}));

document.querySelector('.contact__form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.querySelector('#name'),
        phone = document.querySelector('#phone'),
        message = document.querySelector('#message'),
        email = document.querySelector('#email');

    const validator = new Validator();

    validator.addRules(name, {
        required: true,
        length: [3, 50]
    });

    validator.addRules(email, {
        required: true,
        email: true
    });

    validator.addRules(phone, {
        required: true,
    });

    if(validator.validate()) {
        alert('Form enviado com sucesso!');

        validator.clearAll();
    }

    return true;
});

document.querySelectorAll('.form-group form-group__control').forEach(input => {
    const modifierClass = 'form-group--active';

    input.addEventListener('focus', (event) => {
        event.preventDefault();
        
        input.classList.add(modifierClass);
    });

    input.addEventListener('blur', (event) => {
        event.preventDefault();

        if(input.value.trim().length == 0) {
            input.classList.remove(modifierClass);
        }
    });

    if(input.value.trim().length > 0) {
        input.classList.add(modifierClass);
    }
});