<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserOverview extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);

        return [
            'id' => $this->id,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'email' => $this->email,
            'isAdmin' => $this->is_admin,
            'inviteToken' => $this->inviteToken,
            'createdAt' => $this->created_at,
            'courseIds' => $this->courses->pluck('id'),
            'test' => 'test'
        ];
    }
}
