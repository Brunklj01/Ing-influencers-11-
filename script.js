var $=function(i){return document.getElementById(i)};
var lang="en";
try{if(localStorage.getItem("lang")==="pt")lang="pt"}catch(e){}
function t(en,pt){return lang==="pt"?pt:en}

/* data: followers on main platform, in millions (rounded estimates) */
var P=[["Cristiano Ronaldo","Instagram",660],["Lionel Messi","Instagram",510],["MrBeast","YouTube",450],["Selena Gomez","Instagram",420],["Kylie Jenner","Instagram",395],["Dwayne Johnson","Instagram",395],["Ariana Grande","Instagram",370],["Kim Kardashian","Instagram",355],["Beyoncé","Instagram",315],["Justin Bieber","Instagram",290],["Taylor Swift","Instagram",280],["Virat Kohli","Instagram",270],["Neymar","Instagram",225],["Khaby Lame","TikTok",160],["Charli D'Amelio","TikTok",155],["PewDiePie","YouTube",110]];
var fm=[
["YouTube launched before Instagram.","O YouTube foi lançado antes do Instagram.",true,"YouTube is from 2005, Instagram from 2010.","O YouTube é de 2005 e o Instagram de 2010."],
["TikTok was created in 2005.","O TikTok foi criado em 2005.",false,"TikTok grew worldwide around 2016–2018.","O TikTok cresceu em todo o mundo por volta de 2016–2018."],
["In many countries, paid posts must be clearly marked as ads.","Em muitos países, as publicações pagas têm de estar claramente identificadas como publicidade.",true,"Hidden ads can break advertising rules.","A publicidade escondida pode violar as regras da publicidade."],
["Khaby Lame became famous with silent reaction videos.","O Khaby Lame ficou famoso com vídeos de reação sem falar.",true,"His wordless style made him popular in every language.","O estilo sem palavras tornou-o popular em todas as línguas."],
["The biggest accounts have more followers than most countries have people.","As maiores contas têm mais seguidores do que a população da maioria dos países.",true,"Hundreds of millions beats almost every country.","Centenas de milhões ganham à população de quase todos os países."],
["All influencers are adults.","Todos os influenciadores são adultos.",false,"Many creators are teenagers, and some are even kids.","Muitos criadores são adolescentes e alguns são mesmo crianças."]
];

/* translator: swaps every text with data-en / data-pt */
function apply(){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-en]").forEach(function(e){e.innerHTML=e.dataset[lang]});
 $("lang").textContent=lang==="en"?"PT 🇵🇹":"EN 🇬🇧";
 document.title=t("Influencers – Media Presentation","Influenciadores – Apresentação de Media");
 hearts();showQ();if(over)endMsg();
}
$("lang").onclick=function(){
 lang=lang==="en"?"pt":"en";
 try{localStorage.setItem("lang",lang)}catch(e){}
 apply();
};

/* hero like button */
var likes=0;
$("like").onclick=function(){likes++;$("likes").textContent=likes};

var PHOTOS={};
/* cartoon avatar generated from the name, used when there is no photo */
function av(n){
 var h=0;for(var i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))>>>0;
 var sk=["#f1c9a5","#e0a97c","#c68642","#8d5524","#f7d7bd"][h%5],
 hr=["#2b1d14","#6b3f1d","#111","#b5651d","#d9b44a"][(h>>3)%5],
 bg=["#ffb3c7","#b9c4ff","#ffe58a","#b8f0d4","#ffd0a8","#d9c2ff"][(h>>5)%6],
 sh=["#ff3d77","#3b2bff","#1fa971","#14102e","#ff8a3d"][(h>>7)%5],st=(h>>9)%3;
 var back=st===1?"<path d='M27 52c-5-24 6-36 23-36s28 12 23 36c0 10 2 24 2 24H25s2-14 2-24z' fill='"+hr+"'/>":"";
 var fr=st===1?"<path d='M30 46c2-14 10-20 20-20s18 6 20 20c-8-4-14-10-20-10s-12 6-20 10z' fill='"+hr+"'/>"
 :"<path d='M30 44c0-16 9-24 20-24s20 8 20 24c-6-8-14-11-20-11s-14 3-20 11z' fill='"+hr+"'/>"+(st===2?"<circle cx='50' cy='17' r='8' fill='"+hr+"'/>":"");
 return "<svg viewBox='0 0 100 100' aria-hidden='true'><rect width='100' height='100' fill='"+bg+"'/>"+back+"<path d='M14 100c0-22 15-31 36-31s36 9 36 31z' fill='"+sh+"'/><circle cx='50' cy='47' r='20' fill='"+sk+"'/>"+fr+"<circle cx='43' cy='48' r='2.4' fill='#14102e'/><circle cx='57' cy='48' r='2.4' fill='#14102e'/><path d='M43 56q7 6 14 0' stroke='#14102e' stroke-width='2.2' fill='none' stroke-linecap='round'/></svg>";
}
/* photo slot: real photo if we have one, otherwise the cartoon avatar */
function ph(n){
 var s=n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
 return "<span class='ph'>"+av(n)+"<img src='"+(PHOTOS[s]||"images/"+s+".jpg")+"' alt='"+n+"' onerror='this.remove()'></span>";
}
/* ranking bars */
var tp=P.slice().sort(function(a,b){return b[2]-a[2]}).slice(0,8);
$("bars").innerHTML=tp.map(function(d,i){return "<div class='bar'><span class='n'>"+(i+1)+"</span>"+ph(d[0])+"<div><div class='t'><span>"+d[0]+" <small>"+d[1]+"</small></span><span>"+d[2]+" M</span></div><div class='f' data-w='"+Math.round(d[2]/tp[0][2]*100)+"'></div></div></div>"}).join("");
var seen=false;
new IntersectionObserver(function(en,ob){
 if(en[0].isIntersecting&&!seen){seen=true;document.querySelectorAll(".f").forEach(function(f){f.style.width=f.dataset.w+"%"});ob.disconnect()}
}).observe($("bars"));

