// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="introduction.html">简介</a></li><li class="chapter-item expanded "><a href="syntax-extensions.html"><strong aria-hidden="true">1.</strong> 语法拓展</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="syntax-extensions/source-analysis.html"><strong aria-hidden="true">1.1.</strong> 源代码分析</a></li><li class="chapter-item expanded "><a href="syntax-extensions/ast.html"><strong aria-hidden="true">1.2.</strong> AST 中的宏</a></li><li class="chapter-item expanded "><a href="syntax-extensions/expansion.html"><strong aria-hidden="true">1.3.</strong> 宏展开</a></li><li class="chapter-item expanded "><a href="syntax-extensions/hygiene.html"><strong aria-hidden="true">1.4.</strong> 卫生性</a></li><li class="chapter-item expanded "><a href="syntax-extensions/debugging.html"><strong aria-hidden="true">1.5.</strong> 调试</a></li></ol></li><li class="chapter-item expanded "><a href="decl-macros.html"><strong aria-hidden="true">2.</strong> 声明宏</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="decl-macros/macros-methodical.html"><strong aria-hidden="true">2.1.</strong> 思路</a></li><li class="chapter-item expanded "><a href="decl-macros/macros-practical.html"><strong aria-hidden="true">2.2.</strong> 实战</a></li><li class="chapter-item expanded "><a href="decl-macros/minutiae.html"><strong aria-hidden="true">2.3.</strong> 细节</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="decl-macros/minutiae/fragment-specifiers.html"><strong aria-hidden="true">2.3.1.</strong> 片段分类符</a></li><li class="chapter-item expanded "><a href="decl-macros/minutiae/metavar-and-expansion.html"><strong aria-hidden="true">2.3.2.</strong> 再谈元变量与宏展开</a></li><li class="chapter-item expanded "><a href="decl-macros/minutiae/metavar-expr.html"><strong aria-hidden="true">2.3.3.</strong> 元变量表达式</a></li><li class="chapter-item expanded "><a href="decl-macros/minutiae/hygiene.html"><strong aria-hidden="true">2.3.4.</strong> 宏是部分“卫生的”</a></li><li class="chapter-item expanded "><a href="decl-macros/minutiae/identifiers.html"><strong aria-hidden="true">2.3.5.</strong> 非标识符的“标识符”</a></li><li class="chapter-item expanded "><a href="decl-macros/minutiae/debugging.html"><strong aria-hidden="true">2.3.6.</strong> 调试</a></li><li class="chapter-item expanded "><a href="decl-macros/minutiae/scoping.html"><strong aria-hidden="true">2.3.7.</strong> 作用域</a></li><li class="chapter-item expanded "><a href="decl-macros/minutiae/import-export.html"><strong aria-hidden="true">2.3.8.</strong> 导入/导出宏</a></li><li class="chapter-item expanded "><a href="decl-macros/macros2.html"><strong aria-hidden="true">2.3.9.</strong> macro 2.0</a></li></ol></li><li class="chapter-item expanded "><a href="decl-macros/patterns.html"><strong aria-hidden="true">2.4.</strong> 模式</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="decl-macros/patterns/callbacks.html"><strong aria-hidden="true">2.4.1.</strong> 回调</a></li><li class="chapter-item expanded "><a href="decl-macros/patterns/tt-muncher.html"><strong aria-hidden="true">2.4.2.</strong> tt “撕咬机“</a></li><li class="chapter-item expanded "><a href="decl-macros/patterns/internal-rules.html"><strong aria-hidden="true">2.4.3.</strong> 内用规则</a></li><li class="chapter-item expanded "><a href="decl-macros/patterns/push-down-acc.html"><strong aria-hidden="true">2.4.4.</strong> 下推累积</a></li><li class="chapter-item expanded "><a href="decl-macros/patterns/repetition-replacement.html"><strong aria-hidden="true">2.4.5.</strong> 反复替换</a></li><li class="chapter-item expanded "><a href="decl-macros/patterns/tt-bundling.html"><strong aria-hidden="true">2.4.6.</strong> tt 捆绑</a></li></ol></li><li class="chapter-item expanded "><a href="decl-macros/building-blocks.html"><strong aria-hidden="true">2.5.</strong> 构件</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="decl-macros/building-blocks/ast-coercion.html"><strong aria-hidden="true">2.5.1.</strong> AST 强制转换</a></li><li class="chapter-item expanded "><a href="decl-macros/building-blocks/counting.html"><strong aria-hidden="true">2.5.2.</strong> 计数</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="decl-macros/building-blocks/abacus-counting.html"><strong aria-hidden="true">2.5.2.1.</strong> 算盘计数</a></li></ol></li><li class="chapter-item expanded "><a href="decl-macros/building-blocks/parsing.html"><strong aria-hidden="true">2.5.3.</strong> 解析</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="proc-macros.html"><strong aria-hidden="true">3.</strong> 过程宏</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="proc-macros/methodical.html"><strong aria-hidden="true">3.1.</strong> 思路</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="proc-macros/methodical/function-like.html"><strong aria-hidden="true">3.1.1.</strong> 函数式</a></li><li class="chapter-item expanded "><a href="proc-macros/methodical/attr.html"><strong aria-hidden="true">3.1.2.</strong> 属性式</a></li><li class="chapter-item expanded "><a href="proc-macros/methodical/derive.html"><strong aria-hidden="true">3.1.3.</strong> derive 式</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.2.</strong> 实战</div></li><li class="chapter-item expanded "><a href="proc-macros/third-party-crates.html"><strong aria-hidden="true">3.3.</strong> 第三方 crates</a></li><li class="chapter-item expanded "><a href="proc-macros/hygiene.html"><strong aria-hidden="true">3.4.</strong> 卫生性和 Span</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.5.</strong> 技巧</div></li></ol></li><li class="chapter-item expanded "><a href="translation_statement.html">翻译说明</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
