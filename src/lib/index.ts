import { readFileSync } from "fs";
interface IParameters {
  minLenght?: number;
  specialChar?: boolean;
  differentCases?: boolean;
  number?: boolean;
  maxLenght?: number;
}

export const isValidPassword = (
  password: string,
  parameters?: IParameters
): boolean => {
  const bSpecialChar: boolean = parameters?.specialChar
    ? parameters.specialChar
    : true;
  const bDifferentCases: boolean = parameters?.differentCases
    ? parameters.differentCases
    : true;
  const bNumber: boolean = parameters?.number ? parameters.number : true;
  const iMinLenght: number =
    parameters?.minLenght && parameters.minLenght > 4
      ? parameters.minLenght
      : 5;
  const iMaxLenght: number =
    parameters?.maxLenght && parameters.maxLenght < 25
      ? parameters.maxLenght
      : 10;

  if (bSpecialChar && !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
    return false;
  }
  if (bDifferentCases && !(/[A-Z]/.test(password) && /[a-z]/.test(password))) {
    return false;
  }
  if (bNumber && !/\d/.test(password)) {
    return false;
  }
  if (iMinLenght > password.length) {
    return false;
  }
  if (iMaxLenght < password.length) {
    return false;
  }
  const sPasswordsTxt = readFileSync("./data/passwords.txt", "utf-8");
  const arrPasswords = sPasswordsTxt
    .split("\n")
    .map((password) => password.trim().toLowerCase());
  return arrPasswords.indexOf(password) === -1;
};

export const generatePassword = (parameters?: IParameters): string => {
  const sChar = "abcdefghijklmnopqrstuvwxyz";
  const sSpecialChar = "!@#$%^&*()_+-=[]{}|;:,.<>?/";
  const sNumberChar = "0123456789";
  const iMinLenght: number =
    parameters?.minLenght && parameters.minLenght > 4
      ? parameters.minLenght
      : 5;
  const iMaxLenght: number =
    parameters?.maxLenght &&
    parameters.maxLenght < 25 &&
    parameters.maxLenght >= iMinLenght
      ? parameters.maxLenght
      : 10;

  let sNewPassword: string = "";
  const arrChars: string[] = [
    sChar,
    sSpecialChar,
    sNumberChar,
    sChar.toUpperCase(),
  ];
  for (let i: number = 0; i < iMaxLenght; i++) {
    const typeChar: string =
      arrChars[Math.floor(Math.random() * arrChars.length)];
    sNewPassword += typeChar[Math.floor(Math.random() * typeChar.length)];
  }
  return sNewPassword;
};
