import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, CheckCircle, XCircle, Clock, MoreHorizontal, User, ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const reviews = [
  { id: 1, customer: "John Smith", tour: "Dubai Desert Safari", rating: 5, comment: "Amazing experience! The sunset views were breathtaking.", date: "2026-01-15", status: "Approved" },
  { id: 2, customer: "Emily Davis", tour: "Abu Dhabi City Tour", rating: 4, comment: "Great tour guide, very knowledgeable about the history.", date: "2026-01-14", status: "Approved" },
  { id: 3, customer: "Robert Wilson", tour: "Burj Khalifa Visit", rating: 5, comment: "Once in a lifetime experience! Highly recommend.", date: "2026-01-13", status: "Pending" },
  { id: 4, customer: "Sarah Miller", tour: "Dhow Cruise Dinner", rating: 3, comment: "Good food but the boat was crowded.", date: "2026-01-12", status: "Pending" },
  { id: 5, customer: "James Brown", tour: "Ferrari World", rating: 5, comment: "Best theme park ever! The roller coaster was incredible.", date: "2026-01-11", status: "Rejected" },
];

export default function Reviews() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "Pending": return <Clock className="w-4 h-4 text-amber-500" />;
      case "Rejected": return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <AdminLayout title="Reviews" breadcrumb={["Dashboard", "Reviews"]}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-bold">2,456</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">2,198</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">187</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">4.7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-card p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search reviews..." className="pl-9" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="pending">Pending (187)</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="admin-card p-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{review.customer}</p>
                        <p className="text-sm text-muted-foreground">{review.tour}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    <p className="text-sm text-muted-foreground mt-2">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getStatusIcon(review.status)}
                      {review.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><ThumbsUp className="w-4 h-4 mr-2" /> Approve</DropdownMenuItem>
                        <DropdownMenuItem><ThumbsDown className="w-4 h-4 mr-2" /> Reject</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><XCircle className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="pending">
            <div className="admin-card p-8 text-center text-muted-foreground">
              Pending reviews will appear here
            </div>
          </TabsContent>

          <TabsContent value="approved">
            <div className="admin-card p-8 text-center text-muted-foreground">
              Approved reviews will appear here
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="admin-card p-8 text-center text-muted-foreground">
              Rejected reviews will appear here
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
