import{_ as a,c as s,o as n,a4 as e}from"./chunks/framework.BG61BEI0.js";const m=JSON.parse('{"title":"Obsidian 插件开发","description":"","frontmatter":{"titel":"LuYuan","date":"2024-04-23 21:26","tags":["Obsidian","Vitepress","插件开发"]},"headers":[],"relativePath":"01-Dev/01.99-PlugIns/obsidian插件开发/obsidian插件开发.md","filePath":"01-Dev/01.99-PlugIns/obsidian插件开发/obsidian插件开发.md"}'),i={name:"01-Dev/01.99-PlugIns/obsidian插件开发/obsidian插件开发.md"},l=e(`<h1 id="obsidian-插件开发" tabindex="-1">Obsidian 插件开发 <a class="header-anchor" href="#obsidian-插件开发" aria-label="Permalink to &quot;Obsidian 插件开发&quot;">​</a></h1><h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>基于 Obsidian 做本地笔记，且通过 vitepress 打包本地 <code>某些目录</code> 下的笔记, 做成博客。</p><p>官方文档中关于侧边栏的配置必须将每个文档的路由进行手动配置，我的文档很多，又懒得去操心侧边栏每次新建文件，或者修改路径都需要去 <code>人肉</code> 更新侧边栏配置信息。很麻烦。</p><p>为了能够专心的写我的笔记而不去关心侧边栏、导航栏。我在想是否存在一款插件能够帮助我解决这个问题? 于是我去 ob 的插件市场和 <code> github</code> 搜索了一番... 发现并没有相关的插件。</p><p>所以.... 我尝试去写了一个 Ob 的插件来帮助我解决 <code>Vitepress</code> 的配置繁琐问题。</p><p>本系列文章将记录我是如何从新手快速入门并实现这一插件需求的。</p><p>(此时我的前端知识已经忘记的所剩无几.... 甚至我还使用 Java 来写了一版获取配置的代码。 但是使用上还是需要我自己手动去 CV )</p><p>这是官网的样例:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export default {</span></span>
<span class="line"><span>  themeConfig: {</span></span>
<span class="line"><span>    sidebar: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;Section Title A&#39;,</span></span>
<span class="line"><span>        items: [</span></span>
<span class="line"><span>          { text: &#39;Item A&#39;, link: &#39;/item-a&#39; },</span></span>
<span class="line"><span>          { text: &#39;Item B&#39;, link: &#39;/item-b&#39; },</span></span>
<span class="line"><span>          ...</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;Section Title B&#39;,</span></span>
<span class="line"><span>        items: [</span></span>
<span class="line"><span>          { text: &#39;Item C&#39;, link: &#39;/item-c&#39; },</span></span>
<span class="line"><span>          { text: &#39;Item D&#39;, link: &#39;/item-d&#39; },</span></span>
<span class="line"><span>          ...</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>我想把它变成动态的，或者是自己基于我的操作就可以实时更新的，或者是我有一个触发按钮能够帮助我解决这个繁琐且恶心的事情。帮助我提升一下效率，于是我去了解了一下 Obsdian 的插件开发</p><h2 id="需求" tabindex="-1">需求 <a class="header-anchor" href="#需求" aria-label="Permalink to &quot;需求&quot;">​</a></h2><ul><li>这款插件需要有一个插件设置,，让用户可以自己指定 <code>目录</code> (能够拿到 Vitepress 的配置路径), <ul><li>设置那些路径参与编译</li><li>那些路径不参与编译</li></ul></li><li>按钮 <ul><li>一键更新 config</li></ul></li></ul><h2 id="快速入门" tabindex="-1">快速入门 <a class="header-anchor" href="#快速入门" aria-label="Permalink to &quot;快速入门&quot;">​</a></h2><ul><li><a href="https://docs.obsidian.md/" target="_blank" rel="noreferrer">Obsidian官方文档</a></li><li><a href="https://obsidian.md/plugins?" target="_blank" rel="noreferrer">Plugins - Obsidian插件市场</a></li><li>参考插件 <a href="https://pkmer.cn/Pkmer-Docs/10-obsidian/obsidian%E7%A4%BE%E5%8C%BA%E6%8F%92%E4%BB%B6/editing-toolbar/" target="_blank" rel="noreferrer">Obsidian 插件：Editing Toolbar 必装的可视化编辑工具</a></li><li>示例库合集 <a href="https://github.com/PKM-er/Blue-topaz-example" target="_blank" rel="noreferrer">GitHub - PKM-er/Blue-topaz-example: Blue topaz themes example vault for Obsidian</a></li></ul><p>这里就不翻译官方文档中所说的东西了.... 有兴趣的话自己去看。</p><ol><li>我下载了官方示例的 <a href="https://github.com/obsidianmd/obsidian-sample-plugin" target="_blank" rel="noreferrer">GitHub - obsidianmd/obsidian-sample-plugin</a> 工程, 开始尝试做一下属于自己的插件。</li><li>参考官方文档： <a href="https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin" target="_blank" rel="noreferrer">构建你的第一个Obsidian插件</a></li><li>此时我发现，我可以直接基于 vitepress，去引入 Obsidian 的相关包来实现这个功能，当然也可能有一些其他好用的包也可以实现这个功能。</li><li>未完待续....</li></ol>`,17),p=[l];function t(o,r,d,c,b,h){return n(),s("div",null,p)}const _=a(i,[["render",t]]);export{m as __pageData,_ as default};
