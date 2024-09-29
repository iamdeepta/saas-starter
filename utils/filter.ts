import { DataType } from "@/components/common/DataTable";

const filterByTag = ({
  selectedData,
  filteredData,
  mainData,
}: {
  selectedData: string;
  filteredData: DataType[];
  mainData: DataType[];
}) => {
  if (selectedData) {
    if (selectedData === "all") {
      filteredData = [...mainData];
    } else {
      filteredData = filteredData?.filter((data: DataType) =>
        data.tags.some((item) => selectedData.includes(item))
      );
    }
  }

  return filteredData;
};

export default filterByTag;
