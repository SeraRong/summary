Spring 依赖注入配置简写
=========

###1、构造器注入
1）常量值
```
简写：<constructor-arg index="0" value="常量"/>
全写：<constructor-arg index="0"><value>常量</value></constructor-arg>
```
2）引用
```
简写：<constructor-arg index="0" ref="引用"/>
全写：<constructor-arg index="0"><ref bean="引用"/></constructor-arg>
```
 
###2、setter注入：      
1）常量值
```
简写：<property name="message" value="常量"/>
全写：<property name="message"><value>常量</value></ property>
```
2）引用
```
简写：<property name="message" ref="引用"/>
全写：<property name="message"><ref bean="引用"/></ property>
```
3）数组：`<array>`没有简写形式。

4）列表：`<list>`没有简写形式。

5）集合：`<set>`没有简写形式。

6）字典
```
简写：
<map>
 <entry key="键常量" value="值常量"/>
 <entry key-ref="键引用" value-ref="值引用"/>
</map>

全写：
<map>
 <entry><key><value>键常量</value></key><value>值常量</value></entry>
 <entry><key><ref bean="键引用"/></key><ref bean="值引用"/></entry>
</map>
```
7）Properties：没有简写形式。
 
###3、使用p命名空间简化setter注入
```xml
<?xml version="1.0" encoding="UTF-8"?>  
<beans  xmlns="http://www.springframework.org/schema/beans"  
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
        xmlns:p="http://www.springframework.org/schema/p"  
        xsi:schemaLocation="  
           http://www.springframework.org/schema/beans  
           http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">  
<bean id="bean1" class="java.lang.String">  
  <constructor-arg index="0" value="test"/>  
</bean>  
<bean id="idrefBean1" class="cn.javass.spring.chapter3.bean.IdRefTestBean"  
p:id="value"/>  
  <bean id="idrefBean2" class="cn.javass.spring.chapter3.bean.IdRefTestBean"  
p:id-ref="bean1"/>  
</beans>  
```
```
xmlns:p="http://www.springframework.org/schema/p" ：首先指定p命名空间。
<bean id="……" class="……" p:id="value"/> ：常量setter注入方式，其等价于<property name="id" value="value"/>。
<bean id="……" class="……" p:id-ref="bean1"/> ：引用setter注入方式，其等价于<property name="id" ref="bean1"/>。 
```

