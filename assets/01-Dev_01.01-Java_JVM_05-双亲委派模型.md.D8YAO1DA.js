import{_ as a,c as e,o as t,a4 as r}from"./chunks/framework.BG61BEI0.js";const u=JSON.parse('{"title":"类加载器的工作流程","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.01-Java/JVM/05-双亲委派模型.md","filePath":"01-Dev/01.01-Java/JVM/05-双亲委派模型.md"}'),o={name:"01-Dev/01.01-Java/JVM/05-双亲委派模型.md"},i=r('<h2 id="启动类加载器" tabindex="-1">启动类加载器 <a class="header-anchor" href="#启动类加载器" aria-label="Permalink to &quot;启动类加载器&quot;">​</a></h2><p>Java/lib 目录下的特定名称 jar 包, rt. Jar, java. Lang 就在这个包中</p><h2 id="拓展类加载器" tabindex="-1">拓展类加载器 <a class="header-anchor" href="#拓展类加载器" aria-label="Permalink to &quot;拓展类加载器&quot;">​</a></h2><p>Java/lib/ext 目录下的特定名称</p><h2 id="应用程序类加载器" tabindex="-1">应用程序类加载器 <a class="header-anchor" href="#应用程序类加载器" aria-label="Permalink to &quot;应用程序类加载器&quot;">​</a></h2><p>程序员自己引入的 jar 包</p><h1 id="类加载器的工作流程" tabindex="-1">类加载器的工作流程 <a class="header-anchor" href="#类加载器的工作流程" aria-label="Permalink to &quot;类加载器的工作流程&quot;">​</a></h1><ol><li>首先加载时, 当前加载器判断是否已经加载过了, 如果没有加载过, 交由父类处理, 父类继续这个流程, 当父类判断无法加载时, 交由子类去加载. 依次递归</li><li>目的是为了保证一个类只会被加载一次, 都是先让启动类先加载. 这样可以规避程序底层依赖被篡改</li></ol>',8),_=[i];function l(n,s,c,h,d,p){return t(),e("div",null,_)}const f=a(o,[["render",l]]);export{u as __pageData,f as default};
