<?php

namespace App\Http\Controllers\Be;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BeRoleController extends Controller
{
    public function index()
    {
        return view('be.role.index');
    }
}

