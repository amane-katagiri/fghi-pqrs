import type { z } from "zod";

export const schemaForType =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

export const urlValidator =
  (option?: { required?: boolean }): ((url?: string) => boolean) =>
  (url?: string): boolean => {
    if (url == null || url === "") {
      return !option?.required;
    }
    try {
      new URL(url);
    } catch (err) {
      return false;
    }
    return url.startsWith("http");
  };
