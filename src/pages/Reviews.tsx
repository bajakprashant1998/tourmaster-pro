import { useState, useMemo } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, CheckCircle, XCircle, Clock, MoreHorizontal, User, ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminReviews, useUpdateReviewStatus, useDeleteReview } from "@/hooks/useAdminReviews";
import { Skeleton } from "@/components/ui/skeleton";

export default function Reviews() {
  const { data: reviews, isLoading } = useAdminReviews();
  const updateStatus = useUpdateReviewStatus();
  const deleteReview = useDeleteReview();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = useMemo(() => {
    let list = reviews || [];
    if (search) {
      list = list.filter(
        (r) =>
          r.author_name.toLowerCase().includes(search.toLowerCase()) ||
          r.comment.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (activeTab !== "all") {
      list = list.filter((r) => r.status === activeTab);
    }
    return list;
  }, [reviews, search, activeTab]);

  const stats = useMemo(() => {
    const all = reviews || [];
    return {
      total: all.length,
      approved: all.filter((r) => r.status === "approved").length,
      pending: all.filter((r) => r.status === "pending").length,
      avgRating: all.length > 0
        ? (all.reduce((sum, r) => sum + r.rating, 0) / all.length).toFixed(1)
        : "0",
    };
  }, [reviews]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "pending": return <Clock className="w-4 h-4 text-amber-500" />;
      case "rejected": return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const ReviewCard = ({ review }: { review: any }) => (
    <div className="admin-card p-5">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">{review.author_name}</p>
              <p className="text-sm text-muted-foreground">{(review.tour as any)?.title || "Unknown Tour"}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
            ))}
          </div>
          <p className="text-muted-foreground">{review.comment}</p>
          <p className="text-sm text-muted-foreground mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            {getStatusIcon(review.status)}
            {review.status?.charAt(0).toUpperCase() + review.status?.slice(1)}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => updateStatus.mutate({ id: review.id, status: "approved" })}>
                <ThumbsUp className="w-4 h-4 mr-2" /> Approve
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus.mutate({ id: review.id, status: "rejected" })}>
                <ThumbsDown className="w-4 h-4 mr-2" /> Reject
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => deleteReview.mutate(review.id)}>
                <XCircle className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );

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
                <p className="text-2xl font-bold">{isLoading ? "—" : stats.total}</p>
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
                <p className="text-2xl font-bold">{isLoading ? "—" : stats.approved}</p>
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
                <p className="text-2xl font-bold">{isLoading ? "—" : stats.pending}</p>
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
                <p className="text-2xl font-bold">{isLoading ? "—" : stats.avgRating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-card p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search reviews..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="admin-card p-5"><Skeleton className="h-20 w-full" /></div>
              ))
            ) : filtered.length === 0 ? (
              <div className="admin-card p-8 text-center text-muted-foreground">No reviews found</div>
            ) : (
              filtered.map((review) => <ReviewCard key={review.id} review={review} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
