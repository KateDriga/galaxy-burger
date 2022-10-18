export const selectOrderState = state => {
  return {
    isOrderLoading: state.order.isLoading,
    isOrderFailed: state.order.isFailed,
  };
};

export const selectOrderNumber = state => state.order.orderNumber;
