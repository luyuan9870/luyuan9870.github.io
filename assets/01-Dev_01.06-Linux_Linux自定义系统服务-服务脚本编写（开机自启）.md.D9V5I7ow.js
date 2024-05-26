import{_ as t,c as r,o as s,a4 as o}from"./chunks/framework.rIDq68an.js";const m=JSON.parse('{"title":"一、编写Oracle数据库启动/重启/关闭的脚本","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.06-Linux/Linux自定义系统服务-服务脚本编写（开机自启）.md","filePath":"01-Dev/01.06-Linux/Linux自定义系统服务-服务脚本编写（开机自启）.md"}'),e={name:"01-Dev/01.06-Linux/Linux自定义系统服务-服务脚本编写（开机自启）.md"},n=o(`<p><a href="http://www.freecplus.net/7379bf0c1f8849d0b415247d1aeece53.html" target="_blank" rel="noreferrer">CentOS7添加自定义系统服务</a></p><p>执行命令报错</p><p>startup.sh: line 1: $&#39;\\r&#39;: command not found</p><p>// 是说windos与linux的换行符不兼容问题，重新设置一下换行符编译</p><ol><li>:set ff=unix</li><li>：wq</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#!/bin/sh</span></span>
<span class="line"><span>FILE_NAME=/usr/local/back/demo/java-name.txt</span></span>
<span class="line"><span>for i in \`cat $FILE_NAME\`;</span></span>
<span class="line"><span>do</span></span>
<span class="line"><span>  # 循环获取 java-name.txt 文件下的所有文件名称</span></span>
<span class="line"><span>  echo $i</span></span>
<span class="line"><span>done</span></span></code></pre></div><p><a href="http://www.freecplus.net/7379bf0c1f8849d0b415247d1aeece53.html" target="_blank" rel="noreferrer">CentOS7添加自定义系统服务</a></p><p><strong>CentOS 6****版本的系统服务是/etc/init.d启动脚本的方式，CentOS 7采用强大的systemctl来管理系统服务，大幅提高了系统服务的运行效率，但是服务的配置和以前版本完全不同，这是很大的进步，systemctl太简单易用了。</strong></p><p><strong>CentOS7****添加自定义系统服务的步骤如下：</strong></p><p><strong>1</strong>**）编写自定义的系统服务脚本文件；**</p><p><strong>2</strong>**）用systemctl命令把自定义的系统服务设置为开机/关机自启动/停止。**</p><p><strong>本文以Oracle数据库为例子来介绍添加自定义系统服务的知识。假设ORACLE_HOME环境变量的值是/oracle/home，各位根据自己的实际情况调整脚本的内容，把文中/oracle/home替换成您ORACLE_HOME的值。</strong></p><h1 id="一、编写oracle数据库启动-重启-关闭的脚本" tabindex="-1">一、编写Oracle数据库启动/重启/关闭的脚本 <a class="header-anchor" href="#一、编写oracle数据库启动-重启-关闭的脚本" aria-label="Permalink to &quot;一、编写Oracle数据库启动/重启/关闭的脚本&quot;">​</a></h1><h2 id="_1、启动oracle数据库的shell脚本" tabindex="-1">1、启动Oracle数据库的shell脚本 <a class="header-anchor" href="#_1、启动oracle数据库的shell脚本" aria-label="Permalink to &quot;1、启动Oracle数据库的shell脚本&quot;">​</a></h2><p><strong>启动Oracle数据库的脚本为/oracle/home/bin/dbstart，内容如下：</strong></p><p>sqlplus / as sysdba &lt;&lt;EOF startup; EOF</p><p><strong>修改脚本的权限为可执行。</strong></p><p><strong>chmod +x /oracle/home/bin/dbstart</strong></p><h2 id="_2、重启oracle数据库的shell脚本" tabindex="-1">2、重启Oracle数据库的shell脚本 <a class="header-anchor" href="#_2、重启oracle数据库的shell脚本" aria-label="Permalink to &quot;2、重启Oracle数据库的shell脚本&quot;">​</a></h2><p><strong>启动Oracle数据库的脚本为/oracle/home/bin/dbrestart，内容如下：</strong></p><p>sqlplus / as sysdba &lt;&lt;EOF shutdown immediate; startup; EOF</p><p><strong>修改脚本的权限为可执行。</strong></p><p><strong>chmod +x /oracle/home/bin/dbrestart</strong></p><h2 id="_3、关闭oracle数据库的shell脚本" tabindex="-1">3、关闭Oracle数据库的shell脚本 <a class="header-anchor" href="#_3、关闭oracle数据库的shell脚本" aria-label="Permalink to &quot;3、关闭Oracle数据库的shell脚本&quot;">​</a></h2><p><strong>启动Oracle数据库的脚本为/oracle/home/bin/dbshut，内容如下：</strong></p><p>sqlplus / as sysdba &lt;&lt;EOF shutdown immediate; EOF</p><p><strong>修改脚本的权限为可执行。</strong></p><p><strong>chmod +x /oracle/home/bin/dbshut</strong></p><h1 id="二、编写自定义服务的配置文件" tabindex="-1">二、编写自定义服务的配置文件 <a class="header-anchor" href="#二、编写自定义服务的配置文件" aria-label="Permalink to &quot;二、编写自定义服务的配置文件&quot;">​</a></h1><p><strong>系统服务的启动/重启/停止由它的配置文件决定，本文把Oracle数据库的系统服务命名为oracle.service。</strong></p><p><strong>创建服务配置文件/usr/lib/systemd/system/oracle.service，内容如下：</strong></p><p>[Unit] Description=Oracle RDBMS After=network.target   [Service] Type=simple ExecStart=/usr/bin/su - oracle -c &quot;/oracle/home/bin/dbstart &gt;&gt; /tmp/oracle.log&quot; ExecReload=/usr/bin/su - oracle -c &quot;/oracle/home/bin/dbrestart &gt;&gt; /tmp/oracle.log&quot; ExecStop=/usr/bin/su - oracle -c &quot;/oracle/home/bin/dbshut &gt;&gt; /tmp/oracle.log&quot; RemainAfterExit=yes   [Install] WantedBy=multi-user.target</p><p><strong>接下来介绍服务配置文件各部分的含义。</strong></p><h2 id="_1、unit部分" tabindex="-1">1、Unit部分 <a class="header-anchor" href="#_1、unit部分" aria-label="Permalink to &quot;1、Unit部分&quot;">​</a></h2><p><strong>Unit****部分是启动顺序与依赖关系。</strong></p><p>[Unit] Description=Oracle RDBMS After=network.target</p><p><strong>Description****字段：给出当前服务的简单描述。</strong></p><p><strong>Documentation****字段：给出文档位置。</strong></p><p><strong>After****字段：表示本服务应该在某服务之后启动。</strong></p><p><strong>Before****字段：表示本服务应该在某服务之前启动。</strong></p><p><strong>After<strong><strong>和</strong></strong>Before<strong><strong>字段只涉及启动顺序，不涉及依赖关系。设置依赖关系，需要使用</strong></strong>Wants<strong><strong>字段和</strong></strong>Requires****字段。</strong></p><p><strong>Wants****字段：表示本服务与某服务之间存在“依赖”系，如果被依赖的服务启动失败或停止运行，不影响本服务的继续运行。</strong></p><p><strong>Requires****字段，表示本服务与某服务之间存在“强依赖”系，如果被依赖的服务启动失败或停止运行，本服务也必须退出。</strong></p><h2 id="_2、service部分" tabindex="-1">2、Service部分 <a class="header-anchor" href="#_2、service部分" aria-label="Permalink to &quot;2、Service部分&quot;">​</a></h2><p><strong>Service****部分定义如何启动/重启/停止服务。</strong></p><p>[Service] Type=simple ExecStart=/usr/bin/su - oracle -c &quot;/oracle/home/bin/dbstart &gt;&gt; /tmp/oracle.log&quot; ExecReload=/usr/bin/su - oracle -c &quot;/oracle/home/bin/dbrestart &gt;&gt; /tmp/oracle.log&quot; ExecStop=/usr/bin/su - oracle -c &quot;/oracle/home/bin/dbshut &gt;&gt; /tmp/oracle.log&quot; RemainAfterExit=yes</p><p><strong>1</strong>**）启动类型（Type字段）**</p><p><strong>Type****字段定义启动类型。它可以设置的值如下。</strong></p><p><strong>simple</strong>**（默认值）：ExecStart字段启动的进程为主进程。**</p><p><strong>forking</strong>**：ExecStart字段将以fork()方式启动，此时父进程将会退出，子进程将成为主进程。**</p><p><strong>oneshot</strong>**：类似于simple，但只执行一次，Systemd会等它执行完，才启动其他服务。**</p><p><strong>dbus</strong>**：类似于simple，但会等待D-Bus信号后启动。**</p><p><strong>notify</strong>**：类似于simple，启动结束后会发出通知信号，然后Systemd再启动其他服务。**</p><p><strong>idle</strong>**：类似于simple，但是要等到其他任务都执行完，才会启动该服务。**</p><p><strong>2</strong>**）启动服务（<strong><strong>ExecStart</strong></strong>字段）**</p><p><strong>启动服务时执行的命令，可以是可执行程序、系统命令或shell脚本。</strong></p><p><strong>3</strong>**）重启服务（<strong><strong>ExecReload</strong></strong>字段）**</p><p><strong>重启服务时执行的命令，可以是可执行程序、系统命令或shell脚本。</strong></p><p><strong>4</strong>**）停止服务（<strong><strong>ExecStop</strong></strong>字段）**</p><p><strong>停止服务时执行的命令，可以是可执行程序、系统命令或shell脚本。</strong></p><p><strong>5</strong>**）如果<strong><strong>RemainAfterExit</strong></strong>字段设为yes，表示进程退出以后，服务仍然保持执行。**</p><p><strong>6</strong>**）服务配置文件还可以读取环境变量参数文件，我个人认为比较麻烦，没有必要，就不介绍了，设置程序的环境变量有很多种方法，可以在脚本中配置，也可以用“su –”的方法。**</p><h2 id="_3、install部分" tabindex="-1">3、Install部分 <a class="header-anchor" href="#_3、install部分" aria-label="Permalink to &quot;3、Install部分&quot;">​</a></h2><p><strong>Install****部分定义如何安装这个配置文件，即怎样做到开机启动。</strong></p><p>[Install] WantedBy=multi-user.target</p><p><strong>WantedBy****字段：表示该服务所在的Target。</strong></p><p><strong>Target****的含义是服务组，表示一组服务。WantedBy=multi-user.target指的是，oracle所在的Target是multi-user.target（多用户模式）。</strong></p><p><strong>这个设置非常重要，因为执行systemctl enable oracle.service命令时，oracle.service会被链接到/etc/systemd/system/multi-user.target.wants目录之中，实现开机启动的功能。</strong></p><h2 id="_4、重启行为" tabindex="-1">4、重启行为 <a class="header-anchor" href="#_4、重启行为" aria-label="Permalink to &quot;4、重启行为&quot;">​</a></h2><p><strong>Service****部分还有一些字段，定义了重启行为。</strong></p><p><strong>1</strong>**）<strong><strong>KillMode</strong></strong>字段**</p><p><strong>KillMode****字段定义Systemd如何停止sshd服务，可以设置的值如下：</strong></p><p><strong>control-group</strong>**（默认值）：当前控制组里面的所有子进程，都会被杀掉。**</p><p><strong>process</strong>**：只杀主进程。**</p><p><strong>mixed</strong>**：主进程将收到SIGTERM信号，子进程收到SIGKILL信号。**</p><p><strong>none</strong>**：没有进程会被杀掉，只是执行服务的stop命令。**</p><p><strong>2</strong>**）<strong><strong>Restart</strong></strong>字段**</p><p><strong>Restart****字段定义了服务程序退出后，Systemd的重启方式，可以设置的值如下：</strong></p><p><strong>no</strong>**（默认值）：退出后不会重启。**</p><p><strong>on-success</strong>**：只有正常退出时（退出状态码为0），才会重启。**</p><p><strong>on-failure</strong>**：非正常退出时（退出状态码非0），包括被信号终止和超时，才会重启。**</p><p><strong>on-abnormal</strong>**：只有被信号终止和超时，才会重启。**</p><p><strong>on-abort</strong>**：只有在收到没有捕捉到的信号终止时，才会重启。**</p><p><strong>on-watchdog</strong>**：超时退出，才会重启。**</p><p><strong>always</strong>**：不管是什么退出原因，总是重启。**</p><p><strong>3</strong>**）<strong><strong>RestartSec</strong></strong>字段。**</p><p><strong>RestartSec****字段：表示Systemd重启服务之前，需要等待的秒数。</strong></p><h1 id="三、使用自定义的服务" tabindex="-1">三、使用自定义的服务 <a class="header-anchor" href="#三、使用自定义的服务" aria-label="Permalink to &quot;三、使用自定义的服务&quot;">​</a></h1><h2 id="_1、重新加载服务配置文件" tabindex="-1">1、重新加载服务配置文件 <a class="header-anchor" href="#_1、重新加载服务配置文件" aria-label="Permalink to &quot;1、重新加载服务配置文件&quot;">​</a></h2><p><strong>每次修改了服务配置文件后，需要执行以下命令重新加载服务的配置文件。</strong></p><p><strong>systemctl daemon-reload</strong></p><h2 id="_2、启动-停止-启重oracle服务" tabindex="-1">2、启动/停止/启重oracle服务 <a class="header-anchor" href="#_2、启动-停止-启重oracle服务" aria-label="Permalink to &quot;2、启动/停止/启重oracle服务&quot;">​</a></h2><p><strong>systemctl start oracle #</strong> <strong>启动oracle服务。</strong></p><p><strong>systemctl restart oracle #</strong> <strong>重启oracle服务。</strong></p><p><strong>systemctl stop oracle #</strong> <strong>关闭oracle服务。</strong></p><h2 id="_3、把oracle服务设置为开机-关机自启动-停止" tabindex="-1">3、把oracle服务设置为开机/关机自启动/停止 <a class="header-anchor" href="#_3、把oracle服务设置为开机-关机自启动-停止" aria-label="Permalink to &quot;3、把oracle服务设置为开机/关机自启动/停止&quot;">​</a></h2><p><strong>systemctl is-enabled oracle #</strong> <strong>查看oracle服务是否是开机自启动。</strong></p><p><strong>systemctl enable oracle #</strong> <strong>把oracle服务设置为开机自启动。</strong></p><h2 id="_4、查看oracle实例启动-停止的日志" tabindex="-1">4、查看Oracle实例启动/停止的日志 <a class="header-anchor" href="#_4、查看oracle实例启动-停止的日志" aria-label="Permalink to &quot;4、查看Oracle实例启动/停止的日志&quot;">​</a></h2><p><strong>Oracle****实例启动的日志在/tmp/oracle.log文件中。</strong></p><p><strong>注意，只有通过systemctl启动/关闭Oracle实例和监听才会写日志，手工执行脚本不写日志。</strong></p>`,101),a=[n];function l(p,g,c,i,h,d){return s(),r("div",null,a)}const b=t(e,[["render",l]]);export{m as __pageData,b as default};
