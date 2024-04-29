async function getLocations() {
  const response = await fetch("/locations");
  const jsonResponse = await response.json();
  if (response.ok) {
    return jsonResponse;
  }
}