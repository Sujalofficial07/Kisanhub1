package com.kisanhub.ui;

import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.kisanhub.R;
import com.kisanhub.db.DatabaseHelper;

public class AddTransactionActivity extends AppCompatActivity {

    EditText typeInput, amountInput, descInput;
    Button saveBtn;
    DatabaseHelper dbHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_transaction);

        typeInput = findViewById(R.id.typeInput);
        amountInput = findViewById(R.id.amountInput);
        descInput = findViewById(R.id.descInput);
        saveBtn = findViewById(R.id.saveBtn);
        dbHelper = new DatabaseHelper(this);

        saveBtn.setOnClickListener(v -> {
            String type = typeInput.getText().toString();
            double amount = Double.parseDouble(amountInput.getText().toString());
            String desc = descInput.getText().toString();

            SQLiteDatabase db = dbHelper.getWritableDatabase();
            db.execSQL("INSERT INTO transactions (farm_id, type, amount, description) VALUES (?, ?, ?, ?)",
                    new Object[]{1, type, amount, desc}); // farm_id=1 demo
            Toast.makeText(this, "Transaction saved", Toast.LENGTH_SHORT).show();
        });
    }
}
