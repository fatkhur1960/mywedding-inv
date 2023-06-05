import FloralBottom from "../../assets/FloralBottom";
import FloralLeft from "../../assets/FloralLeft";
import FloralRight from "../../assets/FloralRight";

const Logo = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center space-x-2">
                <FloralLeft />
                <h3 className="font-cormorant text-5xl leading-none">SF</h3>
                <FloralRight />
            </div>
            <div className="-mt-4">
                <FloralBottom />
            </div>
        </div>
    );
}

export default Logo;