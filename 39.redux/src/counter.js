/**
 *  <p id="count">0</p>
    <button>+</button>
    <button>-</button>
 */
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
function reducer(state, action) {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            return state;
    }
}
let store = createStore(reducer, 0);
let counter = document.querySelector('#counter');
function render() {
    counter.innerHTML = store.getState();
}
store.subscribe(render);
let incBtn = document.querySelector('#incBtn');
incBtn.addEventListener('click', () => store.dispatch({ type: INCREMENT }));
let decBtn = document.querySelector('#decBtn');
decBtn.addEventListener('click', () => store.dispatch({ type: DECREMENT }));