/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import MyApps from './MyApps';
import MyAppsContent from './MyAppsContent';

const MyAppPage = () => {
  return (
    <div 
    css={css({
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    })}
  >
    <Topbar />
    <div
      css={css({
        display: "flex",
        flex: '1 1 0%',
      })}
    >
      <Sidebar/>
      <div
        css={css({
          display: "flex",
          flexDirection: "column",
          flex: "1",
        })}
      >
      <MyApps/>
      <MyAppsContent/>
      </div>
    </div>
  </div>
  )
}

export default MyAppPage
