-- Create a trigger function to log activities when orders are inserted
CREATE OR REPLACE FUNCTION public.log_order_activity()
RETURNS TRIGGER AS $$
BEGIN
  -- Log activity for new order
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.activities (
      action_type,
      entity_type,
      entity_id,
      entity_name,
      description,
      metadata
    ) VALUES (
      'order_placed',
      'order',
      NEW.id::text,
      'Order #' || NEW.id,
      'New order placed by ' || COALESCE(NEW.customer_name, 'Unknown customer'),
      jsonb_build_object(
        'total', NEW.total,
        'customer', NEW.customer_name,
        'product_name', NEW.product_name,
        'status', NEW.status
      )
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create the trigger for order insertions
CREATE TRIGGER trigger_log_order_activity
  AFTER INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.log_order_activity();