import { storeModuleFactory } from 'services/store';
import { Note } from './types';

export const NOTE_DOMAIN_NAME = 'notes';

export const noteStore = storeModuleFactory<Note>(NOTE_DOMAIN_NAME);

export const getNoteValue = (lessonId: number): Note[] => {
  const notes = noteStore.getters.all.value;
  const sortedNotes = notes
    .filter((note: Note) => note.lessonId === lessonId)
    .sort((newestNote: Note, oldestNote: Note) =>
      new Date(oldestNote.createdAt).getTime() -
      new Date(newestNote.createdAt).getTime())
    .map((note: Note) => Object.freeze(note));
  return sortedNotes;
};