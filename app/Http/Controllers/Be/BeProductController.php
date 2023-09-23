<?php

namespace App\Http\Controllers\Be;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BeProductController extends Controller
{
    public function index()
    {
        return view('be.product.index');
    }
}
