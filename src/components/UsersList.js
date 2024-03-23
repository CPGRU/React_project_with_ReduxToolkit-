import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";


function UsersList() {
    const [ isLoadingUsers, setIsLoadingUsers ] = useState(false);
    const [ loadingUsersError, setLoadingUsersError ] = useState(null);
    const dispatch = useDispatch();
    const { data } = useSelector((state)=>{  //state === big state
        return state.users //{ data: [], isLoading: false, error: null }
    });

    useEffect(()=>{
        setIsLoadingUsers(true);

        dispatch(fetchUsers())
            .unwrap()   //return a brand new promise that can use then/catch()
            .then(()=>{  //SUCESS
            })
            .catch((err)=>{
                setLoadingUsersError(err); //FAIL
            })
            .finally(()=>{
                setIsLoadingUsers(false);
            })

    }, [dispatch]);  //第二參數可為[]

    const handleUserAdd = () =>{
        dispatch(addUser());
    }

    if(isLoadingUsers) {
        return <Skeleton times={6} className="h-10 w-full"/>
    };
    if(loadingUsersError) {
        return <div>Error fetching data...</div>
    };

    const renderedUsers = data.map((user)=>{
        return <div key={user.id} className="mb-2 border rounded">
            <div className="flex p-2 justify-between items-center cursor-pointer">
                {user.name}
            </div>
        </div>
    });

    

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button onClick={handleUserAdd} >
                    + Add User
                </Button>
            </div>
            {renderedUsers}
        </div>
    )
}

export default UsersList;