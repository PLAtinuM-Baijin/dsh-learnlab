第三方组件声明
================

本项目的客户端产物 client.js 由 src/ 打包生成，其中包含以下第三方代码：

1. lucide-react
   - 许可证：ISC
   - 版权：(c) Lucide Contributors
   - 用途：界面图标
   - 项目主页：https://github.com/lucide-icons/lucide

   ISC 许可证全文：

   Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022
   as part of Feather (MIT). All other copyright (c) for Lucide are held by
   Lucide Contributors 2022.

   Permission to use, copy, modify, and/or distribute this software for any
   purpose with or without fee is hereby granted, provided that the above
   copyright notice and this permission notice appear in all copies.

   THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

2. esbuild
   - 许可证：MIT
   - 用途：仅构建时使用，不进入发布产物
   - 项目主页：https://github.com/evanw/esbuild

3. React
   - 许可证：MIT
   - 说明：不打包，运行时由 DSH 宿主提供（构建时标记为 external）
   - 项目主页：https://github.com/facebook/react
