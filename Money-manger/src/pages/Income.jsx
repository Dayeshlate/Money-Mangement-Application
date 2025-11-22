import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import { Plus } from "lucide-react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINT } from "../util/apiEndpoints";
import { toast } from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Model from "../components/Model";
import AddIncomeForm from "../components/AddIncomeForm";

function Income() {

  useUser();

  const [loading, setLoading] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncome = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINT.GET_ALL_INCOME);
      if (response.status === 200) {
        setIncomeData(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch incomes");
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const handleAddIncome = async (income) => {
    try {
      await axiosConfig.post(API_ENDPOINT.CREATE_INCOME, income);
      toast.success("Income added");
      fetchIncome();
      setOpenAddIncomeModal(false);
    } catch (error) {
      toast.error("Failed to add income");
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINT.DELETE_INCOME + id);
      toast.success("Income deleted");
      fetchIncome();
    } catch (error) {
      toast.error("Failed to delete income");
    }
  };

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">

        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-semibold">All Incomes</h2>

          <button
            className="flex add-btn items-center gap-1"
            onClick={() => setOpenAddIncomeModal(true)}
          >
            <Plus size={15} />
            Add Income
          </button>
        </div>

        <IncomeList incomes={incomeData} onDelete={handleDeleteIncome} />

        <Model
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add New Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Model>

      </div>
    </Dashboard>
  );
}

export default Income;
