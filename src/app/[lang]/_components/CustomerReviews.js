'use client';
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import GlobalApi from '../_utils/GlobalApi';

const CustomerReviews = ({ itemId }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]); // Initialized as an empty array
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(false); 
  const jwt = sessionStorage.getItem('jwt');

  useEffect(() => {
    // Fetch existing reviews
    const fetchReviews = async () => {
      try {
        const response = await GlobalApi.getReviews(itemId);
        console.log("this is the reviews:", response);
        const fetchedReviews = response; // Ensure fetchedReviews is an array

        if (fetchedReviews.length > 0) {
          setReviews(fetchedReviews);

          // Calculate average rating
          const totalRating = fetchedReviews.reduce((acc, review) => acc + review.attributes.ratingValue, 0);
          setAverageRating(totalRating / fetchedReviews.length);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [itemId]);

  const handleStarClick = (rating) => {
    setRating(rating);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || reviewText.trim() === '' || reviewerName.trim() === '') {
      setError('Please provide a rating, review, and name.');
      return;
    }

    const data = {
      data: {
        ratingValue: rating,
        reviewText: reviewText,
        reviewerName: reviewerName,
        related_item: itemId,
      },
    };

    setLoading(true); // Start loader

    try {
      const resp = await GlobalApi.postReviews(data, jwt);
      setError(null);
      setSubmitted(true);
      setRating(0);
      setReviewText('');
      setReviewerName('');

      // Refresh the reviews list after submission
      const response = await GlobalApi.getReviews(itemId);
      setReviews(response);

    } catch (e) {
      console.error("Error submitting review:", e);
      setError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Customer reviews</h2>

      {reviews && reviews.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="mb-4">
              <div className="text-4xl font-bold">
                {averageRating.toFixed(1)} out of 5
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(averageRating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    } fill-current`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">
                {reviews.length} customer ratings
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="mb-6 pb-6 border-b last:border-b-0"
              >
                <h3 className="font-semibold mb-2">{review.attributes.reviewerName}</h3>
                <p className="text-gray-600 mb-2">
                  {review.attributes.reviewText}
                </p>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.attributes.ratingValue
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill={i < review.attributes.ratingValue ? '#facc15' : '#d1d5db'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-600">
          There are no reviews yet. Be the first to give a review!
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 cursor-pointer ${
                rating > i ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => handleStarClick(i + 1)}
            />
          ))}
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {submitted && <div className="text-green-500 mb-4">Review submitted successfully!</div>}
        <form className="space-y-4" onSubmit={handleReviewSubmit}>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <textarea
            placeholder="Write your Review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full px-3 py-2 border rounded-md h-32"
          ></textarea>
          <button
            type="submit"
            className={`px-4 py-2 rounded-md ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerReviews;
