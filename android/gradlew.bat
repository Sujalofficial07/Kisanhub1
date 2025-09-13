@echo off
set DIR=%~dp0
set GRADLE_WRAPPER_JAR=%DIR%\gradle\wrapper\gradle-wrapper.jar

java -Xmx64m -cp "%GRADLE_WRAPPER_JAR%" org.gradle.wrapper.GradleWrapperMain %*
