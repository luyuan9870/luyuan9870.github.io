import{_ as n,c as a,o as s,a4 as p}from"./chunks/framework.BG61BEI0.js";const S=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.98-八股/网络协议与Netty面试题1.md","filePath":"01-Dev/01.98-八股/网络协议与Netty面试题1.md"}'),e={name:"01-Dev/01.98-八股/网络协议与Netty面试题1.md"},t=p(`<h2 id="_1、说一说网络模型-osi、tcp-ip模型" tabindex="-1">1、说一说网络模型（OSI、TCP/IP模型） <a class="header-anchor" href="#_1、说一说网络模型-osi、tcp-ip模型" aria-label="Permalink to &quot;1、说一说网络模型（OSI、TCP/IP模型）&quot;">​</a></h2><p>OSI采用了分层的结构化技术，共分七层， <strong>物理层、数据链路层、网络层、传输层、会话层、表示层、应用层</strong> 。</p><p>Open System Interconnect 简称OSI，是国际标准化组织(ISO)和国际电报电话咨询委员会(CCITT)联合制定的开放系统互连参考模型，为开放式互连信息系统提供了一种功能结构的框架。</p><p>OSI模型比较复杂且学术化，所以我们实际使用的TCP/IP模型，共分4层， <strong>链路层、网络层、传输层、应用层</strong> 。</p><p>两个模型之间的对应关系如图所示：</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/5983/238462/44206b96830f43c8a6413a0624f40d24.png" alt="" loading="lazy"></p><ol><li>物理层：物理层是OSI模型的第一层，它定义了在网络上传输比特流的方式。物理层的主要任务是将数字数据转换为模拟信号，以便在网络上进行传输。</li><li>数据链路层：数据链路层是OSI模型的第二层，它定义了如何在网络上传输数据包。数据链路层的主要任务是将数据分成帧（Frame），并在物理层上传输。</li><li>网络层：网络层是OSI模型的第三层，它定义了如何在不同的网络之间传输数据。网络层的主要任务是路由（Routing），即确定最佳的路径将数据从源节点传输到目标节点。</li><li>传输层：传输层是OSI模型的第四层，它定义了数据传输的端到端可靠性和流量控制。传输层的主要任务是将数据分成数据段（Segment），并在网络上进行传输。</li><li>会话层：会话层是OSI模型的第五层，它定义了如何在通信双方之间建立、管理和终止会话（Session）。会话层的主要任务是管理会话层协议（例如，连接建立和断开、同步和恢复等）。</li><li>表示层：表示层是OSI模型的第六层，它定义了如何将数据表示为应用程序可以处理的格式。表示层的主要任务是将数据进行编码、解码和加密。</li><li>应用层：应用层是OSI模型的第七层，它定义了不同应用程序之间的交互方式。应用层的主要任务是提供各种服务，例如文件传输、电子邮件和远程登录等。</li></ol><h3 id="_1-1、为什么要对网络协议分层" tabindex="-1">1.1、为什么要对网络协议分层 <a class="header-anchor" href="#_1-1、为什么要对网络协议分层" aria-label="Permalink to &quot;1.1、为什么要对网络协议分层&quot;">​</a></h3><p>1、简化问题难度和复杂度。由于各层之间独立，我们可以分割大问题为小问题。 2、灵活性好。当其中一层的技术变化时，只要层间接口关系保持不变，其他层不受影响。 3、易于实现和维护。 4、促进标准化工作。分开后，每层功能可以相对简单地被描述</p><h3 id="_1-2、说说http、tcp、socket-的关系是什么" tabindex="-1">1.2、说说HTTP、TCP、Socket 的关系是什么？ <a class="header-anchor" href="#_1-2、说说http、tcp、socket-的关系是什么" aria-label="Permalink to &quot;1.2、说说HTTP、TCP、Socket 的关系是什么？&quot;">​</a></h3><p>HTTP 本身就是一个应用层的协议，是从 Web 服务器传输超文本到本地浏览器的传送协议。</p><p>TCP是面向连接的协议，发送数据前要先建立连接，TCP提供可靠的服务，也就是说，通过TCP连接传输的数据不会丢失，没有重复，并且按顺序到达；</p><p>Socket 是 TCP/IP 网络的 API ，其实就是一个门面模式，它把复杂的 TCP/IP 协议族隐藏在Socket 接口后面。对用户来说，一组简单的接口就是全部，让 Socket 去组织数据，以符合指定的协议。</p><h3 id="_1-3、描述下一次http请求在网络模型中的传输过程" tabindex="-1">1.3、描述下一次http请求在网络模型中的传输过程？ <a class="header-anchor" href="#_1-3、描述下一次http请求在网络模型中的传输过程" aria-label="Permalink to &quot;1.3、描述下一次http请求在网络模型中的传输过程？&quot;">​</a></h3><p>每个分层中，都会对所发送的数据附加一个首部，在这个首部中包含了该层必要的信息，如发送的目标地址以及协议相关信息。通常，为协议提供的信息为包首部，所要发送的内容为数据。在下一层的角度看，从上一层收到的包全部都被认为是本层的数据。</p><p>网络中传输的数据包由两部分组成：一部分是协议所要用到的首部，另一部分是上一层传过来的数据。首部的结构由协议的具体规范详细定义。在数据包的首部，明确标明了协议应该如何读取数据。反过来说，看到首部，也就能够了解该协议必要的信息以及所要处理的数据。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/5983/1696839242020/350bacc8e5334069bb165e9f5924c7b9.png" alt="image.png" loading="lazy"></p><p>①发送方： 应用程序处理 首先应用程序会进行编码处理，这些编码相当于 OSI 的表示层功能； 编码转化后，邮件不一定马上被发送出去，这种何时建立通信连接何时发送数据的管理功能，相当于 OSI 的会话层功能。</p><p>② 发送方：TCP 模块的处理 TCP 根据应用的指示，负责建立连接、发送数据以及断开连接。TCP 提供将应用层发来的数据顺利发送至对端的可靠传输。为了实现这一功能，需要在应用层数据的前端附加一个 TCP 首部。</p><p>③发送方： IP 模块的处理 IP 将 TCP 传过来的 TCP 首部和 TCP 数据合起来当做自己的数据，并在 TCP 首部的前端加上自己的 IP 首部。IP 包生成后，参考路由控制表决定接受此 IP 包的路由或主机。</p><p>④发送方： 网络接口（以太网驱动）的处理 从 IP 传过来的 IP 包对于以太网来说就是数据。给这些数据附加上以太网首部并进行发送处理，生成的以太网数据包将通过物理层传输给接收端。</p><p>⑤ 接收方：网络接口（以太网驱动）的处理 主机收到以太网包后，首先从以太网包首部找到 MAC 地址判断是否为发送给自己的包，若不是则丢弃数据。 如果是发送给自己的包，则从以太网包首部中的类型确定数据类型，再传给相应的模块，如 IP、ARP 等。这里的例子则是 IP 。</p><p>⑥ 接收方：IP 模块的处理 IP 模块接收到 数据后也做类似的处理。从包首部中判断此 IP 地址是否与自己的 IP 地址匹配，如果匹配则根据首部的协议类型将数据发送给对应的模块，如 TCP、UDP。这里的例子则是 TCP。 另外吗，对于有路由器的情况，接收端地址往往不是自己的地址，此时，需要借助路由控制表，在调查应该送往的主机或路由器之后再进行转发数据。</p><p>⑦ 接收方：TCP 模块的处理 在 TCP 模块中，首先会计算一下校验和，判断数据是否被破坏。然后检查是否在按照序号接收数据。最后检查端口号，确定具体的应用程序。数据被完整地接收以后，会传给由端口号识别的应用程序。</p><p>⑧ 接收方：应用程序的处理 接收端应用程序会直接接收发送端发送的数据。通过解析数据，展示相应的内容。</p><h2 id="_2、说一下tcp三次握手-为什么需要三次-不是四次或两次" tabindex="-1">2、说一下TCP三次握手，为什么需要三次，不是四次或两次？ <a class="header-anchor" href="#_2、说一下tcp三次握手-为什么需要三次-不是四次或两次" aria-label="Permalink to &quot;2、说一下TCP三次握手，为什么需要三次，不是四次或两次？&quot;">​</a></h2><h3 id="_2-1、tcp三次握手" tabindex="-1">2.1、TCP三次握手 <a class="header-anchor" href="#_2-1、tcp三次握手" aria-label="Permalink to &quot;2.1、TCP三次握手&quot;">​</a></h3><p><strong>(1). 三次握手（我要和你建立链接，你真的要和我建立链接么，我真的要和你建立链接，成功）</strong><strong>第一次握手</strong>：Client将标志位SYN置为1，随机产生一个值seq=x，并将该数据包发送给Server，Client进入SYN_SENT状态，等待Server确认。 <strong>第二次握手</strong>：Server收到数据包后由标志位SYN=1知道Client请求建立连接，Server将标志位SYN和ACK都置为1，ack=x+1，随机产生一个值seq=y，并将该数据包发送给Client以确认连接请求，Server进入SYN_RCVD状态。</p><p><strong>第三次握手</strong>：Client收到确认后，检查ack是否为x+1，ACK是否为1，如果正确则将标志位ACK置为1，ack=y+1，并将该数据包发送给Server，Server检查ack是否为y+1，ACK是否为1，如果正确则连接建立成功，Client和Server进入ESTABLISHED状态，完成三次握手，随后Client与Server之间可以开始传输数据了。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/5983/1696839242020/709d6c191ef548b9a239e2a9dc7fdaf9.png" alt="image.png" loading="lazy"></p><h3 id="_2-2、tcp四次挥手" tabindex="-1">2.2、TCP四次挥手 <a class="header-anchor" href="#_2-2、tcp四次挥手" aria-label="Permalink to &quot;2.2、TCP四次挥手&quot;">​</a></h3><p><strong>四次挥手（我要和你断开链接；好的，断吧。我也要和你断开链接；好的，断吧）：</strong></p><p><strong>第一次挥手</strong>：Client发送一个FIN，用来关闭Client到Server的数据传送，Client进入FIN_WAIT_1状态。 <strong>第二次挥手</strong>：Server收到FIN后，发送一个ACK给Client，确认序号为收到序号+1（与SYN相同，一个FIN占用一个序号），Server进入CLOSE_WAIT状态。此时TCP链接处于半关闭状态，即客户端已经没有要发送的数据了，但服务端若发送数据，则客户端仍要接收。 <strong>第三次挥手</strong>：Server发送一个FIN，用来关闭Server到Client的数据传送，Server进入LAST_ACK状态。 <strong>第四次挥手</strong>：Client收到FIN后，Client进入TIME_WAIT状态，接着发送一个ACK给Server，确认序号为收到序号+1，Server进入CLOSED状态，完成四次挥手。</p><h3 id="_2-3、为什么tcp握手需要三次" tabindex="-1">2.3、为什么TCP握手需要三次? <a class="header-anchor" href="#_2-3、为什么tcp握手需要三次" aria-label="Permalink to &quot;2.3、为什么TCP握手需要三次?&quot;">​</a></h3><p>TCP是可靠的传输控制协议，而三次握手是保证数据可靠传输又能提高传输效率的最小次数。</p><p>“三次握手” 的目的是为了防止已失效的链接请求报文突然又传送到了服务端，因而产生错误。</p><p><strong>正常的情况</strong>：A 发出连接请求，但因连接请求报文丢失而未收到确认，于是 A 再重传一次连接请求。后来收到了确认，建立了连接。数据传输完毕后，就释放了连接。A 共发送了两个连接请求报文段，其中第一个丢失，第二个到达了 B。没有 “已失效的连接请求报文段”。</p><p><strong>异常情况</strong>：即 A 发出的第一个连接请求报文段并没有丢失，而是在某个网络结点长时间的滞留了，以致延误到连接释放以后的某个时间才到达 B。本来这是一个早已失效的报文段。但 B 收到此失效的连接请求报文段后，就误认为是 A 再次发出的一个新的连接请求。于是就向 A 发出确认报文段，同意建立连接。</p><p>不采用“三次握手”，那么只要 B 发出确认，新的连接就建立了。由于现在 A 并没有发出建立连接的请求，因此不会理睬 B 的确认，也不会向 B 发送数据。但 B 却以为新的运输连接已经建立，并一直等待A 发来数据。这样，B 的很多资源就白白浪费掉了。采用“三次握手”的办法可以防止上述现象发生。</p><h3 id="_2-4、为什么要四次挥手" tabindex="-1">2.4、为什么要四次挥手？ <a class="header-anchor" href="#_2-4、为什么要四次挥手" aria-label="Permalink to &quot;2.4、为什么要四次挥手？&quot;">​</a></h3><p>TCP 协议是一种面向连接的、可靠的、基于字节流的运输层通信协议。TCP 是全双工模式，这就意味着，当 A 向 B 发出 FIN 报文段时，只是表示 A 已经没有数据要发送了，而此时 A 还是能够接受到来自 B发出的数据；B 向 A 发出 ACK 报文段也只是告诉 A ，它自己知道 A 没有数据要发了，但 B 还是能够向A 发送数据。</p><p>所以想要愉快的结束这次对话就需要四次挥手。</p><h3 id="_2-5、tcp的三次握手的漏洞-syn洪泛攻击" tabindex="-1">2.5、TCP的三次握手的漏洞-SYN洪泛攻击 <a class="header-anchor" href="#_2-5、tcp的三次握手的漏洞-syn洪泛攻击" aria-label="Permalink to &quot;2.5、TCP的三次握手的漏洞-SYN洪泛攻击&quot;">​</a></h3><p>但是在TCP三次握手中是有一个缺陷的，就是如果我们利用三次握手的缺陷进行攻击。这个攻击就是SYN洪泛攻击。三次握手中有一个第二次握手，服务端向客户端应答请求，应答请求是需要客户端IP的，攻击者就伪造这个IP，往服务器端狂发送第一次握手的内容，当然第一次握手中的客户端IP地址是伪造的，从而服务端忙于进行第二次握手但是第二次握手当然没有结果，所以导致服务器端被拖累，死机。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/5983/1681116521050/be3500ccac144bcab5076704a4b6fb28.png" alt="image.png" loading="lazy"></p><p>当然我们的生活中也有可能有这种例子，一个家境一般的IT男去表白他的女神被拒绝了，理由是他家里没矿，IT男为了报复，采用了洪泛攻击，他请了很多人伪装成有钱人去表白那位追求矿的女神，让女生每次想交往时发现表白的人不见了同时还联系不上了。</p><p>面对这种攻击，有以下的解决方案，最好的方案是防火墙。</p><p><strong>无效连接监视释放</strong></p><p>这种方法不停监视所有的连接，包括三次握手的，还有握手一次的，反正是所有的，当达到一定(与)阈值时拆除这些连接，从而释放系统资源。这种方法对于所有的连接一视同仁，不管是正常的还是攻击的，所以这种方式不推荐。</p><p><strong>延缓TCB分配方法</strong></p><p>一般的做完第一次握手之后，服务器就需要为该请求分配一个TCB（连接控制资源），通常这个资源需要200多个字节。延迟TCB的分配，当正常连接建立起来后再分配TCB则可以有效地减轻服务器资源的消耗。</p><p><strong>使用防火墙</strong></p><p>防火墙在确认了连接的有效性后，才向内部的服务器（Listener）发起SYN请求，</p><h2 id="_3、说一说你对io的理解" tabindex="-1">3、说一说你对IO的理解 <a class="header-anchor" href="#_3、说一说你对io的理解" aria-label="Permalink to &quot;3、说一说你对IO的理解&quot;">​</a></h2><h3 id="_3-1、什么是bio-bio阻塞在哪里" tabindex="-1">3.1、什么是BIO，BIO阻塞在哪里？ <a class="header-anchor" href="#_3-1、什么是bio-bio阻塞在哪里" aria-label="Permalink to &quot;3.1、什么是BIO，BIO阻塞在哪里？&quot;">​</a></h3><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/5983/1696839242020/f0fec61cb9904d30afd93e1dcfb375f8.png" alt="image.png" loading="lazy"></p><p>传统的同步阻塞模型开发中，ServerSocket负责绑定IP地址，启动监听端口；Socket负责发起连接操作。连接成功后，双方通过输入和输出流进行同步阻塞式通信。代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class Client {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) throws IOException {</span></span>
<span class="line"><span>        //客户端启动必备</span></span>
<span class="line"><span>        Socket socket = null;</span></span>
<span class="line"><span>        //实例化与服务端通信的输入输出流</span></span>
<span class="line"><span>        ObjectOutputStream output = null;</span></span>
<span class="line"><span>        ObjectInputStream input = null;</span></span>
<span class="line"><span>        //服务器的通信地址</span></span>
<span class="line"><span>        InetSocketAddress addr = new InetSocketAddress(&quot;127.0.0.1&quot;,10001);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        try{</span></span>
<span class="line"><span>            socket = new Socket();</span></span>
<span class="line"><span>            /*连接服务器*/</span></span>
<span class="line"><span>            socket.connect(addr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            output = new ObjectOutputStream(socket.getOutputStream());</span></span>
<span class="line"><span>            input = new ObjectInputStream(socket.getInputStream());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            /*向服务器输出请求*/</span></span>
<span class="line"><span>            output.writeUTF(&quot;lijin&quot;);</span></span>
<span class="line"><span>            output.flush();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            //接收服务器的输出</span></span>
<span class="line"><span>            System.out.println(input.readUTF());</span></span>
<span class="line"><span>        }finally{</span></span>
<span class="line"><span>            if (socket!=null) socket.close();</span></span>
<span class="line"><span>            if (output!=null) output.close();</span></span>
<span class="line"><span>            if (input!=null) input.close();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class Server {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) throws IOException {</span></span>
<span class="line"><span>        /*服务器必备*/</span></span>
<span class="line"><span>        ServerSocket serverSocket = new ServerSocket();</span></span>
<span class="line"><span>        /*绑定监听端口*/</span></span>
<span class="line"><span>        serverSocket.bind(new InetSocketAddress(10001));</span></span>
<span class="line"><span>        System.out.println(&quot;Server start.......&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        while(true){</span></span>
<span class="line"><span>           new Thread(new ServerTask(serverSocket.accept())).start();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private static class ServerTask implements Runnable{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        private Socket socket = null;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public ServerTask(Socket socket) {</span></span>
<span class="line"><span>            this.socket = socket;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public void run() {</span></span>
<span class="line"><span>            /*拿和客户端通讯的输入输出流*/</span></span>
<span class="line"><span>            try(</span></span>
<span class="line"><span>                    ObjectInputStream inputStream = new ObjectInputStream(socket.getInputStream());</span></span>
<span class="line"><span>                    ObjectOutputStream outputStream = new ObjectOutputStream(socket.getOutputStream())</span></span>
<span class="line"><span>            ){</span></span>
<span class="line"><span>                /*服务器的输入*/</span></span>
<span class="line"><span>                String userName = inputStream.readUTF();</span></span>
<span class="line"><span>                System.out.println(&quot;Accept clinet message:&quot;+userName);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                outputStream.writeUTF(&quot;Hello,&quot;+userName);</span></span>
<span class="line"><span>                outputStream.flush();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }catch (Exception e){</span></span>
<span class="line"><span>                e.printStackTrace();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            finally {</span></span>
<span class="line"><span>                try {</span></span>
<span class="line"><span>                    socket.close();</span></span>
<span class="line"><span>                } catch (IOException e) {</span></span>
<span class="line"><span>                    e.printStackTrace();</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>以上代码是传统BIO通信模型：采用BIO通信模型的服务端，通常由一个独立的Acceptor线程负责监听客户端的连接，它接收到客户端连接请求之后为每个客户端创建一个新的线程进行链路处理，处理完成后，通过输出流返回应答给客户端，线程销毁。即典型的一请求一应答模型，同时数据的读取写入也必须阻塞在一个线程内等待其完成。该模型最大的问题就是缺乏弹性伸缩能力，当客户端并发访问量增加后，服务端的线程个数和客户端并发访问数呈1:1的正比关系，Java中的线程也是比较宝贵的系统资源，线程数量快速膨胀后，系统的性能将急剧下降，随着访问量的继续增大，系统最终就死掉了。</p><h4 id="bio阻塞在哪里" tabindex="-1">BIO阻塞在哪里？ <a class="header-anchor" href="#bio阻塞在哪里" aria-label="Permalink to &quot;BIO阻塞在哪里？&quot;">​</a></h4><p><strong>BIO阻塞是在操作系统的recv函数阻塞的！！！！</strong></p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/5983/1696839242020/4c349d244a8e4f97845090f5a868f492.png" alt="image.png" loading="lazy"></p><p>当调用recv()函数时，系统首先查是否有准备好的数据。如果数据没有准备好，那么系统就处于等待状态。当数据准备好后，将数据从系统缓冲区复制到用户空间，然后该函数返回。在套接应用程序中，当调用recv()函数时，未必用户空间就已经存在数据，那么此时recv()函数就会处于等待状态。</p><h3 id="_3-2、说一说你对java中nio的理解" tabindex="-1">3.2、说一说你对Java中NIO的理解<img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/5983/1657192256042/84a42406eb4844d58a5e22a8ec44dcac.png" alt="image.png" loading="lazy"> <a class="header-anchor" href="#_3-2、说一说你对java中nio的理解" aria-label="Permalink to &quot;3.2、说一说你对Java中NIO的理解![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/5983/1657192256042/84a42406eb4844d58a5e22a8ec44dcac.png)&quot;">​</a></h3><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/5983/1657192256042/7b90cf8894ae4c63ae10e03d424d7a53.png" alt="image.png" loading="lazy"></p><h4 id="nio解决阻塞的点在哪里" tabindex="-1">NIO解决阻塞的点在哪里？ <a class="header-anchor" href="#nio解决阻塞的点在哪里" aria-label="Permalink to &quot;NIO解决阻塞的点在哪里？&quot;">​</a></h4><p>操作系统的recv函数也提供了非阻塞的方式，所以通过selector的这种方式，可以使用非阻塞的方式来解决</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/5983/1696839242020/80bc581d0ae945b2abb16f7bcf9c130b.png" alt="image.png" loading="lazy"></p>`,69),l=[t];function i(c,o,r,u,h,d){return s(),a("div",null,l)}const f=n(e,[["render",i]]);export{S as __pageData,f as default};
