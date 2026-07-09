import { useParams } from "react-router-dom";

export default function RoutineDetails(){

    const {id}=useParams();

    return(

        <div className="min-h-screen flex items-center justify-center text-5xl">

            Routine

            <br/>

            {id}

        </div>

    )

}