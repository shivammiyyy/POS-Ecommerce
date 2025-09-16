import { createContext, useContext, useState } from "react";
import {
  createRefund,
  getAllRefunds,
  getRefundsByCashier,
  getRefundsByBranch,
  getRefundsByShiftReport,
  getRefundById,
  deleteRefund,
  getRefundByCashierAndDateRange,
} from "../api/refunds";

const RefundContext = createContext();

export const RefundProvider = ({ children }) => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addRefund = async (refundData) => {
    const newRefund = await createRefund(refundData);
    setRefunds((prev) => [newRefund, ...prev]);
    return newRefund;
  };

  const fetchAllRefunds = async () => {
    setLoading(true);
    try {
      const data = await getAllRefunds();
      setRefunds(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const fetchRefundsByCashier = async (cashierId) => {
    setLoading(true);
    try {
      const data = await getRefundsByCashier(cashierId);
      setRefunds(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const fetchRefundsByBranch = async (branchId) => {
    setLoading(true);
    try {
      const data = await getRefundsByBranch(branchId);
      setRefunds(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const fetchRefundsByShiftReport = async (shiftReportId) => {
    return await getRefundsByShiftReport(shiftReportId);
  };

  const fetchRefundById = async (id) => {
    return await getRefundById(id);
  };

  const removeRefund = async (id) => {
    await deleteRefund(id);
    setRefunds((prev) => prev.filter((r) => r.id !== id));
  };

  const fetchRefundsByCashierAndDateRange = async (cashierId, startDate, endDate) => {
    return await getRefundByCashierAndDateRange(cashierId, startDate, endDate);
  };

  return (
    <RefundContext.Provider
      value={{
        refunds,
        loading,
        error,
        addRefund,
        fetchAllRefunds,
        fetchRefundsByCashier,
        fetchRefundsByBranch,
        fetchRefundsByShiftReport,
        fetchRefundById,
        removeRefund,
        fetchRefundsByCashierAndDateRange,
      }}
    >
      {children}
    </RefundContext.Provider>
  );
};

export const useRefunds = () => {
  const context = useContext(RefundContext);
  if (!context) throw new Error("useRefunds must be used within RefundProvider");
  return context;
};
