export default class MobileNav {
    constructor() {
        this.isMobile = window.innerWidth <= 768;

        this.nav = document.getElementById('nav');
        
        this.toggle = document.querySelector('.nav__toggle');
        this.links = document.querySelectorAll('.nav__link');
        this.items = document.querySelectorAll('.nav__item');
        
        this.toggle.addEventListener('click', () => this.onToggle());

        this.links.forEach(element => element.addEventListener('click', () => this.onClick()));
        
        window.addEventListener('scroll', () => this.onClose());
        window.addEventListener('resize', () => this.onClose());
    }

    onToggle() {
        this.nav.classList.toggle('nav--open');

        const opened = this.nav.classList.contains('nav--open');

        this.toggle.setAttribute('aria-expanded', opened);
        this.toggle.setAttribute('aria-label', opened ? 'Fechar Menu' : 'Abrir Menu');

        this.animateItems();
    }

    onClick() {
        if(this.isMobile) {
            this.onToggle();
        }
    }

    animateItems() {
        const maxLength = this.items.length;

        this.items.forEach((element, index) => {
            const delay = (index + 1) / maxLength * 0.25;

            element.style.animation ?
            element.style.animation = '' :
            element.style.animation = `fadeIn 600ms ease forwards ${delay.toFixed(2)}s`;
        });
    }

    onScroll(target) {
        const element = document.querySelector(target);

        if(!element) return;
    
        const headerHeight = document.querySelector('.cabecalho')?.offsetHeight || 0;
        const targetPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight;

        requestAnimationFrame(() => {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            })
        });
    }

    onClose() { 
        if(this.isMobile && this.nav.classList.contains('nav--open')) {
            this.onToggle();
        }
    }
}