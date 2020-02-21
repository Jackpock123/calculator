// 1. The basics

class Rectangle {
    // Instance properties
    constructor (_width, _height, _color) {
        this.width = _width;
        this.height = _height;
        this.color = _color; 
    }
    // Instance methods
    getArea() {
        return this.width * this.height;
    }

    printDescription() {
        console.log(`I am a rectangle of ${this.width} x ${this.height} and a color ${this.color}`)
    }
}

let myRectangle1 = new Rectangle(5, 3, 'blue');
let myRectangle2 = new Rectangle(10, 5, 'red');

// console.log(myRectangle1.getArea());

// myRectangle2.printDescription();

// 2. Getters and Setters 

class Square {
    constructor (_width) {
        this.width = _width;
        this.height = _width;
        this.numberOfRequestsForArea = 0;
    }
    get area () {
        this.numberOfRequestsForArea++
        return this.width * this.height
    }

    set area (area) {
        this.width = Math.sqrt(area);
        this.height = Math.sqrt(area);
    }
}

let square1 = new Square(4);
console.log(square1.area);
console.log(square1.area);
console.log(square1.area);

// Set the area to equal 25
square1.area = 25;
// The setter method computes the new width and height for square1
console.log(square1.width);
console.log(square1.height);
// Count how many times we have called the get function
console.log(square1.numberOfRequestsForArea);