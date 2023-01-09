// types from https://developer.edamam.com/edamam-docs-recipe-api

type ImageInfo = {
  url?: string;
  width?: string;
  height?: string;
};

type ImageModel = "THUMBNAIL" | "SMALL" | "REGULAR" | "LARGE";

type InlineModel = Record<ImageModel, ImageInfo>;

type Ingredient = {
  text?: string;
  quantity?: number;
  measure?: string;
  food?: string;
  weight?: number;
  foodId?: string;
};

type NutrientsInfo = Record<string, any>;

type Digest = {
  label?: string;
  tag?: string;
  schemaOrgTag?: string;
  total?: number;
  hasRDI?: boolean;
  daily?: number;
  unit?: string;
  sub?: Digest;
};

export type Recipe = {
  uri?: string;
  label?: string;
  image?: string;
  images?: InlineModel;
  source?: string;
  url?: string;
  shareAs?: string;
  yield?: number;
  dietLabels?: string[];
  healthLabels?: string[];
  cautions?: string[];
  ingredientLines?: string[];
  ingredients?: Ingredient[];
  calories?: number;
  glycemicIndex?: number;
  totalCO2Emissions?: number;
  co2EmissionsClass?: string;
  totalWeight?: number;
  cuisineType?: string[];
  mealType?: string[];
  dishType?: string[];
  instructions?: string[];
  tags?: string[];
  externalId?: string;
  totalNutrients?: NutrientsInfo;
  totalDaily?: NutrientsInfo;
  digest?: Digest;
};

type Link = {
  href?: string;
  title?: string;
};

type Links = {
  self?: Link;
  next?: Link;
};

export type Hit = {
  recipe: Recipe;
  _links?: Links;
};

export type ApiResponse = {
  from?: number;
  to?: number;
  count?: number;
  _links?: Links;
  hits?: Hit[];
};
