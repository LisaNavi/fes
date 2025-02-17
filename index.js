let colors = new Array("#ff9900","#6699ff","#66cc33","#ff3300");
let map = document.getElementById("map");
let dis_number = document.getElementById("floorid");
let panel = document.getElementById("information");
let inputbox = document.getElementById("input");
let schedulebox = document.getElementById("cls-table");
let route_panel = document.getElementById('route-panel')
let inputS = document.getElementById("input-start");
let inputG = document.getElementById("input-goal");
var Sx = [];
var Sy = [];
var Gx = [];
var Gy = [];

// クッキーから読み込み
let userdata = {};
if (Cookies.get("data") != undefined)
{
    userdata = JSON.parse(Cookies.get("data"));
}

const now_daystamp = new Date();
now_daystamp.setHours(0);
now_daystamp.setMinutes(0);
now_daystamp.setSeconds(0);
var nowtime = (new Date().valueOf() - now_daystamp[Symbol.toPrimitive]('number'))/1000;
var floornum = 0;
var classtime = 1;
var classday = new Date().getDay();

function floor(num)
{
    floornum = num;
    dis_number.textContent = (num+1) + "F";
    dis_number.style.background=colors[num];
    map.contentWindow.flchange(num);
}

function search(num){
    if (Number.isInteger(num)){
        alert("部屋番号を入力してください。");
    }
    else if (!(num > 100 && num < 1000)) {
        alert("3桁である必要があります。");
    }
    else if (!(num[0] < 5 && num[0] > 0))
    {
        alert(num[0] + "階は存在しません。");
    }
    else {
        if (typeof data[num] == "undefined"){
            alert("指定された部屋番号は登録されていません。");
        }
        else {
            map.contentWindow.room = num;
            map.contentWindow.flchange(num-1);
            map.contentWindow.showup(num);
            dis_number.textContent = num[0] + "F";
            dis_number.style.background=colors[num[0] - 1];
            if (data[num][4] != undefined)
                document.getElementById("info-btn").style.display = "inline";
            else
                document.getElementById("info-btn").style.display = "none";
        }
    }
}

function open_route(){
    var route_pane = document.getElementById("route-panel");
    route_pane.style.visibility = "visible";
    
}

function close_route(){
    var close_pane = document.getElementById("route-panel");
    close_pane.style.visibility = "hidden";
}


// URLボタン用
function Url(a, needsAuth = false) {
    if (needsAuth) {
        var res = prompt("学校メアド@_____.ed.jpの__を埋めてください");
        console.log(res);
        if (res == "gl.pen-kanagawa") {
            open(a, target="_blank");
        }
    } else {
        open(a, target="_blank");
    }
}

function info(num) {
    var info_pane = document.getElementById("information");
    var desk = document.getElementById("desk");
    var desk_num = document.getElementById("desk-num");
    info_pane.style.visibility = "visible";
    if (data[num][4] != undefined) {
        desk.textContent = data[num][4];
    } else {
        desk.textContent = "この教室のインフォメーションはありません";
    }
}

function info_close() {
    var info_pane = document.getElementById("information");
    info_pane.style.visibility = "hidden";
}


function ResizeFrame() {
    // 画面幅にiframeの幅を合わせる
    let frame = document.getElementById("map");
    let sitewidth = document.documentElement.clientWidth;
    frame.style.width = sitewidth;
}

function Menu_Toggle() {
    let menu_panel = document.getElementById("menu");
    if (menu_panel.style.display == "none") {
        menu_panel.style.display = "flex";
    } else {
        menu_panel.style.display = "none";
    }
}

window.onload = function() {
    ResizeFrame();
}
window.onresize = function() {
    ResizeFrame();
}

panel.addEventListener("click", function() {panel.style.visibility = "hidden";});

//経路検索

