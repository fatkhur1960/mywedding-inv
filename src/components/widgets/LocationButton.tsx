import { FC } from "react";

const LocationButton: FC<{ location: string }> = ({ location }) => {
    const openLocation = (e: any) => {
        e.preventDefault()
        window.open(location, '_blank')
    }

    return (
        <div onClick={openLocation} className="inline-flex hover:cursor-pointer hover:opacity-80 items-center justify-center w-fit bg-light px-1.5 py-1.5 text-xs rounded-md text-white space-x-1">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
            </div>
            <div>Lihat Lokasi</div>
        </div>
    );
}

export default LocationButton;