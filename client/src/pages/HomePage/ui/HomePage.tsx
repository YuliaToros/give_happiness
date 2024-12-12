import React from "react";
import { AboutPayBlock, CardBlock, HeroBlock } from "@/widgets";
import { Layout } from "antd";

const { Content } = Layout;

export const HomePage: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh"}}>
      <Content>
        <div style={{ minHeight: "30vh" }}>
          <HeroBlock />
        </div>
        <div style={{ minHeight: "30vh"}}>
          <CardBlock />
        </div>
        <div style={{ minHeight: "30vh"}}>
          <AboutPayBlock />
        </div>
      </Content>
    </div>
  );
};