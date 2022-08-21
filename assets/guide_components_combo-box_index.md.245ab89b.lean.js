import{u as d}from"./chunks/index.332ca296.js";import{d as i,f as c,c as y,b as o,u as p,a as s,r as x,o as g}from"./app.4a81f96f.js";const b=s('<h1 id="combobox" tabindex="-1">ComboBox <a class="header-anchor" href="#combobox" aria-hidden="true">#</a></h1><h2 id="quick-start" tabindex="-1">Quick Start <a class="header-anchor" href="#quick-start" aria-hidden="true">#</a></h2><h3 id="default" tabindex="-1">Default <a class="header-anchor" href="#default" aria-hidden="true">#</a></h3><hr>',4),D=s(`<div class="language-vue-html"><span class="copy"></span><div class="highlight-lines"><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br></div><pre><code><span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">fv-combo-box</span><span style="color:#89DDFF;"> </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        :</span><span style="color:#C792EA;">options</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span></span>
<span class="line"><span style="color:#89DDFF;">        :</span><span style="color:#C792EA;">theme</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">theme</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">placeholder</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Input your company</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">autofocus</span></span>
<span class="line"><span style="color:#89DDFF;">    &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">fv-combo-box</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="editable" tabindex="-1">Editable <a class="header-anchor" href="#editable" aria-hidden="true">#</a></h3><hr>`,3),u=s(`<div class="language-vue-html"><span class="copy"></span><div class="highlight-lines"><br><div class="highlighted">\xA0</div><br><div class="highlighted">\xA0</div><br><br><br><br><br></div><pre><code><span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">fv-combo-box</span><span style="color:#89DDFF;"> </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">width:100%;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span></span>
<span class="line"><span style="color:#89DDFF;">        :</span><span style="color:#C792EA;">options</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">editable</span><span style="color:#89DDFF;"> </span></span>
<span class="line"><span style="color:#89DDFF;">        :</span><span style="color:#C792EA;">theme</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">theme</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">placeholder</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Input your company</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">fv-combo-box</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="disabled" tabindex="-1">Disabled <a class="header-anchor" href="#disabled" aria-hidden="true">#</a></h3><hr>`,3),h=s(`<div class="language-vue-html"><span class="copy"></span><div class="highlight-lines"><br><div class="highlighted">\xA0</div><br><br><br><br><br><br></div><pre><code><span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">fv-combo-box</span><span style="color:#89DDFF;"> </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">disabled</span></span>
<span class="line"><span style="color:#89DDFF;">        :</span><span style="color:#C792EA;">options</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span></span>
<span class="line"><span style="color:#89DDFF;">        :</span><span style="color:#C792EA;">theme</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">theme</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">placeholder</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Input your company</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">fv-combo-box</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-hidden="true">#</a></h2><hr><table><thead><tr><th style="text-align:center;">Property</th><th style="text-align:center;">Type</th><th style="text-align:center;">Required</th><th style="text-align:center;">Default</th><th style="text-align:center;">Statement</th></tr></thead><tbody><tr><td style="text-align:center;">autofocus</td><td style="text-align:center;">[boolean]</td><td style="text-align:center;">No</td><td style="text-align:center;">false</td><td style="text-align:center;">same as <a href="./../text-box/#properties">fv-text-box</a></td></tr><tr><td style="text-align:center;">disabled</td><td style="text-align:center;">[boolean]</td><td style="text-align:center;">No</td><td style="text-align:center;">false</td><td style="text-align:center;">same as <a href="./../text-box/#properties">fv-text-box</a></td></tr><tr><td style="text-align:center;">editable</td><td style="text-align:center;">[boolean]</td><td style="text-align:center;">No</td><td style="text-align:center;">false</td><td style="text-align:center;">editable</td></tr><tr><td style="text-align:center;">error-border-color</td><td style="text-align:center;">[string]</td><td style="text-align:center;">No</td><td style="text-align:center;">undefined</td><td style="text-align:center;">same as <a href="./../text-box/#properties">fv-text-box</a></td></tr><tr><td style="text-align:center;">font-size</td><td style="text-align:center;">[number]</td><td style="text-align:center;">No</td><td style="text-align:center;">14</td><td style="text-align:center;">same as <a href="./../text-box/#properties">fv-text-box</a></td></tr><tr><td style="text-align:center;">hover-border-color</td><td style="text-align:center;">[string]</td><td style="text-align:center;">No</td><td style="text-align:center;">undefined</td><td style="text-align:center;">same as <a href="./../text-box/#properties">fv-text-box</a></td></tr><tr><td style="text-align:center;">input-rules</td><td style="text-align:center;">[object,string,function]</td><td style="text-align:center;">No</td><td style="text-align:center;">undefined</td><td style="text-align:center;">same as <a href="./../text-box/#properties">fv-text-box</a></td></tr><tr><td style="text-align:center;">lang</td><td style="text-align:center;">[string]</td><td style="text-align:center;">No</td><td style="text-align:center;">&#39;global&#39;</td><td style="text-align:center;">i18n</td></tr><tr><td style="text-align:center;">maxlength</td><td style="text-align:center;">[number]</td><td style="text-align:center;">No</td><td style="text-align:center;">undefined</td><td style="text-align:center;">same as <a href="./../text-box/#properties">fv-text-box</a></td></tr><tr><td style="text-align:center;">minlength</td><td style="text-align:center;">[number]</td><td style="text-align:center;">No</td><td style="text-align:center;">undefined</td><td style="text-align:center;">same as <a href="./../text-box/#properties">fv-text-box</a></td></tr><tr><td style="text-align:center;">model-value</td><td style="text-align:center;">[string]</td><td style="text-align:center;">No</td><td style="text-align:center;">undefined</td><td style="text-align:center;">v-model</td></tr><tr><td style="text-align:center;">options</td><td style="text-align:center;">[array]</td><td style="text-align:center;">No</td><td style="text-align:center;">() =&gt; []</td><td style="text-align:center;">select options</td></tr><tr><td style="text-align:center;">pattern</td><td style="text-align:center;">[object,string,function]</td><td style="text-align:center;">No</td><td style="text-align:center;">undefined</td><td style="text-align:center;">same as <a href="./../text-box/#properties">fv-text-box</a></td></tr><tr><td style="text-align:center;">placeholder</td><td style="text-align:center;">[string]</td><td style="text-align:center;">No</td><td style="text-align:center;">undefined</td><td style="text-align:center;">same as <a href="./../text-box/#properties">fv-text-box</a></td></tr><tr><td style="text-align:center;">required</td><td style="text-align:center;">[boolean]</td><td style="text-align:center;">No</td><td style="text-align:center;">false</td><td style="text-align:center;">same as <a href="./../text-box/#properties">fv-text-box</a></td></tr><tr><td style="text-align:center;">theme</td><td style="text-align:center;">[&#39;light&#39;,&#39;dark&#39;,&#39;global&#39;]</td><td style="text-align:center;">No</td><td style="text-align:center;">&#39;global&#39;</td><td style="text-align:center;">theme</td></tr><tr><td style="text-align:center;">title</td><td style="text-align:center;">[string]</td><td style="text-align:center;">No</td><td style="text-align:center;">&#39;input&#39;</td><td style="text-align:center;">same as <a href="./../text-box/#properties">fv-text-box</a></td></tr><tr><td style="text-align:center;">warning-border-color</td><td style="text-align:center;">[string]</td><td style="text-align:center;">No</td><td style="text-align:center;">undefined</td><td style="text-align:center;">same as <a href="./../text-box/#properties">fv-text-box</a></td></tr></tbody></table><h2 id="emits" tabindex="-1">Emits <a class="header-anchor" href="#emits" aria-hidden="true">#</a></h2><hr><table><thead><tr><th style="text-align:center;">EmitName</th><th style="text-align:center;">Arguments</th><th style="text-align:center;">Statement</th></tr></thead><tbody><tr><td style="text-align:center;">blur</td><td style="text-align:center;">evt[FocusEvent]</td><td style="text-align:center;">onblur</td></tr><tr><td style="text-align:center;">change</td><td style="text-align:center;">val[String]</td><td style="text-align:center;">onchange</td></tr><tr><td style="text-align:center;">error-input</td><td style="text-align:center;">val[String]</td><td style="text-align:center;">onerrorinput</td></tr><tr><td style="text-align:center;">focus</td><td style="text-align:center;">evt[FocusEvent]</td><td style="text-align:center;">onfocus</td></tr><tr><td style="text-align:center;">input</td><td style="text-align:center;">val[String]</td><td style="text-align:center;">oninput</td></tr><tr><td style="text-align:center;">keydown</td><td style="text-align:center;">val[String]</td><td style="text-align:center;">onkeydown</td></tr><tr><td style="text-align:center;">keypress</td><td style="text-align:center;">val[String]</td><td style="text-align:center;">onkeypress</td></tr><tr><td style="text-align:center;">keyup</td><td style="text-align:center;">val[String]</td><td style="text-align:center;">onkeyup</td></tr><tr><td style="text-align:center;">update:model-value</td><td style="text-align:center;">val[String]</td><td style="text-align:center;">v-model</td></tr><tr><td style="text-align:center;">warning-input</td><td style="text-align:center;">val[String]</td><td style="text-align:center;">onwarninginput</td></tr></tbody></table>`,7),C=JSON.parse('{"title":"ComboBox","description":"","frontmatter":{"page":true,"title":"ComboBox"},"headers":[{"level":2,"title":"Quick Start","slug":"quick-start"},{"level":3,"title":"Default","slug":"default"},{"level":3,"title":"Editable","slug":"editable"},{"level":3,"title":"Disabled","slug":"disabled"},{"level":2,"title":"Properties","slug":"properties"},{"level":2,"title":"Emits","slug":"emits"}],"relativePath":"guide/components/combo-box/index.md"}'),F={name:"guide/components/combo-box/index.md"},q=i({...F,setup(m){const{theme:n}=d(),t=c(),l=[{key:"Microsoft"},{key:"Apple"},{key:"Google"},{key:"Facebook"},{key:"Github"}];return(v,e)=>{const a=x("fv-combo-box");return g(),y("div",null,[b,o(a,{modelValue:t.value,"onUpdate:modelValue":e[0]||(e[0]=r=>t.value=r),options:l,theme:p(n),placeholder:"Input your company",autofocus:""},null,8,["modelValue","theme"]),D,o(a,{style:{width:"100%"},options:l,editable:"",theme:p(n),placeholder:"Input your company"},null,8,["theme"]),u,o(a,{modelValue:t.value,"onUpdate:modelValue":e[1]||(e[1]=r=>t.value=r),options:l,disabled:"",theme:p(n),placeholder:"Input your company"},null,8,["modelValue","theme"]),h])}}});export{C as __pageData,q as default};
