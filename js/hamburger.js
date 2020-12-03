// hamburger


const ham = document.querySelector('.hambg');
const navlinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

const nav = document.querySelector('.nav-bar');

ham.addEventListener('click', () => {
    navlinks.classList.toggle('open');
})

// header
const navbar = document.getElementById('header');
const sticky = navbar.offsetTop;
window.onscroll = () => {
    if (window.pageYOffset >= sticky) {
        header.classList.add('fixed')
    } else {
        header.classList.remove('fixed')
    }
}


// back to top

const toTop = document.querySelector('.back_to_top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add('active')
    } else {
        toTop.classList.remove('active')
    }
})