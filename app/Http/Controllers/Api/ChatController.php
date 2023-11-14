<?php

namespace App\Http\Controllers\api;

use App\Events\PublicMessageEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\publicEventRequest;
use Exception;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function publicEvent(publicEventRequest $request)
    {
        try {
            $data = $request->validated();
            $channelName = $data['channelName'];
            $message = $data['message'];
            broadcast(new PublicMessageEvent($channelName, $message))->toOthers();

            return response(['testing' => $channelName], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
}
