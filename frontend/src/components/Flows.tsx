/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import IconSearch from "../assets/icons/search";

const Flows = () => {
  return (
    <div
      css={css({
        backgroundColor: "#f4f4f4",
      })}
    >
      <div
        css={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 3rem",
          borderBottom: "1px solid #e0e0e0",
        })}
      >
        <h1
          css={css({
            fontSize: "2.4rem",
          })}
        >
          Flows
        </h1>
        <div
          css={css({
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          })}
        >
          <div
            css={css({
              position: "relative",
            })}
          >
            <input
              css={css({
                padding: "0.5rem 1rem",
                paddingRight: "2.5rem",
                borderRadius: "5px",
                border: "1px solid #e0e0e0",
                fontSize: "1.2rem",
                outline: "none",
              })}
              type="text"
              placeholder="Search..."
            />
            <div
              css={css({
                position: "absolute",
                right: "0.8rem",
                top: "55%",
                transform: "translateY(-50%)",
                color: "#362259",
              })}
            >
              <IconSearch />
            </div>
          </div>
          <button
            css={css({
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              fontSize: "1.2rem",
              backgroundColor: "#362259",
              border: "none",
              color: "white",
              cursor: "pointer",
              '&:hover': {
                backgroundColor: "#674c9f",
              },
            })}
          >
            Create Flow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flows;
