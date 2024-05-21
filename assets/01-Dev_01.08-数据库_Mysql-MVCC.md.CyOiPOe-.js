import{_ as e,c as o,o as d,a4 as t}from"./chunks/framework.BG61BEI0.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"01-Dev/01.08-数据库/Mysql-MVCC.md","filePath":"01-Dev/01.08-数据库/Mysql-MVCC.md"}'),c={name:"01-Dev/01.08-数据库/Mysql-MVCC.md"},_=t("<p>对于使用 <code>InnoDB</code> 存储引擎的表来说，它的聚簇索引记录中都包含两个必要的隐藏列（<code>row_id</code> 并不是必要的，我们创建的表中有主键或者非NULL的UNIQUE键时都不会包含 <code>row_id</code> 列）:</p><ul><li>Trx_id : 事务 Id, 每次一个事务对某条聚簇索引记录进行改动时，都会把该事务的<code>事务id</code>赋值给<code>trx_id</code>隐藏列。</li><li>roll_pointer: 版本链路指针, 修改之后, 会把旧版本的数据写到 <code>undolog</code> 中 ,这里记录的可以理解成是 <code>undolog</code> 的数据指针</li><li></li></ul>",2),i=[_];function l(r,s,a,n,p,C){return d(),o("div",null,i)}const f=e(c,[["render",l]]);export{u as __pageData,f as default};
