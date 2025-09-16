import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function generateSKU(name, category) {
  const nameCode = name.substring(0, 3).toUpperCase();
  const catCode = category?.substring(0, 2).toUpperCase() || "GN";
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${nameCode}-${catCode}-${random}`;
}
