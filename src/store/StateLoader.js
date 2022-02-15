// used to persist redux state in localStorage
// without this, certain pages will not be able to fetch the data they need on reload,
// since they require props to be passed to them from their parent component 

// when a users localStorage is full this won't work and reloading the page (on  editProduct page for example)
// will give appropriate error (can't load product) and prompt user to return to product list

class StateLoader {

    loadState() {
        try {
            let serializedState = localStorage.getItem("appState");

            if (serializedState === null) {
                return this.initializeState();
            }
            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem("appState", serializedState);
        }
        catch (err) {
            console.log(err)
            localStorage.clear()
        }

    }
    // private method to load a default state
    initializeState() {
        return {
              stores: [],
              products: []
            }
        };
}

export default StateLoader