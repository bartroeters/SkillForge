<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imageFiles = glob('public/storage/profile-pictures/*.{jpg,jpeg,png,gif}', GLOB_BRACE);
        $timestamp = fake()->dateTimeBetween('-2 years', '-20 minutes');

        return [
            'firstName' => fake()->firstName(),
            'lastName' => fake()->lastName(),
            'profilePicture' => '/storage/profile-pictures/' . basename($imageFiles[array_rand($imageFiles)]),
            'email' => fake()->unique()->safeEmail(),
            'emailVerifiedAt' => $timestamp,
            'password' => Str::random(7, 14),
            'isAdmin' => rand(1, 100) <= 7,
            'rememberToken' => Str::random(10),
            'createdAt' => $timestamp,
            'updatedAt' => $timestamp
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
