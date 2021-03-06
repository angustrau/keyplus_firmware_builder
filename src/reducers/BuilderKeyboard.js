function BuilderKeyboard(state = {
    zoom: 50,
    selectedKeyIndex: -1,
    layer: 0,
    matrixView: 'values',
    flipped: false
}, action) {
    switch(action.type) {
        case 'ZOOM_KEYBOARD_IN':
            return {
                ...state,
                zoom: state.zoom + 10
            }
        case 'ZOOM_KEYBOARD_OUT':
            return {
                ...state,
                zoom: Math.max(state.zoom - 10, 20)
            }
        case 'ZOOM_KEYBOARD_RESET':
            return {
                ...state,
                zoom: 50
            }
        case 'SELECT_KEYBOARD_KEY':
            return {
                ...state,
                selectedKeyIndex: state.selectedKeyIndex === action.index ? -1 : action.index
            }
        case 'SELECT_KEYBOARD_LAYER':
            return {
                ...state,
                layer: action.layer
            }
        case 'SELECT_KEYBOARD_MATRIXVIEW':
            return {
                ...state,
                matrixView: action.view
            }
        case 'FLIP_KEYBOARD':
            return {
                ...state,
                flipped: !state.flipped
            }
        default:
            return state;
    }
}

export default BuilderKeyboard;