
if (window.innerWidth < 1024) {
  document.body.innerHTML = `
    <style>
      body { 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        height: 100vh; 
        margin: 0; 
        font-family: Arial, sans-serif; 
        text-align: center; 
        background: linear-gradient(
        90deg,
        rgba(69, 69, 69, 1) 0%,
        rgba(50, 50, 50, 1) 50%,
        rgba(30, 30, 30, 1) 100%
      ); 
        color: #fff; 
      }
      h1 {
        font-size: 3rem;
      }
      h2 {
        text-align: center;
        color:#fff;
      }
    </style>
    <div>
      <h1>🚫</h1>
      <h2>This website is only available on desktop devices.</h2>
      <p>Please visit again from a larger screen.</p>
    </div>
  `;
  throw new Error("Blocked mobile view");
}
// variable declaration
const card_detail = [
  {
    img: "assets/shoes/image.webp",
    title: "Elegant Comfort",
    desc: "Experience the perfect blend of style and comfort with our Elegant Comfort shoes. Designed for all-day wear, these shoes feature cushioned insoles and breathable materials to keep your feet happy from morning to night.",
    features: ["unisex", "size 6-12", "5 colors"],
    price: "$79.99"
  },
  {
    img: "assets/shoes/image2.webp",
    title: "Grace Heel",
    desc: "Step up your game with our Sporty Vibes collection. These shoes are engineered for performance, featuring lightweight construction and superior traction to keep you moving confidently, whether you're hitting the gym or the streets.",
    features: ["female", "size 6-12", "6 colors"],
    price: "$89.99"
  },
  {
    img: "assets/shoes/image3.webp",
    title: "Sporty Vibes",
    desc: "Step up your game with our Sporty Vibes collection. These shoes are engineered for performance, featuring lightweight construction and superior traction to keep you moving confidently, whether you're hitting the gym or the streets.",
    features: ["male", "size 6-12", "4 colors"],
    price: "$99.99"
  },{
    img: 'assets/shoes/image4.webp',
    title: 'Solance Max 270', 
    desc: "Step up your game with our Sporty Vibes collection. These shoes are engineered for performance, featuring lightweight construction and superior traction to keep you moving confidently, whether you're hitting the gym or the streets.",
    features: ["male", "size 6-12", "4 colors"],
    price: '$150'
  },
  {
    img: 'assets/shoes/image5.webp',
    title: 'Ultraboost', 
    desc: "Experience the perfect blend of style and comfort with our Elegant Comfort shoes. Designed for all-day wear, these shoes feature cushioned insoles and breathable materials to keep your feet happy from morning to night.",
    features: ["female", "size 8-12", "5 colors"],
    price: '$180'
  } 
];

const video_details = ["assets/video/video1.mp4","assets/video/video2.mp4"];
let vd_pointer = 1;





// Force page to always load from top
window.scrollTo(0, 0);
history.scrollRestoration = 'manual';

gsap.registerPlugin(ScrollTrigger);

document.documentElement.style.scrollBehavior = 'auto';
document.body.style.scrollBehavior = 'auto';

let svgLoaded = false;
let animationsInitialized = false;

function loadSvg(){
    fetch('assets/shoe1.svg')
    .then(response => response.text())
    .then(svgText => {
        document.getElementById('backimg').innerHTML = svgText;
        const svg = document.querySelector('#backimg svg');
        if (svg) {
            svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
        }
        svgLoaded = true;
        initializeScrollAnimations();
    })
    .catch(error => {
        console.error('Error loading SVG:', error);
        svgLoaded = true; // Set to true to prevent hanging
        initializeScrollAnimations();
    });
}

function loadSvg1(){
    fetch('assets/shoe.svg')
    .then(response => response.text())
    .then(svgText => {
        document.getElementById('backimg2').innerHTML = svgText;
        const svg = document.querySelector('#backimg2 svg');
        if (svg) {
            svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
        }
    })
    .catch(error => console.error('Error loading SVG:', error));
}