function search_route(Snum, Gnum) {
    if (Number.isInteger(Snum)){
        alert("部屋番号を入力してください。");
    }
    else if (!(Snum > 100 && Snum < 1000)) {
        alert("3桁である必要があります。");
    }
    else if (!(Snum[0] < 5 && Snum[0] > 0))
    {
        alert(Snum[0] + "階は存在しません。");
    }
    else {
        if (typeof data[Snum] == "undefined"){
            alert("指定された部屋番号は登録されていません。");
        }
        else {
            if (Number.isInteger(Gnum)){
                alert("部屋番号を入力してください。");
            }
            else if (!(Gnum > 100 && Gnum < 1000)) {
                alert("3桁である必要があります。");
            }
            else if (!(Gnum[0] < 5 && Gnum[0] > 0))
            {
                alert(Gnum[0] + "階は存在しません。");
            }
            else {
                if (typeof data[Gnum] == "undefined"){
                    alert("指定された部屋番号は登録されていません。");
                }
                else {
                    var fl = "";
                    var Sx0 = path[Snum][0];
                    var Sy0 = path[Snum][1];
                    var Gx0 = path[Gnum][0];
                    var Gy0 = path[Gnum][1];
                    for (let i = 0; i < 4; i++){
                        if ((i+1)*100 < Snum && Snum < (i+2)*100){
                            Sf = i;
                        }
                        if ((i+1)*100 < Gnum && Gnum < (i+2)*100){
                            Gf = i;
                        }
                    }
                    var fn = Sf;
                    var work = [];
                    if(Gx0 < Sx0){
                        work = Gx0;
                        Gx0 = Sx0;
                        Sx0 = work;

                        work = Gy0;
                        Gy0= Sy0;
                        Sy0 = work;

                        work = Gf;
                        Gf = Sf;
                        Sf = work;
                    }
                    console.log(Sx0,Sy0,Gx0,Gy0,Sf,Gf);
                    //同じ階で移動するとき
                    if (Sf == Gf) {
                        for (let i = 0; i < 4; i++) {
                            Sx[i] = Sx0;
                            Sy[i] = Sy0;
                            Gx[i] = Gx0;
                            Gy[i] = Gy0;
                            fl = i;
                            if (i == Sf){
                                continue;
                            }
                            else{
                                Sx[i] = 330;
                                Gx[i] = 330;
                                Gy[i] = 220;
                                Gy[i] = 220;
                                
                            }
                        }
                    }
                    //異なる階で移動するとき
                    else if (fl != 1 || 2 || 3 || 4){
                        //東棟から移動するとき
                        if(Sy0 == 181){
                            if(Gy0 == Sy0){
                                if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                    if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1191) + Math.abs(Gx0 - 1191)){
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                    }
                                }
                                else {
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                }
                            }
                            else if(Gy0 == 658){
                                if(Sx0 < 366){
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                }
                                else{
                                    if(Math.abs(1182 - Sx0) + 477 + Math.abs(1182 -Gx0) < Math.abs(Sx0 - 366) + 477 + Math.abs(Gx0 - 366)){
                                        if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                            if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1191) + Math.abs(Gx0 - 1191)){

                                            }
                                            else{
                                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                            }
                                        }
                                        else{
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                        }
                                    }
                                    else{
                                        if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                            if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1191) + Math.abs(Gx0 - 1191)){
                                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                            }
                                            else{
                                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                            }
                                        }
                                        else{
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                        }
                                    }
                                }
                            }
                            //117,118へ移動するとき
                            else if(Gx0 == 366){
                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                            }
                            //一般教室へ移動するとき
                            else if(Gx0 == 1131){
                                if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                    if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1191) + Math.abs(Gx0 - 1191)){
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                    }
                                }
                                else {
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                }
                            }
                            //事務室へ移動するとき
                            else if(Gy0 == 300){
                                if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                    if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1191) + Math.abs(Gx0 - 1191)){
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                    }
                                }
                                else {
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                }
                            }
                            //校長室側へ移動するとき
                            else if(Gy0 == 256){
                                if(Math.abs(938 - Sx) < Math.abs(1182 - Sx)){
                                    if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                        if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1191) + Math.abs(Gx0 - 1191)){
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                        }
                                        else{
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                        }
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                    }
                                }
                                else{
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                }
                            }
                        }
                        //西棟から移動するとき
                        else if(Sy0 == 658){
                            if(Gy0 == Sy0){
                                if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                    if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1179) + Math.abs(Gx0 - 1179)){
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                    }
                                }
                                else {
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                }
                            }
                            else if(Gy0 == 181){
                                if(Sx0 < 366){
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                }
                                else if(1182 < Gx0){
                                    if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                        if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1179) + Math.abs(Gx0 - 1179)){
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                        }
                                        else{
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                        }
                                    }
                                    else {
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                    }
                                }
                                else{
                                    if(Math.abs(1182 - Sx0) + 477 + Math.abs(1182 -Gx0) < Math.abs(Sx0 - 366) + 477 + Math.abs(Gx0 - 366)){
                                        if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                            if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1179) + Math.abs(Gx0 - 1179)){
                                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                            }
                                            else{
                                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                            }
                                        }
                                        else {
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                        }
                                    }
                                    else{

                                    }
                                }
                            }
                            //117,118へ移動するとき
                            else if(Gx0 == 366){
                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                            }
                            //一般教室へ移動するとき
                            else if(Gx0 == 1131){
                                if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                    if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1179) + Math.abs(Gx0 - 1179)){
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                    }
                                }
                                else {
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                }
                            }
                            //事務室へ移動するとき
                            else if(Gy0 == 300){
                                if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                    if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1179) + Math.abs(Gx0 - 1179)){
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                    }
                                    else{
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                    }
                                }
                                else {
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                }
                            }
                            //校長室側へ移動するとき
                            else if(Gy0 == 256){
                                if(Math.abs(366 - Sx0) + 572 + Math.abs(Gx0 - 938) < Math.abs(1182 - Sx0) + Math.abs(1182 - Gx0)){
                                    if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                        if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1179) + Math.abs(Gx0 - 1179)){
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                        }
                                        else{
                                            stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                        }
                                    }
                                    else {
                                        stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                    }
                                }
                                else{
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                }
                            }
                        }
                        //117,118から移動するとき
                        else if(Sx0 == 366){
                            if(Gy0 != 256){
                                if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                    if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1191) + Math.abs(Gx0 - 1191)){
                                        if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                            if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1179) + Math.abs(Gx0 - 1179)){
                                                stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                            }
                                            else{
                                                stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                            }
                                        }
                                        else {
                                            stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                        }
                                        stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                    }
                                    else{
                                        stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                    }
                                }
                                else {
                                    stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                }
                            }
                            else{
                                if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                    if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1191) + Math.abs(Gx0 - 1191)){
                                        stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                    }
                                    else{
                                        stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                    }
                                }
                                else {
                                    stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                                }
                            }
                        }
                        //一般教室から移動するとき
                        else if(Sx0 == 1131){
                            if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1191) + Math.abs(Gx0 - 1191)){
                                    if(Math.abs(Sx0 - 328) + Math.abs(Gx0 - 328) >= Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711)){
                                        if(Math.abs(Sx0 - 711) + Math.abs(Gx0 - 711) >= Math.abs(Sx0 - 1179) + Math.abs(Gx0 - 1179)){
                                            stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1179);
                                        }
                                        else{
                                            stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,711);
                                        }
                                    }
                                    else {
                                        stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,328);
                                    }
                                    stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                }
                                else{
                                    stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                }
                            }
                            else {
                                stairs2(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                            }
                        }
                        //事務室から移動するとき
                        else if(Sy0 == 300){
                            if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1191) + Math.abs(Gx0 - 1191)){
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                }
                                else{
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                }
                            }
                            else {
                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                            }
                        }
                        //校長室側から移動するとき
                        else if(Sy0 == 256){
                            if(Math.abs(Sx0 - 341) + Math.abs(Gx0 - 341) >= Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701)){
                                if(Math.abs(Sx0 - 701) + Math.abs(Gx0 - 701) >= Math.abs(Sx0 - 1191) + Math.abs(Gx0 - 1191)){
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,1191);
                                }
                                else{
                                    stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,701);
                                }
                            }
                            else {
                                stairs(Sx0,Sy0,Gx0,Gy0,Sf,Gf,341);
                            }
                        }
                    }
                    map.contentWindow.download(Sx,Sy,Gx,Gy,Sf,Gf);
                    map.contentWindow.Sroom = Snum;
                    map.contentWindow.showupS(Snum);
                    map.contentWindow.Groom = Gnum;
                    map.contentWindow.showupG(Gnum);
                    map.contentWindow.flchange(fn);
                    dis_number.textContent = Snum[0] + "F";
                    dis_number.style.background=colors[Snum[0] - 1];
                }
            }
        }
    }
}

