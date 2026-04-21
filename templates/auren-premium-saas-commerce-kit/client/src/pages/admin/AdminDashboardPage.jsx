import { Seo } from "@/components/common/Seo";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { StatWidget } from "@/components/common/StatWidget";
import { TopProductsChart } from "@/features/dashboard/components/TopProductsChart";
import { SalesOverviewChart } from "@/features/dashboard/components/SalesOverviewChart";
import { useApiQuery } from "@/hooks/useApiQuery";
import { dashboardService } from "@/services/dashboardService";

export default function AdminDashboardPage() {
  const { data, error, isLoading } = useApiQuery(() => dashboardService.getAdminOverview(), []);

  if (isLoading) return <LoadingScreen label="Loading admin dashboard" />;
  if (error) return <ErrorState description="Unable to load admin analytics." />;

  return (
    <>
      <Seo title="Admin Dashboard" description="Monitor revenue, orders, subscriptions, users, and moderation from one admin control center." />
      <div className="grid gap-6 xl:grid-cols-4">
        <StatWidget label="Revenue" value={`$${Math.round(data.stats.totalRevenue)}`} helper="Successful transactions" />
        <StatWidget label="Orders" value={data.stats.totalOrders} helper="Total order records" />
        <StatWidget label="Users" value={data.stats.totalUsers} helper="Registered accounts" />
        <StatWidget label="Subscriptions" value={data.stats.activeSubscriptions} helper="Active or trialing" />
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SalesOverviewChart data={data.salesChart} />
        <TopProductsChart data={data.topProducts} />
      </div>
    </>
  );
}

