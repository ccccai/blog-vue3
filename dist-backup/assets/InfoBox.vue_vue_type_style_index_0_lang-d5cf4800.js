import{d as w,q as I,r as v,s as q,b as m,c as i,e as z,w as c,h as r,f as t,l as o,i as n,j as p,F as h,v as y,p as C,g as E}from"./index-87c83c5e.js";const R="/assets/avatar-845157b4.jpg",T="/assets/github-441aab0b.svg",j="/assets/mail-5e206b7a.svg",A="/assets/category-21bab09e.svg",D="/assets/tag-581de033.svg",F=t("div",{class:"avatar"},[t("img",{alt:"头像",title:"头像",src:R})],-1),G={class:"name"},M={class:"sub-title"},L={key:1},O={class:"detail-list"},H={class:"detail-item"},J=t("div",{class:"detail-item-top"},"ARTICLES",-1),K={class:"detail-item-bottom"},P={class:"detail-item"},Q=t("div",{class:"detail-item-top"},"TAGS",-1),U={class:"detail-item-bottom"},W={class:"detail-item"},X=t("div",{class:"detail-item-top"},"CATEGORIES",-1),Y={class:"detail-item-bottom"},Z=t("ul",{class:"third-party"},[t("li",{class:"third-party-item"},[t("a",{href:"https://github.com/ccccai",target:"_blank"},[t("img",{src:T,title:"Git"})])]),t("li",{class:"third-party-item"},[t("a",{href:"mailto:greenycaicai@163.com"},[t("img",{src:j,title:"Mail"})])])],-1),x=t("div",{class:"info-box-title"},[t("img",{src:A,title:"Category"}),t("span",null,"Categories")],-1),V={key:0,class:"category-list"},tt=["onClick"],st={class:"count"},et=t("div",{class:"info-box-title"},[t("img",{src:D,title:"Category"}),t("span",null,"Tags")],-1),it={key:0,class:"tags-list"},ot=["onClick"],ct=w({__name:"InfoBox",props:{nickName:{default:""},description:{default:""},tags:{default:()=>[]},categories:{default:()=>[]},count:{default:()=>({articles:0,tags:0,categories:0})}},emits:["updateData"],setup(at,{emit:N}){var b,k;const d=I(),f=v(Number((b=d.query)==null?void 0:b.category)),g=v(Number((k=d.query)==null?void 0:k.tag)),$=(s,a)=>{const u=a-s;return Math.ceil(Math.random()*u+s)};return q(()=>d.query,(s,a)=>{((s==null?void 0:s.tag)!==(a==null?void 0:a.tag)||(s==null?void 0:s.category)!==(a==null?void 0:a.category))&&(g.value=Number(s.tag),f.value=Number(s.category),N("updateData"))}),(s,a)=>{const u=m("router-link"),_=m("a-col"),S=m("a-row");return i(),z(S,{gutter:[0,20],class:"blog-info-content",justify:"space-around"},{default:c(()=>[r(_,{span:24,class:"blog-info-box persion-info"},{default:c(()=>[F,t("div",G,o(s.nickName),1),t("div",M,[s.description.split("/").length>1?(i(!0),n(h,{key:0},p(s.description.split("/")||[],(e,l)=>(i(),n("span",{key:"desc"+l},o(l===0?"":"/")+o(e),1))),128)):(i(),n("span",L,o(s.description),1))]),t("ul",O,[t("li",H,[r(u,{to:"/tech"},{default:c(()=>[J,t("div",K,o(s.count.articles||0),1)]),_:1})]),t("li",P,[r(u,{to:"/tech"},{default:c(()=>[Q,t("div",U,o(s.count.tags||0),1)]),_:1})]),t("li",W,[r(u,{to:"/tech"},{default:c(()=>[X,t("div",Y,o(s.count.categories||0),1)]),_:1})])]),Z]),_:1}),r(_,{span:24,class:"blog-info-box category-info"},{default:c(()=>[x,s.categories.length>0?(i(),n("ul",V,[(i(!0),n(h,null,p(s.categories,(e,l)=>(i(),n("li",{onClick:B=>s.$router.push(`/tech?category=${e==null?void 0:e.id}`),key:`category${l}`,class:y(["category-list-item",{"active-category-item":Number(f.value)===Number(e==null?void 0:e.id)}])},[t("span",null,o(e==null?void 0:e.name),1),t("span",st,o(e==null?void 0:e.count),1)],10,tt))),128))])):C("",!0)]),_:1}),r(_,{span:24,class:"blog-info-box tag-info"},{default:c(()=>[et,s.tags.length>0?(i(),n("ul",it,[(i(!0),n(h,null,p(s.tags,(e,l)=>(i(),n("li",{onClick:B=>s.$router.push(`/tech?tag=${e==null?void 0:e.id}`),key:`tags${l}`,class:y(["tags-list-item",{"active-tags-item":Number(g.value)===Number(e==null?void 0:e.id)}]),style:E({fontSize:$(12,20)})},[t("span",null,o(e==null?void 0:e.name),1)],14,ot))),128))])):C("",!0)]),_:1})]),_:1})}}});export{ct as _};