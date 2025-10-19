// Simple version - remove breakpoints temporarily
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.Collection-wrapper', {
        loop: true,
        spaceBetween: 30,
        slidesPerView: 3, // Fixed number for testing
        centeredSlides: false,
        speed: 1000,
        
        autoplay: {
            delay: 100,
            disableOnInteraction: false,
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
});