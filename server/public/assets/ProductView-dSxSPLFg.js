import{u as Z,C as u,o as ee,a as le,L as ae,G as $,M as te,b as i,c as s,e as a,z as h,n as o,g as S,w as ie,H as k,k as p,F as g,y as m,N as se,O as w}from"./index-V3DOWSjJ.js";import{s as oe,a as ne}from"./radiobutton.esm-suSHbUKQ.js";const re={class:"product"},ue={class:"product-top-container"},ce={class:"product-header"},de=a("span",null,"Acasa",-1),ve=a("span",null,"Modele",-1),pe={class:"bike-name-crumb"},_e={class:"product-info-left"},he={class:"product-img-container"},fe=["src"],ke=["src","onClick"],ge={class:"product-left-info-details"},me=a("h2",null,"Detalii utile",-1),be=a("li",null,[a("i",{class:"pi pi-percentage"}),h("Rate fara dobanda")],-1),ye=a("li",null,[a("i",{class:"pi pi-chart-bar"}),h("Finantare flexibila in rate ")],-1),Me=a("li",null,[a("i",{class:"pi pi-money-bill"}),h("Rate fara avans")],-1),Ce={key:0},Ne=a("i",{class:"pi pi-car"},null,-1),Be={key:0,class:"installment-container"},Ve=a("h2",null,"Calculeaza-ti ratele",-1),Ie={class:"installment-price"},xe={class:"installment-price"},Se={class:"product-info-right"},Pe={class:"product-info-details"},Ae={class:"bike-subtitle"},Ue={class:"bike-subtitle"},Oe={key:0},Re={class:"bike-subtitle"},De={key:1,class:"product-description"},$e={key:0,class:"colors-container"},we=a("h3",null,"Culori disponibile:",-1),Te=["onClick"],ze={key:0,class:"color-display"},Ee={class:"product-info-price"},je={key:0,class:"omologare-display"},Fe={key:0},Je={key:1,class:"no-omologare"},qe=a("div",{class:"no-omologare-icon"},null,-1),Le={key:1,class:"eur-price"},Ge={key:0},He={key:2,class:"ron-price"},Ke={key:0},Qe={key:3,class:"product-info-price-discount"},We={class:"product-bottom-container"},Xe=a("h2",null,"Vehicule similare",-1),Ye={class:"similar-models-container"},Ze=["onClick"],el={class:"similar-img-container"},ll=["src"],al={class:"similar-info-container"},tl={key:0},il={key:1},sl={key:2},cl={__name:"ProductView",setup(ol){const r=Z(),e=u({}),B=u(""),P=u([]);u(0);const V=u(""),A=u(""),f=u(12),T=u([12,24,36,48]),b=u([]),c=u(0),d=u(0),y=u(0),M=u(0),U=u([]),z=document.querySelector(".desktop-nav")!==null?document.querySelector(".desktop-nav"):document.querySelector(".mobile-nav");ee(()=>{r.togglePreloader(!0),r.currentBike===null&&(r.currentBike=JSON.parse(localStorage.getItem("currentBike"))),setTimeout(()=>{r.togglePreloader(!1)},1e3)});const C=u();function I(){r.currentBike===null&&(r.currentBike=JSON.parse(localStorage.getItem("currentBike"))),e.value=r.currentBike,B.value=e.value.image,P.value=q(),e.value.omologare==="neinmatriculabil"&&(e.value.omologare=null),V.value=e.value.bike_name.toUpperCase(),A.value=e.value.bike_slogan!==null?e.value.bike_slogan.toUpperCase():"",typeof e.value.price=="object"&&e.value.price!==null?c.value=typeof e.value.price[0]=="string"?e.value.price[0].replace(/\D/g,""):e.value.price[0]:e.value.price!==null?c.value=e.value.price.replace(/\D/g,""):c.value="Pret indisponibil",typeof e.value.old_price=="object"&&e.value.old_price!==null?d.value=typeof e.value.old_price[0]=="string"?e.value.old_price[0].replace(/\D/g,""):typeof e.value.old_price[0]=="string"?e.value.old_price[0].replace(/\D/g,""):e.value.old_price[0]:e.value.old_price!==null?d.value=typeof e.value.old_price=="string"?e.value.old_price.replace(/\D/g,""):typeof e.value.old_price=="string"?e.value.old_price.replace(/\D/g,""):e.value.old_price:d.value="Pret indisponibil",U.value=j(F()[0],4),C.value=e.value.colors_display!==null?JSON.parse(e.value.colors_display.replace(/'/g,'"')):null}le(()=>{r.isMobile()&&z.classList.add("sticky"),setTimeout(()=>{I();for(const l in C.value)console.log(l);y.value=G(),M.value=H()},300)});const E=(l,n)=>{if(n.brand==="royal_enfield")c.value=parseInt(n.price[n.colors.indexOf(l)]),d.value=parseInt(n.old_price[n.colors.indexOf(l)]);else{const v=r.allBikes[`${e.value.brand}_${e.value.vehicle_type}`].filter(N=>N.bike_name.includes(l)),_=e.value.colors;console.log(_);const D=v.filter(N=>{const W=N.bike_name.split("-"),X=e.value.bike_name.split("-"),Y=W.filter(x=>!_.includes(x)).join(" ");if(X.filter(x=>!_.includes(x)).join(" ").includes(Y))return N});D.length>0&&O(D[0])}},O=l=>{localStorage.setItem("currentBike",JSON.stringify(l)),r.setCurrentBike(l),I(),window.scrollTo(0,0)};function j(l,n){if(!Array.isArray(l)||l.length===0||n<=0)return[];const t=Math.floor(Math.random()*(l.length-n+1)),v=t+n;return l.slice(t,v)}const F=()=>{const l=[];for(const n in r.allBikes){const t=r.allBikes[n];for(const v in t){const _=t[v];_.bike_name!==void 0&&_.bike_name===e.value.bike_name&&l.push(t)}}return[...l]},J=()=>e.value.bike_category===""?e.value.bike_slogan:e.value.bike_description,q=()=>{const l=[];if(e.value.gallery===null)return l;if(e.value.gallery[0]==="")l.push(R(e.value.image));else for(const n of e.value.gallery)l.push(R(n.replace(/\'/g,"")));return l},R=l=>(l.includes("$http")&&(l=l.replace("$http","http")),l.includes("motoboom")&&(l=l.replace("125x1","650x1")),l),L=()=>{if(e.value.category!==void 0&&e.value.category!==null)return e.value.category.toUpperCase()},G=()=>{let l=Array.isArray(e.value.price)?e.value.price[0]:e.value.price;return l=typeof l=="string"?parseInt(l.replace(/\D/g,"")):l,Math.round(l/f.value)},H=()=>{let l=Array.isArray(e.value.price)?e.value.price[0]:e.value.price;return l=typeof l=="string"?parseInt(l.replace(/\D/g,"")):l,Math.round(Math.ceil(l*r.forexValue)/f.value)};function K(l){B.value=l}const Q=ae(()=>{if(e.value.rabla!=="null"&&e.value.rabla!=="undefined"&&e.value.rabla!==null&&e.value.rabla!==void 0&&e.value.rabla!==""&&e.value.rabla!=="NU"&&e.value.rabla!=="nu"&&e.value.rabla!=="Nu"&&e.value.rabla!=="nU"&&e.value.rabla!==!1&&e.value.rabla!=="false")return!0});return $(()=>b.value,()=>{const l=e.value.omologare.indexOf(b.value);c.value=typeof e.value.price[l]=="string"?e.value.price[l].replace(/\D/g,""):e.value.price[l],y.value=Math.round(c.value/f.value),M.value=Math.round(Math.ceil(c.value*r.forexValue)/f.value)}),$(()=>f.value,()=>{y.value=Math.round(c.value/f.value),M.value=Math.round(Math.ceil(c.value*r.forexValue)/f.value)}),te(()=>{I()}),(l,n)=>(i(),s("div",re,[a("div",ue,[a("div",ce,[de,h(" / "),ve,h(" / "),a("span",pe,o(V.value),1)]),a("section",_e,[a("div",he,[a("img",{lazy:"",src:B.value,alt:""},null,8,fe),S(k(se),{class:"product-carousel",verticalViewPortHeight:"400px",circular:!0,numVisible:5,value:P.value,showIndicators:!1,orientation:"vertical"},{item:ie(t=>[a("img",{class:"product-carousel-img",src:t.data,onClick:v=>K(t.data)},null,8,ke)]),_:1},8,["value"])]),a("div",ge,[a("div",null,[me,a("ul",null,[be,ye,Me,Q.value?(i(),s("li",Ce,[Ne,h("Program RABLA")])):p("",!0)])]),e.value.price!==null?(i(),s("div",Be,[Ve,a("label",null,[h(" Pentru a plati suma totala in "),S(k(oe),{options:T.value,modelValue:f.value,"onUpdate:modelValue":n[0]||(n[0]=t=>f.value=t)},null,8,["options","modelValue"]),h(" luni ")]),a("div",Ie," Va trebuii sa platiti: "+o(y.value)+" EUR pe luna ",1),a("div",xe," SAU "+o(M.value)+" RON pe luna ",1)])):p("",!0)])]),a("section",Se,[a("div",Pe,[a("h1",null,o(V.value),1),a("div",Ae," Producator: "+o(e.value.brand!==void 0?e.value.brand.toUpperCase():"Necunoscut"),1),a("div",Ue,"Categoria: "+o(L()),1),e.value.permis!==void 0&&e.value.permis.length>0?(i(),s("div",Oe,[h(" Permis: "),(i(!0),s(g,null,m(e.value.permis,t=>(i(),s("span",{class:"info-permis",key:t},o(t.replace(/[{}"']/g,"")),1))),128))])):p("",!0),a("div",Re," Tip Vehicul: "+o(e.value.vehicle_type!==void 0?e.value.vehicle_type.replace("bikes","Motociclete").replace("scooters","Scutere").replace("atv","ATV"):"Necunoscut"),1),a("p",null,o(A.value),1),e.value.bike_description!==""?(i(),s("p",De,o(J()),1)):p("",!0)]),C.value!==null?(i(),s("div",$e,[we,a("ul",null,[(i(!0),s(g,null,m(C.value,(t,v)=>(i(),s("li",{key:v,onClick:_=>E(v,e.value)},[a("span",null,o(v),1),Array.isArray(t)?(i(),s("div",ze,[(i(!0),s(g,null,m(t,_=>(i(),s("div",{class:"color-block",key:_,style:w({background:_.includes("#")?`${_}`:`#${_}`})},null,4))),128))])):(i(),s("div",{key:1,class:"color-block",style:w({background:t.includes("#")?`${t}`:`#${t}`})},null,4))],8,Te))),128))])])):p("",!0),a("div",Ee,[e.value.omologare!==null&&e.value.omologare[0]!==""?(i(),s("div",je,[h(" Omologare: "),e.value.omologare!==null&&e.value.omologare.length>1?(i(),s("ul",Fe,[(i(!0),s(g,null,m(e.value.omologare,t=>(i(),s("li",{key:t},[a("label",null,[S(k(ne),{modelValue:b.value,"onUpdate:modelValue":n[1]||(n[1]=v=>b.value=v),binary:!0,value:t},null,8,["modelValue","value"]),a("div",null,o(t==="l7e"?"Euro5":t.toUpperCase()),1)])]))),128))])):e.value.omologare!==null&&e.value.omologare[0]!==void 0?(i(),s("div",Je,[qe,h(" "+o(e.value.omologare[0].toUpperCase()),1)])):p("",!0)])):p("",!0),e.value.price!==null?(i(),s("div",Le,[a("span",null,o(c.value)+" EUR",1),d.value!==null&&!isNaN(d.value)?(i(),s("s",Ge,o(d.value)+" EUR",1)):p("",!0)])):p("",!0),e.value.price!==null?(i(),s("div",He,[a("span",null,o(Math.ceil(c.value*k(r).forexValue))+" RON",1),d.value!==null&&!isNaN(d.value)?(i(),s("s",Ke,o(Math.ceil(d.value*k(r).forexValue))+" RON",1)):p("",!0)])):p("",!0),d.value!==null&&d.value.toLowerCase()!=="pret indisponibil"?(i(),s("div",Qe," Reducere de "+o(Math.round((c.value-d.value)/c.value*100).toFixed(0))+"% ",1)):p("",!0)])])]),a("div",We,[Xe,a("div",Ye,[(i(!0),s(g,null,m(U.value,t=>(i(),s("div",{class:"similar-model-card",key:t,onClick:v=>O(t)},[a("div",el,[a("img",{lazy:"",src:t.image,alt:""},null,8,ll)]),a("div",al,[a("h3",null,o(t.bike_name.toUpperCase()),1),t.price!==null?(i(),s("h4",tl,o(Array.isArray(t.price)?t.price[0]:t.price)+" "+o(t.currency),1)):(i(),s("h4",il,"Pret Indisponibil")),t.old_price!==null?(i(),s("h4",sl,[a("s",null,o(Array.isArray(t.old_price)?t.old_price[0]:t.old_price)+" "+o(t.currency),1)])):p("",!0)])],8,Ze))),128))])])]))}};export{cl as default};