const main = function () {
    const goTop = document.querySelector('.go-top');
    const mobile = document.querySelector('.mobile');
    const office = document.querySelector('.office');

    if (goTop) {
        const checkScroll = () => {
            if (scrollY > 40) {
                if (!goTop.classList.contains('_active'))
                    goTop.classList.add('_active')
            } else {
                if (goTop.classList.contains('_active'))
                    goTop.classList.remove('_active')
            }
        }

        document.addEventListener('scroll', checkScroll);
        checkScroll();
    }

    if (mobile) {
        const openNav = () => {
            document.body.classList.add('_lock');
            mobile.classList.add('_active')
        }
        const closeNav = () => {
            document.body.classList.remove('_lock');
            mobile.classList.remove('_active')
        }

        document.addEventListener('click', (e) => {
            if (e.target.closest('.burger')) openNav()
            else if (!e.target.closest('.mobile-inner') || e.target.closest('.mobile .close') || e.target.closest('.mobile .menu-item')) closeNav()
        })
    }

    if (office) {
        const swiperSelectors = office.querySelectorAll('.swiper')
        const filter = office.querySelector('.office-filter')

        initSwiper(swiperSelectors)

        filter.addEventListener('click', (e) => { if (e.target.closest('.toggle')) filter.classList.toggle('_active') })
        document.addEventListener('click', (e) => { if (!e.target.closest('.office-filter')) filter.classList.remove('_active') })
    }

    function initSwiper(selectors) {
        for (const selector of selectors) {
            const next = selector.querySelector('.swiper-button-next')
            const prev = selector.querySelector('.swiper-button-prev')
            const pagination = selector.querySelector('.swiper-pagination')

            const swiper = new Swiper(selector, {
                loop: true,
                pagination: {
                    el: pagination,
                    type: 'fraction'
                },
                navigation: {
                    nextEl: next,
                    prevEl: prev
                }
            })
        }
    }
}();