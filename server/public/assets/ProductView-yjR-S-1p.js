import{u as Q,r as u,o as W,a as X,L as Y,G as Z,M as ee,b as s,c as i,e as l,A as p,t as n,i as S,w as le,H as m,p as c,F as f,f as g,N as ae,O as w}from"./index-xa2poIi0.js";import{s as te,a as se}from"./radiobutton.esm-JE1Udn4z.js";const ie={class:"product"},ne={class:"product-top-container"},oe={class:"product-header"},re=l("span",null,"Acasa",-1),ue=l("span",null,"Modele",-1),ce={class:"bike-name-crumb"},de={class:"product-info-left"},ve={class:"product-img-container"},pe=["src"],_e=["src","onClick"],he={class:"product-left-info-details"},ke=l("h2",null,"Detalii utile",-1),be=l("li",null,[l("i",{class:"pi pi-percentage"}),p("Rate fara dobanda")],-1),me=l("li",null,[l("i",{class:"pi pi-chart-bar"}),p("Finantare flexibila in rate ")],-1),fe=l("li",null,[l("i",{class:"pi pi-money-bill"}),p("Rate fara avans")],-1),ge={key:0},ye=l("i",{class:"pi pi-car"},null,-1),Be={key:0,class:"installment-container"},Ce=l("h2",null,"Calculeaza-ti ratele",-1),Me={class:"installment-price"},xe={class:"installment-price"},Se={class:"product-info-right"},Ve={class:"product-info-details"},Ie={class:"bike-subtitle"},Ne={class:"bike-subtitle"},Ae={key:0},Oe={class:"bike-subtitle"},Ue={key:1,class:"product-description"},Pe={key:0,class:"colors-container"},Re=l("h3",null,"Culori disponibile:",-1),$e=["onClick"],we={key:0,class:"color-display"},De={key:1,class:"color-display"},Te={class:"product-info-price"},ze={key:0,class:"omologare-display"},Ee={key:0},je={key:1},Fe={key:1,class:"eur-price"},Je={key:0},qe={key:2,class:"ron-price"},Ge={key:0},He={key:3,class:"product-info-price-discount"},Le={class:"product-bottom-container"},Ke=l("h2",null,"Modele similare",-1),Qe={class:"similar-models-container"},We=["onClick"],Xe={class:"similar-img-container"},Ye=["src"],Ze={class:"similar-info-container"},el={key:0},ll={key:1},al={key:2},nl={__name:"ProductView",setup(tl){const r=Q(),e=u({}),C=u(""),V=u([]);u(0);const M=u(""),I=u(""),y=u(12),D=u([12,24,36,48]),B=u([]),v=u(0),_=u(0),N=u([]),T=document.querySelector(".desktop-nav")!==null?document.querySelector(".desktop-nav"):document.querySelector(".mobile-nav");W(()=>{r.togglePreloader(!0),r.currentBike===null&&(r.currentBike=JSON.parse(localStorage.getItem("currentBike"))),setTimeout(()=>{r.togglePreloader(!1)},1e3)});const h=u();function x(){r.currentBike===null&&(r.currentBike=JSON.parse(localStorage.getItem("currentBike"))),e.value=r.currentBike,C.value=e.value.image,V.value=J(),M.value=e.value.bike_name.toUpperCase(),I.value=e.value.bike_slogan!==null?e.value.bike_slogan.toUpperCase():"",typeof e.value.price=="object"&&e.value.price!==null?v.value=e.value.price[0].replace(/\D/g,""):e.value.price!==null?v.value=e.value.price.replace(/\D/g,""):v.value="Pret indisponibil",typeof e.value.old_price=="object"&&e.value.old_price!==null?_.value=e.value.old_price[0].replace(/\D/g,""):e.value.old_price!==null?_.value=e.value.old_price.replace(/\D/g,""):_.value="Pret indisponibil",N.value=E(j()[0],4),h.value=JSON.parse(e.value.colors_display)}X(()=>{T.classList.add("sticky"),setTimeout(()=>{x()},300)});const z=(a,o)=>{if(o.brand==="royal_enfield")v.value=parseInt(o.price[o.colors.indexOf(a)]),_.value=parseInt(o.old_price[o.colors.indexOf(a)]),console.log(v.value,_.value);else{const k=r.allBikes[`${e.value.brand}_${e.value.vehicle_type}`].filter(b=>b.bike_name.includes(a)).filter(b=>{const U=b.bike_name.split("-"),P=U.slice(0,U.indexOf(a)),R=e.value.bike_name.split("-"),$=R.slice(0,R.indexOf(a));if(console.log("baseBikeName",P),console.log("baseCurrentBikeName",$),P.join("-")===$.join("-"))return console.log(b),b});k.length>0&&A(k[0])}},A=a=>{localStorage.setItem("currentBike",JSON.stringify(a)),r.setCurrentBike(a),x(),window.scrollTo(0,0)};function E(a,o){if(!Array.isArray(a)||a.length===0||o<=0)return[];const t=Math.floor(Math.random()*(a.length-o+1)),d=t+o;return a.slice(t,d)}const j=()=>{const a=[];for(const o in r.allBikes){const t=r.allBikes[o];for(const d in t){const k=t[d];k.bike_name!==void 0&&k.bike_name===e.value.bike_name&&a.push(t)}}return[...a]},F=()=>e.value.bike_category===""?e.value.bike_slogan:e.value.bike_description,J=()=>{const a=[];if(e.value.gallery===null)return a;if(e.value.gallery[0]==="")a.push(O(e.value.image));else for(const o of e.value.gallery)a.push(O(o.replace(/\'/g,"")));return a},O=a=>(a.includes("$http")&&(a=a.replace("$http","http")),a.includes("motoboom")&&(a=a.replace("125x1","650x1")),a),q=()=>{if(e.value.category!==void 0&&e.value.category!==null)return e.value.category.toUpperCase()},G=()=>{let a=Array.isArray(e.value.price)?e.value.price[0]:e.value.price;return Math.round(a/y.value)},H=()=>{let a=Array.isArray(e.value.price)?e.value.price[0]:e.value.price;return Math.round(Math.ceil(a*r.forexValue)/y.value)};function L(a){C.value=a}const K=Y(()=>{if(e.value.rabla!=="null"&&e.value.rabla!=="undefined"&&e.value.rabla!==null&&e.value.rabla!==void 0&&e.value.rabla!==""&&e.value.rabla!=="NU"&&e.value.rabla!=="nu"&&e.value.rabla!=="Nu"&&e.value.rabla!=="nU"&&e.value.rabla!==!1&&e.value.rabla!=="false")return!0});return Z(()=>B.value,()=>{const a=e.value.omologare.indexOf(B.value);v.value=e.value.price[a].replace(/\D/g,"")}),ee(()=>{x()}),(a,o)=>(s(),i("div",ie,[l("div",ne,[l("div",oe,[re,p(" / "),ue,p(" / "),l("span",ce,n(M.value),1)]),l("section",de,[l("div",ve,[l("img",{lazy:"",src:C.value,alt:""},null,8,pe),S(m(ae),{class:"product-carousel",verticalViewPortHeight:"400px",circular:!0,numVisible:5,value:V.value,showIndicators:!1,orientation:"vertical"},{item:le(t=>[l("img",{class:"product-carousel-img",src:t.data,onClick:d=>L(t.data)},null,8,_e)]),_:1},8,["value"])]),l("div",he,[l("div",null,[ke,l("ul",null,[be,me,fe,K.value?(s(),i("li",ge,[ye,p("Program RABLA")])):c("",!0)])]),e.value.price!==null?(s(),i("div",Be,[Ce,l("label",null,[p(" Pentru a plati suma totala in "),S(m(te),{options:D.value,modelValue:y.value,"onUpdate:modelValue":o[0]||(o[0]=t=>y.value=t)},null,8,["options","modelValue"]),p(" luni ")]),l("div",Me," Va trebuii sa platiti: "+n(G())+" EUR pe luna ",1),l("div",xe," SAU "+n(H())+" RON pe luna ",1)])):c("",!0)])]),l("section",Se,[l("div",Ve,[l("h1",null,n(M.value),1),l("div",Ie," Producator: "+n(e.value.brand!==void 0?e.value.brand.toUpperCase():"Necunoscut"),1),l("div",Ne,"Categoria: "+n(q()),1),e.value.permis!==void 0&&e.value.permis.length>0?(s(),i("div",Ae,[p(" Permis: "),(s(!0),i(f,null,g(e.value.permis,t=>(s(),i("span",{class:"info-permis",key:t},n(t.replace(/[{}"']/g,"")),1))),128))])):c("",!0),l("div",Oe," Tip Vehicul: "+n(e.value.vehicle_type!==void 0?e.value.vehicle_type.replace("bikes","Motociclete").replace("scooters","Scutere").replace("atv","ATV"):"Necunoscut"),1),l("p",null,n(I.value),1),e.value.bike_description!==""?(s(),i("p",Ue,n(F()),1)):c("",!0)]),h.value!==null?(s(),i("div",Pe,[Re,l("ul",null,[(s(!0),i(f,null,g(e.value.colors,t=>(s(),i("li",{key:t,onClick:d=>z(t,e.value)},[l("span",null,n(t),1),Array.isArray(h.value[t])?(s(),i("div",we,[(s(!0),i(f,null,g(h.value[t],d=>(s(),i("div",{class:"color-block",key:d,style:w({background:`#${d}`})},null,4))),128))])):(s(),i("div",De,[l("div",{class:"color-block",style:w({background:`#${h.value[t]}`})},null,4)]))],8,$e))),128))])])):c("",!0),l("div",Te,[e.value.omologare!==null?(s(),i("div",ze,[p(" Omologare: "),e.value.omologare!==null&&e.value.omologare.length>1?(s(),i("ul",Ee,[(s(!0),i(f,null,g(e.value.omologare,t=>(s(),i("li",{key:t},[l("label",null,[S(m(se),{modelValue:B.value,"onUpdate:modelValue":o[1]||(o[1]=d=>B.value=d),binary:!0,value:t},null,8,["modelValue","value"]),l("div",null,n(t.toUpperCase()),1)])]))),128))])):e.value.omologare!==null?(s(),i("div",je,n(e.value.omologare[0].toUpperCase()),1)):c("",!0)])):c("",!0),e.value.price!==null?(s(),i("div",Fe,[l("span",null,n(v.value)+" EUR",1),e.value.old_price!==null?(s(),i("s",Je,n(_.value)+" EUR",1)):c("",!0)])):c("",!0),e.value.price!==null?(s(),i("div",qe,[l("span",null,n(Math.ceil(v.value*m(r).forexValue))+" RON",1),e.value.old_price!==null?(s(),i("s",Ge,n(Math.ceil(_.value*m(r).forexValue))+" RON",1)):c("",!0)])):c("",!0),e.value.old_price!==null?(s(),i("div",He," Reducere de "+n(Math.round((v.value-_.value)/v.value*100).toFixed(0))+"% ",1)):c("",!0)])])]),l("div",Le,[Ke,l("div",Qe,[(s(!0),i(f,null,g(N.value,t=>(s(),i("div",{class:"similar-model-card",key:t,onClick:d=>A(t)},[l("div",Xe,[l("img",{lazy:"",src:t.image,alt:""},null,8,Ye)]),l("div",Ze,[l("h3",null,n(t.bike_name.toUpperCase()),1),t.price!==null?(s(),i("h4",el,n(t.price)+" "+n(t.currency),1)):(s(),i("h4",ll,"Pret Indisponibil")),t.old_price!==null?(s(),i("h4",al,[l("s",null,n(t.old_price)+" "+n(t.currency),1)])):c("",!0)])],8,We))),128))])])]))}};export{nl as default};
