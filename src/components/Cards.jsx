import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const Cards = () => {
  return (
    <div className="card">
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="max-w-md bg-white p-6 rounded-md shadow-md">
          <img
            src="https://placekitten.com/400/300"
            alt="Card Image"
            className="rounded-md mb-4"
          />

          <h2 className="text-2xl font-bold mb-2">Card Heading</h2>

          <p className="text-gray-600 mb-4">
            Short description goes here. Add more details about the card
            content.
          </p>

          <NavLink to="/blogs/1">
            <Button>Read More</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cards;