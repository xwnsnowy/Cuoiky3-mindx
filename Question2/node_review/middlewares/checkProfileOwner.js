export const checkProfileOwner = async (req, res, next) => {
  try {
    const authenticatedUserId = req.user._id;

    const profileId = req.params.id;

    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    // Check if the authenticated user is the owner of the profile
    if (authenticatedUserId !== profile.userId.toString()) {
      return res.status(403).json({
        message: "Forbidden: You are not the owner of this profile",
      });
    }

    // If the authenticated user is the owner, allow the operation to proceed
    next();
  } catch (error) {
    next(error);
  }
};
