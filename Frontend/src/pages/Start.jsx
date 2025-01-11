import { Link } from 'react-router-dom';

const Start = () => {
    return (
        <div >
            <div
                className="bg-cover bg-center
            bg-[url(https://miro.medium.com/v2/resize:fit:828/format:webp/0*SL7ScBQXovvaJT--)] 
                h-screen pt-8 flex justify-between flex-col w-full"
            >
                <img
                    className="w-16 ml-8"
                    src="https://www.edigitalagency.com.au/wp-content/uploads/Uber-logo-white-png-900x313.png"
                    alt="Uber Logo"
                />

                <div className="bg-white pb-8 py-4 px-4">
                    <h2 className="text-[30px] font-semibold">Get Started with Uber</h2>
                    <Link
                        to="/login"
                        className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg 
                        mt-5"
                    >
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Start;
