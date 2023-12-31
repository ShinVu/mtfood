<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'account';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'account_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string,string,string,string,int,int,int>
     */
    protected $fillable = [
        'account_id',
        'account_name',
        'account_password',
        'account_email',
        'account_phone',
        'account_status',
        'account_type',
        'wholesale'
    ];
}
