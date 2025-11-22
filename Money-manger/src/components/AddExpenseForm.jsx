import React, { useEffect, useState } from "react";
import Input from "./Input";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINT } from "../util/apiEndpoints";
import { toast } from "react-hot-toast";

function AddExpenseForm({ onAddExpense }) {

  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    date: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);

  // Fetch categories list
  const fetchCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINT.GET_ALL_CATEGORIES);
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Update state on change
  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  // Save Expense
  const handleSubmit = () => {
    if (!expense.amount || !expense.categoryId) {
      toast.error("Amount and Category are required");
      return;
    }

    onAddExpense(expense); // send to parent

    // Reset form
    setExpense({
      amount: "",
      description: "",
      date: "",
      categoryId: "",
    });
  };

  return (
    <div className="p-4 space-y-4">

      <Input
        label="Amount"
        value={expense.amount}
        type="number"
        placeholder="Enter amount"
        onChange={(e) => handleChange("amount", e.target.value)}
      />

      <Input
        label="Description"
        value={expense.description}
        type="text"
        placeholder="Optional"
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <Input
        label="Date"
        value={expense.date}
        type="date"
        onChange={(e) => handleChange("date", e.target.value)}
      />

      <Input
        label="Category"
        isSelect={true}
        value={expense.categoryId}
        onChange={(e) => handleChange("categoryId", e.target.value)}
        options={categories.map((cat) => ({
          value: cat.id,
          label: cat.name,
        }))}
      />

      {/* ✅ Save Expense Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-purple-600 text-white w-full py-3 rounded-lg text-lg font-medium hover:bg-red-700 transition"
      >
        Save Expense
      </button>

    </div>
  );
}

export default AddExpenseForm;
