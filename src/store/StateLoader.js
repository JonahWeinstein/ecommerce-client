// used to persist redux state in localStorage

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