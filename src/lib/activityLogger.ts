import { supabase } from "@/integrations/supabase/client";

export async function logActivity(
  actionType: string,
  entityType: string,
  entityId: string,
  entityName: string,
  description: string,
  metadata: Record<string, any> = {}
) {
  try {
    await supabase
      .from("activities")
      .insert([{
        action_type: actionType,
        entity_type: entityType,
        entity_id: entityId,
        entity_name: entityName,
        description: description,
        metadata: metadata
      }]);
  } catch (error) {
    console.error("Failed to log activity:", error);
    // Don't throw error to avoid breaking main functionality
  }
}