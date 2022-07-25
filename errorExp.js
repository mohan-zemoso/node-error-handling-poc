const sum = (a, b) => {
  if (a > 0 && b > 0) {
    return a + b;
  } else {
    throw new Error("Args must be >0");
  }
};

try {
  console.log(sum(1, 2));
} catch (error) {
  console.log("Error Catched- " + error);
}
