const deviceFingerPrinter = (headers, UAResult) => {
    return {
        visitorId: headers["x-device-id"],
        deviceIp: headers["x-forwarded-for"] || req.socket.remoteAddress,
        deviceModal: UAResult.device?.model?.trim()?.toLowerCase() || "",
        deviceVender: UAResult.device?.vendor?.trim()?.toLowerCase() || "",
        oSName: UAResult.os?.name?.trim()?.toLowerCase(),
        oSVersion: UAResult.os?.version?.trim()?.split(".")[0],
        browserName: UAResult.browser?.name?.trim()?.toLowerCase(),
        browserVersion: UAResult.browser?.version?.trim()?.split(".")[0],
        uA: UAResult.ua?.trim()?.toLowerCase()
    }
}

module.exports = deviceFingerPrinter;

// {
//     visitorId: headers["x-device-id"],
//         deviceIp: headers["x-forwarded-for"] || req.socket.remoteAddress,
//             deviceModal: uaResult.device?.model?.trim()?.toLowerCase() || "",
//                 deviceVender: uaResult.device?.vendor?.trim()?.toLowerCase() || "",
//                     oSName: uaResult.os?.name?.trim()?.toLowerCase(),
//                         oSVersion: uaResult.os?.version?.trim()?.split(".")[0],
//                             browserName: uaResult.browser?.name?.trim()?.toLowerCase(),
//                                 browserVersion: uaResult.browser?.version?.trim()?.split(".")[0],
//                                     uA: uaResult.ua?.trim()?.toLowerCase()
// }