import { useFetchDoctorQuery } from "../../store";
import UserCard from "../components/UserCard"


export default function EditMyProfile (){
    // const data = useSelector((state)=>{
    //     return state.doctorSlice;
    // });
    
    

    return (
        <div className="ml-10 mt-5">
            <UserCard />
        </div>
    );
}