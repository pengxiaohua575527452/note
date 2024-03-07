# 概述
- 向Gradle任务中添加 kotlin browser 任务
- 已实现对kotlin代码的运行打包等操作


# build.gradle.kts
```kotlin
plugins {
    kotlin("multiplatform")
}

repositories {
    mavenCentral()
}

kotlin {
    js(IR){
        browser{
            binaries.executable()
            sourceSets{
                val jsMain by getting{
                    resources.srcDir("src/browserMain")
                }
            }
        }
    }
}

```
- binares.executable() 的执行会生成 kotlin browser 任务