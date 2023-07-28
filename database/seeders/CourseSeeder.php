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
        Course::factory(9)->create()->each(function (Course $course) {
            $randomUserIds = User::inRandomOrder()->pluck('id')->random(rand(6, 9));
            $randomCategoryIds = rand(1, 100) <= 75
                ? Category::inRandomOrder()->pluck('id')->random(1)
                : Category::inRandomOrder()->pluck('id')->random(2);

            $course->students()->sync($randomUserIds);
            $course->categories()->sync($randomCategoryIds);
        });
    }
}