import $ from 'jquery';
// menu
// const openMenu = (e) => {
//     let item = document.getElementsByClassName('mobile__item');
//     if (e.children[1].classList.contains('menu-active') && e.children[0].classList.contains('navlink__active')) {
//         e.children[1].classList.remove('menu-active');
//         e.children[0].classList.remove('navlink__active');
//     } else {
//         for (let i = 0; i < item.length; i++) {
//             if (item[i].children[1]) {
//                 if (item[i].children[1].classList.contains('menu-active')) {
//                     item[i].children[1].classList.remove('menu-active');
//                     item[i].children[0].classList.remove('navlink__active');
//                 }
//             }
//         }
//         e.children[1].classList.add('menu-active');
//         e.children[0].classList.add('navlink__active');
//     }
// }

// const toggleMenu = function (e) {
//     if (e.getAttribute('id') == 'open-menu') {
//         document.getElementById('header__mobile').classList.add('toggle__menu');
//         document.getElementById('close-menu').style.display = "block";
//         e.style.display = 'none';
//     } else {
//         document.getElementById('header__mobile').classList.remove('toggle__menu');
//         document.getElementById('open-menu').style.display = "block";
//         e.style.display = 'none';
//     }
// }

// window.onresize = function (e) {
//     if (e.target.innerWidth > 992) {
//         document.getElementById('header__mobile').classList.remove('toggle__menu');
//     }
// }
// banner
// $('.banner__slider').slick({
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     dots: false,
//     prevArrow: '<button class="btn btn-primary btn-slider prev"><span><</span></button>',
//     nextArrow: '<button class="btn btn-primary btn-slider next"><span>></span></button>'
// });

// $('.list__brand').slick({
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     dots: false,
//     prevArrow: false,
//     nextArrow: false,
// responsive: [
//     {
//         breakpoint: 992,
//         settings: {
//             slidesToShow: 5,
//             slidesToScroll: 1
//         }
//     },
//     {
//         breakpoint: 767,
//         settings: {
//             slidesToShow: 3,
//             slidesToScroll: 1
//         }
//     },
//     {
//         breakpoint: 576,
//         settings: {
//             slidesToShow: 2,
//             slidesToScroll: 1
//         }
//     }
// ]
// });


// scroll
// window.onscroll = function () {
//     scrollButton();
// };

// function scrollButton() {
//     if (document.documentElement.scrollTop > 700) {
//         document.getElementById('scrollTop').style.opacity = "1";
//     } else {
//         document.getElementById('scrollTop').style.opacity = "0";
//     }
// }

// document.getElementById('scrollTop').addEventListener('click', function (e) {
//     document.documentElement.scrollTop = 0;
// });

// var see = function () {
//     var ypos = window.pageYOffset;
//     if (ypos > 30) {
//         console.log(789);
//     } else {
//         console.log(456);
//     }
// }

// window.addEventListener("scroll", see);