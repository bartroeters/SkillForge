<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Source extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'title',
        'url'
    ];

    public function lessons()
    {
        return $this->belongsToMany(Lesson::class);
    }
}
