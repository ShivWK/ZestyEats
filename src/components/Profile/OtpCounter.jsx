import { useEffect, useState } from "react";

const OtpCounter = ({ disableVerify }) => {
    const [counterSecond, setCounterSecond] = useState(0);
    const [counterMinutes, setCounterMinutes] = useState(1);
    const [otpExpired, setOtpExpired] = useState(false);

    useEffect(() => {
        if (counterMinutes === 0 && counterSecond === 0) {
            disableVerify(true);
            setOtpExpired(true)
        }
    }, [counterMinutes, counterSecond, disableVerify])

    useEffect(() => {
        const timer = setInterval(() => {
            setCounterSecond((pre => {
                if (pre === 0) {
                    setCounterMinutes(pre => {
                        if (pre === 0) {
                            clearInterval(timer);
                            return 0
                        }

                        return --pre;
                    })

                    if (counterMinutes === 0) {
                        return 0;
                    } else {
                        return 59;
                    }
                }

                return --pre
            }))
        }, 1000);

        return () => clearInterval(timer)
    }, [])

    return <div className="flex items-center justify-center gap-2 dark:text-gray-200">
        {!otpExpired ? <p>OTP expires in <span>{`0${counterMinutes}:${counterSecond > 9 ? counterSecond : `0${counterSecond}`}`}</span></p>
            : <p className="text-red-500">OTP expired</p>
        }
    </div>
}

export default OtpCounter;