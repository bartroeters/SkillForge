<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Source;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Lesson::factory(90)->create()->each(function (Lesson $lesson) {
            $randomCourseIds = rand(1, 100) <= 75
                ? Course::inRandomOrder()->pluck('id')->random(1)
                : Course::inRandomOrder()->pluck('id')->random(2);
            $randomSourceIds = Source::inRandomOrder()->pluck('id')->random(rand(2, min(6, Source::count())));

        $lesson->courses()->sync($randomCourseIds);
        $lesson->sources()->sync($randomSourceIds);
        });
    }
}
