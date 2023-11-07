import{f as z}from"./index-95bbffde.js";import{d as O,r as P,n as N,a as j,t as w,o as q,b as n,c as r,e as p,w as s,f as t,g as v,h as a,i as h,j as b,k as $,l as _,u as l,F as y,m as G}from"./index-87c83c5e.js";import{_ as J}from"./InfoBox.vue_vue_type_style_index_0_lang-d5cf4800.js";const K=t("div",{class:"box-title"},[t("div",{class:"title-content"},[t("div",{class:"text"},"Recent Articles")]),t("div",{class:"gap"})],-1),Q=t("div",{class:"box-title"},[t("div",{class:"title-content"},[t("div",{class:"text"},"Blog Info")]),t("div",{class:"gap"})],-1),W=t("div",{class:"box-title"},[t("div",{class:"title-content"},[t("div",{class:"text"},"Featured Articles")]),t("div",{class:"gap"})],-1),X={class:"box-description"},Y={class:"tag-content"},Z={class:"title"},tt={class:"default description"},et={class:"bottom-line"},st=t("span",{class:"memo"},"by ",-1),at={class:"default"},ot=t("span",{class:"gary-gap"},null,-1),ct={class:"memo"},dt=O({__name:"Home",setup(nt){const k=P(""),A=N.findIndex(m=>m.title_en==="HOME");A>-1&&(k.value=N[A].bannerImgUrl);const i=j({count:{articles:0,tags:0,categories:0},categories:[],tags:[],featuredArticles:[],recentArticles:[]}),x=j({nickName:"",description:""}),{count:B,categories:H,tags:L,featuredArticles:C,recentArticles:D}=w(i),{nickName:F,description:R}=w(x),V=async()=>{var u;const m=await z(),{resultCode:I,data:e}=m;if(I===0){const c=(u=e==null?void 0:e.blogInfo)!=null&&u.length?e.blogInfo[0]:{};x.nickName=c==null?void 0:c.nickName,x.description=c==null?void 0:c.description,i.categories=e==null?void 0:e.categories,i.featuredArticles=e==null?void 0:e.featuredArticles,i.recentArticles=e==null?void 0:e.recentArticles,i.tags=e==null?void 0:e.tags,i.count=e==null?void 0:e.count}};return q(()=>{V()}),(m,I)=>{const e=n("a-card-meta"),u=n("a-card"),c=n("router-link"),d=n("a-col"),g=n("a-row"),E=n("a-tag"),M=n("a-avatar"),S=n("base-layout");return r(),p(S,{class:"home"},{default:s(()=>[t("div",{class:"home-top-bg",style:v({backgroundImage:`url(${k.value})`})},null,4),a(g,{justify:"center",class:"home-content"},{default:s(()=>[a(d,{xs:22,sm:20,md:17,lg:20,xl:19,xxl:16,class:"home-box"},{default:s(()=>[K,a(g,{class:"box-content",justify:"space-between",gutter:[{xs:8,sm:8,md:24,xl:24,xxl:24},20]},{default:s(()=>[(r(!0),h(y,null,b(l(D),(o,f)=>(r(),p(d,{key:"dd"+f,xs:24,sm:24,md:24,lg:8,xl:8,class:"card-box"},{default:s(()=>[a(c,{to:`/article?id=${o.id}`},{default:s(()=>[a(u,{class:"card-item"},{cover:s(()=>[t("div",{class:"cover-img",style:v({height:"200px",backgroundImage:`url(${o.cover})`})},null,4)]),default:s(()=>[a(e,{class:"box-bottom-title",title:o.title},{description:s(()=>[$(_(o.subTitle),1)]),_:2},1032,["title"])]),_:2},1024)]),_:2},1032,["to"])]),_:2},1024))),128))]),_:1})]),_:1}),a(d,{xs:24,sm:22,md:20,lg:20,xl:19,xxl:16},{default:s(()=>[a(g,{justify:"center",gutter:40},{default:s(()=>[a(d,{xs:22,sm:22,md:20,lg:10,xl:10,xxl:10,class:"home-box"},{default:s(()=>[Q,a(J,{"nick-name":l(F),description:l(R),categories:l(H),tags:l(L),count:l(B)},null,8,["nick-name","description","categories","tags","count"])]),_:1}),a(d,{xs:22,sm:22,md:20,lg:14,xl:14,xxl:14,class:"home-box"},{default:s(()=>[W,a(g,{justify:"space-around",class:"box-content",gutter:[0,40]},{default:s(()=>[(r(!0),h(y,null,b(l(C),(o,f)=>(r(),p(d,{key:"card"+f,span:24,class:"card-box"},{default:s(()=>[a(c,{to:`/article?id=${o.id}`},{default:s(()=>[a(u,{class:"card-item"},{cover:s(()=>[t("div",{class:"cover-img",style:v({height:"250px",backgroundImage:`url(${o.cover})`})},null,4)]),default:s(()=>[t("div",X,[t("div",Y,[(r(!0),h(y,null,b(o.tagList,(T,U)=>(r(),p(E,{key:"tag"+U,color:"cyan"},{default:s(()=>[$(_(T.name),1)]),_:2},1024))),128))]),t("h1",Z,_(o.title||""),1),t("p",tt,_(o.description),1),t("div",et,[a(M,{src:o.authorAvatar},null,8,["src"]),st,t("span",at,_(o.author),1),ot,t("span",ct,_(l(G)(o.createDate).format("LL")),1)])])]),_:2},1024)]),_:2},1032,["to"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}});export{dt as default};
