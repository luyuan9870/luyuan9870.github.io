import{_ as l,c as i,o as t,a4 as p}from"./chunks/framework.BG61BEI0.js";const u=JSON.parse('{"title":"网络安全简介","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.03-网络安全/01-网络安全简介.md","filePath":"01-Dev/01.03-网络安全/01-网络安全简介.md","lastUpdated":1713951527000}'),o={name:"01-Dev/01.03-网络安全/01-网络安全简介.md"},r=p('<h1 id="网络安全简介" tabindex="-1">网络安全简介 <a class="header-anchor" href="#网络安全简介" aria-label="Permalink to &quot;网络安全简介&quot;">​</a></h1><h2 id="web安全相关的基本概念" tabindex="-1">Web安全相关的基本概念 <a class="header-anchor" href="#web安全相关的基本概念" aria-label="Permalink to &quot;Web安全相关的基本概念&quot;">​</a></h2><h2 id="行业术语介绍" tabindex="-1">行业术语介绍 <a class="header-anchor" href="#行业术语介绍" aria-label="Permalink to &quot;行业术语介绍&quot;">​</a></h2><ul><li><p><strong>IP地址:</strong></p></li><li><p>指 互联网协议地址,又为网际协议地址.</p></li><li><p>IP地址是IP协议提供的统一的地址格式,它为互联网上的每一个网络和每一台主机分配一个逻辑地址,以此来屏蔽物理地址(Mac地址)的差异</p></li><li><p><strong>渗透测试中一般出现在服务器,PC,路由交换等设备中,可以吧IP地址理解为我们生活中的家庭住址, 即每一个IP地址都是不一样的.</strong></p></li><li><p>可以访问 ip3322.org 地址进行查看自己的外网IP</p></li><li><p><strong>VPS:</strong></p></li><li><p>虚拟专用服务器技术,将一台服务器分割成多个逻辑专享服务器的优质服务.</p></li><li><p>我们一般人通常说的VPS就是一台人家虚拟出来的服务器,这台服务器有外网IP,我们可以装好系统并直接链接</p></li><li><p>类似于现在大厂的云服务器的概念.</p></li><li><p><strong>端口(Port):</strong></p></li><li><p>一台服务器 通常会有很多个服务, 那么 IP地址是唯一的, 我们需要 找到这台服务器的某一个服务, 就需要通过IP+端口的方式, 去定位服务</p></li><li><p><strong>一句话木马:</strong></p></li><li><p>通常是指那些代码长度很短的脚本木马,一般只有一行,跟平常的一句话差不多, 所以俗称一句话木马</p></li><li><p>例如: asp其中的一种一句话木马 &quot; <strong>&lt;%execute(request(&quot;value&quot;))%&gt;</strong> &quot;</p></li><li><p><strong>大马:</strong></p></li><li><p>指那些功能很多的脚本木马,一般包括但不限于文件管理,CMD执行,可读写目录查找,例如redhat的大马还有提权难易度检测功能</p></li><li><p><strong>WebShell:</strong></p></li><li><p>指的是已经在某个Web植入了木马,且该木马能被解析成脚本文件,并能访问到,<strong>能够通过这个文件控制整个Web</strong></p></li><li><p><strong>提权:</strong></p></li><li><p>指权利提升,顾名思义 就是把我们自己的权限提高 拥有更高的权限才能操作更多的事情, 提权都需要利用到漏洞</p></li><li><p><strong>POC</strong></p></li><li><p>概念验证, 它可以是一段代码也可以是一个程序,用来验证某个漏洞是存在的,没有破坏能力</p></li><li><p><strong>EXP</strong></p></li><li><p>指的是 漏洞利用程序,这种程序可以是任何语言编写的, 具有破坏能力的</p></li><li><p><strong>payload</strong></p></li><li><p>有效载荷,当exp利用成功后,将执行payload</p></li><li><p><strong>ShellCode</strong></p></li><li><p>漏洞利用的过程,就是把ShellCode发送到目标服务器,其中ShellCode包含PayLoad,如何SHellCode被执行成功,那么才会执行有效荷载payload,这个荷载可以是一段OS命令,可以是一段二进制代码</p></li><li><p><strong>CMS</strong></p></li><li><p>内容管理系统,简单来说就是一种网站系统的模板,很多网站都使用的统一模板</p></li><li><p><strong>反序列化</strong></p></li><li><p>指将字节列转换成目标对象的过程</p></li><li><p>一般应用于Java的反序列化漏洞, 导致命令执行.</p></li><li><p><strong>Fuzz</strong></p></li><li><p>一种安全测试的方法,他介于完全的手工测试和完全的自动测试之间.</p></li><li><p><strong>SRC (应急响应中心):</strong></p></li><li><p>关于国内的一些大厂, 会开放一个 SRC 供给民间的 白帽子 提供一个 漏洞提交平台, 并给予一些奖励(大多数是一些现金)</p></li><li><p><strong>Waf</strong></p></li><li><p>Web应用的防护系统,一般指的是防火墙</p></li></ul><h2 id="常见漏洞" tabindex="-1">常见漏洞 <a class="header-anchor" href="#常见漏洞" aria-label="Permalink to &quot;常见漏洞&quot;">​</a></h2><ul><li><p><strong>Sql注入</strong></p></li><li><p><strong>将恶意的sql查询或者添加语句 插入到应用的输入参数中,在后台sql服务器上执行攻击,它是目前黑客对Sql服务器最为常用的攻击手段之一</strong></p></li><li><p><strong>将用户输入的数据, 当做了Sql脚本进行执行</strong></p></li><li><p><strong>数字型 注入</strong></p></li><li><p><strong>select * from user where id = 1 or 1=1 这里的 &quot;or 1=1&quot; 就属于数字注入</strong></p></li><li><p><strong>注释注入</strong></p></li><li><p><strong>&#39; 闭合</strong></p></li><li><p><strong>--+ 注释</strong></p></li><li><p><strong>文件上传</strong></p></li><li><p><strong>常用于 PHP,ASP 等框架</strong></p></li><li><p><strong>XSS</strong></p></li><li><p><strong>同SQL注入, 只是一个是HTML/JS脚本, 一个是SQL脚本</strong></p></li><li><p><strong>跨域请求伪造</strong></p></li><li><p><strong>一句话木马</strong></p></li><li><p><strong>代码逻辑注入</strong></p></li><li><p><strong>XML</strong></p></li><li><p><strong>XPATH</strong></p></li><li><p><strong>JSON</strong></p></li><li><p><strong>CSRF</strong></p></li></ul><h3 id="入门书籍推荐" tabindex="-1">入门书籍推荐 <a class="header-anchor" href="#入门书籍推荐" aria-label="Permalink to &quot;入门书籍推荐&quot;">​</a></h3><ul><li><p>Web安全深度剖析</p></li><li><p>Web攻防之业务安全实战指南</p></li><li><p>主要针对于业务点的一些漏洞讲解</p></li><li><p>黑客秘籍渗透测试指南V3</p></li></ul><h2 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-label="Permalink to &quot;参考链接&quot;">​</a></h2><hr>',10),s=[r];function n(e,a,g,d,h,_){return t(),i("div",null,s)}const P=l(o,[["render",n]]);export{u as __pageData,P as default};
