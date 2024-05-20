import{_ as t,c as a,o as e,a4 as d}from"./chunks/framework.BG61BEI0.js";const p="/assets/image-20240510090412377.C7xdFTrL.png",m=JSON.parse('{"title":"","description":"","frontmatter":{"author":"luyuan","titel":"推荐系统技术调研","date":"2024-05-10 09:03","tags":["推荐系统","个性化推荐","搜推系统"]},"headers":[],"relativePath":"02-Person/00-业务学习/11-推荐系统/推荐系统搭建/01-推荐系统技术调研.md","filePath":"02-Person/00-业务学习/11-推荐系统/推荐系统搭建/01-推荐系统技术调研.md","lastUpdated":1715303929000}'),r={name:"02-Person/00-业务学习/11-推荐系统/推荐系统搭建/01-推荐系统技术调研.md"},l=d('<p><img src="'+p+'" alt="" loading="lazy"></p><h2 id="_1-背景" tabindex="-1">1. 背景 <a class="header-anchor" href="#_1-背景" aria-label="Permalink to &quot;1. 背景&quot;">​</a></h2><p><strong>做推荐搜索容易，做好的推荐搜索很难</strong>。如果想快速做一个推荐搜索系统，只需要基于 elasticsearch 全文检索就可以了，让 es 匹配查询和排商品，应用简单处理填充信息后返回即可。但是做一个好推荐搜索系统却很困难，因为做推荐搜索系统我们最终追求的是用户的转化，而不只是为了显示一堆商品，为此我们需要去理解用户到底需要什么，这就需要我们使用到用户意图理解、用户画像、近邻推荐、矩阵分解及深度学习等等技术，同时为了使用这些技术我们又需要数据训练、测试评估、监控告警、模型存储等一系列支撑平台。最终在推荐搜索看似简单的页面背后，其实是一套复杂的系统和庞大的数据在做支撑。</p><p>文章主要分为三个部分：</p><p>第 2 章探讨推荐搜索的业务；</p><p>第 3、4 章探讨推荐搜索涉及的技术和业内的实践方案；</p><p>第 5 章探讨推荐搜索落地以及演进</p><p><strong>业务</strong></p><h2 id="_2-1-搜索业务" tabindex="-1">2.1 搜索业务 <a class="header-anchor" href="#_2-1-搜索业务" aria-label="Permalink to &quot;2.1 搜索业务&quot;">​</a></h2><h3 id="定义和重要性" tabindex="-1">定义和重要性 <a class="header-anchor" href="#定义和重要性" aria-label="Permalink to &quot;定义和重要性&quot;">​</a></h3><p>一个产品的搜索功能，是用户快速触达所需信息的通道，起到了引导用户走向的重要作用；优秀的产品必然有成熟、体验良好的搜索功能。</p><p>电商搜索核心要点</p><p>• 帮助用户明确搜索意图</p><p>• 节约用户搜索时间</p><p>• 提高搜索体验</p><p>• 完善健康商业生态</p><p>• 实现更高效的用户与商品/商家的连接，进而获得更高的营收</p><p><strong>核心&amp;本质是理解用户</strong></p><p><strong>特点: 搜索和推荐场景时效性强，千人千面，用户兴趣多变</strong></p><p>用户搜索流程</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/R42BvBvO4S7VkAEg/7bad85d6455840e2b1324f67b0401dbc2400.png" alt="image" loading="lazy"></p><p>用户输入搜索关键词，搜索系统根据输入信息，筛选出用户可能喜欢的内容，同时按照某种重要性进行排序并展示。简单而言，搜索可以分为三步。</p><ol><li><p>对用户输入搜索词的解读</p></li><li><p>根据搜索词对内容筛选</p></li><li><p>对筛选后的结果集排序并展现，并且根据用户反馈进入新的搜索服务</p></li></ol><p>我们可以将搜索分为三个阶段，搜索前，搜索中，搜索后。</p><h3 id="搜索前" tabindex="-1">搜索前 <a class="header-anchor" href="#搜索前" aria-label="Permalink to &quot;搜索前&quot;">​</a></h3><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/collab/LAJdl6jyby6alke1/9073e1ef-e1ab-424d-92f3-e49a5e2f915b.jpg" alt="image" loading="lazy"></p><p>• 条件: 对用户当前需求没有显式信息</p><p>• 定位: 以推荐为主</p><p>• 典型产品: 搜索底纹、搜索发现、历史搜索词、热门搜索词</p><p>• 搜索物料: 历史搜索词、短期&amp;长期商品交互 (点击、加购、收藏、购买)、其他人的搜索及站内行为</p><ol><li><strong>搜索入口放在哪</strong></li></ol><p>一级 tab (拼多多)</p><p>顶部中间搜索框 (淘宝, 京东, 天猫)</p><p>搜索入口吸顶 (淘宝, 京东, 拼多多, 移动)</p><p>顶部右侧放大镜 icon (移动)</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/collab/LAJdl6jyby6alke1/eeabf0e6-88f3-4ac8-9d3f-c015933985e3.jpg" alt="image" loading="lazy"></p><p>入口举例</p><p>这里没有找到将头部右侧 icon 作为搜索入口的电商，所以找了非电商的例子 (移动)。</p><p>分析: 几乎所有大型电商对搜索入口定位均较高，给了相当重要的位置，尤其是拼多多给了一级 tab 作为用户的搜索入口，但首页取消了搜索入口；并且在搜索入口展现层面均设置了吸顶 (下滑操作不会让搜索框消失)，拼多多搜索入口在一级 tab 下吸顶。搜索位置体现了产品对搜索功能的定位问题。</p><p><strong>2. 推荐词分类</strong></p><p>在用户可感知层面，搜索词推荐功能可以分为联想类产品和无联想类产品</p><p>4.1 联想推荐产品</p><p>• 下拉提示: 输入部分 query 词，联想出完整 query 并推荐展示给用户，降低输入成本</p><p>• 锦囊: 类目锦囊、属性锦囊、知识锦囊、相关搜索锦囊</p><p>• 推荐合适的细分 query，帮助用户找到更合适的词换词搜索及收敛</p><p>4.2 无联想推荐产品</p><p>• 底纹: 导购类产品; 定位为个性化的根据用户历史行为推荐合适的 query 促成收敛，或发现全新的 query 帮助用户发现和种草</p><p>•搜索发现: 导购类产品; 根据历史行为推荐相关 query 促成收敛</p><p>a.触发前</p><p>默认底纹: 内容前置，用户在不输入搜索词的情况下直接得到想要搜索的词</p><p>常见情况: 商品名称关键词，类目词，品牌词，特定活动</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/collab/LAJdl6jyby6alke1/b60b3360-63ab-499b-bd63-4dbb0979fd1e.jpg" alt="image" loading="lazy"></p><p>b.触发后，输入前</p><p>触发搜索框后，在绝大数电商搜索产品中均有不同程度的搜索推荐版本，对于业务来说，这是 cross sale 的方式。常见的有搜索历史、热门搜索、搜索发现，并且除了搜索历史，热门搜索和搜索发现一定程度上需要做语义归一化，避免浪费坑位，如“白裤子”与“裤子白色”。</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/collab/LAJdl6jyby6alke1/d07e949f-8568-4dec-b266-42358dffe881.jpg" alt="image" loading="lazy"></p><p>热门&amp; amp; amp; 搜索发现-产品</p><p>搜索历史</p><p>搜索历史的功能建立在一定假设的基础上，假设用户使用搜索具有一定重复性。搜索历史帮助用户快速检索历史需求，快速进行回放。并且通过数据分析可以发现，搜索历史的 query 词更加高频，转化也比其它搜索推荐词转化高；所以历史搜索一般更靠近搜索框，并且搜索词按时间先后顺序由近及远，数量过多时会进行折叠或只保留 N 个，用户有清空历史搜索词的选项。</p><p>热门搜索词</p><p>通过已有用户的搜索日志，进行数据分析，选择将高频&amp;高转化搜索词进行展现，便于用户冷启动/意图冷启动进行筛选。这一过程中也有运营同学的参与，如大促热门活动主题。热门搜索推荐词应避免长尾，应尽量高频、宽泛、多样。</p><p>注: 用户冷启动一般指新用户，意图冷启动指用户之前未有的需求。</p><p>搜索发现/搜索词推荐</p><p>这一板块使用了千人千面，更加个性化。并且很多时候有换一批的功能，可以让更多内容有曝光机会。由于有搜索历史的存在，所以搜索词在个性化的同时，应尽量避免与搜索历史栏出现语义重复，提供更有价值的搜索词，从而最大化曝光效率，并且为了防止过多推荐词带来干扰，一般搜索发现词在 10 个以内。</p><p><strong>“搜索是用户把控方向及自由度的信息入口，尤其是当用户无法在产品上通过浏览找到想要的东西。”</strong></p><h3 id="搜索中" tabindex="-1">搜索中 <a class="header-anchor" href="#搜索中" aria-label="Permalink to &quot;搜索中&quot;">​</a></h3><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/collab/LAJdl6jyby6alke1/e204626b-6912-4c24-9a5b-de770b0247b8.jpg" alt="image" loading="lazy"></p><p>搜索中</p><p>• 条件: 需求部分已知</p><p>• 定位: 辅助查询输入</p><p>• 典型产品: 查询智能补全 (SUG) /搜索联想</p><p>• 搜索物料: 短期&amp;长期商品交互 (点击、加购、收藏、购买)、其他人的搜索及站内行为</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/R42BvBvO4S7VkAEg/e314d99b8ae14e68bc66312ee79e10ab2400.png" alt="image" loading="lazy"></p><p>搜索词自动补全产品形态</p><p>关键词匹配/补全/联想/纠错的作用主要有三个：引导、纠错和高效。</p><p>通过统计发现，用户在第一次查询中得到预期搜索结果的概率非常低，所以需要引导查询自动建议可以减少用户搜索的工作量，并通过数据挖掘 (群体行为和智慧) 来给出高频恰当的搜索建议。</p><p>用户在搜索框输入字符时，会在搜索框下面实时显示下拉提示词给用户，方便用户选择。可以帮助用户快速输入和优化搜索条件，且避免输入错误；在此基础上很多电商 app 也出现了筛选功能，在当前搜索建议词基础上进行扩展，进一步减少用户操作。一般在用户搜索的不够具体，会推荐该搜索词更细的分类。淘宝的辅助多重筛选搜索，输入时展现的一系列联想内容，点击右边的一个拓展 icon，就可以采用联想出的内容，在此基础上继续缩小范围筛选，从而帮助用户获得最接近需求的内容。</p><p>通过当前实时输入的词去匹配候选词，一般查询频度和同查询词的历史查询记录为重要参考依据。</p><p>当然部分电商在历史的版本迭代中会尝试在搜索输入阶段进行纠错，比如输入联衣群，下拉框中自动纠正为连衣裙的一些选项，目前四个电商 app 均并无此功能，而是在搜索结果展示内做纠错及提醒；自动容错功能，将极大地提升用户体验，并提升用户的购买率。</p><h3 id="搜索后" tabindex="-1">搜索后 <a class="header-anchor" href="#搜索后" aria-label="Permalink to &quot;搜索后&quot;">​</a></h3><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/collab/LAJdl6jyby6alke1/2ddb632a-0907-4047-9611-dafc99369596.jpg" alt="image" loading="lazy"></p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/collab/LAJdl6jyby6alke1/e21caa6b-1a46-419d-8b5a-e07f6e598fee.jpg" alt="image" loading="lazy"></p><p>• 条件: 用户完成搜索，已获取结果列表，排序及展示结果页</p><p>• 定位: 辅助用户修正结果或重新查询</p><p>• 典型产品: 相关搜索、筛选、泛词引导/锦囊、搜索纠错，搜索确认、搜索排序</p><p>• 搜索物料: 搜索词下类目重要属性，短期&amp;长期商品交互 (点击、加购、收藏、购买)、其他人的搜索及站内行为</p><p>搜索后，能够检索出来的商品通常非常多，如何将这些商品清晰有序地展示给用户，让用户快速、准确地找到想要的商品？这涉及到以下若干个问题：</p><p>智能纠错，结果分类（如果需要），默认排序，保留搜索词，结果与搜索词对应，排序与筛选，无结果或少结果，筛选等。</p><p>内容纠错</p><p>难免用户在搜索过程中有错误的输入，纠错功能可以通过算法判断后输入有误，然后展示正确搜索词的商品列表给用户，并友好地告知用户正确的搜索词，并确认是否需要搜索系统判断有误的搜索词 (确实有长尾、低频词搜索需求存在)。考虑到了整个纠错功能的容错性，减少了用户输入错误或者本身记忆错误带来的搜索问题，用户也不用再次进行搜索了。自动容错功能，将极大地提升用户体验，并提升用户的购买率。</p><p>筛选器</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/collab/LAJdl6jyby6alke1/f5a4f63d-42ea-4f51-b7f9-e6a9ab242440.jpg" alt="image" loading="lazy"></p><p>搜索筛选&amp; amp; amp; amp; 锦囊-产品</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/collab/LAJdl6jyby6alke1/0c21389b-9fc0-4a38-87ba-fe28d182c210.jpg" alt="image" loading="lazy"></p><p>搜索筛选&amp; amp; amp; amp; 锦囊-产品</p><p>当搜索结果过多或相关度结果参差不齐时，召回的商品还是海量的，对于用户精准快速的获取商品仍然是一个不小的挑战，而排序和过滤的功能则能够很好的缓解这一情况。过滤和排序能够一定程度上帮用户调整和缩小搜索商品列表，大幅度降低用户下滑寻找商品的工作量。</p><p>目前筛选器是各大电商的搜索产品标配，使用频率非常高。筛选器通过传递筛选参数，搜索引擎会在原有召回基础上进行商品过滤。筛选在各大电商均做了 2 类方式的展现，当筛选项维度少时，可以将筛选（与排序一起）放置商品列表结果中间 (类似淘宝搜索的锦囊)，一般在浏览若干个商品以后出现；若维度丰富，一般使用侧边栏形式。</p><p>无结果</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/collab/LAJdl6jyby6alke1/3d9d36a1-289a-4f17-b29e-3a699ac52cb4.jpg" alt="image" loading="lazy"></p><p>无结果页-产品</p><p>用户进行搜索后，出现无结果或少结果原因可能有以下几点带来：1. 输入错误的搜索词；2. 筛选条件过多或搜索词过于长尾/具体；3. 本身平台符合搜索需求的商品少或无。对于前两种，可以提示用户并进行自动容错，展现正确的商品列表；对于第三种情况，一般会匹配相关替代商品进行补足，或提示用户更换搜索词，有些平台推出了订阅服务，当搜索结果更新时，会向用户主动推送。</p><h2 id="_2-2-推荐业务" tabindex="-1">2.2 推荐业务 <a class="header-anchor" href="#_2-2-推荐业务" aria-label="Permalink to &quot;2.2 推荐业务&quot;">​</a></h2><h3 id="定义和重要性-1" tabindex="-1">定义和重要性 <a class="header-anchor" href="#定义和重要性-1" aria-label="Permalink to &quot;定义和重要性&quot;">​</a></h3><p>推荐是锦上添花, 围绕产品的核心目标进行的推荐才是有价值的，「 产品是推荐的载体」, 用现在的话说就是「帮产品搞事情」。</p><p>推荐“搞事情”的目的有 2 点：</p><p>1) 「让产品活的更久」：活的久是要延长产品的生命周期，延长用户的生命的周期，更受用户喜欢。</p><p>2) 「让产品活的更好」：活的更好就是通过广告、用户主动付费等方式获得收入，带来商业价值。</p><p>本质上产品需要将整个用户行为路径进行优化，比如电商产品，在推荐的场景需要考虑「展现形态」，包括图片和文字简介，购物链路上的商品详情页的描述信息丰富和核心程度，整体布局等等。去伪存精，通过信息表达需要考虑「基础信息区」(回答商品是什么，吸引决策)； 「优惠」(有没有优惠，刺激决策)；「服务区」 (有没有保障，加固决策)；「参数规格区」(有哪些可选，完成决策)；「评价区」(大家怎么说，辅助决策);「后续推荐卡片」(再逛逛别的，流量再分发)。</p><p>推荐是帮助用户感知，而不是强迫 TA 思考</p><p>在推荐产品的整个构建过程中，永远需要记住的是你需要「帮助用户感知」，而「不是将过多的主观想法强加于他」，「不是替他思考」。推荐通过收集用户数据，并对用户意图及行为路径建模，从而建立整体用户认知，将条目作为认知的载体呈现给用户，让用户进行体验交互，并进一步收集用户反馈，并假设用户有正向反馈的商品是用户表现出价值认可的。在此基础上，我们可以让用户「持续留存」，并且建立一定的「情感链接」。</p><ol><li><p>用户的诉求，系统该如何满足</p></li><li><p>业内常见的电商推荐产品</p></li><li><p>一个好的推荐系统应该是什么样的</p></li></ol><h3 id="好的推荐服务" tabindex="-1">好的推荐服务 <a class="header-anchor" href="#好的推荐服务" aria-label="Permalink to &quot;好的推荐服务&quot;">​</a></h3><p>推荐是一个系统工程，「从业务经验出发」，围绕「数据」、「产品形态」、「算法」进行「协同优化」才能带来更大的收益。用户体验的满意程度贯穿于整个产品使用过程中，如果想要有好的推荐结果，必然需要「全局」去思考并优化。</p><p>1) 「推荐时机」: 由于兴趣发现和收敛速度的原因，对于智能程度的感知也随时间会产生较大的变化，合适的时机能够带来更大的收益。</p><p>2) 「推荐质量」: 对于不同的产品，内容时效性和列表新颖性有不一样的要求，对于不同领域的产品，质量也有不一样的定义。</p><p>3) 「多样性」: 对于推荐而言，既要满足用户行为中的正负反馈，又要给予用户更加多样的列表。</p><p>4) 「产品定位」: 「不同位置的推荐产品定位不同」 ，「跳出局部最优思想」，做「全局最优化」，永远是「场景间协同」，根据「行为路径的差异」，「行为深度的差异」来做「差异化的场景设置」。比如单品页：购买意图，过渡页：提高客单价，购物车页：购物决策，无结果页：减少跳出率，订单完成页：交叉销售，关注推荐：提高转化，我的 xx 推荐：提高忠诚度。</p><p>一个系统的好坏往往需要「全链路的评定」，「贯穿于用户的整个交互过程」。之所以说「好的推荐系统」更难定义，是因为虽然算法是核心，但是个性化推荐往往不止由算法构成，这背后需要各种技术支撑。它是算法和各种技术架构以及交互设计等等「混合」在一起的产物。所以，我们「很难有一个推荐系统好不好的绝对值，只能在有参照物的情况下，选取某些常见指标然后有一个相对的评价」，「没有统一标准」，但人人心中都会有一杆秤。</p><p>这里需要提一下「客户体验价值」，它帮助企业了解每个客户的体验价值和商业价值，从而帮助决定如何对待客户体验，以及「如何调整客户体验项目的投入」。每个产品特性导致不同的评估指标，最核心的是「如何评估用户需求满足度」？不同场景、不同阶段的推荐系统各部分重要程度不同 ~~ 推荐效果影响因素：「用户需求、数据质量、算法策略、模块位置、展现样式 (图文版等、契合产品)」…</p><p>「推荐目标」:实现产品目标 (合适的才是最好的)</p><p>「核心问题」: 如何构建一个用户对商品的评价模型</p><p>「宗旨」: 服务提供方与消费方的双赢</p><p>1) 依赖于产品领域知识及目的</p><p>推荐产品的评价强依赖于「产品领域知识」，不同的领域对于评价也会有比较大的区别，工具类的产品重「黏性和时长」，电商重「回访和转化」。</p><p>2) 无整体评估方案存在</p><p>推荐产品的评估方案也存在「trade off」，很难做到各个方面都兼顾，只能说根据产品的各个阶段选择适合的评估方案，「不断调整及迭代」。「产品初期」可能会考虑用户的交互及浏览时长等体验指标,「产品中后期」会从商业价值实现角度考虑商业收益等指标</p><p>1.1.2 信息检索角度</p><p>1) 「路径优化」</p><p>推荐作为信息分发的路径，定位于快速帮助用户找到合适的条目，简化和缩短用户行为路径，用完即走，当然不是永远不来。每次快速完成用户需求，并且用户持续地来。</p><p>2) 「准确的推荐」</p><p>信息分发维度，推荐就是需要准确，必然是准确的推荐是好推荐的核心要素之一。</p><p>▏1.1.3 推荐系统角度</p><p>1) 「长尾挖掘」</p><p>长尾挖掘必然是推荐需要去完成的一件事，长尾作为大头的存在，分发过程中需要将把握，或者说长尾挖掘是好的推荐系统需要去完成的任务。</p><p>2) 「用户不知道什么商品存在」</p><p>好的推荐系统是既可以根据用户的反馈来推荐，也可以不断帮助用户进行探索，因为用户可能不具有某个领域内的知识，好的推荐系统还需承载帮助用户发现新事物的功能。</p><p>从细节来讲好的推荐系统往往会考量 5 个 w—「when，where，who，what，why」</p><p>「When」: 主要是在围绕时间维度做文章，主要是围绕「季节/早晚/热点时期/节日/周期」等因素为平台用户提供推荐服务，一般围绕时间维度的推荐会涉及用户的「购物习惯」，易耗品的「购物周期」等，举个例子来说，比如常见用户在奶粉/纸尿裤等商品上会呈现一定的购物周期规律，通过数据分析发现，用户的购物周期呈「正态分布」，如下图。再比如周末线上支付线下消费的产品销量会比工作日高等。当然泛推荐领域的信息推送等一般也会考虑时间因子进行信息「推送」(短信-email)。</p><p>2) 「Where」: 这个维度主要考虑「地理位置因素」，包涵了粗粒度的省份城市因素和细粒度的经纬度，粗细粒度一般在不同的产品场景下被使用，「细粒度」的地理位置信息一般在用在时效性/区域性要求较高的产品上，比如外卖 (O 2 O)；「粗粒度」则更多的是的轻位置信息的电商产品重，比如衣服，百货等 (B 2 C)，虽然轻位置信息，但是位置信息也会被使用在这类产品重，比如南方与北方姑娘喜欢的衣服风格会不一样，天气因素也会随地理位置的不同不同，所以同一时间南北方的消费需求会存在差异。</p><p>3) 「Who」: 人物维度，则更多地去考虑「用户各类信息特征」，比如用户「是男是女」，「是老是少」，「是新用户还是老用户」，平时喜欢买什么品牌，喜欢什么品类的东西，风格如何等等，这些都是在描述这个人，现在这一类技术一般作为「用户画像」存在，通过用户行为和人口统计学数据构建的画像体系。</p><p>4) 「What」: 这个维度则是需要「推荐的主体」是什么，主体类型可能有以下服饰，百货，文章，音乐，美食，视频等等，「不同物料有着不同的自带属性」，并且「产品附加信息也不同」。比如文章，视频等对时效性的要求比电商类产品更高，特别是新闻类内容基本时效性要求在天级；再比如刚刚说的对位置信息的利用，美食相对于衣服这类商品对位置的要求就更高。所以在推荐的过程中我们会「根据推荐的主体不同做更多的推荐策略算法和系统的适配，最终去推动」。</p><p>5) 「Why」: 这个维度更多地会去考量推荐地「可解释性问题」，外化到产品维度则是推荐理由，比如是通过好友推荐的，比如通过浏览的商品推荐相似的商品等等。所以上面这一切都基于数据洞察，维度基本有以下几个：「用户数，用户群体，推荐功能，推荐内容，非个性化/个性化，Top-N，列表浏览，是否实时反馈，消费需求变化情况」。</p><p>通过以上维度进行产品定位，最终可以考虑的设计要素有：「需求分析和用户调研，功能设计，界面设计，架构设计，算法设计，系统评测」。总之，「每个产品特性导致不同的评估指标，对于用户满足度不同的定义也带来了不同的评估方式，并且不同场景/不同阶段的推荐系统各个部分重要程度不同」。</p><p>用户「不只追求更优质的商品，也会期待看到商品为自己带来价值、便利性与独特性」。在积极打造更好的购物体验的同时，必须记住渠道「策略并不是一体适用」、能够「一招打天下」。电商平台上，每一名用户可以采取的购买路径就至少有 10,000 条。而根据内部的数据分析，一般来说，「85%的销量会来自 35 条高流量路径」。</p><p>好的推荐产品遵循以下四点</p><p>1). 提升买家用户的体验，提高选购决策质量与效率实现优质买家的差异化服务</p><p>2). 提高商品的有效曝光机会与转化率，提升卖家用户的效果与效益</p><p>3). 利益均衡机制，均衡曝光机会，提升曝光商品及商家的覆盖率</p><p>4). 提升买家留存率与卖家续签率，提升买卖家的忠诚度，提升商品点击机率</p><h2 id="_2-3-shopify-当前情况" tabindex="-1">2.3 Shopify 当前情况 <a class="header-anchor" href="#_2-3-shopify-当前情况" aria-label="Permalink to &quot;2.3 Shopify 当前情况&quot;">​</a></h2><p>搜索</p><table><thead><tr><th>功能</th><th>当前功能</th></tr></thead><tbody><tr><td>底纹词</td><td>无</td></tr><tr><td>推荐词</td><td>全文匹配</td></tr><tr><td>搜索词</td><td>无</td></tr><tr><td>语义匹配</td><td></td></tr><tr><td>搜索无结果</td><td>直接不粘手</td></tr><tr><td></td><td></td></tr></tbody></table><h2 id="_2-4-搜索、推荐与广告业务的异同" tabindex="-1">2.4 搜索、推荐与广告业务的异同 <a class="header-anchor" href="#_2-4-搜索、推荐与广告业务的异同" aria-label="Permalink to &quot;2.4 搜索、推荐与广告业务的异同&quot;">​</a></h2><table><thead><tr><th></th><th>搜索</th><th>搜索广告</th><th>显示广告</th><th>推荐</th></tr></thead><tbody><tr><td>首要准则</td><td>相关性</td><td>投资回报率（ROI）</td><td></td><td>用户兴趣</td></tr><tr><td>其他需求</td><td>各垂直领域独立定义</td><td>质量、安全性（Safety）</td><td></td><td>多样性（diversity），新鲜度（freshness ）</td></tr><tr><td>个性化</td><td>较少的个性化需求</td><td></td><td>个性化</td><td></td></tr><tr><td>检索信号</td><td>较为集中</td><td></td><td>较为丰富</td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr></tbody></table><p><strong>技术</strong></p><p>本章节将着重介绍推荐搜索系统的实现方案</p><p>名词解释，在下面方案介绍中会出现很多技术名词，先做下简单解释，在 3.3 中会详细介绍这些技术的细节</p><table><thead><tr><th>分类</th><th>名称</th><th>解释</th></tr></thead><tbody><tr><td></td><td>马太效应</td><td>一种强者愈强、弱者愈弱的现象。推荐搜索中指用户获取的都是最热的 20%商品，其它商品没有机会被展示</td></tr><tr><td></td><td>长尾理论</td><td>如果能够把足够多的非热门产品组合到一起，实际上可以形成一个堪与热门市场匹敌的大市场</td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td>CTR</td><td>CTR 指在<a href="https://baike.baidu.com/item/%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E" target="_blank" rel="noreferrer">搜索引擎</a>中输入关键词后进行搜索，然后按竞价等因素把相关的网页按顺序进行排列出来，然后用户会选择自己感兴趣的网站点击进去；把一个网站所有搜索出来的次数作为总次数，把用户点击并进入网站的次数占总次数的比例叫点击率</td></tr><tr><td></td><td>MAP</td><td>在<a href="https://baike.baidu.com/item/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0/217599" target="_blank" rel="noreferrer">机器学习</a>中的<a href="https://baike.baidu.com/item/%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B/8688936" target="_blank" rel="noreferrer">目标检测</a>领域，mAP（mean Average Precision）是十分重要的衡量指标，用于衡量目标检测算法的性能。一般而言，全类平均正确率（mAP，又称全类平均精度）是将所有类别检测的平均正确率（AP）进行综合<a href="https://baike.baidu.com/item/%E5%8A%A0%E6%9D%83%E5%B9%B3%E5%9D%87/9702101" target="_blank" rel="noreferrer">加权平均</a>而得到的</td></tr><tr><td>算法</td><td>NLP</td><td>自然语义处理</td></tr><tr><td></td><td>CNN</td><td><strong>卷积神经网络</strong>（Convolutional Neural Network, <strong>CNN</strong>）是一种<a href="https://zh.wikipedia.org/wiki/%E5%89%8D%E9%A6%88%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C" target="_blank" rel="noreferrer">前馈神经网络</a>，它的人工神经元可以响应一部分覆盖范围内的周围单元，<a href="https://zh.wikipedia.org/wiki/%E5%8D%B7%E7%A7%AF%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C#cite_note-deeplearning-1" target="_blank" rel="noreferrer">^[1]^</a> 对于大型图像处理有出色表现</td></tr><tr><td></td><td>xgboost 模型</td><td>XGBoost 是 boosting 算法的其中一种。Boosting 算法的思想是将许多弱分类器集成在一起形成一个强分类器。因为 XGBoost 是一种提升树模型，所以它是将许多树模型集成在一起，形成一个很强的分类器</td></tr><tr><td></td><td>KNN</td><td>邻近算法，或者说 K 最近邻（KNN，K-NearestNeighbor）分类算法是<a href="https://baike.baidu.com/item/%E6%95%B0%E6%8D%AE%E6%8C%96%E6%8E%98/216477" target="_blank" rel="noreferrer">数据挖掘</a>分类<a href="https://baike.baidu.com/item/%E6%8A%80%E6%9C%AF/13014499" target="_blank" rel="noreferrer">技术</a>中最简单的方法之一。所谓 K 最近邻，就是 K 个最近的邻居的意思，说的是每个样本都可以用它最接近的 K 个邻近值来代表。近邻算法就是将数据集合中每一个记录进行分类的方法</td></tr><tr><td></td><td>embedding</td><td>嵌套是一种相对低维的空间，您可以将高维矢量映射到这种低维空间里。通过使用嵌套，可以让在大型输入（比如代表字词的稀疏矢量）上进行机器学习变得更加容易。在理想情况下，嵌套可以将语义上相似的不同输入映射到嵌套空间里的邻近处，以此来捕获输入的语义</td></tr><tr><td></td><td>seq 2 seq</td><td><strong>Seq 2 seq</strong>是用于自然语言处理的一系列<a href="https://zh.wikipedia.org/wiki/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0" target="_blank" rel="noreferrer">机器学习</a>方法。<a href="https://zh.wikipedia.org/wiki/Seq2seq#cite_note-sequence-1" target="_blank" rel="noreferrer">^[1]^</a> 应用领域包括机器翻译，图像描述，对话模型和文本摘要</td></tr><tr><td></td><td></td><td></td></tr></tbody></table><h2 id="_3-1-搜索系统" tabindex="-1">3.1 搜索系统 <a class="header-anchor" href="#_3-1-搜索系统" aria-label="Permalink to &quot;3.1 搜索系统&quot;">​</a></h2><p>底纹推荐技术方案</p><p><strong>本章只会介绍推荐搜索涉及的一些常用算法，并不涉及这些算法应该在工程中使用，相关算法内容会在工程模型阶段进行介绍。同时这些算法</strong></p><p>推荐与搜索在功能上来说有很多的相似之处，很多算法是公用的。下面按照推荐搜索的大体过程来了解相关的算法。</p><p>对于搜索来说，大体的流程为 query 理解-&gt; 召回-&gt; 排序</p><p>对于推荐来说，大体的流程为召回-&gt; 排序</p><p>对于推荐来说主要是少了 query 理解过程，可以把用户或商品当作 query，推荐系统相当于隐式查询</p><h3 id="query-理解" tabindex="-1">Query 理解 <a class="header-anchor" href="#query-理解" aria-label="Permalink to &quot;Query 理解&quot;">​</a></h3><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/R42BvBvO4S7VkAEg/4ca32e26cd93402b98ed98179cb143b92400.png" alt="image" loading="lazy"></p><ol><li><p>Query 预处理: 全半角转换、大小写转换、繁简体转换、无意义符号移除、Query 截断</p></li><li><p><strong>Query 分词:</strong> 将 query 切分成多个 term, 如：“手机淘宝”切分成“手机淘宝”两个 term. 一般来说，使用已有的开源切词工具已经有比较好的切分精度了，但是对于一些新出现的网络词汇可能不能及时识别覆盖，尤其是对于一些垂直搜索有比较多业务专名词的情况，这时候需要对这些未登录词做新词发现。</p></li></ol><p>目前无论学术界还是工业界开放的分词工具或服务还是比较多的，如主要有腾讯内部的 QQSeg、百度 LAC、Jieba 分词、清华 THULAC、北大 pkuseg、中科院 ICTCLAS、哈工大 PyLTP、复旦 FNLP、Ansj、SnowNLP、FoolNLTK、HanLP、斯坦福 CoreNLP、Jiagu、IKAnalyzer 等</p><ol start="3"><li><p>Query 改写，简单理解就是将源 query 改写变换到另一个 query。按照改写功能的不同，query 改写可以分为 query 纠错、query 归一、query 扩展三个方向。</p><ol><li><p>Query 纠错，负责对存在错误的 query 进行识别纠错。简单地可以通过对输入 query 进行切分后检查各个词语是否在维护的自定义词表或挖掘积累的常见纠错 pair 中，若不在则根据字型、字音或输入码相近字进行替换构造候选并结合 ngram 语言模型概率来判断其是否存在错误，这个方法未充分考虑到上下文信息，可以适用于常见中文词组搭配、英文单词错误等的检测。进一步的做法是通过训练序列标注模型的方法来识别错误的开始和结束位置。</p></li><li><p>至于错误纠正，即在检测出 query 存在错误的基础上对错误部分进行纠正的过程，其主要包括纠错候选召回、候选排序选择两个步骤。在进行候选召回时，没有一种策略方法能覆盖所有的错误类型，所以一般通过采用多种策略方法进行多路候选召回，然后在多路召回的基础上通过排序模型来进行最终的候选排序。</p></li></ol></li></ol><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/R42BvBvO4S7VkAEg/5d58c2bb6ee74d9597eb9f664ee31d712400.png" alt="image" loading="lazy"></p><ol start="3"><li><p>Query 扩展，负责扩展出和源 query 内容或行为语义相关的 query 列表推荐给用户进行潜在需求挖掘发现。如果两个 query 有相同的 session 上下文，则它们是相似的，然后通过训练 word 2 vec、fasttext 等模型将 query 向量化，进而可以计算得到 query 间的 embedding 相似度</p></li><li><p>Query 归一，负责将偏门的 query 归一变换到更标准且同义的 query 表达，如将“腾讯台球”归一到“腾讯桌球”，“华仔啥时候出生的？”、“刘德华出生年月”、“刘德华什么是出生的”这些 query 都可以归一到“刘德华出生日期”相对标准的 query。其中涉及到的技术主要有同义词挖掘及语义对齐替换，如“华仔”对应的同义词是“刘德华”，“啥时候出生的”对应的同义词是“出生日期”。同义词的挖掘是一个积累的过程，最直接的获取方式是利用业界已经有一些比较有名的知识库，如英文版本的 WordNet、中文版本的知网 HowNet、哈工大的同义词词林等，或者可以利用一些开放的中文知识图谱（如：OpenKG、OwnThink 等）或从抓取百度/维基百科站点数据然后提取出其中的别名、简称等结构化信息直接获得，对于百科中无结构化数据可以简单通过一些模板规则（如：“XX 俗称 XX”、“XX 又名 XX”等）来提取同义词。同时，还可以在知识库中已有同义词种子的基础上通过一些方法进一步扩充同义词，如韩家炜老师团队提出的通过构建分类器来判断实体词是否属于某个同义词簇的方法来进一步扩充同义词集。</p></li><li><p>搜索联想词，涉及的是技术主要是简单的文本匹配</p></li><li><p>意图识别，对于垂直搜索来说，精准意图一般是给定一个 query，找到与其意图精准对应的 item，可以通过文本匹配和 top 后验转化筛选出候选 item，然后通过从文本匹配、行为反馈、语义相似等方向构造样本特征训练 GBDT 等模型对&lt;query,item&gt;样本 pair 进行是否精准二分类。也可以尝试类似 DSSM 的语义匹配网络对 query 和 item 进行语义匹配。对于长尾 query 且完全文本包含 item 的情况，由于行为量不够丰富利用分类模型可能无法召回且直接进行文本匹配提取可能存在歧义性，此时可以视为 NER 任务通过训练 BiLSTM-CRF、BERT-CRF 等序列标注模型进行 item 实体的识别，再结合一些启发性策略及后验行为进行验证。</p></li><li><p>敏感识别，主要对 query 进行是否带有色情、反动、赌博、暴力等敏感话题的识别，如果识别出 query 中存在敏感话题可以进行定向改写到相对合适的 query 或者给用户做搜索引导提示等处理。</p></li><li><p>时效性分析，用户的搜索需求可能会显式或隐式地带有一定的时效性要求，如：“最近上映的好看电影”带有显式的时间词“最近”，而“疫情进展”则隐式地表达了解最新情况的需求</p></li></ol><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/R42BvBvO4S7VkAEg/0f5f845844b24ecaaebfb636547eed232400.png" alt="image" loading="lazy"></p><p>QP</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/R42BvBvO4S7VkAEg/7f0f869ab1e64ab0be67fb69de68f7e62400.png" alt="image" loading="lazy"></p><p>QP</p><p>目的</p><p>拆解用户搜索词的意图</p><p>比如新品，年龄，尺码，属性，类目等搜索意图识别及归一</p><p>1.1.1.2 任务</p><p>Query 词性及主体结构，主要词/描述词等: 2018 最新款适合胖胖的女生穿的连衣裙</p><p>预测用户搜索商品类目 (category) 性别 (gender): 手提电脑、t 恤女</p><p>属性&amp;标签识别: 品牌，颜色，尺寸: 裙子红色，43 码 nike 球鞋</p><p>搜&amp;逛: 强意图/转化&amp;弱意图/逛: 连衣裙 &amp; Iphone XR 256 G</p><p>1.1.1.3 方法</p><p>方法词表穷举法，规则解析法，机器学习方法</p><p>1.1.1.4 意图识别的难点</p><p>输入不规范，不同的用户对同一诉求的表达存在差异。</p><p>多意图，“苹果” 可以是产品词，也可以是品牌词；可以是手机，也可以是水果。</p><p>数据冷启动。当用户行为数据较少时，很难获取准确的意图。</p><p>QR/query rewrite</p><p>1.2.1 概述</p><p>1.2.1.1 问题</p><p>Query 和商品描述之间存在 gap，特别是中长尾 query。多种描述，信息冗余，属性检索，宽泛意图。</p><p>1.2.1.2 目标</p><p>文本和意图，通过对原始 Query 进行改写，生成一系列相关 Query，把相关 Query 作为原始 Query 的补充，与原始 Query 一起参与搜索，从而得到更加丰富和准确的匹配结果</p><p>1.2.1.3 方法</p><p>Query embedding 和 multi-method</p><h3 id="召回" tabindex="-1">召回 <a class="header-anchor" href="#召回" aria-label="Permalink to &quot;召回&quot;">​</a></h3><p>2.1 检索依据</p><ul><li><p>电商商品: 图片+标题+属性+交互，检索项包括但不限于: 商品名称，商品标题、副标题，商品描述，商品参数、规格，商品品牌，商品品类，别名关联商品，促销类型</p></li><li><p>相关性 (query&amp;tittle/content，行为，session): 融合点击相似度、文本相似度、Session 相似度衡量 Query 之间的相似度, 除了前面介绍的通过 query session 来做 query embedding，用 query 来重建其点击过的宝贝标题/描述序列同样适用，只不过 decoder 阶段换成 query 点击过的标题。</p></li></ul><p>2.2 语义搜索</p><p>语义搜索是指不单单考虑词维度的精确匹配，而是语义层面来做。增加搜索结果的相关性，提升用户体验外，也可以一定程度上遏制商家商品标题堆砌热门关键词的问题。</p><p>2.2.1 常见 doc&amp;query 匹配方法</p><ul><li><p>BM 25 通常计算 query 和 Doc 文本 term 的匹配程度。由于 query 和 doc 之间的语义 gap，可能存在很多语义相关，但文本并不匹配的情况。</p></li><li><p>通过商品内容理解和语义标签: 通过商品图片，详情页，评价和同义词，上下位词等给商品打标签和扩充商品索引内容</p></li><li><p>语义匹配: Dssm 模型将 query 和文本变成向量，用向量内积表达语义相似度</p></li><li><p>匹配深度与高度: 词-&gt;短语-&gt;语义-&gt;主题-&gt;句法</p></li></ul><h3 id="无结果优化" tabindex="-1">无结果优化 <a class="header-anchor" href="#无结果优化" aria-label="Permalink to &quot;无结果优化&quot;">​</a></h3><ul><li><p>二次/三次召回: 放弃权重低 term，扩大检索字段和检索范围</p></li><li><p>Query 纠错 &amp; 同义词改写: 同时用原词和同义词去检索，最后对两者返回的结果取并集。</p></li><li><p>分类意图识别的优化，首先根据 Query 分布定义了 8 类意图: 可以通过识别 Query 中 Term 的意图来判定整个 Query 的意图</p></li></ul><h3 id="排序模块" tabindex="-1">排序模块 <a class="header-anchor" href="#排序模块" aria-label="Permalink to &quot;排序模块&quot;">​</a></h3><p>精排系统主要服务于个性化排序，召回粗排由搜索引擎负责完成，精排侧重更细粒度特征，更复杂模型，实时性。精排所需特征，模型基本复用搜索引擎的技术，可以支持高密度的数据存储和高并发读取。</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/R42BvBvO4S7VkAEg/566b4e4cbbdf4be29dd50262d6c003c12400.png" alt="image" loading="lazy"></p><p>评分体系: 静态分 * 动态分</p><ul><li><p>静态分体现商品的转化，商品品质，背后供应商品质</p></li><li><p>动态分体现商品与 query 的相关性，个性化分，用二元分类 (Binary Classification) 来优化点击/购买概率。</p></li></ul><p>3.1.1 评分系统-静态分</p><p>• 稳定性，连续性，区分度</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/collab/LAJdl6jyby6alke1/a640cc1e-d88f-409e-84bf-dc93e76be819.jpg" alt="image" loading="lazy"></p><p>3.1.2 评分系统-动态分</p><p>预测出每一条商品在给定以上条件组合（q, u, o）下发生交易行为的概率。</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/collab/LAJdl6jyby6alke1/6dd36a27-fe86-4142-81eb-3c0f061cf33d.jpg" alt="image" loading="lazy"></p><p>P (q, i, u) 预估</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>搜索功能实现</p><table><thead><tr><th>功能名称</th><th>方案名称</th><th>实现</th></tr></thead><tbody><tr><td>底纹</td><td>极简版</td><td>运营人工配置</td></tr><tr><td></td><td>统计版</td><td>热门搜索词、热门品类、热门活动</td></tr><tr><td></td><td>简单模型版</td><td>实时对用户最近一次的点击/收藏/加购/搜索词，使用自然语言处理进行关键词、品类词、活动提取，并在搜索框内显示。这里涉及文本处理词性识别和命名实体识别 (NER, 把无结构文字转变为有结构文字)，核心词 (名词)、形容词 (属性/标签等) 提取过程，可以考虑基于规则或统计的词性标注 (HMM)。</td></tr><tr><td></td><td>复杂模型</td><td>embedding 方法生成式: seq 2 seq，通过将用户的近期 n-1 个时间步内的行为序列输入 rnn 模型 (lstm)，生成预测未来第 n 时间步的行为，可以考虑将商品标题，属性，用户特征/标签一同输入训练 user embedding，然后在用过一个 decoder 对其进行解码。</td></tr><tr><td>搜索历史</td><td></td><td>搜索词按时间顺序由近及远</td></tr><tr><td>热门搜索</td><td></td><td>通过用户的搜索日志，选择将高频&amp;高转化搜索词进行展现，便于用户冷启动/意图冷启动进行筛选。同时运营同学参与，如大促活动主题等</td></tr><tr><td>搜索发现</td><td></td><td></td></tr><tr><td>搜索词自动补全</td><td>前缀匹配（搜索引擎)</td><td>mysql、es 均能通过索引来匹配字符</td></tr><tr><td></td><td>前缀匹配（统计版）</td><td>使用前缀匹配后的候选词 (Trie 树 + TopK 算法, 回溯算法遍历 trie 树)，使用用户搜索频度最高的 topK 个搜索词, 但是这样会使长尾词无法得到曝光机会</td></tr><tr><td></td><td>AC 算法（简单模型版）</td><td>在用户进行搜索商品时，通过用户与搜索词信息进行意图预测，并辅之以类目、性别预测，前缀匹配后最终将某个性别和类目下的共现最高的 topK 热搜词作为搜索框下拉框提示词。</td></tr><tr><td></td><td>AC 算法（复杂模型版）</td><td>使用前缀匹配算法进行候选集召回 (若召回量过少，考虑非前缀匹配结果)，并做简单截断；然后使用用户特征 (性别、年龄、行为序列)、context 特征 (季节、天气、温度、地理位置) 进行、当前搜索词的 embedding vector，然后候选搜索词也有一个 embedding vector，三个 vector 分别与候选 vector 计算 cosine similarity，最终使用一个线性模型融合三个分数，最终的排序结果会进行语义去重再选择 topK (这里也可以用生成模型来做排序)。</td></tr><tr><td></td><td></td><td></td></tr><tr><td>纠错</td><td>Non-word 纠错</td><td>准备一个电商语料库字典，输入词不在整体字典中，即可以判定为错词</td></tr><tr><td></td><td>Real-word 纠错 HMM</td><td>噪声信道模型, 利用 unigram+bigram+trigram，选择最优的 token 组合, Query pair，正确及错误词候选集合训练转移矩阵</td></tr><tr><td>语义归一</td><td></td><td>针对候选词进行语义归一，一般将候选 query 相对搜索 query 的扩展部分进行相似度计算，以高于某个阈值后，只保留得分高的一个候选词，这样可以节省有限的坑位资源。</td></tr><tr><td>内容纠错</td><td></td><td>上文提到的 Non-word 纠错和 Real-word 纠错</td></tr><tr><td>筛选器</td><td></td><td>商品类目及属性标签的挖掘: 主题模型、词性挖掘、图像算法等，后续文章介绍商品结构化相关的文本及图像算法</td></tr><tr><td>无结果</td><td></td><td>出现无结果或少结果原因可能有以下几点带来：1. 输入错误的搜索词；2. 筛选条件过多或搜索词过于长尾/具体；3. 本身平台符合搜索需求的商品少或无。对于前两种，可以提示用户并进行自动容错，展现正确的商品列表；对于第三种情况，一般会匹配相关替代商品进行补足，或提示用户更换搜索词，有些平台推出了订阅服务，当搜索结果更新时，会向用户主动推送。</td></tr></tbody></table><h2 id="_3-2-推荐系统" tabindex="-1">3.2 推荐系统 <a class="header-anchor" href="#_3-2-推荐系统" aria-label="Permalink to &quot;3.2 推荐系统&quot;">​</a></h2><p>挑战</p><ol><li><p>冷启动，新用户该给他推荐什么商品，新上架的商品应该推送给谁</p></li><li><p>探索与利用，如何能够比较用户</p></li></ol><p>数据</p><p>「对于变现能力而言，数据将作为重要资产」。搭建推荐系统前期必然需要做好一定的准备，而数据就是这一「必要环节」。当然数据作为燃料，不仅仅可以为推荐做贡献，也可以驱动更多的事情往前发展。</p><p>“数据多一定能「驱动业务」吗？”, 往往大家都有一个误区, 就是我们只要收集海量的数据就可以带来非常好的收益, 但是正如前面几章介绍的, 推荐系统是一个「全局」的工程, 不是只收集海量的数据就可以的, <s>往往是</s>「采数据易，用数据难」。当我们拥有的数据数据质量参差不齐，或者我们收集了一些「垃圾数据」，其实很难产出驱动业务的优化。当数据分析与业务割裂时，我们很难去获取较优的结果，很容易像无头苍蝇一样，淹没在充满噪声的数据中。如果在正确的业务建模和高效地工程支持后, 海量的数据将带来效果非常大的提升.</p><p>ABtest 框架</p><p>无法衡量就无法优化」，对于互联网产品而言，不仅是推荐系统，整个 app 系统的更新迭代必然需要建立一套「度量衡」，来「把控整个流程优化的方向」。而 abtest 系统就是一个很好的进行变量控制和优化方向选取的「工具」，「循环: 衡量-发现-迭代-验证」。</p><p>指标定义</p><p>在 abtest 前，我们需要梳理出我们关心的若干指标，并选择某个指标作为「北极星指标」，如点击率、转化率、浏览时长、gmv、客单价等，未来讨论的推荐系统的相关优化也将围绕若干个目标进行。也有人将核心的指标成为北极星指标，北极星指标经常在「增长黑客」中被使用。</p><p>实验管理平台实验管理平台</p><ol><li><p>实验报告需要「对脏数据进行过滤」，并做一定的「效果平滑」</p></li><li><p>如果流量不进行分层、分流可能会导致「流量饥饿」，即实验一在进行中占用了全站的 80%的流量，实验二就只能使用 20%的流量。因此良好的分层、分流规则可以充分使用网站的流量</p></li></ol><p>Abtest 的那些技术</p><table><thead><tr><th>时代</th><th>特点</th></tr></thead><tbody><tr><td>石器时代</td><td>确地说这个时代，不能称之为推荐系统的时代，这一个时代未能给每个用户构建属于他的推荐结果，没有很好地解决个性化长尾问题，所以这个可以叫「前推荐时代」。这一阶段推荐系统特点： 1). 推荐「功能简单」，「全局推荐」，「没有个性化」。 2). 召回 &amp; 排序逻辑都集中在离线，「推荐服务逻辑较轻」，只负责一些数据「去重」和数据「渲染」等功能。 3). 推荐召回 &amp; 排序策略主要由「人工或人工制定策略」来定，当然也开始有「机器学习」介入其中。人工选品排序及运营自然排名，热快全机器学习预估条目转化排序，这一阶段主要是通过「打点数据」，收集每个条目的曝光、点击、加购、购买等，设定点击率、转化率等目标，通过「构建特征」，「训练模型」，产出一份条目排序列表，并且训练过程也通常通过「单机」完成。</td></tr><tr><td>青铜时代</td><td>青铜时代逐步构建个性化推荐系统，帮助用户发现更多优质的长尾内容，一般平台用户访问的只局限在热门的 10%左右的内容，很多内容永远沉在数据库中没有人发现，精细化地服务将会带来了更大的收益。从相关、相似的产品推荐过渡到「多特征、多维度、用户实时行为」、「结合用户场景」进行的「全方位智能推荐」。个性化落地冲突与协调成本与资源问题召回模块概述召回四象限：「流行、多样、新鲜、相关」。目前「相关与多样」在各大公司的推荐系统中会更多地被考虑，「流行与新鲜」还没有非常好的算法和解决方案 handle，不过也有很多 paper 进行一些描述和尝试。</td></tr></tbody></table><h2 id="_3-3-算法详解" tabindex="-1">3.3 算法详解 <a class="header-anchor" href="#_3-3-算法详解" aria-label="Permalink to &quot;3.3 算法详解&quot;">​</a></h2><h3 id="内容搜索和推荐" tabindex="-1">内容搜索和推荐 <a class="header-anchor" href="#内容搜索和推荐" aria-label="Permalink to &quot;内容搜索和推荐&quot;">​</a></h3><p><strong>通过内容来进行匹配</strong></p><p>文本相似度算法-BM 25，文本匹配</p><p>通常用来作搜索相关性平分。一句话概况其主要思想：对 Query 进行语素解析，生成语素 qi；然后，对于每个搜索结果 D，计算每个语素 qi 与 D 的相关性得分，最后，将 qi 相对于 D 的相关性得分进行加权求和，从而得到 Query 与 D 的相关性得分。</p><p>𝑇𝐹−𝐼𝐷𝐹 算法，提取关键词</p><p>𝑇𝐹是指归一化后的词频，𝐼𝐷𝐹是指逆文档频率。给定一个文档集合𝐷，有𝑑1,𝑑2,𝑑3,......,𝑑𝑛∈𝐷。文档集合总共包含𝑚个词（注：一般在计算𝑇𝐹−𝐼𝐷𝐹时会去除如“的”这一类的停用词），有𝑤1,𝑤2,𝑤3,......,𝑤𝑚∈𝑊。</p><p>用户画像</p><p>对用户信息的向量化表示，同时将其归一化</p><p>TextRank，提取关键词</p><p>TextRank 是 PageRank 的私生子之一，著名的 PageRank 算法是 Google 用来衡量网页重要性的算法，TextRank 算法的思想也与之类似</p><p>词嵌入，也叫作 Word Embedding</p><p>这方面当然就属大名鼎鼎的 Word 2 Vec 了。Word 2 Vec 是用浅层神经网络学习得到每个词的向量表达，Word 2 Vec 最大的贡献在于一些工程技巧上的优化，使得百万词的规模在单机上可以几分钟轻松跑出来，得到这些词向量后可以聚类或者进一步合成句子向量再使用。</p><h3 id="协同过滤" tabindex="-1">协同过滤 <a class="header-anchor" href="#协同过滤" aria-label="Permalink to &quot;协同过滤&quot;">​</a></h3><p>物以类聚，人以群分</p><p>协同过滤是一个比较大的算法范畴。通常划分为两类：</p><ol><li><p>基于记忆的协同过滤（Memory-Based）, 记住每个人消费过什么东西，然后给他推荐相似的东西，或者推荐相似的人消费的东西。</p></li><li><p>基于模型的协同过滤（Model-Based）, 从用户物品关系矩阵中去学习一个模型，从而把那些矩阵空白处填满。</p></li></ol><p>原理</p><ol><li><p>第一步，准备用户向量，从这个矩阵中，理论上可以给每一个用户得到一个向量。</p></li><li><p>用每一个用户的向量，两两计算用户之间的相似度，设定一个相似度阈值或者设定一个最大数量，为每个用户保留与其最相似的用户。</p></li><li><p>为每一个用户产生推荐结果</p></li></ol><h3 id="矩阵分解" tabindex="-1">矩阵分解 <a class="header-anchor" href="#矩阵分解" aria-label="Permalink to &quot;矩阵分解&quot;">​</a></h3><p>解决问题：人心易变，在不同时间段人们购买的相似物品不同。在大促都抢卫生纸，平时兴趣各不相同</p><p>协同算法的问题:</p><ol><li><p>物品之间存在相关性，信息量并不随着向量维度增加而线性增加；</p></li><li><p>矩阵元素稀疏，计算结果不稳定，增减一个向量维度，导致近邻结果差异很大的情况存在。</p></li></ol><h3 id="模型融合" tabindex="-1">模型融合 <a class="header-anchor" href="#模型融合" aria-label="Permalink to &quot;模型融合&quot;">​</a></h3><p>解决问题：每个策略都推荐了一批商品，如何将这几批商品融合在一起并排序</p><h3 id="mba" tabindex="-1">MBA <a class="header-anchor" href="#mba" aria-label="Permalink to &quot;MBA&quot;">​</a></h3><p>解决问题：每个策略都有不同的应用场景，在用户的不同时期需要使用不同的策略。先选择用户适用的策略，再从策略中选择商品。可以有效解决用户冷启动到老用户不同阶段的推荐商品问题。</p><h3 id="深度学习" tabindex="-1">深度学习 <a class="header-anchor" href="#深度学习" aria-label="Permalink to &quot;深度学习&quot;">​</a></h3><p>解决问题：让机器学习用户与物品间隐藏的关系，不需要人花费大量精力来建模，发掘人与物之间的关系。Wide&amp;deep 模型</p><p><strong>工程</strong></p><h2 id="_4-1-搜索系统架构" tabindex="-1">4.1 搜索系统架构 <a class="header-anchor" href="#_4-1-搜索系统架构" aria-label="Permalink to &quot;4.1 搜索系统架构&quot;">​</a></h2><h3 id="腾讯搜索系统架构" tabindex="-1">腾讯搜索系统架构 <a class="header-anchor" href="#腾讯搜索系统架构" aria-label="Permalink to &quot;腾讯搜索系统架构&quot;">​</a></h3><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/R42BvBvO4S7VkAEg/0450237a57b64e178db8ffb4a9ddb3eb2400.png" alt="image" loading="lazy"></p><h3 id="达观搜索引擎架构" tabindex="-1">达观搜索引擎架构 <a class="header-anchor" href="#达观搜索引擎架构" aria-label="Permalink to &quot;达观搜索引擎架构&quot;">​</a></h3><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/R42BvBvO4S7VkAEg/261a10258c3343038da0d222c08f03b82400.png" alt="image" loading="lazy"></p><h2 id="_4-2-搜索系统架构" tabindex="-1">4.2 搜索系统架构 <a class="header-anchor" href="#_4-2-搜索系统架构" aria-label="Permalink to &quot;4.2 搜索系统架构&quot;">​</a></h2><h3 id="机器学习经典系统架构" tabindex="-1">机器学习经典系统架构 <a class="header-anchor" href="#机器学习经典系统架构" aria-label="Permalink to &quot;机器学习经典系统架构&quot;">​</a></h3><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/R42BvBvO4S7VkAEg/9e7dd8e5fc68452abf5bf5e5e512db142400.png" alt="image" loading="lazy"></p><h3 id="netflix-推荐系统架构" tabindex="-1">Netflix 推荐系统架构 <a class="header-anchor" href="#netflix-推荐系统架构" aria-label="Permalink to &quot;Netflix 推荐系统架构&quot;">​</a></h3><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/R42BvBvO4S7VkAEg/8622e6d3f41b4aacbb684902d0cec6092400.png" alt="image" loading="lazy"></p><h2 id="_4-3-系统演进" tabindex="-1">4.3 系统演进 <a class="header-anchor" href="#_4-3-系统演进" aria-label="Permalink to &quot;4.3 系统演进&quot;">​</a></h2><p>项目从开始建设如何一步步构建成一个比较专业的系统的</p><h3 id="蘑菇街搜索系统演进" tabindex="-1">蘑菇街搜索系统演进 <a class="header-anchor" href="#蘑菇街搜索系统演进" aria-label="Permalink to &quot;蘑菇街搜索系统演进&quot;">​</a></h3><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/R42BvBvO4S7VkAEg/587f203225a540b39ad904767e67fe732400.png" alt="image" loading="lazy"></p><p><strong>相关开源工具</strong></p><table><thead><tr><th>类型</th><th>工具名称</th><th>描述</th></tr></thead><tbody><tr><td>内容分析</td><td>LightLDA</td><td>主题模型</td></tr><tr><td></td><td>pida</td><td>主题模型</td></tr><tr><td></td><td>dmwe</td><td>词嵌入</td></tr><tr><td></td><td>tensorflow-word 2 vec</td><td>词嵌入</td></tr><tr><td></td><td>FastText</td><td>词嵌入、文本分类</td></tr><tr><td>协同过滤和矩阵分解</td><td>faiss</td><td>KNN</td></tr><tr><td></td><td>annoy</td><td>KNN</td></tr><tr><td></td><td>Spark Mlib</td><td>基于用户/基于物品协同过滤</td></tr><tr><td>模型融合</td><td>LightGBM</td><td>GBDT 等树模型</td></tr><tr><td></td><td>XGBoost</td><td>GBDT 等树模型</td></tr><tr><td></td><td>Tensorflow-wide and deep</td><td>Wide&amp;Deep 模型</td></tr><tr><td>深度学习</td><td>TensorFlow</td><td>Facebook 开源深度学习框架</td></tr><tr><td></td><td>Torch</td><td>Facebook 开源深度学习框架</td></tr><tr><td></td><td></td><td></td></tr></tbody></table><p><strong>参考资料</strong></p><table><thead><tr><th>标题</th><th>简述</th><th>地址</th></tr></thead><tbody><tr><td>《推荐系统三十六式》</td><td>即刻课程，需要可以找 $\\color{ #0089FF }{@万}$ 。对推荐系统进行了比较全面的介绍，重点在算法，对工程介绍较少</td><td><a href="https://time.geekbang.org/column/intro/74" target="_blank" rel="noreferrer">https://time.geekbang.org/column/intro/74</a></td></tr><tr><td>《深度学习推荐系统实战》</td><td>即刻课程，需要可以找 $\\color{ #0089FF }{@万}$ 。重点在于介绍深度学习的算法与深度学习推荐系统的工程实践，对于传统的算法没有介绍</td><td><a href="https://time.geekbang.org/column/intro/349" target="_blank" rel="noreferrer">https://time.geekbang.org/column/intro/349</a></td></tr><tr><td>全面理解搜索 Query</td><td>重点介绍了 query 理解的过程，对如何处理用户的查询有比较详细的认识</td><td><a href="https://zhuanlan.zhihu.com/p/112719984" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/112719984</a></td></tr><tr><td>蘑菇街搜索与推荐架构</td><td>主要介绍了蘑菇街搜索推荐的项目的建设过程</td><td><a href="https://mp.weixin.qq.com/s/8-5VuDvlInjIwbPn36_2mA" target="_blank" rel="noreferrer">https://mp.weixin.qq.com/s/8-5VuDvlInjIwbPn36_2mA</a></td></tr><tr><td>美团点评旅游搜索召回策略的演进</td><td>重点介绍了 query 的理解过程，以及召回策略的改进</td><td><a href="https://tech.meituan.com/2017/06/16/travel-search-strategy.html" target="_blank" rel="noreferrer">https://tech.meituan.com/2017/06/16/travel-search-strategy.html</a></td></tr><tr><td>有赞个性化推荐能力的演进与实践</td><td>介绍有赞推荐系统的演进</td><td><a href="https://segmentfault.com/a/1190000039103774?utm_source=sf-similar-article" target="_blank" rel="noreferrer">https://segmentfault.com/a/1190000039103774?utm_source=sf-similar-article</a></td></tr><tr><td>万字长文解读电商搜索</td><td>详细介绍了搜索的业务和实现方案</td><td><a href="https://zhuanlan.zhihu.com/p/100775879" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/100775879</a></td></tr><tr><td></td><td></td><td></td></tr></tbody></table>',283),i=[l];function o(n,s,h,c,g,u){return e(),a("div",null,i)}const y=t(r,[["render",o]]);export{m as __pageData,y as default};
