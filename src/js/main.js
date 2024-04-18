const main = function () {
    const header = document.querySelector('.header')
    const goTop = document.querySelector('.go-top')
    const profile = document.querySelector('.action.profile')
    const mobile = document.querySelector('.mobile')
    const popup = document.querySelector('.popup')
    const office = document.querySelector('.office')
    const filter = document.querySelector('.office-filter')
    const apartment = document.querySelector('.apartment')
    const calendar = document.querySelector('.calendar')
    const fadeIns = document.querySelectorAll('[data-fade]')
    const wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (goTop) {
        const checkScrollTop = () => {
            if (scrollY > 40) goTop.classList.add('_active')
            else goTop.classList.remove('_active')
        }
        let lastScroll = scrollY
        const checkHeader = () => {
            if (scrollY > 80 && scrollY > lastScroll) header.classList.add('_active')
            else header.classList.remove('_active')
            lastScroll = scrollY
        }

        document.addEventListener('scroll', () => {
            checkScrollTop()
            checkHeader()
        })
        checkScrollTop()
        checkHeader()
    }

    if (profile) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-profile]')) {
                e.preventDefault()
                profile.classList.add('_active')
                document.body.classList.add('_lock')
            } else if (profile.classList.contains('_active') && (!e.target.closest('.profile .action-inner') || e.target.closest('.profile .close'))) {
                profile.classList.remove('_active')
                document.body.classList.remove('_lock')
            }
        })
    }

    if (mobile) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.burger')) {
                mobile.classList.add('_active')
                document.body.classList.add('_lock');
            } else if (mobile.classList.contains('_active') && (!e.target.closest('.mobile-inner') || e.target.closest('.mobile .close') || e.target.closest('.mobile .menu-item'))) {
                mobile.classList.remove('_active')
                document.body.classList.remove('_lock');
            }
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
            } else if (popup.classList.contains('_active') && (!e.target.closest('.popup-inner') || e.target.closest('.popup .close'))) {
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

        document.addEventListener('click', (e) => {
            if (e.target.closest('.office-filter .toggle')) {
                filter.classList.toggle('_active')
            } else if (!e.target.closest('.office-filter') && !e.target.closest('.flatpickr-calendar')) {
                filter.classList.remove('_active')
            }
        })
    }

    if (apartment) {
        const swiperSelector = apartment.querySelector('.apartment-images .swiper-top')
        const thumbsSelector = apartment.querySelector('.apartment-images .swiper-thumbs')

        initApartmentSwiper(swiperSelector, thumbsSelector)
    }

    if ('tabs') {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.tab-nav button')) {
                const tab = e.target.closest('.tab')
                const curBtn = e.target.closest('.tab-nav button')
                const curCnt = tab.querySelector(`[data-id="${curBtn.getAttribute('data-for')}"]`)
                const tabBtns = tab.querySelectorAll('.tab-nav button')
                const tabCnts = tab.querySelectorAll('.tab-content')

                for (const btn of tabBtns) btn.classList.remove('_active')
                for (const cnt of tabCnts) cnt.classList.remove('_active')
                curBtn.classList.add('_active')
                curCnt.classList.add('_active')
            }
        })
    }

    if (calendar) {
        const booking = document.querySelector('.action.booking')
        const calendarActions = calendar.querySelector('.calendar-actions')
        const checks = {
            list: [],
            add: function (input) {
                this.list.push(input)
            },
            remove: function (input) {
                this.list.splice(this.list.indexOf(input), 1)
            },
        }

        calendar.addEventListener('click', (e) => {
            if (e.target.closest('.calendar-grid label')) {
                e.preventDefault()
                const input = e.target.closest('.calendar-grid label').querySelector('input')
                if (!input || input.disabled) return

                if (input.checked) {
                    input.checked = false
                    checks.remove(input)
                } else {
                    input.checked = true
                    checks.add(input)
                }

                if (checks.list.length > 0) calendarActions.classList.add('_active')
                else calendarActions.classList.remove('_active')
            }
        })

        document.addEventListener('click', (e) => {
            if (e.target.closest('.calendar .cont-book')) {
                booking.classList.add('_active')
                document.body.classList.add('_lock')
            } else if (booking.classList.contains('_active') && (!e.target.closest('.booking .action-inner') || e.target.closest('.booking .close') || e.target.closest('.booking .cancel-book'))) {
                booking.classList.remove('_active')
                document.body.classList.remove('_lock')
            }
        })

        const swiperSelectors = calendar.querySelectorAll('.swiper')
        const dateInput = calendar.querySelector('#date')

        initCalendarSwiper(swiperSelectors)
        initPicker(dateInput)

        if (wWidth > 992) {
            const tooltip = calendar.querySelector('.tooltip')

            calendar.addEventListener('mouseover', (e) => {
                if (e.target.closest('.calendar-grid [data-title]')) {
                    const target = e.target.closest('.calendar-grid [data-title]')
                    const top = target.getBoundingClientRect().top + target.offsetHeight
                    const left = target.getBoundingClientRect().left + (target.offsetWidth / 2)

                    tooltip.textContent = target.getAttribute('data-title').trim()
                    tooltip.classList.add('_active')
                    tooltip.style.top = `${top}px`
                    tooltip.style.left = `${left}px`
                }
            })

            calendar.addEventListener('mouseout', (e) => {
                if (e.target.closest('.calendar-grid [data-title]'))
                    tooltip.classList.remove('_active')
            })
        }
    }

    if (fadeIns && fadeIns.length > 0) {
        const stylize = (elem, props) => { for (const prop in props) elem.style[prop] = props[prop] }
        const animDefault = () => {
            for (let i = 0; i < fadeIns.length; i++) {
                const elem = fadeIns[i]
                const elemFade = fadeIns[i].getAttribute('data-fade') || 'bottom-0'
                const elemProps = {
                    direction: elemFade.split('-')[0],
                    delay: elemFade.split('-')[1]
                }

                stylize(elem, { opacity: '0' })
                if (elemProps.direction === 'left') stylize(elem, { transform: `translate(-80px, 0px)` })
                else if (elemProps.direction === 'bottom') stylize(elem, { transform: `translate(0px, 40px)` })
                else if (elemProps.direction === 'right') stylize(elem, { transform: `translate(80px, 0px)` })
            }
        }
        const animFade = () => {
            const sideAction = document.body.clientHeight / 1.1
            const bottomAction = document.body.clientHeight / 1.1

            for (let i = 0; i < fadeIns.length; i++) {
                const elem = fadeIns[i]
                const elemTop = elem.getBoundingClientRect().top
                const elemFade = fadeIns[i].getAttribute('data-fade') || 'bottom-0'
                const elemProps = {
                    direction: elemFade.split('-')[0],
                    delay: elemFade.split('-')[1]
                }

                stylize(elem, { transition: `transform 0.7s ease, opacity 0.7s ease` })
                if (elemProps.direction === 'left' || elemProps.direction === 'right') {
                    if (elemTop <= sideAction) {
                        stylize(elem, {
                            transitionDelay: `${elemProps.delay}s`,
                            opacity: '1',
                            transform: 'translate(0px, 0px)',
                        });
                    }
                } else if (elemProps.direction === 'bottom') {
                    if (elemTop <= bottomAction) {
                        stylize(elem, {
                            transitionDelay: `${elemProps.delay}s`,
                            opacity: '1',
                            transform: 'translate(0px, 0px)',
                        });
                    }
                }
            }
        }
        animDefault()
        animFade()
        document.addEventListener('scroll', animFade);
    }

    function initOfficeSwiper(selectors) {
        selectors.forEach(selector => {
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
        })
    }

    function initApartmentSwiper(selector, tSelector) {
        const pagination = selector.querySelector('.swiper-pagination')
        const next = selector.querySelector('.swiper-button-next')
        const prev = selector.querySelector('.swiper-button-prev')

        const thumbs = new Swiper(tSelector, {
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

        const swiper = new Swiper(selector, {
            pagination: {
                el: pagination,
                type: 'fraction'
            },
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
            thumbs: {
                swiper: thumbs,
            },
        })
    }

    function initCalendarSwiper(selectors) {
        selectors.forEach(selector => {
            const next = selector.querySelector('.swiper-button-next')
            const prev = selector.querySelector('.swiper-button-prev')

            return new Swiper(selector, {
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

document.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
        const href = e.target.closest('a').getAttribute('href')
        if (href.includes('#')) return

        e.preventDefault()
        window.location.href = '/comfort-zone' + href
    }
})