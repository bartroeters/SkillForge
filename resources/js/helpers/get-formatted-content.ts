import { ref } from 'vue';

export const showAllContent = ref<Record<number, boolean>>({});

export const toggleContent = (id: number): void => {
    showAllContent.value[id] = !showAllContent.value[id];
};

// export function getFormattedItemIds<T>(
//   items: T[],
//   extractId: (item: T) => number,
//   limit: number,
//   courseId: number
// ): number[] {
//   if (!items) {
//       return [];
//   }

//   const shouldShowAllContent = showAllContent.value[courseId];
  
//   if (shouldShowAllContent) {
//       return items.map(extractId);
//   }

//   const limitedItems = items.slice(0, limit);
//   const formattedIds = limitedItems.map(extractId);
  
//   return formattedIds;
// }

export function getFormattedItemIds<T>(
  items: T[] | undefined,
  extractId: (item: T) => number,
  limit: number,
  courseId: number
): number[] {
  if (!items) {
    return [];
  }

  return showAllContent.value[courseId] ? items.map(extractId) : items.slice(0, limit).map(extractId);
}