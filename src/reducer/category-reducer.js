export default (state = [], { type, payload }) => {
  switch (type) {
    case 'CATEGORY_CREATE':
      return [...state, payload];
    case 'CATEGORY_UPDATE':
      return state.map((category) => {
        if (category.id === payload.id) {
          category.name = payload.name;
        }
        return category;
      });
    case 'CATEGORY_DELETE':
      return state.filter((category) => category.id !== payload.id);
    default:
      return state;
  }
};