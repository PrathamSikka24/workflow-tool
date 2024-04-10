/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import IconPlusCircle from "../assets/icons/plus";

const FlowsContent = () => {
  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: "1.2rem",
        backgroundColor: "#f4f4f4",
        color: "#CECECE",
      })}
    >
      <p>No Flows yet. Click on the plus icon to create a new flow.</p>
      <IconPlusCircle
        css={css({
          color: "#362259",
          cursor: "pointer",
          '&:hover': {
            color: "#584E6A",
          },
        })}
      />
    </div>
  );
};

export default FlowsContent;
