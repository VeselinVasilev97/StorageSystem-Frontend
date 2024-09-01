import classes from "./Sidebar.module.css";
import SidebarBtn from '../Buttons/SidebarBtn'



const Sidebar = () => {
  

  return (
    <div className={classes.sidebarWrapper}>
      <SidebarBtn path="/dashboard" value="dashboard"/>
      <SidebarBtn path="/orders" value="orders"/>
      <SidebarBtn path="/suppliers" value="suppliers"/>
      <SidebarBtn path="/clients" value="clients"/>
      <SidebarBtn path="/users" value="users"/>
    </div>
  );
};

export default Sidebar;