function initializeScrollAnimations() {
    // Only initialize once and after SVG is loaded
    if (animationsInitialized || !svgLoaded) return;
    
    // Ensure we're at the top
    window.scrollTo(0, 0);
    
    // Wait for DOM to settle
    requestAnimationFrame(() => {
        setAnimationScroll();
        AutoShowanimationpdiv();
        animationsInitialized = true;
        AutoShowanimationtcard();
        setInterval(cardanimate, 5000);
        AutoShowanimationForAll("#about",["#about h2"]);
        AutoShowanimationForAll(".abt1",[".abt1 p",".aboutvd "]);   // to change speed of card swaping 
        AutoShowanimationForAll(".abt2",[".abt2 h4"],0.9);
        AutoShowanimationForAll(".txt_prt",[".txt_prt h5",".txt_prt p"],0.9);
        setInterval(VideoAnimation, 7000);
        
        
        

    });
}

function setAnimationScroll() {
    // Kill any existing ScrollTriggers for this element
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && (trigger.trigger.id === 'backimg' || trigger.trigger === document.querySelector('#backimg'))) {
            trigger.kill();
        }
    });
    
    // Ensure SVG exists
    const svg = document.querySelector("#backimg svg");
    if (!svg) {
        console.warn('SVG not found, retrying in 100ms');
        setTimeout(setAnimationScroll, 100);
        return;
    }
    
    // Force scroll to top before setting up animation
    window.scrollTo(0, 0);
    
    // Reset SVG to initial state
    gsap.set("#backimg svg", {
        y: 0,
        scale: 1,
        rotate: 0,
        transformOrigin: "center center",
        clearProps: "transform"
    });
    
    // Small delay to ensure everything is ready
    gsap.delayedCall(0.2, () => {
        let runtime = gsap.timeline({
            scrollTrigger: {
                trigger: "#backimg",
                start: "top top",
                end: "+=600",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                refreshPriority: -1,
                onRefresh: function() {
                    // Reset to initial state on refresh
                    gsap.set("#backimg svg", {
                        y: 0,
                        scale: 1,
                        rotate: 0
                    });
                },
                onUpdate: function(self) {
                    // Ensure proper progress calculation
                    if (self.progress === 0) {
                        gsap.set("#backimg svg", {
                            y: 0,
                            scale: 1,
                            rotate: 0
                        });
                    }
                }
            }
        });

        // Add animations to the timeline
        runtime.to("#backimg svg", { 
            y: 150,
            ease: "none",
            duration: 1
        })
        .to("#backimg svg", {
            scale: 1,
            rotate: 36,
            ease: "none",
            duration: 1
        }, 0); // Start at the same time (position 0)
        
        // Final refresh after timeline creation
        ScrollTrigger.refresh();
    });
}

function AutoShowanimationpdiv(){
    // Kill existing animation for this element
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && trigger.trigger.classList && trigger.trigger.classList.contains('pdiv')) {
            trigger.kill();
        }
    });
    
    let Autoruntime = gsap.timeline({
        scrollTrigger: {
            trigger: ".pdiv",
            start: "top 95%",
            end: "top 60%",
            scrub: 1,
            invalidateOnRefresh: true
        }
    });
    
    Autoruntime.from([".pdiv h2", ".pdiv p"], {
        opacity: 0,
        y: 50,
        scale: 0.3,
        ease: "none"
    });
}

// Proper initialization sequence
function initialize() {
    // Force scroll to top
    window.scrollTo(0, 0);
    
    // Load SVGs
    loadSvg();   // This will trigger animations after loading
    loadSvg1();  // Load second SVG
    loadvideo();
    loadSvg3();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

// Handle page visibility and navigation
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page loaded from cache (back/forward)
        window.scrollTo(0, 0);
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    }
});

// Handle window resize
window.addEventListener('resize', gsap.utils.debounce(() => {
    ScrollTrigger.refresh();
}, 250));

// Additional safety: Reset scroll position periodically during initial load
let resetAttempts = 0;
const resetInterval = setInterval(() => {
    window.scrollTo(0, 0);
    resetAttempts++;
    if (resetAttempts >= 5 || animationsInitialized) {
        clearInterval(resetInterval);
    }
}, 100);


function AutoShowanimationtcard(){
    card = gsap.timeline({
        scrollTrigger: {
            trigger: ".crd_sec",
            start: "top 95%",  
            end: "top 60%",
            scrub: 1,
        }
    })
    card.from([".titl_card" ,".cards" ],{
        opacity: 0,
        y: 50,
        scale: 0.3,
    })

}
 // card animation for random image 



