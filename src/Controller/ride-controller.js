import {
  RideService,
  LocationService,
  CaptainService,
} from "../service/index.js";
const locationService = new LocationService();
const rideService = new RideService();
const captainService = new CaptainService();
import { io } from "../index.js";
import req from "express/lib/request.js";

const create = async (req, res) => {
  try {
    const input = {
      userId: req.user.id,
      origin: req.body.origin,
      destination: req.body.destination,
      vehicleType: req.body.vehicleType,
    };
    

    const data = await rideService.create(input);

    const coordinates = await locationService.getCoordinates(data.origin);

    const locationObj = {
      ltd: coordinates.lat,
      lng: coordinates.lng,
      radius: 3,
    };

    const captains = await captainService.captainInRadius(locationObj);

    const userRide = await rideService.getById(data._id);


    captains.forEach((c) => {
        console.log(c);
      io.to(c.socketId).emit("ride-notifications", userRide);
    });

    return res.status(201).json({
      data,
      status: true,
      message: "successfully created the ride",
      err: {},
    });
  } catch (err) {
    return res.status(500).json({
      data: {},
      message: "not able to create the ride",
      err: err.message,
    });
  }
};

const ridesFare = async (req, res) => {
  try {
    const finalData = {
      origin: req.query.origin,
      destination: req.query.destination,
    };
    const data = await rideService.allFares(finalData);

    res.status(200).json({
      data: data,
      status: true,
      message: "successfully fetched the details",
      err: {},
    });
  } catch (err) {
    return res.status(500).json({
      data: {},
      status: false,
      message: "not able to fetch the details",
      err: err,
    });
  }
};

const rideConfirm = async (req, res) => {
  try {
    const rideData = {
      captainId: req.captain.id,
      rideId: req.query.rideId,
    };

    const ride = await rideService.confirmRide(rideData);

    const captain_info_for_user = {
      cp_first_name: ride.captainId.fullName.firstName,
      cp_last_name: ride.captainId.fullName.lastName,
      vehicle: ride.captainId.vehicle,
    };

    io.to(ride.userId.socketId).emit("rideAccepted", captain_info_for_user);
   
    const rideRoom = `ride_${ride._id}`;
    io.sockets.sockets.get(ride.userId.socketId)?.join(rideRoom);
    io.sockets.sockets.get(ride.captainId.socketId)?.join(rideRoom);

    const coordinates = await locationService.getCoordinates(ride.origin);

    const locationObj = {
      ltd: coordinates.lat,
      lng: coordinates.lng,
      radius: 3,
    };

    const captains = await captainService.captainInRadius(locationObj);

    captains.forEach((c) => {
      if (c.socketId !== ride.captainId.socketId) {
        io.to(c.socketId).emit("ride-notifications-2", {
          _id: ride.id,
        });
      }
    });

    return res.status(200).json({
      data: ride,
      message: "able to update the ride",
      errr: {},
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: {},
      message: "not able to update the ride",
      err: err,
    });
  }
};

const rideCompleted = async (req, res) => {
  try {
    const ride = await rideService.rideComplete(req.query.rideId);
    io.to(ride.userId.socketId).emit("rideCompleted", {
      message: "done",
    });

    return res.status(200).json({
      data: ride,
      status: true,
      message: "ride completed successfully",
      err: {},
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: {},
      status: false,
      message: "not able to complete the ridde",
      err: {},
    });
  }
};

const confirmOTPAndStartRide = async (req, res) => {
  try {
    const ride = await rideService.confirmOTPAndStart(
      req.query.rideId,
      req.query.otp
    );

    const captain_info_for_user = {
      cp_first_name: ride.captainId.fullName.firstName,
      cp_last_name: ride.captainId.fullName.lastName,
      vehicle: ride.captainId.vehicle,
    };
    io.to(ride.userId.socketId).emit("rideStarted", captain_info_for_user);

    return res.status(200).json({
      data: ride,
      status: false,
      message: "ride is confirmed",
      err: {},
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: {},
      status: false,
      message: "ride is not  confirmed",
      err: err.message || err,
    });
  }
};

const deleteRide = async (req, res) => {
  try {
    const ride = await rideService.deleteRide(req.query.rideId);
    console.log(ride);

    const coordinates = await locationService.getCoordinates(ride.origin);

    const locationObj = {
      ltd: coordinates.lat,
      lng: coordinates.lng,
      radius: 3,
    };

    const captains = await captainService.captainInRadius(locationObj);

    captains.forEach((c) => {
      io.to(c.socketId).emit("ride-notifications-2", {
        _id: ride.id,
      });
    });

    return res.status(201).json({
      data: res,
      status: false,
      message: "ride deleted successfully",
      err: {},
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: {},
      message: "ride not able to delete",
      err: {},
    });
  }
};
export {
  create,
  ridesFare,
  rideConfirm,
  rideCompleted,
  confirmOTPAndStartRide,
  deleteRide,
};
