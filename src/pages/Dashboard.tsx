import { AdminLayout } from "@/components/admin/AdminLayout";
import { ArrowUpRight, ArrowDownRight, Eye, DollarSign, Package, ShoppingCart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const visitorData = [
  { name: "Mon", visitors: 400, lastWeek: 350 },
  { name: "Tue", visitors: 300, lastWeek: 400 },
  { name: "Wed", visitors: 520, lastWeek: 450 },
  { name: "Thu", visitors: 480, lastWeek: 380 },
  { name: "Fri", visitors: 600, lastWeek: 520 },
  { name: "Sat", visitors: 750, lastWeek: 680 },
  { name: "Sun", visitors: 820, lastWeek: 750 },
];

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

const products = [
  { name: "Some Product", price: "$13 USD", sales: "12,000 Sold", trend: "+8%" },
  { name: "Another Product", price: "$29 USD", sales: "123,234 Sold", trend: "+12%" },
  { name: "Amazing Product", price: "$1,230 USD", sales: "198 Sold", trend: "-2%" },
];

const StatCard = ({
  title,
  value,
  change,
  changeLabel,
  positive,
  icon: Icon,
  onViewReport,
}: {
  title: string;
  value: string;
  change: string;
  changeLabel: string;
  positive: boolean;
  icon: React.ElementType;
  onViewReport?: () => void;
}) => (
  <div className="admin-card">
    <div className="admin-card-body">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <button
          onClick={onViewReport}
          className="text-sm text-primary hover:underline"
        >
          View Report
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            positive ? "text-success" : "text-destructive"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
          {change}
        </span>
        <span className="text-sm text-muted-foreground">{changeLabel}</span>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard" breadcrumb={["Home", "Dashboard v3"]}>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard v3</h1>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Online Store Visitors"
          value="820"
          change="12.5%"
          changeLabel="Since last week"
          positive={true}
          icon={Eye}
        />
        <StatCard
          title="Sales"
          value="$18,230.00"
          change="33.1%"
          changeLabel="Since last month"
          positive={true}
          icon={DollarSign}
        />
        <StatCard
          title="Conversion Rate"
          value="12%"
          change="4.2%"
          changeLabel="This month"
          positive={true}
          icon={ShoppingCart}
        />
        <StatCard
          title="Sales Rate"
          value="0.8%"
          change="1.2%"
          changeLabel="This week"
          positive={false}
          icon={Package}
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Visitors Chart */}
        <div className="admin-card">
          <div className="admin-card-header flex items-center justify-between">
            <h3 className="admin-card-title">Visitors Over Time</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                This Week
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                Last Week
              </span>
            </div>
          </div>
          <div className="admin-card-body">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="lastWeek"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="admin-card">
          <div className="admin-card-header flex items-center justify-between">
            <h3 className="admin-card-title">Sales Over Time</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                This year
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                Last year
              </span>
            </div>
          </div>
          <div className="admin-card-body">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Sales</th>
                  <th>More</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                        <Package className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </td>
                    <td>{product.price}</td>
                    <td>
                      <span
                        className={`text-xs font-medium ${
                          product.trend.startsWith("+")
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {product.trend}
                      </span>{" "}
                      {product.sales}
                    </td>
                    <td>
                      <button className="text-muted-foreground hover:text-foreground">
                        ⋮
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Online Store Overview */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Online Store Overview</h3>
          </div>
          <div className="admin-card-body space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Conversion Rate</span>
              <span className="text-xl font-bold">12%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "12%" }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Sales Rate</span>
              <span className="text-xl font-bold">0.8%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "0.8%" }} />
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Performance metrics updated in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
