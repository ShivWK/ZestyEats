import { motion } from "motion/react"

export default function Button({ ref, clickHandler, iconClass }) {
    return <motion.button
        ref={ref}
        onClick={clickHandler}
        className="group cursor-pointer"
        whileTap={{ scale: 0.90 }}
    >
        <i className={`ri-arrow-${iconClass}-circle-fill text-[40px] text-primary group-disabled:text-gray-400 group-active:text-primary transition-all duration-75 ease-in`}></i>
    </motion.button>
}