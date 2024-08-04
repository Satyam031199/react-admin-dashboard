import { Button } from "@mui/material";
import "./Single.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

type Props = {
  id: number;
  img?: string;
  title: string;
  info: object;
  chart?: {
    dataKeys: { name: string; color: string }[];
    data: object[];
  };
  activities?: { time: string; text: string }[];
};

const Single = (props: Props) => {
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <Avatar
              alt="User photo"
              src={props.img}
              sx={{ width: 100, height: 100 }}
            />
            <h1>{props.title}</h1>
            <Button variant="contained">Update</Button>
          </div>
          <div className="details">
            {Object.entries(props.info).map((item) => {
              return (
                <div className="item" key={item[0]}>
                  <span className="itemTitle">{item[0]}: </span>
                  <span className="itemValue">{item[1]}</span>
                </div>
              );
            })}
          </div>
        </div>
        <Divider
          sx={{
            backgroundColor: "gray",
            width: "90%",
            marginTop: "40px",
          }}
        />
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((datakey) => {
                  return (
                    <Line
                      type="monotone"
                      dataKey={datakey.name}
                      stroke={datakey.color}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {props.activities?.map((activity) => {
            return (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="error" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ backgroundColor: "#f45b6810", marginBottom: "30px" }}
                >
                  {activity.text}
                </TimelineContent>
                <TimelineContent fontSize="14px" color="gray">
                  {activity.time}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
    </div>
  );
};

export default Single;
