const Foot = () => {
  return (
    <footer className="p-10">
      <div className="flex flex-col md:flex-row mx-1 md:mx-10 p-1 md:p-10 justify-between border-b-2 border-b-gray-200">
        <div>
          <h2 className="font-bold text-xl mb-8">Furniro.</h2>
          <p className="w-full md:w-48">
            More than 5000 offices and homes use our Products worldwide so
            become part of our community
          </p>
        </div>
        <div className="flex gap-6 md:gap-20 my-4 md:my-0">
          <div>
            <p className="text-xl mb-2 md:mb-8 text-gray-500">Links</p>
            <ul>
              <li>Home</li>
              <li>Shop</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <p className="text-xl mb-2 md:mb-8 text-gray-500">Help</p>
            <ul>
              <li>Payment Options</li>
              <li>Returns</li>
              <li>Privacy Policies</li>
            </ul>
          </div>
        </div>
        <div>
          <p className="text-xl mb-8 text-gray-500">NewsLetter</p>
          <div className="flex gap-3">
            <input
              type="text"
              name=""
              className="border-0 border-b-2 border-black focus:ring-0 focus:border-black w-full bg-gray-300"
            />
            <button className="mt-2">SUBSCRIBE</button>
          </div>
        </div>
      </div>
      <div className="my-10">
        <p>2024 furniro. All rights reverved</p>
      </div>
    </footer>
  );
};

export default Foot;
