import React, { useState } from "react";

// project
import { Header } from "../components/header";
import FormButton from "../components/FormButton.tsx";
import SearchBar from "../components/SearchBar";

// css
import { FaUser, FaUserCog, FaPlus } from "react-icons/fa";
import MemberItem from "../components/MemberItem.tsx";

enum TabType {
  Admins = "admins",
  Memebers = "memebers",
}

function ManageMembers(): React.JSX.Element {
  const [activeTab, setActivetab] = useState<TabType>(TabType.Admins);

  return (
    <>
      <Header />
      <div className="container px-48 mx-auto mt-12">
        <div className="flex flex-row w-full h-14 justify-between">
          <div className="flex flex-row mt-2">
            <button
              type="button"
              className={`w-32 font-bold rounded-t-normal-radius flex justify-center items-center gap-1
                                ${activeTab === TabType.Admins ? "bg-background underline" : "bg-white"}`}
              onClick={() => setActivetab(TabType.Admins)}
            >
              <FaUser />
              ADMINS
            </button>
            <button
              type="button"
              className={`w-32 font-bold rounded-t-normal-radius flex justify-center items-center gap-1
                                ${activeTab === TabType.Memebers ? "bg-background underline" : "bg-white"}`}
              onClick={() => setActivetab(TabType.Memebers)}
            >
              <FaUserCog />
              MEMBERS
            </button>
          </div>
          <div className="flex flex-row items-center pr-2 mb-2">
            <div className="scale-75">
              <SearchBar />
            </div>
            <FormButton
              label="ADD"
              icon={<FaPlus className="fill-button-text" />}
            />
          </div>
        </div>

        {/* admin & member list */}
        <div className="bg-background w-full py-3 rounded-tr-normal-radius rounded-b-normal-radius">
          <div className="grid grid-cols-8 gap-2 px-2 items-center mx-2 pb-1">
            <span>프로필</span>
            <span className="col-span-2">닉네임</span>
            <span className="col-span-2">이메일</span>
            <span className="col-span-2">가입일</span>
            <span>활성여부</span>
          </div>
          <div className="divide-y">
            <MemberItem
              email="crystal@gmail.com"
              createdAt="2024-06-17"
              nickname="^^"
              isAccountActive={true}
              className="rounded-t-normal-radius"
            />
            <MemberItem
              email="crystal@gmail.com"
              createdAt="2024-06-17"
              nickname="^^"
              isAccountActive={true}
            />
            <MemberItem
              email="crystal@gmail.com"
              createdAt="2024-06-17"
              nickname="^^"
              isAccountActive={false}
            />
            <MemberItem
              email="crystal@gmail.com"
              createdAt="2024-06-17"
              nickname="^^"
              isAccountActive={false}
              className="rounded-b-normal-radius"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageMembers;
