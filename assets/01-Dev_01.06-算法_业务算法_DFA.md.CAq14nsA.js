import{_ as e,c as t,o as a,a4 as o}from"./chunks/framework.BG61BEI0.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.06-算法/业务算法/DFA.md","filePath":"01-Dev/01.06-算法/业务算法/DFA.md","lastUpdated":1712823825000}'),r={name:"01-Dev/01.06-算法/业务算法/DFA.md"},l=o('<p>DFA算法原理及实现 ：<a href="https://www.cnblogs.com/naaoveGIS/archive/2016/10/14/5960352.html" target="_blank" rel="noreferrer">基于DFA敏感词查询的算法简析 - 李晓晖 - 博客园</a></p><p>hutool实现DFA算法 ： <a href="https://hutool.cn/docs/#/dfa/%E6%A6%82%E8%BF%B0" target="_blank" rel="noreferrer">Hutool参考文档</a></p><h2 id="组建-单词书的过程" tabindex="-1">组建 单词书的过程 <a class="header-anchor" href="#组建-单词书的过程" aria-label="Permalink to &quot;组建 单词书的过程&quot;">​</a></h2><ol><li>得到字符串的长度</li><li>根据长度进行循环，得到每一个字</li><li>判断这个字在当前的树中有没有， 如果没有就添加到当前这个类的子类，有就直接走4</li><li>然后把当前节点指向上一个节点。 并且将下一个节点 指向当前节点</li><li>循环完成之后 设置最后一个节点的key</li></ol>',4),_=[l];function i(n,s,c,d,h,p){return a(),t("div",null,_)}const D=e(r,[["render",i]]);export{m as __pageData,D as default};
