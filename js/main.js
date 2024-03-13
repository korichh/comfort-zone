const main = function () {
    const mobile = document.querySelector('.mobile');

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
}();