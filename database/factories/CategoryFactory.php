<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
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
            'name' => ucfirst(Str::remove('.', fake()->unique()->words(rand(1, 2), true))),
            'thumbnail' => 'public/storage/images/' . basename($imageFiles[array_rand($imageFiles)]),
        ];
    }
}
