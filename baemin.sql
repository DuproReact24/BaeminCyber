-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS cart_id_seq;

-- Table Definition
CREATE TABLE "public"."cart" (
    "id" int4 NOT NULL DEFAULT nextval('cart_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "restaurant_id" int4 NOT NULL,
    "total" int4 NOT NULL,
    "image" varchar(200),
    "total_price" numeric(10,2) NOT NULL DEFAULT 0,
    "status" varchar(50) DEFAULT 'Pending'::character varying,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "name" varchar(120),
    "food_id" int4,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS foods_id_seq;

-- Table Definition
CREATE TABLE "public"."foods" (
    "id" int4 NOT NULL DEFAULT nextval('foods_id_seq'::regclass),
    "menu_id" int4 NOT NULL,
    "name" varchar(255) NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "description" text,
    "image" varchar(200),
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "foods_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS menus_id_seq;

-- Table Definition
CREATE TABLE "public"."menus" (
    "id" int4 NOT NULL DEFAULT nextval('menus_id_seq'::regclass),
    "restaurant_id" int4 NOT NULL,
    "name" varchar(255) NOT NULL,
    "description" text,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "menus_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS order_details_id_seq;

-- Table Definition
CREATE TABLE "public"."order_details" (
    "id" int4 NOT NULL DEFAULT nextval('order_details_id_seq'::regclass),
    "order_id" int4 NOT NULL,
    "food_id" int4 NOT NULL,
    "quantity" int4 NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "total" numeric(10,2) NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "order_details_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "public"."foods"("id") ON DELETE CASCADE,
    CONSTRAINT "order_details_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS orders_id_seq;

-- Table Definition
CREATE TABLE "public"."orders" (
    "id" int4 NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "restaurant_id" int4 NOT NULL,
    "total" int4 NOT NULL,
    "total_price" numeric(10,2) NOT NULL DEFAULT 0,
    "status" varchar(50) DEFAULT 'Pending'::character varying,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "image" varchar(200),
    "name" varchar(200),
    "food_id" int4,
    CONSTRAINT "orders_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE CASCADE,
    CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS restaurants_id_seq;

-- Table Definition
CREATE TABLE "public"."restaurants" (
    "id" int4 NOT NULL DEFAULT nextval('restaurants_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "address" text,
    "phone" varchar(20),
    "image" varchar(200),
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "category" varchar(255),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "full_name" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "phone" varchar(20),
    "address" text,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "password" text NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

INSERT INTO "public"."cart" ("id", "user_id", "restaurant_id", "total", "image", "total_price", "status", "created_at", "name", "food_id") VALUES
(6, 16, 7, 1, 'Tôm hùm hấp bia.jpg', 300000.00, 'pending', '2025-02-08 12:23:08.084', 'Tôm Hùm Hấp', 12);
INSERT INTO "public"."cart" ("id", "user_id", "restaurant_id", "total", "image", "total_price", "status", "created_at", "name", "food_id") VALUES
(7, 16, 7, 2, 'nuongbotoi.jpg', 12872912.00, 'pending', '2025-02-08 12:23:09.169', 'Tôm Hùm Nướng Bơ Tỏi 🦞', 14);
INSERT INTO "public"."cart" ("id", "user_id", "restaurant_id", "total", "image", "total_price", "status", "created_at", "name", "food_id") VALUES
(8, 16, 7, 1, 'Cá Hồi Nướng.jpg', 150000.00, 'pending', '2025-02-08 12:31:12.113', 'Cá Hồi Nướng', 11);

INSERT INTO "public"."foods" ("id", "menu_id", "name", "price", "description", "image", "created_at") VALUES
(13, 7, 'Cơm Gà', 50000.00, 'Cơm gà chiên giòn', 'comga.jpg', '2025-02-08 11:41:15.899576');
INSERT INTO "public"."foods" ("id", "menu_id", "name", "price", "description", "image", "created_at") VALUES
(14, 8, 'Tôm Hùm Nướng Bơ Tỏi 🦞', 6436456.00, NULL, 'nuongbotoi.jpg', '2025-02-08 12:16:29.971231');
INSERT INTO "public"."foods" ("id", "menu_id", "name", "price", "description", "image", "created_at") VALUES
(15, 8, 'Cua Hoàng Đế Hấp Bia 🦀', 63456.00, NULL, 'Cua Hoàng Đế Hấp Bia 🦀.jpg', '2025-02-08 12:16:29.971231');
INSERT INTO "public"."foods" ("id", "menu_id", "name", "price", "description", "image", "created_at") VALUES
(16, 8, 'Hàu Sữa Nướng Phô Mai 🦪', 63456.00, NULL, 'Hàu Sữa Nướng Phô Mai 🦪.jpg', '2025-02-08 12:16:29.971231'),
(17, 10, 'Sò Điệp Nướng Mỡ Hành', 64536.00, NULL, 'Sò Điệp Nướng Mỡ Hành.jpg', '2025-02-08 12:16:29.971231'),
(11, 6, 'Cá Hồi Nướng', 150000.00, 'Cá hồi nướng sốt bơ tỏi', 'Cá Hồi Nướng.jpg', '2025-02-08 11:41:15.899576'),
(12, 6, 'Tôm Hùm Hấp', 300000.00, 'Tôm hùm hấp bia', 'Tôm hùm hấp bia.jpg', '2025-02-08 11:41:15.899576');

INSERT INTO "public"."menus" ("id", "restaurant_id", "name", "description", "created_at") VALUES
(6, 7, 'Hải Sản Tươi Sống', 'Chuyên các món hải sản', '2025-02-08 11:40:07.809302');
INSERT INTO "public"."menus" ("id", "restaurant_id", "name", "description", "created_at") VALUES
(7, 8, 'Món Gà Đặc Biệt', 'Các món gà ngon', '2025-02-08 11:40:07.809302');
INSERT INTO "public"."menus" ("id", "restaurant_id", "name", "description", "created_at") VALUES
(8, 7, 'Hải sản cao cấp', 'Các loại hải sản tươi sống, chất lượng cao', '2025-02-08 12:13:37.224922');
INSERT INTO "public"."menus" ("id", "restaurant_id", "name", "description", "created_at") VALUES
(9, 7, 'lẩu hải sản', 'Những món lẩu thơm ngon từ hải sản tươi', '2025-02-08 12:13:37.224922'),
(10, 7, 'hải sản nướng', 'Hải sản nướng với nhiều loại sốt đặc biệt', '2025-02-08 12:13:37.224922'),
(11, 8, 'cơm mặn', 'Các món cơm đậm đà, giàu dinh dưỡng', '2025-02-08 12:13:37.224922'),
(12, 8, 'cơm chay', 'Các món cơm dành cho người ăn chay', '2025-02-08 12:13:37.224922'),
(13, 8, 'món xào', 'Các món xào thơm ngon, hấp dẫn''', '2025-02-08 12:13:37.224922');



INSERT INTO "public"."orders" ("id", "user_id", "restaurant_id", "total", "total_price", "status", "created_at", "image", "name", "food_id") VALUES
(15, 1, 7, 2, 450000.00, 'Pending', '2025-02-08 11:40:35.700794', NULL, NULL, NULL);
INSERT INTO "public"."orders" ("id", "user_id", "restaurant_id", "total", "total_price", "status", "created_at", "image", "name", "food_id") VALUES
(16, 2, 8, 1, 50000.00, 'Completed', '2025-02-08 11:40:35.700794', NULL, NULL, NULL);
INSERT INTO "public"."orders" ("id", "user_id", "restaurant_id", "total", "total_price", "status", "created_at", "image", "name", "food_id") VALUES
(17, 1, 7, 2, 450000.00, 'Pending', '2025-02-08 11:41:20.287785', NULL, NULL, NULL);
INSERT INTO "public"."orders" ("id", "user_id", "restaurant_id", "total", "total_price", "status", "created_at", "image", "name", "food_id") VALUES
(18, 2, 8, 1, 50000.00, 'Completed', '2025-02-08 11:41:20.287785', NULL, NULL, NULL),
(19, 1, 7, 2, 450000.00, 'Pending', '2025-02-08 11:41:23.520911', NULL, NULL, NULL),
(20, 2, 8, 1, 50000.00, 'Completed', '2025-02-08 11:41:23.520911', NULL, NULL, NULL),
(21, 16, 7, 1, 300000.00, 'pending', '2025-02-08 11:42:02.669', 'tomhumbia.jpg', 'Tôm Hùm Hấp', 12),
(22, 16, 7, 2, 300000.00, 'pending', '2025-02-08 11:42:04.312', 'cahoinuong.jpg', 'Cá Hồi Nướng', 11),
(23, 16, 7, 2, 300000.00, 'pending', '2025-02-08 11:42:04.312', 'cahoinuong.jpg', 'Cá Hồi Nướng', 11),
(24, 16, 7, 1, 300000.00, 'pending', '2025-02-08 11:42:02.669', 'tomhumbia.jpg', 'Tôm Hùm Hấp', 12),
(25, 16, 7, 1, 300000.00, 'pending', '2025-02-08 11:42:02.669', 'tomhumbia.jpg', 'Tôm Hùm Hấp', 12),
(26, 16, 7, 2, 300000.00, 'pending', '2025-02-08 11:42:04.312', 'cahoinuong.jpg', 'Cá Hồi Nướng', 11),
(27, 16, 7, 1, 300000.00, 'pending', '2025-02-08 11:42:02.669', 'OIP.jpg', 'Tôm Hùm Hấp', 12),
(28, 16, 7, 2, 300000.00, 'pending', '2025-02-08 11:42:04.312', 'th.jpg', 'Cá Hồi Nướng', 11);

INSERT INTO "public"."restaurants" ("id", "name", "address", "phone", "image", "created_at", "category") VALUES
(7, 'Nhà Hàng Hải Sản', '123 Đường ABC, Hà Nội', '0912345678', 'OIP.jpg', '2025-02-08 11:39:37.188511', 'Hải sản');
INSERT INTO "public"."restaurants" ("id", "name", "address", "phone", "image", "created_at", "category") VALUES
(8, 'Quán Cơm Bình Dân', '456 Đường XYZ, TP. HCM', '0923456789', 'th.jpg', '2025-02-08 11:39:37.188511', 'Cơm bình dân');
INSERT INTO "public"."restaurants" ("id", "name", "address", "phone", "image", "created_at", "category") VALUES
(9, 'Nhà Hàng Lẩu Nướng', '789 Đường DEF, Đà Nẵng', '0934567890', 'launuong.jpg', '2025-02-08 11:55:00.895331', 'Lẩu & Nướng');
INSERT INTO "public"."restaurants" ("id", "name", "address", "phone", "image", "created_at", "category") VALUES
(10, 'Nhà Hàng Chay An Lạc', '101 Đường GHI, Huế', '0945678901', 'OIP (1).jpg', '2025-02-08 11:55:00.895331', 'Chay'),
(11, 'Nhà Hàng Nhật Bản Sushi Go', '222 Đường JKL, Hà Nội', '0956789012', 'món nhật.jpg', '2025-02-08 11:55:00.895331', 'Nhật Bản'),
(12, 'Quán Bún Đậu Mắm Tôm', '333 Đường MNO, Hải Phòng', '0967890123', 'bún đậu.jpg', '2025-02-08 11:55:00.895331', 'Bún Đậu'),
(13, 'Nhà Hàng Ẩm Thực Việt', '444 Đường PQR, TP. HCM', '0978901234', 'món việt.jpg', '2025-02-08 11:55:00.895331', 'Việt Nam'),
(14, 'Quán Phở Bò Hà Nội', '555 Đường STU, Hà Nội', '0989012345', 'phở.jpg', '2025-02-08 11:55:00.895331', 'Phở'),
(15, 'Nhà Hàng BBQ Hàn Quốc', '666 Đường VWX, Đà Nẵng', '0990123456', 'hàn.jpg', '2025-02-08 11:55:00.895331', 'Hàn Quốc'),
(16, 'Nhà Hàng Bánh Xèo Miền Trung', '777 Đường YZA, Hội An', '0901234567', 'OIP (2).jpg', '2025-02-08 11:55:00.895331', 'Miền Trung');

INSERT INTO "public"."users" ("id", "full_name", "email", "phone", "address", "created_at", "password") VALUES
(1, 'Nguyễn Phước Hiếu', 'duntt24042k4@gmail.com', '123213', 'cà mau', '2025-02-04 04:41:34.599', '$2b$10$oz.qBnrvJ8g5wSFkpxmIC.WlbWdLYo8BAwv9R7Q3ZyFPb3yo4lmE.');
INSERT INTO "public"."users" ("id", "full_name", "email", "phone", "address", "created_at", "password") VALUES
(2, 'Nguyen Phduoc Du', 'phudufavnd@gmail.com', '534534', 'cà mau', '2025-02-04 06:31:06.486', '$2b$10$ZpGj.UEs8TUFiPpff2IAHOojSS6Dse4T7qabMv0URdwxSzjHUgD3q');
INSERT INTO "public"."users" ("id", "full_name", "email", "phone", "address", "created_at", "password") VALUES
(4, 'Nguyen van toan', 'idontno@gmail.com', '23534543', 'ca', '2025-02-07 12:55:36.013', '$2b$10$aKZbcV6uvlYNJ9/OLHHMtObNsSGghqvsboXsg5QbyY7Wfn3xj38tS');
INSERT INTO "public"."users" ("id", "full_name", "email", "phone", "address", "created_at", "password") VALUES
(5, 'du van huong', 'idontn1o@gmail.com', '0912321', 'ca', '2025-02-07 12:56:14.367', '$2b$10$AfadaP1Ql47ZyofytnG0L.iZjy36lR/5TiWv1FFw5M53phqNO0EvK'),
(16, 'phuocHieu', 'du2404@gmaill.com', '5432534', 'cà mau', '2025-02-07 13:02:34.378', '$2b$10$pfBFNwL9PGxhJBbQvzI7LOXel6uleMxvPeGkCCxN5Q/53/8ZiJWsS'),
(17, 'Nguyễn Văn A', 'nguyenvana@example.com', '0987654321', 'Hà Nội, Việt Nam', '2025-02-08 11:36:30.295444', 'hashed_password'),
(18, 'Trần Thị B', 'tranthib@example.com', '0978654321', 'TP. HCM, Việt Nam', '2025-02-08 11:36:30.295444', 'hashed_password'),
(19, 'du@gmgail.com', 'gdf', 'gdf', 'gdf', '2025-02-08 12:31:27.163', '$2b$10$dfbm1TCbVT6PiZpc0bpGZOdft3nENpjC5GBqHLskSdf1Spp02Kufu'),
(20, 'Nguyen phuoc du', 'ahihi@gmail.com', '41234', 'cà mau', '2025-02-08 13:02:02.701', '$2b$10$OB4ulVzl2Pf.PjMs.TQR6uEWo6gQW8NoxGGe0kGtnbXy8N.R.afFa');
