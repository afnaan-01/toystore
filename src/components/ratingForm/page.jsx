'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Star, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

function App({ productId }) {
 
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      customerName: '',
      comment: '',
      rating: 0
    }
  });

  const onSubmit = async (data) => {
    
    try {
    console.log(data)
    const payload = {
      ...data,
      productId,
    };

    const response = await axios.post("/api/add-rating", payload);

    if (response.status === 200) {
      setSubmittedData(data);
      setIsSubmitted(true);
    } else {
       setIsSubmitted(false);
       reset();
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }    
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  const handleStarClick = (rating) => {
    setValue('rating', rating);
  };

  const renderStars = () => {
    const currentRating = getValues('rating');
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= (hoveredRating || currentRating);

      return (
        <button
          key={starValue}
          type="button"
          className={`transition-all duration-200 transform hover:scale-110 ${
            isFilled ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-300 hover:text-yellow-300'
          }`}
          onClick={() => handleStarClick(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          <Star
            size={32}
            fill={isFilled ? 'currentColor' : 'none'}
            className="transition-colors duration-200"
          />
        </button>
      );
    });
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center transform animate-pulse">
          <div className="text-green-500 mb-4 flex justify-center">
            <CheckCircle size={64} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">Your rating has been submitted successfully.</p>
          <div className="flex justify-center space-x-1 mb-4">
            {Array.from({ length: submittedData.rating }, (_, i) => (
              <Star key={i} size={20} fill="currentColor" className="text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-gray-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-black p-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Rate Your Experience</h1>
          <p className="text-blue-100">We'd love to hear your feedback</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              {...register('customerName', { required: 'Name is required' })}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Review Input */}
          <div className="space-y-2">
            <label htmlFor="review" className="block text-sm font-semibold text-gray-700">
              Your Review
            </label>
            <textarea
              id="review"
              rows={4}
              placeholder="Share your thoughts and experience with us..."
              {...register('comment', { required: 'Review is required' })}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.review ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            />
            {errors.review && <p className="text-sm text-red-500">{errors.review.message}</p>}
            <p className="text-xs text-gray-500">{getValues('review')?.length || 0}/500 characters</p>
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Rate Your Experience
            </label>
            <div className="flex justify-center space-x-2">{renderStars()}</div>
            {getValues('rating') > 0 && (
              <p className="text-center text-sm text-gray-600">{getValues('rating')} out of 5 stars</p>
            )}
            {errors.rating && <p className="text-sm text-red-500 text-center">{errors.rating.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-gray-700  transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg flex items-center justify-center space-x-2"
          >
            <Send size={20} />
            <span>Submit Review</span>
          </button>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-xs text-gray-500">Your feedback helps us improve our services</p>
        </div>
      </div>
    </div>
  );
}

export default App;
