import{_ as n,c as s,o as a,a4 as p}from"./chunks/framework.rIDq68an.js";const b=JSON.parse('{"title":"二、","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.01-Java/JUC/多线程.md","filePath":"01-Dev/01.01-Java/JUC/多线程.md"}'),l={name:"01-Dev/01.01-Java/JUC/多线程.md"},e=p(`<h2 id="锁升级" tabindex="-1">锁升级 <a class="header-anchor" href="#锁升级" aria-label="Permalink to &quot;锁升级&quot;">​</a></h2><h2 id="threadlocal" tabindex="-1">ThreadLocal <a class="header-anchor" href="#threadlocal" aria-label="Permalink to &quot;ThreadLocal&quot;">​</a></h2><h2 id="cas" tabindex="-1">CAS <a class="header-anchor" href="#cas" aria-label="Permalink to &quot;CAS&quot;">​</a></h2><p>比较并替换, 它能够保证 单个方法是原子的 但是不能保证你连续的多个它的方法都是原子的</p><p>CAS会带来 一个ABA问题</p><p>举个例子 线程1 : 想 把 A 改成B 刚进去 CPU调度就把执行权拿走了, 此时 线程挂起 线程2: 它吧A改成了B 又改回A 恰巧 这个过程 在 线程1 线程挂起的时候 完成了 此时 线程1 不知道 A已经变成了B又变成了A, 所以他正常往下执行 怎么处理这个问题呢 基本数据类型, 不管他 随它去 引用数据类型, CAS的时候通过Version 去处理</p><h1 id="二、" tabindex="-1">二、 <a class="header-anchor" href="#二、" aria-label="Permalink to &quot;二、&quot;">​</a></h1><h1 id="三、reentrantreadwritelock读写锁源码" tabindex="-1">三、<strong>ReentrantReadWriteLock读写锁源码</strong> <a class="header-anchor" href="#三、reentrantreadwritelock读写锁源码" aria-label="Permalink to &quot;三、**ReentrantReadWriteLock读写锁源码**&quot;">​</a></h1><h3 id="一、为什么要出现读写锁" tabindex="-1">一、为什么要出现读写锁 <a class="header-anchor" href="#一、为什么要出现读写锁" aria-label="Permalink to &quot;一、为什么要出现读写锁&quot;">​</a></h3><p>因为ReentrantLock是互斥锁，如果有一个操作是读多写少，同时还需要保证线程安全，那么使用ReentrantLock会导致效率比较低。</p><p>因为多个线程在对同一个数据进行读操作时，也不会造成线程安全问题。</p><p>所以出现了ReentrantReadWriteLock锁：</p><p>读读操作是共享的。</p><p>写写操作是互斥的。</p><p>读写操作是互斥的。</p><p>写读操作是互斥的。</p><p>单个线程获取写锁后，再次获取读锁，可以拿到。（写读可重入）</p><p>单个线程获取读锁后，再次获取写锁，拿不到。（读写不可重入）</p><p>使用方式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class XxxTest {</span></span>
<span class="line"><span>    // 读写锁！</span></span>
<span class="line"><span>    static ReentrantReadWriteLock lock = new ReentrantReadWriteLock();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 写锁</span></span>
<span class="line"><span>    static ReentrantReadWriteLock.WriteLock writeLock = lock.writeLock();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 读锁</span></span>
<span class="line"><span>    static ReentrantReadWriteLock.ReadLock readLock = lock.readLock();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>        readLock.lock();</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            System.out.println(&quot;拿到读锁！&quot;);</span></span>
<span class="line"><span>        } finally {</span></span>
<span class="line"><span>            readLock.unlock();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        writeLock.lock();</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            System.out.println(&quot;拿到写锁！&quot;);</span></span>
<span class="line"><span>        } finally {</span></span>
<span class="line"><span>            writeLock.unlock();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="二、读写锁的核心思想" tabindex="-1">二、读写锁的核心思想 <a class="header-anchor" href="#二、读写锁的核心思想" aria-label="Permalink to &quot;二、读写锁的核心思想&quot;">​</a></h3><p>ReentrantReadWriteLock还是基于AQS实现的。很多功能的实现和ReentrantLock类似</p><p>还是基于AQS的state来确定当前线程是否拿到锁资源</p><p>state表示读锁：将state的高16位作为读锁的标识</p><p>state表示写锁：将state的低16位作为写锁的标识</p><p>锁重入问题：</p><ul><li><p>写锁重入怎么玩：因为写操作和其他操作是互斥的，代表同一时间，只有一个线程持有着写锁，只要锁重入，就对低位+1即可。而且锁重入的限制，从原来的2^31 - 1，变为了2 ^ 16 -1。变短了~~</p></li><li><p>读锁重入怎么玩：读锁的重入不能仿照写锁的方式，因为写锁属于互斥锁，同一时间只会有一个线程持有写锁，但是读锁是共享锁，同一时间会有多个线程持有读锁。所以每个获取到读锁的线程，记录锁重入的方式都是基于自己的ThreadLocal存储锁重入次数。</p></li></ul><p>读锁重入的时候就不操作state了？不对，每次锁重入还要修改state，只是记录当前线程锁重入的次数，需要基于ThreadLocal记录</p><p>00000000 00000000 00000000 00000000 ： state</p><p>写锁：</p><p>00000000 00000000 00000000 00000001</p><p>写锁：</p><p>00000000 00000000 00000000 00000010</p><p>A读锁：拿不到，排队</p><p>00000000 00000000 00000000 00000010</p><p>写锁全部释放（唤醒）</p><p>00000000 00000000 00000000 00000000</p><p>A读锁：</p><p>00000000 00000001 00000000 00000000</p><p>B读锁：</p><p>00000000 00000010 00000000 00000000</p><p>B再次读锁：</p><p>00000000 00000011 00000000 00000000</p><p>每个读操作的线程，在获取读锁时，都需要开辟一个ThreadLocal。读写锁为了优化这个事情，做了两手操作：</p><ul><li><p>第一个拿到读锁的线程，不用ThreadLocal记录重入次数，在读写锁内有有一个firstRead记录重入次数</p></li><li><p>还记录了最后一个拿到读锁的线程的重入次数，交给cachedHoldCounter属性标识，可以避免频繁的在锁重入时，从TL中获取</p></li></ul><h3 id="三、写锁的操作" tabindex="-1">三、写锁的操作 <a class="header-anchor" href="#三、写锁的操作" aria-label="Permalink to &quot;三、写锁的操作&quot;">​</a></h3><h4 id="_3-1-写锁加锁-acquire" tabindex="-1">3.1 写锁加锁-acquire <a class="header-anchor" href="#_3-1-写锁加锁-acquire" aria-label="Permalink to &quot;3.1 写锁加锁-acquire&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public final void acquire(int arg) {</span></span>
<span class="line"><span>    // 尝试获取锁资源（看一下，能否以CAS的方式将state 从0 ~ 1，改成功，拿锁成功）</span></span>
<span class="line"><span>    // 成功走人</span></span>
<span class="line"><span>    // 不成功执行下面方法</span></span>
<span class="line"><span>    if (!tryAcquire(arg) &amp;&amp;</span></span>
<span class="line"><span>        // addWaiter：将当前没按到锁资源的，封装成Node，排到AQS里</span></span>
<span class="line"><span>        // acquireQueued：当前排队的能否竞争锁资源，不能挂起线程阻塞</span></span>
<span class="line"><span>        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))</span></span>
<span class="line"><span>        selfInterrupt();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>因为都是AQS的实现，主要看tryAcquire</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// state，高16：读，低16：写</span></span>
<span class="line"><span>00000000 00000000 00000000 00000000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>00000000 00000001 00000000 00000000 - SHARED_UNIT</span></span>
<span class="line"><span></span></span>
<span class="line"><span>00000000 00000000 11111111 11111111 - MAX_COUNT</span></span>
<span class="line"><span></span></span>
<span class="line"><span>00000000 00000000 11111111 11111111 - EXCLUSIVE_MASK</span></span>
<span class="line"><span>&amp;</span></span>
<span class="line"><span>00000000 00000000 00000000 00000001 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>static final int SHARED_SHIFT   = 16;</span></span>
<span class="line"><span>static final int SHARED_UNIT    = (1 &lt;&lt; SHARED_SHIFT);</span></span>
<span class="line"><span>static final int MAX_COUNT      = (1 &lt;&lt; SHARED_SHIFT) - 1;</span></span>
<span class="line"><span>static final int EXCLUSIVE_MASK = (1 &lt;&lt; SHARED_SHIFT) - 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 只拿到表示读锁的高16位。</span></span>
<span class="line"><span>static int sharedCount(int c)    { return c &gt;&gt;&gt; SHARED_SHIFT; }</span></span>
<span class="line"><span>// 只拿到表示写锁的低16位。</span></span>
<span class="line"><span>static int exclusiveCount(int c) { return c &amp; EXCLUSIVE_MASK; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 读写锁的写锁，获取流程</span></span>
<span class="line"><span>protected final boolean tryAcquire(int acquires) {</span></span>
<span class="line"><span>    // 拿到当前线程</span></span>
<span class="line"><span>    Thread current = Thread.currentThread();</span></span>
<span class="line"><span>    // 拿到state</span></span>
<span class="line"><span>    int c = getState();</span></span>
<span class="line"><span>    // 拿到了写锁的低16位标识w</span></span>
<span class="line"><span>    int w = exclusiveCount(c);</span></span>
<span class="line"><span>    // c != 0：要么有读操作拿着锁，要么有写操作拿着锁</span></span>
<span class="line"><span>    if (c != 0) {</span></span>
<span class="line"><span>        // 如果w == 0，代表没有写锁，拿不到！拜拜！</span></span>
<span class="line"><span>        // 如果w != 0，代表有写锁，看一下拿占用写锁是不是当前线程，如果不是，拿不到！拜拜！</span></span>
<span class="line"><span>        if (w == 0 || current != getExclusiveOwnerThread())</span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span>        // 到这，说明肯定是写锁，并且是当前线程持有</span></span>
<span class="line"><span>        // 判断对低位 + 1，是否会超过MAX_COUNT，超过抛Error</span></span>
<span class="line"><span>        if (w + exclusiveCount(acquires) &gt; MAX_COUNT)</span></span>
<span class="line"><span>            throw new Error(&quot;Maximum lock count exceeded&quot;);</span></span>
<span class="line"><span>        // 如果没超过锁重入次数， + 1，返回true，拿到锁资源。</span></span>
<span class="line"><span>        setState(c + acquires);</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 到这，说明c == 0</span></span>
<span class="line"><span>    // 读写锁也分为公平锁和非公平锁</span></span>
<span class="line"><span>    // 公平：看下排队不，排队就不抢了</span></span>
<span class="line"><span>    // 走hasQueuedPredecessors方法，有排队的返回true，没排队的返回false</span></span>
<span class="line"><span>    // 非公平：直接抢！</span></span>
<span class="line"><span>    // 方法实现直接返回false</span></span>
<span class="line"><span>    if (writerShouldBlock() ||</span></span>
<span class="line"><span>        // 以CAS的方式，将state从0修改为 1</span></span>
<span class="line"><span>        !compareAndSetState(c, c + acquires))</span></span>
<span class="line"><span>        // 要么不让抢，要么CAS操作失败，返回false</span></span>
<span class="line"><span>        return false;</span></span>
<span class="line"><span>    // 将当前持有互斥锁的线程，设置为自己</span></span>
<span class="line"><span>    setExclusiveOwnerThread(current);</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="剩下的addwaiter和acquirequeued和reentrantlock看的一样-都是aqs自身提供的方法" tabindex="-1">剩下的addWaiter和acquireQueued和ReentrantLock看的一样，都是AQS自身提供的方法 <a class="header-anchor" href="#剩下的addwaiter和acquirequeued和reentrantlock看的一样-都是aqs自身提供的方法" aria-label="Permalink to &quot;剩下的addWaiter和acquireQueued和ReentrantLock看的一样，都是AQS自身提供的方法&quot;">​</a></h5><h4 id="_3-2-写锁-释放锁操作" tabindex="-1">3.2 写锁-释放锁操作 <a class="header-anchor" href="#_3-2-写锁-释放锁操作" aria-label="Permalink to &quot;3.2 写锁-释放锁操作&quot;">​</a></h4><p>读写锁的释放操作，跟ReentrantLock一致，只是需要单独获取低16位，判断是否为0，为0就释放成功</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 写锁的释放锁</span></span>
<span class="line"><span>public final boolean release(int arg) {</span></span>
<span class="line"><span>    // 只有tryRealse是读写锁重新实现的方法，其他的和ReentrantLock一致</span></span>
<span class="line"><span>    if (tryRelease(arg)) {</span></span>
<span class="line"><span>        Node h = head;</span></span>
<span class="line"><span>        if (h != null &amp;&amp; h.waitStatus != 0)</span></span>
<span class="line"><span>            unparkSuccessor(h);</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 读写锁的真正释放</span></span>
<span class="line"><span>protected final boolean tryRelease(int releases) {</span></span>
<span class="line"><span>    // 判断释放锁的线程是不是持有锁的线程</span></span>
<span class="line"><span>    if (!isHeldExclusively())</span></span>
<span class="line"><span>        // 不是抛异常</span></span>
<span class="line"><span>        throw new IllegalMonitorStateException();</span></span>
<span class="line"><span>    // 对state - 1</span></span>
<span class="line"><span>    int nextc = getState() - releases;</span></span>
<span class="line"><span>    // 拿着next从获取低16位的值，判断是否为0</span></span>
<span class="line"><span>    boolean free = exclusiveCount(nextc) == 0;</span></span>
<span class="line"><span>    // 返回true</span></span>
<span class="line"><span>    if (free)</span></span>
<span class="line"><span>        // 将持有互斥锁的线程信息置位null</span></span>
<span class="line"><span>        setExclusiveOwnerThread(null);</span></span>
<span class="line"><span>    // 将-1之后的nextc复制给state</span></span>
<span class="line"><span>    setState(nextc);</span></span>
<span class="line"><span>    return free;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="四、读锁的操作" tabindex="-1">四、读锁的操作 <a class="header-anchor" href="#四、读锁的操作" aria-label="Permalink to &quot;四、读锁的操作&quot;">​</a></h3><h4 id="_4-1-读锁的加锁操作" tabindex="-1">4.1 读锁的加锁操作 <a class="header-anchor" href="#_4-1-读锁的加锁操作" aria-label="Permalink to &quot;4.1 读锁的加锁操作&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 读锁加锁操作</span></span>
<span class="line"><span>public final void acquireShared(int arg) {</span></span>
<span class="line"><span>    // tryAcquireShared，尝试获取锁资源，获取到返回1，没获取到返回-1</span></span>
<span class="line"><span>    if (tryAcquireShared(arg) &lt; 0)</span></span>
<span class="line"><span>        // doAcquireShared 前面没拿到锁，这边需要排队~</span></span>
<span class="line"><span>        doAcquireShared(arg);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// tryAcquireShared方法</span></span>
<span class="line"><span>protected final int tryAcquireShared(int unused) {</span></span>
<span class="line"><span>    // 获取当前线程</span></span>
<span class="line"><span>    Thread current = Thread.currentThread();</span></span>
<span class="line"><span>    // 拿到state</span></span>
<span class="line"><span>    int c = getState();</span></span>
<span class="line"><span>    // 那写锁标识，如果 !=0，代表有写锁</span></span>
<span class="line"><span>    if (exclusiveCount(c) != 0 &amp;&amp;</span></span>
<span class="line"><span>        // 如果持有写锁的不是当前线程，排队去！</span></span>
<span class="line"><span>        getExclusiveOwnerThread() != current)</span></span>
<span class="line"><span>        // 排队！</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    // 没有写锁！</span></span>
<span class="line"><span>    // 获取读锁信息</span></span>
<span class="line"><span>    int r = sharedCount(c);</span></span>
<span class="line"><span>    // 公平锁： 有人排队，返回true，直接拜拜，没人排队，返回false</span></span>
<span class="line"><span>    // 非公平锁：正常的逻辑是非公平直接抢，因为是读锁，每次抢占只要CAS成功，必然成功</span></span>
<span class="line"><span>    // 这就会出现问题，写操作无法在读锁的情况抢占资源，导致写线程饥饿，一致阻塞…………</span></span>
<span class="line"><span>    // 非公平锁会查看next是否是写锁的，如果是，返回true，如果不是返回false</span></span>
<span class="line"><span>    if (!readerShouldBlock() &amp;&amp;</span></span>
<span class="line"><span>        // 查看读锁是否已经达到了最大限制</span></span>
<span class="line"><span>        r &lt; MAX_COUNT &amp;&amp;</span></span>
<span class="line"><span>        // 以CAS的方式，对state的高16位+1</span></span>
<span class="line"><span>        compareAndSetState(c, c + SHARED_UNIT)) {</span></span>
<span class="line"><span>        // 拿到锁资源成功！！！</span></span>
<span class="line"><span>        if (r == 0) {</span></span>
<span class="line"><span>            // 第一个拿到锁资源的线程，用first存储</span></span>
<span class="line"><span>            firstReader = current;</span></span>
<span class="line"><span>            firstReaderHoldCount = 1;</span></span>
<span class="line"><span>        } else if (firstReader == current) {</span></span>
<span class="line"><span>            // 我是锁重入，我就是第一个拿到读锁的线程，直接对firstReaderHoldCount++记录重入的次数</span></span>
<span class="line"><span>            firstReaderHoldCount++;</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            // 不是第一个拿到锁资源的</span></span>
<span class="line"><span>            // 先拿到cachedHoldCounter，最后一个线程的重入次数</span></span>
<span class="line"><span>            HoldCounter rh = cachedHoldCounter;</span></span>
<span class="line"><span>            // rh == null： 我是第二个拿到读锁的！</span></span>
<span class="line"><span>            // 或者发现之前有最后一个来的，但是不我，将我设置为最后一个。</span></span>
<span class="line"><span>            if (rh == null || rh.tid != getThreadId(current))</span></span>
<span class="line"><span>                // 获取自己的重入次数，并赋值给cachedHoldCounter</span></span>
<span class="line"><span>                cachedHoldCounter = rh = readHolds.get();</span></span>
<span class="line"><span>            // 之前拿过，现在如果为0，赋值给TL</span></span>
<span class="line"><span>            else if (rh.count == 0)</span></span>
<span class="line"><span>                readHolds.set(rh);</span></span>
<span class="line"><span>            // 重入次数+1，</span></span>
<span class="line"><span>            // 第一个：可能是第一次拿</span></span>
<span class="line"><span>            // 第二个：可能是重入操作</span></span>
<span class="line"><span>            rh.count++;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return fullTryAcquireShared(current);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 通过tryAcquireShared没拿到锁资源，也没返回-1，就走这</span></span>
<span class="line"><span>final int fullTryAcquireShared(Thread current) {</span></span>
<span class="line"><span>    HoldCounter rh = null;</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 拿state</span></span>
<span class="line"><span>        int c = getState();</span></span>
<span class="line"><span>        // 现在有互斥锁，不是自己，拜拜！</span></span>
<span class="line"><span>        if (exclusiveCount(c) != 0) {</span></span>
<span class="line"><span>            if (getExclusiveOwnerThread() != current)</span></span>
<span class="line"><span>                return -1;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>        // 公平：有排队的，进入逻辑。   没排队的，过！</span></span>
<span class="line"><span>        // 非公平：head的next是写不，是，进入逻辑。   如果不是，过！</span></span>
<span class="line"><span>        } else if (readerShouldBlock()) {</span></span>
<span class="line"><span>            // 这里代码特别乱，因为这里的代码为了处理JDK1.5的内存泄漏问题，修改过~</span></span>
<span class="line"><span>            // 这个逻辑里不会让你拿到锁，做被阻塞前的准备</span></span>
<span class="line"><span>            if (firstReader == current) {</span></span>
<span class="line"><span>                // 什么都不做</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                if (rh == null) {</span></span>
<span class="line"><span>                    // 获取最后一个拿到读锁资源的</span></span>
<span class="line"><span>                    rh = cachedHoldCounter;</span></span>
<span class="line"><span>                    if (rh == null || rh.tid != getThreadId(current)) {</span></span>
<span class="line"><span>                        // 拿到我自己的记录重入次数的。</span></span>
<span class="line"><span>                        rh = readHolds.get();</span></span>
<span class="line"><span>                        // 如果我的次数是0，绝对不是重入操作！</span></span>
<span class="line"><span>                        if (rh.count == 0)</span></span>
<span class="line"><span>                            // 将我的TL中的值移除掉，不移除会造成内存泄漏</span></span>
<span class="line"><span>                            readHolds.remove();</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                // 如果我的次数是0，绝对不是重入操作！</span></span>
<span class="line"><span>                if (rh.count == 0)</span></span>
<span class="line"><span>                    // 返回-1，等待阻塞吧！</span></span>
<span class="line"><span>                    return -1;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 超过读锁的最大值了没？</span></span>
<span class="line"><span>        if (sharedCount(c) == MAX_COUNT)</span></span>
<span class="line"><span>            throw new Error(&quot;Maximum lock count exceeded&quot;);</span></span>
<span class="line"><span>        // 到这，就CAS竞争锁资源</span></span>
<span class="line"><span>        if (compareAndSetState(c, c + SHARED_UNIT)) {</span></span>
<span class="line"><span>            // 跟tryAcquireShared一模一样</span></span>
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
<span class="line"><span>                cachedHoldCounter = rh; </span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            return 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-2-加锁-扔到队列准备阻塞操作" tabindex="-1">4.2 加锁-扔到队列准备阻塞操作 <a class="header-anchor" href="#_4-2-加锁-扔到队列准备阻塞操作" aria-label="Permalink to &quot;4.2 加锁-扔到队列准备阻塞操作&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 没拿到锁，准备挂起</span></span>
<span class="line"><span>private void doAcquireShared(int arg) {</span></span>
<span class="line"><span>    // 将当前线程封装为Node，当前Node为共享锁，并添加到队列的模式</span></span>
<span class="line"><span>    final Node node = addWaiter(Node.SHARED);</span></span>
<span class="line"><span>    boolean failed = true;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        boolean interrupted = false;</span></span>
<span class="line"><span>        for (;;) {</span></span>
<span class="line"><span>            // 获取上一个节点</span></span>
<span class="line"><span>            final Node p = node.predecessor();</span></span>
<span class="line"><span>            if (p == head) {</span></span>
<span class="line"><span>                // 如果我的上一个是head，尝试再次获取锁资源</span></span>
<span class="line"><span>                int r = tryAcquireShared(arg);</span></span>
<span class="line"><span>                if (r &gt;= 0) {</span></span>
<span class="line"><span>                    // 如果r大于等于0，代表获取锁资源成功</span></span>
<span class="line"><span>                    // 唤醒AQS中我后面的要获取读锁的线程（SHARED模式的Node）</span></span>
<span class="line"><span>                    setHeadAndPropagate(node, r);</span></span>
<span class="line"><span>                    p.next = null; </span></span>
<span class="line"><span>                    if (interrupted)</span></span>
<span class="line"><span>                        selfInterrupt();</span></span>
<span class="line"><span>                    failed = false;</span></span>
<span class="line"><span>                    return;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 能否挂起当前线程，需要保证我前面Node的状态为-1，才能执行后面操作</span></span>
<span class="line"><span>            if (shouldParkAfterFailedAcquire(p, node) &amp;&amp;</span></span>
<span class="line"><span>                //LockSupport.park挂起~~</span></span>
<span class="line"><span>                parkAndCheckInterrupt())</span></span>
<span class="line"><span>                interrupted = true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        if (failed)</span></span>
<span class="line"><span>            cancelAcquire(node);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="四、线程池源码" tabindex="-1">四、<strong>线程池源码</strong> <a class="header-anchor" href="#四、线程池源码" aria-label="Permalink to &quot;四、**线程池源码**&quot;">​</a></h1><h3 id="一、线程池介绍" tabindex="-1">一、线程池介绍 <a class="header-anchor" href="#一、线程池介绍" aria-label="Permalink to &quot;一、线程池介绍&quot;">​</a></h3><p>Java构建线程的方式</p><ul><li><p>new Thread</p></li><li><p>new  Runnable</p></li><li><p>new Callable</p></li></ul><p>为了避免频繁创建和销毁线程造成不必要的性能，一般在使用线程时，会采用线程池</p><p>核心线程数设置的方案：</p><p>线程池使用方式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) {</span></span>
<span class="line"><span>    // 线程池的核心线程数如何设置</span></span>
<span class="line"><span>    // 任务可以分为两种：CPU密集，IO密集。</span></span>
<span class="line"><span>    ThreadPoolExecutor executor = new ThreadPoolExecutor(</span></span>
<span class="line"><span>            1,</span></span>
<span class="line"><span>            2,</span></span>
<span class="line"><span>            1,</span></span>
<span class="line"><span>            TimeUnit.SECONDS,</span></span>
<span class="line"><span>            new ArrayBlockingQueue&lt;&gt;(1),</span></span>
<span class="line"><span>            new ThreadFactory() {</span></span>
<span class="line"><span>                @Override</span></span>
<span class="line"><span>                public Thread newThread(Runnable r) {</span></span>
<span class="line"><span>                    Thread t = new Thread(r);</span></span>
<span class="line"><span>                    // ...</span></span>
<span class="line"><span>                    return t;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            new ThreadPoolExecutor.AbortPolicy()</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    executor.execute(任务);</span></span>
<span class="line"><span>    executor.submit(有返回结果的任务);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="二、线程池核心属性认知" tabindex="-1">二、线程池核心属性认知 <a class="header-anchor" href="#二、线程池核心属性认知" aria-label="Permalink to &quot;二、线程池核心属性认知&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// AtomicInteger,就是一个int，写操作用CAS实现，保证了原子性</span></span>
<span class="line"><span>// ctl维护这线程池的2个核心内容：</span></span>
<span class="line"><span>// 1：线程池状态（高3位，维护着线程池状态）</span></span>
<span class="line"><span>// 2：工作线程数量（核心线程+非核心线程，低29位，维护着工作线程个数）</span></span>
<span class="line"><span>private final AtomicInteger ctl = new AtomicInteger(ctlOf(RUNNING, 0));</span></span>
<span class="line"><span>// COUNT_BITS=29</span></span>
<span class="line"><span>private static final int COUNT_BITS = Integer.SIZE - 3;</span></span>
<span class="line"><span>// 工作线程的最大个数</span></span>
<span class="line"><span>// 00100000 00000000 00000000 00000000 - 1</span></span>
<span class="line"><span>// 000111111111111111111111111111111  </span></span>
<span class="line"><span>private static final int CAPACITY   = (1 &lt;&lt; COUNT_BITS) - 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>private static final int RUNNING    = -1 &lt;&lt; COUNT_BITS;</span></span>
<span class="line"><span>private static final int SHUTDOWN   =  0 &lt;&lt; COUNT_BITS;</span></span>
<span class="line"><span>private static final int STOP       =  1 &lt;&lt; COUNT_BITS;</span></span>
<span class="line"><span>private static final int TIDYING    =  2 &lt;&lt; COUNT_BITS;</span></span>
<span class="line"><span>private static final int TERMINATED =  3 &lt;&lt; COUNT_BITS;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 拿到线程池状态</span></span>
<span class="line"><span>// 011... </span></span>
<span class="line"><span>// 111...</span></span>
<span class="line"><span>private static int runStateOf(int c)     { return c &amp; ~CAPACITY; }</span></span>
<span class="line"><span>// 拿到工作线程个数</span></span>
<span class="line"><span>// ...0000000111111</span></span>
<span class="line"><span>// ...1111111111111</span></span>
<span class="line"><span>private static int workerCountOf(int c)  { return c &amp; CAPACITY; }</span></span></code></pre></div><p>线程池状态</p><h3 id="三、execute方法" tabindex="-1">三、execute方法 <a class="header-anchor" href="#三、execute方法" aria-label="Permalink to &quot;三、execute方法&quot;">​</a></h3><p>通过execute方法，可以看到线程池处理任务的整体执行流程</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void execute(Runnable command) {</span></span>
<span class="line"><span>    // 非空！！</span></span>
<span class="line"><span>    if (command == null)</span></span>
<span class="line"><span>        throw new NullPointerException();</span></span>
<span class="line"><span>    // 拿到ctl</span></span>
<span class="line"><span>    int c = ctl.get();</span></span>
<span class="line"><span>    // 通过ctl获取当前工作线程个数</span></span>
<span class="line"><span>    if (workerCountOf(c) &lt; corePoolSize) {</span></span>
<span class="line"><span>        // true：代表是核心线程，false：代表是非核心线程</span></span>
<span class="line"><span>        if (addWorker(command, true))</span></span>
<span class="line"><span>            // 如果添加核心线程成功，return结束掉</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        // 如果添加失败，重新获取ctl</span></span>
<span class="line"><span>        c = ctl.get();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 核心线程数已经到了最大值、添加时，线程池状态变为SHUTDOWN/STOP</span></span>
<span class="line"><span>    // 判断线程池是否是运行状态 &amp;&amp; 添加任务到工作队列</span></span>
<span class="line"><span>    if (isRunning(c) &amp;&amp; workQueue.offer(command)) {</span></span>
<span class="line"><span>        // 再次获取ctl的值</span></span>
<span class="line"><span>        int recheck = ctl.get();</span></span>
<span class="line"><span>        // 再次判断线程池状态。  DCL</span></span>
<span class="line"><span>        // 如果状态不是RUNNING，把任务从工作队列移除。</span></span>
<span class="line"><span>        if (! isRunning(recheck) &amp;&amp; remove(command))</span></span>
<span class="line"><span>            // 走一波拒绝策略。</span></span>
<span class="line"><span>            reject(command);</span></span>
<span class="line"><span>        // 线程池状态是RUNNING。</span></span>
<span class="line"><span>        // 判断工作线程数是否是0个。</span></span>
<span class="line"><span>        // 可以将核心线程设置为0，所有工作线程都是非核心线程。</span></span>
<span class="line"><span>        // 核心线程也可以通过keepAlived超时被销毁，所以如果恰巧核心线程被销毁，也会出现当前效果</span></span>
<span class="line"><span>        else if (workerCountOf(recheck) == 0)</span></span>
<span class="line"><span>            // 添加空任务的非核心线程去处理工作队列中的任务</span></span>
<span class="line"><span>            addWorker(null, false);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 可能工作队列中的任务存满了，没添加进去，到这就要添加非核心线程去处理任务</span></span>
<span class="line"><span>    else if (!addWorker(command, false))</span></span>
<span class="line"><span>        // 执行拒绝策略！</span></span>
<span class="line"><span>        reject(command);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="四、addworker添加工作线程" tabindex="-1">四、addWorker添加工作线程 <a class="header-anchor" href="#四、addworker添加工作线程" aria-label="Permalink to &quot;四、addWorker添加工作线程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private boolean addWorker(Runnable firstTask, boolean core) {</span></span>
<span class="line"><span>    xxx:</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 阿巴阿巴…………</span></span>
<span class="line"><span>        int c = ctl.get();</span></span>
<span class="line"><span>        int rs = runStateOf(c);</span></span>
<span class="line"><span>        // 判断线程池状态</span></span>
<span class="line"><span>        if (rs &gt;= SHUTDOWN &amp;&amp;</span></span>
<span class="line"><span>              // 判断如果线程池的状态为SHUTDOWN，还要处理工作队列中的任务</span></span>
<span class="line"><span>              // 如果你添加工作线程的方式，是任务的非核心线程，并且工作队列还有任务</span></span>
<span class="line"><span>            ! (rs == SHUTDOWN &amp;&amp; firstTask == null &amp;&amp; ! workQueue.isEmpty()))</span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 判断工作线程个数</span></span>
<span class="line"><span>        for (;;) {</span></span>
<span class="line"><span>            // 阿巴阿巴……</span></span>
<span class="line"><span>            int wc = workerCountOf(c);</span></span>
<span class="line"><span>            // 判断1：工作线程是否已经 == 工作线程最大个数</span></span>
<span class="line"><span>            // 判断2-true判断：判断是核心线程么？如果是判断是否超过核心线程个数</span></span>
<span class="line"><span>            // 判断2-false判断：如果是非核心线程，查看是否超过设置的最大线程数</span></span>
<span class="line"><span>            if (wc &gt;= CAPACITY || wc &gt;= (core ? corePoolSize : maximumPoolSize))</span></span>
<span class="line"><span>                return false;</span></span>
<span class="line"><span>            // 对工作线程进行 + 1操作</span></span>
<span class="line"><span>            if (compareAndIncrementWorkerCount(c))</span></span>
<span class="line"><span>                // +1成功，跳出外层循环，执行添加工作线程的业务</span></span>
<span class="line"><span>                // 以CAS方式，对ctl+1，多线程并发操作，只有会有一个成功</span></span>
<span class="line"><span>                break xxx;</span></span>
<span class="line"><span>            // 重新拿ctl，</span></span>
<span class="line"><span>            c = ctl.get();</span></span>
<span class="line"><span>            // 判断线程池状态是否有变化</span></span>
<span class="line"><span>            if (runStateOf(c) != rs)</span></span>
<span class="line"><span>                continue xxx;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 添加工作线程的业务  </span></span>
<span class="line"><span>    // 工作线程启动了吗？</span></span>
<span class="line"><span>    boolean workerStarted = false;</span></span>
<span class="line"><span>	// 工作线程添加了吗？</span></span>
<span class="line"><span>    boolean workerAdded = false;</span></span>
<span class="line"><span>    // Worker就是工作线程</span></span>
<span class="line"><span>    Worker w = null;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 创建工作线程，将任务传到Worker中</span></span>
<span class="line"><span>        w = new Worker(firstTask);</span></span>
<span class="line"><span>        final Thread t = w.thread;</span></span>
<span class="line"><span>        // 只有你写的线程工厂返回的是null，这里才会为null</span></span>
<span class="line"><span>        if (t != null) {</span></span>
<span class="line"><span>            // 获取锁资源</span></span>
<span class="line"><span>            final ReentrantLock mainLock = this.mainLock;</span></span>
<span class="line"><span>            // 加锁。  因为我要在启动这个工作线程时，避免线程池状态发生变化，加锁。</span></span>
<span class="line"><span>            mainLock.lock();</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                // 重新获取ctl，拿到线程池状态</span></span>
<span class="line"><span>                int rs = runStateOf(ctl.get());</span></span>
<span class="line"><span>                // DCL i think you know~~~</span></span>
<span class="line"><span>                if (rs &lt; SHUTDOWN ||</span></span>
<span class="line"><span>                    (rs == SHUTDOWN &amp;&amp; firstTask == null)) {</span></span>
<span class="line"><span>                   	// 判断Worker中的thread是否已经启动了，一般不会启动，除非你在线程工厂把他启动了</span></span>
<span class="line"><span>                    if (t.isAlive()) </span></span>
<span class="line"><span>                        throw new IllegalThreadStateException();</span></span>
<span class="line"><span>                    // 将工作线程存储到hashSet中</span></span>
<span class="line"><span>                    workers.add(w);</span></span>
<span class="line"><span>                    // 获取工作线程个数，判断是否需要修改最大工作线程数记录。</span></span>
<span class="line"><span>                    int s = workers.size();</span></span>
<span class="line"><span>                    if (s &gt; largestPoolSize)</span></span>
<span class="line"><span>                        largestPoolSize = s;</span></span>
<span class="line"><span>                    // 工作线程添加成功     0</span></span>
<span class="line"><span>                    workerAdded = true;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            } finally {</span></span>
<span class="line"><span>                mainLock.unlock();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 如果添加成功</span></span>
<span class="line"><span>            if (workerAdded) {</span></span>
<span class="line"><span>                // 启动工作线程</span></span>
<span class="line"><span>                t.start();</span></span>
<span class="line"><span>                // 设置标识为true</span></span>
<span class="line"><span>                workerStarted = true;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 如果工作线程启动失败</span></span>
<span class="line"><span>        if (! workerStarted)</span></span>
<span class="line"><span>            addWorkerFailed(w);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return workerStarted;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 如果添加工作线程失败，执行</span></span>
<span class="line"><span>private void addWorkerFailed(Worker w) {</span></span>
<span class="line"><span>    final ReentrantLock mainLock = this.mainLock;</span></span>
<span class="line"><span>    mainLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 说明worker可能存放到了workers的hashSet中。</span></span>
<span class="line"><span>        if (w != null)</span></span>
<span class="line"><span>            // 移除！</span></span>
<span class="line"><span>            workers.remove(w);</span></span>
<span class="line"><span>        // 减掉workerCount的数值 -1</span></span>
<span class="line"><span>        decrementWorkerCount();</span></span>
<span class="line"><span>        // 尝试干掉自己</span></span>
<span class="line"><span>        tryTerminate();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        mainLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="五、runworker执行任务" tabindex="-1">五、runWorker执行任务 <a class="header-anchor" href="#五、runworker执行任务" aria-label="Permalink to &quot;五、runWorker执行任务&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>final void runWorker(Worker w) {</span></span>
<span class="line"><span>    // 拿到当前线程对象</span></span>
<span class="line"><span>    Thread wt = Thread.currentThread();</span></span>
<span class="line"><span>    // 拿到worker中存放的Runnable</span></span>
<span class="line"><span>    Runnable task = w.firstTask;</span></span>
<span class="line"><span>    // 将worker中的任务清空</span></span>
<span class="line"><span>    w.firstTask = null;</span></span>
<span class="line"><span>    // 揍是一个标识</span></span>
<span class="line"><span>    boolean completedAbruptly = true;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 如果Worker自身携带任务，直接执行</span></span>
<span class="line"><span>        // 如果Worker携带的是null，通过getTask去工作队列获取任务</span></span>
<span class="line"><span>        while (task != null || (task = getTask()) != null) {</span></span>
<span class="line"><span>            w.lock();</span></span>
<span class="line"><span>            // 判断线程池状态是否大于等于STOP，如果是要中断当前线程</span></span>
<span class="line"><span>            if ((runStateAtLeast(ctl.get(), STOP) ||</span></span>
<span class="line"><span>                 // 中断当前线程（DCL）</span></span>
<span class="line"><span>                 (Thread.interrupted() &amp;&amp; runStateAtLeast(ctl.get(), STOP))) &amp;&amp; !wt.isInterrupted())</span></span>
<span class="line"><span>                wt.interrupt();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                // 前置钩子</span></span>
<span class="line"><span>                beforeExecute(wt, task);</span></span>
<span class="line"><span>                Throwable thrown = null;</span></span>
<span class="line"><span>                try {</span></span>
<span class="line"><span>                    // 执行任务</span></span>
<span class="line"><span>                    task.run();</span></span>
<span class="line"><span>                } catch (RuntimeException x) {</span></span>
<span class="line"><span>                    thrown = x; throw x;</span></span>
<span class="line"><span>                } catch (Error x) {</span></span>
<span class="line"><span>                    thrown = x; throw x;</span></span>
<span class="line"><span>                } catch (Throwable x) {</span></span>
<span class="line"><span>                    thrown = x; throw new Error(x);</span></span>
<span class="line"><span>                } finally {</span></span>
<span class="line"><span>                    // 后置钩子</span></span>
<span class="line"><span>                    afterExecute(task, thrown);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            } finally {</span></span>
<span class="line"><span>                task = null;</span></span>
<span class="line"><span>                // 当前工作执行完一个任务，就++</span></span>
<span class="line"><span>                w.completedTasks++;</span></span>
<span class="line"><span>                w.unlock();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        completedAbruptly = false;</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        processWorkerExit(w, completedAbruptly);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="六、gettask工作线程排队拿任务" tabindex="-1">六、getTask工作线程排队拿任务 <a class="header-anchor" href="#六、gettask工作线程排队拿任务" aria-label="Permalink to &quot;六、getTask工作线程排队拿任务&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private Runnable getTask() {</span></span>
<span class="line"><span>    // 超时-false</span></span>
<span class="line"><span>    boolean timedOut = false; // Did the last poll() time out?</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 阿巴</span></span>
<span class="line"><span>        int c = ctl.get();</span></span>
<span class="line"><span>        int rs = runStateOf(c);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 线程池状态判断</span></span>
<span class="line"><span>        // 如果线程池状态为SHUTDOWN &amp;&amp; 工作队列为空</span></span>
<span class="line"><span>        // 如果线程池状态为STOP</span></span>
<span class="line"><span>        if (rs &gt;= SHUTDOWN &amp;&amp; (rs &gt;= STOP || workQueue.isEmpty())) {</span></span>
<span class="line"><span>            // 对工作线程个数--</span></span>
<span class="line"><span>            decrementWorkerCount();</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 对数量的判断。</span></span>
<span class="line"><span>        int wc = workerCountOf(c);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 判断核心线程是否允许超时？</span></span>
<span class="line"><span>        // 工作线程个数是否大于核心线程数</span></span>
<span class="line"><span>        boolean timed = allowCoreThreadTimeOut || wc &gt; corePoolSize;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 判断工作线程是否超过了最大线程数 &amp;&amp; 工作队列为null</span></span>
<span class="line"><span>        if ((wc &gt; maximumPoolSize || (timed &amp;&amp; timedOut)) &amp;&amp; (wc &gt; 1 || workQueue.isEmpty())) {</span></span>
<span class="line"><span>            // 工作线程数有问题，必须-1，干掉当前工作线程</span></span>
<span class="line"><span>            // 工作线程是否超过了核心线程，如果超时，就干掉当前线程</span></span>
<span class="line"><span>            // 对工作线程个数--</span></span>
<span class="line"><span>            if (compareAndDecrementWorkerCount(c))</span></span>
<span class="line"><span>                return null;</span></span>
<span class="line"><span>            continue;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            // 如果是非核心，走poll，拉取工作队列任务，</span></span>
<span class="line"><span>            // 如果是核心线程，走take一直阻塞，拉取工作队列任务</span></span>
<span class="line"><span>            Runnable r = timed ?</span></span>
<span class="line"><span>                workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS) :</span></span>
<span class="line"><span>            	// 当工作队列没有任务时，这时就会被Condition通过await阻塞线程</span></span>
<span class="line"><span>            	// 当有任务添加到工作线程后，这是添加完任务后，就会用过Condition.signal唤醒阻塞的线程</span></span>
<span class="line"><span>                workQueue.take();</span></span>
<span class="line"><span>            if (r != null)</span></span>
<span class="line"><span>                return r;</span></span>
<span class="line"><span>            // 执行的poll方法，并且在指定时间没拿到任务，</span></span>
<span class="line"><span>            timedOut = true;</span></span>
<span class="line"><span>        } catch (InterruptedException retry) {</span></span>
<span class="line"><span>            timedOut = false;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="七、processworkerexit工作线程告辞" tabindex="-1">七、processWorkerExit工作线程告辞~ <a class="header-anchor" href="#七、processworkerexit工作线程告辞" aria-label="Permalink to &quot;七、processWorkerExit工作线程告辞~&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private void processWorkerExit(Worker w, boolean completedAbruptly) {</span></span>
<span class="line"><span>    // 如果是不正常操作，需要先对工作线程数-- （如果正常情况，getTask就--了）</span></span>
<span class="line"><span>    if (completedAbruptly) </span></span>
<span class="line"><span>        decrementWorkerCount();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    final ReentrantLock mainLock = this.mainLock;</span></span>
<span class="line"><span>    mainLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 将当前工作线程完整的任务个数赋值给整个线程池中的任务数</span></span>
<span class="line"><span>        completedTaskCount += w.completedTasks;</span></span>
<span class="line"><span>        // 干掉当前工作线程</span></span>
<span class="line"><span>        workers.remove(w);</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        mainLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 线程池是否可以中止，线程池状态是否发生变化。</span></span>
<span class="line"><span>    tryTerminate();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    int c = ctl.get();</span></span>
<span class="line"><span>    //如果当前线程池状态小于STOP</span></span>
<span class="line"><span>    if (runStateLessThan(c, STOP)) {</span></span>
<span class="line"><span>        // 判断线程池中的工作队列是否还有任务，并且工作线程是否还在。</span></span>
<span class="line"><span>        if (!completedAbruptly) {</span></span>
<span class="line"><span>            int min = allowCoreThreadTimeOut ? 0 : corePoolSize;</span></span>
<span class="line"><span>            if (min == 0 &amp;&amp; ! workQueue.isEmpty())</span></span>
<span class="line"><span>                min = 1;</span></span>
<span class="line"><span>            if (workerCountOf(c) &gt;= min)</span></span>
<span class="line"><span>                return; // replacement not needed</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 添加非核心空任务的线程处理工作队列中的任务</span></span>
<span class="line"><span>        addWorker(null, false);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>拒绝策略：线程池提供的拒绝策略，一般不适合你的业务场景时，你就自己定义即可。</p><ul><li><p>AbortPolicy：抛出异常！</p></li><li><p>CallerRunsPolicy：让提交任务的线程处理这个任务！</p></li><li><p>DiscardPolicy：啥也不做，任务没了！</p></li><li><p>DiscardOldestPolicy：扔掉队列最前面的任务，尝试把当前任务添加进去！</p></li></ul><p>任务处理流程：</p><p>主线程执行execute添加任务，线程池创建工作线程，执行任务，执行任务，再次拉取工作队列任务，直到工作队列没有任务，阻塞工作线程</p><p>工作线程阻塞在工作队列，主线程执行execute添加任务到工作队列，工作线程被唤醒，拿到工作队列中的任务执行，执行完毕，再次拉取工作队列任务，直到工作队列没有任务，阻塞工作线程</p><h1 id="五、concurrenthashmap源码分析-一" tabindex="-1">五、<strong>ConcurrentHashMap源码分析（一）</strong> <a class="header-anchor" href="#五、concurrenthashmap源码分析-一" aria-label="Permalink to &quot;五、**ConcurrentHashMap源码分析（一）**&quot;">​</a></h1><h3 id="一、结构介绍" tabindex="-1">一、结构介绍 <a class="header-anchor" href="#一、结构介绍" aria-label="Permalink to &quot;一、结构介绍&quot;">​</a></h3><p>HashMap和ConcurrentHashMap的存储结构是一致的。</p><p>ConcurrentHashMap是线程安全的。</p><p>存储结构</p><p>关于put和putIfAbsent的区别</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// put和putIfAbsent都是想ConcurrentHashMap中存储值。</span></span>
<span class="line"><span>// 如果出现key一致的，将新数据覆盖老数据，并且返回老数据</span></span>
<span class="line"><span>public V put(K key, V value) {</span></span>
<span class="line"><span>    return putVal(key, value, false);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 如果出现key一致的，什么都不做，返回老数据。 最只有key不存在时，才会正常的添加数据</span></span>
<span class="line"><span>public V putIfAbsent(K key, V value) {</span></span>
<span class="line"><span>    return putVal(key, value, true);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="二、散列算法" tabindex="-1">二、散列算法 <a class="header-anchor" href="#二、散列算法" aria-label="Permalink to &quot;二、散列算法&quot;">​</a></h3><p>散列算法是为了让hashCode的高16位参与到索引位置的计算中，从而尽可能的打散数据存放到数组上。从而减少Hash冲突<br> ConcurrentHashMap中，还会将hash值对HASH_BITS进行&amp;运算，让hash值一定是一个正数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// ConcurrentHashMap存储数据的核心方法</span></span>
<span class="line"><span>final V putVal(K key, V value, boolean onlyIfAbsent) {</span></span>
<span class="line"><span>    // key和value不能为null。              HashMap中是允许为null的。</span></span>
<span class="line"><span>    if (key == null || value == null) throw new NullPointerException();</span></span>
<span class="line"><span>    // 散列算法就是基于key进行hash运算，并且根据散列算法的结果，确定当前key-value存储到数组的哪个索引位置。</span></span>
<span class="line"><span>    int hash = spread(key.hashCode());</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 散列算法</span></span>
<span class="line"><span>// 散列算法是为了让hashCode的高16位参与到索引位置的计算中，从而尽可能的打散数据存放到数组上。从而减少Hash冲突</span></span>
<span class="line"><span>// ConcurrentHashMap中，还会将hash值对HASH_BITS进行&amp;运算，让hash值一定是一个正数。</span></span>
<span class="line"><span>// 因为ConcurrentHashMap中数组上的数据的hash值，如果为负数，有特殊含义</span></span>
<span class="line"><span>// static final int MOVED     = -1; // 代表当前位置数据在扩容，并且数据已经迁移到了新数组</span></span>
<span class="line"><span>// static final int TREEBIN   = -2; // 代表当前索引位置下，是一个红黑树。   转红黑树，TreeBin有参构造</span></span>
<span class="line"><span>// static final int RESERVED  = -3; // 代表当前索引位置已经被占了，但是值还没放进去呢。  compute方法</span></span>
<span class="line"><span>static final int spread(int h) {</span></span>
<span class="line"><span>    return (h ^ (h &gt;&gt;&gt; 16))  &amp; HASH_BITS;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>00011000 00000110 00111000 00001100  h</span></span>
<span class="line"><span>^</span></span>
<span class="line"><span>00000000 00000000 00011000 00000110  h &gt;&gt;&gt; 16</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>00011000 00000110 00111000 00001100 </span></span>
<span class="line"><span>&amp;</span></span>
<span class="line"><span>00000000 00000000 00000111 11111111  2048 - 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>ConcurrentHashMap是如何根据hash值，计算存储的位置？</span></span>
<span class="line"><span>(数组长度 - 1) &amp;  (h ^ (h &gt;&gt;&gt; 16))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>00011000 00000110 00110000 00001100  key1-hash</span></span>
<span class="line"><span>00011000 00000110 00111000 00001100  key2-hash</span></span>
<span class="line"><span>&amp;</span></span>
<span class="line"><span>00000000 00000000 00000111 11111111  2048 - 1</span></span></code></pre></div><h3 id="三、初始化数组" tabindex="-1">三、初始化数组 <a class="header-anchor" href="#三、初始化数组" aria-label="Permalink to &quot;三、初始化数组&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>final V putVal(K key, V value, boolean onlyIfAbsent) {  </span></span>
<span class="line"><span>    // 死循环~~~~</span></span>
<span class="line"><span>    // tab是ConcurrentHashMap的数组</span></span>
<span class="line"><span>    for (Node&lt;K,V&gt;[] tab = table;;) {</span></span>
<span class="line"><span>        // 一堆变量</span></span>
<span class="line"><span>        Node&lt;K,V&gt; f; int n, i, fh;</span></span>
<span class="line"><span>        // 代表当前数组没有初始化。</span></span>
<span class="line"><span>        if (tab == null || (n = tab.length) == 0)</span></span>
<span class="line"><span>            // 初始化数组  （ConcurrentHashMap在new时，不会创建数组，在使用时，才会创建）</span></span>
<span class="line"><span>            tab = initTable();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return null;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>/*</span></span>
<span class="line"><span>sizeCtl是标识数组初始化和扩容的标识信息。</span></span>
<span class="line"><span>= -1：代表正在初始化！</span></span>
<span class="line"><span>&lt; -1：代表正在扩容！</span></span>
<span class="line"><span>= 0：代表没有初始化！</span></span>
<span class="line"><span>&gt; 0：①当前数组没有初始化，这个值，就代表初始化的长度！  ②如果已经初始化了，就代表下次扩容的阈值！</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>private transient volatile int sizeCtl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 初始化数组操作</span></span>
<span class="line"><span>private final Node&lt;K,V&gt;[] initTable() {</span></span>
<span class="line"><span>    // 声明tab：临时存数组。 sc：临时存sizeCtl</span></span>
<span class="line"><span>    Node&lt;K,V&gt;[] tab; int sc;</span></span>
<span class="line"><span>    // 判断数组还没初始化呢吧？</span></span>
<span class="line"><span>    while ((tab = table) == null || tab.length == 0) {</span></span>
<span class="line"><span>        // sc赋值，并判断是否小于0</span></span>
<span class="line"><span>        if ((sc = sizeCtl) &lt; 0)</span></span>
<span class="line"><span>            // 线程先让出CPU的执行权。</span></span>
<span class="line"><span>            Thread.yield(); </span></span>
<span class="line"><span>        // 如果sc大于等于0，没人在执行初始化操作。</span></span>
<span class="line"><span>        // 以CAS的方式，将sizeCtl，改为-1，代表当前线程正在执行初始化逻辑</span></span>
<span class="line"><span>        else if (U.compareAndSwapInt(this, SIZECTL, sc, -1)) {</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                // 判断数组还没初始化呢吧？  DCL</span></span>
<span class="line"><span>                if ((tab = table) == null || tab.length == 0) {</span></span>
<span class="line"><span>                    // 拿到数组的初始化长度</span></span>
<span class="line"><span>                    int n = (sc &gt; 0) ? sc : DEFAULT_CAPACITY;</span></span>
<span class="line"><span>                    // 创建数组</span></span>
<span class="line"><span>                    Node&lt;K,V&gt;[] nt = (Node&lt;K,V&gt;[])new Node&lt;?,?&gt;[n];</span></span>
<span class="line"><span>                    // 依次给局部变量和成员变量赋值。</span></span>
<span class="line"><span>                    table = tab = nt;</span></span>
<span class="line"><span>                    // 计算下次扩容的阈值</span></span>
<span class="line"><span>                    sc = n - (n &gt;&gt;&gt; 2);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            } finally {</span></span>
<span class="line"><span>                // 将扩容阈值赋值给sizeCtl</span></span>
<span class="line"><span>                sizeCtl = sc;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return tab;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="四、添加数据-数组" tabindex="-1">四、添加数据-数组 <a class="header-anchor" href="#四、添加数据-数组" aria-label="Permalink to &quot;四、添加数据-数组&quot;">​</a></h3><p>数据添加到数组上（没有hash冲突）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>final V putVal(K key, V value, boolean onlyIfAbsent) {</span></span>
<span class="line"><span>    int binCount = 0;</span></span>
<span class="line"><span>    for (Node&lt;K,V&gt;[] tab = table;;) {</span></span>
<span class="line"><span>        // n： 数组长度。 i：索引位置。  f：i位置的数据。 fh：是f的hash值</span></span>
<span class="line"><span>        Node&lt;K,V&gt; f; int n, i, fh;</span></span>
<span class="line"><span>        // tabAt(数组，索引位置) = 拿到数组指定索引位置的数据</span></span>
<span class="line"><span>        else if ((f = tabAt(tab, i = (n - 1) &amp; hash)) == null) {</span></span>
<span class="line"><span>            // 当前索引位置数据为null。</span></span>
<span class="line"><span>            // 以CAS的方式，将数据放到tab的i位置上，将hash，key，value封装成了一个Node对象</span></span>
<span class="line"><span>            if (casTabAt(tab, i, null,new Node&lt;K,V&gt;(hash, key, value, null)))</span></span>
<span class="line"><span>                break;  </span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 说明当前位置数据已经被迁移到了新数组。</span></span>
<span class="line"><span>        else if ((fh = f.hash) == MOVED)</span></span>
<span class="line"><span>            // 帮你扩容，快点扩容完，我好把数据放到新数组~~~</span></span>
<span class="line"><span>            tab = helpTransfer(tab, f);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return null;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="五、添加数据-链表" tabindex="-1">五、添加数据-链表 <a class="header-anchor" href="#五、添加数据-链表" aria-label="Permalink to &quot;五、添加数据-链表&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>final V putVal(K key, V value, boolean onlyIfAbsent) {</span></span>
<span class="line"><span>    // 拿到binCount</span></span>
<span class="line"><span>    int binCount = 0;</span></span>
<span class="line"><span>    for (Node&lt;K,V&gt;[] tab = table;;) {</span></span>
<span class="line"><span>        // n： 数组长度。 i：索引位置。  f：i位置的数据。 fh：是f的hash值</span></span>
<span class="line"><span>        Node&lt;K,V&gt; f; int n, i, fh;</span></span>
<span class="line"><span>        // 到这，说明出现了hash冲突，i位置有数据，尝试往i位置下挂数据</span></span>
<span class="line"><span>        else {</span></span>
<span class="line"><span>            // 声明oldVal，返回结果</span></span>
<span class="line"><span>            V oldVal = null;</span></span>
<span class="line"><span>            // 以桶位置数据作为锁，锁住当前桶，锁粒度更细。</span></span>
<span class="line"><span>            synchronized (f) {</span></span>
<span class="line"><span>                // 再判断一次，数据没有变化，正常挂链表。</span></span>
<span class="line"><span>                if (tabAt(tab, i) == f) {</span></span>
<span class="line"><span>                    // 链表添加操作</span></span>
<span class="line"><span>                    if (fh &gt;= 0) {</span></span>
<span class="line"><span>                        // binCount赋值1，记录链表中Node的长度</span></span>
<span class="line"><span>                        binCount = 1;</span></span>
<span class="line"><span>                        // e：暂时指向数组位置数据</span></span>
<span class="line"><span>                        for (Node&lt;K,V&gt; e = f;; ++binCount) {</span></span>
<span class="line"><span>                            K ek;</span></span>
<span class="line"><span>                            // 拿到当前数据的hash值，和数组位置数据的hash值比较，</span></span>
<span class="line"><span>                            if (e.hash == hash &amp;&amp;</span></span>
<span class="line"><span>                                // 如果相等 , 判断 == 或者 equals 返回true</span></span>
<span class="line"><span>                                ((ek = e.key) == key || (ek != null &amp;&amp; key.equals(ek)))) {</span></span>
<span class="line"><span>                                // 尝试覆盖原数据，先获取老数据</span></span>
<span class="line"><span>                                oldVal = e.val;</span></span>
<span class="line"><span>                                // 如果是put方法，进去覆盖值</span></span>
<span class="line"><span>                                // 如果是putIfAbsent，进去不if逻辑</span></span>
<span class="line"><span>                                if (!onlyIfAbsent)</span></span>
<span class="line"><span>                                    // 覆盖值</span></span>
<span class="line"><span>                                    e.val = value;</span></span>
<span class="line"><span>                                break;</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                            // pred暂存e</span></span>
<span class="line"><span>                            Node&lt;K,V&gt; pred = e;</span></span>
<span class="line"><span>                            // e指向下一个节点，并且如果e == null，说明下面没节点了</span></span>
<span class="line"><span>                            if ((e = e.next) == null) {</span></span>
<span class="line"><span>                                // 将当前的值封装为Node对象，并挂在最后一个节点的后面</span></span>
<span class="line"><span>                                pred.next = new Node&lt;K,V&gt;(hash, key, value, null);</span></span>
<span class="line"><span>                                break;</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                    // 红黑树添加套路</span></span>
<span class="line"><span>                    else if (f instanceof TreeBin) {</span></span>
<span class="line"><span>                        // 省略部分代码</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 如果binCount != 0</span></span>
<span class="line"><span>            if (binCount != 0) {</span></span>
<span class="line"><span>                // 如果binCount &gt;= 8</span></span>
<span class="line"><span>                if (binCount &gt;= TREEIFY_THRESHOLD)</span></span>
<span class="line"><span>                    // 判断是扩容还是转红黑树</span></span>
<span class="line"><span>                    treeifyBin(tab, i);</span></span>
<span class="line"><span>                // 判断是否需要返回</span></span>
<span class="line"><span>                if (oldVal != null)</span></span>
<span class="line"><span>                    return oldVal;</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return null;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="六、触发扩容" tabindex="-1">六、触发扩容 <a class="header-anchor" href="#六、触发扩容" aria-label="Permalink to &quot;六、触发扩容&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 判断是否需要转红黑树或者是扩容  tab：数组！  index：索引位置！</span></span>
<span class="line"><span>private final void treeifyBin(Node&lt;K,V&gt;[] tab, int index) {</span></span>
<span class="line"><span>    // n：数组长度， sc：sizeCtl</span></span>
<span class="line"><span>    Node&lt;K,V&gt; b; int n, sc;</span></span>
<span class="line"><span>    // 判断tab不为null</span></span>
<span class="line"><span>    if (tab != null) {</span></span>
<span class="line"><span>        // 如果数组长度 小于 64，不转红黑树，先扩容（更希望数据存放在数组上，O1）</span></span>
<span class="line"><span>        // 只有数组长度大于等于64并且链表长度达到8，才转为红黑树</span></span>
<span class="line"><span>        if ((n = tab.length) &lt; MIN_TREEIFY_CAPACITY)</span></span>
<span class="line"><span>            // 扩容前的一些准备和业务判断</span></span>
<span class="line"><span>            tryPresize(n &lt;&lt; 1);</span></span>
<span class="line"><span>        // 转红黑树操作</span></span>
<span class="line"><span>        // 将单向链表转换为TreeNode对象（双向链表），再通过TreeBin方法转为红黑树。</span></span>
<span class="line"><span>        // TreeBin中保留着双向链表以及红黑树！</span></span>
<span class="line"><span>        else if ((b = tabAt(tab, index)) != null &amp;&amp; b.hash &gt;= 0) {</span></span>
<span class="line"><span>            // 省略部分代码~~</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="七、hashmap的扩容" tabindex="-1">七、HashMap的扩容 <a class="header-anchor" href="#七、hashmap的扩容" aria-label="Permalink to &quot;七、HashMap的扩容&quot;">​</a></h3><h1 id="六、concurrenthashmap扩容" tabindex="-1">六、<em><strong>ConcurrentHashMap扩容</strong></em> <a class="header-anchor" href="#六、concurrenthashmap扩容" aria-label="Permalink to &quot;六、_**ConcurrentHashMap扩容**_&quot;">​</a></h1><p>三种触发方式</p><p>达到了扩容的阈值</p><h3 id="一、trypresize方法-初始化数组" tabindex="-1">一、tryPreSize方法-初始化数组 <a class="header-anchor" href="#一、trypresize方法-初始化数组" aria-label="Permalink to &quot;一、tryPreSize方法-初始化数组&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 扩容前操作，putAll，链表转红黑树  插入map的长度（putAll）</span></span>
<span class="line"><span>private final void tryPresize(int size) {</span></span>
<span class="line"><span>    // 这个判断是给putAll留的，要计算当前数组的长度（初始化）</span></span>
<span class="line"><span>    // 如果size大于最大长度 / 2，直接将数组长度设置为最大值。</span></span>
<span class="line"><span>    // tableSizeFor，将长度设置的2的n次幂</span></span>
<span class="line"><span>    // c是初始化数组长度</span></span>
<span class="line"><span>    int c = (size &gt;= (MAXIMUM_CAPACITY &gt;&gt;&gt; 1)) ? MAXIMUM_CAPACITY : tableSizeFor(size + (size &gt;&gt;&gt; 1) + 1);</span></span>
<span class="line"><span>    // sc是给sizeCtl赋值</span></span>
<span class="line"><span>    // -1:正在初始化数组，小于-1：正在扩容，0：代表还没初始化数组，大于0：可能初始化了(代表阈值)，也可能没初始化（初始化的长度）</span></span>
<span class="line"><span>    int sc;</span></span>
<span class="line"><span>    while ((sc = sizeCtl) &gt;= 0) {</span></span>
<span class="line"><span>        // 代表没有正在执行初始化，也没有正在执行扩容。、</span></span>
<span class="line"><span>        // tab：数组，n：数组长度</span></span>
<span class="line"><span>        Node&lt;K,V&gt;[] tab = table; int n;</span></span>
<span class="line"><span>        // 判断数组是不是还没初始化呢</span></span>
<span class="line"><span>        if (tab == null || (n = tab.length) == 0) {</span></span>
<span class="line"><span>            // 初始化数组，和initTable一样的东西</span></span>
<span class="line"><span>            // 在sc和c之间选择最大值，作为数组的初始化长度</span></span>
<span class="line"><span>            n = (sc &gt; c) ? sc : c;</span></span>
<span class="line"><span>            // 要初始化，就直接把sizeCtl设置为-1，代表我要初始化数组</span></span>
<span class="line"><span>            if (U.compareAndSwapInt(this, SIZECTL, sc, -1)) {</span></span>
<span class="line"><span>                try {</span></span>
<span class="line"><span>                    // DCL！</span></span>
<span class="line"><span>                    if (table == tab) {</span></span>
<span class="line"><span>                        // 创建数组</span></span>
<span class="line"><span>                        Node&lt;K,V&gt;[] nt = (Node&lt;K,V&gt;[])new Node&lt;?,?&gt;[n];</span></span>
<span class="line"><span>                        // 初始化数组赋值给成员变量</span></span>
<span class="line"><span>                        table = nt;</span></span>
<span class="line"><span>                        // sc先设置成阈值</span></span>
<span class="line"><span>                        sc = n - (n &gt;&gt;&gt; 2);</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                } finally {</span></span>
<span class="line"><span>                    // 将sc赋值给sizeCtl</span></span>
<span class="line"><span>                    sizeCtl = sc;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 要么是c没有超过阈值，要么是超过最大值，啥事不做~~~</span></span>
<span class="line"><span>        else if (c &lt;= sc || n &gt;= MAXIMUM_CAPACITY)</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        // 省略部分代码。</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="二、trypresize方法-扩容标识戳" tabindex="-1">二、tryPreSize方法-扩容标识戳 <a class="header-anchor" href="#二、trypresize方法-扩容标识戳" aria-label="Permalink to &quot;二、tryPreSize方法-扩容标识戳&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 扩容前操作</span></span>
<span class="line"><span>private final void tryPresize(int size) {</span></span>
<span class="line"><span>    while ((sc = sizeCtl) &gt;= 0) {</span></span>
<span class="line"><span>        // 省略部分初始化代码</span></span>
<span class="line"><span>        Node&lt;K,V&gt;[] tab = table; int n;</span></span>
<span class="line"><span>        if (tab == null || (n = tab.length) == 0) {</span></span>
<span class="line"><span>        // 扩容前操作！</span></span>
<span class="line"><span>        else if (tab == table) {</span></span>
<span class="line"><span>            // 计算扩容标识戳（基于老数组长度计算扩容标识戳，因为ConcurrentHashMap允许多线程迁移数据。）</span></span>
<span class="line"><span>            int rs = resizeStamp(n);</span></span>
<span class="line"><span>            // 这里是一个BUG，当前sc在while循环中，除了初始化没有额外赋值的前提下，这个sc &lt; 0 永远进不来。</span></span>
<span class="line"><span>            // 虽然是BUG，但是清楚sc &lt; 0 代表正在扩容</span></span>
<span class="line"><span>            if (sc &lt; 0) {</span></span>
<span class="line"><span>                Node&lt;K,V&gt;[] nt;    31 ~ 16   15 ~ 0</span></span>
<span class="line"><span>                // 这里是第二个BUG</span></span>
<span class="line"><span>                if ((sc &gt;&gt;&gt; RESIZE_STAMP_SHIFT) != rs ||   // 判断协助扩容线程的标识戳是否一致</span></span>
<span class="line"><span>                    sc == rs &lt;&lt; RESIZE_STAMP_SHIFT + 1 ||    // BUG之一,在判断扩容操作是否已经到了最后的检查阶段</span></span>
<span class="line"><span>                    sc == rs &lt;&lt; RESIZE_STAMP_SHIFT + MAX_RESIZERS ||   // BUG之一，判断扩容线程是否已经达到最大值</span></span>
<span class="line"><span>                    (nt = nextTable) == null ||  // 新数组为null，说明也已经扩容完毕，扩容完毕后，才会把nextTable置位null</span></span>
<span class="line"><span>                    transferIndex &lt;= 0) // transferIndex为线程领取任务的最大节点，如果为0，代表所有老数据迁移任务都没领干净了</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>                if (U.compareAndSwapInt(this, SIZECTL, sc, sc + 1))</span></span>
<span class="line"><span>                    transfer(tab, nt);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 还没有执行扩容，当前线程可能是第一个进来执行扩容的线程</span></span>
<span class="line"><span>            // 基于CAS的方式，将sizeCtl从原值改为 扩容标识戳左移16位</span></span>
<span class="line"><span>            // 10000000 00011010 00000000 00000010  一定是&lt; -1的负数，可以代表当前ConcurrentHashMap正在扩容</span></span>
<span class="line"><span>            // 为什么是低位+2，代表1个线程扩容。 低位为5，就代表4个线程正在并发扩容</span></span>
<span class="line"><span>            // 扩容分为2部：创建新数组，迁移数据。</span></span>
<span class="line"><span>            // 当最后一个线程迁移完毕数据后，对低位-1.最终结果低位还是1，需要对整个老数组再次检查，数据是否迁移干净</span></span>
<span class="line"><span>            else if (U.compareAndSwapInt(this, SIZECTL, sc,</span></span>
<span class="line"><span>                                         (rs &lt;&lt; RESIZE_STAMP_SHIFT) + 2))</span></span>
<span class="line"><span>                // 开始扩容操作，传入老数组~~</span></span>
<span class="line"><span>                transfer(tab, null);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>static final int resizeStamp(int n) {</span></span>
<span class="line"><span>    // 32~64</span></span>
<span class="line"><span>    // 00000000 00000000 00000000 00011010</span></span>
<span class="line"><span>    // 计算n在二进制表示时，前面有多少个0</span></span>
<span class="line"><span>    // 00000000 00000000 10000000 00000000</span></span>
<span class="line"><span>    // 00000000 00000000 10000000 00011010</span></span>
<span class="line"><span>    // 前面的操作是基于数组长度等到一个标识，方便其他线程参与扩容</span></span>
<span class="line"><span>    // 后面的值是为了保证当前扩容戳左移16位之后，一定是一个负数</span></span>
<span class="line"><span>    return Integer.numberOfLeadingZeros(n) | (1 &lt;&lt; (RESIZE_STAMP_BITS - 1));</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="三、transfer方法-构建新数组" tabindex="-1">三、transfer方法-构建新数组 <a class="header-anchor" href="#三、transfer方法-构建新数组" aria-label="Permalink to &quot;三、transfer方法-构建新数组&quot;">​</a></h3><p>transfer方法：</p><ul><li><p>计算步长</p></li><li><p>初始化新数组</p></li><li><p>线程领取迁移数据任务</p></li><li><p>判断迁移是否完成，并判断当前线程是否是最后一个完成的</p></li><li><p>查看当前位置数据是否为null</p></li><li><p>查看当前位置数据是否为fwd</p></li><li><p>链表迁移数据-lastRun机制</p></li><li><p>红黑树迁移-迁移完数据长度小于等于6，转回链表</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 扩容操作，以第一个进来执行扩容的线程为例。</span></span>
<span class="line"><span>private final void transfer(Node&lt;K,V&gt;[] tab, Node&lt;K,V&gt;[] nextTab) {</span></span>
<span class="line"><span>    // 创建新数组流程！</span></span>
<span class="line"><span>    // n：老数组长度32，   stride：扩容的步长16</span></span>
<span class="line"><span>    int n = tab.length, stride;</span></span>
<span class="line"><span>    // NCPU:4</span></span>
<span class="line"><span>    // 00000000 00000000 00000000 00000000</span></span>
<span class="line"><span>    // 00000000 00000000 00000100 00000000  - 1024 512 256 128 / 4 = 32</span></span>
<span class="line"><span>    // 如果每个线程迁移的长度基于CPU计算，大于16，就采用计算的值，如果小于16，就用16</span></span>
<span class="line"><span>    // 每个线程每次最小迁移16长度数据</span></span>
<span class="line"><span>    // stride = 1 &lt; 16</span></span>
<span class="line"><span>    // 这个操作就是为了充分发挥CPU性能，因为迁移数据是CPU密集型操作，尽量让并发扩容线程数量不要太大，从而造成CPU的性能都消耗在了切换上，造成扩容效率降低</span></span>
<span class="line"><span>    // 如果要做优化的，推荐将扩容线程数设置为和CPU内核数+1一致。</span></span>
<span class="line"><span>    if ((stride = (NCPU &gt; 1) ? (n &gt;&gt;&gt; 3) / NCPU : n) &lt; MIN_TRANSFER_STRIDE) </span></span>
<span class="line"><span>        stride = MIN_TRANSFER_STRIDE; </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果新数组没有初始化</span></span>
<span class="line"><span>    if (nextTab == null) {   </span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            // 初始化数组</span></span>
<span class="line"><span>            Node&lt;K,V&gt;[] nt = (Node&lt;K,V&gt;[])new Node&lt;?,?&gt;[n &lt;&lt; 1];</span></span>
<span class="line"><span>            // 新数组赋值给nextTab</span></span>
<span class="line"><span>            nextTab = nt;</span></span>
<span class="line"><span>        } catch (Throwable ex) {   </span></span>
<span class="line"><span>            // 要么OOM，要么数组长度达到最大值。</span></span>
<span class="line"><span>            sizeCtl = Integer.MAX_VALUE;</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 将nextTable成员变量赋值</span></span>
<span class="line"><span>        nextTable = nextTab;</span></span>
<span class="line"><span>        // transferIndex设置为老数组长度</span></span>
<span class="line"><span>        transferIndex = n;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// n：老数组长度</span></span>
<span class="line"><span>// stride：步长</span></span>
<span class="line"><span>// nextTale,nextTab：新数组</span></span>
<span class="line"><span>// transferIndex：线程领取任务时的核心属性</span></span></code></pre></div><h3 id="四、transfer方法-迁移数据" tabindex="-1">四、transfer方法-迁移数据 <a class="header-anchor" href="#四、transfer方法-迁移数据" aria-label="Permalink to &quot;四、transfer方法-迁移数据&quot;">​</a></h3><p>第一步，线程领取迁移数据的任务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private final void transfer(Node&lt;K,V&gt;[] tab, Node&lt;K,V&gt;[] nextTab) {</span></span>
<span class="line"><span>    // 省略部分代码</span></span>
<span class="line"><span>    // n：老数组长度   32</span></span>
<span class="line"><span>    // stride：步长   16</span></span>
<span class="line"><span>    // nextTale,nextTab：新数组</span></span>
<span class="line"><span>    // nextn：新数组长度  64 </span></span>
<span class="line"><span>    // transferIndex：线程领取任务时的核心属性 32</span></span>
<span class="line"><span>    // 先看领取任务的过程！！！</span></span>
<span class="line"><span>    // 声明fwd节点，在老数组迁移数据完成后，将fwd赋值上去</span></span>
<span class="line"><span>    ForwardingNode&lt;K,V&gt; fwd = new ForwardingNode&lt;K,V&gt;(nextTab);</span></span>
<span class="line"><span>    // 领任务的核心标识</span></span>
<span class="line"><span>    boolean advance = true;</span></span>
<span class="line"><span>    // 扩容结束了咩？</span></span>
<span class="line"><span>    boolean finishing = false;</span></span>
<span class="line"><span>    // 扩容的for循环</span></span>
<span class="line"><span>    for (int i = 0, bound = 0;;) {</span></span>
<span class="line"><span>        Node&lt;K,V&gt; f; int fh;</span></span>
<span class="line"><span>        // 领取任务的while循环</span></span>
<span class="line"><span>        while (advance) {</span></span>
<span class="line"><span>            int nextIndex, nextBound;</span></span>
<span class="line"><span>            // 第一个判断是为了迁移下一个索引数据（暂时不管）</span></span>
<span class="line"><span>            if (--i &gt;= bound || finishing)</span></span>
<span class="line"><span>                advance = false;</span></span>
<span class="line"><span>            // 说明没有任务可以领取了（暂时不管）</span></span>
<span class="line"><span>            else if ((nextIndex = transferIndex) &lt;= 0) {</span></span>
<span class="line"><span>                i = -1;</span></span>
<span class="line"><span>                advance = false;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // transferIndex：16</span></span>
<span class="line"><span>            // stride：16，nextIndex：32，nextBound：16</span></span>
<span class="line"><span>            // bound：16，i：31</span></span>
<span class="line"><span>            // 开始领取任务，如果CAS成功，代表当前线程领取了32~16这个范围数据的迁移</span></span>
<span class="line"><span>            else if (U.compareAndSwapInt</span></span>
<span class="line"><span>                     (this, TRANSFERINDEX, nextIndex,</span></span>
<span class="line"><span>                      nextBound = (nextIndex &gt; stride ?</span></span>
<span class="line"><span>                                   nextIndex - stride : 0))) {</span></span>
<span class="line"><span>                bound = nextBound;</span></span>
<span class="line"><span>                i = nextIndex - 1;</span></span>
<span class="line"><span>                advance = false;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><p>第二步：判断是否结束，以及线程退出扩容，并且为空时，设置fwd，并且hash为moved直接移动到下个位置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private final void transfer(Node&lt;K,V&gt;[] tab, Node&lt;K,V&gt;[] nextTab) {</span></span>
<span class="line"><span>    // 省略部分代码</span></span>
<span class="line"><span>    // n：老数组长度   32</span></span>
<span class="line"><span>    // stride：步长   16</span></span>
<span class="line"><span>    // nextTale,nextTab：新数组</span></span>
<span class="line"><span>    // nextn：新数组长度  64 </span></span>
<span class="line"><span>    // transferIndex：线程领取任务时的核心属性 32</span></span>
<span class="line"><span>    // 先看领取任务的过程！！！</span></span>
<span class="line"><span>    // 声明fwd节点，在老数组迁移数据完成后，将fwd赋值上去</span></span>
<span class="line"><span>    ForwardingNode&lt;K,V&gt; fwd = new ForwardingNode&lt;K,V&gt;(nextTab);</span></span>
<span class="line"><span>    // 领任务的核心标识</span></span>
<span class="line"><span>    boolean advance = true;</span></span>
<span class="line"><span>    // 扩容结束了咩？</span></span>
<span class="line"><span>    boolean finishing = false;</span></span>
<span class="line"><span>    // 扩容的for循环</span></span>
<span class="line"><span>    for (int i = 0, bound = 0;;) {</span></span>
<span class="line"><span>        Node&lt;K,V&gt; f; int fh;</span></span>
<span class="line"><span>        // 领取任务的while循环</span></span>
<span class="line"><span>        while (advance) {</span></span>
<span class="line"><span>            int nextIndex, nextBound;</span></span>
<span class="line"><span>            // 第一个判断是为了迁移下一个索引数据（暂时不管）</span></span>
<span class="line"><span>            if (--i &gt;= bound || finishing)</span></span>
<span class="line"><span>                advance = false;</span></span>
<span class="line"><span>            // 说明没有任务可以领取了（暂时不管）</span></span>
<span class="line"><span>            else if ((nextIndex = transferIndex) &lt;= 0) {</span></span>
<span class="line"><span>                i = -1;</span></span>
<span class="line"><span>                advance = false;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // transferIndex：16</span></span>
<span class="line"><span>            // stride：16，nextIndex：32，nextBound：16</span></span>
<span class="line"><span>            // bound：16，i：31</span></span>
<span class="line"><span>            // 开始领取任务，如果CAS成功，代表当前线程领取了32~16这个范围数据的迁移</span></span>
<span class="line"><span>            else if (U.compareAndSwapInt</span></span>
<span class="line"><span>                     (this, TRANSFERINDEX, nextIndex,</span></span>
<span class="line"><span>                      nextBound = (nextIndex &gt; stride ?</span></span>
<span class="line"><span>                                   nextIndex - stride : 0))) {</span></span>
<span class="line"><span>                bound = nextBound;</span></span>
<span class="line"><span>                i = nextIndex - 1;</span></span>
<span class="line"><span>                advance = false;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 迁移最后一段的线程干完活了，或者其他线程没有任务可以领取了。</span></span>
<span class="line"><span>        if (i &lt; 0) {</span></span>
<span class="line"><span>            int sc;</span></span>
<span class="line"><span>            // 判断结束了没，第一次肯定进不来</span></span>
<span class="line"><span>            if (finishing) {</span></span>
<span class="line"><span>                // 结束扩容，将nextTabl设置为null</span></span>
<span class="line"><span>                nextTable = null;</span></span>
<span class="line"><span>                // 将迁移完数据的新数组，指向指向的老数组</span></span>
<span class="line"><span>                table = nextTab;</span></span>
<span class="line"><span>                // 将sizeCtl复制为下次扩容的阈值</span></span>
<span class="line"><span>                sizeCtl = (n &lt;&lt; 1) - (n &gt;&gt;&gt; 1);</span></span>
<span class="line"><span>                // 结束</span></span>
<span class="line"><span>                return;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 到这，说明当前线程没有任务可以领取了</span></span>
<span class="line"><span>            // 基于CAS的方式，将低位-1，代表当前线程退出扩容操作（如果是最后一个，还有一个额外的活）</span></span>
<span class="line"><span>            if (U.compareAndSwapInt(this, SIZECTL, sc = sizeCtl, sc - 1)) {</span></span>
<span class="line"><span>                // 判断我是否是最后一个完成迁移数据的线程，如果不是，直接return结束</span></span>
<span class="line"><span>                if ((sc - 2) != resizeStamp(n) &lt;&lt; RESIZE_STAMP_SHIFT)</span></span>
<span class="line"><span>                    return;</span></span>
<span class="line"><span>                // 如果到这，说明我是最后一个结束迁移数据的线程。</span></span>
<span class="line"><span>                // finishing结束表示和advance领取任务的标识全部设置为true</span></span>
<span class="line"><span>                finishing = advance = true;</span></span>
<span class="line"><span>                // i设置为老数组长度，从头到位再检查一次整个老数组。</span></span>
<span class="line"><span>                i = n; </span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            额外分析：当前线程完成领取的迁移任务后，再次进入while循环，查看是否有任务可以领取如果transferIndex变为0了，代表我没有任务可以领取，将i设置为-1没有任务可以领取，退出当前扩容操作：1、基于CAS将sizeCtl - 1代表我退出扩容操作2、-1成功后，还要判断，我是不是最后一个退出扩容的线程（sc - 2值是否是 扩容标识戳 &lt;&lt; 16）    如果不是，直接return结束3、如果是最后一个结束迁移的线程，将i复制为老数组长度，重新从末位到头部再次检查一圈</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else if ((f = tabAt(tab, i)) == null)</span></span>
<span class="line"><span>            // 如果发现迁移为主的数据为null，设置放置一个fwd，代表当前位置迁移完成</span></span>
<span class="line"><span>            advance = casTabAt(tab, i, null, fwd);</span></span>
<span class="line"><span>        else if ((fh = f.hash) == MOVED)</span></span>
<span class="line"><span>            // 是在检查时的逻辑</span></span>
<span class="line"><span>            advance = true;</span></span></code></pre></div><h3 id="五、transfer方法-lastrun机制" tabindex="-1">五、transfer方法-lastRun机制 <a class="header-anchor" href="#五、transfer方法-lastrun机制" aria-label="Permalink to &quot;五、transfer方法-lastRun机制&quot;">​</a></h3><p>就是迁移链表到新数组时的操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private final void transfer(Node&lt;K,V&gt;[] tab, Node&lt;K,V&gt;[] nextTab) {</span></span>
<span class="line"><span>    // 省略部分代码</span></span>
<span class="line"><span>    // n：老数组长度   32</span></span>
<span class="line"><span>    // stride：步长   16</span></span>
<span class="line"><span>    // nextTale,nextTab：新数组</span></span>
<span class="line"><span>    // nextn：新数组长度  64 </span></span>
<span class="line"><span>    // transferIndex：线程领取任务时的核心属性 32</span></span>
<span class="line"><span>    // 先看领取任务的过程！！！</span></span>
<span class="line"><span>    // 声明fwd节点，在老数组迁移数据完成后，将fwd赋值上去</span></span>
<span class="line"><span>    ForwardingNode&lt;K,V&gt; fwd = new ForwardingNode&lt;K,V&gt;(nextTab);</span></span>
<span class="line"><span>    // 领任务的核心标识</span></span>
<span class="line"><span>    boolean advance = true;</span></span>
<span class="line"><span>    // 扩容结束了咩？</span></span>
<span class="line"><span>    boolean finishing = false;</span></span>
<span class="line"><span>    // 扩容的for循环</span></span>
<span class="line"><span>    for (int i = 0, bound = 0;;) {</span></span>
<span class="line"><span>        Node&lt;K,V&gt; f; int fh;</span></span>
<span class="line"><span>        // 领取任务的while循环</span></span>
<span class="line"><span>        while (advance) {</span></span>
<span class="line"><span>            int nextIndex, nextBound;</span></span>
<span class="line"><span>            // 第一个判断是为了迁移下一个索引数据（暂时不管）</span></span>
<span class="line"><span>            if (--i &gt;= bound || finishing)</span></span>
<span class="line"><span>                advance = false;</span></span>
<span class="line"><span>            // 说明没有任务可以领取了（暂时不管）</span></span>
<span class="line"><span>            else if ((nextIndex = transferIndex) &lt;= 0) {</span></span>
<span class="line"><span>                i = -1;</span></span>
<span class="line"><span>                advance = false;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // transferIndex：16</span></span>
<span class="line"><span>            // stride：16，nextIndex：32，nextBound：16</span></span>
<span class="line"><span>            // bound：16，i：31</span></span>
<span class="line"><span>            // 开始领取任务，如果CAS成功，代表当前线程领取了32~16这个范围数据的迁移</span></span>
<span class="line"><span>            else if (U.compareAndSwapInt</span></span>
<span class="line"><span>                     (this, TRANSFERINDEX, nextIndex,</span></span>
<span class="line"><span>                      nextBound = (nextIndex &gt; stride ?</span></span>
<span class="line"><span>                                   nextIndex - stride : 0))) {</span></span>
<span class="line"><span>                bound = nextBound;</span></span>
<span class="line"><span>                i = nextIndex - 1;</span></span>
<span class="line"><span>                advance = false;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 迁移最后一段的线程干完活了，或者其他线程没有任务可以领取了。</span></span>
<span class="line"><span>        if (i &lt; 0) {</span></span>
<span class="line"><span>            int sc;</span></span>
<span class="line"><span>            // 判断结束了没，第一次肯定进不来</span></span>
<span class="line"><span>            if (finishing) {</span></span>
<span class="line"><span>                // 结束扩容，将nextTabl设置为null</span></span>
<span class="line"><span>                nextTable = null;</span></span>
<span class="line"><span>                // 将迁移完数据的新数组，指向指向的老数组</span></span>
<span class="line"><span>                table = nextTab;</span></span>
<span class="line"><span>                // 将sizeCtl复制为下次扩容的阈值</span></span>
<span class="line"><span>                sizeCtl = (n &lt;&lt; 1) - (n &gt;&gt;&gt; 1);</span></span>
<span class="line"><span>                // 结束</span></span>
<span class="line"><span>                return;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 到这，说明当前线程没有任务可以领取了</span></span>
<span class="line"><span>            // 基于CAS的方式，将低位-1，代表当前线程退出扩容操作（如果是最后一个，还有一个额外的活）</span></span>
<span class="line"><span>            if (U.compareAndSwapInt(this, SIZECTL, sc = sizeCtl, sc - 1)) {</span></span>
<span class="line"><span>                // 判断我是否是最后一个完成迁移数据的线程，如果不是，直接return结束</span></span>
<span class="line"><span>                if ((sc - 2) != resizeStamp(n) &lt;&lt; RESIZE_STAMP_SHIFT)</span></span>
<span class="line"><span>                    return;</span></span>
<span class="line"><span>                // 如果到这，说明我是最后一个结束迁移数据的线程。</span></span>
<span class="line"><span>                // finishing结束表示和advance领取任务的标识全部设置为true</span></span>
<span class="line"><span>                finishing = advance = true;</span></span>
<span class="line"><span>                // i设置为老数组长度，从头到位再检查一次整个老数组。</span></span>
<span class="line"><span>                i = n; </span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            额外分析：当前线程完成领取的迁移任务后，再次进入while循环，查看是否有任务可以领取如果transferIndex变为0了，代表我没有任务可以领取，将i设置为-1没有任务可以领取，退出当前扩容操作：1、基于CAS将sizeCtl - 1代表我退出扩容操作2、-1成功后，还要判断，我是不是最后一个退出扩容的线程（sc - 2值是否是 扩容标识戳 &lt;&lt; 16）    如果不是，直接return结束3、如果是最后一个结束迁移的线程，将i复制为老数组长度，重新从末位到头部再次检查一圈</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else if ((f = tabAt(tab, i)) == null)</span></span>
<span class="line"><span>            // 如果发现迁移为主的数据为null，设置放置一个fwd，代表当前位置迁移完成</span></span>
<span class="line"><span>            advance = casTabAt(tab, i, null, fwd);</span></span>
<span class="line"><span>        else if ((fh = f.hash) == MOVED)</span></span>
<span class="line"><span>            // 是在检查时的逻辑</span></span>
<span class="line"><span>            advance = true; </span></span>
<span class="line"><span>        else {</span></span>
<span class="line"><span>            // 迁移数据，加锁！</span></span>
<span class="line"><span>            synchronized (f) {</span></span>
<span class="line"><span>                // 拿到当前位置数据</span></span>
<span class="line"><span>                if (tabAt(tab, i) == f) {</span></span>
<span class="line"><span>                    Node&lt;K,V&gt; ln, hn;</span></span>
<span class="line"><span>                    // 说明当前节点状态正常，不是迁移，不是红黑树，不是预留</span></span>
<span class="line"><span>                    if (fh &gt;= 0) {</span></span>
<span class="line"><span>                        // fh与老数组进行&amp;运算，得到runBit</span></span>
<span class="line"><span>                        // 00001111</span></span>
<span class="line"><span>                        // 00010000</span></span>
<span class="line"><span>                        // 这个计算的结果，会决定当前数据在迁移时，是放到新数组的i位置还有新数组的 i + n位置</span></span>
<span class="line"><span>                        int runBit = fh &amp; n;</span></span>
<span class="line"><span>                        Node&lt;K,V&gt; lastRun = f;</span></span>
<span class="line"><span>                        // lastRun机制</span></span>
<span class="line"><span>                        // 提前循环一次链表，将节点赋值到对应的高低位Node./</span></span>
<span class="line"><span>                        // 如果链表最后面的值没有变化，那就不动指针，直接复制。</span></span>
<span class="line"><span>                        for (Node&lt;K,V&gt; p = f.next; p != null; p = p.next) {</span></span>
<span class="line"><span>                            int b = p.hash &amp; n;</span></span>
<span class="line"><span>                            if (b != runBit) {</span></span>
<span class="line"><span>                                runBit = b;</span></span>
<span class="line"><span>                                lastRun = p;</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                        if (runBit == 0) {</span></span>
<span class="line"><span>                            ln = lastRun;</span></span>
<span class="line"><span>                            hn = null;</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                        else {</span></span>
<span class="line"><span>                            hn = lastRun;</span></span>
<span class="line"><span>                            ln = null;</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                        // 再次循环时，就循环到lastRun位置，不再继续往下循环</span></span>
<span class="line"><span>                        // 这样可以不用每个节点都new，避免GC和OOM问题。</span></span>
<span class="line"><span>                        for (Node&lt;K,V&gt; p = f; p != lastRun; p = p.next) {</span></span>
<span class="line"><span>                            int ph = p.hash; K pk = p.key; V pv = p.val;</span></span>
<span class="line"><span>                            if ((ph &amp; n) == 0)</span></span>
<span class="line"><span>                                ln = new Node&lt;K,V&gt;(ph, pk, pv, ln);</span></span>
<span class="line"><span>                            else</span></span>
<span class="line"><span>                                hn = new Node&lt;K,V&gt;(ph, pk, pv, hn);</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                        // 放低位</span></span>
<span class="line"><span>                        setTabAt(nextTab, i, ln);</span></span>
<span class="line"><span>                        // 放高位</span></span>
<span class="line"><span>                        setTabAt(nextTab, i + n, hn);</span></span>
<span class="line"><span>                        // 将当前迁移完的桶位置，设置上fwd，代表数据迁移完毕</span></span>
<span class="line"><span>                        setTabAt(tab, i, fwd);</span></span>
<span class="line"><span>                        // advance，代表执行下次循环，i--。</span></span>
<span class="line"><span>                        advance = true;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                    // 省略红黑树迁移！</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="六、helptransfer方法-协助扩容" tabindex="-1">六、helpTransfer方法-协助扩容 <a class="header-anchor" href="#六、helptransfer方法-协助扩容" aria-label="Permalink to &quot;六、helpTransfer方法-协助扩容&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 协助扩容</span></span>
<span class="line"><span>final Node&lt;K,V&gt;[] helpTransfer(Node&lt;K,V&gt;[] tab, Node&lt;K,V&gt; f) {</span></span>
<span class="line"><span>    Node&lt;K,V&gt;[] nextTab; int sc;</span></span>
<span class="line"><span>    // 老数组不为null，当前节点是fwd，新数组不为null</span></span>
<span class="line"><span>    if (tab != null &amp;&amp; (f instanceof ForwardingNode) &amp;&amp;</span></span>
<span class="line"><span>        (nextTab = ((ForwardingNode&lt;K,V&gt;)f).nextTable) != null) {</span></span>
<span class="line"><span>        // 创建自己的扩容标识戳</span></span>
<span class="line"><span>        int rs = resizeStamp(tab.length);</span></span>
<span class="line"><span>        // 判断之前赋值的内容是否有变化，并且sizeCtl是否小于0</span></span>
<span class="line"><span>        while (nextTab == nextTable &amp;&amp; table == tab &amp;&amp;</span></span>
<span class="line"><span>               (sc = sizeCtl) &lt; 0) {</span></span>
<span class="line"><span>            if ((sc &gt;&gt;&gt; RESIZE_STAMP_SHIFT) != rs || </span></span>
<span class="line"><span>                sc == rs + 1 ||</span></span>
<span class="line"><span>                sc == rs + MAX_RESIZERS || </span></span>
<span class="line"><span>                transferIndex &lt;= 0)</span></span>
<span class="line"><span>                // 有一个满足，就说明不需要协助扩容了</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>            // CAS，将sizeCtl + 1，代表来协助扩容了</span></span>
<span class="line"><span>            if (U.compareAndSwapInt(this, SIZECTL, sc, sc + 1)) {</span></span>
<span class="line"><span>                transfer(tab, nextTab);</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return nextTab;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return table;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="七、juc并发工具" tabindex="-1">七、<strong>JUC并发工具</strong> <a class="header-anchor" href="#七、juc并发工具" aria-label="Permalink to &quot;七、**JUC并发工具**&quot;">​</a></h1><p>跟着我掌握这些内容，首先你要对AQS有一定了解。（ReentrantLock，ReentrantReadWriteLock）</p><h3 id="一、countdownlatch应用" tabindex="-1">一、CountDownLatch应用 <a class="header-anchor" href="#一、countdownlatch应用" aria-label="Permalink to &quot;一、CountDownLatch应用&quot;">​</a></h3><p>CountDownLatch本身就好像一个计数器，可以让一个线程或多个线程等待其他线程完成后再执行。</p><p>应用方式巨简单</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException, BrokenBarrierException {</span></span>
<span class="line"><span>    // 声明CountDownLatch，有参构造传入的值，会赋值给state，CountDownLatch基于AQS实现</span></span>
<span class="line"><span>    // 3 - 1 = 2 - 1 = 1 - 1</span></span>
<span class="line"><span>    CountDownLatch countDownLatch = new CountDownLatch(3);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;111&quot;);</span></span>
<span class="line"><span>        countDownLatch.countDown();</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;222&quot;);</span></span>
<span class="line"><span>        countDownLatch.countDown();</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Thread.sleep(1000);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        System.out.println(&quot;333&quot;);</span></span>
<span class="line"><span>        countDownLatch.countDown();</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 主线会阻塞在这个位置，直到CountDownLatch的state变为0</span></span>
<span class="line"><span>    countDownLatch.await();</span></span>
<span class="line"><span>    System.out.println(&quot;main&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="二、countdownlatch核心源码分析" tabindex="-1">二、CountDownLatch核心源码分析 <a class="header-anchor" href="#二、countdownlatch核心源码分析" aria-label="Permalink to &quot;二、CountDownLatch核心源码分析&quot;">​</a></h3><h4 id="_2-1-从构造方法查看" tabindex="-1">2.1 从构造方法查看 <a class="header-anchor" href="#_2-1-从构造方法查看" aria-label="Permalink to &quot;2.1 从构造方法查看&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// CountDownLatch 的有参构造</span></span>
<span class="line"><span>public CountDownLatch(int count) {</span></span>
<span class="line"><span>    // 健壮性校验</span></span>
<span class="line"><span>    if (count &lt; 0) throw new IllegalArgumentException(&quot;count &lt; 0&quot;);</span></span>
<span class="line"><span>    // 构建Sync给AQS的state赋值</span></span>
<span class="line"><span>    this.sync = new Sync(count);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-2-countdown方法" tabindex="-1">2.2 countDown方法 <a class="header-anchor" href="#_2-2-countdown方法" aria-label="Permalink to &quot;2.2 countDown方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// countDown方法,本质就是调用了AQS的释放共享锁操作</span></span>
<span class="line"><span>// 这里的功能都是AQS提供的，只有tryReleaseShared需要实现的类自己去编写业务</span></span>
<span class="line"><span>public final boolean releaseShared(int arg) {</span></span>
<span class="line"><span>    if (tryReleaseShared(arg)) {</span></span>
<span class="line"><span>        // 唤醒在AQS队列中排队的线程。</span></span>
<span class="line"><span>        doReleaseShared();</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// countDownLatch实现的业务</span></span>
<span class="line"><span>protected boolean tryReleaseShared(int releases) {</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        int c = getState();</span></span>
<span class="line"><span>        if (c == 0)</span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span>        // state - 1</span></span>
<span class="line"><span>        int nextc = c-1;</span></span>
<span class="line"><span>        // 用CAS赋值</span></span>
<span class="line"><span>        if (compareAndSetState(c, nextc))</span></span>
<span class="line"><span>            return nextc == 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 如果CountDownLatch中的state已经为0了，那么再次执行countDown跟没执行一样。</span></span>
<span class="line"><span>// 而且只要state变为0，await就不会阻塞线程。</span></span></code></pre></div><h4 id="_2-3-await方法" tabindex="-1">2.3 await方法 <a class="header-anchor" href="#_2-3-await方法" aria-label="Permalink to &quot;2.3 await方法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// await方法</span></span>
<span class="line"><span>public void await() throws InterruptedException {</span></span>
<span class="line"><span>    // 调用了AQS提供的获取共享锁并且允许中断的方法</span></span>
<span class="line"><span>    sync.acquireSharedInterruptibly(1);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// AQS提欧的获取共享锁并且允许中断的方法</span></span>
<span class="line"><span>public final void acquireSharedInterruptibly(int arg)</span></span>
<span class="line"><span>        throws InterruptedException {</span></span>
<span class="line"><span>    if (Thread.interrupted())</span></span>
<span class="line"><span>        throw new InterruptedException();</span></span>
<span class="line"><span>    // countDownLatch操作</span></span>
<span class="line"><span>    if (tryAcquireShared(arg) &lt; 0)</span></span>
<span class="line"><span>        // 如果返回的是-1，代表state肯定大于0</span></span>
<span class="line"><span>        doAcquireSharedInterruptibly(arg);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// CountDownLatch实现的tryAcquireShared</span></span>
<span class="line"><span>protected int tryAcquireShared(int acquires) {</span></span>
<span class="line"><span>    // state为0，返回1,。否则返回-1</span></span>
<span class="line"><span>    return (getState() == 0) ? 1 : -1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 让当前线程进到AQS队列，排队去</span></span>
<span class="line"><span>private void doAcquireSharedInterruptibly(int arg) throws InterruptedException {</span></span>
<span class="line"><span>    // 将当前线程封装为Node，并且添加到AQS的队列中</span></span>
<span class="line"><span>    final Node node = addWaiter(Node.SHARED);</span></span>
<span class="line"><span>    boolean failed = true;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        for (;;) {</span></span>
<span class="line"><span>            final Node p = node.predecessor();</span></span>
<span class="line"><span>            if (p == head) {</span></span>
<span class="line"><span>                // 再次走上面的tryAcquireShared，如果返回的是的1，代表state为0</span></span>
<span class="line"><span>                int r = tryAcquireShared(arg);</span></span>
<span class="line"><span>                if (r &gt;= 0) {</span></span>
<span class="line"><span>                    // 会将当前线程和后面所有排队的线程都唤醒。</span></span>
<span class="line"><span>                    setHeadAndPropagate(node, r);</span></span>
<span class="line"><span>                    p.next = null; // help GC</span></span>
<span class="line"><span>                    failed = false;</span></span>
<span class="line"><span>                    return;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            if (shouldParkAfterFailedAcquire(p, node) &amp;&amp;</span></span>
<span class="line"><span>                parkAndCheckInterrupt())</span></span>
<span class="line"><span>                throw new InterruptedException();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        if (failed)</span></span>
<span class="line"><span>            cancelAcquire(node);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="三、semaphore应用" tabindex="-1">三、Semaphore应用 <a class="header-anchor" href="#三、semaphore应用" aria-label="Permalink to &quot;三、Semaphore应用&quot;">​</a></h3><p>也是常用的JUC并发工具，一般用于流控。比如有一个公共资源，多线程都可以访问时，可以用信号量做限制。</p><p>连接池，内部的链接对象有限，每当有一个线程获取连接对象时，对信号量-1，当这个线程归还资源时对信号量+1。</p><p>如果线程拿资源时，发现Semaphore内部的资源个数为0，就会被阻塞。</p><p>Hystrix的隔离策略 - 线程池，信号量</p><p>使用方式巨简单。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException, BrokenBarrierException {</span></span>
<span class="line"><span>    // 声明信号量</span></span>
<span class="line"><span>    Semaphore semaphore = new Semaphore(1);</span></span>
<span class="line"><span>    // 能否去拿资源</span></span>
<span class="line"><span>    semaphore.acquire();</span></span>
<span class="line"><span>    // 拿资源处理业务</span></span>
<span class="line"><span>    System.out.println(&quot;main&quot;);</span></span>
<span class="line"><span>    // 归还资源</span></span>
<span class="line"><span>    semaphore.release();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="四、semaphore核心源码分析" tabindex="-1">四、Semaphore核心源码分析 <a class="header-anchor" href="#四、semaphore核心源码分析" aria-label="Permalink to &quot;四、Semaphore核心源码分析&quot;">​</a></h3><h4 id="_4-1-有参构造" tabindex="-1">4.1 有参构造 <a class="header-anchor" href="#_4-1-有参构造" aria-label="Permalink to &quot;4.1 有参构造&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// Semaphore有公平和非公平两种竞争资源的方式。</span></span>
<span class="line"><span>public Semaphore(int permits, boolean fair) {</span></span>
<span class="line"><span>    sync = fair ? new FairSync(permits) : new NonfairSync(permits);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 设置资源个数，State其实就是信号量的资源个数</span></span>
<span class="line"><span>Sync(int permits) {</span></span>
<span class="line"><span>    setState(permits);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-2-acquire" tabindex="-1">4.2 acquire <a class="header-anchor" href="#_4-2-acquire" aria-label="Permalink to &quot;4.2 acquire&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 阿巴阿巴~</span></span>
<span class="line"><span>public final void acquireSharedInterruptibly(int arg)</span></span>
<span class="line"><span>        throws InterruptedException {</span></span>
<span class="line"><span>    if (Thread.interrupted())</span></span>
<span class="line"><span>        throw new InterruptedException();</span></span>
<span class="line"><span>    if (tryAcquireShared(arg) &lt; 0)</span></span>
<span class="line"><span>        doAcquireSharedInterruptibly(arg);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 公平</span></span>
<span class="line"><span>protected int tryAcquireShared(int acquires) {</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 公平方式，先好看队列中有木有排队的，有排队的返回-1，执行doAcquireSharedInterruptibly去排队</span></span>
<span class="line"><span>        if (hasQueuedPredecessors())</span></span>
<span class="line"><span>            return -1;</span></span>
<span class="line"><span>        // 那state</span></span>
<span class="line"><span>        int available = getState();</span></span>
<span class="line"><span>        // remaining = 资源数 - 1</span></span>
<span class="line"><span>        int remaining = available - acquires;</span></span>
<span class="line"><span>        // 如果资源不够，直接返回-1</span></span>
<span class="line"><span>        if (remaining &lt; 0 ||</span></span>
<span class="line"><span>            // 如果资源够，执行CAS，修改state</span></span>
<span class="line"><span>            compareAndSetState(available, remaining))</span></span>
<span class="line"><span>            return remaining;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 非公平</span></span>
<span class="line"><span>final int nonfairTryAcquireShared(int acquires) {</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        int available = getState();</span></span>
<span class="line"><span>        int remaining = available - acquires;</span></span>
<span class="line"><span>        if (remaining &lt; 0 ||</span></span>
<span class="line"><span>            compareAndSetState(available, remaining))</span></span>
<span class="line"><span>            return remaining;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-3-release" tabindex="-1">4.3 release <a class="header-anchor" href="#_4-3-release" aria-label="Permalink to &quot;4.3 release&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 两个一起 阿巴阿巴</span></span>
<span class="line"><span>public void release() {</span></span>
<span class="line"><span>    sync.releaseShared(1);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public final boolean releaseShared(int arg) {</span></span>
<span class="line"><span>    if (tryReleaseShared(arg)) {</span></span>
<span class="line"><span>        // 唤醒在AQS中排队的Node，去竞争资源</span></span>
<span class="line"><span>        doReleaseShared();</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 信号量实现的归还资源</span></span>
<span class="line"><span>protected final boolean tryReleaseShared(int releases) {</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 拿state</span></span>
<span class="line"><span>        int current = getState();</span></span>
<span class="line"><span>        // state + 1</span></span>
<span class="line"><span>        int next = current + releases;</span></span>
<span class="line"><span>        // 资源最大值，再+1，变为负数</span></span>
<span class="line"><span>        if (next &lt; current)</span></span>
<span class="line"><span>            throw new Error(&quot;Maximum permit count exceeded&quot;);</span></span>
<span class="line"><span>        // CAS 改一手</span></span>
<span class="line"><span>        if (compareAndSetState(current, next))</span></span>
<span class="line"><span>            return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-4-分析aqs中propagate类型节点-唯一的难点" tabindex="-1">4.4 分析AQS中PROPAGATE类型节点（唯一的难点） <a class="header-anchor" href="#_4-4-分析aqs中propagate类型节点-唯一的难点" aria-label="Permalink to &quot;4.4 分析AQS中PROPAGATE类型节点（唯一的难点）&quot;">​</a></h4><p>JDK1.5中，使用信号量时，可能会造成在有资源的情况下，后继节点无法被唤醒。</p><p>在JDK1.8中，问题被修复，修复方式就是追加了PROPAGATE节点状态来解决。</p><p>共享锁在释放资源后，如果头节点为0，无法确认真的没有后继节点。如果头节点为0，需要将头节点的状态修改为-3，当最新拿到锁资源的线程，查看是否有后继节点并且为共享锁，就唤醒排队的线程</p><h3 id="五、cyclicbarrier应用" tabindex="-1">五、CyclicBarrier应用 <a class="header-anchor" href="#五、cyclicbarrier应用" aria-label="Permalink to &quot;五、CyclicBarrier应用&quot;">​</a></h3><p>一般称为栅栏，和CountDownLatch很像。</p><p>CountDownLatch在操作时，只能使用一次，也就是state变为0之后，就无法继续玩了。</p><p>CyclicBarrier是可以复用的，他的计数器可以归位，然后再处理。而且可以在计数过程中出现问题后，重置当前CyclicBarrier，再次重新操作！</p><p>应用一波</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException, BrokenBarrierException {</span></span>
<span class="line"><span>    // 声明栅栏</span></span>
<span class="line"><span>    CyclicBarrier barrier = new CyclicBarrier(3,() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;打手枪！&quot;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;第一位选手到位&quot;);</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            barrier.await();</span></span>
<span class="line"><span>            System.out.println(&quot;第一位往死里跑！&quot;);</span></span>
<span class="line"><span>        } catch (Exception e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;第二位选手到位&quot;);</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            barrier.await();</span></span>
<span class="line"><span>            System.out.println(&quot;第二位也往死里跑！&quot;);</span></span>
<span class="line"><span>        } catch (Exception e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    System.out.println(&quot;裁判已经到位&quot;);</span></span>
<span class="line"><span>    barrier.await();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="六、cyclicbarrier核心源码分析" tabindex="-1">六、CyclicBarrier核心源码分析 <a class="header-anchor" href="#六、cyclicbarrier核心源码分析" aria-label="Permalink to &quot;六、CyclicBarrier核心源码分析&quot;">​</a></h3><h4 id="_6-1-有参构造" tabindex="-1">6.1 有参构造 <a class="header-anchor" href="#_6-1-有参构造" aria-label="Permalink to &quot;6.1 有参构造&quot;">​</a></h4><p>CyclicBarrier没有直接使用AQS，而是使用ReentrantLock，简介的使用的AQS</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// CyclicBarrier的有参</span></span>
<span class="line"><span>public CyclicBarrier(int parties, Runnable barrierAction) {、</span></span>
<span class="line"><span>    // 健壮性判断！</span></span>
<span class="line"><span>    if (parties &lt;= 0) throw new IllegalArgumentException();</span></span>
<span class="line"><span>    // parties是final修饰的，需要在重置时，使用！</span></span>
<span class="line"><span>    this.parties = parties;</span></span>
<span class="line"><span>    // count是在执行await用来计数的。</span></span>
<span class="line"><span>    this.count = parties;</span></span>
<span class="line"><span>    // 当计数count为0时 ，先执行这个Runnnable！在唤醒被阻塞的线程</span></span>
<span class="line"><span>    this.barrierCommand = barrierAction;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_6-2-await" tabindex="-1">6.2 await <a class="header-anchor" href="#_6-2-await" aria-label="Permalink to &quot;6.2 await&quot;">​</a></h4><p>线程执行await方法，会对count-1，再判断count是否为0</p><p>如果不为0，需要添加到AQS中的ConditionObject的Waiter队列中排队，并park当前线程</p><p>如果为0，证明线程到齐，需要执行nextGeneration，会先将Waiter队列中的Node全部转移到AQS的队列中，并且有后继节点的，ws设置为-1。没有后继节点设置为0。然后重置count和broker标记。等到unlock执行后，每个线程都会被唤醒。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 选手到位！！！</span></span>
<span class="line"><span>private int dowait(boolean timed, long nanos) throws InterruptedException, BrokenBarrierException, TimeoutException {</span></span>
<span class="line"><span>    // 加锁？？  因为CyclicBarrier是基于ReentrantLock-Condition的await和singalAll方法实现的。</span></span>
<span class="line"><span>    // 相当于synchronized中使用wait和notify</span></span>
<span class="line"><span>    // 别忘了，只要挂起，会释放锁资源。</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 里面就是boolean，默认false</span></span>
<span class="line"><span>        final Generation g = generation;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 判断之前栅栏加入线程时，是否有超时、中断等问题，如果有，设置boolean为true，其他线程再进来，直接凉凉</span></span>
<span class="line"><span>        if (g.broken)</span></span>
<span class="line"><span>            throw new BrokenBarrierException();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (Thread.interrupted()) {</span></span>
<span class="line"><span>            breakBarrier();</span></span>
<span class="line"><span>            throw new InterruptedException();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 对计数器count--</span></span>
<span class="line"><span>        int index = --count;</span></span>
<span class="line"><span>        // 如果--完，是0，代表突破栅栏，干活！</span></span>
<span class="line"><span>        if (index == 0) {  </span></span>
<span class="line"><span>            // 默认false</span></span>
<span class="line"><span>            boolean ranAction = false;</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                // 如果你用的是2个参数的有参构造，说明你传入了任务，index == 0，先执行CyclicBarrier有参的任务</span></span>
<span class="line"><span>                final Runnable command = barrierCommand;</span></span>
<span class="line"><span>                if (command != null)</span></span>
<span class="line"><span>                    command.run();</span></span>
<span class="line"><span>                // 设置为true</span></span>
<span class="line"><span>                ranAction = true;</span></span>
<span class="line"><span>                nextGeneration();</span></span>
<span class="line"><span>                return 0;</span></span>
<span class="line"><span>            } finally {</span></span>
<span class="line"><span>                if (!ranAction)</span></span>
<span class="line"><span>                    breakBarrier();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // --完之后，index不是0，代表还需要等待其他线程</span></span>
<span class="line"><span>        for (;;) {</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                // 如果没设置超时时间。  await()</span></span>
<span class="line"><span>                if (!timed)</span></span>
<span class="line"><span>                    trip.await();</span></span>
<span class="line"><span>                // 设置了超时时间。  await(1,SECOND)</span></span>
<span class="line"><span>                else if (nanos &gt; 0L)</span></span>
<span class="line"><span>                    nanos = trip.awaitNanos(nanos);</span></span>
<span class="line"><span>            } catch (InterruptedException ie) {</span></span>
<span class="line"><span>                if (g == generation &amp;&amp; ! g.broken) {</span></span>
<span class="line"><span>                    breakBarrier();</span></span>
<span class="line"><span>                    throw ie;</span></span>
<span class="line"><span>                } else {</span></span>
<span class="line"><span>                    Thread.currentThread().interrupt();</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (g.broken)</span></span>
<span class="line"><span>                throw new BrokenBarrierException();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (g != generation)</span></span>
<span class="line"><span>                return index;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (timed &amp;&amp; nanos &lt;= 0L) {</span></span>
<span class="line"><span>                breakBarrier();</span></span>
<span class="line"><span>                throw new TimeoutException();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 挂起线程</span></span>
<span class="line"><span>public final void await() throws InterruptedException {</span></span>
<span class="line"><span>    // 允许中断</span></span>
<span class="line"><span>    if (Thread.interrupted())</span></span>
<span class="line"><span>        throw new InterruptedException();</span></span>
<span class="line"><span>    // 添加到队列（不是AQS队列，是AQS里的ConditionObject中的队列）</span></span>
<span class="line"><span>    Node node = addConditionWaiter();</span></span>
<span class="line"><span>    int savedState = fullyRelease(node);</span></span>
<span class="line"><span>    int interruptMode = 0;</span></span>
<span class="line"><span>    while (!isOnSyncQueue(node)) {</span></span>
<span class="line"><span>        // 挂起当前线程</span></span>
<span class="line"><span>        LockSupport.park(this);</span></span>
<span class="line"><span>        if ((interruptMode = checkInterruptWhileWaiting(node)) != 0)</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// count到0，唤醒所有队列里的线程线程</span></span>
<span class="line"><span>private void nextGeneration() {</span></span>
<span class="line"><span>    // 这个方法就是将Waiter队列中的节点遍历都扔到AQS的队列中，真正唤醒的时机，是unlock方法</span></span>
<span class="line"><span>    trip.signalAll();</span></span>
<span class="line"><span>    // 重置计数器</span></span>
<span class="line"><span>    count = parties;</span></span>
<span class="line"><span>    // 重置异常判断</span></span>
<span class="line"><span>    generation = new Generation();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="八、juc阻塞队列" tabindex="-1">八、<strong>JUC阻塞队列</strong> <a class="header-anchor" href="#八、juc阻塞队列" aria-label="Permalink to &quot;八、**JUC阻塞队列**&quot;">​</a></h1><p>阻塞队列：</p><ul><li><p>队列，先进先出的一个数据结构</p></li><li><p>阻塞，基于ReentrantLock实现的，并且线程的挂起也是通过Condition</p></li></ul><p>从最常用也是最简单的ArrayBlockingQueue，LinkedBlockingQueue</p><h3 id="一、arrayblockingqueue" tabindex="-1">一、ArrayBlockingQueue <a class="header-anchor" href="#一、arrayblockingqueue" aria-label="Permalink to &quot;一、ArrayBlockingQueue&quot;">​</a></h3><p>ArrayBlockingQueue底层是采用数组实现的一个队列。因为底层是数据，一般被成为有界队列</p><p>其次阻塞方式，是基于ReentrantLock实现的。</p><p>常用的存取方法</p><h4 id="_1-1-arrayblockingqueue应用" tabindex="-1">1.1 ArrayBlockingQueue应用 <a class="header-anchor" href="#_1-1-arrayblockingqueue应用" aria-label="Permalink to &quot;1.1 ArrayBlockingQueue应用&quot;">​</a></h4><p>// 存数据操作  add(E),offer(E),put(E)，offer(E,time,unit)<br> // add(E)：添加数据到队列，如果满了，扔异常。<br> // offer(E)：添加数据到队列，如果满了，返回false<br> // put(E)：添加数据到队列，如果满了，线程挂起<br> // offer(E,time,unit)：添加数据到队列，如果满了，线程挂起一段时间</p><p>// 取数据操作  remove(),poll(),take(),poll(time,unit)<br> // remove()：从队列拿数据，拿到返回，拿到null，甩异常<br> // poll()：从队列拿数据，拿到返回，拿到null，也返回<br> // take()：从队列拿数据，拿到返回，没数据，一直阻塞<br> // poll(time,unit)：从队列拿数据，拿到返回，没数据，阻塞time时间</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException, BrokenBarrierException, IOException {</span></span>
<span class="line"><span>    // ArrayBlockingQueue,因为底层使用数组，必须要指定数组的长度，作为队列的长度</span></span>
<span class="line"><span>    ArrayBlockingQueue queue = new ArrayBlockingQueue(1);</span></span>
<span class="line"><span>    // 存数据操作  add(E),offer(E),put(E)，offer(E,time,unit)</span></span>
<span class="line"><span>    // add(E)：添加数据到队列，如果满了，扔异常。</span></span>
<span class="line"><span>    // offer(E)：添加数据到队列，如果满了，返回false</span></span>
<span class="line"><span>    // put(E)：添加数据到队列，如果满了，线程挂起</span></span>
<span class="line"><span>    // offer(E,time,unit)：添加数据到队列，如果满了，线程挂起一段时间</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 取数据操作  remove(),poll(),take(),poll(time,unit)</span></span>
<span class="line"><span>    // remove()：从队列拿数据，拿到返回，拿到null，甩异常</span></span>
<span class="line"><span>    // poll()：从队列拿数据，拿到返回，拿到null，也返回</span></span>
<span class="line"><span>    // take()：从队列拿数据，拿到返回，没数据，一直阻塞</span></span>
<span class="line"><span>    // poll(time,unit)：从队列拿数据，拿到返回，没数据，阻塞time时间</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_1-2-存数据源码" tabindex="-1">1.2 存数据源码 <a class="header-anchor" href="#_1-2-存数据源码" aria-label="Permalink to &quot;1.2 存数据源码&quot;">​</a></h4><p>offer，添加时，先判断队列满了没，满了就返回false<br> offer(time,unit)，添加时，先判断队列满了没，满了先阻塞time时间，自动唤醒，还是满的，也返回false<br> put,添加时，先判断队列满了没，满了就阻塞，阻塞到被唤醒，或者被中断</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 存数据</span></span>
<span class="line"><span>public boolean offer(E e) {</span></span>
<span class="line"><span>    // 非空校验</span></span>
<span class="line"><span>    checkNotNull(e);</span></span>
<span class="line"><span>    // 互斥锁</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 如果数组中的数据已经达到了数组的长度，没地儿了~，队列满了</span></span>
<span class="line"><span>        if (count == items.length)</span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span>        else {</span></span>
<span class="line"><span>            // 还有位置</span></span>
<span class="line"><span>            enqueue(e);</span></span>
<span class="line"><span>            return true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 存放数据到数组中</span></span>
<span class="line"><span>private void enqueue(E x) {</span></span>
<span class="line"><span>    // 拿到数组</span></span>
<span class="line"><span>    final Object[] items = this.items;</span></span>
<span class="line"><span>    // 数组放进去</span></span>
<span class="line"><span>    items[putIndex] = x;</span></span>
<span class="line"><span>    // 把put指针++， 指针是否已经到了最后一个位置，归位到0位置。</span></span>
<span class="line"><span>    if (++putIndex == items.length)</span></span>
<span class="line"><span>        // 归位到0位置。</span></span>
<span class="line"><span>        putIndex = 0;</span></span>
<span class="line"><span>    // 数据条数 + 1</span></span>
<span class="line"><span>    count++;</span></span>
<span class="line"><span>    // 唤醒在阻塞的取数据线程</span></span>
<span class="line"><span>    notEmpty.signal();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// put方法</span></span>
<span class="line"><span>public void put(E e) throws InterruptedException {</span></span>
<span class="line"><span>    checkNotNull(e);</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        while (count == items.length)</span></span>
<span class="line"><span>            notFull.await();</span></span>
<span class="line"><span>        enqueue(e);</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// offer方法，可以阻塞一段时间</span></span>
<span class="line"><span>public boolean offer(E e, long timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span>    checkNotNull(e);</span></span>
<span class="line"><span>    long nanos = unit.toNanos(timeout);</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        while (count == items.length) {</span></span>
<span class="line"><span>            if (nanos &lt;= 0)</span></span>
<span class="line"><span>                return false;</span></span>
<span class="line"><span>            nanos = notFull.awaitNanos(nanos);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        enqueue(e);</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>offer，添加时，先判断队列满了没，满了就返回false</span></span>
<span class="line"><span>offer(time,unit)，添加时，先判断队列满了没，满了先阻塞time时间，自动唤醒，还是满的，也返回false</span></span>
<span class="line"><span>put,添加时，先判断队列满了没，满了就阻塞，阻塞到被唤醒，或者被中断</span></span></code></pre></div><h4 id="_1-3-取数据" tabindex="-1">1.3 取数据 <a class="header-anchor" href="#_1-3-取数据" aria-label="Permalink to &quot;1.3 取数据&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 阿巴阿巴~~取数据</span></span>
<span class="line"><span>public E poll() {</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // count == 0代表没数据， 就返回null，有数据走dequeue</span></span>
<span class="line"><span>        return (count == 0) ? null : dequeue();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 从数组中那数据</span></span>
<span class="line"><span>private E dequeue() {</span></span>
<span class="line"><span>    final Object[] items = this.items;</span></span>
<span class="line"><span>    // 取数据</span></span>
<span class="line"><span>    E x = (E) items[takeIndex];</span></span>
<span class="line"><span>    // 将取完的位置置位null</span></span>
<span class="line"><span>    items[takeIndex] = null;</span></span>
<span class="line"><span>    // take指针++，如果到头，归位0~~</span></span>
<span class="line"><span>    if (++takeIndex == items.length)</span></span>
<span class="line"><span>        takeIndex = 0;</span></span>
<span class="line"><span>    // 数据条数 - 1</span></span>
<span class="line"><span>    count--;</span></span>
<span class="line"><span>    // 唤醒队列满的时候，阻塞住的写线程</span></span>
<span class="line"><span>    notFull.signal();</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>public E take() throws InterruptedException {</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        while (count == 0)</span></span>
<span class="line"><span>            notEmpty.await();  // 挂起线程，需要被唤醒</span></span>
<span class="line"><span>        return dequeue();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public E poll(long timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span>    long nanos = unit.toNanos(timeout);</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        while (count == 0) {</span></span>
<span class="line"><span>            if (nanos &lt;= 0)</span></span>
<span class="line"><span>                return null;  </span></span>
<span class="line"><span>            nanos = notEmpty.awaitNanos(nanos);   //  挂起线程，到时间自动唤醒、或者被手动唤醒</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return dequeue();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="二、linkedblockingqueue" tabindex="-1">二、LinkedBlockingQueue <a class="header-anchor" href="#二、linkedblockingqueue" aria-label="Permalink to &quot;二、LinkedBlockingQueue&quot;">​</a></h3><p>底层基于链表实现的，会将每个元素封装为Node，Node有当前值，还有一个next指针，一般成为无界队列</p><p>LinkedBlockingQueue本质就是一个用Node封装的单向链表。</p><p>LinkedBlockingQueue内部提供了读锁和写锁，读写不互斥，而且记录数据条数的属性是Atomic原子类</p><p>核心属性</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * 阻塞队列元素会被封装为Node</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>static class Node&lt;E&gt; {</span></span>
<span class="line"><span>    E item;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Node&lt;E&gt; next;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Node(E x) { item = x; }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/** 指定队列的长度，如果不传值，默认为Integer.MAX */</span></span>
<span class="line"><span>private final int capacity;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/** 记录数据条数 */</span></span>
<span class="line"><span>private final AtomicInteger count = new AtomicInteger();</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>transient Node&lt;E&gt; head;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private transient Node&lt;E&gt; last;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/** 读锁 */</span></span>
<span class="line"><span>private final ReentrantLock takeLock = new ReentrantLock();</span></span>
<span class="line"><span>private final Condition notEmpty = takeLock.newCondition();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/** 写锁 */</span></span>
<span class="line"><span>private final ReentrantLock putLock = new ReentrantLock();</span></span>
<span class="line"><span>private final Condition notFull = putLock.newCondition();</span></span></code></pre></div><h4 id="_2-1-写操作" tabindex="-1">2.1 写操作 <a class="header-anchor" href="#_2-1-写操作" aria-label="Permalink to &quot;2.1 写操作&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 写操作~</span></span>
<span class="line"><span>public boolean offer(E e) {</span></span>
<span class="line"><span>    // 非空</span></span>
<span class="line"><span>    if (e == null) throw new NullPointerException();</span></span>
<span class="line"><span>    // 拿到count（记录当前数据条数）</span></span>
<span class="line"><span>    final AtomicInteger count = this.count;</span></span>
<span class="line"><span>    // 如果count达到了最大值</span></span>
<span class="line"><span>    if (count.get() == capacity)</span></span>
<span class="line"><span>        // 数据满了。</span></span>
<span class="line"><span>        return false;</span></span>
<span class="line"><span>    // 声明c </span></span>
<span class="line"><span>    int c = -1;</span></span>
<span class="line"><span>    // 将当前数据封装为Node</span></span>
<span class="line"><span>    Node&lt;E&gt; node = new Node&lt;E&gt;(e);</span></span>
<span class="line"><span>    // 添加写锁~</span></span>
<span class="line"><span>    final ReentrantLock putLock = this.putLock;</span></span>
<span class="line"><span>    putLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // ！！DCL！！</span></span>
<span class="line"><span>        // 再次拿到条数判断，如果还有空间，enqueue存数据</span></span>
<span class="line"><span>        if (count.get() &lt; capacity) {</span></span>
<span class="line"><span>            // 数据放进来</span></span>
<span class="line"><span>            enqueue(node);</span></span>
<span class="line"><span>            // 拿到count，再自增</span></span>
<span class="line"><span>            c = count.getAndIncrement();</span></span>
<span class="line"><span>            // 添加完数据之后，长度依然小于最大长度，唤醒可能阻塞的写线程  </span></span>
<span class="line"><span>            // 读写不互斥，可能前面在执行时，队列是满的，但是读操作依然在进行</span></span>
<span class="line"><span>            if (c + 1 &lt; capacity)</span></span>
<span class="line"><span>                notFull.signal();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        putLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // c == 0，说明添加数据之前，队列是空的，唤醒可能阻塞的读线程</span></span>
<span class="line"><span>    if (c == 0)</span></span>
<span class="line"><span>        signalNotEmpty();</span></span>
<span class="line"><span>    // 返回count &gt;= 0</span></span>
<span class="line"><span>    return c &gt;= 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 插入数据到链表~~~</span></span>
<span class="line"><span>private void enqueue(Node&lt;E&gt; node) {</span></span>
<span class="line"><span>    last = last.next = node;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>public void put(E e) throws InterruptedException {</span></span>
<span class="line"><span>    if (e == null) throw new NullPointerException();</span></span>
<span class="line"><span>    int c = -1;</span></span>
<span class="line"><span>    Node&lt;E&gt; node = new Node&lt;E&gt;(e);</span></span>
<span class="line"><span>    final ReentrantLock putLock = this.putLock;</span></span>
<span class="line"><span>    final AtomicInteger count = this.count;</span></span>
<span class="line"><span>    putLock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        while (count.get() == capacity) {</span></span>
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
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public boolean offer(E e, long timeout, TimeUnit unit)</span></span>
<span class="line"><span>    throws InterruptedException {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (e == null) throw new NullPointerException();</span></span>
<span class="line"><span>    long nanos = unit.toNanos(timeout);</span></span>
<span class="line"><span>    int c = -1;</span></span>
<span class="line"><span>    final ReentrantLock putLock = this.putLock;</span></span>
<span class="line"><span>    final AtomicInteger count = this.count;</span></span>
<span class="line"><span>    putLock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        while (count.get() == capacity) {</span></span>
<span class="line"><span>            if (nanos &lt;= 0)</span></span>
<span class="line"><span>                return false;</span></span>
<span class="line"><span>            nanos = notFull.awaitNanos(nanos);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        enqueue(new Node&lt;E&gt;(e));</span></span>
<span class="line"><span>        c = count.getAndIncrement();</span></span>
<span class="line"><span>        if (c + 1 &lt; capacity)</span></span>
<span class="line"><span>            notFull.signal();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        putLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (c == 0)</span></span>
<span class="line"><span>        signalNotEmpty();</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-2-读操作" tabindex="-1">2.2 读操作 <a class="header-anchor" href="#_2-2-读操作" aria-label="Permalink to &quot;2.2 读操作&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public E poll() {</span></span>
<span class="line"><span>    final AtomicInteger count = this.count;</span></span>
<span class="line"><span>    // 为0，没数据，拜拜~~</span></span>
<span class="line"><span>    if (count.get() == 0)</span></span>
<span class="line"><span>        return null;</span></span>
<span class="line"><span>    E x = null;</span></span>
<span class="line"><span>    int c = -1;</span></span>
<span class="line"><span>    // 读锁</span></span>
<span class="line"><span>    final ReentrantLock takeLock = this.takeLock;</span></span>
<span class="line"><span>    takeLock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 如果队列有数据  DCL</span></span>
<span class="line"><span>        if (count.get() &gt; 0) {</span></span>
<span class="line"><span>            x = dequeue();</span></span>
<span class="line"><span>            // count --</span></span>
<span class="line"><span>            c = count.getAndDecrement();</span></span>
<span class="line"><span>            if (c &gt; 1)</span></span>
<span class="line"><span>                // c &gt; 1,说明还有数据，唤醒读线程</span></span>
<span class="line"><span>                notEmpty.signal();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        takeLock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (c == capacity)</span></span>
<span class="line"><span>        // 到这说明还有位置呢，唤醒写线程</span></span>
<span class="line"><span>        signalNotFull();</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private E dequeue() {</span></span>
<span class="line"><span>    Node&lt;E&gt; h = head;</span></span>
<span class="line"><span>    Node&lt;E&gt; first = h.next;</span></span>
<span class="line"><span>    h.next = h; // help GC</span></span>
<span class="line"><span>    head = first;</span></span>
<span class="line"><span>    E x = first.item;</span></span>
<span class="line"><span>    first.item = null;</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="三、priorityqueue" tabindex="-1">三、PriorityQueue <a class="header-anchor" href="#三、priorityqueue" aria-label="Permalink to &quot;三、PriorityQueue&quot;">​</a></h3><p>这个就是一个普通的队列，不是阻塞的。</p><p>因为DelayQueue和PriorityBlockingQueue都和PriorityQueue有关系，很类似。</p><p>先把PriorityQueue搞定，后续再看其他的优先级阻塞队列，效果更佳！</p><p>PriorityQueue才是真正而定无界队列。底层是数组实现，会扩容！</p><p>PriorityQueue实现优先级的方式，是基于二叉堆实现的</p><p>二叉堆：</p><ul><li><p>二叉堆是一颗完整的二叉树</p></li><li><p>任意一个节点大于父节点   或者   小于父节点</p></li></ul><p>因为这个二叉堆是实现优先级队列的原理，那么队列或有添加和获取的操作，这种操作会影响二叉堆的结构，查看PriorityQueue队列的添加和获取操作如何保证结构</p><h4 id="_3-1-添加操作上移保证结构" tabindex="-1">3.1 添加操作上移保证结构 <a class="header-anchor" href="#_3-1-添加操作上移保证结构" aria-label="Permalink to &quot;3.1 添加操作上移保证结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 优先级队列添加操作，确定如何保证小顶堆结构</span></span>
<span class="line"><span>public boolean offer(E e) {</span></span>
<span class="line"><span>    if (e == null)</span></span>
<span class="line"><span>        throw new NullPointerException();</span></span>
<span class="line"><span>    modCount++;</span></span>
<span class="line"><span>    // size是数组数据条数，大于等于数组长度后，需要扩容</span></span>
<span class="line"><span>    int i = size;</span></span>
<span class="line"><span>    if (i &gt;= queue.length)</span></span>
<span class="line"><span>        // Double size if small; else grow by 50%</span></span>
<span class="line"><span>        grow(i + 1);</span></span>
<span class="line"><span>    // size + i，数据多一条</span></span>
<span class="line"><span>    size = i + 1;</span></span>
<span class="line"><span>    // 如果i == 0，说明添加的是第一个数据</span></span>
<span class="line"><span>    if (i == 0)</span></span>
<span class="line"><span>        queue[0] = e;</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        // 不是第一个数据，Up上移保证结构</span></span>
<span class="line"><span>        siftUp(i, e);</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 让当前节点和父节点比较，如果当前节点比较小，就上移~~~</span></span>
<span class="line"><span>private void siftUpUsingComparator(int k, E x) {</span></span>
<span class="line"><span>    while (k &gt; 0) {</span></span>
<span class="line"><span>        int parent = (k - 1) &gt;&gt;&gt; 1;</span></span>
<span class="line"><span>        Object e = queue[parent];</span></span>
<span class="line"><span>        if (comparator.compare(x, (E) e) &gt;= 0)</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        queue[k] = e;</span></span>
<span class="line"><span>        k = parent;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    queue[k] = x;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-2-取数据如何保证二叉堆结构" tabindex="-1">3.2 取数据如何保证二叉堆结构 <a class="header-anchor" href="#_3-2-取数据如何保证二叉堆结构" aria-label="Permalink to &quot;3.2 取数据如何保证二叉堆结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 取堆顶数据</span></span>
<span class="line"><span>public E poll() {</span></span>
<span class="line"><span>    // 没有数据返回null</span></span>
<span class="line"><span>    if (size == 0)</span></span>
<span class="line"><span>        return null;</span></span>
<span class="line"><span>    // 最后一个数据的索引</span></span>
<span class="line"><span>    int s = --size;</span></span>
<span class="line"><span>    // 需要全都的数据</span></span>
<span class="line"><span>    E result = (E) queue[0];</span></span>
<span class="line"><span>    // 取出最后一个数据</span></span>
<span class="line"><span>    E x = (E) queue[s];</span></span>
<span class="line"><span>    // 将最后一个数据置位null</span></span>
<span class="line"><span>    queue[s] = null;</span></span>
<span class="line"><span>    if (s != 0)</span></span>
<span class="line"><span>        // 下移保证安全</span></span>
<span class="line"><span>        siftDown(0, x);</span></span>
<span class="line"><span>    return result;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 堆顶数据下移，知道last数据可以存放的位置，然后替换即可</span></span>
<span class="line"><span>private void siftDownUsingComparator(int k, E x) {</span></span>
<span class="line"><span>    while (k &lt; half) {</span></span>
<span class="line"><span>        int child = (k &lt;&lt; 1) + 1;</span></span>
<span class="line"><span>        // 找到左子</span></span>
<span class="line"><span>        Object c = queue[child];</span></span>
<span class="line"><span>        int right = child + 1;</span></span>
<span class="line"><span>        if (right &lt; size &amp;&amp;</span></span>
<span class="line"><span>            comparator.compare((E) c, (E) queue[right]) &gt; 0)</span></span>
<span class="line"><span>            c = queue[child = right];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (comparator.compare(x, (E) c) &lt;= 0)</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        queue[k] = c;</span></span>
<span class="line"><span>        k = child;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    queue[k] = x;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="四、priorityblockingqueue" tabindex="-1">四、PriorityBlockingQueue <a class="header-anchor" href="#四、priorityblockingqueue" aria-label="Permalink to &quot;四、PriorityBlockingQueue&quot;">​</a></h3><p>这个阻塞的优先级队列的实现跟PriorityQueue基本一模一样，只是PriorityBlockingQueue基于Lock锁实现的多线程操作安全并且线程可以挂起阻塞的操作</p><p>PriorityBlockingQueue底层基于数组，并且可以扩容，不会基于condition挂起线程，读会阻塞。</p><h4 id="_4-1-写操作" tabindex="-1">4.1 写操作 <a class="header-anchor" href="#_4-1-写操作" aria-label="Permalink to &quot;4.1 写操作&quot;">​</a></h4><p>因为底层基于数组，并且可以扩容，所以写操作的put和poll(time,unit)的方式不会基于condition挂起线程。</p><p>并且是多线程基于CAS的方式争抢扩容的标识</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 所有添加都走着，没有await挂起的方式，</span></span>
<span class="line"><span>public boolean offer(E e) {</span></span>
<span class="line"><span>    if (e == null)</span></span>
<span class="line"><span>        throw new NullPointerException();</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    int n, cap;</span></span>
<span class="line"><span>    Object[] array;</span></span>
<span class="line"><span>    // 扩容，允许多线程并发扩容。一会看~~~</span></span>
<span class="line"><span>    while ((n = size) &gt;= (cap = (array = queue).length))</span></span>
<span class="line"><span>        tryGrow(array, cap);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        Comparator&lt;? super E&gt; cmp = comparator;</span></span>
<span class="line"><span>        if (cmp == null)</span></span>
<span class="line"><span>            //添加数据到二叉堆</span></span>
<span class="line"><span>            siftUpComparable(n, e, array);</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            siftUpUsingComparator(n, e, array, cmp);</span></span>
<span class="line"><span>        size = n + 1;</span></span>
<span class="line"><span>        // 唤醒读线程</span></span>
<span class="line"><span>        notEmpty.signal();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 跟PriorityQueue一样的上移操作</span></span>
<span class="line"><span>private static &lt;T&gt; void siftUpComparable(int k, T x, Object[] array) {</span></span>
<span class="line"><span>    Comparable&lt;? super T&gt; key = (Comparable&lt;? super T&gt;) x;</span></span>
<span class="line"><span>    while (k &gt; 0) {</span></span>
<span class="line"><span>        int parent = (k - 1) &gt;&gt;&gt; 1;</span></span>
<span class="line"><span>        Object e = array[parent];</span></span>
<span class="line"><span>        if (key.compareTo((T) e) &gt;= 0)</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        array[k] = e;</span></span>
<span class="line"><span>        k = parent;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    array[k] = key;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 尝试扩容</span></span>
<span class="line"><span>private void tryGrow(Object[] array, int oldCap) {</span></span>
<span class="line"><span>    // 允许多线程并发扩容的。（不是协助扩容），但是只有一个线程会成功，基于CAS的方式，避免并发问题</span></span>
<span class="line"><span>    lock.unlock();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Object[] newArray = null;</span></span>
<span class="line"><span>    // 线程将allocationSpinLock从0改为1，得到了扩容的权利，可以创建新数组</span></span>
<span class="line"><span>    if (allocationSpinLock == 0 &amp;&amp; UNSAFE.compareAndSwapInt(this, allocationSpinLockOffset,0, 1)) {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            // 计算新数组长度</span></span>
<span class="line"><span>            int newCap = oldCap + ((oldCap &lt; 64) ? (oldCap + 2) :  (oldCap &gt;&gt; 1));</span></span>
<span class="line"><span>            // 判断长度是否超过界限</span></span>
<span class="line"><span>            if (newCap - MAX_ARRAY_SIZE &gt; 0) {  </span></span>
<span class="line"><span>                int minCap = oldCap + 1;</span></span>
<span class="line"><span>                if (minCap &lt; 0 || minCap &gt; MAX_ARRAY_SIZE)</span></span>
<span class="line"><span>                    throw new OutOfMemoryError();</span></span>
<span class="line"><span>                newCap = MAX_ARRAY_SIZE;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            if (newCap &gt; oldCap &amp;&amp; queue == array)</span></span>
<span class="line"><span>                // 创建新数组</span></span>
<span class="line"><span>                newArray = new Object[newCap];</span></span>
<span class="line"><span>        } finally {</span></span>
<span class="line"><span>            allocationSpinLock = 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (newArray == null) </span></span>
<span class="line"><span>        // 如果newArray是null，说明当前线程没有执行扩容操作</span></span>
<span class="line"><span>        // 让出CPU时间片，尽量让扩容的线程先走完扩容操作</span></span>
<span class="line"><span>        Thread.yield();</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    if (newArray != null &amp;&amp; queue == array) {</span></span>
<span class="line"><span>        queue = newArray;</span></span>
<span class="line"><span>        // 扩容结束</span></span>
<span class="line"><span>        System.arraycopy(array, 0, newArray, 0, oldCap);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-2-读操作" tabindex="-1">4.2 读操作 <a class="header-anchor" href="#_4-2-读操作" aria-label="Permalink to &quot;4.2 读操作&quot;">​</a></h4><p>PriorityBlockingQueue的读操作，是允许使用condition挂起的，因为二叉堆可能没有数据。没有数据，就挂起呗~~</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public E poll() {</span></span>
<span class="line"><span>    // 基于lock锁保证安全，</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        return dequeue();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private E dequeue() {</span></span>
<span class="line"><span>    int n = size - 1;</span></span>
<span class="line"><span>    if (n &lt; 0)</span></span>
<span class="line"><span>        return null;</span></span>
<span class="line"><span>    else {</span></span>
<span class="line"><span>        Object[] array = queue;</span></span>
<span class="line"><span>        // 拿到堆顶数据</span></span>
<span class="line"><span>        E result = (E) array[0];</span></span>
<span class="line"><span>        E x = (E) array[n];</span></span>
<span class="line"><span>        array[n] = null;</span></span>
<span class="line"><span>        Comparator&lt;? super E&gt; cmp = comparator;</span></span>
<span class="line"><span>        if (cmp == null)</span></span>
<span class="line"><span>            // 保证结构，下移~~</span></span>
<span class="line"><span>            siftDownComparable(0, x, array, n);</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            siftDownUsingComparator(0, x, array, n, cmp);</span></span>
<span class="line"><span>        size = n;</span></span>
<span class="line"><span>        return result;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>public E take() throws InterruptedException {</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    E result;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        while ( (result = dequeue()) == null)</span></span>
<span class="line"><span>            notEmpty.await();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return result;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public E poll(long timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span>    long nanos = unit.toNanos(timeout);</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    E result;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        while ( (result = dequeue()) == null &amp;&amp; nanos &gt; 0)</span></span>
<span class="line"><span>            nanos = notEmpty.awaitNanos(nanos);</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return result;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="九、juc阻塞队列第二弹" tabindex="-1">九、<strong>JUC阻塞队列第二弹</strong> <a class="header-anchor" href="#九、juc阻塞队列第二弹" aria-label="Permalink to &quot;九、**JUC阻塞队列第二弹**&quot;">​</a></h1><h3 id="一、delayqueue" tabindex="-1">一、DelayQueue <a class="header-anchor" href="#一、delayqueue" aria-label="Permalink to &quot;一、DelayQueue&quot;">​</a></h3><p>在学习Delay的原理之前，先掌握应用。</p><p>如果需要掌握源码的话，需要对PriorityQueue有一定掌握，也就是二叉堆。</p><h4 id="_1-1-掌握delayqueue应用" tabindex="-1">1.1 掌握DelayQueue应用 <a class="header-anchor" href="#_1-1-掌握delayqueue应用" aria-label="Permalink to &quot;1.1 掌握DelayQueue应用&quot;">​</a></h4><p>DelayQueue是无界队列</p><p>延迟的操作，可以向延迟队列中追加任务，这个任务需要指定延迟时间。</p><p>只有延迟时间到了，才可以将任务从队列中获取出来。</p><p>任务可以指定延迟时间，所以需要任务满足一定的需求</p><p>发现DelayQueue中的任务需要实现Delayed接口，重写getDelay和compareTo方法</p><p>getDelay：任务什么时候可以出队列</p><p>compareTo：存放任务到队列时，放在二叉堆的哪个位置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class Task implements Delayed{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**  执行时间 （单位毫秒） */</span></span>
<span class="line"><span>    private Long time;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * @param name  任务名称</span></span>
<span class="line"><span>     * @param delayTime  传入延迟时间</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public Task(String name, Long delayTime) {</span></span>
<span class="line"><span>        this.name = name;</span></span>
<span class="line"><span>        this.time = System.currentTimeMillis() + delayTime;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /** 任务可以出队列的核心方法 */</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public long getDelay(TimeUnit unit) {</span></span>
<span class="line"><span>        return unit.convert(time - System.currentTimeMillis(),TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /** 通过这个方法，来比较，将任务存放到二叉堆的指定位置 */</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public int compareTo(Delayed o) {</span></span>
<span class="line"><span>        // 基于执行时间比较</span></span>
<span class="line"><span>        return (int) (this.time - ((Task)o).getTime());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>测试效果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    DelayQueue queue = new DelayQueue();</span></span>
<span class="line"><span>    queue.offer(new Task(&quot;A&quot;,4000L));</span></span>
<span class="line"><span>    queue.offer(new Task(&quot;B&quot;,2000L));</span></span>
<span class="line"><span>    queue.offer(new Task(&quot;C&quot;,3000L));</span></span>
<span class="line"><span>    queue.offer(new Task(&quot;D&quot;,1000L));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    System.out.println(queue.take());</span></span>
<span class="line"><span>    System.out.println(queue.take());</span></span>
<span class="line"><span>    System.out.println(queue.take());</span></span>
<span class="line"><span>    System.out.println(queue.take());</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_1-2-分析源码" tabindex="-1">1.2 分析源码 <a class="header-anchor" href="#_1-2-分析源码" aria-label="Permalink to &quot;1.2 分析源码&quot;">​</a></h4><p>首先，想掌握延迟队列的源码信息，你需要先掌握优先级队列。</p><p>PriorityQueue，这个优先级队列是基于二叉堆。</p><p>二叉堆跟二叉树结构很像，二叉堆就是满二叉树。</p><p>优先级队列是基于数组实现的， 在队列内部会对每个节点做排序</p><p>二叉堆存放数据的顺序是固定的，并且没插入一个数据，会基于上移操作保证小顶堆的结构</p><p>如果取出数据，要涉及到下移来保证小顶堆结构</p><p>延迟队列就是基于优先级队列实现的</p><p>看延迟队列的添加任务方法</p><p>因为DelayQueue是无界队列，空间不够会扩容，生产者不需要挂起线程，空间肯定可以存放下当前的任务节点</p><p>只需要查看offer即可，其他的方法也都是调用的offer</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 延迟队列，就这么一个添加任务的方法</span></span>
<span class="line"><span>public boolean offer(E e) {</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 调用优先级队列，添加任务</span></span>
<span class="line"><span>        q.offer(e);</span></span>
<span class="line"><span>        // 拿到第一个数据，看看我是不是第一个，如果是第一个，可能有消费者挂起了，唤醒一波</span></span>
<span class="line"><span>        if (q.peek() == e) {</span></span>
<span class="line"><span>            // 一会说！！！！</span></span>
<span class="line"><span>            leader = null;</span></span>
<span class="line"><span>            // condition啊，await挂起线程，signal唤醒线程</span></span>
<span class="line"><span>            available.signal();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // ok~返回true</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 这个是优先级队列的添加，延迟队列是基于优先级队列实现的功能</span></span>
<span class="line"><span>public boolean offer(E e) {</span></span>
<span class="line"><span>    if (e == null)</span></span>
<span class="line"><span>        throw new NullPointerException();</span></span>
<span class="line"><span>    modCount++;</span></span>
<span class="line"><span>    int i = size;</span></span>
<span class="line"><span>    // 空间不够，扩容数组</span></span>
<span class="line"><span>    if (i &gt;= queue.length)</span></span>
<span class="line"><span>        grow(i + 1);</span></span>
<span class="line"><span>    size = i + 1;</span></span>
<span class="line"><span>    if (i == 0)</span></span>
<span class="line"><span>        // 放第一个数据，不需要上移</span></span>
<span class="line"><span>        queue[0] = e;</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        // 不是一个数据，判断是否需要上移</span></span>
<span class="line"><span>        siftUp(i, e);</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>数据怎么从延迟队列拿出来的</p><p>浅尝的poll()</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 消费者浅尝一下拿数据，如果有数据，并且延迟时间已经到了，返回，否则啥也不干</span></span>
<span class="line"><span>public E poll() {</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    lock.lock();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 拿到堆顶数据</span></span>
<span class="line"><span>        E first = q.peek();</span></span>
<span class="line"><span>        // 如果没数据，或者数据的延迟时间没到，返回null</span></span>
<span class="line"><span>        if (first == null || first.getDelay(NANOSECONDS) &gt; 0)</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            // 如果有数据，并且时间到了，基于优先级队列，把任务取出来。  </span></span>
<span class="line"><span>            return q.poll();</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>浅尝一会的poll(time,unit)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 尝一小会~~~尝  timeout时间</span></span>
<span class="line"><span>public E poll(long timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span>    // 纳秒判断</span></span>
<span class="line"><span>    long nanos = unit.toNanos(timeout);</span></span>
<span class="line"><span>    final ReentrantLock lock = this.lock;</span></span>
<span class="line"><span>    // 这里加锁，允许中断。</span></span>
<span class="line"><span>    lock.lockInterruptibly();</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        for (;;) {</span></span>
<span class="line"><span>            // 拿堆顶</span></span>
<span class="line"><span>            E first = q.peek();</span></span>
<span class="line"><span>            // 没数据，判断等多久</span></span>
<span class="line"><span>            if (first == null) {</span></span>
<span class="line"><span>                if (nanos &lt;= 0)</span></span>
<span class="line"><span>                    // 时间没了，告辞！！！！</span></span>
<span class="line"><span>                    return null;</span></span>
<span class="line"><span>                else</span></span>
<span class="line"><span>                    // 时间还有，等一小会~~</span></span>
<span class="line"><span>                    nanos = available.awaitNanos(nanos);</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                // 必然有数据！！！！</span></span>
<span class="line"><span>                // 取出堆顶数据的剩余时间</span></span>
<span class="line"><span>                long delay = first.getDelay(NANOSECONDS);</span></span>
<span class="line"><span>                // 如果时间已经到位了，直接调用优先级队列，把数据取出来</span></span>
<span class="line"><span>                if (delay &lt;= 0)</span></span>
<span class="line"><span>                    return q.poll();</span></span>
<span class="line"><span>                // 再次判断等待时间</span></span>
<span class="line"><span>                if (nanos &lt;= 0)</span></span>
<span class="line"><span>                    // 不等，告辞！！！！！！！！！！！</span></span>
<span class="line"><span>                    return null;</span></span>
<span class="line"><span>                // 将临时变量置位null</span></span>
<span class="line"><span>                first = null; </span></span>
<span class="line"><span>                // 如果剩余的等待时间，小于任务的延迟时间，肯定拿不到数据的，等着玩，反正拿不到</span></span>
<span class="line"><span>                if (nanos &lt; delay || leader != null)</span></span>
<span class="line"><span>                    nanos = available.awaitNanos(nanos);</span></span>
<span class="line"><span>                else {</span></span>
<span class="line"><span>                    // 我等待的时间内，必然可以拿到数据，并且没有leader</span></span>
<span class="line"><span>                    Thread thisThread = Thread.currentThread();</span></span>
<span class="line"><span>                    // 将当前线程置位leader，说明我是第一个在这等待数据的线程！！！！</span></span>
<span class="line"><span>                    leader = thisThread;</span></span>
<span class="line"><span>                    try {</span></span>
<span class="line"><span>                        // 当前线程先挂起，挂起任务剩余的延迟时间，会释放锁！</span></span>
<span class="line"><span>                        long timeLeft = available.awaitNanos(delay);</span></span>
<span class="line"><span>                        // 重新计算剩余的等待时间</span></span>
<span class="line"><span>                        nanos -= delay - timeLeft;</span></span>
<span class="line"><span>                    } finally {</span></span>
<span class="line"><span>                        // 将leader置位null</span></span>
<span class="line"><span>                        if (leader == thisThread)</span></span>
<span class="line"><span>                            leader = null;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 如果leader为null，并且堆顶有数据，执行唤醒操作</span></span>
<span class="line"><span>        if (leader == null &amp;&amp; q.peek() != null)</span></span>
<span class="line"><span>            available.signal();</span></span>
<span class="line"><span>        lock.unlock();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>而take方法，会调用await()，一致阻塞，直到拿到数据。</p><p>与poll(time,unit)的区别是，poll(time,unit)会计算剩余额的阻塞时间，take不会。</p><hr><p>首先知道了DelayQueue如何用代码实现，首先节点就是任务必须实现Delayed接口，重写任务出队的时间(getDelay)以及任务的排序方式(compareTo)</p><p>入队：入队只有一个方法，就是offer，因为DelayQueue是无界队列，所以生产者是不需要阻塞的</p><p>出队：</p><ul><li><p>poll：直接拿堆顶数据，堆顶的延迟时间到了，直接返回任务，如果没到时间，返回null。</p></li><li><p>poll(time,unit)：</p></li><li><p>直接拿堆顶数据，</p></li><li><p>如果为null，或者阻塞时间已经到了，直接告辞！</p></li><li><p>如果不为null</p></li><li><p>并且延迟时间到了，返回数据</p></li><li><p>如果数据时间没到，查看阻塞剩余的时间到了么，到了直接返回null</p></li><li><p>如果数据的延迟时间没到</p></li><li><p>如果阻塞时间小于延迟时间，或者已经有leader了，直接等待阻塞时间，等待被唤醒即可</p></li><li><p>当前阻塞时间大于等于延迟时间，并且leader为null，这是就阻塞延迟时间即可</p></li></ul><h3 id="二、synchronousqueue" tabindex="-1">二、SynchronousQueue <a class="header-anchor" href="#二、synchronousqueue" aria-label="Permalink to &quot;二、SynchronousQueue&quot;">​</a></h3><h4 id="_2-1-介绍-应用" tabindex="-1">2.1 介绍&amp;应用 <a class="header-anchor" href="#_2-1-介绍-应用" aria-label="Permalink to &quot;2.1 介绍&amp;应用&quot;">​</a></h4><p>SynchronousQueue和其他阻塞队列有点区别，但是也是阻塞的！</p><p>SynchronousQueue并不存储数据，队列的长度是0，一个生产者扔数据到SynchronousQueue后，必须等待消费者拿走这个数据才可以。</p><p>跟Exchanger很像，Exchanger是两个线程交换数据，SynchronousQueue是传递数据，不是交换</p><p>应用的方向是线程间的通讯，可以使用。</p><p>使用的方法：</p><p>offer()：拿着数据到了SynchronousQueue，如果恰巧有消费者在等待拿数据，配对成功！</p><p>offer(time,unit)：着数据到了SynchronousQueue，可以等一会，如果期间有消费者来了，配对成功！</p><p>put()：着数据到了SynchronousQueue，死等，直到消费者来了，或者被中断了。</p><p>poll，poll(time,unit)，take，你懂得！</p><p>浅尝一下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    SynchronousQueue queue = new SynchronousQueue();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    new  Thread(() -&gt; {</span></span>
<span class="line"><span>        User user = new User();</span></span>
<span class="line"><span>        user.setName(&quot;jack&amp;rose&quot;);</span></span>
<span class="line"><span>        System.out.println(&quot;publisher：&quot; + user);</span></span>
<span class="line"><span>        queue.offer(user);</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Object user = queue.take();</span></span>
<span class="line"><span>            System.out.println(&quot;consumer：&quot; + user);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-1-核心内容" tabindex="-1">2.1 核心内容 <a class="header-anchor" href="#_2-1-核心内容" aria-label="Permalink to &quot;2.1 核心内容&quot;">​</a></h4><p>首先想要掌握SynchronousQueue，必须了解Transferer。</p><p>因为SynchronousQueue无论是消费者还是生产者，都用到了Transferer中的transfer方法</p><p>生产者调用transfer方法，需要传递一个参数，也就是数据</p><p>消费者调用transfer方法，第一个参数传递为null，代表获取数据</p><p>Transferer有两个实现，分别对应了SynchronousQueue的公平操作和不公平操作</p><ul><li><p>TransferQueue代表公平处理方式</p></li><li><p>TransferStack代表不公平处理方式</p></li></ul><p>查看TransferQueue内部的实现，查看核心属性</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>//这个是 TransferQueue 中的每一个节点</span></span>
<span class="line"><span>static final class QNode {</span></span>
<span class="line"><span>    volatile QNode next;   </span></span>
<span class="line"><span>    volatile Object item;   </span></span>
<span class="line"><span>    // 如果执行了put、take方法时，需要挂起线程，而挂起的就是这个线程</span></span>
<span class="line"><span>    volatile Thread waiter;   </span></span>
<span class="line"><span>    // true：生产者</span></span>
<span class="line"><span>    // false：消费者</span></span>
<span class="line"><span>    final boolean isData;</span></span>
<span class="line"><span>}   </span></span>
<span class="line"><span>/** Head of queue */</span></span>
<span class="line"><span>transient volatile QNode head;</span></span>
<span class="line"><span>/** Tail of queue */</span></span>
<span class="line"><span>transient volatile QNode tail;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 无参构造</span></span>
<span class="line"><span>TransferQueue() {</span></span>
<span class="line"><span>    // 会先初始化一个QNode，作为head和tail的指向，并且这个QNode不包含线程信息，就一个伪的头结点</span></span>
<span class="line"><span>    QNode h = new QNode(null, false); // initialize to dummy node.</span></span>
<span class="line"><span>    head = h;</span></span>
<span class="line"><span>    tail = h;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-3-生产者和消费者执行套路" tabindex="-1">2.3 生产者和消费者执行套路 <a class="header-anchor" href="#_2-3-生产者和消费者执行套路" aria-label="Permalink to &quot;2.3 生产者和消费者执行套路&quot;">​</a></h4><p>生产者：执行transfer方法时，会传递值</p><ul><li><p>offer：传递的nacos为0</p></li><li><p>offer浅等：传递的nacos是指定数值</p></li><li><p>put：timed设置为false</p></li></ul><p>消费者：执行transfer方法时，第一个参数会设置为null</p><ul><li>poll，poll浅等，take方法与生产者一致。</li></ul><p>分析TransferQueue的transfer方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 消费者和生产者都会调用这个房</span></span>
<span class="line"><span>E transfer(E e, boolean timed, long nanos) {</span></span>
<span class="line"><span>    // 声明QNode</span></span>
<span class="line"><span>    QNode s = null; </span></span>
<span class="line"><span>    // 判断当前操作的是消费者还是生产者</span></span>
<span class="line"><span>    // true：生</span></span>
<span class="line"><span>    // false：消</span></span>
<span class="line"><span>    boolean isData = (e != null);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 拿到头尾节点</span></span>
<span class="line"><span>        QNode t = tail;</span></span>
<span class="line"><span>        QNode h = head;</span></span>
<span class="line"><span>        // 健壮性判断</span></span>
<span class="line"><span>        if (t == null || h == null)   </span></span>
<span class="line"><span>            continue;   </span></span>
<span class="line"><span>        // 如果头和尾相等。</span></span>
<span class="line"><span>        // 在当前的QNode单向链表中，要么都存放生产者，要么都存放消费者。</span></span>
<span class="line"><span>        // 所以第二个判断是，如果队列中有Qnode，查看我当前的isData是否和队列中Qnode的isData一致，一致挂上去</span></span>
<span class="line"><span>        if (h == t || t.isData == isData) { </span></span>
<span class="line"><span>            // 拿到t.next</span></span>
<span class="line"><span>            QNode tn = t.next;</span></span>
<span class="line"><span>            // --------------------避免并发-----------------------------</span></span>
<span class="line"><span>            // 出现了并发操作，重新执行for循环</span></span>
<span class="line"><span>            if (t != tail)  </span></span>
<span class="line"><span>                continue;</span></span>
<span class="line"><span>            // 如果尾节点的next不为null，有并发情况</span></span>
<span class="line"><span>            if (tn != null) {   </span></span>
<span class="line"><span>                // 直接CAS操作，将tail的next节点设置为tail节点  </span></span>
<span class="line"><span>                advanceTail(t, tn);</span></span>
<span class="line"><span>                // 重新执行for循环</span></span>
<span class="line"><span>                continue;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // timed == true： offer，poll</span></span>
<span class="line"><span>            // 进来之后没有立即配对，那就直接告辞！</span></span>
<span class="line"><span>            if (timed &amp;&amp; nanos &lt;= 0)  </span></span>
<span class="line"><span>                return null;</span></span>
<span class="line"><span>            // 把当前的QNode初始化。</span></span>
<span class="line"><span>            if (s == null)</span></span>
<span class="line"><span>                s = new QNode(e, isData);</span></span>
<span class="line"><span>            // 将tail的next指向的当前QNode</span></span>
<span class="line"><span>            if (!t.casNext(null, s))  </span></span>
<span class="line"><span>                continue;</span></span>
<span class="line"><span>            // 将tail指向当前Qnode</span></span>
<span class="line"><span>            advanceTail(t, s);  </span></span>
<span class="line"><span>            // 等！！！（挂起线程），直到被唤醒，拿到指定的item数据</span></span>
<span class="line"><span>            Object x = awaitFulfill(s, e, timed, nanos);</span></span>
<span class="line"><span>            // 拿到的数据和当前QNode一致，当前节点取消了</span></span>
<span class="line"><span>            if (x == s) {  </span></span>
<span class="line"><span>                // 清除当前节点，告辞！！！   </span></span>
<span class="line"><span>                clean(t, s);</span></span>
<span class="line"><span>                return null;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 判断是否还在队列中</span></span>
<span class="line"><span>            if (!s.isOffList()) {  </span></span>
<span class="line"><span>                // 将当前节点设置为新的head</span></span>
<span class="line"><span>                advanceHead(t, s);  </span></span>
<span class="line"><span>                if (x != null)  </span></span>
<span class="line"><span>                    // 我拿到数据了，设置item为当前节点对象</span></span>
<span class="line"><span>                    s.item = s;</span></span>
<span class="line"><span>                // 线程置位null</span></span>
<span class="line"><span>                s.waiter = null;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 返回数据</span></span>
<span class="line"><span>            return (x != null) ? (E)x : e;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        } else {   </span></span>
<span class="line"><span>            // 如果逻辑到这，需要跟队列中的Qnode做配对。</span></span>
<span class="line"><span>            // 拿到head的next，m</span></span>
<span class="line"><span>            QNode m = h.next;   </span></span>
<span class="line"><span>            // 并发问题，重新循环</span></span>
<span class="line"><span>            if (t != tail || m == null || h != head)</span></span>
<span class="line"><span>                continue;  </span></span>
<span class="line"><span>            // 拿到m中的数据。</span></span>
<span class="line"><span>            // x == null：队列是消费者</span></span>
<span class="line"><span>            // x != null：队列是生产者</span></span>
<span class="line"><span>            Object x = m.item;</span></span>
<span class="line"><span>            // 1、出现并发问题，装车了</span></span>
<span class="line"><span>            // 2、取出的数据，竟然是节点本身，代表节点被取消！</span></span>
<span class="line"><span>            // 3、开始交换数据，将当前方法传入数据，替换到head的next，如果操作失败，并发问题</span></span>
<span class="line"><span>            if (isData == (x != null) ||  x == m || !m.casItem(x, e)) {  </span></span>
<span class="line"><span>                // 配对失败，重新替换head节点   </span></span>
<span class="line"><span>                advanceHead(h, m);  </span></span>
<span class="line"><span>                // 重新for循环  </span></span>
<span class="line"><span>                continue;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 操作成功，也要替换head</span></span>
<span class="line"><span>            advanceHead(h, m);  </span></span>
<span class="line"><span>            // 唤醒队列中的head的next节点的线程。   </span></span>
<span class="line"><span>            LockSupport.unpark(m.waiter);</span></span>
<span class="line"><span>            // 操作成功，返回数据！</span></span>
<span class="line"><span>            return (x != null) ? (E)x : e;</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="十、scheduledthreadpoolexecutor" tabindex="-1">十、<strong>ScheduledThreadPoolExecutor</strong> <a class="header-anchor" href="#十、scheduledthreadpoolexecutor" aria-label="Permalink to &quot;十、**ScheduledThreadPoolExecutor**&quot;">​</a></h1><h3 id="一、scheduledthreadpoolexecutor介绍-应用" tabindex="-1">一、ScheduledThreadPoolExecutor介绍&amp;应用 <a class="header-anchor" href="#一、scheduledthreadpoolexecutor介绍-应用" aria-label="Permalink to &quot;一、ScheduledThreadPoolExecutor介绍&amp;应用&quot;">​</a></h3><p>ScheduledThreadPoolExecutor是ThreadPoolExecutor的一个子类，在线程池的基础上实现了延迟执行任务以及周期性执行任务的功能。</p><p>Java最早提供的是Timer类执行定时任务，串行的，不靠谱，会影响到其他的任务执行，在不采用第三方框架时，需要执行定时任务，ScheduledThreadPoolExecutor是比较好的选择。</p><p>ScheduledThreadPoolExecutor就是在线程池的基础上实现的定时执行任务的功能。</p><p>ScheduledThreadPoolExecutor提供了比较常用的四种方法执行任务：（不说Callable）</p><ul><li><p>execute：跟普通线程池执行没区别。</p></li><li><p>schedule：可以指定延迟时间，一次性执行任务。</p></li><li><p>scheduleAtFixedRate：可以让任务在固定的周期下执行。（任务的处理时间，不影响下次执行时间，如果任务的执行时间超过了设置的延迟时间，按照时间最长的计算）</p></li><li><p>scheduleWithFixedDelay：可以让任务在固定的周期下执行。（任务的处理时间，影响下次执行时间）</p></li></ul><p>应用效果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(10);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //1. execute</span></span>
<span class="line"><span>    executor.execute(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;execute&quot;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //2. schedule</span></span>
<span class="line"><span>    executor.schedule(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;schedule&quot;);</span></span>
<span class="line"><span>    },2000,TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //3. AtFixedRate</span></span>
<span class="line"><span>    executor.scheduleAtFixedRate(() -&gt; {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Thread.sleep(4000);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        System.out.println(&quot;at:&quot; + System.currentTimeMillis());</span></span>
<span class="line"><span>    },3000,2000,TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //4. WithFixedDelay</span></span>
<span class="line"><span>    executor.scheduleWithFixedDelay(() -&gt; {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            Thread.sleep(5000);</span></span>
<span class="line"><span>        } catch (InterruptedException e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        System.out.println(&quot;with:&quot; + System.currentTimeMillis());</span></span>
<span class="line"><span>    },3000,2000,TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果实际开发应用需要使用到定人任务，更推荐一些开源你的框架，比如Quartz，XXL-job，Elastic-Job</p><p>因为corn表达式，对时间的控制更加方便！</p><h3 id="二、schedulethreadpoolexecutor底层结构" tabindex="-1">二、ScheduleThreadPoolExecutor底层结构 <a class="header-anchor" href="#二、schedulethreadpoolexecutor底层结构" aria-label="Permalink to &quot;二、ScheduleThreadPoolExecutor底层结构&quot;">​</a></h3><p>两个核心内容</p><h4 id="_2-1-scheduledfuturetask" tabindex="-1">2.1 ScheduledFutureTask <a class="header-anchor" href="#_2-1-scheduledfuturetask" aria-label="Permalink to &quot;2.1 ScheduledFutureTask&quot;">​</a></h4><p>首先看到了核心内容，ScheduledFutureTask间接的实现了Delayed接口，让任务可以放到延迟队列中，并且基于二叉堆做排序，即将执行的时间越短，就往堆顶扔，查看核心内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private class ScheduledFutureTask&lt;V&gt;</span></span>
<span class="line"><span>        extends FutureTask&lt;V&gt; implements RunnableScheduledFuture&lt;V&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 就是计数器，每个任务进来时，都会有一个全局唯一的序号。</span></span>
<span class="line"><span>    // 如果任务的执行时间一模一样，比对sequenceNumber</span></span>
<span class="line"><span>    private final long sequenceNumber;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 任务执行的时间，单位是纳秒</span></span>
<span class="line"><span>    private long time;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /*</span></span>
<span class="line"><span>     * period == 0：表示一次性执行的任务</span></span>
<span class="line"><span>     * period &gt; 0：表示使用的是At！</span></span>
<span class="line"><span>     * period &lt; 0：表示使用的是With！</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    private final long period;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 周期性实行任务时，引用具体任务，方便后面重新扔到阻塞队列</span></span>
<span class="line"><span>    RunnableScheduledFuture&lt;V&gt; outerTask = this;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 有参构造。schedule时使用当前有参重载封装任务！</span></span>
<span class="line"><span>    ScheduledFutureTask(Runnable r, V result, long ns) {</span></span>
<span class="line"><span>        super(r, result);</span></span>
<span class="line"><span>        this.time = ns;</span></span>
<span class="line"><span>        this.period = 0;</span></span>
<span class="line"><span>        this.sequenceNumber = sequencer.getAndIncrement();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // At,With时，使用当前有参重载封装任务！</span></span>
<span class="line"><span>    ScheduledFutureTask(Runnable r, V result, long ns, long period) {</span></span>
<span class="line"><span>        super(r, result);</span></span>
<span class="line"><span>        this.time = ns;</span></span>
<span class="line"><span>        this.period = period;</span></span>
<span class="line"><span>        this.sequenceNumber = sequencer.getAndIncrement();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 不考虑这个，有返回结果</span></span>
<span class="line"><span>    ScheduledFutureTask(Callable&lt;V&gt; callable, long ns) {</span></span>
<span class="line"><span>        super(callable);</span></span>
<span class="line"><span>        this.time = ns;</span></span>
<span class="line"><span>        this.period = 0;</span></span>
<span class="line"><span>        this.sequenceNumber = sequencer.getAndIncrement();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 实现Delayed接口重写的方法，执行的时间</span></span>
<span class="line"><span>    public long getDelay(TimeUnit unit) {</span></span>
<span class="line"><span>        return unit.convert(time - now(), NANOSECONDS);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 实现Delayed接口重写的方法，比较的方式，放在二叉堆内部</span></span>
<span class="line"><span>    public int compareTo(Delayed other) {</span></span>
<span class="line"><span>        if (other == this) // compare zero if same object</span></span>
<span class="line"><span>            return 0;</span></span>
<span class="line"><span>        if (other instanceof ScheduledFutureTask) {</span></span>
<span class="line"><span>            ScheduledFutureTask&lt;?&gt; x = (ScheduledFutureTask&lt;?&gt;)other;</span></span>
<span class="line"><span>            long diff = time - x.time;</span></span>
<span class="line"><span>            if (diff &lt; 0)</span></span>
<span class="line"><span>                return -1;</span></span>
<span class="line"><span>            else if (diff &gt; 0)</span></span>
<span class="line"><span>                return 1;</span></span>
<span class="line"><span>            else if (sequenceNumber &lt; x.sequenceNumber)</span></span>
<span class="line"><span>                return -1;</span></span>
<span class="line"><span>            else</span></span>
<span class="line"><span>                return 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        long diff = getDelay(NANOSECONDS) - other.getDelay(NANOSECONDS);</span></span>
<span class="line"><span>        return (diff &lt; 0) ? -1 : (diff &gt; 0) ? 1 : 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 判断是否是周期执行</span></span>
<span class="line"><span>    public boolean isPeriodic() {</span></span>
<span class="line"><span>        return period != 0;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 省略部分代码</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-2-delayedworkqueue" tabindex="-1">2.2 DelayedWorkQueue <a class="header-anchor" href="#_2-2-delayedworkqueue" aria-label="Permalink to &quot;2.2 DelayedWorkQueue&quot;">​</a></h4><p>阿巴阿巴！！！！</p><h3 id="三、execute方法分析" tabindex="-1">三、execute方法分析 <a class="header-anchor" href="#三、execute方法分析" aria-label="Permalink to &quot;三、execute方法分析&quot;">​</a></h3><p>这个方法是白给的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void execute(Runnable command) {</span></span>
<span class="line"><span>    schedule(command, 0, NANOSECONDS);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>查看schedule即可</p><h3 id="四、schedule方法分析" tabindex="-1">四、schedule方法分析 <a class="header-anchor" href="#四、schedule方法分析" aria-label="Permalink to &quot;四、schedule方法分析&quot;">​</a></h3><p><strong>封装任务-放延迟队列-创建线程准备执行</strong></p><p>将传入的command任务和延迟执行的时间封装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 分析定时任务线程的schedule，延迟一段时间，执行一次command任务</span></span>
<span class="line"><span>public ScheduledFuture&lt;?&gt; schedule(Runnable command, long delay,TimeUnit unit) {</span></span>
<span class="line"><span>    // 非空判断！</span></span>
<span class="line"><span>    if (command == null || unit == null)</span></span>
<span class="line"><span>        throw new NullPointerException();</span></span>
<span class="line"><span>    // 封装任务，将普通的command封住为ScheduledFutureTask、</span></span>
<span class="line"><span>    // decorateTask方法默认情况下，什么都没做，就是返回了ScheduledFutureTask</span></span>
<span class="line"><span>    // decorateTask方法是线程池给你提供的扩展方法，可以在这个位置修改任务需要执行的具体细节</span></span>
<span class="line"><span>    RunnableScheduledFuture&lt;?&gt; t = decorateTask(command,new ScheduledFutureTask&lt;Void&gt;(command, null,triggerTime(delay, unit)));</span></span>
<span class="line"><span>    // 延迟执行</span></span>
<span class="line"><span>    delayedExecute(t);</span></span>
<span class="line"><span>    return t;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 查看triggerTime</span></span>
<span class="line"><span>private long triggerTime(long delay, TimeUnit unit) {</span></span>
<span class="line"><span>    return triggerTime(unit.toNanos((delay &lt; 0) ? 0 : delay));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 查看triggerTime方法重载，返回当前任务要执行的系统时间。</span></span>
<span class="line"><span>long triggerTime(long delay) {</span></span>
<span class="line"><span>    // 判断delay时间是否小于Long.MAX_VALUE &gt;&gt; 1，</span></span>
<span class="line"><span>    // 如果小于,正常计算执行的时间</span></span>
<span class="line"><span>    // 如果大于，可能出现超过long的取值范围问题，做额外处理</span></span>
<span class="line"><span>    return now() + ((delay &lt; (Long.MAX_VALUE &gt;&gt; 1)) ? delay : overflowFree(delay));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 将command任务封装为ScheduledFutureTask</span></span>
<span class="line"><span>ScheduledFutureTask(Runnable r, V result, long ns) {</span></span>
<span class="line"><span>    super(r, result);</span></span>
<span class="line"><span>    // 任务要执行的系统时间</span></span>
<span class="line"><span>    this.time = ns;</span></span>
<span class="line"><span>    // 任务是否是周期性执行</span></span>
<span class="line"><span>    this.period = 0;</span></span>
<span class="line"><span>    // 基于AtomicLong计算序列化。</span></span>
<span class="line"><span>    this.sequenceNumber = sequencer.getAndIncrement();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ScheduleThreadPoolExecutor提供的一个扩展方法，可以在这个位置细粒度的修改任务执行的细节。</span></span>
<span class="line"><span>protected &lt;V&gt; RunnableScheduledFuture&lt;V&gt; decorateTask(Runnable runnable, RunnableScheduledFuture&lt;V&gt; task) {</span></span>
<span class="line"><span>    return task;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>执行延迟任务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 分析定时任务线程的schedule，延迟一段时间，执行一次command任务</span></span>
<span class="line"><span>public ScheduledFuture&lt;?&gt; schedule(Runnable command, long delay,TimeUnit unit) {</span></span>
<span class="line"><span>    // 非空判断！</span></span>
<span class="line"><span>    if (command == null || unit == null)</span></span>
<span class="line"><span>        throw new NullPointerException();</span></span>
<span class="line"><span>    // 封装任务，将普通的command封住为ScheduledFutureTask、</span></span>
<span class="line"><span>    // decorateTask方法默认情况下，什么都没做，就是返回了ScheduledFutureTask</span></span>
<span class="line"><span>    // decorateTask方法是线程池给你提供的扩展方法，可以在这个位置修改任务需要执行的具体细节</span></span>
<span class="line"><span>    RunnableScheduledFuture&lt;?&gt; t = decorateTask(command,new ScheduledFutureTask&lt;Void&gt;(command, null,triggerTime(delay, unit)));</span></span>
<span class="line"><span>    // 延迟执行</span></span>
<span class="line"><span>    delayedExecute(t);</span></span>
<span class="line"><span>    return t;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 延迟执行！</span></span>
<span class="line"><span>private void delayedExecute(RunnableScheduledFuture&lt;?&gt; task) {</span></span>
<span class="line"><span>    // 查看线程池是不是已经不是RUNNING状态</span></span>
<span class="line"><span>    if (isShutdown())</span></span>
<span class="line"><span>        // 如果是，拒绝策略。</span></span>
<span class="line"><span>        reject(task);</span></span>
<span class="line"><span>    else {</span></span>
<span class="line"><span>        // 到这说明线程池状态是RUNNING</span></span>
<span class="line"><span>        // 调用阻塞队列，将任务添加进去，将任务扔到了延迟队列中（二叉堆）</span></span>
<span class="line"><span>        // 在添加任务到延迟队列的数组时，会记录当前任务所在的索引位置，方便取消任务时，从数组中移除</span></span>
<span class="line"><span>        // heapIndex方便取消任务</span></span>
<span class="line"><span>        super.getQueue().add(task);</span></span>
<span class="line"><span>        // 判断线程池是否不是RUNNING状态，如果不是RUNNING，就根据策略决定任务是否执行</span></span>
<span class="line"><span>        // 如果任务不需要执行了，调用remove方法，将任务从延迟队列移除，并且在if内部还会取消任务</span></span>
<span class="line"><span>        if (isShutdown() &amp;&amp; !canRunInCurrentRunState(task.isPeriodic()) &amp;&amp; remove(task))</span></span>
<span class="line"><span>            task.cancel(false);</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            // 线程池状态没毛病，任务是需要执行的！</span></span>
<span class="line"><span>            ensurePrestart();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 如果任务添加到了阻塞队列中，忽然线程池不是RUNNING状态，那么此时这个任务是否执行？</span></span>
<span class="line"><span>// periodic - true：代表是周期性执行的任务</span></span>
<span class="line"><span>// periodic - false：代表是一次性的延迟任务</span></span>
<span class="line"><span>boolean canRunInCurrentRunState(boolean periodic) {</span></span>
<span class="line"><span>    return isRunningOrShutdown(periodic ?</span></span>
<span class="line"><span>                               continueExistingPeriodicTasksAfterShutdown :</span></span>
<span class="line"><span>                               executeExistingDelayedTasksAfterShutdown);</span></span>
<span class="line"><span>    // 默认情况下，如果任务扔到了延迟队列中，有两个策略</span></span>
<span class="line"><span>    // 如果任务是周期性执行的，默认为false，</span></span>
<span class="line"><span>    // 如果任务是一次性的延迟任务，默认为true</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 判断当前任务到底执行不执行</span></span>
<span class="line"><span>final boolean isRunningOrShutdown(boolean shutdownOK) {</span></span>
<span class="line"><span>    // 重新拿到线程池的ctl</span></span>
<span class="line"><span>    int rs = runStateOf(ctl.get());</span></span>
<span class="line"><span>    // 如果线程池是RUNNING，返回true</span></span>
<span class="line"><span>    // 如果线程池状态是SHUTDOWN，那么就配合策略返回true、false</span></span>
<span class="line"><span>    return rs == RUNNING || (rs == SHUTDOWN &amp;&amp; shutdownOK);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 准备执行任务</span></span>
<span class="line"><span>void ensurePrestart() {</span></span>
<span class="line"><span>    // 获取线程池中的工作线程个数。</span></span>
<span class="line"><span>    int wc = workerCountOf(ctl.get());</span></span>
<span class="line"><span>    // 如果工作线程个数，小于核心线程数，</span></span>
<span class="line"><span>    if (wc &lt; corePoolSize)</span></span>
<span class="line"><span>        // 创建核心线程，一致在阻塞队列的位置take，等待拿任务执行</span></span>
<span class="line"><span>        addWorker(null, true);</span></span>
<span class="line"><span>    // 如果工作线程数不小于核心线程，但是值为0，创建非核心线程执行任务</span></span>
<span class="line"><span>    else if (wc == 0)</span></span>
<span class="line"><span>        // 创建非核心线程处理阻塞队列任务，而且只要阻塞队列没有任务了，当前线程立即销毁</span></span>
<span class="line"><span>        addWorker(null, false);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>查看任务放到延迟队列后，是如何被工作线程取出来执行的</p><p>执行addWorker方法，会创建一个工作线程，工作线程在创建成功后，会执行start方法。在start方法执行后，会调用Worker的run方法，最终执行了runWorker方法，在runWorker方法中会在阻塞队列的位置执行take方法一直阻塞拿Runnable任务，拿到任务后就返回，然后执行。</p><p>所以需要查看的就是延迟队列的take方法，套路和之前讲的DelayQueue没有区别</p><p>在拿到任务后，会执行任务，也就是执行任务的run方法。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 执行任务</span></span>
<span class="line"><span>public void run() {</span></span>
<span class="line"><span>    // 获取任务是否是周期执行</span></span>
<span class="line"><span>    // true：周期执行</span></span>
<span class="line"><span>    // false：一次的延迟执行</span></span>
<span class="line"><span>    boolean periodic = isPeriodic();</span></span>
<span class="line"><span>    // 再次判断线程池状态是否不是RUNNING，如果不是RUNNING，并且SHUTDOWN情况也不允许执行，或者是STOP状态</span></span>
<span class="line"><span>    if (!canRunInCurrentRunState(periodic))</span></span>
<span class="line"><span>        // 取消任务</span></span>
<span class="line"><span>        cancel(false);</span></span>
<span class="line"><span>    else if (!periodic)</span></span>
<span class="line"><span>        // 当前任务是一次性的延迟执行。执行任务具体的run方法，执行完，没了………………</span></span>
<span class="line"><span>        ScheduledFutureTask.super.run();</span></span>
<span class="line"><span>    // 后面是周期执行、省略部分代码…………</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="五、scheduleatfixedrate和schedulewithfixeddelay分析" tabindex="-1">五、scheduleAtFixedRate和scheduleWithFixedDelay分析 <a class="header-anchor" href="#五、scheduleatfixedrate和schedulewithfixeddelay分析" aria-label="Permalink to &quot;五、scheduleAtFixedRate和scheduleWithFixedDelay分析&quot;">​</a></h3><p>在执行方法的初期，封装任务时：</p><ul><li><p>At会将period设置为正数，代表固定周期执行表</p></li><li><p>With会将period设置为负数，代表在执行任务完毕后，再计算下次执行的时间</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 固定周期执行任务，如果任务的执行时间，超过周期，任务执行完，立即执行下一次任务。</span></span>
<span class="line"><span>public ScheduledFuture&lt;?&gt; scheduleAtFixedRate(</span></span>
<span class="line"><span>                        Runnable command,    // 具体任务</span></span>
<span class="line"><span>                        long initialDelay,   // 第一次执行的时间</span></span>
<span class="line"><span>                        long period,         // 周期执行时间</span></span>
<span class="line"><span>                        TimeUnit unit) {     // 时间单位</span></span>
<span class="line"><span>    // 阿巴阿巴~~~</span></span>
<span class="line"><span>    if (command == null || unit == null)</span></span>
<span class="line"><span>        throw new NullPointerException();</span></span>
<span class="line"><span>    // 如果传递的周期小于等于0，直接抛异常</span></span>
<span class="line"><span>    if (period &lt;= 0)</span></span>
<span class="line"><span>        throw new IllegalArgumentException();</span></span>
<span class="line"><span>    ScheduledFutureTask&lt;Void&gt; sft =</span></span>
<span class="line"><span>        new ScheduledFutureTask&lt;Void&gt;(command, null, triggerTime(initialDelay, unit),</span></span>
<span class="line"><span>                                      unit.toNanos(period));</span></span>
<span class="line"><span>    // 扩展</span></span>
<span class="line"><span>    RunnableScheduledFuture&lt;Void&gt; t = decorateTask(command, sft);</span></span>
<span class="line"><span>    // 将任务设置给outerTask属性，方便后期重新扔到延迟队列</span></span>
<span class="line"><span>    sft.outerTask = t;</span></span>
<span class="line"><span>    // 嗯哼~</span></span>
<span class="line"><span>    delayedExecute(t);</span></span>
<span class="line"><span>    return t;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 固定周期执行任务，会在任务执行完毕后，再计算下次执行的时间。</span></span>
<span class="line"><span>public ScheduledFuture&lt;?&gt; scheduleWithFixedDelay(Runnable command,</span></span>
<span class="line"><span>                                                 long initialDelay,</span></span>
<span class="line"><span>                                                 long delay,</span></span>
<span class="line"><span>                                                 TimeUnit unit) {</span></span>
<span class="line"><span>    if (command == null || unit == null)</span></span>
<span class="line"><span>        throw new NullPointerException();</span></span>
<span class="line"><span>    if (delay &lt;= 0)</span></span>
<span class="line"><span>        throw new IllegalArgumentException();</span></span>
<span class="line"><span>    ScheduledFutureTask&lt;Void&gt; sft =</span></span>
<span class="line"><span>        new ScheduledFutureTask&lt;Void&gt;(command, null, triggerTime(initialDelay, unit),</span></span>
<span class="line"><span>                                      unit.toNanos(-delay));</span></span>
<span class="line"><span>    RunnableScheduledFuture&lt;Void&gt; t = decorateTask(command, sft);</span></span>
<span class="line"><span>    sft.outerTask = t;</span></span>
<span class="line"><span>    delayedExecute(t);</span></span>
<span class="line"><span>    return t;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>最终两个方法都会调用delayedExecute方法区将任务扔到阻塞队列，并尝试是否需要构建工作线程，从而执行任务</p><p>工作线程会监听延迟队列，拿到任务后会调用任务的run方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void run() {</span></span>
<span class="line"><span>    // 查看At和With可确定任务是周期执行</span></span>
<span class="line"><span>    boolean periodic = isPeriodic();</span></span>
<span class="line"><span>    // 线程池状态对不！！</span></span>
<span class="line"><span>    if (!canRunInCurrentRunState(periodic))</span></span>
<span class="line"><span>        cancel(false);</span></span>
<span class="line"><span>    else if (!periodic)</span></span>
<span class="line"><span>        // 一次性的延迟执行</span></span>
<span class="line"><span>        ScheduledFutureTask.super.run();</span></span>
<span class="line"><span>    // 到这，先执行任务</span></span>
<span class="line"><span>    else if (ScheduledFutureTask.super.runAndReset()) {</span></span>
<span class="line"><span>        // 设置下一次任务的运行时间</span></span>
<span class="line"><span>        setNextRunTime();</span></span>
<span class="line"><span>        reExecutePeriodic(outerTask);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 计算任务下次执行时间，time是任务执行的时间，而这里是time的上次的执行时间</span></span>
<span class="line"><span>private void setNextRunTime() {</span></span>
<span class="line"><span>    // 拿到当前任务的period</span></span>
<span class="line"><span>    long p = period;</span></span>
<span class="line"><span>    // period &gt; 0：At</span></span>
<span class="line"><span>    if (p &gt; 0)</span></span>
<span class="line"><span>        // 直接拿上次执行的时间，添加上周期时间，来计算下次执行的时间。</span></span>
<span class="line"><span>        time = time + p;</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        // period &lt; 0：With</span></span>
<span class="line"><span>        // 任务执行完，拿当前系统时间计算下次执行的时间点</span></span>
<span class="line"><span>        time = now() + p;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 重新将任务扔到延迟队列中</span></span>
<span class="line"><span>void reExecutePeriodic(RunnableScheduledFuture&lt;?&gt; task) {</span></span>
<span class="line"><span>    // 线程池状态的判断</span></span>
<span class="line"><span>    if (canRunInCurrentRunState(true)) {</span></span>
<span class="line"><span>        // 将任务扔到了延迟队列中</span></span>
<span class="line"><span>        super.getQueue().add(task);</span></span>
<span class="line"><span>        // 扔到延迟队列后，再次判断线程池状态，是否需要取消任务！</span></span>
<span class="line"><span>        if (!canRunInCurrentRunState(true) &amp;&amp; remove(task))</span></span>
<span class="line"><span>            task.cancel(false);</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            // 需要创建线程不~</span></span>
<span class="line"><span>            ensurePrestart();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>同步、异步、阻塞、非阻塞。</p><p>同步：做了同步操作后，被调用者不会主动通知我结果，我需要主动查看结果。</p><p>异步：做了异步操作后，被调用者会主动通知我结果是什么。</p><p>阻塞：调用功能后，不能做其他事情。</p><p>非阻塞：调用功能后，可以做其他事情。</p><p>同步阻塞：执行烧水功能时，我不能做其他事情，并且烧水功能执行完后，不会主动通知我。</p><p>同步非阻塞：执行烧水功能时，我可以做其他事情，但是烧水功能执行完后，不会主动通知我。</p><p>异步阻塞：执行烧水功能时，我不能做其他事情，并且烧水功能执行完后，会主动通知我。（这个操作没有）</p><p>异步非阻塞：执行烧水功能时，我可以做其他事情，并且烧水功能执行完后，会主动通知我。</p><h1 id="十一、futuretask源码" tabindex="-1">十一、<strong>FutureTask源码</strong> <a class="header-anchor" href="#十一、futuretask源码" aria-label="Permalink to &quot;十一、**FutureTask源码**&quot;">​</a></h1><h2 id="一、future介绍" tabindex="-1">一、<strong>Future介绍</strong> <a class="header-anchor" href="#一、future介绍" aria-label="Permalink to &quot;一、**Future介绍**&quot;">​</a></h2><p>Future是个什么鬼？<br> Java创建线程的方式，一般常用的是Thread，Runnable。如果需要当前处理的任务有返回结果的话，<br> 需要使用Callable。Callable运行需要配合Future。<br> Future是一个接口，一般会使用FutureTask实现类去接收Callable任务的返回结果。<br> FutureTask存在一些问题的，同步非阻塞执行的任务，他不会主动通知你返回结果是什么。</p><h2 id="二、futuretask使用" tabindex="-1">二、<strong>FutureTask使用</strong> <a class="header-anchor" href="#二、futuretask使用" aria-label="Permalink to &quot;二、**FutureTask使用**&quot;">​</a></h2><p>Callable是你要执行的任务。</p><p>FutureTask是存放任务返回结果的位置。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws ExecutionException, InterruptedException {</span></span>
<span class="line"><span>    FutureTask&lt;Integer&gt; futureTask = new FutureTask&lt;&gt;(() -&gt; {</span></span>
<span class="line"><span>        System.out.println(&quot;任务执行&quot;);</span></span>
<span class="line"><span>        Thread.sleep(2000);</span></span>
<span class="line"><span>        return 123+764;</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Thread t = new Thread(futureTask);</span></span>
<span class="line"><span>    t.start();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    System.out.println(&quot;main线程启动了t线程处理任务&quot;);</span></span>
<span class="line"><span>    Integer result = futureTask.get();</span></span>
<span class="line"><span>    System.out.println(result);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="三、futuretask源码分析" tabindex="-1">三、<strong>FutureTask源码分析</strong> <a class="header-anchor" href="#三、futuretask源码分析" aria-label="Permalink to &quot;三、**FutureTask源码分析**&quot;">​</a></h2><p>要分析FutureTask，首先需要查看一下他的核心属性</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * NEW -&gt; COMPLETING -&gt; NORMAL          任务正常执行，返回结果是正常的结果</span></span>
<span class="line"><span> * NEW -&gt; COMPLETING -&gt; EXCEPTIONAL     任务正常执行，但是返回结果是异常</span></span>
<span class="line"><span> * NEW -&gt; CANCELLED              任务直接被取消的流程</span></span>
<span class="line"><span> * NEW -&gt; INTERRUPTING -&gt; INTERRUPTED</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>// 代表当前任务的状态</span></span>
<span class="line"><span>private volatile int state;</span></span>
<span class="line"><span>private static final int NEW          = 0;  // 任务的初始化状态</span></span>
<span class="line"><span>private static final int COMPLETING   = 1;  // Callable的结果（正常结果，异常结果）正在封装给当前的FutureTask</span></span>
<span class="line"><span>private static final int NORMAL       = 2;  // NORMAL任务正常结束</span></span>
<span class="line"><span>private static final int EXCEPTIONAL  = 3;  // 执行任务时，发生了异常</span></span>
<span class="line"><span>private static final int CANCELLED    = 4;  // 任务被取消了。</span></span>
<span class="line"><span>private static final int INTERRUPTING = 5;  // 线程的中断状态，被设置为了true（现在还在运行）</span></span>
<span class="line"><span>private static final int INTERRUPTED  = 6;  // 线程被中断了。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 当前要执行的任务</span></span>
<span class="line"><span>private Callable&lt;V&gt; callable;</span></span>
<span class="line"><span>// 存放任务返回结果的属性，也就是futureTask.get需要获取的结果</span></span>
<span class="line"><span>private Object outcome; </span></span>
<span class="line"><span>// 执行任务的线程。</span></span>
<span class="line"><span>private volatile Thread runner;</span></span>
<span class="line"><span>// 单向链表，存放通过get方法挂起等待的线程</span></span>
<span class="line"><span>private volatile WaitNode waiters;</span></span></code></pre></div><p>t.start后，如何执行Callable的call方法，其实是通过run方法执行的call方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// run方法的执行流程，最终会执行Callable的call方法</span></span>
<span class="line"><span>public void run() {</span></span>
<span class="line"><span>    // 保证任务的状态是NEW才可以运行</span></span>
<span class="line"><span>    // 基于CAS的方式，将当前线程设置为runner。</span></span>
<span class="line"><span>    if (state != NEW ||</span></span>
<span class="line"><span>        !UNSAFE.compareAndSwapObject(this, runnerOffset,null, Thread.currentThread()))</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    // 准备执行任务</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // 要执行任务 c</span></span>
<span class="line"><span>        Callable&lt;V&gt; c = callable;</span></span>
<span class="line"><span>        // 任务不为null，并且任务的状态还处于NEW</span></span>
<span class="line"><span>        if (c != null &amp;&amp; state == NEW) {</span></span>
<span class="line"><span>            // 放返回结果</span></span>
<span class="line"><span>            V result;</span></span>
<span class="line"><span>            // 任务执行是否为正常结束</span></span>
<span class="line"><span>            boolean ran;</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                // 运行call方法，拿到返回结果封装到result中</span></span>
<span class="line"><span>                result = c.call();</span></span>
<span class="line"><span>                // 正常返回，ran设置为true</span></span>
<span class="line"><span>                ran = true;</span></span>
<span class="line"><span>            } catch (Throwable ex) {</span></span>
<span class="line"><span>                // 结果为null</span></span>
<span class="line"><span>                result = null;</span></span>
<span class="line"><span>                // 异常返回，ran设置为false</span></span>
<span class="line"><span>                ran = false;</span></span>
<span class="line"><span>                // 设置异常信息</span></span>
<span class="line"><span>                setException(ex);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            if (ran)</span></span>
<span class="line"><span>                // 正常执行结束，设置返回结果</span></span>
<span class="line"><span>                set(result);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        // 将执行任务的runner设置空</span></span>
<span class="line"><span>        runner = null;</span></span>
<span class="line"><span>        // 拿到状态</span></span>
<span class="line"><span>        int s = state;</span></span>
<span class="line"><span>        // 中断要做一些后续处理</span></span>
<span class="line"><span>        if (s &gt;= INTERRUPTING)</span></span>
<span class="line"><span>            handlePossibleCancellationInterrupt(s);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 设置返回结果</span></span>
<span class="line"><span>protected void set(V v) {</span></span>
<span class="line"><span>    // 首先要将任务状态从NEW设置为COMPLETING</span></span>
<span class="line"><span>    if (UNSAFE.compareAndSwapInt(this, stateOffset, NEW, COMPLETING)) {</span></span>
<span class="line"><span>        // 将返回结果设置给outcome。</span></span>
<span class="line"><span>        outcome = v;</span></span>
<span class="line"><span>        // 将状态修改为NORMAL，代表正常技术</span></span>
<span class="line"><span>        UNSAFE.putOrderedInt(this, stateOffset, NORMAL);</span></span>
<span class="line"><span>        // 一会再说，你猜猜~~~</span></span>
<span class="line"><span>        finishCompletion();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>get方法获取返回结果，到挂起的位置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public V get() throws InterruptedException, ExecutionException {</span></span>
<span class="line"><span>    // 拿状态</span></span>
<span class="line"><span>    int s = state;</span></span>
<span class="line"><span>    // 满足找个状态就代表现在可能还没有返回结果</span></span>
<span class="line"><span>    if (s &lt;= COMPLETING)</span></span>
<span class="line"><span>        // 尝试挂起线程，等待拿结果</span></span>
<span class="line"><span>        s = awaitDone(false, 0L);</span></span>
<span class="line"><span>    return report(s);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 线程要等待任务执行结束，等待任务执行的状态变为大于COMPLETING状态</span></span>
<span class="line"><span>private int awaitDone(boolean timed, long nanos) throws InterruptedException {</span></span>
<span class="line"><span>    // 计算deadline，如果是get()，就是0，  如果是get(time,unit)那就追加当前系统时间</span></span>
<span class="line"><span>    final long deadline = timed ? System.nanoTime() + nanos : 0L;</span></span>
<span class="line"><span>    // 构建WaitNode</span></span>
<span class="line"><span>    WaitNode q = null;</span></span>
<span class="line"><span>    // queued = false</span></span>
<span class="line"><span>    boolean queued = false;</span></span>
<span class="line"><span>    // 死循环</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        // 找个get的线程是否中断了。</span></span>
<span class="line"><span>        if (Thread.interrupted()) {</span></span>
<span class="line"><span>            // 将当前节点从waiters中移除。</span></span>
<span class="line"><span>            removeWaiter(q);</span></span>
<span class="line"><span>            // 并且抛出中断异常</span></span>
<span class="line"><span>            throw new InterruptedException();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 拿到现在任务的状态</span></span>
<span class="line"><span>        int s = state;</span></span>
<span class="line"><span>        // 判断任务是否已经执行结束了</span></span>
<span class="line"><span>        if (s &gt; COMPLETING) {</span></span>
<span class="line"><span>            // 如果设置过WaitNode，直接移除WaitNode的线程</span></span>
<span class="line"><span>            if (q != null)</span></span>
<span class="line"><span>                q.thread = null;</span></span>
<span class="line"><span>            // 返回当前任务的状态</span></span>
<span class="line"><span>            return s;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 如果任务的状态处于 COMPLETING ，</span></span>
<span class="line"><span>        else if (s == COMPLETING)</span></span>
<span class="line"><span>            // COMPLETING的持续时间非常短，只需要做一手现成的让步即可。</span></span>
<span class="line"><span>            Thread.yield();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 现在线程的状态是NEW，（call方法可能还没执行完呢，准备挂起线程）</span></span>
<span class="line"><span>        else if (q == null)</span></span>
<span class="line"><span>            // 封装WaitNode存放当前线程</span></span>
<span class="line"><span>            q = new WaitNode();</span></span>
<span class="line"><span>        else if (!queued)</span></span>
<span class="line"><span>            // 如果WaitNode还没有排在waiters中，现在就排进来（头插法的效果）</span></span>
<span class="line"><span>            queued = UNSAFE.compareAndSwapObject(this, waitersOffset, q.next = waiters, q);</span></span>
<span class="line"><span>        else if (timed) {</span></span>
<span class="line"><span>            // get(time,unit)挂起线程的方式</span></span>
<span class="line"><span>            // 计算挂起时间</span></span>
<span class="line"><span>            nanos = deadline - System.nanoTime();</span></span>
<span class="line"><span>            // 挂起的时间，是否小于等于0</span></span>
<span class="line"><span>            if (nanos &lt;= 0L) {</span></span>
<span class="line"><span>                // 移除waiters中的当前Node</span></span>
<span class="line"><span>                removeWaiter(q);</span></span>
<span class="line"><span>                // 返回任务状态</span></span>
<span class="line"><span>                return state;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 正常指定挂起时间即可。（线程挂起）</span></span>
<span class="line"><span>            LockSupport.parkNanos(this, nanos);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else {</span></span>
<span class="line"><span>            // get()挂起线程的方式</span></span>
<span class="line"><span>            LockSupport.park(this);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>线程挂起后，如果任务执行完毕，由finishCompletion唤醒线程</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 任务状态已经变为了NORMAL，做一些后续处理</span></span>
<span class="line"><span>private void finishCompletion() {</span></span>
<span class="line"><span>    for (WaitNode q; (q = waiters) != null;) {</span></span>
<span class="line"><span>        // 拿到第一个节点后，直接用CAS的方式，将其设置为null</span></span>
<span class="line"><span>        if (UNSAFE.compareAndSwapObject(this, waitersOffset, q, null)) {</span></span>
<span class="line"><span>            for (;;) {</span></span>
<span class="line"><span>                // 基于q拿到线程信息</span></span>
<span class="line"><span>                Thread t = q.thread;</span></span>
<span class="line"><span>                // 线程不为null</span></span>
<span class="line"><span>                if (t != null) {</span></span>
<span class="line"><span>                    // 将WaitNode的thread设置为null</span></span>
<span class="line"><span>                    q.thread = null;</span></span>
<span class="line"><span>                    // 唤醒这个线程</span></span>
<span class="line"><span>                    LockSupport.unpark(t);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                // 往后遍历，接着唤醒</span></span>
<span class="line"><span>                WaitNode next = q.next;</span></span>
<span class="line"><span>                if (next == null)</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>                q.next = null;</span></span>
<span class="line"><span>                // 指向next的WaitNode</span></span>
<span class="line"><span>                q = next;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 扩展方法，没任何实现，你可以自己实现</span></span>
<span class="line"><span>    done();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 任务处理完了，可以拜拜了！</span></span>
<span class="line"><span>    callable = null;   </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>拿到返回结果的处理</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 任务结束。</span></span>
<span class="line"><span>private V report(int s) throws ExecutionException {</span></span>
<span class="line"><span>    // 拿到结果</span></span>
<span class="line"><span>    Object x = outcome;</span></span>
<span class="line"><span>    // 判断是正常返回结束</span></span>
<span class="line"><span>    if (s == NORMAL)</span></span>
<span class="line"><span>        // 返回结果</span></span>
<span class="line"><span>        return (V)x;</span></span>
<span class="line"><span>    // 任务状态是大于取消</span></span>
<span class="line"><span>    if (s &gt;= CANCELLED)</span></span>
<span class="line"><span>        // 甩异常。</span></span>
<span class="line"><span>        throw new CancellationException();</span></span>
<span class="line"><span>    // 扔异常。</span></span>
<span class="line"><span>    throw new ExecutionException((Throwable)x);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 正常返回 report</span></span>
<span class="line"><span>// 异常返回 report</span></span>
<span class="line"><span>// 取消任务 report</span></span>
<span class="line"><span>// 中断任务 awaitDone</span></span></code></pre></div><h2 id="四、牛批的completablefuture" tabindex="-1">四、<strong>牛批的CompletableFuture</strong> <a class="header-anchor" href="#四、牛批的completablefuture" aria-label="Permalink to &quot;四、**牛批的CompletableFuture**&quot;">​</a></h2><p>FutureTask存在的问题：<br> 问题1：FutureTask获取线程执行的结果前，主线程需要通过get方法一直阻塞等待子线程执行完call方法，才可以拿到返回结果。<br> 问题2：如果不通过get去挂起线程，通过while循环，不停的判断任务的执行状态是否结束，结束后，再拿结果。如果任务长时间没执行完毕，CPU会一直调度查看任务状态的方法，会浪费CPU资源。<br> FutureTask是一个同步非阻塞处理任务的方式。<br> 需要一个异步非阻塞处理任务的方式。CompletableFuture在一定程度上就提供了各种异步非阻塞的处理方案，并且提供响应式编程，代码编写上，效果更佳（更漂亮）</p><p>CompletableFuture是JDK1.8，再次又Doug Lea研发，COmpletableFuture也是实现了Future接口实现的功能，可以不使用FutureTask，直接使用CompletableFuture即可。<br> 提供非常丰富的函数去执行各种异步操作。</p><h1 id="十二、completablefuture应用" tabindex="-1">十二、<strong>CompletableFuture应用</strong> <a class="header-anchor" href="#十二、completablefuture应用" aria-label="Permalink to &quot;十二、**CompletableFuture应用**&quot;">​</a></h1><h2 id="回顾" tabindex="-1">回顾： <a class="header-anchor" href="#回顾" aria-label="Permalink to &quot;回顾：&quot;">​</a></h2><p>上次课，玩的FutureTask，应用起来特别简单。</p><p>FutureTask他是同步非阻塞。</p><p>FutureTask会配合Callable执行有返回结果的任务。</p><p>如果需要拿到返回结果，需要执行get方法，获取最终结果</p><p>因为无法实现异步非阻塞，JDK1.8中有个CompletableFuture可以实现<strong>异步非阻塞</strong>的效果</p><p>再带有返回结果的线程执行完毕后，提供一个回调。</p><h2 id="一、completablefuture的应用" tabindex="-1">一、CompletableFuture的应用 <a class="header-anchor" href="#一、completablefuture的应用" aria-label="Permalink to &quot;一、CompletableFuture的应用&quot;">​</a></h2><p><strong>CompletableFuture最重要的就是解决了异步回调的问题</strong></p><p>CompletableFuture就是执行一个异步任务，异步任务可以有返回结果，也可以没有返回结果</p><p>CompletableFuture提供了两个最基本运行的基本方法</p><p>函数式编程中，三个最核心的接口</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Supplier - 生产者，没有入参，但是有返回结果</span></span>
<span class="line"><span>Consumer - 消费者，有入参，但是没有返回结果</span></span>
<span class="line"><span>Function - 函数，有入参，并且有返回结果</span></span></code></pre></div><p><code>supplyAsync(Supplier&amp;#x3c;U&gt; supplier)</code></p><p>异步执行任务，有返回结果</p><p><code>runAsync(Runnable runnable)</code></p><p>异步执行任务，没有返回结果</p><p>在不指定线程池的前提下，这两个异步任务都是交给ForkJoinPool去执行的。</p><p>而ForkJoinPool内部是守护线程，守护线程在主线程结束后，就不干活了。</p><p>但是只是用这两个方法，无法实现异步回调的。</p><p>如果需要在当前任务执行完毕后，拿着返回结果或者不拿返回结果，继续去执行后续任务操作的话，需要基于其他方法去实现</p><p><strong>这里的方法有个特点，都是在前置任务结果后，再执行当前任务</strong></p><p>所以后续看的任务都有一个特点，大部分方法一共有三种方法重载、</p><p>不带Async，带Async，带Async还可以传入线程池的套路</p><p><code>thenApply(Function&amp;#x3c;prevResult,currResult&gt;);</code></p><p>等待前一个任务处理结束后，拿着前置任务的返回结果，再做处理，并且返回当前结果</p><p><code>thenApplyAsync(Function&amp;#x3c;prevResult,currResult&gt;[,线程池])</code></p><p>跟上面的套路一致，但是再执行后续任务时，采用全新的线程执行</p><p><code>thenAccept(Consumer&amp;#x3c;preResult&gt;);</code></p><p>等待前一个任务处理结束后，拿着前置任务的返回结果，再做处理，当然处理没有返回结果</p><p><code>thenAcceptAsync(Consumer&amp;#x3c;preResult&gt;[,线程池]);</code></p><p>跟上面的套路一致，但是再执行后续任务时，采用全新的线程执行</p><p><code>thenRun(Runnable)</code></p><p>等待前一个任务处理结束后，再做处理。不接收前置任务结果，也不返回结果</p><p><code>thenRunAsync(Runnable[,线程池])</code></p><p>跟上面的套路一致，但是再执行后续任务时，采用全新的线程执行</p><p>其次还有可以执行相对复杂的处理，在前一个任务执行的同时，执行后续任务。等待前置任务和后置任务都搞定之后，再执行最终任务</p><p><code>thenCombine(CompletionStage,Function&amp;#x3c;prevResult,nextResult,afterResult&gt;)</code></p><p>可以让任务1和任务2一起执行，等待任务1和任务2全部搞定，获取前两个任务的结果执行最终处理，最终处理也可以返回结果<br><code>thenCombineAsync(CompletionStage,Function&amp;#x3c;prevResult,nextResult,afterResult&gt;[,线程池])</code></p><p>跟上面的套路一致，但是再执行后续任务时，采用全新的线程执行</p><p><code>thenAcceptBoth(CompletionStage,Consumer&amp;#x3c;prevResult,nextResult&gt;)</code></p><p>让前置任务和后续任务同时执行，都执行完毕后，拿到两个任务的结果，再做后续处理，但是没有返回结果</p><p><code>thenAcceptBothAsync(CompletionStage,Consumer&amp;#x3c;prevResult,nextResult&gt;[,线程池])</code></p><p>跟上面的套路一致，但是再执行后续任务时，采用全新的线程执行</p><p><code>runAfterBoth(CompletionStage,Runnble)</code></p><p>让前置任务和后续任务同时执行，都执行完毕后，再做后续处理</p><p><code>runAfterBothAsync(CompletionStage,Runnble[,线程池])</code></p><p>跟上面的套路一致，但是再执行后续任务时，采用全新的线程执行</p><p>后面还提供了可以让两个任务一起执行，但是有一个任务结束，有返回结果后，就做最终处理</p><p><code>applyToEither(CompletionStage,Function&amp;#x3c;firstResult,afterResult&gt;)</code></p><p>前面两个任务同时执行，有一个任务执行完，获取返回结果，做最终处理，再返回结果</p><p><code>acceptEither(CompletionStage,Consumer&amp;#x3c;firstResult&gt;)</code></p><p>前面两个任务同时执行，有一个任务执行完，获取返回结果，做最终处理</p><p><code>runAfterEither(CompletionStage,Runnable)</code></p><p>前面两个任务同时执行，有一个任务执行完，做最终处理</p><p>Async的不说了。</p><p>后面还提供了等到前置任务处理完，再做后续处理，后续处理返回的结果为CompletionStage</p><p><code>thenCompose(Function&amp;#x3c;prevResult,CompletionStage&gt;)</code></p><p>连接两个任务，前置处理完，执行后续，后续可以拿到前置任务的结果，并且做处理，最终返回的是CompletionStage</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>thenCompose (Function&lt;? super T, ? extends CompletionStage&lt;U&gt;&gt; fn);</span></span>
<span class="line"><span>thenApply   (Function&lt;? super T, ? extends U&gt; fn);</span></span>
<span class="line"><span>// 用thenApply其实就足够了</span></span></code></pre></div><p>最后还有处理异常的各种姿势</p><p><code>exceptionally(Function&amp;#x3c;Throwable,currResult&gt;)</code></p><p>只有当前这个异常处理方法，可以获取到前面任务的异常信息，有异常才执行当前任务。</p><p>exceptionally不存在Async的操作。</p><p><code>whenComplete(Consumer&amp;#x3c;prevResult,Throwable&gt;)</code></p><p>可以拿到上一个任务的返回结果和异常，但是当前处理没有返回结果，无法影响最终让任务的结果内容</p><p>这个带有Async操作</p><p><code>hanle(Function&amp;#x3c;prevResult,Throwable,currResult&gt;)</code></p><p>可以拿到上一个任务的返回结果和异常，同时当前处理可以返回内容</p><h2 id="二、基于上面阐述做应用" tabindex="-1">二、基于上面阐述做应用 <a class="header-anchor" href="#二、基于上面阐述做应用" aria-label="Permalink to &quot;二、基于上面阐述做应用&quot;">​</a></h2><h4 id="_2-1-小一要回家干法-小二去做饭-小一看电视-等到小二昨晚-小一干饭。" tabindex="-1">2.1 小一要回家干法，小二去做饭，小一看电视，等到小二昨晚，小一干饭。 <a class="header-anchor" href="#_2-1-小一要回家干法-小二去做饭-小一看电视-等到小二昨晚-小一干饭。" aria-label="Permalink to &quot;2.1 小一要回家干法，小二去做饭，小一看电视，等到小二昨晚，小一干饭。&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    sout(&quot;小连回家干饭&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    CompletableFuture&lt;String&gt; task = CompletableFuture.supplyAsync(() -&gt; {</span></span>
<span class="line"><span>        sout(&quot;小严做饭！&quot;);</span></span>
<span class="line"><span>        sleep();</span></span>
<span class="line"><span>        return &quot;锅包肉！&quot;;</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    sout(&quot;小连看电视！&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sout(&quot;小连干饭：&quot; + task.join());</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2-2-小一要回家干法-小二去炒菜-小三去焖饭-小一看电视-等到小二和小三都做好了-小四端菜和饭给小一-小一干饭" tabindex="-1">2.2 小一要回家干法，小二去炒菜，小三去焖饭，小一看电视，等到小二和小三都做好了，小四端菜和饭给小一，小一干饭 <a class="header-anchor" href="#_2-2-小一要回家干法-小二去炒菜-小三去焖饭-小一看电视-等到小二和小三都做好了-小四端菜和饭给小一-小一干饭" aria-label="Permalink to &quot;2.2 小一要回家干法，小二去炒菜，小三去焖饭，小一看电视，等到小二和小三都做好了，小四端菜和饭给小一，小一干饭&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static void main(String[] args) throws InterruptedException {</span></span>
<span class="line"><span>    sout(&quot;小连回家干饭&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    CompletableFuture&lt;String&gt; task = CompletableFuture.supplyAsync(() -&gt; {</span></span>
<span class="line"><span>        sout(&quot;小严去炒菜！&quot;);</span></span>
<span class="line"><span>        sleep();</span></span>
<span class="line"><span>        return &quot;锅包肉！&quot;;</span></span>
<span class="line"><span>    },executor).thenCombineAsync(CompletableFuture.supplyAsync(() -&gt; {</span></span>
<span class="line"><span>        sout(&quot;小李去焖饭&quot;);</span></span>
<span class="line"><span>        sleep();</span></span>
<span class="line"><span>        return &quot;大米饭！&quot;;</span></span>
<span class="line"><span>    },executor),(food,rice) -&gt; {</span></span>
<span class="line"><span>        sout(&quot;小陈端&quot; + food + &quot;,&quot; + rice);</span></span>
<span class="line"><span>        sleep();</span></span>
<span class="line"><span>        return &quot;饭菜好了！&quot;;</span></span>
<span class="line"><span>    },executor);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sout(&quot;小连看电视！&quot;);</span></span>
<span class="line"><span>    sout(&quot;小连干饭：&quot; + task.join());</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="十三、completablefuture源码分析" tabindex="-1">十三、<strong>CompletableFuture源码分析</strong> <a class="header-anchor" href="#十三、completablefuture源码分析" aria-label="Permalink to &quot;十三、**CompletableFuture源码分析**&quot;">​</a></h1><p>异步回调</p><h2 id="一、runasync方法源码分析" tabindex="-1">一、runAsync方法源码分析 <a class="header-anchor" href="#一、runasync方法源码分析" aria-label="Permalink to &quot;一、runAsync方法源码分析&quot;">​</a></h2><p>基于当前这个最简单的方法，来分析CompletableFuture是如何执行异步任务的。</p><p>以及如何触发后续任务执行</p><h4 id="_1-1-当前异步任务执行流程" tabindex="-1">1.1 当前异步任务执行流程 <a class="header-anchor" href="#_1-1-当前异步任务执行流程" aria-label="Permalink to &quot;1.1 当前异步任务执行流程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 异步执行任务</span></span>
<span class="line"><span>static CompletableFuture&lt;Void&gt; asyncRunStage(Executor e, Runnable f) {</span></span>
<span class="line"><span>    // 非空判断。 </span></span>
<span class="line"><span>    if (f == null) throw new NullPointerException();</span></span>
<span class="line"><span>    // 声明当前任务的CompletableFuture对象</span></span>
<span class="line"><span>    // 在看CompletableFuture时，任务执行和后续任务的触发是两个操作</span></span>
<span class="line"><span>    // new的这个d，他的目的是为了触发后续任务的执行。</span></span>
<span class="line"><span>    CompletableFuture&lt;Void&gt; d = new CompletableFuture&lt;Void&gt;();</span></span>
<span class="line"><span>    // 将任务和CompletableFuture封装到一起，作为AsyncRun的对象</span></span>
<span class="line"><span>    // 将AsyncRun交给线程池执行</span></span>
<span class="line"><span>    e.execute(new AsyncRun(d, f));</span></span>
<span class="line"><span>    return d;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 封装任务和COmpletableFuture的AsyncRun对象</span></span>
<span class="line"><span>static final class AsyncRun extends ForkJoinTask&lt;Void&gt; </span></span>
<span class="line"><span>    CompletableFuture&lt;Void&gt; dep; Runnable fn;</span></span>
<span class="line"><span>    // 存储当前的任务以及CompletableFuture</span></span>
<span class="line"><span>    AsyncRun(CompletableFuture&lt;Void&gt; dep, Runnable fn) {</span></span>
<span class="line"><span>        this.dep = dep; this.fn = fn;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void run() {</span></span>
<span class="line"><span>        // 声明两个变量，一个存储CompletableFuture，一个存储具体任务</span></span>
<span class="line"><span>        CompletableFuture&lt;Void&gt; d; Runnable f;</span></span>
<span class="line"><span>        // 非空判断的同时，将成员变量做临时存储</span></span>
<span class="line"><span>        if ((d = dep) != null &amp;&amp; (f = fn) != null) {</span></span>
<span class="line"><span>            // help gc</span></span>
<span class="line"><span>            dep = null; fn = null;</span></span>
<span class="line"><span>            // 当前任务是否已经有返回结果。</span></span>
<span class="line"><span>            if (d.result == null) {</span></span>
<span class="line"><span>                // 任务还没有执行</span></span>
<span class="line"><span>                try {</span></span>
<span class="line"><span>                    // 线程池执行异步任务。</span></span>
<span class="line"><span>                    f.run();</span></span>
<span class="line"><span>                    // 当然是Runnable任务，没有返回结果的，所以这里直接封装为一个表示null的标识</span></span>
<span class="line"><span>                    // 为null的结果是NIL</span></span>
<span class="line"><span>                    d.completeNull();</span></span>
<span class="line"><span>                } catch (Throwable ex) {</span></span>
<span class="line"><span>                    // 如果异常结束，将出现的异常封装到返回结果中</span></span>
<span class="line"><span>                    d.completeThrowable(ex);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            // 执行后续任务</span></span>
<span class="line"><span>            d.postComplete();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_1-2-后续任务的触发方式" tabindex="-1">1.2 后续任务的触发方式 <a class="header-anchor" href="#_1-2-后续任务的触发方式" aria-label="Permalink to &quot;1.2 后续任务的触发方式&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 当前任务执行完毕，触发后续任务。</span></span>
<span class="line"><span>final void postComplete() {</span></span>
<span class="line"><span>    // f：当前任务的COmpletableFuture</span></span>
<span class="line"><span>    // h：栈顶！</span></span>
<span class="line"><span>    CompletableFuture&lt;?&gt; f = this; Completion h;</span></span>
<span class="line"><span>    // h拿到栈顶数据。</span></span>
<span class="line"><span>    while ((h = f.stack) != null ||</span></span>
<span class="line"><span>           (f != this &amp;&amp; (h = (f = this).stack) != null)) {</span></span>
<span class="line"><span>        // 栈结构中有后续需要处理的任务，进到while循环中，每次循环之后，h的指针都会后移</span></span>
<span class="line"><span>        CompletableFuture&lt;?&gt; d; Completion t;</span></span>
<span class="line"><span>        // 栈顶换人啦~~</span></span>
<span class="line"><span>        if (f.casStack(h, t = h.next)) {</span></span>
<span class="line"><span>            if (t != null) {</span></span>
<span class="line"><span>                if (f != this) {</span></span>
<span class="line"><span>                    pushStack(h);</span></span>
<span class="line"><span>                    continue;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                h.next = null;    // detach}</span></span>
<span class="line"><span>            // 执行栈顶的任务</span></span>
<span class="line"><span>            f = (d = h.tryFire(NESTED)) == null ? this : d;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>问题：发现CompletableFuture的后续任务是基于栈结构存储的，但是在测试的代码中，执行的顺序没有按照栈结构的方式，去执行</p><p>CompletableFuture不保证后续任务的执行顺序。</p><p>从上面的源码分析，发现，不会出现栈结构完全倒序的情况。</p><h2 id="二、thenrun方法源码分析" tabindex="-1">二、thenRun方法源码分析 <a class="header-anchor" href="#二、thenrun方法源码分析" aria-label="Permalink to &quot;二、thenRun方法源码分析&quot;">​</a></h2><p>后续任务的触发方式有两种：</p><ul><li><p>一种是基于前继任务执行完毕，执行postComplete方法触发</p></li><li><p>另一种是后续任务在压栈之前和之后，会尝试执行后续任务，只要前继任务执行结束的快，后续任务就可以直接执行，不需要前继任务的触发</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 追加任务到栈结构的逻辑</span></span>
<span class="line"><span>// e：线程池、执行器。  如果是Async异步调用，会传递使用的线程池。 如果是普通的thenRun，不会传递线程池，为null</span></span>
<span class="line"><span>private CompletableFuture&lt;Void&gt; uniRunStage(Executor e, Runnable f) {</span></span>
<span class="line"><span>    // 阿巴阿巴。</span></span>
<span class="line"><span>    if (f == null) throw new NullPointerException();</span></span>
<span class="line"><span>    // 当前任务的CompletableFuture</span></span>
<span class="line"><span>    CompletableFuture&lt;Void&gt; d = new CompletableFuture&lt;Void&gt;();</span></span>
<span class="line"><span>    // 如果传递了线程池，代表异步执行，直接走if代码块中的内容</span></span>
<span class="line"><span>    // 如果没有传递线程池，同步执行，需要先执行uniRun</span></span>
<span class="line"><span>    if (e != null || !d.uniRun(this, f, null)) {</span></span>
<span class="line"><span>        // 前继任务还没执行完呢，那就准备压栈！</span></span>
<span class="line"><span>        // 将线程池，后续任务，前继任务，后续具体任务</span></span>
<span class="line"><span>        UniRun&lt;T&gt; c = new UniRun&lt;T&gt;(e, d, this, f);</span></span>
<span class="line"><span>        // 将封装好的c，直接到this的栈结构中</span></span>
<span class="line"><span>        // 不确保UniRun对象一定会被压到栈结构中</span></span>
<span class="line"><span>        // 在这个位置，可能会出现前继任务已经执行完毕，导致无法压到栈顶。</span></span>
<span class="line"><span>        this.push(c);</span></span>
<span class="line"><span>        // 尝试执行当前的后续任务</span></span>
<span class="line"><span>        c.tryFire(SYNC);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return d;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 当前方法的作用：尝试执行任务。</span></span>
<span class="line"><span>// a：前继任务</span></span>
<span class="line"><span>// f：后续具体任务</span></span>
<span class="line"><span>// c：现在是null</span></span>
<span class="line"><span>final boolean uniRun(CompletableFuture&lt;?&gt; a, Runnable f, UniRun&lt;?&gt; c) {</span></span>
<span class="line"><span>    Object r; Throwable x;</span></span>
<span class="line"><span>    // 只看第二个判断。  </span></span>
<span class="line"><span>    // 如果前继任务没有执行完毕，直接return false</span></span>
<span class="line"><span>    if (a == null || (r = a.result) == null || f == null)</span></span>
<span class="line"><span>        return false;</span></span>
<span class="line"><span>    // 省略部分代码</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 压栈方法</span></span>
<span class="line"><span>final void push(UniCompletion&lt;?,?&gt; c) {</span></span>
<span class="line"><span>    // 不为null！！！</span></span>
<span class="line"><span>    if (c != null) {</span></span>
<span class="line"><span>        // result是前继任务的结果</span></span>
<span class="line"><span>        // 只有前继任务还没有执行完毕时，才能将当前的UniRun对象压到栈结构中</span></span>
<span class="line"><span>        while (result == null &amp;&amp; !tryPushStack(c))</span></span>
<span class="line"><span>            lazySetNext(c, null); </span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 后续任务的执行，以及之前将后续任务封装的UniRun对象</span></span>
<span class="line"><span>static final class UniRun&lt;T&gt; extends UniCompletion&lt;T,Void&gt; {</span></span>
<span class="line"><span>    Runnable fn;</span></span>
<span class="line"><span>    // 之前封装后继任务调用的有参构造</span></span>
<span class="line"><span>    UniRun(Executor executor, CompletableFuture&lt;Void&gt; dep,CompletableFuture&lt;T&gt; src, Runnable fn) {</span></span>
<span class="line"><span>        super(executor, dep, src); this.fn = fn;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 尝试执行任务</span></span>
<span class="line"><span>    // dep：后续任务</span></span>
<span class="line"><span>    // src：前继任务</span></span>
<span class="line"><span>    // fn：后续具体任务</span></span>
<span class="line"><span>    final CompletableFuture&lt;Void&gt; tryFire(int mode) {</span></span>
<span class="line"><span>        // d：存储后续任务，   a：存储前继任务</span></span>
<span class="line"><span>        CompletableFuture&lt;Void&gt; d; CompletableFuture&lt;T&gt; a;</span></span>
<span class="line"><span>        if ((d = dep) == null ||</span></span>
<span class="line"><span>            // 尝试执行后续任务的位置</span></span>
<span class="line"><span>            !d.uniRun(a = src, fn, mode &gt; 0 ? null : this))</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        dep = null; src = null; fn = null;</span></span>
<span class="line"><span>        return d.postFire(a, mode);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 尝试执行后续任务的方法</span></span>
<span class="line"><span>final boolean uniRun(CompletableFuture&lt;?&gt; a, Runnable f, UniRun&lt;?&gt; c) {</span></span>
<span class="line"><span>    Object r; Throwable x;</span></span>
<span class="line"><span>    // 判断前继任务执行完了么？ 如果执行完了，直接走后面执行后续任务</span></span>
<span class="line"><span>    // 如果前继任务没执行完，</span></span>
<span class="line"><span>    if (a == null || (r = a.result) == null || f == null)</span></span>
<span class="line"><span>        // 返回false</span></span>
<span class="line"><span>        return false;</span></span>
<span class="line"><span>    // 到这，说明前继任务已经执行结束了。</span></span>
<span class="line"><span>    // 要执行后续任务，但是要先判断后续任务执行了么？  </span></span>
<span class="line"><span>    if (result == null) {</span></span>
<span class="line"><span>        // 后续任务还木有执行</span></span>
<span class="line"><span>        // 如果前继任务是异常结束，后续任务就不需要执行了！</span></span>
<span class="line"><span>        if (r instanceof AltResult &amp;&amp; (x = ((AltResult)r).ex) != null)</span></span>
<span class="line"><span>            // 正常封装异常信息。</span></span>
<span class="line"><span>            completeThrowable(x, r);</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            // 前继任务正常结束，尝试之后后续任务。</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                // 如果c == null，代表异步执行</span></span>
<span class="line"><span>                // 如果c != null，嵌套执行，同步执行</span></span>
<span class="line"><span>                if (c != null &amp;&amp; !c.claim())</span></span>
<span class="line"><span>                    // 异步执行完毕，返回false</span></span>
<span class="line"><span>                    return false;</span></span>
<span class="line"><span>                // 需要同步执行</span></span>
<span class="line"><span>                f.run();</span></span>
<span class="line"><span>                // 正常封装结果</span></span>
<span class="line"><span>                completeNull();</span></span>
<span class="line"><span>            } catch (Throwable ex) {</span></span>
<span class="line"><span>                // 异常封装结果</span></span>
<span class="line"><span>                completeThrowable(ex);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 执行任务</span></span>
<span class="line"><span>final boolean claim() {</span></span>
<span class="line"><span>    // 拿到线程池</span></span>
<span class="line"><span>    Executor e = executor;</span></span>
<span class="line"><span>    // 判断当前任务标记，是否执行</span></span>
<span class="line"><span>    if (compareAndSetForkJoinTaskTag((short)0, (short)1)) {</span></span>
<span class="line"><span>        if (e == null)</span></span>
<span class="line"><span>            // 线程池为null，代表同步执行，直接返回true</span></span>
<span class="line"><span>            return true;</span></span>
<span class="line"><span>        // 异步执行，使用线程池执行即可。</span></span>
<span class="line"><span>        executor = null; </span></span>
<span class="line"><span>        e.execute(this);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="三、整体执行流程图" tabindex="-1">三、整体执行流程图 <a class="header-anchor" href="#三、整体执行流程图" aria-label="Permalink to &quot;三、整体执行流程图&quot;">​</a></h2><h1 id="十四、并发编程总结" tabindex="-1">十四、并发编程总结 <a class="header-anchor" href="#十四、并发编程总结" aria-label="Permalink to &quot;十四、并发编程总结&quot;">​</a></h1><h2 id="一、锁" tabindex="-1">一、锁 <a class="header-anchor" href="#一、锁" aria-label="Permalink to &quot;一、锁&quot;">​</a></h2><h3 id="_1-1-synchronized-看到java层面就够了" tabindex="-1">1.1 synchronized（看到Java层面就够了） <a class="header-anchor" href="#_1-1-synchronized-看到java层面就够了" aria-label="Permalink to &quot;1.1 synchronized（看到Java层面就够了）&quot;">​</a></h3><p><strong>对象锁和类锁</strong></p><p>synchronized到底是使用普通new出来的对象作为锁，还是Class对象作为锁</p><p>对象锁 - new多个对象去操作，无法实现互斥的</p><p>类锁 - 无论怎么使用，能保证一个JVM内是互斥的</p><p><strong>原理、对象头</strong></p><p>synchronized是基于对象作为锁的。</p><p>锁信息全部都放在了对象的对象头中的MarkWord中</p><p>其中线程竞争锁之前，肯定需要先查看当前锁的标记位，以不同的方式来竞争锁资源。</p><p><strong>锁升级</strong></p><ul><li><p>初始化状态的对象的锁信息有两种情况**（无锁）**：</p></li><li><p>无锁状态：当前状态没有开启偏向锁。</p></li><li><p>匿名偏向：当前状态开启了偏向锁，没有偏向任何线程。</p></li><li><p>偏向锁：只有一个线程来拿锁资源，没有竞争。</p></li><li><p>轻量级锁：以CAS的方式，去竞争锁资源，不会让线程挂起。（自适应自旋锁）（LockRecord）</p></li><li><p>重量级锁：直接采用MarkWord指向的ObjectMonitor以传统的方式去竞争锁资源。</p></li></ul><p><strong>偏向锁的重入是如何实现的？</strong></p><ul><li>其实偏向锁时，也用到了LockRecord，只不过内部不会存储hashcode信息等等，在偏向锁重入时，每次都会压栈一个LockRecord，从而实现偏向锁重入。</li></ul><p><strong>轻量级锁的CAS是如何实现的？</strong></p><ul><li>在重量级锁中实现的。基于TryLock方法采用</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>int ObjectMonitor::TryLock (Thread * Self) {</span></span>
<span class="line"><span>   for (;;) {</span></span>
<span class="line"><span>      void * own = _owner ;</span></span>
<span class="line"><span>      if (own != NULL) return 0 ;</span></span>
<span class="line"><span>      if (Atomic::cmpxchg_ptr (Self, &amp;_owner, NULL) == NULL) {</span></span>
<span class="line"><span>         // Either guarantee _recursions == 0 or set _recursions = 0.</span></span>
<span class="line"><span>         assert (_recursions == 0, &quot;invariant&quot;) ;</span></span>
<span class="line"><span>         assert (_owner == Self, &quot;invariant&quot;) ;</span></span>
<span class="line"><span>         // CONSIDER: set or assert that OwnerIsThread == 1</span></span>
<span class="line"><span>         return 1 ;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      // The lock had been free momentarily, but we lost the race to the lock.</span></span>
<span class="line"><span>      // Interference -- the CAS failed.</span></span>
<span class="line"><span>      // We can either return -1 or retry.</span></span>
<span class="line"><span>      // Retry doesn&#39;t make as much sense because the lock was just acquired.</span></span>
<span class="line"><span>      if (true) return -1 ;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>synchronized和ReentrantLock后期更推荐使用谁。</strong></p><p>后期肯定是使用synchronized，因为synchronized底层更利于后期版本的优化，而ReentrantLock再怎么玩也是基于Java层面的锁。</p><p><strong>锁消除</strong></p><p>JMM层面在编译时，如果发展加锁的位置不存在任何的共享资源操作或者是引发线程安全问题的，那么去掉竞争和释放锁资源的操作。</p><p><strong>锁膨胀</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>while(xxx){</span></span>
<span class="line"><span>    synchronized(this){</span></span>
<span class="line"><span>        // 。。。</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>synchronized(this){</span></span>
<span class="line"><span>    while(xxx){</span></span>
<span class="line"><span>        // 。。。</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_1-2-reentrantlock" tabindex="-1">1.2 ReentrantLock <a class="header-anchor" href="#_1-2-reentrantlock" aria-label="Permalink to &quot;1.2 ReentrantLock&quot;">​</a></h3><p>AQS：队列 + 状态位，就是一个JUC下的基础类，大量JUC下的并发工具都是基于AQS实现的。</p><p>状态位state：volatile修饰，CAS修改的int类型数值。</p><p>队列：双向链表。每个节点是一个Node。</p><p><strong>公平锁和非公平锁</strong></p><p>lock：非公平锁直接CAS修改state，如果失败，执行acquire。公平锁执行执行acquire。</p><p>tryAcquire：在发现state为0时。</p><ul><li><p>非公平锁，直接CAS修改state。</p></li><li><p>公平锁，查看队列中是否有排队的Node，如果有，查看head的next是不是当前线程，然后再决定是否CAS修改state</p></li></ul><p><strong>为什么唤醒Node时，要从后往前遍历找到离head最近的Node？</strong></p><p>在执行addWaiter方法时，先将当前Node的prev指向前一个节点，再将tail指向当前节点。此时上一个节点的next还有没有指向当前节点，如果存在并发问题，会导致遍历时，丢失节点。</p><h3 id="_1-3-reentrantreadwritelock" tabindex="-1">1.3 ReentrantReadWriteLock <a class="header-anchor" href="#_1-3-reentrantreadwritelock" aria-label="Permalink to &quot;1.3 ReentrantReadWriteLock&quot;">​</a></h3><p><strong>读写锁实现实现原理</strong></p><p>还是基于AQS实现的，将state的高16位作为读锁的信息，低16位作为写锁的信息。</p><p>读锁是共享锁。写锁是互斥锁。</p><p><strong>如何避免写锁饥饿的</strong></p><p>读锁获取锁资源时，判断当前在AQS中排队的是否是写锁资源，如果是写锁，读锁会直接在AQS中排队</p><p><strong>读锁重入如何实现</strong></p><p>读锁可能会有多个线程同时持有，如果不清楚每个线程重入的次数，无法确定读锁资源是否释放干净。</p><p>ReentrantReadWriteLock就基于ThreadLocal来记录当前线程读锁重入的次数。</p><p>当然，同时也要对state的高16位，进行修改。</p><p><strong>读锁重入的优化</strong></p><p>第一个持有读锁的线程，无需将重入次数设置到ThreadLocal中，直接使用读写锁内部提供的firstReader来记录当前线程，采用firstReaderHoldCount来记录读锁重入的次数。</p><p>最后一个来竞争读锁资源的线程（不包含第一个），采用cachedHoldCounter来记录锁重入次数，也会在ThreadLocal中存储一份，但是如果当前线程再次重入，不需要从ThreadLocal中获取，而是直接修改cachedHoldCounter即可</p><h2 id="二、threadpoolexecutor" tabindex="-1">二、ThreadPoolExecutor <a class="header-anchor" href="#二、threadpoolexecutor" aria-label="Permalink to &quot;二、ThreadPoolExecutor&quot;">​</a></h2><p><strong>线程池的拒绝策略</strong></p><p>线程池自带四种，如何可以满足业务需求，直接用即可，如果不满足，可以自行实现RejectedExecutionHandler接口，重写功能。</p><p><strong>线程池的状态</strong></p><p>RUNNING，SHOTDOWN，STOP，TIDYING，TERMINATED</p><p>TIDYING是过渡状态，可以从SHUTDOWN和STOP状态转换过来，其实到了TIDYING，工作线程已经没了，工作队列的任务也处理完了。就差执行一个terminated方法，转换到TERMINATED状态</p><p><strong>线程池的ctl属性</strong></p><p>高3位存储线程池状态，低29位存储工作线程个数。</p><p><strong>线程池的执行流程</strong></p><p>不会的，出门右转。</p><p><strong>为什么线程池要添加非核心并且没有任务的工作线程addWroker(null,false);</strong></p><p>当前工作线程个数为0，但是工作队列中有任务</p><p>此时就需要添加一个非核心并且空任务的工作线程去处理阻塞队列中的任务</p><p><strong>Worker中的锁是干嘛的</strong></p><p>Worker中基于AQS实现了一个非可重入锁。</p><p>Worker为了避免中断线程时，Worker还没有初始化完成，导致出现问题。</p><p><strong>如何在线程池之前任务前后做额外处理</strong></p><p>线程池提供了两个勾子函数。</p><h2 id="三、concurrenthashmap-1-8" tabindex="-1">三、ConcurrentHashMap（1.8） <a class="header-anchor" href="#三、concurrenthashmap-1-8" aria-label="Permalink to &quot;三、ConcurrentHashMap（1.8）&quot;">​</a></h2><p><strong>ConcurrentHashMap在JDK1.8中如何实现线程安全</strong></p><p>阿巴阿巴……</p><p><strong>ConcurrentHashMap的散列算法</strong></p><p>阿巴阿巴……</p><p><strong>ConcurrentHashMap的数组长度为何是2的n次幂</strong></p><p>阿巴阿巴……</p><p><strong>ConcurrentHashMap如何实现并发扩容的</strong></p><p>resizeStamp，sizeCtl，扩容线程数 + 1</p><p><strong>ConcurrentHashMap中的addCount如何实现</strong></p><p>addCount在记录ConcurrentHashMap中元素的个数，因为AtomicLong在高并发情况下，性能较低，所以ConcurrentHashMap中采用了LongAdder的实现方式，其实就是将LongAdder的源码，复制过来改了一改。并且在addCount方法中，还会有扩容的判断。</p><p><strong>ConcurrentHashMap红黑树什么情况会转换为链表</strong></p><p>扩容时，或者删除红黑树数据长度小于等于6时，都有可能将红黑树转为链表</p><p><strong>ConcurrentHashMap在有线程写红黑树时，读操作怎么办</strong></p><p>链表在扩容为红黑树的同时，会保留双向链表和红黑树。</p><p>此时会查询双向链表，不会查询红黑树。</p><p><strong>ConcurrentHashMap的lastRun机制是什么</strong></p><p>阿巴阿巴……</p><h2 id="四、并发工具" tabindex="-1">四、并发工具 <a class="header-anchor" href="#四、并发工具" aria-label="Permalink to &quot;四、并发工具&quot;">​</a></h2><h3 id="_4-1-countdownlatch" tabindex="-1">4.1 CountDownLatch <a class="header-anchor" href="#_4-1-countdownlatch" aria-label="Permalink to &quot;4.1 CountDownLatch&quot;">​</a></h3><p><strong>CountDownLatch实现原理</strong></p><p>CountDownLatch基于AQS实现的，初始化时给定一个state的值。</p><p>每次线程执行countDown方法时，对state - 1。</p><p>如果线程在执行await方法时：</p><ul><li><p>state &gt; 0，此时线程挂起</p></li><li><p>state == 0，此时线程被唤醒</p></li></ul><h3 id="_4-2-semaphore" tabindex="-1">4.2 Semaphore <a class="header-anchor" href="#_4-2-semaphore" aria-label="Permalink to &quot;4.2 Semaphore&quot;">​</a></h3><p><strong>Semaphore实现原理</strong></p><p>还是基于AQS实现的，一般用于固定资源，比如连接池，线程池等等。</p><p>类似计数器。每次从线程中基于acquire拿到资源，使用完毕后，基于release归还资源。</p><p><strong>PROPAGATE类型Node的作用</strong></p><p>因为在JDK1.5中，Semaphore存在资源无法被正常使用的情况。</p><p>信号量中有资源，但是线程通过acquire无法获取</p><p>基于PROPAGATE类型的Node，可以在唤醒当前线程后，继续唤醒后续线程</p><h3 id="_4-3-cyclicbarrier" tabindex="-1">4.3 CyclicBarrier <a class="header-anchor" href="#_4-3-cyclicbarrier" aria-label="Permalink to &quot;4.3 CyclicBarrier&quot;">​</a></h3><p><strong>CyclicBarrier实现原理</strong></p><p>Java中的栅栏</p><p>类似CountDownLatch的原理，等待指定数量的线程执行await方法后，一起并行去执行这些线程的后续任务。</p><p>CyclicBarrier是可以重置state的，也就是任务执行一次后，可以重新反复使用当前的CyclicBarrier</p><p><strong>ReentrantLock的Condition的实现原理</strong></p><p>当线程获取到锁资源后，基于Condition挂起线程时，会释放锁资源，并且将当前线程封装到AQS中的Condition中的一个链表中，当基于signal方法唤醒后，会扔到AQS的双向链表中</p><h2 id="_5、阻塞队列" tabindex="-1">5、阻塞队列 <a class="header-anchor" href="#_5、阻塞队列" aria-label="Permalink to &quot;5、阻塞队列&quot;">​</a></h2><h3 id="_5-1-arrayblockingqueue" tabindex="-1">5.1 ArrayBlockingQueue <a class="header-anchor" href="#_5-1-arrayblockingqueue" aria-label="Permalink to &quot;5.1 ArrayBlockingQueue&quot;">​</a></h3><p>基于数组实现的阻塞队列</p><p><strong>虚假唤醒</strong></p><p>在await挂起线程判断的位置，采用while循环去解决虚假唤醒。</p><p>如果使用if判断，会造成多个线程在不满足情况下，去向阻塞队列追加数据，导致安全问题。、</p><h3 id="_5-2-linkedblockingqueue" tabindex="-1">5.2 LinkedBlockingQueue <a class="header-anchor" href="#_5-2-linkedblockingqueue" aria-label="Permalink to &quot;5.2 LinkedBlockingQueue&quot;">​</a></h3><p>基于链表实现的阻塞队列</p><h3 id="_5-3-priorityqueue" tabindex="-1">5.3 PriorityQueue <a class="header-anchor" href="#_5-3-priorityqueue" aria-label="Permalink to &quot;5.3 PriorityQueue&quot;">​</a></h3><p>基于数组实现的二叉堆，基于二叉堆实现的优先级队列</p><h3 id="_5-4-priorityblockingqueue" tabindex="-1">5.4 PriorityBlockingQueue <a class="header-anchor" href="#_5-4-priorityblockingqueue" aria-label="Permalink to &quot;5.4 PriorityBlockingQueue&quot;">​</a></h3><p>基于PriorityQueue实现的阻塞队列</p><h3 id="_5-5-delayedqueue" tabindex="-1">5.5 DelayedQueue <a class="header-anchor" href="#_5-5-delayedqueue" aria-label="Permalink to &quot;5.5 DelayedQueue&quot;">​</a></h3><p>基于PriorityQueue实现的延迟队列，要求插入的数据要实现Delayed接口。</p><h3 id="_5-6-synchronousqueue" tabindex="-1">5.6 SynchronousQueue <a class="header-anchor" href="#_5-6-synchronousqueue" aria-label="Permalink to &quot;5.6 SynchronousQueue&quot;">​</a></h3><p>不会将数组存放到指定位置，生产者放数据，就要一直等到消费者来消费。</p><h2 id="_6、schedulethreadpoolexecutor" tabindex="-1">6、ScheduleThreadPoolExecutor <a class="header-anchor" href="#_6、schedulethreadpoolexecutor" aria-label="Permalink to &quot;6、ScheduleThreadPoolExecutor&quot;">​</a></h2><p><strong>execute，schedule，scheduleAtFixedRate，scheduleWithFixedDelay的区别</strong></p><ul><li><p>execute：正常执行任务，跟定时执行没关系。</p></li><li><p>schedule：延迟一段时间执行。执行一次。</p></li><li><p>scheduleAtFixedRate：可以让任务在固定的周期下执行。（如果任务执行时间，超过了延迟时间，采用任务的执行时间作为周期）这里会采用上次任务执行的时间点，加上延迟时间，作为下次任务的时间</p></li><li><p>scheduleWithFixedDelay：可以让任务在固定的周期下执行。（任务的处理时间，影响下次执行时间）</p></li></ul><h2 id="_7、completablefuture" tabindex="-1">7、CompletableFuture <a class="header-anchor" href="#_7、completablefuture" aria-label="Permalink to &quot;7、CompletableFuture&quot;">​</a></h2><p><strong>CompletableFuture是什么</strong></p><p>实现了异步非阻塞的效果。就是在任务执行完毕后，会主动通知，不需要调用方主动会获取。</p><p><strong>CompletableFuture的后续任务是基于什么存储的</strong></p><p>栈</p><p><strong>CompletableFuture为何不能保证后续任务的执行顺序</strong></p><p>因为任务是其他线程执行，业务线程依然可以给CompletableFuture设置后续任务，如果在设置任务到栈结构之前，前置任务已经执行完了，就不需要再存放到栈结构了，直接执行即可。</p>`,585),i=[e];function t(c,r,o,u,d,h){return a(),s("div",null,i)}const f=n(l,[["render",t]]);export{b as __pageData,f as default};
