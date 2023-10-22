<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MailVerificationRequest;
use App\Jobs\Processmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Exception;
use App\Mail\MailNotify;
use App\Models\Customer;

class SendEmailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function mailVerification(MailVerificationRequest $request)
    {
        try {
            $data = $request->validated();

            $user = Customer::find($data['id']);
            //Check whether user email is already verified
            if ($user['email_verified_at'] !== null) {
                return response(['message' => 'emailAlreadyVerified', 'result' => []], 409);
            }

            //Send Email with Mailtrap

            $mail_data = ['email' => $user['email'], 'verificationCode' => $user['verification_code']];
            ProcessMail::dispatch($mail_data);



            //Create response data
            $response_data = ['id' => $user['id'], 'email' => $user['email']];
            return response(['message' => 'mailSuccessfullySent', 'result' => ['user' => $response_data]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
}
