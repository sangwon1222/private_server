import{d as r,e as o,i as n,n as l,a as i,j as e,g as c,h as s}from"./index-45f82072.js";const C=r({__name:"tWideWrap",props:{customStyle:{type:String,default:""}},setup(t){return(a,m)=>(i(),o("div",{class:l(["flex w-full flex-wrap justify-center",t.customStyle])},[n(a.$slots,"default")],2))}}),d={bg:0,width:1280,height:800,cardElement:e(["fire","water","air","electric","plant"]),cardColor:e({fire:16385792,water:262394,air:4913151,electric:16052496,plant:62576}),cardSize:e({w:120,h:180}),action:{pointWidth:30,pointCount:6,pointgap:4,lineColor:1189171,barColor:12369084,ableColor:671350,disableColor:1189171,wait:{width:60,height:10}}},h=d,{cardElement:p}=h,g=c("cards",()=>({state:s({cards:f})})),f=Array(5).fill(null).map((t,a)=>({element:p[Math.floor(Math.random()*5)],attack:Math.ceil(Math.random()*10),defence:Math.ceil(Math.random()*10),hp:10+Math.ceil(Math.random()*10)}));export{C as _,h as c,g as u};
