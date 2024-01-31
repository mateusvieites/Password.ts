import { isValidPassword,generatePassword } from "../src/lib";

const pass1 : string = "Nirin";
const pass2 : string = "Nir1n!";

isValidPassword(pass1) // false
isValidPassword(pass2) // true
generatePassword() // Random password