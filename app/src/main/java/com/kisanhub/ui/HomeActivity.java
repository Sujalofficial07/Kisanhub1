package com.kisanhub.ui;

import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;
import com.kisanhub.R;
import com.kisanhub.db.DatabaseHelper;

public class HomeActivity extends AppCompatActivity {

    Button addFarmBtn, profileBtn;
    DatabaseHelper dbHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        addFarmBtn = findViewById(R.id.addFarmBtn);
        profileBtn = findViewById(R.id.profileBtn);
        dbHelper = new DatabaseHelper(this);

        addFarmBtn.setOnClickListener(v -> {
            startActivity(new Intent(this, FarmDetailsActivity.class));
        });

        profileBtn.setOnClickListener(v -> {
            startActivity(new Intent(this, ProfileActivity.class));
        });
    }
}
