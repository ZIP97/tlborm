# AST 中的宏

> 译者注：牢记“宏”是声明宏和过程宏的统称，而“宏”只是一种“语法拓展”。AST 中的宏其实围绕着标记树。

如前所述，在 Rust 中，宏处理发生**在 AST 生成之后**。因此，调用宏的语法**必须**符合 
Rust 语法的一部分。

实际上，Rust 语法包含数种“语法扩展”的形式。具体来说有以下四种（顺便给出例子）：

1. `# [ $arg ]` 形式：比如 `#[derive(Clone)]`, `#[no_mangle]`, …
1. `# ! [ $arg ]` 形式：比如 `#![allow(dead_code)]`, `#![crate_name="blang"]`, …
1. `$name ! $arg` 形式：比如 `println!("Hi!")`, `concat!("a", "b")`, …
1. `$name ! $arg0 $arg1` 形式：比如 `macro_rules! dummy { () => {}; }`.

头两种形式被称作“属性” ([attributes])。属性用来给条目 (items) 、表达式、语句加上注解。属性有三类：
- 内置的属性 ([built-in attributes])
- 过程宏属性 ([proc-macro attributes])
- 派生属性 ([derive attributes])

内置的属性由编译器实现。过程宏属性和派生属性在 Rust 第二类宏系统 —— 过程宏 ([procedural macros]) —— 中实现。

我们感兴趣的是第 3 种：`$name ! $arg` —— 函数式 (function-like) 的宏。这种形式的宏可以通过
`macro_rules!`、 `macro` 和过程宏三种方式来使用（或者说定义）。

注意第 3 种形式的函数式宏是一种一般的语法拓展形式，并非仅用 `macro_rules!` 写出。
比如 [`format!`] 是一个 `macro_rules!` 宏，而用来实现 [`format!`] 的 [`format_args!`] 不是这里谈论的宏（因为它由编译器实现，是内置的属性）。

第四种形式本质上是宏的变种。其实，这种形式的唯一用例只有 `macro_rules!`。

所以，请将注意力集中到第 3 种形式 `$name ! $arg` 上，我们的问题变成，对于每种可能的语法扩展，
Rust 的语法解析器 (parser) 如何知道这里的 `$arg` 究竟长什么样？

答案是它**不需要**知道。其实，提供给语法扩展调用的参数只是**一棵**标记树 (token tree)。

具体来说，是一棵**非叶节点** (non-leaf) 的标记树：即 `(...)`、`[...]` 或 `{...}`。

知道这一点后，语法解析器如何理解如下调用形式，就变得显而易见了：

```rust,ignore
bitflags! {
    struct Color: u8 {
        const RED    = 0b0001,
        const GREEN  = 0b0010,
        const BLUE   = 0b0100,
        const BRIGHT = 0b1000,
    }
}

lazy_static! {
    static ref FIB_100: u32 = {
        fn fib(a: u32) -> u32 {
            match a {
                0 => 0,
                1 => 1,
                a => fib(a-1) + fib(a-2)
            }
        }

        fib(100)
    };
}

fn main() {
    use Color::*;
    let colors = vec![RED, GREEN, BLUE];
    println!("Hello, World!");
}
```

虽然上述调用**看起来**包含了各式各样的 Rust 代码，但对语法解析器来说，它们仅仅是堆无实际意义的标记树。

为了说明问题，我们把所有这些句法“黑盒”用 ⬚ 代替，仅剩下：

```text
bitflags! ⬚

lazy_static! ⬚

fn main() {
    let colors = vec! ⬚;
    println! ⬚;
}
```

再次重申，语法解析器对 ⬚ 不作任何假设；它记录黑盒所包含的标记，但并不尝试理解它们。

这意味着 ⬚ 可以是任何东西，甚至是无效的 Rust 语法。至于为什么这是好事，等会会谈到。

那么，这是否也适用于形式 1 和 2 中的 `$arg`，以及 4 中的两个参数的情况呢？
有点类似。形式 1 和 2 的 `$arg` 略有不同，因为它不是直接的标记树，而是后跟 `=`
标记加字符串表达式或标记树的**简单路径**。过程宏一章将更深入地探讨这一点。这里的重点是，该形式也使用标记树来描述输入。

第 4 种形式通常更特殊，它接受一种非常具体的语法，但这种语法也利用了标记树。这个形式下的具体情况在此处并不重要，
所以在涉及到它之前，暂时跳过它。

以下几点很重要：

* Rust 包含多种语法扩展。
* 当遇见形如 `$name! $arg` 的结构时，它可能是其它语法扩展，比如 `macro_rules!` 宏、过程宏甚至内置宏。
* 所有 `!` 宏（即第 3 种形式）的输入都是非叶节点的单个标记树。
* 语法扩展都将作为抽象语法树 (AST) 的**一部分**被解析。

最后一点最为重要，它带来了一些深远的影响。由于语法拓展将被解析进 AST
中，它们**只能**出现在那些明确支持它们出现的位置。具体来说，语法拓展能在如下位置出现：

* 模式 (pattern) 
* 语句 (statement) 
* 表达式 (expression)
* 条目 (item) （包括 `impl` 块）
* [类型][type-macros]

一些并不支持的位置包括：

* 标识符 (identifier)
* `match` 分支
* 结构体的字段

在上述第一个列表（支持的位置）之外，绝对没有任何地方有使用语法拓展的可能。

[type-macros]: https://rust-lang.github.io/rfcs/0873-type-macros.html


[attributes]: https://doc.rust-lang.org/reference/attributes.html
[built-in attributes]: https://doc.rust-lang.org/reference/attributes.html#built-in-attributes-index
[proc-macro attributes]: https://doc.rust-lang.org/reference/procedural-macros.html#attribute-macros
[derive attributes]: https://doc.rust-lang.org/reference/procedural-macros.html#derive-macro-helper-attributes
[procedural macros]: https://doc.rust-lang.org/reference/procedural-macros.html
[`format!`]: https://doc.rust-lang.org/std/macro.format.html
[`format_args!`]: https://doc.rust-lang.org/std/macro.format_args.html
