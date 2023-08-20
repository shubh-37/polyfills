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
