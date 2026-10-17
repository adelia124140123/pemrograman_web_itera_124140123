// JavaScript Next Gen Demo Code

// ----------------------------
// Let dan Const
// ----------------------------
export function demoVariables() {
  // Menggunakan var (cara lama)
  var oldVar = "Old variable";
  {
    var oldVar = "Changed inside block";
  }

  // Menggunakan let (ES6)
  let newLet = "New let variable";
  {
    let newLet = "Different variable inside block";
    console.log("newLet inside block:", newLet);
  }

  // Menggunakan const (ES6)
  const PI = 3.14159;
  const user = { name: "John", age: 30 };
  // PI = 3.15; // Error! Tidak bisa mengubah nilai const
  user.age = 31; // Ini valid! Konten objek const dapat diubah

  return {
    oldVar,
    newLet,
    PI,
    user
  };
}
