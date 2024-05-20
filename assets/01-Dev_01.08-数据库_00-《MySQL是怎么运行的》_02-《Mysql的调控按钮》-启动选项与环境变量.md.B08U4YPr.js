import{_ as s,c as t,o as a,a4 as i}from"./chunks/framework.BG61BEI0.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.08-数据库/00-《MySQL是怎么运行的》/02-《Mysql的调控按钮》-启动选项与环境变量.md","filePath":"01-Dev/01.08-数据库/00-《MySQL是怎么运行的》/02-《Mysql的调控按钮》-启动选项与环境变量.md","lastUpdated":1712823825000}'),e={name:"01-Dev/01.08-数据库/00-《MySQL是怎么运行的》/02-《Mysql的调控按钮》-启动选项与环境变量.md"},d=i(`<p>我们很多电子设备上都一定会有的一个东西 -- <code>设置</code>, 假设说没有设置, 那么手机无法静音, 无法设置音量大小, 无法设置密码等这些操作. 同理, <code>Mysql</code> 也会有一个设置, 来操作是否允许外域链接, 最大连接数, 数据缓存, 字符集编码, 存储引擎等等. 这些就是 <code>Mysql</code> 的启动选项 Java 程序员一定知道, 环境变量的作用, 这里不做赘述 一般这些设置项都会有默认值, 手机的默认来电铃声, 苹果那惊魂般的闹钟铃声. <code>mysql</code> 大部分设置也都有默认值, 例如最大客户端同时连接数量默认 <code>151</code> , 表的默认存储引擎 <code>InnoDB</code> ,我们可以在程序启动的时候修改这些默认值, 对于这些可以在启动时修改的值称之为启动选项, 这些启动选项控制着 Mysql 启动后的行为</p><h2 id="在命令行中使用的选项" tabindex="-1">在命令行中使用的选项 <a class="header-anchor" href="#在命令行中使用的选项" aria-label="Permalink to &quot;在命令行中使用的选项&quot;">​</a></h2><p>举个栗子</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -hlocalhost</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -uroot</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Enter</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Password:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> root</span></span></code></pre></div><p>这里的 <code>-h</code> 、<code>-u</code> 、 <code>-p</code> 都是启动选项的命令 Mysql 本身又有短形式和长形式，短形式的目的是为了简化长形式, Mysql 的部分命令是区分大小写的例如 <code>-p</code> 和 <code>-P</code> 一个是指定密码 <code>password</code>, 一个是指定端口 <code>Port</code></p><table><thead><tr><th>短形式</th><th>长形式</th><th>含义</th></tr></thead><tbody><tr><td>-h</td><td>-host</td><td>主机 IP</td></tr><tr><td>-u</td><td>-user</td><td>用户名称</td></tr><tr><td>-P</td><td>-port</td><td>端口号</td></tr><tr><td>-p</td><td>-password</td><td>密码</td></tr><tr><td></td><td></td><td></td></tr></tbody></table><h2 id="配置文件中的使用选项" tabindex="-1">配置文件中的使用选项 <a class="header-anchor" href="#配置文件中的使用选项" aria-label="Permalink to &quot;配置文件中的使用选项&quot;">​</a></h2><p>在启动 mysqld 程序的时候通过命令行的方式只是针对这一次启动生效, 及下一次不写命令启动那么相关的配置就会丢掉, 因此 mysql 提供了一种配置文件的方式来把我们需要的参数持久化到磁盘中, 让我们只需要配置一次, 当下次启动的时候 mysql 默认会找到这个配置文件并按照这个配置文件的配置来按需加载 mysql 的启动项.</p><h2 id="mysql-的配置文件路径" tabindex="-1">Mysql 的配置文件路径 <a class="header-anchor" href="#mysql-的配置文件路径" aria-label="Permalink to &quot;Mysql 的配置文件路径&quot;">​</a></h2><p>mysql 在启动的时候会找多个路径下的配置文件, 这些路径都是固定的, 有的是可以在命令行直接执行的, 由于操作系统不同, 在各个系统之间还会存在差异. Windos 操作系统的配置文件</p><blockquote><p>在 windos 操作系统中, mysql 会按照以下列表来进行寻找配置文件并加载 /mysql/config/my. Conf <code>%WINDIR%\\my.ini</code>， <code>%WINDIR%\\my.cnf</code> |</p></blockquote><p>如果一个启动选项既出现在配置文件中又出现在命令行中, 那么 msyql 启动的时候会以命令行中的配置覆盖配置文件中的配置. 举个例子</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">defualt_storage_engine</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Innodb</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 配置文件中的配置</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql.server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> starter</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> defualt_storage_engine</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> MyISAM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 启动命令</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">那么我们得到的默认存储引擎就是MyISAM</span></span></code></pre></div>`,13),l=[d];function n(h,p,o,r,c,k){return a(),t("div",null,l)}const _=s(e,[["render",n]]);export{F as __pageData,_ as default};
