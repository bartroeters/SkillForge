<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        include './database\factories\variables\review_factory_variables.php';

        return [
            'userId' => $user->id,
            'courseId' => $course->id,
            'rating' => fake()->numberBetween(3, 5),
            'comment' => implode("\n\n", fake()->paragraphs(rand(1, 3))),
        ];
    }
}
