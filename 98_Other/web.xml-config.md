web.xml 配置
=========

在java工程中，web.xml用来初始化工程配置信息，比如说welcome页面，filter，listener，servlet，servlet-mapping，启动加载级别等等。

每一个xml文件都有定义他书写规范的schema文件，web.xml所对应的xml Schema文件中定义了多少种标签元素，web.xml中就可以出现它所定义的标签元素，也就具备哪些特定的功能。web.xml的模式文件是由Sun 公司定义的，每个web.xml文件的根元素为<web-app>中，必须标明这个web.xml使用的是哪个模式文件。
   
web.xml的根元素定义如下所示:
```xml
<?xml version="1.0" encoding="UTF-8"?>  
<web-app version="2.5"   
xmlns="http://java.sun.com/xml/ns/javaee"  
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"   
xsi:schemaLocation="http://java.sun.com/xml/ns/javaee   
http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">  
</web-app>  
```
###web.xml中常用的标签及其功能
###1、\<description\>，\<display-name\>，\<icon\>
- **\<description\>项目描述\</discription\>**  对项目做出描述。
- **\<display-name\>项目名称\</display-name\>** 定义项目的名称。
- **\<icon\>** icon元素包含small-icon和large-icon两个子元素，用来指定web站台中小图标和大图标的路径。
    - **\<small-icon\>/路径/smallicon.gif\</small-icon\>**：small-icon元素应指向web站台中某个小图标的路径，大小为16 X 16 pixel,但是图象文件必须为GIF或JPEG格式,扩展名必须为：.gif或 .jpg。
    - **\<large-icon\>/路径/largeicon-jpg\</large-icon\>**：large-icon元素应指向web站台中某个大图表路径，大小为32 X 32 pixel，但是图象文件必须为GIF或JPEG的格式，扩展名必须为： gif 或jpg。

```xml
<display-name>Develop Example</display-name>    
<description>JSP 2.0 Tech Book's Examples</description>   
<icon>    
   <small-icon>/images/small.gif</small-icon>      
   <large-icon>/images/large.gir</large-icon>   
</icon>  
```

###2、\<context-param\>
**\<context-param\>**元素含有一对参数名和参数值，用作应用的servlet上下文**初始化参数**。参数名在整个Web应用中必须是惟一的。
- **context-param** 元素用来设定web应用的环境参数(context)，它包含两个子元素： **param-name**和**param-value**。 
    - **\<param-name\>参数名称\</param-name\>**：设定Context名称 。
    - **\<param-value\>值\</param-value\>**：设定Context名称的值 

```xml
<context-param>  
   <param-name>param_name</param-name>  
   <param-value>param_value</param-value>  
</context-param>  
```

设定参数获取方式：
- JSP网页：

```jsp
${initParam.param_name}
```
- Servlet：

```java
String param_name = getServletContext().getInitParamter("param_name");
```
###3、\<filter\>
**filter**元素用于**指定Web容器中的过滤器**。

在请求和响应对象被servlet处理之前或之后，可以使用过滤器对这两个对象进行操作。

结合filter-mapping元素，过滤器被映射到一个servlet或一个URL模式。
这个过滤器的filter元素和filter-mapping 元素必须具有相同的名称。

filter元素用来声明filter的相关设定：
- **\<display-name\>\</display-name\>**
- **\<description\>\</description\>**
- **\<icon\>\</icon\>**
- **\<init-param\>\</init-param\>**：与context-param 元素具有相同的元素描述符。
- **\<filter-name\>Filter的名称\</filter-name\>**：定义过滤器的名称，该名称在整个应用中都必须是惟一的。
- **\<filter-class\>Filter的类名称\</filter-class\>**：指定过滤 器类的完全限定的名称。例如:com.foo.hello。

```xml
<filter>  
  <filter-name>setCharacterEncoding</filter-name>  
  <filter-class>coreservlet.javaworld.CH11.SetCharacterEncodingFilter</filter-class>  
  <init-param>  
     <param-name>encoding</param-name>  
     <param-value>GB2312</param-value>  
  </init-param>  
</filter>  
```

###4、\<filter-mapping\>
**filter-mapping**元素用来**声明Web应用中的过滤器映射**。

**过滤器**可被映射到**一个servlet**或**一个URL模式**：
- 将过滤器映射到一个 servlet中会造成过滤器作用于servlet上。
- 将过滤器映射到一个URL模式中则可以将过滤器应用于任何资源，只要该资源的URL与URL模式匹配。

**过滤**是按照部署描述符的filter-mapping元素出现的**顺序执行**的。

