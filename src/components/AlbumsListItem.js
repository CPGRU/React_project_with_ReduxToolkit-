import { useRemoveAlbumMutation } from "../store";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import PhotosList from "./PhotosList";

function AlbumsListItem ({album}){
    const [ removeAlbum, results ] = useRemoveAlbumMutation();

    const handleClick = () =>{
        removeAlbum(album);
    }

    const header = 
        <>
            <Button className="m-2" loading={results.isLoading} onClick={handleClick}>
                <GoTrashcan /> 
            </Button>
            {album.title}
        </>;

    return (
        <ExpandablePanel key={album.id} header={header}>
            <PhotosList album={album}/>
        </ExpandablePanel>
    );
}

export default AlbumsListItem;