-- Add status column to orders table
ALTER TABLE public.orders 
ADD COLUMN status text NOT NULL DEFAULT 'pending';

-- Create a check constraint to ensure valid status values
ALTER TABLE public.orders 
ADD CONSTRAINT orders_status_check 
CHECK (status IN ('pending', 'success', 'cancelled'));