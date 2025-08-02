-- Create activities table to track user actions
CREATE TABLE public.activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  action_type TEXT NOT NULL CHECK (action_type IN ('product_added', 'product_updated', 'product_deleted', 'order_placed', 'order_status_changed', 'order_deleted')),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('product', 'order')),
  entity_id TEXT NOT NULL,
  entity_name TEXT,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to view activities (public activity feed)
CREATE POLICY "Everyone can view activities" 
ON public.activities 
FOR SELECT 
USING (true);

-- Create policy to allow inserting activities (for system/app use)
CREATE POLICY "System can insert activities" 
ON public.activities 
FOR INSERT 
WITH CHECK (true);

-- Create index for better performance when querying recent activities
CREATE INDEX idx_activities_created_at ON public.activities(created_at DESC);
CREATE INDEX idx_activities_action_type ON public.activities(action_type);

-- Insert some sample activities for demonstration
INSERT INTO public.activities (action_type, entity_type, entity_id, entity_name, description, metadata) VALUES
('order_placed', 'order', '1', 'Order #1', 'New order placed by John Doe', '{"total": 29.99, "customer": "John Doe"}'),
('product_added', 'product', gen_random_uuid()::text, 'Wireless Headphones', 'New product added to catalog', '{"category": "Electronics", "price": 79.99}'),
('order_status_changed', 'order', '2', 'Order #2', 'Order status changed from pending to success', '{"old_status": "pending", "new_status": "success"}'),
('product_updated', 'product', gen_random_uuid()::text, 'Smart Watch', 'Product stock updated', '{"old_stock": 10, "new_stock": 5}'),
('order_status_changed', 'order', '3', 'Order #3', 'Order status changed from pending to cancelled', '{"old_status": "pending", "new_status": "cancelled"}');