import Header from "@/components/UserAcountLayout/Header";
import Sidebar from "@/components/UserAcountLayout/Sidebar/Sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header/>
      <div>
        <Sidebar/>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
