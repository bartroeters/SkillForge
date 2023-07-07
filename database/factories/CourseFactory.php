<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Course;

class CourseFactory extends Factory
{
    protected $model = Course::class;

    public function definition()
    {
        $thumbnailPath = include "./database/factories/helpers/thumbnail_downloader.php";

        return [
            'title' => ucfirst(Str::remove('.', $this->faker->unique()->words(rand(1, 3), true))),
            'description' => implode("\n\n", $this->faker->paragraphs(rand(1, 2))),
            'thumbnail' => $thumbnailPath,
            'price' => $this->faker->numberBetween(70, 3000)
        ];
    }
}
