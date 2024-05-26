import{_ as a,c as s,o as n,a4 as e}from"./chunks/framework.rIDq68an.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.09-Docker/docker软件安装/Linux安装docker.md","filePath":"01-Dev/01.09-Docker/docker软件安装/Linux安装docker.md"}'),p={name:"01-Dev/01.09-Docker/docker软件安装/Linux安装docker.md"},l=e(`<p><a href="https://docs.docker.com/engine/install/centos/" target="_blank" rel="noreferrer">参考官方安装文档</a></p><h3 id="安装docker" tabindex="-1">安装Docker <a class="header-anchor" href="#安装docker" aria-label="Permalink to &quot;安装Docker&quot;">​</a></h3><h4 id="卸载原有的环境" tabindex="-1">卸载原有的环境： <a class="header-anchor" href="#卸载原有的环境" aria-label="Permalink to &quot;卸载原有的环境：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo yum remove docker \\</span></span>
<span class="line"><span>docker-client \\</span></span>
<span class="line"><span>docker-client-latest \\</span></span>
<span class="line"><span>docker-common \\</span></span>
<span class="line"><span>docker-latest \\</span></span>
<span class="line"><span>docker-latest-logrotate \\</span></span>
<span class="line"><span>docker-logrotate \\</span></span>
<span class="line"><span>docker-engine</span></span></code></pre></div><h4 id="安装对应的依赖环境和镜像地址" tabindex="-1">安装对应的依赖环境和镜像地址 <a class="header-anchor" href="#安装对应的依赖环境和镜像地址" aria-label="Permalink to &quot;安装对应的依赖环境和镜像地址&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo yum install -y yum-utils</span></span>
<span class="line"><span>sudo yum-config-manager \\</span></span>
<span class="line"><span>--add-repo \\</span></span>
<span class="line"><span>https://download.docker.com/linux/centos/docker-ce.repo</span></span></code></pre></div><h4 id="安装过慢设置镜像" tabindex="-1">安装过慢设置镜像 <a class="header-anchor" href="#安装过慢设置镜像" aria-label="Permalink to &quot;安装过慢设置镜像&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span></span></code></pre></div><h4 id="直接安装docker-ce" tabindex="-1">直接安装docker CE <a class="header-anchor" href="#直接安装docker-ce" aria-label="Permalink to &quot;直接安装docker CE&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo yum install -y docker-ce docker-ce-cli containerd.io</span></span></code></pre></div><h4 id="启动docker" tabindex="-1">启动docker <a class="header-anchor" href="#启动docker" aria-label="Permalink to &quot;启动docker&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo systemctl start docker</span></span></code></pre></div><h4 id="查看docker-版本" tabindex="-1">查看docker 版本 <a class="header-anchor" href="#查看docker-版本" aria-label="Permalink to &quot;查看docker 版本&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo docker version</span></span></code></pre></div><h4 id="配置阿里云的镜像地址" tabindex="-1">配置阿里云的镜像地址 <a class="header-anchor" href="#配置阿里云的镜像地址" aria-label="Permalink to &quot;配置阿里云的镜像地址&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span></span></code></pre></div><h4 id="更新yum" tabindex="-1">更新yum <a class="header-anchor" href="#更新yum" aria-label="Permalink to &quot;更新yum&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yum makecache fast</span></span></code></pre></div><h4 id="开机启动docker" tabindex="-1">开机启动docker <a class="header-anchor" href="#开机启动docker" aria-label="Permalink to &quot;开机启动docker&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo systemctl enable docker</span></span></code></pre></div><h3 id="安装mysql" tabindex="-1">安装Mysql <a class="header-anchor" href="#安装mysql" aria-label="Permalink to &quot;安装Mysql&quot;">​</a></h3><p>项目软件统一安装在 /mydata 目录下</p><p>docker拉取镜像命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker pull mysql:5.7</span></span></code></pre></div><p>docker安装MySQL命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run -d -p 3306:3306 --name mysql </span></span>
<span class="line"><span>-v /mydata/mysql/log:/var/log/mysql </span></span>
<span class="line"><span>-v /mydata/mysql/data:/var/lib/mysql </span></span>
<span class="line"><span>-v /mydata/mysql/conf:/var/etc/mysql </span></span>
<span class="line"><span>-v /mydata/mysql/-files:/var/lib/mysql-files </span></span>
<span class="line"><span>-e MYSQL_ROOT_PASSWORD=root -d mysql:5.7</span></span></code></pre></div><p>修改MySQL的配置文件 vim /mydata/mysql/conf/my.cnf</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[client]</span></span>
<span class="line"><span>default-character-set=utf8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mysql]</span></span>
<span class="line"><span>default-character-set=utf8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mysqld]</span></span>
<span class="line"><span>init_connect=&quot;SET collation_connection = utf8_unicode_ci&quot;</span></span>
<span class="line"><span>init_connect=&quot;SET NAMES utf8&quot;</span></span>
<span class="line"><span>character-set-server=utf8</span></span>
<span class="line"><span>collation-server=utf8_unicode_ci</span></span>
<span class="line"><span>skip-character-set-client-handshake</span></span>
<span class="line"><span>skip-name-resolve</span></span></code></pre></div><h3 id="安装redis" tabindex="-1">安装Redis <a class="header-anchor" href="#安装redis" aria-label="Permalink to &quot;安装Redis&quot;">​</a></h3><p>拉取Redis最新版本镜像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker pull redis</span></span></code></pre></div><p>先创建对应的Redis的映射配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>mkdir -p /mydata/redis/conf</span></span>
<span class="line"><span>touch /mydata/redis/conf/redis.conf</span></span></code></pre></div><p>创建容器命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run -d -p 6379:6379 --name mall-redis -v /mydata/redis/data:/data -v /mydata/redis/conf:/etc/redis  redis redis-server /etc/redis/redis.conf</span></span></code></pre></div><p>启动后测试连接：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[root@manager-node conf]# docker exec -it 4e redis-cli</span></span>
<span class="line"><span>127.0.0.1:6379&gt; keys *</span></span>
<span class="line"><span>(empty array)</span></span>
<span class="line"><span>127.0.0.1:6379&gt;</span></span></code></pre></div><h3 id="安装nacos" tabindex="-1">安装Nacos <a class="header-anchor" href="#安装nacos" aria-label="Permalink to &quot;安装Nacos&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker pull nacos\\</span></span>
<span class="line"><span>docker run -p 8848:8848  -p 9848:9848 -p 9849:9849 \\</span></span>
<span class="line"><span>-e MODE=standalone \\</span></span>
<span class="line"><span>--name nacos -v /app/docker/nacos/conf:/home/nacos/conf -d nacos/nacos-server:v2.1.1</span></span></code></pre></div><h3 id="安装nginx" tabindex="-1">安装Nginx <a class="header-anchor" href="#安装nginx" aria-label="Permalink to &quot;安装Nginx&quot;">​</a></h3><p>拉取Nginx最新版本镜像</p><p>docker pull nginx</p><p>先创建对应的nginx的文件夹</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>mkdir -p /app/docker/nginx/conf</span></span>
<span class="line"><span>mkdir -p /app/docker/nginx/log</span></span>
<span class="line"><span>mkdir -p /app/docker/nginx/html</span></span></code></pre></div><p>容器中的nginx.conf文件和conf.d文件夹复制到宿主机</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 生成容器</span></span>
<span class="line"><span>docker run --name nginx -p 80:80 -d nginx</span></span>
<span class="line"><span># 将容器nginx.conf文件复制到宿主机</span></span>
<span class="line"><span>docker cp nginx:/etc/nginx/nginx.conf /app/docker/nginx/conf/nginx.conf</span></span>
<span class="line"><span># 将容器conf.d文件夹下内容复制到宿主机</span></span>
<span class="line"><span>docker cp nginx:/etc/nginx/conf.d /app/docker/nginx/conf/conf.d</span></span>
<span class="line"><span># 将容器中的html文件夹复制到宿主机</span></span>
<span class="line"><span>docker cp nginx:/usr/share/nginx/html /app/docker/nginx/html</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 删除容器</span></span>
<span class="line"><span>docker stop nginx</span></span>
<span class="line"><span>docker rm nginx</span></span></code></pre></div><p>启动容器命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run \\</span></span>
<span class="line"><span>-p 80:80 -p 443:443 \\</span></span>
<span class="line"><span>--name nginx \\</span></span>
<span class="line"><span>-v /app/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \\</span></span>
<span class="line"><span>-v /app/docker/nginx/conf/conf.d:/etc/nginx/conf.d \\</span></span>
<span class="line"><span>-v /app/docker/nginx/log:/var/log/nginx \\</span></span>
<span class="line"><span>-v /app/docker/nginx/html:/usr/share/nginx/html \\</span></span>
<span class="line"><span>-d nginx:latest</span></span></code></pre></div><p>设置自启动</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker update --restart=always nginx</span></span></code></pre></div><h4 id="安装higress" tabindex="-1">安装higress <a class="header-anchor" href="#安装higress" aria-label="Permalink to &quot;安装higress&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>curl -fsSL https://higress.io/standalone/get-higress.sh | bash -s -- -c nacos://127.0.0.1/:8848 --nacos-username=nacos --nacos-password=DQtPvYhdgwoGI9Oa -p</span></span></code></pre></div><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h3><p>安装RocketMQ</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run -d --restart=always --name rockermq_server\\</span></span>
<span class="line"><span>--privileged=true -p 9876:9876 \\</span></span>
<span class="line"><span>-v /app/docker/rocketmq/nameserver/logs:/root/logs\\</span></span>
<span class="line"><span>-v /app/docker/rocketmq/nameserver/store:/root/store\\</span></span>
<span class="line"><span>-e &quot;MAX_POSSIBLE_HEAP=100000000&quot; rocketmqinc/rocketmq sh mqnamesrv</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker run -d \\</span></span>
<span class="line"><span>--restart=always \\</span></span>
<span class="line"><span>--name rmqnamesrv \\</span></span>
<span class="line"><span>-p 9876:9876 \\</span></span>
<span class="line"><span>-v /docker/rocketmq/data/namesrv/logs:/root/logs \\</span></span>
<span class="line"><span>-v /docker/rocketmq/data/namesrv/store:/root/store \\</span></span>
<span class="line"><span>-e &quot;MAX_POSSIBLE_HEAP=100000000&quot; \\</span></span>
<span class="line"><span>rocketmqinc/rocketmq \\</span></span>
<span class="line"><span>sh mqnamesrv </span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    docker run -d -p 9876:9876 --name rocketmq \\</span></span>
<span class="line"><span>    -v /app/docker/rocketmq/nameserver/logs:/root/logs \\</span></span>
<span class="line"><span>    -v /app/docker/rocketmq/nameserver/store:/root/store \\</span></span>
<span class="line"><span>    --restart=always --privileged=true -e MAX_POSSIBLE_HEAP=100000000 rocketmqinc/rocketmq sh rocketmq</span></span></code></pre></div><h3 id="安装consul" tabindex="-1">安装Consul <a class="header-anchor" href="#安装consul" aria-label="Permalink to &quot;安装Consul&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker pull consul</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker run --restart=always --name consul -p 8500:8500 \\</span></span>
<span class="line"><span>-v /opt/consul/conf/:/consul/conf/ \\</span></span>
<span class="line"><span>-v /opt/consul/data/:/consul/data/ \\</span></span>
<span class="line"><span>-d consul agent -server \\</span></span>
<span class="line"><span>-ui -node=10.0.190.125 -bind=0.0.0.0 \\</span></span>
<span class="line"><span>-client=0.0.0.0 \\</span></span>
<span class="line"><span>-data-dir /consul/data -config-dir /consul/conf -bootstrap-expect=1</span></span></code></pre></div><h3 id="设置容器自启动" tabindex="-1">设置容器自启动 <a class="header-anchor" href="#设置容器自启动" aria-label="Permalink to &quot;设置容器自启动&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[root@localhost ~]# docker update --restart=always mysql</span></span>
<span class="line"><span>mysql</span></span>
<span class="line"><span>[root@localhost ~]# docker update --restart=always mall-redis</span></span>
<span class="line"><span>mall-redis</span></span>
<span class="line"><span>docker update --restart=always nacos</span></span></code></pre></div>`,59),c=[l];function i(t,o,d,r,h,u){return n(),s("div",null,c)}const m=a(p,[["render",i]]);export{k as __pageData,m as default};
