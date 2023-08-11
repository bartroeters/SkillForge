import { ref } from 'vue';

export const showAllContent = ref<Record<number, boolean>>({});

export const toggleContent = (id: number): void => {
  showAllContent.value[id] = !showAllContent.value[id];
};

export function getVisibleItemIds(
  items: number[] | undefined,
  id: number,
  numOfVisibleItems: number
): number[] {
  
  if (!items) {
    return [];
  }

  return showAllContent.value[id] ? items : items.slice(0, numOfVisibleItems);
}

export function getVisibleItems<T>(
  items: Record<number, T> | undefined,
  numOfVisibleItems: number
): T[] {
  
  if (!items) {
    return [];
  }

  const visibleItems = showAllContent.value ? Object.values(items) : Object.values(items).slice(0, numOfVisibleItems);
  
  return visibleItems.slice(0, numOfVisibleItems);
}