import{W as y}from"./style-4361d689.js";import{R as m}from"./video-js-08b2bd83.js";import{r as s,O as x,o as w,d as c,e as l,j as e,i as g,w as k,k as _,x as S,t as v}from"./index-7130a7ff.js";import{g as H}from"./request-bc1eb332.js";async function M(i){return await H("/article/search",{keyword:i})}const B={class:"search-page"},R={key:0},b={key:1},q={class:"content"},C={class:"text",style:{height:"100px","padding-left":"20px"}},L={style:{"margin-top":"20px",color:"#999"}},z={__name:"searchPage",setup(i){const n=s([]),u=s(300),d=s(300),r=x(),h=s(!1),f=async()=>{console.log("route",r),console.log("route.content",r.query.content);const a=r.query.content,t=await M(a);console.log("res",t),t.searchHits.length!==0&&(n.value=t.searchHits,h.value=!0)};return w(()=>{f()}),(a,t)=>(c(),l("div",B,[h.value?(c(),l("div",b,[e("div",q,[g(_(y),{list:n.value,width:370,style:{}},{item:k(({item:o,url:N,index:p})=>[e("div",{class:"card",style:S([{height:p%2===0?`${u.value}px`:`${d.value}px`},{"background-color":"#dfecf9","border-radius":"14px"}])},[e("div",null,[g(_(m),{ref:"videoRef",src:o.urlList[0],width:370,height:(p%2===0?u.value:d.value)-100,poster:o.poster,controls:"",loop:!0,volume:.6,onMounted:a.handleMounted},null,8,["src","height","poster","onMounted"])]),e("div",C,[e("h3",null,v(o.title),1),e("p",L,v(o.content),1)])],4)]),_:1},8,["list"])])])):(c(),l("div",R," 暂时没有找到呢...."))]))}};export{z as default};
