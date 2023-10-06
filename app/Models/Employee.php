<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'employees';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string,string,string,string,string,string,string,string,string,dateTime,decimal,string,string>
     */
    protected $fillable = [
        'name',
        'phone_number',
        'email',
        'password',
        'identification_number',
        'tax_code',
        'gender',
        'address',
        'status',
        'date_of_birth',
        'pay_rate',
        'job_position',
        'ward_code'
    ];
}
