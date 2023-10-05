import UserCard from "../components/UserCard"

export default function EditMyProfile (){

    const data = {
    
        Name: 'Alex Morrison',
        Speciality: "Orthopedic Surgeon",
        Email: "alesMorris@hotmail.com",
        HourlyRate: "$10/h",
        Affiliation: "Saudi Almany Hospital"
       
    }


    return (
        <UserCard data={data}/>
    );
}