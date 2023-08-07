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
        $adminTutors = User::where('is_admin', true)->get();

        Lesson::factory(120)->create()->each(function (Lesson $lesson) use ($adminTutors) {
            $tutor = $adminTutors->random();
            $coursesForTutor = $tutor->courses()->select('courses.id')->pluck('id')->toArray();
            $availableCourseIds = Course::whereNotIn('id', $coursesForTutor)->inRandomOrder()->pluck('id')->take(2);

            // dd($tutor, $coursesForTutor, $availableCourseIds);

            $randomSourceIds = Source::inRandomOrder()->pluck('id')->random(rand(2, min(6, Source::count())));
            
            $lesson->courses()->sync($availableCourseIds);
            $lesson->sources()->sync($randomSourceIds);
            $lesson->tutor()->associate($tutor);
        });
    }
}
