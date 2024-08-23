import{_ as a,c as e,o as t,a4 as r}from"./chunks/framework.BG61BEI0.js";const p=JSON.parse('{"title":"3. 推荐系统的设计","description":"","frontmatter":{},"headers":[],"relativePath":"02-Person/00-业务学习/05-搜广推/02-推荐/00-《推荐系统从入门到放弃》/99-问题答疑.md","filePath":"02-Person/00-业务学习/05-搜广推/02-推荐/00-《推荐系统从入门到放弃》/99-问题答疑.md"}'),i={name:"02-Person/00-业务学习/05-搜广推/02-推荐/00-《推荐系统从入门到放弃》/99-问题答疑.md"},o=r('<h2 id="关键词的搜索分类" tabindex="-1">关键词的搜索分类 <a class="header-anchor" href="#关键词的搜索分类" aria-label="Permalink to &quot;关键词的搜索分类&quot;">​</a></h2><h2 id="脚本操作" tabindex="-1">脚本操作 <a class="header-anchor" href="#脚本操作" aria-label="Permalink to &quot;脚本操作&quot;">​</a></h2><h1 id="_3-推荐系统的设计" tabindex="-1">3. 推荐系统的设计 <a class="header-anchor" href="#_3-推荐系统的设计" aria-label="Permalink to &quot;3. 推荐系统的设计&quot;">​</a></h1><h2 id="在没有大量的用户数据时-推荐系统如何设计" tabindex="-1">在没有大量的用户数据时，推荐系统如何设计 <a class="header-anchor" href="#在没有大量的用户数据时-推荐系统如何设计" aria-label="Permalink to &quot;在没有大量的用户数据时，推荐系统如何设计&quot;">​</a></h2><p>打标签，item，商品</p><h2 id="_4-推荐算法的上下文信息" tabindex="-1">4. 推荐算法的上下文信息 <a class="header-anchor" href="#_4-推荐算法的上下文信息" aria-label="Permalink to &quot;4. 推荐算法的上下文信息&quot;">​</a></h2><p>包含用户的时间地点心情 时间： 冬天买衣服可能不能推荐短袖 地点： 三亚的冬天也不用推荐羽绒服</p><p>搜索干预</p><h2 id="_5-模型训练" tabindex="-1">5. 模型训练 <a class="header-anchor" href="#_5-模型训练" aria-label="Permalink to &quot;5. 模型训练&quot;">​</a></h2><p>自主基于 Python 做模型训练</p><h2 id="商详页的推荐场景" tabindex="-1">商详页的推荐场景. <a class="header-anchor" href="#商详页的推荐场景" aria-label="Permalink to &quot;商详页的推荐场景.&quot;">​</a></h2><p>最常用的两种通用召回策略, 基于 Item 表示向量的相似度召回, 基于 Item 关联规则 (tag) 的召回</p><ul><li>基于 Item 表示向量的相似度召回, 物品 Item 的显示画像的表示, 把整个 item 嵌入到向量的表示, 用户-物品的矩阵</li><li>基于 Item 关联规则的召回 (常用在电商的购物车页面推荐或者购买页面推荐中), 找出所有用户购买的所有商品数据里频繁出现的 item 排序, 来做频繁集挖掘, 找到满足支持度 (即两个商品被同时购买的概率) 阈值的关联物品. 关联规则中分析的关键概念包括 <ul><li>支持度 (Support): 它是两件商品 (A＆B) 在总销量 (N) 中出现的概率, 即 A 和 B 同时被购买的概率;</li><li>置信度 (Confindence): 它是购买 A 后再购买 B 的概率;</li><li>提升度 (Lift): 它表示先购买 A 对购买 B 的概率的提升作用, 用来判断规则是否有实际价值, 及使用规则后商品在购物车中出现的次数是否高于商品单独出现购物车中的频率 排序</li></ul></li></ul>',13),l=[o];function n(h,_,s,d,c,m){return t(),e("div",null,l)}const f=a(i,[["render",n]]);export{p as __pageData,f as default};
