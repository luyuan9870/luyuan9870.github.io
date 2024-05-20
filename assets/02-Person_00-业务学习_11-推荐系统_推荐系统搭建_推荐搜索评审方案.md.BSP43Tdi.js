import{_ as t,c as a,o as d,a4 as e}from"./chunks/framework.BG61BEI0.js";const b=JSON.parse('{"title":"推荐搜索评审方案","description":"","frontmatter":{},"headers":[],"relativePath":"02-Person/00-业务学习/11-推荐系统/推荐系统搭建/推荐搜索评审方案.md","filePath":"02-Person/00-业务学习/11-推荐系统/推荐系统搭建/推荐搜索评审方案.md","lastUpdated":1715303929000}'),r={name:"02-Person/00-业务学习/11-推荐系统/推荐系统搭建/推荐搜索评审方案.md"},o=e('<h1 id="推荐搜索评审方案" tabindex="-1">推荐搜索评审方案 <a class="header-anchor" href="#推荐搜索评审方案" aria-label="Permalink to &quot;推荐搜索评审方案&quot;">​</a></h1><p><strong>技术调研</strong></p><p>业务功能图:</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/pL1eNkeJXhg4YBEx/5abd5ad9d41649edb4095041791b7ef72400.png" alt="image" loading="lazy"></p><p>技术调研详细文档</p><p><a href="https://alidocs.dingtalk.com/i/team/r98zna17Vpg2GLxn/docs/r98znQ2Mp7x6AGLx?corpId=ding67efd74ff5c6478b35c2f4657eb6378f#" target="_blank" rel="noreferrer">https://alidocs.dingtalk.com/i/team/r98zna17Vpg2GLxn/docs/r98znQ2Mp7x6AGLx?corpId=ding67efd74ff5c6478b35c2f4657eb6378f#</a> 「推荐搜索技术调研」</p><p><strong>整体架构</strong></p><h2 id="工程架构" tabindex="-1">工程架构 <a class="header-anchor" href="#工程架构" aria-label="Permalink to &quot;工程架构&quot;">​</a></h2><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/pawrDxXKeSzWlLVa/07f90a625fbc4ab2b93e7ec7e71ba1002400.png?x-oss-process=image/crop,x_0,y_0,w_2698,h_1298" alt="image" loading="lazy"></p><h2 id="数据清洗流程" tabindex="-1">数据清洗流程 <a class="header-anchor" href="#数据清洗流程" aria-label="Permalink to &quot;数据清洗流程&quot;">​</a></h2><h3 id="搜索-增量流程" tabindex="-1">搜索-增量流程 <a class="header-anchor" href="#搜索-增量流程" aria-label="Permalink to &quot;搜索-增量流程&quot;">​</a></h3><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/d52rNXkjGf7JeQMk/81fa60026eef40f39a1ccf8076ef7ed92400.png" alt="image" loading="lazy"></p><h3 id="搜索-全量流程" tabindex="-1">搜索-全量流程 <a class="header-anchor" href="#搜索-全量流程" aria-label="Permalink to &quot;搜索-全量流程&quot;">​</a></h3><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/d52rNXkjGf7JeQMk/54acc438212b4b94aa75f8479abd168b2400.png" alt="image" loading="lazy"></p><h3 id="推荐-工程模块多版本切换" tabindex="-1">推荐-工程模块多版本切换 <a class="header-anchor" href="#推荐-工程模块多版本切换" aria-label="Permalink to &quot;推荐-工程模块多版本切换&quot;">​</a></h3><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/6nVww9J5vf9KbOGa/b8847588d7154d67859d48e514becac32400.png" alt="image" loading="lazy"></p><p>中短期详细技术方案</p><p><a href="https://alidocs.dingtalk.com/i/team/r98zna17Vpg2GLxn/docs/r98znQ2Mp103RGLx?corpId=ding67efd74ff5c6478b35c2f4657eb6378f#" target="_blank" rel="noreferrer">https://alidocs.dingtalk.com/i/team/r98zna17Vpg2GLxn/docs/r98znQ2Mp103RGLx?corpId=ding67efd74ff5c6478b35c2f4657eb6378f#</a> 「推荐搜索技术方案」</p><p><a href="https://alidocs.dingtalk.com/i/team/r98zna17Vpg2GLxn/docs/r98znQ2MMv4PgGLx?corpId=ding67efd74ff5c6478b35c2f4657eb6378f#" target="_blank" rel="noreferrer">https://alidocs.dingtalk.com/i/team/r98zna17Vpg2GLxn/docs/r98znQ2MMv4PgGLx?corpId=ding67efd74ff5c6478b35c2f4657eb6378f#</a> 「搜索数据同步方案」</p><p><a href="https://alidocs.dingtalk.com/i/team/r98zna17Vpg2GLxn/docs/r98znQQBrM13eGLx?corpId=ding67efd74ff5c6478b35c2f4657eb6378f#" target="_blank" rel="noreferrer">https://alidocs.dingtalk.com/i/team/r98zna17Vpg2GLxn/docs/r98znQQBrM13eGLx?corpId=ding67efd74ff5c6478b35c2f4657eb6378f#</a> 「推荐数据同步方案」</p><p><strong>需求场景</strong></p><h2 id="搜索系统" tabindex="-1">搜索系统 <a class="header-anchor" href="#搜索系统" aria-label="Permalink to &quot;搜索系统&quot;">​</a></h2><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/pawrDxXKeSzWlLVa/bafa7d5ce74c469a90190b594906d3092400.png" alt="image" loading="lazy"></p><p>应用</p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/deDaxQXb2u0ZoX8j/0f191e70a236485b8be3acea1d00a1032400.png" alt="image" loading="lazy"></p><table><thead><tr><th>功能</th><th>子功能</th><th>描述</th></tr></thead><tbody><tr><td>搜索场景</td><td>首页搜索</td><td>按照sku维度进行查询es，按照spu维度进行折叠</td></tr><tr><td></td><td>类目搜索</td><td>在es召回查询中匹配类目一致的sku数据</td></tr><tr><td></td><td></td><td></td></tr><tr><td>查询过程</td><td>同义词改写</td><td>运营配置</td></tr><tr><td></td><td>文本匹配</td><td>使用es对于每种语言设置专门分词器，BM25算法</td></tr><tr><td></td><td>排序</td><td>价格、销量、上架时间</td></tr></tbody></table><p><a href="https://alidocs.dingtalk.com/i/team/r98zna17Vpg2GLxn/docs/r98znQ2MMPvweGLx?corpId=ding67efd74ff5c6478b35c2f4657eb6378f#" target="_blank" rel="noreferrer">https://alidocs.dingtalk.com/i/team/r98zna17Vpg2GLxn/docs/r98znQ2MMPvweGLx?corpId=ding67efd74ff5c6478b35c2f4657eb6378f#</a> 「搜索系统详细设计」</p><h2 id="推荐系统" tabindex="-1">推荐系统 <a class="header-anchor" href="#推荐系统" aria-label="Permalink to &quot;推荐系统&quot;">​</a></h2><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/pawrDxXKeSzWlLVa/efa3806e1a8e4946b08831b6a96e56f42400.png" alt="image" loading="lazy"></p><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/pawrDxXKeSzWlLVa/b5ce26670b8f4e89be99ded4f17ddf902400.png" alt="image" loading="lazy"></p><table><thead><tr><th>模块</th><th>描述</th><th>坑位</th></tr></thead><tbody><tr><td>Recommend for you</td><td>1. 主要依赖用户的埋点数据（如：浏览、搜索、加购物车）来进行统计推荐。（对算法依赖度不高）</td><td>首页-Recommend for you</td></tr><tr><td></td><td></td><td>购物车-You Might Also Like</td></tr><tr><td></td><td></td><td>个人中心-You Might Also Like</td></tr><tr><td></td><td></td><td>类目页-You Might Also Like</td></tr><tr><td></td><td></td><td>搜索页-You Might Also Like</td></tr><tr><td></td><td></td><td>支付完成页-You Might Also Like</td></tr><tr><td>买了又买</td><td>1. 前期主要依靠运营配置来进行冷启动 2. 后期会使用item-cf算法进行推荐（对算法依赖度较高）</td><td>商详页-Customers Who Bought This Item Also Bought</td></tr><tr><td>看了又看</td><td>1. 前期主要依靠运营配置来进行冷启动 2. 后期会使用user-cf算法进行推荐（对算法依赖度较高）</td><td>商详页-Customers who viewed this item also viewed</td></tr><tr><td>频道相关</td><td>1. 与搜索使用同一个es数据模型，相当于一个有隐含查询条件的搜索（对算法依赖度不高）</td><td>首页-Deals</td></tr><tr><td></td><td></td><td>首页-New Release</td></tr><tr><td></td><td></td><td>首页-Best Sellers</td></tr><tr><td></td><td></td><td>Deals-默认排序</td></tr><tr><td></td><td></td><td>Deals-hot</td></tr><tr><td></td><td></td><td>Deals-价格排序</td></tr><tr><td></td><td></td><td>Deals-折扣排序</td></tr><tr><td></td><td></td><td>Best sellers</td></tr><tr><td></td><td></td><td>New Release-recommend</td></tr><tr><td></td><td></td><td>New Release-价格</td></tr><tr><td></td><td></td><td>New Release-折扣</td></tr><tr><td></td><td></td><td>New Release-hot</td></tr></tbody></table><p><a href="https://alidocs.dingtalk.com/i/team/r98zna17Vpg2GLxn/docs/r98znQQBrOrrkGLx?corpId=ding67efd74ff5c6478b35c2f4657eb6378f#" target="_blank" rel="noreferrer">https://alidocs.dingtalk.com/i/team/r98zna17Vpg2GLxn/docs/r98znQQBrOrrkGLx?corpId=ding67efd74ff5c6478b35c2f4657eb6378f#</a> 「推荐系统详细设计」</p><h1 id="_4-可靠性" tabindex="-1">4. 可靠性 <a class="header-anchor" href="#_4-可靠性" aria-label="Permalink to &quot;4. 可靠性&quot;">​</a></h1><h2 id="es搜索高可用方案" tabindex="-1">es搜索高可用方案 <a class="header-anchor" href="#es搜索高可用方案" aria-label="Permalink to &quot;es搜索高可用方案&quot;">​</a></h2><table><thead><tr><th>方案名称</th><th>详细描述</th><th>优缺点</th></tr></thead><tbody><tr><td>双es集群，双活</td><td>将业务数据同时写入两个es集群，通过负载均衡将es请求发送到两个es集群上</td><td>优点：     资源隔离，当单个es集群出现问题后不影响整体可用性      当集群切换时，不需要冷启动过程，可以直接使用 缺点：      需要资源比较大，需要每个集群都能单独扛住所有流量，一个集群出问题后，另一个能够支撑</td></tr><tr><td>双es集群，主备</td><td>将业务数据实时写入主es集群并使用，通过快照的方式将数据定时同步到备es集群上，当主es 集群出现问题时，可以降级使用备es集群</td><td>优点： 1. 当主es集群出现问题时可以降级使用备es集群 2. 备es集群由于较少使用且不会使用复杂的查询，可以比主es集群资源少 缺点： 1. 由于备es集群只做降级使用所以切换后数据需要预热，可能导致备es集群的不可用</td></tr><tr><td>使用云厂商提供的Es服务</td><td>aws等云厂商提供了es服务，并保证SLA等级</td><td>优点:     将es的维护由云厂商的专业人员进行维护，减少运维的成本 缺点： 1. 出现问题时不可控，由于es服务完全托管给了云厂商，出现问题只能联络云厂商人员来解决 2. 费用比自己维护es集群的费用可能较高 3. 存在数据安全和法律问题</td></tr></tbody></table><p>结论：由于项目启动阶段，访问量和资源消耗都存在不确定性，先不做多集群故障切换方案，前期预留设计</p><h2 id="数据异常-回退版本" tabindex="-1">数据异常-回退版本 <a class="header-anchor" href="#数据异常-回退版本" aria-label="Permalink to &quot;数据异常-回退版本&quot;">​</a></h2><p>多版本索引解决问题：</p><ol><li><p>数据清洗、导致异常</p></li><li><p>运营配置、业务代码 导致大规模数据如价格、库存 等 业务数据异常</p></li><li><p>ES 集群故障后，可通过多版本切换到新的集群和索引</p></li></ol><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/pawrDxXKeSzWlLVa/c4edcab6ce68444d9fc8dec1a80c4de42400.png" alt="image" loading="lazy"></p>',40),s=[o];function c(i,n,l,h,p,f){return d(),a("div",null,s)}const m=t(r,[["render",c]]);export{b as __pageData,m as default};
