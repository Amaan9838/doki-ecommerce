'use client';
import React,{useState} from 'react';
import { Star } from 'lucide-react';

const CustomerReviews = () => {
  const overallRating = 4.7;
  const totalReviews = 40;
  const ratingDistribution = [
    { stars: 5, percentage: 84 },
    { stars: 4, percentage: 9 },
    { stars: 3, percentage: 4 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 },
  ];

  const reviews = [
    {
      id: 1,
      author: 'Jhon Smith',
      date: '12, Dec 2024',
      rating: 4,
      likes: 25,
      content: 'Quality was not good but it can be better.',
    },
    {
      id: 2,
      author: 'Jemmy Dellum',
      date: '14, Dec 2025',
      rating: 5,
      likes: 55,
      content: 'Absolutely fantastic!',
    },
    {
      id: 3,
      author: 'Willum Heil',
      date: '22, April 2025',
      rating: 5,
      likes: 35,
      content: 'This is one of the best product.',
    },
  ];

  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <div className=" mx-auto p-6 bg-white rounded-2xl ">
      <h2 className="text-2xl font-bold mb-6">Customer reviews</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="mb-4">
            <div className="text-4xl font-bold">{overallRating} out of 5</div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-sm text-gray-500">{totalReviews} customer ratings</div>
          </div>
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center mb-1">
              <span className="w-20 text-sm">{item.stars} star</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-400 h-2.5 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="w-10 text-sm text-right">{item.percentage}%</span>
            </div>
          ))}
        </div>
        <div className="w-full md:w-2/3">
          {reviews.map((review) => (
            <div key={review.id} className="mb-6 pb-6 border-b last:border-b-0">
              <h3 className="font-semibold mb-2">{review.content}</h3>
              <p className="text-gray-600 mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac risus a risus
                elementum vehicula. Class aptent taciti sociosqu ad litora torquent conubia
                adipiscing elit. Maecenas ac risus a risus elementum
              </p>
              <div className="flex flex-col md:flex-row items-center text-sm text-gray-500">
               <div className=' flex items-center'>
                <img
                  src="https://randomuser.me/api/portraits/men/86.jpg"
                  alt={review.author}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-medium mr-2 text-sm">{review.author}</span>
                
                <span className="mr-2 text-xs">{review.date}</span>
                </div>
                <div className='flex'>
                <div className="flex items-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2">{review.likes}</span>
                <button className="ml-2 text-blue-600">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 cursor-pointer ${
                selectedRating > i ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => handleStarClick(i + 1)}
            />
          ))}
        </div>
        <form className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 px-3 py-2 border rounded-md"
            />
          </div>
          <input
            type="text"
            placeholder="Type review headline"
            className="w-full px-3 py-2 border rounded-md"
          />
          <textarea
            placeholder="Write your Review"
            className="w-full px-3 py-2 border rounded-md h-32"
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerReviews;