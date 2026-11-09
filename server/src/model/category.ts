// category model
// a  shop department , eg Electronics,Fashion,Home & living

import { model, Schema } from "mongoose";

// step7:The category model describes what one record looks like in the database. Icategory is the TS type; the schema tells MongoDB the rules (required,unique...)

export interface ICategory {
  name: string;
  slug: string; //used in links, eg "home-living"
  icon: string; //  name of the icon shown on the website
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    icon: { type: String, default: "" },
  },
  { timestamps: true },
);

export const Category = model<ICategory>("Category", categorySchema);


// step8: (the process model) ->  server/src/model/products.ts
