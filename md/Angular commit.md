<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>

------------------
Header
（1）type
build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
ci: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
docs：文档（documentation）
feat：新功能（feature）
fix：修补bug
perf: A code change that improves performance
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
style： 格式（不影响代码运行的变动）
test：增加测试
（2）scope 可选
scope用于说明 commit 影响的范围，
animations
elements
forms
http
language-service
localize
platform-browser
router
service-worker
upgrade
zone.js
（3）subject
subject是 commit 目的的简短描述，不超过50个字符。
以动词开头，使用第一人称现在时，比如change，而不是changed或changes
第一个字母小写
结尾不加句号（.）
------------------
Body
*
More detailed explanatory text, if necessary.  Wrap it to 
about 72 characters or so. 

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
*
有两个注意点。

（1）使用第一人称现在时，比如使用change而不是changed或changes。

（2）应该说明代码变动的动机，以及与以前行为的对比
------------------
Footer
Footer 部分只用于两种情况。
（1）不兼容变动

如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。

*
BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
    }

    After:

    scope: {
      myAttr: '@',
    }

    The removed `inject` wasn't generaly useful for directives so there should be no code using it.
*
（2）关闭 Issue

如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。
*
Closes #234
*

也可以一次关闭多个 issue 。
*
Closes #123, #245, #992
*
------------------
Revert
撤销以前的 commit
以revert:开头，后面跟着被撤销 Commit 的 Header。
*
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
*
Body部分的格式是固定的，必须写成This reverts commit &lt;hash>.，其中的hash是被撤销 commit 的 SHA 标识符。

如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的Reverts小标题下面。

git add .
git cz
npm version patch
git cz
finish feature
git push
