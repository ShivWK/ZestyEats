import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDeviceFingerPrint } from "../features/home/homeSlice";
import { setDeviceFingerPrintRestro } from "../features/home/restaurantsSlice";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const useDeviceFingerPrint = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const deviceInfo = async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();

            dispatch(setDeviceFingerPrint(result.visitorId));
            dispatch(setDeviceFingerPrintRestro(result.visitorId));
        };

        deviceInfo();
    }, [dispatch]);
}