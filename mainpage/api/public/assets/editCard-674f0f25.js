import{d as a,e as r,i as o,n,a as i,g as l,h as c}from"./index-13fcfd4b.js";const u=a({__name:"tWideWrap",props:{customStyle:{type:String,default:""}},setup(t){return(e,f)=>(i(),r("div",{class:n(["flex w-full flex-wrap justify-center",t.customStyle])},[o(e.$slots,"default")],2))}}),s={bg:0,width:1280,height:800,cardElement:["fire","water","air","electric","plant"],cardColor:{fire:16385792,water:262394,air:4913151,electric:16052496,plant:62576},cardSize:{w:120,h:180},action:{pointWidth:30,pointCount:10,pointgap:4,lineColor:1189171,barColor:12369084,ableColor:671350,disableColor:1189171,wait:{width:60,height:10}}},d=s,{cardElement:h}=d,C=l("cards",()=>({state:c({cards:p})})),p=Array(5).fill(null).map((t,e)=>({element:h[Math.floor(Math.random()*5)],attack:Math.ceil(Math.random()*10),defence:Math.ceil(Math.random()*10),hp:10+Math.ceil(Math.random()*10)}));export{u as _,d as c,C as u};