PostpreSQL——关系数据库
============

###1、PostpreSQL简介
PostpreSQL是一个**关系数据库管理系统（RDBMS）**，是以**集合**理论为**基础**的系统。

在实现上，定义为一些二维表，表中包含数据行和具有严格数据类型的列。

关系数据库流行的原因：
- 1）庞大的特性集（触发器、存储过程、高级索引）、数据的安全性（符合ACID）；
- 2）符合大多数人的思维方式；
- 3）查询的灵活性。

PostpreSQL的优点：
- 1）拓展包括自然语言解析、多维索引、地理查询、自定义数据类型等。
- 2）具有高级的事务处理能力，支持十几种不同语言的存储过程，你在各个平台上运行。
- 3）内置支持Unicode、序列、表继承、子查询。
- 4）市场上遵循ANSI SQL标准最好的关系数据库之一。
- 5）快速可靠，可以处理TB量级的数据，并且在高知名度的生产系统上得到验证。

###2、增删改查（CRUD:create,read,update,delete）
####1）create
- 创建表

```sql
CREATE TABLE countries (
	country_code char(2) PRIMARY KEY,
	country_name text UNIQUE
);
```

- 添加表数据
```sql
INSERT INTO	countries (country_code, country_name)
VALUES ('us','United States'), ('mx','Mexico'), ('au','Australia'),
('gb','United Kingdom'), ('de','Germany'), ('ll','Loompaland');
```

####2）read

```sql
SELECT * FROM countries;
```

| country_code | country_name |
| :-------: | :--------: |
| us 　　　　　| United States | 
| mx 　　　　　| Mexico |
| au 　　　　　| Australia |
| gb 　　　　　| United Kingdom |
| de 　　　　　| Germany |
| ll 　　　　　| Loompaland |

####3）update

```sql
UPDATE countries 
SET country_name = 'Poland'
WHERE country_code = 'll';
```

| country_code | country_name |
| :-------: | :--------: |
| us 　　　　　| United States | 
| mx 　　　　　| Mexico |
| au 　　　　　| Australia |
| gb 　　　　　| United Kingdom |
| de 　　　　　| Germany |
| ll 　　　　　| Poland |

####4）delete

```sql
DELETE FROM countries 
WHERE country_code = 'll';
```

| country_code | country_name |
| :----------: | :----------: |
| us 　　　　　| United States | 
| mx 　　　　　| Mexico |
| au 　　　　　| Australia |
| gb 　　　　　| United Kingdom |
| de 　　　　　| Germany |

####5）外键约束（REFERENCES）和复合键

```sql
CREATE TABLE cities (
	name text NOT NULL,
	postal_code varchar(9) CHECK (postal_code <> ''),
	country_code char(2) REFERENCES countries,
	PRIMARY KEY (country_code, postal_code)
);
```
- 错误

```sql
INSERT INTO	cities
VALUES ('Portland','87200','cn');
```

- 正确

```sql
INSERT INTO	cities
VALUES ('Portland','97205','us');
```

| name | postal_code | country_code |
| :--: | :---------: | :----------: |
| Portland　| 97205 | us |

###3、联接查询
####1）内联接（inner join）查询
**【注】**  INNER JOIN 可简写为 JOIN

```sql
SELECT cities.*, country_name 
FROM cities INNER JOIN countries
ON cities.country_code = countries.country_code;
```

| name | postal_code | country_code | country_name |
| :--: | :---------: | :----------: | :----------: |
| Portland | 97205 | us | United States |

```sql
CREATE TABLE venues (
	venue_id SERIAL PRIMARY KEY,
	name varchar(255),
	street_address text,
	type char(7) CHECK ( type in ('public','private') ) DEFAULT 'public',
	postal_code varchar(9),
	country_code char(2),
	FOREIGN KEY (country_code, postal_code)
	REFERENCES cities (country_code, postal_code) MATCH FULL
);
```

