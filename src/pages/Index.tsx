import { BarChart3, Package, ShoppingCart, DollarSign, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActivities, getActivityColor, formatTimeAgo } from "@/hooks/useActivities";

const Index = () => {
  const { data: activities, isLoading: activitiesLoading } = useActivities(5);

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Total Products",
      value: "1,234",
      change: "+5.2%", 
      icon: Package,
      trend: "up"
    },
    {
      title: "Orders",
      value: "856",
      change: "+8.1%",
      icon: ShoppingCart,
      trend: "up"
    },
    {
      title: "Customers",
      value: "2,430",
      change: "+15.3%",
      icon: Users,
      trend: "up"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-medium hover:shadow-large transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Manage Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-primary-foreground/80 mb-4">
              Add, edit, and organize your product catalog
            </p>
            <a 
              href="/products" 
              className="inline-flex items-center justify-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm font-medium transition-colors"
            >
              Go to Products →
            </a>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success text-success-foreground border-0 shadow-medium hover:shadow-large transition-all duration-300 align-self-end">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              View Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-success-foreground/80 mb-4">
              Track and manage customer orders
            </p>
            <a 
              href="/orders" 
              className="inline-flex items-center justify-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm font-medium transition-colors"
            >
              View Orders →
            </a>
          </CardContent>
        </Card>

{/*         <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View detailed reports and insights
            </p>
            <a 
              href="/analytics" 
              className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-sm font-medium transition-colors"
            >
              View Analytics →
            </a>
          </CardContent>
        </Card> */}
      </div>

      {/* Recent Activity */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {activitiesLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 bg-muted rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
                  </div>
                  <div className="h-3 bg-muted rounded w-16 animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {activities && activities.length > 0 ? (
                activities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className={`h-2 w-2 ${getActivityColor(activity.action_type)} rounded-full`}></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.description}</p>
                      {activity.entity_name && (
                        <p className="text-sm text-muted-foreground">
                          {activity.entity_name}
                          {activity.metadata?.total && ` - $${activity.metadata.total}`}
                          {activity.metadata?.customer && ` by ${activity.metadata.customer}`}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatTimeAgo(activity.created_at)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No recent activity</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
