import{_ as s,c as a,o as i,a4 as t}from"./chunks/framework.BG61BEI0.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.01-Java/Java基础/泛型.md","filePath":"01-Dev/01.01-Java/Java基础/泛型.md"}'),e={name:"01-Dev/01.01-Java/Java基础/泛型.md"},n=t(`<h2 id="泛型是什么" tabindex="-1">泛型是什么 <a class="header-anchor" href="#泛型是什么" aria-label="Permalink to &quot;泛型是什么&quot;">​</a></h2><blockquote><p>对对象的一个占位符, 可表示已经确定的<strong>某些</strong>对象的<strong>参数化类型</strong> 当值不想设置为 Object 的时候, 可以采用泛型, 因为设置成为 Object 时需要程序员显式转换. 代码复用机制，允许类、接口和方法操作特定类型的数据，并且在编译时检查类型安全性。 泛型提供了一种方法来定义类、接口和方法，使其可以与任何类型一起使用，而无需在使用时指定具体的类型。 泛型与接口的作用很相似, 定义一个接口, 我们只需要调用接口, 而不关心它的具体实现. 泛型也是这个意思, 我给你一个碗不关心你拿碗盛饭盛菜还是盛汤</p></blockquote><p>泛型能干什么</p><blockquote><p>代码复用, 允许类、接口和方法中操作特定类型的数据, <code>List&lt;String&gt;</code> , 编译时检查类型安全.</p></blockquote><p>泛型怎么用</p><h2 id="泛型通配符" tabindex="-1">泛型通配符 <a class="header-anchor" href="#泛型通配符" aria-label="Permalink to &quot;泛型通配符&quot;">​</a></h2><blockquote><p>通配符的作用是为了限制泛型的定义范围</p></blockquote><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;?&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 无界通配符，即类型不确定，任意类型</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">T</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 同 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> extends T</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 上边界通配符 , 必须是 T 类的子类, 遵守只读不写</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> T</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 下边界通配符 , 必须是 T 的父类, 遵守只写不读</span></span></code></pre></div><h3 id="类型参数化、泛型方法、泛型接口、泛型通配符" tabindex="-1">类型参数化、泛型方法、泛型接口、泛型通配符 <a class="header-anchor" href="#类型参数化、泛型方法、泛型接口、泛型通配符" aria-label="Permalink to &quot;类型参数化、泛型方法、泛型接口、泛型通配符&quot;">​</a></h3><p>可以在类、接口和方法中使用类型参数，以创建可以处理不同类型的泛型代码。</p>`,10),l=[n];function h(p,k,o,r,d,c){return i(),a("div",null,l)}const E=s(e,[["render",h]]);export{_ as __pageData,E as default};
