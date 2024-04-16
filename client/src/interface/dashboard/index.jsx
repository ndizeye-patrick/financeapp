import { useState, useEffect } from "react";

import Sidebar from "components/sidebar/";

import { LayoutDashboard, LogOut, WalletCards as Transactions} from "lucide-react";

import { SidebarItem } from "components/sidebar/";

import Navbar from "components/navbar";

import Income from "components/income";

import Expenses from "components/expense";

import FinanceInsights from "components/myFinanceInssigths";

import RecentTransactions from "components/Recenttransactions";

import ProfitLoss from "components/profiltloss";

import Buttons from "components/DashboardButtons";
export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
        window.location.href = '/';
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const { id,name, email } = userInfo;

  return (
    <div className="w-full sm:container">
      <div className="flex flex-cols sticky sm:container">
        <div >
          <Sidebar userInfo={{ name, email }}>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
            <SidebarItem icon={<Transactions size={20} />} text="Transactions" href="/Dashboard/transactions" />
            <hr className="my-5" />
            <SidebarItem icon={<LogOut size={20} />} text="Logout" onLogout />
          </Sidebar>
        </div>
        <div className="grid w-full">
          <Navbar />
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex w-full flex-row justify-around">
                <div className="w-[49%]">
                  <h1 className="font-bold text-xl ml-4 sm:ml-0 text-black-900">Income</h1>
                  <Income userInfo={{id}} />
                </div>
                <div className="w-[40%] ">
                  <Buttons userInfo={{id}}/>
                </div>
              </div>
              <div className="w-full flex justify-around">
                <div className="w-[50%]">
                  <Expenses  userInfo={{id}}/>
                </div>
                <div className="w-[40%] -mt-5 h-40">
                  <ProfitLoss userInfo={{id}}/>
                </div>
              </div>
              <div className="flex justify-between w-full sm:grid ">
                <div className="w-[50%] ml-2 sm:ml-0">
                  <FinanceInsights userInfo={{id}}/>
                </div>
                <div className="w-[42.5%] mt-4">
                  <RecentTransactions userInfo={{id}}/>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}