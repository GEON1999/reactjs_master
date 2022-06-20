import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    tapColor: string;
    buttonColor: string;
    coinBg: string;
  }
}
