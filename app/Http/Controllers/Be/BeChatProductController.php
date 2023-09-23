<?php

namespace App\Http\Controllers\Be;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BeChatProductController extends Controller
{
    public function index()
    {
        return view('be.chat.index');
    }
}
