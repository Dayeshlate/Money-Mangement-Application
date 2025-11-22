import React, { useEffect, useState } from "react";
import Input from "./Input";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINT } from "../util/apiEndpoints";
import { toast } from "react-hot-toast";

function AddIncomeForm({ onAddIncome }) {

  const [income, setIncome] = useState({
    amount: "",
    description: "",
    date: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);

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

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  const handleSubmit = () => {
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
        options={categories.map((cat) => ({
          value: cat.id,
          label: cat.name,
        }))}
      />

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
