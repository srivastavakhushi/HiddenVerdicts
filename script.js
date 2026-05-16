gsap.registerPlugin(ScrollTrigger);

const path = document.querySelector(".progress-path");
const items = document.querySelectorAll(".item");

/* draw timeline */

const length = path.getTotalLength();

gsap.set(path,{strokeDashoffset:length});

gsap.to(path,{
strokeDashoffset:0,
ease:"none",
scrollTrigger:{
trigger:".timeline",
start:"top top",
end:"bottom bottom",
scrub:true
}
});

/* place events along curve */

function placeItemsAlongPath(){

const pathLength = path.getTotalLength();

items.forEach((item,index)=>{

const point = path.getPointAtLength(
(pathLength/(items.length-1))*index
);

const side = item.dataset.side==="left"?-1:1;

const offsetX=150;
const offsetY=20;

item.style.top=`${point.y-offsetY}px`;
item.style.left=`${point.x+side*offsetX}px`;

});

}

window.addEventListener("load",placeItemsAlongPath);
window.addEventListener("resize",placeItemsAlongPath);

/* cursor */

const dot=document.querySelector(".cursor-dot");
const ring=document.querySelector(".cursor-ring");

window.addEventListener("mousemove",(e)=>{

gsap.to(dot,{
x:e.clientX,
y:e.clientY,
duration:.1
});

gsap.to(ring,{
x:e.clientX,
y:e.clientY,
duration:.25
});

});

/* cursor grow */

items.forEach(item=>{

item.addEventListener("mouseenter",()=>{
gsap.to(ring,{scale:1.8});
});

item.addEventListener("mouseleave",()=>{
gsap.to(ring,{scale:1});
});

});

/* prevent link jump */

items.forEach(item=>{
item.addEventListener("click",(e)=>{
e.preventDefault();
});
});

/* image click alert */

document.querySelectorAll(".event-img").forEach(img=>{

img.addEventListener("click",(e)=>{

e.stopPropagation();
alert("Image clicked!");

});

});

/* background scroll change */

const bgTimeline = gsap.timeline({
scrollTrigger:{
trigger:".timeline",
start:"top top",
end:"bottom bottom",
scrub:true
}
});

bgTimeline
.to("body",{backgroundColor:"#a10404"})
.to("body",{backgroundColor:"#940303"})
.to("body",{backgroundColor:"#7e0303"})
.to("body",{backgroundColor:"#790303"})
.to("body",{backgroundColor:"#640202"})
.to("body",{backgroundColor:"#4a0303"});

/* ADD THIS ONLY */

gsap.registerPlugin(MotionPathPlugin);

/* move building */
gsap.to(".moving-object", {
  scrollTrigger: {
    trigger: ".timeline",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  },
  motionPath: {
    path: ".progress-path",
    align: ".progress-path",
    alignOrigin: [0.5, 1],
    autoRotate: true
  }
});

/* smoke animation */
gsap.to(".smoke-container span", {
  y: -80,
  opacity: 0,
  stagger: 0.2,
  repeat: -1,
  duration: 2,
  ease: "power1.out"
});

/* smoke reacts to scroll */
ScrollTrigger.create({
  trigger: ".timeline",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: (self) => {
    gsap.to(".smoke-container", {
      scale: 0.5 + self.progress * 1.5,
      duration: 0.2
    });
  }
});