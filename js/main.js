const main = function () {
    const goTop = document.querySelector('.go-top');
    const header = document.querySelector('.header');
    const mobile = document.querySelector('.mobile');
    const popup = document.querySelector('.popup');
    const office = document.querySelector('.office');
    const filter = document.querySelector('.office-filter');
    const apartment = document.querySelector('.apartment');
    const calendar = document.querySelector('.calendar');

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

    if (header) {
        const profile = document.querySelector('.action.profile')

        header.addEventListener('click', (e) => {
            if (e.target.closest('[data-profile]')) {
                e.preventDefault()
                profile.classList.add('_active')
                document.body.classList.add('_lock')
            }
        })

        profile.addEventListener('click', (e) => {
            if (profile.classList.contains('_active') && (!e.target.closest('.profile .action-inner') || e.target.closest('.profile .close'))) {
                profile.classList.remove('_active')
                document.body.classList.remove('_lock')
            }
        })
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
            else if (mobile.classList.contains('_active') && (!e.target.closest('.mobile-inner') || e.target.closest('.mobile .close') || e.target.closest('.mobile .menu-item'))) closeNav()
        })
    }

    if (popup) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-tour')) {
                const tourSrc = e.target.closest('.btn-tour').getAttribute('data-tour')
                let iframe = popup.querySelector('iframe')

                if (iframe) {
                    if (iframe.getAttribute('src') != tourSrc) iframe.setAttribute('src', tourSrc)
                } else {
                    iframe = document.createElement('iframe')
                    iframe.setAttribute('src', tourSrc)
                    popup.querySelector('.popup-body').insertAdjacentElement('afterbegin', iframe)
                }

                popup.classList.add('_active')
                document.body.classList.add('_lock')
            }
        })

        popup.addEventListener('click', (e) => {
            if (popup.classList.contains('_active') && (!e.target.closest('.popup-inner') || e.target.closest('.popup .close'))) {
                popup.classList.remove('_active')
                document.body.classList.remove('_lock')
            }
        })
    }

    if (office) {
        const swiperSelectors = office.querySelectorAll('.office-list .swiper')

        initOfficeSwiper(swiperSelectors)
    }

    if (filter) {
        const dateInput = filter.querySelector('#date')
        const timeInput = filter.querySelector('#time')

        initPicker(dateInput)
        initPicker(timeInput, true)

        filter.addEventListener('click', (e) => { if (e.target.closest('.toggle')) filter.classList.toggle('_active') })
        document.addEventListener('click', (e) => { if (!e.target.closest('.office-filter') && !e.target.closest('.flatpickr-calendar')) filter.classList.remove('_active') })
    }

    if (apartment) {
        const swiperSelector = apartment.querySelector('.images .swiper-top')
        const swiperPagination = swiperSelector.querySelector('.swiper-pagination')
        const swiperNext = swiperSelector.querySelector('.swiper-button-next')
        const swiperPrev = swiperSelector.querySelector('.swiper-button-prev')
        const thumbsSelector = apartment.querySelector('.images .swiper-thumbs')

        const thumbs = new Swiper(thumbsSelector, {
            spaceBetween: 15,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                767.98: {
                    slidesPerView: 4,
                    spaceBetween: 25,
                }
            }
        })

        const swiper = new Swiper(swiperSelector, {
            pagination: {
                el: swiperPagination,
                type: 'fraction'
            },
            navigation: {
                nextEl: swiperNext,
                prevEl: swiperPrev,
            },
            thumbs: {
                swiper: thumbs,
            },
        })
    }

    if (calendar) {
        const swiperSelector = calendar.querySelector('.calendar-swiper .swiper')
        const wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const dateInput = calendar.querySelector('#date')
        const booking = document.querySelector('.action.booking')

        initCalendarSwiper(swiperSelector)
        initPicker(dateInput)

        calendar.addEventListener('click', (e) => {
            if (e.target.closest('.switch button')) {
                const btns = e.target.closest('.switch').querySelectorAll('button')
                for (const btn of btns) btn.classList.remove('_active')
                e.target.closest('.switch button').classList.add('_active')
            } else if (e.target.closest('.grid button:not([data-disabled])')) {
                booking.classList.add('_active')
                document.body.classList.add('_lock')
            }
        })

        booking.addEventListener('click', (e) => {
            if (booking.classList.contains('_active') && (!e.target.closest('.booking .action-inner') || e.target.closest('.booking .close') || e.target.closest('.booking button[type="reset"]'))) {
                booking.classList.remove('_active')
                document.body.classList.remove('_lock')
            }
        })

        if (wWidth > 992) {
            const tooltip = calendar.querySelector('.tooltip')

            calendar.addEventListener('mouseover', (e) => {
                if (e.target.closest('.grid span') || e.target.closest('.grid button[data-disabled]')) {
                    const target = e.target.closest('.grid span') || e.target.closest('.grid button[data-disabled]')
                    const top = target.getBoundingClientRect().top + target.offsetHeight
                    const left = target.getBoundingClientRect().left + (target.offsetWidth / 2)

                    tooltip.textContent = target.getAttribute('data-title').trim()
                    tooltip.classList.add('_active')
                    tooltip.style.top = `${top}px`
                    tooltip.style.left = `${left}px`
                }
            })

            calendar.addEventListener('mouseout', (e) => {
                if (e.target.closest('.grid span') || e.target.closest('.grid button[data-disabled]')) {
                    tooltip.classList.remove('_active')
                }
            })
        }
    }

    function initOfficeSwiper(selectors) {
        for (const selector of selectors) {
            const pagination = selector.querySelector('.swiper-pagination')
            const next = selector.querySelector('.swiper-button-next')
            const prev = selector.querySelector('.swiper-button-prev')

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

    function initCalendarSwiper(selector) {
        const next = selector.querySelector('.swiper-button-next')
        const prev = selector.querySelector('.swiper-button-prev')

        const swiper = new Swiper(selector, {
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
            enabled: true,
            spaceBetween: 10,
            slidesPerView: 1,
            breakpoints: {
                991.98: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                }
            }
        })
    }

    function initPicker(elem, isTime = false) {
        if (isTime) {
            return flatpickr(elem, {
                enableTime: true,
                noCalendar: true,
                locale: elem.getAttribute('data-locale'),
                defaultDate: new Date(),
            })
        }
        return flatpickr(elem, {
            monthSelectorType: 'static',
            locale: elem.getAttribute('data-locale'),
            defaultDate: new Date(),
            minDate: new Date(),
            maxDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
        })
    }
}();