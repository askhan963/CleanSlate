import { Webhook } from "svix";
import userModel from "../models/userModel.js";

// API controller function to manage Clerk user with the database
// http://localhost:5500/api/user/webhooks
const clerkWebHooks = async (req, res) => {
  try {
    // Create svix instance with Clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        try {
          const userData = {
            clerkId: data.id,
            email: data.email_addresses[0].email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            photo: data.image_url,
          };
          await userModel.create(userData);
          res.json({ success: true });
        } catch (dbError) {
          console.error("Database Error:", dbError);
          res
            .status(500)
            .json({
              success: false,
              message: "Failed to save data in database.",
            });
        }
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({});
        break;
      }
      default:
        res
          .status(400)
          .json({ success: false, message: "Unknown event type." });
        break;
    }
  } catch (error) {
    console.error("Webhook Error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// API controller function to get user available credits data
const userCredits = async (req, res) => {
  try {
    const { clerkId } = req.body;
    const userData = await userModel.findOne({ clerkId });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { clerkWebHooks, userCredits };
