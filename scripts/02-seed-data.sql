-- Seed data for testing
-- Insert admin user (password: admin123 - should be hashed in real app)
INSERT INTO admins (email, password_hash, name) VALUES 
('admin@supplements.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'مدير النظام');

-- Insert sample products
INSERT INTO products (name_ar, price, quantity, description_ar, low_stock_threshold) VALUES 
('بروتين مصل اللبن', 299.99, 50, 'بروتين عالي الجودة لبناء العضلات وزيادة القوة', 5),
('كرياتين مونوهيدرات', 149.99, 30, 'مكمل الكرياتين الأفضل لزيادة الطاقة والقوة', 10),
('فيتامين د3', 89.99, 100, 'فيتامين د3 عالي التركيز لصحة العظام والمناعة', 15),
('أوميغا 3', 199.99, 75, 'زيت السمك الطبيعي لصحة القلب والدماغ', 8),
('مالتي فيتامين', 129.99, 60, 'مجموعة شاملة من الفيتامينات والمعادن الأساسية', 12);

-- Insert sample pack
INSERT INTO packs (name_ar, description_ar, pack_price) VALUES 
('باقة القوة الكاملة', 'باقة متكاملة تحتوي على البروتين والكرياتين لأفضل النتائج', 399.99);

-- Link products to pack
INSERT INTO pack_products (pack_id, product_id, quantity) VALUES 
(1, 1, 1), -- Protein
(1, 2, 1); -- Creatine

-- Insert sample orders
INSERT INTO orders (client_name, client_phone, client_city, total_amount, status) VALUES 
('أحمد محمد', '0123456789', 'الرياض', 299.99, 'en_attente'),
('فاطمة علي', '0987654321', 'جدة', 399.99, 'validee'),
('محمد سالم', '0555123456', 'الدمام', 149.99, 'expediee');

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, item_name_ar) VALUES 
(1, 1, 1, 299.99, 'بروتين مصل اللبن'),
(2, 1, 1, 299.99, 'بروتين مصل اللبن'),
(2, 2, 1, 149.99, 'كرياتين مونوهيدرات'),
(3, 2, 1, 149.99, 'كرياتين مونوهيدرات');
