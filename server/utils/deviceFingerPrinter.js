const deviceFingerPrinter = (headers, UAResult, req) => {
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
