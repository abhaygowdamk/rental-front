const API_BASE_URL = "/api";

// Helper function to check if the server is running
async function checkServerConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/test`);
    const data = await response.json();
    return data.message === "Backend server is running";
  } catch (error) {
    return false;
  }
}

export async function fetchAvailableCars({
  pickupLocation,
  returnLocation,
  pickupDate,
  returnDate,
}) {
  try {
    // Check server connection first
    const isServerRunning = await checkServerConnection();
    if (!isServerRunning) {
      throw new Error(
        "Cannot connect to server. Please make sure the backend server is running."
      );
    }

    const params = new URLSearchParams();
    if (pickupLocation) params.append('pickUpLocation', pickupLocation);
    // Optionally add other params if backend supports them

    console.log("Fetching cars with params:", Object.fromEntries(params));

    const response = await fetch(
      `${API_BASE_URL}/search/cars?${params.toString()}`
    );

    // First check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Invalid content type:", contentType);
      throw new Error("Server response was not in JSON format");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch cars");
    }

    console.log("Fetched cars:", data);
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw new Error(
      error.message === "Failed to fetch"
        ? "Cannot connect to server. Please make sure the backend server is running."
        : error.message
    );
  }
}
