#!/bin/sh

DIR="$( cd "$( dirname "$0" )" && pwd )"

# Find Java
if [ -n "$JAVA_HOME" ] ; then
    JAVA_EXE="$JAVA_HOME/bin/java"
else
    JAVA_EXE="java"
fi

exec "$JAVA_EXE" -Xmx64m -Xms64m \
     -cp "$DIR/gradle/wrapper/gradle-wrapper.jar" \
     org.gradle.wrapper.GradleWrapperMain "$@"
