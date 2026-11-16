/** Suggest an existing package only; browsers do not always expose the exact OS. */
export function detectRecommendedDownload({ userAgent = "", platform = "", maxTouchPoints = 0, userAgentData } = {}) {
  const ua = userAgent.toLowerCase();
  const os = (userAgentData?.platform || platform).toLowerCase();
  if (userAgentData?.mobile || /android|iphone|ipad|ipod/.test(ua) ||
      (os.includes("mac") && maxTouchPoints > 1)) return "mobile";
  if (/mac|cros/.test(`${os} ${ua}`)) return null;

  // All published packages are x64. Avoid suggesting one for known ARM/32-bit devices.
  const architecture = userAgentData?.architecture?.toLowerCase() || "";
  if (/arm|aarch|i[3-6]86/.test(`${architecture} ${os} ${ua}`) ||
      userAgentData?.bitness === "32" ||
      (/windows/.test(ua) && !/win64|wow64|x64/.test(ua) && /win32/.test(os))) return null;

  if (os.includes("windows") || os === "win32" || ua.includes("windows")) return "windows-installer";
  if (os.includes("linux") || ua.includes("linux")) {
    if (/fedora|suse|red hat|centos|rocky|alma/.test(ua)) return "linux-rpm";
    if (/ubuntu|debian|mint/.test(ua)) return "linux-deb";
    return "linux-appimage";
  }
  return null;
}

export async function recommendedDownloadForBrowser(browser) {
  let userAgentData = browser.userAgentData;
  if (userAgentData?.getHighEntropyValues) {
    try {
      const details = await userAgentData.getHighEntropyValues(["architecture", "bitness"]);
      userAgentData = { platform: userAgentData.platform, mobile: userAgentData.mobile, ...details };
    } catch {
      // Use the available browser signals if client hints are unavailable or blocked.
    }
  }
  return detectRecommendedDownload({
    userAgent: browser.userAgent,
    platform: browser.platform,
    maxTouchPoints: browser.maxTouchPoints,
    userAgentData,
  });
}
