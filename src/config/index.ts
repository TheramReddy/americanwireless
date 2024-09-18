export const PRODUCT_CATEGORIES = [
  {
    label: 'Latest Releases',
    value: 'Latest' as const,
    featured: [
      {
        name: 'Popular picks',
        href: '/products?category=Latest',
        imageSrc: '/nav/ui-kits/16pro_new.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=Latest&sort=desc',
        imageSrc: '/nav/ui-kits/s25_new.jpg',
      },
      {
        name: 'Bestsellers',
        href: '/products?category=Latest',
        imageSrc: '/nav/ui-kits/Huawei_new.jpg',
      },
    ],
  },
  {
    label: 'Accesories',
    value: 'accesories' as const,
    featured: [
      {
        name: 'Favorites',
        href: '/products?category=accesories',
        imageSrc: '/nav/Accesories/airpods_new.jpg',
      },
      {
        name: 'DOLBY',
        href: '/products?category=accesories&sort=desc',
        imageSrc: '/nav/Accesories/soundbar_new.jpg',
      },
      {
        name: 'Headphones',
        href: '/products?category=accesories&sort=desc',
        imageSrc: '/nav/Accesories/case.webp',
      },
    ],
  },
]