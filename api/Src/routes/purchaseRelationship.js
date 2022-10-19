const { Router } = require("express");
const User = require("../../models/user");
const { isAuthenticate } = require("./verify-user");
const router = Router();

router.post("/purchaseComplete", isAuthenticate, async (req, res) => {
  try {
    const { _id } = req.body.user;
    const flightsData = req.body.flight;

    const user = await User.findById(_id);
    user.historyPurchase.push(req.body.flight);
    await user.save();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;