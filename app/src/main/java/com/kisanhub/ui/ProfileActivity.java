package com.kisanhub.ui;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import com.kisanhub.R;
import com.kisanhub.db.DatabaseHelper;

public class ProfileActivity extends AppCompatActivity {

    TextView summaryText;
    DatabaseHelper dbHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        summaryText = findViewById(R.id.summaryText);
        dbHelper = new DatabaseHelper(this);

        loadSummary();
    }

    private void loadSummary() {
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Cursor c = db.rawQuery("SELECT type, SUM(amount) as total FROM transactions GROUP BY type", null);

        double income = 0, expense = 0;
        while (c.moveToNext()) {
            if ("income".equalsIgnoreCase(c.getString(0))) {
                income = c.getDouble(1);
            } else {
                expense = c.getDouble(1);
            }
        }
        c.close();

        double profit = income - expense;
        summaryText.setText("Income: " + income + "\nExpense: " + expense + "\nProfit/Loss: " + profit);
    }
}
