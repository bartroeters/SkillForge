import { ref, computed, ComputedRef } from 'vue';

interface visibilityObject {
  [key: string]: boolean
}

// Stores visibility state of items.
export const setItemVisibility = ref<visibilityObject>({});
// Stores visibility state of foreign IDs associated with an object.
export const setForeignIdVisibility = ref<Record<number, boolean>>({});
// Stores visibility state of text rows associated with an object.
export const setSentenceVisibility = ref<Record<number, boolean>>({});

/**
 * Toggles the visibility state of items or associated foreign IDs.
 * @param name - Name attributed to the targeted content.
 * @param id - Optional ID of the owner object to toggle visibility for its associated foreign IDs. If undefined, toggles item visibility.
 */
export const toggleContent = (name: string, id?: number): void => {
  if (id !== undefined) {
    setForeignIdVisibility.value[id] = !setForeignIdVisibility.value[id];
  } else {
    setItemVisibility.value[name] = !setItemVisibility.value[name];
  }
}

/**
 * Toggle the visibility state of text rows for a specific object.
 * @param id - The ID of the object.
 */
export function toggleRows(id: number): void {
  setSentenceVisibility.value[id] = !setSentenceVisibility.value[id];
}

/**
 * Initialize the toggle state.
 * @param names - An array of item names to initialize.
 */
export const initializeToggle = (names: string[]) => {
  names.forEach((name) => {
    if (setItemVisibility.value[name] === undefined) {
      setItemVisibility.value[name] = false;
    }
  });
};

/**
 * Create computed visibility flags for multiple items.
 * @param names - An array of item names to create computed flags for.
 * @returns An object with computed visibility flags for each item.
 */
export const initializeVisibilityFlags = (names: string[]): Record<string, ComputedRef<boolean>> => {
  const visibilityFlags: Record<string, ComputedRef<boolean>> = {};

  names.forEach((name) => {
    visibilityFlags[name] = computed(() => setItemVisibility.value[name]);
  });

  return visibilityFlags;
};

/**
 * Get an array of visible items based on their visibility state.
 * @param items - Record of items with IDs as keys.
 * @param numOfVisibleItems - Number of items to show when visibility is toggled off.
 * @returns Array of visible items.
 */
export function getVisibleItems<T>(
  name: keyof visibilityObject,
  items: Record<number, T>,
  numOfVisibleItems: number
): T[] {

  return setItemVisibility.value[name] ? Object.values(items) : Object.values(items).slice(0, numOfVisibleItems);
}

/**
 * Get an array of visible foreign item IDs based on their visibility state.
 * @param ownerObject - The owner object to which the foreign IDs belong.
 * @param foreignItemIds - Array of foreign IDs.
 * @param numOfVisibleItems - Number of items to show when visibility is toggled off.
 * @returns Array of visible foreign item IDs.
 */
export function getVisibleItemIds<T extends { id: number }>(
  name: keyof visibilityObject,
  ownerObject: T,
  foreignIds: number[],
  numOfVisibleItems: number
): number[] {

  return setForeignIdVisibility.value[ownerObject.id] ? foreignIds : foreignIds.slice(0, numOfVisibleItems);
}

/**
 * Get visible sentences based on visibility state.
 * @param content - The original content.
 * @param id - The ID of the object that holds the content.
 * @param numOfVisibleSentences - Number of sentences to display when visibility is toggled off.
 * @returns Visible sentences of content.
 */
export function getVisibleSentences(
  content: string,
  id: number,
  numOfVisibleSentences: number
): string {

  const sentences = content.split('.');
  
  if (setSentenceVisibility.value[id]) {
    return content;
  } else {
    const visibleSentences = sentences.slice(0, numOfVisibleSentences);
    if (visibleSentences.length < sentences.length) {
      return visibleSentences.join('.') + '.';
    } else {
      return content;
    }
  }
}