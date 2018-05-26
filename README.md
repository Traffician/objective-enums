# Objective-like enums

Yet another JavaScript library introducing Enumerated Types 😊

It was inspired by C#'s enums and that's why it allows for **comparing types**, **serialization** and **flagging**.


## Installation

`npm install --save objective-enums`


## Contributing
**All pull requests are welcome!**

Library is distributed as Babel-compiled code. If you want to contribute, clone GitHub repo, make changes and create pull request. 

You can build the code by using `npm run dev` or `npm run prod` commands. There is also *file watching* feature - `npm run watch`, so you don't have to rebuild all sources again after modyfing some scripts.

## Testing
@TODO

# Examples #

## Quick start

```javascript
import Enum from 'objective-enums';

const Colors = new Enum('Red', 'Yellow', 'Green', 'Blue');
const allowedColors = Colors.Green | Colors.Blue;

// Get color value and name
console.log(Colors.Red + ' - ' + Colors.Red.toString()); // 1 - Red

// Check if red is an allowed color
console.log(Colors.hasFlag(allowedColors, Colors.red)); // false

// Get names of allowed colors
console.log(Colors.match(allowedColors)); // ["Green", "Blue"]

// Get common elements' names of allowed and selected colors
const selectedColors = Colors.Red | Colors.Green | Colors.Yellow;
console.log(Colors.intersect(allowedColors, selectedColors)); // ["Green"]
```

## Flagging operations
```javascript
import Enum from 'objective-enums';

const Colors = new Enum('Red', 'Yellow', 'Green', 'Blue');

// Only green and blue are allowed colors
let allowed = Colors.Green | Colors.Blue;

// Get names of allowed colors
console.log(Colors.match(allowed)); // ["Green", "Blue"]

// Add yellow to allowed colors
allowed |= Colors.Yellow;
console.log(Colors.match(allowed)); // ["Green", "Blue", "Yellow"]

// Remove blue from allowed colors
allowed &= ~Colors.Blue;
console.log(Colors.match(allowed)); // ["Green", "Yellow"]
```

## Custom values
```javascript
import Enum from 'objective-enums';

const Colors = new Enum({
    Red: '#FF0000',
    Yellow: {r: 255, g: 255, b: 0},
    Green: 0x008000,
    Blue: true
});

console.log(Colors.Yellow.value); // {r: 255, g: 255, b: 0}
```

## Custom typing and comparing
```javascript
import Enum from 'objective-enums';

const JewelleryEnum = class Jewellery extends Enum {};
const Jewellery = new JewelleryEnum('Amethysts', 'Diamonds', 'Emeralds', 'Gems');

const Cards = new (class Cards extends Enum {})([
    'Clubs', 'Diamonds', 'Spades', 'Hearts'
]);

console.log(Jewellery instanceof Enum); // true

console.log(Cards.constructor.name); // Cards

console.log(Jewellery.Amethysts.constructor.name); // JewelleryElement

console.log(Cards.Spades.constructor.name); // CardsElement

console.log(Jewellery.Diamonds === Cards.Diamonds); // false

const someStones = Jewellery.Diamonds | Jewellery.Gems;
console.log(Jewellery.hasFlag(someStones, 'Spades'));
// NotAnElementOf: Spades is not an element of Jewellery

```