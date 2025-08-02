import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Activity {
  id: string;
  action_type: string;
  entity_type: string;
  entity_id: string;
  entity_name: string | null;
  description: string;
  metadata: Record<string, any>;
  created_at: string;
}

export function useActivities(limit: number = 10) {
  return useQuery({
    queryKey: ["activities", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return data as Activity[];
    },
  });
}

// Helper function to get activity icon color based on action type
export function getActivityColor(actionType: string): string {
  switch (actionType) {
    case 'order_placed':
    case 'product_added':
      return 'bg-success';
    case 'order_status_changed':
    case 'product_updated':
      return 'bg-primary';
    case 'order_deleted':
    case 'product_deleted':
      return 'bg-destructive';
    default:
      return 'bg-muted-foreground';
  }
}

// Helper function to format time ago
export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} min ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}