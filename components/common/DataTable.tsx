"use client";

import filterByTag from "@/utils/filter";
import searchData from "@/utils/search";
import sortByOrder from "@/utils/sort";
import {
  Flex,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  Tag,
} from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { Pencil, RotateCcw, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import SearchBlog from "../blog-posts/SearchBlog";
import SelectDropdown from "../ui/select";

interface ResponseType {
  data: {
    data: DataType[];
  };
  tags: {
    id: number;
    name: string;
  }[];
}

export interface DataType {
  id: number;
  title: string;
  slug: string;
  featureImage: string;
  state: string;
  tags: string[];
}

interface PaginationData {
  current: number;
  pageSize: number;
  total: number;
}

const DataTable = ({ data, tags }: ResponseType) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [blogData, setBlogData] = useState<DataType[]>(data?.data);
  const [filteredData, setFilteredData] = useState<DataType[]>(data?.data);
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    pageSize: 10,
    total: data?.data?.length,
  });
  const [sortOrder, setSortOrder] = useState<
    SorterResult<DataType> | SorterResult<DataType>[]
  >();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  let filtered: DataType[] = [...blogData];

  useEffect(() => {
    //filter by tag
    filtered = filterByTag({
      selectedData: selectedTag,
      filteredData: filtered,
      mainData: blogData,
    });

    //sort blogs
    sortByOrder({ sortOrder, filteredData: filtered });

    setFilteredData(filtered);
    setPagination((prev) => ({
      ...prev,
      total: filtered.length,
    }));
  }, [selectedTag, sortOrder]);

  const handleTableChange = (
    pagination: TablePaginationConfig | any,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[]
  ) => {
    //set pagination and sorting
    setPagination({
      ...pagination,
      current: pagination?.current,
      pageSize: pagination?.pageSize,
    });
    setSortOrder(sorter);
  };

  //input search term
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  //select tag
  const handleTagFilter = useCallback((tag: string) => {
    setSelectedTag(tag);
  }, []);

  //reload all data
  const refreshData = () => {
    setFilteredData(data?.data);
    setSearchTerm("");
    setSelectedTag("all");
    setPagination((prev) => ({
      current: 1,
      pageSize: 10,
      total: data?.data?.length,
    }));
  };

  //search form submission
  const handleOnSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      filtered = searchData({
        searchTerm,
        filteredData: filtered,
        fields: { field1: "title", field2: "slug", field3: "state" },
      });

      setFilteredData(filtered);
      setPagination((prev) => ({
        ...prev,
        current: 1,
        total: filtered.length,
      }));
    },
    [searchTerm]
  );

  //columns for blog data
  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      shouldCellUpdate: (prevRecord, nextRecord) =>
        prevRecord.id != nextRecord.id,
    },
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
      sorter: true,
      shouldCellUpdate: (prevRecord, nextRecord) =>
        prevRecord.title != nextRecord.title,
    },
    {
      title: "SLUG",
      dataIndex: "slug",
      key: "slug",
      sorter: true,
      shouldCellUpdate: (prevRecord, nextRecord) =>
        prevRecord.slug != nextRecord.slug,
    },
    {
      title: "FEATUREIMAGE",
      dataIndex: "featureImage",
      key: "featureImage",
      render: (featureImage) => (
        <>
          <Image
            src={featureImage}
            alt="blog image"
            width={50}
            height={50}
            className="rounded-md"
          />
        </>
      ),
      shouldCellUpdate: (prevRecord, nextRecord) =>
        prevRecord.featureImage != nextRecord.featureImage,
    },
    {
      title: "STATE",
      dataIndex: "state",
      key: "state",
      sorter: true,
      shouldCellUpdate: (prevRecord, nextRecord) =>
        prevRecord.state != nextRecord.state,
    },
    {
      title: "TAGS",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <>
          {tags?.map((tag: string) => {
            let color = tag === "Pending" ? "volcano" : "green";
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
      shouldCellUpdate: (prevRecord, nextRecord) =>
        prevRecord.tags?.join("") != nextRecord.tags?.join(""),
    },
    {
      title: "",
      dataIndex: "action",
      render: () => (
        <div className="flex gap-3">
          <Link href={"/dashboard/blog-posts"}>
            <Pencil size={16} className="text-green-500" />
          </Link>
          <Link href={"/dashboard/blog-posts"}>
            <Trash size={16} className="text-red-500" />
          </Link>
        </div>
      ),
    },
  ];

  //for multiple row selection
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="middle" vertical>
      <Flex>
        <p className="text-sm">{filteredData?.length} entries found</p>
        {data?.data?.length > filteredData?.length && (
          <RotateCcw
            className="ml-2 cursor-pointer"
            size={20}
            onClick={refreshData}
          />
        )}
        {/* filter by tag */}
        <div className="ml-3">
          Filter:{" "}
          <SelectDropdown
            data={tags}
            handleSelectChange={(value: string) => handleTagFilter(value)}
          />
        </div>
      </Flex>
      {/* search form */}
      <SearchBlog
        handleOnSubmit={handleOnSubmit}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <Flex align="center" gap="middle">
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      {/* data table */}
      <Table
        className="ant-table"
        rowSelection={rowSelection}
        columns={columns}
        rowKey={"id"}
        dataSource={filteredData?.slice(
          (pagination.current - 1) * pagination.pageSize,
          pagination.current * pagination.pageSize
        )}
        pagination={{ ...pagination, showSizeChanger: true }}
        onChange={handleTableChange}
        scroll={{ x: "max-content" }}
      />
    </Flex>
  );
};

export default DataTable;
