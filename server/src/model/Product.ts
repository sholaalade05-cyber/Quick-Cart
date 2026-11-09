// product model
// something the shop sells. prices and whole naira, eg  54000 = N45,000

import { Schema, Types } from "mongoose";

export interface IProductColor {
  name: String; // eg "Midnight Black"
  hex: String; // eg, "#1f2937"
}

export interface IProductSpec {
  group: String; // eg "audio&connectivity"
  label: String; // eg "driver size"
  value: String; // eg "40mmm neodynium"
}

export interface IProductHightlight {
  icon: String; // material icon home, eg "hearing"
  title: String; // eg "hybrid actve noise canceling"
  text: String; //one or two sentence
}

// step8: the product model
// everything about product: name, slug, price (whole naira) stock, image, colours, specs, rating....

export interface IProduct {
  name: String;
  slug: String;
  description: String;
  tagline: string; // one short line for small  cards eg. "braided 1.8m lossless wire"
  priceNote: string; // shortline under  the price on small card. eg "free shipping"
  features: string[];
  specs: IProductSpec[];
  category: Types.ObjectId; // points to a category
  brand: string;
  sku: string; //  stock code eg "QC-AU-9042"
  price: number;
  reviewCount: number;
  oldPrice?: number; // crossed-out price when on sale
  costPrice?: number;
  trackStock: boolean; // false = never sells out  and stock isnt counted down (eg mae to order)
  stock: number;
  lowStockThreshold: number;
  images: string[];
  gallery: string[];
  colors: IProductColor;
  tags: string[];
  badge?: string;
  hightlights: IProductHightlight[];
  ratings: number;
  ratingCount: number[];

  solid: number;
  flashSaleStock?: number;
  bundleProduct: Types.ObjectId[]; //"frequently bought together" product
  relatedProducts: Types.ObjectId[]; // "related products"
  status: "published" | "draft" | "scheduled";
  publishAt?: Date; // for "schedule": the product goes live at this time
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      default: "",
    },

    tagline: {
      type: String,
    },

    priceNote: {
      type: String,
    },

    features: [{ type: String }],
    specs: [{ group: String, label: String, value: String }],

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    brand: {
      type: String,
      default: "",
    },

    sku: { type: String, required: true, unique: true },

    price: { type: Number, required: true, min: 0 },

    oldPrice: { type: Number, min: 0 },

    costPrice: { type: Number, min: 0 },

    trackStock: { type: Boolean, default: true },
    stock: { type: Number, required: true, min: 0, default: 0 },

    lowStockThreshold: { type: Number, default: 10 },
    images: [{ type: String }],

    colors: [{ name: String, hex: String }],

    tags: [{ type: String }],

    badge: { type: String },

    hightlights: [{ icon: String, title: String, text: String }],

    ratings: { type: Number, default: 0, min: 0, max: 5 },

    ratingCount: [{ type: Number }],

    reviewCount: [{ type: Number }],

    solid: { type: Number, default: 0, min: 0 },

    flashSaleStock: { type: Number, min: 0 },

    bundleProduct: [{ type: Schema.Types.ObjectId, ref: "Product" }],

    relatedProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],

    status: {
      type: String,
      enum: ["published", "draft", "scheduled"],
      default: "published",
    },

    publishAt: { type: Date },
  },

  { timestamps: true },
);

// step8: pArt of this step: the product model
// the filtrt every public products query uses

// products shoppers can seee right now: published, or scheduled with their time already passed.
// use it in every public query

export const livePrroducts = () => {
  return {
    $or: [
      { status: "published" as const },
      { status: "scheduled" as const, publishAt: { $lte: new Date() } },
    ],
  };
};
