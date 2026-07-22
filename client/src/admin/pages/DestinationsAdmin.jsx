import ContentManager from "./ContentManager.jsx";

const config = {
    title: "Destinations",
    subtitle: "The stops shown in the 'where we take you' section.",
    endpoint: "/destinations",
    columns: [
        {key: "stopNo", label: "Stop #"},
        {key: "name", label: "Name"},
        {key: "description", label: "Description"}
    ],
    fields: [
        {key:"stopNo", label: "Stop label (e.g. Stop 01)"},
        {key: "name", label: "Destination name"},
        {key:"description", label: "Description", type:"textarea"},
        {key:"spots", label:"Highlights (separate with ·)"}
    ],
    emptyItem: {
        stopNo: "",
        name: "",
        description: "",
        spots: "",
        order: 0,
        active: true,
    }
};

export default function DestinationAdmin(){
    return <ContentManager config={config} />
}