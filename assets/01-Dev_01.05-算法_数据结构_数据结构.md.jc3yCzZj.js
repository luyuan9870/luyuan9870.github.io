import{_ as e,c as a,o as l,a4 as t}from"./chunks/framework.rIDq68an.js";const o="/assets/image-20240607094316984.C4Cdmsrb.png",m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.05-算法/数据结构/数据结构.md","filePath":"01-Dev/01.05-算法/数据结构/数据结构.md"}'),r={name:"01-Dev/01.05-算法/数据结构/数据结构.md"},i=t('<h2 id="avl" tabindex="-1">AVL <a class="header-anchor" href="#avl" aria-label="Permalink to &quot;AVL&quot;">​</a></h2><blockquote><p>在 AVL 中, 任何节点的两个子树的高度差最大为 1，所以也叫高度平衡树（这个树的层级会很深）</p></blockquote><p><strong>特性</strong></p><ul><li>对于任何一个子树的 ROOT 节点，左边的数据一定同比右边的数据要小，反而亦之。</li><li>任何节点的两个子树的高度差最大为 1 <strong>数据失衡的处理方式</strong></li></ul><blockquote><p>数据失衡指的是在二叉树中，原本的树结构被打破了。需要重新调整树结构</p></blockquote><p>左旋、右旋。人话版本： （如果根节点被打破了，在老的树形结构中在右边，需要上升到根节点的 Root，这个过程叫右旋）</p><h2 id="rbt-红黑树" tabindex="-1">RBT(红黑树) <a class="header-anchor" href="#rbt-红黑树" aria-label="Permalink to &quot;RBT(红黑树)&quot;">​</a></h2><p>和 AVL 很像，数据失衡的处理多了一个变色</p><h2 id="b-树" tabindex="-1">B+树 <a class="header-anchor" href="#b-树" aria-label="Permalink to &quot;B+树&quot;">​</a></h2><blockquote><p>B +树是一种多叉树结构，它的数据结构一般为多个页组成的多层级结构，一般一个页大小为 16 KB， 一个数据页可以放特别多的索引信息，所以扇出很高，每一个索引页都能指向一千多个子页，三层左右就可以存储大概 2 kw 的数据。最多只需要 3 次 IO。</p></blockquote><p>以主键索引为例，最末级的叶子结点存放行数据。非叶子节点则放的是索引信息（主键 ID 和页号），用于加速查询</p><p>以新增数据为例，分为三种情况，</p><ol><li>新插入的数据不会导致叶子节点和索引节点的变化，这个时候直接进行插入操作</li><li>新插入的数据会导致叶子节点变化而索引节点吧</li></ol><p>调整数据页，叶子节点和非叶子节点都会调整。 叶子和索引节点都没满： 直接加进去 叶子节点满了，索引节点没满： 插入新数据时，调整叶子节点的数据页，往索引节点新增一条数据 叶子节点满了，索引节点满了：插入新数据时，叶子和索引节点的数据都要进行拆分。同时还需要往上层在加入一个新的索引。</p><h3 id="b-树的数据页" tabindex="-1">B+树的数据页 <a class="header-anchor" href="#b-树的数据页" aria-label="Permalink to &quot;B+树的数据页&quot;">​</a></h3><p>数据页的结构：</p><ul><li>页层级信息</li><li>页的元数据 （页头） <ul><li>前页指针</li><li>页号</li><li>后页指针</li></ul></li><li>页的行数据 <ul><li>行 ID</li><li>数据值</li></ul></li><li>页目录 <ul><li>可以通过二分查找的方式，针对当前数据页进行查找。</li></ul></li><li>页尾 <ul><li>校验码</li></ul></li></ul><p><strong>索引是怎么建立的？</strong> 基于上述描述的数据页，每一个数据页里拿一个 ID 最小的数据（只拿 ID），并且记录下这个数据页的页号。组成一个新的数据页。 在这个新的数据页中，加入页层级的信息。这个就是索引</p><h2 id="跳表" tabindex="-1">跳表 <a class="header-anchor" href="#跳表" aria-label="Permalink to &quot;跳表&quot;">​</a></h2><blockquote><p>本质上是一个 <code>链表</code> + <code>多级索引</code> + <code>指针</code> 的一个组合，其目的是为了降低链表的循环查找。通过多级索引的方式来间隔出与原始链表的数据差距，通过指针指向原始链表。 通过牺牲空间来获取时间。</p></blockquote><p><img src="'+o+'" alt="" loading="lazy"></p><h2 id="相关参考" tabindex="-1">相关参考 <a class="header-anchor" href="#相关参考" aria-label="Permalink to &quot;相关参考&quot;">​</a></h2><p><a href="https://www.cnblogs.com/crazymakercircle/p/16320430.html" target="_blank" rel="noreferrer">红黑树（图解+秒懂+史上最全） - 疯狂创客圈 - 博客园</a></p><p><a href="https://oi-wiki.org/ds/skiplist/" target="_blank" rel="noreferrer">跳表 - OI Wiki</a></p><p><a href="https://www.cnblogs.com/Laymen/p/14084664.html" target="_blank" rel="noreferrer">跳表(SkipList)原理篇 - Laymen - 博客园</a></p>',25),n=[i];function s(c,p,h,d,u,_){return l(),a("div",null,n)}const k=e(r,[["render",s]]);export{m as __pageData,k as default};
