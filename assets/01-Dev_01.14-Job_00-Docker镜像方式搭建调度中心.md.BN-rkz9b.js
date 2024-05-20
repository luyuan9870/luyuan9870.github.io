import{_ as a,c as s,o as n,a4 as e}from"./chunks/framework.BG61BEI0.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.14-Job/00-Docker镜像方式搭建调度中心.md","filePath":"01-Dev/01.14-Job/00-Docker镜像方式搭建调度中心.md","lastUpdated":1712823825000}'),p={name:"01-Dev/01.14-Job/00-Docker镜像方式搭建调度中心.md"},l=e(`<p>分布式任务调度平台XXL-JOB 官网: <code>https://www.xuxueli.com/xxl-job/#2.3%20%E9%85%8D%E7%BD%AE%E9%83%A8%E7%BD%B2%E2%80%9C%E8%B0%83%E5%BA%A6%E4%B8%AD%E5%BF%83%E2%80%9D</code></p><h2 id="拉取镜像" tabindex="-1">拉取镜像 <a class="header-anchor" href="#拉取镜像" aria-label="Permalink to &quot;拉取镜像&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker pull xuxueli/xxl-job-admin:2.4.0</span></span></code></pre></div><p>创建容器运行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1. \`docker run -p 8080:8080 -v /tmp:/data/applogs --name xxl-job-admin -d xuxueli/xxl-job-admin:{指定版本}\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. \`/**\`</span></span>
<span class="line"><span>4. \`* 如需自定义 mysql 等配置，可通过 &quot;-e PARAMS&quot; 指定，参数格式 PARAMS=&quot;--key=value --key2=value2&quot; ；\`</span></span>
<span class="line"><span>5. \`* 配置项参考文件：/xxl-job/xxl-job-admin/src/main/resources/application.properties\`</span></span>
<span class="line"><span>6. \`* 如需自定义 JVM内存参数 等配置，可通过 &quot;-e JAVA_OPTS&quot; 指定，参数格式 JAVA_OPTS=&quot;-Xmx512m&quot; ；\`</span></span>
<span class="line"><span>7. \`*/\`</span></span>
<span class="line"><span>docker run -p 8080:8080 -v /tmp:/data/applogs --name xxl-job-admin -e PARAMS=&quot;--spring.datasource.url=jdbc:mysql://127.0.0.1:3306/xxl_job?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;serverTimezone=Asia/Shanghai --spring.datasource.username=root --spring.datasource.password=WangShuai0815@123&quot;  -d xuxueli/xxl-job-admin:2.4.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo docker run --name xxl-job-admin -p 8080:8080 \\</span></span>
<span class="line"><span> -e &quot;PARAMS=single-node&quot; \\</span></span>
<span class="line"><span> -e ES_JAVA_OPTS=&quot;-Xms84m -Xmx512m&quot; \\</span></span>
<span class="line"><span> -v /opt/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \\</span></span>
<span class="line"><span> -v /opt/elasticsearch/data:/usr/share/elasticsearch/data \\</span></span>
<span class="line"><span> -v /opt/elasticsearch/plugins:/usr/share/elasticsearch/plugins \\</span></span>
<span class="line"><span> -v /opt/elasticsearch/logs:/usr/share/elasticsearch/logs \\</span></span>
<span class="line"><span> -d elasticsearch:7.17.7</span></span></code></pre></div>`,5),t=[l];function o(c,i,r,d,u,h){return n(),s("div",null,t)}const x=a(p,[["render",o]]);export{_ as __pageData,x as default};
