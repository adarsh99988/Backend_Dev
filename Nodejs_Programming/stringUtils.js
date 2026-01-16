// Capitalize
function capitalize(str) {
    return str.toUpperCase();
}

// Reverse
function reverse(str) {
    return str.split('').reverse().join('');
}

// Count vowels
function countVowels(str) {
    const match = str.match(/[aeiou]/gi);
    return match ? match.length : 0;
}

// ---- ADD THIS PART TO SEE OUTPUT ----
console.log("Capitalize:", capitalize("hello"));
console.log("Reverse:", reverse("hello"));
console.log("Vowel Count:", countVowels("education"));

module.exports = { capitalize, reverse, countVowels };
