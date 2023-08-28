<script setup lang="ts">
import { PropType, ref } from 'vue';
import type Course from 'domains/courses/types';
import { getCategoryValue } from 'domains/categories';
import type Category from 'domains/categories/types';
import { getVisibleSentences, toggleRows } from 'helpers/get-formatted-content';
import HoverMenu from 'components/HoverMenu.vue';

const props = defineProps({
  items: { type: Array as PropType<unknown[]> },
  associatedItems: { type: Array as PropType<unknown[]> },
  itemType: { type: String },
  associatedItemType: { type: String },
  visibilityFlags: { type: Object as PropType<Record<number, boolean>> },
  hoverMenuText: { type: String },
  animationDelay: { type: Number },
  hoverMenuOpacity: { type: Number }
});
</script>

<template>
    <div style="display: flex">
      <div style="display: flex; flex-direction: column;">
        <h5>Items</h5>

        <div v-for="item in items" key="item.id">
          <div>{{ item.title }}</div>
        </div>
      </div>

      <div style="width: 1px; background-color: #ccc; margin: 0 10px;" />

      <div style="display: flex; flex-direction: column;">
        <h5>Associated items</h5>

        <div v-for="associatedItem in associatedItems" key="asscoiatedItem.id">
          <div>{{ associatedItem.title }}</div>
        </div>
      </div>

      <div style="width: 1px; background-color: #ccc; margin: 0 10px;" />

      <div style="display: flex; flex-direction: column;">
        <h5>All other props</h5>

        <div>Item type: {{ itemType }}</div>
        <div>Associated item type: {{ associatedItemType }}</div>

        <div>Visibility flags: {{ visibilityFlags }}</div>
        <div>Hover menu text: {{ hoverMenuText }}</div>
        <div>Animation delay: {{ animationDelay }}</div>
        <div>Hover menu opacity: {{ hoverMenuOpacity }}</div>
      </div>
    </div>
</template>