import Modal from "@/components/Modal/Modal";
import TransactionForm, {
  TransactionFormValues,
} from "@/components/TransactionForm/TransactionForm";
import css from "./ModalAddTransaction.module.css";
import CancelButton from "../CancelButton/CancelButton";
import {
  addNewTransaction,
  NewTransactionData,
  Transaction,
} from "@/lib/api/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useFinanceStore } from "@/lib/stores/financeStore";

interface Props {
  onClose: () => void;
}

export default function ModalAddTransaction({ onClose }: Props) {
  const queryClient = useQueryClient();
  const updateBalance = useFinanceStore((s) => s.updateBalance);

  const mutation = useMutation<
    Transaction,
    { response?: { message?: string } },
    NewTransactionData
  >({
    mutationFn: addNewTransaction,
    onSuccess: (newTransaction) => {
      const isIncome = newTransaction.type === "income";
      updateBalance(Number(newTransaction.amount), isIncome);

      queryClient.setQueryData<Transaction[]>(["transactions"], (old = []) => [
        newTransaction,
        ...old,
      ]);

      toast.success("Transaction added successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to add transaction");
    },
  });

  const initialValues: TransactionFormValues = {
    type: "expense",
    amount: 0,
    date: new Date(),
    categoryId: "",
    comment: "",
  };

  const handleSubmit = async (values: TransactionFormValues) => {
    const payload = {
      ...values,
      date: values.date.toISOString().split("T")[0],
    };

    mutation.mutate(payload);
  };

  return (
    <Modal className={css.modal} onClose={onClose} showCloseButton>
      <h2 className={css.h2}>Add transaction</h2>
      <TransactionForm
        initialValues={initialValues}
        submitText={mutation.status === "pending" ? "Adding..." : "Add"}
        onSubmit={handleSubmit}
        disabled={mutation.status === "pending"}
      />

      <CancelButton onClick={onClose} />
    </Modal>
  );
}
