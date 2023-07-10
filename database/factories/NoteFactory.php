<?php

namespace Database\Factories;

use App\Models\Note;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Note>
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        include "./database/factories/variables/note_factory_variables.php";

        return [
            'lessonId' => $lesson->id,
            'userId' => $user->id,
            'content' => fake()->sentences(rand(1, 3), true),
        ];
    }
}
