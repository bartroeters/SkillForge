<?php

declare(strict_types = 1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LoggedInUserResource extends JsonResource
{
    /**
     * The resource instance.
     *
     * @var App\Models\User|App\Models\Client
     */
    public $resource;

    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'email' => $this->email,
            'profilePicture' => $this->profilePicture,
            'isAdmin' => $this->is_admin,
            'courseIds' => $this->courses->pluck('id')
        ];
    }
}