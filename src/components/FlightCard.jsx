import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FlightCard = ({ departure, returnFlight }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="card flight_search_items mb-4 shadow-lg rounded-2xl">
      <div className="card-body">
        <div className="row">
          {/* Left Side → Departure + Return */}
          <div className="col-md-9">
            {/* Departure Section */}
            <div className="mb-3">
              <h5 className="text-primary">Departure</h5>
              <div className="d-flex align-items-center gap-4">
                <div>
                  <h3>
                    {new Date(departure.departureTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </h3>
                  <p>{departure.fromAirport}</p>
                </div>
                <div className="text-center">
                  <p>{departure.duration}</p>
                  <p>
                    {departure.legs?.length > 1
                      ? `${departure.legs.length - 1} Stop(s)`
                      : "Non-stop"}
                  </p>
                </div>
                <div>
                  <h3>
                    {new Date(departure.arrivalTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </h3>
                  <p>{departure.toAirport}</p>
                </div>
              </div>
            </div>

            {/* Return Section (Only if exists) */}
            {returnFlight && (
              <div>
                <h5 className="text-success">Return</h5>
                <div className="d-flex align-items-center gap-4">
                  <div>
                    <h3>
                      {new Date(returnFlight.departureTime).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </h3>
                    <p>{returnFlight.fromAirport}</p>
                  </div>
                  <div className="text-center">
                    <p>{returnFlight.duration}</p>
                    <p>
                      {returnFlight.legs?.length > 1
                        ? `${returnFlight.legs.length - 1} Stop(s)`
                        : "Non-stop"}
                    </p>
                  </div>
                  <div>
                    <h3>
                      {new Date(returnFlight.arrivalTime).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </h3>
                    <p>{returnFlight.toAirport}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side → Price + Book Now */}
          <div className="col-md-3 d-flex flex-column justify-content-between align-items-end">
            <div>
              <h3 className="text-danger">{departure.price}</h3>
              <button className="btn btn-primary btn-sm">Book Now</button>
            </div>
          </div>
        </div>

        {/* Flight Details Toggle */}
        <div className="mt-3">
          <div
            className="d-flex justify-content-between align-items-center cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <span>Flight Details</span>
            {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>

          {open && (
            <div className="mt-2 p-3 border rounded bg-light">
              {/* Departure Details */}
              <p>
                <strong>Departure:</strong> {departure.fromDetails} →{" "}
                {departure.toDetails}
              </p>
              <p>
                {new Date(departure.departureTime).toLocaleString()} -{" "}
                {new Date(departure.arrivalTime).toLocaleString()} (
                {departure.duration})
              </p>

              {/* Return Details */}
              {returnFlight && (
                <>
                  <hr />
                  <p>
                    <strong>Return:</strong> {returnFlight.fromDetails} →{" "}
                    {returnFlight.toDetails}
                  </p>
                  <p>
                    {new Date(returnFlight.departureTime).toLocaleString()} -{" "}
                    {new Date(returnFlight.arrivalTime).toLocaleString()} (
                    {returnFlight.duration})
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
