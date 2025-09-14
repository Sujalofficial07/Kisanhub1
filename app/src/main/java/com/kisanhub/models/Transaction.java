package com.kisanhub.models;

public class Transaction {
    public int id;
    public int farmId;
    public String type; // "income" or "expense"
    public double amount;
    public String description;
}