/* tabs */
document.querySelectorAll(".tab").forEach(function(b){
 b.onclick=function(){
  document.querySelectorAll(".tab").forEach(function(x){x.classList.toggle("on",x===b)});
  $("hl").hidden=b.dataset.g!=="hl";$("fm").hidden=b.dataset.g!=="fm";
 };
});

/* game 1: higher or lower, close pairs only */
var A,B,score=0,best=0,lives=3,over=false,timer=null,left=10;
function mk(){
 var a,b,tries=0;
 do{a=P[Math.floor(Math.random()*P.length)];b=P[Math.floor(Math.random()*P.length)];tries++}
 while((a===b||Math.min(a[2],b[2])/Math.max(a[2],b[2])<0.82)&&tries<500);
 A=a;B=b;
}
function hearts(){$("lv").textContent=new Array(lives+1).join("❤️")+new Array(4-lives).join("🖤")}
function round(){
 mk();
 $("aN").textContent=A[0];$("aP").textContent=A[1];$("aV").textContent=A[2]+" M";
 $("bN").textContent=B[0];$("bP").textContent=B[1];$("bV").textContent="?";
 $("hi").disabled=$("lo").disabled=false;$("msg").textContent="";$("again").hidden=true;
 left=10;clearInterval(timer);
 timer=setInterval(function(){
  left-=0.1;$("tm").style.width=Math.max(left,0)*10+"%";
  if(left<=0)answer(null);
 },100);
}
function endMsg(){$("msg").textContent=t("Game over! Final score: ","Fim do jogo! Pontuação final: ")+score;$("again").hidden=false}
function answer(more){
 clearInterval(timer);
 $("hi").disabled=$("lo").disabled=true;$("bV").textContent=B[2]+" M";
 var gap=Math.round(Math.abs(B[2]-A[2])/Math.max(A[2],B[2])*100);
 var ok=more!==null&&(more?B[2]>=A[2]:B[2]<=A[2]);
 if(ok){
  score++;$("sc").textContent=score;
  if(score>best){best=score;$("bs").textContent=best}
  $("msg").textContent=t("Correct! Only "+gap+"% apart.","Certo! Só "+gap+"% de diferença.");
 }else{
  lives--;hearts();
  $("msg").textContent=more===null?t("Time's up!","Acabou o tempo!"):t("Wrong! Only "+gap+"% apart.","Errado! Só "+gap+"% de diferença.");
 }
 if(lives<=0){over=true;setTimeout(endMsg,1400)}
 else setTimeout(round,1600);
}
$("hi").onclick=function(){answer(true)};
$("lo").onclick=function(){answer(false)};
$("again").onclick=function(){score=0;lives=3;over=false;$("sc").textContent=0;hearts();round()};

/* game 2: fact or myth */
var qi=0,qs=0,locked=false;
function showQ(){
 if(qi>=fm.length){
  $("qt").textContent=t("Done! Score: "+qs+"/"+fm.length,"Terminado! Pontos: "+qs+"/"+fm.length);
  $("fact").hidden=$("myth").hidden=true;$("next").hidden=false;
  $("next").textContent=t("Play again","Jogar outra vez");return;
 }
 $("qn").textContent=qi+1;$("qs").textContent=qs;
 $("qt").textContent=fm[qi][lang==="pt"?1:0];
 $("fact").hidden=$("myth").hidden=false;
 if(!locked){$("qmsg").textContent="";$("next").hidden=true}
 else{$("qmsg").textContent=lastMsg()}
}
var lastRes=null;
function lastMsg(){var q=fm[qi];return (lastRes?t("Correct! ","Certo! "):t("Not quite. ","Quase. "))+q[lang==="pt"?4:3]}
function pickQ(v){
 if(locked)return;
 locked=true;lastRes=(v===fm[qi][2]);if(lastRes)qs++;
 $("qs").textContent=qs;$("qmsg").textContent=lastMsg();
 $("next").hidden=false;$("next").textContent=t("Next","Seguinte");
}
$("fact").onclick=function(){pickQ(true)};
$("myth").onclick=function(){pickQ(false)};
$("next").onclick=function(){
 if(qi>=fm.length){qi=0;qs=0}else qi++;
 locked=false;showQ();
};

/* examples gallery */
$("gal").innerHTML=["Cristiano Ronaldo","Selena Gomez","Tiago Grila","Kim Kardashian"].map(function(n){
 var d=P.filter(function(p){return p[0]===n})[0];
 return "<figure>"+ph(n)+"<figcaption>"+n+(d?"<small>"+d[1]+" · "+d[2]+" M</small>":"<small data-en='TikTok · 86.8K' data-pt='TikTok · 86,8 mil'>TikTok · 86.8K</small>")+"</figcaption></figure>";
}).join("");

round();apply();
