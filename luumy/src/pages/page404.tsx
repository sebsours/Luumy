export default function page404(){
    return (
        <div className="bg-background h-full text-text flex justify-center">
            <div className="text-center pt-10">
                <span className="font-bold text-5xl">Error 404</span>
                <p className="mt-3 font-semibold">Sorry! This page doesn't exist. Click <strong className="text-primary-button"><a href="/">here</a></strong> to go back</p>
            </div>
        </div>
    )
}