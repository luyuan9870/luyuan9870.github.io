import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.BG61BEI0.js";const t="/assets/Pastedimage20240312164024.BFxEneFW.png",l="/assets/Pastedimage20240312164121.CIzarMZ3.png",e="/assets/Pastedimage20240313104210.UJPtswzw.png",u=JSON.parse('{"title":"一、前言","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.04-设计模式/《美团技术》设计模式在外卖营销业务中的实践.md","filePath":"01-Dev/01.04-设计模式/《美团技术》设计模式在外卖营销业务中的实践.md"}'),h={name:"01-Dev/01.04-设计模式/《美团技术》设计模式在外卖营销业务中的实践.md"},p=n('<h1 id="一、前言" tabindex="-1">一、前言 <a class="header-anchor" href="#一、前言" aria-label="Permalink to &quot;一、前言&quot;">​</a></h1><p>随着美团业务的不断迭代和发展，外卖用户的数量也在高速的增长。这个过程中，外卖营销发挥了 <code>中流砥柱</code> 的作用，因为用户的快速增长离不开高效的营销策略。而由于市场环境和业务环境的多变，营销策略往往是复杂多变的，营销技术团队作为营销业务的支持部门，就需要高效且快速的响应营销策略变更带来的需求变动。因此，设计并实现易于拓展和维护的营销系统，是美团外卖营销技术团队不懈追求的目标和必修的基本功。</p><p>本文通过自顶向下的方式，来介绍设计模式如何帮助我们构建一套易拓展、易维护的营销系统。本文会首先介绍设计模式与领域驱动设计（Domain-Driven Design, 以下简称为 DDD） 之间的关系, 然后在阐述外卖营销业务引入业务中用到的设计模式以及其具体的实践案例。</p><h1 id="二、设计模式与领域驱动设计" tabindex="-1">二、设计模式与领域驱动设计 <a class="header-anchor" href="#二、设计模式与领域驱动设计" aria-label="Permalink to &quot;二、设计模式与领域驱动设计&quot;">​</a></h1><p>设计一个营销系统，我们通常的做法是采用自顶向下的方式来解构业务，因此我们引入了 DDD。从战略层面上讲，DDD 能够指导我们完成从问题空间到解决方案的剖析，将业务需求映射为领域上下文以及上下文之间的映射关系。从战术层面上，DDD 能够细化领域上下文，并形成有效的，细化的领域模型来指导工程实践。建立领域模型的一个关键意义在于，能够确保不断拓展和变化的需求在领域模型内不断的演进和发展，而不至于出现模型的腐化和领域逻辑的外溢。关于 DDD 的实践，大家可以参考此前美团技术团队推出的《<a href="https://tech.meituan.com/2017/12/22/ddd-in-practice.html" target="_blank" rel="noreferrer">领域驱动设计在互联网业务开发中的实践 - 美团技术团队</a>》一文。</p><p>同时，我们也需要再代码工程中贯彻和实现领域模型。因为代码工程师领域模型在工程实践中的直观体现，也是领域模型在技术层面的直接表述。而设计模式可以说是链接领域模型与代码工程的一座桥梁，它能有效地解决从领域模型到代码工程的转化。</p><p>为什么说设计模式天然具备成为领域模型到代码工程之间桥梁的作用呢？ 其实，2003 年出版的《领域驱动设计》一书的作者 Eric Evans 在这部开山之作中就已经给出了解释。他认为，立场不同会影响人们如何看待什么是 &quot;模式&quot; 。因此，无论是领域驱动模式，还是设计模式，本质上都是模式，只是解决的问题不一样。站在业务建模的立场上，DDD 的模式解决的事如何进行领域建模。而站在代码实践的立场上，设计模式主要关注于代码的设计和实现。既然本质都是模式，那么它们天然就具有一定的共同之处。</p><p>所谓 <code>模式</code> ，就是一套反复被人使用过验证过的方法论。从抽象或者更宏观的角度上看，只要符合使用场景并且能够解决实际问题，模式应该既可以应用在 DDD 中，也可以应用在设计模式中。事实上 Evans 也是这么做的。他在著作中阐述了 Strategy 和 Cpomposite 这两个传统的 GOF 设计模式是如何来解决领域模型建设的。因此，的那个领域模型需要转化为代码工程师，同构的模式，天然能够将领域模型翻译成代码模型</p><h1 id="三、设计模式在外卖营销业务中的具体案例" tabindex="-1">三、设计模式在外卖营销业务中的具体案例 <a class="header-anchor" href="#三、设计模式在外卖营销业务中的具体案例" aria-label="Permalink to &quot;三、设计模式在外卖营销业务中的具体案例&quot;">​</a></h1><h2 id="_3-1-为什么需要设计模式" tabindex="-1">3.1 为什么需要设计模式 <a class="header-anchor" href="#_3-1-为什么需要设计模式" aria-label="Permalink to &quot;3.1 为什么需要设计模式&quot;">​</a></h2><h3 id="营销业务的特点" tabindex="-1">营销业务的特点 <a class="header-anchor" href="#营销业务的特点" aria-label="Permalink to &quot;营销业务的特点&quot;">​</a></h3><p>如倩文所述，营销业务与交易等其他模式相对稳定的业务的区别在于，营销需求会随着市场、用户、环境的不断变化而进行调整。也正是因此，美团营销技术团队选择了 DDD 进行领域建模，并在适用的场景下，用设计模式在代码工程的层面上实践和反应了领域模型。以此来做到在支撑业务变化的同时，让领域和代码模型健康演进，避免模型腐化。</p><h3 id="理解设计模式" tabindex="-1">理解设计模式 <a class="header-anchor" href="#理解设计模式" aria-label="Permalink to &quot;理解设计模式&quot;">​</a></h3><p>软件设计模式（Design pattern） ，又称设计模式，是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了可重用代码，让代码更容易被他人理解，保证代码可靠性，程序的重用性。可以理解为： “世上本来没有设计模式，用的人多了，便总结出了一套设计模式。”</p><h3 id="设计模式原则" tabindex="-1">设计模式原则 <a class="header-anchor" href="#设计模式原则" aria-label="Permalink to &quot;设计模式原则&quot;">​</a></h3><p>面向对象的设计模式有七大基本原则：</p><ul><li>开闭原则（Open Closed Principle，OCP） 对新增开放，对修改关闭</li><li>单一职责原则（Signle Responsibility Principle，SRP）只做一件事</li><li>里氏替换原则（Liskov Substitution Principle，LSP）</li><li>依赖倒转原则 (Dependency Inversion Principle, DLP)</li><li>接口隔离原则 (Interface Segregation Principle, ISP)</li><li>合成/聚合复用原则 (Composite/Aggregate Reuse Principle, CARP)</li><li>最少知识原则（Least Knowledge Principle，LKP）或者迪米特法则（Law of Demeter，LOD）</li></ul><p>简单理解就是：开闭原则是总纲，他知道我们要对拓展开放，对修改关闭；单一职责原则指导我们实现类要职责单一；里氏替换原则指导我们不要破坏继承体系；依赖倒置原则指导我们要面向接口编程；接口隔离原则指导我们在设计接口的时候要精简单一；迪米特法则指导我们要降低耦合。</p><p>设计模式就是通过这七个原则，来指导我们如何做一个好的设计。但是设计模式不是一套“奇技淫巧”，它是一套方法论，一种高内聚低耦合的设计思想。我们可以在此基础上自由的发挥，甚至设计出自己的一套设计模式。 当然，学习设计模式或者是在工程中实践设计模式。必须深入到某一个特定的业务场景中去，再结合对业务场景的理解和领域模型的建立，才能体会到设计模式思想的精髓。如果脱离具体的业务逻辑去学习或者使用设计模式，那是极其空洞的。接下来我们将通过外卖营销业务的实践，来探讨如何用设计模式来实现可重用、易维护的代码。</p><h2 id="_3-2-邀请下单-业务中设计模式的实践" tabindex="-1">3.2 &quot;邀请下单&quot;业务中设计模式的实践 <a class="header-anchor" href="#_3-2-邀请下单-业务中设计模式的实践" aria-label="Permalink to &quot;3.2 &quot;邀请下单&quot;业务中设计模式的实践&quot;">​</a></h2><h3 id="_3-2-1-业务简介" tabindex="-1">3.2.1 业务简介 <a class="header-anchor" href="#_3-2-1-业务简介" aria-label="Permalink to &quot;3.2.1 业务简介&quot;">​</a></h3><p>&quot;邀请下单&quot;是美团外卖用户邀约其他用户下单后给予奖励的平台。即用户 A 邀请用户 B ，并且用户 B 在美团下单后，给予用户 A 一定的现金奖励（以下简称返奖） 。同时为了协调成本与收益的关系，返奖会有多个计算策略。邀请下单后台主要涉及两个技术要点：</p><ol><li>返奖金额的计算，涉及到不同的计算规则。</li><li>从邀请开始到返奖结束的整个流程。<img src="'+t+'" alt="" loading="lazy"></li></ol><h3 id="_3-2-2-返奖规则与设计模式实践" tabindex="-1">3.2.2 返奖规则与设计模式实践 <a class="header-anchor" href="#_3-2-2-返奖规则与设计模式实践" aria-label="Permalink to &quot;3.2.2 返奖规则与设计模式实践&quot;">​</a></h3><h4 id="业务建模" tabindex="-1">业务建模 <a class="header-anchor" href="#业务建模" aria-label="Permalink to &quot;业务建模&quot;">​</a></h4><p><img src="'+l+'" alt="" loading="lazy"></p><p>从这份业务逻辑图中可以看到返奖金额计算的规则。首先要根据用户状态确定用户是否满足返奖条件。如果满足返奖条件，则继续判断当前用户属于新用户还是老用户，从而给予不同的奖励方案。一共涉及以下几种不同的奖励方案： <strong>新用户</strong></p><ul><li>普通奖励（给予固定金额的奖励）</li><li>梯度奖励（根据用户邀请的人数给予不同的奖励金额，邀请的人越多，奖励金额越多） <strong>老用户</strong></li><li>根据老用户的用户属性来计算返奖金额。为了评估不同的邀新效果，老用户返奖会存在多种返奖机制。 计算完奖励金额后，还需要更新用户的奖金信息，以及通知结算服务用户的金额进行结算。这两个模块对于所有的奖励来说都是一样的。 可以看到，无论是何种用户，对于整体返奖流程是不变的，唯一变化的是返奖规则。此处，我们可以参考<strong>开闭原则</strong>，对于返奖流程保持封闭，对于可能拓展的返奖规则进行开放。我们将返奖规则抽象为<strong>返奖策略</strong>，即针对不同用户类型的不同返奖方案，我们视为不同的返奖策略，不同的返奖策略会产生不同的返奖金额结果。</li></ul><p>在我们的领域模型里，返奖策略是一个<strong>值对象</strong> 我们通过工厂的方式生产针对不同用户的奖励策略值对象。下文我们将介绍以上领域模型的工程实现，即工厂模式和策略模式的实际使用。</p><p><strong>模式： 工厂模式</strong> 工厂模式又细分为工厂方法模式和抽象工厂模式，本文主要介绍工厂方法模式。 <strong>模式定义：</strong> 定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂方法是一个类的实例化延迟到其子类。 工厂模式通用类图如下：</p><p><img src="'+e+`" alt="" loading="lazy"></p><p>我们通过一段较为通用的代码来解释如何使用工厂模式：</p><div class="language-Java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">Java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 抽象的产品</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> abstract</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Product</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> abstract</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> method</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//定义一个具体的产品(可以定义多个具体的产品)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ProductA</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Product</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> methd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){};</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 具体的执行逻辑</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 抽象的工厂</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">abstract</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Factory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	abstract</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createProduct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Class&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">c</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//具体的工厂可以生产处相应的产品</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> FactoryA</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Factory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	Product </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createProduct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Class </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">c</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		Product product </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (Product) Class.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(c.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">newInstance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> product;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>模式： 策略模式</strong> 模式定义： 定义一系列算法、操作、行为，将每个算法都封装起来，并且他们可以互换。策略模式是一种对象行为模式。</p><hr><p><a href="https://tech.meituan.com/2020/03/19/design-pattern-practice-in-marketing.html" target="_blank" rel="noreferrer">原文链接:设计模式在外卖营销业务中的实践 - 美团技术团队</a></p>`,36),r=[p];function k(d,o,c,g,E,y){return a(),i("div",null,r)}const _=s(h,[["render",k]]);export{u as __pageData,_ as default};
