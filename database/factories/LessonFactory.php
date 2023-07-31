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
        include "./database/factories/variables/lesson_factory_variables.php";

        /**
         * Generate thumbnail if there are no images in `storage/app/public/images`.
         * Note: Make sure you have set the path to the CA bundle file in `php.ini` using `curl.cainfo = "C:/path/to/cacert.pem"`.
         * Uncomment the following lines in LessonFactory.php, CategoryFactory.php, and CourseFactory.php:
         * $thumbnailPath = include 'database/factories/helpers/thumbnail_downloader.php';
         * 'thumbnail' => $thumbnailPath,
         * 'videoContent' => $thumbnailPath,
         */

        // $thumbnailPath = include 'database/factories/helpers/thumbnail_downloader.php';

        return [
            'title' => ucfirst(Str::remove('.', fake()->unique()->words(rand(1, 3), true))),
            'tutor_id' => $tutor->id,
            'description' => implode("\n\n", fake()->paragraphs(rand(1, 2))),
            // 'videoContent' => $thumbnailPath,
            'videoContent' => '/storage/images/' . basename($imageFiles[array_rand($imageFiles)]),
            'description' => implode("\n\n", fake()->paragraphs(rand(3, 7))),
            'created_at' => $timestamp
        ];
    }
}
