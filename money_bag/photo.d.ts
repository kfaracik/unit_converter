// This declaration is for typescript's image import 
declare module "*.png" {
    const value: any;
    export = value;
}

declare module "*.jpg" {
    const value: any;
    export = value;
}