!function(e){"use strict";const t=[{name:"icons/00_cherry",radius:20},{name:"icons/01_strawberry",radius:26},{name:"icons/02_grape",radius:22},{name:"icons/03_orange",radius:32},{name:"icons/04_lemon",radius:34},{name:"icons/05_pear",radius:38},{name:"icons/06_apple",radius:28},{name:"icons/07_peach",radius:40},{name:"icons/08_pineapple",radius:46},{name:"icons/09_melon",radius:50},{name:"icons/10_watermelon",radius:53}],n={0:2,2:1,1:6,6:3,3:4,4:5,5:7,7:8,8:9,9:10};!function(){const o=e.Engine.create(),i=document.getElementById("game-container"),r=window.innerWidth<=480,s=e.Render.create({element:i,engine:o,options:{wireframes:!1,background:"#f9e2bb",width:r?340:400,height:r?480:540}}),a=o.world,d=e.Bodies.rectangle(0,r?230:255,15,r?480:520,{isStatic:!0,render:{fillStyle:"#f9e2bb"}}),c=e.Bodies.rectangle(r?335:400,r?230:255,10,r?480:520,{isStatic:!0,render:{fillStyle:"#f9e2bb"}}),l=e.Bodies.rectangle(r?170:200,r?470:520,r?350:400,15,{isStatic:!0,render:{fillStyle:"#68A542"}}),u=e.Bodies.rectangle(r?170:200,0,r?350:400,10,{isStatic:!0,render:{fillStyle:"#f9e2bb"}}),y=e.Bodies.rectangle(r?170:200,r?480:530,r?350:400,20,{isStatic:!0,render:{fillStyle:"#B7BFFC"}}),m=e.Bodies.rectangle(r?170:200,80,r?360:400,10,{isStatic:!0,isSensor:!0,render:{visible:!1},label:"gameEnd"});e.World.add(a,[d,c,l,u,y,m]);const p=document.createElement("div");p.className="gameEndLine",p.style.display="none",i.appendChild(p),e.Render.run(s);const g=e.Runner.create(),b=Date.now();requestAnimationFrame((function t(){e.Runner.tick(g,o,Date.now()-b),requestAnimationFrame(t)}));const B={topLineVisible:!1,topLineTriggered:!1,isGameOver:!1,score:0,currentFruit:null,disableAction:!1,currentBody:null,pairsColliding:{},bestScore:(()=>{const e=localStorage.getItem("bestScore");return e?parseInt(e):0})()},f={drop:new Audio("drop.mp3"),collide:new Audio("collision.mp3"),largeCandy:new Audio("largeCandy.mp3"),burstsound:new Audio("burst.mp3")},h=document.getElementById("scoreboard"),x=document.getElementById("bestvalue");function v(){h.textContent=`${B.score}`,x.textContent=`${B.bestScore}`}v();let E=0,S=Math.floor(5*Math.random());function w(){if(B.isGameOver)return;const n=t[E],o=n.radius,i=document.getElementById("nextCandy");i.innerHTML='<div class="next">ネクスト</div>';const r=document.createElement("img");r.src=`${t[S].name}.png`,i.appendChild(r),setTimeout((()=>{const t=e.Bodies.circle(180,50,o,{collisionFilter:{category:1,mask:1},index:E,isSleeping:!0,label:"Circle Body",render:{sprite:{texture:`${n.name}.png`}},restitution:.3,friction:.05,density:.5});let i;B.currentBody=t,B.currentFruit=n,e.World.add(a,t),v(),E=S;do{i=Math.floor(6*Math.random())}while(i===E);S=i}),100)}let A=[];function C(e,t){for(let t=0;t<20;t++){const t=A.pop();if(!t)return;const n=10*(Math.random()-.5),o=15*(Math.random()-.5);t.style.left=`${e.x+n}px`,t.style.top=`${e.y+o}px`,t.style.setProperty("--x-translate",`${n}px`),t.style.setProperty("--y-translate",`${o}px`),t.style.animationDelay=.5*Math.random()+"s",t.style.background=`radial-gradient(circle, hsl(${360*Math.random()}, 100%, 70%), hsl(${360*Math.random()}, 100%, 50%))`,t.style.display="block",setTimeout((()=>{t.style.display="none",A.push(t)}),1e3)}}function M(t){if(B.disableAction||B.isGameOver||!B.currentBody)return;const n=document.getElementById("game-container").getBoundingClientRect();let o="mousedown"===t.type?t.clientX-n.left:t.touches[0].clientX-n.left;o=Math.max(B.currentFruit.radius,Math.min(o,n.width-B.currentFruit.radius)),B.currentBody&&(e.Body.setPosition(B.currentBody,{x:o,y:B.currentBody.position.y}),B.disableAction=!0,setTimeout((()=>{f.drop.play(),B.currentBody.isSleeping=!1,e.Body.setVelocity(B.currentBody,{x:0,y:3}),setTimeout((()=>{B.disableAction=!1,w()}),1e3)}),100))}!function(){for(let e=0;e<100;e++){const e=document.createElement("div");e.className="burst-animation",e.style.display="none";const t=20*Math.random()+10;e.style.width=`${t}px`,e.style.height=`${t}px`,document.getElementById("game-container").appendChild(e),A.push(e)}}(),document.getElementById("game-container").addEventListener("mousedown",M),document.getElementById("game-container").addEventListener("touchstart",M),window.onkeydown=t=>{if(!B.disableAction&&!B.isGameOver)switch(t.code){case"KeyA":B.currentBody.position.x-B.currentFruit.radius>10&&e.Body.setPosition(B.currentBody,{x:B.currentBody.position.x-10,y:B.currentBody.position.y});break;case"KeyD":const t=document.getElementById("game-container").offsetWidth;B.currentBody.position.x+B.currentFruit.radius<t-15&&e.Body.setPosition(B.currentBody,{x:B.currentBody.position.x+10,y:B.currentBody.position.y});break;case"KeyS":B.currentBody&&(B.currentBody.isSleeping=!1,f.drop.play(),B.disableAction=!0,setTimeout((()=>{w(),B.disableAction=!1}),1e3))}},o.constraintIterations=10,o.positionIterations=10,e.Events.on(o,"collisionActive",(o=>{o.pairs.forEach((o=>{const{bodyA:i,bodyB:r}=o;if(B.isGameOver)return;if(!B.disableAction&&("gameEnd"===o.bodyA.label||"gameEnd"===o.bodyB.label))return p.style.display="block",void function(){B.isGameOver=!0,B.disableAction=!0;const t=a.bodies.filter((e=>"Circle Body"===e.label));let n=0;B.score>B.bestScore&&(B.bestScore=B.score,localStorage.setItem("bestScore",B.bestScore));function o(){if(n>=t.length)return;const i=t[n];C(i.position),f.largeCandy.play(),e.World.remove(a,i),n++,setTimeout(o,100)}o(),setTimeout((()=>{document.getElementById("final-score").textContent=`最終スコア: ${B.score}`;const t=new bootstrap.Modal(document.getElementById("gameOverModal"),{keyboard:!1});e.Runner.stop(g),t.show()}),6e3)}();const s=i.index,d=r.index;if(e.Body.applyForce(i,i.position,{x:.005*(r.position.x-i.position.x),y:.005*(r.position.y-i.position.y)}),void 0!==s&&void 0!==d&&s===d&&!B.isGameOver&&!B.pairsColliding[s]){B.pairsColliding[s]=!0,function(t,n){if(Math.sqrt((n.position.x-t.position.x)**2+(n.position.y-t.position.y)**2)<100){const o=2e-5,i={x:(n.position.x-t.position.x)*o,y:(n.position.y-t.position.y)*o};e.Body.applyForce(t,t.position,i),e.Body.applyForce(n,n.position,{x:-i.x,y:-i.y})}}(i,r),f.collide.play(),C(o.bodyA.position),f.burstsound.play(),setTimeout((()=>{e.World.remove(a,[i,r])}),100),B.isGameOver||(B.score+=Math.floor(8*Math.random())+1,v());const d=n[s];if(void 0!==d&&d<t.length){const n=t[d],o=e.Bodies.circle(i.position.x,i.position.y,n.radius,{index:d,render:{sprite:{texture:`${n.name}.png`}},restitution:.3,friction:.01,density:.5});e.World.add(a,o),f.largeCandy.play()}setTimeout((()=>{B.pairsColliding[s]=!1}),100)}}))})),document.getElementById("replay-button").addEventListener("click",(function(){location.reload()})),w()}()}(Matter);