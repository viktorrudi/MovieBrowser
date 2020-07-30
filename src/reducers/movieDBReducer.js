const initialState = {
  config: {},
  features: {},
}

function normalize(dataAsArray) {
  return dataAsArray.reduce((dataAsDictionary, data) => {
    return {
      ...dataAsDictionary,
      [data.id]: data,
    }
  }, {})
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
