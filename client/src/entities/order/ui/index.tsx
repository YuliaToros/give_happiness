import React, { useEffect } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { createStyles } from "antd-style";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { getAllOrders } from "../model/orderThunk";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

// изменить типизацию
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Номер заказа",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Дата",
    dataIndex: "age",
    width: 150,
  },
  {
    title: "Сертификат",
    dataIndex: "address",
  },
  {
    title: "Сумма заказа",
    dataIndex: "address",
  }
];

export const PurchaseHistoryTable: React.FC = () => {
  const { styles } = useStyle();
  const dispatch = useAppDispatch();
  const { orders} = useAppSelector(state => state.orders);

  console.log(orders, '<<<<<<<');
  useEffect(() => {
    dispatch(getAllOrders());
}, [dispatch]);

// const dataSource = orders.map<OrderType>((el, i) => ({
//   key: i,
//   order_id: el.id,
//   sum: el.sum,
// }));

  return (
    <Table<DataType>
      className={styles.customTable}
      columns={columns}
      // dataSource={dataSource}
      pagination={{ pageSize: 25 }}
      scroll={{ y: 55 * 5 }}
    />
  );
};
