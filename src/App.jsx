import React, { useState } from "react";
import "./App.less";
import {
  Modal,
  Col,
  Divider,
  List,
  Row,
  Card as AntCard,
  Layout,
  Progress,
  Tag,
  Button,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import AddTask from "./components/AddTask";
import {
  getAllTasks,
  getCategoriesCollection,
  insertTask,
  updateTask,
} from "./services/taskSercice";
import { grid } from "./components/styles";

/* 
const initTasks = [
  { name: "Learn Angular", category: "todo", bgcolor: "yellow" },
  { name: "Learn React", category: "todo", bgcolor: "pink" },
  { name: "Learn Bootstrap", category: "progress", bgcolor: "red" },
  { name: "Learn Vue", category: "done", bgcolor: "skyblue" },
  { name: "Learn RxJS", category: "progress", bgcolor: "rgb(255,121,0)" },
]; 
*/
const App = () => {
  const [tasks, setTasks] = useState(getAllTasks());
  const [modalVisible, setModalVisible] = useState(false);
  const { Header, Footer, Content } = Layout;

  const onTouchStart = (ev, id) => {
    ev.target.id = id;
    console.log("TouchStart:", ev.target.id);
  };
  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };
  
  const onDragOver = (ev) => {
    ev.preventDefault();
    console.log('Houraa', ev);
  };
  
  const onTouchMove = (ev, cat) => {
    let id = ev.target.id;
    console.log("TouchMove:", id);

    let newTasks = tasks.filter((task) => {
      if (task.name === id) {
        task.categoryId = cat;
        setTasks([...tasks, task]);
        updateTask(task);
      }
      return task;
    });
    setTasks(getAllTasks())
  };
  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");

    let newTasks = tasks.filter((task) => {
      if (task.name === id) {
        task.categoryId = cat;
        setTasks([...tasks, task]);
        updateTask(task);
      }
      return task;
    });
    setTasks(getAllTasks())
  };
  const stats = (cat) =>
    (tasks.filter((t) => t.category === cat).length / tasks.length) * 100;
  
    return (
    <Layout>
      <Header color="white">
        <div className="logo"/>
        <Row>
          <Col span={20}>
            <Text type="warning" strong title="ODC" copyable={false}>
              Scrum Board
            </Text>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              onClick={(e) => {
                e.preventDefault();
                setModalVisible(true);
              }}
            >
              Add Task
            </Button>
          </Col>
        </Row>
      </Header>
      <Content>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="container-drag"
          style={{ marginRight: 0 }}
        >
          {getCategoriesCollection().map((cat) => (
            <Col key={cat.id} className="gutter-row container-drag" span={8}>
              <Divider orientation="left">{cat.title}</Divider>
              <List
                onDragOver={(e) => onDragOver(e)}
                onTouchEnd={(e) => onDragOver(e)}
          
                onTouchMove={(e) => {
                  onTouchMove(e, cat.id);
                }}
                onDrop={(e) => {
                  onDrop(e, cat.id);
                }}
                grid={grid}
                dataSource={tasks.filter((t) => t.category === cat.title)}
                renderItem={(task) => (
                  <List.Item>
                    <AntCard
                      key={task.name}
                      onTouchStart={(e) => onTouchStart(e, task.name)}
                      onDragStart={(e) => onDragStart(e, task.name)}
                      draggable
                      style={{
                        backgroundColor: `${task.color}ac`,
                      }}
                      className="draggable"
                      title={task.name}
                    >
                      {task.category === cat.title ? (
                        <Tag
                          icon={<ClockCircleOutlined />}
                          color="error"
                          className="tag-w-100"
                        >
                          waiting
                        </Tag>
                      ) : task.category === cat.title ? (
                        <Tag
                          icon={<SyncOutlined spin />}
                          color="processing"
                          className="tag-w-100"
                        >
                          processing
                        </Tag>
                      ) : (
                        <Tag
                          icon={<CheckCircleOutlined />}
                          color="success"
                          className="tag-w-100"
                        >
                          success
                        </Tag>
                      )}
                    </AntCard>
                  </List.Item>
                )}
              />
              ,
            </Col>
          ))}
        </Row>
      </Content>
      <Footer style={{ padding: "1rem" }}>
        <Divider orientation="left">You have {tasks.length} tasks</Divider>
        <Row gutter={{ xs: 8, sm: 8, md: 24, lg: 32 }}>
          {getCategoriesCollection().map((cat) => (
            <Col key={cat.id} span={8}>
              <Progress
                type="dashboard"
                size="default"
                trailColor="green"
                percent={stats(cat.title)}
                width={170}
                format={(percent) => `${percent}% ${cat.title}`}
                status={cat.id === '1' ? 'active' : cat.id === '2' ? 'active' : 'success'}
                style={{ width: "100%" }}
              />
            </Col>
          ))}
        </Row>
      </Footer>

      <Modal
        title="Add Task"
        wrapClassName="vertical-center-modal"
        visible={modalVisible}
        footer={false}
      >
        <AddTask
          setTasks={setTasks}
          insertTask={insertTask}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </Modal>
    </Layout>
  );
};

export default App;
