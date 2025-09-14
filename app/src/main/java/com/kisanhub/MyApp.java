package com.kisanhub;

import android.app.Application;
import android.util.Log;
import java.io.FileWriter;
import java.io.IOException;

public class MyApp extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        Thread.setDefaultUncaughtExceptionHandler((thread, e) -> {
            try {
                // crash log file banayega internal storage me
                FileWriter writer = new FileWriter(getFilesDir() + "/crash_log.txt", true);
                writer.write(Log.getStackTraceString(e));
                writer.write("\n----------------------\n");
                writer.close();
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        });
    }
}
