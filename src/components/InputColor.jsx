import React, { useRef } from "react";
import { Form, Input, Button } from "antd";
import { CirclePicker } from "react-color";

import "./styles.css";
const gridStyle = {
  width: "50%",
  textAlign: "center",
};
export default function InputColor(props) {
  const { color, onChange } = props;
  const [open, setOpen] = React.useState(false);
  const [internalColor, setInternalColor] = React.useState(color);

  const handleChange = (color) => {
    setInternalColor(color.hex);

    if (onChange) {
      onChange(color.hex);
    }
  };

  console.log(internalColor);

  return (
    <>
      <Form.Item>
        <Input
          value={internalColor || ""}
          onChange={(e) => setInternalColor(e.target.value)}
          prefix={
            <Button
              style={{ background: internalColor }}
              onClick={() => setOpen(!open)}
            >
              {" "}
            </Button>
          }
        />
      </Form.Item>
      <Form.Item>
        <CirclePicker
          style={{ display: open ? "" : "none" }}
          color={internalColor}
          onChangeComplete={handleChange}
        />
      </Form.Item>
    </>
  );
}
