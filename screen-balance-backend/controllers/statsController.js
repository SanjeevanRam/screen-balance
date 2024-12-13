export const updateStats = async (req, res) => {
    const { screenTime } = req.body; // Extract screenTime from the request body
    const userId = req.user.id; // Retrieve the authenticated user's ID from the request
  
    if (!screenTime) {
      return res.status(400).json({ error: "Screen time is required." });
    }
  
    try {
      // Find the user's stats or create them if they don't exist
      let stats = await Stats.findOne({ userId });
  
      if (!stats) {
        stats = new Stats({ userId, screenTime });
      } else {
        stats.screenTime = screenTime;
      }
  
      await stats.save(); // Save the updated stats to the database
  
      res.status(200).json({ message: "Screen time updated successfully.", updatedScreenTime: stats.screenTime });
    } catch (error) {
      console.error("Error updating stats:", error);
      res.status(500).json({ error: "An error occurred while updating stats." });
    }
  };
  