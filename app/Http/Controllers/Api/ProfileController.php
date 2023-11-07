<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddAddressRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\deleteAddressRequest;
use App\Http\Requests\getAddressRequest;
use App\Http\Requests\GetDistrict;
use App\Http\Requests\GetProvince;
use App\Http\Requests\GetWard;
use App\Http\Requests\setDefaultRequest;
use App\Http\Requests\updateAddressRequest;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\DeliveryAddress;
use App\Models\District;
use App\Models\Province;
use App\Models\Ward;
use Illuminate\Support\Facades\Hash;
use Exception;

class ProfileController extends Controller
{

    public function updateProfile(UpdateProfileRequest $request)
    {
        try {
            $data = $request->validated();
            $token = $request->bearerToken();
            /** @var \App\Models\Customer $customer */
            $customer = Customer::where('id', $data['id']);
            //Check request authorization

            if ($token != $customer->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }
            $customer->update(['name' => $data['name'], 'gender' => $data['gender'], 'date_of_birth' => date("Y-m-d H:i:s", $data['dateOfBirth']), 'identification_number' => $data['identificationNumber']]);
            $customer = $customer->first();
            //Create response data
            $user = ['id' => $customer['id'], 'googleId' => $customer['google_id'], 'name' => $customer['name'], 'phoneNumber' => $customer['phone_number'], 'email' => $customer['email'], 'identificationNumber' => $customer['identification_number'], 'gender' => $customer['gender'], 'dateOfBirth' => $customer['date_of_birth']];
            return response([
                'message' => 'updateProfileSuccessful',
                'result' => ['user' => $user]
            ], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        try {
            $data = $request->validated();
            $token = $request->bearerToken();
            /** @var \App\Models\Customer $customer */
            //Customer collection that matches id
            $user = Customer::where('id', $data['id']);

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }

            //Update customer password
            $password = Hash::make($data['password']);
            $user->update(['password' => $password]);

            return response(['message' => 'passwordChangeSuccessful', 'result' => []], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getAddress(getAddressRequest $request)
    {
        try {
            $data = $request->validated();
            $token = $request->bearerToken();
            /** @var \App\Models\Customer $customer */
            //Customer collection that matches id
            $user = Customer::where('id', $data['customerId']);

            //Check if customer id exists
            if (!$user->exists()) {
                return response(['message' => 'userInvalid', 'result' => []], 422);
            }

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }

            $address = DeliveryAddress::where('customer_id', $data['customerId'])
                ->join('wards', 'wards.code', '=', 'delivery_addresses.ward_code')
                ->join('districts', 'districts.code', '=', 'wards.district_code')
                ->join('provinces', 'provinces.code', '=', 'districts.province_code')
                ->orderBy('delivery_addresses.default', 'desc');
            $address = $address->get(['delivery_addresses.id', 'delivery_addresses.name', 'delivery_addresses.phone_number', 'delivery_addresses.address', 'delivery_addresses.default', 'delivery_addresses.type', 'wards.code as ward_code', 'districts.code as district_code', 'provinces.code as province_code', 'wards.full_name as ward_name', 'districts.full_name as district_name', 'provinces.full_name as province_name']);
            return response(['message' => 'getAddressSuccesfully', 'result' => ['address' => $address]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function addAddress(AddAddressRequest $request)
    {
        try {
            $data = $request->validated();
            $token = $request->bearerToken();


            /** @var \App\Models\Customer $customer */
            //Customer collection that matches id
            $user = Customer::where('id', $data['customerId']);

            //Check if customer id exists
            if (!$user->exists()) {
                return response(['message' => 'userInvalid', 'result' => []], 422);
            }

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }

            //Check if ward exists
            if (!Ward::where('code', $data['wardCode'])->exists()) {
                return response(['message' => 'wardInvalid', 'result' => []], 422);
            }

            //Check if type is valid
            if ((int)$data['type'] != 0 && (int)$data['type'] != 1) {
                return response(['message' => 'typeInvalid', 'result' => []], 422);
            }

            //Check if default is valid
            if ($data['default'] != "true" && $data['default'] != "false" && $data['default'] != "0" && $data['default'] != "1") {
                return response(['message' => 'defaultInvalid', 'result' => []], 422);
            }

            //Check if phone number is valid
            $phoneUtil = \libphonenumber\PhoneNumberUtil::getInstance();
            $phoneNumber = "";
            try {
                $phoneNumber = $phoneUtil->parse($data['phoneNumber'], "VN");
            } catch (\libphonenumber\NumberParseException $e) {
                return response(["message" => "CantProcessPhoneNumber", 'result' => []], 422);
            }
            $isValid = $phoneUtil->isValidNumber($phoneNumber);
            //Phone number is not valid
            if (!$isValid) {
                return response(["message" => "phoneNumberInvalid", 'result' => []], 422);
            }
            //Parse phone number to e164 format
            $phoneNumber =  $phoneUtil->format($phoneNumber, \libphonenumber\PhoneNumberFormat::E164);

            //Add new customer address
            /** @var \App\Models\DeliveryAddress $newAddress */

            //Set other address default value to false
            if (filter_var($data['default'], FILTER_VALIDATE_BOOLEAN)) {
                DeliveryAddress::where('customer_id', $data['customerId'])->update(['default' => 0]);
            }

            if (isset($data['addressId'])) {
                //Update address in DB
                $updateAddressPayload =    [
                    'name' => $data['name'],
                    'phone_number' => $phoneNumber,
                    'address' => $data['address'],
                    'ward_code' => $data['wardCode'],
                    'type' => (int)$data['type'],
                    'default' => filter_var($data['default'], FILTER_VALIDATE_BOOLEAN)
                ];
                DeliveryAddress::where('id', $data['addressId'])->update(
                    $updateAddressPayload
                );
                $address = DeliveryAddress::where('id', $data['addressId'])
                    ->join('wards', 'wards.code', '=', 'delivery_addresses.ward_code')
                    ->join('districts', 'districts.code', '=', 'wards.district_code')
                    ->join('provinces', 'provinces.code', '=', 'districts.province_code')
                    ->orderBy('delivery_addresses.default', 'desc');
                $address = $address->first(['delivery_addresses.id', 'delivery_addresses.name', 'delivery_addresses.phone_number', 'delivery_addresses.address', 'delivery_addresses.default', 'delivery_addresses.type', 'wards.code as ward_code', 'districts.code as district_code', 'provinces.code as province_code', 'wards.full_name as ward_name', 'districts.full_name as district_name', 'provinces.full_name as province_name']);
                return response(['message' => 'updatedAddressSuccessfully', 'result' => ['address' => $address]], 200);
            } else {
                //Add new address to DB
                $newAddress = DeliveryAddress::create(
                    [
                        'name' => $data['name'],
                        'phone_number' => $phoneNumber,
                        'address' => $data['address'],
                        'ward_code' => $data['wardCode'],
                        'customer_id' => $data['customerId'],
                        'type' => (int)$data['type'],
                        'default' => filter_var($data['default'], FILTER_VALIDATE_BOOLEAN)
                    ]
                );
                $address = DeliveryAddress::where('id', $newAddress['id'])
                    ->join('wards', 'wards.code', '=', 'delivery_addresses.ward_code')
                    ->join('districts', 'districts.code', '=', 'wards.district_code')
                    ->join('provinces', 'provinces.code', '=', 'districts.province_code')
                    ->orderBy('delivery_addresses.default', 'desc');
                $address = $address->first(['delivery_addresses.id', 'delivery_addresses.name', 'delivery_addresses.phone_number', 'delivery_addresses.address', 'delivery_addresses.default', 'delivery_addresses.type', 'wards.code as ward_code', 'districts.code as district_code', 'provinces.code as province_code', 'wards.full_name as ward_name', 'districts.full_name as district_name', 'provinces.full_name as province_name']);
                return response(['message' => 'addAddressSuccessfully', 'result' => ['address' => $address]], 200);
            }
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }


    public function setDefaultAddress(setDefaultRequest $request)
    {
        try {
            $data = $request->validated();
            $token = $request->bearerToken();


            /** @var \App\Models\Customer $customer */
            //Customer collection that matches id
            $user = Customer::where('id', $data['customerId']);

            //Check if customer id exists
            if (!$user->exists()) {
                return response(['message' => 'userInvalid', 'result' => []], 422);
            }

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }


            DeliveryAddress::where('customer_id', $data['customerId'])->update(['default' => 0]);


            //Set address as default
            $defaultAddress = DeliveryAddress::where('id', $data['addressId'])->update(['default' => 1]);
            return response(['message' => 'setDefaultAddressSuccessfully', 'result' => ['address' => $defaultAddress]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function deleteAddress(deleteAddressRequest $request)
    {
        try {
            $data = $request->validated();
            $token = $request->bearerToken();


            /** @var \App\Models\Customer $customer */
            //Customer collection that matches id
            $user = Customer::where('id', $data['customerId']);

            //Check if customer id exists
            if (!$user->exists()) {
                return response(['message' => 'userInvalid', 'result' => []], 422);
            }

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }

            //Delete address from
            $deleteAddress = DeliveryAddress::where('id', $data['addressId'])->delete();
            return response(['message' => 'deleteAddressSuccessfully', 'result' => ['address' => $deleteAddress]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getProvince(GetProvince $request)
    {
        try {
            /** @var \App\Models\Province $province */
            $province = Province::all(['code', 'full_name']);
            return response(['message' => 'getProvinceSuccess', 'result' => ['province' => $province]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getDistrict(GetDistrict $request)
    {
        try {
            $data = $request->validated();
            /** @var \App\Models\District $district */
            $district = District::where('province_code', $data['provinceCode'])->get(['code', 'full_name']);
            return response(['message' => 'getDistrictSuccess', 'result' => ['district' => $district]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getWard(GetWard $request)
    {
        try {
            $data = $request->validated();
            /** @var \App\Models\Ward $ward */
            $ward = Ward::where('district_code', $data['districtCode'])->get(['code', 'full_name']);
            return response(['message' => 'getWardSuccess', 'result' => ['ward' => $ward]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
}
