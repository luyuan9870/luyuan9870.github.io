import{_ as s,c as a,o as n,a4 as e}from"./chunks/framework.rIDq68an.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.09-Docker/docker软件安装/MinIo.md","filePath":"01-Dev/01.09-Docker/docker软件安装/MinIo.md"}'),p={name:"01-Dev/01.09-Docker/docker软件安装/MinIo.md"},i=e(`<ol><li>下载 minio 镜像</li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> minio:laster</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run \\</span></span>
<span class="line"><span>-p 9000:9000 \\</span></span>
<span class="line"><span>-p 9090:9090 \\</span></span>
<span class="line"><span>--name minio \\</span></span>
<span class="line"><span>-d --restart=always \\</span></span>
<span class="line"><span>-e &quot;MINIO_ACCESS_KEY=minio&quot; \\</span></span>
<span class="line"><span>-e &quot;MINIO_SECRET_KEY=minio&quot; \\</span></span>
<span class="line"><span>-v /home/docker/minio/data:/data \\</span></span>
<span class="line"><span>-v /home/docker/minio/config:/root/.minio \\</span></span>
<span class="line"><span>minio/minio server /data --console-address &quot;:9090&quot; -address &quot;:9000&quot;</span></span></code></pre></div><p>密码需要长一些</p><p>Docker pull xuxueli/xxl-job-admin: 2.4.0</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>9dvKzdnIK9ccMRRkuzQI</span></span>
<span class="line"><span>I1qKpI5CpJx8qcwV12pzlpEJxyV2tSNTXuf89OeX</span></span></code></pre></div>`,6),t=[i];function o(l,c,d,r,h,u){return n(),a("div",null,t)}const m=s(p,[["render",o]]);export{_ as __pageData,m as default};
