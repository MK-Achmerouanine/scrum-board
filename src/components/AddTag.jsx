import React, { useRef, useState } from "react";
import { Divider, Form, Input, Tag } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import InputColor from "./InputColor";

const AddTag = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const input = useRef(null);
  const addTag = (e) => {
    e.preventDefault();
    console.log("Added : ", name);
  };
  const emitEmpty = () => {
    input.current.focus();
    setName("");
  };
  const suffix = name ? <CloseCircleFilled onClick={emitEmpty} /> : null;
  return (
    <Form onSubmit={addTag}>
      <Form.Item>
        <Input
          id="taskName"
          ref={input}
          placeholder="Enter your userName"
          prefix={<Tag />}
          suffix={suffix}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
      <Divider orientation="left">Todo Color</Divider>
        <InputColor color={color} onChange={setColor} />
      </Form.Item>
    </Form>
  );
};

export default AddTag;
