import { create } from "zustand";
import { fetchCategories } from "@/lib/api/category";

export type CategoryType = "income" | "expense";

export interface Category {
  _id: string;
  name: string;
}

export interface CategoriesState {
  incomeCategories: Category[];
  expenseCategories: Category[];
  isLoaded: boolean;
  isLoading: boolean;
  loadCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  incomeCategories: [],
  expenseCategories: [],
  isLoaded: false,
  isLoading: false,

  loadCategories: async () => {
    const state = get();
    if (state.isLoaded || state.isLoading) return;

    set({ isLoading: true });

    try {
      const [income, expense] = await Promise.all([
        fetchCategories({ type: "income" }),
        fetchCategories({ type: "expense" }),
      ]);

      set({
        incomeCategories: income,
        expenseCategories: expense,
        isLoaded: true,
        isLoading: false,
      });
    } catch (e) {
      set({ isLoading: false });
      console.error("Failed to load categories", e);
    }
  },
}));
