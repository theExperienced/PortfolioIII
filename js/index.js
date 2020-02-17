// import  gsap  from "./gsap";
// import { TweenMax, Power2 } from gsap;
// gsap.se

const sections = document.querySelectorAll('.section');
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const navInput = document.querySelector('.nav__input');
const navLinks = document.querySelectorAll('.nav__link');

const sectionAboutTitle = document.querySelector('.section__dream');
const scrollIndicator = document.querySelector('.section__scroll-indicator');

const worksContainer = document.querySelector('.works__container');

const formGroups = document.querySelectorAll('.form__group');


let screen = {
  width: window.screen.width,
  height: window.screen.height
}

let mouse = {
  x: 0,
  y: 0
}
// let timeline = new TimelineLite();

// timeline.to("#turb", .1, {
//   attr: { baseFrequency: "0.06 0.1"
//         , scale: 10},
//   repeat: 1,
//   ease: Power3.easeOut
//   // yoyo: true
// }).to("#turb", .09, {
//   attr: { baseFrequency: "0 0" 
//         , scale: 0},
//   repeat: 1,
//   ease: Power3.easeOut
//   // yoyo: true
// }).to("#turb", .07, {
//   attr: { baseFrequency: "0.09 0.3" 
//         , scale: 5},
//   repeat: 1,
//   ease: Power3.easeOut
//   // yoyo: true
// }).to("#turb", .06, {
//   attr: { baseFrequency: "0 0" 
//         , scale: 0},
//   repeat: 1,
//   ease: Power3.easeOut
//   // yoyo: true
// })
// gsap.from(".section:not(:first-child) section__title.section-skills__title", .50, {
//   attr: { opacity: 1 },
//   repeat: 1,
//   ease: Power3.easeOut
//   //  y: -500
//   // yoyo: true
// });

let titleChars = 'FrontEndDeveloper'.split('');
titleChars.forEach(char => {
  let newSpan = document.createElement('span');
  newSpan.innerHTML = char;
  sectionAboutTitle.appendChild(newSpan);
});

export let scrollProps = {
  activeSection: 0,
  previousSection: 0,
  isActive: false,
  activeDuration: 700
}

let isFirstScroll = true;
if (screen.width > 800 && navigator.userAgent.indexOf('Firefox') !== -1) {     //maybe needs to be 1200
  addWheelControl();
}

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX / screen.width - 0.5;
  mouse.y = -e.clientY / screen.height + 0.5;
});

window.addEventListener('resize', e => {
  console.log('RESIZE LISTERNER INDEXJS')
  // { window.screen } = screen;
  screen.width = window.screen.width;
  screen.height = window.screen.height;
  if (screen.width >= 1200) {
    addWheelControl();
  }else {
    console.log('vw < 1200')
    removeWheelControl();
  }

  //NAV LINKS

  
  setUpNavLinks();
  if (screen.width < 800) 
    setUpMediumListeners();
  else 
    setUpLargeListeners();

});

function setUpMediumListeners() {
    window.addEventListener('click', e => {
      console.log('TARGET', e.target)
      if (navInput.checked && e.target !== nav && e.target !== navInput) {
        console.log('TARGET', e.target)
        navInput.checked = false;
        initNavChanges(scrollProps.activeSection);
      }
    });
}

function setUpLargeListeners() {
}

function scrollAppropriately(e) {
  // e.preventDefault();      //MAY BE NEEDED

  console.log('WHEEL EVENT HAPPENED')
  if (isFirstScroll) {
    scrollIndicator.classList.add('hidden');
    isFirstScroll = false;
  }
  if (scrollProps.isActive) return;
  scrollProps.isActive = true;
  if (e.wheelDelta > 0) {
    // console.log('WHEEL > 0')
    if (scrollProps.activeSection !== 0) scrollUp();
  }
  
  else {
    if (scrollProps.activeSection !== 3) {
      console.log('scrolling down');
      scrollDown();
    }
  } 
  
  console.log('ACTIVE SECTION', scrollProps.activeSection);
  setTimeout(() => {scrollProps.isActive = false}, scrollProps.activeDuration);
}

function addWheelControl() {
  console.log('ADDED WHEEL CONTROL')
  window.addEventListener('scroll', e => {
    e.preventDefault();
  });

  window.addEventListener('mousewheel', scrollAppropriately);
}

function removeWheelControl() {
  console.log('REMOVEING WHEEL CONTRL')
  window.removeEventListener('scroll', e => {
    e.preventDefault();
  });
  window.removeEventListener('mousewheel', scrollAppropriately);
  // debugger;
}

function scrollUp() {
  scroll();
  // sections[scrollProps.activeSection].classList.remove('active-up', 'active-down');
  // sections[--scrollProps.activeSection].classList.add('active-up');
}

function scrollDown() {
  scroll(false);
}

function scroll(isUp = true) {
  sections[scrollProps.activeSection].classList.remove('active-up', 'active-down');
  isUp ? --scrollProps.activeSection : ++scrollProps.activeSection;
  console.log('ACTIVE SECTION AS PER CROLL FUNCITON', scrollProps.activeSection)
  sections[scrollProps.activeSection].classList.add('active-down');
  staggerEffects[scrollProps.activeSection]();
}

nav.addEventListener('click', e => {
  e.stopPropagation();
});

navToggle.addEventListener('click', e => {
  e.stopPropagation();
  // sections.forEach(section => {
    console.log('INACTIVATING SECTION DUE TO NAV OPEN')
    if (navInput.checked) {
      sections[scrollProps.activeSection].classList.add('inactive');
      return;
    }
    sections[scrollProps.activeSection].classList.remove('inactive');
  // }); 
});


