<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MailResetPassword;
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
            // if ($user['email_verified_at'] !== null) {
            //     return response(['message' => 'emailAlreadyVerified', 'result' => []], 409);
            // }

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

    public function mailResetPassword(MailResetPassword $request)
    {
        try {
            $data = $request->validated();
            $user = Customer::where('email', $data['email']);
            if ($user->count() === 0) {
                return response(['message' => 'emailInvalid', 'result' => []], 422);
            }

            //Generate a random verification code
            $verificationCode = random_int(100000, 999999);
            $user->update(['verification_code' => $verificationCode]);
            $customer = $user->first();
            //Send Email with Mailtrap

            $mail_data = ['email' => $customer['email'], 'verificationCode' => $customer['verification_code']];
            ProcessMail::dispatch($mail_data);

            // //Create response data
            $response_data = ['id' => $customer['id'], 'email' => $customer['email']];
            return response(['message' => 'mailSuccessfullySent', 'result' => ['user' => $response_data]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
}
