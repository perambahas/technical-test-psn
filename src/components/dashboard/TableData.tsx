"use client";

import { useFeedback } from "@/context/FeedbackContext";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import CreateCommentForm from "./CreateCommentForm";
import DeleteComment from "./DeleteComment";
import { CommentType } from "@/types/comment.type";

export default function TableData({ data }: { data: CommentType[] }) {
  const { showDialog } = useFeedback();

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    body: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-col md:flex-row md:justify-between w-full gap-8">
        <Button
          className="w-fit self-end"
          icon="pi pi-plus"
          label="Create Comment"
          onClick={() =>
            showDialog({
              content: <CreateCommentForm />,
              header: "Create Comment",
            })
          }
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            className="w-full"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };

  const [lgWdith, setLgWidth] = useState<boolean>();
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const listener = () => setLgWidth(media.matches);
    listener();
    media.addEventListener("change", listener);
    return () => {
      media.removeEventListener("change", listener);
    };
  });

  return (
    <DataTable
      size={lgWdith ? "large" : "small"}
      value={data}
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      tableStyle={{ minWidth: "50rem" }}
      globalFilterFields={["name", "email", "body"]}
      header={renderHeader()}
      filters={filters}
    >
      <Column
        field="postId"
        header="Post ID"
        headerClassName="text-nowrap"
      ></Column>
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="email" header="Email" bodyClassName="text-nowrap"></Column>
      <Column field="body" header="Body"></Column>
      <Column header="Delete" body={DeleteComment} exportable={false}></Column>
    </DataTable>
  );
}