function cardanimate(){
    const cardid = document.querySelectorAll('.crd');
    //console.log(cardid);
    cardid.forEach(crds => {
        var randomIndex = Math.floor(Math.random() * card_detail.length);
        const img = crds.querySelector('img');
        const title = crds.querySelector('h4');
        const desc = crds.querySelector('p');
        const price = crds.querySelector('.price');
        const features = crds.querySelectorAll('ul li');
        
        gsap.to([img, title, desc, price , features], 
        {
            opacity: 0,
            duration: 1,
            ease: "power1.in", 
            onComplete: () => {
                img.src = card_detail[randomIndex].img;
                title.textContent = card_detail[randomIndex].title;
                desc.textContent = card_detail[randomIndex].desc;
                price.textContent = card_detail[randomIndex].price;
                const new_features = card_detail[randomIndex].features;
                features.forEach((li,i) => {
                    li.textContent = new_features[i] || '';
                })

                gsap.to([img, title, desc, price , features], {opacity: 1, duration: 1})
            }})
    });
    
}

// reusable auto animation function 

function AutoShowanimationForAll(triggerElement , elmts, vscale = 0.3){
    card = gsap.timeline({
        scrollTrigger: {
            trigger: triggerElement,
            start: "top 95%",  
            end: "top 60%",
            scrub: 1,
        }
    })
    card.from(elmts,{
        opacity: 0,
        y: 50,
        scale: vscale,
    })
    
}
function loadvideo(){
    const container = document.querySelector(".aboutvd");
    const videocnt = document.createElement("video");
    videocnt.src = "assets/video/video1.mp4"
    videocnt.controls = false;
    videocnt.autoplay = true;
    videocnt.muted = true;
    videocnt.loop = true;
    videocnt.oncontextmenu = e => e.preventDefault();
    videocnt.setAttribute("disablePictureInPicture", ""); // block PiP
    videocnt.setAttribute("controlsList", "nodownload noplaybackrate noremoteplayback");
    videocnt.style.pointerEvents = "none";
    container.appendChild(videocnt)
}



function VideoAnimation(){
    const video_cont = document.querySelector(".aboutvd");
    const oldVideo = document.querySelector(".aboutvd video");
    const new_video = document.createElement("video");
    new_video.src = video_details[vd_pointer];
    
    vd_pointer = (vd_pointer+1)% video_details.length;
    new_video.controls = false;
    new_video.autoplay = true;
    new_video.muted = true;
    new_video.loop = true;
    new_video.oncontextmenu = e => e.preventDefault();
    new_video.setAttribute("disablePictureInPicture", ""); // block PiP
    new_video.setAttribute("controlsList", "nodownload noplaybackrate noremoteplayback");
    new_video.style.pointerEvents = "none";

    new_video.style.position = "absolute";
    new_video.style.top = 0;
    new_video.style.left = 0;

    new_video.style.objectFit = "cover";
    new_video.style.transform = "translateX(100%)"; // start off-screen right

    video_cont.appendChild(new_video);

    // animate both videos
    const tl = gsap.timeline({
    });

    tl.to(oldVideo, { x: "-100%", opacity:0, duration: 1, ease: "power2.inOut" }, 0) // slide old left
      .to(new_video, { x: "0%", duration: 1, ease: "power2.inOut" }, 0)  // slide new in
      .call(() => {
      oldVideo.remove(); // remove after both animations complete
  });
}

function loadSvg3(){
    fetch('assets/shoe2.svg')
    .then(response => response.text())
    .then(svgText => {
        document.querySelector('.splitimg').innerHTML = svgText;
        const svg = document.querySelector('.splitimg svg');
        if (svg) {
            svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
        }
        splitshoeAnimation();
    })
    .catch(error => console.error('Error loading SVG:', error));
}

function splitshoeAnimation(){
    const up = document.getElementById("bdim1");
    const mid = document.getElementById("bdim2");
    const low = document.getElementById("bdim3");
    console.log(up,mid,low);
    if (!up || !mid || !low) {
        console.warn("SVG parts not found");
        return;
    }

    const tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".abt2",
            start: "top 20%",   // when abt2 hits the top
            end: "+=1500",      // control distance (longer = slower)
            scrub:1,
            pin: true,          // ✅ keeps .abt2 frozen
            anticipatePin: 1
        }
    });
    
    tl1.to({}, { duration: 0.3 })  
       .to(up, { y: -100, opacity: 1 })
       .to(low, { y: 200, opacity: 1 });
}

