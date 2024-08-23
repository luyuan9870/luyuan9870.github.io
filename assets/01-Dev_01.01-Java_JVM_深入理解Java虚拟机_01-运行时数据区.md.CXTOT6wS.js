import{_ as a,c as l,o as i,a4 as e}from"./chunks/framework.BG61BEI0.js";const t="/assets/image-20240611150909608.fkjHyw-z.png",o="/assets/Pastedimage20231022104523.Y1LhhQTC.png",g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.01-Java/JVM/深入理解Java虚拟机/01-运行时数据区.md","filePath":"01-Dev/01.01-Java/JVM/深入理解Java虚拟机/01-运行时数据区.md"}'),r={name:"01-Dev/01.01-Java/JVM/深入理解Java虚拟机/01-运行时数据区.md"},p=e('<p>JVM 是一个抽象的物理机, 是遵循了冯诺依曼的计算机模型结构的</p><p><strong>程序员需要关注的，其实就是堆栈内存。针对计数器，常量池、方法区和直接内存这些地方相对几乎没有任何改动。</strong></p><p><strong>运行时数据区的模型分布</strong><img src="'+t+'" alt="" loading="lazy"></p><p>针对 JVM 的组成模型主要分为以下几大模块。</p><ul><li>堆内存</li><li>栈内存</li><li>方法区</li><li>程序计数器</li><li>运行时数据区</li><li>执行引擎</li><li>本地库接口</li><li>本地方法库</li></ul><h2 id="程序计数器" tabindex="-1">程序计数器 <a class="header-anchor" href="#程序计数器" aria-label="Permalink to &quot;程序计数器&quot;">​</a></h2><p>程序计数器占的内存很小 简单理解成针对当前这个线程，需要执行哪些代码。 通过改变程序计数器的值来选择后续执行的字节码指令。 CPU 在进行调度和上下文切换之后，需要记录你当前这个线程执行到哪里了，恢复这个线程并且让他继续执行。 <strong>所以程序计数器是跟着线程的生命周期走的，所以程序计数器是线程私有的。</strong> 如果执行的是 Native 方法这个程序计数器的值则是空的。 在程序计数器的内存区域中，是不会发生任何 OOM 的情况。（<strong>JVM 保证的</strong>）</p><p>用来 CPU 调度到当前线程时, 记录执行到哪里从哪里继续执行的东西</p><blockquote><p>程序计数器，并不是说我当前这个线程，执行了多少次的一个计数器。 而是针对当前线程，执行到哪儿了，下一步应该执行那块，主要是针对各种流程，例如自上而下、循环、分支。 由于是线程的计数器，侧面反映出程序计数器是线程私有的。</p></blockquote><h2 id="虚拟机栈" tabindex="-1">虚拟机栈 <a class="header-anchor" href="#虚拟机栈" aria-label="Permalink to &quot;虚拟机栈&quot;">​</a></h2><p>Java 虚拟机栈，与计数器相同，是针对当前线程的。他的生命周期跟着线程走的。</p><p>作用： 描述的是 Java 方法执行的线程内存模型，每个方法被执行的时候。 虚拟机都会同步的创建一个栈帧，用于存储局部变量表、操作数栈、动态链接、方法出入口、对象引用等信息。 每一个方法被调用直至执行完毕的过程，就对应这样一个栈帧在虚拟机中入栈到出栈的过程。（压栈和弹栈）</p><p>举个栗子： main 方法调用了 A 类里面的 A 1 方法, 此时 A 1 就会先被压入栈 （位置为 1），A 1 里面需要调用 B 类的 B 1 方法，然后 B 1 的方法也会被压入栈（位置为 2），当 B 1 方法执行完，位置为 2 的信息，就会弹栈，然后再回去执行 A 1。</p><p>在举个栗子： Main 方法中调用了 A 类的 A 1 方法，此时 A 1 方法就会先被压入栈，A 1 方法中调用了 B 类的方法 B 1，B 1 中需要创建一个对象，那么这个 B 1 方法就会先入栈，到栈 2 的位置，其中 B 2 方法创建的对象就会在栈帧的栈 3 位置。</p><h3 id="局部变量表" tabindex="-1">局部变量表 <a class="header-anchor" href="#局部变量表" aria-label="Permalink to &quot;局部变量表&quot;">​</a></h3><p><strong>是什么：</strong> 局部变量表中存储了编译时可见的 Java 基本数据类型、以及对象的引用（Refresh 类型，它并不是对象的本身，而是指向了堆内存中的对象的一个引用地址的指针。 也可能是指向了一个代表对象的句柄或者说是和这个对象相关联的一个位置信息。） 和 ReturnAddress 类型（指向了另一个字节码指令的地址）</p><p><strong>原理：</strong> 这些数据类型，在局部变量表中采用的是 slot 来进行表示。一个 slot 槽占用多大，根据 JVM 的类型来决定。</p><h3 id="本地方法栈" tabindex="-1">本地方法栈 <a class="header-anchor" href="#本地方法栈" aria-label="Permalink to &quot;本地方法栈&quot;">​</a></h3><p>本地方法栈是用于 JVM 使用一些本地方法而存在的，通过本地方法栈可以调用到 C、C++的语言。像 unsefe 中的 compareAndSwap 方法就是通过 native 来调用本地方法栈的</p><p><strong>特点：</strong> 先进后出的数据结构，简单理解成子弹上膛</p><h2 id="堆内存" tabindex="-1">堆内存 <a class="header-anchor" href="#堆内存" aria-label="Permalink to &quot;堆内存&quot;">​</a></h2><blockquote><p>堆内存是 JVM 所耗内存最大的一块内存区域，面向的是所有线程。并且 Java 运行时绝大多数的对象创建实例，都会被放在堆内存中。 因为内存逃逸、即时编译的问题，栈上分配和标量替换的手段，才优化了一些堆内存。</p></blockquote><p><strong>方法区+堆 = JVM 运行时数据区的主存</strong></p><p>因为堆内存的特性，是存放所有的对象实例，并且面向所有的线程。所以它可以有针对每一个线程的对象分配缓存，用来提高对象分配时的效率。</p><p>堆内存在物理内存上可以是无序的，但是在逻辑上，它应该被视为有序的。</p><p>堆内存是可以被扩展的，通过 -Xmx (最大能用多少内存) -Xms (启动时给多少内存) 来实现</p><p>堆内存也是线程共享的, 堆内存也是 JVM 启动的时候创建的. 存储的是对象实例以及数组 内存不够也会抛出 OOM</p><h3 id="堆内存的布局" tabindex="-1">堆内存的布局 <a class="header-anchor" href="#堆内存的布局" aria-label="Permalink to &quot;堆内存的布局&quot;">​</a></h3><p><img src="'+o+'" alt="" loading="lazy"></p><h2 id="方法区" tabindex="-1">方法区 <a class="header-anchor" href="#方法区" aria-label="Permalink to &quot;方法区&quot;">​</a></h2><blockquote><p>逻辑上是属于堆内存的一部分, 也有人管方法区叫做非堆内存</p></blockquote><p><strong>hotspot 使用永久代来实现方法数据区不是一个好想法</strong> ，因为这样会导致 Java 更容易出现内存溢出的情况，通过-XX （MaxPermSize）设置上限</p><p>主要作用： 针对常量池的回收和类型卸载。</p><ol><li>方法是线程共享的, 方法区在JVM启动的时候创建 (跟JVM的进程进行绑定 可以理解成JVM的守护进程)</li><li>存储 类的结构信息/常量池/字段和方法的元数据/还有一些结构方法</li><li>如果内存不够用, JVM会抛出OOM</li></ol><p>元数据区</p><h2 id="运行时常量池" tabindex="-1">运行时常量池 <a class="header-anchor" href="#运行时常量池" aria-label="Permalink to &quot;运行时常量池&quot;">​</a></h2><p>归属于方法区的一部分，类除了有接口方法字段等信息以外，还有字面量和符号引用，当对象加载到 JVM 中，会存放到方法区的运行时常量池里。 常量池内存不够用也会 OOM</p><h2 id="直接内存" tabindex="-1">直接内存 <a class="header-anchor" href="#直接内存" aria-label="Permalink to &quot;直接内存&quot;">​</a></h2><p>介于 JVM 之外的内存，也会 OOM</p><p>线程想获取CPU的执行权, 抢占CPU的时间片 (由CPU分配的 CPU内部的线程调度机制)</p><p>============== 线程私有的================</p><p>栈内存 特点: 先进后出 压栈帧(子弹上膛) Java虚拟机栈 本地方法栈 栈溢出异常</p><p>程序计数器</p><p>对象头实例数据的对其填充 CPU 取数据取的是16KB数据,</p><p>堆内存以外 是堆内存布局</p><p>JVM的内存布局清楚了, 能聊的有什么呢?</p><ul><li>当前执行的方法是Native的, 那么Java虚拟机栈 是怎么调用的本地方法栈? <ul><li>动态链接 <ul><li>为了支持方法调用过程中, 动态的调用过程.</li><li>动态链接 是为了 把 符号方法引用转换成直接方法引用</li><li>符号引用转换成直接引用. (类的加载机制时 有类似的功能)</li><li>A调用B调用C调用D的链路</li></ul></li><li>每个方法的调用, 都是一个栈帧 <ul><li>每一个栈帧都有的操作 (栈帧信息) <ul><li>局部变量表 <ul><li>存放局部变量,方法的内容 变量</li></ul></li><li>操作数栈</li><li>动态链接</li><li>返回地址</li><li>附加信息</li></ul></li></ul></li></ul></li></ul><p>内存逃逸分析 没有内存逃逸则进行栈上分配</p>',48),s=[p];function n(h,c,d,u,_,J){return i(),l("div",null,s)}const M=a(r,[["render",n]]);export{g as __pageData,M as default};
