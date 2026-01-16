import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, DollarSign, Target, Users, MousePointerClick, Eye, ShoppingCart, Calculator, BarChart3, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function ROAI() {
  const [googleAdsData, setGoogleAdsData] = useState({
    adSpend: 5000,
    revenue: 18500,
    clicks: 2450,
    impressions: 125000,
    conversions: 156,
    cpc: 2.04,
  });

  const [metaAdsData, setMetaAdsData] = useState({
    adSpend: 3500,
    revenue: 12800,
    clicks: 1890,
    impressions: 98000,
    conversions: 89,
    cpc: 1.85,
  });

  const calculateROI = (revenue: number, spend: number) => {
    return ((revenue - spend) / spend * 100).toFixed(2);
  };

  const calculateROAS = (revenue: number, spend: number) => {
    return (revenue / spend).toFixed(2);
  };

  const calculateCPA = (spend: number, conversions: number) => {
    return (spend / conversions).toFixed(2);
  };

  const calculateCTR = (clicks: number, impressions: number) => {
    return ((clicks / impressions) * 100).toFixed(2);
  };

  const calculateConversionRate = (conversions: number, clicks: number) => {
    return ((conversions / clicks) * 100).toFixed(2);
  };

  const googleROI = parseFloat(calculateROI(googleAdsData.revenue, googleAdsData.adSpend));
  const metaROI = parseFloat(calculateROI(metaAdsData.revenue, metaAdsData.adSpend));

  return (
    <AdminLayout title="ROAI Calculator" breadcrumb={["Dashboard", "ROAI"]}>
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Ad Spend</p>
                <p className="text-2xl font-bold">${(googleAdsData.adSpend + metaAdsData.adSpend).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${(googleAdsData.revenue + metaAdsData.revenue).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Combined ROAS</p>
                <p className="text-2xl font-bold">{calculateROAS(googleAdsData.revenue + metaAdsData.revenue, googleAdsData.adSpend + metaAdsData.adSpend)}x</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Conversions</p>
                <p className="text-2xl font-bold">{googleAdsData.conversions + metaAdsData.conversions}</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="google" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="google">Google Ads</TabsTrigger>
            <TabsTrigger value="meta">Meta Ads</TabsTrigger>
            <TabsTrigger value="compare">Compare</TabsTrigger>
          </TabsList>

          {/* Google Ads Tab */}
          <TabsContent value="google" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="admin-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Google Ads Data</h3>
                    <p className="text-sm text-muted-foreground">Enter your campaign metrics</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ad Spend ($)</Label>
                    <Input 
                      type="number" 
                      value={googleAdsData.adSpend}
                      onChange={(e) => setGoogleAdsData({...googleAdsData, adSpend: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Revenue ($)</Label>
                    <Input 
                      type="number" 
                      value={googleAdsData.revenue}
                      onChange={(e) => setGoogleAdsData({...googleAdsData, revenue: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Clicks</Label>
                    <Input 
                      type="number" 
                      value={googleAdsData.clicks}
                      onChange={(e) => setGoogleAdsData({...googleAdsData, clicks: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Impressions</Label>
                    <Input 
                      type="number" 
                      value={googleAdsData.impressions}
                      onChange={(e) => setGoogleAdsData({...googleAdsData, impressions: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Conversions</Label>
                    <Input 
                      type="number" 
                      value={googleAdsData.conversions}
                      onChange={(e) => setGoogleAdsData({...googleAdsData, conversions: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Avg. CPC ($)</Label>
                    <Input 
                      type="number" 
                      step="0.01"
                      value={googleAdsData.cpc}
                      onChange={(e) => setGoogleAdsData({...googleAdsData, cpc: Number(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="admin-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Google Ads ROI Analysis</h3>
                    <p className="text-sm text-muted-foreground">Calculated performance metrics</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">ROI (Return on Investment)</span>
                      <span className={`text-xl font-bold ${googleROI >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {googleROI}%
                      </span>
                    </div>
                    <Progress value={Math.min(googleROI, 500) / 5} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">ROAS</span>
                      </div>
                      <p className="text-xl font-bold">{calculateROAS(googleAdsData.revenue, googleAdsData.adSpend)}x</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">CPA</span>
                      </div>
                      <p className="text-xl font-bold">${calculateCPA(googleAdsData.adSpend, googleAdsData.conversions)}</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-1">
                        <MousePointerClick className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">CTR</span>
                      </div>
                      <p className="text-xl font-bold">{calculateCTR(googleAdsData.clicks, googleAdsData.impressions)}%</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-1">
                        <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Conv. Rate</span>
                      </div>
                      <p className="text-xl font-bold">{calculateConversionRate(googleAdsData.conversions, googleAdsData.clicks)}%</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm font-medium mb-1">Net Profit</p>
                    <p className="text-2xl font-bold text-primary">
                      ${(googleAdsData.revenue - googleAdsData.adSpend).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Meta Ads Tab */}
          <TabsContent value="meta" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="admin-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Meta Ads Data</h3>
                    <p className="text-sm text-muted-foreground">Enter your Facebook/Instagram metrics</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ad Spend ($)</Label>
                    <Input 
                      type="number" 
                      value={metaAdsData.adSpend}
                      onChange={(e) => setMetaAdsData({...metaAdsData, adSpend: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Revenue ($)</Label>
                    <Input 
                      type="number" 
                      value={metaAdsData.revenue}
                      onChange={(e) => setMetaAdsData({...metaAdsData, revenue: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Clicks</Label>
                    <Input 
                      type="number" 
                      value={metaAdsData.clicks}
                      onChange={(e) => setMetaAdsData({...metaAdsData, clicks: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Impressions</Label>
                    <Input 
                      type="number" 
                      value={metaAdsData.impressions}
                      onChange={(e) => setMetaAdsData({...metaAdsData, impressions: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Conversions</Label>
                    <Input 
                      type="number" 
                      value={metaAdsData.conversions}
                      onChange={(e) => setMetaAdsData({...metaAdsData, conversions: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Avg. CPC ($)</Label>
                    <Input 
                      type="number" 
                      step="0.01"
                      value={metaAdsData.cpc}
                      onChange={(e) => setMetaAdsData({...metaAdsData, cpc: Number(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="admin-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Meta Ads ROI Analysis</h3>
                    <p className="text-sm text-muted-foreground">Calculated performance metrics</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">ROI (Return on Investment)</span>
                      <span className={`text-xl font-bold ${metaROI >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {metaROI}%
                      </span>
                    </div>
                    <Progress value={Math.min(metaROI, 500) / 5} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">ROAS</span>
                      </div>
                      <p className="text-xl font-bold">{calculateROAS(metaAdsData.revenue, metaAdsData.adSpend)}x</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">CPA</span>
                      </div>
                      <p className="text-xl font-bold">${calculateCPA(metaAdsData.adSpend, metaAdsData.conversions)}</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-1">
                        <MousePointerClick className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">CTR</span>
                      </div>
                      <p className="text-xl font-bold">{calculateCTR(metaAdsData.clicks, metaAdsData.impressions)}%</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-1">
                        <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Conv. Rate</span>
                      </div>
                      <p className="text-xl font-bold">{calculateConversionRate(metaAdsData.conversions, metaAdsData.clicks)}%</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm font-medium mb-1">Net Profit</p>
                    <p className="text-2xl font-bold text-primary">
                      ${(metaAdsData.revenue - metaAdsData.adSpend).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Compare Tab */}
          <TabsContent value="compare" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Platform Comparison</h3>
                  <p className="text-sm text-muted-foreground">Side-by-side analysis of Google Ads vs Meta Ads</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Metric</th>
                      <th className="text-right py-3 px-4 font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Google Ads
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          Meta Ads
                        </div>
                      </th>
                      <th className="text-right py-3 px-4 font-medium">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Ad Spend</td>
                      <td className="text-right py-3 px-4 font-medium">${googleAdsData.adSpend.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 font-medium">${metaAdsData.adSpend.toLocaleString()}</td>
                      <td className="text-right py-3 px-4">
                        <span className={`text-sm ${googleAdsData.adSpend < metaAdsData.adSpend ? 'text-emerald-500' : 'text-blue-500'}`}>
                          {googleAdsData.adSpend < metaAdsData.adSpend ? 'Google' : 'Meta'}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Revenue</td>
                      <td className="text-right py-3 px-4 font-medium">${googleAdsData.revenue.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 font-medium">${metaAdsData.revenue.toLocaleString()}</td>
                      <td className="text-right py-3 px-4">
                        <span className={`text-sm ${googleAdsData.revenue > metaAdsData.revenue ? 'text-emerald-500' : 'text-blue-500'}`}>
                          {googleAdsData.revenue > metaAdsData.revenue ? 'Google' : 'Meta'}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">ROI</td>
                      <td className="text-right py-3 px-4 font-medium">{googleROI}%</td>
                      <td className="text-right py-3 px-4 font-medium">{metaROI}%</td>
                      <td className="text-right py-3 px-4">
                        <span className={`text-sm ${googleROI > metaROI ? 'text-emerald-500' : 'text-blue-500'}`}>
                          {googleROI > metaROI ? 'Google' : 'Meta'}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">ROAS</td>
                      <td className="text-right py-3 px-4 font-medium">{calculateROAS(googleAdsData.revenue, googleAdsData.adSpend)}x</td>
                      <td className="text-right py-3 px-4 font-medium">{calculateROAS(metaAdsData.revenue, metaAdsData.adSpend)}x</td>
                      <td className="text-right py-3 px-4">
                        <span className={`text-sm ${parseFloat(calculateROAS(googleAdsData.revenue, googleAdsData.adSpend)) > parseFloat(calculateROAS(metaAdsData.revenue, metaAdsData.adSpend)) ? 'text-emerald-500' : 'text-blue-500'}`}>
                          {parseFloat(calculateROAS(googleAdsData.revenue, googleAdsData.adSpend)) > parseFloat(calculateROAS(metaAdsData.revenue, metaAdsData.adSpend)) ? 'Google' : 'Meta'}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">CPA</td>
                      <td className="text-right py-3 px-4 font-medium">${calculateCPA(googleAdsData.adSpend, googleAdsData.conversions)}</td>
                      <td className="text-right py-3 px-4 font-medium">${calculateCPA(metaAdsData.adSpend, metaAdsData.conversions)}</td>
                      <td className="text-right py-3 px-4">
                        <span className={`text-sm ${parseFloat(calculateCPA(googleAdsData.adSpend, googleAdsData.conversions)) < parseFloat(calculateCPA(metaAdsData.adSpend, metaAdsData.conversions)) ? 'text-emerald-500' : 'text-blue-500'}`}>
                          {parseFloat(calculateCPA(googleAdsData.adSpend, googleAdsData.conversions)) < parseFloat(calculateCPA(metaAdsData.adSpend, metaAdsData.conversions)) ? 'Google' : 'Meta'}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">CTR</td>
                      <td className="text-right py-3 px-4 font-medium">{calculateCTR(googleAdsData.clicks, googleAdsData.impressions)}%</td>
                      <td className="text-right py-3 px-4 font-medium">{calculateCTR(metaAdsData.clicks, metaAdsData.impressions)}%</td>
                      <td className="text-right py-3 px-4">
                        <span className={`text-sm ${parseFloat(calculateCTR(googleAdsData.clicks, googleAdsData.impressions)) > parseFloat(calculateCTR(metaAdsData.clicks, metaAdsData.impressions)) ? 'text-emerald-500' : 'text-blue-500'}`}>
                          {parseFloat(calculateCTR(googleAdsData.clicks, googleAdsData.impressions)) > parseFloat(calculateCTR(metaAdsData.clicks, metaAdsData.impressions)) ? 'Google' : 'Meta'}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Conversion Rate</td>
                      <td className="text-right py-3 px-4 font-medium">{calculateConversionRate(googleAdsData.conversions, googleAdsData.clicks)}%</td>
                      <td className="text-right py-3 px-4 font-medium">{calculateConversionRate(metaAdsData.conversions, metaAdsData.clicks)}%</td>
                      <td className="text-right py-3 px-4">
                        <span className={`text-sm ${parseFloat(calculateConversionRate(googleAdsData.conversions, googleAdsData.clicks)) > parseFloat(calculateConversionRate(metaAdsData.conversions, metaAdsData.clicks)) ? 'text-emerald-500' : 'text-blue-500'}`}>
                          {parseFloat(calculateConversionRate(googleAdsData.conversions, googleAdsData.clicks)) > parseFloat(calculateConversionRate(metaAdsData.conversions, metaAdsData.clicks)) ? 'Google' : 'Meta'}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Net Profit</td>
                      <td className="text-right py-3 px-4 font-bold text-emerald-500">${(googleAdsData.revenue - googleAdsData.adSpend).toLocaleString()}</td>
                      <td className="text-right py-3 px-4 font-bold text-emerald-500">${(metaAdsData.revenue - metaAdsData.adSpend).toLocaleString()}</td>
                      <td className="text-right py-3 px-4">
                        <span className={`text-sm font-semibold ${(googleAdsData.revenue - googleAdsData.adSpend) > (metaAdsData.revenue - metaAdsData.adSpend) ? 'text-emerald-500' : 'text-blue-500'}`}>
                          {(googleAdsData.revenue - googleAdsData.adSpend) > (metaAdsData.revenue - metaAdsData.adSpend) ? 'Google' : 'Meta'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
