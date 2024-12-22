import { getRecentlyViewed } from "./../services/recentlyViewedService.js";

/**
 * Handle GET request for fetching recently viewed products for a user.
 */
export const fetchRecentlyViewed = async (req, res, next) => {
  try {
    console.log(`Request validated successfully : ${req.user.email}`);
    // We should also authroize the user to access the data for the requested user id then we have proceed with the below code

    // <--- Add code here >
    // <--- Add code here >
    /// For time being I just authenticate token and proceed with the below code
    const { userId } = req.params;
    const recentlyViewed = await getRecentlyViewed(userId);
    res.status(200).json(recentlyViewed);
  } catch (error) {
    next(error);
  }
};
