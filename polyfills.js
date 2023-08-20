//Polyfill for map function which takes a  callback as an argument.
//Here since we'll invoke this myMap method on an array hence it will be
//called as method invocation. So the this over here will point to the arr
//as stated in the rules of this.

Array.prototype.myMap = function (callback){
    var arr = [];
    for(let i = 0; i < this.length; i++){
        //here the result of our callback function will be pushed into a new 
        //array which will be returned after the loop is finished
        arr.push(callback(this[i], i, this));
    }
    return arr;
}

[2,4,5,6,3].myMap((num) => num * 2); //this will return [4,8,10,12,6]

//Polyfill for filter which takes a callback as an argument

Array.prototype.myFilter = function (callback){
    var arr = [];
    for(let i = 0; i < this.length; i++){
        //only those values to be pushed inside the array which is returned
        //by the callback function
        if(callback.call(this, this[i], i, this)){
            arr.push(this[i]);
        }
    }
    return arr;
}

[2,5,6,3,8,22].myFilter((num) => num%2); //[5,3]

//Polyfill for reduce method which takes a callback function and an initial value as an argument

Array.prototype.myReduce = function (callback, initialValue){
    var accumulator = initialValue;
    for(let i = 0; i < this.length; i++){
        if(accumulator !== undefined){
            accumulator = callback.call(undefined, accumulator, this[i], i, this);
        }else{
            accumulator = this[i];
        }
    }
    return accumulator;
}

[3,4,2,5,6].myReduce((acc, num) => acc + num, 0); //20

//polyfill for the bind method

Function.prototype.myBind = function (...args){
    const self = this;
    const params = args.slice(1);
    return function(...args2){
        return self.apply(args[0], [...params, ...args2]);
    }
}

const myObj = {
    firstName: "shubh"
}
function printMyName(city, state){
    console.log(this.firstName + " from " + city + ", " + state);
}
const func = printMyName.myBind(myObj, "mumbai");
func(); //shubh from mumbai
func("Maharashtra");//shubh from mumabi, Maharashtra