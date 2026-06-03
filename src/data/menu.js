export const menuItems = [
  { id: 'ca-phe-den', category: 'robusta', name: { vi: 'Cà phê đen', en: 'Black Robusta Coffee' }, description: { vi: 'Cà phê robusta đậm vị.', en: 'Bold robusta coffee.' }, price: 18000, isPopular: true, isAvailable: true },
  { id: 'ca-phe-sua', category: 'robusta', name: { vi: 'Cà phê sữa', en: 'Vietnamese Milk Coffee' }, description: { vi: 'Cà phê robusta cùng sữa đặc.', en: 'Robusta coffee with condensed milk.' }, price: 20000, isPopular: true, isAvailable: true },
  { id: 'ca-phe-muoi', category: 'robusta', name: { vi: 'Cà phê muối', en: 'Salt Coffee' }, description: { vi: 'Cà phê vị béo mặn nhẹ.', en: 'Coffee with a creamy salted finish.' }, price: 25000, isPopular: true, isAvailable: true },
  { id: 'bac-xiu', category: 'robusta', name: { vi: 'Bạc xỉu', en: 'Bac Xiu' }, description: { vi: 'Nhiều sữa, nhẹ cà phê.', en: 'Light coffee with more milk.' }, price: 20000, isPopular: true, isAvailable: true },
  { id: 'americano-nuoc-dua', category: 'robusta', name: { vi: 'Americano nước dừa', en: 'Coconut Americano' }, description: { vi: 'Americano pha cùng nước dừa.', en: 'Americano with coconut water.' }, price: 25000, isPopular: false, isAvailable: true },

  { id: 'cacao-dam', category: 'special', name: { vi: 'Cacao dầm', en: 'Cacao Dầm' }, description: { vi: 'Cacao đá dầm béo thơm.', en: 'Rich iced cacao.' }, price: 30000, isPopular: false, isAvailable: true },
  { id: 'cacao-nong', category: 'special', name: { vi: 'Cacao nóng', en: 'Hot Cacao' }, description: { vi: 'Cacao nóng ấm, dễ uống.', en: 'Warm, comforting cacao.' }, price: 25000, isPopular: false, isAvailable: true },
  { id: 'chanh-day-rim-thom', category: 'special', name: { vi: 'Chanh dây rim thơm', en: 'Passion Fruit with Pineapple' }, description: { vi: 'Chanh dây rim thơm chua ngọt.', en: 'Sweet-tart passion fruit with pineapple.' }, price: 30000, isPopular: true, isAvailable: true },
  { id: 'matcha-latte', category: 'special', name: { vi: 'Matcha latte', en: 'Matcha Latte' }, description: { vi: 'Matcha latte béo nhẹ.', en: 'Smooth matcha latte.' }, price: 25000, isPopular: true, isAvailable: true },
  { id: 'cacao-latte', category: 'special', name: { vi: 'Cacao latte', en: 'Cacao Latte' }, description: { vi: 'Cacao latte thơm béo.', en: 'Creamy cacao latte.' }, price: 25000, isPopular: false, isAvailable: true },

  { id: 'sua-chua-danh-da', category: 'yogurt', name: { vi: 'Sữa chua đánh đá', en: 'Iced Blended Yogurt' }, description: { vi: 'Giá thường 20.000đ, bản đặc biệt 30.000đ.', en: 'Regular 20.000đ, special version 30.000đ.' }, price: 20000, priceLabel: '20 - 30', isPopular: true, isAvailable: true },
  { id: 'sua-chua-dau-tay', category: 'yogurt', name: { vi: 'Sữa chua dâu tây', en: 'Strawberry Yogurt' }, description: { vi: 'Sữa chua vị dâu tây.', en: 'Yogurt with strawberry.' }, price: 25000, isPopular: false, isAvailable: true },
  { id: 'sua-chua-dam-viet-quat', category: 'yogurt', name: { vi: 'Sữa chua dầm việt quất', en: 'Blueberry Yogurt' }, description: { vi: 'Sữa chua dầm việt quất.', en: 'Yogurt with blueberry.' }, price: 25000, isPopular: false, isAvailable: true },
  { id: 'sua-chua-chanh-day', category: 'yogurt', name: { vi: 'Sữa chua chanh dây', en: 'Passion Fruit Yogurt' }, description: { vi: 'Sữa chua chanh dây chua ngọt.', en: 'Yogurt with passion fruit.' }, price: 30000, isPopular: false, isAvailable: true },
  { id: 'tra-gung', category: 'yogurt', name: { vi: 'Trà gừng', en: 'Ginger Tea' }, description: { vi: 'Trà gừng ấm nhẹ.', en: 'Warm ginger tea.' }, price: 25000, isPopular: false, isAvailable: true },
  { id: 'lipton', category: 'yogurt', name: { vi: 'Lipton (nóng/đá)', en: 'Lipton Tea (Hot/Iced)' }, description: { vi: 'Lipton dùng nóng hoặc đá.', en: 'Lipton tea, hot or iced.' }, price: 25000, isPopular: false, isAvailable: true },

  { id: 'tra-chanh', category: 'tea', name: { vi: 'Trà chanh', en: 'Lemon Tea' }, description: { vi: 'Giá theo ly: 15.000đ - 20.000đ.', en: 'Cup options: 15.000đ - 20.000đ.' }, price: 15000, priceLabel: '15 - 20', isPopular: false, isAvailable: true },
  { id: 'tra-oi-hong', category: 'tea', name: { vi: 'Trà ổi hồng', en: 'Pink Guava Tea' }, description: { vi: 'Giá theo ly: 25.000đ - 30.000đ.', en: 'Cup options: 25.000đ - 30.000đ.' }, price: 25000, priceLabel: '25 - 30', isPopular: true, isAvailable: true },
  { id: 'tra-thach-vai', category: 'tea', name: { vi: 'Trà thạch vải', en: 'Lychee Jelly Tea' }, description: { vi: 'Giá theo ly: 25.000đ - 30.000đ.', en: 'Cup options: 25.000đ - 30.000đ.' }, price: 25000, priceLabel: '25 - 30', isPopular: false, isAvailable: true },
  { id: 'tra-dua-luoi', category: 'tea', name: { vi: 'Trà dưa lưới', en: 'Melon Tea' }, description: { vi: 'Giá theo ly: 25.000đ - 30.000đ.', en: 'Cup options: 25.000đ - 30.000đ.' }, price: 25000, priceLabel: '25 - 30', isPopular: false, isAvailable: true },
  { id: 'tra-dao-cam-sa', category: 'tea', name: { vi: 'Trà đào cam sả', en: 'Peach Orange Lemongrass Tea' }, description: { vi: 'Giá theo ly: 25.000đ - 30.000đ.', en: 'Cup options: 25.000đ - 30.000đ.' }, price: 25000, priceLabel: '25 - 30', isPopular: true, isAvailable: true },
  { id: 'tra-thom-lai', category: 'tea', name: { vi: 'Trà thơm lài', en: 'Pineapple Jasmine Tea' }, description: { vi: 'Giá theo ly: 25.000đ - 30.000đ.', en: 'Cup options: 25.000đ - 30.000đ.' }, price: 25000, priceLabel: '25 - 30', isPopular: false, isAvailable: true },
  { id: 'tra-sua-truyen-thong', category: 'tea', name: { vi: 'Trà sữa truyền thống', en: 'Classic Milk Tea' }, description: { vi: 'Giá theo ly: 25.000đ - 30.000đ.', en: 'Cup options: 25.000đ - 30.000đ.' }, price: 25000, priceLabel: '25 - 30', isPopular: false, isAvailable: true },
  { id: 'tra-sua-thai-xanh', category: 'tea', name: { vi: 'Trà sữa thái xanh', en: 'Thai Green Milk Tea' }, description: { vi: 'Giá theo ly: 25.000đ - 30.000đ.', en: 'Cup options: 25.000đ - 30.000đ.' }, price: 25000, priceLabel: '25 - 30', isPopular: false, isAvailable: true },
  { id: 'tra-sua-khoai-mon', category: 'tea', name: { vi: 'Trà sữa khoai môn', en: 'Taro Milk Tea' }, description: { vi: 'Giá theo ly: 25.000đ - 30.000đ.', en: 'Cup options: 25.000đ - 30.000đ.' }, price: 25000, priceLabel: '25 - 30', isPopular: false, isAvailable: true },
  { id: 'tra-sua-socola', category: 'tea', name: { vi: 'Trà sữa socola', en: 'Chocolate Milk Tea' }, description: { vi: 'Giá theo ly: 25.000đ - 30.000đ.', en: 'Cup options: 25.000đ - 30.000đ.' }, price: 25000, priceLabel: '25 - 30', isPopular: false, isAvailable: true },
  { id: 'tra-sua-tran-chau-duong-den', category: 'tea', name: { vi: 'Trà sữa trân châu đường đen', en: 'Brown Sugar Bubble Milk Tea' }, description: { vi: 'Giá theo ly: 25.000đ - 30.000đ.', en: 'Cup options: 25.000đ - 30.000đ.' }, price: 25000, priceLabel: '25 - 30', isPopular: false, isAvailable: true },
  { id: 'sua-tuoi-tran-chau-duong-den', category: 'tea', name: { vi: 'Sữa tươi trân châu đường đen', en: 'Brown Sugar Fresh Milk' }, description: { vi: 'Giá theo ly: 25.000đ - 30.000đ.', en: 'Cup options: 25.000đ - 30.000đ.' }, price: 25000, priceLabel: '25 - 30', isPopular: false, isAvailable: true },
  { id: 'tra-trai-cay-nhiet-doi', category: 'tea', name: { vi: 'Trà trái cây nhiệt đới', en: 'Tropical Fruit Tea' }, description: { vi: 'Món ghi tay trên bảng menu.', en: 'Handwritten item on the shop menu.' }, price: 30000, isPopular: false, isAvailable: true },

  { id: 'hat-huong-duong', category: 'food', name: { vi: 'Hạt hướng dương', en: 'Sunflower Seeds' }, description: { vi: 'Món ăn nhẹ.', en: 'Snack.' }, price: 15000, isPopular: false, isAvailable: true },
  { id: 'hat-dua', category: 'food', name: { vi: 'Hạt dưa', en: 'Watermelon Seeds' }, description: { vi: 'Món ăn nhẹ.', en: 'Snack.' }, price: 15000, isPopular: false, isAvailable: true },
  { id: 'xuc-xich-duc', category: 'food', name: { vi: 'Xúc xích Đức (1 phần 2 cây)', en: 'German Sausage' }, description: { vi: 'Một phần gồm 2 cây.', en: 'One serving includes 2 sausages.' }, price: 20000, isPopular: false, isAvailable: true },
  { id: 'khoai-tay-chien', category: 'food', name: { vi: 'Khoai tây chiên', en: 'French Fries' }, description: { vi: 'Khoai tây chiên giòn.', en: 'Crispy fries.' }, price: 25000, isPopular: false, isAvailable: true },
  { id: 'ca-vien-chien', category: 'food', name: { vi: 'Cá viên chiên', en: 'Fried Fish Balls' }, description: { vi: 'Có các phần 30.000đ, 40.000đ, 50.000đ.', en: 'Serving options: 30.000đ, 40.000đ, 50.000đ.' }, price: 30000, priceLabel: '30 - 40 - 50', isPopular: false, isAvailable: true },
  { id: 'xoai-lac', category: 'food', name: { vi: 'Xoài lắc', en: 'Shaken Mango' }, description: { vi: 'Xoài lắc ăn vặt.', en: 'Seasoned shaken mango snack.' }, price: 20000, isPopular: false, isAvailable: true },
  { id: 'chan-ga-sa-tac', category: 'food', name: { vi: 'Chân gà sả tắc', en: 'Chicken Feet with Lemongrass Kumquat' }, description: { vi: 'Món ăn vặt chua cay.', en: 'Tangy spicy snack.' }, price: 50000, isPopular: false, isAvailable: true },
  { id: 'chan-ga-sot-thai', category: 'food', name: { vi: 'Chân gà sốt Thái', en: 'Thai Sauce Chicken Feet' }, description: { vi: 'Chân gà sốt Thái.', en: 'Chicken feet with Thai-style sauce.' }, price: 50000, isPopular: false, isAvailable: true },
  { id: 'mi-ly-trung-xuc-xich', category: 'food', name: { vi: 'Mì ly + trứng hoặc xúc xích Đức', en: 'Cup Noodles with Egg or Sausage' }, description: { vi: 'Mì ly kèm trứng hoặc xúc xích Đức.', en: 'Cup noodles with egg or German sausage.' }, price: 18000, isPopular: false, isAvailable: true },
  { id: 'kem-flan', category: 'food', name: { vi: 'Kem flan (1 phần 3 cái)', en: 'Flan' }, description: { vi: 'Một phần gồm 3 cái.', en: 'One serving includes 3 pieces.' }, price: 20000, isPopular: false, isAvailable: true }
]

export const categories = [
  { id: 'all', vi: 'Tất cả', en: 'All' },
  { id: 'robusta', vi: 'Cà phê Robusta', en: 'Robusta Coffee' },
  { id: 'special', vi: 'Món đặc trưng', en: 'Signature Drinks' },
  { id: 'yogurt', vi: 'Sữa chua', en: 'Yogurt & Tea' },
  { id: 'tea', vi: 'Trà', en: 'Tea & Milk Tea' },
  { id: 'food', vi: 'Menu thức ăn', en: 'Food Menu' }
]
