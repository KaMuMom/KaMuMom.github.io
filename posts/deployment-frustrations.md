---
title: "部署网站时遇到的那些坑"
date: "2025-12-16"
excerpt: "今天想跟大家聊聊部署博客时遇到的一些挫折，真的是踩了不少坑，希望能帮到同样在折腾的朋友们。"
tags: ["部署", "GitHub Pages", "踩坑", "经验分享"]
---

# 部署网站时遇到的那些坑

今天真的是一波三折，本来以为建个博客会很顺利，结果在部署环节卡了好久。想跟大家分享一下今天踩过的坑，希望能帮到同样在折腾的朋友们。

## 第一个坑：GitHub Actions 权限问题

一开始我以为只要把代码推到 GitHub，GitHub Pages 就会自动工作。结果呢？Actions 直接给我来了个 403 错误：

```
remote: Permission to KaMuMom/KaMuMom.github.io.git denied to github-actions[bot]
```

当时我真的是一脸懵逼，明明是自己的仓库，怎么机器人没有权限呢？

后来查了半天才发现，GitHub Pages 的权限设置有些讲究。需要在仓库设置里：
1. 去 Settings → Pages 把 Source 设置为 "GitHub Actions"
2. 还要在 Settings → Actions → General 最下面开启 "Read and write permissions"

这些设置藏得还挺深的，不仔细找还真发现不了。

## 第二个坑：Workflow 文件写错了

原来的 workflow 文件用的是老版本的部署方式，结果一直报权限错误。后来才知道现在 GitHub 推荐用新的 `actions/deploy-pages` 和 `actions/upload-pages-artifact`。

改了之后还要在 workflow 文件里加上权限配置：

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

这些细节真的是不踩坑不知道啊！

## 第三个坑：构建配置问题

Next.js 部署到 GitHub Pages 还有个坑，就是静态导出的配置。一开始我的 `next.config.js` 没设置好，结果构建出来的文件路径都不对。

关键配置是这几项：
```javascript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

特别是 `trailingSlash: true` 这个，没有的话 GitHub Pages 会找不到页面。

## 第四个坑：缓存问题

有时候改了东西重新部署，结果网站还是老样子。这时候可能是浏览器缓存或者 GitHub Pages 缓存的问题。

我的解决办法是：
1. 浏览器硬刷新（Ctrl+Shift+R）
2. 等待几分钟让 GitHub Pages 完全更新
3. 在 GitHub Actions 里确认构建真的成功了

## 一些小建议

经过这些折腾，我总结了几条小建议：

### 1. 耐心一点
部署这种事情真的急不来，特别是第一次搞的时候。遇到错误先仔细看错误信息，很多时候问题就出在那些小地方。

### 2. 多看日志
GitHub Actions 的日志真的很详细，遇到问题一定要仔细看。很多时候错误信息里就直接告诉你问题在哪了。

### 3. 备份配置
搞定了之后记得把配置文件备份一下，下次遇到类似问题就有参考了。

### 4. 别怕折腾
说实话，踩坑是学习过程中很正常的一部分。每次解决一个问题，下次遇到类似情况就知道怎么处理了。

## 写在最后

虽然今天折腾了很久，但最后看到博客成功上线的那一刻，还是很有成就感的！

如果你也在折腾自己的博客或者网站，遇到问题别灰心，多查查资料，多试试不同的方案。实在不行还可以去 GitHub Issues 或者 Stack Overflow 上问问，开源社区的大家都很热心的。

希望我的这些经历能帮到你。如果你在部署过程中遇到什么奇怪的问题，欢迎在评论区交流，我们一起学习进步！

---

**小贴士**：如果你也在用 Next.js + GitHub Pages，我建议直接用我最后修改好的 workflow 配置，能省不少事。