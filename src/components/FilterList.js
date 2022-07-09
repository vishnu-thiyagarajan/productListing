import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function FilterList({filterState, onFilterChange}){
    return (
        <List>
            <ListItem>
                Color
            </ListItem>
            <ListItem disablePadding>
            <List>
                <ListItem disablePadding><Checkbox checked={filterState["Red"]} onChange={()=>onFilterChange("Red")}/>Red</ListItem>
                <ListItem disablePadding><Checkbox checked={filterState["Blue"]} onChange={()=>onFilterChange("Blue")}/>Blue</ListItem>
                <ListItem disablePadding><Checkbox checked={filterState["Green"]} onChange={()=>onFilterChange("Green")}/>Green</ListItem>
                </List>
            </ListItem>
            <ListItem>
                Gender
            </ListItem>
            <ListItem disablePadding>
                <List>
                <ListItem disablePadding><Checkbox checked={filterState["Men"]} onChange={()=>onFilterChange("Men")}/>Male</ListItem>
                <ListItem disablePadding><Checkbox checked={filterState["Women"]} onChange={()=>onFilterChange("Women")}/>Female</ListItem>
                </List>
            </ListItem>
            <ListItem>
                Price
            </ListItem>
            <ListItem disablePadding>
                <List>
                <ListItem disablePadding><Checkbox checked={filterState["R0-250"]} onChange={()=>onFilterChange("R0-250")}/>Rs.0-Rs.250</ListItem>
                <ListItem disablePadding><Checkbox checked={filterState["R251-450"]} onChange={()=>onFilterChange("R251-450")}/>Rs.251-Rs.450</ListItem>
                <ListItem disablePadding><Checkbox checked={filterState["R450"]} onChange={()=>onFilterChange("R450")}/>Rs.450</ListItem>
                </List>
            </ListItem>
            <ListItem>
                Type
            </ListItem>
            <ListItem disablePadding>
                <List>
                <ListItem disablePadding><Checkbox checked={filterState["Polo"]} onChange={()=>onFilterChange("Polo")}/>Polo</ListItem>
                <ListItem disablePadding><Checkbox checked={filterState["Hoodie"]} onChange={()=>onFilterChange("Hoodie")}/>Hoodie</ListItem>
                <ListItem disablePadding><Checkbox checked={filterState["Basic"]} onChange={()=>onFilterChange("Basic")}/>Basic</ListItem>
                </List>
            </ListItem>
        </List>
    )
}