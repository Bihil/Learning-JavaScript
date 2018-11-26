// Promises

const applyDiscount = new Promise(function (resolve, reject) {
 // Resolve is going to execute when the function is successful
 // Reject whne the function or the task failed
 const discount = false;
 if (discount) {
  resolve('Discount Applied');
 } else {
  reject('Discount failed...');
 }
});
applyDiscount.then(function (result) {
 console.log(result);
}).catch(function(result){
 console.log(result);
});

// console.log(applyDiscount);