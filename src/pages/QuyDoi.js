
const bangQuyDoi = [
    {
        title: "SO DU TIEN GUI",
        sotien: 200000000,
        diem: 1
    },
    {
        title: "DU NO VAY ",
        sotien: 300000000,
        diem: 1
    },
    {
        title: "DS CHI TIEU THE",
        sotien: 20000000,
        diem: 1
    },
    {
        title: "SO PHI BAO HIEM",
        sotien: 10000000,
        diem: 1
    }
];
const diemQuyDoi = [
    {
        min: 1,
        max: 4,
        hang: "CLASSIC"
    },
    {
        min: 5,
        max: 7,
        hang: "SILVER"
    },
    {
        min: 8,
        max: 11,
        hang: "GOLD"
    },
    {
        min: 12,
        max: 14,
        hang: "PLATINUM"
    },
    {
        min: 15,
        hang: "SIGNATURE"
    }
]

function QuyDoi(){
    return (
        <h1>Quy Doi Page</h1>
    )
}
export default QuyDoi;