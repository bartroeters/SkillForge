<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lesson>
 */
class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imageFiles = glob('public/storage/images/*.{jpg,jpeg,png,gif}', GLOB_BRACE);

        return [
            'title' => ucfirst(Str::remove('.', fake()->unique()->words(rand(1, 3), true))),
            'description' => implode("\n\n", fake()->paragraphs(rand(1, 2))),
            'videoContent' => 'public/storage/images/' . basename($imageFiles[array_rand($imageFiles)]),
            'description' => implode("\n\n", fake()->paragraphs(rand(3, 7))),
        ];
    }
}
