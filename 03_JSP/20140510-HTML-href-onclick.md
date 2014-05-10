a标签href与onclick的区别
=========

a标签**href**与**onclick**的**区别**

- 1、链接的 **onclick** 事件被**先执行**，**其次是 href 属性**下的动作（页面跳转，或javascript 伪链接）。 

- 2、假设链接中**同时存在 href 与 onclick**，如果想让 **href 属性下的动作不执行**，**onclick** 必须得到一个 **false 的返回值**。  

- 3、如果页面过长有滚动条，且希望通过链接的 onclick 事件执行操作，应将它的 href属性设为 javascript:void(0)，而不要是 #，这可以防止不必要的页面跳动。

- 4、尽量**不要用javascript:协议做为A的href属性**，这样不仅会导致不必要的触发window.onbeforeunload事件，在IE里面更会使gif动画图片停止播放。 

- 5、onclick='javascript:fun()'是把fun函数绑定在onclick事件上，而href="javascript:fun()"这个应该是执行浏览器默认行为时运行该段javascript，不知道是不是绑定到了什么事件上，会触发window.onbeforeunload事件（个人认为是原来默认行为是onload到href指定的页面，现在改变了，所以要unload）。
