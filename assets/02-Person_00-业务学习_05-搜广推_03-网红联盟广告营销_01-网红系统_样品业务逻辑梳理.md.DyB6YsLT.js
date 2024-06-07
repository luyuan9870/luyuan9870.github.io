import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.BG61BEI0.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"02-Person/00-业务学习/05-搜广推/03-网红联盟广告营销/01-网红系统/样品业务逻辑梳理.md","filePath":"02-Person/00-业务学习/05-搜广推/03-网红联盟广告营销/01-网红系统/样品业务逻辑梳理.md"}'),p={name:"02-Person/00-业务学习/05-搜广推/03-网红联盟广告营销/01-网红系统/样品业务逻辑梳理.md"},l=n(`<p>网红管理（推销人信息管理） 网红商品池（SKU）信息维度</p><p>业务线下整理 Excel 导入到系统中.</p><p>网红申请 <code>某个 SKU</code> 推广的业务流程</p><ul><li>网红填写申请信息</li><li>后台运营审核</li><li>创建订单发货 SKU 样品, 回传信息给 OBS 做申请单信息更新.</li></ul><p>给网红发货</p><ul><li>关联 SKU、站点、活动时间</li></ul><p>合作推广佣金 -》 2-3%</p><p>创建订单-&gt; <code>kol_prototype_apply (网红样品申请单)</code> 信息记录调整</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`kol_prototype_apply (网红样品申请单)\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 核心字段</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 来源 : 网红</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 导入</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> SKU</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 网红 ID</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 开始</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">结束时间</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 发货单号</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 状态 (订单状态、审核状态)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 短链链接（推广链接）</span></span></code></pre></div><hr>`,10),t=[l];function e(h,k,r,d,E,o){return a(),i("div",null,t)}const g=s(p,[["render",e]]);export{_ as __pageData,g as default};
