<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\Note;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lessons = Lesson::all();

        foreach ($lessons as $lesson) {
            Note::factory(rand(1, 4))->create([
                'lesson_id' => $lesson->id
            ]);
        }
    }
}
