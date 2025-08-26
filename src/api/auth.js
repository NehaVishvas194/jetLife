import axios from "axios";

// Function to get auth token
export const getAuthToken = async () => {
  try {
    const response = await axios.get("/api/rest/auth/token", {
      auth: {
        username: "D6F4E8ADB1B3FFC8BC8BCCC811EF7645AEA21EBE",
        password: "Jetlife@2025",
      },
    });

    // Extract token from response
    const authToken = response.data.result.token;
    console.log("Extracted Token:", authToken);

    return authToken;
  } catch (error) {
    console.error(
      "Error fetching token:",
      error.response?.data || error.message
    );
    return null;
  }
};
