import React, { useEffect } from 'react';

import { useForm } from "react-hook-form";

const AddressForm = ({register, errors}) => {

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

            <div className="space-y-4">
                {/* <form onSubmit={handleSubmit()}> */}

                    <input
                        {...register("fullName", { required: "Name is required" })}
                        placeholder="Full Name"
                        className="w-full border rounded p-2"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    <input
                        {...register("email", { required: "Email is required" })}
                        placeholder="Email"
                        className="w-full border rounded p-2"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <input
                        {...register("address", { required: "Address is required" })}
                        placeholder="Address"
                        className="w-full border rounded p-2"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

                    <div className="flex gap-4 w-full">
                        <div className="flex flex-col w-1/2">
                            <input
                                {...register("city", { required: "City is required" })}
                                placeholder="City"
                                className="w-full border rounded p-2"
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                        </div>

                        <div className="flex flex-col w-1/2">
                            <input
                                {...register("state", { required: "State is required" })}
                                placeholder="State"
                                className="w-full border rounded p-2"
                            />
                            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                        </div>

                    </div>
                    <input
                        {...register("pinCode", { required: "PIN code is required" })}
                        placeholder="PIN Code"
                        className="w-full border rounded p-2"
                    />
                    {errors.pinCode && <p className="text-red-500 text-sm">{errors.pinCode.message}</p>}
                    <input
                        {...register("phoneNo", { required: "Phone Number is required" })}
                        placeholder="Phone "
                        className="w-full border rounded p-2"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

                    <input
                        {...register("landmark")}
                        placeholder="Landmark (Optional)"
                        className="w-full border rounded p-2"
                    />
                    {/* Promo Code */}
                    <input
                        {...register("promoCode")}
                        placeholder="Enter Promo Code  (Optional)"
                        className="w-full border rounded p-2"
                    />
                {/* </form> */}
            </div>


        </div>
    );
};

export default AddressForm;