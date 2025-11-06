
// --- 1. PAGE LOAD ANIMATIONS ---
gsap.from("#hehe", {
    y: -500,
    opacity: 0,
    duration: 4,
    delay: .8,
    scale: 9,
    ease: "expo.inOut",
});

gsap.from("#para", {
    y: 50,
    opacity: 0,
    duration: 3,
    delay: 4,
    ease: "circ.out",
});

gsap.from("#h2", {
    x: -50,
    opacity: 0,
    duration: 2,
    delay: .5,
    ease: "circ.out",
});

const crsr = document.querySelector("#cursor");
const blur = document.querySelector("#cursor-blur");

document.addEventListener("mousemove", function(dets) {
    // Move main cursor INSTANTLY (no lag)
    crsr.style.left = dets.x + "px";
    crsr.style.top = dets.y + "px";
    
    // The blur will smoothly follow because of its CSS transition
    blur.style.left = (dets.x - 150) + "px";
    blur.style.top = (dets.y - 150) + "px";
});
 document.addEventListener('DOMContentLoaded', function() {
        
            const projectSections = gsap.utils.toArray('.project-section');
            projectSections.forEach(section => {
                
                const imageContainer = section.querySelector('.project-image-container');
                const image = section.querySelector('.project-image');
                const imageMask = section.querySelector('.image-reveal-mask');
                const titleChars = section.querySelectorAll('.project-title .char');
                const details = section.querySelector('.project-details');
                const backgroundNumber = section.querySelector('.background-number');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 65%", 
                        toggleActions: "play none none reverse",
                        // scrub:true,
                       
                    }
                });
     
                tl.to(imageMask, {
                    height: 0, 
                     opacity:1,
                    duration: 1,
                    ease: "power3.in",
                    // scrub: true
                });
                
                tl.to(image, {
                    opacity:1, 
                    duration: 1,
                    ease: "power1.in",
                    // scrub: true
                }, "<"); 
                
                tl.from(backgroundNumber, {
                   x: -100,
                   opacity:0,
                   duration: 1,
                //    scrub: true
                },"<");
                tl.from(details.children, {
                    opacity: 0,
                    y: 50,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power2.out"
                }, "<0.5"); // Start shortly after title animation begins

            });
        });

// --- 3. MOBILE NAVIGATION ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-links a');
const openIcon = document.getElementById('hamburger-open');
const closeIcon = document.getElementById('hamburger-close');

gsap.set(closeIcon, { display: 'none' });

const navTimeline = gsap.timeline({
    paused: true,
    reversed: true,
    onStart: () => {
        gsap.set(openIcon, { display: 'none' });
        gsap.set(closeIcon, { display: 'block' });
    },
    onReverseComplete: () => {
        gsap.set(openIcon, { display: 'block' });
        gsap.set(closeIcon, { display: 'none' });
        gsap.set('body', { overflow: 'auto' });
    }
});

navTimeline
    .set('body', { overflow: 'hidden' })
    .to('.nav-panel', {
        y: '0%',
        duration: 1,
        ease: 'power3.inOut',
    })
    .to('.mobile-nav-gsap', { 
        autoAlpha: 1,
        pointerEvents: 'all'
    }, 0)
    .to(navLinks, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
    }, "-=0.5");

hamburger.addEventListener('click', () => {
    navTimeline.reversed() ? navTimeline.play() : navTimeline.reverse();
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!navTimeline.reversed()) {
            navTimeline.reverse();
        }
    });
});

