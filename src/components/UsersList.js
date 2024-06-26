import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useThunk } from "../hook/use-thunk";
import UsersListItem from "./UsersListItem";

function UsersList() {
    const [ doFetchUsers, isLoadingUsers, loadingUsersError ] = useThunk(fetchUsers);
    const [ doAddUser, isCreatingUser, creatingUserError ] = useThunk(addUser);
    
    
    const { data } = useSelector((state)=>{  //state === big state
        return state.users //{ data: [], isLoading: false, error: null }
    });

    useEffect(()=>{
        doFetchUsers();
    }, [doFetchUsers]);  //2nd Arg can be: []

    const handleUserAdd = () => doAddUser();

    let content;
    if(isLoadingUsers) {
        content =  <Skeleton times={6} className="h-10 w-full"/>
    } else if(loadingUsersError) {
        content = <div>Error fetching data...</div>
    }else {
        content = data.map((user)=>{
            return <UsersListItem key={user.id} user={user} />

        })  
    };


    

    return (
        <div>
            <div className="flex flex-row justify-between items-center m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button loading={isCreatingUser} onClick={handleUserAdd} > + Add User</Button>
                { creatingUserError && 'error creating user...'}
            </div>
            {content}
        </div>
    )
}

export default UsersList;