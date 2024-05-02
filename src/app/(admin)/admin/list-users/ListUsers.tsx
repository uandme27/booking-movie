"use client";
import React, { use, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/app/redux/features/auth/authApi";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { boolean } from "yup";
type Props = {};
import { toast } from "react-toastify";

const ListUsers = (props: Props) => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery({});
  const [deleteUser, { isSuccess: isSuccessDel, error: errorDel }] =
    useDeleteUserMutation({});
  const [] = useState(false);

  useEffect(() => {
    if (isSuccessDel) {
      toast.success("Xóa User thành công!");
      refetch();
    }
    if (errorDel) {
      toast.error("Xóa User thất bại!");
    }
  }, [isSuccessDel, errorDel]);
  const columns: any = [
    { field: "_id", headerName: "ID", width: 60, flex: 1 },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 110,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params: any) => {
        const handleEdit = () => {
          console.log("Edit action:", params.row);
        };

        const handleDelete = async () => {
          const id = params.row._id;
          await deleteUser(id);
        };

        return (
          <div>
            <IconButton aria-label="edit" size="small" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" size="small" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
  if (isLoading)
    return (
      <Box
        className="flex justify-center items-center h-[50vh]"
        sx={{ display: "flex" }}
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Error</div>;
  const getRowId = (row: any) => row._id;
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={users.data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        getRowId={getRowId}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ListUsers;
function deleteUser(id: any) {
  throw new Error("Function not implemented.");
}
