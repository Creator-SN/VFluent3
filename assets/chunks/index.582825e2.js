import{f as o,g as s,h as u}from"../app.0080e4aa.js";function c(){const t=o("light");let e;const n=()=>{document!==void 0&&document.documentElement.classList.contains("dark")?t.value="dark":t.value="light"};return s(()=>{n(),e=new MutationObserver(n),e.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]})}),u(()=>{e==null||e.disconnect()}),{theme:t}}export{c as u};
