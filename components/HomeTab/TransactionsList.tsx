import { ModalType } from "@/app/(dashboard)/transactions/page";
import TransactionsItem from "./TransactionsItem";
import { Transaction } from "@/lib/api/transactions";

interface Props {
  setModalType: (value: ModalType) => void;
  setSelectedTransaction: (value: Transaction | null) => void;
  data: Transaction[];
  isLoading: boolean;
}

const TransactionsList = ({
  setModalType,
  setSelectedTransaction,
  data,
  isLoading,
}: Props) => {
  return (
    <TransactionsItem
      data={data}
      isLoading={isLoading}
      setModalType={setModalType}
      setSelectedTransaction={setSelectedTransaction}
    />
  );
};

export default TransactionsList;
