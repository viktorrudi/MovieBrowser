const initialState = {
  config: {},
  features: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'STORE_CONFIG': {
      return {
        ...state,
        config: action.payload,
      }
    }
    case 'STORE_FEATURE': {
      const { payload } = action
      return {
        ...state,
        features: {
          ...state.features,
          [payload.featureKey]: payload.data,
        },
      }
    }
    default:
      return state
  }
}
