import{_ as n,c as s,o as a,a4 as p}from"./chunks/framework.BG61BEI0.js";const b=JSON.parse('{"title":"并发编程","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.01-Java/JUC/01-并发编程/并发编程-01.md","filePath":"01-Dev/01.01-Java/JUC/01-并发编程/并发编程-01.md"}'),e={name:"01-Dev/01.01-Java/JUC/01-并发编程/并发编程-01.md"},l=p(`<h1 id="并发编程" tabindex="-1">并发编程 <a class="header-anchor" href="#并发编程" aria-label="Permalink to &quot;并发编程&quot;">​</a></h1><h1 id="一、线程的基础概念" tabindex="-1">一、<strong>线程的基础概念</strong> <a class="header-anchor" href="#一、线程的基础概念" aria-label="Permalink to &quot;一、**线程的基础概念**&quot;">​</a></h1><h3 id="一、基础概念" tabindex="-1">一、<strong>基础概念</strong> <a class="header-anchor" href="#一、基础概念" aria-label="Permalink to &quot;一、**基础概念**&quot;">​</a></h3><h4 id="_1-1-进程与线程" tabindex="-1">1.1 进程与线程 <a class="header-anchor" href="#_1-1-进程与线程" aria-label="Permalink to &quot;1.1 进程与线程&quot;">​</a></h4><p>什么是进程？</p><p><strong>进程是指运行中的程序。 比如我们使用钉钉，浏览器，需要启动这个程序，操作系统会给这个程序分配一定的资源（占用内存资源）。</strong></p><p>什么线程？</p><p><strong>线程是CPU调度的基本单位，每个线程执行的都是某一个进程的代码的某个片段。</strong></p><p>举个栗子：房子与人</p><p>比如现在有一个100平的房子，这个方式可以看做是一个进程</p><p>房子里有人，人就可以看做成一个线程。</p><p>人在房子中做一个事情，比如吃饭，学习，睡觉。这个就好像线程在执行某个功能的代码。</p><p>所谓进程就是线程的容器，需要线程利用进程中的一些资源，处理一个代码、指令。最终实现进程锁预期的结果。</p><p>进程和线程的区别：</p><ul><li><p>根本不同：进程是操作系统分配的资源，而线程是CPU调度的基本单位。</p></li><li><p>资源方面：同一个进程下的线程共享进程中的一些资源。线程同时拥有自身的独立存储空间。进程之间的资源通常是独立的。</p></li><li><p>数量不同：进程一般指的就是一个进程。而线程是依附于某个进程的，而且一个进程中至少会有一个或多个线程。</p></li><li><p>开销不同：毕竟进程和线程不是一个级别的内容，线程的创建和终止的时间是比较短的。而且线程之间的切换比进程之间的切换速度要快很多。而且进程之间的通讯很麻烦，一般要借助内核才可以实现，而线程之间通讯，相当方面。</p></li><li><p>………………</p></li></ul><h4 id="_1-2-多线程" tabindex="-1">1.2 多线程 <a class="header-anchor" href="#_1-2-多线程" aria-label="Permalink to &quot;1.2 多线程&quot;">​</a></h4><p>什么是多线程？</p><p>多线程是指：<strong>单个进程中同时运行多个线程。</strong></p><p>多线程的不低是为了提高CPU的利用率。</p><p>可以通过避免一些网络IO或者磁盘IO等需要等待的操作，让CPU去调度其他线程。</p><p>这样可以大幅度的提升程序的效率，提高用户的体验。</p><p>比如Tomcat可以做并行处理，提升处理的效率，而不是一个一个排队。</p><p>不如要处理一个网络等待的操作，开启一个线程去处理需要网络等待的任务，让当前业务线程可以继续往下执行逻辑，效率是可以得到大幅度提升的。</p><p>多线程的局限</p><ul><li><p>如果线程数量特别多，CPU在切换线程上下文时，会额外造成很大的消耗。</p></li><li><p>任务的拆分需要依赖业务场景，有一些异构化的任务，很难对任务拆分，还有很多业务并不是多线程处理更好。</p></li><li><p><strong>线程安全问题</strong>：虽然多线程带来了一定的性能提升，但是再做一些操作时，多线程如果操作临界资源，可能会发生一些数据不一致的安全问题，甚至涉及到锁操作时，会造成死锁问题。</p></li></ul><h4 id="_1-3-串行、并行、并发" tabindex="-1">1.3 串行、并行、并发 <a class="header-anchor" href="#_1-3-串行、并行、并发" aria-label="Permalink to &quot;1.3 串行、并行、并发&quot;">​</a></h4><p>什么是串行：</p><p>串行就是一个一个排队，第一个做完，第二个才能上。</p><p>什么是并行：</p><p>并行就是同时处理。（一起上！！！）</p><p>什么是并发：</p><p>这里的并发并不是三高中的高并发问题，这里是多线程中的并发概念（CPU调度线程的概念）。CPU在极短的时间内，反复切换执行不同的线程，看似好像是并行，但是知识CPU高速的切换。</p><p>并行囊括并发。</p><p>并行就是多核CPU同时调度多个线程，是真正的多个线程同时执行。</p><p>单核CPU无法实现并行效果，单核CPU是并发。</p><h4 id="_1-4-同步异步、阻塞非阻塞" tabindex="-1">1.4 同步异步、阻塞非阻塞 <a class="header-anchor" href="#_1-4-同步异步、阻塞非阻塞" aria-label="Permalink to &quot;1.4 同步异步、阻塞非阻塞&quot;">​</a></h4><p>同步与异步：执行某个功能后，被调用者是否会<strong>主动反馈</strong>信息</p><p>阻塞和非阻塞：执行某个功能后，调用者是否需要<strong>一直等待结果</strong>的反馈。</p><p>两个概念看似相似，但是侧重点是完全不一样的。</p><p><strong>同步阻塞</strong>：比如用锅烧水，水开后，不会主动通知你。烧水开始执行后，需要一直等待水烧开。</p><p><strong>同步非阻塞</strong>：比如用锅烧水，水开后，不会主动通知你。烧水开始执行后，不需要一直等待水烧开，可以去执行其他功能，但是需要时不时的查看水开了没。</p><p><strong>异步阻塞</strong>：比如用水壶烧水，水开后，会主动通知你水烧开了。烧水开始执行后，需要一直等待水烧开。</p><p><strong>异步非阻塞</strong>：比如用水壶烧水，水开后，会主动通知你水烧开了。烧水开始执行后，不需要一直等待水烧开，可以去执行其他功能。</p><p>异步非阻塞这个效果是最好的，平时开发时，提升效率最好的方式就是采用异步非阻塞的方式处理一些多线程的任务。</p><h3 id="二、线程的创建" tabindex="-1">二、<strong>线程的创建</strong> <a class="header-anchor" href="#二、线程的创建" aria-label="Permalink to &quot;二、**线程的创建**&quot;">​</a></h3><p>线程的创建分为三种方式：</p><h4 id="_2-1-继承thread类-重写run方法" tabindex="-1">2.1 继承Thread类 重写run方法 <a class="header-anchor" href="#_2-1-继承thread类-重写run方法" aria-label="Permalink to &quot;2.1 继承Thread类 重写run方法&quot;">​</a></h4><p>启动线程是调用start方法，这样会创建一个新的线程，并执行线程的任务。</p><p>如果直接调用run方法，这样会让当前线程执行run方法中的业务逻辑。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class MiTest {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        MyJob t1 = new MyJob();</span></span>
<span class="line"><span>        t1.start();</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 100; i++) {</span></span>
<span class="line"><span>            System.out.println(&quot;main:&quot; + i);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>class MyJob extends Thread{</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void run() {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 100; i++) {</span></span>
<span class="line"><span>            System.out.println(&quot;MyJob:&quot; + i);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-2-实现runnable接口-重写run方法" tabindex="-1">2.2 实现Runnable接口 重写run方法 <a class="header-anchor" href="#_2-2-实现runnable接口-重写run方法" aria-label="Permalink to &quot;2.2 实现Runnable接口 重写run方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class MiTest {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        MyRunnable myRunnable = new MyRunnable();</span></span>
<span class="line"><span>        Thread t1 = new Thread(myRunnable);</span></span>
<span class="line"><span>        t1.start();</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 1000; i++) {</span></span>
<span class="line"><span>            System.out.println(&quot;main:&quot; + i);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class MyRunnable implements Runnable{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void run() {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 1000; i++) {</span></span>
<span class="line"><span>            System.out.println(&quot;MyRunnable:&quot; + i);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>最常用的方式：</p><ul><li>匿名内部类方式：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Thread t1 = new Thread(new Runnable() {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void run() {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 1000; i++) {</span></span>
<span class="line"><span>            System.out.println(&quot;匿名内部类:&quot; + i);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div><ul><li>lambda方式：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Thread t2 = new Thread(() -&gt; {</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 100; i++) {</span></span>
<span class="line"><span>        System.out.println(&quot;lambda:&quot; + i);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div><h4 id="_2-3-实现callable-重写call方法-配合futuretask" tabindex="-1">2.3 实现Callable 重写call方法，配合FutureTask <a class="header-anchor" href="#_2-3-实现callable-重写call方法-配合futuretask" aria-label="Permalink to &quot;2.3 实现Callable 重写call方法，配合FutureTask&quot;">​</a></h4><p>Callable一般用于有返回结果的非阻塞的执行方法</p><p>同步非阻塞。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class MiTest {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) throws ExecutionException, InterruptedException {</span></span>
<span class="line"><span>        //1. 创建MyCallable</span></span>
<span class="line"><span>        MyCallable myCallable = new MyCallable();</span></span>
<span class="line"><span>        //2. 创建FutureTask，传入Callable</span></span>
<span class="line"><span>        FutureTask futureTask = new FutureTask(myCallable);</span></span>
<span class="line"><span>        //3. 创建Thread线程</span></span>
<span class="line"><span>        Thread t1 = new Thread(futureTask);</span></span>
<span class="line"><span>        //4. 启动线程</span></span>
<span class="line"><span>        t1.start();</span></span>
<span class="line"><span>        //5. 做一些操作</span></span>
<span class="line"><span>        //6. 要结果</span></span>
<span class="line"><span>        Object count = futureTask.get();</span></span>
<span class="line"><span>        System.out.println(&quot;总和为：&quot; + count);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class MyCallable implements Callable{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Object call() throws Exception {</span></span>
<span class="line"><span>        int count = 0;</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 100; i++) {</span></span>
<span class="line"><span>            count += i;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return count;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="二、线程的使用" tabindex="-1"><strong>二、线程的使用</strong> <a class="header-anchor" href="#二、线程的使用" aria-label="Permalink to &quot;**二、线程的使用**&quot;">​</a></h3><h4 id="_2-1-线程的状态" tabindex="-1">2.1 线程的状态 <a class="header-anchor" href="#_2-1-线程的状态" aria-label="Permalink to &quot;2.1 线程的状态&quot;">​</a></h4><p>网上对线程状态的描述很多，有5种，6种，7种，都可以接受</p><p>5中状态一般是针对传统的线程状态来说</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/b802326396694bd8a4e17ab21a04d348.png" alt="" loading="lazy"></p><p>Java中给线程准备的6种状态</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/558ee9b72713409c8d9486410aa0074e.png" alt="" loading="lazy"></p><p>NEW：Thread对象被创建出来了，但是还没有执行start方法。</p><p>RUNNABLE：Thread对象调用了start方法，就为RUNNABLE状态（CPU调度/没有调度）</p><p>BLOCKED、WAITING、TIME_WAITING：都可以理解为是阻塞、等待状态，因为处在这三种状态下，CPU不会调度当前线程</p><p>BLOCKED：synchronized没有拿到同步锁，被阻塞的情况</p><p>WAITING：调用wait方法就会处于WAITING状态，需要被手动唤醒</p><p>TIME_WAITING：调用sleep方法或者join方法，会被自动唤醒，无需手动唤醒</p><p>TERMINATED：run方法执行完毕，线程生命周期到头了</p><p>在Java代码中验证一下效果</p><p>NEW：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    System.out.println(t1.getState());</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>RUNNABLE：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        while(true){</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    Thread.sleep(500);</span></span>
<span class="line"><span>    System.out.println(t1.getState());</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>BLOCKED：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Object obj = new Object();</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        // t1线程拿不到锁资源，导致变为BLOCKED状态</span></span>
<span class="line"><span>        synchronized (obj){</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    // main线程拿到obj的锁资源</span></span>
<span class="line"><span>    synchronized (obj) {</span></span>
<span class="line"><span>        t1.start();</span></span>
<span class="line"><span>        Thread.sleep(500);</span></span>
<span class="line"><span>        System.out.println(t1.getState());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>WAITING：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Object obj = new Object();</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        synchronized (obj){</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                obj.wait();</span></span>
<span class="line"><span>            } catch (InterruptedException e) {</span></span>
<span class="line"><span>                e.printStackTrace();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    Thread.sleep(500);</span></span>
<span class="line"><span>    System.out.println(t1.getState());</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>TIMED_WAITING：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Thread.sleep(1000);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    Thread.sleep(500);</span></span>
<span class="line"><span>    System.out.println(t1.getState());</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>TERMINATED：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Thread.sleep(500);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    Thread.sleep(1000);</span></span>
<span class="line"><span>    System.out.println(t1.getState());</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-2-线程的常用方法" tabindex="-1">3.2 线程的常用方法 <a class="header-anchor" href="#_3-2-线程的常用方法" aria-label="Permalink to &quot;3.2 线程的常用方法&quot;">​</a></h4><h5 id="_3-2-1-获取当前线程" tabindex="-1">3.2.1 获取当前线程 <a class="header-anchor" href="#_3-2-1-获取当前线程" aria-label="Permalink to &quot;3.2.1 获取当前线程&quot;">​</a></h5><p>Thread的静态方法获取当前线程对象</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws ExecutionException, InterruptedException {</span></span>
<span class="line"><span>	// 获取当前线程的方法</span></span>
<span class="line"><span>    Thread main = Thread.currentThread();</span></span>
<span class="line"><span>    System.out.println(main);</span></span>
<span class="line"><span>    // &quot;Thread[&quot; + getName() + &quot;,&quot; + getPriority() + &quot;,&quot; +  group.getName() + &quot;]&quot;;</span></span>
<span class="line"><span>    // Thread[main,5,main]</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="_3-2-2-线程的名字" tabindex="-1">3.2.2 线程的名字 <a class="header-anchor" href="#_3-2-2-线程的名字" aria-label="Permalink to &quot;3.2.2 线程的名字&quot;">​</a></h5><p>在构建Thread对象完毕后，一定要设置一个有意义的名称，方面后期排查错误</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws ExecutionException, InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(Thread.currentThread().getName());</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.setName(&quot;模块-功能-计数器&quot;);</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="_3-2-3-线程的优先级" tabindex="-1">3.2.3 线程的优先级 <a class="header-anchor" href="#_3-2-3-线程的优先级" aria-label="Permalink to &quot;3.2.3 线程的优先级&quot;">​</a></h5><p>其实就是CPU调度线程的优先级、</p><p>java中给线程设置的优先级别有10个级别，从1~10任取一个整数。</p><p>如果超出这个范围，会排除参数异常的错误</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws ExecutionException, InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 1000; i++) {</span></span>
<span class="line"><span>            System.out.println(&quot;t1:&quot; + i);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    Thread t2 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 1000; i++) {</span></span>
<span class="line"><span>            System.out.println(&quot;t2:&quot; + i);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.setPriority(1);</span></span>
<span class="line"><span>    t2.setPriority(10);</span></span>
<span class="line"><span>    t2.start();</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="_3-2-4-线程的让步" tabindex="-1">3.2.4 线程的让步 <a class="header-anchor" href="#_3-2-4-线程的让步" aria-label="Permalink to &quot;3.2.4 线程的让步&quot;">​</a></h5><p>可以通过Thread的静态方法yield，让当前线程从运行状态转变为就绪状态。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws ExecutionException, InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 100; i++) {</span></span>
<span class="line"><span>            if(i == 50){</span></span>
<span class="line"><span>                Thread.yield();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            System.out.println(&quot;t1:&quot; + i);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    Thread t2 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 100; i++) {</span></span>
<span class="line"><span>            System.out.println(&quot;t2:&quot; + i);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t2.start();</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="_3-2-5-线程的休眠" tabindex="-1">3.2.5 线程的休眠 <a class="header-anchor" href="#_3-2-5-线程的休眠" aria-label="Permalink to &quot;3.2.5 线程的休眠&quot;">​</a></h5><p>Thread的静态方法，让线程从运行状态转变为等待状态</p><p>sleep有两个方法重载：</p><ul><li><p>第一个就是native修饰的，让线程转为等待状态的效果</p></li><li><p>第二个是可以传入毫秒和一个纳秒的方法（如果纳秒值大于等于0.5毫秒，就给休眠的毫秒值+1。如果传入的毫秒值是0，纳秒值不为0，就休眠1毫秒）</p></li></ul><p>sleep会抛出一个InterruptedException</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    System.out.println(System.currentTimeMillis());</span></span>
<span class="line"><span>    Thread.sleep(1000);</span></span>
<span class="line"><span>    System.out.println(System.currentTimeMillis());</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="_3-2-6-线程的强占" tabindex="-1">3.2.6 线程的强占 <a class="header-anchor" href="#_3-2-6-线程的强占" aria-label="Permalink to &quot;3.2.6 线程的强占&quot;">​</a></h5><p>Thread的非静态方法join方法</p><p>需要在某一个线程下去调用这个方法</p><p>如果在main线程中调用了t1.join()，那么main线程会进入到等待状态，需要等待t1线程全部执行完毕，在恢复到就绪状态等待CPU调度。</p><p>如果在main线程中调用了t1.join(2000)，那么main线程会进入到等待状态，需要等待t1执行2s后，在恢复到就绪状态等待CPU调度。如果在等待期间，t1已经结束了，那么main线程自动变为就绪状态等待CPU调度。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 10; i++) {</span></span>
<span class="line"><span>            System.out.println(&quot;t1:&quot; + i);</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                Thread.sleep(1000);</span></span>
<span class="line"><span>            } catch (InterruptedException e) {</span></span>
<span class="line"><span>                e.printStackTrace();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 10; i++) {</span></span>
<span class="line"><span>        System.out.println(&quot;main:&quot; + i);</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Thread.sleep(1000);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (i == 1){</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                t1.join(2000);</span></span>
<span class="line"><span>            } catch (InterruptedException e) {</span></span>
<span class="line"><span>                e.printStackTrace();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="_3-2-7-守护线程" tabindex="-1">3.2.7 守护线程 <a class="header-anchor" href="#_3-2-7-守护线程" aria-label="Permalink to &quot;3.2.7 守护线程&quot;">​</a></h5><p>默认情况下，线程都是非守护线程</p><p>JVM会在程序中没有非守护线程时，结束掉当前JVM</p><p>主线程默认是非守护线程，如果主线程执行结束，需要查看当前JVM内是否还有非守护线程，如果没有JVM直接停止</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 10; i++) {</span></span>
<span class="line"><span>            System.out.println(&quot;t1:&quot; + i);</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                Thread.sleep(1000);</span></span>
<span class="line"><span>            } catch (InterruptedException e) {</span></span>
<span class="line"><span>                e.printStackTrace();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.setDaemon(true);</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="_3-2-8-线程的等待和唤醒" tabindex="-1">3.2.8 线程的等待和唤醒 <a class="header-anchor" href="#_3-2-8-线程的等待和唤醒" aria-label="Permalink to &quot;3.2.8 线程的等待和唤醒&quot;">​</a></h5><p>可以让获取synchronized锁资源的线程通过wait方法进去到锁的<strong>等待池</strong>，并且会释放锁资源</p><p>可以让获取synchronized锁资源的线程，通过notify或者notifyAll方法，将等待池中的线程唤醒，添加到<strong>锁池</strong>中</p><p>notify随机的唤醒等待池中的一个线程到锁池</p><p>notifyAll将等待池中的全部线程都唤醒，并且添加到锁池</p><p>在调用wait方法和notify以及norifyAll方法时，必须在synchronized修饰的代码块或者方法内部才可以，因为要操作基于某个对象的锁的信息维护。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        sync();</span></span>
<span class="line"><span>    },&quot;t1&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Thread t2 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        sync();</span></span>
<span class="line"><span>    },&quot;t2&quot;);</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    t2.start();</span></span>
<span class="line"><span>    Thread.sleep(12000);</span></span>
<span class="line"><span>    synchronized (MiTest.class) {</span></span>
<span class="line"><span>        MiTest.class.notifyAll();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static synchronized void sync()  {</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 10; i++) {</span></span>
<span class="line"><span>            if(i == 5) {</span></span>
<span class="line"><span>                MiTest.class.wait();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            Thread.sleep(1000);</span></span>
<span class="line"><span>            System.out.println(Thread.currentThread().getName());</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } catch (InterruptedException e) {</span></span>
<span class="line"><span>        e.printStackTrace();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-3-线程的结束方式" tabindex="-1">3.3 线程的结束方式 <a class="header-anchor" href="#_3-3-线程的结束方式" aria-label="Permalink to &quot;3.3 线程的结束方式&quot;">​</a></h4><p>线程结束方式很多，最常用就是让线程的run方法结束，无论是return结束，还是抛出异常结束，都可以</p><h5 id="_3-3-1-stop方法-不用" tabindex="-1">3.3.1 stop方法（不用） <a class="header-anchor" href="#_3-3-1-stop方法-不用" aria-label="Permalink to &quot;3.3.1 stop方法（不用）&quot;">​</a></h5><p>强制让线程结束，无论你在干嘛，不推荐使用当然当然方式，但是，他确实可以把线程干掉</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Thread.sleep(5000);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    Thread.sleep(500);</span></span>
<span class="line"><span>    t1.stop();</span></span>
<span class="line"><span>    System.out.println(t1.getState());</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="_3-3-2-使用共享变量-很少会用" tabindex="-1">3.3.2 使用共享变量（很少会用） <a class="header-anchor" href="#_3-3-2-使用共享变量-很少会用" aria-label="Permalink to &quot;3.3.2 使用共享变量（很少会用）&quot;">​</a></h5><p>这种方式用的也不多，有的线程可能会通过死循环来保证一直运行。</p><p>咱们可以通过修改共享变量在破坏死循环，让线程退出循环，结束run方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>static volatile boolean flag = true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        while(flag){</span></span>
<span class="line"><span>            // 处理任务</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        System.out.println(&quot;任务结束&quot;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    Thread.sleep(500);</span></span>
<span class="line"><span>    flag = false;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="_3-3-3-interrupt方式" tabindex="-1">3.3.3 interrupt方式 <a class="header-anchor" href="#_3-3-3-interrupt方式" aria-label="Permalink to &quot;3.3.3 interrupt方式&quot;">​</a></h5><p>共享变量方式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    // 线程默认情况下，    interrupt标记位：false</span></span>
<span class="line"><span>    System.out.println(Thread.currentThread().isInterrupted());</span></span>
<span class="line"><span>    // 执行interrupt之后，再次查看打断信息</span></span>
<span class="line"><span>    Thread.currentThread().interrupt();</span></span>
<span class="line"><span>    // interrupt标记位：ture</span></span>
<span class="line"><span>    System.out.println(Thread.currentThread().isInterrupted());</span></span>
<span class="line"><span>    // 返回当前线程，并归位为false interrupt标记位：ture</span></span>
<span class="line"><span>    System.out.println(Thread.interrupted());</span></span>
<span class="line"><span>    // 已经归位了</span></span>
<span class="line"><span>    System.out.println(Thread.interrupted());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // =====================================================</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        while(!Thread.currentThread().isInterrupted()){</span></span>
<span class="line"><span>            // 处理业务</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        System.out.println(&quot;t1结束&quot;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    Thread.sleep(500);</span></span>
<span class="line"><span>    t1.interrupt();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>通过打断WAITING或者TIMED_WAITING状态的线程，从而抛出异常自行处理</p><p>这种停止线程方式是最常用的一种，在框架和JUC中也是最常见的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        while(true){</span></span>
<span class="line"><span>            // 获取任务</span></span>
<span class="line"><span>            // 拿到任务，执行任务</span></span>
<span class="line"><span>            // 没有任务了，让线程休眠</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                Thread.sleep(1000);</span></span>
<span class="line"><span>            } catch (InterruptedException e) {</span></span>
<span class="line"><span>                e.printStackTrace();</span></span>
<span class="line"><span>                System.out.println(&quot;基于打断形式结束当前线程&quot;);</span></span>
<span class="line"><span>                return;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    Thread.sleep(500);</span></span>
<span class="line"><span>    t1.interrupt();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="二、并发编程的三大特性" tabindex="-1">二、<strong>并发编程的三大特性</strong> <a class="header-anchor" href="#二、并发编程的三大特性" aria-label="Permalink to &quot;二、**并发编程的三大特性**&quot;">​</a></h1><h2 id="一、原子性" tabindex="-1"><strong>一、原子性</strong> <a class="header-anchor" href="#一、原子性" aria-label="Permalink to &quot;**一、原子性**&quot;">​</a></h2><h4 id="_1-1-什么是并发编程的原子性" tabindex="-1">1.1 什么是并发编程的原子性 <a class="header-anchor" href="#_1-1-什么是并发编程的原子性" aria-label="Permalink to &quot;1.1 什么是并发编程的原子性&quot;">​</a></h4><p>JMM（Java Memory Model）。不同的硬件和不同的操作系统在内存上的操作有一定差异的。Java为了解决相同代码在不同操作系统上出现的各种问题，用JMM屏蔽掉各种硬件和操作系统带来的差异。</p><p>让Java的并发编程可以做到跨平台。</p><p>JMM规定所有变量都会存储在主内存中，在操作的时候，需要从主内存中复制一份到线程内存（CPU内存），在线程内部做计算。<strong>然后再写回主内存中（不一定！）。</strong></p><p><strong>原子性的定义：原子性指一个操作是不可分割的，不可中断的，一个线程在执行时，另一个线程不会影响到他。</strong></p><p>并发编程的原子性用代码阐述：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private static int count;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void increment(){</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        Thread.sleep(10);</span></span>
<span class="line"><span>    } catch (InterruptedException e) {</span></span>
<span class="line"><span>        e.printStackTrace();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    count++;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 100; i++) {</span></span>
<span class="line"><span>           increment();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    Thread t2 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 100; i++) {</span></span>
<span class="line"><span>            increment();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    t2.start();</span></span>
<span class="line"><span>    t1.join();</span></span>
<span class="line"><span>    t2.join();</span></span>
<span class="line"><span>    System.out.println(count);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>当前程序：多线程操作共享数据时，预期的结果，与最终的结果不符。</p><p><strong>原子性：多线程操作临界资源，预期的结果与最终结果一致。</strong></p><p>通过对这个程序的分析，可以查看出，++的操作，一共分为了三部，首先是线程从主内存拿到数据保存到CPU的寄存器中，然后在寄存器中进行+1操作，最终将结果写回到主内存当中。</p><h3 id="_1-2-保证并发编程的原子性" tabindex="-1">1.2 保证并发编程的原子性 <a class="header-anchor" href="#_1-2-保证并发编程的原子性" aria-label="Permalink to &quot;1.2 保证并发编程的原子性&quot;">​</a></h3><h4 id="_1-2-1-synchronized" tabindex="-1">1.2.1 synchronized <a class="header-anchor" href="#_1-2-1-synchronized" aria-label="Permalink to &quot;1.2.1 synchronized&quot;">​</a></h4><p>因为++操作可以从指令中查看到</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/c53311e92c734b248e0c31ef615e8c4f.png" alt="" loading="lazy"></p><p>可以在方法上追加synchronized关键字或者采用同步代码块的形式来保证原子性</p><p>synchronized可以让避免多线程同时操作临街资源，同一时间点，只会有一个线程正在操作临界资源</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/4d92d0e53d49438fafa4f2c9710aa398.png" alt="" loading="lazy"></p><h4 id="_1-2-2-cas" tabindex="-1">1.2.2 CAS <a class="header-anchor" href="#_1-2-2-cas" aria-label="Permalink to &quot;1.2.2 CAS&quot;">​</a></h4><p>到底什么是CAS</p><p>compare and swap也就是比较和交换，他是一条CPU的并发原语。</p><p>他在替换内存的某个位置的值时，首先查看内存中的值与预期值是否一致，如果一致，执行替换操作。这个操作是一个原子性操作。</p><p>Java中基于Unsafe的类提供了对CAS的操作的方法，JVM会帮助我们将方法实现CAS汇编指令。</p><p>但是要清楚CAS只是比较和交换，在获取原值的这个操作上，需要你自己实现。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private static AtomicInteger count = new AtomicInteger(0);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 100; i++) {</span></span>
<span class="line"><span>            count.incrementAndGet();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    Thread t2 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 100; i++) {</span></span>
<span class="line"><span>            count.incrementAndGet();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    t2.start();</span></span>
<span class="line"><span>    t1.join();</span></span>
<span class="line"><span>    t2.join();</span></span>
<span class="line"><span>    System.out.println(count);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Doug Lea在CAS的基础上帮助我们实现了一些原子类，其中就包括现在看到的AtomicInteger，还有其他很多原子类……</p><p><strong>CAS的缺点</strong>：CAS只能保证对一个变量的操作是原子性的，无法实现对多行代码实现原子性。</p><p><strong>CAS的问题</strong>：</p><ul><li><p><strong>ABA问题</strong>：问题如下，可以引入版本号的方式，来解决ABA的问题。Java中提供了一个类在CAS时，针对各个版本追加版本号的操作。 AtomicStampeReference<img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/1a90706738b3476d81d038d2648d3c7c.png" alt="" loading="lazy"></p></li><li><p>AtomicStampedReference在CAS时，不但会判断原值，还会比较版本信息。</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) {</span></span>
<span class="line"><span>    AtomicStampedReference&lt;String&gt; reference = new AtomicStampedReference&lt;&gt;(&quot;AAA&quot;,1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    String oldValue = reference.getReference();</span></span>
<span class="line"><span>    int oldVersion = reference.getStamp();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    boolean b = reference.compareAndSet(oldValue, &quot;B&quot;, oldVersion, oldVersion + 1);</span></span>
<span class="line"><span>    System.out.println(&quot;修改1版本的：&quot; + b);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    boolean c = reference.compareAndSet(&quot;B&quot;, &quot;C&quot;, 1, 1 + 1);</span></span>
<span class="line"><span>    System.out.println(&quot;修改2版本的：&quot; + c);</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><p><strong>自旋时间过长问题</strong>：</p></li><li><p>可以指定CAS一共循环多少次，如果超过这个次数，直接失败/或者挂起线程。（自旋锁、自适应自旋锁）</p></li><li><p>可以在CAS一次失败后，将这个操作暂存起来，后面需要获取结果时，将暂存的操作全部执行，再返回最后的结果。</p></li></ul><h4 id="_1-2-3-lock锁" tabindex="-1">1.2.3 Lock锁 <a class="header-anchor" href="#_1-2-3-lock锁" aria-label="Permalink to &quot;1.2.3 Lock锁&quot;">​</a></h4><p>Lock锁是在JDK1.5由Doug Lea研发的，他的性能相比synchronized在JDK1.5的时期，性能好了很多多，但是在JDK1.6对synchronized优化之后，性能相差不大，但是如果涉及并发比较多时，推荐ReentrantLock锁，性能会更好。</p><p>实现方式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private static int count;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private static ReentrantLock lock = new ReentrantLock();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void increment()  {</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        count++;</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Thread.sleep(10);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 100; i++) {</span></span>
<span class="line"><span>            increment();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    Thread t2 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 100; i++) {</span></span>
<span class="line"><span>            increment();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    t2.start();</span></span>
<span class="line"><span>    t1.join();</span></span>
<span class="line"><span>    t2.join();</span></span>
<span class="line"><span>    System.out.println(count);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>ReentrantLock可以直接对比synchronized，在功能上来说，都是锁。</p><p>但是ReentrantLock的功能性相比synchronized更丰富。</p><p><strong>ReentrantLock底层是基于AQS实现的，有一个基于CAS维护的state变量来实现锁的操作。</strong></p><h4 id="_1-2-4-threadlocal" tabindex="-1">1.2.4 ThreadLocal <a class="header-anchor" href="#_1-2-4-threadlocal" aria-label="Permalink to &quot;1.2.4 ThreadLocal&quot;">​</a></h4><p>ThreadLocal保证原子性的方式，是不让多线程去操作<strong>临界资源</strong>，让每个线程去操作属于自己的数据</p><p>代码实现</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>static ThreadLocal tl1 = new ThreadLocal();</span></span>
<span class="line"><span>static ThreadLocal tl2 = new ThreadLocal();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void main(String[] args) {</span></span>
<span class="line"><span>    tl1.set(&quot;123&quot;);</span></span>
<span class="line"><span>    tl2.set(&quot;456&quot;);</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;t1:&quot; + tl1.get());</span></span>
<span class="line"><span>        System.out.println(&quot;t1:&quot; + tl2.get());</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    System.out.println(&quot;main:&quot; + tl1.get());</span></span>
<span class="line"><span>    System.out.println(&quot;main:&quot; + tl2.get());</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>ThreadLocal实现原理：</p><ul><li><p>每个Thread中都存储着一个成员变量，ThreadLocalMap</p></li><li><p>ThreadLocal本身不存储数据，像是一个工具类，基于ThreadLocal去操作ThreadLocalMap</p></li><li><p>ThreadLocalMap本身就是基于Entry[]实现的，因为一个线程可以绑定多个ThreadLocal，这样一来，可能需要存储多个数据，所以采用Entry[]的形式实现。</p></li><li><p>每一个现有都自己独立的ThreadLocalMap，再基于ThreadLocal对象本身作为key，对value进行存取</p></li><li><p>ThreadLocalMap的key是一个弱引用，弱引用的特点是，即便有弱引用，在GC时，也必须被回收。这里是为了在ThreadLocal对象失去引用后，如果key的引用是强引用，会导致ThreadLocal对象无法被回收</p></li></ul><p>ThreadLocal内存泄漏问题：</p><ul><li><p>如果ThreadLocal引用丢失，key因为弱引用会被GC回收掉，如果同时线程还没有被回收，就会导致内存泄漏，内存中的value无法被回收，同时也无法被获取到。</p></li><li><p>只需要在使用完毕ThreadLocal对象之后，及时的调用remove方法，移除Entry即可</p></li></ul><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/e5c66dabcdb94dc2b375ba7cdb22471d.png" alt="" loading="lazy"></p><h2 id="二、可见性" tabindex="-1"><strong>二、可见性</strong> <a class="header-anchor" href="#二、可见性" aria-label="Permalink to &quot;**二、可见性**&quot;">​</a></h2><h3 id="_2-1-什么是可见性" tabindex="-1">2.1 什么是可见性 <a class="header-anchor" href="#_2-1-什么是可见性" aria-label="Permalink to &quot;2.1 什么是可见性&quot;">​</a></h3><p>可见性问题是基于CPU位置出现的，CPU处理速度非常快，相对CPU来说，去主内存获取数据这个事情太慢了，CPU就提供了L1，L2，L3的三级缓存，每次去主内存拿完数据后，就会存储到CPU的三级缓存，每次去三级缓存拿数据，效率肯定会提升。</p><p>这就带来了问题，现在CPU都是多核，每个线程的工作内存（CPU三级缓存）都是独立的，会告知每个线程中做修改时，只改自己的工作内存，没有及时的同步到主内存，导致数据不一致问题。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/b3e82a21b18741a1ab3898e3c3ce95a7.png" alt="" loading="lazy"></p><p>可见性问题的代码逻辑</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private static boolean flag = true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        while (flag) {</span></span>
<span class="line"><span>            // ....</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        System.out.println(&quot;t1线程结束&quot;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    Thread.sleep(10);</span></span>
<span class="line"><span>    flag = false;</span></span>
<span class="line"><span>    System.out.println(&quot;主线程将flag改为false&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-2-解决可见性的方式" tabindex="-1">2.2 解决可见性的方式 <a class="header-anchor" href="#_2-2-解决可见性的方式" aria-label="Permalink to &quot;2.2 解决可见性的方式&quot;">​</a></h3><h4 id="_2-2-1-volatile" tabindex="-1">2.2.1 volatile <a class="header-anchor" href="#_2-2-1-volatile" aria-label="Permalink to &quot;2.2.1 volatile&quot;">​</a></h4><p>volatile是一个关键字，用来修饰成员变量。</p><p>如果属性被volatile修饰，相当于会告诉CPU，对当前属性的操作，不允许使用CPU的缓存，必须去和主内存操作</p><p>volatile的内存语义：</p><ul><li><p>volatile属性被写：当写一个volatile变量，JMM会将当前线程对应的CPU缓存及时的刷新到主内存中</p></li><li><p>volatile属性被读：当读一个volatile变量，JMM会将对应的CPU缓存中的内存设置为无效，必须去主内存中重新读取共享变量</p></li></ul><p>其实加了volatile就是告知CPU，对当前属性的读写操作，不允许使用CPU缓存，加了volatile修饰的属性，会在转为汇编之后后，追加一个lock的前缀，CPU执行这个指令时，如果带有lock前缀会做两个事情：</p><ul><li><p>将当前处理器缓存行的数据写回到主内存</p></li><li><p>这个写回的数据，在其他的CPU内核的缓存中，直接无效。</p></li></ul><p><strong>总结：volatile就是让CPU每次操作这个数据时，必须立即同步到主内存，以及从主内存读取数据。</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private volatile static boolean flag = true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        while (flag) {</span></span>
<span class="line"><span>            // ....</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        System.out.println(&quot;t1线程结束&quot;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    Thread.sleep(10);</span></span>
<span class="line"><span>    flag = false;</span></span>
<span class="line"><span>    System.out.println(&quot;主线程将flag改为false&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-2-2-synchronized" tabindex="-1">2.2.2 synchronized <a class="header-anchor" href="#_2-2-2-synchronized" aria-label="Permalink to &quot;2.2.2 synchronized&quot;">​</a></h4><p>synchronized也是可以解决可见性问题的，synchronized的内存语义。</p><p>如果涉及到了synchronized的同步代码块或者是同步方法，获取锁资源之后，将内部涉及到的变量从CPU缓存中移除，必须去主内存中重新拿数据，而且在释放锁之后，会立即将CPU缓存中的数据同步到主内存。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private static boolean flag = true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        while (flag) {</span></span>
<span class="line"><span>            synchronized (MiTest.class){</span></span>
<span class="line"><span>                //...</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            System.out.println(111);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        System.out.println(&quot;t1线程结束&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    Thread.sleep(10);</span></span>
<span class="line"><span>    flag = false;</span></span>
<span class="line"><span>    System.out.println(&quot;主线程将flag改为false&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-2-3-lock" tabindex="-1">2.2.3 Lock <a class="header-anchor" href="#_2-2-3-lock" aria-label="Permalink to &quot;2.2.3 Lock&quot;">​</a></h4><p>Lock锁保证可见性的方式和synchronized完全不同，synchronized基于他的内存语义，在获取锁和释放锁时，对CPU缓存做一个同步到主内存的操作。</p><p>Lock锁是基于volatile实现的。Lock锁内部再进行加锁和释放锁时，会对一个由volatile修饰的state属性进行加减操作。</p><p>如果对volatile修饰的属性进行写操作，CPU会执行带有lock前缀的指令，CPU会将修改的数据，从CPU缓存立即同步到主内存，同时也会将其他的属性也立即同步到主内存中。还会将其他CPU缓存行中的这个数据设置为无效，必须重新从主内存中拉取。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private static boolean flag = true;</span></span>
<span class="line"><span>private static Lock lock = new ReentrantLock();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>        while (flag) {</span></span>
<span class="line"><span>            lock.lock();</span></span>
<span class="line"><span>            try{</span></span>
<span class="line"><span>                //...</span></span>
<span class="line"><span>            }finally {</span></span>
<span class="line"><span>                lock.unlock();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        System.out.println(&quot;t1线程结束&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    t1.start();</span></span>
<span class="line"><span>    Thread.sleep(10);</span></span>
<span class="line"><span>    flag = false;</span></span>
<span class="line"><span>    System.out.println(&quot;主线程将flag改为false&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-2-4-final" tabindex="-1">2.2.4 final <a class="header-anchor" href="#_2-2-4-final" aria-label="Permalink to &quot;2.2.4 final&quot;">​</a></h4><p>final修饰的属性，在运行期间是不允许修改的，这样一来，就间接的保证了可见性，所有多线程读取final属性，值肯定是一样。</p><p>final并不是说每次取数据从主内存读取，他没有这个必要，而且final和volatile是不允许同时修饰一个属性的</p><p>final修饰的内容已经不允许再次被写了，而volatile是保证每次读写数据去主内存读取，并且volatile会影响一定的性能，就不需要同时修饰。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/b4dca6c8368846fab361bb8435493e4d.png" alt="" loading="lazy"></p><h2 id="三、有序性" tabindex="-1"><strong>三、有序性</strong> <a class="header-anchor" href="#三、有序性" aria-label="Permalink to &quot;**三、有序性**&quot;">​</a></h2><h3 id="_3-1-什么是有序性" tabindex="-1">3.1 什么是有序性 <a class="header-anchor" href="#_3-1-什么是有序性" aria-label="Permalink to &quot;3.1 什么是有序性&quot;">​</a></h3><p>在Java中，.java文件中的内容会被编译，在执行前需要再次转为CPU可以识别的指令，CPU在执行这些指令时，为了提升执行效率，在不影响最终结果的前提下（满足一些要求），会对指令进行重排。</p><p>指令乱序执行的原因，是为了尽可能的发挥CPU的性能。</p><p>Java中的程序是乱序执行的。</p><p>Java程序验证乱序执行效果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>static int a,b,x,y;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    for (int i = 0; i &lt; Integer.MAX_VALUE; i++) {</span></span>
<span class="line"><span>        a = 0;</span></span>
<span class="line"><span>        b = 0;</span></span>
<span class="line"><span>        x = 0;</span></span>
<span class="line"><span>        y = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span>            a = 1;</span></span>
<span class="line"><span>            x = b;</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>        Thread t2 = new Thread(() -&gt; {</span></span>
<span class="line"><span>            b = 1;</span></span>
<span class="line"><span>            y = a;</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        t1.start();</span></span>
<span class="line"><span>        t2.start();</span></span>
<span class="line"><span>        t1.join();</span></span>
<span class="line"><span>        t2.join();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if(x == 0 &amp;&amp; y == 0){</span></span>
<span class="line"><span>            System.out.println(&quot;第&quot; + i + &quot;次，x = &quot;+ x + &quot;,y = &quot; + y);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>单例模式由于指令重排序可能会出现问题：</p><p>线程可能会拿到没有初始化的对象，导致在使用时，可能由于内部属性为默认值，导致出现一些不必要的问题</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private static volatile MiTest test;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private MiTest(){}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static MiTest getInstance(){</span></span>
<span class="line"><span>    // B</span></span>
<span class="line"><span>    if(test  == null){</span></span>
<span class="line"><span>        synchronized (MiTest.class){</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if(test == null){</span></span>
<span class="line"><span>                // A   ,  开辟空间，test指向地址，初始化</span></span>
<span class="line"><span>                test = new MiTest();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return test;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-2-as-if-serial" tabindex="-1">3.2 as-if-serial <a class="header-anchor" href="#_3-2-as-if-serial" aria-label="Permalink to &quot;3.2 as-if-serial&quot;">​</a></h3><p>as-if-serial语义：</p><p>不论指定如何重排序，需要保证单线程的程序执行结果是不变的。</p><p>而且如果存在依赖的关系，那么也不可以做指令重排。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 这种情况肯定不能做指令重排序</span></span>
<span class="line"><span>int i = 0;</span></span>
<span class="line"><span>i++;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 这种情况肯定不能做指令重排序</span></span>
<span class="line"><span>int j = 200;</span></span>
<span class="line"><span>j * 100;</span></span>
<span class="line"><span>j + 100;</span></span>
<span class="line"><span>// 这里即便出现了指令重排，也不可以影响最终的结果，20100</span></span></code></pre></div><h3 id="_3-3-happens-before" tabindex="-1">3.3 happens-before <a class="header-anchor" href="#_3-3-happens-before" aria-label="Permalink to &quot;3.3 happens-before&quot;">​</a></h3><p><strong>具体规则：</strong><br> 　　1. 单线程happen-before原则：在同一个线程中，书写在前面的操作happen-before后面的操作。　　2. 锁的happen-before原则：同一个锁的unlock操作happen-before此锁的lock操作。　　3. volatile的happen-before原则： 对一个volatile变量的写操作happen-before对此变量的任意操作。　　4. happen-before的传递性原则： 如果A操作 happen-before B操作，B操作happen-before C操作，那么A操作happen-before C操作。　　5. 线程启动的happen-before原则：同一个线程的start方法happen-before此线程的其它方法。　　6. 线程中断的happen-before原则：对线程interrupt方法的调用happen-before被中断线程的检测到中断发送的代码。　　7. 线程终结的happen-before原则：线程中的所有操作都happen-before线程的终止检测。　　8. 对象创建的happen-before原则：一个对象的初始化完成先于他的finalize方法调用。<strong>JMM只有在不出现上述8中情况时，才不会触发指令重排效果。</strong></p><p>不需要过分的关注happens-before原则，只需要可以写出线程安全的代码就可以了。</p><h3 id="_3-4-volatile" tabindex="-1">3.4 volatile <a class="header-anchor" href="#_3-4-volatile" aria-label="Permalink to &quot;3.4 volatile&quot;">​</a></h3><p>如果需要让程序对某一个属性的操作不出现指令重排，除了满足happens-before原则之外，还可以基于volatile修饰属性，从而对这个属性的操作，就不会出现指令重排的问题了。</p><p>volatile如何实现的禁止指令重排？</p><p>内存屏障概念。将内存屏障看成一条指令。</p><p>会在两个操作之间，添加上一道指令，这个指令就可以避免上下执行的其他指令进行重排序。</p><h1 id="三、锁" tabindex="-1">三、<strong>锁</strong> <a class="header-anchor" href="#三、锁" aria-label="Permalink to &quot;三、**锁**&quot;">​</a></h1><h2 id="一、锁的分类" tabindex="-1">一、<strong>锁的分类</strong> <a class="header-anchor" href="#一、锁的分类" aria-label="Permalink to &quot;一、**锁的分类**&quot;">​</a></h2><h3 id="_1-1-可重入锁、不可重入锁" tabindex="-1">1.1 可重入锁、不可重入锁 <a class="header-anchor" href="#_1-1-可重入锁、不可重入锁" aria-label="Permalink to &quot;1.1 可重入锁、不可重入锁&quot;">​</a></h3><p>Java中提供的synchronized，ReentrantLock，ReentrantReadWriteLock都是可重入锁。</p><p><strong>重入</strong>：当前线程获取到A锁，在获取之后尝试再次获取A锁是可以直接拿到的。</p><p><strong>不可重入</strong>：当前线程获取到A锁，在获取之后尝试再次获取A锁，无法获取到的，因为A锁被当前线程占用着，需要等待自己释放锁再获取锁。</p><h3 id="_1-2-乐观锁、悲观锁" tabindex="-1">1.2 乐观锁、悲观锁 <a class="header-anchor" href="#_1-2-乐观锁、悲观锁" aria-label="Permalink to &quot;1.2 乐观锁、悲观锁&quot;">​</a></h3><p>Java中提供的synchronized，ReentrantLock，ReentrantReadWriteLock都是悲观锁。</p><p>Java中提供的CAS操作，就是乐观锁的一种实现。</p><p><strong>悲观锁</strong>：获取不到锁资源时，会将当前线程挂起（进入BLOCKED、WAITING），线程挂起会涉及到用户态和内核的太的切换，而这种切换是比较消耗资源的。</p><ul><li><p>用户态：JVM可以自行执行的指令，不需要借助操作系统执行。</p></li><li><p>内核态：JVM不可以自行执行，需要操作系统才可以执行。</p></li></ul><p><strong>乐观锁</strong>：获取不到锁资源，可以再次让CPU调度，重新尝试获取锁资源。</p><p>Atomic原子性类中，就是基于CAS乐观锁实现的。</p><h3 id="_1-3-公平锁、非公平锁" tabindex="-1">1.3 公平锁、非公平锁 <a class="header-anchor" href="#_1-3-公平锁、非公平锁" aria-label="Permalink to &quot;1.3 公平锁、非公平锁&quot;">​</a></h3><p>Java中提供的synchronized只能是非公平锁。</p><p>Java中提供的ReentrantLock，ReentrantReadWriteLock可以实现公平锁和非公平锁</p><p><strong>公平锁</strong>：线程A获取到了锁资源，线程B没有拿到，线程B去排队，线程C来了，锁被A持有，同时线程B在排队。直接排到B的后面，等待B拿到锁资源或者是B取消后，才可以尝试去竞争锁资源。</p><p><strong>非公平锁</strong>：线程A获取到了锁资源，线程B没有拿到，线程B去排队，线程C来了，先尝试竞争一波</p><ul><li><p>拿到锁资源：开心，插队成功。</p></li><li><p>没有拿到锁资源：依然要排到B的后面，等待B拿到锁资源或者是B取消后，才可以尝试去竞争锁资源。</p></li></ul><h3 id="_1-4-互斥锁、共享锁" tabindex="-1">1.4 互斥锁、共享锁 <a class="header-anchor" href="#_1-4-互斥锁、共享锁" aria-label="Permalink to &quot;1.4 互斥锁、共享锁&quot;">​</a></h3><p>Java中提供的synchronized、ReentrantLock是互斥锁。</p><p>Java中提供的ReentrantReadWriteLock，有互斥锁也有共享锁。</p><p><strong>互斥锁</strong>：同一时间点，只会有一个线程持有者当前互斥锁。</p><p><strong>共享锁</strong>：同一时间点，当前共享锁可以被多个线程同时持有。</p><h2 id="二、深入synchronized" tabindex="-1">二、<strong>深入synchronized</strong> <a class="header-anchor" href="#二、深入synchronized" aria-label="Permalink to &quot;二、**深入synchronized**&quot;">​</a></h2><h3 id="_2-1-类锁、对象锁" tabindex="-1">2.1 类锁、对象锁 <a class="header-anchor" href="#_2-1-类锁、对象锁" aria-label="Permalink to &quot;2.1 类锁、对象锁&quot;">​</a></h3><p>synchronized的使用一般就是同步方法和同步代码块。</p><p>synchronized的锁是基于对象实现的。</p><p>如果使用同步方法</p><ul><li><p>static：此时使用的是当前类.class作为锁（类锁）</p></li><li><p>非static：此时使用的是当前对象做为锁（对象锁）</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class MiTest {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        // 锁的是，当前Test.class</span></span>
<span class="line"><span>        Test.a();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Test test = new Test();</span></span>
<span class="line"><span>        // 锁的是new出来的test对象</span></span>
<span class="line"><span>        test.b();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Test{</span></span>
<span class="line"><span>    public static synchronized void a(){</span></span>
<span class="line"><span>        System.out.println(&quot;1111&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public synchronized void b(){</span></span>
<span class="line"><span>        System.out.println(&quot;2222&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-2-synchronized的优化" tabindex="-1">2.2 synchronized的优化 <a class="header-anchor" href="#_2-2-synchronized的优化" aria-label="Permalink to &quot;2.2 synchronized的优化&quot;">​</a></h3><p>在JDK1.5的时候，Doug Lee推出了ReentrantLock，lock的性能远高于synchronized，所以JDK团队就在JDK1.6中，对synchronized做了大量的优化。</p><p><strong>锁消除</strong>：在synchronized修饰的代码中，如果不存在操作临界资源的情况，会触发锁消除，你即便写了synchronized，他也不会触发。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public synchronized void method(){</span></span>
<span class="line"><span>    // 没有操作临界资源</span></span>
<span class="line"><span>    // 此时这个方法的synchronized你可以认为木有~~</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>锁膨胀</strong>：如果在一个循环中，频繁的获取和释放做资源，这样带来的消耗很大，锁膨胀就是将锁的范围扩大，避免频繁的竞争和获取锁资源带来不必要的消耗。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void method(){</span></span>
<span class="line"><span>    for(int i = 0;i &lt; 999999;i++){</span></span>
<span class="line"><span>        synchronized(对象){</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 这是上面的代码会触发锁膨胀</span></span>
<span class="line"><span>    synchronized(对象){</span></span>
<span class="line"><span>        for(int i = 0;i &lt; 999999;i++){</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>锁升级</strong>：ReentrantLock的实现，是先基于乐观锁的CAS尝试获取锁资源，如果拿不到锁资源，才会挂起线程。synchronized在JDK1.6之前，完全就是获取不到锁，立即挂起当前线程，所以synchronized性能比较差。</p><p>synchronized就在JDK1.6做了锁升级的优化</p><ul><li><p><strong>无锁、匿名偏向</strong>：当前对象没有作为锁存在。</p></li><li><p><strong>偏向锁</strong>：如果当前锁资源，只有一个线程在频繁的获取和释放，那么这个线程过来，只需要判断，当前指向的线程是否是当前线程 。</p></li><li><p>如果是，直接拿着锁资源走。</p></li><li><p>如果当前线程不是我，基于CAS的方式，尝试将偏向锁指向当前线程。如果获取不到，触发锁升级，升级为轻量级锁。（偏向锁状态出现了锁竞争的情况）</p></li><li><p><strong>轻量级锁</strong>：会采用自旋锁的方式去频繁的以CAS的形式获取锁资源（采用的是<strong>自适应自旋锁</strong>）</p></li><li><p>如果成功获取到，拿着锁资源走</p></li><li><p>如果自旋了一定次数，没拿到锁资源，锁升级。</p></li><li><p><strong>重量级锁</strong>：就是最传统的synchronized方式，拿不到锁资源，就挂起当前线程。（用户态&amp;内核态）</p></li></ul><h3 id="_2-3-synchronized实现原理" tabindex="-1">2.3 synchronized实现原理 <a class="header-anchor" href="#_2-3-synchronized实现原理" aria-label="Permalink to &quot;2.3 synchronized实现原理&quot;">​</a></h3><p>synchronized是基于对象实现的。</p><p>先要对Java中对象在堆内存的存储有一个了解。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/5960ce8eb65d44c299d542fea1b61781.png" alt="" loading="lazy"></p><p>展开MarkWord</p><p><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg-blog.csdnimg.cn%2F20200314202610433.png%3Fx-oss-process%3Dimage%2Fwatermark%2Ctype_ZmFuZ3poZW5naGVpdGk%2Cshadow_10%2Ctext_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0ludHJvbmNoZW5n%2Csize_16%2Ccolor_FFFFFF%2Ct_70&amp;refer=http%3A%2F%2Fimg-blog.csdnimg.cn&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=auto?sec=1659024071&amp;t=5135a8e6d07b807c6bb771ceafd8a227" alt="" loading="lazy"></p><p>MarkWord中标记着四种锁的信息：无锁、偏向锁、轻量级锁、</p><h3 id="_2-4-synchronized的锁升级" tabindex="-1">2.4 synchronized的锁升级 <a class="header-anchor" href="#_2-4-synchronized的锁升级" aria-label="Permalink to &quot;2.4 synchronized的锁升级&quot;">​</a></h3><p>为了可以在Java中看到对象头的MarkWord信息，需要导入依赖</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.openjdk.jol&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;jol-core&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;0.9&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre></div><p>锁默认情况下，开启了偏向锁延迟。</p><p>偏向锁在升级为轻量级锁时，会涉及到偏向锁撤销，需要等到一个安全点（STW），才可以做偏向锁撤销，在明知道有并发情况，就可以选择不开启偏向锁，或者是设置偏向锁延迟开启</p><p>因为JVM在启动时，需要加载大量的.class文件到内存中，这个操作会涉及到synchronized的使用，为了避免出现偏向锁撤销操作，JVM启动初期，有一个延迟4s开启偏向锁的操作</p><p>如果正常开启偏向锁了，那么不会出现无锁状态，对象会直接变为匿名偏向</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    Thread.sleep(5000);</span></span>
<span class="line"><span>    Object o = new Object();</span></span>
<span class="line"><span>    System.out.println(ClassLayout.parseInstance(o).toPrintable());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        synchronized (o){</span></span>
<span class="line"><span>            //t1  - 偏向锁</span></span>
<span class="line"><span>            System.out.println(&quot;t1:&quot; + ClassLayout.parseInstance(o).toPrintable());</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span>    //main - 偏向锁 - 轻量级锁CAS - 重量级锁</span></span>
<span class="line"><span>    synchronized (o){</span></span>
<span class="line"><span>        System.out.println(&quot;main:&quot; + ClassLayout.parseInstance(o).toPrintable());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>整个锁升级状态的转变：</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/20d71edbf3dd438b95358d0169b69226.png" alt="" loading="lazy"></p><p>Lock Record以及ObjectMonitor存储的内容</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/616fb837af0c4bcfac43e281d3d22e08.png" alt="" loading="lazy"></p><h3 id="_2-5-重量锁底层objectmonitor" tabindex="-1">2.5 重量锁底层ObjectMonitor <a class="header-anchor" href="#_2-5-重量锁底层objectmonitor" aria-label="Permalink to &quot;2.5 重量锁底层ObjectMonitor&quot;">​</a></h3><p>需要去找到openjdk，在百度中直接搜索openjdk，第一个链接就是</p><p>找到ObjectMonitor的两个文件，hpp，cpp</p><p>先查看核心属性：<a href="http://hg.openjdk.java.net/jdk8u/jdk8u/hotspot/file/69087d08d473/src/share/vm/runtime/objectMonitor.hpp" target="_blank" rel="noreferrer">http://hg.openjdk.java.net/jdk8u/jdk8u/hotspot/file/69087d08d473/src/share/vm/runtime/objectMonitor.hpp</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ObjectMonitor() {</span></span>
<span class="line"><span>    _header       = NULL;   // header存储着MarkWord</span></span>
<span class="line"><span>    _count        = 0;      // 竞争锁的线程个数</span></span>
<span class="line"><span>    _waiters      = 0,      // wait的线程个数</span></span>
<span class="line"><span>    _recursions   = 0;      // 标识当前synchronized锁重入的次数</span></span>
<span class="line"><span>    _object       = NULL;</span></span>
<span class="line"><span>    _owner        = NULL;   // 持有锁的线程</span></span>
<span class="line"><span>    _WaitSet      = NULL;   // 保存wait的线程信息，双向链表</span></span>
<span class="line"><span>    _WaitSetLock  = 0 ;</span></span>
<span class="line"><span>    _Responsible  = NULL ;</span></span>
<span class="line"><span>    _succ         = NULL ;</span></span>
<span class="line"><span>    _cxq          = NULL ;  // 获取锁资源失败后，线程要放到当前的单向链表中</span></span>
<span class="line"><span>    FreeNext      = NULL ;</span></span>
<span class="line"><span>    _EntryList    = NULL ;  // _cxq以及被唤醒的WaitSet中的线程，在一定机制下，会放到EntryList中</span></span>
<span class="line"><span>    _SpinFreq     = 0 ;</span></span>
<span class="line"><span>    _SpinClock    = 0 ;</span></span>
<span class="line"><span>    OwnerIsThread = 0 ;</span></span>
<span class="line"><span>    _previous_owner_tid = 0;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>适当的查看几个C++中实现的加锁流程</p><p><a href="http://hg.openjdk.java.net/jdk8u/jdk8u/hotspot/file/69087d08d473/src/share/vm/runtime/objectMonitor.cpp" target="_blank" rel="noreferrer">http://hg.openjdk.java.net/jdk8u/jdk8u/hotspot/file/69087d08d473/src/share/vm/runtime/objectMonitor.cpp</a></p><p>TryLock</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>int ObjectMonitor::TryLock (Thread * Self) {</span></span>
<span class="line"><span>   for (;;) {</span></span>
<span class="line"><span>	  // 拿到持有锁的线程</span></span>
<span class="line"><span>      void * own = _owner ;</span></span>
<span class="line"><span>      // 如果有线程持有锁，告辞</span></span>
<span class="line"><span>      if (own != NULL) return 0 ;</span></span>
<span class="line"><span>      // 说明没有线程持有锁，own是null，cmpxchg指令就是底层的CAS实现。</span></span>
<span class="line"><span>      if (Atomic::cmpxchg_ptr (Self, &amp;_owner, NULL) == NULL) {</span></span>
<span class="line"><span>		 // 成功获取锁资源</span></span>
<span class="line"><span>         return 1 ;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      // 这里其实重试操作没什么意义，直接返回-1</span></span>
<span class="line"><span>      if (true) return -1 ;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>try_entry</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>bool ObjectMonitor::try_enter(Thread* THREAD) {</span></span>
<span class="line"><span>  // 在判断_owner是不是当前线程</span></span>
<span class="line"><span>  if (THREAD != _owner) {</span></span>
<span class="line"><span>    // 判断当前持有锁的线程是否是当前线程，说明轻量级锁刚刚升级过来的情况</span></span>
<span class="line"><span>    if (THREAD-&gt;is_lock_owned ((address)_owner)) {</span></span>
<span class="line"><span>       _owner = THREAD ;</span></span>
<span class="line"><span>       _recursions = 1 ;</span></span>
<span class="line"><span>       OwnerIsThread = 1 ;</span></span>
<span class="line"><span>       return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // CAS操作，尝试获取锁资源</span></span>
<span class="line"><span>    if (Atomic::cmpxchg_ptr (THREAD, &amp;_owner, NULL) != NULL) {</span></span>
<span class="line"><span>      // 没拿到锁资源，告辞</span></span>
<span class="line"><span>      return false;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 拿到锁资源</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    // 将_recursions + 1，代表锁重入操作。</span></span>
<span class="line"><span>    _recursions++;</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>enter（想方设法拿到锁资源，如果没拿到，挂起扔到_cxq单向链表中）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>void ATTR ObjectMonitor::enter(TRAPS) {</span></span>
<span class="line"><span>  // 拿到当前线程</span></span>
<span class="line"><span>  Thread * const Self = THREAD ;</span></span>
<span class="line"><span>  void * cur ;</span></span>
<span class="line"><span>  // CAS走你，</span></span>
<span class="line"><span>  cur = Atomic::cmpxchg_ptr (Self, &amp;_owner, NULL) ;</span></span>
<span class="line"><span>  if (cur == NULL) {</span></span>
<span class="line"><span>     // 拿锁成功</span></span>
<span class="line"><span>     return ;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 锁重入操作</span></span>
<span class="line"><span>  if (cur == Self) {</span></span>
<span class="line"><span>     // TODO-FIXME: check for integer overflow!  BUGID 6557169.</span></span>
<span class="line"><span>     _recursions ++ ;</span></span>
<span class="line"><span>     return ;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  //轻量级锁过来的。</span></span>
<span class="line"><span>  if (Self-&gt;is_lock_owned ((address)cur)) {</span></span>
<span class="line"><span>    _recursions = 1 ;</span></span>
<span class="line"><span>    _owner = Self ;</span></span>
<span class="line"><span>    OwnerIsThread = 1 ;</span></span>
<span class="line"><span>    return ;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 走到这了，没拿到锁资源，count++</span></span>
<span class="line"><span>  Atomic::inc_ptr(&amp;_count);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>      jt-&gt;set_suspend_equivalent();</span></span>
<span class="line"><span>      // 入队操作，进到cxq中</span></span>
<span class="line"><span>      EnterI (THREAD) ;</span></span>
<span class="line"><span>      if (!ExitSuspendEquivalent(jt)) break ;</span></span>
<span class="line"><span>      _recursions = 0 ;</span></span>
<span class="line"><span>      _succ = NULL ;</span></span>
<span class="line"><span>      exit (false, Self) ;</span></span>
<span class="line"><span>      jt-&gt;java_suspend_self();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // count--</span></span>
<span class="line"><span>  Atomic::dec_ptr(&amp;_count);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>EnterI</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>for (;;) {</span></span>
<span class="line"><span>    // 入队</span></span>
<span class="line"><span>    node._next = nxt = _cxq ;</span></span>
<span class="line"><span>    // CAS的方式入队。</span></span>
<span class="line"><span>    if (Atomic::cmpxchg_ptr (&amp;node, &amp;_cxq, nxt) == nxt) break ;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 重新尝试获取锁资源</span></span>
<span class="line"><span>    if (TryLock (Self) &gt; 0) {</span></span>
<span class="line"><span>        assert (_succ != Self         , &quot;invariant&quot;) ;</span></span>
<span class="line"><span>        assert (_owner == Self        , &quot;invariant&quot;) ;</span></span>
<span class="line"><span>        assert (_Responsible != Self  , &quot;invariant&quot;) ;</span></span>
<span class="line"><span>        return ;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="三、深入reentrantlock" tabindex="-1">三、<strong>深入ReentrantLock</strong> <a class="header-anchor" href="#三、深入reentrantlock" aria-label="Permalink to &quot;三、**深入ReentrantLock**&quot;">​</a></h2><h3 id="_3-1-reentrantlock和synchronized的区别" tabindex="-1">3.1 ReentrantLock和synchronized的区别 <a class="header-anchor" href="#_3-1-reentrantlock和synchronized的区别" aria-label="Permalink to &quot;3.1 ReentrantLock和synchronized的区别&quot;">​</a></h3><p>废话区别：单词不一样。。。</p><p>核心区别：</p><ul><li>ReentrantLock是个类，synchronized是关键字，当然都是在JVM层面实现互斥锁的方式</li></ul><p>效率区别：</p><ul><li>如果竞争比较激烈，推荐ReentrantLock去实现，不存在锁升级概念。而synchronized是存在锁升级概念的，如果升级到重量级锁，是不存在锁降级的。</li></ul><p>底层实现区别：</p><ul><li>实现原理是不一样，ReentrantLock基于AQS实现的，synchronized是基于ObjectMonitor</li></ul><p>功能向的区别：</p><ul><li><p>ReentrantLock的功能比synchronized更全面。</p></li><li><p>ReentrantLock支持公平锁和非公平锁</p></li><li><p>ReentrantLock可以指定等待锁资源的时间。</p></li></ul><p>选择哪个：如果你对并发编程特别熟练，推荐使用ReentrantLock，功能更丰富。如果掌握的一般般，使用synchronized会更好</p><h3 id="_3-2-aqs概述" tabindex="-1">3.2 AQS概述 <a class="header-anchor" href="#_3-2-aqs概述" aria-label="Permalink to &quot;3.2 AQS概述&quot;">​</a></h3><p>AQS就是AbstractQueuedSynchronizer类，AQS其实就是JUC包下的一个基类，JUC下的很多内容都是基于AQS实现了部分功能，比如ReentrantLock，ThreadPoolExecutor，阻塞队列，CountDownLatch，Semaphore，CyclicBarrier等等都是基于AQS实现。</p><p>首先AQS中提供了一个由volatile修饰，并且采用CAS方式修改的int类型的state变量。</p><p>其次AQS中维护了一个双向链表，有head，有tail，并且每个节点都是Node对象</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>static final class Node {</span></span>
<span class="line"><span>        static final Node SHARED = new Node();</span></span>
<span class="line"><span>        static final Node EXCLUSIVE = null;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        static final int CANCELLED =  1;</span></span>
<span class="line"><span>        static final int SIGNAL    = -1;</span></span>
<span class="line"><span>        static final int CONDITION = -2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        static final int PROPAGATE = -3;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        volatile int waitStatus;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        volatile Node prev;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        volatile Node next;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        volatile Thread thread; </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>AQS内部结构和属性</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/6f1f8f1f2ff4494c81adddef4a0897e6.png" alt="" loading="lazy"></p><h3 id="_3-3-加锁流程源码剖析" tabindex="-1">3.3 加锁流程源码剖析 <a class="header-anchor" href="#_3-3-加锁流程源码剖析" aria-label="Permalink to &quot;3.3 加锁流程源码剖析&quot;">​</a></h3><h4 id="_3-3-1-加锁流程概述" tabindex="-1">3.3.1 加锁流程概述 <a class="header-anchor" href="#_3-3-1-加锁流程概述" aria-label="Permalink to &quot;3.3.1 加锁流程概述&quot;">​</a></h4><p>这个是非公平锁的流程</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/d25877e5d048450180f19d97a0778fba.png" alt="" loading="lazy"></p><h4 id="_3-3-2-三种加锁源码分析" tabindex="-1">3.3.2 三种加锁源码分析 <a class="header-anchor" href="#_3-3-2-三种加锁源码分析" aria-label="Permalink to &quot;3.3.2 三种加锁源码分析&quot;">​</a></h4><h5 id="_3-3-2-1-lock方法" tabindex="-1">3.3.2.1 lock方法 <a class="header-anchor" href="#_3-3-2-1-lock方法" aria-label="Permalink to &quot;3.3.2.1 lock方法&quot;">​</a></h5><ol><li>执行lock方法后，公平锁和非公平锁的执行套路不一样</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 非公平锁</span></span>
<span class="line"><span>final void lock() {</span></span>
<span class="line"><span>    // 上来就先基于CAS的方式，尝试将state从0改为1</span></span>
<span class="line"><span>    if (compareAndSetState(0, 1))</span></span>
<span class="line"><span>        // 获取锁资源成功，会将当前线程设置到exclusiveOwnerThread属性，代表是当前线程持有着锁资源</span></span>
<span class="line"><span>        setExclusiveOwnerThread(Thread.currentThread());</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        // 执行acquire，尝试获取锁资源</span></span>
<span class="line"><span>        acquire(1);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 公平锁</span></span>
<span class="line"><span>final void lock() {</span></span>
<span class="line"><span>    //  执行acquire，尝试获取锁资源</span></span>
<span class="line"><span>    acquire(1);</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="2"><li>acquire方法，是公平锁和非公平锁的逻辑一样</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public final void acquire(int arg) {</span></span>
<span class="line"><span>    // tryAcquire：再次查看，当前线程是否可以尝试获取锁资源</span></span>
<span class="line"><span>    if (!tryAcquire(arg) &amp;&amp;</span></span>
<span class="line"><span>        // 没有拿到锁资源</span></span>
<span class="line"><span>        // addWaiter(Node.EXCLUSIVE)：将当前线程封装为Node节点，插入到AQS的双向链表的结尾</span></span>
<span class="line"><span>        // acquireQueued：查看我是否是第一个排队的节点，如果是可以再次尝试获取锁资源，如果长时间拿不到，挂起线程</span></span>
<span class="line"><span>        // 如果不是第一个排队的额节点，就尝试挂起线程即可</span></span>
<span class="line"><span>        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))</span></span>
<span class="line"><span>        // 中断线程的操作</span></span>
<span class="line"><span>        selfInterrupt();</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="3"><li>tryAcquire方法竞争锁最资源的逻辑，分为公平锁和非公平锁</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 非公平锁实现</span></span>
<span class="line"><span>final boolean nonfairTryAcquire(int acquires) {</span></span>
<span class="line"><span>    // 获取当前线程</span></span>
<span class="line"><span>    final Thread current = Thread.currentThread();</span></span>
<span class="line"><span>    // 获取了state熟属性</span></span>
<span class="line"><span>    int c = getState();</span></span>
<span class="line"><span>    // 判断state当前是否为0,之前持有锁的线程释放了锁资源</span></span>
<span class="line"><span>    if (c == 0) {</span></span>
<span class="line"><span>        // 再次抢一波锁资源</span></span>
<span class="line"><span>        if (compareAndSetState(0, acquires)) {</span></span>
<span class="line"><span>            setExclusiveOwnerThread(current);</span></span>
<span class="line"><span>            // 拿锁成功返回true</span></span>
<span class="line"><span>            return true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 不是0，有线程持有着锁资源，如果是，证明是锁重入操作</span></span>
<span class="line"><span>    else if (current == getExclusiveOwnerThread()) {</span></span>
<span class="line"><span>        // 将state + 1</span></span>
<span class="line"><span>        int nextc = c + acquires;</span></span>
<span class="line"><span>        if (nextc &lt; 0) // 说明对重入次数+1后，超过了int正数的取值范围</span></span>
<span class="line"><span>            // 01111111 11111111 11111111 11111111</span></span>
<span class="line"><span>            // 10000000 00000000 00000000 00000000</span></span>
<span class="line"><span>            // 说明重入的次数超过界限了。</span></span>
<span class="line"><span>            throw new Error(&quot;Maximum lock count exceeded&quot;);</span></span>
<span class="line"><span>        // 正常的将计算结果，复制给state</span></span>
<span class="line"><span>        setState(nextc);</span></span>
<span class="line"><span>        // 锁重入成功</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 返回false</span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>// 公平锁实现<br> protected final boolean tryAcquire(int acquires) {<br> // 获取当前线程<br> final Thread current = Thread.currentThread();<br> // ....<br> int c = getState();<br> if (c == 0) {<br> // 查看AQS中是否有排队的Node<br> // 没人排队抢一手 。有人排队，如果我是第一个，也抢一手<br> if (!hasQueuedPredecessors() &amp;&amp;<br> // 抢一手~<br> compareAndSetState(0, acquires)) {<br> setExclusiveOwnerThread(current);<br> return true;<br> }<br> }<br> // 锁重入~~~<br> else if (current == getExclusiveOwnerThread()) {<br> int nextc = c + acquires;<br> if (nextc &lt; 0)<br> throw new Error(&quot;Maximum lock count exceeded&quot;);<br> setState(nextc);<br> return true;<br> }<br> return false;<br> }<br> // 查看是否有线程在AQS的双向队列中排队<br> // 返回false，代表没人排队<br> public final boolean hasQueuedPredecessors() {<br> // 头尾节点<br> Node t = tail;<br> Node h = head;<br> // s为头结点的next节点<br> Node s;<br> // 如果头尾节点相等，证明没有线程排队，直接去抢占锁资源<br> return h != t &amp;&amp;<br> // s节点不为null，并且s节点的线程为当前线程（排在第一名的是不是我）<br> (s == null || s.thread != Thread.currentThread());<br> }</p><ol start="4"><li>addWaite方法，将没有拿到锁资源的线程扔到AQS队列中去排队</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 没有拿到锁资源，过来排队，  mode：代表互斥锁</span></span>
<span class="line"><span>private Node addWaiter(Node mode) {</span></span>
<span class="line"><span>    // 将当前线程封装为Node，</span></span>
<span class="line"><span>    Node node = new Node(Thread.currentThread(), mode);</span></span>
<span class="line"><span>    // 拿到尾结点</span></span>
<span class="line"><span>    Node pred = tail;</span></span>
<span class="line"><span>    // 如果尾结点不为null</span></span>
<span class="line"><span>    if (pred != null) {</span></span>
<span class="line"><span>        // 当前节点的prev指向尾结点</span></span>
<span class="line"><span>        node.prev = pred;</span></span>
<span class="line"><span>        // 以CAS的方式，将当前线程设置为tail节点</span></span>
<span class="line"><span>        if (compareAndSetTail(pred, node)) {</span></span>
<span class="line"><span>            // 将之前的尾结点的next指向当前节点</span></span>
<span class="line"><span>            pred.next = node;</span></span>
<span class="line"><span>            return node;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 如果CAS失败，以死循环的方式，保证当前线程的Node一定可以放到AQS队列的末尾</span></span>
<span class="line"><span>    enq(node);</span></span>
<span class="line"><span>    return node;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private Node enq(final Node node) {</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 拿到尾结点</span></span>
<span class="line"><span>        Node t = tail;</span></span>
<span class="line"><span>        // 如果尾结点为空，AQS中一个节点都没有，构建一个伪节点，作为head和tail</span></span>
<span class="line"><span>        if (t == null) { </span></span>
<span class="line"><span>            if (compareAndSetHead(new Node()))</span></span>
<span class="line"><span>                tail = head;</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            // 比较熟悉了，以CAS的方式，在AQS中有节点后，插入到AQS队列的末尾</span></span>
<span class="line"><span>            node.prev = t;</span></span>
<span class="line"><span>            if (compareAndSetTail(t, node)) {</span></span>
<span class="line"><span>                t.next = node;</span></span>
<span class="line"><span>                return t;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="5"><li>acquireQueued方法，判断当前线程是否还能再次尝试获取锁资源，如果不能再次获取锁资源，或者又没获取到，尝试将当前线程挂起</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 当前没有拿到锁资源后，并且到AQS排队了之后触发的方法。  中断操作这里不用考虑</span></span>
<span class="line"><span>final boolean acquireQueued(final Node node, int arg) {</span></span>
<span class="line"><span>    // 不考虑中断</span></span>
<span class="line"><span>    // failed：获取锁资源是否失败（这里简单掌握落地，真正触发的，还是tryLock和lockInterruptibly）</span></span>
<span class="line"><span>    boolean failed = true;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        boolean interrupted = false;</span></span>
<span class="line"><span>        // 死循环…………</span></span>
<span class="line"><span>        for (;;) {</span></span>
<span class="line"><span>            // 拿到当前节点的前继节点</span></span>
<span class="line"><span>            final Node p = node.predecessor();</span></span>
<span class="line"><span>            // 前继节点是否是head，如果是head，再次执行tryAcquire尝试获取锁资源。</span></span>
<span class="line"><span>            if (p == head &amp;&amp; tryAcquire(arg)) {</span></span>
<span class="line"><span>                // 获取锁资源成功</span></span>
<span class="line"><span>                // 设置头结点为当前获取锁资源成功Node，并且取消thread信息</span></span>
<span class="line"><span>                setHead(node);</span></span>
<span class="line"><span>                // help GC</span></span>
<span class="line"><span>                p.next = null; </span></span>
<span class="line"><span>                // 获取锁失败标识为false</span></span>
<span class="line"><span>                failed = false;</span></span>
<span class="line"><span>                return interrupted;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 没拿到锁资源……</span></span>
<span class="line"><span>            // shouldParkAfterFailedAcquire：基于上一个节点转改来判断当前节点是否能够挂起线程，如果可以返回true，</span></span>
<span class="line"><span>            // 如果不能，就返回false，继续下次循环</span></span>
<span class="line"><span>            if (shouldParkAfterFailedAcquire(p, node) &amp;&amp;</span></span>
<span class="line"><span>                // 这里基于Unsafe类的park方法，将当前线程挂起</span></span>
<span class="line"><span>                parkAndCheckInterrupt())</span></span>
<span class="line"><span>                interrupted = true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        if (failed)</span></span>
<span class="line"><span>            // 在lock方法中，基本不会执行。</span></span>
<span class="line"><span>            cancelAcquire(node);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 获取锁资源成功后，先执行setHead</span></span>
<span class="line"><span>private void setHead(Node node) {</span></span>
<span class="line"><span>    // 当前节点作为头结点  伪</span></span>
<span class="line"><span>    head = node;</span></span>
<span class="line"><span>    // 头结点不需要线程信息</span></span>
<span class="line"><span>    node.thread = null;</span></span>
<span class="line"><span>    node.prev = null;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 当前Node没有拿到锁资源，或者没有资格竞争锁资源，看一下能否挂起当前线程</span></span>
<span class="line"><span>private static boolean shouldParkAfterFailedAcquire(Node pred, Node node) {</span></span>
<span class="line"><span>    // -1，SIGNAL状态：代表当前节点的后继节点，可以挂起线程，后续我会唤醒我的后继节点</span></span>
<span class="line"><span>    // 1，CANCELLED状态：代表当前节点以及取消了</span></span>
<span class="line"><span>    int ws = pred.waitStatus;</span></span>
<span class="line"><span>    if (ws == Node.SIGNAL)</span></span>
<span class="line"><span>        // 上一个节点为-1之后，当前节点才可以安心的挂起线程</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    if (ws &gt; 0) {</span></span>
<span class="line"><span>        // 如果当前节点的上一个节点是取消状态，我需要往前找到一个状态不为1的Node，作为他的next节点</span></span>
<span class="line"><span>        // 找到状态不为1的节点后，设置一下next和prev</span></span>
<span class="line"><span>        do {</span></span>
<span class="line"><span>            node.prev = pred = pred.prev;</span></span>
<span class="line"><span>        } while (pred.waitStatus &gt; 0);</span></span>
<span class="line"><span>        pred.next = node;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        // 上一个节点的状态不是1或者-1，那就代表节点状态正常，将上一个节点的状态改为-1</span></span>
<span class="line"><span>        compareAndSetWaitStatus(pred, ws, Node.SIGNAL);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="_3-3-2-2-trylock方法" tabindex="-1">3.3.2.2 tryLock方法 <a class="header-anchor" href="#_3-3-2-2-trylock方法" aria-label="Permalink to &quot;3.3.2.2 tryLock方法&quot;">​</a></h5><ul><li>tryLock();</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// tryLock方法，无论公平锁还有非公平锁。都会走非公平锁抢占锁资源的操作</span></span>
<span class="line"><span>// 就是拿到state的值， 如果是0，直接CAS浅尝一下</span></span>
<span class="line"><span>// state 不是0，那就看下是不是锁重入操作</span></span>
<span class="line"><span>// 如果没抢到，或者不是锁重入操作，告辞，返回false</span></span>
<span class="line"><span>public boolean tryLock() {</span></span>
<span class="line"><span>    // 非公平锁的竞争锁操作</span></span>
<span class="line"><span>    return sync.nonfairTryAcquire(1);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>final boolean nonfairTryAcquire(int acquires) {</span></span>
<span class="line"><span>    final Thread current = Thread.currentThread();</span></span>
<span class="line"><span>    int c = getState();</span></span>
<span class="line"><span>    if (c == 0) {</span></span>
<span class="line"><span>        if (compareAndSetState(0, acquires)) {</span></span>
<span class="line"><span>            setExclusiveOwnerThread(current);</span></span>
<span class="line"><span>            return true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    else if (current == getExclusiveOwnerThread()) {</span></span>
<span class="line"><span>        int nextc = c + acquires;</span></span>
<span class="line"><span>        if (nextc &lt; 0) // overflow</span></span>
<span class="line"><span>            throw new Error(&quot;Maximum lock count exceeded&quot;);</span></span>
<span class="line"><span>        setState(nextc);</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><p>tryLock(time,unit);</p></li><li><p>第一波分析，类似的代码：</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// tryLock(time,unit)执行的方法</span></span>
<span class="line"><span>public final boolean tryAcquireNanos(int arg, long nanosTimeout)throws InterruptedException {</span></span>
<span class="line"><span>    // 线程的中断标记位，是不是从false，别改为了true，如果是，直接抛异常</span></span>
<span class="line"><span>    if (Thread.interrupted())</span></span>
<span class="line"><span>        throw new InterruptedException();</span></span>
<span class="line"><span>    // tryAcquire分为公平和非公平锁两种执行方式，如果拿锁成功， 直接告辞，</span></span>
<span class="line"><span>    return tryAcquire(arg) ||</span></span>
<span class="line"><span>        // 如果拿锁失败，在这要等待指定时间</span></span>
<span class="line"><span>        doAcquireNanos(arg, nanosTimeout);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private boolean doAcquireNanos(int arg, long nanosTimeout)</span></span>
<span class="line"><span>        throws InterruptedException {</span></span>
<span class="line"><span>    // 如果等待时间是0秒，直接告辞，拿锁失败  </span></span>
<span class="line"><span>    if (nanosTimeout &lt;= 0L)</span></span>
<span class="line"><span>        return false;</span></span>
<span class="line"><span>    // 设置结束时间。</span></span>
<span class="line"><span>    final long deadline = System.nanoTime() + nanosTimeout;</span></span>
<span class="line"><span>    // 先扔到AQS队列</span></span>
<span class="line"><span>    final Node node = addWaiter(Node.EXCLUSIVE);</span></span>
<span class="line"><span>    // 拿锁失败，默认true</span></span>
<span class="line"><span>    boolean failed = true;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        for (;;) {</span></span>
<span class="line"><span>            // 如果在AQS中，当前node是head的next，直接抢锁</span></span>
<span class="line"><span>            final Node p = node.predecessor();</span></span>
<span class="line"><span>            if (p == head &amp;&amp; tryAcquire(arg)) {</span></span>
<span class="line"><span>                setHead(node);</span></span>
<span class="line"><span>                p.next = null; // help GC</span></span>
<span class="line"><span>                failed = false;</span></span>
<span class="line"><span>                return true;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 结算剩余的可用时间</span></span>
<span class="line"><span>            nanosTimeout = deadline - System.nanoTime();</span></span>
<span class="line"><span>            // 判断是否是否用尽的位置</span></span>
<span class="line"><span>            if (nanosTimeout &lt;= 0L)</span></span>
<span class="line"><span>                return false;</span></span>
<span class="line"><span>            // shouldParkAfterFailedAcquire：根据上一个节点来确定现在是否可以挂起线程</span></span>
<span class="line"><span>            if (shouldParkAfterFailedAcquire(p, node) &amp;&amp;</span></span>
<span class="line"><span>                // 避免剩余时间太少，如果剩余时间少就不用挂起线程</span></span>
<span class="line"><span>                nanosTimeout &gt; spinForTimeoutThreshold)</span></span>
<span class="line"><span>                // 如果剩余时间足够，将线程挂起剩余时间</span></span>
<span class="line"><span>                LockSupport.parkNanos(this, nanosTimeout);</span></span>
<span class="line"><span>            // 如果线程醒了，查看是中断唤醒的，还是时间到了唤醒的。</span></span>
<span class="line"><span>            if (Thread.interrupted())</span></span>
<span class="line"><span>                // 是中断唤醒的！</span></span>
<span class="line"><span>                throw new InterruptedException();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        if (failed)</span></span>
<span class="line"><span>            cancelAcquire(node);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>取消节点分析：<img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/c283fb2473a8401985b9f874cb222f40.png" alt="" loading="lazy"></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 取消在AQS中排队的Node</span></span>
<span class="line"><span>private void cancelAcquire(Node node) {</span></span>
<span class="line"><span>    // 如果当前节点为null，直接忽略。</span></span>
<span class="line"><span>    if (node == null)</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    //1. 线程设置为null</span></span>
<span class="line"><span>    node.thread = null;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //2. 往前跳过被取消的节点，找到一个有效节点</span></span>
<span class="line"><span>    Node pred = node.prev;</span></span>
<span class="line"><span>    while (pred.waitStatus &gt; 0)</span></span>
<span class="line"><span>        node.prev = pred = pred.prev;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //3. 拿到了上一个节点之前的next</span></span>
<span class="line"><span>    Node predNext = pred.next;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //4. 当前节点状态设置为1，代表节点取消</span></span>
<span class="line"><span>    node.waitStatus = Node.CANCELLED;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 脱离AQS队列的操作</span></span>
<span class="line"><span>    // 当前Node是尾结点，将tail从当前节点替换为上一个节点</span></span>
<span class="line"><span>    if (node == tail &amp;&amp; compareAndSetTail(node, pred)) {</span></span>
<span class="line"><span>        compareAndSetNext(pred, predNext, null);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        // 到这上面的操作CAS操作失败</span></span>
<span class="line"><span>        int ws = pred.waitStatus;</span></span>
<span class="line"><span>        // 不是head的后继节点</span></span>
<span class="line"><span>        if (pred != head &amp;&amp;</span></span>
<span class="line"><span>            // 拿到上一个节点的状态，只要上一个节点的状态不是取消状态，就改为-1</span></span>
<span class="line"><span>            (ws == Node.SIGNAL || (ws &lt;= 0 &amp;&amp; compareAndSetWaitStatus(pred, ws, Node.SIGNAL))) </span></span>
<span class="line"><span>            &amp;&amp; pred.thread != null) {</span></span>
<span class="line"><span>            // 上面的判断都是为了避免后面节点无法被唤醒。</span></span>
<span class="line"><span>            // 前继节点是有效节点，可以唤醒后面的节点</span></span>
<span class="line"><span>            Node next = node.next;</span></span>
<span class="line"><span>            if (next != null &amp;&amp; next.waitStatus &lt;= 0)</span></span>
<span class="line"><span>                compareAndSetNext(pred, predNext, next);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            // 当前节点是head的后继节点</span></span>
<span class="line"><span>            unparkSuccessor(node);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        node.next = node; // help GC</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="_3-3-2-3-lockinterruptibly方法" tabindex="-1">3.3.2.3 lockInterruptibly方法 <a class="header-anchor" href="#_3-3-2-3-lockinterruptibly方法" aria-label="Permalink to &quot;3.3.2.3 lockInterruptibly方法&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 这个是lockInterruptibly和tryLock(time,unit)唯一的区别</span></span>
<span class="line"><span>// lockInterruptibly，拿不到锁资源，就死等，等到锁资源释放后，被唤醒，或者是被中断唤醒</span></span>
<span class="line"><span>private void doAcquireInterruptibly(int arg) throws InterruptedException {</span></span>
<span class="line"><span>    final Node node = addWaiter(Node.EXCLUSIVE);</span></span>
<span class="line"><span>    boolean failed = true;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        for (;;) {</span></span>
<span class="line"><span>            final Node p = node.predecessor();</span></span>
<span class="line"><span>            if (p == head &amp;&amp; tryAcquire(arg)) {</span></span>
<span class="line"><span>                setHead(node);</span></span>
<span class="line"><span>                p.next = null; // help GC</span></span>
<span class="line"><span>                failed = false;</span></span>
<span class="line"><span>                return;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            if (shouldParkAfterFailedAcquire(p, node) &amp;&amp; parkAndCheckInterrupt())</span></span>
<span class="line"><span>                // 中断唤醒抛异常！</span></span>
<span class="line"><span>                throw new InterruptedException();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        if (failed)</span></span>
<span class="line"><span>            cancelAcquire(node);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private final boolean parkAndCheckInterrupt() {</span></span>
<span class="line"><span>    LockSupport.park(this);</span></span>
<span class="line"><span>    // 这个方法可以确认，当前挂起的线程，是被中断唤醒的，还是被正常唤醒的。</span></span>
<span class="line"><span>    // 中断唤醒，返回true，如果是正常唤醒，返回false</span></span>
<span class="line"><span>    return Thread.interrupted();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-4-释放锁流程源码剖析" tabindex="-1">3.4 释放锁流程源码剖析 <a class="header-anchor" href="#_3-4-释放锁流程源码剖析" aria-label="Permalink to &quot;3.4 释放锁流程源码剖析&quot;">​</a></h3><h4 id="_3-4-1-释放锁流程概述" tabindex="-1">3.4.1 释放锁流程概述 <a class="header-anchor" href="#_3-4-1-释放锁流程概述" aria-label="Permalink to &quot;3.4.1 释放锁流程概述&quot;">​</a></h4><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/33b1deba4dd94713b2f6071e54813fe2.png" alt="" loading="lazy"></p><h4 id="_3-4-2-释放锁源码分析" tabindex="-1">3.4.2 释放锁源码分析 <a class="header-anchor" href="#_3-4-2-释放锁源码分析" aria-label="Permalink to &quot;3.4.2 释放锁源码分析&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void unlock() {</span></span>
<span class="line"><span>    // 释放锁资源不分为公平锁和非公平锁，都是一个sync对象</span></span>
<span class="line"><span>    sync.release(1);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 释放锁的核心流程</span></span>
<span class="line"><span>public final boolean release(int arg) {</span></span>
<span class="line"><span>    // 核心释放锁资源的操作之一</span></span>
<span class="line"><span>    if (tryRelease(arg)) {</span></span>
<span class="line"><span>        // 如果锁已经释放掉了，走这个逻辑</span></span>
<span class="line"><span>        Node h = head;</span></span>
<span class="line"><span>        // h不为null，说明没有排队的</span></span>
<span class="line"><span>        // 如果h的状态不为0（为-1），说明后面有排队的Node，并且线程已经挂起了。</span></span>
<span class="line"><span>        if (h != null &amp;&amp; h.waitStatus != 0)</span></span>
<span class="line"><span>            // 唤醒排队的线程</span></span>
<span class="line"><span>            unparkSuccessor(h);</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// ReentrantLock释放锁资源操作</span></span>
<span class="line"><span>protected final boolean tryRelease(int releases) {</span></span>
<span class="line"><span>    // 拿到state - 1（并没有赋值给state）</span></span>
<span class="line"><span>    int c = getState() - releases;</span></span>
<span class="line"><span>    // 判断当前持有锁的线程是否是当前线程，如果不是，直接抛出异常</span></span>
<span class="line"><span>    if (Thread.currentThread() != getExclusiveOwnerThread())</span></span>
<span class="line"><span>        throw new IllegalMonitorStateException();</span></span>
<span class="line"><span>    // free，代表当前锁资源是否释放干净了。</span></span>
<span class="line"><span>    boolean free = false;</span></span>
<span class="line"><span>    if (c == 0) {</span></span>
<span class="line"><span>        // 如果state - 1后的值为0，代表释放干净了。</span></span>
<span class="line"><span>        free = true;</span></span>
<span class="line"><span>        // 将持有锁的线程置位null</span></span>
<span class="line"><span>        setExclusiveOwnerThread(null);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 将c设置给state</span></span>
<span class="line"><span>    setState(c);</span></span>
<span class="line"><span>    // 锁资源释放干净返回true，否则返回false</span></span>
<span class="line"><span>    return free;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 唤醒后面排队的Node</span></span>
<span class="line"><span>private void unparkSuccessor(Node node) {</span></span>
<span class="line"><span>    // 拿到头节点状态</span></span>
<span class="line"><span>    int ws = node.waitStatus;</span></span>
<span class="line"><span>    if (ws &lt; 0)</span></span>
<span class="line"><span>        // 先基于CAS，将节点状态从-1，改为0</span></span>
<span class="line"><span>        compareAndSetWaitStatus(node, ws, 0);</span></span>
<span class="line"><span>    // 拿到头节点的后续节点。</span></span>
<span class="line"><span>    Node s = node.next;</span></span>
<span class="line"><span>    // 如果后续节点为null或者，后续节点的状态为1，代表节点取消了。</span></span>
<span class="line"><span>    if (s == null || s.waitStatus &gt; 0) {</span></span>
<span class="line"><span>        s = null;</span></span>
<span class="line"><span>        // 如果后续节点为null，或者后续节点状态为取消状态，从后往前找到一个有效节点环境</span></span>
<span class="line"><span>        for (Node t = tail; t != null &amp;&amp; t != node; t = t.prev)</span></span>
<span class="line"><span>            // 从后往前找到状态小于等于0的节点</span></span>
<span class="line"><span>            // 找到离head最新的有效节点，并赋值给s</span></span>
<span class="line"><span>            if (t.waitStatus &lt;= 0)</span></span>
<span class="line"><span>                s = t;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 只要找到了这个需要被唤醒的节点，执行unpark唤醒</span></span>
<span class="line"><span>    if (s != null)</span></span>
<span class="line"><span>        LockSupport.unpark(s.thread);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-5-aqs常见的问题" tabindex="-1">3.5 AQS常见的问题 <a class="header-anchor" href="#_3-5-aqs常见的问题" aria-label="Permalink to &quot;3.5 AQS常见的问题&quot;">​</a></h3><h4 id="_3-5-1-aqs中为什么要有一个虚拟的head节点" tabindex="-1">3.5.1 AQS中为什么要有一个虚拟的head节点 <a class="header-anchor" href="#_3-5-1-aqs中为什么要有一个虚拟的head节点" aria-label="Permalink to &quot;3.5.1 AQS中为什么要有一个虚拟的head节点&quot;">​</a></h4><p>因为AQS提供了ReentrantLock的基本实现，而在ReentrantLock释放锁资源时，需要去考虑是否需要执行unparkSuccessor方法，去唤醒后继节点。</p><p>因为Node中存在waitStatus的状态，默认情况下状态为0，如果当前节点的后继节点线程挂起了，那么就将当前节点的状态设置为-1。这个-1状态的出现是为了避免重复唤醒或者释放资源的问题。</p><p>因为AQS中排队的Node中的线程如果挂起了，是无法自动唤醒的。需要释放锁或者释放资源后，再被释放的线程去唤醒挂起的线程。 因为唤醒节点需要从整个AQS双向链表中找到离head最近的有效节点去唤醒。而这个找离head最近的Node可能需要遍历整个双向链表。如果AQS中，没有挂起的线程，代表不需要去遍历AQS双向链表去找离head最近的有效节点。</p><p>为了避免出现不必要的循环链表操作，提供了一个-1的状态。如果只有一个Node进入到AQS中排队，所以发现如果是第一个Node进来，他必须先初始化一个虚拟的head节点作为头，来监控后继节点中是否有挂起的线程。</p><h4 id="_3-5-2-aqs中为什么选择使用双向链表-而不是单向链表" tabindex="-1">3.5.2 AQS中为什么选择使用双向链表，而不是单向链表 <a class="header-anchor" href="#_3-5-2-aqs中为什么选择使用双向链表-而不是单向链表" aria-label="Permalink to &quot;3.5.2 AQS中为什么选择使用双向链表，而不是单向链表&quot;">​</a></h4><p>首先AQS中一般是存放没有获取到资源的Node，而在竞争锁资源时，ReentrantLock提供了一个方法，lockInterruptibly方法，也就是线程在竞争锁资源的排队途中，允许中断。中断后会执行cancelAcquire方法，从而将当前节点状态置位1，并且从AQS队列中移除掉。如果采用单向链表，当前节点只能按到后继或者前继节点，这样是无法将前继节点指向后继节点的，需要遍历整个AQS从头或者从尾去找。单向链表在移除AQS中排队的Node时，成本很高。</p><p>当前在唤醒后继节点时，如果是单向链表也会出问题，因为节点插入方式的问题，导致只能单向的去找有效节点去唤醒，从而造成很多次无效的遍历操作，如果是双向链表就可以解决这个问题。</p><h2 id="四、深入reentrantreadwritelock" tabindex="-1">四、<strong>深入ReentrantReadWriteLock</strong> <a class="header-anchor" href="#四、深入reentrantreadwritelock" aria-label="Permalink to &quot;四、**深入ReentrantReadWriteLock**&quot;">​</a></h2><h3 id="一、为什么要出现读写锁" tabindex="-1">一、为什么要出现读写锁 <a class="header-anchor" href="#一、为什么要出现读写锁" aria-label="Permalink to &quot;一、为什么要出现读写锁&quot;">​</a></h3><p>synchronized和ReentrantLock都是互斥锁。</p><p>如果说有一个操作是读多写少的，还要保证线程安全的话。如果采用上述的两种互斥锁，效率方面很定是很低的。</p><p>在这种情况下，咱们就可以使用ReentrantReadWriteLock读写锁去实现。</p><p>读读之间是不互斥的，可以读和读操作并发执行。</p><p>但是如果涉及到了写操作，那么还得是互斥的操作。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>static ReentrantReadWriteLock lock = new ReentrantReadWriteLock();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>static ReentrantReadWriteLock.WriteLock writeLock = lock.writeLock();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>static ReentrantReadWriteLock.ReadLock readLock = lock.readLock();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        readLock.lock();</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            System.out.println(&quot;子线程！&quot;);</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                Thread.sleep(500000);</span></span>
<span class="line"><span>            } catch (InterruptedException e) {</span></span>
<span class="line"><span>                e.printStackTrace();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        } finally {</span></span>
<span class="line"><span>            readLock.unlock();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Thread.sleep(1000);</span></span>
<span class="line"><span>    writeLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        System.out.println(&quot;主线程！&quot;);</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        writeLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="二、读写锁的实现原理" tabindex="-1">二、读写锁的实现原理 <a class="header-anchor" href="#二、读写锁的实现原理" aria-label="Permalink to &quot;二、读写锁的实现原理&quot;">​</a></h3><p><strong>ReentrantReadWriteLock还是基于AQS实现的，还是对state进行操作，拿到锁资源就去干活，如果没有拿到，依然去AQS队列中排队。</strong></p><p><strong>读锁操作：基于state的高16位进行操作。</strong></p><p><strong>写锁操作：基于state的低16为进行操作。</strong></p><p><strong>ReentrantReadWriteLock依然是可重入锁。</strong></p><p><strong>写锁重入</strong>：读写锁中的写锁的重入方式，基本和ReentrantLock一致，没有什么区别，依然是对state进行+1操作即可，只要确认持有锁资源的线程，是当前写锁线程即可。只不过之前ReentrantLock的重入次数是state的正数取值范围，但是读写锁中写锁范围就变小了。</p><p><strong>读锁重入</strong>：因为读锁是共享锁。读锁在获取锁资源操作时，是要对state的高16位进行 + 1操作。因为读锁是共享锁，所以同一时间会有多个读线程持有读锁资源。这样一来，多个读操作在持有读锁时，无法确认每个线程读锁重入的次数。为了去记录读锁重入的次数，每个读操作的线程，都会有一个ThreadLocal记录锁重入的次数。</p><p><strong>写锁的饥饿问题</strong>：读锁是共享锁，当有线程持有读锁资源时，再来一个线程想要获取读锁，直接对state修改即可。在读锁资源先被占用后，来了一个写锁资源，此时，大量的需要获取读锁的线程来请求锁资源，如果可以绕过写锁，直接拿资源，会造成写锁长时间无法获取到写锁资源。</p><p><strong>读锁在拿到锁资源后，如果再有读线程需要获取读锁资源，需要去AQS队列排队。如果队列的前面需要写锁资源的线程，那么后续读线程是无法拿到锁资源的。持有读锁的线程，只会让写锁线程之前的读线程拿到锁资源</strong></p><h3 id="三、写锁分析" tabindex="-1">三、写锁分析 <a class="header-anchor" href="#三、写锁分析" aria-label="Permalink to &quot;三、写锁分析&quot;">​</a></h3><h4 id="_3-1-写锁加锁流程概述" tabindex="-1">3.1 写锁加锁流程概述 <a class="header-anchor" href="#_3-1-写锁加锁流程概述" aria-label="Permalink to &quot;3.1 写锁加锁流程概述&quot;">​</a></h4><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/09215181ecf44581aa9b0e464e05b418.png" alt="" loading="lazy"></p><h4 id="_3-2-写锁加锁源码分析" tabindex="-1">3.2 写锁加锁源码分析 <a class="header-anchor" href="#_3-2-写锁加锁源码分析" aria-label="Permalink to &quot;3.2 写锁加锁源码分析&quot;">​</a></h4><p>写锁加锁流程</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 写锁加锁的入口</span></span>
<span class="line"><span>public void lock() {</span></span>
<span class="line"><span>    sync.acquire(1);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 阿巴阿巴！！</span></span>
<span class="line"><span>public final void acquire(int arg) {</span></span>
<span class="line"><span>    if (!tryAcquire(arg) &amp;&amp;</span></span>
<span class="line"><span>        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))</span></span>
<span class="line"><span>        selfInterrupt();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 读写锁的写锁实现tryAcquire</span></span>
<span class="line"><span>protected final boolean tryAcquire(int acquires) {</span></span>
<span class="line"><span>    // 拿到当前线程</span></span>
<span class="line"><span>    Thread current = Thread.currentThread();</span></span>
<span class="line"><span>    // 拿到state的值</span></span>
<span class="line"><span>    int c = getState();</span></span>
<span class="line"><span>    // 得到state低16位的值</span></span>
<span class="line"><span>    int w = exclusiveCount(c);</span></span>
<span class="line"><span>    // 判断是否有线程持有着锁资源</span></span>
<span class="line"><span>    if (c != 0) {</span></span>
<span class="line"><span>        // 当前没有线程持有写锁，读写互斥，告辞。</span></span>
<span class="line"><span>        // 有线程持有写锁，持有写锁的线程不是当前线程，不是锁重入，告辞。</span></span>
<span class="line"><span>        if (w == 0 || current != getExclusiveOwnerThread())</span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span>        // 当前线程持有写锁。 锁重入。</span></span>
<span class="line"><span>        if (w + exclusiveCount(acquires) &gt; MAX_COUNT)</span></span>
<span class="line"><span>            throw new Error(&quot;Maximum lock count exceeded&quot;);</span></span>
<span class="line"><span>        // 没有超过锁重入的次数，正常 + 1</span></span>
<span class="line"><span>        setState(c + acquires);</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 尝试获取锁资源</span></span>
<span class="line"><span>    if (writerShouldBlock() ||</span></span>
<span class="line"><span>        // CAS拿锁</span></span>
<span class="line"><span>        !compareAndSetState(c, c + acquires))</span></span>
<span class="line"><span>        return false;</span></span>
<span class="line"><span>    // 拿锁成功，设置占有互斥锁的线程</span></span>
<span class="line"><span>    setExclusiveOwnerThread(current);</span></span>
<span class="line"><span>    // 返回true</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ================================================================</span></span>
<span class="line"><span>// 这个方法是将state的低16位的值拿到</span></span>
<span class="line"><span>int w = exclusiveCount(c);</span></span>
<span class="line"><span>state &amp; ((1 &lt;&lt; 16) - 1)</span></span>
<span class="line"><span>00000000 00000000 00000000 00000001    ==   1</span></span>
<span class="line"><span>00000000 00000001 00000000 00000000    ==   1 &lt;&lt; 16</span></span>
<span class="line"><span>00000000 00000000 11111111 11111111    ==   (1 &lt;&lt; 16) - 1</span></span>
<span class="line"><span>&amp;运算，一个为0，必然为0，都为1，才为1</span></span>
<span class="line"><span>// ================================================================</span></span>
<span class="line"><span>// writerShouldBlock方法查看公平锁和非公平锁的效果</span></span>
<span class="line"><span>// 非公平锁直接返回false执行CAS尝试获取锁资源</span></span>
<span class="line"><span>// 公平锁需要查看是否有排队的，如果有排队的，我是否是head的next</span></span></code></pre></div><h4 id="_3-3-写锁释放锁流程概述-释放锁源码" tabindex="-1">3.3 写锁释放锁流程概述&amp;释放锁源码 <a class="header-anchor" href="#_3-3-写锁释放锁流程概述-释放锁源码" aria-label="Permalink to &quot;3.3 写锁释放锁流程概述&amp;释放锁源码&quot;">​</a></h4><p>释放的流程和ReentrantLock一致，只是在判断释放是否干净时，判断低16位的值</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 写锁释放锁的tryRelease方法</span></span>
<span class="line"><span>protected final boolean tryRelease(int releases) {</span></span>
<span class="line"><span>    // 判断当前持有写锁的线程是否是当前线程</span></span>
<span class="line"><span>    if (!isHeldExclusively())</span></span>
<span class="line"><span>        throw new IllegalMonitorStateException();</span></span>
<span class="line"><span>    // 获取state - 1</span></span>
<span class="line"><span>    int nextc = getState() - releases;</span></span>
<span class="line"><span>    // 判断低16位结果是否为0，如果为0，free设置为true</span></span>
<span class="line"><span>    boolean free = exclusiveCount(nextc) == 0;</span></span>
<span class="line"><span>    if (free)</span></span>
<span class="line"><span>        // 将持有锁的线程设置为null</span></span>
<span class="line"><span>        setExclusiveOwnerThread(null);</span></span>
<span class="line"><span>    // 设置给state</span></span>
<span class="line"><span>    setState(nextc);</span></span>
<span class="line"><span>    // 释放干净，返回true。  写锁有冲入，这里需要返回false，不去释放排队的Node</span></span>
<span class="line"><span>    return free;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="四、读锁分析" tabindex="-1">四、读锁分析 <a class="header-anchor" href="#四、读锁分析" aria-label="Permalink to &quot;四、读锁分析&quot;">​</a></h3><h4 id="_4-1-读锁加锁流程概述" tabindex="-1">4.1 读锁加锁流程概述 <a class="header-anchor" href="#_4-1-读锁加锁流程概述" aria-label="Permalink to &quot;4.1 读锁加锁流程概述&quot;">​</a></h4><p>1、分析读锁加速的基本流程</p><p>2、分析读锁的可重入锁实现以及优化</p><p>3、解决ThreadLocal内存泄漏问题</p><p>4、读锁获取锁自后，如果唤醒AQS中排队的读线程</p><h4 id="_4-1-1-基础读锁流程" tabindex="-1">4.1.1 基础读锁流程 <a class="header-anchor" href="#_4-1-1-基础读锁流程" aria-label="Permalink to &quot;4.1.1 基础读锁流程&quot;">​</a></h4><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/08d73c23a8654fe2867269d63678cdee.png" alt="" loading="lazy"></p><p>针对上述简单逻辑的源码分析</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 读锁加锁的方法入口</span></span>
<span class="line"><span>public final void acquireShared(int arg) {</span></span>
<span class="line"><span>    // 竞争锁资源滴干活</span></span>
<span class="line"><span>    if (tryAcquireShared(arg) &lt; 0)</span></span>
<span class="line"><span>        // 没拿到锁资源，去排队</span></span>
<span class="line"><span>        doAcquireShared(arg);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 读锁竞争锁资源的操作</span></span>
<span class="line"><span>protected final int tryAcquireShared(int unused) {</span></span>
<span class="line"><span>    // 拿到当前线程</span></span>
<span class="line"><span>    Thread current = Thread.currentThread();</span></span>
<span class="line"><span>    // 拿到state</span></span>
<span class="line"><span>    int c = getState();</span></span>
<span class="line"><span>    // 拿到state的低16位，判断 != 0，有写锁占用着锁资源</span></span>
<span class="line"><span>    // 并且，当前占用锁资源的线程不是当前线程</span></span>
<span class="line"><span>    if (exclusiveCount(c) != 0 &amp;&amp; getExclusiveOwnerThread() != current)</span></span>
<span class="line"><span>        // 写锁被其他线程占用，无法获取读锁，直接返回 -1，去排队</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    // 没有线程持有写锁、当前线程持有写锁</span></span>
<span class="line"><span>    // 获取读锁的信息，state的高16位。</span></span>
<span class="line"><span>    int r = sharedCount(c);</span></span>
<span class="line"><span>    // 公平锁：就查看队列是由有排队的，有排队的，直接告辞，进不去if，后面也不用判断（没人排队继续走）</span></span>
<span class="line"><span>    // 非公平锁：没有排队的，直接抢。 有排队的，但是读锁其实不需要排队，如果出现这个情况，大部分是写锁资源刚刚释放，</span></span>
<span class="line"><span>    // 后续Node还没有来记得拿到读锁资源，当前竞争的读线程，可以直接获取</span></span>
<span class="line"><span>    if (!readerShouldBlock() &amp;&amp;</span></span>
<span class="line"><span>        // 判断持有读锁的临界值是否达到</span></span>
<span class="line"><span>        r &lt; MAX_COUNT &amp;&amp;</span></span>
<span class="line"><span>        // CAS修改state，对高16位进行 + 1</span></span>
<span class="line"><span>        compareAndSetState(c, c + SHARED_UNIT)) {</span></span>
<span class="line"><span>        // 省略部分代码！！！！</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return fullTryAcquireShared(current);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 非公平锁的判断</span></span>
<span class="line"><span>final boolean apparentlyFirstQueuedIsExclusive() {</span></span>
<span class="line"><span>    Node h, s;</span></span>
<span class="line"><span>    return (h = head) != null &amp;&amp;    // head为null，可以直接抢占锁资源</span></span>
<span class="line"><span>        (s = h.next)  != null &amp;&amp;    // head的next为null，可以直接抢占锁资源</span></span>
<span class="line"><span>        !s.isShared()         &amp;&amp;    // 如果排在head后面的Node，是共享锁，可以直接抢占锁资源。</span></span>
<span class="line"><span>        s.thread != null;           // 后面排队的thread为null，可以直接抢占锁资源</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-1-2-读锁重入流程" tabindex="-1">4.1.2 读锁重入流程 <a class="header-anchor" href="#_4-1-2-读锁重入流程" aria-label="Permalink to &quot;4.1.2 读锁重入流程&quot;">​</a></h4><p>===============重入操作==</p><p>前面阐述过，读锁为了记录锁重入的次数，需要让每个读线程用ThreadLocal存储重入次数</p><p>ReentrantReadWriteLock对读锁重入做了一些优化操作</p><p>==============记录重入次数的核心==</p><p>ReentrantReadWriteLock在内部对ThreadLocal做了封装，基于HoldCount的对象存储重入次数，在内部有个count属性记录，而且每个线程都是自己的ThreadLocalHoldCounter，所以可以直接对内部的count进行++操作。</p><p>===============第一个获取读锁资源的重入次数记录方式==</p><p>第一个拿到读锁资源的线程，不需要通过ThreadLocal存储，内部提供了两个属性来记录第一个拿到读锁资源线程的信息</p><p>内部提供了firstReader记录第一个拿到读锁资源的线程，firstReaderHoldCount记录firstReader的锁重入次数</p><p>================最后一个获取读锁资源的重入次数记录方式==</p><p>最后一个拿到读锁资源的线程，也会缓存他的重入次数，这样++起来更方便</p><p>基于cachedHoldCounter缓存最后一个拿到锁资源现成的重入次数</p><p>================最后一个获取读锁资源的重入次数记录方式==</p><p>重入次数的流程执行方式：</p><p>1、判断当前线程是否是第一个拿到读锁资源的：如果是，直接将firstReader以及firstReaderHoldCount设置为当前线程的信息</p><p>2、判断当前线程是否是firstReader：如果是，直接对firstReaderHoldCount++即可。</p><p>3、跟firstReader没关系了，先获取cachedHoldCounter，判断是否是当前线程。</p><p>3.1、如果不是，获取当前线程的重入次数，将cachedHoldCounter设置为当前线程。</p><p>3.2、如果是，判断当前重入次数是否为0，重新设置当前线程的锁从入信息到readHolds（ThreadLocal）中，算是初始化操作，重入次数是0</p><p>3.3、前面两者最后都做count++</p><p>上述逻辑源码分析</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>protected final int tryAcquireShared(int unused) {</span></span>
<span class="line"><span>    Thread current = Thread.currentThread();</span></span>
<span class="line"><span>    int c = getState();</span></span>
<span class="line"><span>    if (exclusiveCount(c) != 0 &amp;&amp;</span></span>
<span class="line"><span>        getExclusiveOwnerThread() != current)</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    int r = sharedCount(c);</span></span>
<span class="line"><span>    if (!readerShouldBlock() &amp;&amp;</span></span>
<span class="line"><span>        r &lt; MAX_COUNT &amp;&amp;</span></span>
<span class="line"><span>        compareAndSetState(c, c + SHARED_UNIT)) {</span></span>
<span class="line"><span>        // ===============================================================</span></span>
<span class="line"><span>        // 判断r == 0，当前是第一个拿到读锁资源的线程</span></span>
<span class="line"><span>        if (r == 0) {</span></span>
<span class="line"><span>            // 将firstReader设置为当前线程</span></span>
<span class="line"><span>            firstReader = current;</span></span>
<span class="line"><span>            // 将count设置为1</span></span>
<span class="line"><span>            firstReaderHoldCount = 1;</span></span>
<span class="line"><span>        } </span></span>
<span class="line"><span>        // 判断当前线程是否是第一个获取读锁资源的线程</span></span>
<span class="line"><span>        else if (firstReader == current) {</span></span>
<span class="line"><span>            // 直接++。</span></span>
<span class="line"><span>            firstReaderHoldCount++;</span></span>
<span class="line"><span>        } </span></span>
<span class="line"><span>        // 到这，就说明不是第一个获取读锁资源的线程</span></span>
<span class="line"><span>        else {</span></span>
<span class="line"><span>            // 那获取最后一个拿到读锁资源的线程</span></span>
<span class="line"><span>            HoldCounter rh = cachedHoldCounter;</span></span>
<span class="line"><span>            // 判断当前线程是否是最后一个拿到读锁资源的线程</span></span>
<span class="line"><span>            if (rh == null || rh.tid != getThreadId(current))</span></span>
<span class="line"><span>                // 如果不是，设置当前线程为cachedHoldCounter</span></span>
<span class="line"><span>                cachedHoldCounter = rh = readHolds.get();</span></span>
<span class="line"><span>            // 当前线程是之前的cacheHoldCounter</span></span>
<span class="line"><span>            else if (rh.count == 0)</span></span>
<span class="line"><span>                // 将当前的重入信息设置到ThreadLocal中</span></span>
<span class="line"><span>                readHolds.set(rh);</span></span>
<span class="line"><span>            // 重入的++</span></span>
<span class="line"><span>            rh.count++;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // ===============================================================</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return fullTryAcquireShared(current);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-1-3-读锁加锁的后续逻辑fulltryacquireshared" tabindex="-1">4.1.3 读锁加锁的后续逻辑fullTryAcquireShared <a class="header-anchor" href="#_4-1-3-读锁加锁的后续逻辑fulltryacquireshared" aria-label="Permalink to &quot;4.1.3 读锁加锁的后续逻辑fullTryAcquireShared&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// tryAcquireShard方法中，如果没有拿到锁资源，走这个方法，尝试再次获取，逻辑跟上面基本一致。</span></span>
<span class="line"><span>final int fullTryAcquireShared(Thread current) {</span></span>
<span class="line"><span>    // 声明当前线程的锁重入次数</span></span>
<span class="line"><span>    HoldCounter rh = null;</span></span>
<span class="line"><span>    // 死循环</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 再次拿到state</span></span>
<span class="line"><span>        int c = getState();</span></span>
<span class="line"><span>        // 当前如果有写锁在占用锁资源，并且不是当前线程，返回-1，走排队策略</span></span>
<span class="line"><span>        if (exclusiveCount(c) != 0) {</span></span>
<span class="line"><span>            if (getExclusiveOwnerThread() != current)</span></span>
<span class="line"><span>                return -1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        } </span></span>
<span class="line"><span>        // 查看当前是否可以尝试竞争锁资源（公平锁和非公平锁的逻辑）</span></span>
<span class="line"><span>        else if (readerShouldBlock()) {</span></span>
<span class="line"><span>            // 无论公平还是非公平，只要进来，就代表要放到AQS队列中了，先做一波准备</span></span>
<span class="line"><span>            // 在处理ThreadLocal的内存泄漏问题</span></span>
<span class="line"><span>            if (firstReader == current) {</span></span>
<span class="line"><span>                // 如果当前当前线程是之前的firstReader，什么都不用做</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                // 第一次进来是null。</span></span>
<span class="line"><span>                if (rh == null) {</span></span>
<span class="line"><span>                    // 拿到最后一个获取读锁的线程</span></span>
<span class="line"><span>                    rh = cachedHoldCounter;</span></span>
<span class="line"><span>                    // 当前线程并不是cachedHoldCounter，没到拿到</span></span>
<span class="line"><span>                    if (rh == null || rh.tid != getThreadId(current)) {</span></span>
<span class="line"><span>                        // 从自己的ThreadLocal中拿到重入计数器</span></span>
<span class="line"><span>                        rh = readHolds.get();</span></span>
<span class="line"><span>                        // 如果计数器为0，说明之前没拿到过读锁资源</span></span>
<span class="line"><span>                        if (rh.count == 0)</span></span>
<span class="line"><span>                            // remove，避免内存泄漏</span></span>
<span class="line"><span>                            readHolds.remove();</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                // 前面处理完之后，直接返回-1</span></span>
<span class="line"><span>                if (rh.count == 0)</span></span>
<span class="line"><span>                    return -1;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 判断重入次数，是否超出阈值</span></span>
<span class="line"><span>        if (sharedCount(c) == MAX_COUNT)</span></span>
<span class="line"><span>            throw new Error(&quot;Maximum lock count exceeded&quot;);</span></span>
<span class="line"><span>        // CAS尝试获取锁资源</span></span>
<span class="line"><span>        if (compareAndSetState(c, c + SHARED_UNIT)) {</span></span>
<span class="line"><span>            if (sharedCount(c) == 0) {</span></span>
<span class="line"><span>                firstReader = current;</span></span>
<span class="line"><span>                firstReaderHoldCount = 1;</span></span>
<span class="line"><span>            } else if (firstReader == current) {</span></span>
<span class="line"><span>                firstReaderHoldCount++;</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                if (rh == null)</span></span>
<span class="line"><span>                    rh = cachedHoldCounter;</span></span>
<span class="line"><span>                if (rh == null || rh.tid != getThreadId(current))</span></span>
<span class="line"><span>                    rh = readHolds.get();</span></span>
<span class="line"><span>                else if (rh.count == 0)</span></span>
<span class="line"><span>                    readHolds.set(rh);</span></span>
<span class="line"><span>                rh.count++;</span></span>
<span class="line"><span>                cachedHoldCounter = rh; // cache for release</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            return 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-1-4-读线程在aqs队列获取锁资源的后续操作" tabindex="-1">4.1.4 读线程在AQS队列获取锁资源的后续操作 <a class="header-anchor" href="#_4-1-4-读线程在aqs队列获取锁资源的后续操作" aria-label="Permalink to &quot;4.1.4 读线程在AQS队列获取锁资源的后续操作&quot;">​</a></h4><p>1、正常如果都是读线程来获取读锁资源，不需要使用到AQS队列的，直接CAS操作即可</p><p>2、如果写线程持有着写锁，这是读线程就需要进入到AQS队列排队，可能会有多个读线程在AQS中。</p><p>当写锁释放资源后，会唤醒head后面的读线程，当head后面的读线程拿到锁资源后，还需要查看next节点是否也是读线程在阻塞，如果是，直接唤醒</p><p>源码分析</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 读锁需要排队的操作</span></span>
<span class="line"><span>private void doAcquireShared(int arg) {</span></span>
<span class="line"><span>    // 声明Node，类型是共享锁，并且扔到AQS中排队</span></span>
<span class="line"><span>    final Node node = addWaiter(Node.SHARED);</span></span>
<span class="line"><span>    boolean failed = true;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        boolean interrupted = false;</span></span>
<span class="line"><span>        for (;;) {</span></span>
<span class="line"><span>            // 拿到上一个节点</span></span>
<span class="line"><span>            final Node p = node.predecessor();</span></span>
<span class="line"><span>            // 如果prev节点是head，直接可以执行tryAcquireShared</span></span>
<span class="line"><span>            if (p == head) {</span></span>
<span class="line"><span>                int r = tryAcquireShared(arg);</span></span>
<span class="line"><span>                if (r &gt;= 0) {</span></span>
<span class="line"><span>                    // 拿到读锁资源后，需要做的后续处理</span></span>
<span class="line"><span>                    setHeadAndPropagate(node, r);</span></span>
<span class="line"><span>                    p.next = null; // help GC</span></span>
<span class="line"><span>                    if (interrupted)</span></span>
<span class="line"><span>                        selfInterrupt();</span></span>
<span class="line"><span>                    failed = false;</span></span>
<span class="line"><span>                    return;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 找到prev有效节点，将状态设置为-1，挂起当前线程</span></span>
<span class="line"><span>            if (shouldParkAfterFailedAcquire(p, node) &amp;&amp;</span></span>
<span class="line"><span>                parkAndCheckInterrupt())</span></span>
<span class="line"><span>                interrupted = true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        if (failed)</span></span>
<span class="line"><span>            cancelAcquire(node);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private void setHeadAndPropagate(Node node, int propagate) {</span></span>
<span class="line"><span>    // 拿到head节点</span></span>
<span class="line"><span>    Node h = head; </span></span>
<span class="line"><span>    // 将当前节点设置为head节点</span></span>
<span class="line"><span>    setHead(node);</span></span>
<span class="line"><span>    // 第一个判断更多的是在信号量有处理JDK1.5 BUG的操作。</span></span>
<span class="line"><span>    if (propagate &gt; 0 || h == null || h.waitStatus &lt; 0 || (h = head) == null || h.waitStatus &lt; 0) {</span></span>
<span class="line"><span>        // 拿到当前Node的next节点</span></span>
<span class="line"><span>        Node s = node.next;</span></span>
<span class="line"><span>        // 如果next节点是共享锁，直接唤醒next节点</span></span>
<span class="line"><span>        if (s == null || s.isShared())</span></span>
<span class="line"><span>            doReleaseShared();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_4-2-读锁的释放锁流程" tabindex="-1">4.2 读锁的释放锁流程 <a class="header-anchor" href="#_4-2-读锁的释放锁流程" aria-label="Permalink to &quot;4.2 读锁的释放锁流程&quot;">​</a></h3><p>1、处理重入以及state的值</p><p>2、唤醒后续排队的Node</p><p>源码分析</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 读锁释放锁流程</span></span>
<span class="line"><span>public final boolean releaseShared(int arg) {</span></span>
<span class="line"><span>    // tryReleaseShared：处理state的值，以及可重入的内容</span></span>
<span class="line"><span>    if (tryReleaseShared(arg)) {</span></span>
<span class="line"><span>        // AQS队列的事！</span></span>
<span class="line"><span>        doReleaseShared();</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 1、 处理重入问题  2、 处理state</span></span>
<span class="line"><span>protected final boolean tryReleaseShared(int unused) {</span></span>
<span class="line"><span>    // 拿到当前线程</span></span>
<span class="line"><span>    Thread current = Thread.currentThread();</span></span>
<span class="line"><span>    // 如果是firstReader，直接干活，不需要ThreadLocal</span></span>
<span class="line"><span>    if (firstReader == current) {</span></span>
<span class="line"><span>        // assert firstReaderHoldCount &gt; 0;</span></span>
<span class="line"><span>        if (firstReaderHoldCount == 1)</span></span>
<span class="line"><span>            firstReader = null;</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            firstReaderHoldCount--;</span></span>
<span class="line"><span>    } </span></span>
<span class="line"><span>    // 不是firstReader，从cachedHoldCounter以及ThreadLocal处理</span></span>
<span class="line"><span>    else {</span></span>
<span class="line"><span>        // 如果是cachedHoldCounter，正常--</span></span>
<span class="line"><span>        HoldCounter rh = cachedHoldCounter;</span></span>
<span class="line"><span>        // 如果不是cachedHoldCounter，从自己的ThreadLocal中拿</span></span>
<span class="line"><span>        if (rh == null || rh.tid != getThreadId(current))</span></span>
<span class="line"><span>            rh = readHolds.get();</span></span>
<span class="line"><span>        int count = rh.count;</span></span>
<span class="line"><span>        // 如果为1或者更小，当前线程就释放干净了，直接remove，避免value内存泄漏</span></span>
<span class="line"><span>        if (count &lt;= 1) {</span></span>
<span class="line"><span>            readHolds.remove();</span></span>
<span class="line"><span>            // 如果已经是0，没必要再unlock，扔个异常</span></span>
<span class="line"><span>            if (count &lt;= 0)</span></span>
<span class="line"><span>                throw unmatchedUnlockException();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // -- 走你。</span></span>
<span class="line"><span>        --rh.count;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 拿到state，高16位，-1，成功后，返回state是否为0</span></span>
<span class="line"><span>        int c = getState();</span></span>
<span class="line"><span>        int nextc = c - SHARED_UNIT;</span></span>
<span class="line"><span>        if (compareAndSetState(c, nextc))</span></span>
<span class="line"><span>            return nextc == 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 唤醒AQS中排队的线程</span></span>
<span class="line"><span>private void doReleaseShared() {</span></span>
<span class="line"><span>    // 死循环</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 拿到头</span></span>
<span class="line"><span>        Node h = head;</span></span>
<span class="line"><span>        // 说明有排队的</span></span>
<span class="line"><span>        if (h != null &amp;&amp; h != tail) {</span></span>
<span class="line"><span>            // 拿到head的状态</span></span>
<span class="line"><span>            int ws = h.waitStatus;</span></span>
<span class="line"><span>            // 判断是否为 -1 </span></span>
<span class="line"><span>            if (ws == Node.SIGNAL) {</span></span>
<span class="line"><span>                // 到这，说明后面有挂起的线程，先基于CAS将head的状态从-1，改为0</span></span>
<span class="line"><span>                if (!compareAndSetWaitStatus(h, Node.SIGNAL, 0))</span></span>
<span class="line"><span>                    continue;   </span></span>
<span class="line"><span>                // 唤醒后续节点</span></span>
<span class="line"><span>                unparkSuccessor(h);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 这里不是给读写锁准备的，在信号量里说。。。</span></span>
<span class="line"><span>            else if (ws == 0 &amp;&amp; !compareAndSetWaitStatus(h, 0, Node.PROPAGATE))</span></span>
<span class="line"><span>                continue;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 这里是出口</span></span>
<span class="line"><span>        if (h == head)   </span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="五、死锁问题" tabindex="-1">五、<strong>死锁问题</strong> <a class="header-anchor" href="#五、死锁问题" aria-label="Permalink to &quot;五、**死锁问题**&quot;">​</a></h2><p>在咱们的操作系统2022版本有，已经有最新的死锁课程了，这里就不做过多讲解</p><p>查看这个课程：</p><p><a href="https://www.mashibing.com/course/1368" target="_blank" rel="noreferrer">https://www.mashibing.com/course/1368</a></p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/3a3563ce1673493787f97aeac99dc5e4.png" alt="" loading="lazy"></p><h1 id="四、阻塞队列" tabindex="-1">四、<strong>阻塞队列</strong> <a class="header-anchor" href="#四、阻塞队列" aria-label="Permalink to &quot;四、**阻塞队列**&quot;">​</a></h1><h2 id="一、基础概念-1" tabindex="-1">一、<strong>基础概念</strong> <a class="header-anchor" href="#一、基础概念-1" aria-label="Permalink to &quot;一、**基础概念**&quot;">​</a></h2><h3 id="_1-1-生产者消费者概念" tabindex="-1">1.1 生产者消费者概念 <a class="header-anchor" href="#_1-1-生产者消费者概念" aria-label="Permalink to &quot;1.1 生产者消费者概念&quot;">​</a></h3><p>生产者消费者是设计模式的一种。让生产者和消费者基于一个容器来解决强耦合问题。</p><p>生产者 消费者彼此之间不会直接通讯的，而是通过一个容器（队列）进行通讯。</p><p>所以生产者生产完数据后扔到容器中，不通用等待消费者来处理。</p><p>消费者不需要去找生产者要数据，直接从容器中获取即可。</p><p>而这种容器最常用的结构就是队列。</p><h3 id="_1-2-juc阻塞队列的存取方法" tabindex="-1">1.2 JUC阻塞队列的存取方法 <a class="header-anchor" href="#_1-2-juc阻塞队列的存取方法" aria-label="Permalink to &quot;1.2 JUC阻塞队列的存取方法&quot;">​</a></h3><p>常用的存取方法都是来自于JUC包下的BlockingQueue</p><p>生产者存储方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>add(E)     	// 添加数据到队列，如果队列满了，无法存储，抛出异常</span></span>
<span class="line"><span>offer(E)    // 添加数据到队列，如果队列满了，返回false</span></span>
<span class="line"><span>offer(E,timeout,unit)   // 添加数据到队列，如果队列满了，阻塞timeout时间，如果阻塞一段时间，依然没添加进入，返回false</span></span>
<span class="line"><span>put(E)      // 添加数据到队列，如果队列满了，挂起线程，等到队列中有位置，再扔数据进去，死等！</span></span></code></pre></div><p>消费者取数据方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>remove()    // 从队列中移除数据，如果队列为空，抛出异常</span></span>
<span class="line"><span>poll()      // 从队列中移除数据，如果队列为空，返回null，么的数据</span></span>
<span class="line"><span>poll(timeout,unit)   // 从队列中移除数据，如果队列为空，挂起线程timeout时间，等生产者扔数据，再获取</span></span>
<span class="line"><span>take()     // 从队列中移除数据，如果队列为空，线程挂起，一直等到生产者扔数据，再获取</span></span></code></pre></div><h2 id="二、arrayblockingqueue" tabindex="-1">二、<strong>ArrayBlockingQueue</strong> <a class="header-anchor" href="#二、arrayblockingqueue" aria-label="Permalink to &quot;二、**ArrayBlockingQueue**&quot;">​</a></h2><h3 id="_2-1-arrayblockingqueue的基本使用" tabindex="-1">2.1 ArrayBlockingQueue的基本使用 <a class="header-anchor" href="#_2-1-arrayblockingqueue的基本使用" aria-label="Permalink to &quot;2.1 ArrayBlockingQueue的基本使用&quot;">​</a></h3><p><strong>ArrayBlockingQueue</strong>在初始化的时候，必须指定当前队列的长度。</p><p>因为<strong>ArrayBlockingQueue</strong>是基于数组实现的队列结构，数组长度不可变，必须提前设置数组长度信息。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws ExecutionException, InterruptedException, IOException {</span></span>
<span class="line"><span>    // 必须设置队列的长度</span></span>
<span class="line"><span>    ArrayBlockingQueue queue = new ArrayBlockingQueue(4);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 生产者扔数据</span></span>
<span class="line"><span>    queue.add(&quot;1&quot;);</span></span>
<span class="line"><span>    queue.offer(&quot;2&quot;);</span></span>
<span class="line"><span>    queue.offer(&quot;3&quot;,2,TimeUnit.SECONDS);</span></span>
<span class="line"><span>    queue.put(&quot;2&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 消费者取数据</span></span>
<span class="line"><span>    System.out.println(queue.remove());</span></span>
<span class="line"><span>    System.out.println(queue.poll());</span></span>
<span class="line"><span>    System.out.println(queue.poll(2,TimeUnit.SECONDS));</span></span>
<span class="line"><span>    System.out.println(queue.take());</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-2-生产者方法实现原理" tabindex="-1">2.2 生产者方法实现原理 <a class="header-anchor" href="#_2-2-生产者方法实现原理" aria-label="Permalink to &quot;2.2 生产者方法实现原理&quot;">​</a></h3><p>生产者添加数据到队列的方法比较多，需要一个一个查看</p><h4 id="_2-2-1-arrayblockingqueue的常见属性" tabindex="-1">2.2.1 ArrayBlockingQueue的常见属性 <a class="header-anchor" href="#_2-2-1-arrayblockingqueue的常见属性" aria-label="Permalink to &quot;2.2.1 ArrayBlockingQueue的常见属性&quot;">​</a></h4><p>ArrayBlockingQueue中的成员变量</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>lock = 就是一个ReentrantLock</span></span>
<span class="line"><span>count = 就是当前数组中元素的个数</span></span>
<span class="line"><span>iterms = 就是数组本身</span></span>
<span class="line"><span># 基于putIndex和takeIndex将数组结构实现为了队列结构</span></span>
<span class="line"><span>putIndex = 存储数据时的下标</span></span>
<span class="line"><span>takeIndex = 取数据时的下标</span></span>
<span class="line"><span>notEmpty = 消费者挂起线程和唤醒线程用到的Condition（看成sync的wait和notify）</span></span>
<span class="line"><span>notFull = 生产者挂起线程和唤醒线程用到的Condition（看成sync的wait和notify）</span></span></code></pre></div><h4 id="_2-2-2-add方法实现" tabindex="-1">2.2.2 add方法实现 <a class="header-anchor" href="#_2-2-2-add方法实现" aria-label="Permalink to &quot;2.2.2 add方法实现&quot;">​</a></h4><p>add方法本身就是调用了offer方法，如果offer方法返回false，直接抛出异常</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public boolean add(E e) {</span></span>
<span class="line"><span>    if (offer(e))</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        // 抛出的异常</span></span>
<span class="line"><span>        throw new IllegalStateException(&quot;Queue full&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-2-3-offer方法实现" tabindex="-1">2.2.3 offer方法实现 <a class="header-anchor" href="#_2-2-3-offer方法实现" aria-label="Permalink to &quot;2.2.3 offer方法实现&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public boolean offer(E e) {</span></span>
<span class="line"><span>    // 要求存储的数据不允许为null，为null就抛出空指针</span></span>
<span class="line"><span>    checkNotNull(e);</span></span>
<span class="line"><span>    // 当前阻塞队列的lock锁</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    // 为了保证线程安全，加锁</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 如果队列中的元素已经存满了，</span></span>
<span class="line"><span>        if (count == items.length)</span></span>
<span class="line"><span>            // 返回false</span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span>        else {</span></span>
<span class="line"><span>            // 队列没满，执行enqueue将元素添加到队列中</span></span>
<span class="line"><span>            enqueue(e);</span></span>
<span class="line"><span>            // 返回true</span></span>
<span class="line"><span>            return true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 操作完释放锁</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//==========================================================</span></span>
<span class="line"><span>private void enqueue(E x) {</span></span>
<span class="line"><span>    // 拿到数组的引用</span></span>
<span class="line"><span>    final Object[] items = this.items;</span></span>
<span class="line"><span>    // 将元素放到指定位置</span></span>
<span class="line"><span>    items[putIndex] = x;</span></span>
<span class="line"><span>    // 对inputIndex进行++操作，并且判断是否已经等于数组长度，需要归位</span></span>
<span class="line"><span>    if (++putIndex == items.length)</span></span>
<span class="line"><span>        // 将索引设置为0</span></span>
<span class="line"><span>        putIndex = 0;</span></span>
<span class="line"><span>    // 元素添加成功，进行++操作。</span></span>
<span class="line"><span>    count++;</span></span>
<span class="line"><span>    // 将一个Condition中阻塞的线程唤醒。</span></span>
<span class="line"><span>    notEmpty.signal();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-2-4-offer-time-unit-方法" tabindex="-1">2.2.4  offer(time,unit)方法 <a class="header-anchor" href="#_2-2-4-offer-time-unit-方法" aria-label="Permalink to &quot;2.2.4  offer(time,unit)方法&quot;">​</a></h4><p>生产者在添加数据时，如果队列已经满了，阻塞一会。</p><ul><li><p>阻塞到消费者消费了消息，然后唤醒当前阻塞线程</p></li><li><p>阻塞到了time时间，再次判断是否可以添加，不能，直接告辞。</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 如果线程在挂起的时候，如果对当前阻塞线程的中断标记位进行设置，此时会抛出异常直接结束</span></span>
<span class="line"><span>public boolean offer(E e, long timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span>	// 非空检验</span></span>
<span class="line"><span>    checkNotNull(e);</span></span>
<span class="line"><span>    // 将时间单位转换为纳秒</span></span>
<span class="line"><span>    long nanos = unit.toNanos(timeout);</span></span>
<span class="line"><span>    // 加锁</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    // 允许线程中断并排除异常的加锁方式</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 为什么是while（虚假唤醒）</span></span>
<span class="line"><span>        // 如果元素个数和数组长度一致，队列慢了</span></span>
<span class="line"><span>        while (count == items.length) {</span></span>
<span class="line"><span>            // 判断等待的时间是否还充裕</span></span>
<span class="line"><span>            if (nanos &lt;= 0)</span></span>
<span class="line"><span>                // 不充裕，直接添加失败</span></span>
<span class="line"><span>                return false;</span></span>
<span class="line"><span>            // 挂起等待，会同时释放锁资源（对标sync的wait方法）</span></span>
<span class="line"><span>            // awaitNanos会挂起线程，并且返回剩余的阻塞时间</span></span>
<span class="line"><span>            // 恢复执行时，需要重新获取锁资源</span></span>
<span class="line"><span>            nanos = notFull.awaitNanos(nanos);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 说明队列有空间了，enqueue将数据扔到阻塞队列中</span></span>
<span class="line"><span>        enqueue(e);</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 释放锁资源</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-2-5-put方法" tabindex="-1">2.2.5 put方法 <a class="header-anchor" href="#_2-2-5-put方法" aria-label="Permalink to &quot;2.2.5 put方法&quot;">​</a></h4><p>如果队列是满的， 就一直挂起，直到被唤醒，或者被中断</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void put(E e) throws InterruptedException {</span></span>
<span class="line"><span>    checkNotNull(e);</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        while (count == items.length)</span></span>
<span class="line"><span>            // await方法一直阻塞，直到被唤醒或者中断标记位</span></span>
<span class="line"><span>            notFull.await();</span></span>
<span class="line"><span>        enqueue(e);</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-3-消费者方法实现原理" tabindex="-1">2.3 消费者方法实现原理 <a class="header-anchor" href="#_2-3-消费者方法实现原理" aria-label="Permalink to &quot;2.3 消费者方法实现原理&quot;">​</a></h3><h4 id="_2-3-1-remove方法" tabindex="-1">2.3.1 remove方法 <a class="header-anchor" href="#_2-3-1-remove方法" aria-label="Permalink to &quot;2.3.1 remove方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// remove方法就是调用了poll</span></span>
<span class="line"><span>public E remove() {</span></span>
<span class="line"><span>    E x = poll();</span></span>
<span class="line"><span>    // 如果有数据，直接返回</span></span>
<span class="line"><span>    if (x != null)</span></span>
<span class="line"><span>        return x;</span></span>
<span class="line"><span>    // 没数据抛出异常</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        throw new NoSuchElementException();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-4-2-poll方法" tabindex="-1">2.4.2 poll方法 <a class="header-anchor" href="#_2-4-2-poll方法" aria-label="Permalink to &quot;2.4.2 poll方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 拉取数据</span></span>
<span class="line"><span>public E poll() {</span></span>
<span class="line"><span>    // 加锁操作</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 如果没有数据，直接返回null，如果有数据，执行dequeue，取出数据并返回</span></span>
<span class="line"><span>        return (count == 0) ? null : dequeue();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//==========================================================</span></span>
<span class="line"><span>// 取出数据</span></span>
<span class="line"><span>private E dequeue() {</span></span>
<span class="line"><span>    // 将成员变量引用到局部变量</span></span>
<span class="line"><span>    final Object[] items = this.items;</span></span>
<span class="line"><span>    // 直接获取指定索引位置的数据</span></span>
<span class="line"><span>    E x = (E) items[takeIndex];</span></span>
<span class="line"><span>    // 将数组上指定索引位置设置为null</span></span>
<span class="line"><span>    items[takeIndex] = null;</span></span>
<span class="line"><span>    // 设置下次取数据时的索引位置</span></span>
<span class="line"><span>    if (++takeIndex == items.length)</span></span>
<span class="line"><span>        takeIndex = 0;</span></span>
<span class="line"><span>    // 对count进行--操作</span></span>
<span class="line"><span>    count--;</span></span>
<span class="line"><span>    // 迭代器内容，先跳过</span></span>
<span class="line"><span>    if (itrs != null)</span></span>
<span class="line"><span>        itrs.elementDequeued();</span></span>
<span class="line"><span>    // signal方法，会唤醒当前Condition中排队的一个Node。</span></span>
<span class="line"><span>    // signalAll方法，会将Condition中所有的Node，全都唤醒</span></span>
<span class="line"><span>    notFull.signal();</span></span>
<span class="line"><span>    // 返回数据。</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-4-3-poll-time-unit-方法" tabindex="-1">2.4.3 poll(time,unit)方法 <a class="header-anchor" href="#_2-4-3-poll-time-unit-方法" aria-label="Permalink to &quot;2.4.3 poll(time,unit)方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public E poll(long timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span>    // 转换时间单位</span></span>
<span class="line"><span>    long nanos = unit.toNanos(timeout);</span></span>
<span class="line"><span>    // 竞争锁</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 如果没有数据</span></span>
<span class="line"><span>        while (count == 0) {</span></span>
<span class="line"><span>            if (nanos &lt;= 0)</span></span>
<span class="line"><span>                // 没数据，也无法阻塞了，返回null</span></span>
<span class="line"><span>                return null;</span></span>
<span class="line"><span>            // 没数据，挂起消费者线程</span></span>
<span class="line"><span>            nanos = notEmpty.awaitNanos(nanos);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 取数据</span></span>
<span class="line"><span>        return dequeue();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-4-4-take方法" tabindex="-1">2.4.4 take方法 <a class="header-anchor" href="#_2-4-4-take方法" aria-label="Permalink to &quot;2.4.4 take方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public E take() throws InterruptedException {</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 虚假唤醒</span></span>
<span class="line"><span>        while (count == 0)</span></span>
<span class="line"><span>            notEmpty.await();</span></span>
<span class="line"><span>        return dequeue();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-4-5-虚假唤醒" tabindex="-1">2.4.5 虚假唤醒 <a class="header-anchor" href="#_2-4-5-虚假唤醒" aria-label="Permalink to &quot;2.4.5 虚假唤醒&quot;">​</a></h4><p>阻塞队列中，如果需要线程挂起操作，判断有无数据的位置采用的是while循环 ，为什么不能换成null</p><p>肯定是不能换成if逻辑判断</p><p>线程A，线程B，线程E，线程C。 其中ABE生产者，C属于消费者</p><p>假如线程的队列是满的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// E，拿到锁资源，还没有走while判断</span></span>
<span class="line"><span>while (count == items.length)</span></span>
<span class="line"><span>    // A醒了</span></span>
<span class="line"><span>    // B挂起</span></span>
<span class="line"><span>    notFull.await();</span></span>
<span class="line"><span>enqueue(e)；</span></span></code></pre></div><p>C此时消费一条数据，执行notFull.signal()唤醒一个线程，A线程被唤醒</p><p>E走判断，发现有空余位置，可以添加数据到队列，E添加数据，走enqueue</p><p>如果判断是if，A在E释放锁资源后，拿到锁资源，直接走enqueue方法。</p><p>此时A线程就是在putIndex的位置，覆盖掉之前的数据，造成数据安全问题</p><h2 id="三、linkedblockingqueue" tabindex="-1">三、<strong>LinkedBlockingQueue</strong> <a class="header-anchor" href="#三、linkedblockingqueue" aria-label="Permalink to &quot;三、**LinkedBlockingQueue**&quot;">​</a></h2><h3 id="_3-1-linkedblockingqueue的底层实现" tabindex="-1">3.1 LinkedBlockingQueue的底层实现 <a class="header-anchor" href="#_3-1-linkedblockingqueue的底层实现" aria-label="Permalink to &quot;3.1 LinkedBlockingQueue的底层实现&quot;">​</a></h3><p>查看LinkedBlockingQueue是如何存储数据，并且实现链表结构的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// Node对象就是存储数据的单位</span></span>
<span class="line"><span>static class Node&lt;E&gt; {</span></span>
<span class="line"><span>    // 存储的数据</span></span>
<span class="line"><span>    E item;</span></span>
<span class="line"><span>	// 指向下一个数据的指针</span></span>
<span class="line"><span>    Node&lt;E&gt; next;</span></span>
<span class="line"><span>	// 有参构造</span></span>
<span class="line"><span>    Node(E x) { item = x; }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>查看LinkedBlockingQueue的有参构造</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 可以手动指定LinkedBlockingQueue的长度，如果没有指定，默认为Integer.MAX_VALUE</span></span>
<span class="line"><span>public LinkedBlockingQueue(int capacity) {</span></span>
<span class="line"><span>    if (capacity &lt;= 0) throw new IllegalArgumentException();</span></span>
<span class="line"><span>    this.capacity = capacity;</span></span>
<span class="line"><span>    // 在初始化时，构建一个item为null的节点，作为head和last</span></span>
<span class="line"><span>	 // 这种node可以成为哨兵Node，</span></span>
<span class="line"><span>    // 如果没有哨兵节点，那么在获取数据时，需要判断head是否为null，才能找next</span></span>
<span class="line"><span>    // 如果没有哨兵节点，那么在添加数据时，需要判断last是否为null，才能找next</span></span>
<span class="line"><span>    last = head = new Node&lt;E&gt;(null);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>查看LinkedBlockingQueue的其他属性</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 因为是链表，没有想数组的length属性，基于AtomicInteger来记录长度</span></span>
<span class="line"><span>private final AtomicInteger count = new AtomicInteger();</span></span>
<span class="line"><span>// 链表的头，取</span></span>
<span class="line"><span>transient Node&lt;E&gt; head;</span></span>
<span class="line"><span>// 链表的尾，存</span></span>
<span class="line"><span>private transient Node&lt;E&gt; last;</span></span>
<span class="line"><span>// 消费者的锁</span></span>
<span class="line"><span>private final ReentrantLock takeLock = new ReentrantLock();</span></span>
<span class="line"><span>// 消费者的挂起操作，以及唤醒用的condition</span></span>
<span class="line"><span>private final Condition notEmpty = takeLock.newCondition();</span></span>
<span class="line"><span>// 生产者的锁</span></span>
<span class="line"><span>private final ReentrantLock putLock = new ReentrantLock();</span></span>
<span class="line"><span>// 生产者的挂起操作，以及唤醒用的condition</span></span>
<span class="line"><span>private final Condition notFull = putLock.newCondition();</span></span></code></pre></div><h3 id="_3-2-生产者方法实现原理" tabindex="-1">3.2 生产者方法实现原理 <a class="header-anchor" href="#_3-2-生产者方法实现原理" aria-label="Permalink to &quot;3.2 生产者方法实现原理&quot;">​</a></h3><h4 id="_3-2-1-add方法" tabindex="-1">3.2.1 add方法 <a class="header-anchor" href="#_3-2-1-add方法" aria-label="Permalink to &quot;3.2.1 add方法&quot;">​</a></h4><p>你懂得，还是走offer方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public boolean add(E e) {</span></span>
<span class="line"><span>    if (offer(e))</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        throw new IllegalStateException(&quot;Queue full&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-2-2-offer方法" tabindex="-1">3.2.2 offer方法 <a class="header-anchor" href="#_3-2-2-offer方法" aria-label="Permalink to &quot;3.2.2 offer方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public boolean offer(E e) {</span></span>
<span class="line"><span>    // 非空校验</span></span>
<span class="line"><span>    if (e == null) throw new NullPointerException();</span></span>
<span class="line"><span>    // 拿到存储数据条数的count</span></span>
<span class="line"><span>    final AtomicInteger count = this.count;</span></span>
<span class="line"><span>    // 查看当前数据条数，是否等于队列限制长度，达到了这个长度，直接返回false</span></span>
<span class="line"><span>    if (count.get() == capacity)</span></span>
<span class="line"><span>        return false;</span></span>
<span class="line"><span>    // 声明c，作为标记存在</span></span>
<span class="line"><span>    int c = -1;</span></span>
<span class="line"><span>    // 将存储的数据封装为Node对象</span></span>
<span class="line"><span>    Node&lt;E&gt; node = new Node&lt;E&gt;(e);</span></span>
<span class="line"><span>    // 获取生产者的锁。</span></span>
<span class="line"><span>    final ReentrantLock putLock = this.putLock;</span></span>
<span class="line"><span>    // 竞争锁资源</span></span>
<span class="line"><span>    putLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 再次做一个判断，查看是否还有空间</span></span>
<span class="line"><span>        if (count.get() &lt; capacity) {</span></span>
<span class="line"><span>            // enqueue，扔数据</span></span>
<span class="line"><span>            enqueue(node);</span></span>
<span class="line"><span>            // 将数据个数 + 1</span></span>
<span class="line"><span>            c = count.getAndIncrement();</span></span>
<span class="line"><span>            // 拿到count的值 小于 长度限制</span></span>
<span class="line"><span>            // 有生产者在基于await挂起，这里添加完数据后，发现还有空间可以存储数据，</span></span>
<span class="line"><span>            // 唤醒前面可能已经挂起的生产者</span></span>
<span class="line"><span>            // 因为这里生产者和消费者不是互斥的，写操作进行的同时，可能也有消费者在消费数据。</span></span>
<span class="line"><span>            if (c + 1 &lt; capacity)</span></span>
<span class="line"><span>                // 唤醒生产者</span></span>
<span class="line"><span>                notFull.signal();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 释放锁资源</span></span>
<span class="line"><span>        putLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 如果c == 0，代表添加数据之前，队列元素个数是0个。</span></span>
<span class="line"><span>    // 如果有消费者在队列没有数据的时候，来消费，此时消费者一定会挂起线程</span></span>
<span class="line"><span>    if (c == 0)</span></span>
<span class="line"><span>        // 唤醒消费者</span></span>
<span class="line"><span>        signalNotEmpty();</span></span>
<span class="line"><span>    // 添加成功返回true，失败返回-1</span></span>
<span class="line"><span>    return c &gt;= 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//================================================</span></span>
<span class="line"><span>private void enqueue(Node&lt;E&gt; node) {</span></span>
<span class="line"><span>    // 将当前Node设置为last的next，并且再将当前Node作为last</span></span>
<span class="line"><span>    last = last.next = node;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//================================================</span></span>
<span class="line"><span>private void signalNotEmpty() {</span></span>
<span class="line"><span>    // 获取读锁</span></span>
<span class="line"><span>    final ReentrantLock takeLock = this.takeLock;</span></span>
<span class="line"><span>    takeLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 唤醒。</span></span>
<span class="line"><span>        notEmpty.signal();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        takeLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>sync -&gt; wait / notify</span></span></code></pre></div><h4 id="_3-2-3-offer-time-unit-方法" tabindex="-1">3.2.3 offer(time,unit)方法 <a class="header-anchor" href="#_3-2-3-offer-time-unit-方法" aria-label="Permalink to &quot;3.2.3 offer(time,unit)方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public boolean offer(E e, long timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span>	 // 非空检验</span></span>
<span class="line"><span>    if (e == null) throw new NullPointerException();</span></span>
<span class="line"><span>    // 将时间转换为纳秒</span></span>
<span class="line"><span>    long nanos = unit.toNanos(timeout);</span></span>
<span class="line"><span>    // 标记</span></span>
<span class="line"><span>    int c = -1;</span></span>
<span class="line"><span>    // 写锁，数据条数</span></span>
<span class="line"><span>    final ReentrantLock putLock = this.putLock;</span></span>
<span class="line"><span>    final AtomicInteger count = this.count;</span></span>
<span class="line"><span>    // 允许中断的加锁方式</span></span>
<span class="line"><span>    putLock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 如果元素个数和限制个数一致，直接准备挂起</span></span>
<span class="line"><span>        while (count.get() == capacity) {</span></span>
<span class="line"><span>            // 挂起的时间是不是已经没了</span></span>
<span class="line"><span>            if (nanos &lt;= 0)</span></span>
<span class="line"><span>                // 添加失败，返回false</span></span>
<span class="line"><span>                return false;</span></span>
<span class="line"><span>            // 挂起线程</span></span>
<span class="line"><span>            nanos = notFull.awaitNanos(nanos);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 有空余位置，enqueue添加数据</span></span>
<span class="line"><span>        enqueue(new Node&lt;E&gt;(e));</span></span>
<span class="line"><span>        // 元素个数 + 1</span></span>
<span class="line"><span>        c = count.getAndIncrement();</span></span>
<span class="line"><span>        // 当前添加完数据，还有位置可以添加数据，唤醒可能阻塞的生产者</span></span>
<span class="line"><span>        if (c + 1 &lt; capacity)</span></span>
<span class="line"><span>            notFull.signal();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 释放锁</span></span>
<span class="line"><span>        putLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 如果之前元素个数是0，唤醒可能等待的消费者</span></span>
<span class="line"><span>    if (c == 0)</span></span>
<span class="line"><span>        signalNotEmpty();</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-2-4-put方法" tabindex="-1">3.2.4 put方法 <a class="header-anchor" href="#_3-2-4-put方法" aria-label="Permalink to &quot;3.2.4 put方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void put(E e) throws InterruptedException {</span></span>
<span class="line"><span>    if (e == null) throw new NullPointerException();</span></span>
<span class="line"><span>    int c = -1;</span></span>
<span class="line"><span>    Node&lt;E&gt; node = new Node&lt;E&gt;(e);</span></span>
<span class="line"><span>    final ReentrantLock putLock = this.putLock;</span></span>
<span class="line"><span>    final AtomicInteger count = this.count;</span></span>
<span class="line"><span>    putLock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        while (count.get() == capacity) {</span></span>
<span class="line"><span>            // 一直挂起线程，等待被唤醒</span></span>
<span class="line"><span>            notFull.await();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        enqueue(node);</span></span>
<span class="line"><span>        c = count.getAndIncrement();</span></span>
<span class="line"><span>        if (c + 1 &lt; capacity)</span></span>
<span class="line"><span>            notFull.signal();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        putLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (c == 0)</span></span>
<span class="line"><span>        signalNotEmpty();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-3-消费者方法实现原理" tabindex="-1">3.3 消费者方法实现原理 <a class="header-anchor" href="#_3-3-消费者方法实现原理" aria-label="Permalink to &quot;3.3 消费者方法实现原理&quot;">​</a></h3><p>从remove方法开始，查看消费者获取数据的方式</p><h4 id="_3-3-1-remove方法" tabindex="-1">3.3.1 remove方法 <a class="header-anchor" href="#_3-3-1-remove方法" aria-label="Permalink to &quot;3.3.1 remove方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public E remove() {</span></span>
<span class="line"><span>    E x = poll();</span></span>
<span class="line"><span>    if (x != null)</span></span>
<span class="line"><span>        return x;</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        throw new NoSuchElementException();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-3-2-poll方法" tabindex="-1">3.3.2 poll方法 <a class="header-anchor" href="#_3-3-2-poll方法" aria-label="Permalink to &quot;3.3.2 poll方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public E poll() {</span></span>
<span class="line"><span>    // 拿到队列数据个数的计数器</span></span>
<span class="line"><span>    final AtomicInteger count = this.count;</span></span>
<span class="line"><span>    // 当前队列中数据是否0</span></span>
<span class="line"><span>    if (count.get() == 0)</span></span>
<span class="line"><span>        // 说明队列没数据，直接返回null即可</span></span>
<span class="line"><span>        return null;</span></span>
<span class="line"><span>    // 声明返回结果</span></span>
<span class="line"><span>    E x = null;</span></span>
<span class="line"><span>    // 标记</span></span>
<span class="line"><span>    int c = -1;</span></span>
<span class="line"><span>    // 获取消费者的takeLock</span></span>
<span class="line"><span>    final ReentrantLock takeLock = this.takeLock;</span></span>
<span class="line"><span>    // 加锁</span></span>
<span class="line"><span>    takeLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 基于DCL，确保当前队列中依然有元素</span></span>
<span class="line"><span>        if (count.get() &gt; 0) {</span></span>
<span class="line"><span>            // 从队列中移除数据</span></span>
<span class="line"><span>            x = dequeue();</span></span>
<span class="line"><span>            // 将之前的元素个数获取，并--</span></span>
<span class="line"><span>            c = count.getAndDecrement();</span></span>
<span class="line"><span>            if (c &gt; 1)</span></span>
<span class="line"><span>                // 如果依然有数据，继续唤醒await的消费者。</span></span>
<span class="line"><span>                notEmpty.signal();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 释放锁资源</span></span>
<span class="line"><span>        takeLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 如果之前的元素个数为当前队列的限制长度，</span></span>
<span class="line"><span>    // 现在消费者消费了一个数据，多了一个空位可以添加</span></span>
<span class="line"><span>    if (c == capacity)</span></span>
<span class="line"><span>        // 唤醒阻塞的生产者</span></span>
<span class="line"><span>        signalNotFull();</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//================================================</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private E dequeue() {</span></span>
<span class="line"><span>    // 拿到队列的head位置数据</span></span>
<span class="line"><span>    Node&lt;E&gt; h = head;</span></span>
<span class="line"><span>    // 拿到了head的next，因为这个是哨兵Node，需要拿到的head.next的数据</span></span>
<span class="line"><span>    Node&lt;E&gt; first = h.next;</span></span>
<span class="line"><span>    // 将之前的哨兵Node.next置位null。help GC。</span></span>
<span class="line"><span>    h.next = h; </span></span>
<span class="line"><span>    // 将first置位新的head</span></span>
<span class="line"><span>    head = first;</span></span>
<span class="line"><span>    // 拿到返回结果first节点的item数据，也就是之前head.next.item</span></span>
<span class="line"><span>    E x = first.item;</span></span>
<span class="line"><span>    // 将first数据置位null，作为新的head</span></span>
<span class="line"><span>    first.item = null;</span></span>
<span class="line"><span>    // 返回数据</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//================================================</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private void signalNotFull() {</span></span>
<span class="line"><span>    final ReentrantLock putLock = this.putLock;</span></span>
<span class="line"><span>    putLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 唤醒生产者。</span></span>
<span class="line"><span>        notFull.signal();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        putLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-3-3-poll-time-unit-方法" tabindex="-1">3.3.3 poll(time,unit)方法 <a class="header-anchor" href="#_3-3-3-poll-time-unit-方法" aria-label="Permalink to &quot;3.3.3 poll(time,unit)方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public E poll(long timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span>    // 返回结果</span></span>
<span class="line"><span>    E x = null;</span></span>
<span class="line"><span>    // 标识</span></span>
<span class="line"><span>    int c = -1;</span></span>
<span class="line"><span>    // 将挂起实现设置为纳秒级别</span></span>
<span class="line"><span>    long nanos = unit.toNanos(timeout);</span></span>
<span class="line"><span>    // 拿到计数器</span></span>
<span class="line"><span>    final AtomicInteger count = this.count;</span></span>
<span class="line"><span>    // take锁加锁</span></span>
<span class="line"><span>    final ReentrantLock takeLock = this.takeLock;</span></span>
<span class="line"><span>    takeLock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 如果没数据，进到while</span></span>
<span class="line"><span>        while (count.get() == 0) {</span></span>
<span class="line"><span>            if (nanos &lt;= 0)</span></span>
<span class="line"><span>                return null;</span></span>
<span class="line"><span>            // 挂起当前线程</span></span>
<span class="line"><span>            nanos = notEmpty.awaitNanos(nanos);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 剩下内容，和之前一样。</span></span>
<span class="line"><span>        x = dequeue();</span></span>
<span class="line"><span>        c = count.getAndDecrement();</span></span>
<span class="line"><span>        if (c &gt; 1)</span></span>
<span class="line"><span>            notEmpty.signal();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        takeLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (c == capacity)</span></span>
<span class="line"><span>        signalNotFull();</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-3-4-take方法" tabindex="-1">3.3.4 take方法 <a class="header-anchor" href="#_3-3-4-take方法" aria-label="Permalink to &quot;3.3.4 take方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public E take() throws InterruptedException {</span></span>
<span class="line"><span>    E x;</span></span>
<span class="line"><span>    int c = -1;</span></span>
<span class="line"><span>    final AtomicInteger count = this.count;</span></span>
<span class="line"><span>    final ReentrantLock takeLock = this.takeLock;</span></span>
<span class="line"><span>    takeLock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 相比poll(time,unit)方法，这里的出口只有一个，就是中断标记位，抛出异常，否则一直等待</span></span>
<span class="line"><span>        while (count.get() == 0) {</span></span>
<span class="line"><span>            notEmpty.await();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        x = dequeue();</span></span>
<span class="line"><span>        c = count.getAndDecrement();</span></span>
<span class="line"><span>        if (c &gt; 1)</span></span>
<span class="line"><span>            notEmpty.signal();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        takeLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (c == capacity)</span></span>
<span class="line"><span>        signalNotFull();</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="四、priorityblockingqueue概念" tabindex="-1">四、<strong>PriorityBlockingQueue概念</strong> <a class="header-anchor" href="#四、priorityblockingqueue概念" aria-label="Permalink to &quot;四、**PriorityBlockingQueue概念**&quot;">​</a></h2><h3 id="_4-1-priorityblockingqueue介绍" tabindex="-1">4.1 PriorityBlockingQueue介绍 <a class="header-anchor" href="#_4-1-priorityblockingqueue介绍" aria-label="Permalink to &quot;4.1 PriorityBlockingQueue介绍&quot;">​</a></h3><p>首先PriorityBlockingQueue是一个优先级队列，他不满足先进先出的概念。</p><p>会将查询的数据进行排序，排序的方式就是基于插入数据值的本身。</p><p><strong>如果是自定义对象必须要实现Comparable接口才可以添加到优先级队列</strong></p><p>排序的方式是基于<strong>二叉堆</strong>实现的。底层是采用数据结构实现的二叉堆。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/b0cc492556d746a3a2c1ac9f31e06dde.png" alt="" loading="lazy"></p><h3 id="_4-2-二叉堆结构介绍" tabindex="-1">4.2 二叉堆结构介绍 <a class="header-anchor" href="#_4-2-二叉堆结构介绍" aria-label="Permalink to &quot;4.2 二叉堆结构介绍&quot;">​</a></h3><p>优先级队列PriorityBlockingQueue基于二叉堆实现的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private transient Object[] queue;</span></span></code></pre></div><p>PriorityBlockingQueue是基于数组实现的二叉堆。</p><p>二叉堆是什么？</p><ul><li><p>二叉堆就是一个完整的二叉树。</p></li><li><p>任意一个节点大于父节点或者小于父节点</p></li><li><p>基于同步的方式，可以定义出小顶堆和大顶堆</p></li></ul><p>小顶堆以及小顶堆基于数据实现的方式。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/be0f3126b64443d1bf1e05299f33d71a.png" alt="" loading="lazy"></p><h3 id="_4-3-priorityblockingqueue核心属性" tabindex="-1">4.3 PriorityBlockingQueue核心属性 <a class="header-anchor" href="#_4-3-priorityblockingqueue核心属性" aria-label="Permalink to &quot;4.3 PriorityBlockingQueue核心属性&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 数组的初始长度</span></span>
<span class="line"><span>private static final int DEFAULT_INITIAL_CAPACITY = 11;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 数组的最大长度</span></span>
<span class="line"><span>// -8的目的是为了适配各个版本的虚拟机</span></span>
<span class="line"><span>// 默认当前使用的hotspot虚拟机最大支持Integer.MAX_VALUE - 2，但是其他版本的虚拟机不一定。</span></span>
<span class="line"><span>private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 存储数据的数组，也是基于这个数组实现的二叉堆。</span></span>
<span class="line"><span>private transient Object[] queue;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// size记录当前阻塞队列中元素的个数</span></span>
<span class="line"><span>private transient int size;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 要求使用的对象要实现Comparable比较器。基于comparator做对象之间的比较</span></span>
<span class="line"><span>private transient Comparator&lt;? super E&gt; comparator;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 实现阻塞队列的lock锁</span></span>
<span class="line"><span>private final ReentrantLock lock;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 挂起线程操作。</span></span>
<span class="line"><span>private final Condition notEmpty;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 因为PriorityBlockingQueue的底层是基于二叉堆的，而二叉堆又是基于数组实现的，数组长度是固定的，如果需要扩容，需要构建一个新数组。PriorityBlockingQueue在做扩容操作时，不会lock住的，释放lock锁，基于allocationSpinLock属性做标记，来避免出现并发扩容的问题。</span></span>
<span class="line"><span>private transient volatile int allocationSpinLock;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 阻塞队列中用到的原理，其实就是普通的优先级队列。</span></span>
<span class="line"><span>private PriorityQueue&lt;E&gt; q;</span></span></code></pre></div><h3 id="_4-4-priorityblockingqueue的写入操作" tabindex="-1">4.4 PriorityBlockingQueue的写入操作 <a class="header-anchor" href="#_4-4-priorityblockingqueue的写入操作" aria-label="Permalink to &quot;4.4 PriorityBlockingQueue的写入操作&quot;">​</a></h3><p>毕竟是阻塞队列，添加数据的操作，咱们是很了解，无法还是add，offer，offer(time,unit)，put。但是因为优先级队列中，数组是可以扩容的，虽然有长度限制，但是依然属于无界队列的概念，所以生产者不会阻塞，所以只有offer方法可以查看。</p><p>这次核心的内容并不是添加数据的区别。主要关注的是如何保证二叉堆中小顶堆的结构的，并且还要查看数组扩容的一个过程是怎样的。</p><h4 id="_4-4-1-offer基本流程" tabindex="-1">4.4.1 offer基本流程 <a class="header-anchor" href="#_4-4-1-offer基本流程" aria-label="Permalink to &quot;4.4.1 offer基本流程&quot;">​</a></h4><p>因为add方法依然调用的是offer方法，直接查看offer方法即可</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public boolean offer(E e) {</span></span>
<span class="line"><span>    // 非空判断。</span></span>
<span class="line"><span>    if (e == null)</span></span>
<span class="line"><span>        throw new NullPointerException();</span></span>
<span class="line"><span>    // 拿到锁，直接上锁</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    // n：size，元素的个数</span></span>
<span class="line"><span>    // cap：当前数组的长度</span></span>
<span class="line"><span>    // array：就是存储数据的数组</span></span>
<span class="line"><span>    int n, cap;</span></span>
<span class="line"><span>    Object[] array;</span></span>
<span class="line"><span>    while ((n = size) &gt;= (cap = (array = queue).length))</span></span>
<span class="line"><span>        // 如果元素个数大于等于数组的长度，需要尝试扩容。</span></span>
<span class="line"><span>        tryGrow(array, cap);</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 拿到了比较器</span></span>
<span class="line"><span>        Comparator&lt;? super E&gt; cmp = comparator;</span></span>
<span class="line"><span>        // 比较数据大小，存储数据，是否需要做上移操作，保证平衡的</span></span>
<span class="line"><span>        if (cmp == null)</span></span>
<span class="line"><span>            siftUpComparable(n, e, array);</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            siftUpUsingComparator(n, e, array, cmp);</span></span>
<span class="line"><span>        // 元素个数 + 1</span></span>
<span class="line"><span>        size = n + 1;</span></span>
<span class="line"><span>        // 如果有挂起的线程，需要去唤醒挂起的消费者。</span></span>
<span class="line"><span>        notEmpty.signal();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 释放锁</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 返回true</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-4-2-offer扩容操作" tabindex="-1">4.4.2 offer扩容操作 <a class="header-anchor" href="#_4-4-2-offer扩容操作" aria-label="Permalink to &quot;4.4.2 offer扩容操作&quot;">​</a></h4><p>在添加数据之前，会采用while循环的方式，来判断当前元素个数是否大于等于数组长度。如果满足，需要执行tryGrow方法，对数组进行扩容</p><p>如果两个线程同时执行tryGrow，只会有一个线程在扩容，另一个线程可能多次走while循环，多次走tryGrow方法，但是依然需要等待前面的线程扩容完毕。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private void tryGrow(Object[] array, int oldCap) {</span></span>
<span class="line"><span>    // 释放锁资源。</span></span>
<span class="line"><span>    lock.unlock(); </span></span>
<span class="line"><span>    // 声明新数组。</span></span>
<span class="line"><span>    Object[] newArray = null;</span></span>
<span class="line"><span>    // 如果allocationSpinLock属性值为0，说明当前没有线程正在扩容的。</span></span>
<span class="line"><span>    if (allocationSpinLock == 0 &amp;&amp;</span></span>
<span class="line"><span>        // 基于CAS的方式，将allocationSpinLock从0修改为1，代表当前线程可以开始扩容</span></span>
<span class="line"><span>        UNSAFE.compareAndSwapInt(this, allocationSpinLockOffset,0, 1)) {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            // 计算新数组长度</span></span>
<span class="line"><span>            int newCap = oldCap + ((oldCap &lt; 64) ?</span></span>
<span class="line"><span>                                   // 如果数组长度比较小，这里加快扩容长度速度。</span></span>
<span class="line"><span>                                   (oldCap + 2) : </span></span>
<span class="line"><span>                                   // 如果长度大于等于64了，每次扩容到1.5倍即可。</span></span>
<span class="line"><span>                                   (oldCap &gt;&gt; 1));</span></span>
<span class="line"><span>            // 如果新数组长度大于MAX_ARRAY_SIZE，需要做点事了。</span></span>
<span class="line"><span>            if (newCap - MAX_ARRAY_SIZE &gt; 0) {   </span></span>
<span class="line"><span>                // 声明minCap，长度为老数组 + 1</span></span>
<span class="line"><span>                int minCap = oldCap + 1;</span></span>
<span class="line"><span>                // 老数组+1变为负数，或者老数组长度已经大于MAX_ARRAY_SIZE了，无法扩容了。</span></span>
<span class="line"><span>                if (minCap &lt; 0 || minCap &gt; MAX_ARRAY_SIZE)</span></span>
<span class="line"><span>                    // 告辞，凉凉~~~~</span></span>
<span class="line"><span>                    throw new OutOfMemoryError();</span></span>
<span class="line"><span>                // 如果没有超过限制，直接设置为最大长度即可</span></span>
<span class="line"><span>                newCap = MAX_ARRAY_SIZE;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 新数组长度，得大于老数组长度，</span></span>
<span class="line"><span>            // 第二个判断确保没有并发扩容的出现。</span></span>
<span class="line"><span>            if (newCap &gt; oldCap &amp;&amp; queue == array)</span></span>
<span class="line"><span>                // 构建出新数组</span></span>
<span class="line"><span>                newArray = new Object[newCap];</span></span>
<span class="line"><span>        } finally {</span></span>
<span class="line"><span>            // 新数组有了，标记位归0~~</span></span>
<span class="line"><span>            allocationSpinLock = 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 如果到了这，newArray依然为null，说明这个线程没有进到if方法中，去构建新数组</span></span>
<span class="line"><span>    if (newArray == null) </span></span>
<span class="line"><span>        // 稍微等一手。</span></span>
<span class="line"><span>        Thread.yield();</span></span>
<span class="line"><span>    // 拿锁资源，</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    // 拿到锁资源后，确认是构建了新数组的线程，这里就需要将新数组复制给queue，并且导入数据</span></span>
<span class="line"><span>    if (newArray != null &amp;&amp; queue == array) {</span></span>
<span class="line"><span>        // 将新数组赋值给queue</span></span>
<span class="line"><span>        queue = newArray;</span></span>
<span class="line"><span>        // 将老数组的数据全部导入到新数组中。</span></span>
<span class="line"><span>        System.arraycopy(array, 0, newArray, 0, oldCap);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-4-3-offer添加数据" tabindex="-1">4.4.3 offer添加数据 <a class="header-anchor" href="#_4-4-3-offer添加数据" aria-label="Permalink to &quot;4.4.3 offer添加数据&quot;">​</a></h4><p>这里是数据如何放到数组上，并且如何保证的二叉堆结构</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// k：当前元素的个数（其实就是要放的索引位置）</span></span>
<span class="line"><span>// x：需要添加的数据</span></span>
<span class="line"><span>// array：数组。。</span></span>
<span class="line"><span>private static &lt;T&gt; void siftUpComparable(int k, T x, Object[] array) {</span></span>
<span class="line"><span>    // 将插入的元素直接强转为Comparable（com.mashibing.User cannot be cast to java.lang.Comparable）</span></span>
<span class="line"><span>    // 这行强转，会导致添加没有实现Comparable的元素，直接报错。</span></span>
<span class="line"><span>    Comparable&lt;? super T&gt; key = (Comparable&lt;? super T&gt;) x;</span></span>
<span class="line"><span>    // k大于0，走while逻辑。（原来有数据）</span></span>
<span class="line"><span>    while (k &gt; 0) {</span></span>
<span class="line"><span>        // 获取父节点的索引位置。</span></span>
<span class="line"><span>        int parent = (k - 1) &gt;&gt;&gt; 1;</span></span>
<span class="line"><span>        // 拿到父节点的元素。</span></span>
<span class="line"><span>        Object e = array[parent];</span></span>
<span class="line"><span>        // 用子节点compareTo父节点，如果 &gt;= 0，说明当前son节点比parent要大。</span></span>
<span class="line"><span>        if (key.compareTo((T) e) &gt;= 0)</span></span>
<span class="line"><span>            // 直接break，完事，</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        // 将son节点的位置设置上之前的parent节点</span></span>
<span class="line"><span>        array[k] = e;</span></span>
<span class="line"><span>        // 重新设置x节点需要放置的位置。</span></span>
<span class="line"><span>        k = parent;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // k == 0，当前元素是第一个元素，直接插入进去。</span></span>
<span class="line"><span>    array[k] = key;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_4-5-priorityblockingqueue的读取操作" tabindex="-1">4.5 PriorityBlockingQueue的读取操作 <a class="header-anchor" href="#_4-5-priorityblockingqueue的读取操作" aria-label="Permalink to &quot;4.5 PriorityBlockingQueue的读取操作&quot;">​</a></h3><p>读取操作是存储现在挂起的情况的，因为如果数组中元素个数为0，当前线程如果执行了take方法，必然需要挂起。</p><p>其次获取数据，因为是优先级队列，所以需要从二叉堆栈顶拿数据，直接拿索引为0的数据即可，但是拿完之后，需要保持二叉堆结构，所以会有下移操作。</p><h4 id="_4-5-1-查看获取方法流程" tabindex="-1">4.5.1 查看获取方法流程 <a class="header-anchor" href="#_4-5-1-查看获取方法流程" aria-label="Permalink to &quot;4.5.1 查看获取方法流程&quot;">​</a></h4><p>poll：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public E poll() {</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    // 加锁</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 拿到返回数据，没拿到，返回null</span></span>
<span class="line"><span>        return dequeue();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>poll(time,unit)：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public E poll(long timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span>    // 将挂起的时间转换为纳秒</span></span>
<span class="line"><span>    long nanos = unit.toNanos(timeout);</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    // 允许线程中断抛异常的加锁</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    // 声明结果</span></span>
<span class="line"><span>    E result;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // dequeue是去拿数据的，可能会出现拿到的数据为null，如果为null，同时挂起时间还有剩余，这边就直接通过notEmpty挂起线程</span></span>
<span class="line"><span>        while ( (result = dequeue()) == null &amp;&amp; nanos &gt; 0)</span></span>
<span class="line"><span>            nanos = notEmpty.awaitNanos(nanos);</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 有数据正常返回，没数据，告辞~</span></span>
<span class="line"><span>    return result;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>take：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public E take() throws InterruptedException {</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    E result;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        while ( (result = dequeue()) == null)</span></span>
<span class="line"><span>            // 无线等，要么有数据，要么中断线程</span></span>
<span class="line"><span>            notEmpty.await();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return result;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-5-2-查看dequeue获取数据" tabindex="-1">4.5.2 查看dequeue获取数据 <a class="header-anchor" href="#_4-5-2-查看dequeue获取数据" aria-label="Permalink to &quot;4.5.2 查看dequeue获取数据&quot;">​</a></h4><p>获取数据主要就是从数组中拿到0索引位置数据，然后保持二叉堆结构</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private E dequeue() {</span></span>
<span class="line"><span>    // 将元素个数-1，拿到了索引位置。</span></span>
<span class="line"><span>    int n = size - 1;</span></span>
<span class="line"><span>    // 判断是不是木有数据了，没数据直接返回null即可</span></span>
<span class="line"><span>    if (n &lt; 0)</span></span>
<span class="line"><span>        return null;</span></span>
<span class="line"><span>    // 说明有数据</span></span>
<span class="line"><span>    else {</span></span>
<span class="line"><span>        // 拿到数组，array</span></span>
<span class="line"><span>        Object[] array = queue;</span></span>
<span class="line"><span>        // 拿到0索引位置的数据</span></span>
<span class="line"><span>        E result = (E) array[0];</span></span>
<span class="line"><span>        // 拿到最后一个数据</span></span>
<span class="line"><span>        E x = (E) array[n];</span></span>
<span class="line"><span>        // 将最后一个位置置位null</span></span>
<span class="line"><span>        array[n] = null;</span></span>
<span class="line"><span>        Comparator&lt;? super E&gt; cmp = comparator;</span></span>
<span class="line"><span>        if (cmp == null)</span></span>
<span class="line"><span>            siftDownComparable(0, x, array, n);</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            siftDownUsingComparator(0, x, array, n, cmp);</span></span>
<span class="line"><span>        // 元素个数-1，赋值size</span></span>
<span class="line"><span>        size = n;</span></span>
<span class="line"><span>        // 返回result</span></span>
<span class="line"><span>        return result;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-6-3-下移做平衡操作" tabindex="-1">4.6.3 下移做平衡操作 <a class="header-anchor" href="#_4-6-3-下移做平衡操作" aria-label="Permalink to &quot;4.6.3 下移做平衡操作&quot;">​</a></h4><p>一定要以局部的方式去查看树结构的变化，他是从跟节点往下找较小的一个子节点，将较小的子节点挪动到父节点位置，再将循环往下走，如果一来，整个二叉堆的结构就可以保证了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// k：默认进来是0</span></span>
<span class="line"><span>// x：代表二叉堆的最后一个数据</span></span>
<span class="line"><span>// array：数组</span></span>
<span class="line"><span>// n：最后一个索引</span></span>
<span class="line"><span>private static &lt;T&gt; void siftDownComparable(int k, T x, Object[] array,int n) {</span></span>
<span class="line"><span>    // 健壮性校验，取完第一个数据，已经没数据了，那就不需要做平衡操作</span></span>
<span class="line"><span>    if (n &gt; 0) {</span></span>
<span class="line"><span>        // 拿到最后一个数据的比较器</span></span>
<span class="line"><span>        Comparable&lt;? super T&gt; key = (Comparable&lt;? super T&gt;)x;</span></span>
<span class="line"><span>        // 因为二叉堆是一个二叉满树，所以在保证二叉堆结构时，只需要做一半就可以</span></span>
<span class="line"><span>        int half = n &gt;&gt;&gt; 1; </span></span>
<span class="line"><span>        // 做了超过一半，就不需要再往下找了。</span></span>
<span class="line"><span>        while (k &lt; half) {</span></span>
<span class="line"><span>            // 找左子节点索引，一个公式，可以找到当前节点的左子节点</span></span>
<span class="line"><span>            int child = (k &lt;&lt; 1) + 1; </span></span>
<span class="line"><span>            // 拿到左子节点的数据</span></span>
<span class="line"><span>            Object c = array[child];</span></span>
<span class="line"><span>            // 拿到右子节点索引</span></span>
<span class="line"><span>            int right = child + 1;</span></span>
<span class="line"><span>            // 确认有右子节点</span></span>
<span class="line"><span>            // 判断左节点是否大于右节点</span></span>
<span class="line"><span>            if (right &lt; n &amp;&amp; c.compareTo(array[right]) &gt; 0)</span></span>
<span class="line"><span>                // 如果左大于右，那么c就执行右</span></span>
<span class="line"><span>                c = array[child = right];</span></span>
<span class="line"><span>            // 比较最后一个节点是否小于当前的较小的子节点</span></span>
<span class="line"><span>            if (key.compareTo((T) c) &lt;= 0)</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>            // 将左右子节点较小的放到之前的父节点位置</span></span>
<span class="line"><span>            array[k] = c;</span></span>
<span class="line"><span>            // k重置到之前的子节点位置</span></span>
<span class="line"><span>            k = child;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 上面while循环搞定后，可以确认整个二叉堆中，数据已经移动ok了，只差当前k的位置数据是null</span></span>
<span class="line"><span>        // 将最后一个索引的数据放到k的位置</span></span>
<span class="line"><span>        array[k] = key;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="五、delayqueue" tabindex="-1">五、DelayQueue <a class="header-anchor" href="#五、delayqueue" aria-label="Permalink to &quot;五、DelayQueue&quot;">​</a></h2><h3 id="_5-1-delayqueue介绍-应用" tabindex="-1">5.1 DelayQueue介绍&amp;应用 <a class="header-anchor" href="#_5-1-delayqueue介绍-应用" aria-label="Permalink to &quot;5.1 DelayQueue介绍&amp;应用&quot;">​</a></h3><p>DelayQueue就是一个延迟队列，生产者写入一个消息，这个消息还有直接被消费的延迟时间。</p><p>需要让消息具有延迟的特性。</p><p>DelayQueue也是基于二叉堆结构实现的，甚至本事就是基于PriorityQueue实现的功能。二叉堆结构每次获取的是栈顶的数据，需要让DelayQueue中的数据，在比较时，跟根据延迟时间做比较，剩余时间最短的要放在栈顶。</p><p>查看DelayQueue类信息：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class DelayQueue&lt;E extends Delayed&gt; extends AbstractQueue&lt;E&gt; implements BlockingQueue&lt;E&gt; {</span></span>
<span class="line"><span>    // 发现DelayQueue中的元素，需要继承Delayed接口。</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// ==========================================</span></span>
<span class="line"><span>// 接口继承了Comparable，这样就具备了比较的能力。</span></span>
<span class="line"><span>public interface Delayed extends Comparable&lt;Delayed&gt; {</span></span>
<span class="line"><span>    // 抽象方法，就是咱们需要设置的延迟时间</span></span>
<span class="line"><span>    long getDelay(TimeUnit unit);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    // Comparable接口提供的：public int compareTo(T o);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>基于上述特点，声明一个可以写入DelayQueue的元素类</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class Task implements Delayed {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /** 任务的名称 */</span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /** 什么时间点执行 */</span></span>
<span class="line"><span>    private Long time;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * @param name</span></span>
<span class="line"><span>     * @param delay  单位毫秒。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public Task(String name, Long delay) {</span></span>
<span class="line"><span>        // 任务名称</span></span>
<span class="line"><span>        this.name = name;</span></span>
<span class="line"><span>        this.time = System.currentTimeMillis() + delay;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 设置任务什么时候可以出延迟队列</span></span>
<span class="line"><span>     * @param unit</span></span>
<span class="line"><span>     * @return</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public long getDelay(TimeUnit unit) {</span></span>
<span class="line"><span>        return unit.convert(time - System.currentTimeMillis(),TimeUnit.NANOSECONDS);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 两个任务在插入到延迟队列时的比较方式</span></span>
<span class="line"><span>     * @param o</span></span>
<span class="line"><span>     * @return</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public int compareTo(Delayed o) {</span></span>
<span class="line"><span>        return (int) (this.time - ((Task)o).getTime());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在使用时，查看到DelayQueue底层用了PriorityQueue，在一定程度上，DelayQueue也是无界队列。</p><p>测试效果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    // 声明元素</span></span>
<span class="line"><span>    Task task1 = new Task(&quot;A&quot;,1000L);</span></span>
<span class="line"><span>    Task task2 = new Task(&quot;B&quot;,5000L);</span></span>
<span class="line"><span>    Task task3 = new Task(&quot;C&quot;,3000L);</span></span>
<span class="line"><span>    Task task4 = new Task(&quot;D&quot;,2000L);</span></span>
<span class="line"><span>    // 声明阻塞队列</span></span>
<span class="line"><span>    DelayQueue&lt;Task&gt; queue = new DelayQueue&lt;&gt;();</span></span>
<span class="line"><span>    // 将元素添加到延迟队列中</span></span>
<span class="line"><span>    queue.put(task1);</span></span>
<span class="line"><span>    queue.put(task2);</span></span>
<span class="line"><span>    queue.put(task3);</span></span>
<span class="line"><span>    queue.put(task4);</span></span>
<span class="line"><span>    // 获取元素</span></span>
<span class="line"><span>    System.out.println(queue.take());</span></span>
<span class="line"><span>    System.out.println(queue.take());</span></span>
<span class="line"><span>    System.out.println(queue.take());</span></span>
<span class="line"><span>    System.out.println(queue.take());</span></span>
<span class="line"><span>    // A,D,C,B</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在应用时，外卖，15分钟商家需要节点，如果不节点，这个订单自动取消。</p><p>可以每下一个订单，就放到延迟队列中，如果规定时间内，商家没有节点，直接通过消费者获取元素，然后取消订单。</p><p>只要是有需要延迟一定时间后，再执行的任务，就可以通过延迟队列去实现。</p><h3 id="_5-2、delayqueue核心属性" tabindex="-1">5.2、DelayQueue核心属性 <a class="header-anchor" href="#_5-2、delayqueue核心属性" aria-label="Permalink to &quot;5.2、DelayQueue核心属性&quot;">​</a></h3><p>可以查看到DelayQueue就四个核心属性</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 因为DelayQueue依然属于阻塞队列，需要保证线程安全。看到只有一把锁，生产者和消费者使用的是一个lock</span></span>
<span class="line"><span>private final transient ReentrantLock lock = new ReentrantLock();</span></span>
<span class="line"><span>// 因为DelayQueue还是基于二叉堆结构实现的，没有必要重新搞一个二叉堆，直接使用的PriorityQueue</span></span>
<span class="line"><span>private final PriorityQueue&lt;E&gt; q = new PriorityQueue&lt;E&gt;();</span></span>
<span class="line"><span>// leader一般会存储等待栈顶数据的消费者，在整体写入和消费的过程中，会设置的leader的一些判断。</span></span>
<span class="line"><span>private Thread leader = null;</span></span>
<span class="line"><span>// 生产者在插入数据时，不会阻塞的。当前的Condition就是给消费者用的</span></span>
<span class="line"><span>// 比如消费者在获取数据时，发现栈顶的数据还又没到延迟时间。</span></span>
<span class="line"><span>// 这个时候，咱们就需要将消费者线程挂起，阻塞一会，阻塞到元素到了延迟时间，或者是，生产者插入的元素到了栈顶，此时生产者会唤醒消费者。</span></span>
<span class="line"><span>private final Condition available = lock.newCondition();</span></span></code></pre></div><h3 id="_5-3、delayqueue写入流程分析" tabindex="-1">5.3、DelayQueue写入流程分析 <a class="header-anchor" href="#_5-3、delayqueue写入流程分析" aria-label="Permalink to &quot;5.3、DelayQueue写入流程分析&quot;">​</a></h3><p>Delay是无界的，数组可以动态的扩容，不需要关注生产者的阻塞问题，他就没有阻塞问题。</p><p>这里只需要查看offer方法即可。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public boolean offer(E e) {</span></span>
<span class="line"><span>    // 直接获取lock，加锁。</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 直接调用PriorityQueue的插入方法，这里会根据之前重写Delayed接口中的compareTo方法做排序，然后调整上移和下移操作。</span></span>
<span class="line"><span>        q.offer(e);</span></span>
<span class="line"><span>        // 调用优先级队列的peek方法，拿到堆顶的数据</span></span>
<span class="line"><span>        // 拿到堆顶数据后，判断是否是刚刚插入的元素</span></span>
<span class="line"><span>        if (q.peek() == e) {</span></span>
<span class="line"><span>            // leader赋值为null。在消费者的位置再提一嘴</span></span>
<span class="line"><span>            leader = null;</span></span>
<span class="line"><span>            // 唤醒消费者，避免刚刚插入的数据的延迟时间出现问题。</span></span>
<span class="line"><span>            available.signal();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 插入成功，</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 释放锁</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_5-4、delayqueue读取流程分析" tabindex="-1">5.4、DelayQueue读取流程分析 <a class="header-anchor" href="#_5-4、delayqueue读取流程分析" aria-label="Permalink to &quot;5.4、DelayQueue读取流程分析&quot;">​</a></h3><p>消费者依然还是存在阻塞的情况，因为有两个情况</p><ul><li><p>消费者要拿到栈顶数据，但是延迟时间还没到，此时消费者需要等待一会。</p></li><li><p>消费者要来拿数据，但是发现已经有消费者在等待栈顶数据了，这个后来的消费者也需要等待一会。</p></li></ul><p>依然需要查看四个方法的实现</p><h4 id="_5-4-1-remove方法" tabindex="-1">5.4.1 remove方法 <a class="header-anchor" href="#_5-4-1-remove方法" aria-label="Permalink to &quot;5.4.1 remove方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 依然是AbstractQueue提供的方法，有结果就返回，没结果扔异常</span></span>
<span class="line"><span>public E remove() {</span></span>
<span class="line"><span>    E x = poll();</span></span>
<span class="line"><span>    if (x != null)</span></span>
<span class="line"><span>        return x;</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        throw new NoSuchElementException();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_5-4-2-poll方法" tabindex="-1">5.4.2 poll方法 <a class="header-anchor" href="#_5-4-2-poll方法" aria-label="Permalink to &quot;5.4.2 poll方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// poll是浅尝一下，不会阻塞消费者，能拿就拿，拿不到就拉倒</span></span>
<span class="line"><span>public E poll() {</span></span>
<span class="line"><span>    // 消费者和生产者是一把锁，先拿锁，加锁。</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>       	 // 拿到栈顶数据。</span></span>
<span class="line"><span>        E first = q.peek();</span></span>
<span class="line"><span>        // 如果元素为null，直接返回null</span></span>
<span class="line"><span>        // 如果getDelay方法返回的结果是大于0的，那说明当前元素还每到延迟时间，元素无法返回，返回null</span></span>
<span class="line"><span>        if (first == null || first.getDelay(NANOSECONDS) &gt; 0)</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            // 到这说明元素不为null，并且已经达到了延迟时间，直接调用优先级队列的poll方法</span></span>
<span class="line"><span>            return q.poll();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 释放锁。</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_5-4-3-poll-time-unit-方法" tabindex="-1">5.4.3 poll(time,unit)方法 <a class="header-anchor" href="#_5-4-3-poll-time-unit-方法" aria-label="Permalink to &quot;5.4.3 poll(time,unit)方法&quot;">​</a></h4><p>这个是允许阻塞的，并且指定一定的时间</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public E poll(long timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span>    // 先将时间转为纳秒</span></span>
<span class="line"><span>    long nanos = unit.toNanos(timeout);</span></span>
<span class="line"><span>    // 拿锁，加锁。</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 死循环。</span></span>
<span class="line"><span>        for (;;) {</span></span>
<span class="line"><span>            // 拿到堆顶数据</span></span>
<span class="line"><span>            E first = q.peek();</span></span>
<span class="line"><span>            // 如果元素为null</span></span>
<span class="line"><span>            if (first == null) {</span></span>
<span class="line"><span>                // 并且等待的时间小于等于0。不能等了，直接返回null</span></span>
<span class="line"><span>                if (nanos &lt;= 0)</span></span>
<span class="line"><span>                    return null;</span></span>
<span class="line"><span>                // 说明当前线程还有可以阻塞的时间，阻塞指定时间即可。</span></span>
<span class="line"><span>                else</span></span>
<span class="line"><span>                    // 这里挂起线程后，说明队列没有元素，在生产者添加数据之后，会唤醒</span></span>
<span class="line"><span>                    nanos = available.awaitNanos(nanos);</span></span>
<span class="line"><span>            // 到这说明，有数据</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                // 有数据的话，先获取数据现在是否可以执行，延迟时间是否已经到了指定时间</span></span>
<span class="line"><span>                long delay = first.getDelay(NANOSECONDS);</span></span>
<span class="line"><span>                // 延迟时间是否已经到了，</span></span>
<span class="line"><span>                if (delay &lt;= 0)</span></span>
<span class="line"><span>                    // 时间到了，直接执行优先级队列的poll方法，返回元素</span></span>
<span class="line"><span>                    return q.poll();</span></span>
<span class="line"><span>                // ==================延迟时间没到，消费者需要等一会===================</span></span>
<span class="line"><span>                // 这个是查看消费者可以等待的时间，</span></span>
<span class="line"><span>                if (nanos &lt;= 0)</span></span>
<span class="line"><span>                    // 直接返回nulll</span></span>
<span class="line"><span>                    return null;</span></span>
<span class="line"><span>                // ==================延迟时间没到，消费者可以等一会===================</span></span>
<span class="line"><span>                // 把first赋值为null</span></span>
<span class="line"><span>                first = null; </span></span>
<span class="line"><span>                // 如果等待的时间，小于元素剩余的延迟时间，消费者直接挂起。反正暂时拿不到，但是不能保证后续是否有生产者添加一个新的数据，我是可以拿到的。</span></span>
<span class="line"><span>                // 如果已经有一个消费者在等待堆顶数据了，我这边不做额外操作，直接挂起即可。</span></span>
<span class="line"><span>                if (nanos &lt; delay || leader != null)</span></span>
<span class="line"><span>                    nanos = available.awaitNanos(nanos);</span></span>
<span class="line"><span>                // 当前消费者的阻塞时间可以拿到数据，并且没有其他消费者在等待堆顶数据</span></span>
<span class="line"><span>                else {</span></span>
<span class="line"><span>                    // 拿到当前消费者的线程对象</span></span>
<span class="line"><span>                    Thread thisThread = Thread.currentThread();</span></span>
<span class="line"><span>                    // 将leader设置为当前线程</span></span>
<span class="line"><span>                    leader = thisThread;</span></span>
<span class="line"><span>                    try {</span></span>
<span class="line"><span>                        // 会让当前消费者，阻塞这个元素的延迟时间</span></span>
<span class="line"><span>                        long timeLeft = available.awaitNanos(delay);</span></span>
<span class="line"><span>                        // 重新计算当前消费者剩余的可阻塞时间，。</span></span>
<span class="line"><span>                        nanos -= delay - timeLeft;</span></span>
<span class="line"><span>                    } finally {</span></span>
<span class="line"><span>                        // 到了时间，将leader设置为null</span></span>
<span class="line"><span>                        if (leader == thisThread)</span></span>
<span class="line"><span>                            leader = null;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 没有消费者在等待元素，队列中的元素不为null</span></span>
<span class="line"><span>        if (leader == null &amp;&amp; q.peek() != null)</span></span>
<span class="line"><span>            // 只要当前没有leader在等，并且队列有元素，就需要再次唤醒消费者。、</span></span>
<span class="line"><span>            // 避免队列有元素，但是没有消费者处理的问题</span></span>
<span class="line"><span>            available.signal();</span></span>
<span class="line"><span>        // 释放锁</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_5-4-4-take方法" tabindex="-1">5.4.4 take方法 <a class="header-anchor" href="#_5-4-4-take方法" aria-label="Permalink to &quot;5.4.4 take方法&quot;">​</a></h4><p>这个是允许阻塞的，但是可以一直等，要么等到元素，要么等到被中断。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public E take() throws InterruptedException {</span></span>
<span class="line"><span>    // 正常加锁，并且允许中断</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        for (;;) {</span></span>
<span class="line"><span>            // 拿到元素</span></span>
<span class="line"><span>            E first = q.peek();</span></span>
<span class="line"><span>            if (first == null)</span></span>
<span class="line"><span>                // 没有元素挂起。</span></span>
<span class="line"><span>                available.await();</span></span>
<span class="line"><span>            else {</span></span>
<span class="line"><span>                // 有元素，获取延迟时间。</span></span>
<span class="line"><span>                long delay = first.getDelay(NANOSECONDS);</span></span>
<span class="line"><span>                // 判断延迟时间是不是已经到了</span></span>
<span class="line"><span>                if (delay &lt;= 0)</span></span>
<span class="line"><span>                    // 基于优先级队列的poll方法返回</span></span>
<span class="line"><span>                    return q.poll();</span></span>
<span class="line"><span>                first = null; </span></span>
<span class="line"><span>                // 如果有消费者在等，就正常await挂起</span></span>
<span class="line"><span>                if (leader != null)</span></span>
<span class="line"><span>                    available.await();</span></span>
<span class="line"><span>                // 如果没有消费者在等的堆顶数据，我来等</span></span>
<span class="line"><span>                else {</span></span>
<span class="line"><span>                    // 获取当前线程</span></span>
<span class="line"><span>                    Thread thisThread = Thread.currentThread();</span></span>
<span class="line"><span>                    // 设置为leader，代表等待堆顶的数据</span></span>
<span class="line"><span>                    leader = thisThread;</span></span>
<span class="line"><span>                    try {</span></span>
<span class="line"><span>                        // 等待指定（堆顶元素的延迟时间）时长，</span></span>
<span class="line"><span>                        available.awaitNanos(delay);</span></span>
<span class="line"><span>                    } finally {</span></span>
<span class="line"><span>                        if (leader == thisThread)</span></span>
<span class="line"><span>                            // leader赋值null</span></span>
<span class="line"><span>                            leader = null;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 避免消费者无线等，来一个唤醒消费者的方法，一般是其他消费者拿到元素走了之后，并且延迟队列还有元素，就执行if内部唤醒方法</span></span>
<span class="line"><span>        if (leader == null &amp;&amp; q.peek() != null)</span></span>
<span class="line"><span>            available.signal();</span></span>
<span class="line"><span>        // 释放锁</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="六、synchronousqueue" tabindex="-1">六、<strong>SynchronousQueue</strong> <a class="header-anchor" href="#六、synchronousqueue" aria-label="Permalink to &quot;六、**SynchronousQueue**&quot;">​</a></h2><h3 id="_6-1-synchronousqueue介绍" tabindex="-1">6.1 SynchronousQueue介绍 <a class="header-anchor" href="#_6-1-synchronousqueue介绍" aria-label="Permalink to &quot;6.1 SynchronousQueue介绍&quot;">​</a></h3><p>SynchronousQueue这个阻塞队列和其他的阻塞队列有很大的区别</p><p>在咱们的概念中，队列肯定是要存储数据的，但是SynchronousQueue不会存储数据的</p><p>SynchronousQueue队列中，他不存储数据，存储生产者或者是消费者</p><p>当存储一个生产者到SynchronousQueue队列中之后，生产者会阻塞（看你调用的方法）</p><p>生产者最终会有几种结果：</p><ul><li><p>如果在阻塞期间有消费者来匹配，生产者就会将绑定的消息交给消费者</p></li><li><p>生产者得等阻塞结果，或者不允许阻塞，那么就直接失败</p></li><li><p>生产者在阻塞期间，如果线程中断，直接告辞。</p></li></ul><p>同理，消费者和生产者的效果是一样。</p><p>生产者和消费者的数据是直接传递的，不会经过SynchronousQueue。</p><p>SynchronousQueue是不会存储数据的。</p><p>经过阻塞队列的学习：</p><p>生产者：</p><ul><li><p>offer()：生产者在放到SynchronousQueue的同时，如果有消费者在等待消息，直接配对。如果没有消费者在等待消息，这里直接返回，告辞。</p></li><li><p>offer(time,unit)：生产者在放到SynchronousQueue的同时，如果有消费者在等待消息，直接配对。如果没有消费者在等待消息，阻塞time时间，如果还没有，告辞。</p></li><li><p>put()：生产者在放到SynchronousQueue的同时，如果有消费者在等待消息，直接配对。如果没有，死等。</p></li></ul><p>消费者：poll()，poll(time,unit)，take()。道理和上面的生产者一致。</p><p>测试效果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    // 因为当前队列不存在数据，没有长度的概念。</span></span>
<span class="line"><span>    SynchronousQueue queue = new SynchronousQueue();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    String msg = &quot;消息！&quot;;</span></span>
<span class="line"><span>    /*new Thread(() -&gt; {</span></span>
<span class="line"><span>        // b = false：代表没有消费者来拿</span></span>
<span class="line"><span>        boolean b = false;</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            b = queue.offer(msg,1, TimeUnit.SECONDS);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        System.out.println(b);</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Thread.sleep(100);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(queue.poll());</span></span>
<span class="line"><span>    }).start();*/</span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            System.out.println(queue.poll(1, TimeUnit.SECONDS));</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Thread.sleep(100);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        queue.offer(msg);</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_6-2-synchronousqueue核心属性" tabindex="-1">6.2 SynchronousQueue核心属性 <a class="header-anchor" href="#_6-2-synchronousqueue核心属性" aria-label="Permalink to &quot;6.2 SynchronousQueue核心属性&quot;">​</a></h3><p>进到SynchronousQueue类的内部后，发现了一个内部类，Transferer，内部提供了一个transfer的方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>abstract static class Transferer&lt;E&gt; {</span></span>
<span class="line"><span>    abstract E transfer(E e, boolean timed, long nanos);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>当前这个类中提供的transfer方法，就是生产者和消费者在调用读写数据时要用到的核心方法。</p><p>生产者在调用上述的transfer方法时，第一个参数e会正常传递数据</p><p>消费者在调用上述的transfer方法时，第一个参数e会传递null</p><p>SynchronousQueue针对抽象类Transferer做了几种实现。</p><p>一共看到了两种实现方式：</p><ul><li><p>TransferStack</p></li><li><p>TransferQueue</p></li></ul><p>这两种类继承了Transferer抽象类，在构建SynchronousQueue时，会指定使用哪种子类</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 到底采用哪种实现，需要把对应的对象存放到这个属性中</span></span>
<span class="line"><span>private transient volatile Transferer&lt;E&gt; transferer;</span></span>
<span class="line"><span>// 采用无参时，会调用下述方法，再次调用有参构造传入false</span></span>
<span class="line"><span>public SynchronousQueue() {</span></span>
<span class="line"><span>    this(false);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 调用的是当前的有参构造，fair代表公平还是不公平</span></span>
<span class="line"><span>public SynchronousQueue(boolean fair) {</span></span>
<span class="line"><span>    // 如果是公平，采用Queue，如果是不公平，采用Stack</span></span>
<span class="line"><span>    transferer = fair ? new TransferQueue&lt;E&gt;() : new TransferStack&lt;E&gt;();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>TransferQueue的特点</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/8c0df115166f4202b14a89a11b849c00.png" alt="" loading="lazy"></p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1654095150060/c6fe53bff00f468f90440012c507ef2e.png" alt="" loading="lazy"></p><p>代码查看效果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    // 因为当前队列不存在数据，没有长度的概念。</span></span>
<span class="line"><span>    SynchronousQueue queue = new SynchronousQueue(true);</span></span>
<span class="line"><span>    SynchronousQueue queue = new SynchronousQueue(false);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            queue.put(&quot;生1&quot;);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            queue.put(&quot;生2&quot;);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            queue.put(&quot;生3&quot;);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Thread.sleep(100);</span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;消1：&quot; + queue.poll());</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span>    Thread.sleep(100);</span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;消2：&quot; + queue.poll());</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span>    Thread.sleep(100);</span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;消3：&quot; + queue.poll());</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_6-3-synchronousqueue的transferqueue源码" tabindex="-1">6.3 SynchronousQueue的TransferQueue源码 <a class="header-anchor" href="#_6-3-synchronousqueue的transferqueue源码" aria-label="Permalink to &quot;6.3 SynchronousQueue的TransferQueue源码&quot;">​</a></h3><p>为了查看清除SynchronousQueue的TransferQueue源码，需要从两点开始查看源码信息</p><h4 id="_6-3-1-qnode源码信息" tabindex="-1">6.3.1 QNode源码信息 <a class="header-anchor" href="#_6-3-1-qnode源码信息" aria-label="Permalink to &quot;6.3.1 QNode源码信息&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>static final class QNode {</span></span>
<span class="line"><span>    // 当前节点可以获取到next节点</span></span>
<span class="line"><span>    volatile QNode next;    </span></span>
<span class="line"><span>    // item在不同情况下效果不同</span></span>
<span class="line"><span>    // 生产者：有数据</span></span>
<span class="line"><span>    // 消费者：为null</span></span>
<span class="line"><span>    volatile Object item;     </span></span>
<span class="line"><span>    // 当前线程</span></span>
<span class="line"><span>    volatile Thread waiter;   </span></span>
<span class="line"><span>    // 当前属性是永磊区分消费者和生产者的属性</span></span>
<span class="line"><span>    final boolean isData;</span></span>
<span class="line"><span>    // 最终生产者需要将item交给消费者</span></span>
<span class="line"><span>    // 最终消费者需要获取生产者的item</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    // 省略了大量提供的CAS操作</span></span>
<span class="line"><span>    ....</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_6-3-2-transfer方法实现" tabindex="-1">6.3.2 transfer方法实现 <a class="header-anchor" href="#_6-3-2-transfer方法实现" aria-label="Permalink to &quot;6.3.2 transfer方法实现&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 当前方法是TransferQueue的核心内容</span></span>
<span class="line"><span>// e：传递的数据</span></span>
<span class="line"><span>// timed：false，代表无限阻塞，true，代表阻塞nacos时间</span></span>
<span class="line"><span>E transfer(E e, boolean timed, long nanos) {</span></span>
<span class="line"><span>    // 当前QNode是要封装当前生产者或者消费者的信息</span></span>
<span class="line"><span>    QNode s = null; </span></span>
<span class="line"><span>    // isData == true：代表是生产者</span></span>
<span class="line"><span>    // isData == false：代表是消费者</span></span>
<span class="line"><span>    boolean isData = (e != null);</span></span>
<span class="line"><span>    // 死循环</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 获取尾节点和头结点</span></span>
<span class="line"><span>        QNode t = tail;</span></span>
<span class="line"><span>        QNode h = head;</span></span>
<span class="line"><span>        // 为了避免TransferQueue还没有初始化，这边做一个健壮性判断</span></span>
<span class="line"><span>        if (t == null || h == null)     </span></span>
<span class="line"><span>            continue;                  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 如果满足h == t 条件，说明当前队列没有生产者或者消费者，为空</span></span>
<span class="line"><span>        // 如果有节点，同时当前节点和队列节点属于同一种角色。</span></span>
<span class="line"><span>        // if中的逻辑是进到队列</span></span>
<span class="line"><span>        if (h == t || t.isData == isData) { </span></span>
<span class="line"><span>            // ===================在判断并发问题==========================</span></span>
<span class="line"><span>            // 拿到尾节点的next</span></span>
<span class="line"><span>            QNode tn = t.next;</span></span>
<span class="line"><span>            // 如果t不为尾节点，进来说明有其他线程并发修改了tail</span></span>
<span class="line"><span>            if (t != tail)   </span></span>
<span class="line"><span>                // 重新走for循环           </span></span>
<span class="line"><span>                continue;</span></span>
<span class="line"><span>            // tn如果为不null，说明前面有线程并发，添加了一个节点</span></span>
<span class="line"><span>            if (tn != null) {    </span></span>
<span class="line"><span>                // 直接帮助那个并发线程修改tail的指向   </span></span>
<span class="line"><span>                advanceTail(t, tn);</span></span>
<span class="line"><span>                // 重新走for循环   </span></span>
<span class="line"><span>                continue;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 获取当前线程是否可以阻塞</span></span>
<span class="line"><span>            // 如果timed为true，并且阻塞的时间小于等于0</span></span>
<span class="line"><span>            // 不需要匹配，直接告辞！！！</span></span>
<span class="line"><span>            if (timed &amp;&amp; nanos &lt;= 0)   </span></span>
<span class="line"><span>                return null;</span></span>
<span class="line"><span>            // 如果可以阻塞，将当前需要插入到队列的QNode构建出来</span></span>
<span class="line"><span>            if (s == null)</span></span>
<span class="line"><span>                s = new QNode(e, isData);</span></span>
<span class="line"><span>            // 基于CAS操作，将tail节点的next设置为当前线程</span></span>
<span class="line"><span>            if (!t.casNext(null, s))   </span></span>
<span class="line"><span>                // 如果进到if，说明修改失败，重新执行for循环修改   </span></span>
<span class="line"><span>                continue;</span></span>
<span class="line"><span>            // CAS操作成功，直接替换tail的指向</span></span>
<span class="line"><span>            advanceTail(t, s);   </span></span>
<span class="line"><span>            // 如果进到队列中了，挂起线程，要么等生产者，要么等消费者。</span></span>
<span class="line"><span>            // x是返回替换后的数据</span></span>
<span class="line"><span>            Object x = awaitFulfill(s, e, timed, nanos);</span></span>
<span class="line"><span>            // 如果元素和节点相等，说明节点取消了</span></span>
<span class="line"><span>            if (x == s) {            </span></span>
<span class="line"><span>                // 清空当前节点，将上一个节点的next指向当前节点的next，直接告辞   </span></span>
<span class="line"><span>                clean(t, s);</span></span>
<span class="line"><span>                return null;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 判断当前节点是否还在队列中</span></span>
<span class="line"><span>            if (!s.isOffList()) {   </span></span>
<span class="line"><span>                // 将当前节点设置为head</span></span>
<span class="line"><span>                advanceHead(t, s);   </span></span>
<span class="line"><span>                // 如果 x != null， 如果拿到了数据，说明我是消费者</span></span>
<span class="line"><span>                if (x != null)   </span></span>
<span class="line"><span>                    // 将当前节点的item设置为自己       </span></span>
<span class="line"><span>                    s.item = s;</span></span>
<span class="line"><span>                // 线程置位null</span></span>
<span class="line"><span>                s.waiter = null;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 返回数据</span></span>
<span class="line"><span>            return (x != null) ? (E)x : e;</span></span>
<span class="line"><span>        } </span></span>
<span class="line"><span>        // 匹配队列中的橘色</span></span>
<span class="line"><span>        else {     </span></span>
<span class="line"><span>            // 拿到head的next，作为要匹配的节点         </span></span>
<span class="line"><span>            QNode m = h.next;      </span></span>
<span class="line"><span>            // 做并发判断，如果头节点，尾节点，或者head.next发生了变化，这边要重新走for循环</span></span>
<span class="line"><span>            if (t != tail || m == null || h != head)</span></span>
<span class="line"><span>                continue;              </span></span>
<span class="line"><span>            // 没并发问题，可以拿数据</span></span>
<span class="line"><span>            // 拿到m节点的item作为x。</span></span>
<span class="line"><span>            Object x = m.item;</span></span>
<span class="line"><span>            // 如果isData == (x != null)满足，说明当前出现了并发问题，消费者去匹配队列的消费者不合理</span></span>
<span class="line"><span>            if (isData == (x != null) ||  </span></span>
<span class="line"><span>                // 如果排队的节点取消，就会讲当前QNode中的item指向QNode</span></span>
<span class="line"><span>                x == m ||     </span></span>
<span class="line"><span>                // 如果前面两个都没满足，可以交换数据了。 </span></span>
<span class="line"><span>                // 如果交换失败，说明有并发问题，</span></span>
<span class="line"><span>                !m.casItem(x, e)) {   </span></span>
<span class="line"><span>                // 重新设置head节点，并且再走一次循环  </span></span>
<span class="line"><span>                advanceHead(h, m);      </span></span>
<span class="line"><span>                continue;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 替换head</span></span>
<span class="line"><span>            advanceHead(h, m);          </span></span>
<span class="line"><span>            // 唤醒head.next中的线程</span></span>
<span class="line"><span>            LockSupport.unpark(m.waiter);</span></span>
<span class="line"><span>            // 这边匹配好了，数据也交换了，直接返回</span></span>
<span class="line"><span>            // 如果 x != null，说明队列中是生产者，当前是消费者，这边直接返回x具体数据</span></span>
<span class="line"><span>            // 反之，队列中是消费者，当前是生产者，直接返回自己的数据</span></span>
<span class="line"><span>            return (x != null) ? (E)x : e;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,657),i=[l];function t(c,o,r,u,d,h){return a(),s("div",null,i)}const k=n(e,[["render",t]]);export{b as __pageData,k as default};
