import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.rIDq68an.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.08-数据库/02-Mysql/Mysql特殊命令.md","filePath":"01-Dev/01.08-数据库/02-Mysql/Mysql特殊命令.md"}'),t={name:"01-Dev/01.08-数据库/02-Mysql/Mysql特殊命令.md"},l=n(`<p>查询当前库中, 所有的表里存在某个字段</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">information_schema 是MySQL系统自带的数据库，提供了对数据库元数据的访问  </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">information_schema</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tables</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 指数据库中的表（</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">information_schema</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">columns</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 指列）  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">table_schema 指数据库的名称  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">table_type 指是表的类型（base </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">table</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 指基本表，不包含系统表）  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">table_name 指具体的表名</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  TABLE_NAME </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  information_schema. COLUMNS  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WHERE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  COLUMN_NAME </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;avg_rate&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><hr><p>原文链接 <a href="https://www.cnblogs.com/lxwphp/p/11313613.html" target="_blank" rel="noreferrer">MySQL中 如何查询表名中包含某字段的表 - 码农编程进阶笔记 - 博客园</a></p>`,4),e=[l];function h(p,k,E,r,d,c){return a(),i("div",null,e)}const y=s(t,[["render",h]]);export{_ as __pageData,y as default};
