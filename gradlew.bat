@echo off
set DIR=%~dp0

if exist "%JAVA_HOME%\bin\java.exe" (
  set JAVA_EXE=%JAVA_HOME%\bin\java.exe
) else (
  set JAVA_EXE=java
)

"%JAVA_EXE%" -Xmx64m -Xms64m -cp "%DIR%gradle\wrapper\gradle-wrapper.jar" org.gradle.wrapper.GradleWrapperMain %*
