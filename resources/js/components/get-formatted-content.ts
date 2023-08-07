import { ref } from 'vue';

export const showAllContent = ref<Record<number, boolean>>({});

export const toggleContent = (id: number): void => {
    showAllContent.value[id] = !showAllContent.value[id];
};

export function getFormattedContent(content: string, id: number, linesToShow: number) {
    return content.split('\n').slice(0, showAllContent.value[id] ? undefined : linesToShow).join('\n');
}