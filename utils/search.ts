import { DataType } from "@/components/common/DataTable";

const searchData = ({
  searchTerm,
  filteredData,
  fields,
}: {
  searchTerm: string;
  filteredData: DataType[];
  fields: { field1: string; field2?: string | any; field3?: string | any };
}) => {
  if (searchTerm) {
    filteredData = filteredData.filter(
      (data: any) =>
        data[fields?.field1]
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(searchTerm.toLowerCase().replaceAll(" ", "")) ||
        data[fields?.field2]
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(searchTerm.toLowerCase().replaceAll(" ", "")) ||
        data[fields?.field3]
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(searchTerm.toLowerCase().replaceAll(" ", ""))
    );
  }

  return filteredData;
};

export default searchData;