**filter-mapping** 元素的两个主要子元素**filter-name**和**url-pattern**，用来定义Filter所对应的URL。还有**servlet-name**和**dispatcher**子元素，不是很常用。
- **\<filter-name\>Filter的名称\</filter-name\>**：定义Filter的名称.
- **\<url-pattern\>URL\</url-pattern\>**：Filter所对应的RUL。例如：\<url-pattern\>/Filter/Hello\</url-pattern\>
- **\<servlet-name\>Servlet的名称\<servlet-name\>**：定义servlet的名称。
- **\<dispatcher\>REQUEST|INCLUDE|FORWARD|ERROR\</disaptcher\>**：设定Filter对应的请求方式，有RQUEST，INCLUDE，FORWAR，ERROR四种，默认为REQUEST。
例如：

```xml
<filter-mapping>  
   <filter-name>GZIPEncoding</filter-name>  
   <url-pattern>/*</url-pattern>  
</filter-mapping>  
```
**完整的filter配置**例子如下：
```xml
<filter>  
    <filter-name>struts2</filter-name>  
    <filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>  
</filter>  
<filter-mapping>  
    <filter-name>struts2</filter-name>  
    <url-pattern>/*</url-pattern>  
</filter-mapping>  
```

###5、\<servlet\>
在web.xml中完成的一个最常见的任务是对servlet或JSP页面给出名称和定制的URL。用servlet元素分配名称，使用**servlet-mapping**元素**将定制的URL与分配的名称相关联**。
```xml
<servlet>   
  <servlet-name>Test</servlet-name>   
  <servlet-class>com.moreservlets.TestServlet</servlet-class>   
</servlet>  
```
这表示位于WEB-INF/classes/com/moreservlets/TestServlet的servlet已经得到了注册名Test。

###6、\<servlet-mapping\>
**servlet-mapping**元素包含两个子元素**servlet-name**和**url-pattern**，用来定义servlet所对应URL。
- **\<servlet-name\>Servlet的名称\</servlet-name\>**：定义Servlet的名称。
- **\<url-pattern\>Servlet URL\</url-pattern\>**：定义Servlet所对应的RUL。例如：\<url-pattern\>/Servlet/Hello\</url-pattern\>

```xml
<servlet-mapping>  
   <servlet-name>LoginChecker</servlet-name>  
   <url-pattern>/LoginChecker</url-pattern>  
</servlet-mapping>  
```
**完整的servlet配置**如下所示：
```xml
<servlet>  
  <servlet-name>ServletName</servlet-name>     
  <servlet-class>xxxpackage.xxxServlet</servlet-class> <!--Servlet的类-->  
  <init-param> <!--初始化一个变量，可看成全局变量，可省略-->  
    <param-name>参数名称</param-name> <!--变量名称-->  
    <param-value>参数值</param-value> <!--变量值-->  
  </init-param>  
</servlet>  
<servlet-mapping>  
  <servlet-name>ServletName</servlet-name>                 
  <url-pattern>/aaa/xxx</url-pattern> <!--映射的url路径 -->  
</servlet-mapping>  
```  
在地址栏中输入 http://localhost:8080/web-App/aaa/xxx 就可以访问了。
 
###7、\<listener\>
**listener**元素用来**注册一个监听器类**，可以在Web应用中包含该类。使用listener元素，可以收到事件什么时候发生以及用什么作为响应的通知。

**listener**元素用来定义Listener接口,它的主要子元素为**\<listener-class\>**
- **\<listen-class\>Listener的类名称\</listener-class\>**：定义Listener的类名称。例如：com.foo.hello。

```xml
<listener>  
    <listener-class><span style="font-family: FangSong_GB2312;font-size:18px; white-space: pre;">com.foo.hello</span></listener-class>  
</listener>  
```

###8、\<session-cofing\>
**session-config**包含一个子元素**session-timeout**，定义**web应用中的session参数**。
- **\<session-timeout\>分钟\</session-timeout\>**：定义这个web应用所有session的有效期限。单位为分钟。

```xml
<session-config>  
   <session-timeout>20</session-timeout>  
</session-config>  
```

###9、\<mime-mapping\>
**mime-mapping**包含两个子元素**extension**和**mime-type**。定义**某一个扩展名和某一MIME Type做对映**。
- **\<extension\>扩展名名称\</extension\>**：扩展名称。
- **\<mime-type\>MIME格式\</mime-type\>**：MIME格式。

```xml
<mime-mapping>  
   <extension>doc</extension>  
   <mime-type>application/vnd.ms-word</mime-type>  
</mime-mapping>  
<mime-mapping>  
   <extension>xls</extension>  
   <mime-type>application/vnd.ms-excel</mime-type>  
</mime-mapping>  
<mime-mapping>  
   <extension>ppt</extesnion>  
   <mime-type>application/vnd.ms-powerpoint</mime-type>  
</mime-mapping>  
```

