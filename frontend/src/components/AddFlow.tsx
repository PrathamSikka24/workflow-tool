/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

const addFlowStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "100vh",
  backgroundColor: "#edf2f7",
  padding: "2rem",
});

const cardStyle = css({
  backgroundColor: "#fff",
  borderRadius: "0.3rem",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "800px",
  margin: "1rem",
  padding: "2rem",
});

const headerStyle = css({
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginBottom: "1.5rem",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

const sectionStyle = css({
  marginBottom: "1rem",
});

const sectionTitleStyle = css({
  fontSize: "1rem",
  fontWeight: "bold",
  marginBottom: "0.5rem",
});

const sectionContentStyle = css({
  padding: "1rem",
  border: "1px solid #ccc",
  borderRadius: "0.3rem",
});

const AddFlow = () => {
  const [flowName, setFlowName] = useState("Name your flow");

  return (
    <div css={addFlowStyle}>
      <div css={headerStyle}>
        <input
          css={css({
            border: "none",
            outline: "none",
            fontSize: "1rem",
            backgroundColor: "transparent",
          })}
          value={flowName}
          onChange={(e) => setFlowName(e.target.value)}
          placeholder="Name your flow"
        />
        <button
          css={css({
            padding: "0.5rem 1rem",
            borderRadius: "0.3rem",
            cursor: "pointer",
            backgroundColor: "#4C51BF",
            color: "white",
            border: "none",
          })}
        >
          Publish
        </button>
      </div>
      <div css={cardStyle}>
        <div css={sectionStyle}>
          <div css={sectionTitleStyle}>Setup a Trigger</div>
          <div css={sectionContentStyle}>Choose app & event</div>
        </div>
      </div>
      <div css={cardStyle}>
        <div css={sectionStyle}>
          <div css={sectionTitleStyle}>Setup an Action</div>
          <div css={sectionContentStyle}>...</div>
        </div>
      </div>
    </div>
  );
};

export default AddFlow;
