import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  CalendarDays,
  TableIcon,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Mail,
  Phone,
} from "lucide-react";
import { BookingDetailsDrawer } from "@/components/admin/BookingDetailsDrawer";

interface Booking {
  id: string;
  bookingRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tourName: string;
  tourDate: Date;
  guests: number;
  totalAmount: number;
  paidAmount: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "unpaid" | "partial" | "paid" | "refunded";
  createdAt: Date;
}

const mockBookings: Booking[] = [
  {
    id: "1",
    bookingRef: "BV-2026-001",
    customerName: "John Smith",
    customerEmail: "john@example.com",
    customerPhone: "+971 50 123 4567",
    tourName: "Desert Safari Adventure",
    tourDate: new Date(2026, 0, 20),
    guests: 4,
    totalAmount: 800,
    paidAmount: 800,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: new Date(2026, 0, 15),
  },
  {
    id: "2",
    bookingRef: "BV-2026-002",
    customerName: "Sarah Johnson",
    customerEmail: "sarah@example.com",
    customerPhone: "+971 55 987 6543",
    tourName: "Dubai City Tour",
    tourDate: new Date(2026, 0, 22),
    guests: 2,
    totalAmount: 300,
    paidAmount: 150,
    status: "pending",
    paymentStatus: "partial",
    createdAt: new Date(2026, 0, 16),
  },
  {
    id: "3",
    bookingRef: "BV-2026-003",
    customerName: "Mohammed Al-Hassan",
    customerEmail: "mohammed@example.com",
    customerPhone: "+971 52 456 7890",
    tourName: "Abu Dhabi Grand Mosque Tour",
    tourDate: new Date(2026, 0, 18),
    guests: 6,
    totalAmount: 900,
    paidAmount: 900,
    status: "completed",
    paymentStatus: "paid",
    createdAt: new Date(2026, 0, 10),
  },
  {
    id: "4",
    bookingRef: "BV-2026-004",
    customerName: "Emily Chen",
    customerEmail: "emily@example.com",
    customerPhone: "+971 58 321 0987",
    tourName: "Yacht Cruise Dubai Marina",
    tourDate: new Date(2026, 0, 25),
    guests: 8,
    totalAmount: 2400,
    paidAmount: 0,
    status: "pending",
    paymentStatus: "unpaid",
    createdAt: new Date(2026, 0, 17),
  },
  {
    id: "5",
    bookingRef: "BV-2026-005",
    customerName: "David Williams",
    customerEmail: "david@example.com",
    customerPhone: "+971 54 654 3210",
    tourName: "Hot Air Balloon Ride",
    tourDate: new Date(2026, 0, 19),
    guests: 2,
    totalAmount: 600,
    paidAmount: 600,
    status: "cancelled",
    paymentStatus: "refunded",
    createdAt: new Date(2026, 0, 12),
  },
  {
    id: "6",
    bookingRef: "BV-2026-006",
    customerName: "Fatima Al-Sayed",
    customerEmail: "fatima@example.com",
    customerPhone: "+971 56 789 0123",
    tourName: "Burj Khalifa At The Top",
    tourDate: new Date(2026, 0, 21),
    guests: 3,
    totalAmount: 450,
    paidAmount: 450,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: new Date(2026, 0, 14),
  },
  {
    id: "7",
    bookingRef: "BV-2026-007",
    customerName: "Michael Brown",
    customerEmail: "michael@example.com",
    customerPhone: "+971 50 234 5678",
    tourName: "Desert Safari Adventure",
    tourDate: new Date(2026, 0, 23),
    guests: 5,
    totalAmount: 1000,
    paidAmount: 500,
    status: "confirmed",
    paymentStatus: "partial",
    createdAt: new Date(2026, 0, 16),
  },
  {
    id: "8",
    bookingRef: "BV-2026-008",
    customerName: "Lisa Anderson",
    customerEmail: "lisa@example.com",
    customerPhone: "+971 55 876 5432",
    tourName: "Dhow Cruise Dinner",
    tourDate: new Date(2026, 0, 24),
    guests: 2,
    totalAmount: 200,
    paidAmount: 200,
    status: "completed",
    paymentStatus: "paid",
    createdAt: new Date(2026, 0, 13),
  },
];

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("table");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setDrawerOpen(true);
  };

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tourName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || booking.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const stats = {
    total: mockBookings.length,
    pending: mockBookings.filter((b) => b.status === "pending").length,
    confirmed: mockBookings.filter((b) => b.status === "confirmed").length,
    completed: mockBookings.filter((b) => b.status === "completed").length,
    cancelled: mockBookings.filter((b) => b.status === "cancelled").length,
    totalRevenue: mockBookings
      .filter((b) => b.status !== "cancelled")
      .reduce((sum, b) => sum + b.paidAmount, 0),
  };

  const getStatusBadge = (status: Booking["status"]) => {
    const styles = {
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      confirmed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
      completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };
    const icons = {
      pending: <Clock className="w-3 h-3" />,
      confirmed: <CheckCircle className="w-3 h-3" />,
      cancelled: <XCircle className="w-3 h-3" />,
      completed: <CheckCircle className="w-3 h-3" />,
    };
    return (
      <Badge variant="outline" className={`${styles[status]} flex items-center gap-1`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPaymentBadge = (status: Booking["paymentStatus"]) => {
    const styles = {
      unpaid: "bg-red-500/10 text-red-500 border-red-500/20",
      partial: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      paid: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      refunded: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getBookingsForDate = (date: Date) => {
    return mockBookings.filter(
      (booking) =>
        booking.tourDate.getDate() === date.getDate() &&
        booking.tourDate.getMonth() === date.getMonth() &&
        booking.tourDate.getFullYear() === date.getFullYear()
    );
  };

  const bookingDates = mockBookings.map((b) => b.tourDate);

  return (
    <AdminLayout title="Bookings Management" breadcrumb={["Bookings"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Bookings Management</h1>
            <p className="text-muted-foreground">Manage and track all tour reservations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="admin-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-xl font-bold">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-xl font-bold">{stats.confirmed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-xl font-bold">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cancelled</p>
                  <p className="text-xl font-bold">{stats.cancelled}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, reference, or tour..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 admin-input"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px] admin-input">
                  <SelectValue placeholder="Booking Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-full md:w-[180px] admin-input">
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs: Table / Calendar */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="table" className="gap-2">
              <TableIcon className="w-4 h-4" />
              Table View
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarDays className="w-4 h-4" />
              Calendar View
            </TabsTrigger>
          </TabsList>

          {/* Table View */}
          <TabsContent value="table">
            <Card className="admin-card">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking Ref</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Tour</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.bookingRef}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.customerName}</p>
                            <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{booking.tourName}</TableCell>
                        <TableCell>
                          {booking.tourDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            {booking.guests}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">${booking.totalAmount}</p>
                            {booking.paidAmount < booking.totalAmount && (
                              <p className="text-sm text-muted-foreground">
                                Paid: ${booking.paidAmount}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>{getPaymentBadge(booking.paymentStatus)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewBooking(booking)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Booking
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="w-4 h-4 mr-2" />
                                Call Customer
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Cancel Booking
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar View */}
          <TabsContent value="calendar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="admin-card lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      booked: bookingDates,
                    }}
                    modifiersStyles={{
                      booked: {
                        backgroundColor: "hsl(var(--primary) / 0.1)",
                        color: "hsl(var(--primary))",
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 rounded bg-primary/10"></div>
                    <span>Dates with bookings</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="admin-card lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Bookings for{" "}
                    {selectedDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDate && getBookingsForDate(selectedDate).length > 0 ? (
                    <div className="space-y-4">
                      {getBookingsForDate(selectedDate).map((booking) => (
                        <div
                          key={booking.id}
                          className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-mono text-sm text-muted-foreground">
                                  {booking.bookingRef}
                                </span>
                                {getStatusBadge(booking.status)}
                                {getPaymentBadge(booking.paymentStatus)}
                              </div>
                              <h4 className="font-semibold text-lg">{booking.tourName}</h4>
                              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {booking.guests} guests
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />$
                                  {booking.totalAmount}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{booking.customerName}</p>
                              <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                              <p className="text-sm text-muted-foreground">{booking.customerPhone}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewBooking(booking)}>
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CalendarDays className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium text-lg mb-1">No bookings for this date</h3>
                      <p className="text-muted-foreground">
                        Select a highlighted date to view bookings
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Booking Details Drawer */}
        <BookingDetailsDrawer
          booking={selectedBooking}
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
        />
      </div>
    </AdminLayout>
  );
};

export default Bookings;
