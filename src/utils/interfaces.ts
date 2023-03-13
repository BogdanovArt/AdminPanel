import { InputValue } from "@/store/interfaces";
import { Dictionary } from "vue-router/types/router";

export interface NextPL {
  path: string;
  meta: RouteMeta;
}

interface RouteMeta {
  [key: string]: QueryValue;
}

export type QueryValue = string | (string | null)[];
export type Query = Dictionary<QueryValue>;

export interface QueryPL {
  name: string;
  value: InputValue;
  query: Query;
}
