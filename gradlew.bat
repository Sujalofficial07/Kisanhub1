@ECHO OFF
@rem Gradle startup script for Windows

SET DIR=%~dp0
SET APP_HOME=%DIR%

SET CLASSPATH=%APP_HOME%\android\gradle\wrapper\gradle-wrapper.jar

IF NOT "%JAVA_HOME%"=="" (
  SET JAVA_EXE=%JAVA_HOME%\bin\java.exe
) ELSE (
  SET JAVA_EXE=java
)

"%JAVA_EXE%" -cp "%CLASSPATH%" org.gradle.wrapper.GradleWrapperMain %*
