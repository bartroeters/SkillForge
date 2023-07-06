<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\User;
use Carbon\Carbon;
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
        include "./database\factories\variables\announcement_factory_variables.php";

        return [
            'user' => $user->id,
            'course' => Course::inRandomOrder()->first()->id,
            'title' => ucfirst(Str::remove('.', fake()->unique()->words(rand(1, 5), true))),
            'content' => fake()->sentences(rand(2, 8), true),
            'created_at' => $timestamp,
            'updated_at' => $timestamp
        ];
    }
}
