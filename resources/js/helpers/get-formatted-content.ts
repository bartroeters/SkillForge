import { ref } from 'vue';

// Reactive variables to manage visibility states:
// - `setGroupVisibility` stores visibility state of groups based on their IDs.
// - `setItemVisibility` stores visibility state of individual items.
export const setGroupVisibility = ref<Record<number, boolean>>({});
export const setItemVisibility = ref<boolean>(false);

/**
 * Toggle the visibility state of a group or an individual item.
 * @param id - Optional ID of the group to toggle. If undefined, toggles individual item visibility.
 */
export const toggleContent = (id?: number): void => {
  if (id !== undefined) {
    setGroupVisibility.value[id] = !setGroupVisibility.value[id];
  } else {
    setItemVisibility.value = !setItemVisibility.value;
  };
};

/**
 * Get an array of visible items based on their visibility state.
 * @param items - Record of items with IDs as keys, or undefined.
 * @param numOfVisibleItems - Number of items to show when visibility is toggled off.
 * @returns Array of visible items.
 */
export function getVisibleItems<T>(
  items: Record<number, T> | undefined,
  numOfVisibleItems: number
): T[] {
  if (!items) {
    return [];
  };

  return setItemVisibility.value ? Object.values(items) : Object.values(items).slice(0, numOfVisibleItems);
};

/**
 * Get an array of visible item IDs based on their group visibility state.
 * @param items - Array of item IDs, or undefined.
 * @param id - ID of the group to which items belong.
 * @param numOfVisibleItems - Number of items to show when group visibility is toggled off.
 * @returns Array of visible item IDs.
 */
export function getVisibleItemIds(
  items: number[] | undefined,
  id: number,
  numOfVisibleItems: number
): number[] {
  if (!items) {
    return [];
  };

  return setGroupVisibility.value[id] ? items : items.slice(0, numOfVisibleItems);
};