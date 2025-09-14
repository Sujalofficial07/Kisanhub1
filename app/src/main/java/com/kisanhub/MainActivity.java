package com.kisanhub;

import android.os.Bundle;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null); // RN apps ke liye null dena zaruri hota hai
    }

    @Override
    protected String getMainComponentName() {
        // Yeh name React Native app ko batata hai ki kaunsa component load karna hai
        return "KisanHub";
    }
}
