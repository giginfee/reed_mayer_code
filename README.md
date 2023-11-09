## Reed Muller coder
Implements encoding and decoding using Reed Muller's algorithm

# How to use
```javascript
const encoder = new ReedMullerCoder(4); // N is a number to create matrix of length of 2^N
let str = "00001" // length of str has to be the same as length of 2^N in base 2
let encoded=encoder.encodeByteString(str)  //0101010101010101
let decoded = encoder.decodeByteString(encoded) //encoded can have a few mistakes, which will be corrected 
```
