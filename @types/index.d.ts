declare module "*.png" {
    const path: string;
    export default path;
  }
  declare module "*.jpg" {
    const path: string;
    export default path;
  }
  declare module "*.pdf";
  declare module "*.jpeg";
  
  declare module "*.md" {
    const value: string; // markdown is just a string
    export default value;
  }