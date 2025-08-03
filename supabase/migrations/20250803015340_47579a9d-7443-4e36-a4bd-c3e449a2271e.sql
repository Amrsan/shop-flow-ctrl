-- Insert a test order to demonstrate the activity logging
INSERT INTO public.orders (
  customer_name, 
  product_name, 
  items, 
  total, 
  address, 
  payment_method, 
  shipping_method, 
  status
) VALUES (
  'John Smith',
  'Test Product',
  '[{"product_id": "test-123", "title": "Test Product", "price": 49.99, "quantity": 2}]',
  49.99,
  '123 Main St, Test City',
  'credit',
  'express',
  'pending'
);