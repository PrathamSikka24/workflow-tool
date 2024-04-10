/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Logo from "../assets/icons/logo.png";
import User from "../assets/icons/user.png";

const Topbar = () => {
  return (
    <div
      css={css({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#362259",
        color: "white",
        padding: "0.5rem 2rem",
      })}
    >
      <div
        css={css({
          display: "flex",
          alignItems: "center",
          marginLeft: "-1rem",
        })}
      >
        <img css={css({ width: "4rem" })} src={Logo} alt="" />
        <p css={css({ color: "white", fontSize: "2rem", fontWeight: "bold" })}>
          Dev<span css={css({ fontWeight: "normal" })}>Zero</span>
        </p>
      </div>
      <div
        css={css({
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        })}
      >
        <div
          css={css({
            backgroundColor: "white",
            borderRadius: "100%",
            height: "3rem",
            width: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <img css={css({ height: "2.5rem", width: "2.5rem" })} src={User} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
