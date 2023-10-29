<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'password' => bcrypt(123456789),
            'user_type' => "ADMIN",
            'name' => 'Ha Linh',
            'status' => 1,
            'email' => 'doantotnghiep@gmail.com'
        ]);
    }
}
