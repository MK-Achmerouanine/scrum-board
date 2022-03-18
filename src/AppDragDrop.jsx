import React, { Component } from "react";
import "./App.less";
import {
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
import Modal from "antd/lib/modal/Modal";
import InputColor from "./components/InputColor";
import AddTask from "./components/AddTask";

export default class AppDragDropDemo extends Component {
  constructor(props) {
    super(props);
    this.btn = React.createRef();
    this.modal = React.createRef();
    this.openModal = this.openModal.bind(this);
  }
  state = {
    tasks: [
      { name: "Learn Angular", category: "todo", bgcolor: "yellow" },
      { name: "Learn React", category: "todo", bgcolor: "pink" },
      { name: "Learn Bootstrap", category: "progress", bgcolor: "red" },
      { name: "Learn Vue", category: "done", bgcolor: "skyblue" },
      { name: "Learn RxJS", category: "progress", bgcolor: "rgb(255,121,0)" },
    ],
    modalVisible: false,
    displayModal: "block",
  };
  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }
  openModal() {
    // Donne explicitement le focus au champ texte en utilisant l’API DOM native.
    // Remarque : nous utilisons `current` pour cibler le nœud DOM
    this.modal.current.style.display = "block";
  }
  closeModal() {
    // Donne explicitement le focus au champ texte en utilisant l’API DOM native.
    // Remarque : nous utilisons `current` pour cibler le nœud DOM
    this.modal.current.style.display = "hidden";
  }
  onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");

    let tasks = this.state.tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks,
    });
  };

  render() {
    const stats = (cat) =>
      (this.state.tasks.filter((t) => t.category === cat).length /
        this.state.tasks.length) *
      100;

    const { Header, Footer, Content } = Layout;
    const grid = {
      xs: 1,
      sm: 1,
      md: 1,
      lg: 2,
      xl: 2,
      xxl: 3,
    };
    return (
      <Layout>
        <Header color="white">
          <div className="logo" />
          <Row>
            <Col span={20}>
              <Text type="success" underline copyable={false}>
                DRAG & DROP DEMO
              </Text>
            </Col>
            <Col span={4}>
              <Button type="primary" ref={this.btn} onClick={() => this.setModalVisible(true)}>
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
            <Col className="gutter-row container-drag" span={8}>
              <Divider orientation="left">Todo</Divider>
              <List
                className="todo"
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => {
                  this.onDrop(e, "todo");
                }}
                grid={grid}
                dataSource={this.state.tasks.filter(
                  (t) => t.category === "todo"
                )}
                renderItem={(item) => (
                  <List.Item>
                    <AntCard
                      key={item.name}
                      onDragStart={(e) => this.onDragStart(e, item.name)}
                      draggable
                      style={{
                        backgroundColor: item.bgcolor,
                      }}
                      className="draggable"
                      title={item.name}
                    >
                      <Tag
                        icon={<ClockCircleOutlined />}
                        color="error"
                        className="tag-w-100"
                      >
                        waiting
                      </Tag>
                    </AntCard>
                  </List.Item>
                )}
              />
              ,
            </Col>
            <Col className="gutter-row container-drag" span={8}>
              <Divider orientation="left">progress</Divider>
              <List
                className="progress"
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => {
                  this.onDrop(e, "progress");
                }}
                grid={grid}
                dataSource={this.state.tasks.filter(
                  (t) => t.category === "progress"
                )}
                renderItem={(item) => (
                  <List.Item>
                    <AntCard
                      key={item.name}
                      onDragStart={(e) => this.onDragStart(e, item.name)}
                      draggable
                      style={{
                        backgroundColor: item.bgcolor,
                      }}
                      className="draggable"
                      title={item.name}
                    >
                      <Tag
                        icon={<SyncOutlined spin />}
                        color="processing"
                        className="tag-w-100"
                      >
                        processing
                      </Tag>
                    </AntCard>
                  </List.Item>
                )}
              />
              ,
            </Col>
            <Col className="gutter-row container-drag" span={8}>
              <Divider orientation="left">Done</Divider>
              <List
                className="done"
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => {
                  this.onDrop(e, "done");
                }}
                grid={grid}
                dataSource={this.state.tasks.filter(
                  (t) => t.category === "done"
                )}
                renderItem={(item) => (
                  <List.Item>
                    <AntCard
                      key={item.name}
                      onDragStart={(e) => this.onDragStart(e, item.name)}
                      draggable
                      className="draggable"
                      style={{
                        backgroundColor: item.bgcolor,
                      }}
                      title={item.name}
                    >
                      <Tag
                        icon={<CheckCircleOutlined />}
                        color="success"
                        className="tag-w-100"
                      >
                        success
                      </Tag>
                    </AntCard>
                  </List.Item>
                )}
              />
              ,
            </Col>
          </Row>
        </Content>
        <Footer style={{ padding: "1rem" }}>
          <Divider orientation="left">
            You have {this.state.tasks.length} tasks
          </Divider>
          <Row gutter={{ xs: 8, sm: 8, md: 24, lg: 32 }}>
            <Col span={8}>
              <Progress
                type="dashboard"
                size="default"
                percent={stats("todo")}
                format={(percent) => `${percent}% Todos`}
                status="exception"
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={8}>
              <Progress
                type="dashboard"
                size="default"
                percent={stats("progress")}
                format={(percent) => `${percent}% Progress`}
                status="normal"
              />
            </Col>
            <Col span={8}>
              <Progress
                type="dashboard"
                percent={stats("done")}
                format={(percent) => `${percent}% Done`}
                status="success"
              />
            </Col>
          </Row>
        </Footer>

        <Modal
          title="Add Task"
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
        >
          <InputColor/>
          <AddTask />
        </Modal>
      </Layout>
    );
  }
}
