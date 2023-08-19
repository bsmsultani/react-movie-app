import NavBar from "./NavBar";
import LeftNav from "./LeftNav";


export default function Movies() {
    return (
        <div className="page">
            <NavBar />
            <LeftNav />
            <div className="movies-content">
                <h1>Movies</h1>
            </div>

        </div>
    )
}