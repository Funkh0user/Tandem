
export default (state, action) => {
    switch (action.type) {
        case "EXPAND_CARD":
            console.log("trigger")
            return {...state, isExpanded: !state.isExpanded}
    }
}

