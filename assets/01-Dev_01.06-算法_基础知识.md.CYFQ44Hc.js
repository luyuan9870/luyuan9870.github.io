import{_ as t,c as a,o as l,a4 as i}from"./chunks/framework.BG61BEI0.js";const _=JSON.parse('{"title":"什么是算法","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.06-算法/基础知识.md","filePath":"01-Dev/01.06-算法/基础知识.md","lastUpdated":1713951182000}'),e={name:"01-Dev/01.06-算法/基础知识.md"},p=i('<h1 id="什么是算法" tabindex="-1">什么是算法 <a class="header-anchor" href="#什么是算法" aria-label="Permalink to &quot;什么是算法&quot;">​</a></h1><p>程序设计=数据结构+算法</p><ul><li><p>根据具体的问题，设计解决问题的具体流程。</p></li><li><p>根据一定的条件， 对一些数据进行计算，得到需要对结果 （可以解决具体的问题）</p></li><li><p>有设计解决的具体流程 （高斯算法）</p></li><li><p>花费最少的时间完成需求，占据最少内的存完成需求 被称之为优质的算法 （有评价这个算法的具体指标）</p></li><li><p>时间复杂度</p></li><li><p>空间复杂度</p></li></ul><h1 id="什么是数据结构" tabindex="-1">什么是数据结构 <a class="header-anchor" href="#什么是数据结构" aria-label="Permalink to &quot;什么是数据结构&quot;">​</a></h1><ol><li>数据结构就是把数据元素按照一定的关系组织起来的一组集合，用来组织和存储数据。</li><li>可以理解成Java中的List，Map等等</li><li>存储数据的方式（List，Map，数组，链表）</li><li>任何数据结构都是物理结构上的 顺序结构和链式结构</li></ol><h1 id="数据结构的分类" tabindex="-1">数据结构的分类 <a class="header-anchor" href="#数据结构的分类" aria-label="Permalink to &quot;数据结构的分类&quot;">​</a></h1><h2 id="逻辑结构" tabindex="-1">逻辑结构 <a class="header-anchor" href="#逻辑结构" aria-label="Permalink to &quot;逻辑结构&quot;">​</a></h2><p>思想上的结构 ： 厨房，卧室，卫生间</p><ul><li>线型结构（链表结构</li></ul><ol><li>线型结构中的数据元素存在一对一的关系。</li></ol><ul><li>集合结构（数组结构</li></ul><ol><li>集合结构中数据元素除了属于同一个集合以外，没有其他的任何关系。</li></ol><ul><li>树形结构（Tree 结构</li></ul><ol start="2"><li>树形结构中的数据元素存在一对多的层级关系</li></ol><ul><li><p>图型结构（多对多结构</p></li><li><p>多对多的数据元素</p></li></ul><h2 id="物理结构" tabindex="-1">物理结构 <a class="header-anchor" href="#物理结构" aria-label="Permalink to &quot;物理结构&quot;">​</a></h2><p>真实的结构： 钢筋混凝土+牛顿力学</p><ul><li><p>顺序结构（紧密结构）（数组，特点查询快，增删慢）</p></li><li><p>顺序结构存储的数据单元是连续的</p></li><li><p>顺序存储结构的弊端，就像生活中排队也会有人插队也会有人有特殊情况离开，这时候整个结构都处于变化中，此时就需要链式结构去存储</p></li><li><p>链式结构（跳转结构）（链表，特点增删快，查询慢）</p></li><li><p>把数据元素存放在任意存储单元里，这组存储单元可以是连续的也可以是不连续的。此时数据之间不能反应元素之间的逻辑关系，因此在链表中会在每个元素的前后加上指针，来存放数据元素的地址。</p></li></ul><h1 id="位运算" tabindex="-1">位运算 <a class="header-anchor" href="#位运算" aria-label="Permalink to &quot;位运算&quot;">​</a></h1><p>逻辑位运算</p><p>位移位运算</p><table><thead><tr><th></th><th></th><th></th></tr></thead><tbody><tr><td>＆ 位与</td><td>如果相对应位都是1，则结果为1，否则为0</td><td>（A＆B），得到12，即0000 1100</td></tr><tr><td>| 位或</td><td>如果相对应位都是 0，则结果为 0，否则为 1</td><td>（A | B）得到61，即 0011 1101</td></tr><tr><td>^ 异或</td><td>如果相对应位值相同，则结果为0，否则为1</td><td>（A ^ B）得到49，即 0011 0001</td></tr><tr><td>〜 取反</td><td>按位取反运算符翻转操作数的每一位，即0变成1，1变成0。</td><td>（〜A）得到-61，即1100 0011</td></tr><tr><td>&lt;&lt; 左移</td><td>按位左移运算符。左操作数按位左移右操作数指定的位数。<br><br>简单理解成 左移几位就相乘了几</td><td>A &lt;&lt; 2得到240，即 1111 0000</td></tr><tr><td>&gt;&gt; 右移</td><td>按位右移运算符。左操作数按位右移右操作数指定的位数。</td><td>A &gt;&gt; 2得到15即 1111</td></tr><tr><td>&gt;&gt;&gt;</td><td>按位右移补零操作符。左操作数的值按右操作数指定的位数右移，移动得到的空位以零填充。</td><td>A&gt;&gt;&gt;2得到15即0000 1111</td></tr></tbody></table><h2 id="位图" tabindex="-1">位图 <a class="header-anchor" href="#位图" aria-label="Permalink to &quot;位图&quot;">​</a></h2><p>压缩空间，</p><p>一个int 占4个byte 一个byte占4bit，</p><h1 id="时间复杂度" tabindex="-1">时间复杂度 <a class="header-anchor" href="#时间复杂度" aria-label="Permalink to &quot;时间复杂度&quot;">​</a></h1><h2 id="可达性分析" tabindex="-1">可达性分析： <a class="header-anchor" href="#可达性分析" aria-label="Permalink to &quot;可达性分析：&quot;">​</a></h2><p>理解成树结构-》 找子树或者叶子结点 都能够找得到</p><p>Java</p><ul><li><p>值传递</p></li><li><p>不会认内存地址， 就看自面值</p></li><li><p>和引用传递</p></li><li><p>会认内存地址</p></li></ul><p>因为java只有一种传递参数的方式：值传递。</p><p>在值传递中，实参的值被传给形参，方法体内对形参的任何赋值操作都不会影响到实参。</p><p>对形参的任何赋值操作都不会影响到实参，但是对于形参的字段，或者元素（假如形参是一个数组）的赋值操作会影响实参。</p><p><img src="https://cdn.nlark.com/yuque/0/2022/png/22905513/1667958162042-3040d305-759d-43cb-ab70-94cb20ab8b98.png" alt="" loading="lazy"></p><p>map在put 的时候， key 如果是基本类型+string类型， 默认是按照字面值， 如果是自己定义的对象， 是按照引用查找</p><p>引用传递 在map中只会存在引用地址，</p><p>值传递 对于原方法是不可见的</p><p>引用传递 对于原方法是可见的（A方法定义了一个 obj 传递给B方法， B方法对Obj做了修改是可见的）</p><p>异或运算</p><p>满足交换率和结合率</p><p>a ^ b</p>',41),d=[p];function r(o,h,n,s,c,u){return l(),a("div",null,d)}const m=t(e,[["render",r]]);export{_ as __pageData,m as default};
