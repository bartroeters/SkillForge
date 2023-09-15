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
        $me = User::find(1);
        $courses = Course::factory(12)->create();

        $numOfCoursesToEnroll = 5;

        foreach ($courses as $course) {
            $randomUserIds = User::inRandomOrder()
                ->where('id', '!=', 1)
                ->pluck('id')
                ->random(rand(12, 19));

            $numCoursesEnrolled = $me->courses()->count();

            $course->students()->sync(
                $numCoursesEnrolled < $numOfCoursesToEnroll ? $randomUserIds->prepend(1) : $randomUserIds
            );

            $numCategories = rand(1, 100) <= 25 ? 1 : rand(2, 4);
            $randomCategoryIds = Category::inRandomOrder()->pluck('id')->random($numCategories);
                
            $course->categories()->sync($randomCategoryIds);
        }
    }
}