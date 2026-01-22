import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  CreditCard,
  Receipt,
  RotateCcw,
  Send,
  Printer,
  Ban,
} from "lucide-react";
import { toast } from "sonner";

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

interface PaymentHistoryItem {
  id: string;
  date: Date;
  amount: number;
  method: string;
  status: "success" | "failed" | "pending" | "refunded";
  transactionId: string;
}

interface BookingDetailsDrawerProps {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock payment history
const getPaymentHistory = (booking: Booking): PaymentHistoryItem[] => {
  if (booking.paymentStatus === "unpaid") return [];
  
  const payments: PaymentHistoryItem[] = [];
  
  if (booking.paidAmount > 0) {
    payments.push({
      id: "pay_1",
      date: new Date(booking.createdAt.getTime() + 1000 * 60 * 30),
      amount: booking.paymentStatus === "partial" ? booking.paidAmount : booking.totalAmount,
      method: "Credit Card",
      status: "success",
      transactionId: `TXN-${booking.id}-001`,
    });
  }
  
  if (booking.paymentStatus === "refunded") {
    payments.push({
      id: "pay_2",
      date: new Date(booking.createdAt.getTime() + 1000 * 60 * 60 * 24 * 2),
      amount: -booking.totalAmount,
      method: "Refund",
      status: "refunded",
      transactionId: `REF-${booking.id}-001`,
    });
  }
  
  return payments;
};

export function BookingDetailsDrawer({ booking, open, onOpenChange }: BookingDetailsDrawerProps) {
  if (!booking) return null;

  const paymentHistory = getPaymentHistory(booking);
  const balanceDue = booking.totalAmount - booking.paidAmount;

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

  const getPaymentStatusBadge = (status: PaymentHistoryItem["status"]) => {
    const styles = {
      success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      failed: "bg-red-500/10 text-red-500 border-red-500/20",
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      refunded: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleConfirm = () => {
    toast.success("Booking confirmed successfully!");
    onOpenChange(false);
  };

  const handleCancel = () => {
    toast.success("Booking has been cancelled");
    onOpenChange(false);
  };

  const handleRefund = () => {
    toast.success("Refund initiated successfully!");
    onOpenChange(false);
  };

  const handleSendConfirmation = () => {
    toast.success("Confirmation email sent to customer");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-mono text-muted-foreground">{booking.bookingRef}</p>
              <SheetTitle className="text-xl mt-1">Booking Details</SheetTitle>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(booking.status)}
              {getPaymentBadge(booking.paymentStatus)}
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 pb-6">
          {/* Tour Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Tour Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-lg">{booking.tourName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {booking.tourDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{booking.guests} Guests</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {booking.customerName.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{booking.customerName}</p>
                  <p className="text-sm text-muted-foreground">Customer since Jan 2026</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${booking.customerEmail}`} className="text-primary hover:underline">
                    {booking.customerEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href={`tel:${booking.customerPhone}`} className="text-primary hover:underline">
                    {booking.customerPhone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-semibold">${booking.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Paid Amount</span>
                <span className="font-semibold text-emerald-600">
                  ${booking.paidAmount.toLocaleString()}
                </span>
              </div>
              {balanceDue > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Balance Due</span>
                  <span className="font-semibold text-amber-600">
                    ${balanceDue.toLocaleString()}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Payment Status</span>
                {getPaymentBadge(booking.paymentStatus)}
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Receipt className="w-4 h-4 text-primary" />
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {paymentHistory.length > 0 ? (
                <div className="space-y-3">
                  {paymentHistory.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          payment.amount > 0 ? "bg-emerald-500/10" : "bg-gray-500/10"
                        }`}>
                          {payment.amount > 0 ? (
                            <DollarSign className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <RotateCcw className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{payment.method}</p>
                          <p className="text-xs text-muted-foreground">
                            {payment.date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <p className="text-xs font-mono text-muted-foreground">
                            {payment.transactionId}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          payment.amount > 0 ? "text-emerald-600" : "text-gray-600"
                        }`}>
                          {payment.amount > 0 ? "+" : ""}${Math.abs(payment.amount).toLocaleString()}
                        </p>
                        {getPaymentStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Receipt className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No payment records</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Booking Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Booking Created</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.createdAt.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                {booking.status === "confirmed" && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Booking Confirmed</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.createdAt.getTime() + 1000 * 60 * 60).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                )}
                {booking.status === "completed" && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Tour Completed</p>
                      <p className="text-xs text-muted-foreground">
                        {booking.tourDate.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}
                {booking.status === "cancelled" && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Booking Cancelled</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.createdAt.getTime() + 1000 * 60 * 60 * 24).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleSendConfirmation}>
                <Send className="w-4 h-4 mr-2" />
                Send Confirmation
              </Button>
              <Button variant="outline" className="flex-1">
                <Printer className="w-4 h-4 mr-2" />
                Print Invoice
              </Button>
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-2">
              {/* Confirm Button */}
              {(booking.status === "pending") && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Booking</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to confirm this booking? A confirmation email will be sent to the customer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleConfirm} className="bg-emerald-600 hover:bg-emerald-700">
                        Confirm Booking
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {/* Cancel Button */}
              {(booking.status === "pending" || booking.status === "confirmed") && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Ban className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this booking? This action cannot be undone and the customer will be notified.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancel} className="bg-destructive hover:bg-destructive/90">
                        Cancel Booking
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {/* Refund Button */}
              {(booking.paidAmount > 0 && booking.paymentStatus !== "refunded") && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Refund
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Process Refund</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to refund ${booking.paidAmount.toLocaleString()} to the customer? This will process a refund to the original payment method.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleRefund}>
                        Process Refund
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
