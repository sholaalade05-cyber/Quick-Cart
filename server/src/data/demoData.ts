// truns demo data files (categories.ts, product.ts) into records shaped like the models, ready for seed.ts to save. nothing here talk to mongoDB

import { Types } from "mongoose";
import { PHOTO_FOLDER, photoUri } from "../config/cloudinary";
import { categories } from "./categories";
import { products, seedProduct } from "./products";
import { slugify } from "../utils/Slugify";

// next: step12 (the seed command) -> server/src/data/send.ts
// put the demo data in the database(part1: sharp the records)
// the data files uses slugs and simple names; the database need real ids, full photo addresses and every file model except. these functions do translation

// ===star rating breakdown======
// the product page shows bars  5,4,3,2,1 stars. when products.ts doesnt give ratingCounts, we make beliveable ones  for avrage rating.
// each row: if the rsting  is  at least minRating, spit the reviews like this(percent)

const RATING_SHARE = [
  { minRating: 4.7, shares: [80, 14, 4, 1, 1] },
  { minRating: 4.4, shares: [65, 22, 8, 3, 2] },
  { minRating: 4.7, shares: [50, 20, 12, 6, 4] },
  { minRating: 4.7, shares: [35, 30, 10, 10, 7] },
];

// makeRatingCounts(4.8, 248)  -> [199, 35, 10, 2, 2] (adds up to exactly 248)
export const makeRatingCounts = (
  rating: number,
  reviewCount: number,
): number[] => {
  const { shares } = RATING_SHARE.find((row) => {
    return rating >= row.minRating;
  })!;

  const counts = shares.map((share) => {
    return Math.round((reviewCount * share) / 100);
  });

  // rounding can leave us 1 or 2 off;  give the difference to the bar
  const total = counts.reduce((sum, count) => {
    return sum + count;
  }, 0);

  counts[0] += reviewCount - total;
  return counts;
};

// --  photos--------------------------
// from  all photo  ids on  cloudinary  pick this products ones ("<slug>-1", "<slug>-2".....)
// put them in number order, and turn them into full address.

export const photosFor = (slug: string, photoIds: string[]): string[] => {
  const prefix = `${PHOTO_FOLDER}/${slug}-`;

  return photoIds
    .filter((id) => {
      return id.startsWith(prefix) && /^\d+$/.test(id.slice(prefix.length));
    })
    .sort((a, b) => {
      return Number(a.slice(prefix.length)) - Number(b.slice(prefix.length));
    })
    .map(photoUri);
};

// ---------------categories---------------
// categories.ts  is  alraedy shaped like the category model, so we hand it over as it  is.
export const demoCategories = () => {
  return categories;
};

// ------products----
// one product  from products.ts  ->
const buildProduct = (
  item: seedProduct,
  categoryId: Types.ObjectId,
  photoIds: string[],
) => {
  const slug = slugify(item.name);

  return {
    name: item.name,
    slug,
    description: item.description,
    tagline: item.tagline,
    priceNote: item.priceeNote,
    features: item.features ?? [],
    specs: item.specs ?? [],
    category: categoryId,
    brand: item.brand,
    sku: item.sku,
    price: item.price,
    oldPrice: item.oldPrice,
    costPrice: Math.round(item.price * 0.6), // pretend the shop paid 60% (admin margin display)
    trackStock: true,
    stock: item.stock,
    lowStockThreshold: 10,
    images: photosFor(slug, photoIds),
    gallery: [], // empty = the product page uses images
    colors: item.colors ?? [],
    tags: item.tags ?? [],
    badge: item.badge,
    highlights: item.highlights ?? [],
    ratings: item.rating, // products.ts says "rating", the model says "ratings"
    reviewCount: item.reviewCount,
    ratingCounts:
      item.ratingCounts ?? makeRatingCounts(item.rating, item.reviewCount),
    sold: item.solid ?? item.reviewCount * 4,
    flashSaleStock: item.flashSaleStock,
    status: "published" as const,
  };
};

// all 40 products.categoryIds maps a cateegory slug to its saved_id eg "electronics" -> ObjectId("665f.....")
export const demoProducts = (
  categoryIds: Map<string, Types.ObjectId>,
  photoIds: string[],
) => {
  return products.map((item) => {
    const categoryId = categoryIds.get(item.category);

    // a  typo in  product.ts  (eg  "electronic") should stop the  seed loudly, not save bad  data
    if (!categoryId) {
      throw new Error(
        `"${item.name}" has an unknown category: "${item.category}"`,
      );
    }

    return buildProduct(item, categoryId, photoIds);
  });
};