// --- 4. GSAP SCROLL-BASED ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({

    // --- DESKTOP ANIMATIONS ---
    "(min-width: 769px)": function() {
        const track = document.getElementById("hero-track");
        const panels = gsap.utils.toArray(".panel");
        const scrollbarThumb = document.getElementById("scrollbar-thumb");
        const spacer = document.getElementById("spacer");
        const header = document.getElementById("header");
        
        if (!track || panels.length === 0) return;
  gsap.set(panels, { width: window.innerWidth });

    gsap.set(track, { width: panels.length * window.innerWidth }); // Also update the track width
        const scrollTween = gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: "#hero-wrapper",
                pin: true,
                scrub: 2,
                snap: 1 / (panels.length - 1),
                end: () => "+=" + (track.offsetWidth - window.innerWidth),
                onRefresh: self => {
                    if (spacer) {
                        gsap.set(spacer, { height: self.end - self.start });
                    }
                },
                onUpdate: self => {
                    gsap.set(scrollbarThumb, { width: self.progress * 100 + '%' });
                    if (self.progress > 0.05) {
                        header.style.backgroundColor = 'rgba(252, 250, 245, 0.63)';
                        header.style.color = '#3D352E';
                         blur.style.backgroundColor = '#ffca663d';
                         crsr.style.backgroundColor = '#271906';
                    } else {
                        header.style.backgroundColor = 'transparent';
                        header.style.color = '#ffffff';
                         blur.style.backgroundColor = '#42321549';
                         crsr.style.backgroundColor = '#ffe2bd';
                    }
                }
            }
        });

        const originalPanels = gsap.utils.toArray(".panel-1, .panel-2");
        originalPanels.forEach(panel => {
            const content = panel.querySelectorAll(".panel-number-2, .panel-subtitle-2, .panel-title-2, .panel-text-2, .Front-Text");
            const image = panel.querySelector('.panel-image-2 img');

            const panelTl = gsap.timeline({
                scrollTrigger: {
                    trigger: panel,
                    containerAnimation: scrollTween,
                    start: "left center",
                    end: "center center",
                    scrub: true,
                }
            });

            if (image) {
                panelTl.from(image, { scale: 1.5, duration: 1.5 }, 0)
                       .to(image, { opacity: 1, duration: 0.5 }, 0);
            }
            if (content.length > 0) {
                panelTl.to(content, { opacity: 1, y: -20, stagger: 0.3, duration: 1 }, 0.2);
            }
        });

       
        const panelThreeTimeline = gsap.timeline({
            scrollTrigger: {
               
                trigger: ".panel-3 h2", 
                containerAnimation: scrollTween,
                start: "left center",
                end: "right center",
                scrub: 1,
            }
        });

        // FIX: The h1 animation is now correctly placed inside the timeline for panel 3
   panelThreeTimeline.to(".panel-3 h1", {
            x: -350
        },"anim1");

        panelThreeTimeline.to(".panel-3 h2", {
            x: 300
        },"anim1");

    },

    // --- MOBILE ANIMATIONS (Unchanged) ---
    "(max-width: 768px)": function() {
        // ... your mobile code as you provided ...
        const panels = gsap.utils.toArray(".panel");
        const header = document.getElementById("header");
        const hamburgerIcon = document.getElementById("hamburger");

        ScrollTrigger.create({
            trigger: ".panel-1",
            start: "bottom top",
            onEnter: () => {
                header.style.backgroundColor = 'rgba(234, 232, 227, 0.8)';
                header.style.color = '#88450a';
                hamburgerIcon.style.color = '#88450a';
            },
            onLeaveBack: () => {
                header.style.backgroundColor = 'transparent';
                header.style.color = '#ffffff';
                hamburgerIcon.style.color = 'white';
            }
        });

        panels.forEach(panel => {
            const content = panel.querySelectorAll(".panel-number, .panel-subtitle, .panel-title, .panel-text, .Front-Text");
            const image = panel.querySelector('.panel-image img');

            gsap.to(image, {
                opacity: 1,
                scrollTrigger: { trigger: panel, start: "top center" }
            });
            gsap.to(content, {
                opacity: 1,
                y: -20,
                stagger: 0.1,
                scrollTrigger: { trigger: panel, start: "top center" }
            });
        });

      const panelThreeTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".panel-3 h2",
        start: "top center",
        end: "end center",
        scrub: 1,
      }
    });

panelThreeTimeline.from(".panel-3 h2", {
  x: -100,
  opacity: 0,
  duration: 2,
  ease: "back.out(1.7)",
});
  }
});

// FOOTER GSAP 
function foot() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from(".footer-title", {
        x: -200,
        opacity: 0,
        duration: 2,
        ease: "expoScale(0.5,7,none)",
        scrollTrigger: {
          trigger: "footer",
          start: "top 50%",
        },
    });

    gsap.from(".footer-col", {
      scrollTrigger: {
        trigger: "footer",
        start: "top 75%",
      },
      y: 60,
      opacity: 0,
      duration: 0.9,
      stagger: 1,
      ease: "power3.out"
    });

    const blobPath = document.querySelector(".footer-blob path");
    gsap.to(blobPath, {
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      attr: { d: "M420,300Q390,380,330,420Q270,460,200,400Q130,340,160,260Q190,180,270,160Q350,140,400,200Q450,260,420,300Z" }
    });


}

foot()

function info() {
var info1 = document.querySelector(".info-right")

const tl3 = gsap.timeline({
  scrollTrigger: {
        trigger: ".info-section",
        start: "top 80%",
        end: "top 30%",
        scrub:3,
        
      }
});

tl3.from(".info-first h3",{
    x:-60,
    opacity:0,
    scale:2,
    duration:2
},"anim3");

tl3.from(".info-first p",{
    x:-100,
    opacity:0,
    duration:2,
},"anim3");

tl3.from(".info-right h2",{
    x:0,
    duration:3,
    opacity:0,
    scale:1,
},"anim3");

tl3.from(".info-right img",{
    x:50,
    opacity:0,
    delay:1,
    duration:1
});

}

info()



function pro() {
    gsap.registerPlugin(ScrollTrigger);


     gsap.from(".featured-work-section", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "expoScale(0.5,7,none)",
        scrollTrigger: {
          trigger: ".featured-work-section",
          start: "top 80%",
          end: "top 30%",
          scrub: 2,
        },
    });

    gsap.from(".featured-work-text h2, .featured-work-text p", {
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "expoScale(0.5,7,none)",
        scrollTrigger: {
          trigger: ".featured-work-text",
          start: "top 80%",
        },
    });

    gsap.from(".featured-work-images", {
      scrollTrigger: {
        trigger: ".featured-work-images",
        start: "top 80%",
      },
      x: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out"
    });

    const blobPath = document.querySelector(".footer-blob path");
    gsap.to(blobPath, {
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      attr: { d: "M420,300Q390,380,330,420Q270,460,200,400Q130,340,160,260Q190,180,270,160Q350,140,400,200Q450,260,420,300Z" }
    });


}

pro()