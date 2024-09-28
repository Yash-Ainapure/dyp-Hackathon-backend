import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/create-user", async (req, res) => {
  try {
    const { email, password, role, name } = req.body;
    const user = await prisma.users.create({
      data: {
        email,
        password,
        role,
        name,
      },
    });
    res.json(user);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: err });
  }
});

app.post("/create-event-booking", async (req, res) => {
  try {
    const {
      user_id,
      designation,
      department,
      phone,
      title,
      details,
      halldate,
      timefrom,
      timeto,
      coordinatorname,
      guestname,
      numberofguests,
      numberofattendents,
    } = req.body;
    // const demoData = {
    //   user_id: 1,
    //   designation: "designation",
    //   department: "department",
    //   phone: "phone",
    //   title: "title",
    //   details: "details",
    //   halldate: "halldate",
    //   timefrom: "timefrom",
    //   timeto: "timeto",
    //   coordinatorname: "coordinatorname",
    //   guestname: "guestname",
    //   numberofguests: 1,
    //   numberofattendents: 1,
    // };
    const eventBooking = await prisma.eventbookings.create({
      data: {
        user_id,
        designation,
        department,
        phone,
        title,
        details,
        halldate,
        timefrom,
        timeto,
        coordinatorname,
        guestname,
        numberofguests,
        numberofattendents,
      },
    });
    res.json(eventBooking);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: err });
  }
});

app.get("/get-all-events", async (req, res) => {
  try {
    const eventBooking = await prisma.eventbookings.findMany();
    res.json(eventBooking);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: err });
  }
});

app.post("/update-event-booking/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      user_id,
      designation,
      department,
      phone,
      title,
      details,
      halldate,
      timefrom,
      timeto,
      coordinatorname,
      guestname,
      numberofguests,
      numberofattendents,
    } = req.body;
    const eventBooking = await prisma.eventbookings.update({
      where: {
        id,
      },
      data: {
        user_id,
        designation,
        department,
        phone,
        title,
        details,
        halldate,
        timefrom,
        timeto,
        coordinatorname,
        guestname,
        numberofguests,
        numberofattendents,
      },
    });
    res.json(eventBooking);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: err });
  }
});

app.delete("/delete-event-booking/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const eventBooking = await prisma.eventbookings.delete({
      where: {
        id,
      },
    });
    res.json(eventBooking);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: err });
  }
});

app.post("/create-facilities", async (req, res) => {
  const {
    event_id,
    projector,
    podiummic,
    cordmic,
    cordlessmic,
    collarmic,
    projectorremote,
    usbdongle,
    mouse,
    amplifier,
    roomkey,
    acremote,
    lcdremote,
  } = req.body;
  try {
    const facilities = await prisma.facilities.create({
      data: {
        event_id,
        projector,
        podiummic,
        cordmic,
        cordlessmic,
        collarmic,
        projectorremote,
        usbdongle,
        mouse,
        amplifier,
        roomkey,
        acremote,
        lcdremote,
      },
    });
    res.json(facilities);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: err });
  }
});

// app.post("/update-event-facilities", async (req, res) => {
//   const {
//     event_id,
//     projector,
//     podiummic,
//     cordmic,
//     cordlessmic,
//     collarmic,
//     projectorremote,
//     usbdongle,
//     mouse,
//     amplifier,
//     roomkey,
//     acremote,
//     lcdremote,
//   } = req.body;
//   try {
//   } catch (err) {
//     console.error("Error executing query", err);
//     res.status(500).json({ error: err });
//   }
// });

app.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.users.findFirst({
      where: {
        email,
        password,
      },
    });
    if (user) {
      res.json({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: err });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
