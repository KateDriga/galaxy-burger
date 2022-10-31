export const selectOrderState = state => {
  return {
    isLoading: state.order.isLoading,
    isFailed: state.order.isFailed,
  };
};

export const selectOrderNumber = state => state.order.orderNumber;
