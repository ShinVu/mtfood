<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddPasswordRequest;
use App\Http\Requests\GoogleLoginRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\LogoutRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\VerifyRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;
use Exception;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        try {
            $credentials = $request->validated();
            $remember = true;
            /** @var \App\Models\Customer $customer */
            $user = Customer::where('email', $credentials['email']);
            $customer = $user->first();
            if (!$customer) {
                //email doesn't exist
                return response([
                    'message' => 'emailInvalid',
                    'result' => []
                ], 422);
            }

            if ($customer['google_flag'] && !$customer['password']) {
                //email registered with google
                return response([
                    'message' => 'loginWithGoogle',
                    'result' => []
                ], 422);
            }
            if ($customer['facebook_flag'] && !$customer['password']) {
                //email registered with google
                return response([
                    'message' => 'loginWithFacebook',
                    'result' => []
                ], 422);
            }
            //Check if email and password is correct
            $passwordMatch = Hash::check($credentials['password'], $customer['password']);
            if ($passwordMatch) {
                //Create token
                $token = $customer->createToken('main')->plainTextToken;
                $user->update(['remember_token' => $token]);

                //Create response data
                $user = ['id' => $customer['id'], 'googleId' => $customer['google_id'], 'name' => $customer['name'], 'phoneNumber' => $customer['phone_number'], 'email' => $customer['email'], 'identificationNumber' => $customer['identification_number'], 'gender' => $customer['gender'], 'dateOfBirth' => $customer['date_of_birth']];
                return response([
                    'message' => 'loginSuccessful',
                    'result' => ['user' => $user, 'token' => $token]
                ], 200);
            } else {
                //password is not correct;
                return response([
                    'message' => 'passwordIncorrect',
                    'result' => []
                ], 422);
            }
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function GoogleLogin(GoogleLoginRequest $request)
    {
        try {
            $data = $request->validated();
            /** @var \App\Models\Customer $customer */
            $user = Customer::where('email', $data['email']);
            $customer = $user->first();
            //Create token

            if (!$customer) {
                $newCustomer = Customer::create([
                    'email' => $data['email'],
                    'is_wholesale_customer' => 0,
                    'name' => $data['name'],
                    'google_id' => $data['googleId'],
                    'google_flag' => 1,
                    'facebook_flag' => 0,

                ]);
                $token = $newCustomer->createToken('main')->plainTextToken;
                Customer::where('id', $newCustomer['id'])->update(['remember_token' => $token]);

                //Create response data
                $user = ['id' => $newCustomer['id'], 'googleId' => $newCustomer['google_id'], 'name' => $newCustomer['name'], 'phoneNumber' => $newCustomer['phone_number'], 'email' => $newCustomer['email'], 'identificationNumber' => $newCustomer['identification_number'], 'gender' => $newCustomer['gender'], 'dateOfBirth' => $newCustomer['date_of_birth']];
                return response(['message' => 'newGoogleAccountLoginSuccess', 'result' => ['user' => $user, 'token' => $token]], 200);
            } else {
                if ($customer['google_flag'] === 0) {
                    $user->update(['google_flag' => 1]);
                    $user->update(['google_id' => $data['googleId']]);
                }
                $token = $customer->createToken('main')->plainTextToken;
                $user->update(['remember_token' => $token]);
                //Create response data
                $customer = $user->first();
                $user = ['id' => $customer['id'], 'googleId' => $customer['google_id'], 'name' => $customer['name'], 'phoneNumber' => $customer['phone_number'], 'email' => $customer['email'], 'identificationNumber' => $customer['identification_number'], 'gender' => $customer['gender'], 'dateOfBirth' => $customer['date_of_birth']];
                return response(['message' => 'googleAccountLoginSuccess', 'result' => ['user' => $user, 'token' => $token]], 200);
            }
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
    public function signup(SignupRequest $request)
    {
        try {
            $data = $request->validated();
            /** @var \App\Models\Customer $customer */
            $customer = null;

            //Generate a random verification code
            $verificationCode = random_int(100000, 999999);

            //Create a new user

            //User create new account with phone number
            if ($data['type'] === 'email') {
                //Check whether email already exists
                if (Customer::where('email', $data['account'])->exists()) {
                    return response(['message' => 'emailAlreadyExist', 'result' => []], 409);
                };
                $customer = Customer::create([
                    'email' => $data['account'],
                    'is_wholesale_customer' => 0,
                    'verification_code' => $verificationCode,
                    'facebook_flag' => 0,
                    'google_flag' => 0
                ]);
            } else if (
                //User create new account with phone number
                $data['type'] === "phoneNumber"
            ) {
                //Check whether phone number already exists
                if (Customer::where('phone_number', $data['account'])->exists()) {
                    return response(['message' => 'phoneNumberAlreadyExist', 'result' => []], 409);
                };
                $customer = Customer::create([
                    'phone_number' => $data['account'],
                    'is_wholesale_customer' => 0,
                    'verification_code' => $verificationCode,
                    'facebook_flag' => 0,
                    'google_flag' => 0
                ]);
            } else {
                return response(['message' => 'typeInvalid', 'result' => []], 422);
            }

            //User creation success
            //Create response data
            $response_data = ['id' => $customer['id'], 'email' => $customer['email']];
            return response(['message' => 'accountCreatedSuccessful', 'result' => ['user' => $response_data]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function logout(LogoutRequest $request)
    {
        try {
            $data = $request->validated();
            /** @var \App\Models\Customer $customer */
            Customer::where('id', $data['id'])
                ->update(['remember_token' => null]);

            return response(['message' => 'logOutSuccessful', 'result' => []], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function verifyCode(VerifyRequest $request)
    {
        try {
            $data = $request->validated();
            /** @var \App\Models\Customer $customer */
            $userCode = $data['verificationCode'];
            $customer = Customer::find($data['id']);

            //Check whether user email is already verified
            if ($customer['email_verified_at'] !== null) {
                return response(['message' => 'emailAlreadyVerified', 'result' => []], 409);
            }

            //Check if verification code match
            if ($userCode === $customer['verification_code']) {
                Customer::where('id', $customer['id'])
                    ->update(['email_verified_at' => date("Y-m-d H:m:s", time())]);
            } else {
                return response(['message' => 'verificationCodeIncorrect', 'result' => []], 409);
            }

            //Create response data
            $response_data = ['id' => $customer['id']];
            return response(['message' => 'emailVerificationSucceed', 'result' => ['user' => $response_data]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function addPassword(AddPasswordRequest $request)
    {
        try {
            $data = $request->validated();
            /** @var \App\Models\Customer $customer */
            //Customer collection that matches id
            $user = Customer::where('id', $data['id']);
            //Update customer password
            $password = Hash::make($data['password']);
            $user->update(['password' => $password]);

            //Create token and save token in DB
            $customer = $user->first();
            $token = $customer->createToken('main')->plainTextToken;
            $user->update(['remember_token' => $token]);
            // $customer->update(['rememberToken' => $token]);

            //Create response data

            $user = ['id' => $customer['id'], 'name' => $customer['name'], 'phoneNumber' => $customer['phone_number'], 'email' => $customer['email'], 'identificationNumber' => $customer['identification_number'], 'gender' => $customer['gender'], 'dateOfBirth' => $customer['date_of_birth']];

            return response(['message' => 'accountCreatedSuccessful', 'result' => ['user' => $user, 'token' => $token]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
}
