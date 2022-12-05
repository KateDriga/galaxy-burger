export const formatOrderNumber = (orderNumber: number): string =>
  orderNumber.toString().padStart(6, '0');

export const generateObjFromArray = <T extends { _id: string }>(
  array: Array<T>
): Record<string, T> => {
  return array.reduce(
    (acc: Record<string, T>, item: T) => ({
      ...acc,
      [item._id]: item,
    }),
    {}
  );
};
