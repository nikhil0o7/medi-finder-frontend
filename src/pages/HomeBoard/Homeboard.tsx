import { ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
// import { FormatConfig } from "antd/es/statistic/utils";
import CountUp from "react-countup";

// const formt = (value: Statistic["valueType"], _config?: FormatConfig) => (
//   <CountUp end={value} separator="," />
// );
// //   <span>{value.toLocaleString()}</span>

const formatter = (value: number | string) => {
  return (
    <span>
      <CountUp end={Number(value)} separator="," />
    </span>
  );
};

const HomeBoard = () => {
  return (
    <>
      <Row gutter={18}>
        <Col span={6}>
          <Card title="Available Hospital Count" bordered={true}>
            <Statistic
              value={4623}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Hospitals from different Cities" bordered={true}>
            <Statistic
              value={2947}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Hospitals from no. of States" bordered={true}>
            <Statistic
              value={56}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Hospitals which have ratings" bordered={true}>
            <Statistic
              value={3604}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default HomeBoard;
