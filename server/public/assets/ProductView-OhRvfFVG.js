import{u as Q,r as u,o as W,a as X,L as Y,G as Z,M as ee,b as s,c as i,e as l,A as v,t as n,i as A,w as le,H as f,p as c,F as y,f as m,N as ae,O as w}from"./index-xbNEE8w1.js";import{s as te,a as se}from"./radiobutton.esm-aqVw2Hql.js";const ie={class:"product"},ne={class:"product-top-container"},oe={class:"product-header"},re=l("span",null,"Acasa",-1),ue=l("span",null,"Modele",-1),ce={class:"bike-name-crumb"},de={class:"product-info-left"},pe={class:"product-img-container"},ve=["src"],_e=["src","onClick"],he={class:"product-left-info-details"},ke=l("h2",null,"Detalii utile",-1),be=l("li",null,[l("i",{class:"pi pi-percentage"}),v("Rate fara dobanda")],-1),fe=l("li",null,[l("i",{class:"pi pi-chart-bar"}),v("Finantare flexibila in rate ")],-1),ye=l("li",null,[l("i",{class:"pi pi-money-bill"}),v("Rate fara avans")],-1),me={key:0},ge=l("i",{class:"pi pi-car"},null,-1),Be={key:0,class:"installment-container"},Ce=l("h2",null,"Calculeaza-ti ratele",-1),Me={class:"installment-price"},xe={class:"installment-price"},Ae={class:"product-info-right"},Se={class:"product-info-details"},Ve={class:"bike-subtitle"},Ie={class:"bike-subtitle"},Ne={key:0},Oe={class:"bike-subtitle"},Ue={key:1,class:"product-description"},Pe={key:0,class:"colors-container"},Re=l("h3",null,"Culori disponibile:",-1),$e=["onClick"],we={key:0,class:"color-display"},De={key:1,class:"color-display"},Te={class:"product-info-price"},Ee={key:0,class:"omologare-display"},ze={key:0},je={key:1},Fe={key:1,class:"eur-price"},Je={key:0},qe={key:2,class:"ron-price"},Ge={key:0},He={key:3,class:"product-info-price-discount"},Le={class:"product-bottom-container"},Ke=l("h2",null,"Modele similare",-1),Qe={class:"similar-models-container"},We=["onClick"],Xe={class:"similar-img-container"},Ye=["src"],Ze={class:"similar-info-container"},el={key:0},ll={key:1},al={key:2},nl={__name:"ProductView",setup(tl){const r=Q(),e=u({}),C=u(""),S=u([]);u(0);const M=u(""),V=u(""),g=u(12),D=u([12,24,36,48]),B=u([]),p=u(0),_=u(0),I=u([]),T=document.querySelector(".desktop-nav")!==null?document.querySelector(".desktop-nav"):document.querySelector(".mobile-nav");W(()=>{r.togglePreloader(!0),r.currentBike===null&&(r.currentBike=JSON.parse(localStorage.getItem("currentBike"))),setTimeout(()=>{r.togglePreloader(!1)},1e3)});const h=u();function x(){r.currentBike===null&&(r.currentBike=JSON.parse(localStorage.getItem("currentBike"))),e.value=r.currentBike,C.value=e.value.image,S.value=J(),M.value=e.value.bike_name.toUpperCase(),V.value=e.value.bike_slogan!==null?e.value.bike_slogan.toUpperCase():"",typeof e.value.price=="object"&&e.value.price!==null?p.value=e.value.price[0].replace(/\D/g,""):e.value.price!==null?p.value=e.value.price.replace(/\D/g,""):p.value="Pret indisponibil",typeof e.value.old_price=="object"&&e.value.old_price!==null?_.value=e.value.old_price[0].replace(/\D/g,""):e.value.old_price!==null?_.value=e.value.old_price.replace(/\D/g,""):_.value="Pret indisponibil",I.value=z(j()[0],4),h.value=JSON.parse(e.value.colors_display)}X(()=>{T.classList.add("sticky"),setTimeout(()=>{x()},300)});const E=(t,o)=>{if(o.brand==="royal_enfield")p.value=parseInt(o.price[o.colors.indexOf(t)]),_.value=parseInt(o.old_price[o.colors.indexOf(t)]),console.log(p.value,_.value);else{const k=r.allBikes[`${e.value.brand}_${e.value.vehicle_type}`].filter(b=>b.bike_name.includes(t)).filter(b=>{const U=b.bike_name.split("-"),P=U.slice(0,U.indexOf(t)),R=e.value.bike_name.split("-"),$=R.slice(0,R.indexOf(t));if(console.log("baseBikeName",P),console.log("baseCurrentBikeName",$),P.join("-")===$.join("-"))return console.log(b),b});k.length>0&&N(k[0])}},N=t=>{localStorage.setItem("currentBike",JSON.stringify(t)),r.setCurrentBike(t),x(),window.scrollTo(0,0)};function z(t,o){if(!Array.isArray(t)||t.length===0||o<=0)return[];const a=Math.floor(Math.random()*(t.length-o+1)),d=a+o;return t.slice(a,d)}const j=()=>{const t=[];for(const o in r.allBikes){const a=r.allBikes[o];for(const d in a){const k=a[d];k.bike_name!==void 0&&k.bike_name===e.value.bike_name&&t.push(a)}}return[...t]},F=()=>e.value.bike_category===""?e.value.bike_slogan:e.value.bike_description,J=()=>{const t=[];if(e.value.gallery===null)return t;if(e.value.gallery[0]==="")t.push(O(e.value.image));else for(const o of e.value.gallery)t.push(O(o.replace(/\'/g,"")));return t},O=t=>(t.includes("$http")&&(t=t.replace("$http","http")),t.includes("motoboom")&&(t=t.replace("125x1","650x1")),t),q=()=>{if(e.value.category!==void 0&&e.value.category!==null)return e.value.category.toUpperCase()},G=()=>{let t=Array.isArray(e.value.price)?e.value.price[0]:e.value.price;return Math.round(t/g.value)},H=()=>{let t=Array.isArray(e.value.price)?e.value.price[0]:e.value.price;return Math.round(Math.ceil(t*r.forexValue)/g.value)};function L(t){C.value=t}const K=Y(()=>{if(e.value.rabla!=="null"&&e.value.rabla!=="undefined"&&e.value.rabla!==null&&e.value.rabla!==void 0&&e.value.rabla!==""&&e.value.rabla!=="NU"&&e.value.rabla!=="nu"&&e.value.rabla!=="Nu"&&e.value.rabla!=="nU"&&e.value.rabla!==!1&&e.value.rabla!=="false")return!0});return Z(()=>B.value,()=>{const t=e.value.omologare.indexOf(B.value);p.value=e.value.price[t].replace(/\D/g,"")}),ee(()=>{x()}),(t,o)=>(s(),i("div",ie,[l("div",ne,[l("div",oe,[re,v(" / "),ue,v(" / "),l("span",ce,n(M.value),1)]),l("section",de,[l("div",pe,[l("img",{lazy:"",src:C.value,alt:""},null,8,ve),A(f(ae),{class:"product-carousel",verticalViewPortHeight:"400px",circular:!0,numVisible:5,value:S.value,showIndicators:!1,orientation:"vertical"},{item:le(a=>[l("img",{class:"product-carousel-img",src:a.data,onClick:d=>L(a.data)},null,8,_e)]),_:1},8,["value"])]),l("div",he,[l("div",null,[ke,l("ul",null,[be,fe,ye,K.value?(s(),i("li",me,[ge,v("Program RABLA")])):c("",!0)])]),e.value.price!==null?(s(),i("div",Be,[Ce,l("label",null,[v(" Pentru a plati suma totala in "),A(f(te),{options:D.value,modelValue:g.value,"onUpdate:modelValue":o[0]||(o[0]=a=>g.value=a)},null,8,["options","modelValue"]),v(" luni ")]),l("div",Me," Va trebuii sa platiti: "+n(G())+" EUR pe luna ",1),l("div",xe," SAU "+n(H())+" RON pe luna ",1)])):c("",!0)])]),l("section",Ae,[l("div",Se,[l("h1",null,n(M.value),1),l("div",Ve," Producator: "+n(e.value.brand!==void 0?e.value.brand.toUpperCase():"Necunoscut"),1),l("div",Ie,"Categoria: "+n(q()),1),e.value.permis!==void 0&&e.value.permis.length>0?(s(),i("div",Ne,[v(" Permis: "),(s(!0),i(y,null,m(e.value.permis,a=>(s(),i("span",{class:"info-permis",key:a},n(a.replace(/[{}"']/g,"")),1))),128))])):c("",!0),l("div",Oe," Tip Vehicul: "+n(e.value.vehicle_type!==void 0?e.value.vehicle_type.replace("bikes","Motociclete").replace("scooters","Scutere").replace("atv","ATV"):"Necunoscut"),1),l("p",null,n(V.value),1),e.value.bike_description!==""?(s(),i("p",Ue,n(F()),1)):c("",!0)]),h.value!==null?(s(),i("div",Pe,[Re,l("ul",null,[(s(!0),i(y,null,m(e.value.colors,a=>(s(),i("li",{key:a,onClick:d=>E(a,e.value)},[l("span",null,n(a),1),Array.isArray(h.value[a])?(s(),i("div",we,[(s(!0),i(y,null,m(h.value[a],d=>(s(),i("div",{class:"color-block",key:d,style:w({background:`#${d}`})},null,4))),128))])):(s(),i("div",De,[l("div",{class:"color-block",style:w({background:`#${h.value[a]}`})},null,4)]))],8,$e))),128))])])):c("",!0),l("div",Te,[e.value.omologare!==null?(s(),i("div",Ee,[v(" Omologare: "),e.value.omologare!==null&&e.value.omologare.length>1?(s(),i("ul",ze,[(s(!0),i(y,null,m(e.value.omologare,a=>(s(),i("li",{key:a},[l("label",null,[A(f(se),{modelValue:B.value,"onUpdate:modelValue":o[1]||(o[1]=d=>B.value=d),binary:!0,value:a},null,8,["modelValue","value"]),l("div",null,n(a==="l7e"?"Euro5":a.toUpperCase()),1)])]))),128))])):e.value.omologare!==null?(s(),i("div",je,n(e.value.omologare[0].toUpperCase()),1)):c("",!0)])):c("",!0),e.value.price!==null?(s(),i("div",Fe,[l("span",null,n(p.value)+" EUR",1),e.value.old_price!==null?(s(),i("s",Je,n(_.value)+" EUR",1)):c("",!0)])):c("",!0),e.value.price!==null?(s(),i("div",qe,[l("span",null,n(Math.ceil(p.value*f(r).forexValue))+" RON",1),e.value.old_price!==null?(s(),i("s",Ge,n(Math.ceil(_.value*f(r).forexValue))+" RON",1)):c("",!0)])):c("",!0),e.value.old_price!==null?(s(),i("div",He," Reducere de "+n(Math.round((p.value-_.value)/p.value*100).toFixed(0))+"% ",1)):c("",!0)])])]),l("div",Le,[Ke,l("div",Qe,[(s(!0),i(y,null,m(I.value,a=>(s(),i("div",{class:"similar-model-card",key:a,onClick:d=>N(a)},[l("div",Xe,[l("img",{lazy:"",src:a.image,alt:""},null,8,Ye)]),l("div",Ze,[l("h3",null,n(a.bike_name.toUpperCase()),1),a.price!==null?(s(),i("h4",el,n(Array.isArray(a.price)?a.price[0]:a.price)+" "+n(a.currency),1)):(s(),i("h4",ll,"Pret Indisponibil")),a.old_price!==null?(s(),i("h4",al,[l("s",null,n(Array.isArray(a.old_price)?a.old_price[0]:a.old_price)+" "+n(a.currency),1)])):c("",!0)])],8,We))),128))])])]))}};export{nl as default};
