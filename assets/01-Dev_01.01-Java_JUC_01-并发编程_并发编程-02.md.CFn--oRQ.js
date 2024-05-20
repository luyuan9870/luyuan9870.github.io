import{_ as n,c as s,o as a,a4 as p}from"./chunks/framework.BG61BEI0.js";const k=JSON.parse('{"title":"线程池","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.01-Java/JUC/01-并发编程/并发编程-02.md","filePath":"01-Dev/01.01-Java/JUC/01-并发编程/并发编程-02.md","lastUpdated":1713951737000}'),e={name:"01-Dev/01.01-Java/JUC/01-并发编程/并发编程-02.md"},l=p(`<h1 id="线程池" tabindex="-1">线程池 <a class="header-anchor" href="#线程池" aria-label="Permalink to &quot;线程池&quot;">​</a></h1><h2 id="一、什么是线程池" tabindex="-1"><strong>一、什么是线程池</strong> <a class="header-anchor" href="#一、什么是线程池" aria-label="Permalink to &quot;**一、什么是线程池**&quot;">​</a></h2><p>为什么要使用线程池</p><p>在开发中，为了提升效率的操作，我们需要将一些业务采用多线程的方式去执行。</p><p>比如有一个比较大的任务，可以将任务分成几块，分别交给几个线程去执行，最终做一个汇总就可以了。</p><p>比如做业务操作时，需要发送短信或者是发送邮件，这种操作也可以基于异步的方式完成，这种异步的方式，其实就是再构建一个线程去执行。</p><p>但是，如果每次异步操作或者多线程操作都需要新创建一个线程，使用完毕后，线程再被销毁，这样的话，对系统造成一些额外的开销。在处理过程中到底由多线程处理了多少个任务，以及每个线程的开销无法统计和管理。</p><p>所以咱们需要一个线程池机制来管理这些内容。线程池的概念和连接池类似，都是在一个Java的集合中存储大量的线程对象，每次需要执行异步操作或者多线程操作时，不需要重新创建线程，直接从集合中拿到线程对象直接执行方法就可以了。</p><p>JDK中就提供了线程池的类。</p><p>在线程池构建初期，可以将任务提交到线程池中。会根据一定的机制来异步执行这个任务。</p><ul><li><p>可能任务直接被执行</p></li><li><p>任务可以暂时被存储起来了。等到有空闲线程再来处理。</p></li><li><p>任务也可能被拒绝，无法被执行。</p></li></ul><p>JDK提供的线程池中记录了每个线程处理了多少个任务，以及整个线程池处理了多少个任务。同时还可以针对任务执行前后做一些勾子函数（类似于AOP）的实现。可以在任务执行前后做一些日志信息，这样可以多记录信息方便后面统计线程池执行任务时的一些内容参数等等……</p><h2 id="二、jdk自带的构建线程池的方式" tabindex="-1">二、<strong>JDK自带的构建线程池的方式</strong> <a class="header-anchor" href="#二、jdk自带的构建线程池的方式" aria-label="Permalink to &quot;二、**JDK自带的构建线程池的方式**&quot;">​</a></h2><p>JDK中基于Executors提供了很多种线程池</p><h3 id="_2-1-newfixedthreadpool" tabindex="-1">2.1 newFixedThreadPool <a class="header-anchor" href="#_2-1-newfixedthreadpool" aria-label="Permalink to &quot;2.1 newFixedThreadPool&quot;">​</a></h3><p>这个线程池的特别是线程数是固定的。</p><p>在Executors中第一个方法就是构建newFixedThreadPool</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static ExecutorService newFixedThreadPool(int nThreads) {</span></span>
<span class="line"><span>    return new ThreadPoolExecutor(nThreads, nThreads,</span></span>
<span class="line"><span>            0L, TimeUnit.MILLISECONDS,</span></span>
<span class="line"><span>            new LinkedBlockingQueue&lt;Runnable&gt;());</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>构建时，需要给newFixedThreadPool方法提供一个nThreads的属性，而这个属性其实就是当前线程池中线程的个数。当前线程池的本质其实就是使用ThreadPoolExecutor。</p><p>构建好当前线程池后，线程个数已经固定好**（线程是懒加载，在构建之初，线程并没有构建出来，而是随着人任务的提交才会将线程在线程池中国构建出来）**。如果线程没构建，线程会待着任务执行被创建和执行。如果线程都已经构建好了，此时任务会被放到LinkedBlockingQueue无界队列中存放，等待线程从LinkedBlockingQueue中去take出任务，然后执行。</p><p>测试功能效果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span>    ExecutorService threadPool = Executors.newFixedThreadPool(3);</span></span>
<span class="line"><span>    threadPool.execute(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;1号任务：&quot; + Thread.currentThread().getName() + System.currentTimeMillis());</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Thread.sleep(5000);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    threadPool.execute(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;2号任务：&quot; + Thread.currentThread().getName() + System.currentTimeMillis());</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Thread.sleep(5000);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    threadPool.execute(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;3号任务：&quot; + Thread.currentThread().getName() + System.currentTimeMillis());</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Thread.sleep(5000);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-2-newsinglethreadexecutor" tabindex="-1">2.2 newSingleThreadExecutor <a class="header-anchor" href="#_2-2-newsinglethreadexecutor" aria-label="Permalink to &quot;2.2 newSingleThreadExecutor&quot;">​</a></h3><p>这个线程池看名字就知道是单例线程池，线程池中只有一个工作线程在处理任务</p><p>如果业务涉及到顺序消费，可以采用newSingleThreadExecutor</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 当前这里就是构建单例线程池的方式</span></span>
<span class="line"><span>public static ExecutorService newSingleThreadExecutor() {</span></span>
<span class="line"><span>    return new FinalizableDelegatedExecutorService</span></span>
<span class="line"><span>        // 在内部依然是构建了ThreadPoolExecutor，设置的线程个数为1</span></span>
<span class="line"><span>        // 当任务投递过来后，第一个任务会被工作线程处理，后续的任务会被扔到阻塞队列中</span></span>
<span class="line"><span>        // 投递到阻塞队列中任务的顺序，就是工作线程处理的顺序</span></span>
<span class="line"><span>        // 当前这种线程池可以用作顺序处理的一些业务中</span></span>
<span class="line"><span>        (new ThreadPoolExecutor(1, 1,</span></span>
<span class="line"><span>                                0L, TimeUnit.MILLISECONDS,</span></span>
<span class="line"><span>                                new LinkedBlockingQueue&lt;Runnable&gt;()));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>static class FinalizableDelegatedExecutorService extends DelegatedExecutorService {</span></span>
<span class="line"><span>    // 线程池的使用没有区别，跟正常的ThreadPoolExecutor没区别</span></span>
<span class="line"><span>    FinalizableDelegatedExecutorService(ExecutorService executor) {</span></span>
<span class="line"><span>        super(executor);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // finalize是当前对象被GC干掉之前要执行的方法</span></span>
<span class="line"><span>    // 当前FinalizableDelegatedExecutorService的目的是为了在当前线程池被GC回收之前</span></span>
<span class="line"><span>    // 可以执行shutdown，shutdown方法是将当前线程池停止，并且干掉工作线程</span></span>
<span class="line"><span>    // 但是不能基于这种方式保证线程池一定会执行shutdown</span></span>
<span class="line"><span>    // finalize在执行时，是守护线程，这种线程无法保证一定可以执行完毕。</span></span>
<span class="line"><span>    // 在使用线程池时，如果线程池是基于一个业务构建的，在使用完毕之后，一定要手动执行shutdown，</span></span>
<span class="line"><span>    // 否则会造成JVM中一堆线程</span></span>
<span class="line"><span>    protected void finalize() {</span></span>
<span class="line"><span>        super.shutdown();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>测试单例线程池效果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span>    ExecutorService threadPool = Executors.newSingleThreadExecutor();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    threadPool.execute(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(Thread.currentThread().getName() + &quot;,&quot; + &quot;111&quot;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    threadPool.execute(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(Thread.currentThread().getName() + &quot;,&quot; + &quot;222&quot;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    threadPool.execute(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(Thread.currentThread().getName() + &quot;,&quot; + &quot;333&quot;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    threadPool.execute(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(Thread.currentThread().getName() + &quot;,&quot; + &quot;444&quot;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>测试线程池使用完毕后，不执行shutdown的后果：</p><p>如果是局部变量仅限当前线程池使用的线程池，在使用完毕之后要记得执行shutdown，避免线程无法结束</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1661937858024/e2c585e0a27945889b943c8954d84e54.png" alt="" loading="lazy"></p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1661937858024/66fba14d8eba48008ba2f688d0a47507.png" alt="" loading="lazy"></p><p>如果是全局的线程池，很多业务都会到，使用完毕后不要shutdown，因为其他业务也要执行当前线程池</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1661937858024/d94e335c71684a2cba4aa69cc104367f.png" alt="" loading="lazy"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>static ExecutorService threadPool = Executors.newFixedThreadPool(200);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span>    newThreadPool();</span></span>
<span class="line"><span>    System.gc();</span></span>
<span class="line"><span>    Thread.sleep(5000);</span></span>
<span class="line"><span>    System.out.println(&quot;线程池被回收了！！&quot;);</span></span>
<span class="line"><span>    System.in.read();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private static void newThreadPool(){</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 200; i++) {</span></span>
<span class="line"><span>        final int a = i;</span></span>
<span class="line"><span>        threadPool.execute(() -&gt; {</span></span>
<span class="line"><span>            System.out.println(a);</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    threadPool.shutdown();</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 200; i++) {</span></span>
<span class="line"><span>        final int a = i;</span></span>
<span class="line"><span>        threadPool.execute(() -&gt; {</span></span>
<span class="line"><span>            System.out.println(a);</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-3-newcachedthreadpool" tabindex="-1">2.3 newCachedThreadPool <a class="header-anchor" href="#_2-3-newcachedthreadpool" aria-label="Permalink to &quot;2.3 newCachedThreadPool&quot;">​</a></h3><p>看名字好像是一个缓存的线程池，查看一下构建的方式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static ExecutorService newCachedThreadPool() {</span></span>
<span class="line"><span>    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,</span></span>
<span class="line"><span>                                  60L, TimeUnit.SECONDS,</span></span>
<span class="line"><span>                                  new SynchronousQueue&lt;Runnable&gt;());</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>当第一次提交任务到线程池时，会直接构建一个工作线程</p><p>这个工作线程带执行完人后，60秒没有任务可以执行后，会结束</p><p>如果在等待60秒期间有任务进来，他会再次拿到这个任务去执行</p><p>如果后续提升任务时，没有线程是空闲的，那么就构建工作线程去执行。</p><p>最大的一个特点，<strong>任务只要提交到当前的newCachedThreadPool中，就必然有工作线程可以处理</strong></p><p>代码测试效果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span>    ExecutorService executorService = Executors.newCachedThreadPool();</span></span>
<span class="line"><span>    for (int i = 1; i &lt;= 200; i++) {</span></span>
<span class="line"><span>        final int j = i;</span></span>
<span class="line"><span>        executorService.execute(() -&gt; {</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                Thread.sleep(1000);</span></span>
<span class="line"><span>            } catch (InterruptedException e) {</span></span>
<span class="line"><span>                e.printStackTrace();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            System.out.println(Thread.currentThread().getName() + &quot;:&quot; + j);</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-4-newschedulethreadpool" tabindex="-1">2.4 newScheduleThreadPool <a class="header-anchor" href="#_2-4-newschedulethreadpool" aria-label="Permalink to &quot;2.4 newScheduleThreadPool&quot;">​</a></h3><p>首先看到名字就可以猜到当前线程池是一个定时任务的线程池，而这个线程池就是可以以一定周期去执行一个任务，或者是延迟多久执行一个任务一次</p><p>查看一下如何构建的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) {</span></span>
<span class="line"><span>    return new ScheduledThreadPoolExecutor(corePoolSize);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>基于这个方法可以看到，构建的是ScheduledThreadPoolExecutor线程池</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class ScheduledThreadPoolExecutor extends ThreadPoolExecutor{</span></span>
<span class="line"><span>	//....</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>所以本质上还是正常线程池，只不过在原来的线程池基础上实现了定时任务的功能</p><p>原理是基于DelayQueue实现的延迟执行。周期性执行是任务执行完毕后，再次扔回到阻塞队列。</p><p>代码查看使用的方式和效果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span>    ScheduledExecutorService pool = Executors.newScheduledThreadPool(10);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 正常执行</span></span>
<span class="line"><span>//        pool.execute(() -&gt; {</span></span>
<span class="line"><span>//            System.out.println(Thread.currentThread().getName() + &quot;：1&quot;);</span></span>
<span class="line"><span>//        });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 延迟执行，执行当前任务延迟5s后再执行</span></span>
<span class="line"><span>//        pool.schedule(() -&gt; {</span></span>
<span class="line"><span>//            System.out.println(Thread.currentThread().getName() + &quot;：2&quot;);</span></span>
<span class="line"><span>//        },5,TimeUnit.SECONDS);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 周期执行，当前任务第一次延迟5s执行，然后没3s执行一次</span></span>
<span class="line"><span>    // 这个方法在计算下次执行时间时，是从任务刚刚开始时就计算。</span></span>
<span class="line"><span>//        pool.scheduleAtFixedRate(() -&gt; {</span></span>
<span class="line"><span>//            try {</span></span>
<span class="line"><span>//                Thread.sleep(3000);</span></span>
<span class="line"><span>//            } catch (InterruptedException e) {</span></span>
<span class="line"><span>//                e.printStackTrace();</span></span>
<span class="line"><span>//            }</span></span>
<span class="line"><span>//            System.out.println(System.currentTimeMillis() + &quot;：3&quot;);</span></span>
<span class="line"><span>//        },2,1,TimeUnit.SECONDS);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 周期执行，当前任务第一次延迟5s执行，然后没3s执行一次</span></span>
<span class="line"><span>    // 这个方法在计算下次执行时间时，会等待任务结束后，再计算时间</span></span>
<span class="line"><span>    pool.scheduleWithFixedDelay(() -&gt; {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Thread.sleep(3000);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        System.out.println(System.currentTimeMillis() + &quot;：3&quot;);</span></span>
<span class="line"><span>    },2,1,TimeUnit.SECONDS);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>至于Executors提供的newSingleThreadScheduledExecutor单例的定时任务线程池就不说了。</p><p>一个线程的线程池可以延迟或者以一定的周期执行一个任务。</p><h3 id="_2-5-newworkstealingpool" tabindex="-1">2.5 newWorkStealingPool <a class="header-anchor" href="#_2-5-newworkstealingpool" aria-label="Permalink to &quot;2.5 newWorkStealingPool&quot;">​</a></h3><p>当前JDK提供构建线程池的方式newWorkStealingPool和之前的线程池很非常大的区别</p><p>之前定长，单例，缓存，定时任务都基于ThreadPoolExecutor去实现的。</p><p>newWorkStealingPool是基于ForkJoinPool构建出来的</p><p><strong>ThreadPoolExecutor的核心点</strong>：</p><p>在ThreadPoolExecutor中只有一个阻塞队列存放当前任务</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1661937858024/90707080cdaa42da91564df1b5aef45a.png" alt="" loading="lazy"><br> ForkJoinPool的核心特点：</p><p>ForkJoinPool从名字上就能看出一些东西。当有一个特别大的任务时，如果采用上述方式，这个大任务只能会某一个线程去执行。ForkJoin第一个特点是可以将一个大任务拆分成多个小任务，放到当前线程的阻塞队列中。其他的空闲线程就可以去处理有任务的线程的阻塞队列中的任务</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1661937858024/b8dea88b3afd427583c789a9c76fa7fa.png" alt="" loading="lazy"></p><p>来一个比较大的数组，里面存满值，计算总和</p><p>单线程处理一个任务：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/** 非常大的数组 */</span></span>
<span class="line"><span>static int[] nums = new int[1_000_000_000];</span></span>
<span class="line"><span>// 填充值</span></span>
<span class="line"><span>static{</span></span>
<span class="line"><span>    for (int i = 0; i &lt; nums.length; i++) {</span></span>
<span class="line"><span>        nums[i] = (int) ((Math.random()) * 1000);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>public static void main(String[] args) {</span></span>
<span class="line"><span>    // ===================单线程累加10亿数据================================</span></span>
<span class="line"><span>    System.out.println(&quot;单线程计算数组总和！&quot;);</span></span>
<span class="line"><span>    long start = System.nanoTime();</span></span>
<span class="line"><span>    int sum = 0;</span></span>
<span class="line"><span>    for (int num : nums) {</span></span>
<span class="line"><span>        sum += num;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    long end = System.nanoTime();</span></span>
<span class="line"><span>    System.out.println(&quot;单线程运算结果为：&quot; + sum + &quot;，计算时间为：&quot; + (end  - start));</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>多线程分而治之的方式处理：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/** 非常大的数组 */</span></span>
<span class="line"><span>static int[] nums = new int[1_000_000_000];</span></span>
<span class="line"><span>// 填充值</span></span>
<span class="line"><span>static{</span></span>
<span class="line"><span>    for (int i = 0; i &lt; nums.length; i++) {</span></span>
<span class="line"><span>        nums[i] = (int) ((Math.random()) * 1000);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>public static void main(String[] args) {</span></span>
<span class="line"><span>    // ===================单线程累加10亿数据================================</span></span>
<span class="line"><span>    System.out.println(&quot;单线程计算数组总和！&quot;);</span></span>
<span class="line"><span>    long start = System.nanoTime();</span></span>
<span class="line"><span>    int sum = 0;</span></span>
<span class="line"><span>    for (int num : nums) {</span></span>
<span class="line"><span>        sum += num;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    long end = System.nanoTime();</span></span>
<span class="line"><span>    System.out.println(&quot;单线程运算结果为：&quot; + sum + &quot;，计算时间为：&quot; + (end  - start));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // ===================多线程分而治之累加10亿数据================================</span></span>
<span class="line"><span>    // 在使用forkJoinPool时，不推荐使用Runnable和Callable</span></span>
<span class="line"><span>    // 可以使用提供的另外两种任务的描述方式</span></span>
<span class="line"><span>    // Runnable(没有返回结果) -&gt;   RecursiveAction</span></span>
<span class="line"><span>    // Callable(有返回结果)   -&gt;   RecursiveTask</span></span>
<span class="line"><span>    ForkJoinPool forkJoinPool = (ForkJoinPool) Executors.newWorkStealingPool();</span></span>
<span class="line"><span>    System.out.println(&quot;分而治之计算数组总和！&quot;);</span></span>
<span class="line"><span>    long forkJoinStart = System.nanoTime();</span></span>
<span class="line"><span>    ForkJoinTask&lt;Integer&gt; task = forkJoinPool.submit(new SumRecursiveTask(0, nums.length - 1));</span></span>
<span class="line"><span>    Integer result = task.join();</span></span>
<span class="line"><span>    long forkJoinEnd = System.nanoTime();</span></span>
<span class="line"><span>    System.out.println(&quot;分而治之运算结果为：&quot; + result + &quot;，计算时间为：&quot; + (forkJoinEnd  - forkJoinStart));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private static class SumRecursiveTask extends RecursiveTask&lt;Integer&gt;{</span></span>
<span class="line"><span>    /** 指定一个线程处理哪个位置的数据 */</span></span>
<span class="line"><span>    private int start,end;</span></span>
<span class="line"><span>    private final int MAX_STRIDE = 100_000_000;</span></span>
<span class="line"><span>    //  200_000_000： 147964900</span></span>
<span class="line"><span>    //  100_000_000： 145942100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public SumRecursiveTask(int start, int end) {</span></span>
<span class="line"><span>        this.start = start;</span></span>
<span class="line"><span>        this.end = end;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected Integer compute() {</span></span>
<span class="line"><span>        // 在这个方法中，需要设置好任务拆分的逻辑以及聚合的逻辑</span></span>
<span class="line"><span>        int sum = 0;</span></span>
<span class="line"><span>        int stride = end - start;</span></span>
<span class="line"><span>        if(stride &lt;= MAX_STRIDE){</span></span>
<span class="line"><span>            // 可以处理任务</span></span>
<span class="line"><span>            for (int i = start; i &lt;= end; i++) {</span></span>
<span class="line"><span>                sum += nums[i];</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }else{</span></span>
<span class="line"><span>            // 将任务拆分，分而治之。</span></span>
<span class="line"><span>            int middle = (start + end) / 2;</span></span>
<span class="line"><span>            // 声明为2个任务</span></span>
<span class="line"><span>            SumRecursiveTask left = new SumRecursiveTask(start, middle);</span></span>
<span class="line"><span>            SumRecursiveTask right = new SumRecursiveTask(middle + 1, end);</span></span>
<span class="line"><span>            // 分别执行两个任务</span></span>
<span class="line"><span>            left.fork();</span></span>
<span class="line"><span>            right.fork();</span></span>
<span class="line"><span>            // 等待结果，并且获取sum</span></span>
<span class="line"><span>            sum = left.join() + right.join();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return sum;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>最终可以发现，这种累加的操作中，采用分而治之的方式效率提升了2倍多。</p><p>但是也不是所有任务都能拆分提升效率，首先任务得大，耗时要长。</p><h2 id="三、threadpoolexecutor应用-源码剖析" tabindex="-1">三、<strong>ThreadPoolExecutor应用&amp;源码剖析</strong> <a class="header-anchor" href="#三、threadpoolexecutor应用-源码剖析" aria-label="Permalink to &quot;三、**ThreadPoolExecutor应用&amp;源码剖析**&quot;">​</a></h2><p>前面讲到的Executors中的构建线程池的方式，大多数还是基于ThreadPoolExecutor去new出来的。</p><h3 id="_3-1-为什么要自定义线程池" tabindex="-1">3.1 为什么要自定义线程池 <a class="header-anchor" href="#_3-1-为什么要自定义线程池" aria-label="Permalink to &quot;3.1 为什么要自定义线程池&quot;">​</a></h3><p>首先ThreadPoolExecutor中，一共提供了7个参数，每个参数都是非常核心的属性，在线程池去执行任务时，每个参数都有决定性的作用。</p><p>但是如果直接采用JDK提供的方式去构建，可以设置的核心参数最多就两个，这样就会导致对线程池的控制粒度很粗。所以在阿里规范中也推荐自己去自定义线程池。手动的去new ThreadPoolExecutor设置他的一些核心属性。</p><p>自定义构建线程池，可以细粒度的控制线程池，去管理内存的属性，并且针对一些参数的设置可能更好的在后期排查问题。</p><p>查看一下ThreadPoolExecutor提供的七个核心参数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public ThreadPoolExecutor(</span></span>
<span class="line"><span>    int corePoolSize,           // 核心工作线程（当前任务执行结束后，不会被销毁）</span></span>
<span class="line"><span>    int maximumPoolSize,        // 最大工作线程（代表当前线程池中，一共可以有多少个工作线程）</span></span>
<span class="line"><span>    long keepAliveTime,         // 非核心工作线程在阻塞队列位置等待的时间</span></span>
<span class="line"><span>    TimeUnit unit,              // 非核心工作线程在阻塞队列位置等待时间的单位</span></span>
<span class="line"><span>    BlockingQueue&lt;Runnable&gt; workQueue,   // 任务在没有核心工作线程处理时，任务先扔到阻塞队列中</span></span>
<span class="line"><span>    ThreadFactory threadFactory,         // 构建线程的线程工作，可以设置thread的一些信息</span></span>
<span class="line"><span>    RejectedExecutionHandler handler) {  // 当线程池无法处理投递过来的任务时，执行当前的拒绝策略</span></span>
<span class="line"><span>    // 初始化线程池的操作</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-2-threadpoolexecutor应用" tabindex="-1">3.2 ThreadPoolExecutor应用 <a class="header-anchor" href="#_3-2-threadpoolexecutor应用" aria-label="Permalink to &quot;3.2 ThreadPoolExecutor应用&quot;">​</a></h3><p>手动new一下，处理的方式还是执行execute或者submit方法。</p><p>JDK提供的几种拒绝策略：</p><ul><li>AbortPolicy：当前拒绝策略会在无法处理任务时，直接抛出一个异常</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {</span></span>
<span class="line"><span>    throw new RejectedExecutionException(&quot;Task &quot; + r.toString() +</span></span>
<span class="line"><span>                                         &quot; rejected from &quot; +</span></span>
<span class="line"><span>                                         e.toString());</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>CallerRunsPolicy：当前拒绝策略会在线程池无法处理任务时，将任务交给调用者处理</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {</span></span>
<span class="line"><span>    if (!e.isShutdown()) {</span></span>
<span class="line"><span>        r.run();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>DiscardPolicy：当前拒绝策略会在线程池无法处理任务时，直接将任务丢弃掉</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>DiscardOldestPolicy：当前拒绝策略会在线程池无法处理任务时，将队列中最早的任务丢弃掉，将当前任务再次尝试交给线程池处理</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {</span></span>
<span class="line"><span>    if (!e.isShutdown()) {</span></span>
<span class="line"><span>        e.getQueue().poll();</span></span>
<span class="line"><span>        e.execute(r);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>自定义Policy：根据自己的业务，可以将任务扔到数据库，也可以做其他操作。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private static class MyRejectedExecution implements RejectedExecutionHandler{</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {</span></span>
<span class="line"><span>        System.out.println(&quot;根据自己的业务情况，决定编写的代码！&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>代码构建线程池，并处理有无返回结果的任务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws ExecutionException, InterruptedException {</span></span>
<span class="line"><span>    //1. 构建线程池</span></span>
<span class="line"><span>    ThreadPoolExecutor threadPool = new ThreadPoolExecutor(</span></span>
<span class="line"><span>            2,</span></span>
<span class="line"><span>            5,</span></span>
<span class="line"><span>            10,</span></span>
<span class="line"><span>            TimeUnit.SECONDS,</span></span>
<span class="line"><span>            new ArrayBlockingQueue&lt;&gt;(5),</span></span>
<span class="line"><span>            new ThreadFactory() {</span></span>
<span class="line"><span>                @Override</span></span>
<span class="line"><span>                public Thread newThread(Runnable r) {</span></span>
<span class="line"><span>                    Thread thread = new Thread(r);</span></span>
<span class="line"><span>                    thread.setName(&quot;test-ThreadPoolExecutor&quot;);</span></span>
<span class="line"><span>                    return thread;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            new MyRejectedExecution()</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //2. 让线程池处理任务,没返回结果</span></span>
<span class="line"><span>    threadPool.execute(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;没有返回结果的任务&quot;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //3. 让线程池处理有返回结果的任务</span></span>
<span class="line"><span>    Future&lt;Object&gt; future = threadPool.submit(new Callable&lt;Object&gt;() {</span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public Object call() throws Exception {</span></span>
<span class="line"><span>            System.out.println(&quot;我有返回结果！&quot;);</span></span>
<span class="line"><span>            return &quot;返回结果&quot;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    Object result = future.get();</span></span>
<span class="line"><span>    System.out.println(result);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //4. 如果是局部变量的线程池，记得用完要shutdown</span></span>
<span class="line"><span>    threadPool.shutdown();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>private static class MyRejectedExecution implements RejectedExecutionHandler{</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {</span></span>
<span class="line"><span>        System.out.println(&quot;根据自己的业务情况，决定编写的代码！&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-3-threadpoolexecutor源码剖析" tabindex="-1">3.3 ThreadPoolExecutor源码剖析 <a class="header-anchor" href="#_3-3-threadpoolexecutor源码剖析" aria-label="Permalink to &quot;3.3 ThreadPoolExecutor源码剖析&quot;">​</a></h3><p>线程池的源码内容会比较多一点，需要一点一点的去查看，内部比较多。</p><h4 id="_3-3-1-threadpoolexecutor的核心属性" tabindex="-1">3.3.1 ThreadPoolExecutor的核心属性 <a class="header-anchor" href="#_3-3-1-threadpoolexecutor的核心属性" aria-label="Permalink to &quot;3.3.1 ThreadPoolExecutor的核心属性&quot;">​</a></h4><p>核心属性主要就是ctl，基于ctl拿到线程池的状态以及工作线程个数</p><p>在整个线程池的执行流程中，会基于ctl判断上述两个内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 当前是线程池的核心属性</span></span>
<span class="line"><span>// 当前的ctl其实就是一个int类型的数值，内部是基于AtomicInteger套了一层，进行运算时，是原子性的。</span></span>
<span class="line"><span>// ctl表示着线程池中的2个核心状态：</span></span>
<span class="line"><span>// 线程池的状态：ctl的高3位，表示线程池状态</span></span>
<span class="line"><span>// 工作线程的数量：ctl的低29位，表示工作线程的个数</span></span>
<span class="line"><span>private final AtomicInteger ctl = new AtomicInteger(ctlOf(RUNNING, 0));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Integer.SIZE：在获取Integer的bit位个数</span></span>
<span class="line"><span>// 声明了一个常量：COUNT_BITS = 29</span></span>
<span class="line"><span>private static final int COUNT_BITS = Integer.SIZE - 3;</span></span>
<span class="line"><span>00000000 00000000 00000000 00000001</span></span>
<span class="line"><span>00100000 00000000 00000000 00000000</span></span>
<span class="line"><span>00011111 11111111 11111111 11111111</span></span>
<span class="line"><span>// CAPACITY就是当前工作线程能记录的工作线程的最大个数</span></span>
<span class="line"><span>private static final int CAPACITY   = (1 &lt;&lt; COUNT_BITS) - 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 线程池状态的表示</span></span>
<span class="line"><span>// 当前五个状态中，只有RUNNING状态代表线程池没问题，可以正常接收任务处理</span></span>
<span class="line"><span>// 111：代表RUNNING状态，RUNNING可以处理任务，并且处理阻塞队列中的任务。</span></span>
<span class="line"><span>private static final int RUNNING    = -1 &lt;&lt; COUNT_BITS;</span></span>
<span class="line"><span>// 000：代表SHUTDOWN状态，不会接收新任务，正在处理的任务正常进行，阻塞队列的任务也会做完。</span></span>
<span class="line"><span>private static final int SHUTDOWN   =  0 &lt;&lt; COUNT_BITS;</span></span>
<span class="line"><span>// 001：代表STOP状态，不会接收新任务，正在处理任务的线程会被中断，阻塞队列的任务一个不管。</span></span>
<span class="line"><span>private static final int STOP       =  1 &lt;&lt; COUNT_BITS;</span></span>
<span class="line"><span>// 010：代表TIDYING状态，这个状态是否SHUTDOWN或者STOP转换过来的，代表当前线程池马上关闭，就是过渡状态。</span></span>
<span class="line"><span>private static final int TIDYING    =  2 &lt;&lt; COUNT_BITS;</span></span>
<span class="line"><span>// 011：代表TERMINATED状态，这个状态是TIDYING状态转换过来的，转换过来只需要执行一个terminated方法。</span></span>
<span class="line"><span>private static final int TERMINATED =  3 &lt;&lt; COUNT_BITS;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 在使用下面这几个方法时，需要传递ctl进来</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 基于&amp;运算的特点，保证只会拿到ctl高三位的值。</span></span>
<span class="line"><span>private static int runStateOf(int c)     { return c &amp; ~CAPACITY; }</span></span>
<span class="line"><span>// 基于&amp;运算的特点，保证只会拿到ctl低29位的值。</span></span>
<span class="line"><span>private static int workerCountOf(int c)  { return c &amp; CAPACITY; }</span></span></code></pre></div><p>线程池状态的特点以及转换的方式</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1661937858024/9e8573ec5f5b4f1a9496e5795b773a44.png" alt="" loading="lazy"></p><h4 id="_3-3-2-threadpoolexecutor的有参构造" tabindex="-1">3.3.2 ThreadPoolExecutor的有参构造 <a class="header-anchor" href="#_3-3-2-threadpoolexecutor的有参构造" aria-label="Permalink to &quot;3.3.2 ThreadPoolExecutor的有参构造&quot;">​</a></h4><p>有参构造没啥说的，记住核心线程个数是允许为0的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 有参构造。无论调用哪个有参构造，最终都会执行当前的有参构造</span></span>
<span class="line"><span>public ThreadPoolExecutor(int corePoolSize,</span></span>
<span class="line"><span>                          int maximumPoolSize,</span></span>
<span class="line"><span>                          long keepAliveTime,</span></span>
<span class="line"><span>                          TimeUnit unit,</span></span>
<span class="line"><span>                          BlockingQueue&lt;Runnable&gt; workQueue,</span></span>
<span class="line"><span>                          ThreadFactory threadFactory,</span></span>
<span class="line"><span>                          RejectedExecutionHandler handler) {</span></span>
<span class="line"><span>    // 健壮性校验</span></span>
<span class="line"><span>    // 核心线程个数是允许为0个的。</span></span>
<span class="line"><span>    // 最大线程数必须大于0，最大线程数要大于等于核心线程数</span></span>
<span class="line"><span>    // 非核心线程的最大空闲时间，可以等于0</span></span>
<span class="line"><span>    if (corePoolSize &lt; 0 ||</span></span>
<span class="line"><span>        maximumPoolSize &lt;= 0 ||</span></span>
<span class="line"><span>        maximumPoolSize &lt; corePoolSize ||</span></span>
<span class="line"><span>        keepAliveTime &lt; 0)</span></span>
<span class="line"><span>        // 不满足要求就抛出参数异常</span></span>
<span class="line"><span>        throw new IllegalArgumentException();</span></span>
<span class="line"><span>    // 阻塞队列，线程工厂，拒绝策略都不允许为null，为null就扔空指针异常</span></span>
<span class="line"><span>    if (workQueue == null || threadFactory == null || handler == null)</span></span>
<span class="line"><span>        throw new NullPointerException();</span></span>
<span class="line"><span>    // 不要关注当前内容，系统资源访问决策，和线程池核心业务关系不大。</span></span>
<span class="line"><span>    this.acc = System.getSecurityManager() == null ? null : AccessController.getContext();</span></span>
<span class="line"><span>    // 各种赋值，JUC包下，几乎所有涉及到线程挂起的操作，单位都用纳秒。</span></span>
<span class="line"><span>    // 有参构造的值，都赋值给成员变量。</span></span>
<span class="line"><span>    // Doug Lea的习惯就是将成员变量作为局部变量单独操作。</span></span>
<span class="line"><span>    this.corePoolSize = corePoolSize;</span></span>
<span class="line"><span>    this.maximumPoolSize = maximumPoolSize;</span></span>
<span class="line"><span>    this.workQueue = workQueue;</span></span>
<span class="line"><span>    this.keepAliveTime = unit.toNanos(keepAliveTime);</span></span>
<span class="line"><span>    this.threadFactory = threadFactory;</span></span>
<span class="line"><span>    this.handler = handler;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-3-3-threadpoolexecutor的execute方法" tabindex="-1">3.3.3 ThreadPoolExecutor的execute方法 <a class="header-anchor" href="#_3-3-3-threadpoolexecutor的execute方法" aria-label="Permalink to &quot;3.3.3 ThreadPoolExecutor的execute方法&quot;">​</a></h4><p>execute方法是提交任务到线程池的核心方法，很重要</p><p>线程池的执行流程其实就是在说execute方法内部做了哪些判断</p><p>execute源码的分析</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 提交任务到线程池的核心方法</span></span>
<span class="line"><span>// command就是提交过来的任务</span></span>
<span class="line"><span>public void execute(Runnable command) {</span></span>
<span class="line"><span>    // 提交的任务不能为null</span></span>
<span class="line"><span>    if (command == null)</span></span>
<span class="line"><span>        throw new NullPointerException();</span></span>
<span class="line"><span>    // 获取核心属性ctl，用于后面的判断</span></span>
<span class="line"><span>    int c = ctl.get();</span></span>
<span class="line"><span>    // 如果工作线程个数，小于核心线程数。</span></span>
<span class="line"><span>    // 满足要求，添加核心工作线程</span></span>
<span class="line"><span>    if (workerCountOf(c) &lt; corePoolSize) {</span></span>
<span class="line"><span>        // addWorker(任务,是核心线程吗)</span></span>
<span class="line"><span>        // addWorker返回true：代表添加工作线程成功</span></span>
<span class="line"><span>        // addWorker返回false：代表添加工作线程失败</span></span>
<span class="line"><span>        // addWorker中会基于线程池状态，以及工作线程个数做判断，查看能否添加工作线程</span></span>
<span class="line"><span>        if (addWorker(command, true))</span></span>
<span class="line"><span>            // 工作线程构建出来了，任务也交给command去处理了。</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        // 说明线程池状态或者是工作线程个数发生了变化，导致添加失败，重新获取一次ctl</span></span>
<span class="line"><span>        c = ctl.get();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 添加核心工作线程失败，往这走</span></span>
<span class="line"><span>    // 判断线程池状态是否是RUNNING，如果是，正常基于阻塞队列的offer方法，将任务添加到阻塞队列</span></span>
<span class="line"><span>    if (isRunning(c) &amp;&amp; workQueue.offer(command)) {</span></span>
<span class="line"><span>        // 如果任务添加到阻塞队列成功，走if内部</span></span>
<span class="line"><span>        // 如果任务在扔到阻塞队列之前，线程池状态突然改变了。</span></span>
<span class="line"><span>        // 重新获取ctl</span></span>
<span class="line"><span>        int recheck = ctl.get();</span></span>
<span class="line"><span>        // 如果线程池的状态不是RUNNING，将任务从阻塞队列移除，</span></span>
<span class="line"><span>        if (!isRunning(recheck) &amp;&amp; remove(command))</span></span>
<span class="line"><span>            // 并且直接拒绝策略</span></span>
<span class="line"><span>            reject(command);</span></span>
<span class="line"><span>        // 在这，说明阻塞队列有我刚刚放进去的任务</span></span>
<span class="line"><span>        // 查看一下工作线程数是不是0个</span></span>
<span class="line"><span>        // 如果工作线程为0个，需要添加一个非核心工作线程去处理阻塞队列中的任务</span></span>
<span class="line"><span>        // 发生这种情况有两种：</span></span>
<span class="line"><span>        // 1. 构建线程池时，核心线程数是0个。</span></span>
<span class="line"><span>        // 2. 即便有核心线程，可以设置核心线程也允许超时，设置allowCoreThreadTimeOut为true，代表核心线程也可以超时</span></span>
<span class="line"><span>        else if (workerCountOf(recheck) == 0)</span></span>
<span class="line"><span>            // 为了避免阻塞队列中的任务饥饿，添加一个非核心工作线程去处理</span></span>
<span class="line"><span>            addWorker(null, false);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 任务添加到阻塞队列失败</span></span>
<span class="line"><span>    // 构建一个非核心工作线程</span></span>
<span class="line"><span>    // 如果添加非核心工作线程成功，直接完事，告辞</span></span>
<span class="line"><span>    else if (!addWorker(command, false))</span></span>
<span class="line"><span>        // 添加失败，执行决绝策略</span></span>
<span class="line"><span>        reject(command);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>execute方法的完整执行流程图</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1661937858024/21bfed2ad43648b490292d59067142ea.png" alt="" loading="lazy"></p><h4 id="_3-3-4-threadpoolexecutor的addworker方法" tabindex="-1">3.3.4 ThreadPoolExecutor的addWorker方法 <a class="header-anchor" href="#_3-3-4-threadpoolexecutor的addworker方法" aria-label="Permalink to &quot;3.3.4 ThreadPoolExecutor的addWorker方法&quot;">​</a></h4><p>addWorker中主要分成两大块去看</p><ul><li><p>第一块：校验线程池的状态以及工作线程个数</p></li><li><p>第二块：添加工作线程并且启动工作线程</p></li></ul><p>校验线程池的状态以及工作线程个数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 添加工作线程之校验源码</span></span>
<span class="line"><span>private boolean addWorker(Runnable firstTask, boolean core) {</span></span>
<span class="line"><span>    // 外层for循环在校验线程池的状态</span></span>
<span class="line"><span>    // 内层for循环是在校验工作线程的个数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // retry是给外层for循环添加一个标记，是为了方便在内层for循坏跳出外层for循环</span></span>
<span class="line"><span>    retry:</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 获取ctl</span></span>
<span class="line"><span>        int c = ctl.get();</span></span>
<span class="line"><span>        // 拿到ctl的高3位的值</span></span>
<span class="line"><span>        int rs = runStateOf(c);</span></span>
<span class="line"><span>//==========================线程池状态判断==================================================</span></span>
<span class="line"><span>        // 如果线程池状态是SHUTDOWN，并且此时阻塞队列有任务，工作线程个数为0，添加一个工作线程去处理阻塞队列的任务</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 判断线程池的状态是否大于等于SHUTDOWN，如果满足，说明线程池不是RUNNING</span></span>
<span class="line"><span>        if (rs &gt;= SHUTDOWN &amp;&amp;</span></span>
<span class="line"><span>            // 如果这三个条件都满足，就代表是要添加非核心工作线程去处理阻塞队列任务</span></span>
<span class="line"><span>            // 如果三个条件有一个没满足，返回false，配合!，就代表不需要添加</span></span>
<span class="line"><span>            !(rs == SHUTDOWN &amp;&amp; firstTask == null &amp;&amp; ! workQueue.isEmpty()))</span></span>
<span class="line"><span>            // 不需要添加工作线程</span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        for (;;) {</span></span>
<span class="line"><span>//==========================工作线程个数判断================================================== </span></span>
<span class="line"><span>            // 基于ctl拿到低29位的值，代表当前工作线程个数   </span></span>
<span class="line"><span>            int wc = workerCountOf(c);</span></span>
<span class="line"><span>            // 如果工作线程个数大于最大值了，不可以添加了，返回false</span></span>
<span class="line"><span>            if (wc &gt;= CAPACITY ||</span></span>
<span class="line"><span>                // 基于core来判断添加的是否是核心工作线程</span></span>
<span class="line"><span>                // 如果是核心：基于corePoolSize去判断</span></span>
<span class="line"><span>                // 如果是非核心：基于maximumPoolSize去判断</span></span>
<span class="line"><span>                wc &gt;= (core ? corePoolSize : maximumPoolSize))</span></span>
<span class="line"><span>                // 代表不能添加，工作线程个数不满足要求</span></span>
<span class="line"><span>                return false;</span></span>
<span class="line"><span>            // 针对ctl进行 + 1，采用CAS的方式</span></span>
<span class="line"><span>            if (compareAndIncrementWorkerCount(c))</span></span>
<span class="line"><span>                // CAS成功后，直接退出外层循环，代表可以执行添加工作线程操作了。</span></span>
<span class="line"><span>                break retry;</span></span>
<span class="line"><span>            // 重新获取一次ctl的值</span></span>
<span class="line"><span>            c = ctl.get(); </span></span>
<span class="line"><span>            // 判断重新获取到的ctl中，表示的线程池状态跟之前的是否有区别</span></span>
<span class="line"><span>            // 如果状态不一样，说明有变化，重新的去判断线程池状态</span></span>
<span class="line"><span>            if (runStateOf(c) != rs)</span></span>
<span class="line"><span>                // 跳出一次外层for循环</span></span>
<span class="line"><span>                continue retry;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 省略添加工作线程以及启动的过程</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>添加工作线程并且启动工作线程</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private boolean addWorker(Runnable firstTask, boolean core) {</span></span>
<span class="line"><span>    // 省略校验部分的代码</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 添加工作线程以及启动工作线程~~~</span></span>
<span class="line"><span>    // 声明了三个变量</span></span>
<span class="line"><span>    // 工作线程启动了没，默认false</span></span>
<span class="line"><span>    boolean workerStarted = false;</span></span>
<span class="line"><span>    // 工作线程添加了没，默认false</span></span>
<span class="line"><span>    boolean workerAdded = false;</span></span>
<span class="line"><span>    // 工作线程，默认为null</span></span>
<span class="line"><span>    Worker w = null;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 构建工作线程，并且将任务传递进去</span></span>
<span class="line"><span>        w = new Worker(firstTask);</span></span>
<span class="line"><span>        // 获取了Worker中的Thread对象</span></span>
<span class="line"><span>        final Thread t = w.thread;</span></span>
<span class="line"><span>        // 判断Thread是否不为null，在new Worker时，内部会通过给予的ThreadFactory去构建Thread交给Worker</span></span>
<span class="line"><span>        // 一般如果为null，代表ThreadFactory有问题。</span></span>
<span class="line"><span>        if (t != null) {</span></span>
<span class="line"><span>            // 加锁，保证使用workers成员变量以及对largestPoolSize赋值时，保证线程安全</span></span>
<span class="line"><span>            final ReentrantLock mainLock = this.mainLock;</span></span>
<span class="line"><span>            mainLock.lock();</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                // 再次获取线程池状态。</span></span>
<span class="line"><span>                int rs = runStateOf(ctl.get());</span></span>
<span class="line"><span>                // 再次判断</span></span>
<span class="line"><span>                // 如果满足  rs &lt; SHUTDOWN  说明线程池是RUNNING，状态正常，执行if代码块</span></span>
<span class="line"><span>                // 如果线程池状态为SHUTDOWN，并且firstTask为null，添加非核心工作处理阻塞队列任务</span></span>
<span class="line"><span>                if (rs &lt; SHUTDOWN ||</span></span>
<span class="line"><span>                    (rs == SHUTDOWN &amp;&amp; firstTask == null)) {</span></span>
<span class="line"><span>                    // 到这，可以添加工作线程。</span></span>
<span class="line"><span>                    // 校验ThreadFactory构建线程后，不能自己启动线程，如果启动了，抛出异常</span></span>
<span class="line"><span>                    if (t.isAlive()) </span></span>
<span class="line"><span>                        throw new IllegalThreadStateException();</span></span>
<span class="line"><span>                    // private final HashSet&lt;Worker&gt; workers = new HashSet&lt;Worker&gt;();</span></span>
<span class="line"><span>                    // 将new好的Worker添加到HashSet中。</span></span>
<span class="line"><span>                    workers.add(w);</span></span>
<span class="line"><span>                    // 获取了HashSet的size，拿到工作线程个数</span></span>
<span class="line"><span>                    int s = workers.size();</span></span>
<span class="line"><span>                    // largestPoolSize在记录最大线程个数的记录</span></span>
<span class="line"><span>                    // 如果当前工作线程个数，大于最大线程个数的记录，就赋值</span></span>
<span class="line"><span>                    if (s &gt; largestPoolSize)</span></span>
<span class="line"><span>                        largestPoolSize = s;</span></span>
<span class="line"><span>                    // 添加工作线程成功</span></span>
<span class="line"><span>                    workerAdded = true;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            } finally {</span></span>
<span class="line"><span>                mainLock.unlock();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 如果工作线程添加成功，</span></span>
<span class="line"><span>            if (workerAdded) {</span></span>
<span class="line"><span>                // 直接启动Worker中的线程</span></span>
<span class="line"><span>                t.start();</span></span>
<span class="line"><span>                // 启动工作线程成功</span></span>
<span class="line"><span>                workerStarted = true;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 做补偿的操作，如果工作线程启动失败，将这个添加失败的工作线程处理掉</span></span>
<span class="line"><span>        if (!workerStarted)</span></span>
<span class="line"><span>            addWorkerFailed(w);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 返回工作线程是否启动成功</span></span>
<span class="line"><span>    return workerStarted;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 工作线程启动失败，需要不的步长操作</span></span>
<span class="line"><span>private void addWorkerFailed(Worker w) {</span></span>
<span class="line"><span>    // 因为操作了workers，需要加锁</span></span>
<span class="line"><span>    final ReentrantLock mainLock = this.mainLock;</span></span>
<span class="line"><span>    mainLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 如果w不为null，之前Worker已经new出来了。</span></span>
<span class="line"><span>        if (w != null)</span></span>
<span class="line"><span>            // 从HashSet中移除</span></span>
<span class="line"><span>            workers.remove(w);</span></span>
<span class="line"><span>        // 同时对ctl进行 - 1，代表去掉了一个工作线程个数</span></span>
<span class="line"><span>        decrementWorkerCount();</span></span>
<span class="line"><span>        // 因为工作线程启动失败，判断一下状态的问题，是不是可以走TIDYING状态最终到TERMINATED状态了。</span></span>
<span class="line"><span>        tryTerminate();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 释放锁</span></span>
<span class="line"><span>        mainLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-3-5-threadpoolexecutor的worker工作线程" tabindex="-1">3.3.5 ThreadPoolExecutor的Worker工作线程 <a class="header-anchor" href="#_3-3-5-threadpoolexecutor的worker工作线程" aria-label="Permalink to &quot;3.3.5 ThreadPoolExecutor的Worker工作线程&quot;">​</a></h4><p>Worker对象主要包含了两个内容</p><ul><li><p>工作线程要执行任务</p></li><li><p>工作线程可能会被中断，控制中断</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// Worker继承了AQS，目的就是为了控制工作线程的中断。</span></span>
<span class="line"><span>// Worker实现了Runnable，内部的Thread对象，在执行start时，必然要执行Worker中断额一些操作</span></span>
<span class="line"><span>private final class Worker extends AbstractQueuedSynchronizer implements Runnable{</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>// =======================Worker管理任务================================  </span></span>
<span class="line"><span>    // 线程工厂构建的线程</span></span>
<span class="line"><span>    final Thread thread;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 当前Worker要执行的任务</span></span>
<span class="line"><span>    Runnable firstTask;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 记录当前工作线程处理了多少个任务。</span></span>
<span class="line"><span>    volatile long completedTasks;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 有参构造</span></span>
<span class="line"><span>    Worker(Runnable firstTask) {</span></span>
<span class="line"><span>        // 将State设置为-1，代表当前不允许中断线程</span></span>
<span class="line"><span>        setState(-1); </span></span>
<span class="line"><span>        // 任务赋值</span></span>
<span class="line"><span>        this.firstTask = firstTask;</span></span>
<span class="line"><span>        // 基于线程工作构建Thread，并且传入的Runnable是Worker</span></span>
<span class="line"><span>        this.thread = getThreadFactory().newThread(this);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 当thread执行start方法时，调用的是Worker的run方法，</span></span>
<span class="line"><span>    public void run() {</span></span>
<span class="line"><span>        // 任务执行时，执行的是runWorker方法</span></span>
<span class="line"><span>        runWorker(this);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// =======================Worker管理中断================================   </span></span>
<span class="line"><span>    // 当前方法是中断工作线程时，执行的方法</span></span>
<span class="line"><span>    void interruptIfStarted() {</span></span>
<span class="line"><span>        Thread t;</span></span>
<span class="line"><span>        // 只有Worker中的state &gt;= 0的时候，可以中断工作线程</span></span>
<span class="line"><span>        if (getState() &gt;= 0 &amp;&amp; (t = thread) != null &amp;&amp; !t.isInterrupted()) {</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                // 如果状态正常，并且线程未中断，这边就中断线程</span></span>
<span class="line"><span>                t.interrupt();</span></span>
<span class="line"><span>            } catch (SecurityException ignore) {</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    protected boolean isHeldExclusively() {</span></span>
<span class="line"><span>        return getState() != 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    protected boolean tryAcquire(int unused) {</span></span>
<span class="line"><span>        if (compareAndSetState(0, 1)) {</span></span>
<span class="line"><span>            setExclusiveOwnerThread(Thread.currentThread());</span></span>
<span class="line"><span>            return true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return false;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    protected boolean tryRelease(int unused) {</span></span>
<span class="line"><span>        setExclusiveOwnerThread(null);</span></span>
<span class="line"><span>        setState(0);</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public void lock()        { acquire(1); }</span></span>
<span class="line"><span>    public boolean tryLock()  { return tryAcquire(1); }</span></span>
<span class="line"><span>    public void unlock()      { release(1); }</span></span>
<span class="line"><span>    public boolean isLocked() { return isHeldExclusively(); }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-3-6-threadpoolexecutor的runworker方法" tabindex="-1">3.3.6 ThreadPoolExecutor的runWorker方法 <a class="header-anchor" href="#_3-3-6-threadpoolexecutor的runworker方法" aria-label="Permalink to &quot;3.3.6 ThreadPoolExecutor的runWorker方法&quot;">​</a></h4><p>runWorker就是让工作线程拿到任务去执行即可。</p><p>并且在内部也处理了在工作线程正常结束和异常结束时的处理方案</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 工作线程启动后执行的任务。</span></span>
<span class="line"><span>final void runWorker(Worker w) {</span></span>
<span class="line"><span>    // 拿到当前线程</span></span>
<span class="line"><span>    Thread wt = Thread.currentThread();</span></span>
<span class="line"><span>    // 从worker对象中拿到任务</span></span>
<span class="line"><span>    Runnable task = w.firstTask;</span></span>
<span class="line"><span>    // 将Worker中的firstTask置位空</span></span>
<span class="line"><span>    w.firstTask = null;</span></span>
<span class="line"><span>    // 将Worker中的state置位0，代表当前线程可以中断的</span></span>
<span class="line"><span>    w.unlock(); // allow interrupts</span></span>
<span class="line"><span>    // 判断工作线程是否是异常结束，默认就是异常结束</span></span>
<span class="line"><span>    boolean completedAbruptly = true;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 获取任务</span></span>
<span class="line"><span>        // 直接拿到第一个任务去执行</span></span>
<span class="line"><span>        // 如果第一个任务为null，去阻塞队列中获取任务</span></span>
<span class="line"><span>        while (task != null || (task = getTask()) != null) {</span></span>
<span class="line"><span>            // 执行了Worker的lock方法，当前在lock时，shutdown操作不能中断当前线程，因为当前线程正在处理任务</span></span>
<span class="line"><span>            w.lock();</span></span>
<span class="line"><span>            // 比较ctl &gt;= STOP,如果满足找个状态，说明线程池已经到了STOP状态甚至已经要凉凉了</span></span>
<span class="line"><span>            // 线程池到STOP状态，并且当前线程还没有中断，确保线程是中断的，进到if内部执行中断方法</span></span>
<span class="line"><span>            // if(runStateAtLeast(ctl.get(), STOP) &amp;&amp; !wt.isInterrupted()) {中断线程}</span></span>
<span class="line"><span>            // 如果线程池状态不是STOP，确保线程不是中断的。</span></span>
<span class="line"><span>            // 如果发现线程中断标记位是true了，再次查看线程池状态是大于STOP了，再次中断线程</span></span>
<span class="line"><span>            // 这里其实就是做了一个事情，如果线程池状态 &gt;= STOP，确保线程中断了。</span></span>
<span class="line"><span>            if (</span></span>
<span class="line"><span>                (</span></span>
<span class="line"><span>                    runStateAtLeast(ctl.get(), STOP) ||  </span></span>
<span class="line"><span>                    (     Thread.interrupted() &amp;&amp; runStateAtLeast(ctl.get(), STOP)   )</span></span>
<span class="line"><span>                )</span></span>
<span class="line"><span>                &amp;&amp; !wt.isInterrupted())</span></span>
<span class="line"><span>                wt.interrupt();</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                // 勾子函数在线程池中没有做任何的实现，如果需要在线程池执行任务前后做一些额外的处理，可以重写勾子函数</span></span>
<span class="line"><span>                // 前置勾子函数</span></span>
<span class="line"><span>                beforeExecute(wt, task);</span></span>
<span class="line"><span>                Throwable thrown = null;</span></span>
<span class="line"><span>                try {</span></span>
<span class="line"><span>                    // 执行任务。</span></span>
<span class="line"><span>                    task.run();</span></span>
<span class="line"><span>                } catch (RuntimeException x) {</span></span>
<span class="line"><span>                    thrown = x; throw x;</span></span>
<span class="line"><span>                } catch (Error x) {</span></span>
<span class="line"><span>                    thrown = x; throw x;</span></span>
<span class="line"><span>                } catch (Throwable x) {</span></span>
<span class="line"><span>                    thrown = x; throw new Error(x);</span></span>
<span class="line"><span>                } finally {</span></span>
<span class="line"><span>                    // 前后置勾子函数</span></span>
<span class="line"><span>                    afterExecute(task, thrown);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            } finally {</span></span>
<span class="line"><span>                // 任务执行完，丢掉任务</span></span>
<span class="line"><span>                task = null;</span></span>
<span class="line"><span>                // 当前工作线程处理的任务数+1</span></span>
<span class="line"><span>                w.completedTasks++;</span></span>
<span class="line"><span>                // 执行unlock方法，此时shutdown方法才可以中断当前线程</span></span>
<span class="line"><span>                w.unlock();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 如果while循环结束，正常走到这，说明是正常结束</span></span>
<span class="line"><span>        // 正常结束的话，在getTask中就会做一个额外的处理，将ctl - 1，代表工作线程没一个。</span></span>
<span class="line"><span>        completedAbruptly = false;</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 考虑干掉工作线程</span></span>
<span class="line"><span>        processWorkerExit(w, completedAbruptly);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 工作线程结束前，要执行当前方法</span></span>
<span class="line"><span>private void processWorkerExit(Worker w, boolean completedAbruptly) {</span></span>
<span class="line"><span>    // 如果是异常结束</span></span>
<span class="line"><span>    if (completedAbruptly) </span></span>
<span class="line"><span>        // 将ctl - 1，扣掉一个工作线程</span></span>
<span class="line"><span>        decrementWorkerCount();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 操作Worker，为了线程安全，加锁</span></span>
<span class="line"><span>    final ReentrantLock mainLock = this.mainLock;</span></span>
<span class="line"><span>    mainLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 当前工作线程处理的任务个数累加到线程池处理任务的个数属性中</span></span>
<span class="line"><span>        completedTaskCount += w.completedTasks;</span></span>
<span class="line"><span>        // 将工作线程从hashSet中移除</span></span>
<span class="line"><span>        workers.remove(w);</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 释放锁</span></span>
<span class="line"><span>        mainLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 只要工作线程凉了，查看是不是线程池状态改变了。</span></span>
<span class="line"><span>    tryTerminate();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 获取ctl</span></span>
<span class="line"><span>    int c = ctl.get();</span></span>
<span class="line"><span>    // 判断线程池状态，当前线程池要么是RUNNING，要么是SHUTDOWN</span></span>
<span class="line"><span>    if (runStateLessThan(c, STOP)) {</span></span>
<span class="line"><span>        // 如果正常结束工作线程</span></span>
<span class="line"><span>        if (!completedAbruptly) {</span></span>
<span class="line"><span>            // 如果核心线程允许超时，min = 0，否则就是核心线程个数</span></span>
<span class="line"><span>            int min = allowCoreThreadTimeOut ? 0 : corePoolSize;</span></span>
<span class="line"><span>            // 如果min == 0，可能会出现没有工作线程，并且阻塞队列有任务没有线程处理</span></span>
<span class="line"><span>            if (min == 0 &amp;&amp; ! workQueue.isEmpty())</span></span>
<span class="line"><span>                // 至少要有一个工作线程处理阻塞队列任务</span></span>
<span class="line"><span>                min = 1;</span></span>
<span class="line"><span>            // 如果工作线程个数 大于等于1，不怕没线程处理，正常return</span></span>
<span class="line"><span>            if (workerCountOf(c) &gt;= min)</span></span>
<span class="line"><span>                return; </span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 异常结束，为了避免出现问题，添加一个空任务的非核心线程来填补上刚刚异常结束的工作线程</span></span>
<span class="line"><span>        addWorker(null, false);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-3-7-threadpoolexecutor的gettask方法" tabindex="-1">3.3.7 ThreadPoolExecutor的getTask方法 <a class="header-anchor" href="#_3-3-7-threadpoolexecutor的gettask方法" aria-label="Permalink to &quot;3.3.7 ThreadPoolExecutor的getTask方法&quot;">​</a></h4><p>工作线程在去阻塞队列获取任务前，要先查看线程池状态</p><p>如果状态没问题，去阻塞队列take或者是poll任务</p><p>第二个循环时，不但要判断线程池状态，还要判断当前工作线程是否可以被干掉</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 当前方法就在阻塞队列中获取任务</span></span>
<span class="line"><span>// 前面半部分是判断当前工作线程是否可以返回null，结束。</span></span>
<span class="line"><span>// 后半部分就是从阻塞队列中拿任务</span></span>
<span class="line"><span>private Runnable getTask() {</span></span>
<span class="line"><span>    // timeOut默认值是false。</span></span>
<span class="line"><span>    boolean timedOut = false; </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 死循环</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 拿到ctl</span></span>
<span class="line"><span>        int c = ctl.get();</span></span>
<span class="line"><span>        // 拿到线程池的状态</span></span>
<span class="line"><span>        int rs = runStateOf(c);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 如果线程池状态是STOP，没有必要处理阻塞队列任务，直接返回null</span></span>
<span class="line"><span>        // 如果线程池状态是SHUTDOWN，并且阻塞队列是空的，直接返回null</span></span>
<span class="line"><span>        if (rs &gt;= SHUTDOWN &amp;&amp; </span></span>
<span class="line"><span>                (rs &gt;= STOP || workQueue.isEmpty())) {</span></span>
<span class="line"><span>            // 如果可以返回null，先扣减工作线程个数</span></span>
<span class="line"><span>            decrementWorkerCount();</span></span>
<span class="line"><span>            // 返回null，结束runWorker的while循环</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 基于ctl拿到工作线程个数</span></span>
<span class="line"><span>        int wc = workerCountOf(c);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 核心线程允许超时，timed为true</span></span>
<span class="line"><span>        // 工作线程个数大于核心线程数，timed为true</span></span>
<span class="line"><span>        boolean timed = allowCoreThreadTimeOut || wc &gt; corePoolSize;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (</span></span>
<span class="line"><span>            // 如果工作线程个数，大于最大线程数。（一般情况不会满足），把他看成false</span></span>
<span class="line"><span>            // 第二个判断代表，只要工作线程数小于等于核心线程数，必然为false</span></span>
<span class="line"><span>            // 即便工作线程个数大于核心线程数了，此时第一次循环也不会为true，因为timedOut默认值是false</span></span>
<span class="line"><span>            // 考虑第二次循环了，因为循环内部必然有修改timeOut的位置</span></span>
<span class="line"><span>            (wc &gt; maximumPoolSize || (timed &amp;&amp; timedOut))</span></span>
<span class="line"><span>            &amp;&amp; </span></span>
<span class="line"><span>            // 要么工作线程还有，要么阻塞队列为空，并且满足上述条件后，工作线程才会走到if内部，结束工作线程</span></span>
<span class="line"><span>            (wc &gt; 1 || workQueue.isEmpty())</span></span>
<span class="line"><span>           ) {</span></span>
<span class="line"><span>            // 第二次循环才有可能到这。</span></span>
<span class="line"><span>            // 正常结束，工作线程 - 1，因为是CAS操作，如果失败了，重新走for循环</span></span>
<span class="line"><span>            if (compareAndDecrementWorkerCount(c))</span></span>
<span class="line"><span>                return null;</span></span>
<span class="line"><span>            continue;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 工作线程从阻塞队列拿任务</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            // 如果是核心线程，timed是false，如果是非核心线程，timed就是true</span></span>
<span class="line"><span>            Runnable r = timed ?</span></span>
<span class="line"><span>                // 如果是非核心，走poll方法，拿任务，等待一会</span></span>
<span class="line"><span>                workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS) :</span></span>
<span class="line"><span>                // 如果是核心，走take方法，死等。</span></span>
<span class="line"><span>                workQueue.take();</span></span>
<span class="line"><span>            // 从阻塞队列拿到的任务不为null，这边就正常返回任务，去执行</span></span>
<span class="line"><span>            if (r != null)</span></span>
<span class="line"><span>                return r;</span></span>
<span class="line"><span>            // 说明当前线程没拿到任务，将timeOut设置为true，在上面就可以返回null退出了。</span></span>
<span class="line"><span>            timedOut = true;</span></span>
<span class="line"><span>        } catch (InterruptedException retry) {</span></span>
<span class="line"><span>            timedOut = false;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-3-8-threadpoolexecutor的关闭方法" tabindex="-1">3.3.8 ThreadPoolExecutor的关闭方法 <a class="header-anchor" href="#_3-3-8-threadpoolexecutor的关闭方法" aria-label="Permalink to &quot;3.3.8 ThreadPoolExecutor的关闭方法&quot;">​</a></h4><p>首先查看shutdownNow方法，可以从RUNNING状态转变为STOP</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// shutDownNow方法，shutdownNow不会处理阻塞队列的任务，将任务全部给你返回了。</span></span>
<span class="line"><span>public List&lt;Runnable&gt; shutdownNow() {</span></span>
<span class="line"><span>    // 声明返回结果</span></span>
<span class="line"><span>    List&lt;Runnable&gt; tasks;</span></span>
<span class="line"><span>    // 加锁</span></span>
<span class="line"><span>    final ReentrantLock mainLock = this.mainLock;</span></span>
<span class="line"><span>    mainLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 不关注这个方法……</span></span>
<span class="line"><span>        checkShutdownAccess();</span></span>
<span class="line"><span>        // 将线程池状态修改为STOP</span></span>
<span class="line"><span>        advanceRunState(STOP);</span></span>
<span class="line"><span>        // 无论怎么，直接中断工作线程。</span></span>
<span class="line"><span>        interruptWorkers();</span></span>
<span class="line"><span>        // 将阻塞队列的任务全部扔到List集合中。</span></span>
<span class="line"><span>        tasks = drainQueue();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 释放锁</span></span>
<span class="line"><span>        mainLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    tryTerminate();</span></span>
<span class="line"><span>    return tasks;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 将线程池状态修改为STOP</span></span>
<span class="line"><span>private void advanceRunState(int STOP) {</span></span>
<span class="line"><span>    // 死循环。</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 获取ctl属性的值</span></span>
<span class="line"><span>        int c = ctl.get();</span></span>
<span class="line"><span>        // 第一个判断：如果当前线程池状态已经大于等于STOP了，不管了，告辞。</span></span>
<span class="line"><span>        if (runStateAtLeast(c, STOP) ||</span></span>
<span class="line"><span>            // 基于CAS，将ctl从c修改为STOP状态，不修改工作线程个数，但是状态变为了STOP</span></span>
<span class="line"><span>            // 如果修改成功结束</span></span>
<span class="line"><span>            ctl.compareAndSet(c, ctlOf(STOP, workerCountOf(c))))</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 无论怎么，直接中断工作线程。</span></span>
<span class="line"><span>private void interruptWorkers() {</span></span>
<span class="line"><span>    final ReentrantLock mainLock = this.mainLock;</span></span>
<span class="line"><span>    mainLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 遍历HashSet，拿到所有的工作线程，直接中断。</span></span>
<span class="line"><span>        for (Worker w : workers)</span></span>
<span class="line"><span>            w.interruptIfStarted();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        mainLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 移除阻塞队列，内容全部扔到List集合中</span></span>
<span class="line"><span>private List&lt;Runnable&gt; drainQueue() {</span></span>
<span class="line"><span>    BlockingQueue&lt;Runnable&gt; q = workQueue;</span></span>
<span class="line"><span>    ArrayList&lt;Runnable&gt; taskList = new ArrayList&lt;Runnable&gt;();</span></span>
<span class="line"><span>    // 阻塞队列自带的，直接清空阻塞队列，内容扔到List集合</span></span>
<span class="line"><span>    q.drainTo(taskList);</span></span>
<span class="line"><span>    // 为了避免任务丢失，重新判断，是否需要编辑阻塞队列，重新扔到List</span></span>
<span class="line"><span>    if (!q.isEmpty()) {</span></span>
<span class="line"><span>        for (Runnable r : q.toArray(new Runnable[0])) {</span></span>
<span class="line"><span>            if (q.remove(r))</span></span>
<span class="line"><span>                taskList.add(r);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return taskList;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 查看当前线程池是否可以变为TERMINATED状态</span></span>
<span class="line"><span>final void tryTerminate() {</span></span>
<span class="line"><span>    // 死循环。</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 拿到ctl</span></span>
<span class="line"><span>        int c = ctl.get();</span></span>
<span class="line"><span>        // 如果是RUNNING，直接告辞。</span></span>
<span class="line"><span>        // 如果状态已经大于等于TIDYING，马上就要凉凉，直接告辞。</span></span>
<span class="line"><span>        // 如果状态是SHUTDOWN，但是阻塞队列还有任务，直接告辞。</span></span>
<span class="line"><span>        if (isRunning(c) ||</span></span>
<span class="line"><span>            runStateAtLeast(c, TIDYING) ||</span></span>
<span class="line"><span>            (runStateOf(c) == SHUTDOWN &amp;&amp; ! workQueue.isEmpty()))</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        // 如果还有工作线程</span></span>
<span class="line"><span>        if (workerCountOf(c) != 0) { </span></span>
<span class="line"><span>            // 再次中断工作线程</span></span>
<span class="line"><span>            interruptIdleWorkers(ONLY_ONE);</span></span>
<span class="line"><span>            // 告辞，等你工作线程全完事，我这再尝试进入到TERMINATED状态</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 加锁，为了可以执行Condition的释放操作</span></span>
<span class="line"><span>        final ReentrantLock mainLock = this.mainLock;</span></span>
<span class="line"><span>        mainLock.lock();</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            // 将线程池状态修改为TIDYING状态，如果成功，继续往下走</span></span>
<span class="line"><span>            if (ctl.compareAndSet(c, ctlOf(TIDYING, 0))) {</span></span>
<span class="line"><span>                try {</span></span>
<span class="line"><span>                    // 这个方法是空的，如果你需要在线程池关闭后做一些额外操作，这里你可以自行实现</span></span>
<span class="line"><span>                    terminated();</span></span>
<span class="line"><span>                } finally {</span></span>
<span class="line"><span>                    // 最终修改为TERMINATED状态</span></span>
<span class="line"><span>                    ctl.set(ctlOf(TERMINATED, 0));</span></span>
<span class="line"><span>                    // 线程池提供了一个方法，主线程在提交任务到线程池后，是可以继续做其他操作的。</span></span>
<span class="line"><span>                    // 咱们也可以让主线程提交任务后，等待线程池处理完毕，再做后续操作</span></span>
<span class="line"><span>                    // 这里线程池凉凉后，要唤醒哪些调用了awaitTermination方法的线程</span></span>
<span class="line"><span>                    termination.signalAll();</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                return;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        } finally {</span></span>
<span class="line"><span>            mainLock.unlock();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // else retry on failed CAS</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>再次shutdown方法，可以从RUNNING状态转变为SHUTDOWN</p><p>shutdown状态下，不会中断正在干活的线程，而且会处理阻塞队列中的任务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void shutdown() {</span></span>
<span class="line"><span>    // 加锁。。</span></span>
<span class="line"><span>    final ReentrantLock mainLock = this.mainLock;</span></span>
<span class="line"><span>    mainLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 不看。</span></span>
<span class="line"><span>        checkShutdownAccess();</span></span>
<span class="line"><span>        // 里面是一个死循环，将线程池状态修改为SHUTDOWN</span></span>
<span class="line"><span>        advanceRunState(SHUTDOWN);</span></span>
<span class="line"><span>        // 中断空闲线程</span></span>
<span class="line"><span>        interruptIdleWorkers();</span></span>
<span class="line"><span>        // 说了，这个是为了ScheduleThreadPoolExecutor准备的，不管</span></span>
<span class="line"><span>        onShutdown(); </span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        mainLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 尝试结束线程</span></span>
<span class="line"><span>    tryTerminate();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 中断空闲线程</span></span>
<span class="line"><span>private void interruptIdleWorkers(boolean onlyOne) {</span></span>
<span class="line"><span>    // 加锁</span></span>
<span class="line"><span>    final ReentrantLock mainLock = this.mainLock;</span></span>
<span class="line"><span>    mainLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        for (Worker w : workers) {</span></span>
<span class="line"><span>            Thread t = w.thread;</span></span>
<span class="line"><span>            // 如果线程没有中断，那么就去获取Worker的锁，基于tryLock可知，不会中断正在干活的线程</span></span>
<span class="line"><span>            if (!t.isInterrupted() &amp;&amp; w.tryLock()) {</span></span>
<span class="line"><span>                try {</span></span>
<span class="line"><span>                    // 会中断空闲线程</span></span>
<span class="line"><span>                    t.interrupt();</span></span>
<span class="line"><span>                } catch (SecurityException ignore) {</span></span>
<span class="line"><span>                } finally {</span></span>
<span class="line"><span>                    w.unlock();</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            if (onlyOne)</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        mainLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-4-线程池的核心参数设计规则" tabindex="-1">3.4 线程池的核心参数设计规则 <a class="header-anchor" href="#_3-4-线程池的核心参数设计规则" aria-label="Permalink to &quot;3.4 线程池的核心参数设计规则&quot;">​</a></h3><p>线程池的使用难度不大，难度在于线程池的参数并不好配置。</p><p>主要难点在于任务类型无法控制，比如任务有CPU密集型，还有IO密集型，甚至还有混合型的。</p><p>因为IO咱们无法直接控制，所以很多时间按照一些书上提供的一些方法，是无法解决问题的。</p><p>《Java并发编程实践》</p><p>想调试出一个符合当前任务情况的核心参数，最好的方式就是测试。</p><p>需要将项目部署到测试环境或者是沙箱环境中，结果各种压测得到一个相对符合的参数。</p><p>如果每次修改项目都需要重新部署，成本太高了。</p><p>此时咱们可以实现一个动态监控以及修改线程池的方案。</p><p>因为线程池的核心参数无非就是：</p><ul><li><p>corePoolSize：核心线程数</p></li><li><p>maximumPoolSize：最大线程数</p></li><li><p>workQueue：工作队列</p></li></ul><p>线程池中提供了获取核心信息的get方法，同时也提供了动态修改核心属性的set方法。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1661937858024/d52b31cb12654481b26a11ddb6e5e4d2.png" alt="" loading="lazy"></p><p>也可以采用一些开源项目提供的方式去做监控和修改</p><p>比如hippo4j就可以对线程池进行监控，而且可以和SpringBoot整合。</p><p>Github地址：<a href="https://github.com/opengoofy/hippo4j" target="_blank" rel="noreferrer">https://github.com/opengoofy/hippo4j</a></p><p>官方文档：<a href="https://hippo4j.cn/docs/user_docs/intro" target="_blank" rel="noreferrer">https://hippo4j.cn/docs/user_docs/intro</a></p>`,157),i=[l];function c(t,o,r,u,d,h){return a(),s("div",null,i)}const g=n(e,[["render",c]]);export{k as __pageData,g as default};
