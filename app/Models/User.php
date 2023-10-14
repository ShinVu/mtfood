<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Arr;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [''];

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
        'password' => 'hashed',
    ];

    const STATUS_ACTIVE = 2;
    const STATUS_DEFAULT = 1;
    const STATUS_CANCEL = -1;

    protected $setStatus = [
        self::STATUS_DEFAULT => [
            'name' => 'Chờ kích hoạt',
            'class' => 'badge badge-light'
        ],
        self::STATUS_CANCEL => [
            'name' => 'Khoá/ Block',
            'class' => 'badge badge-danger'
        ],
        self::STATUS_ACTIVE => [
            'name' => 'Hoạt động',
            'class' => 'badge badge-primary'
        ],
    ];

    public function getStatus()
    {
        return Arr::get($this->setStatus,$this->status, []);
    }
}
