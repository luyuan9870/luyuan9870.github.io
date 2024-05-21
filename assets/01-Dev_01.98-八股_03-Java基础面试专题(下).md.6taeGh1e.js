import{_ as e,c as a,o as t,a4 as l}from"./chunks/framework.BG61BEI0.js";const u=JSON.parse('{"title":"Java基础面试专题(下)","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.98-八股/03-Java基础面试专题(下).md","filePath":"01-Dev/01.98-八股/03-Java基础面试专题(下).md"}'),i={name:"01-Dev/01.98-八股/03-Java基础面试专题(下).md"},o=l('<h1 id="java基础面试专题-下" tabindex="-1">Java基础面试专题(下) <a class="header-anchor" href="#java基础面试专题-下" aria-label="Permalink to &quot;Java基础面试专题(下)&quot;">​</a></h1><blockquote></blockquote><h1 id="一、javaweb专题" tabindex="-1">一、JavaWeb专题 <a class="header-anchor" href="#一、javaweb专题" aria-label="Permalink to &quot;一、JavaWeb专题&quot;">​</a></h1><p><a href="https://www.processon.com/view/link/64d60b050d8be346fe5b2d91" target="_blank" rel="noreferrer">https://www.processon.com/view/link/64d60b050d8be346fe5b2d91</a></p><p><a href="https://www.processon.com/view/link/64d60ce5b3725348876db9ff" target="_blank" rel="noreferrer">https://www.processon.com/view/link/64d60ce5b3725348876db9ff</a></p><p><a href="https://cloud.fynote.com/share/d/Jd19MK1A" target="_blank" rel="noreferrer">https://cloud.fynote.com/share/d/Jd19MK1A</a></p><p><a href="https://www.processon.com/view/link/64d636f249804d28e9be500d" target="_blank" rel="noreferrer">https://www.processon.com/view/link/64d636f249804d28e9be500d</a></p><h2 id="_1-http响应码有哪些" tabindex="-1">1.HTTP响应码有哪些 <a class="header-anchor" href="#_1-http响应码有哪些" aria-label="Permalink to &quot;1.HTTP响应码有哪些&quot;">​</a></h2><p>1、1xx（临时响应） 2、2xx（成功） 3、3xx（重定向）：表示要完成请求需要进一步操作 4、4xx（错误）：表示请求可能出错，妨碍了服务器的处理 5、5xx（服务器错误）：表示服务器在尝试处理请求时发生内部错误</p><p>举例：</p><p>200：成功，Web服务器成功处理了客户端的请求。 301：永久重定向，当客户端请求一个网址的时候，Web服务器会将当前请求重定向到另一个网址，搜索引擎会抓取重定向后网页的内容并且将旧的网址替换为重定向后的网址。 302：临时重定向，搜索引擎会抓取重定向后网页的内容而保留旧的网址，因为搜索引擎认为重定向后的网址是暂时的。 400：客户端请求错误，多为参数不合法导致Web服务器验参失败。 404：未找到，Web服务器找不到资源。 500：Web服务器错误，服务器处理客户端请求的时候发生错误。 503：服务不可用，服务器停机。 504：网关超时</p><h2 id="_2-forward和redirect的区别" tabindex="-1">2.Forward和Redirect的区别？ <a class="header-anchor" href="#_2-forward和redirect的区别" aria-label="Permalink to &quot;2.Forward和Redirect的区别？&quot;">​</a></h2><ol><li>浏览器URL地址：Forward是服务器内部的重定向，服务器内部请求某个servlet，然后获取响应的内容，浏览器的URL地址是不会变化的；Redirect是客户端请求服务器，然后服务器给客户端返回了一个302状态码和新的location，客户端重新发起HTTP请求，服务器给客户端响应location对应的URL地址，浏览器的URL地址发生了变化。</li><li>数据的共享：Forward是服务器内部的重定向，request在整个重定向过程中是不变的，request中的信息在servlet间是共享的。Redirect发起了两次HTTP请求分别使用不同的request。</li><li>请求的次数：Forward只有一次请求；Redirect有两次请求。</li></ol><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1675489425009/fba756c1b94e439ab2dec986650a7117.png" alt="image.png" loading="lazy"></p><h2 id="_3-get和post请求的区别" tabindex="-1">3.Get和Post请求的区别 <a class="header-anchor" href="#_3-get和post请求的区别" aria-label="Permalink to &quot;3.Get和Post请求的区别&quot;">​</a></h2><p>用途：</p><ul><li>get请求用来从服务器获取资源</li><li>post请求用来向服务器提交数据</li></ul><p>表单的提交方式：</p><ul><li>get请求直接将表单数据以name1=value1&amp;name2=value2的形式拼接到URL上（<a href="http://www.baidu.com/action?name1=value1&amp;name2=value2%EF%BC%89%EF%BC%8C%E5%A4%9A%E4%B8%AA%E5%8F%82%E6%95%B0%E5%8F%82%E6%95%B0%E5%80%BC%E9%9C%80%E8%A6%81%E7%94%A8&amp;%E8%BF%9E%E6%8E%A5%E8%B5%B7%E6%9D%A5%E5%B9%B6%E4%B8%94%E7%94%A8?%E6%8B%BC%E6%8E%A5%E5%88%B0action%E5%90%8E%E9%9D%A2%EF%BC%9B" target="_blank" rel="noreferrer">http://www.baidu.com/action?name1=value1&amp;name2=value2），多个参数参数值需要用&amp;连接起来并且用?拼接到action后面；</a></li><li>post请求将表单数据放到请求头或者请求的消息体中。</li></ul><p>传输数据的大小限制：</p><ul><li>get请求传输的数据受到URL长度的限制，而URL长度是由浏览器决定的；</li><li>post请求传输数据的大小理论上来说是没有限制的。</li></ul><p>参数的编码：</p><ul><li>get请求的参数会在地址栏明文显示，使用URL编码的文本格式传递参数；</li><li>post请求使用二进制数据多重编码传递参数。</li></ul><p>缓存处理：</p><ul><li>get请求可以被浏览器缓存被收藏为标签；</li><li>post请求不会被缓存也不能被收藏为标签</li></ul><h2 id="_4-介绍下osi七层和tcp-ip四层的关系" tabindex="-1">4.介绍下OSI七层和TCP/IP四层的关系 <a class="header-anchor" href="#_4-介绍下osi七层和tcp-ip四层的关系" aria-label="Permalink to &quot;4.介绍下OSI七层和TCP/IP四层的关系&quot;">​</a></h2><p>为了更好地促进互联网的研究和发展，国际标准化组织ISO在1985 年指定了网络互联模型。OSI 参考模型（Open System Interconnect Reference <a href="https://so.csdn.net/so/search?q=Model&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">Model</a>），具有 7 层结构</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1675489425009/8b05a5e5ca8f45f6adfe5a2473797a6e.png" alt="image.png" loading="lazy"></p><p><strong>应用层</strong>：各种应用程序协议，比如HTTP、HTTPS、FTP、SOCKS安全套接字协议、DNS域名系统、GDP网关发现协议等等。 <strong>表示层</strong>：加密解密、转换翻译、压缩解压缩，比如LPP轻量级表示协议。 <strong>会话层</strong>：不同机器上的用户建立和管理会话，比如SSL安全套接字层协议、TLS传输层安全协议、RPC远程过程调用协议等等。</p><p><strong>传输层</strong>：接受上一层的数据，在必要的时候对数据进行分割，并将这些数据交给网络层，保证这些数据段有效到达对端，比如TCP传输控制协议、UDP数据报协议。 <strong>网络层</strong>：控制子网的运行：逻辑编址、分组传输、路由选择，比如IP、IPV6、SLIP等等。 <strong>数据链路层</strong>：物理寻址，同时将原始比特流转变为逻辑传输路线，比如XTP压缩传输协议、PPTP点对点隧道协议等等。 <strong>物理层</strong>：机械、电子、定时接口通信信道上的原始比特流传输，比如IEEE802.2等等。</p><p>而且在消息通信的过程中具体的执行流程为：</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1675489425009/62a425220acc40b6b53cf2c34a4331a6.png" alt="image.png" loading="lazy"></p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1675489425009/933af2e7173942319f49900f5ce9ae49.png" alt="image.png" loading="lazy"></p><p>网络传输的数据其实会通过这七层协议来进行数据的封装和拆解</p><h2 id="_5-说说tcp和udp的区别" tabindex="-1">5.说说TCP和UDP的区别 <a class="header-anchor" href="#_5-说说tcp和udp的区别" aria-label="Permalink to &quot;5.说说TCP和UDP的区别&quot;">​</a></h2><p>1、TCP面向连接（如打电话要先拨号建立连接）：UDP是无连接的，即发送数据之前不需要建立连接。 2、TCP提供可靠的服务。也就是说，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达;UDP尽最大努力交付，即不保证可靠交付。tcp通过校验和，重传控制，序号标识，滑动窗口、确认应答实现可靠传输。如丢包时的重发控制，还可以对次序乱掉的分包进行顺序控制。 3、UDP具有较好的实时性，工作效率比TCP高，适用于对高速传输和实时性有较高的通信或广播通信。 4.每一条TCP连接只能是点到点的;UDP支持一对一，一对多，多对一和多对多的交互通信</p><p>5、TCP对系统资源要求较多，UDP对系统资源要求较少。</p><h2 id="_6-说下http和https的区别" tabindex="-1">6. 说下HTTP和HTTPS的区别 <a class="header-anchor" href="#_6-说下http和https的区别" aria-label="Permalink to &quot;6. 说下HTTP和HTTPS的区别&quot;">​</a></h2><p>端口不同：HTTP和HTTPS的连接方式不同没用的端口也不一样，HTTP是80，HTTPS用的是443 消耗资源：和HTTP相比，HTTPS通信会因为加解密的处理消耗更多的CPU和内存资源。 开销：HTTPS通信需要证书，这类证书通常需要向认证机构申请或者付费购买。</p><h2 id="_7-说下http、tcp、socket的关系是什么" tabindex="-1">7.说下HTTP、TCP、Socket的关系是什么？ <a class="header-anchor" href="#_7-说下http、tcp、socket的关系是什么" aria-label="Permalink to &quot;7.说下HTTP、TCP、Socket的关系是什么？&quot;">​</a></h2><ul><li>TCP/IP代表传输控制协议/网际协议，指的是一系列协议族。</li><li>HTTP本身就是一个协议，是从Web服务器传输超文本到本地浏览器的传送协议。</li><li>Socket是TCP/IP网络的API，其实就是一个门面模式，它把复杂的TCP/IP协议族隐藏在Socket接口后面。对用户来说，一组简单的接口就是全部，让Socket去组织数据，以符合指定的协议。</li></ul><p>综上所述：</p><ul><li>需要IP协议来连接网络</li><li>TCP是一种允许我们安全传输数据的机制，使用TCP协议来传输数据的HTTP是Web服务器和客户端使用的特殊协议。</li><li>HTTP基于TCP协议，所以可以使用Socket去建立一个TCP连接。</li></ul><h2 id="_8-说下http的长链接和短连接的区别" tabindex="-1">8. 说下HTTP的长链接和短连接的区别 <a class="header-anchor" href="#_8-说下http的长链接和短连接的区别" aria-label="Permalink to &quot;8. 说下HTTP的长链接和短连接的区别&quot;">​</a></h2><p>HTTP协议的长连接和短连接，实质上是TCP协议的长连接和短连接。</p><p><strong>短连接</strong>   在HTTP/1.0中默认使用短链接,也就是说，浏览器和服务器每进行一次HTTP操作，就建立一次连接，但任务结束就中断连接。如果客户端访问的某个HTML或其他类型的Web资源，如JavaScript文件、图像文件、CSS文件等。当浏览器每遇到这样一个Web资源，就会建立一个HTTP会话. <strong>长连接</strong>   从HTTP/1.1起，默认使用长连接，用以保持连接特性。在使用长连接的情况下，当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭。如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接。Keep-Alive不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如Apache）中设定这个时间。</p><h2 id="_9-tcp原理" tabindex="-1">9.TCP原理 <a class="header-anchor" href="#_9-tcp原理" aria-label="Permalink to &quot;9.TCP原理&quot;">​</a></h2><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1675489425009/2c3e7415ef194f0a93fd91345ba9c0ac.png" alt="image.png" loading="lazy"></p><p>三次握手：</p><p>1.第一次握手：客户端将标志位syn重置为1，随机产生seq=a，并将数据包发送给服务端 2.第二次握手：服务端收到syn=1知道客户端请求连接，服务端将syn和ACK都重置为1，ack=a+1，随机产一个值seq=b，并将数据包发送给客户端，服务端进入syn_RCVD状态。 3.第三次握手：客户端收到确认后，检查ack是否为a+1，ACK是否为1，若正确将ACK重置为1，将ack改为b+1，然后将数据包发送给服务端服务端检查ack与ACK,若都正确，就建立连接，进入ESTABLISHEN.</p><p>四次挥手：</p><p>1.开始双方都处于连接状态 2.客户端进程发出FIN报文，并停止发送数据，在报文中FIN结束标志为1，seq为a连接状态下发送给服务器的最后一个字节的序号+1，报文发送结束后，客户端进入FIN-WIT1状态。 3.服务端收到报文，向客户端发送确认报文，ACK=1,seq为b服务端给客户端发送的最后字节的序号+1，ack=a+1，发送后客户端进入close-wait状态，不再发送数据，但服务端发送数据客户端一九可以收到（城为半关闭状态）。 4.客户端收到服务器的确认报文后，客户端进入fin-wait2状态进行等待服务器发送第三次的挥手报文。 5.服务端向fin报文FIN=1ACK=1，seq=c（服务器向客户端发送最后一个字节序号+1），ack=b+1，发送结束后服务器进入last-ack状态等待最后的确认。 6.客户端收到是释放报文后，向服务器发送确认报文进入time-wait状态，后进入close 7.服务端收到确认报文进入close状态。</p><h2 id="_10-cookie和session的区别" tabindex="-1">10. Cookie和Session的区别 <a class="header-anchor" href="#_10-cookie和session的区别" aria-label="Permalink to &quot;10. Cookie和Session的区别&quot;">​</a></h2><p>  cookie是由Web服务器保存在用户浏览器上的文件（key-value格式），可以包含用户相关的信息。客户端向服务器发起请求，就提取浏览器中的用户信息由http发送给服务器</p><p>  session是浏览器和服务器会话过程中，服务器会分配的一块储存空间给session。服务器默认为客户浏览器的cookie中设置sessionid，这个sessionid就和cookie对应，浏览器在向服务器请求过程中传输的cookie包含sessionid，服务器根据传输cookie中的sessionid获取出会话中存储的信息，然后确定会话的身份信息。</p><p>1、Cookie数据存放在客户端上，安全性较差，Session数据放在服务器上，安全性相对更高 2、单个cookie保存的数据不能超过4K，session无此限制 3、session一定时间内保存在服务器上，当访问增多，占用服务器性能，考虑到服务器性能方面，应当 使用cookie。</p><h2 id="_11-tomcat是什么" tabindex="-1">11.Tomcat是什么？ <a class="header-anchor" href="#_11-tomcat是什么" aria-label="Permalink to &quot;11.Tomcat是什么？&quot;">​</a></h2><p>Tomcat服务器Apache软件基金会项目中的一个核心项目，是一个免费的开放源代码的Web应用服 务器（Servlet容器），属于轻量级应用服务器，在中小型系统和并发访问用户不是很多的场合下被 普遍使用，是开发和调试JSP程序的首选。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1675489425009/cc3c3c6020d54b098e862692bada4302.png" alt="image.png" loading="lazy"></p><h2 id="_12-tomcat有几种部署方式" tabindex="-1">12.Tomcat有几种部署方式 <a class="header-anchor" href="#_12-tomcat有几种部署方式" aria-label="Permalink to &quot;12.Tomcat有几种部署方式&quot;">​</a></h2><ol><li>利用Tomcat的自动部署：把web应用拷贝到webapps目录（生产环境不建议放在该目录中）。Tomcat在启动时会加载目录下的应用，并将编译后的结果放入work目录下。</li><li>使用Manager App控制台部署：在tomcat主页点击“Manager App”进入应用管理控制台，可以指定一个web应用的路径或war文件。</li><li>修改conf/server.xml文件部署：在server.xml文件中，增加Context节点可以部署应用。</li><li>增加自定义的Web部署文件：在conf/Catalina/localhost/路径下增加xyz.xml文件，内容是Context节点，可以部署应用。</li></ol><h2 id="_13-什么是servlet" tabindex="-1">13.什么是Servlet <a class="header-anchor" href="#_13-什么是servlet" aria-label="Permalink to &quot;13.什么是Servlet&quot;">​</a></h2><p>  Servlet是JavaEE规范的一种，主要是为了扩展Java作为Web服务的功能，统一接口。由其他内部厂 商如tomcat，jetty内部实现web的功能。如一个http请求到来：容器将请求封装为servlet中的 HttpServletRequest对象，调用init()，service()等方法输出response,由容器包装为httpresponse 返回给客户端的过程。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1675489425009/f1f331019c8b41519bd49a588d413ffc.png" alt="image.png" loading="lazy"></p><h2 id="_14-什么是servlet规范" tabindex="-1">14. 什么是Servlet规范? <a class="header-anchor" href="#_14-什么是servlet规范" aria-label="Permalink to &quot;14. 什么是Servlet规范?&quot;">​</a></h2><ul><li>从Jar包上来说，Servlet规范就是两个Jar文件。servlet-api.jar和jsp-api.jar，Jsp也是一种Servlet。</li><li>从package上来说，就是javax.servlet和javax.servlet.http两个包。</li><li>从接口来说，就是规范了Servlet接口、Filter接口、Listener接口、ServletRequest接口、ServletResponse接口等。类图如下：</li></ul><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1675489425009/5605477c3db841e7824a0432e4a6c2a9.png" alt="image.png" loading="lazy"></p><h2 id="_15-为什么我们将tomcat称为web容器或者servlet容器" tabindex="-1">15.为什么我们将tomcat称为Web容器或者Servlet容器？ <a class="header-anchor" href="#_15-为什么我们将tomcat称为web容器或者servlet容器" aria-label="Permalink to &quot;15.为什么我们将tomcat称为Web容器或者Servlet容器？&quot;">​</a></h2><p>我们用一张图来表示他们之间的关系:</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1675489425009/5e137f734ac540ed9aaee12704166ec0.png" alt="image.png" loading="lazy"></p><p>简单的理解：启动一个ServerSocket，监听8080端口。Servlet容器用来装我们开发的Servlet。</p><h2 id="_16-servlet的生命周期" tabindex="-1">16.Servlet的生命周期 <a class="header-anchor" href="#_16-servlet的生命周期" aria-label="Permalink to &quot;16.Servlet的生命周期&quot;">​</a></h2><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1675489425009/b6757fdbc638457daebd04fd83a9d0f7.png" alt="image.png" loading="lazy"></p><h2 id="_17-jsp和servlet的区别" tabindex="-1">17. jsp和Servlet的区别 <a class="header-anchor" href="#_17-jsp和servlet的区别" aria-label="Permalink to &quot;17. jsp和Servlet的区别&quot;">​</a></h2><ul><li>本质都是servlet</li><li>servlet侧重于逻辑处理</li><li>jsp侧重于视图显示</li></ul><h2 id="_18-九大内置对象" tabindex="-1">18. 九大内置对象 <a class="header-anchor" href="#_18-九大内置对象" aria-label="Permalink to &quot;18. 九大内置对象&quot;">​</a></h2><ol><li>page页面对象</li><li>config配置对象</li><li>request请求对象</li><li>response响应对象</li><li>session会话对象</li><li>application全局对象</li><li>out输出对象</li><li>pageContext页面上下文对象</li><li>exception异常对象</li></ol><h2 id="_19-jsp的四大作用域" tabindex="-1">19. JSP的四大作用域 <a class="header-anchor" href="#_19-jsp的四大作用域" aria-label="Permalink to &quot;19. JSP的四大作用域&quot;">​</a></h2><p>page：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>只在当前页面有效</span></span></code></pre></div><p>request：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>它在当前请求中有效</span></span></code></pre></div><p>session：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>它在当前会话中有效</span></span></code></pre></div><p>application：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>他在所有的应用程序中都有效</span></span></code></pre></div><p>注意：当4个作用域对象都有相同的name属性时,默认按照最小的顺序查找</p><h2 id="_20-genericservlet和httpservlet有什么区别" tabindex="-1">20. <strong>GenericServlet和HttpServlet有什么区别？</strong> <a class="header-anchor" href="#_20-genericservlet和httpservlet有什么区别" aria-label="Permalink to &quot;20. **GenericServlet和HttpServlet有什么区别？**&quot;">​</a></h2><p>GenericServlet 为抽象类，定义了一个通用的、独立于底层协议的servlet，实现了Servlet 和 ServletConfig接口，ServletConfig接口定义了在Servlet初始化的过程中由Servlet容器传递给Servlet得配置信息对象。OK，这个类可能我们不是那么熟悉，但是他的子类相信大家都知道，也就是HttpServlet，HttpServlet 继承自抽象类GenericServlet 具有其所有的特性并拓展了一些其他的方法,如doGet、doPost等</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1675489425009/12c9c504a75243bba4aec073404bdc5e.png" alt="image.png" loading="lazy"></p>',90),s=[o];function r(n,p,c,h,d,f){return t(),a("div",null,s)}const b=e(i,[["render",r]]);export{u as __pageData,b as default};
