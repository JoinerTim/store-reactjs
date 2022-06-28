import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboardUsers.scss";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteMutipleUser,
  deleteSingleUser,
  getAllUser,
} from "../../redux/toolkits/userAdminSlice";

const DashboardUsers = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [keyFresh, setKeyFresh] = useState(0);
  const [countSelected, setCountSelected] = useState(0);
  const [arrayId, setArrayId] = useState([]);

  const [users, setUsers] = useState([]);

  const { loading } = useSelector((state) => state.userAdminState);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await dispatch(getAllUser()).unwrap();
        setIsLoading(true);
        setUsers(data.users);
      } catch (error) {
        console.log(error.response);
      }
    };
    getUsers();
  }, [keyFresh]);

  const handleDeleteUser = async (row) => {
    try {
      await dispatch(deleteSingleUser(row._id)).unwrap();
      setKeyFresh((oldv) => oldv + 1);
      toast.success("Người dùng vừa được xóa thành công");
      setCountSelected(0);
    } catch (error) {
      toast.error("Người dùng chưa được xóa!");
    }
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row._id,
    },
    {
      name: "Tên",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Tham gia lúc",
      selector: (row) => row.createAt.slice(0, 10),
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="action--item">
          <button
            className="btn"
            onClick={() => {
              history(`/dashboard/update/user/${row._id}`);
            }}
          >
            Sửa
          </button>
          <button
            className="btn"
            onClick={() => {
              handleDeleteUser(row);
            }}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  const tableData = {
    columns,
    data: users,
  };

  const handleSelectedChange = (state) => {
    setCountSelected(state.selectedCount);
    let array = [];
    state.selectedRows.forEach((item, i) => {
      array.push(item._id);
    });
    setArrayId(array);
  };

  const handleDeleteMutiple = async () => {
    try {
      await dispatch(deleteMutipleUser({ id: arrayId })).unwrap();
      setKeyFresh((oldv) => oldv + 1);
      toast.success("Người dùng vừa được xóa thành công");

      setCountSelected(0);
    } catch (error) {
      toast.error("Người dùng chưa được xóa!");
    }
  };
  return (
    <div className="col l-10">
      {
        // <DataTableExtensions {...tableData} >
        <DataTable
          title="Danh sách người dùng"
          columns={columns}
          data={users}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="400px"
          selectableRows
          selectableRowsHighlight={false}
          onSelectedRowsChange={handleSelectedChange}
          actions={
            <div>
              <button className="btn" onClick={handleDeleteMutiple}>
                Xóa ({countSelected}){" "}
              </button>
            </div>
          }
          dense
        />
        // </DataTableExtensions>
      }
      {loading && <Loader />}
    </div>
  );
};

export default DashboardUsers;
