import{_ as a,c as s,o as e,a4 as n}from"./chunks/framework.rIDq68an.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.09-Docker/docker软件安装/00-docker方式安装单机版es、kibana、ik分词、可视化.md","filePath":"01-Dev/01.09-Docker/docker软件安装/00-docker方式安装单机版es、kibana、ik分词、可视化.md"}'),t={name:"01-Dev/01.09-Docker/docker软件安装/00-docker方式安装单机版es、kibana、ik分词、可视化.md"},p=n(`<p><code>https://hub.docker.com/_/elasticsearch?tab=description</code><code>https://www.elastic.co/guide/en/elasticsearch/reference/7.17/docker.html</code> es、kibana、ik version: 7.17.7</p><h2 id="es" tabindex="-1">es <a class="header-anchor" href="#es" aria-label="Permalink to &quot;es&quot;">​</a></h2><hr><p>拉取镜像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker pull elasticsearch:7.17.7</span></span></code></pre></div><p>设置虚拟内存容量 elasticsearch error: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144] 切换到 root 用户，修改单个进程中的最大线程数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>vim /etc/sysctl.conf</span></span>
<span class="line"><span>vm.max_map_count=655368</span></span>
<span class="line"><span>sysctl -p</span></span>
<span class="line"><span>cat /proc/sys/vm/max_map_count</span></span></code></pre></div><p>创建挂载目录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo mkdir -p D:\\opt\\elasticsearch\\config</span></span>
<span class="line"><span>sudo mkdir -p D:\\opt\\elasticsearch\\data</span></span>
<span class="line"><span>sudo mkdir -p D:\\opt\\elasticsearch\\plugins</span></span>
<span class="line"><span>sudo mkdir -p D:\\opt\\elasticsearch\\logs</span></span></code></pre></div><p>赋予权限</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo chmod -R 777 /opt/elasticsearch/</span></span></code></pre></div><p>ES配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>echo http.host: 0.0.0.0 &gt;&gt; /opt/elasticsearch/config/elasticsearch.yml</span></span></code></pre></div><p>创建容器—运行ES</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo docker run --name elasticsearch </span></span>
<span class="line"><span>-p 9200:9200 -p 9300:9300</span></span>
<span class="line"><span>-e &quot;discovery.type=single-node&quot;  </span></span>
<span class="line"><span>-e ES_JAVA_OPTS=&quot;-Xms84m -Xmx512m&quot;  </span></span>
<span class="line"><span>-v D:\\opt\\elasticsearch\\config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml  -v D:\\opt\\elasticsearch\\data:/usr/share/elasticsearch/data  -v D:\\opt\\elasticsearch\\plugins:/usr/share/elasticsearch/plugins  -v D:\\opt\\elasticsearch\\logs:/usr/share/elasticsearch/logs  -d elasticsearch:7.17.7</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker run --name elasticsearch -p 9200:9200 -p 9300:9300 -e &quot;discovery.type=single-node&quot; -d elasticsearch:7.17.17</span></span>
<span class="line"><span></span></span>
<span class="line"><span>###</span></span></code></pre></div><p>浏览器访问 <code>http://localhost:9200</code></p><p>查看 es 健康状态 <code>http://localhost:9200/_cluster/health</code></p><h2 id="kibana" tabindex="-1">kibana <a class="header-anchor" href="#kibana" aria-label="Permalink to &quot;kibana&quot;">​</a></h2><hr><p>拉取镜像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker pull kibana:7.17.7</span></span></code></pre></div><p>创建容器—运行kibana</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run --name kibana -p 5601:5601 --link elasticsearch:es -e &quot;elasticsearch.hosts=http://es:9200&quot; -e &quot;environment.I18N_LOCALE=zh-CN&quot; -d kibana:7.17.7</span></span></code></pre></div><p>浏览器访问 <code>http://localhost:5601/app/dev_tools#/console</code></p><h2 id="ik分词器" tabindex="-1">ik分词器 <a class="header-anchor" href="#ik分词器" aria-label="Permalink to &quot;ik分词器&quot;">​</a></h2><hr><p><code>https://github.com/medcl/elasticsearch-analysis-ik/releases</code> wget <code>https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.7/elasticsearch-analysis-ik-7.17.7.zip</code> 解压到 es 的 plugins 目录 unzip elasticsearch-analysis-ik-7.17.7.zip -d ik mv ik /opt/elasticsearch/plugins 重启es，测试效果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker restart elasticsearch</span></span></code></pre></div><h2 id="可视化工具" tabindex="-1">可视化工具 <a class="header-anchor" href="#可视化工具" aria-label="Permalink to &quot;可视化工具&quot;">​</a></h2><hr><h3 id="elasticview" tabindex="-1">ElasticView <a class="header-anchor" href="#elasticview" aria-label="Permalink to &quot;ElasticView&quot;">​</a></h3><p>作者并未提供 arm 版本，其他人有提供 mod 的 arm 版本 <code>https://github.com/1340691923/ElasticView/issues/20</code><code>https://hub.docker.com/r/rayrliang/elastic_view/tags</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker pull rayrliang/elastic_view:latest</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo mkdir -p /data/elastic_view/data</span></span>
<span class="line"><span>sudo mkdir -p /data/elastic_view/logs</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run --name elastic_view -d \\</span></span>
<span class="line"><span> -p 8090:8090 \\</span></span>
<span class="line"><span> -v /data/elastic_view/data:/data \\</span></span>
<span class="line"><span> -v /data/elastic_view/logs:/logs \\</span></span>
<span class="line"><span>  rayrliang/elastic_view</span></span></code></pre></div><p>浏览器访问 <code>http://localhost:8090/</code> username/password: admin</p>`,36),i=[p];function c(l,o,d,r,h,u){return e(),s("div",null,i)}const v=a(t,[["render",c]]);export{k as __pageData,v as default};
