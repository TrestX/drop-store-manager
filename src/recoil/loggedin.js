import { atom } from 'recoil';
export const loggedIn = atom({
    key: 'loggedIn', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});