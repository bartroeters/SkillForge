<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lesson extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'tutorId',
        'title',
        'description',
        'videoContent',
        'textContent'
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class);
    }

    public function tutor()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    public function sources()
    {
        return $this->belongsToMany(Source::class);
    }
}
