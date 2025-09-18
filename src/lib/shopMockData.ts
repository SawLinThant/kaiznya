export interface ShopItem {
  id: string;
  name: string;
  image: string;
  location: string;
  phone: string;
  hours: string;
}

export function getShopsMock(): ShopItem[] {
  return [
    {
      id: 's1',
      name: 'Kanaiya Flagship — Bangkok',
      image: 'https://cdn.kanaiya.shop/pics/banner/banner1.jpg',
      location: 'Petchkasem 74130, Bangkok, Thailand',
      phone: '+66 2 123 4567',
      hours: 'Mon–Sun: 10:00–20:00',
    },
    {
      id: 's2',
      name: 'Kanaiya Boutique — Chiang Mai',
      image: 'https://cdn.kanaiya.shop/pics/banner/banner2.jpg',
      location: 'Old City, Chiang Mai, Thailand',
      phone: '+66 52 234 567',
      hours: 'Mon–Sun: 10:00–19:00',
    },
    {
      id: 's3',
      name: 'Kanaiya Counter — Yangon',
      image: 'https://cdn.kanaiya.shop/pics/C_P/1.jpg',
      location: 'AYCT Condominium, Yangon, Myanmar',
      phone: '+95 1 555 123',
      hours: 'Mon–Fri: 9:00–18:00',
    },
    {
      id: 's4',
      name: 'Kanaiya Studio — Mandalay',
      image: 'https://cdn.kanaiya.shop/pics/C_P/1.png',
      location: 'Chanayethazan, Mandalay, Myanmar',
      phone: '+95 2 777 888',
      hours: 'Tue–Sun: 10:00–19:00',
    },
    {
      id: 's5',
      name: 'Kanaiya Kiosk — Phuket',
      image: 'https://cdn.kanaiya.shop/pics/faceserum/BlueSerum1.png',
      location: 'Patong, Phuket, Thailand',
      phone: '+66 76 111 222',
      hours: 'Daily: 11:00–21:00',
    },
    {
      id: 's6',
      name: 'Kanaiya Corner — Hanoi',
      image: 'https://cdn.kanaiya.shop/pics/C_P/1.jpg',
      location: 'Hoàn Kiếm, Hanoi, Vietnam',
      phone: '+84 24 333 444',
      hours: 'Mon–Sat: 10:00–19:00',
    },
  ];
}


