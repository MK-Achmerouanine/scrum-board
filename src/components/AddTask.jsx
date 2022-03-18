import React, { useRef, useState } from "react";
import InputColor from "./InputColor";
import { SolutionOutlined, CloseCircleFilled, PlusCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Input } from "antd";
import { tagGrid } from "./styles";
import { getAllTasks, getCategoriesCollection } from "../services/taskSercice";

const tags = [
  { name: "backend", color: "#F7F7F7" },
  { name: "frontend", color: "#FFB72B" },
  { name: "Local", color: "#FFE61B" },
  { name: "Development", color: "#B5FE83" },
  { name: "Production", color: "#C1F4C5" },
];

const AddTask = ({ insertTask, modalVisible, setModalVisible, setTasks }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const inputRef = useRef();
  const emitEmpty = () => {
    inputRef.current.focus();
    setName("");
  };
  const suffix = name ? <CloseCircleFilled onClick={emitEmpty} /> : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    //const category = getCategoriesCollection()[0].title
    insertTask({name,color, categoryId:'1'})
setTasks(getAllTasks())
    setModalVisible(!modalVisible)
  };
  return (
    <>
      <form onSubmit={handleSubmit} method="post">
        <Divider orientation="left">Todo infos</Divider>
        <Input
          id="taskName"
          placeholder="Enter your userName"
          prefix={<SolutionOutlined />}
          suffix={suffix}
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={inputRef}
        />

        <Divider orientation="left">Todo Color</Divider>
        <InputColor color={color} onChange={setColor} />
        <Divider orientation="left">Preview</Divider>
        <Card title={name} headStyle={{ background: color }}>
          {tags.map((t, k) => (
            <Card.Grid key={k} style={{ ...tagGrid, backgroundColor: t.color }}>
              {t.name}
            </Card.Grid>
          ))}
        </Card>
        <button type="submit"></button>
        <Button icon={<PlusOutlined/>} htmlType="submit" type="primary" className="w-100 my-1">Add Task</Button>
      </form>
    </>
  );
};

export default AddTask;
