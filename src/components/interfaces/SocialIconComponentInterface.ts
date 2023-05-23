import { IconComponentInterface } from "./IconComponentInterface";

export interface SocialIconComponentInterface extends IconComponentInterface {
  href: string;
  onClickHandler: () => void;
}