```sql
INSERT INTO venues (name, postal_code, country_code)
VALUES ('Crystal Ballroom', '97205', 'us');
```

```sql
SELECT v.venue_id, v.name, c.name
FROM venues v INNER JOIN cities c
ON v.postal_code=c.postal_code AND v.country_code=c.country_code;
```

| venue_id | name | name |
| :--: | :---------: | :----------: |
| 1　| Crystal Ballroom | Portland |

```sql
INSERT INTO venues (name, postal_code, country_code)
VALUES ('Voodoo Donuts', '97205', 'us') RETURNING venue_id;
```

| id  |
| :-: |
| 2   |

####2）外联接（outer join）查询
外联接是合并两张表的一种方式，不论另一张表中是否存在匹配的列值，第一张表的结果总是必须返回。

```sql
CREATE TABLE events (
	event_id SERIAL PRIMARY KEY,
	title text,
	starts timestamp,
	ends timestamp,
	venue_id number,
	FOREIGN KEY venue_id
	REFERENCES venues (venue_id)
);
```

| title | starts | ends | venue_id | event_id |
| :---: | :----: | :--: | :------: | :------: |
| LARP Club 　　　 | 2012-02-15 17:30:00 | 2012-02-15 19:30:00 | 2　|　　1 | 
| April Fools Day | 2012-04-01 00:00:00 | 2012-04-01 23:59:00 |　　|　　2 |
| Christmas Day 　| 2012-12-25 00:00:00 | 2012-12-25 23:59:00 |　  |　　3 |

- 内联接（INNER JOIN）

```sql
SELECT e.title, v.name
FROM events e JOIN venues v
ON e.venue_id = v.venue_id;
```

| title | name |
| :------: | :------: |
| LARP Club 　| Voodoo Donuts |

- 左联接（LEFT JOIN）

```sql
SELECT e.title, v.name
FROM events e LEFT JOIN venues v
ON e.venue_id = v.venue_id;
```

| title | name |
| :---: | :----: |
| LARP Club 　　　| Voodoo Donuts |
| April Fools Day | |
| Christmas Day | |

```sql

- 右联接（RIGHT JOIN）

```sql
SELECT e.title, v.name
FROM events e RIGHT JOIN venues v
ON e.venue_id = v.venue_id;
```

| title | name |
| :---: | :----: |
|  | Crystal Ballroom |
| LARP Club 　　　| Voodoo Donuts |

- 全联接（FULL JOIN）

FULL JOIN，这是LEFT和RIGHT的联合；保证能得到每张表中的所有值，列匹配时就会联接。

```sql
SELECT e.title, v.name
FROM events e FULL JOIN venues v
ON e.venue_id = v.venue_id;
```

| title | name |
| :---: | :----: |
|  | Crystal Ballroom |
| LARP Club 　　　| Voodoo Donuts |
| April Fools Day | |
| Christmas Day | |

###4、使用索引快速查找
####1）自动在主键上创建索引

运行 CREATE TABLE events 命令时，会出现下面这条消息：

```sql
CREATE TABLE / PRIMARY KEY will create implicit index "events_pkey" \
for table "events
```

- PostpreSQL自动在主键上创建索引，以主键的列值为索引的键，索引的值则指向磁盘的一行。
- 采用UNIQUE关键字，强制在表中的一列上创建索引。

####2）手动添加哈希索引

每个值必须是唯一的。

```sql
CREATE INDEX events_title
ON events USING hash (title);
```

####3）手动创建B树索引

对于操作符为小于/大于/等于这样的匹配查询，可采用比哈希更为灵活的B树索引。

```sql
CREATE INDEX events_starts
ON events USING btree (starts);
```

4）列出数据模式中所有索引

```sql
book=# \di
```

**【注】**
- 当对列创建一个FOREIGN KEY约束时，PostgreSQL将自动在目标列创建索引。
- 经常需要在进行联接的列上创建索引，以便加快基于外键的表联接。
