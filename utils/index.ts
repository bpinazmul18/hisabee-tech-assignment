export const objToUrlParams = (obj: { [key: string]: any }): string => {
  const keys = Object.keys(obj);
  let paramStr = "";
  if (keys.length) paramStr += "?";

  keys?.forEach((item, index) => {
    let value = obj[item];
    if (!value) return;
    if (typeof value === "boolean") paramStr += item + "=" + (value ? 1 : 0);
    else if (Array.isArray(value))
      paramStr +=
        item +
        "=" +
        value
          .map((i) => {
            return typeof i === "string"
              ? i.trim()
              : typeof i === "boolean"
              ? i
                ? 1
                : 0
              : i;
          })
          .join(",");
    else paramStr += item + "=" + value;

    if (index !== keys.length - 1) paramStr += "&";
  });

  return paramStr;
};

export const formatUrl = (url: string, paramObj: { [key: string]: any }): string => {
  url += objToUrlParams(paramObj);
  return url;
};