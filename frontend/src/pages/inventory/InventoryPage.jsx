import React, { useEffect } from "react";
import { useInventory } from "@/context/InventoryContext";
import InventoryTable from "../../components/inventory/InventoryTable";
import InventoryForm from "../../components/inventory/InventoryForm";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/common/FormModal";

const InventoryPage = () => {
  const { inventory, fetchInventory, showForm, setShowForm } = useInventory(); // ✅ fixed `inventory`

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <Button onClick={() => setShowForm(true)}>+ Add Item</Button>
      </div>

      <InventoryTable data={inventory} /> {/* ✅ fixed */}

      <FormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add Inventory Item"
      >
        <InventoryForm />
      </FormModal>
    </div>
  );
};

export default InventoryPage;
