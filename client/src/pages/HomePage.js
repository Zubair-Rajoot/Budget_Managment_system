import React, { useEffect, useState } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import Layout from "../components/Layout/Layout";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import Spinner from "../components/Layout/Spinner";
import moment from "moment";
import Analytics from "../components/Layout/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelecteddate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  //TABLE DATA
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={() =>{handleDelete(record)}} />
        </div>
      ),
    },
  ];

  //GET ALL TRANSECTIONS

  //useEffect hook
  useEffect(() => {
    const getAllTransection = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transections/get-transection", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setLoading(false);
        setAllTransection(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("fetch issue with transection");
      }
    };
    getAllTransection();
  }, [frequency, selectedDate, type]);

  const handleDelete = async (record) => {
    try{
      setLoading(true)
      await  axios.post("/transections/delete-transection", {transacationId: record._id})
      setLoading(false)
      message.success("Transaction Deleted!");
    }catch(error){
      setLoading(false)
      console.log(error)
      message.error('unable to delete')
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      //await axios.post('/transections/add-transection', {...values, userid:user._id})
      if (editable) {
        await axios.post("/transections/edit-transection", {
          payload:{
            ...values,
            userId:user._id
          },
          transacationId: editable._id
        });
        setLoading(false);
        message.success("Transection Updated Successfully");
      } else {
        await axios.post("/transections/add-transection", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transection Added Successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("failed to add transection"); //is transaction
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select
            value={frequency}
            onChange={(value) => setFrequency(value)}
            style={{ width: 200 }}
          >
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelecteddate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select
            value={type}
            onChange={(value) => setType(value)}
            style={{ width: 200 }}
          >
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelecteddate(values)}
            />
          )}
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>

      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransection} />
        ) : (
          <Analytics allTransection={allTransection} />
        )}
        <div />
        <Modal
          title={editable ? "Edit Transaction" : "Add Transaction"}
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={editable}
          >
            <Form.Item label="Amount" name="amount">
              <Input type="text" />
            </Form.Item>

            <Form.Item label="type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fee">fee</Select.Option>
                <Select.Option value="tax">Tax</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>

            <Form.Item label="Refrence" name="refrence">
              <Input type="text" />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input type="text" />
            </Form.Item>

            <div className="d-flex  justify-content-end">
              <button className="btn btn-primary" type="submit">
                SAVE
              </button>
            </div>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default HomePage;
