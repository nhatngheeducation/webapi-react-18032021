//6. Destructing (object/array)
let ngayThanhLap = [10, 3, 2003]
let [ngay, thang, nam] = ngayThanhLap;
console.log(ngay)
console.log(thang)
console.log(nam)
let [, month,] = ngayThanhLap;
console.log("Thang:", month)

let hocVien = {
    "ten": "Nhất Nghệ",
    "tuoi": 18,
    "conDiHoc": true
}
let { ten: tengi, tuoi, conDiHoc } = hocVien;
console.log(tengi)
console.log(tuoi)
console.log(conDiHoc)