interface IBook {
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
}

let TYPES = {
  IBook: Symbol("IBook"),
};
export default TYPES;
