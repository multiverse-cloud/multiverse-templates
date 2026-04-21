import { Link } from "react-router-dom";
import { Seo } from "@/components/common/Seo";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { StatWidget } from "@/components/common/StatWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useApiQuery } from "@/hooks/useApiQuery";
import { dashboardService } from "@/services/dashboardService";

export default function UserDashboardOverviewPage() {
  const { data, error, isLoading } = useApiQuery(() => dashboardService.getUserOverview(), []);

  if (isLoading) return <LoadingScreen label="Loading dashboard" />;
  if (error) return <ErrorState description="Unable to load your dashboard right now." />;

  return (
    <>
      <Seo title="Dashboard" description="View your Auren account overview." />
      <div className="grid gap-6 xl:grid-cols-4">
        <StatWidget label="Orders" value={data.stats.totalOrders} helper="Completed and active purchases" />
        <StatWidget label="Wishlist" value={data.stats.wishlistItems} helper="Products saved for later" />
        <StatWidget label="Notifications" value={data.stats.unreadNotifications} helper="Unread account updates" />
        <StatWidget label="Plan" value={data.stats.activeSubscription} helper="Current subscription status" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {(data.recentOrders || []).length ? (
              data.recentOrders.map((order) => (
                <Link
                  key={order._id}
                  to={`/dashboard/orders/${order._id}`}
                  className="flex items-center justify-between rounded-2xl border border-border px-4 py-4"
                >
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">{order.status}</p>
                  </div>
                  <p>${order.totals?.total}</p>
                </Link>
              ))
            ) : (
              <EmptyState
                title="No orders yet"
                description="Your recent orders will show up here after your first purchase."
                action={{ label: "Browse products", as: Link, to: "/shop" }}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest notifications</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {(data.notifications || []).map((notification) => (
              <div key={notification._id} className="rounded-2xl border border-border px-4 py-4">
                <p className="font-medium">{notification.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{notification.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

