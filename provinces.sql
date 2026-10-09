-- Generated from province.json (34 provinces)
-- Target: PostgreSQL, table "provinces" (TypeORM entity Province)

BEGIN;

INSERT INTO provinces (id, name, slug, type, name_with_type, code)
VALUES
  (11, 'Hà Nội', 'ha-noi', 'thanh-pho', 'Thành phố Hà Nội', '11'),
  (12, 'Hồ Chí Minh', 'ho-chi-minh', 'thanh-pho', 'Thành phố Hồ Chí Minh', '12'),
  (13, 'Đà Nẵng', 'da-nang', 'thanh-pho', 'Thành phố Đà Nẵng', '13'),
  (14, 'Hải Phòng', 'hai-phong', 'thanh-pho', 'Thành phố Hải Phòng', '14'),
  (15, 'Cần Thơ', 'can-tho', 'thanh-pho', 'Thành phố Cần Thơ', '15'),
  (16, 'Huế', 'hue', 'thanh-pho', 'Thành phố Huế', '16'),
  (17, 'An Giang', 'an-giang', 'tinh', 'Tỉnh An Giang', '17'),
  (18, 'Bắc Ninh', 'bac-ninh', 'tinh', 'Tỉnh Bắc Ninh', '18'),
  (19, 'Cà Mau', 'ca-mau', 'tinh', 'Tỉnh Cà Mau', '19'),
  (20, 'Cao Bằng', 'cao-bang', 'tinh', 'Tỉnh Cao Bằng', '20'),
  (21, 'Đắk Lắk', 'dak-lak', 'tinh', 'Tỉnh Đắk Lắk', '21'),
  (22, 'Điện Biên', 'dien-bien', 'tinh', 'Tỉnh Điện Biên', '22'),
  (23, 'Đồng Nai', 'dong-nai', 'thanh-pho', 'Thành phố Đồng Nai', '23'),
  (24, 'Đồng Tháp', 'dong-thap', 'tinh', 'Tỉnh Đồng Tháp', '24'),
  (25, 'Gia Lai', 'gia-lai', 'tinh', 'Tỉnh Gia Lai', '25'),
  (26, 'Hà Tĩnh', 'ha-tinh', 'tinh', 'Tỉnh Hà Tĩnh', '26'),
  (27, 'Hưng Yên', 'hung-yen', 'tinh', 'Tỉnh Hưng Yên', '27'),
  (28, 'Khánh Hòa', 'khanh-hoa', 'tinh', 'Tỉnh Khánh Hòa', '28'),
  (29, 'Lai Châu', 'lai-chau', 'tinh', 'Tỉnh Lai Châu', '29'),
  (30, 'Lâm Đồng', 'lam-dong', 'tinh', 'Tỉnh Lâm Đồng', '30'),
  (31, 'Lạng Sơn', 'lang-son', 'tinh', 'Tỉnh Lạng Sơn', '31'),
  (32, 'Lào Cai', 'lao-cai', 'tinh', 'Tỉnh Lào Cai', '32'),
  (33, 'Nghệ An', 'nghe-an', 'tinh', 'Tỉnh Nghệ An', '33'),
  (34, 'Ninh Bình', 'ninh-binh', 'tinh', 'Tỉnh Ninh Bình', '34'),
  (35, 'Phú Thọ', 'phu-tho', 'tinh', 'Tỉnh Phú Thọ', '35'),
  (36, 'Quảng Ngãi', 'quang-ngai', 'tinh', 'Tỉnh Quảng Ngãi', '36'),
  (37, 'Quảng Ninh', 'quang-ninh', 'tinh', 'Tỉnh Quảng Ninh', '37'),
  (38, 'Quảng Trị', 'quang-tri', 'tinh', 'Tỉnh Quảng Trị', '38'),
  (39, 'Sơn La', 'son-la', 'tinh', 'Tỉnh Sơn La', '39'),
  (40, 'Tây Ninh', 'tay-ninh', 'tinh', 'Tỉnh Tây Ninh', '40'),
  (41, 'Thái Nguyên', 'thai-nguyen', 'tinh', 'Tỉnh Thái Nguyên', '41'),
  (42, 'Thanh Hóa', 'thanh-hoa', 'tinh', 'Tỉnh Thanh Hóa', '42'),
  (43, 'Tuyên Quang', 'tuyen-quang', 'tinh', 'Tỉnh Tuyên Quang', '43'),
  (44, 'Vĩnh Long', 'vinh-long', 'tinh', 'Tỉnh Vĩnh Long', '44')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  type = EXCLUDED.type,
  name_with_type = EXCLUDED.name_with_type,
  code = EXCLUDED.code,
  updated_at = now();

COMMIT;
