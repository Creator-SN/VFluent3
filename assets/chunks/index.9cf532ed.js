import{f as o,g as i,h as u,j as c}from"../app.1469a136.js";function r(){const e=o("light");let t;const n=()=>{document!==void 0&&document.documentElement.classList.contains("dark")?e.value="dark":e.value="light"};return i(()=>{n(),t=new MutationObserver(n),t.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]})}),u(()=>{t==null||t.disconnect()}),{theme:e}}function l(e,t,n="correct"){c(t)||(t=JSON.stringify(t,null,2)),e!==void 0&&e({status:n,message:t})}export{l as T,r as u};