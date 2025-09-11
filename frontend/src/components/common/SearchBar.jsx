import React from "react";
import { Input } from "@/components/ui/input";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="w-full">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
      />
    </div>
  );
};

export default SearchBar;
