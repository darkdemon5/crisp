import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, message, Space } from "antd";
import React, { use } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../Auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const items = [
    {
      key: "1",
      label: "My Account",
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
    },
    {
      key: "3",
      label: "Logout",
      onClick: () => {
        dispatch(logout());
        // alert("Logged out successfully");
        message.success("Logged out successfully");
      },
    },
  ];
  return (
    <div className="w-full h-[6%] flex justify-between items-center px-4 bg-gray-300 backdrop-blur-lg border border-white/30">
      <div className="w-[80%] h-full flex justify-between mx-auto items-center">
        <img src="assets/CRISP Dark T.png" alt="logo" className="h-full " />

        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar size="large" icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
