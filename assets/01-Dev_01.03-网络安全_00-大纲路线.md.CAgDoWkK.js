import{_ as e,c as p,o as i,a4 as a}from"./chunks/framework.BG61BEI0.js";const t="/assets/image-20231016154748.DQEULFj6.png",o="/assets/image-20231016154836.CRd0VnKA.png",m=JSON.parse('{"title":"渗透学习路线","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.03-网络安全/00-大纲路线.md","filePath":"01-Dev/01.03-网络安全/00-大纲路线.md"}'),r={name:"01-Dev/01.03-网络安全/00-大纲路线.md"},n=a('<p><a href="https://pan.baidu.com/s/1tqPMEb6VimWUmth89leWtA" target="_blank" rel="noreferrer">某士兵的网络安全大师课</a> : <code>j9e2</code></p><p><img src="'+t+'" alt="image-20231016154748.png" loading="lazy"><br><img src="'+o+'" alt="" loading="lazy"></p><h1 id="渗透学习路线" tabindex="-1">渗透学习路线 <a class="header-anchor" href="#渗透学习路线" aria-label="Permalink to &quot;渗透学习路线&quot;">​</a></h1><p>① 我们用这段时间了解基本的概念：（SQL 注入、XSS、上传、CSRF、一句话木马、常见的后台等：可以通过 Google 搜索获取资料）为之后的 WEB 渗透测试打下基础。<br> ② 查看一些论坛的一些Web渗透资料，学一学案例的思路，每一个站点都不一样，所以思路是主要的。<br> ③ 学会提问的艺术，如果遇到不懂得要善于提问。<br></p><h2 id="配置渗透环境-时间-3周-4周" tabindex="-1"><strong>配置渗透环境 时间：3周 ~ 4周：</strong> <a class="header-anchor" href="#配置渗透环境-时间-3周-4周" aria-label="Permalink to &quot;**配置渗透环境 时间：3周 ~ 4周：**&quot;">​</a></h2><p>① 了解渗透测试常用的工具，例如（AWVS、SQLMAP、NMAP、APPSCAN、BURP、中国菜刀等）。 <br>② 下载这些工具无后门版本并且安装到计算机上，并做一个工具包，推荐Rolan。<br> ③ 了解这些工具的使用场景，懂得基本的使用，推荐在Secwiki或者Google上查找资料。<br></p><h2 id="渗透实战操作-时间-约6周" tabindex="-1"><strong>渗透实战操作 时间：约6周：</strong> <a class="header-anchor" href="#渗透实战操作-时间-约6周" aria-label="Permalink to &quot;**渗透实战操作 时间：约6周：**&quot;">​</a></h2><p>① 在网上搜索渗透实战案例，深入了解SQL注入、文件上传、解析漏洞等在实战中的使用。<br> ② 自己搭建漏洞环境测试，推荐DWVA，SQLi-labs，Upload-labs，bWAPP。<br> ③ 懂得渗透测试的阶段，每一个阶段需要做那些动作：例如PTES渗透测试执行标准。<br> ④ 深入研究手工SQL注入，寻找绕过waf的方法，制作自己的脚本。<br> ⑤ 研究文件上传的原理，如何进行截断、双重后缀欺骗(IIS、PHP)、解析漏洞利用（IIS、Nignix、Apache）等，参照：上传攻击框架。<br> ⑥ 了解XSS形成原理和种类，在DWVA中进行实践，使用一个含有XSS漏洞的cms，安装安全狗等进行测试。<br> ⑦ 了解一句话木马，并尝试编写过狗一句话。<br> ⑧ 研究在Windows和Linux下的提升权限，Google关键词：提权</p><h2 id="经常逛网络安全有关的网站-时间-∞" tabindex="-1"><strong>经常逛</strong><a href="https://cloud.tencent.com/product/ns?from=10680" target="_blank" rel="noreferrer">网络安全</a><strong>有关的网站 时间：∞</strong> <a class="header-anchor" href="#经常逛网络安全有关的网站-时间-∞" aria-label="Permalink to &quot;**经常逛**[网络安全](https://cloud.tencent.com/product/ns?from=10680)**有关的网站 时间：∞**&quot;">​</a></h2><p>① 例如：Freebuf、i春秋、安全客、看雪、91Ri.org、Sec-wiki、安全脉搏、Sec圈子社区、T00ls论坛等。<br> ② 遇到有意义的文章可以转载到自己博客</p><h2 id="熟悉windows-kali-linux-系统-时间-2周-4周" tabindex="-1"><strong>熟悉Windows &amp; Kali Linux 系统 时间：2周 ~ 4周</strong> <a class="header-anchor" href="#熟悉windows-kali-linux-系统-时间-2周-4周" aria-label="Permalink to &quot;**熟悉Windows &amp; Kali Linux 系统 时间：2周 ~ 4周**&quot;">​</a></h2><p>①了解Windows系统下的常用命令，如：ipconfig,nslookup,tracert,net,tasklist,taskkill等。<br> ② 熟悉Linux系统的常用命令，如：wget、mv、cd、rm、mkdir等。 <br>③ 熟悉Kali Linux系统下的常用工具，可以看看安全牛课堂上苑房弘老师的Kali课程[推荐1.5倍速播放]，可以参考SecWiki,《Web Penetration Testing with Kali Linux》、《Hacking with Kali》等。</p><h2 id="学习服务器的安全配置-时间-4周左右" tabindex="-1"><strong>学习服务器的安全配置 时间：4周左右</strong> <a class="header-anchor" href="#学习服务器的安全配置-时间-4周左右" aria-label="Permalink to &quot;**学习服务器的安全配置 时间：4周左右**&quot;">​</a></h2><p>① 了解03、08、12系统下iis的基本配置，了解Win下的目录权限（例如iis写权限），建立一个简单的站点。 <br>② 了解Linux的运行权限、跨目录、文件夹权限，学会配置Linux Web服务器，并建立一个简单的站点。<br> ③ 使用自动化工具扫描已经建立好的站点，并利用Google学会修补漏洞。 <br>④ 学会打补丁、iptables限制端口、添加规则等。 <br>⑤ 下载一款waf软件，熟悉它的使用。</p><h2 id="学习一些编程知识-时间-约8周" tabindex="-1"><strong>学习一些编程知识 时间：约8周</strong> <a class="header-anchor" href="#学习一些编程知识-时间-约8周" aria-label="Permalink to &quot;**学习一些编程知识 时间：约8周**&quot;">​</a></h2><p>① 在w3cschool上学习html、php、<a href="https://cloud.tencent.com/solution/database?from=10680" target="_blank" rel="noreferrer">数据库</a>的基础，建议每一种学到第8节就可以了。<br> ② 学习Python（也可以是其他语言，但是强烈建议使用python）。要求学习：爬虫（基础）、多线程、文件操作、正则表达式（基础）还有一些常用的第三方库，可能需要安装pip。 <br>③ 利用python写一个简单的poc或者exp。<br> ④ 开发一些渗透时会用到的程序，例如：端口扫描等。 <br>⑤ 选择一个php框架进行学习，不要太深入。</p><h2 id="学习代码审计-时间-4周-6周" tabindex="-1"><strong>学习代码审计 时间：4周 ~ 6周</strong> <a class="header-anchor" href="#学习代码审计-时间-4周-6周" aria-label="Permalink to &quot;**学习代码审计 时间：4周 ~ 6周**&quot;">​</a></h2><p>① 了解代码审计的静态和动态方法，懂得分析程序。 <br>② 在乌云镜像里找到开源的漏洞程序，跟着学习分析方法，尝试自己分析3~5次代码。<br> ③ 了解web漏洞形成的原因，熟悉常见漏洞函数。</p><h2 id="安全体系开发-时间-∞" tabindex="-1"><strong>安全体系开发 时间：∞</strong> <a class="header-anchor" href="#安全体系开发-时间-∞" aria-label="Permalink to &quot;**安全体系开发 时间：∞**&quot;">​</a></h2><p>① 开发一些安全工具，并将其开源，可以托管到码云或者github上，展示个人实力。<br> ② 建立自己的一套安全体系，拥有独立的思路方法。</p><p><strong>PTES执行标准</strong></p><p><a href="http://www.doc88.com/p-7784047461299.html" target="_blank" rel="noreferrer">http://www.doc88.com/p-7784047461299.html</a></p><p><strong>Web安全工程师</strong> Web安全相关概念 熟悉基本概念(SQL注入、上传、XSS、CSRF、一句话木马等)。</p><p>通过关键字(SQL注入、上传、XSS、CSRF、一句话木马等)进行Google/SecWiki;</p><p>阅读《精通脚本黑客》，虽然很旧也有错误，但是入门还是可以的;</p><p>看一些渗透笔记/视频，了解渗透实战的整个过程，可以Google(渗透笔记、渗透过程、入侵过程等);</p><p>3周熟悉渗透相关工具熟悉AWVS、sqlmap、Burp、nessus、chopper、nmap、Appscan等相关工具的使用。</p><p>了解该类工具的用途和使用场景，先用软件名字Google/SecWiki;</p><p>下载无后们版的这些软件进行安装;</p><p>学习并进行使用，具体教材可以在SecWiki上搜索，例如：Brup的教程、sqlmap;</p><p>待常用的这几个软件都学会了可以安装音速启动做一个渗透工具箱;</p><p>5周渗透实战操作掌握渗透的整个阶段并能够独立渗透小型站点。</p><p>网上找渗透视频看并思考其中的思路和原理，关键字(渗透、SQL注入视频、文件上传入侵、数据库备份、dedecms漏洞利用等等);</p><p>自己找站点/搭建测试环境进行测试，记住请隐藏好你自己;</p><p>思考渗透主要分为几个阶段，每个阶段需要做那些工作，例如这个：PTES渗透测试执行标准;</p><p>研究SQL注入的种类、注入原理、手动注入技巧;</p><p>研究文件上传的原理，如何进行截断、双重后缀欺骗(IIS、PHP)、解析漏洞利用(IIS、Nignix、Apache)等，参照：上传攻击框架;</p><p>研究XSS形成的原理和种类，具体学习方法可以Google/SecWiki，可以参考：XSS;</p><p>研究Windows/Linux提权的方法和具体使用，可以参考：提权;</p><p>可以参考: 开源渗透测试脆弱系统;</p><p>1周关注安全圈动态关注安全圈的最新漏洞、安全事件与技术文章。</p><p>通过SecWiki浏览每日的安全技术文章/事件;</p><p>通过Weibo/twitter关注安全圈的从业人员(遇到大牛的关注或者好友果断关注)，天天抽时间刷一下;</p><p>通过feedly/鲜果订阅国内外安全技术博客(不要仅限于国内，平时多注意积累)，没有订阅源的可以看一下SecWiki的聚合栏目;</p><p>养成习惯，每天主动提交安全技术文章链接到SecWiki进行积淀;</p><p>多关注下最新漏洞列表，推荐几个：exploit-db、CVE中文库、Wooyun等，遇到公开的漏洞都去实践下。</p><p>关注国内国际上的安全会议的议题或者录像，推荐SecWiki-Conference。</p><p>3周熟悉Windows/Kali Linux学习Windows/Kali Linux基本命令、常用工具;</p><p>熟悉Windows下的常用的cmd命令，例如：ipconfig,nslookup,tracert,net,tasklist,taskkill等;</p><p>熟悉Linux下的常用命令，例如：ifconfig,ls,cp,mv,vi,wget,service,sudo等;</p><p>熟悉Kali Linux系统下的常用工具，可以参考SecWiki,《Web Penetration Testing with Kali Linux》、《Hacking with Kali》等;</p><p>熟悉metasploit工具，可以参考SecWiki、《Metasploit渗透测试指南》。</p><p>3周服务器安全配置学习服务器环境配置，并能通过思考发现配置存在的安全问题。</p><p>Windows2003/2008环境下的IIS配置，特别注意配置安全和运行权限，可以参考：SecWiki-配置;</p><p>Linux环境下的LAMP的安全配置，主要考虑运行权限、跨目录、文件夹权限等，可以参考：SecWiki-配置;</p><p>远程系统加固，限制用户名和口令登陆，通过iptables限制端口;</p><p>配置软件Waf加强系统安全，在服务器配置mod_security等系统，参见SecWiki-ModSecurity;</p><p>通过Nessus软件对配置环境进行安全检测，发现未知安全威胁。</p><p>4周脚本编程学习选择脚本语言Perl/Python/PHP/Go/Java中的一种，对常用库进行编程学习。</p><p>搭建开发环境和选择IDE，PHP环境推荐Wamp和XAMPP，IDE强烈推荐Sublime，一些Sublime的技巧：SecWiki-Sublime;</p><p>Python编程学习，学习内容包含：语法、正则、文件、网络、多线程等常用库，推荐《Python核心编程》，不要看完;</p><p>用Python编写漏洞的exp，然后写一个简单的网络爬虫，可参见SecWiki-爬虫、视频;</p><p>PHP基本语法学习并书写一个简单的博客系统，参见《PHP与MySQL程序设计(第4版)》、视频;</p><p>熟悉MVC架构，并试着学习一个PHP框架或者Python框架(可选);</p><p>了解Bootstrap的布局或者CSS，可以参考：SecWiki-Bootstrap;</p><p>3周源码审计与漏洞分析能独立分析脚本源码程序并发现安全问题。</p><p>熟悉源码审计的动态和静态方法，并知道如何去分析程序，参见SecWiki-审计;</p><p>从Wooyun上寻找开源程序的漏洞进行分析并试着自己分析;</p><p>了解Web漏洞的形成原因，然后通过关键字进行查找分析，参见SecWiki-代码审计、高级PHP应用程序漏洞审核技术;</p><p>研究Web漏洞形成原理和如何从源码层面避免该类漏洞，并整理成checklist。</p><p>5周安全体系设计与开发能建立自己的安全体系，并能提出一些安全建议或者系统架构。</p><p>开发一些实用的安全小工具并开源，体现个人实力;</p><p>建立自己的安全体系，对公司安全有自己的一些认识和见解;</p><p>提出或者加入大型安全系统的架构或者开发;</p><p>看自己发展咯~</p>',75),s=[n];function l(c,h,d,b,S,u){return i(),p("div",null,s)}const P=e(r,[["render",l]]);export{m as __pageData,P as default};
