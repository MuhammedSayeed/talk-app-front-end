"use client"

import FriendsList from "@/components/FriendsList/List";
import ChatsList from "@/components/chatsList/List";
import useTabStore from "@/lib/store/TabStore";
import React from "react";

const TabsContent = () => {
  const {activeTab} = useTabStore();
  return (
    activeTab === "chats-list" ? <ChatsList /> : <FriendsList/>
  )
};

export default TabsContent;
