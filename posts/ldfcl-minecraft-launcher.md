---
title: "LDFCL 0.5.0：我的 Minecraft Java 版启动器"
date: "2026-10-21"
excerpt: "LDFCL 首次公开发布：面向 Windows x64 的 Minecraft Java 版便携启动器，支持版本隔离、Mod 与整合包下载、皮肤库和自动 Java 配置。附下载入口与上手说明。"
tags: ["LDFCL", "Minecraft", "开源项目", "Electron"]
---

今天把我的新项目 **LDFCL** 更新到博客上。它是一款面向 **Windows x64** 的 Minecraft Java 版桌面启动器，使用 Electron、React 和 TypeScript 开发，以 MIT 许可证开源。当前公开发行版为 **v0.5.0**。

这个项目把游戏实例、账号、资源下载和皮肤管理放在同一个应用里，希望让安装与管理不同版本的 Minecraft 更方便。

- [项目源码与完整说明](https://github.com/KaMuMom/LDFCL)
- [v0.5.0 发行页](https://github.com/KaMuMom/LDFCL/releases/tag/v0.5.0)
- [下载 Windows x64 便携版 EXE](https://github.com/KaMuMom/LDFCL/releases/download/v0.5.0/LDFCL-0.5.0-Windows-x64.exe)
- [查看后续最新发行版](https://github.com/KaMuMom/LDFCL/releases/latest)

## 目前可以做什么

### 分开管理游戏版本

LDFCL 使用标准的 `.minecraft/versions/<版本文件夹>` 结构，每个实例分别保存 Mod、配置、存档、资源包、光影包和游戏设置，游戏资源与运行库则在同一游戏根目录下共享缓存。

除了程序旁的默认游戏目录，也可以添加其他磁盘位置的目录，扫描并管理其中兼容的已有版本。不同版本使用独立的运行目录，方便分别维护原版、模组服与整合包环境。

### 下载 Minecraft、Mod 与整合包

「资源下载」集中提供 Minecraft、Mod、整合包、资源包和光影包入口，当前支持原版、Fabric、Quilt、Forge，以及 OptiFine 独立实例安装。

安装 Mod 时，可以明确选择目标实例和兼容的发行版本，并递归补齐 Modrinth 标记的必需前置依赖；常用 Mod 可以收藏。实例内支持启用、禁用、重复检测与更新。整合包支持选择 Modrinth `.mrpack` 的具体发行版本，并创建新的隔离实例。

### 管理账号、皮肤与披风

账号提供 Microsoft 设备代码授权、离线身份和 Yggdrasil 皮肤站接入。首页有可旋转的 3D 角色预览，本地皮肤库支持 PNG 导入、预览、重命名、导出和像素编辑。

选择皮肤库中的皮肤只改变预览，上传正版皮肤需要单独操作；披风只能使用账号已经拥有的款式。Microsoft 正版登录需要自行配置有相应 Minecraft API 访问资格的 Client ID，并使用拥有 Minecraft Java 版权的账号，具体步骤见[仓库账号说明](https://github.com/KaMuMom/LDFCL#账号说明)。

### 配置 Java 和游戏设置

启动器会优先选择匹配的本地 Java，缺少时按需下载；内存可以自动或手动分配。通用游戏设置可调整视距、帧率、画质、音量与语言，也能为单独实例设置预设。

## 0.5.0 的界面更新

这一版使用 `liquid-glass-react 1.1.1` 重构启动器界面，以浅冰蓝、淡紫背景和蓝色强调色组织卡片、导航与操作区，同时保留账号、启动、版本隔离和资源管理功能。

发行页还提供了包含 **59 张实际程序截图与离线相册**的压缩包，解压后打开 `index.html` 即可查看界面。设计范围见 [UI 重构说明](https://github.com/KaMuMom/LDFCL/blob/main/docs/UI_REFACTOR.md)。

## 第一次使用

1. 从[发行页](https://github.com/KaMuMom/LDFCL/releases/tag/v0.5.0)下载 `LDFCL-0.5.0-Windows-x64.exe`，放入一个可写入的文件夹后运行。便携版已包含桌面运行环境，无需额外安装 Node.js 或 .NET。
2. 添加要使用的账号；使用 Microsoft 登录前，先按仓库说明完成 Client ID 配置。
3. 打开「资源下载 → Minecraft」，选择游戏版本与需要的加载器，下载并安装。
4. 返回首页，选择账号和实例，点击「启动游戏」。

首次安装需要联网获取游戏资源、依赖和所需 Java。默认数据放在程序旁：

```text
启动器所在文件夹/
├── LDFCL-0.5.0-Windows-x64.exe
├── LDFCL-data/    # 账号、启动器设置、Mod 收藏与皮肤库
└── .minecraft/   # 默认游戏目录与各版本实例
```

如需校验下载文件，发行页提供 [SHA-256 校验值](https://github.com/KaMuMom/LDFCL/releases/download/v0.5.0/SHA256SUMS-0.5.0.txt)。

## 当前进度与反馈

根据项目公开的验证记录，0.5.0 已通过 255 项自动测试、63 组最终打包界面与功能检查，以及 21 组便携程序检查。该版本的 UI 重构验证未实际运行 Minecraft，Microsoft 授权和正版皮肤操作使用受控测试数据，具体范围以 [VALIDATION.md](https://github.com/KaMuMom/LDFCL/blob/main/VALIDATION.md) 为准。

目前提供 Windows x64 便携版。遇到问题或有功能建议，欢迎在 [GitHub Issues](https://github.com/KaMuMom/LDFCL/issues) 反馈，并附上版本、操作步骤与错误信息。

项目代码、依赖来源和相关致谢见 [CREDITS.md](https://github.com/KaMuMom/LDFCL/blob/main/CREDITS.md)。后续更新会继续发布在 [LDFCL 仓库](https://github.com/KaMuMom/LDFCL)和[发行页](https://github.com/KaMuMom/LDFCL/releases/latest)。
