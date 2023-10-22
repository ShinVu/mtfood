<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Customer extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'customers';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string,dateTime,dateTime,int,int,int>
     */
    protected $guarded = [''];
    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
        'email_verified_at' => 'timestamp',
        'phone_number_verified_at' => 'timestamp'
    ];
}
