# 概述
- 在 Gradle 面板中添加 kotlin node 任务
- 用来运行 main 函数


# build.gradle.kts 配置
```kotlin
kotlin {
    js(IR){
        useCommonJs()
        nodejs{
            binaries.executable()
        }
    }
}
```

- binaries.executable() 调用会注册 kotlin node 任务