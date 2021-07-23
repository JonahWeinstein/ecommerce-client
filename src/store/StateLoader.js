// used to persist redux state in sessionStorage

class StateLoader {

    loadState() {
        try {
            let serializedState = sessionStorage.getItem("appState");

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
            sessionStorage.setItem("appState", serializedState);
        }
        catch (err) {
            localStorage.clear()
            console.log(JSON.stringify(sessionStorage).length)
            console.log(err)
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