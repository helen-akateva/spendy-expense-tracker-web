import css from "./TransactionsItem.module.css";
import Tooltip from "../Tooltip/Tooltip";
import { GoPencil } from "react-icons/go";
import { ModalType } from "@/app/(dashboard)/transactions/page";
import { Transaction } from "@/lib/api/transactions";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Loader } from "@/components/Loader/Loader";

interface Props {
  setModalType: (value: ModalType) => void;
  setSelectedTransaction: (value: Transaction | null) => void;
  data: Transaction[];
  isLoading: boolean;
}

const TransactionItem = ({
  setModalType,
  setSelectedTransaction,
  data,
  isLoading,
}: Props) => {
  const isMobile = useMediaQuery("(max-width: 767.9px)");

  if (data.length === 0) {
    if (isLoading) {
      return (
        <div className={css.loaderContainer}>
          <Loader />
        </div>
      );
    }
    return (
      <div className={css.transactionPage}>
        {/* MOBILE EMPTY STATE */}
        {isMobile && (
          <div className={css.emptyStateMobileWrapper}>
            <p className={css.emptyStateText}>No transactions found</p>
            <p className={css.emptyStateSubText}>Add your first transaction!</p>
          </div>
        )}

        {/* DESKTOP EMPTY STATE (Table with message) */}
        {!isMobile && (
          <table className={`${css.transactionTable} ${css.scroll}`}>
            <thead className={css.thead}>
              <tr className={css.tr}>
                <th className={css.th}>Date</th>
                <th className={css.th}>Type</th>
                <th className={css.th}>Category</th>
                <th className={css.th}>Comment</th>
                <th className={css.th}>Sum</th>
                <th className={css.th}>Edit</th>
                <th className={css.th}>Delete</th>
              </tr>
            </thead>
            <tbody className={css.tbodyEmpty}>
              <tr className={css.trEmpty}>
                <td colSpan={7} className={css.tdEmpty}>
                  <div className={css.emptyStateWrapperDesktop}>
                    <p className={css.emptyStateText}>No transactions found</p>
                    <p className={css.emptyStateSubText}>Add your first transaction!</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        <button className={css.button} onClick={() => setModalType("add")}>
          <svg className={css.icon} width="25" height="25">
            <use href="/sprite.svg#icon-plus" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className={css.transactionPage}>
      {/* MOBILE */}
      {isMobile &&
        data.map((item) => {
          const { _id, date, type, category, comment, amount } = item;

          return (
            <div className={css.tableWrapper} key={_id}>
              <table
                className={`${css.transactionTable} ${type === "income" ? css.greenBefore : ""
                  }`}
              >
                <thead className={css.thead}>
                  <tr className={css.tr}>
                    <th className={css.th}>Date</th>
                    <th className={css.th}>Type</th>
                    <th className={css.th}>Category</th>
                    <th className={css.th}>Comment</th>
                    <th className={css.th}>Sum</th>

                    <th className={`${css.th} ${css.deleteCol}`}>
                      <button
                        className={css.btnDelete}
                        onClick={() => {
                          setSelectedTransaction(item);
                          setModalType("delete");
                        }}
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                </thead>

                <tbody className={`${css.tbody} ${css.mobileTd}`}>
                  <tr className={`${css.tr} ${css.valueTr}`}>
                    <td className={css.td}>{date}</td>
                    <td className={css.td}>{type === "income" ? "+" : "-"}</td>
                    <td className={css.td}>{category.name}</td>
                    <td className={css.td}>
                      <Tooltip content={comment || ""}>
                        <div className={css.comment}>{comment}</div>
                      </Tooltip>
                    </td>
                    <td
                      className={css.td}
                      style={{
                        color: type === "income" ? "#24cca7" : "yellow",
                      }}
                    >
                      {amount}
                    </td>

                    <td className={`${css.td} ${css.editTd}`}>
                      <p
                        onClick={() => {
                          setSelectedTransaction(item);
                          setModalType("edit");
                        }}
                      >
                        <GoPencil className={css.editIcon} /> Edit
                      </p>
                    </td>

                    <td
                      className={`${css.td} ${css.deleteCol} ${css.tabletBtnDelete}`}
                    >
                      <button
                        className={css.btnDelete}
                        onClick={() => {
                          setSelectedTransaction(item);
                          setModalType("delete");
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}

      {/* ADD BUTTON */}
      <button className={css.button} onClick={() => setModalType("add")}>
        <svg className={css.icon} width="25" height="25">
          <use href="/sprite.svg#icon-plus" />
        </svg>
      </button>

      {/* DESKTOP */}
      {!isMobile && (
        <table className={`${css.transactionTable} ${css.scroll}`}>
          <thead className={css.thead}>
            <tr className={css.tr}>
              <th className={css.th}>Date</th>
              <th className={css.th}>Type</th>
              <th className={css.th}>Category</th>
              <th className={css.th}>Comment</th>
              <th className={css.th}>Sum</th>
              <th className={css.th}>Edit</th>
              <th className={css.th}>Delete</th>
            </tr>
          </thead>

          <tbody className={`${css.tbody} ${css.desktopTd}`}>
            {data.map((item) => {
              const { _id, date, type, category, comment, amount } = item;

              return (
                <tr key={_id} className={`${css.tr} ${css.valueTr}`}>
                  <td className={css.td}>{date}</td>
                  <td className={css.td}>{type === "income" ? "+" : "-"}</td>
                  <td className={css.td}>{category.name}</td>
                  <td className={css.td}>
                    <Tooltip content={comment || ""}>
                      <div className={css.comment}>{comment}</div>
                    </Tooltip>
                  </td>
                  <td className={css.td}>{amount}</td>

                  <td className={`${css.td} ${css.editTd}`}>
                    <p
                      onClick={() => {
                        setSelectedTransaction(item);
                        setModalType("edit");
                      }}
                    >
                      <GoPencil className={css.editIcon} />
                    </p>
                  </td>

                  <td className={`${css.td} ${css.deleteCol}`}>
                    <button
                      className={css.btnDelete}
                      onClick={() => {
                        setSelectedTransaction(item);
                        setModalType("delete");
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionItem;
