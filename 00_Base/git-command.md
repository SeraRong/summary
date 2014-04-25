git 添加、删除、撤销
==================

###1、添加
####1）添加单个文件
```git
git add test.txt
git commit -m "add test.txt"
git push origin master
```
####2）批量添加
```git
git add . 
git commit -m "add files"
git push origin master
```

###2、删除
####1）删除单个文件
```git
git rm test.txt
git commit -m "remove test.txt"
git push origin master
```
####2）批量删除
```git
git add -A
git commit -m "remove files"
git push origin master
```

###3、撤销
####1）撤销工作区修改
- 修改后还没有被放到暂存区，撤销修改后回到和版本库一模一样的状态。
- 添加到暂存区后又作了修改，撤销修改后回到添加到暂存区后的状态。

```git
git checkout -- test.txt
```
####2）撤销暂存区修改
用命令`git reset HEAD file`可以把暂存区的修改撤销掉（unstage），再重新放回工作区。
```git
git reset HEAD test.txt
git checkout -- test.txt
```
####3）撤销版本库修改
执行了`git commit`操作，尚未执行`git push`操作。
```git
git log
git log --pretty=oneline
```
**上一个版本**就是`HEAD^`，**上上一个版本**就是`HEAD^^`，也可采用commit id。

回退至上一版本：
```git
git reset --hard HEAD^
```
回退至上上版本：
```git
git reset --hard HEAD^^
```
回退至某一版本：（3628164是commit id的前几位）
```git
git reset --hard 3628164
```