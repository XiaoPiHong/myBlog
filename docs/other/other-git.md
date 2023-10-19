## 基本操作

克隆远程服务器上的仓库

```bash
git clone 仓库连接
```

更新 git 最新版本

```bash
git update-git-for-windows
```

查看修改了文件的文件夹的状态

```bash
git status
```

生成一条日志流水（添加到 index 工作区）

```bash
git add 文件名.后缀
```

提交到 git 仓库（添加到 master 工作区）

```bash
git commit -m "添加这个文件的信息（如：first commit）"
```

查看操作日志（可以看到 commit 记录的 id）（记录是倒序排列的）

```bash
git log
```

查看某条 commit 记录都做了什么

```bash
git show commit 的 id
```

回滚到指定的 commit 记录

```bash
git reset commit 的 id
```

提交到远端（github 里面可以看到修改的文件）

```bash
git push
```

github 生成 ssh key

1.在本地仓库进入 git bash

2.输入 ssh-keygen -t rsa -b 4096 -C "注册 github 时的邮箱"

3.一直按 enter

4.输入 clip < ~/.ssh/id_rsa.pub（这个命令是复制密钥）

5.在 github 中添加即可（title 可写这个密钥是用于干什么）

## 分支管理

### 1.创建分支并切换到该分支

注意：一般创建分支起的名字是对应项目的功能的，比如该功能是登录功能，起的名字就叫 login，完成了该功能再将该分支合并到主分支

```bash
git checkout -b 分支的名字
```

### 2.查看所有分支

```bash
git branch -a
```

### 3.查看当前分支

```bash
git branch
```

### 4.合并分支

1.提交代码到需要合并的分支

```bash
git commit -m '信息'
```

2.先要切换到 master 分支

```bash
git checkout master
```

3.合并分支（ 合并 login 分支里面的所有代码）

```bash
git merge login
```

4.再把本地的代码推送到云端

```bash
git push
```

### 5.将本地的分支推送到云端

```bash
git push -u origin 分支名称
```

注意：一般做完一个功能是先做第四步合并分支，再做第五步将本地分支推送到云端

### 6.分支开发

1.在 master 分支上创建子分子 work_one

2.开发完之后，将本地的修改 commit 到 work_one 分支

3.在 work_one 分支拉去远程的 master 分支：git pull origin master

4.解决有冲突的文件再 commit 再 push

5.切换本地的 master 分支，合并 work_one 分支

6.删除 work_one 分支：git branch -d work_one

## 解决冲突

1.不同的分支修改了相同的文件或别人创建了新文件或别人编辑了其它文件，一个人先 commit 之后 push 提交了，另一个人 commit 之后 push 不了，要先拉取别人先提交的代码

2.拉取之后就需要解决有冲突的文件，别人先提交创建的新文件或编辑的其它文件与你没有冲突 git 会自动帮你添加到暂存区，有冲突的文件需要你自己解决冲突，解决冲突之后要继续将这个解决冲突后的文件 add 添加到暂存区，重新与无冲突的新文件一起 commit（这里默认都是 Merge branch 'master' of xxx，也可以自己修改；注意：如果都是一些不会影响到你的文件，你在终端 pull 之后编辑 commit 信息再 push 就行了不需要做什么，它们系统都会自动帮你 add 到暂存区的），这样就解决这个冲突了

3.最后再 push 提交到远程仓库

注意：解决冲突后，解决冲突的人本地会一下子增加 3 条记录，一条别人先添加的记录，一条自己添加的记录，一条解决冲突的记录（而远程仓库中两个人的提交加起来也是这 3 条记录，注意：第一条是第一个人提交的，第二第三条才是第二个人制造的）

第一种情况：

别人 新增/修改/删除 了文件并 push 了，你没有修改该文件并 commit 了，pull 之后，这个文件会自动添加到暂存区，只要填写解决冲突的 commit 就可以 push 了

第二种情况（最常见）：

别人修改了文件并 push 了，你也修改了该文件并 commit 了，pull 之后，需要解决冲突，然后再添加到暂存区，再填写 commit 就可以 push 了

第三种情况：

你删除并 commit 了别人修改并 push 的文件，pull 之后，可以选择保留你的删除/它们的更改，再添加到暂存区，再填写 commit 就可以 push 了

## stash 储藏

1.将修改的文件存储起来

```bash
git stash
```

2.查看有没有存储的 stash

```bash
git stash list
```

3.恢复，但是恢复后，stash 内容并不删除，你需要用 git stash drop stash@{0}来删除

```bash
git stash apply stash@{0}
```

4.恢复，恢复的同时把 stash 内容也删了

```bash
git stash pop stash@{0}
```

5.你可以多次 stash，恢复的时候，先用 git stash list 查看，然后恢复指定的 stash，用命令

```bash
git stash apply stash@{0}
```

stash 储藏注意事项：

1.修改了某文件并且 git stash 存起来了，然后再对该文件进行修改，且推送到远端，再 git stash pop stash@{0}恢复，会有冲突，因为相当于不同的人同时修改了该文件；

且该 stash 会被保留，因为可能会再次用到；

冲突需要自行解决（保留双方更改，添加暂存，再取消暂存即可）；

2.修改了某文件并且存起来了，然后再对其它文件修改，且推送到远端，再 git stash pop stash@{0}恢复，就可以了，不会发生冲突；

## tag 标签

1.tag 标签的作用是更方便查看提交的位置，类似于书签

2.git tag -a 标签的名称 -m '标签的描述' （打标签）

3.git tag -d 标签的名称 （删除标签）

4.git tag -a 标签的名称 55d8e71fc7d0b8cefbb4cbee339beb9d987d9b81 -m '标签的描述' （给指定的 commit 打标签）

5.git push origin 标签的名称 （推送当前标签到远端服务器）

6.git push origin --tags （推送本地所有标签到远端服务器）

7.git ls-remote --tags （查看远端服务器标签）

## git 子模块（submodule）

子模块就是在主仓库中可以嵌套另外一个子仓库，两个仓库相互独立，互不影响

1、git submodule add http://192.168.x.xx/FMS/Web.git project/fy/fms/Web（在 note 仓库中执行该命令，会自动拉取远程 Web 仓库到本地 note 目录中的 project/fy/fms 中，此时 Web 仓库就是 note 仓库的子模块，注意：fms 目录中不能包含 Web 这个目录）

2、git add .（暂存）

3、git commit -m "Add submodule: project/fy/fms/Web"（提交到远程 note 仓库）

4、注意：子模块每切换一次分支，主模块都会记录这个子模块的分支变更，这个变更是记录子模块当前分支的，这个变更可以按需求提交到远端仓库

5、注意：创建的子模块的变更并不会提交到主模块仓库，主模块只是记录了当前子模块的分支还是远程仓库地址，子模块的文件变更还是子模块单独管理

## 包含子模块的项目应该如何拉取

1、先正常拉取主模块

2、再初始化本地的子模块配置：git submodule init

3、再拉取所有子模块的代码：git submodule update
