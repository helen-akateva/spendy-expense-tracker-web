import Modal from "@/components/Modal/Modal";
import TransactionForm, {
  TransactionFormValues,
} from "@/components/TransactionForm/TransactionForm";

import css from "./ModalEditTransaction.module.css";
import CancelButton from "../CancelButton/CancelButton";
import { useFinanceStore } from "@/lib/stores/financeStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransaction } from "@/lib/api/transactions";
import toast from "react-hot-toast";

interface Props {
  transaction: {
    _id: string;
    type: "income" | "expense";
    amount: number;
    date: string;
    category: { _id: string; name: string };
    comment?: string;
  };
  onClose: () => void;
}

export default function ModalEditTransaction({ transaction, onClose }: Props) {
  const queryClient = useQueryClient();
  const updateBalance = useFinanceStore((s) => s.updateBalance);

  const initialValues: TransactionFormValues = {
    type: transaction.type,
    amount: transaction.amount,
    date: new Date(transaction.date),
    categoryId: transaction.category._id,
    comment: transaction.comment ?? "",
  };

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TransactionFormValues }) =>
      updateTransaction(id, {
        ...data,
        date: data.date.toISOString().split("T")[0],
      }),
    onSuccess: (updatedTransaction, variables) => {
      const oldIsIncome = transaction.type === "income";
      updateBalance(transaction.amount, !oldIsIncome);

      const newIsIncome = variables.data.type === "income";
      updateBalance(variables.data.amount, newIsIncome);

      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      toast.success("Transaction updated successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to update transaction");
    },
  });

  const handleSubmit = async (values: TransactionFormValues) => {
    await mutation.mutateAsync({ id: transaction._id, data: values });
  };

  return (
    <Modal onClose={onClose} showCloseButton>
      <h2 className={css.h2}>Edit transaction</h2>

      <TransactionForm
        initialValues={initialValues}
        submitText="Save"
        onSubmit={handleSubmit}
      />

      <CancelButton onClick={onClose} />
    </Modal>
  );
}
