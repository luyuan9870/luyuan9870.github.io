import{_ as o,c as e,o as d,a4 as c}from"./chunks/framework.rIDq68an.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.08-数据库/00-《MySQL是怎么运行的》/《一条数据的多副面孔-事务的隔离级别与MVCC》.md","filePath":"01-Dev/01.08-数据库/00-《MySQL是怎么运行的》/《一条数据的多副面孔-事务的隔离级别与MVCC》.md"}'),i={name:"01-Dev/01.08-数据库/00-《MySQL是怎么运行的》/《一条数据的多副面孔-事务的隔离级别与MVCC》.md"},_=c("<p><strong>事务并发执行会遇到什么问题</strong></p><p>脏读：事务 A 读取到了<strong>事务 B 修改了但是没有提交的数据</strong>。 不可重复读： 事务 A 读取到别的事务已经提交的修改过的值，<strong>其他事务每次修改并提交，事务 A 读取的值都是最新的。</strong> 幻读： 事务 A 通过一些条件，查到的数据原本是 0 条，此时事务 B 新增了符合事务 A 查询条件的数据。事务 A 再次查询会发现和上次查询的结果不一致。</p><p><strong>SQL 标准，事务的隔离级别</strong></p><ul><li>RU(读未提交)： 最低的隔离级别，可能发生 <code>脏读</code> 、<code>不可重复读</code>、<code>幻读</code> 的问题</li><li>RC(读已提交)： 可能会发生 <code>不可重复读</code>、<code>幻读</code> 的问题</li><li>RR(可重复度)： 可能会发生 <code>幻读</code> 的问题。（Mysql 在 RR 的隔离级别下，是可以禁止幻读问题发生的）</li><li>SER(串行化)： 不会发生任何问题。</li></ul><p><strong>什么是 MVCC</strong></p><blockquote><p>针对<code>一条 Mysql数据</code>的 git 版本链路跟踪信息。</p></blockquote><p>针对一行数据, 在聚簇索引记录中, 新增两个必要的隐藏列 (<code>Row_ID</code> 并不是必要的，我们创建的表中有主键，或者非 null 的 Unique 键的时候，都不会包含 <code>row_id</code> 列)</p><ul><li><code>trx_id</code> : 事务 ID: 每次一个事务对某条聚簇索引记录进行变动的时候, 都会把这个事务的事务 ID 记录下来</li><li><code>roll_prointer</code>: 旧版本的指针 ID, 把旧数据写入到 <code>undolog </code> 中通过这个指针, 来找这个记录被修改之前的数据信息. (用来做事务的回滚)</li></ul><p><strong>什么是读视图 (ReadView)</strong></p><blockquote><p>针对 RC 和 RR 级别, 需要保证每次的读取都能读取到已经提交的事务修改过的记录. 人话: 事务 A 每次的读取, 都能读取到相对最新的数据. 保证了数据的版本链中, 那个版本的数据对当前事务是可见的.</p></blockquote><ul><li><p><code>m_ids</code>：表示在生成 <code>ReadView</code> 时当前系统中活跃的读写事务的事务 ID 列表</p></li><li><p><code>min_trx_id</code> ： 表示在生成 <code>ReadView</code> 时，当前系统中 <strong>活跃的</strong> 读写事务中最小的事务 ID，也就是 <code>m_ids</code> 里的最小值</p></li><li><p><code>max_trx_id</code> ： 表示在生成 <code>ReadView</code> 时，系统中应该分配给下一个事务的 ID 值.</p></li><li><p><code>creator_trx_id</code>： 表示在生成 <code>ReadView</code> 时的事务 ID</p></li><li><p>如果被访问版本的事务 ID，与当前读视图的 <code>creator_trx_id</code> 一样，则意味着当前事务在访问它自己修改过的记录，所以这个版本可以被当前事务访问</p></li><li><p>如果被访问版本的事务 ID，小于 <code>min_trx_id</code> 就说明这个读视图在这个事务执行完成后才生成，所以可见</p></li><li><p>如果被访问版本的事务 ID，大于 <code>max_trx_id</code> 就说明这个读视图在这个事务没有执行完成之前就生成了, 所以不可见</p></li><li><p>如果被访问版本的事务 ID, 在 <code>min_trx_id</code> ~ <code>max_trx_id</code> 之间, 则需要判断这个事务 ID 在不在 <code>m_ids</code> 中, 如果在, 说明这个事务还在活跃, 则不可见, 如果不在则说明可见.</p></li></ul><p>针对 RC 级别: 每一次读取数据的时候, 都会生成一个读视图 针对 RR 级别: 只有第一次读取数据的时候, 会生成一个读视图</p><p>对于使用 <code>InnoDB</code> 存储引擎的表来说，它的聚簇索引记录中都包含两个必要的隐藏列（<code>row_id</code> 并不是必要的，我们创建的表中有主键或者非 NULL 的 UNIQUE 键时都不会包含 <code>row_id</code> 列）:</p><ul><li>Trx_id : 事务 Id, 每次一个事务对某条聚簇索引记录进行改动时，都会把该事务的 <code>事务id</code> 赋值给 <code>trx_id</code> 隐藏列。</li><li>roll_pointer: 版本链路指针, 修改之后, 会把旧版本的数据写到 <code>undolog</code> 中 ,这里记录的可以理解成是 <code>undolog</code> 的数据指针</li></ul>",14),t=[_];function l(r,p,n,s,a,u){return d(),e("div",null,t)}const D=o(i,[["render",l]]);export{g as __pageData,D as default};