//階段時の挙動
function stairs(x1,y1,x2,y2,Sf,Gf,stairs){
    for (let i = 0; i < 4; i++){
        if (Gf == Sf){
            Gy[i] = y2;
        }
        else{
            Gy[i] = y1;
        }
    }
    for (let i = 0; i < 4; i++){
        Sy[i] = y1;
    }    
    for (let i = 0; i < 4; i++){
        if (Sf == i){
            for (let j = 0; j < 4; j++){
                if (Gf == j){
                    Gx[j] = x2;
                    Gy[j] = y2;
                }
                else {
                    Gx[j] = stairs;
                }
            }
            Sx[i] = x1;
            Sy[i] = y1;
        }
        else {
            Sx[i] = stairs;
        }
    }
    console.log("階段")
}
//階段例外用1
function stairs2(x1,y1,x2,y2,Sf,Gf,stairs){
    for (let i = 0; i < 4; i++){
        if (Gf == Sf){
            Gy[i] = y1;
        }
        else{
            Gy[i] = 181;
        }
    }
    for (let i = 0; i < 4; i++){
        Sy[i] = 181;
    }    
    for (let i = 0; i < 4; i++){
        if (Sf == i){
            for (let j = 0; j < 4; j++){
                if (Gf == j){
                    Gx[j] = x2;
                    Gy[j] = y2;
                }
                else {
                    Gx[j] = stairs;
                }
            }
            Sx[i] = x1;
            Sy[i] = y1;
        }
        else {
            Sx[i] = stairs;
        }
    }
    console.log("階段")
}
//階段例外用2
function stairs3(x1,y1,x2,y2,Sf,Gf,stairs){
    for (let i = 0; i < 4; i++){
        if (Gf == Sf){
            Gy[i] = y1;
        }
        else{
            Gy[i] = y2;
        }
    }
    for (let i = 0; i < 4; i++){
        Sy[i] = y2;
    }    
    for (let i = 0; i < 4; i++){
        if (Sf == i){
            for (let j = 0; j < 4; j++){
                if (Gf == j){
                    Gx[j] = x2;
                    Gy[j] = y2;
                }
                else {
                    Gx[j] = stairs;
                }
            }
            Sx[i] = x1;
            Sy[i] = y1;
        }
        else {
            Sx[i] = stairs;
        }
    }
    console.log("階段")
}
