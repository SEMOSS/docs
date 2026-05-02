export const appNameUpdater = (
  sourceToUpdate,
  valToUpdate = "SEMOSS",
  appName = process.env.APP_NAME
) => {
  const updatedSource = sourceToUpdate.map((item) => {
    return {
      ...item,
      ...(Object.hasOwn(item, "label") && {
        label: item?.label?.replace(valToUpdate, appName) || item.label,
      }),
      ...(Object.hasOwn(item, "items") && {
        items: item?.items
          ? appNameUpdater(item.items, valToUpdate, appName)
          : item.items,
      }),
    };
  });
  return updatedSource;
};
