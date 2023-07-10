<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Course;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition()
    {
        $imageFiles = glob('public/storage/images/*.{jpg,jpeg,png,gif}', GLOB_BRACE);
        
        return [
            'title' => ucfirst(Str::remove('.', fake()->unique()->words(rand(1, 3), true))),
            'description' => implode("\n\n", fake()->paragraphs(rand(3, 7))),
            'thumbnail' => 'public/storage/images/' . basename($imageFiles[array_rand($imageFiles)]),
            'price' => fake()->numberBetween(70, 3000)
        ];
    }
}
