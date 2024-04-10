/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FlowIcon from "../assets/icons/flow";
import AppIcon from "../assets/icons/app_icon";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#dcd0f5",
        color: "black",
        width: "15rem",
      })}
    >
      <ul
        css={css({
          listStyle: "none",
          padding: 0,
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          // marginTop: "2rem",
        })}
      >
        <li
          onClick={() => {
            navigate("/");
          }}
          css={css({
            padding: "1rem 0",
            paddingLeft: "2rem",
            borderTop: "1px solid white",
            borderBottom: "1px solid white",
            width: "100%",
            '&:hover': {
              backgroundColor: "#E6DFF7",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "1rem",
            cursor: "pointer"
          })}
        >
          <FlowIcon css={css({color: "#362259",})}/>
          <p>Flows</p>
        </li>
        <li
          onClick={() => {
            navigate("/my-apps");
          }}
          css={css({
            padding: "1rem 0",
            paddingLeft: "2rem",
            borderBottom: "1px solid white",
            width: "100%",
            '&:hover': {
              backgroundColor: "#E6DFF7",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "1rem",
            cursor: "pointer"
          })}
        >
          <AppIcon css={css({color: "#362259",})}/>
          <p>My Apps</p>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
