
JSP pageEncoding和contentType
=========

JSP页面中**pageEncoding**和**contentType**两种属性的**区别**：
- *pageEncoding是jsp文件本身的编码。*
- *contentType的charset是指服务器发送给客户端时的内容编码。*

　　**JSP**要经过**两次的“编码”**，**第一阶段**会用**pageEncoding**，**第二阶段**会用**utf-8至utf-8**，**第三阶段**就是由Tomcat出来的网页， 用的是**contentType**。

- **第一阶段**是**jsp编译成.java**，它会**根据pageEncoding的设定读取jsp**，结果是由指定的编码方案翻译成统一的UTF-8 JAVA源码（即.java）。如果pageEncoding设定错了，或没有设定，出来的就是中文乱码。

- **第二阶段**是由**JAVAC的JAVA源码至java byteCode的编译**，不论JSP编写时候用的是什么编码方案，经过这个阶段的结果全部是UTF-8的encoding的java源码。

    **JAVAC用UTF-8的encoding读取java源码，编译成UTF-8 encoding的二进制码（即.class）**，这是JVM对常数字串在二进制码（java encoding）内表达的规范。

- **第三阶段**是**Tomcat（或其的application container）载入和执行阶段二的来的JAVA二进制码**，输出的结果，也就是在客户端见到的，这时隐藏在阶段一和阶段二的参数**contentType**就发挥了功效。

###contentType的設定
　　**pageEncoding** 和**contentType**的**预设**都是 **ISO8859-1**。 而随便设定了其中一个, 另一个就跟着一样了(TOMCAT4.1.27是如此)。 但这不是绝对的, 这要看各自JSPC的处理方式。

　　
**pageEncoding不等于contentType**, 更有利亚洲区的文字 CJKV系JSP网页的开发和展示。(例pageEncoding=GB2312 不等于 contentType=utf-8)。

java编译和jsp编译的区别：
- **.java**在被编译器读入的时候**默认采用**的是**操作系统所设定的locale所对应的编码**。比如中国大陆就是GBK，台湾就是BIG5或者MS950。而一般我们不管是在记事本还是在ue中写代码，如果没有经过特别转码的话，写出来的都是本地编码格式的内容。所以编译器采用的方法刚好可以让虚拟机得到正确的资料。

- **jsp**文件**没有这个默认转码过程**，但是指定了pageEncoding就可以实现正确转码了。

举例说明：
```jsp
<%@ page contentType="text/html;charset=utf-8" %>
```
大多会打印出乱码，因为输入的“你好”是gbk的，但是服务器是否正确抓到“你好”不得而知。
```jsp
<%@ page contentType="text/html;charset=utf-8" pageEncoding="GBK"%>
```
如果改为这样，服务器就一定会是正确抓到“你好”了。
