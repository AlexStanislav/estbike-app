import{A as i,u as q,o as x,a as A,b as _,c as I,d as l,f as k,G as h,h as D,j as N,l as y,F as P,x as F,e as T,Y as E,Z as $}from"./index-QOG-_r7D.js";import{s as M}from"./dropdown.esm-1vC6wo7f.js";const G=(u,r)=>{const p=u.__vccOpts||u;for(const[v,f]of r)p[v]=f;return p},b=u=>(E("data-v-0a18122c"),u=u(),$(),u),J={class:"utile"},Y=b(()=>l("h1",null,"Date utile",-1)),Z={class:"utile-top-section"},z={class:"utile-filters"},H={class:"p-float-label"},K=b(()=>l("label",null,"Marca",-1)),Q={class:"p-float-label"},W=b(()=>l("label",null,"Capacitate cilindrica",-1)),X={class:"p-float-label"},ee=b(()=>l("label",null,"Model",-1)),ae={class:"utile-bike-image"},te=["src"],le={class:"utile-bottom-section"},oe={class:"utile-tech-info"},ne={class:"tech-table"},se={colspan:"2"},ce={__name:"UtileView",setup(u){const r=i([]),p=i([]),v=i([]),f=i([]),m=i("#"),g=i(""),w=i([]),t=i({brand:null,capacitate:null,model:null}),d=q();x(()=>{d.togglePreloader(!0)}),A(async()=>{const o=document.querySelector(".desktop-nav");o!==null&&o.classList.add("sticky"),setTimeout(()=>{d.togglePreloader(!1)},1e3),d.allBikes===null&&await d.getAllBikes(),r.value=C(d.allBikes),p.value=V(r.value)});function C(o){return Object.values(o).flat().filter(n=>n.display_model)}function V(o){const e=[];return o.forEach(a=>{a.tech!==null&&e.push((a.brand.split("")[0].toUpperCase()+a.brand.slice(1)).replace("_"," "))}),[...new Set(e)]}function U(o){const e=o.value,a=S(e);v.value=a,f.value=[],t.value.capacitate=null,t.value.model=null,m.value="#"}function S(o=null){let e=[],a;for(const s of r.value)o!==null&&s.brand===o.toLowerCase().replace(" ","_")&&(a=s.capacitate,a!==null&&e.push(a)),o===null&&(a=s.capacitate,a!==null&&e.push(a));for(let s in e){const c=e[s];c<50&&(e[s]=(Math.round(c/25)*25).toString()),c>=50&&c<125&&(e[s]="50"),c>=120&&c<200&&(e[s]="125"),c>=200&&c<=500&&(e[s]="200-500"),c>500&&c<=800&&(e[s]="500-800"),c>800&&(e[s]="800+")}return[...new Set([...new Set(e)])].sort((s,c)=>{const O=parseInt(s.split("-")[0]),j=parseInt(c.split("-")[0]);return O-j})}function B(){const o=r.value.filter(e=>{const a=!t.value.brand||e.brand===t.value.brand.toLowerCase().replace(" ","_");let n=!0;return t.value.capacitate.includes("-")?n=parseInt(e.capacitate)>=parseInt(t.value.capacitate.split("-")[0])&&parseInt(e.capacitate)<=parseInt(t.value.capacitate.split("-")[1]):t.value.capacitate.includes("+")?n=parseInt(e.capacitate)>=800:(parseInt(t.value.capacitate)===50&&(n=parseInt(e.capacitate)>=50&&parseInt(e.capacitate)<100),parseInt(t.value.capacitate)===125&&(n=parseInt(e.capacitate)>=120&&parseInt(e.capacitate)<200)),a&&n});for(const e of o)e.bike_name=e.bike_name.replace(/-/g," ").toUpperCase();t.value.model=null,m.value="#",f.value=o,g.value="",w.value=[]}function L(){m.value=t.value.model.image,g.value=t.value.model.bike_name,w.value=t.value.model.tech}async function R(){const e=await(await fetch(`${d.serverURL}/api/downloadPDF`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t.value.model)})).blob(),a=window.URL.createObjectURL(e),n=document.createElement("a");n.style.display="none",n.href=a,n.download="tech-data.pdf",document.body.appendChild(n),n.click(),window.URL.revokeObjectURL(a)}return(o,e)=>(_(),I("section",J,[Y,l("section",Z,[l("section",z,[l("span",H,[k(h(M),{modelValue:t.value.brand,"onUpdate:modelValue":e[0]||(e[0]=a=>t.value.brand=a),options:p.value,onChange:U},null,8,["modelValue","options"]),K]),l("span",Q,[k(h(M),{modelValue:t.value.capacitate,"onUpdate:modelValue":e[1]||(e[1]=a=>t.value.capacitate=a),options:v.value,onChange:B},null,8,["modelValue","options"]),W]),l("span",X,[k(h(M),{modelValue:t.value.model,"onUpdate:modelValue":e[2]||(e[2]=a=>t.value.model=a),optionLabel:"bike_name",options:f.value,onChange:L},null,8,["modelValue","options"]),ee])]),l("section",ae,[l("img",{src:m.value,alt:""},null,8,te)])]),l("section",le,[t.value.model!==null?(_(),D(h(T),{key:0,class:"download-button",severity:"danger",label:"Descarca",icon:"pi pi-download",onClick:e[3]||(e[3]=a=>R())})):N("",!0),l("section",oe,[l("table",ne,[l("th",se,[l("h2",null,y(g.value),1)]),(_(!0),I(P,null,F(w.value,(a,n)=>(_(),I("tr",{key:n},[l("td",null,y(a.label.split("")[0].toUpperCase()+a.label.slice(1)),1),l("td",null,y(a.value),1)]))),128))])])])]))}},re=G(ce,[["__scopeId","data-v-0a18122c"]]);export{re as default};
