// categories.ts
// the 8 shop department from the homepage, "icon" is the material icon name the website shows

// step 10:write the demo data/API
// the demo lives in plain ts files: categories here, products, reviews, promo codes and user next to  it. edit them  to change the shop's content

export const categories = [
  { name: "Electronics", slug: "electronics", icon: "devices" },
  { name: "Fashion", slug: "fashion", icon: "checkroom" },
  { name: "Home & Living", slug: "home-living", icon: "chair" },
  { name: "Beauty", slug: "beauty", icon: "spa" },
  { name: "Sports", slug: "sports", icon: "fitness_center" },
  { name: "Books", slug: "books", icon: "menu_book" },
  { name: "Office", slug: "office", icon: "desk" },
  { name: "Kitchen", slug: "kitchen", icon: "soup_kitchen" },
];

// step 11:put demo data in database -> server/src/data/demo.ts