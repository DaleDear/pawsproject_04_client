

const Reviews = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Client Reviews</h1>
        <p className="text-xl">Coming Soon!</p>
        <p className="text-lg mt-4">
          We are working on gathering reviews from our satisfied clients. Stay tuned for updates!
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <img src="/images/reviews-image.jpg" alt="Reviews" className="w-full md:w-1/2 h-auto" />
      </div>
      <div className="flex justify-center mt-8">
        <img src="/images/PawsLogo-image.jpg" alt="Paws and Relax Logo" className="w-40 h-auto" />
      </div>
    </div>
  );
};

export default Reviews;