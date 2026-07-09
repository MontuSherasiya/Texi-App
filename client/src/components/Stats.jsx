const stats = [
    {
        num: "40+",
        lable: "Professional drivers"
    },
    {
        num: "12,000+",
        lable: "Trip completed"
    }, 
    {
        num: "25+",
        lable: "Vehicles in fleet"
    }, 
    {
        num: "4.8⭐",
        lable: "Average rating"
    },
];

export default function Stats(){
    return(
        <div className="stats">
            <div className="wrap stats-row">
                {stats.map((s) => (
                    <div className="stat" key={s.lable}>
                        <div className="num">{s.num}</div>
                        <div className="lable">{s.lable}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}