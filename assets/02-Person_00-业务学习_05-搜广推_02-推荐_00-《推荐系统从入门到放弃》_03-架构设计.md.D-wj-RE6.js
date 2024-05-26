import{_ as t,c as l,o as s,a4 as a}from"./chunks/framework.rIDq68an.js";const o="/assets/image-20240428151217568.4xz46n16.png",i="/assets/image-20240428151958997.C7t8M-X2.png",e="/assets/20240306142142.DcaCclt_.png",n="/assets/image-20240429152351448.s0_btTJB.png",p="/assets/image-20240430092717469.C9t4MJjn.png",z=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"02-Person/00-业务学习/05-搜广推/02-推荐/00-《推荐系统从入门到放弃》/03-架构设计.md","filePath":"02-Person/00-业务学习/05-搜广推/02-推荐/00-《推荐系统从入门到放弃》/03-架构设计.md"}'),_={name:"02-Person/00-业务学习/05-搜广推/02-推荐/00-《推荐系统从入门到放弃》/03-架构设计.md"},r=a('<h2 id="架构设计" tabindex="-1">架构设计 <a class="header-anchor" href="#架构设计" aria-label="Permalink to &quot;架构设计&quot;">​</a></h2><p><strong>Netflix 架构设计</strong></p><p>首先，我们在下图中展示了推荐系统的总体系统图。该架构的主要组件包含一种或多种机器学习算法。 <img src="'+o+'" alt="" loading="lazy"></p><p>注释版本 <img src="'+i+'" alt="" loading="lazy"></p><p>Netflix 把推荐系统拆分成了三部分</p><blockquote><p>它把推荐系统拆成这三部分的本质原因是因为推荐系统本身就是由 <code>数据</code> 来决定的.</p></blockquote><ul><li>在线部分 <ul><li>基于用户属性和场景信息，进行召回打分。并把结果推荐给用户。</li><li>存储和分发用户和推荐系统的交互信息，用于推荐系统的自我迭代</li></ul></li><li>近线部分 <ul><li>将算法模型所需要的特征数据存储在 mysql 中，在数据获取上减少延迟推断</li><li>定时更新，保持特征的实时性。</li></ul></li><li>离线部分 <ul><li>训练算法模型时, 需要对模型进行大量的数据投喂，才能够获得一定的数据预测能力（向量矩阵打分）</li><li>我们可以对数据做的最简单的事情就是存储它以供以后离线处理, 大数据相关技术例如 hadoop</li><li>离线计算对数据量和算法计算复杂度的限制较小，因为它以批处理方式运行，时序要求宽松但是，由于未合并最新数据，因此它很容易在更新之间变得 <code>陈旧</code>。</li></ul></li></ul><p>计算可以离线、近线或在线完成。在线计算可以更好地响应最近的事件和用户交互，但必须实时响应请求。 这会限制所采用算法的计算复杂性以及可以处理的数据量。这也是为什么会存在离线和近线部分的重要原因。</p><p>个性化架构中的关键问题之一是如何以无缝方式组合和管理在线和离线计算。</p><p>近线计算是这两种模式之间的中间折衷方案，我们可以执行类似在线的计算，但不需要实时提供它们。</p><p>模型训练是另一种计算形式，它使用现有数据生成模型，该模型稍后将在实际结果计算过程中使用。</p><p><strong>Amazon 架构设计</strong><img src="'+e+'" alt="20240306142142.png" loading="lazy"></p><p><img src="'+n+'" alt="" loading="lazy"></p><p><img src="'+p+'" alt="" loading="lazy"></p>',14),c=[r];function d(m,g,u,h,f,P){return s(),l("div",null,c)}const T=t(_,[["render",d]]);export{z as __pageData,T as default};