navInput.addEventListener('click', e => {
  console.log('changed', e)
  if (e.target.checked) {
    sections[scrollProps.activeSection].classList.add('blurred');
    return;
  } else {
    initNavChanges(scrollProps.activeSection);
  }
});

function initNavChanges(index) {
  // console.log('changed to 0')
  navInput.checked = false;
  scrollProps.previousSection = scrollProps.activeSection;
  scrollProps.activeSection = index;
  sections[scrollProps.previousSection].classList.remove('blurred');
  if (scrollProps.activeSection !== scrollProps.previousSection) {
    sections[scrollProps.previousSection].classList.remove('active-up', 'active-down');
    sections[scrollProps.activeSection].classList.add('active-down');
  }
}

// console.log(navLinks)
function setUpNavLinks() {
  navLinks.forEach((link, index) => {
    navInput.checked = false;
    link.addEventListener('click', e => {
      if (screen.width > 1200) {
        e.preventDefault();
        initNavChanges(index);
      }
    });
  });
}

setUpNavLinks();



let staggerEffects = [
  () => {}, () => {}, () => {},
  () => {
    // console.log('LAUNCHED STAGGER')
    let timeline = new TimelineMax({delay: .25});
    
    timeline.staggerFrom(formGroups, .95, {
      x: -50
      , opacity: 0,
      repeat: 0,
      easing: Power2.easeOut
      // yoyo: true
    }, .2);
    
    // TweenMax.staggerFrom(formGroups, .7, {
    //   x: -45
    //         , opacity: 0,
    //   repeat: 0,
    //   ease: Power3.easeOut
    //   // yoyo: true
    // }, 0.3).delay(2);
    
    // var tl = new TimelineMax();
    // tl.to(".from > *", .5, {opacity:-1})
    // .staggerTo(".boxes", 1, {
    //     cycle:{
    //       opacity:[-1, 1]
    //       ease: [Power4.easeInOut]
    //     }
    //   }, 0.05)
    
    
  }
]



// let isDown = false;
// let startX;
// let scrollLeft;



// let mouseInsideWorks = false;
// let scrolling = false;

// function scrollWorksContainer() {
//   console.log('before while loop scroll work container')
//   scrolling = true;
//   let counter = 0;
//   while (mouseInsideWorks) {
//     console.log('while loop scroll work container')
//     if (counter % 1000 === 0) {
//       worksContainer.scrollTop += mouse.y > 0 ? 
//                                   Math.pow(mouse.y * 12, 2) * 21.5 :
//                                   -Math.pow(mouse.y * 12, 2) * 21.5 ;
//     }
//     counter++;
//   }
// }

// worksContainer.addEventListener('mouseenter', e => {
//   mouseInsideWorks = true;
//   // scrollWorksContainer();
//   // if (!mouseInsideWorks)
//   // if (!scrolling)
//   //   scrollWorksContainer();
//   // scrollWorksContainer(); 
// });

// worksContainer.addEventListener('mouseleave', e => {
//   mouseInsideWorks = false;
// });

// worksContainer.addEventListener('mousemove', e => {
//   worksContainer.scrollTop += mouse.y > 0 ? 
//                                   -Math.pow(mouse.y * 12, 2) * 5 :
//                                   Math.pow(mouse.y * 12, 2) * 5;
// // console.log(mouse.x);
// // worksContainer.scrollLeft += mouse.x > 0 ? 
// //                             Math.pow(mouse.x * 12, 2) :
// //                             -Math.pow(mouse.x * 12, 2) ;

// // worksContainer.scrollLeft = counter += 10 *2;
// // console.log('MOUSENTERERD WORKS CONTINER', worksContainer.scrollLeft)
// })



// worksContainer.addEventListener('mousedown', (e) => {
//   isDown = true;
//   worksContainer.classList.add('active');
//   startX = e.pageX - worksContainer.offsetLeft;
//   scrollLeft = worksContainer.scrollLeft;
// });
// worksContainer.addEventListener('mouseleave', () => {
//   isDown = false;
//   worksContainer.classList.remove('active');
// });
// worksContainer.addEventListener('mouseup', () => {
//   isDown = false;
//   worksContainer.classList.remove('active');
// });
// worksContainer.addEventListener('mousemove', (e) => {
//   if(!isDown) return;
//   e.preventDefault();
//   const x = e.pageX - worksContainer.offsetLeft;
//   const walk = (x - startX) * 3; //scroll-fast
//   worksContainer.scrollLeft = scrollLeft - walk;
//   // console.log(walk);
// });







// let timeline = new TimelineLite();

// timeline.to("#turb", .1, {
//   attr: { baseFrequency: "0.06 0.1"
//         , scale: 10},
//   repeat: 1,
//   ease: Power3.easeOut
//   // yoyo: true
// }).to("#turb", .09, {
//   attr: { baseFrequency: "0 0" 
//         , scale: 0},
//   repeat: 1,
//   ease: Power3.easeOut
//   // yoyo: true
// }).to("#turb", .07, {
//   attr: { baseFrequency: "0.09 0.3" 
//         , scale: 5},
//   repeat: 1,
//   ease: Power3.easeOut
//   // yoyo: true
// }).to("#turb", .06, {
//   attr: { baseFrequency: "0 0" 
//         , scale: 0},
//   repeat: 1,
//   ease: Power3.easeOut
//   // yoyo: true
// })