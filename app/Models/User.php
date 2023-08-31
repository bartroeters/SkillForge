<?php

declare(strict_types = 1);

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as AuthCanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends BaseModel implements JWTSubject, AuthenticatableContract, AuthCanResetPassword
{
    use Authenticatable, HasFactory, Notifiable, CanResetPassword;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'profilePicture',
        'email',
        'password',
        'isAdmin'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        // 'password' => 'hashed'
    ];

    /**
     * Set the hashed password attribute. (mutator)
     *
     * @param string $value
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes["password"] = Hash::make($value);
    }

    /**
     * Get the hashed password attribute. (accessor)
     *
     * @return string
     */
    public function getPasswordAttribute()
    {
        return $this->attributes["password"];
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Return full name.
     *
     * @return void
     */
    public function getNameAttribute()
    {
        return trim($this->firstName." ".$this->lastName);
    }

    public static function retrieveByEmail(string $email): ?User
    {
        return self::where('email', $email)->first();
    }

    public function announcements()
    {
        return $this->hasMany(Announcement::class);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class);
    }

    public function lessons()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
