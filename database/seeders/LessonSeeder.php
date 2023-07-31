<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Source;
use App\Models\User;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Lesson::factory(100)->create()->each(function (Lesson $lesson) {
            $tutor = User::inRandomOrder()->where('is_admin', true)->first();

            $courses = Course::whereHas('students', function ($query) use ($tutor) {
                $query->where('user_id', $tutor->id);
            })->inRandomOrder()->take(9)->get();

            $randomCourseIds = $courses->pluck('id')->toArray();

            $randomSourceIds = Source::inRandomOrder()->pluck('id')->random(rand(2, min(6, Source::count())));

            $lesson->courses()->sync($randomCourseIds);
            $lesson->sources()->sync($randomSourceIds);
        });
    }
}
