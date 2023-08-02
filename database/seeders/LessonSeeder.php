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
        // Get all tutors who are admins
        $adminTutors = User::where('is_admin', true)->get();

        Lesson::factory(90)->create()->each(function (Lesson $lesson) use ($adminTutors) {
            // Select a random tutor from the admin tutors
            $tutor = $adminTutors->random();

            // Get the courses associated with the selected tutor using table aliases
            $coursesForTutor = $tutor->courses()->select('courses.id')->pluck('id')->toArray();

            // Generate an array of course IDs that are not already associated with the tutor
            $availableCourseIds = Course::whereNotIn('id', $coursesForTutor)->inRandomOrder()->pluck('id')->take(2 - count($coursesForTutor));

            // Associate the lesson with the generated IDs
            $lesson->courses()->attach($availableCourseIds);

            // Generate an array of source IDs
            $randomSourceIds = Source::inRandomOrder()->pluck('id')->random(rand(2, min(6, Source::count())));

            // Associate the lesson with the generated source IDs
            $lesson->sources()->sync($randomSourceIds);

            // Associate the lesson with the tutor
            $lesson->tutor()->associate($tutor);

            // Save the lesson with the associated tutor
            $lesson->save();
        });
    }
}
