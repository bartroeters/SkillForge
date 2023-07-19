import { Ref } from 'vue';

export interface HoverMenuProps {
  isVisible: boolean;
  text: string;
  className: string;
}

export declare const toggleHoverMenu: () => void;

export const isHoverMenuVisible: Ref<boolean>;