import{u as _,_ as p}from"./editCard-f52080d3.js";import{d as f,u as h,s as m,o as x,c as b,w as g,a as c,b as e,e as v,r as w,F as k,f as o}from"./index-d669ed6d.js";const y={class:"flex w-full max-w-1280 items-center justify-center"},I={class:"flex flex-col border"},C=e("label",{for:""},"속성",-1),B=["onChange"],T=["selected"],E=["selected"],F=["selected"],R=["selected"],$=["selected"],j={class:"flex flex-col border"},H=e("label",{for:""},"공격",-1),L=["value","onInput"],M={class:"flex flex-col border"},N=e("label",{for:""},"방어",-1),P=["value","onInput"],S={class:"flex flex-col border"},V=e("label",{for:""},"HP",-1),q=["value","onInput"],z={class:"flex gap-4"},J=f({__name:"home",setup(A){const r=h(),d=_(),{state:s}=m(d);x(async()=>{console.log(s.value)});const i=({target:a},n)=>{const t=a.options[a.selectedIndex].value;s.value.cards[n].element=t};return(a,n)=>(c(),b(p,{"custom-style":"flex flex-col flex-wrap items-center gap-40 min-h-screen bg-gray-900"},{default:g(()=>[e("div",y,[(c(),v(k,null,w(5,(t,u)=>e("ul",{key:u,class:"box-border flex h-400 w-300 flex-col gap-40 overflow-hidden border-2 p-4"},[e("li",I,[C,e("select",{id:"element",name:"속성",onChange:l=>i(l,t-1)},[e("option",{value:"fire",selected:o(s).cards[t-1].element==="fire"},"fire",8,T),e("option",{value:"water",selected:o(s).cards[t-1].element==="water"},"water",8,E),e("option",{value:"air",selected:o(s).cards[t-1].element==="air"},"air",8,F),e("option",{value:"electric",selected:o(s).cards[t-1].element==="electric"},"electric",8,R),e("option",{value:"plant",selected:o(s).cards[t-1].element==="plant"},"plant",8,$)],40,B)]),e("li",j,[H,e("input",{type:"number",placeholder:"10",value:o(s).cards[t-1].attack,onInput:l=>o(s).cards[t-1].attack=+l.currentTarget.value},null,40,L)]),e("li",M,[N,e("input",{type:"number",placeholder:"10",value:o(s).cards[t-1].defence,onInput:l=>o(s).cards[t-1].defence=+l.currentTarget.value},null,40,P)]),e("li",S,[V,e("input",{type:"number",placeholder:"10",value:o(s).cards[t-1].hp,onInput:l=>o(s).cards[t-1].hp=+l.currentTarget.value},null,40,q)])])),64))]),e("div",z,[e("button",{class:"rounded border bg-white p-20 text-black",onClick:n[0]||(n[0]=t=>o(r).push("card-game"))},"편집 완료")])]),_:1}))}});export{J as default};
