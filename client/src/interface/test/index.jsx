import Sidebar from "components/sidebar/";
import { LayoutDashboard, LogOut, Flag, Home, Settings } from "lucide-react";
import { SidebarItem } from "components/sidebar/";
import Navbar from "components/navbar";
import Income from "components/income";
import Expenses from "components/expense";
import FinanceInsights from "components/myFinanceInssigths";
import RecentTransactions from "components/Recenttransactions";
import ProfitLoss from "components/profiltloss";
import Buttons from "components/DashboardButtons";
import ReportGenerator from "components/ReportGenerator";
export default function Dashboard() {

  const allData = {"name":"Test user","email":"test@user.com"}

  const { name, email } = allData;

  return (
   <div className="h-screen sticky font-poppins">
    <div className="flex flex-cols sticky">
      <div className="flex sticky">
        <Sidebar userInfo={{ name, email }} className="sticky">
          <SidebarItem icon={<Home size={20} />} text="Home"/>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" />
          <hr className="my-5"/>

        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <SidebarItem icon={<LogOut size={20} />} text="Logout" onLogout />
        </Sidebar>

          
        </div>
        <div className="grid w-full h-[24px]">
        <Navbar/>
        <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex w-full flex-row justify-between">
            <div className="w-[56%]">
              <h1 className="font-bold text-xl ml-4 text-[#186ff2]">Income</h1>
              <Income />
            </div>
            <div className="w-[40%] h-12">
              <Buttons/>
            </div>
          </div>
            <div className="w-full flex justify-between">
              <div className="w-[56%]">
                  <Expenses/>
              </div>
              <div className="w-[40%] -mt-5 h-40">
                <ProfitLoss/>
              </div>
            </div>
          <div className="flex justify-between">
          <div className="w-[50%]">
            <FinanceInsights />
          </div>         <div className="w-[30%]">
            <RecentTransactions />
          </div>
          <div className="w-[15%]">
            <ReportGenerator/>
          </div>
          </div>
        </div>
      </div>
     </div>
      
    </div>
    </div> 
  );
}