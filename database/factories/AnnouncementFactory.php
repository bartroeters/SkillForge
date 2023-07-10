<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Announcement>
 */
class AnnouncementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        include "./database/factories/variables/announcement_factory_variables.php";

        return [
            'userId' => $user->id,
            'courseId' => $course->id,
            'title' => ucfirst(Str::remove('.', fake()->unique()->words(rand(1, 5), true))),
            'content' => fake()->sentences(rand(2, 8), true),
            'createdAt' => $timestamp,
            'updatedAt' => $timestamp
        ];
    }
}
