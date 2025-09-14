package com.kisanhub.ui;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;
import com.kisanhub.R;

public class FarmDetailsActivity extends AppCompatActivity {

    Button addTransactionBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_farm_details);

        addTransactionBtn = findViewById(R.id.addTransactionBtn);
        addTransactionBtn.setOnClickListener(v -> {
            startActivity(new Intent(this, AddTransactionActivity.class));
        });
    }
}
