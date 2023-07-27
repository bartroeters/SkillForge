<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userIds = User::pluck('id')->all();
        $numCourses = 9;
        
        Course::factory($numCourses)->create()->each(function (Course $course) use (&$userIds, $numCourses) {
            $numStudents = max(1, intval(count($userIds) / $numCourses));
            
            if ($course->id === $numCourses) {
                $numStudents = count($userIds);
            };
            
            $randomUserIds = array_splice($userIds, 0, $numStudents);

            $randomCategoryIds = rand(1, 100) <= 75
                ? Category::inRandomOrder()->pluck('id')->random(1)
                : Category::inRandomOrder()->pluck('id')->random(2);

            $course->students()->sync($randomUserIds);
            $course->categories()->sync($randomCategoryIds);
        });
    }
}
