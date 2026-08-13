const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12, rootMargin:"0px 0px -50px 0px"});

document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

function addHeart(){
  const wrap=document.getElementById("hearts");
  const heart=document.createElement("span");
  heart.className="heart-particle";
  heart.textContent=Math.random()>.25 ? "♡" : "♥";
  heart.style.left=(Math.random()*100)+"%";
  heart.style.setProperty("--dur",(5+Math.random()*4)+"s");
  heart.style.setProperty("--drift",(-100+Math.random()*200)+"px");
  heart.style.fontSize=(14+Math.random()*28)+"px";
  wrap.appendChild(heart);
  setTimeout(()=>heart.remove(),9500);
}
let heartTimer = null;
function startHearts(){
  if(heartTimer) return;
  heartTimer = setInterval(()=>{
    if(document.hidden) return;
    const existing=document.querySelectorAll(".heart-particle").length;
    if(existing < 10) addHeart();
  },1800);
}
document.addEventListener("visibilitychange", ()=>{
  if(document.hidden){ clearInterval(heartTimer); heartTimer=null; }
  else startHearts();
});
startHearts();

document.getElementById("heartBtn").addEventListener("click",()=>{
  for(let i=0;i<12;i++) setTimeout(addHeart,i*100);
});

document.getElementById("forgiveBtn").addEventListener("click",()=>{
  for(let i=0;i<35;i++) setTimeout(addHeart,i*45);
  const note=document.getElementById("tinyNote");
  note.textContent="okay… this heart is officially yours ♡";
  note.style.opacity="1";
});

document.querySelectorAll("[data-tilt]").forEach(card=>{
  card.addEventListener("pointermove",(e)=>{
    if(window.innerWidth<900 || matchMedia("(hover: none)").matches) return;
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(1000px) rotateX(${y*-7}deg) rotateY(${x*9}deg) translateY(-4px)`;
  });
  card.addEventListener("pointerleave",()=>{
    card.style.transform="";
  });
});
