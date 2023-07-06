<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

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
    public function definition(): array
    {
        return [
            'title' => ucfirst(Str::remove('.', fake()->unique()->words(rand(1, 3), true))),
            'description' => implode("\n\n", fake()->paragraphs(rand(1, 2))),
            'thumbnail' => fake()->imageUrl('storage/app/public/images', 640, 480, null, false)
        ];
    }
}

//             $table->string('title');
//             $table->string('description');
//             $table->string('thumbnail')->nullable()->comment('Path or URL to the course thumbnail image');
//             $table->decimal('price', 7, 2);
//             $table->timestamps();