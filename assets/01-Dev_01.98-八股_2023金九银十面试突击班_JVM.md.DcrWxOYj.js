import{_ as s,c as a,o as i,a4 as n}from"./chunks/framework.BG61BEI0.js";const c=JSON.parse('{"title":"常量池分类：","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.98-八股/2023金九银十面试突击班_JVM.md","filePath":"01-Dev/01.98-八股/2023金九银十面试突击班_JVM.md","lastUpdated":1712823825000}'),p={name:"01-Dev/01.98-八股/2023金九银十面试突击班_JVM.md"},l=n(`<h2 id="_2023金九银十jvm面试突击班-主讲人-严镇涛" tabindex="-1">2023金九银十JVM面试突击班 主讲人：严镇涛 <a class="header-anchor" href="#_2023金九银十jvm面试突击班-主讲人-严镇涛" aria-label="Permalink to &quot;2023金九银十JVM面试突击班                               主讲人：严镇涛&quot;">​</a></h2><h2 id="为什么需要jvm-不要jvm可以吗" tabindex="-1">为什么需要JVM，不要JVM可以吗？ <a class="header-anchor" href="#为什么需要jvm-不要jvm可以吗" aria-label="Permalink to &quot;为什么需要JVM，不要JVM可以吗？&quot;">​</a></h2><p>1.JVM可以帮助我们屏蔽底层的操作系统 一次编译，到处运行</p><p>2.JVM可以运行Class文件</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1463/1646137467048/a2b57e0612a0461dbd4ad1dfb42a6eca.png" alt="image.png" loading="lazy"></p><h2 id="我们的编译器到底干了什么事" tabindex="-1">我们的编译器到底干了什么事？ <a class="header-anchor" href="#我们的编译器到底干了什么事" aria-label="Permalink to &quot;我们的编译器到底干了什么事？&quot;">​</a></h2><p>仅仅是将我们的 .java 文件转换成了 .class 文件，实际上就是文件格式的转换，对等信息转换。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1463/1646137467048/bac9fb59888f45d0b5531cbc21ffecf9.png" alt="image.png" loading="lazy"></p><h2 id="_4-类加载机制" tabindex="-1">4.类加载机制？ <a class="header-anchor" href="#_4-类加载机制" aria-label="Permalink to &quot;4.类加载机制？&quot;">​</a></h2><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1463/1644577518000/b5ec599f1b8242a19cb6995a97cb02cf.png" alt="image.png" loading="lazy"></p><p>类加载机制其实就是虚拟机把Class文件加载到内存，并对数据进行校验，转换解析和初始化，形成可以虚拟机直接使用的Java类型，即java.lang.Class。</p><p>1.装载</p><p>Class文件 -- &gt;二进制字节流 --&gt;java中的寻找器（类加载器）</p><p>1）通过一个类的全限定名（标识位）获取这个类的二进制字节流</p><p>2）将这个字节流所代表的静态存储结构转换为方法区的运行时数据结构</p><p>3）在java堆中生成一个代表这个类的java.lang.Class对象，做为我们方法区的数据访问入口</p><p>2.链接：</p><p>1）验证：保证我们加载的类的正确性</p><ul><li>文件格式验证</li><li>元数据验证</li><li>字节码验证</li><li>符号引用验证</li></ul><p>2）准备</p><p>为类的静态变量分配内存，并将其初始化为当前类型的默认值。</p><p>private static int a = 1 ； 那么他在准备这个阶段 a = 0；</p><p>3）解析</p><p><em>解析</em>是从运行时常量池中的符号引用动态确定具体值的过程。</p><p>把类中的符号引用转换成直接引用</p><p>3.初始化</p><p>执行到Clinit方法，为静态变量赋值，初始化静态代码块，初始化当前类的父类</p><h2 id="_5-类加载器的层次" tabindex="-1">5.类加载器的层次 <a class="header-anchor" href="#_5-类加载器的层次" aria-label="Permalink to &quot;5.类加载器的层次&quot;">​</a></h2><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1463/1646137467048/5c442004ab9641c78585c238d88f57ea.png" alt="image.png" loading="lazy"></p><h2 id="_6-双亲委派机制" tabindex="-1">6.双亲委派机制 <a class="header-anchor" href="#_6-双亲委派机制" aria-label="Permalink to &quot;6.双亲委派机制&quot;">​</a></h2><p>父类委托机制</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">protected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Class</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;?&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> loadClass</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(String name, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> resolve)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        throws ClassNotFoundException</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        synchronized</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getClassLoadingLock</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name)) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // First, check if the class has already been loaded</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            Class&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> findLoadedClass</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                long</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t0 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> System.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nanoTime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (parent </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                        c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> parent.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">loadClass</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                        c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> findBootstrapClassOrNull</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (ClassNotFoundException </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                    // ClassNotFoundException thrown if class not found</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                    // from the non-null parent class loader</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                    // If still not found, then invoke findClass in order</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                    // to find the class.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                    long</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> System.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nanoTime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> findClass</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                    // this is the defining class loader; record the stats</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    sun.misc.PerfCounter.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getParentDelegationTime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addTime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(t1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t0);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    sun.misc.PerfCounter.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getFindClassTime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addElapsedTimeFrom</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(t1);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    sun.misc.PerfCounter.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getFindClasses</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">increment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (resolve) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                resolveClass</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(c);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> c;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span></code></pre></div><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1463/1646137467048/000d19eeb6c64783875c14592668f223.png" alt="image.png" loading="lazy"></p><p>话术：首先我们得双亲委派必须要聊得就是向上检查，向下委派，向上检查的过程就是我通过类的全限定名，去进行查找，通过APPClassloader，然后一直向上检查到BOOTClassloader，判断是否已经加载过，这里其实就是检查内存有没有同名类已经被加载，如果没有，我再去从BOOTClassloader向下加载，判断是否在对应的包中能够找到全限定名的类，找得到，则被加载，找不到，，最终会报错，报ClassNotFoundException</p><h2 id="_7-如何打破双亲委派" tabindex="-1">7.如何打破双亲委派 <a class="header-anchor" href="#_7-如何打破双亲委派" aria-label="Permalink to &quot;7.如何打破双亲委派&quot;">​</a></h2><p>第一种情况，双亲委派是在JDK1.2版本发布的，而类加载器和抽象类ClassLoader在JDK1.0就已经存在了，用户可以通过重写ClassLoader里面的loadClass()方法实现自定义类加载，JDK1.2为了向前兼容，所以在设计的时候需要兼容loadClass()重写的实现，导致双亲委派被破坏的情况。</p><p>同时，为了避免后续再出现这样的问题，不在提倡重写loadClass()方法，而是使用JDK1.2中ClassLoader中提供了findClass方法来实现符合双亲委派规则的类加载逻辑。</p><p>第二种情况，在这个类加载模型中，有可能存在顶层类加载器加载的类，需要调用用户类加载器实现的代码的情况。</p><p>比如java.jdbc.Driver接口，它只是一个数据库驱动接口，这个接口是由启动类加载器加载的。</p><p>但是java.jdbc.Driver接口的实现是由各大数据库厂商来完成的，既然是自己实现的代码，就应该由应用类加载器来加载。</p><p>于是就出现了启动类加载器加载的类要调用应用类加载器加载的实现。</p><p>为了解决这个问题，在JVM中引入了线程上下文类加载器，它可以把原本需要启动类加载器加载的类，由应用类加载器进行加载。</p><p>除此之外，像Tomcat容器，也存在破坏双亲委派的情况，来实现不同应用之间的资源隔离。</p><p>同时，还有一种方式，是为了支持java的热部署，热更新的</p><p>话术：</p><p>第一种，集成ClassLoader抽象类，重写loadClass方法，在这个方法可以自定义要加载的类使用的类加载器。</p><p>第二种，使用线程上下文加载器，可以通过java.lang.Thread类的setContextClassLoader()方法来设置当前类使用的类加载器类型。这种叫做SPI， service provider interface</p><p>第三种，这种用的人不多，叫做OSGI，他是以模块化的方式去进行开发，一般用来进行热部署 热更新</p><h2 id="说一下-jvm-的主要组成部分及其作用" tabindex="-1">说一下 JVM 的主要组成部分及其作用？ <a class="header-anchor" href="#说一下-jvm-的主要组成部分及其作用" aria-label="Permalink to &quot;说一下 JVM 的主要组成部分及其作用？&quot;">​</a></h2><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1660195887078/70c416b3a15c4629886e45cfab0e87f6.png" alt="image.png" loading="lazy"></p><p>JVM包含两个子系统和两个组件，两个子系统为Class loader(类装载)、Execution engine(执行引擎)；两个组件为Runtime data area(运行时数据区)、Native Interface(本地接口)。</p><p>Class loader(类装载)：根据给定的全限定名类名(如：java.lang.Object)来装载class文件到Runtime data area中的method area。 Execution engine（执行引擎）：执行classes中的指令。 Native Interface(本地接口)：与native libraries交互，是其它编程语言交互的接口。 Runtime data area(运行时数据区域)：这就是我们常说的JVM的内存。 作用 ：首先通过编译器把 Java 代码转换成字节码，类加载器（ClassLoader）再把字节码加载到内存中，将其放在运行时数据区（Runtime data area）的方法区内，而字节码文件只是 JVM 的一套指令集规范，并不能直接交给底层操作系统去执行，因此需要特定的命令解析器执行引擎（Execution Engine），将字节码翻译成底层系统指令，再交由 CPU 去执行，而这个过程中需要调用其他语言的本地库接口（Native Interface）来实现整个程序的功能。</p><p>下面是Java程序运行机制详细说明</p><h2 id="java程序运行机制步骤" tabindex="-1">Java程序运行机制步骤 <a class="header-anchor" href="#java程序运行机制步骤" aria-label="Permalink to &quot;Java程序运行机制步骤&quot;">​</a></h2><p>首先利用IDE集成开发工具编写Java源代码，源文件的后缀为.java； 再利用编译器(javac命令)将源代码编译成字节码文件，字节码文件的后缀名为.class； 运行字节码的工作是由解释器(java命令)来完成的。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1463/1646137467048/a2b57e0612a0461dbd4ad1dfb42a6eca.png" alt="image.png" loading="lazy"></p><p>从上图可以看，java文件通过编译器变成了.class文件，接下来类加载器又将这些.class文件加载到JVM中。 其实可以一句话来解释：类的加载指的是将类的.class文件中的二进制数据读入到内存中，将其放在运行时数据区的方法区内，然后在堆区创建一个 java.lang.Class对象，用来封装类在方法区内的数据结构。</p><h2 id="说一下堆栈的区别" tabindex="-1">说一下堆栈的区别？ <a class="header-anchor" href="#说一下堆栈的区别" aria-label="Permalink to &quot;说一下堆栈的区别？&quot;">​</a></h2><p><strong>物理地址</strong></p><p>堆的物理地址分配对对象是不连续的。因此性能慢些。在GC的时候也要考虑到不连续的分配，所以有各种算法。比如，标记-消除，复制，标记-压缩，分代（即新生代使用复制算法，老年代使用标记——压缩）</p><p>栈使用的是数据结构中的栈，先进后出的原则，物理地址分配是连续的。所以性能快。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1/4146672d2ea54edc9641413b6ee18e16.png" alt="16601958870783010274ffy" loading="lazy"></p><p><strong>内存分别</strong></p><p>堆因为是不连续的，所以分配的内存是在运行期确认的，因此大小不固定。一般堆大小远远大于栈。</p><p>栈是连续的，所以分配的内存大小要在编译期就确认，大小是固定的。</p><p><strong>存放的内容</strong></p><p>堆存放的是对象的实例和数组。因此该区更关注的是数据的存储</p><p>栈存放：局部变量，操作数栈，返回结果。该区更关注的是程序方法的执行。</p><p>PS：</p><p>静态变量放在方法区 静态的对象还是放在堆。 程序的可见度</p><p>堆对于整个应用程序都是共享、可见的。</p><p>栈只对于线程是可见的。所以也是线程私有。他的生命周期和线程相同。</p><h2 id="介绍一下强引用、软引用、弱引用、虚引用的区别" tabindex="-1">介绍一下强引用、软引用、弱引用、虚引用的区别？ <a class="header-anchor" href="#介绍一下强引用、软引用、弱引用、虚引用的区别" aria-label="Permalink to &quot;介绍一下强引用、软引用、弱引用、虚引用的区别？&quot;">​</a></h2><blockquote><p>1.<strong>强引用</strong></p><p>JVM内存管理器从根引用集合（Root Set）出发遍寻堆中所有到达对象的路径。当到达某对象的任意路径都不含有引用对象时，对这个对象的引用就被称为强引用</p><p>2.软引用</p><p>软引用是用来描述一些还有用但是非必须的对象。对于软引用关联的对象，在系统将于发生内存溢出异常之前，将会把这些对象列进回收范围中进行二次回收。</p><p>（当你去处理占用内存较大的对象 并且生命周期比较长的，不是频繁使用的）</p><p>问题：软引用可能会降低应用的运行效率与性能。比如：软引用指向的对象如果初始化很耗时，或者这个对象在进行使用的时候被第三方施加了我们未知的操作。</p><p>用处： 软引用在实际中有重要的应用，例如浏览器的后退按钮。按后退时，这个后退时显示的网页内容是重新进行请求还是从缓存中取出呢？这就要看具体的实现策略了。</p><p>（1）如果一个网页在浏览结束时就进行内容的回收，则按后退查看前面浏览过的页面时，需要重新构建</p><p>（2）如果将浏览过的网页存储到内存中会造成内存的大量浪费，甚至会造成内存溢出</p><p>3.弱引用</p><p>弱引用（Weak Reference）对象与软引用对象的最大不同就在于：GC在进行回收时，需要通过算法检查是否回收软引用对象，而对于Weak引用对象， GC总是进行回收。因此Weak引用对象会更容易、更快被GC回收</p><p>4.虚引用</p><p>也叫幽灵引用和幻影引用，为一个对象设置虚引用关联的唯一目的就是能在这个对象被回收时收到一<strong>个系统通知。也就是说,如果一个对象被设置上了一个虚引用,实际上跟没有设置引用没有</strong>任何的区别</p><p>一般不用，辅助咱们的Finaliza函数的使用</p></blockquote><h1 id="常量池分类" tabindex="-1">常量池分类： <a class="header-anchor" href="#常量池分类" aria-label="Permalink to &quot;常量池分类：&quot;">​</a></h1><h4 id="_1-静态常量池" tabindex="-1">1.静态常量池 <a class="header-anchor" href="#_1-静态常量池" aria-label="Permalink to &quot;1.静态常量池&quot;">​</a></h4><p>静态常量池是相对于运行时常量池来说的，属于描述class文件结构的一部分</p><p>由<strong>字面量</strong>和<strong>符号引用</strong>组成，在类被加载后会将静态常量池加载到内存中也就是运行时常量池</p><p><strong>字面量</strong> ：文本，字符串以及Final修饰的内容</p><p><strong>符号引用</strong> ：类，接口，方法，字段等相关的描述信息。</p><h4 id="_2-运行时常量池" tabindex="-1">2.运行时常量池 <a class="header-anchor" href="#_2-运行时常量池" aria-label="Permalink to &quot;2.运行时常量池&quot;">​</a></h4><p>当静态常量池被加载到内存后就会变成运行时常量池。</p><blockquote><p>也就是真正的把文件的内容落地到JVM内存了</p></blockquote><h4 id="_3-字符串常量池" tabindex="-1">3.字符串常量池 <a class="header-anchor" href="#_3-字符串常量池" aria-label="Permalink to &quot;3.字符串常量池&quot;">​</a></h4><p>**设计理念：**字符串作为最常用的数据类型，为减小内存的开销，专门为其开辟了一块内存区域（字符串常量池）用以存放。</p><p>JDK1.6及之前版本，字符串常量池是位于永久代（相当于现在的方法区）。</p><p>JDK1.7之后，字符串常量池位于Heap堆中</p><p><strong>面试常问点：（笔试居多）</strong></p><p>下列三种操作最多产生哪些对象</p><p><strong>1.直接赋值</strong></p><p><code>String a =&quot;aaaa&quot;;</code></p><p>解析：</p><p>最多创建一个字符串对象。</p><p>首先“aaaa”会被认为字面量，先在字符串常量池中查找（.equals()）,如果没有找到，在堆中创建“aaaa”字符串对象，并且将“aaaa”的引用维护到字符串常量池中（实际是一个hashTable结构，存放key-value结构数据），再返回该引用；如果在字符串常量池中已经存在“aaaa”的引用，直接返回该引用。</p><p><strong>2.new String()</strong></p><p><code>String a =new String(&quot;aaaa&quot;);</code></p><p>解析：</p><p>最多会创建两个对象。</p><p>首先“aaaa”会被认为字面量，先在字符串常量池中查找（.equals()）,如果没有找到，在字符串常量池中创建“aaaa”字符串对象，然后再在堆中创建一个“aaaa”对象，返回后面“aaaa”的引用； <strong>3.intern()</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">String s1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;yzt&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">String s2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> s1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">intern</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(s1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> s2); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//false</span></span></code></pre></div><p>解析：</p><p>String中的intern方法是一个 native 的方法，当调用 intern方法时，如果常量池已经包含一个等于此String对象的字符串（用equals(object)方法确定），则返回池中的字符串。否则，将intern返回的引用指向当前字符串 s1(jdk1.6版本需要将s1 复制到字符串常量池里)</p><p>常量池在内存中的布局：</p><p>![](file:///C:\\Users\\root\\AppData\\Local\\Temp\\ksohtml\\wps3C44.tmp.jpg)<img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1648646330029/05f6a433465e4d77b67c5817e3ab0381.png" alt="image.png" loading="lazy"></p><h1 id="_6-访问对象有哪几种方式" tabindex="-1">6.访问对象有哪几种方式 <a class="header-anchor" href="#_6-访问对象有哪几种方式" aria-label="Permalink to &quot;6.访问对象有哪几种方式&quot;">​</a></h1><p>句柄池访问：</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1649922126094/d57189bb02aa4488809eb602b1562793.png" alt="image.png" loading="lazy"></p><p>直接指针访问对象图解:</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1649922126094/e7f4267aee394abf9d7d99c52c1ee150.png" alt="image.png" loading="lazy"></p><p><strong>区别:</strong></p><p><strong>句柄池:</strong></p><p>使用句柄访问对象，会在堆中开辟一块内存作为句柄池，句柄中储存了对象实例数据(属性值结构体) 的内存地址，访问类型数据的内存地址(类信息，方法类型信息)，对象实例数据一般也在heap中开辟，类型数据一般储存在方法区中。</p><p><strong>优点</strong> :reference存储的是稳定的句柄地址，在对象被移动(垃圾收集时移动对象是非常普遍的行为) 时只会改变句柄中的实例数据指针，而reference本身不需要改变。</p><p><strong>缺点</strong> :增加了一次指针定位的时间开销。</p><p><strong>直接访问:</strong></p><p>直接指针访问方式指reference中直接储存对象在heap中的内存地址，但对应的类型数据访问地址需要 在实例中存储。</p><p><strong>优点</strong> :节省了一次指针定位的开销。</p><p><strong>缺点</strong> :在对象被移动时(如进行GC后的内存重新排列)，reference本身需要被修改</p><h1 id="_7-对象的生命周期可以描述一下吗" tabindex="-1">7.对象的生命周期可以描述一下吗 <a class="header-anchor" href="#_7-对象的生命周期可以描述一下吗" aria-label="Permalink to &quot;7.对象的生命周期可以描述一下吗&quot;">​</a></h1><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1650279430028/01c7a2f4dd3a4593bca61e1c89fc5d4b.png" alt="image.png" loading="lazy"></p><p><strong>创建阶段</strong></p><p>（1）为对象分配存储空间</p><p>（2）开始构造对象</p><p>（3）从超类到子类对static成员进行初始化</p><p>（4）超类成员变量按顺序初始化，递归调用超类的构造方法</p><p>（5）子类成员变量按顺序初始化，子类构造方法调用，并且一旦对象被创建，并被分派给某些变量赋值，这个对象的状态就切换到了应用阶段</p><p><strong>应用阶段</strong></p><p>（1）系统至少维护着对象的一个强引用（Strong Reference）</p><p>（2）所有对该对象的引用全部是强引用（除非我们显式地使用了：软引用（Soft Reference）、弱引用（Weak Reference）或虚引用（Phantom Reference））</p><p>finalize方法代码Demo：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Finalize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Finalize save_hook </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//类变量</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isAlive</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;我还活着&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> finalize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;finalize方法被执行&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Finalize.save_hook </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">throws</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> InterruptedException {</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        save_hook </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Finalize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//对象</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        //对象第一次拯救自己</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        save_hook </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        System.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">gc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        //暂停0.5秒等待他</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Thread.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sleep</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">500</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (save_hook </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            save_hook.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isAlive</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;好了，现在我死了&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        //对象第二次拯救自己</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        save_hook </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        System.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">gc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        //暂停0.5秒等待他</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Thread.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sleep</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">500</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (save_hook </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            save_hook.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isAlive</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;我终于死亡了&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>不可见阶段</strong></p><p>不可见阶段的对象在虚拟机的对象根引用集合中再也找不到直接或者间接的强引用，最常见的就是线程或者函数中的临时变量。程序不在持有对象的强引用。 （但是某些类的静态变量或者JNI是有可能持有的 ）</p><p><strong>不可达阶段</strong></p><p>指对象不再被任何强引用持有，GC发现该对象已经不可达。</p><h1 id="_8-你能聊一聊对象模型的对齐填充设计原因吗" tabindex="-1">8.你能聊一聊对象模型的对齐填充设计原因吗？ <a class="header-anchor" href="#_8-你能聊一聊对象模型的对齐填充设计原因吗" aria-label="Permalink to &quot;8.你能聊一聊对象模型的对齐填充设计原因吗？&quot;">​</a></h1><p>对齐填充的意义是 <strong>提高CPU访问数据的效率</strong> ，主要针对会存在<strong>该实例对象数据跨内存地址区域存储</strong>的情况。</p><p>例如：在没有对齐填充的情况下，内存地址存放情况如下:</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1649922126094/bc2b480aee764ef4b4157e1cfdc7dcea.png" alt="image.png" loading="lazy"></p><p>因为处理器只能0x00-0x07，0x08-0x0F这样读取数据，所以当我们想获取这个long型的数据时，处理 器必须要读两次内存，第一次(0x00-0x07)，第二次(0x08-0x0F)，然后将两次的结果才能获得真正的数值。</p><p>那么在有对齐填充的情况下，内存地址存放情况是这样的:</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1649922126094/2942966ff63844ecbeacb8433e57958e.png" alt="image.png" loading="lazy"></p><p>现在处理器只需要直接一次读取(0x08-0x0F)的内存地址就可以获得我们想要的数据了。</p><h1 id="_9-聊一聊对象的内存分配过程" tabindex="-1">9.聊一聊对象的内存分配过程 <a class="header-anchor" href="#_9-聊一聊对象的内存分配过程" aria-label="Permalink to &quot;9.聊一聊对象的内存分配过程&quot;">​</a></h1><p>一般情况下，新创建的对象都会被分配到Eden区，一些特殊的大的对象会直接分配到Old区。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>我是一个普通的Java对象,我出生在Eden区,在Eden区我还看到和我长的很像的小兄弟,我们在Eden区中玩了挺长时间。有一天Eden区中的人实在是太多了,我就被迫去了Survivor区的“From”区,自从去了Survivor区,我就开始漂了,有时候在Survivor的“From”区,有时候在Survivor的“To”区,居无定所。直到我18岁的时候,爸爸说我成人了,该去社会上闯闯了。于是我就去了年老代那边,年老代里,人很多,并且年龄都挺大的。</span></span></code></pre></div><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1649922126094/54d6dce4c3634dc0b44a136f68479771.png" alt="image.png" loading="lazy"></p><h1 id="_10-为什么需要两个survivor区" tabindex="-1">10.为什么需要两个Survivor区？ <a class="header-anchor" href="#_10-为什么需要两个survivor区" aria-label="Permalink to &quot;10.为什么需要两个Survivor区？&quot;">​</a></h1><p>最大的好处就是解决了碎片化。也就是说为什么一个Survivor区不行?第一部分中,我们知道了必须设置Survivor区。假设现在只有一个Survivor区,我们来模拟一下流程: 刚刚新建的对象在Eden中,一旦Eden满了,触发一次Minor GC,Eden中的存活对象就会被移动到Survivor区。这样继续循环下去,下一次Eden满了的时候,问题来了,此时进行Minor GC,Eden和Survivor各有一些存活对象,如果此时把Eden区的存活对象硬放到Survivor区,很明显这两部分对象所占有的内存是不连续的,也就导致了内存碎片化。 永远有一个Survivor space是空的,另一个非空的Survivor space无碎片。</p><h1 id="_11-堆内存中都是线程共享的区域吗" tabindex="-1">11.堆内存中都是线程共享的区域吗？ <a class="header-anchor" href="#_11-堆内存中都是线程共享的区域吗" aria-label="Permalink to &quot;11.堆内存中都是线程共享的区域吗？&quot;">​</a></h1><p>JVM默认为每个线程在Eden上开辟一个buffer区域，用来加速对象的分配，称之为TLAB，全称:Thread Local Allocation Buffer。 对象优先会在TLAB上分配，但是TLAB空间通常会比较小，如果对象比较大，那么还是在共享区域分配。</p><h1 id="_12-方法区与元数据区以及持久代到底是什么关系" tabindex="-1">12.方法区与元数据区以及持久代到底是什么关系 <a class="header-anchor" href="#_12-方法区与元数据区以及持久代到底是什么关系" aria-label="Permalink to &quot;12.方法区与元数据区以及持久代到底是什么关系&quot;">​</a></h1><p>规范与实现</p><h1 id="_13-栈帧结构是什么样子的" tabindex="-1">13.栈帧结构是什么样子的？<img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1693212117036/0402097113a44a68bf876b13aca3b4fe.png" alt="image.png" loading="lazy"> <a class="header-anchor" href="#_13-栈帧结构是什么样子的" aria-label="Permalink to &quot;13.栈帧结构是什么样子的？![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1463/1693212117036/0402097113a44a68bf876b13aca3b4fe.png)&quot;">​</a></h1><h1 id="_14-栈帧的动态链接怎么去聊" tabindex="-1">14.栈帧的动态链接怎么去聊 <a class="header-anchor" href="#_14-栈帧的动态链接怎么去聊" aria-label="Permalink to &quot;14.栈帧的动态链接怎么去聊&quot;">​</a></h1><p>动态链接是为了支持方法的动态调用过程 。</p><p>动态链接将这些符号方法引用转换为具体的方法引用</p><p>符号引用转变为直接引用 为了支持java的多态</p><p>void a(){</p><p>b();</p><p>}</p><p>void b(){</p><p>c();</p><p>}</p><p>void c(){</p><p>}</p>`,166),t=[l];function h(e,k,r,E,d,o){return i(),a("div",null,t)}const y=s(p,[["render",h]]);export{c as __pageData,y as default};
