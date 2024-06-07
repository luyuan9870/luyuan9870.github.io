import{_ as a,E as t,c as e,J as l,w as n,a4 as s,o as h,a as p}from"./chunks/framework.BG61BEI0.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.08-数据库/00-《MySQL是怎么运行的》/01-《装作自己是个小白》-初识MySQL.md","filePath":"01-Dev/01.08-数据库/00-《MySQL是怎么运行的》/01-《装作自己是个小白》-初识MySQL.md"}'),d={name:"01-Dev/01.08-数据库/00-《MySQL是怎么运行的》/01-《装作自己是个小白》-初识MySQL.md"},k=s(`<h2 id="mysql-的架构" tabindex="-1">MySQL 的架构 <a class="header-anchor" href="#mysql-的架构" aria-label="Permalink to &quot;MySQL 的架构&quot;">​</a></h2><p>Mysql 由客户端/ 服务端两部分组成是经典的 CS 架构. 例如微信, 手机上安装的就是客户端, 腾讯机房里的微信服务器就是服务端, 客户端可以有很多形式, 例如 APP, windos 桌面应用, PC 网页版本等 Mysql 的服务端负责进行服务的具体处理、存储、刷盘、事务等操作 客户端负责发送 <code>程序员</code> 编写的 SQL 语句给服务端做处理、响应、维护具体的数据</p><h2 id="mysql-的安装" tabindex="-1">Mysql 的安装 <a class="header-anchor" href="#mysql-的安装" aria-label="Permalink to &quot;Mysql 的安装&quot;">​</a></h2><p>无论以何种方式进行安装 Mysql，它的服务端和客户端都会安装到机器上。 <strong>一定要记得 Mysql 的安装地址在哪</strong></p><h2 id="mysql-文件的目录介绍" tabindex="-1">Mysql 文件的目录介绍 <a class="header-anchor" href="#mysql-文件的目录介绍" aria-label="Permalink to &quot;Mysql 文件的目录介绍&quot;">​</a></h2><p>Bin: Mysql 服务的可执行文件</p><h2 id="mysql-服务如何启动" tabindex="-1">Mysql 服务如何启动 <a class="header-anchor" href="#mysql-服务如何启动" aria-label="Permalink to &quot;Mysql 服务如何启动&quot;">​</a></h2><p>Mysql\\Mysqld 启动脚本</p><p>Mysql_safe: mysql 的启动脚本, 间接的调用 mysqld, 并且还会启动一个监控进程, 这个监控进程能在服务进程挂了的时候及时重启, 另外 mysqld_safe 在启动时会吧 mysqld 的运行日志相关错误输出到一个文件当中, 方便我们排查问题.</p><hr><h2 id="windos-将-mysql注册成系统服务" tabindex="-1">Windos 将 Mysql注册成系统服务 <a class="header-anchor" href="#windos-将-mysql注册成系统服务" aria-label="Permalink to &quot;Windos 将 Mysql注册成系统服务&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;完整的可执行文件路径&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --install</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [-manual] [服务名]</span></span></code></pre></div><ul><li>-manual 可以省略, 意思是在 windos 启动的时候, 不自动启动该服务, 省略的话就会自动启动该服务.</li><li>服务名也可以省略, 一般不建议省略服务名</li><li>--install 代表注册成系统服务</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">net</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Mysql</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  //</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 启动mysql</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">net</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stop</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Mysql</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> //</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 停止mysql</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">net</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Mysql</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> //</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 重启mysql</span></span></code></pre></div><h2 id="客户端与服务端通信的过程" tabindex="-1">客户端与服务端通信的过程 <a class="header-anchor" href="#客户端与服务端通信的过程" aria-label="Permalink to &quot;客户端与服务端通信的过程&quot;">​</a></h2><p>客户端进程可能和服务端进程不在一个服务器上, 在同一台主机中本质上是进程之间的相互通信,</p><h3 id="tcp-ip" tabindex="-1">TCP/IP <a class="header-anchor" href="#tcp-ip" aria-label="Permalink to &quot;TCP/IP&quot;">​</a></h3><blockquote><p>我们项目中客户端在 Java 包里, 部署的服务器和 Mysql 的服务端可能不在同一个服务器, 这时 Mysql 采用 TCP/IP 的链接. Mysql 启动的时候会默认申请 3306 端口. 客户端就可以通过 IP+Port 的方式进行链接服务端通信</p></blockquote><p>如果 Mysql 默认的端口 <code>3306</code> 被占用了, 那么在启动的时候可以通过参数来指定 Mysql 的端口 <code>mysqld -P3307</code> <strong>Mysql 的命令很多后面都不需要敲空格</strong> , 大写的 P 是指定端口, 小写的 p 是指定密码 case:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -hlocalhost</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -uroot</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Enter</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Password:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> root</span></span></code></pre></div><h3 id="命名管道-共享内存" tabindex="-1">命名管道/共享内存 <a class="header-anchor" href="#命名管道-共享内存" aria-label="Permalink to &quot;命名管道/共享内存&quot;">​</a></h3><p>共享内存的方式需要客户端和服务端在同一台机器上.</p><h3 id="unix-域套接字方式" tabindex="-1">Unix 域套接字方式 <a class="header-anchor" href="#unix-域套接字方式" aria-label="Permalink to &quot;Unix 域套接字方式&quot;">​</a></h3><p>略</p><h2 id="服务端是如何处理客户端的请求" tabindex="-1">服务端是如何处理客户端的请求? <a class="header-anchor" href="#服务端是如何处理客户端的请求" aria-label="Permalink to &quot;服务端是如何处理客户端的请求?&quot;">​</a></h2><blockquote><p>无论 Mysql 是以进程之间的通信, 还是 TCP/IP 的方式, 本质上都是客户端向服务器发送一段文本 (SQL 语句), 服务端接收到之后进行处理并返回结果给客户端.</p></blockquote><p>那么服务器是怎么处理客户端发送过来的请求, 又是怎么返回给客户端想要的结果数据的?</p><p>Mysql 模型流程图.</p><p>从建立客户端开始, <code>链接管理</code>、<code>解析与优化</code>、<code>存储引擎</code> 三部分</p><h3 id="链接管理" tabindex="-1">链接管理 <a class="header-anchor" href="#链接管理" aria-label="Permalink to &quot;链接管理&quot;">​</a></h3><p>Mysql 的通信方式: <code>TCP/IP</code>、<code>unix套接字</code>、<code>命名管道与共享内存</code> 的方式之一来进行与服务端通信. 此时服务端接收到有客户端进行链接, 会创建出一个线程来针对当前客户端进行服务, 当客户端断开连接时, 服务端也不会立刻销毁这个线程, 而是把这个线程缓存起来, 等到下一个客户端连接时进行服务. <strong>(线程池的概念).</strong> Mysql 会为每一个客户端创建一个线程, 当过多的客户端连接时会触发多个线程来进行操作, 但是线程分配的太多了会严重影响系统性能. 要规避掉这个问题就需要限制一下 Mysql 的最大连接数 (客户端) 当链接已经建立起来的时候, 服务端就会等待客户端的请求 (得到的是一个 SQL 文本, 还需要经过一系列的处理)</p><h3 id="解析与优化" tabindex="-1">解析与优化 <a class="header-anchor" href="#解析与优化" aria-label="Permalink to &quot;解析与优化&quot;">​</a></h3><blockquote><p>当服务端得到了客户端发送过来的 <code>一段文本(SQL)</code> 它是如何运行的?, 其中比较重要的几个部分分别是 <code>语法解析</code> 、<code>查询缓存</code> 、<code>查询优化</code></p></blockquote><p><strong>查询缓存</strong> 当一条 sql 语句中有任何一丝一毫的不一致，都不会命中缓存，例如空格注释大小写等，<strong>缓存会跨不同的客户端进行缓存。</strong> 不过既然是缓存，那就有它缓存失效的时候。MySQL 的缓存系统会监测涉及到的每张表，只要该表的结构或者数据被修改，如对该表使用了 <code>INSERT</code>、 <code>UPDATE</code>、<code>DELETE</code>、<code>TRUNCATE TABLE</code>、<code>ALTER TABLE</code>、<code>DROP TABLE</code> 或 <code>DROP DATABASE</code> 语句，那使用该表的所有高速缓存查询都将变为无效并从高速缓存中删除！</p>`,34),o=s(`<p>背景原因是因为, 查询缓存虽然会提升系统性能, 但是单独维护缓存会导致额外的性能开销 <strong>语法解析</strong> 客户端发送过来的一段文本, 需要遵循 Mysql 的规则, Mysql 的语法. 判断当前这段 SQL 语句是否合法, 然后将 SQL 中需要查询的表、用到的 where 条件等提取出来放到 Mysql 内部使用的数据结构中. 这个过程中会涉及到编译解析、语法解析、词法解析、语义分析等。 (可以理解成将 Json 字符串序列化到 Java 对象中) <strong>查询优化</strong> 通过语法解析之后, 就得到了需要查询的表, 字段, where 条件等信息, 此时如果直接拿着我们写好的 SQL 去执行, Mysql 执行起来的效率可能是不高的. MySQL 自身有查询优化的程序来帮助程序员提升对 Mysql 数据查询的效率, 例如将外连接优化成内连接, 表达式简化, 子查询转换成链接等操作. 优化结果就是生成一个执行计划, 这个计划表明了应该用哪些索引去查询, 表之间的链接顺序是什么样的, 关键字 <code>Expanin</code> 这个步骤其实也叫做 SQL 改写, 是由 Mysql 服务端内部自行处理的. 当然通过 <code>ExpanIn</code> 关键字也可以查询自己的 sql 看看有没有什么优化空间</p><h3 id="存储引擎" tabindex="-1">存储引擎 <a class="header-anchor" href="#存储引擎" aria-label="Permalink to &quot;存储引擎&quot;">​</a></h3><p>截止到存储引擎时，还没有真正的去访问数据库表，在数据库的维度上我们的数据是一行一行的，但是实际上数据库还是需要把数据落到物理磁盘上，如何把数据写入读出。这些是存储引擎去做的事情，实际上存储引擎就是表处理器，针对每一个表可能有不同的存储引擎。经典代表就是 <strong><code>InnoDB</code></strong> 和 <strong><code>MyISAM</code></strong> 也就是不同的存储引擎类型之间存储的数据文件类型和数据结构也有所不同 核心就功能就是承上启下, 接受上层发送过来的 SQL 命令, 解析执行然后对表中的数据进行指令相关的操作</p><p>为了管理方便 , 人们把 <code>链接</code> 、 <code>查询缓存</code>、 <code>语法解析</code>、 <code>查询优化</code> 这些不涉及真实数据存储的功能那个归属于 <code>Mysql Server</code> 的功能，把真实存储数据的功能归属与存储引擎的功能，各种不同的存储引擎向上提供统一的 API，<code>（理解成 CRUD 的不同类型的实现方式）</code> 所以在 MysqlServer 完成查询优化之后，调用存储引擎提供的 API 向客户端返回数据即可。</p><h4 id="常见存储引擎" tabindex="-1">常见存储引擎 <a class="header-anchor" href="#常见存储引擎" aria-label="Permalink to &quot;常见存储引擎&quot;">​</a></h4><ul><li>InnoDB 支持外和事务 , 默认的存储引擎, 一般大家使用的都是 InnoDB</li><li>MyISAM 不支持外键和实物</li><li>MEMORY 表是基于内存的, 也不常用 选择建议: 需要更新和删除的操作, 优先选择 Innodb, 反之选择 MyISAM</li></ul><table><thead><tr><th>引擎名称</th><th>事务, 外键</th><th></th><th>表行锁</th><th>存储特点</th><th>应用场景</th></tr></thead><tbody><tr><td>InnoDB</td><td>支持</td><td>支持事务的提交和回滚, 为了最大数据量的最大效率</td><td>行锁</td><td>索引及数据合在一起存在 ibd 文件当中的</td><td>增删改查都比较频繁, 可靠性要求较高, 要求支持事务</td></tr><tr><td>MyISAM</td><td>不支持</td><td>处理数据量比较小的表, 效率会高</td><td>表锁</td><td>索引及数据是分别存储在不同的文件中的</td><td>查询频繁, count 频繁 (内置常量 count o 1 级别), 删改的频率较低, 做数据归档, 或者基础数据不怎么发生改变的数据, 没有事务要求</td></tr><tr><td>MEMORY</td><td>不支持</td><td></td><td></td><td></td><td></td></tr></tbody></table><p>查看当前服务应用程序, 支持那些存储引擎</p><p>Mysql&gt; show engines; +--------------------+---------+----------------------------------------------------------------+--------------+------+------------+ | Engine | Support | Comment | Transactions | XA | Savepoints | +--------------------+---------+----------------------------------------------------------------+--------------+------+------------+ | FEDERATED | NO | Federated MySQL storage engine | NULL | NULL | NULL | | MEMORY | YES | Hash based, stored in memory, useful for temporary tables | NO | NO | NO | | InnoDB | DEFAULT | Supports transactions, row-level locking, and foreign keys | YES | YES | YES | | PERFORMANCE_SCHEMA | YES | Performance Schema | NO | NO | NO | | MyISAM | YES | MyISAM storage engine | NO | NO | NO | | MRG_MYISAM | YES | Collection of identical MyISAM tables | NO | NO | NO | | BLACKHOLE | YES | /dev/null storage engine (anything you write to it disappears) | NO | NO | NO | | CSV | YES | CSV storage engine | NO | NO | NO | | ARCHIVE | YES | Archive storage engine | NO | NO | NO | +--------------------+---------+----------------------------------------------------------------+--------------+------+------------+ 9 rows in set (0.03 sec)</p><p><code>Engine</code> 是引擎名称. <code>Support</code> : 此引擎是否可用, 其中 default 是当前程序的默认存储引擎 . <code>Comment</code> : 注释备注. <code>Transactions</code> : 是否支持事务 <code>XA</code> : 是否支持分布式事务 <code>Savepoints</code> : 是否支持事务回滚</p><h4 id="为表设置存储引擎" tabindex="-1">为表设置存储引擎 <a class="header-anchor" href="#为表设置存储引擎" aria-label="Permalink to &quot;为表设置存储引擎&quot;">​</a></h4><p>当创建表时, sql 上没有指定存储引擎, Mysql 服务端会取当前默认的存储引擎 <code>InnoDB</code> 作为此表的存储引擎</p><ol><li>创建时指定存储引擎</li></ol><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">create</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> table</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 表名</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	-- 建表语句</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) engine </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 引擎名称 ;</span></span></code></pre></div><ol><li>修改表的存储引擎</li></ol><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">alter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> table</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 表名 engine </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 引擎名;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mysql</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ALTER</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> td ENGINE </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> InnoDB;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Query OK, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> rows</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> affected (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">60</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sec)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Records: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Duplicates: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Warnings: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mysql</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><h2 id="查看数据存储位置" tabindex="-1">查看数据存储位置 <a class="header-anchor" href="#查看数据存储位置" aria-label="Permalink to &quot;查看数据存储位置&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mysql</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> show variables </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">like</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;datadir&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">---------------+-----------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">| Variable_name | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">           |</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">---------------+-----------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">| datadir       | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">var</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">lib</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mysql</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> |</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">---------------+-----------------+</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> row</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> in</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">07</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sec)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mysql</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><p>问题</p><ul><li>业务场景中, 活动, 开始-结束时间设置为唯一索引, 是否合理? <ul><li>没有绝对的合理不合理, 需要看具体的业务场景, 是否允许多场活动? 或者说活动的维度是独立站还是商品? , 问题不严谨有 bug</li></ul></li></ul><hr><p><a href="https://relph1119.github.io/mysql-learning-notes/#/mysql/01-%E8%A3%85%E4%BD%9C%E8%87%AA%E5%B7%B1%E6%98%AF%E4%B8%AA%E5%B0%8F%E7%99%BD-%E9%87%8D%E6%96%B0%E8%AE%A4%E8%AF%86MySQL" target="_blank" rel="noreferrer">第1章 装作自己是个小白-重新认识MySQL</a></p>`,22);function r(c,y,E,g,F,q){const i=t("font");return h(),e("div",null,[k,l(i,{color:"red"},{default:n(()=>[p("从 MySQL 5.7.20 开始，不推荐使用查询缓存，并在 MySQL 8.0 中删除")]),_:1}),o])}const M=a(d,[["render",r]]);export{C as __pageData,M as default};
