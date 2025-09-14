package com.kisanhub.ui;

import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.kisanhub.R;
import com.kisanhub.db.DatabaseHelper;

public class AuthActivity extends AppCompatActivity {

    EditText usernameInput, passwordInput;
    Button loginBtn, signupBtn;
    DatabaseHelper dbHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_auth);

        usernameInput = findViewById(R.id.username);
        passwordInput = findViewById(R.id.password);
        loginBtn = findViewById(R.id.loginBtn);
        signupBtn = findViewById(R.id.signupBtn);

        dbHelper = new DatabaseHelper(this);

        loginBtn.setOnClickListener(v -> loginUser());
        signupBtn.setOnClickListener(v -> signupUser());
    }

    private void signupUser() {
        String user = usernameInput.getText().toString();
        String pass = passwordInput.getText().toString();

        SQLiteDatabase db = dbHelper.getWritableDatabase();
        db.execSQL("INSERT INTO users (username, password) VALUES (?, ?)", new Object[]{user, pass});
        Toast.makeText(this, "Signup successful", Toast.LENGTH_SHORT).show();
    }

    private void loginUser() {
        String user = usernameInput.getText().toString();
        String pass = passwordInput.getText().toString();

        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Cursor c = db.rawQuery("SELECT * FROM users WHERE username=? AND password=?", new String[]{user, pass});

        if (c.moveToFirst()) {
            Toast.makeText(this, "Login successful", Toast.LENGTH_SHORT).show();
            Intent i = new Intent(this, HomeActivity.class);
            startActivity(i);
        } else {
            Toast.makeText(this, "Invalid credentials", Toast.LENGTH_SHORT).show();
        }
        c.close();
    }
}
