
## sql 语句集合

| 命令 | 说明 |
| :- | :- |
| mysql -u root -p | 在cmd状态下链接数据库 提示输入密码 |
| mysql> show global variables like 'port' | 查看当前端口 |
| mysql> show databases | 显示全部的数据库 |
| mysql> create database database_name | 创建数据库 |
| mysql> drop database database_name | 删除数据库 |
| mysql> use database_name | 选择数据库 |
| mysql> show tables | 显示当前数据库所有的表 |
| mysql> create table tablename…… | [创建表](#create-table) |
| mysql> drop table table_name | 删除表格 |
| mysql> alter table tabl_name rename to new_table_name | 修改表的名称 |
| mysql> alter table table_name comment 'new  notes' | 修改表的注释  |
| mysql> show create table table_name | 查看所有创建表格的相关信息 [能够创建当前表格的sql语句] |
| mysql>  |   |
| mysql>  |   |
| mysql>  |   |
| mysql>  |   |
| mysql>  |   |
| mysql>  |   |
| mysql> desc table_name | 查看表结构的详细信息 |
| mysql> alter table tablename add column_name 数据类型 约束 | [向指定的表添加列](#table_add_column) |
| mysql> alter table tablename drop column_name | 删除列 |
| mysql> alter table tablename change old_col_name new_col_name 新的需要修改的约束 | 修改列 [没有修改的约束不变]|
| mysql> alter table table_name add unique(colname) | 添加唯一约束 |
| mysql> alter table table_name add index index_name(colname) | 添加索引  |
| mysql> alter table table_name add primary key (colname)| 添加唯一索引 |
| mysql> drop index index_name on tablename | 删除唯一约束 |
| mysql> alter table table_name drop index index_name | 删除索引  |
| mysql> alter table table_name drop primary key | 删除主键  |
| mysql>  |   |
| mysql>  |   |
| mysql> insert into table_name (colname,……) value (value1, ……) |  插入数据 |
| mysql>  | 更新数据  |
| mysql>  |   |
| mysql>  |   |
| mysql>  |   |

 

- 命令不区分大小写；
- `alter table table_name change` 同 `alter table table_name modify` 之间的区别
  - change 可以修改表名所以 后面的表名需要写两次不管有没有更改
  - modify 只会修改属性，所以后面的表名只需要修改一次







### 可能的约束条件
| 约束 | 说明 |
| :- | :- |
| primary key | 主键 |
| foreign key | 外键 |
| unique | 唯一约束 |
| auto_increment | 自增约束 |
| default | 默认值约束 <br/> default current_timestamp 插入值自动插入当前事件戳 <br/> default current_timestamp on update current_timestamp 插入和更新条目的时候都自动更新时间 |
| comment | 注释 |
|  |  |
|  |  |
|  |  |





---

### <a id="create-table">创建表</a>
```
create table table_name(
  col_name 数据类型 是否允许是空值 默认值 ，
  primary key(col_name) // 定义表格的主键  


)engine=innodb // 定义标的存储引擎；

```

### <a id="table_add_column">添加列</a>
```

alter table table_name add column_name 数据类型 not null default defaultValue comment '注释';

```

### 修改列
```
alter table table_name change old_colun_name new_clunom_name 数据类型 约束 ……；

```

### 添加唯一性约束

### 删除唯一性约束
 