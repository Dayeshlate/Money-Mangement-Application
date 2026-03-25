import React, { useState } from "react";
import Input from "./Input";
import { toast } from "react-hot-toast";

function AddIncomeForm({ onAddIncome, categories = [] }) {

  const [income, setIncome] = useState({
    amount: "",
    description: "",
    date: "",
    categoryId: "",
  });

  const incomeCategories = categories.filter(
    (cat) => (cat.type || "").toLowerCase() === "income"
  );
  const selectableCategories = incomeCategories.length > 0 ? incomeCategories : categories;
  const hasCategories = selectableCategories.length > 0;

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  const handleSubmit = () => {
    if (!hasCategories) {
      toast.error("No category found. Please add a category first.");
      return;
    }

    if (!income.amount || !income.categoryId) {
      toast.error("Amount and Category are required");
      return;
    }

    onAddIncome(income);

    setIncome({
      amount: "",
      description: "",
      date: "",
      categoryId: "",
    });
  };

  return (
    <div className="p-4">

      <Input
        label="Amount"
        value={income.amount}
        placeholder="Enter amount"
        type="number"
        onChange={(e) => handleChange("amount", e.target.value)}
      />

      <Input
        label="Description"
        value={income.description}
        placeholder="Optional"
        type="text"
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <Input
        label="Date"
        value={income.date}
        type="date"
        onChange={(e) => handleChange("date", e.target.value)}
      />

      <Input
        label="Category"
        isSelect={true}
        value={income.categoryId}
        onChange={(e) => handleChange("categoryId", e.target.value)}
        options={selectableCategories.map((cat) => ({
          value: cat.id,
          label: cat.name,
        }))}
      />

      {!hasCategories && (
        <p className="text-sm text-red-600 mt-2">
          No categories available. Add category from Category page first.
        </p>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-purple-600 text-white w-full py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition"
      >
        Save Income
      </button>

    </div>
  );
}

export default AddIncomeForm;
