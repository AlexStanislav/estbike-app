import{A as O,r as u,b as q,K as $,L as z,c as n,d as l,y as c,t,i as V,w as G,G as m,p as r,F as x,e as I,o as i,M as L}from"./index-V0y4YvrN.js";import{s as E}from"./dropdown.esm-VFBIIg8y.js";const H={class:"product"},K={class:"product-top-container"},j={class:"product-header"},J=l("span",null,"Acasa",-1),Q=l("span",null,"Modele",-1),W={class:"bike-name-crumb"},X={class:"product-info-left"},Y={class:"product-img-container"},Z=["src"],ee=["src","onClick"],le={class:"product-left-info-details"},ae=l("h2",null,"Detalii utile",-1),te=l("li",null,[l("i",{class:"pi pi-percentage"}),c("Rate fara dobanda")],-1),se=l("li",null,[l("i",{class:"pi pi-chart-bar"}),c("Finantare flexibila in rate ")],-1),ne=l("li",null,[l("i",{class:"pi pi-money-bill"}),c("Rate fara avans")],-1),ie={key:0},oe=l("i",{class:"pi pi-car"},null,-1),re={key:0,class:"installment-container"},ue=l("h2",null,"Calculeaza-ti ratele",-1),ce={class:"installment-price"},de={class:"installment-price"},pe={class:"product-info-right"},ve={class:"product-info-details"},_e={key:0},he={key:1,class:"product-description"},me={class:"product-info-price"},fe={key:0,class:"eur-price"},be={key:0},ke={key:1,class:"ron-price"},ye={key:0},ge={key:2,class:"product-info-price-discount"},Me={class:"product-bottom-container"},Ce=l("h2",null,"Modele similare",-1),Ve={class:"similar-models-container"},xe=["onClick"],Ie={class:"similar-img-container"},Ne=["src"],Ae={class:"similar-info-container"},Re={key:0},Se={key:1},Ue={key:2},Te={__name:"ProductView",setup(we){const d=O(),e=u({}),v=u(""),f=u([]),k=u(0),_=u(""),b=u(""),h=u(12),N=u([12,24,36,48]),y=u([]),A=document.querySelector(".desktop-nav")!==null?document.querySelector(".desktop-nav"):document.querySelector(".mobile-nav");q(()=>{A.classList.add("sticky"),d.currentBike===null&&$.push({path:"/"}),setTimeout(()=>{e.value=d.currentBike,e.value&&(v.value=e.value.image,f.value=g(),_.value=e.value.bike_name.toUpperCase(),b.value=e.value.bike_slogan.toUpperCase(),e.value.old_price!=="null"&&e.value.old_price!==""&&(k.value=Math.round((e.value.price-e.value.old_price)/e.value.price*100).toFixed(0)),y.value=S(U()[0],4))},300)});const R=s=>{e.value=s,v.value=e.value.image,f.value=g(),_.value=e.value.bike_name.toUpperCase(),b.value=e.value.bike_slogan.toUpperCase(),window.scrollTo(0,0)};function S(s,o){if(!Array.isArray(s)||s.length===0||o<=0)return[];const a=Math.floor(Math.random()*(s.length-o+1)),p=a+o;return s.slice(a,p)}const U=()=>{const s=[];for(const o in d.allBikes){const a=d.allBikes[o];for(const p in a){const C=a[p];C.bike_name!==void 0&&C.bike_name===e.value.bike_name&&s.push(a)}}return[...s]},w=()=>e.value.bike_category===""?e.value.bike_slogan:e.value.bike_description,g=()=>{const s=[];if(e.value.gallery===null)return s;if(e.value.gallery[0]==="")s.push(M(e.value.image));else for(const o of e.value.gallery)s.push(M(o));return s},M=s=>(s.includes("motoboom")&&(s=s.replace("125x1","650x1")),s),B=()=>{if(e.value.category!==void 0&&e.value.category!==null)return e.value.category.toUpperCase()},P=()=>Math.round(e.value.price/h.value),T=()=>Math.round(Math.ceil(e.value.price*d.forexValue)/h.value);function D(s){v.value=s}const F=z(()=>{if(e.value.rabla!=="null"&&e.value.rabla!=="undefined"&&e.value.rabla!==null&&e.value.rabla!==void 0&&e.value.rabla!==""&&e.value.rabla!=="NU"&&e.value.rabla!=="nu"&&e.value.rabla!=="Nu"&&e.value.rabla!=="nU"&&e.value.rabla!==!1&&e.value.rabla!=="false")return!0});return(s,o)=>(i(),n("div",H,[l("div",K,[l("div",j,[J,c(" / "),Q,c(" / "),l("span",W,t(_.value),1)]),l("section",X,[l("div",Y,[l("img",{src:v.value,alt:""},null,8,Z),V(m(L),{class:"product-carousel",verticalViewPortHeight:"400px",circular:!0,numVisible:5,value:f.value,showIndicators:!1,orientation:"vertical"},{item:G(a=>[l("img",{class:"product-carousel-img",src:a.data,onClick:p=>D(a.data)},null,8,ee)]),_:1},8,["value"])]),l("div",le,[l("div",null,[ae,l("ul",null,[te,se,ne,F.value?(i(),n("li",ie,[oe,c("Program RABLA")])):r("",!0)])]),e.value.price!==null?(i(),n("div",re,[ue,l("label",null,[c(" Pentru a plati suma totala in "),V(m(E),{options:N.value,modelValue:h.value,"onUpdate:modelValue":o[0]||(o[0]=a=>h.value=a)},null,8,["options","modelValue"]),c(" luni ")]),l("div",ce," Va trebuii sa platiti: "+t(P())+" "+t(e.value.currency)+" pe luna ",1),l("div",de," SAU "+t(T())+" RON pe luna ",1)])):r("",!0)])]),l("section",pe,[l("div",ve,[l("h1",null,t(_.value),1),l("h4",null," Producator: "+t(e.value.brand!==void 0?e.value.brand.toUpperCase():"Necunoscut"),1),l("h4",null,"Categoria: "+t(B()),1),e.value.permis!==void 0&&e.value.permis.length>0?(i(),n("h4",_e,[c(" Permis: "),(i(!0),n(x,null,I(e.value.permis,a=>(i(),n("span",{class:"info-permis",key:a},t(a),1))),128))])):r("",!0),l("h4",null," Tip Vehicul: "+t(e.value.vehicle_type!==void 0?e.value.vehicle_type.replace("bikes","Motociclete").replace("scooters","Scutere").replace("atv","ATV"):"Necunoscut"),1),l("p",null,t(b.value),1),e.value.bike_description!==""?(i(),n("p",he,t(w()),1)):r("",!0)]),l("div",me,[e.value.price!==null?(i(),n("div",fe,[l("span",null,t(e.value.price)+" "+t(e.value.currency),1),e.value.old_price!==null?(i(),n("s",be,t(e.value.old_price)+" "+t(e.value.currency),1)):r("",!0)])):r("",!0),e.value.price!==null?(i(),n("div",ke,[l("span",null,t(Math.ceil(e.value.price*m(d).forexValue))+" RON",1),e.value.old_price!==null?(i(),n("s",ye,t(Math.ceil(e.value.old_price*m(d).forexValue))+" RON",1)):r("",!0)])):r("",!0),e.value.old_price!==null?(i(),n("div",ge," Reducere de "+t(k.value)+"% ",1)):r("",!0)])])]),l("div",Me,[Ce,l("div",Ve,[(i(!0),n(x,null,I(y.value,a=>(i(),n("div",{class:"similar-model-card",key:a,onClick:p=>R(a)},[l("div",Ie,[l("img",{src:a.image,alt:""},null,8,Ne)]),l("div",Ae,[l("h3",null,t(a.bike_name.toUpperCase()),1),a.price!==null?(i(),n("h4",Re,t(a.price)+" "+t(a.currency),1)):(i(),n("h4",Se,"Pret Indisponibil")),a.old_price!==null?(i(),n("h4",Ue,[l("s",null,t(a.old_price)+" "+t(a.currency),1)])):r("",!0)])],8,xe))),128))])])]))}};export{Te as default};
