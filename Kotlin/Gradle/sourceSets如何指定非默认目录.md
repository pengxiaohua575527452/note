# build.gradle.kts

```kotlin
kotlin{
  js(IR){
    browser{
      sourceSets{
        val jsMain by getting{
          resources.srcDir("src/browserMain")
        }
      }
    }
  }
}
```
- resources.srcDir("src/folername")