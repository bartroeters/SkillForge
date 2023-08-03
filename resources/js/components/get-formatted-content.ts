import { ref } from 'vue';

export const showAllContent = ref<Record<number, boolean>>({});

export const toggleContent = (id: number): void => {
    showAllContent.value[id] = !showAllContent.value[id];
};

export function getFormattedContent(content: string, id: number) {
    return content.split('\n').slice(0, showAllContent.value[id] ? undefined : 10).join('\n');
}
