<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wholesale extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'wholesale';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'account_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string,string,string,string>
     */
    protected $fillable = [
        'account_id',
        'question1',
        'question2',
        'question3',
        'question5'
    ];
}
