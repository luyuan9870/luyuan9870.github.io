import{_ as a,c as e,o as t,a4 as p}from"./chunks/framework.BG61BEI0.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.98-八股/并发编程突击班-基础篇.md","filePath":"01-Dev/01.98-八股/并发编程突击班-基础篇.md","lastUpdated":1712833290000}'),i={name:"01-Dev/01.98-八股/并发编程突击班-基础篇.md"},o=p('<p>并发编程突击班1（基础方向）：</p><h4 id="_1、构建线程方式" tabindex="-1">1、构建线程方式？ <a class="header-anchor" href="#_1、构建线程方式" aria-label="Permalink to &quot;1、构建线程方式？&quot;">​</a></h4><p>Java中就三种方式：</p><ul><li>继承Thread</li><li>实现Runnable</li><li>实现Callable</li></ul><p>本质都是Runnable，其实是一种。</p><p>因为继承Thread，间接实现了Runnable<img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1692631016064/186a36ba4ee04e839359a205cff4e418.png" alt="image.png" loading="lazy"></p><p>实现Callable，需要FutureTask做封装，在启动线程时，依然是执行的FutureTask实现Runnable时重写的run方法，在run方法内部，执行的Callable的call方法。</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1692631016064/d4a5e186c90c463dad259fa4c4ac2a86.png" alt="image.png" loading="lazy"></p><p>Runnable和Callable有啥区别，使用场景</p><p>答：如果启动子线程执行任务后需要有返回结果，使用Callable。</p><p>Runnable的run方法，无法抛出异常，返回结果就是void</p><p>Callable的call方法，可以抛出异常，返回结果是Object</p><hr><h4 id="_2、线程状态" tabindex="-1">2、线程状态？ <a class="header-anchor" href="#_2、线程状态" aria-label="Permalink to &quot;2、线程状态？&quot;">​</a></h4><p>Java中的Thread类里有枚举，规定了，只有6种</p><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1692631016064/001d1e1779b54c35ada0e734e4265cae.png" alt="image.png" loading="lazy"></p><p>BLOCKED，WAITING，TIME_WAITING，本质上一样，都是CPU无法分配时间片</p><p>BLOCKED：synchronized没拿到锁，阻塞。</p><p>WAITING：Unsafe.park()，JUC包下的类在挂起线程时，用的都是这个。</p><p>TIMED_WAITING：Unsafe.park(time,unit)，默认阻塞这么久，会被自动唤醒，变为RUNNABLE状态</p><p>所谓线程挂起，上面三种，都是线程挂起。</p><p><strong>但是操作系统方向里的线程，有5种</strong></p><p>NEW，READY，RUNNING，BLOCKING，TERMINATED</p><h4 id="_3、join实现原理" tabindex="-1">3、join实现原理？ <a class="header-anchor" href="#_3、join实现原理" aria-label="Permalink to &quot;3、join实现原理？&quot;">​</a></h4><p>比如主线程执行t1.join()，主线程需要等待t1执行完之后，再执行。</p><p>主线程挂起了一会，等到t1执行完了，主线程被唤醒？</p><p>答：Join方法本质是基于synchronized以及wait和notify实现的。直接针对当前线程对象加锁，然后wait挂起线程，wait判断的逻辑是t1线程是否存活。isAlive。如果t1线程存活，WAITING这，如果t1线程凉凉了，isAlive会返回false，不用挂起了，被唤醒。</p><h4 id="_4、wait和notify-为啥要扔synchronized里" tabindex="-1">4、wait和notify？为啥要扔synchronized里？ <a class="header-anchor" href="#_4、wait和notify-为啥要扔synchronized里" aria-label="Permalink to &quot;4、wait和notify？为啥要扔synchronized里？&quot;">​</a></h4><p>wait和notify是在持有synchronized锁时，</p><ul><li>wait方法是让持有锁的线程释放锁资源，并且挂起。</li><li>notify方法是让持有锁的线程，去唤醒之前执行wait方法挂起的线程，让被唤醒的线程抢锁。</li></ul><p>至于为何要在持有synchronized时，才能执行wait和notify，是因为在调整线程存放的队列时，需要持有当前synchronized锁里面的ObjectMonitor，没持有，不让操作。</p><p>并且执行wait需要释放锁资源，你没持有锁资源，你释放什么。。。</p><p><strong>在ObjectMonitor里，为什么有了cxq还要有EntryList？</strong></p><p>答：synchronized到了重量级锁时，会利用CAS拿锁么？！！会！！<img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1692631016064/f8c739dfdbb04ef99879901d94afe58f.png" alt="image.png" loading="lazy"></p><p><a href="https://hg.openjdk.org/jdk8u/jdk8u/hotspot/file/69087d08d473/src/share/vm/runtime/objectMonitor.cpp" target="_blank" rel="noreferrer">https://hg.openjdk.org/jdk8u/jdk8u/hotspot/file/69087d08d473/src/share/vm/runtime/objectMonitor.cpp</a></p><p>cxq队列就是当竞争激烈时，锁持有时间比较长的时候，将线程扔到cxq队列里，挂起。</p><p>EntryList的目的：缓冲~</p><ul><li>为了避免大量线程追加到cxq队列的头部或者是尾部（默认头部），造成压力过大。</li><li>当线程拿锁时，在重量级锁的情况下，也会走CAS，当自旋失败没拿到锁，优先扔到EntryList</li></ul><p><strong>重量级锁怎么定义的：查看对象的对象头里的MarkWord里的标识</strong></p><hr><h4 id="_5、为啥线程停止不推荐使用stop-java老郑" tabindex="-1">5、为啥线程停止不推荐使用stop？Java老郑 <a class="header-anchor" href="#_5、为啥线程停止不推荐使用stop-java老郑" aria-label="Permalink to &quot;5、为啥线程停止不推荐使用stop？Java老郑&quot;">​</a></h4><p>stop方法，会直接强制停止线程，不让执行。</p><p>用了stop会有什么问题？比如ConcurrentHashMap在执行put方法时，需要先将数据扔到数组或者链表或者红黑树里，扔进去之后，还需要记录元素个数，做+1操作。如果线程执行put后，数据扔进去了，但是没执行+1，导致线程安全问题。</p><h4 id="_6、线程中断是什么" tabindex="-1">6、线程中断是什么？ <a class="header-anchor" href="#_6、线程中断是什么" aria-label="Permalink to &quot;6、线程中断是什么？&quot;">​</a></h4><p>线程中断大方向和线程停止相关联。推荐停止线程用interrupt中断。</p><p>线程不是你想停，想停就能停。</p><p>interrupt只是将线程的中断标记未从默认的false，改为了true。</p><p>同时，如果线程处在WAITING或者TIMED_WAITING状态下，会被唤醒。</p><p>所以线程停止需要基于判断isInterruptted或者基于线程休眠等操作，触发结束run方法的操作。</p><hr><p><strong>主线程启动了子线程，但是主线程凉了，子线程还在么？</strong></p><p>这里要看子线程是用户线程，还是守护线程。</p><p>如果是用户线程，主线程凉了，不影响子线程。</p><p>如果子线程是守护线程，主线程一凉，子线程也凉！</p><h4 id="_7、多次对一个thread对象执行start会怎样" tabindex="-1">7、多次对一个thread对象执行start会怎样？ <a class="header-anchor" href="#_7、多次对一个thread对象执行start会怎样" aria-label="Permalink to &quot;7、多次对一个thread对象执行start会怎样？&quot;">​</a></h4><p>抛异常~一个Thread对象，不允许多次执行start方法。</p><h4 id="_8、项目中为什么使用多线程" tabindex="-1">8、项目中为什么使用多线程？ <a class="header-anchor" href="#_8、项目中为什么使用多线程" aria-label="Permalink to &quot;8、项目中为什么使用多线程？&quot;">​</a></h4><p>压榨CPU。为了提升效率。</p><p>优化某一个接口，单线程处理，500ms，你上了多线程，可能200ms了。</p><p>不是所有接口都能上多线程优化，要看业务。</p><p>（IO密集）比如业务中有多个没有关联的网络IO的操作，可以上多线程并行处理，减少IO对程序性能带来的影响。</p><p>（CPU密集）比如你有一个相对比较大的数据体量做计算或者做数据的封装。可以将比较庞大的数据量做一个切分，让多个线程同时做处理，最后聚合在一起。也可以提升处理效率。</p><p>一行数据，1kb - 300多个字</p><h4 id="_9、为何要采用线程池" tabindex="-1">9、为何要采用线程池？ <a class="header-anchor" href="#_9、为何要采用线程池" aria-label="Permalink to &quot;9、为何要采用线程池？&quot;">​</a></h4><p>避免每次任务都重新创建线程，任务结束线程还要销毁。线程创建需要重新开辟内存空间，线程结束，需要释放内存空间。线程池有池化技术，可以复用线程，规避频繁创建和销毁。</p><p>如果每次来任务，你都直接构建线程处理，这样一来，如果并发大，线程个数直线飙升，对性能没好处。CPU要来回在线程之间切换分配时间片，如果线程太多，资源都浪费在线程切换上了。线程池可以指定好工作线程的个数，别超过限制，超过了，甩你拒绝策略。</p><p>有了线程池，可以更好的去监控任务的执行情况。</p><h4 id="_10、线程池中有空闲的核心线程-投递任务会交给他处理嘛" tabindex="-1">10、线程池中有空闲的核心线程，投递任务会交给他处理嘛？ <a class="header-anchor" href="#_10、线程池中有空闲的核心线程-投递任务会交给他处理嘛" aria-label="Permalink to &quot;10、线程池中有空闲的核心线程，投递任务会交给他处理嘛？&quot;">​</a></h4><p>首先，线程池的工作流程：</p><p>1、走构建核心线程</p><p>2、扔阻塞队列</p><p>3、构建非核心线程</p><p>4、拒绝策略</p><ul><li>核心线程空闲时，在干嘛？ <strong>在阻塞队列执行take方法，等新任务呢。</strong></li><li>如果核心线程个数已经满了，那么任务会扔到阻塞队列，让核心线程处理。</li><li>如果核心线程个数没达到要求，会构建新的核心线程，去处理这个任务。</li></ul><h4 id="_11、核心线程参数设置为0-任务怎么处理" tabindex="-1">11、核心线程参数设置为0，任务怎么处理？ <a class="header-anchor" href="#_11、核心线程参数设置为0-任务怎么处理" aria-label="Permalink to &quot;11、核心线程参数设置为0，任务怎么处理？&quot;">​</a></h4><p>如果核心线程数设置为0，任务会直接扔到阻塞队列。</p><p>但是现在出现了一个场景，阻塞队列有任务，但是没有线程，现在的情况叫任务饥饿。</p><p>此时，会构建一个非核心线程，去处理阻塞队列中的任务。而且线程池的最大线程数，最少设置1。</p><p>（核心线程数可以设置为0，但是最大线程数最少设置为1）</p><p>最大线程数 = 核心线程数 + 非核心线程数。</p><h4 id="_12、线程池的工作线程如何区别核心和非核心的-怎么区分的" tabindex="-1">12、线程池的工作线程如何区别核心和非核心的？怎么区分的？ <a class="header-anchor" href="#_12、线程池的工作线程如何区别核心和非核心的-怎么区分的" aria-label="Permalink to &quot;12、线程池的工作线程如何区别核心和非核心的？怎么区分的？&quot;">​</a></h4><p>线程池里，不区分核心线程跟非核心线程。仅仅是在创建的时候，基于有参构造的corePoolSize和maximumPoolSize，做个判断，工作线程最终都是由thread.start启动的。</p><hr><p>如果此时线程池核心线程为3个，最大线程为4个。此时工作线程是4个，3个核心，1个非核心满满登登。</p><p>此时一个核心线程抛异常，结束了，那么会再创建一个核心线程么？</p><p>不会。因为线程池不区分核心和非核心，里面只判断个数，如果有一个工作线程凉了，那还是3个工作线程，满足参数的哟求。</p><hr><p>核心线程会结束么？</p><p>1、默认不会，但是可以设置参数，然核心线程也有超时时间。allowCoreThreadTimeOut，默认为false，可以设置为true</p><p>2、本身不区分核心还是非核心，如果线程在抛出异常等原因，导致结束后，只会根据个数判断，是否满足要求。</p><h4 id="_13、工作线程如何被回收-存活时间到了-回收前需要做哪些判断" tabindex="-1">13、工作线程如何被回收（存活时间到了）？回收前需要做哪些判断？ <a class="header-anchor" href="#_13、工作线程如何被回收-存活时间到了-回收前需要做哪些判断" aria-label="Permalink to &quot;13、工作线程如何被回收（存活时间到了）？回收前需要做哪些判断？&quot;">​</a></h4><p>1、线程池的工作状态不是RUNNING，可以回收。</p><p>2、当前工作线程个数，大于corePoolSize。（有非核心线程）</p><p>3、确保不会出现任务饥饿的问题。</p><p>回收的方式，就是run方法结束了，线程就销毁了。</p><h4 id="_14、创建线程池的方式" tabindex="-1">14、创建线程池的方式？ <a class="header-anchor" href="#_14、创建线程池的方式" aria-label="Permalink to &quot;14、创建线程池的方式？&quot;">​</a></h4><p>两个大方向：</p><p>1、使用Executors自带的方式构建（不推荐），线程池参数很多，这种自带的，只提供了修改部分参数的功能，无法完整的掌握线程池的细节。</p><ul><li>定长的newfixed</li><li>单例的Single</li><li>非固定长度的Cached</li><li>执行定时任务的Schedule</li><li>使用forkJoinPool的WorkStealing</li></ul><p>2、手动new ThreadPoolExecutor，自己指定7个核心参数。（推荐）更好把控线程池的情况。</p><hr><p><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/2746/1692631016064/7999bab552c344feb545129d1113aa3c.png" alt="image.png" loading="lazy"></p>',102),n=[o];function r(l,s,h,c,d,u){return t(),e("div",null,n)}const b=a(i,[["render",r]]);export{_ as __pageData,b as default};
