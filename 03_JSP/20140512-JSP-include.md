JSP include与jsp:include区别
=========

**include**与**jsp:include**的**区别**

####1、执行时间上
- `<%@ include file=”relativeURI”%>` ：是在**翻译阶段执行**。
- `<jsp:include page=”relativeURI” flush=”true” />` ：在**请求处理阶段执行**。

####2、引入内容的不同
- `<%@ include file=”relativeURI”%> `
引入静态文本(html,jsp),在JSP页面被转化成servlet之前和它融和到一起。
- `<jsp:include page=”relativeURI” flush=”true” />`引入执行页面或servlet所生成的应答文本。

另外在两种用法中file和page属性都被解释为一个相对的URI，如果它以斜杠开头，那么，它就是一个环境相关的路径，将根据赋给应用程序的URI的前缀进行解释；如果它不是以斜杠开头，那么，就是页面相关的路径，就根据引入这个文件的页面所在的路径进行解释。
