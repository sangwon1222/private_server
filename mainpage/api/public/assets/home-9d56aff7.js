import{u as p,_ as f}from"./editCard-4ab88dd0.js";import{d as m,u as h,s as x,o as b,c as g,w as v,a,b as e,e as w,r as k,F as y,f as l}from"./index-1e33f385.js";const I={class:"flex flex-col border"},C=e("label",{for:""},"속성",-1),B=["onChange"],F=["selected"],E=["selected"],T=["selected"],q=["selected"],R=["selected"],S={class:"flex flex-col border"},$=e("label",{for:""},"공격",-1),j=["value","onInput"],H={class:"flex flex-col border"},L=e("label",{for:""},"방어",-1),M=["value","onInput"],N={class:"flex flex-col border"},P=e("label",{for:""},"HP",-1),V=["value","onInput"],z={class:"flex gap-4"},J=m({__name:"home",setup(A){const r=h(),d=p(),{state:s}=x(d);b(async()=>{console.log(s.value)});const u=({target:n},c)=>{const t=n.options[n.selectedIndex].value;s.value.cards[c].element=t},i=()=>{const n=document.getElementById("app");document.fullscreenElement||n.requestFullscreen&&n.requestFullscreen()};return(n,c)=>(a(),g(f,{"custom-style":"flex flex-col flex-wrap items-center gap-40 min-h-screen bg-gray-900"},{default:v(()=>[e("div",{class:"flex w-full max-w-1280 items-center justify-center",onClick:i},[(a(),w(y,null,k(5,(t,_)=>e("ul",{key:_,class:"box-border flex h-400 w-300 flex-col gap-40 overflow-hidden border-2 p-4"},[e("li",I,[C,e("select",{id:"element",name:"속성",onChange:o=>u(o,t-1)},[e("option",{value:"fire",selected:l(s).cards[t-1].element==="fire"},"fire",8,F),e("option",{value:"water",selected:l(s).cards[t-1].element==="water"},"water",8,E),e("option",{value:"air",selected:l(s).cards[t-1].element==="air"},"air",8,T),e("option",{value:"electric",selected:l(s).cards[t-1].element==="electric"},"electric",8,q),e("option",{value:"plant",selected:l(s).cards[t-1].element==="plant"},"plant",8,R)],40,B)]),e("li",S,[$,e("input",{type:"number",placeholder:"10",value:l(s).cards[t-1].attack,onInput:o=>l(s).cards[t-1].attack=+o.currentTarget.value},null,40,j)]),e("li",H,[L,e("input",{type:"number",placeholder:"10",value:l(s).cards[t-1].defence,onInput:o=>l(s).cards[t-1].defence=+o.currentTarget.value},null,40,M)]),e("li",N,[P,e("input",{type:"number",placeholder:"10",value:l(s).cards[t-1].hp,onInput:o=>l(s).cards[t-1].hp=+o.currentTarget.value},null,40,V)])])),64))]),e("div",z,[e("button",{class:"rounded border bg-white p-20 text-black",onClick:c[0]||(c[0]=t=>l(r).push("card-game"))},"편집 완료")])]),_:1}))}});export{J as default};
