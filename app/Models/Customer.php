<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
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
    protected $fillable = [
        'participant_type',
        'join_at',
        'last_message_at',
        'chat_session_id',
        'employee_id',
        'customer_id',
    ];
}
