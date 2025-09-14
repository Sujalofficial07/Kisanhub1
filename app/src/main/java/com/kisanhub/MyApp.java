package com.kisanhub;

import android.app.Application;
import android.util.Log;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class MyApp extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        Thread.setDefaultUncaughtExceptionHandler((thread, e) -> {
            try {
                File dir = getExternalFilesDir(null); // /storage/emulated/0/Android/data/com.kisanhub/files
                if (dir != null) {
                    File logFile = new File(dir, "crash_log.txt");
                    FileWriter writer = new FileWriter(logFile, true);
                    writer.write(Log.getStackTraceString(e));
                    writer.write("\n----------------------\n");
                    writer.close();
                }
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        });
    }
}
