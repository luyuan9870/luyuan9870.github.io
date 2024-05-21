import{_ as e,c as a,o as r,a4 as t}from"./chunks/framework.BG61BEI0.js";const o="/assets/20240305103956.DiMkmfcY.png",f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"02-Person/00-业务学习/10-搜索系统/02.搜广推核心业务链路.md","filePath":"02-Person/00-业务学习/10-搜索系统/02.搜广推核心业务链路.md"}'),n={name:"02-Person/00-业务学习/10-搜索系统/02.搜广推核心业务链路.md"},i=t('<h2 id="搜推召回业务" tabindex="-1">搜推召回业务 <a class="header-anchor" href="#搜推召回业务" aria-label="Permalink to &quot;搜推召回业务&quot;">​</a></h2><h3 id="召回是什么" tabindex="-1">召回是什么 ? <a class="header-anchor" href="#召回是什么" aria-label="Permalink to &quot;召回是什么 ?&quot;">​</a></h3><p><strong>通义千问 AI:</strong></p><p>在跨境电商的搜索系统中，“召回”（Retrieval）是指当用户输入查询关键词（Query）后，搜索引擎首先从海量的商品库中快速找出与该关键词相关的一系列候选商品的过程。这一阶段的目标是尽可能全面且高效地找出所有可能满足用户需求的商品，而不仅仅是精确匹配的结果。</p><p>召回机制是搜索推荐系统中常用的算法策略<strong>通过用户的属性和行为来进行数据的筛选和匹配</strong>. 它的目标是根据用户的历史浏览记录, 购物记录, 推测出可能感兴趣的商品从而提供符合用户需求的商品推荐.</p><p>与传统的排名方式不同, 召回机制更关注匹配度而非明确的排名. 召回机制的目标是提供个性化、精准的商品推荐，让用户能够更轻松的找到自己感兴趣的商品，并提升用户购物体验。（阿里巴巴千人千面） 总而言之, 召回机制是一种基于用户历史行为和兴趣的算法策略, 用于预测和推荐可能感兴趣的商品, 并在电商平台等推荐系统中提供个性化精准的商品推荐</p><p>具体来说，在电商搜索召回阶段，通常会采用多种策略和技术手段来实现：</p><ol><li>分词处理：对用户的查询进行分词分析，理解其真实意图。</li><li>索引检索：利用倒排索引等数据结构快速定位包含关键词的商品记录。</li><li>相关性计算：基于商品标题、描述、分类、标签等多种信息，通过算法模型评估每个商品与查询关键词的相关度。</li><li>Query 理解和扩展：根据用户的历史行为、热门搜索以及语义关联关系，对原始 Query 进行扩展，增加召回范围。</li><li>多路召回：不同的召回策略并行执行，如基于文本的召回、基于类目属性的召回、基于用户画像的个性化召回等。</li><li>前置筛选过滤：结合业务规则和商品状态，对初步召回结果进行必要的过滤，例如排除下架商品、不符合地区销售规则的商品等。 召回之后，系统通常还会对召回的商品列表进行排序优化，确保最符合用户需求的商品能够优先展示给用户，这个过程被称为“排序”或“rerank”。</li></ol><hr><h2 id="搜索业务" tabindex="-1">搜索业务 <a class="header-anchor" href="#搜索业务" aria-label="Permalink to &quot;搜索业务&quot;">​</a></h2><h3 id="用户常见搜索分类" tabindex="-1">用户常见搜索分类 <a class="header-anchor" href="#用户常见搜索分类" aria-label="Permalink to &quot;用户常见搜索分类&quot;">​</a></h3><p>所有的召回都是基于用户的 <code>query</code> 来的, 主要分为两大类, <code>单一实体</code>, <code>多实体</code><img src="'+o+'" alt="" loading="lazy"></p><p>Query 改写 预处理 纠错, 切词, 拼音转汉字, 去停用词 切词: 将一个词语, 切成多个 tag 词 拼音转汉字: 字母简写转汉字, 全拼转汉字 去停用词: 无用的字符删除 词库识别 同义词, 近义词</p><p>协同过滤</p><hr><p>文章参考<br><a href="https://zhuanlan.zhihu.com/p/558432791" target="_blank" rel="noreferrer">推荐系统如何平衡推荐结果的相关性和多样性 - 知乎</a></p><p><a href="https://www.zhihu.com/tardis/bd/art/262161436?source_id=1001" target="_blank" rel="noreferrer">搜索策略产品经理必读系列—第二讲电商搜索召回</a></p><p><a href="https://zhuanlan.zhihu.com/p/524617291" target="_blank" rel="noreferrer">推荐策略产品经理必读系列—第三讲推荐系统的召回一 - 知乎</a></p><p><a href="https://tech.meituan.com/2022/02/17/exploration-and-practice-of-query-rewriting-in-meituan-search.html" target="_blank" rel="noreferrer">美团搜索中查询改写技术的探索与实践 - 美团技术团队</a></p>',19),l=[i];function s(h,c,p,_,d,u){return r(),a("div",null,l)}const b=e(n,[["render",s]]);export{f as __pageData,b as default};
