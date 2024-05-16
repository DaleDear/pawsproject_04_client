

const BiosPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-left">Welcome to Paws and Relax Pet Sitting!</h1>
      
      {/* Company Bio */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1">
          <img src="/images/company-image.jpg" alt="Paws and Relax" className="w-full h-auto md:w-1/2 md:h-auto mx-auto" />
        </div>
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4 text-left">About Paws and Relax</h2>
          <p className="text-base text-left">
            At Paws and Relax, we understand that your pets are more than just animals - they are family. That is why we are dedicated to providing exceptional care and companionship for your furry friends when you can not be there.
          </p>
          <p className="text-base text-left mt-4">
            You can enjoy peace of mind knowing that your pets are in caring and capable hands. We are here to ensure that your pets receive the love, attention, and personalized care they deserve when you are away.
          </p>
          <p className="text-base text-left mt-4">
            Our team of experienced pet sitters is passionate about animals and committed to providing a safe, comfortable, and stress-free environment for your pets. From daily walks and playtime to feeding and medication administration, we tailor our services to meet the unique needs and preferences of each pet.
          </p>
          <p className="text-base text-left mt-4">
            At Paws and Relax Pet Sitting, we are more than just a pet sitting service because we allow you to experience the peace of mind that comes with knowing your pets are in the best possible care with Paws and Relax. 
          </p>
        </div>
      </section>

      {/* Sarah's Bio */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1">
          <img src="/images/sarah-image.jpg" alt="Sarah" className="w-full h-auto md:w-1/2 md:h-auto mx-auto" />
        </div>
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4 text-left">Sarah - Owner</h2>
          <p className="text-base text-left">
            As the proud owner of Paws and Relax Pet Sitting, Sarah brings a wealth of experience, passion, and dedication to the world of pet care. With a lifelong love for animals and a deep understanding of their needs, Sarah is committed to providing exceptional service and personalized attention to every furry friend under her care.
          </p>
          <p className="text-base text-left mt-4">
            Sarah began her journey into the world of pet sitting with her own beloved pets, who inspired her to turn her passion into a profession. With a background in animal behavior and care, Sarah has honed her skills to ensure that each pet receives the highest level of care and companionship.
          </p>
          <p className="text-base text-left mt-4">
            Driven by her genuine love for animals, Sarah goes above and beyond to create a safe, nurturing, and enriching environment for every pet entrusted to her care. From tail-wagging walks to cozy cuddle sessions, Sarah treats each pet as if they were her own, building strong bonds and lasting relationships along the way.
          </p>
        </div>
      </section>

      {/* Adrienne's Bio */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1">
          <img src="/images/adrienne-image.jpg" alt="Adrienne" className="w-full h-auto md:w-1/2 md:h-auto mx-auto" />
        </div>
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4 text-left">Adrienne - Lead Dog Walker</h2>
          <p className="text-base text-left">
            Adrienne is our lead dog walker and has been with Paws and Relax for several years. She has a deep understanding of canine behavior and knows how to keep dogs happy and well-exercised. Adrienne has a gentle and patient approach that makes her a favorite among our furry clients.
          </p>
          <p className="text-base text-left mt-4">
            With her extensive knowledge of dog breeds and their specific needs, Adrienne tailors each walk to ensure that every dog receives the exercise and stimulation they require. She is skilled in handling dogs of all sizes and temperaments, making her an invaluable member of our team.
          </p>
        </div>
      </section>

      {/* Buddy's Bio */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1">
          <img src="/images/buddy-image.jpg" alt="Buddy" className="w-full h-auto md:w-1/2 md:h-auto mx-auto" />
        </div>
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4 text-left">Buddy - In-Home Cat Sitter</h2>
          <p className="text-base text-left">
            Buddy is our dedicated in-home cat sitter. With a special affinity for felines, Buddy understands the unique needs of cats and provides them with the care and attention they require. He ensures that cats feel comfortable and relaxed in their own environment while their owners are away.
          </p>
          <p className="text-base text-left mt-4">
            Buddy has a calm and gentle demeanor that puts even the most timid cats at ease. He takes the time to bond with each cat, providing playtime, grooming, and plenty of cuddles. With Buddy on the job, you can have peace of mind knowing your cat is in loving hands.
          </p>
        </div>
      </section>
          
      {/* James's Bio */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1">
          <img src="/images/james-image.jpg" alt="James" className="w-full h-auto md:w-1/2 md:h-auto mx-auto" />
        </div>
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4 text-left">James - Pet Sitter</h2>
          <p className="text-base text-left">
            James is a dedicated pet sitter with a special fondness for all creatures great and small, particularly rabbits, guinea pigs, and hamsters. With a warm heart and a genuine passion for animal welfare, he goes above and beyond to ensure that every furry friend in his care receives the love, attention, and companionship they deserve.
          </p>
          <p className="text-base text-left mt-4">
            James brings his knowledge and experience to every interaction with the furry residents he cares for. Whether it is providing nutritious meals, refreshing water, cleaning habitats, or engaging in enriching playtime activities, he is dedicated to ensuring that each pet feels safe, happy, and loved in his presence.
          </p>
        </div>
      </section>    
      <div className="flex justify-center mt-8">
        <img src="/images/PawsLogo-image.jpg" alt="Paws and Relax Logo" className="w-40 h-auto" />
      </div>
    </div>
  );
};

export default BiosPage;