/*
 * fortune.js
 */

const fortuneCookies = [
    "Conquer your fears or they will conquer you.",
    "Rivers nned springs.",
    "Do not fear what you do not know.",
    "You will have a pleasant surpries.",
    "Whenever possible, keep it simple."
];

exports.getFortune = () => {
    let idx = Math.floor(Math.random * fortureCookies.length);
    return (fortuneCookies[idx]);
};
