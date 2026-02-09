import { AdminLayout } from "@/components/admin/AdminLayout";
import { ArrowUpRight, ArrowDownRight, Eye, DollarSign, Package, ShoppingCart, Compass, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useAdminTours } from "@/hooks/useAdminTours";
import { useAdminBookings } from "@/hooks/useAdminBookings";
import { useAdminReviews } from "@/hooks/useAdminReviews";

const StatCard = ({
  title, value, change, changeLabel, positive, icon: Icon,
}: {
  title: string; value: string; change: string; changeLabel: string; positive: boolean; icon: React.ElementType;
}) => (
  <div className="admin-card">
    <div className="admin-card-body">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`flex items-center gap-1 text-sm font-medium ${positive ? "text-success" : "text-destructive"}`}>
          {positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {change}
        </span>
        <span className="text-sm text-muted-foreground">{changeLabel}</span>
      </div>
    </div>
  </div>
);

const visitorData = [
  { name: "Mon", visitors: 400, lastWeek: 350 },
  { name: "Tue", visitors: 300, lastWeek: 400 },
  { name: "Wed", visitors: 520, lastWeek: 450 },
  { name: "Thu", visitors: 480, lastWeek: 380 },
  { name: "Fri", visitors: 600, lastWeek: 520 },
  { name: "Sat", visitors: 750, lastWeek: 680 },
  { name: "Sun", visitors: 820, lastWeek: 750 },
];

export default function Dashboard() {
  const { data: tours } = useAdminTours();
  const { data: bookings } = useAdminBookings();
  const { data: reviews } = useAdminReviews();

  const totalTours = tours?.length || 0;
  const totalBookings = bookings?.length || 0;
  const totalRevenue = bookings?.reduce((sum, b) => sum + Number(b.paid_amount || 0), 0) || 0;
  const totalReviews = reviews?.length || 0;

  return (
    <AdminLayout title="Dashboard" breadcrumb={["Home", "Dashboard"]}>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Tours" value={String(totalTours)} change="—" changeLabel="All time" positive={true} icon={Compass} />
        <StatCard title="Total Bookings" value={String(totalBookings)} change="—" changeLabel="All time" positive={true} icon={Users} />
        <StatCard title="Revenue" value={`$${totalRevenue.toLocaleString()}`} change="—" changeLabel="All time" positive={true} icon={DollarSign} />
        <StatCard title="Reviews" value={String(totalReviews)} change="—" changeLabel="All time" positive={true} icon={Eye} />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="admin-card">
          <div className="admin-card-header flex items-center justify-between">
            <h3 className="admin-card-title">Visitors Over Time</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary" />This Week</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-muted-foreground/30" />Last Week</span>
            </div>
          </div>
          <div className="admin-card-body">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="lastWeek" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings summary */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Recent Bookings</h3>
          </div>
          <div className="admin-card-body space-y-4">
            {bookings?.slice(0, 5).map((b) => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-sm">{b.customer_name}</p>
                  <p className="text-xs text-muted-foreground">{(b.tour as any)?.title}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">${Number(b.total_amount).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{b.status}</p>
                </div>
              </div>
            )) || (
              <p className="text-muted-foreground text-center py-4">No bookings yet</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
