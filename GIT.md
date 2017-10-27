# GIT

标签（空格分隔）： 笔记

---

[toc]
## 什么是GIT
Git是目前世界上最先进的分布式版本控制系统（没有之一）

## 工作区 & 暂存区

 - 工作区： 电脑上可以看到的目录，在执行git add时，就是将文件放入暂存区
 - 暂存区： 是在隐藏目录.git文件中的，文件中还包括github为我们创建的master分支，我们执行提交代码时commit，就是将文件由暂存区发送到仓库区去

## Git具有的特点

 - Git中每个克隆(clone)的版本库都是平等的。可以从任何一个版本库的克隆来创建属于自己的版本库，同时你的版本库也可以作为源提供给他人，只要你愿意。
 - Git的每一次提取操作，实际上都是一次对代码仓库的完整备份
 - 提交完全在本地完成，无须别人给你授权，你的版本库你作主，并且提交总是会成功
 - it的提交不会被打断，直到你的工作完全满意了，PUSH给他人或者他人PULL你的版本库，合并会发生在PULL和PUSH过程中，不能自动解决的冲突会提示你手工完成。

## Git 常用命令

 - git help <command> # 显示command的help
 - git init 在当前目录新建一个Git代码库
 - git clone [url] 下载一个项目和它的整个代码历史
 - git add <file> # 将工作文件修改提交到本地暂存区
 - git add . # 将所有修改过的工作文件提交暂存区
 - git diff <file> # 比较当前文件和暂存区文件差异 git diff
 - git log -p <file> # 查看每次详细修改内容的diff
 - git pull # 抓取远程仓库所有分支更新并合并到本地
 - git push # push所有分支
 - git push origin master # 将本地主分支推到远程主分支
 - git status 显示有变更的文件
 - git checkout [file] 恢复暂存区的指定文件到工作区

 
  