###10、\<welcome-file-list\>
**welcome-file-list**包含一个子元素**welcome-file**，用来**定义首页列单**。
- **\<welcome-file\>用来指定首页文件名称\</welcome-flie\>**：welcome-file用来指定首页文件名称。可以用\<welcome-file\>指定几个首页，服务器会依照设定的顺序来找首页。

```xml
<welcome-file-list>  
    <welcome-file>index.jsp</welcome-file>  
    <welcome-file>index.htm</welcome-file>  
</welcome-file-list>  
```

###11、\<error-page\>
**error-page**元素包含三个子元素**error-code**,**exception-type**和**location**。**将错误代码(Error Code)或异常(Exception)的种类对应到web应用资源路径**。
- **\<error-code\>错误代码\</error-code\>**：HTTP Error code。例如：404。
- **\<exception-type\>Exception\</exception-type\>**：一个完整名称的Java异常类型。
- **\<location\>/路径\</location\>**：在web应用内的相关资源路径。

```xml
<error-page>  
   <error-code>404</error-code>  
   <location>/error404.jsp</location>  
</error-page>  
<error-page>  
   <exception-type>java.lang.Exception</exception-type>  
   <location>/except.jsp</location>  
</error-page>  
```

###12、\<jsp-config\>
**jsp-config**元素主要用来设定JSP的相关配，\<jsp:config\>包括**\<taglib\>**和**\<jsp-property-group\>**两个子元素，其中\<taglib\>元素在JSP 1.2时就已经存在了；\<jsp-property-group\>是JSP 2.0新增的元素。
- **\<taglib\>\</taglib\>**：**taglib**元素包含两个子元素**taglib-uri**和**taglib-location**，用来**设定JSP网页用到的Tag Library路径**。
    - **\<taglib-uri\>URI\</taglib-uri\>**：taglib-uri定义TLD文件的URI，JSP网页的taglib指令可以经由这个URI存取到TLD文件。
    - **\<taglib-location\>/WEB-INF/lib/xxx.tld\</taglib-laction\>**：TLD文件对应Web应用的存放位置。

- **\<jsp-property-group\>\</jsp-property-group\>**：jsp-property-group元素包含8个元素。
    - **\<description\>Description\</descrition\>**：此设定的说明。
    - **\<display-name\>Name\</display-name\>**：此设定的名称。
    - **\<url-pattern\>URL\</url-pattern\>**：设定值所影响的范围，如：/CH2 或者/*.jsp。
    - **\<el-ignored\>true|false\</el-ignored\>**：若为true，表示不支持EL语法。
    - **\<scripting-invalid\>true|false\</scripting-invalid\>**：若为true表示不支持<%scription%>语法。
    - **\<page-encoding\>encoding\</page-encoding\>**：设定JSP网页的编码。
    - **\<include-prelude\>.jspf\</include-prelude\>**：设置JSP网页的抬头，扩展名为.jspf。
    - **\<include-coda\>.jspf\</include-coda\>**：设置JSP网页的结尾，扩展名为.jspf。

```xml
<jsp-config>  
    <taglib>  
        <taglib-uri>Taglib</taglib-uri>  
        <taglib-location>/WEB-INF/tlds/MyTaglib.tld</taglib-location>  
    </taglib>  
    <jsp-property-group>  
        <description>  
          Special property group for JSP Configuration JSP example.  
        </description>  
        <display-name>JSPConfiguration</display-name>  
        <uri-pattern>/*</uri-pattern>  
        <el-ignored>true</el-ignored>  
        <page-encoding>GB2312</page-encoding>  
        <scripting-inivalid>true</scripting-inivalid>  
   ............  
    </jsp-property-group>  
</jsp-config>  
```

###13、\<resource-ref\>
**resource-ref**元素包括五个子元素**description**,**res-ref-name**,**res-type**,**res-auth**,**res-sharing-scope**，**利用JNDI取得应用可利用资源**。
- **\<description\>说明\</description\>**：资源说明。
- **\<rec-ref-name\>资源名称\</rec-ref-name\>**：资源名称。
- **\<res-type\>资源种类\</res-type\>**：资源种类。
- **\<res-auth\>Application|Container\</res-auth\>**：资源由Application或Container来许可。
- **\<res-sharing-scope\>Shareable|Unshareable\</res-sharing-scope\>**：资源是否可以共享。默认值为 Shareable。

```xml
<resource-ref>  
   <description>JNDI JDBC DataSource of JSPBook</description>  
   <res-ref-name>jdbc/sample_db</res-ref-name>  
   <res-type>javax.sql.DataSoruce</res-type>  
   <res-auth>Container</res-auth>  
</resource-ref>  
```