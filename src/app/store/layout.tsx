"use client";
import { ReactNode } from "react";
import Loading from "@/components/Loading";
import PageHeader from "@/components/layout/layout/header/Page";
import { PageNavbar } from "@/components/layout/layout/navbar/Page";
import { PageSidebar } from "@/components/layout/layout/sidebar/Page";

interface OfflinePointsProps {
  children: ReactNode;
}
// const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const OfflinePointsLayout = ({ children }: OfflinePointsProps) => {

  return (
    <>
      <PageHeader />
      <PageNavbar />
      <div className="flex">
        <PageSidebar />
        {children}
      </div>
      <Loading />
    </>

  );
};

export default OfflinePointsLayout;
