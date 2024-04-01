'use client';
import { useSearchParams } from "next/navigation";
import SidebarLinksComp, { daoSettingsSidebarLinks } from "./components/side-bar-links";
import Profile from "./components/profile";
import { ReactNode } from "react";
import Links from "./components/links";

interface ITabView {
    [key: string]: ReactNode;
  }

const Settings = () => {
    const searchParams = useSearchParams();
    const activeSidebar = searchParams.get('q') || daoSettingsSidebarLinks[0].title;
    const tabs: ITabView = {
        Profile: <Profile />,
        Links: <Links />,
    }
    return (
        <div className="space-y-8">
            <div className="border-b border-b-[#292929]">
                <h2 className="border-b-2 pb-3 w-fit border-primary text-white text-sm">Configuration</h2>
            </div>
            <div className="flex space-x-8 items-start">
                <div className="w-[20%] bg-[#191919] rounded-lg p-4">
                    <SidebarLinksComp activeSidebar={activeSidebar} />
                </div>
                <div className="w-[80%] bg-[#191919] rounded-lg p-4">
                    {tabs[activeSidebar]}
                </div>
            </div>
        </div>
    )
};

export default Settings;