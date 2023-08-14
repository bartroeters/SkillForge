import { ref } from 'vue';

export const setGroupVisibility = ref<Record<number, boolean>>({});
export const setItemVisibility = ref(false);

export const toggleContent = (id?: number): void => {
  if (id !== undefined) {
    setGroupVisibility.value[id] = !setGroupVisibility.value[id];
  } else {
    setItemVisibility.value = !setItemVisibility.value;
  }
};

export function getVisibleItems<T>(
  items: Record<number, T> | undefined,
  numOfVisibleItems: number
): T[] {
  if (!items) {
    return [];
  }

  return setItemVisibility.value ? Object.values(items) : Object.values(items).slice(0, numOfVisibleItems);
}

export function getVisibleItemIds(
  items: number[] | undefined,
  id: number,
  numOfVisibleItems: number
): number[] {
  if (!items) {
    return [];
  }

  return setGroupVisibility.value[id] ? items : items.slice(0, numOfVisibleItems);
}