import{a0 as n,r as t}from"./index-b1c04331.js";const u=n("user-store",()=>{const o=t(""),s=t({});return{token:o,userInfo:s,setToken:e=>{o.value=e,console.log("userToken",e),localStorage.setItem("token",e)},delToken:()=>{o.value="",localStorage.removeItem("token")},setUserInfo:e=>{console.log("info",e),s.value=e,console.log("setOK")},delUserInfo:()=>{s.value=""}}});export{u};