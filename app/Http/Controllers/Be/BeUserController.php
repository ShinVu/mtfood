<?php

namespace App\Http\Controllers\Be;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BeUserController extends Controller
{
    public function index()
    {
        return view('be.user.index');
    }
}
