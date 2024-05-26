import{_ as a,c as e,o as l,a4 as o}from"./chunks/framework.rIDq68an.js";const s="/assets/Pastedimage20231021205537.B4_HX5FO.png",t="/assets/Pastedimage20231021212540.dP1U6jEH.png",_=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.01-Java/JVM/01-类加载机制.md","filePath":"01-Dev/01.01-Java/JVM/01-类加载机制.md"}'),r={name:"01-Dev/01.01-Java/JVM/01-类加载机制.md"},i=o('<p>模拟计算机, 遵循的冯诺依曼计算机体系.对Class文件和语法进行了安全性相关的约束</p><p>对原理的掌握程度 线上遇到了OOM应该怎么办, fullGC频繁怎么办</p><p>G1的常规参数 4h8g 的初始线程数量应该是多少 maxModel 应该是多少</p><p>怎么把class文件交给JVM? 类加载机制: 其实就是读取文件, 最终的目的就是为了访问文件里的内容 操作</p><ol><li>拿到当前文件地址和名称</li><li>IO读取到内存中</li></ol><p>JVM的结构</p><ul><li>堆 (存储对象)</li><li>栈 (先进后出 压!)</li><li>方法区</li><li>本地缓存</li></ul><p>字节码文件 怎么加载到内存中? 1. 本地系统 2. 网络系统 3. 压缩文件 zip 后续演进成了 jar war包 4. 专有数据库的方式去提取class文件, 5. 将java文件动态的去编译成class文件 6. 加密文件中去读取class</p><h2 id="什么是类加载机制" tabindex="-1">什么是类加载机制? <a class="header-anchor" href="#什么是类加载机制" aria-label="Permalink to &quot;什么是类加载机制?&quot;">​</a></h2><blockquote><p>Loading,Linking and initializing 加载 链接 初始化 (取自JDK官方文档)</p></blockquote><p>一个类的完整声明周期 <img src="'+s+'" alt="Pastedimage20231021205537.png" loading="lazy"></p><h4 id="jvm是如何实现-装载的" tabindex="-1">JVM是如何实现 装载的 <a class="header-anchor" href="#jvm是如何实现-装载的" aria-label="Permalink to &quot;JVM是如何实现  装载的&quot;">​</a></h4><blockquote><p>JVM为什么是虚拟机, 它既然叫虚拟机 就说明 它也是 &quot;机&quot; 那么 JVM 就一定也会有 输入(读取class文件) 输出(交给JVM进行run) 计算 存储 这些过程 以及功能或者叫能力.<br> 这就是运行时 数据区</p></blockquote><ol><li>毫无疑问, 肯定是通过IO流 ,那么到底是字符流还是字节流呢. 答案是后者</li><li>ClassLoader : 通过类的全限定类名 获取这个类的 字节流, 类加载器 不属于 JVM的内部模块, 这个是外部模块</li><li>通过引用去操作对象, 通过对象 去操作相应的数据</li><li>在Java 堆 内存中, 去生成一个 对应的对象, 作为方法区的数据访问入口 (这样子 才算加载完成) <img src="'+t+'" alt="Pastedimage20231021212540.png" loading="lazy"></li></ol><ul><li>运行时数据区</li></ul><h2 id="链接" tabindex="-1">链接 <a class="header-anchor" href="#链接" aria-label="Permalink to &quot;链接&quot;">​</a></h2><h4 id="jvm是如何实现-验证的" tabindex="-1">JVM是如何实现 验证的 <a class="header-anchor" href="#jvm是如何实现-验证的" aria-label="Permalink to &quot;JVM是如何实现  验证的&quot;">​</a></h4><p>文件格式验证 字节流是否符合Class的规范, 要可以被当前版本虚拟机处理并解析 在字节流转换成方法区运行时数据 之前的操作 Java文件的魔术 是否 是kafebabe 开头, 以及Java编译版本 能否和JVM版本对应的上 元数据验证 对于Java 语法的验证, 保证安全性和健壮性 字节码验证 数据流以及控制流的分析,比较复杂, 运行时检查, 栈内存的数据类型和操作码 是否与操作参数符合 符号引用验证 将符号引用转换成直接引用 常量池 访问方法和类是否有权限,</p><h4 id="vm是如何实现-准备的" tabindex="-1">VM是如何实现 准备的 <a class="header-anchor" href="#vm是如何实现-准备的" aria-label="Permalink to &quot;VM是如何实现  准备的&quot;">​</a></h4><ol><li>为类的静态变量分配内存,并且设置默认值 (非原子的)</li><li>准备阶段 是给 默认值的 int = 1; 在准备阶段 他是0 赋值的时候是在 class init时候执行的</li><li>final 修饰的 不在这里, 是在编译的时候就已经分配好了.</li><li>实例变量也不在这个地方, 是在对象分配的时候, 一起分配到堆内存当中的</li></ol><h4 id="jvm是如何实现-解析的" tabindex="-1">JVM是如何实现 解析的 <a class="header-anchor" href="#jvm是如何实现-解析的" aria-label="Permalink to &quot;JVM是如何实现  解析的&quot;">​</a></h4><p>符号引用转换成直接引用</p><blockquote><p>字面上的引用关系 转换成 直接指向 对象的内存</p></blockquote><p>同一个符号引用 可能会有多个解析的需求, 所以 JVM 会有一个缓存</p><p>虚拟机 可以对 任意一个指令的第一次执行 进行缓存</p><h2 id="初始化" tabindex="-1">初始化 <a class="header-anchor" href="#初始化" aria-label="Permalink to &quot;初始化&quot;">​</a></h2><p>如何初始化的?</p><blockquote><p>执行 类的 构造方法. 准备阶段 设置的默认值, 在此时 构造方法的阶段, 才会吧 你代码中 给的值 替换掉默认值 声明类变量 为指定的初始值 静态代码块为类变量去赋值</p></blockquote><p>这里就会有一个问题, 你的 初始化静态代码块 和 类变量, 有先后顺序的执行问题, 顺序搞错了 业务赋值会有问题</p><p>所以 静态变量一定要写在静态代码块前面 不然 可能会有问题</p><h2 id="卸载" tabindex="-1">卸载 <a class="header-anchor" href="#卸载" aria-label="Permalink to &quot;卸载&quot;">​</a></h2><p>当这个类没有任何实例的时候, 就会被卸载 加载这个类的ClassLoader 已经被回收</p><h2 id="类加载器" tabindex="-1">类加载器 <a class="header-anchor" href="#类加载器" aria-label="Permalink to &quot;类加载器&quot;">​</a></h2><blockquote><p>为了安全起见, 防止篡改</p></blockquote><ol><li><strong>Bootstrap ClassLoader</strong> 负责加载 Java_HOME 中 jre/lib.rt.jar 下的所有 class 或 XbootClassoath 选项指定的jar包. <code>是C++ 实现的 不是ClassLoder的子类</code></li><li><strong>Extension ClassLoder</strong> 负责加载 Java平台中拓展功能的一些Jar包, 包括但不限于 Java_home中 jre/lib/*.jar 或者 -Djava.ext.dirs指定目录下的jar包</li><li><strong>App ClassLoder</strong> 负责加载 classPath中指定的jar包及-Djava.class.path 所指定目录下的类和jar包.</li><li><strong>Custom ClassLoder</strong> 通过Java.lang.ClassLoder的子类自定义加载class, 属于应用程序根据自身需要自定义的ClassLoder,如Tomcat,Jboos,都会根据j2ee规范自行实现ClassLoder</li></ol><p>当我们get BootstrapClassLoder时 是get不到的, 因为他是c++实现的, 所以打印的是个null</p><h3 id="三大特性" tabindex="-1">三大特性 <a class="header-anchor" href="#三大特性" aria-label="Permalink to &quot;三大特性&quot;">​</a></h3><h3 id="全盘委托" tabindex="-1">全盘委托 <a class="header-anchor" href="#全盘委托" aria-label="Permalink to &quot;全盘委托&quot;">​</a></h3><p>当加载一个Class 的时候, 这个class 所依赖的其他class 也由当前的ClassLoader进行加载, 除非进行了特别的指定说明 某一个class需要用xxxClassLoder进行加载 类加载的入口 就是当前类 然后向上找 走双亲委派</p><h3 id="双亲委派-不是强制模型-是可以进行打破的" tabindex="-1">双亲委派(不是强制模型,是可以进行打破的) <a class="header-anchor" href="#双亲委派-不是强制模型-是可以进行打破的" aria-label="Permalink to &quot;双亲委派(不是强制模型,是可以进行打破的)&quot;">​</a></h3><p>举个例子, 子类 优先向上找父类进行加载, 父类在向父类找, 如果都没有 依次返回 进行加载 当前ClassLoder 判断这个class 是否已经加载, 如果已经加载过, 就返回,如果没有就委托父类进行加载</p><h3 id="缓存机制" tabindex="-1">缓存机制 <a class="header-anchor" href="#缓存机制" aria-label="Permalink to &quot;缓存机制&quot;">​</a></h3><p>所有已经加载过的class 都会进行缓存到<code>直接内存</code></p><h2 id="字节码增强机制" tabindex="-1">字节码增强机制 <a class="header-anchor" href="#字节码增强机制" aria-label="Permalink to &quot;字节码增强机制&quot;">​</a></h2><h3 id="javaagent" tabindex="-1">JavaAgent <a class="header-anchor" href="#javaagent" aria-label="Permalink to &quot;JavaAgent&quot;">​</a></h3><h3 id="aop" tabindex="-1">AOP ? <a class="header-anchor" href="#aop" aria-label="Permalink to &quot;AOP ?&quot;">​</a></h3><p>类的声明周期</p><p>不同的类加载器中, 是允许 同全限定类名 的多个类 存在的 这个是怎么做到的?</p><p>通过类加载器来实现的 SystemClassLoader ExtClassLoader</p><p>OSGI 根据类加载器去实现热部署</p>',50),n=[i];function d(h,c,p,u,b,m){return l(),e("div",null,n)}const J=a(r,[["render",d]]);export{_ as __pageData,J as default};
