import { Ref } from 'vue';

export interface DropdownProps {
  isOpen: boolean;
  text: string;
  dropdownClass: string;
  toggleClass: string;
  menuClass: string;
}

export declare const toggleDropdown: () => void;

export const isDropdownOpen: Ref<boolean>;
