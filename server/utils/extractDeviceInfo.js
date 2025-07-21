const extractDeviceInfo = (userAgent) => {
  const ua = userAgent.toLowerCase();
  let os = "Unknown OS";
  let browser = "Unknown Browser";
  let device = "Desktop";

  // Detect OS
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("mac os x")) os = "Mac OS";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("iphone")) os = "iOS";

  // Detect Browser
  if (ua.includes("chrome") && !ua.includes("edg")) browser = "Chrome";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("edg")) browser = "Edge";

  // Detect Device Type
  if (ua.includes("iphone") || ua.includes("android")) device = "Mobile";
  else if (ua.includes("ipad") || ua.includes("tablet")) device = "Tablet";

  return {
    os,
    browser,
    device,
    signature: `${os} - ${browser} - ${device}`
  };
}

export default extractDeviceInfo