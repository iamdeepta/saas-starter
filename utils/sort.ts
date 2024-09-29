import { DataType } from "@/components/common/DataTable";
import { SorterResult } from "antd/es/table/interface";

const sortByOrder = ({
  sortOrder,
  filteredData,
}: {
  sortOrder: SorterResult<DataType> | SorterResult<DataType>[] | undefined;
  filteredData: DataType[];
}) => {
  if (sortOrder) {
    const { field, order }: any = sortOrder;
    filteredData.sort((a: any, b: any) => {
      if (order === "ascend") {
        return a[field].localeCompare(b[field]);
      }
      if (order === "descend") {
        return b[field].localeCompare(a[field]);
      }

      return 0;
    });
  }
};

export default sortByOrder;
