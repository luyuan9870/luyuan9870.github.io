import{_ as n,E as i,c as s,m as e,a as t,J as o,w as r,a4 as l,o as c}from"./chunks/framework.BG61BEI0.js";const h="/assets/20240306135359.BpwJVkm3.png",Z=JSON.parse('{"title":"推荐系统从入门到放弃-概述","description":"","frontmatter":{"author":"luyuan","titel":"推荐系统从入门到放弃","date":"2024-04-28 09:39","tags":["推荐系统","个性化推荐"]},"headers":[],"relativePath":"02-Person/00-业务学习/11-推荐系统/00-《推荐系统从入门到放弃》/01-概述.md","filePath":"02-Person/00-业务学习/11-推荐系统/00-《推荐系统从入门到放弃》/01-概述.md"}'),p={name:"02-Person/00-业务学习/11-推荐系统/00-《推荐系统从入门到放弃》/01-概述.md"},d=l('<h1 id="推荐系统从入门到放弃-概述" tabindex="-1">推荐系统从入门到放弃-概述 <a class="header-anchor" href="#推荐系统从入门到放弃-概述" aria-label="Permalink to &quot;推荐系统从入门到放弃-概述&quot;">​</a></h1><blockquote><p><strong>前言</strong> 公司在做跨境电商，需要负责独立站的推荐系统。由于之前没有过相关经验，是以一个业务小白的身份来接触推荐系统。故在网络利用强大的搜索引擎来了解 <code>推荐系统</code> 的相关知识。发现这是一门非常有意思的领域，几乎涵盖了人们生活中的方方面面。 现在几乎所有的网站和应用里最显眼最重要的位置都是推荐系统。电商软件 <code>得物</code> <code>京东</code> <code>淘宝</code> ; 在首页和商品附近的页面都会有 <code>推荐商品</code> 和 <code>猜你喜欢</code> 视频软件 <code>腾讯视频</code> <code>优酷视频</code> <code>爱奇艺</code> <code>B站</code> ;他们的首页和搜索页中也会有推荐和猜你喜欢看的影片。甚至美团，高德等等的一系列软件都有推荐系统的影子 本系列以一个业务小白的视角和行业的整体趋势变化来去帮助技术人员更好的理解 #推荐系统 的必备知识</p></blockquote><h2 id="_1-为什么要学习推荐系统" tabindex="-1">1. 为什么要学习推荐系统 ? <a class="header-anchor" href="#_1-为什么要学习推荐系统" aria-label="Permalink to &quot;1. 为什么要学习推荐系统 ?&quot;">​</a></h2><p><strong>职位很重要</strong></p><ul><li>推荐系统的改进可以创造巨大的收入，甚至决定企业的成败；</li><li>头条、抖音、快手，都是以推荐系统作为流量分发的主要手段；</li><li>淘宝、京东、亚马逊等商城，<code>为你推荐</code>、<code>猜你喜欢</code>、<code>看了又看</code>、<code>买了又买</code> 等页面随处可见；</li><li>据报道，推荐系统给亚马逊带来了 35%的销售收入，给 Netflix 带来了高达 75%的消费，并且 Youtube 主页上 60%的浏览来自推荐服务，Google 新闻有 38%的点击量来自推荐服务；</li></ul><p><strong>发展广阔</strong></p><ul><li>技术方向涉及大数据处理、流式计算、数据挖掘、机器学习、高并发服务、用户体验等领域，不论是想广度发展或者深度发展都能满足</li></ul><h2 id="_2-推荐系统是什么" tabindex="-1">2. 推荐系统是什么 ? <a class="header-anchor" href="#_2-推荐系统是什么" aria-label="Permalink to &quot;2. 推荐系统是什么 ?&quot;">​</a></h2><p>简单来说：推荐系统是根据用户的历史行为，向用户推荐他感兴趣的内容。基本任务就是联系用户和信息，解决信息过载的问题。</p><p>随着当今时代的飞速发展, 信息量爆炸式增长, 人们越来越感觉在面对海量数据时显得束手无策, 正是因为要解决 <code>信息过载</code> 的问题, 人们提出了<code>推荐系统</code>的概念</p><p><strong>举个栗子</strong></p>',11),_=e("br",null,null,-1),u=e("strong",null,"(信息量太小则不需要被推荐, 用户自己决定)",-1),b=e("br",null,null,-1),f=e("br",null,null,-1),m=e("br",null,null,-1),q=e("br",null,null,-1),g=e("br",null,null,-1),k=e("br",null,null,-1),w=e("strong",null,"(有明确的目标则使用搜索系统)",-1),x=e("br",null,null,-1),F=e("br",null,null,-1),P=e("br",null,null,-1),j=e("strong",null,"(没有明确目标则使用推荐系统)",-1),I=e("br",null,null,-1),A=e("br",null,null,-1),z=e("p",null,[t("这就是"),e("code",null,"推荐系统"),t("。当你遇到信息过载时，而你有没有明确的目标，这时你需要一个向自动化的专家描述你的需求。")],-1),T=e("p",null,"他可以分析你的历史兴趣、分析信息流中的信息内容、分析当前的情况、分析网络环境上下文等等相关的一系列信息，从而挑选出符合你要求的信息给你。 推荐是基于用户的兴趣，平台主动去探索为用户推荐可能感兴趣的商品",-1),C=e("p",null,[e("strong",null,"注意，这里是说分析历史兴趣，那么如果作为一个新用户，是没有任何的历史信息的，这个时候需要通过冷启动的方式来解决这个问题，一般会使用当前系统的热点数据，做随机")],-1),N=e("p",null,"1.主要是指应用协同智能（Collaborative intelligence）做推荐的技术。推荐系统的两大主流类型是基于内容的推荐系统和协同过滤（Collaborative Filtering）。另外还有基于知识的推荐系统（包括基于本体和基于案例的推荐系统）是一类特殊的推荐系统，这类系统更加注重知识表征和推理。",-1),D=l('<p>3.对用户而言，推荐系统能帮助用户找到喜欢的物品/服务，帮忙进行决策；对服务提供方而言，推荐系统可以给用户提供个性化的服务，提高用户信任度和粘性，增加营收</p><h3 id="_2-1-推荐系统在国内的兴起由来" tabindex="-1">2.1 推荐系统在国内的兴起由来 <a class="header-anchor" href="#_2-1-推荐系统在国内的兴起由来" aria-label="Permalink to &quot;2.1 推荐系统在国内的兴起由来&quot;">​</a></h3><p>以当下的视角看, 推荐系统在各行各业上都得到了广泛的应用, 美团, 得物, 抖音, 今日头条, 京东, 淘宝, 拼多多, 小红书等等. 站在国内互联网行业发展的视角, 推荐系统在国内兴起有着几个标志性事件的</p><h4 id="_2-1-1-2012-年的今日头条" tabindex="-1">2.1.1 2012 年的今日头条 <a class="header-anchor" href="#_2-1-1-2012-年的今日头条" aria-label="Permalink to &quot;2.1.1 2012 年的今日头条&quot;">​</a></h4><p>2012 年张一鸣带着自己沉淀多年的推荐算法开始了创业-- <code>字节跳动</code>, 第一个应用就是今日头条。在 2012 年的时间节点上，张一鸣就认识到未来是移动互联网的时代，而移动互联网时代会给人们带来爆炸式信息，使得人们面对的选择越来越多，面对 #信息超载 ，人们常常无所适从。 在这个大背景下, 人工编辑信息分发发放的形式已经跟不上时代的步伐, 原因有二一方面效率低下, 一方面人工成本太高. 而通过推荐系统来实现更加智能和个性的推荐就是最好的方式.</p><p>今日头条的上线, 标志着国内的搜索推荐系统走上了舞台前方.</p><h4 id="_2-1-2-2015-年的淘宝全面进化-千人千面" tabindex="-1">2.1.2 2015 年的淘宝全面进化 #千人千面 <a class="header-anchor" href="#_2-1-2-2015-年的淘宝全面进化-千人千面" aria-label="Permalink to &quot;2.1.2 2015 年的淘宝全面进化 #千人千面&quot;">​</a></h4><p>蒋凡在阿里主导搭建了 <code>千人千面</code> 推荐系统，以及成功布局了淘宝直播。2015 年淘宝双 11 全面开启千人千面时代，以往大家在淘宝的首页，推荐页，看到的商品基本都是一样的，并没有按照用户的兴趣进行个性化分发商品推荐。而在 2015 年的双 11，淘宝正式宣布开启 <code>千人千面</code> 的时代, 当年双 11 的成交额无线占比 74.83%。从此以后蒋凡带领着阿里，从月活跃用户 4 亿多，一直提升到巅峰期接近 9 亿。</p><p>淘宝在开启千人千面的时代标志着推荐系统在电商领域的分发效率远远超过了人工配置和 BI (商业智能) 的方式, 推荐系统已经渗透到人们生活的各个领域行业当中, 从阅读新闻到衣食住行的</p><h4 id="_2-1-3-2020-年的淘宝-板块改版-焦点图下移-推荐模块上提" tabindex="-1">2.1.3 2020 年的淘宝, 板块改版, 焦点图下移, 推荐模块上提 <a class="header-anchor" href="#_2-1-3-2020-年的淘宝-板块改版-焦点图下移-推荐模块上提" aria-label="Permalink to &quot;2.1.3 2020 年的淘宝, 板块改版, 焦点图下移, 推荐模块上提&quot;">​</a></h4><p>淘宝的产品经理为什么要这么做? <img src="'+h+'" alt="" loading="lazy"></p><p>2020 年双 11 前夕淘宝首页发生了一个大改版，就是原本首页最上方的横版焦点图下移到了下方推荐信息流模块的第一坑，而中间的各种频道和运营楼层全部下线，最下方的“猜你喜欢”模块大幅上移。而淘宝为什么这么做？核心原因其实也就只有一个，以往的这种信息分发方式已经不能适应当前用户的需求了，已经不是最优的信息分发模式。各种运营手动配置的楼层下线，大幅提升基于推荐模型千人千面分发的“猜你喜欢”模块的位置。</p><h3 id="_2-2-推荐系统为什么会兴起" tabindex="-1">2.2. 推荐系统为什么会兴起 <a class="header-anchor" href="#_2-2-推荐系统为什么会兴起" aria-label="Permalink to &quot;2.2. 推荐系统为什么会兴起&quot;">​</a></h3><p>推荐系统在 2010 年后才开始兴起, 早在上世纪 90 年代就已经有了各类推荐算法协同过滤等. 为什么那时候没有发展起来</p><h4 id="_2-2-1-时代的变化" tabindex="-1">2.2.1 时代的变化 <a class="header-anchor" href="#_2-2-1-时代的变化" aria-label="Permalink to &quot;2.2.1 时代的变化&quot;">​</a></h4><p>2010 年时智能手机刚开始普及, 互联网慢慢从 PC 时代进入到移动时代, 用户可以无时无刻拿着手机上网, 同时 4 G 网络的普及网速更快流量更便宜. 人们开始有更多时间在网上漫无目的的冲浪，同时人们也不断地在网上生产更多的内容。爆炸式的信息增长和爆炸式的用户增长，二者之间如何实现更好的匹配。就需要一种更加智能的方式，也就是推荐系统。</p><h4 id="_2-2-2-数据的积累" tabindex="-1">2.2.2 数据的积累 <a class="header-anchor" href="#_2-2-2-数据的积累" aria-label="Permalink to &quot;2.2.2 数据的积累&quot;">​</a></h4><p>因为移动互联网的到来, 数据量的爆发式增长, 用户在网络上表达的越多, 计算机能够采集到用户的信息就越多. 推荐模型基于这些用户基础数据就有了更多的模型训练和学习能力, 了解了用户的兴趣和需求就能做到更准确的推荐.</p><h4 id="_2-2-3-技术的进步" tabindex="-1">2.2.3 技术的进步 <a class="header-anchor" href="#_2-2-3-技术的进步" aria-label="Permalink to &quot;2.2.3 技术的进步&quot;">​</a></h4><p>大规模机器学习和深度学习在推荐系统领域的应用。2010 年以前推荐系统主要使用的还是传统的协同过滤和基于内容推荐的算法。2010 年以后随着算法科学家们在推荐系统领域的不断研究，将大规模机器学习框架引入到了推荐系统领域，大幅提升了推荐系统模型分发的效率和效果。后面又随着深度学习模型的应用，推荐系统的推荐效果也越来越好，对于用户和物品的特征挖掘的更深更广。</p><h2 id="_3-推荐系统解决了什么问题" tabindex="-1">3. 推荐系统解决了什么问题 ? <a class="header-anchor" href="#_3-推荐系统解决了什么问题" aria-label="Permalink to &quot;3. 推荐系统解决了什么问题 ?&quot;">​</a></h2><h3 id="_3-1-推荐系统能干什么-推荐系统在业务上的体现" tabindex="-1">3.1 推荐系统能干什么? (推荐系统在业务上的体现) <a class="header-anchor" href="#_3-1-推荐系统能干什么-推荐系统在业务上的体现" aria-label="Permalink to &quot;3.1 推荐系统能干什么? (推荐系统在业务上的体现)&quot;">​</a></h3><p>这里分为手段和目的,</p><ol><li>尿布与啤酒的故事 (手段) <ol><li>上世纪 90 年代，美国沃尔玛的超市管理人员分析销售数据时发现了一个令人难于理解的现象：在某些特定的情况下，“啤酒”与“尿布”两件看上去毫无关系的商品会经常出现在同一个购物篮中.</li><li>按常规思维，尿布与啤酒风马牛不相及，沃尔玛正是借助了关联规则分析的数据挖掘技术对海量交易数据进行挖掘和分析，发现这一藏在数据背后的奇特价值的（据说，在美国有婴儿的家庭中，一般是母亲在家中照看婴儿，年轻的父亲前去超市购买尿布。父亲下班之后去购买尿布的同时，往往会顺便为自己购买啤酒）。</li></ol></li><li>推荐系统带来的 GMV (目的) <ol><li>美国《连线》杂志主编 Chris anderson 曾在《长尾理论》中指出过 28 原则（80%的销售额来自于 20%的热门商品），在互联网出世之后受到了极大的挑战，由于在互联网条件下，货架的成本极端低廉，电子商务往往能够出售比传统零售店更多的商品。虽然这些商品绝大多数都不热门，但是这些商品的数目极其庞大，因此这些非热门商品的总销售额也是一笔很大的 GMV。因此如果想要提升这些非热门商品的销售额，就必须充分了解用户的兴趣，而这正是推荐系统主要解决的问题。</li><li>Netflix 有 2/3 被观看的电影来自推荐系统，Google 新闻有 38%的点击量来自推荐系统；Amazon 电商有 35%的销量来自推荐系统的推荐<br></li></ol></li></ol><p>以电商系统为例, 不管是独立站还是 APP, 它的流量场域不会完全都是基于推荐系统. 一般划分为 <code>搜索结果页</code>、 <code>频道专题页</code>、 <code>推荐信息流</code></p><h2 id="_4-未来的发展方向" tabindex="-1">4. 未来的发展方向 <a class="header-anchor" href="#_4-未来的发展方向" aria-label="Permalink to &quot;4. 未来的发展方向&quot;">​</a></h2><p>机器学习和算法推荐</p><p>可能会出现一些更类似于人类的想法, 就像是身边的朋友提出的建议 #ChatGPT</p><p>推荐系统的应用将会快速扩散的各个领域</p><p>例如: 百度开发者搜索引擎就是一个专注于 IT 行业的人员使用的引擎, 里面录入的信息几乎都是 IT 行业的内容.</p><hr><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-label="Permalink to &quot;参考文献&quot;">​</a></h2><p><a href="https://www.woshipm.com/pd/3487987.html" target="_blank" rel="noreferrer">初识推荐系统</a></p><p><a href="https://www.jiqizhixin.com/graph/technologies/6ca1ea2d-6bca-45b7-9c93-725d288739c3" target="_blank" rel="noreferrer">推荐系统 | 机器之心</a></p><p><a href="https://juejin.cn/post/7091105158708330509" target="_blank" rel="noreferrer">深入浅出推荐系统（一）：推荐系统基本架构 - 掘金</a></p><p><a href="https://cloud.tencent.com/developer/article/1949426" target="_blank" rel="noreferrer">从零开始了解推荐系统全貌-腾讯云开发者社区-腾讯云</a></p><p><a href="https://zhuanlan.zhihu.com/p/27502172" target="_blank" rel="noreferrer">推荐系统从入门到接着入门 - 知乎</a></p><p><a href="https://www.woshipm.com/pd/4223123.html" target="_blank" rel="noreferrer">23张图，带你入门推荐系统 | 人人都是产品经理</a></p><p><a href="https://zhuanlan.zhihu.com/p/487869240" target="_blank" rel="noreferrer">推荐策略产品经理必读系列—第一讲推荐系统的兴起 - 知乎</a></p><p><a href="https://aws.amazon.com/cn/blogs/china/recommended-system-overview-of-recommended-system-series-part-1/" target="_blank" rel="noreferrer">推荐系统系列之推荐系统概览（上） | 亚马逊AWS官方博客</a></p><p><a href="https://twocups.cn/index.php/2022/12/18/50/" target="_blank" rel="noreferrer">【推荐系统系列】推荐系统入门 – Twocups</a></p><p><a href="https://blog.csdn.net/qq_38253837/article/details/110248354" target="_blank" rel="noreferrer">推荐系统从入门到实战笔记_裴帅帅 机器学习实战-CSDN博客</a></p><p><a href="https://juejin.cn/post/6844903687903510536?searchId=2024042915474928B0EE5C368225989C3C" target="_blank" rel="noreferrer">学习这篇总结后，你也能做出天天快报一样的推荐系统 - 掘金</a></p><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2F2SkhIfdgFxWQXIRZ55fLag" title="https://mp.weixin.qq.com/s/2SkhIfdgFxWQXIRZ55fLag" target="_blank" rel="noreferrer">《蘑菇街推荐工程实践》</a></p><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.leiphone.com%2Fnews%2F201801%2FXlIxFZ5W3j8MvaEL.html" title="https://www.leiphone.com/news/201801/XlIxFZ5W3j8MvaEL.html" target="_blank" rel="noreferrer">《今日头条算法原理》</a></p><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FDcf_YnioDVEjHN5gNU16eQ" title="https://mp.weixin.qq.com/s/Dcf_YnioDVEjHN5gNU16eQ" target="_blank" rel="noreferrer">《推荐算法在闲鱼小商品池的探索与实践》</a></p><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2F1xw6In07XEIy0ZM05wJLXw" title="https://mp.weixin.qq.com/s/1xw6In07XEIy0ZM05wJLXw" target="_blank" rel="noreferrer">饿了么推荐系统：从 0 到 1</a></p><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzI0MjczMjM2NA%3D%3D%26mid%3D2247483872%26idx%3D1%26sn%3Ddb0fbb2bec0d4e68593f1b9bfc20a8b5" title="https://mp.weixin.qq.com/s?__biz=MzI0MjczMjM2NA==&amp;mid=2247483872&amp;idx=1&amp;sn=db0fbb2bec0d4e68593f1b9bfc20a8b5" target="_blank" rel="noreferrer">《爱奇艺个性化推荐排序实践》</a></p><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FFBzd0x4_A9z-r0f3ZKFGuw" title="https://mp.weixin.qq.com/s/FBzd0x4_A9z-r0f3ZKFGuw" target="_blank" rel="noreferrer">《携程个性化推荐算法实践》</a></p>',49);function M(V,E,S,v,B,G){const a=i("font");return c(),s("div",null,[d,e("blockquote",null,[e("p",null,[t("如果有一位你喜欢的女士约你一起外出，肯定不需要别人推荐你是否赴约吧？"),_,t(),u,b,f,t(" 那么, 如果有一百位呢？"),m,e("strong",null,[t("(CPU 要被干烧了, 出现了"),o(a,{color:"#542dd4"},{default:r(()=>[t("信息过载")]),_:1}),t("，太多了挑不过来，根本挑不过来)")]),q,g,t(" 你肯定会检查下你最心仪的那位女士有没有约你。如果她也约你了，你照样不需要别人推荐。"),k,w,x,F,t(" 但如果这一百位女士中没有你熟悉的人呢？你是不是需要被推荐一位最合适的女士呢？"),P,t(),j,I,A])]),z,T,C,N,e("p",null,[t("2."),o(a,{color:"#542dd4"},{default:r(()=>[t("推荐系统更倾向于人们没有明确的目的, 或者说他们的目的是模糊的, 通俗来讲用户连自己都不知道想要什么, 这个时候就是推荐系统的用武之地, 推荐系统可以根据用户的历史行为，社交关系，所处网络上下文环境, 或相似的用户产生的历史行为来作为数据的参考, 进而猜测用户喜欢的数据进行推送")]),_:1})]),D])}const y=n(p,[["render",M]]);export{Z as __pageData,y as default};
